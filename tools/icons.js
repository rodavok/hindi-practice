"use strict";
// Writes the app icon: src/icons/icon.svg (हि drawn from the bundled Noto font, so no font is needed to view it)
// and the PNGs the web app manifest and iOS need (192, 512, 180). Run once, or after changing the design;
// the PNGs are committed so tools/build.js doesn't need a browser.
// Usage: node tools/icons.js   (needs `npm install` for harfbuzzjs, and chromium on the PATH for the PNGs)
const fs = require("fs"), path = require("path"), os = require("os"), {execFileSync} = require("child_process");
const {ROOT} = require("./lib");
const FONT = path.join(ROOT, "tools/fonts/NotoSansDevanagari-Regular.ttf");
const OUT = path.join(ROOT, "src/icons");
const BG = "#5a35b5", FG = "#ffffff", TEXT = "हि";

async function main(){
  const hb = await import("harfbuzzjs");
  const buf = fs.readFileSync(FONT);
  const font = new hb.Font(new hb.Face(new hb.Blob(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))));
  const b = new hb.Buffer(); b.addText(TEXT); b.guessSegmentProperties(); hb.shape(font, b);
  const inf = b.getGlyphInfos(), pos = b.getGlyphPositions();
  // Lay the glyphs out in font units (y up), then fit their outline box into the middle of a 512 square.
  let x = 0; const parts = [], pts = [];
  inf.forEach((g, i) => {
    const d = font.glyphToPath(g.codepoint), dx = x + pos[i].xOffset, dy = pos[i].yOffset;
    parts.push(`<path transform="translate(${dx} ${dy})" d="${d}"/>`);
    for (const m of d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)) pts.push([+m[1] + dx, +m[2] + dy]);
    x += pos[i].xAdvance;
  });
  const [x0, y0, x1, y1] = [Math.min(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1])), Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))];
  // Maskable icons may be cut to a circle of radius 0.4 × size; keep the glyph's box well inside it.
  const S = 512, box = 0.5 * S, k = Math.min(box / (x1 - x0), box / (y1 - y0));
  const tx = (S - k * (x1 - x0)) / 2 - k * x0, ty = (S + k * (y1 - y0)) / 2 + k * y0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">` +
    `<rect width="${S}" height="${S}" fill="${BG}"/>` +
    `<g fill="${FG}" stroke="${FG}" stroke-width="36" stroke-linejoin="round" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(5)} ${(-k).toFixed(5)})">${parts.join("")}</g></svg>\n`;
  fs.mkdirSync(OUT, {recursive: true});
  fs.writeFileSync(path.join(OUT, "icon.svg"), svg);
  console.log("src/icons/icon.svg");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hindi-icons-"));
  try {
    for (const [name, n] of [["icon-192.png", 192], ["icon-512.png", 512], ["apple-touch-icon.png", 180]]){
      const page = path.join(tmp, `${n}.html`);
      fs.writeFileSync(page, `<!doctype html><style>html,body{margin:0;overflow:hidden;background:${BG}}svg{display:block;width:${n}px;height:${n}px}</style>${svg}`);
      execFileSync("chromium", ["--headless", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${path.join(tmp, "prof")}`,
        `--window-size=${n},${n}`, `--screenshot=${path.join(tmp, name)}`, "file://" + page], {stdio: "pipe", env: {...process.env, TMPDIR: "/tmp"}}); // a long TMPDIR makes Chromium's socket path too long
      fs.copyFileSync(path.join(tmp, name), path.join(OUT, name));
      console.log(`src/icons/${name}`);
    }
  } finally { fs.rmSync(tmp, {recursive: true, force: true}); }
}
main().catch(e => { console.error(e.stderr ? String(e.stderr) : e); process.exit(1); });
