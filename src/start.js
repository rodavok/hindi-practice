"use strict";
/* Start-up, run last so every script above (engine, drawing, word pages) is fully defined first. */
if ("speechSynthesis" in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
soundDefs();
home();
sync.start();
/* Keep the last question clear of the fixed check bar, whose height varies on a phone. */
if ("ResizeObserver" in window) new ResizeObserver(() => document.body.style.setProperty("--foot-h", (foot.hidden ? 0 : foot.offsetHeight) + "px")).observe(foot);
/* Optional capabilities: the hosted page's hooks, else the local explain helper if it is running. */
if (window.claude && typeof window.claude.use === "function"){
  window.claude.use("sample").then(s => { askClaude = s || null; }).catch(() => {});
  window.claude.use("tts").then(t => { cloudTTS = t || null; if (view === "home" || view === "unit") rerender(); }).catch(() => {});
} else if (location.protocol.startsWith("http") && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
  fetch("/api/explain", {method:"OPTIONS"}).then(r => { if (r.ok) askClaude = async (prompt, opts) => {
    const r2 = await fetch("/api/explain", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({prompt})});
    const j = await r2.json(); if (!r2.ok) throw {code:j.code, text:j.error}; return {text:j.text};
  }; }).catch(() => {});
}
