"use strict";
// Writes content/strokes.json: centre lines for every glyph in content/glyphs.json, so the app can
// draw a word with a pen while it is spoken (src/draw.js). A fused shape drawn under its plain base
// gets the key "shape|base" and only the part the base does not cover.
// Re-run after tools/glyphs.js. Usage: node tools/strokes.js
const fs = require("fs"), path = require("path");
const {centreLines} = require("./skeleton");
const ROOT = path.join(__dirname, "..");
const G = JSON.parse(fs.readFileSync(path.join(ROOT, "content/glyphs.json"), "utf8"));
const jobs = new Map();
for (const w of Object.values(G.words)) for (const t of w.t) for (const [n, , , , plain] of t.p){
  if (!plain) jobs.set(n, [n]);
  else { jobs.set(`${n}|${plain}`, [n, plain]); jobs.set(plain, [plain]); }
}
const out = {}, weak = [];
for (const [k, [n, plain]] of [...jobs].sort()){
  const c = centreLines(G.glyphs[n], plain && G.glyphs[plain]);
  out[k] = {w: c.w, s: c.s};
  if (c.cover < 0.9) weak.push(`${k} ${(c.cover * 100).toFixed(0)}%`);
}
const json = JSON.stringify(out);
fs.writeFileSync(path.join(ROOT, "content/strokes.json"), json);
console.log(`content/strokes.json: ${jobs.size} shapes, ${(json.length / 1024).toFixed(0)} KB`);
if (weak.length) console.log(`Pen covers under 90% (the rest fades in): ${weak.join(", ")}`);
