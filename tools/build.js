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
const css = fs.readFileSync(path.join(ROOT, "src/style.css"), "utf8");
const js = fs.readFileSync(path.join(ROOT, "src/engine.js"), "utf8");
const shell = fs.readFileSync(path.join(ROOT, "src/shell.html"), "utf8");
const data = JSON.stringify({units, ledger, audio, sounds}).replace(/</g, "\\u003c");
const out = shell.replace("/*CSS*/", () => css).replace("/*DATA*/", () => `window.HINDI = ${data};`).replace("/*ENGINE*/", () => js);
fs.mkdirSync(path.join(ROOT, "dist"), {recursive: true});
fs.writeFileSync(path.join(ROOT, "dist/index.html"), out);
// dist/artifact.html: the same page without the document skeleton, which the claude.ai artifact host adds itself.
const frag = out.replace(/<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*/i, "").replace(/<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/i, "")
  .replace(/<\/head>\s*<body>\s*/i, "").replace(/\s*<\/body>\s*<\/html>\s*$/i, "\n");
fs.writeFileSync(path.join(ROOT, "dist/artifact.html"), frag);
console.log(`dist/index.html: ${units.length} unit(s), ${Object.keys(audio).length} clip(s), ${sounds ? Object.keys(sounds.words).length : 0} sound-coloured form(s), ${(out.length / 1024).toFixed(0)} KB`);
