// Debug sheet: every demo glyph with its centre lines (pen width faint, stroke order by hue, start dots).
// Run: node demo/skeleton-sheet.js  →  dist/skeleton-sheet.html
const fs = require("fs"), path = require("path"), {centreLines} = require("../tools/skeleton");
const root = path.join(__dirname, ".."), G = require(path.join(root, "content/glyphs.json"));
const WORDS = require("./words");
const jobs = new Map();
for (const w of WORDS) for (const [n, , , , plain] of G.words[w].t[0].p){ jobs.set(n + (plain ? "|" + plain : ""), [n, plain]); if (plain) jobs.set(plain, [plain]); }
let cells = "";
for (const [k, [n, plain]] of jobs){
  const t0 = Date.now(), c = centreLines(G.glyphs[n], plain && G.glyphs[plain]);
  const strokes = c.s.map((p, i) => `<polyline points="${p.map(q => q.join(",")).join(" ")}" fill="none" stroke="hsl(${i * 67 % 360} 80% 45%)" stroke-width="14" stroke-linejoin="round"/><circle cx="${p[0][0]}" cy="${p[0][1]}" r="22" fill="hsl(${i * 67 % 360} 80% 45%)"/>`).join("");
  const pen = c.s.map(p => `<polyline points="${p.map(q => q.join(",")).join(" ")}" fill="none" stroke="rgba(120,80,220,.18)" stroke-width="${c.w}" stroke-linecap="round" stroke-linejoin="round"/>`).join("");
  cells += `<figure><svg viewBox="-450 -1000 1500 1450" width="200"><g transform="scale(1,-1)"><path d="${G.glyphs[n]}" fill="#ccc"/>${plain ? `<path d="${G.glyphs[plain]}" fill="#999"/>` : ""}${pen}${strokes}</g></svg><figcaption>${k}<br>${(c.cover * 100).toFixed(0)}% · ${c.s.length} strokes · w ${c.w} · ${Date.now() - t0}ms</figcaption></figure>`;
  console.log(k.padEnd(34), (c.cover * 100).toFixed(1).padStart(5) + "%", c.s.length, "strokes", "w", c.w, c.lone ? "lone " + c.lone : "");
}
fs.writeFileSync(path.join(root, "dist/skeleton-sheet.html"), `<!doctype html><meta charset=utf-8><style>body{font:12px sans-serif;display:flex;flex-wrap:wrap;gap:6px;background:#fff}figure{margin:0;border:1px solid #ddd}figcaption{padding:2px 4px}</style>${cells}`);
