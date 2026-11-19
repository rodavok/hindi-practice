"use strict";
/* Android app shim. tools/apk.js adds this after the engine in the APK's copy of the page only.
   The WebView has no browser voice, can't download files, and has no browser back button, so this
   connects those to the app (window.HindiAndroid, android/src/.../MainActivity.java):
   - Android text-to-speech is offered to the engine in the same shape as the claude.ai voice (cloudTTS),
     so speaking, the listening lessons and the pen drawing work unchanged;
   - "Save backup file" goes to the system's save dialog;
   - the back button steps back through word pages, lessons and units before closing the app. */
(() => {
  const A = window.HindiAndroid;
  if (!A) return;

  // ---- speech ----
  let n = 0, onPos = null;
  const waiting = {};
  const androidTTS = {
    speak(text, opts){
      return new Promise((resolve, reject) => {
        const id = "u" + (++n);
        waiting[id] = {resolve, reject, t: 0};
        A.speak(text, (opts && opts.rate) || 1, id);
      });
    },
    // the drawing code uses this to learn when the voice actually starts
    onPosition(cb){ onPos = cb; }
  };
  window.hpTTSEvent = (kind, id) => {
    const w = waiting[id];
    if (!w) return;
    if (kind === "start"){ w.t = performance.now(); if (onPos) try { onPos({ms: 0}); } catch (e) {} return; }
    delete waiting[id];
    if (kind === "error") w.reject(new Error("speech failed"));
    else w.resolve({playedMs: kind === "done" && w.t ? performance.now() - w.t : undefined});
  };
  window.hpTTSReady = ok => {
    cloudTTS = ok ? androidTTS : null;
    if (view === "home" || view === "unit") rerender();
  };
  if (A.ttsReady()) window.hpTTSReady(true);

  // The "no voice" note on the home page talks about browsers; here the fix is Android's speech settings.
  const fixWarn = () => document.querySelectorAll(".warn").forEach(w => {
    if (w.dataset.android || !/Google Chrome/.test(w.textContent)) return;
    w.dataset.android = "1";
    w.innerHTML = 'No Hindi voice is available, so words will not be read aloud and the listening lessons are off. ' +
      'Install Hindi in the phone\'s text-to-speech settings (Speech Services by Google → Install voice data → Hindi), then reopen the app. ' +
      '<button class="chip" id="ttsset" style="margin-top:8px">Open speech settings</button>';
    w.querySelector("#ttsset").onclick = () => A.openSpeechSettings();
  });
  new MutationObserver(fixWarn).observe(document.getElementById("app"), {childList: true, subtree: true});
  fixWarn();

  // ---- backup file: the system save dialog instead of a download ----
  document.addEventListener("click", e => {
    if (!e.target.closest || !e.target.closest("#bksave")) return;
    e.preventDefault(); e.stopImmediatePropagation();
    const d = new Date(), p = x => String(x).padStart(2, "0");
    A.saveFile(`hindi-practice-backup-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.json`, backupText());
  }, true);
  window.hpSaved = ok => {
    const m = document.getElementById("bkmsg");
    if (m) m.textContent = ok ? "Backup file saved." : "The backup file wasn't saved.";
  };

  // ---- back button ----
  window.hpBack = () => {
    if (typeof wpStack !== "undefined" && wpStack.length){ wpBack(); return true; }
    if (view === "run" || view === "results"){ leave(); return true; }
    if (view === "unit"){ home(); return true; }
    return false;
  };
})();
