package app.hindipractice;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import org.json.JSONObject;

/**
 * Hindi Practice: the built page (assets/index.html) in a WebView, plus three things a WebView lacks,
 * reached from the page through window.HindiAndroid (see android/shim.js):
 *   - speech, through Android's text-to-speech in Hindi;
 *   - saving and loading a backup file, through the system file picker;
 *   - the back button, which steps back inside the app before leaving it.
 */
public class MainActivity extends Activity {
  private static final int PICK_FILE = 1, SAVE_FILE = 2;
  private WebView web;
  private TextToSpeech tts;
  private volatile boolean ttsReady = false;
  private ValueCallback<Uri[]> fileCallback;
  private String pendingSave;

  @Override protected void onCreate(Bundle saved) {
    super.onCreate(saved);
    web = new WebView(this);
    setContentView(web);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);          // progress lives in localStorage
    s.setAllowFileAccess(true);            // the page is file:///android_asset/index.html
    s.setMediaPlaybackRequiresUserGesture(false);
    web.addJavascriptInterface(new Bridge(), "HindiAndroid");
    web.setWebViewClient(new WebViewClient() {
      @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
        Uri u = r.getUrl();
        if ("file".equals(u.getScheme())) return false;
        try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (ActivityNotFoundException e) { }
        return true;                       // any outside link opens in the phone's browser
      }
    });
    web.setWebChromeClient(new WebChromeClient() {
      @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
        if (fileCallback != null) fileCallback.onReceiveValue(null);
        fileCallback = cb;
        Intent i = new Intent(Intent.ACTION_GET_CONTENT).addCategory(Intent.CATEGORY_OPENABLE).setType("*/*");
        try { startActivityForResult(Intent.createChooser(i, "Load backup"), PICK_FILE); }
        catch (ActivityNotFoundException e) { fileCallback = null; cb.onReceiveValue(null); return false; }
        return true;
      }
    });
    tts = new TextToSpeech(this, status -> {
      if (status == TextToSpeech.SUCCESS) {
        int r = tts.setLanguage(new Locale("hi", "IN"));
        ttsReady = r != TextToSpeech.LANG_MISSING_DATA && r != TextToSpeech.LANG_NOT_SUPPORTED;
      }
      js("window.hpTTSReady && hpTTSReady(" + ttsReady + ")");
    });
    tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
      @Override public void onStart(String id) { event("start", id); }
      @Override public void onDone(String id) { event("done", id); }
      @Override public void onError(String id) { event("error", id); }
      @Override public void onStop(String id, boolean interrupted) { event("stop", id); }
    });
    if (saved != null) web.restoreState(saved);
    else web.loadUrl("file:///android_asset/index.html");
  }

  private void event(String kind, String id) { js("window.hpTTSEvent && hpTTSEvent('" + kind + "', " + JSONObject.quote(id) + ")"); }
  private void js(String code) { runOnUiThread(() -> web.evaluateJavascript(code, null)); }

  /** Methods the page can call. They run on a background thread, so UI work goes through runOnUiThread. */
  public class Bridge {
    @JavascriptInterface public boolean ttsReady() { return ttsReady; }
    @JavascriptInterface public void speak(String text, float rate, String id) {
      if (!ttsReady) { event("error", id); return; }
      tts.setSpeechRate(rate);
      Bundle b = new Bundle();
      if (tts.speak(text, TextToSpeech.QUEUE_FLUSH, b, id) != TextToSpeech.SUCCESS) event("error", id);
    }
    @JavascriptInterface public void stop() { if (tts != null) tts.stop(); }
    @JavascriptInterface public void saveFile(String name, String text) {
      runOnUiThread(() -> {
        pendingSave = text;
        Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE)
          .setType("application/json").putExtra(Intent.EXTRA_TITLE, name);
        try { startActivityForResult(i, SAVE_FILE); }
        catch (ActivityNotFoundException e) { pendingSave = null; js("window.hpSaved && hpSaved(false)"); }
      });
    }
    @JavascriptInterface public void openSpeechSettings() {
      runOnUiThread(() -> {
        try { startActivity(new Intent("com.android.settings.TTS_SETTINGS")); }
        catch (ActivityNotFoundException e) {
          try { startActivity(new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA)); } catch (ActivityNotFoundException e2) { }
        }
      });
    }
  }

  @Override protected void onActivityResult(int req, int res, Intent data) {
    Uri uri = res == RESULT_OK && data != null ? data.getData() : null;
    if (req == PICK_FILE && fileCallback != null) {
      fileCallback.onReceiveValue(uri != null ? new Uri[]{uri} : null);
      fileCallback = null;
    } else if (req == SAVE_FILE) {
      boolean ok = false;
      if (uri != null && pendingSave != null) {
        try (OutputStream o = getContentResolver().openOutputStream(uri, "wt")) {
          o.write(pendingSave.getBytes(StandardCharsets.UTF_8));
          ok = true;
        } catch (Exception e) { }
      }
      pendingSave = null;
      js("window.hpSaved && hpSaved(" + ok + ")");
    } else super.onActivityResult(req, res, data);
  }

  /** Back steps back inside the app (word page, lesson, unit) and only leaves it from the home screen. */
  @SuppressWarnings("deprecation")
  @Override public void onBackPressed() {
    web.evaluateJavascript("window.hpBack ? hpBack() : false", v -> { if (!"true".equals(v)) finish(); });
  }

  @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
  @Override protected void onPause() { super.onPause(); if (tts != null) tts.stop(); }
  @Override protected void onDestroy() { if (tts != null) tts.shutdown(); web.destroy(); super.onDestroy(); }
}
