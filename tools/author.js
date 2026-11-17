"use strict";
// Helpers for content/authoring/unitNN.js scripts. Each script declares the unit's taught forms
// (with romanisation) and any wrong-only forms, builds items, and calls writeUnit().
// writeUnit() fills the unit's ledger entry with every taught form actually used and refuses
// any Hindi token that is neither taught (this unit or earlier) nor declared as a distractor.
const fs = require("fs"), path = require("path");
const {ROOT, hiTokens, loadLedger} = require("./lib");

const plainEn = s => s.replace(/\[[\d+]+\]/g, "").replace(/[{}]/g, "");

// Gap-fill item: the English (with alignment marks) is shown as the cue.
function gap(id, hi, en, a, wrong, why, extra = {}){
  return Object.assign({id, t: "mc", q: `Fill the gap: “${plainEn(en)}”`, hi, say: hi.replace("___", a), en, a, wrong}, why ? {why} : {}, extra);
}
// Meaning item: a Hindi sentence, choose the English.
function meaning(id, hi, a, wrong, why){
  return Object.assign({id, t: "mc", q: "What does this sentence mean?", hi, audio: true, a, wrong}, why ? {why} : {});
}
const mc = (id, q, a, wrong, why, extra = {}) => Object.assign({id, t: "mc", q, a, wrong}, why ? {why} : {}, extra);
const tiles = (id, en, ans, wrong, extra = {}) => Object.assign({id, t: "tiles", en, ans, wrong}, extra);

// Agreement explanations for -ā adjectives (and कैसा/कितना).
function agreeWhy(chosen){
  if (/(ी|ई)$/.test(chosen)) return `${chosen} is the -ī form, which goes with feminine nouns, singular or plural.`;
  if (/(े|ए)$/.test(chosen)) return `${chosen} is the -e form, which goes with masculine plural nouns and with आप, तुम and respected people.`;
  if (/(ा|या)$/.test(chosen)) return `${chosen} is the -ā form, which goes only with a masculine singular noun.`;
  return `${chosen} is not the right form here.`;
}

function writeUnit(n, unit, {forms, fake = {}}){
  const ledgerPath = path.join(ROOT, "content/ledger.json");
  const ledger = loadLedger();
  const earlier = new Set();
  Object.keys(ledger).filter(k => +k < n).forEach(k => Object.keys(ledger[k].forms).forEach(f => earlier.add(f)));
  const used = {}, distractors = {}, problems = [];
  const take = (s, where, wrongOnly) => hiTokens(s || "").forEach(t => {
    if (earlier.has(t)) return;
    if (forms[t] != null) { used[t] = forms[t]; return; }
    if (fake[t] != null) { if (!wrongOnly) problems.push(`${where}: “${t}” is a distractor form but appears outside a wrong choice/explanation`); distractors[t] = fake[t]; return; }
    problems.push(`${where}: “${t}” is neither taught nor declared`);
  });
  unit.vocab.forEach(v => take(v.hi, "vocab"));
  for (const l of unit.lessons){
    take(l.title, l.id);
    for (const it of l.items){
      [it.hi, it.say, it.a, it.q, it.why, it.order].forEach(s => take(s, it.id));
      (it.ans || []).forEach(s => take(s, it.id));
      (it.wrong || []).forEach(([c, e]) => { take(c, it.id + " wrong", true); take(e, it.id + " explanation", true); });
    }
  }
  Object.keys(unit.gloss || {}).forEach(g => take(g, "gloss"));
  if (problems.length){ console.error(problems.join("\n")); process.exit(1); }
  unit.distractors = distractors;
  const prev = ledger[String(n)] || {};
  ledger[String(n)] = {forms: used, grammar: unit._grammar || prev.grammar || []};
  delete unit._grammar;
  const ordered = {};
  Object.keys(ledger).sort((a, b) => a - b).forEach(k => ordered[k] = ledger[k]);
  fs.writeFileSync(ledgerPath, JSON.stringify(ordered, null, 1) + "\n");
  const file = path.join(ROOT, `content/unit${String(n).padStart(2, "0")}.json`);
  fs.writeFileSync(file, JSON.stringify(unit, null, 1) + "\n");
  const unusedForms = Object.keys(forms).filter(f => !used[f] && !earlier.has(f));
  const count = unit.lessons.reduce((a, l) => a + l.items.length, 0);
  console.log(`unit${n}: ${count} items, ${Object.keys(used).length} new ledger forms, ${Object.keys(distractors).length} distractors` + (unusedForms.length ? `\n  declared but unused: ${unusedForms.join(" ")}` : ""));
}

module.exports = {gap, meaning, mc, tiles, agreeWhy, writeUnit, plainEn};
