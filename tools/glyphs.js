"use strict";
// Writes content/glyphs.json: for every word form in the ledger, the glyph outlines (shaped with HarfBuzz and
// Noto Sans Devanagari) coloured by sound, plus the matching romanisation spans. The app embeds this file.
// Usage: node tools/glyphs.js        (needs `npm install` for harfbuzzjs; font is tools/fonts/)
// Re-run it whenever a unit adds words. tools/validate.js fails if a ledger form is missing from the file.
//
// Method
//  1. Align each form with its stored romanisation to get "units": consonant, built-in a, vowel sign, independent
//     vowel, nasal mark, separator.
//  2. Shape the Devanagari. Each glyph's name says which letters it holds (parseName); glyphs are matched back to units.
//  3. Units join into colour groups: a consonant and its built-in a; a nasal tilde and its vowel; consonants fused in
//     one conjunct glyph. A glyph that holds two groups is split (overlay, or by outline) or, failing that, its groups
//     are merged and the form is listed under "fallbacks".
const fs = require("fs"), path = require("path");
const {ROOT, CONTENT, loadLedger} = require("./lib");

const FONT = path.join(ROOT, "tools/fonts/NotoSansDevanagari-Regular.ttf");
const OUT = path.join(CONTENT, "glyphs.json");
const NCOL = 5;

/* ---------- glyph names -> letters (Noto Sans Devanagari naming) ---------- */
const N = s => s.normalize("NFD");
const CONS = {ka:"क",kha:"ख",ga:"ग",gha:"घ",ca:"च",cha:"छ",ja:"ज",jha:"झ",tta:"ट",ttha:"ठ",dda:"ड",ddha:"ढ",nna:"ण",ta:"त",tha:"थ",da:"द",dha:"ध",na:"न",pa:"प",pha:"फ",ba:"ब",bha:"भ",ma:"म",ya:"य",ra:"र",la:"ल",va:"व",sha:"श",ssa:"ष",sa:"स",ha:"ह",qa:"क़",khha:"ख़",ghha:"ग़",za:"ज़",dddha:"ड़",rha:"ढ़",fa:"फ़"};
const STEMS = Object.keys(CONS).sort((a, b) => b.length - a.length);
const MAT = {aavowelsign:"ा",aivowelsign:"ै",auvowelsign:"ौ",iivowelsign:"ी",ivowelsign:"ि",uuvowelsign:"ू",uvowelsignlow:"ु",uvowelsignnarrow:"ु",uvowelsignnukta:"ु",uvowelsign:"ु",evowelsign:"े",ovowelsign:"ो",ocandravowelsign:"ॉ",rvocalicvowelsign:"ृ"};
const MATKEYS = Object.keys(MAT).sort((a, b) => b.length - a.length);
const IND = {a:"अ",aa:"आ",i:"इ",ii:"ई",u:"उ",uu:"ऊ",e:"ए",ai:"ऐ",o:"ओ",au:"औ",rvocalic:"ऋ"};
// -> [{k:"C"|"M"|"V"|"A"|"B"|"R"|"X", ch, half?, nukta?, lig?}]
function parseName(name){
  let s = name.replace(/deva$/, "").replace(/\d+/g, "");
  const out = [];
  if (s === "dummymark") return out;
  if (s === "virama") return [{k:"X", ch:"्"}];
  if (s in IND) return [{k:"V", ch:IND[s]}];
  const mv = s.match(/^(a|aa|i|ii|u|uu|e|ai|o|au|rvocalic)anusvara$/);
  if (mv) return [{k:"V", ch:IND[mv[1]]}, {k:"A", ch:"ं"}];
  while (s.length){
    let m;
    if (s.startsWith("prehalf")){ s = s.slice(7); out[out.length - 1].half = true; continue; }
    if (s.startsWith("nukta")){ s = s.slice(5); out[out.length - 1].nukta = true; continue; }
    if (s.startsWith("reph")){ s = s.slice(4); out.push({k:"R", ch:"र"}); continue; }
    if (s.startsWith("anusvara")){ s = s.slice(8); out.push({k:"A", ch:"ं"}); continue; }
    if (s.startsWith("candrabindu")){ s = s.slice(11); out.push({k:"B", ch:"ँ"}); continue; }
    if ((m = MATKEYS.find(k => s.startsWith(k)))){ s = s.slice(m.length); out.push({k:"M", ch:MAT[m]}); continue; }
    if ((m = STEMS.find(k => s.startsWith(k)))){
      s = s.slice(m.length); out.push({k:"C", ch:CONS[m]});
      const mu = s.match(/^(uu|u)$/);                       // consonant + u/ū ligature, e.g. daudeva = दु
      if (mu){ s = ""; out.push({k:"M", ch:mu[1] === "u" ? "ु" : "ू", lig:true}); }
      continue;
    }
    throw new Error(`unparsed glyph name ${name} at '${s}'`);
  }
  return out;
}

/* ---------- Devanagari + romanisation -> units ---------- */
const R = {क:"k",ख:"kh",ग:"g",घ:"gh",ङ:"ṅ",च:"c",छ:"ch",ज:"j",झ:"jh",ञ:"ñ",ट:"ṭ",ठ:"ṭh",ड:"ḍ",ढ:"ḍh",ण:"ṇ",त:"t",थ:"th",द:"d",ध:"dh",न:"n",प:"p",फ:"ph",ब:"b",भ:"bh",म:"m",य:"y",र:"r",ल:"l",व:"v",श:"ś",ष:"ṣ",स:"s",ह:"h",क़:"q",ख़:"kh",ग़:"g",ज़:"z",ड़:"ṛ",ढ़:"ṛh",फ़:"f"};
const V = {अ:"a",आ:"ā",इ:"i",ई:"ī",उ:"u",ऊ:"ū",ऋ:"ṛ",ए:"e",ऐ:"ai",ओ:"o",औ:"au",ऑ:"o"};
const MT = {"ा":["ā"],"ि":["i"],"ी":["ī"],"ु":["u"],"ू":["ū"],"ृ":["ṛ"],"े":["e"],"ै":["ai"],"ो":["o"],"ौ":["au"],"ॉ":["ā", "o"],"ॅ":["e"]};
const isCons = c => /[क-हक़-य़]/.test(c);
const NAS = ["m", "n", N("ṇ"), N("ṅ"), N("ñ")];
function unitsOf(form){
  const ch = [...form], out = [];
  for (let i = 0; i < ch.length; i++){
    const c = ch[i];
    if (isCons(c)){
      let l = c; if (ch[i + 1] === "़"){ l = (c + "़").normalize("NFC"); }
      const start = i; if (ch[i + 1] === "़") i++;
      const key = R[l] ? l : c;
      out.push({t:"C", i:start, key:N(l), c:[N(R[key])]});
      const n = ch[i + 1];
      if (n === "्") i++;
      else if (!(n && n in MT)) out.push({t:"a", i:start, c:["a", ""]});
    } else if (c in MT) out.push({t:"M", i, key:N(c), c:MT[c].map(N)});
    else if (c in V) out.push({t:"V", i, key:N(c), c:[N(V[c])]});
    else if (c === "ं" || c === "ँ") out.push({t:"A", i, key:N(c), c:["̃", ...NAS, ""]});
    else if (c === " " || c === "-") out.push({t:"S", i, c:[" ", "-"]});
    else out.push({t:"?", i, c:[c]});
  }
  return out;
}
function alignUnits(form, ro){
  const u = unitsOf(form), r = N(ro), found = [];
  (function go(k, p, acc){
    if (found.length > 1) return;
    if (k === u.length){ if (p === r.length) found.push(acc.slice()); return; }
    for (const s of u[k].c) if (r.startsWith(s, p)){ acc.push(s); go(k + 1, p + s.length, acc); acc.pop(); }
  })(0, 0, []);
  if (!found.length) throw new Error(`romanisation “${ro}” does not fit the spelling`);
  if (found.length > 1) throw new Error(`romanisation “${ro}” fits the spelling more than one way`);
  u.forEach((x, k) => { x.p = found[0][k]; });
  return u;
}

/* ---------- main ---------- */
async function main(){
  const hb = await import("harfbuzzjs");
  const buf = fs.readFileSync(FONT);
  const font = new hb.Font(new hb.Face(new hb.Blob(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))));
  const gidOf = new Map();
  const nameToGid = name => { if (gidOf.size === 0) for (let g = 0; g < 3000; g++){ const n = font.glyphName(g); if (n) gidOf.set(n, g); } return gidOf.get(name); };
  const shape = w => {
    const b = new hb.Buffer(); b.addText(w); b.guessSegmentProperties(); hb.shape(font, b);
    const inf = b.getGlyphInfos(), pos = b.getGlyphPositions();
    return inf.map((g, i) => ({gid:g.codepoint, name:font.glyphName(g.codepoint), cl:g.cluster, ax:pos[i].xAdvance, ox:pos[i].xOffset, oy:pos[i].yOffset}));
  };
  const contours = d => d.split("Z").map(s => s.trim()).filter(Boolean).map(s => s + "Z");
  const bbox = d => { const n = [...d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)].map(m => [+m[1], +m[2]]); return [Math.min(...n.map(p => p[0])), Math.min(...n.map(p => p[1])), Math.max(...n.map(p => p[0])), Math.max(...n.map(p => p[1]))]; };

  const ledger = loadLedger();
  const forms = new Map();
  for (const k of Object.keys(ledger)) for (const [hi, ro] of Object.entries(ledger[k].forms)) if (!forms.has(hi)) forms.set(hi, ro);

  const glyphs = {};                       // name -> path (only the ones used)
  const need = name => { if (!(name in glyphs)) glyphs[name] = font.glyphToPath(nameToGid(name)); };
  const words = {}, fallbacks = [], errors = [];
  const stat = {single:0, overlay:0, dotsplit:0, fused:0, fallback:0};

  for (const [form, ro] of forms){
    try { words[form] = build(form, ro); } catch (e){ errors.push(`${form} (${ro}): ${e.message}`); }
  }

  function build(form, ro){
    const units = alignUnits(form, ro);
    // union-find over unit indices
    const par = units.map((_, k) => k);
    const find = k => par[k] === k ? k : (par[k] = find(par[k]));
    const union = (a, b) => { par[find(b)] = find(a); };
    units.forEach((u, k) => {
      if (u.t === "a") union(units.findIndex(x => x.t === "C" && x.i === u.i), k);
      if (u.t === "A" && u.p === "̃"){ let q = k - 1; while (q >= 0 && units[q].t === "S") q--; if (q >= 0) union(q, k); }
      if (u.t === "A" && u.p === ""){ let q = k - 1; if (q >= 0) union(q, k); }
    });
    const unitAt = (kind, key, from, lenient) => {    // unused unit with this letter at or after char index `from`
      const same = u => u.key === key || (lenient && kind === "C" && u.key === key + "\u093C");
      return units.findIndex(u => !u.used && u.t !== "a" && u.t !== "S" && kindOf(u) === kind && same(u) && u.i >= from);
    };
    const kindOf = u => u.t === "A" ? (u.key === N("ँ") ? "B" : "A") : u.t;   // C M V A B

    // token split (spaces and hyphens)
    const tokens = []; { let cur = "", st = 0; [...form].forEach((c, i) => { if (c === " " || c === "-"){ if (cur) tokens.push({w:cur, st}); cur = ""; st = i + 1; } else cur += c; }); if (cur) tokens.push({w:cur, st}); }
    const seps = [...form].filter(c => c === " " || c === "-");

    // pass A: match glyph components to units, apply unions
    const plans = tokens.map(tok => {
      const gl = shape(tok.w);
      const cls = [...new Set(gl.map(g => g.cl))].sort((a, b) => a - b);
      const tokHasDotInU = gl.some(g => g.name.startsWith("uvowelsignnukta"));   // font draws ज़ु as ज + ु with the dot inside
      const items = gl.map(g => {
        const comps = parseName(g.name).filter(c => c.k !== "X").map(c => {
          const kind = c.k === "R" ? "C" : c.k;
          let key = N(c.ch); if (c.nukta && kind === "C") key = N(c.ch + "़");
          const k = unitAt(kind, key, tok.st + g.cl, tokHasDotInU);
          if (k < 0) throw new Error(`no unit for ${g.name} component ${kind}:${c.ch}`);
          units[k].used = true;
          const next = cls.find(x => x > g.cl);
          if (units[k].i >= tok.st + (next ?? 1e9)) throw new Error(`${g.name}: letter outside its cluster`);
          return {c, k};
        });
        return {g, comps};
      });
      return {tok, items};
    });
    units.forEach(u => delete u.used);

    for (const {items} of plans) for (const {g, comps} of items){
      const kinds = comps.map(x => x.c.k).join("");
      const cs = comps.filter(x => x.k != null);
      if (g.name.startsWith("uvowelsignnukta")){              // the nukta dot sits inside the ु glyph: merge ु into its consonant
        const m = cs.find(x => x.c.k === "M"); let p = m.k - 1; while (p >= 0 && units[p].t !== "C") p--;
        if (p >= 0) union(p, m.k);
        g.fallback = "nukta dot inside the vowel sign"; continue;
      }
      if (/^C{2,}$/.test(kinds.replace(/R/g, "C"))){ cs.slice(1).forEach(x => union(cs[0].k, x.k)); g.fused = true; continue; }
      if (/R/.test(kinds) && /[MV]/.test(kinds)){ cs.slice(1).forEach(x => union(cs[0].k, x.k)); g.fallback = "vowel sign fused with reph"; continue; }
    }

    // colours: groups in order of first unit
    const col = new Map(); let nc = 0;
    units.forEach((u, k) => { if (u.t === "S" || u.t === "a") return; const gr = find(k); if (!col.has(gr)) col.set(gr, nc++ % NCOL); });
    const colOf = k => col.get(find(k));

    // pass B: placements
    const toks = plans.map(({tok, items}) => {
      let x = 0, minX = 0, maxX = 0; const p = [];
      for (const {g, comps} of items){
        const cs = comps.filter(c => c.k != null);
        const groups = [...new Set(cs.map(c => find(c.k)))];
        const gx = x + g.ox, gy = g.oy;
        const upd = name => { need(name); const b = bbox(glyphs[name] || "M0,0"); minX = Math.min(minX, gx + b[0]); maxX = Math.max(maxX, gx + b[2]); };
        if (!cs.length){ x += g.ax; continue; }                          // zero-width placeholder
        if (g.fallback){ stat.fallback++; fallbacks.push(`${form}: ${g.name} (${g.fallback})`); }
        if (g.fused) stat.fused++;
        if (groups.length === 1){
          need(g.name); upd(g.name); p.push([g.name, gx, gy, colOf(cs[0].k)]); stat.single++;
        } else {
          const kinds = cs.map(c => c.c.k).join("");
          if (kinds === "CM" && cs[1].c.lig){                              // consonant + u/ū ligature: overlay
            const plain = g.name.replace(/uu?deva$/, "deva");
            need(g.name); need(plain); upd(g.name);
            p.push([g.name, gx, gy, colOf(cs[1].k), plain, colOf(cs[0].k)]); stat.overlay++;
          } else if (/^[MV]A$/.test(kinds)){                              // vowel sign + nasal consonant: split the dot off
            need(g.name);
            const cn = contours(glyphs[g.name]), dot = cn.filter(c => { const b = bbox(c); return b[2] - b[0] < 130 && b[3] - b[1] < 130 && b[1] > 600; });
            if (dot.length !== 1) throw new Error(`${g.name}: cannot find the nasal dot outline`);
            glyphs[g.name + "#r"] = cn.filter(c => !dot.includes(c)).join(""); glyphs[g.name + "#d"] = dot[0];
            upd(g.name);
            p.push([g.name + "#r", gx, gy, colOf(cs[0].k)], [g.name + "#d", gx, gy, colOf(cs[1].k)]); stat.dotsplit++;
          } else throw new Error(`${g.name} holds ${kinds} in different colour groups and has no split rule`);
        }
        x += g.ax;
      }
      return {vb:[Math.round(minX - 30), Math.round(Math.max(x, maxX) + 30 - (minX - 30))], p};
    });

    // romanisation spans
    const r = [];
    const push = (text, c, kind) => { const last = r[r.length - 1]; if (last && last[1] === c && last[2] === kind && kind !== "-") last[0] += text; else r.push([text, c, kind]); };
    units.forEach((u, k) => {
      if (u.t === "S"){ push(u.p, -1, "-"); return; }
      if (u.t === "a"){ push(u.p === "a" ? "a" : "(a)", colOf(units.findIndex(x => x.t === "C" && x.i === u.i)), u.p === "a" ? "i" : "s"); return; }
      if (u.t === "A" && u.p === "̃"){ for (let q = r.length - 1; q >= 0; q--) if (r[q][2] !== "s" && r[q][2] !== "-"){ r[q][0] += u.p; break; } return; }
      if (u.p === "") return;
      push(u.p, colOf(k), "");
    });
    r.forEach(s => { s[0] = s[0].normalize("NFC"); });
    return {t:toks, r, s:seps.join("")};
  }

  if (errors.length){ console.log(`${errors.length} form(s) failed:`); errors.forEach(e => console.log("  " + e)); process.exitCode = 1; }
  const out = {font:"Noto Sans Devanagari Regular (tools/fonts)", glyphs, words};
  fs.writeFileSync(OUT, JSON.stringify(out));
  console.log(`${Object.keys(words).length}/${forms.size} forms, ${Object.keys(glyphs).length} glyph outlines, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
  console.log(`glyph placements: ${JSON.stringify(stat)}`);
  if (fallbacks.length){ console.log(`fallbacks (groups merged, one colour; ${fallbacks.length}):`); fallbacks.forEach(f => console.log("  " + f)); }
}
main().catch(e => { console.error(e); process.exit(1); });
