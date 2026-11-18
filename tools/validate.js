"use strict";
// Validates every content/unitNN.json against content/ledger.json. Exit code 1 on any error.
// Usage: node tools/validate.js [unitNumber]
const {hiTokens, words, alignTargets, loadUnits, loadLedger, isHi} = require("./lib");

const ledger = loadLedger();
const units = loadUnits();
const only = process.argv[2] ? +process.argv[2] : null;
let errors = 0, warnings = 0;
const err = (u, where, msg) => { errors++; console.log(`ERROR unit${u.n} ${where}: ${msg}`); };
const warn = (u, where, msg) => { warnings++; console.log(`warn  unit${u.n} ${where}: ${msg}`); };

// All romanisations known anywhere (ledger of every unit + every unit's distractors).
const allTr = {};
for (const k of Object.keys(ledger)) Object.assign(allTr, ledger[k].forms);
const ledgerForms = new Set(); for (const k of Object.keys(ledger)) Object.keys(ledger[k].forms).forEach(f => ledgerForms.add(f));
for (const u of units) Object.assign(allTr, u.distractors || {});

// Sound-colour glyph data (content/glyphs.json, from tools/glyphs.js) must cover every taught form.
{
  const fs = require("fs"), path = require("path");
  const gf = path.join(__dirname, "../content/glyphs.json");
  if (fs.existsSync(gf)){
    const g = JSON.parse(fs.readFileSync(gf, "utf8"));
    const miss = Object.keys(allTr).filter(f => ledgerForms.has(f) && !g.words[f]);
    if (miss.length){ errors++; console.log(`ERROR glyphs.json: ${miss.length} ledger form(s) have no sound-colour data (run node tools/glyphs.js): ${miss.slice(0, 8).join(" ")}${miss.length > 8 ? " …" : ""}`); }
  }
}
for (const u of units){
  if (only && u.n !== only) continue;
  const taught = new Set();
  for (const k of Object.keys(ledger)) if (+k <= u.n) Object.keys(ledger[k].forms).forEach(f => taught.add(f));
  if (!ledger[String(u.n)]) err(u, "ledger", "no ledger entry for this unit");
  const dis = u.distractors || {};
  const gloss = Object.assign({}, ...units.filter(x => x.n <= u.n).map(x => x.gloss || {}));
  const hasTr = t => allTr[t] != null && allTr[t] !== "";
  const checkTr = (where, s) => s && hiTokens(s).forEach(t => { if (!hasTr(t)) err(u, where, `no romanisation for “${t}”`); });
  const checkTaught = (where, s) => s && hiTokens(s).forEach(t => { if (!taught.has(t)) err(u, where, `“${t}” is not in the ledger for unit ${u.n} or earlier`); });
  const checkWrongForm = (where, s) => s && hiTokens(s).forEach(t => { if (!taught.has(t) && !(t in dis)) err(u, where, `wrong choice “${t}” is neither taught nor declared in distractors`); });
  const checkAlign = (where, en, hiSentence) => {
    if (!en) return;
    const toks = words(hiSentence), tg = alignTargets(en);
    if (!tg.length) err(u, where, "English sentence has no alignment marks");
    tg.forEach(i => { if (i < 0 || i >= toks.length) err(u, where, `alignment mark [${i}] is outside the ${toks.length}-word sentence`); });
    toks.forEach((w, i) => { const c = w.replace(/[।?!,.…]/g, ""); if (isHi(c) && !tg.includes(i) && !gloss[c]) err(u, where, `Hindi word ${i} “${c}” is neither aligned nor glossed`); });
  };

  // Vocabulary
  const seenV = new Set();
  (u.vocab || []).forEach((v, i) => {
    const w = `vocab[${i}] ${v.hi}`;
    if (!v.hi || !v.en || !v.c) err(u, w, "needs hi, en and c");
    if (v.c === "n" && !/^[mf]$/.test(v.g || "")) err(u, w, "noun needs gender m or f");
    if (seenV.has(v.hi)) err(u, w, "duplicate vocabulary entry"); seenV.add(v.hi);
    checkTr(w, v.hi); checkTaught(w, v.hi);
  });
  for (const t of Object.keys(dis)) if (!dis[t]) err(u, "distractors", `“${t}” has no romanisation`);

  const ids = new Set(), lessonIds = new Set();
  let count = 0;
  for (const l of u.lessons || []){
    if (lessonIds.has(l.id)) err(u, l.id, "duplicate lesson id"); lessonIds.add(l.id);
    if (["words", "listen", "match", "test", "mistakes"].includes(l.id)) err(u, l.id, "reserved lesson id");
    if (!["vocab","listen","build"].includes(l.skill) && (!u.skills || !u.skills[l.skill])) err(u, l.id, `skill “${l.skill}” not declared in unit skills`);
    checkTr(l.id + " title", l.title);
    for (const it of l.items){
      count++;
      const w = `${l.id}/${it.id}`;
      if (!it.id) { err(u, l.id, "item without id"); continue; }
      if (ids.has(it.id)) err(u, w, "duplicate item id"); ids.add(it.id);
      if (it.skill && !u.skills[it.skill]) err(u, w, `skill “${it.skill}” not declared`);
      const wrong = it.wrong || [];
      wrong.forEach(([c, e], k) => {
        if (!e || !String(e).trim()) err(u, w, `wrong choice “${c}” has no explanation`);
        checkTr(w + " wrong", c); checkWrongForm(w + " wrong", c); checkTr(w + " explanation", e);
      });
      [it.q, it.why].forEach(s => checkTr(w, s));
      if (it.t === "mc"){
        if (it.a == null) err(u, w, "no answer");
        const opts = [it.a, ...wrong.map(x => x[0])];
        if (new Set(opts).size !== opts.length) err(u, w, "choices contain duplicates (or the answer is also listed as wrong)");
        if (wrong.length < 2) err(u, w, "needs at least two wrong choices");
        if (!opts.includes(it.a)) err(u, w, "answer missing from choices");
        [it.hi, it.say, it.a].forEach(s => { checkTr(w, s); checkTaught(w, s); });
        if (isHi(it.a) !== wrong.every(x => isHi(x[0])) && wrong.length) warn(u, w, "answer and wrong choices mix scripts");
        if (it.en){
          if (!it.say) err(u, w, "en alignment given without say");
          else checkAlign(w, it.en, it.say);
        }
        if (it.hi && it.hi.includes("___") && !it.say) warn(u, w, "gap item without say: no audio or alignment after answering");
      } else if (it.t === "tiles"){
        if (!Array.isArray(it.ans) || !it.ans.length) { err(u, w, "tiles item needs ans"); continue; }
        it.ans.forEach(t => { checkTr(w, t); checkTaught(w, t); });
        (it.alt || []).forEach(a => { a.forEach(t => checkTaught(w + " alt", t)); const pool = it.ans.slice(); if (!a.every(t => { const i = pool.indexOf(t); if (i < 0) return false; pool.splice(i, 1); return true; })) err(u, w, "alt answer may only use tiles from ans"); });
        if (wrong.length < 2) err(u, w, "needs at least two extra tiles");
        wrong.forEach(([c]) => { if (it.ans.includes(c)) err(u, w, `extra tile “${c}” is also in the answer`); });
        if (new Set(wrong.map(x => x[0])).size !== wrong.length) err(u, w, "duplicate extra tiles");
        checkAlign(w, it.en, it.ans.join(" "));
      } else err(u, w, `unknown item type “${it.t}”`);
    }
  }
  for (const k of Object.keys(u.test || {})) if (k !== "vocab" && !lessonIds.has(k)) err(u, "test", `test draws from unknown lesson “${k}”`);
  const vocabItems = (u.vocab || []).length;
  console.log(`unit${u.n}: ${count} fixed items in ${(u.lessons || []).length} lessons, ${vocabItems} vocabulary words`);
}
console.log(errors ? `\n${errors} error(s), ${warnings} warning(s)` : `\nOK, ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
