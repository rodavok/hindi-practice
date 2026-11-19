// Builds dist/sound-draw.html: a small demo that speaks a word and draws each
// sound's colour onto it as the sound is heard. Data comes from content/glyphs.json.
// Run: node demo/build-sound-draw.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const G = require(path.join(root, "content/glyphs.json"));

const WORDS = require("./words");

const en = {};
for (const f of fs.readdirSync(path.join(root, "content")).filter(f => /^unit\d+\.json$/.test(f)).sort())
  for (const v of require(path.join(root, "content", f)).vocab || []) if (!en[v.hi]) en[v.hi] = v.en;

const words = [], used = new Set();
for (const w of WORDS) {
  const e = G.words[w];
  if (!e) throw new Error("no glyph entry for " + w);
  if (e.t.length !== 1) throw new Error("demo handles one-token words only: " + w);
  e.t[0].p.forEach(q => { used.add(q[0]); if (q[4]) used.add(q[4]); });
  words.push({ hi: w, en: en[w] || "", vb: e.t[0].vb, p: e.t[0].p, r: e.r });
}
// Centre lines for the pen (demo/skeleton.js). A fused shape drawn under its plain base
// ("n|plain") gets only the part the base does not cover.
const {centreLines} = require("../tools/skeleton");
const glyphs = {}, strokes = {};
for (const w of words) for (const [n, , , , plain] of w.p) {
  for (const k of [n, plain]) if (k) glyphs[k] = G.glyphs[k];
  const key = plain ? `${n}|${plain}` : n;
  if (!strokes[key]) { const c = centreLines(G.glyphs[n], plain && G.glyphs[plain]); strokes[key] = {w: c.w, s: c.s}; }
  if (plain && !strokes[plain]) { const c = centreLines(G.glyphs[plain]); strokes[plain] = {w: c.w, s: c.s}; }
}

const tpl = fs.readFileSync(path.join(__dirname, "sound-draw.html"), "utf8");
const out = tpl.replace("/*DATA*/null", JSON.stringify({ words, glyphs, strokes }));
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/sound-draw.html"), out);
// A copy with a document skeleton, for opening the file directly in a browser.
fs.writeFileSync(path.join(root, "dist/sound-draw.local.html"),
  `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${out}</body></html>`);
console.log(`dist/sound-draw.html: ${words.length} words, ${Object.keys(glyphs).length} glyphs, ${(out.length / 1024).toFixed(0)} KB`);
