"use strict";
// Builds dist/index.html: one self-contained page with every unit, the ledger, and any audio clips.
// Usage: node tools/build.js
const fs = require("fs"), path = require("path");
const {ROOT, loadUnits, loadLedger} = require("./lib");

const units = loadUnits().map(u => { delete u._file; return u; });
const ledger = loadLedger();
// Optional clips: audio/unitNN/manifest.json = {"हिन्दी": "file.mp3"}; embedded as data URIs.
const audio = {};
const adir = path.join(ROOT, "audio");
if (fs.existsSync(adir)) for (const d of fs.readdirSync(adir)){
  const mf = path.join(adir, d, "manifest.json");
  if (!fs.existsSync(mf)) continue;
  const m = JSON.parse(fs.readFileSync(mf, "utf8"));
  for (const [text, file] of Object.entries(m)){
    const ext = path.extname(file).slice(1), mime = ext === "mp3" ? "audio/mpeg" : ext === "ogg" ? "audio/ogg" : "audio/wav";
    audio[text] = `data:${mime};base64,` + fs.readFileSync(path.join(adir, d, file)).toString("base64");
  }
}
// Optional sound-colour glyph data, written by tools/glyphs.js.
const gfile = path.join(ROOT, "content/glyphs.json");
const sounds = fs.existsSync(gfile) ? JSON.parse(fs.readFileSync(gfile, "utf8")) : null;
// Word pages index, written by tools/words.js.
const wfile = path.join(ROOT, "content/words.json");
const wordIndex = fs.existsSync(wfile) ? JSON.parse(fs.readFileSync(wfile, "utf8")) : null;
// Optional centre lines for drawing a word while it is spoken, written by tools/strokes.js.
const sfile = path.join(ROOT, "content/strokes.json");
const strokes = sounds && fs.existsSync(sfile) ? JSON.parse(fs.readFileSync(sfile, "utf8")) : null;
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const css = ["src/style.css", "src/draw.css", "src/words.css"].map(read).join("\n");
const js = ["src/engine.js", "src/draw.js", "src/words.js", "src/start.js"].map(read).join("\n");
const shell = read("src/shell.html");
const data = JSON.stringify({units, ledger, audio, sounds, strokes, words: wordIndex}).replace(/</g, "\\u003c");
const out = shell.replace("/*CSS*/", () => css).replace("/*DATA*/", () => `window.HINDI = ${data};`).replace("/*ENGINE*/", () => js);
fs.mkdirSync(path.join(ROOT, "dist"), {recursive: true});
fs.writeFileSync(path.join(ROOT, "dist/index.html"), out);
// dist/artifact.html: the same page without the document skeleton, which the claude.ai artifact host adds itself.
const frag = out.replace(/<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*/i, "").replace(/<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/i, "")
  .replace(/<\/head>\s*<body>\s*/i, "").replace(/\s*<\/body>\s*<\/html>\s*$/i, "\n");
fs.writeFileSync(path.join(ROOT, "dist/artifact.html"), frag);
// dist/web/: the installable web app (PWA). Upload the whole folder to any static https host; it then
// installs to a phone's home screen and works offline. Same page, plus a manifest, icons and a service worker.
const WEB = path.join(ROOT, "dist/web"), ICONS = path.join(ROOT, "src/icons");
fs.rmSync(WEB, {recursive: true, force: true});
fs.mkdirSync(WEB, {recursive: true});
const pwaHead = `<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="theme-color" content="#f2f1f5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#18171c" media="(prefers-color-scheme: dark)">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Hindi">
`;
const pwaBody = `<script>
if ("serviceWorker" in navigator && (location.protocol === "https:" || /^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)))
  navigator.serviceWorker.register("sw.js").catch(() => {});
// Ask the browser not to clear this app's storage (progress) when the phone is short of space.
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
</script>
`;
const web = out.replace("</head>", () => pwaHead + "</head>").replace(/<\/body>\s*<\/html>\s*$/i, () => pwaBody + "</body>\n</html>\n");
fs.writeFileSync(path.join(WEB, "index.html"), web);
const version = require("crypto").createHash("sha256").update(web).digest("hex").slice(0, 12);
fs.writeFileSync(path.join(WEB, "sw.js"), read("src/sw.js").replace("/*VERSION*/", version));
fs.writeFileSync(path.join(WEB, "manifest.webmanifest"), JSON.stringify({
  name: "Hindi Practice", short_name: "Hindi", description: "Practice for Complete Hindi, unit by unit.",
  id: "./", start_url: "./", scope: "./", display: "standalone",
  background_color: "#f2f1f5", theme_color: "#f2f1f5", lang: "en",
  icons: [
    {src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any"},
    {src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any"},
    {src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable"}
  ]
}, null, 2) + "\n");
for (const f of ["icon-192.png", "icon-512.png", "apple-touch-icon.png"]) fs.copyFileSync(path.join(ICONS, f), path.join(WEB, f));
console.log(`dist/index.html: ${units.length} unit(s), ${Object.keys(audio).length} clip(s), ${sounds ? Object.keys(sounds.words).length : 0} sound-coloured form(s), ${(out.length / 1024).toFixed(0)} KB`);
console.log(`dist/web/: installable web app, version ${version}`);
