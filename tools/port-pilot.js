"use strict";
// One-off: convert pilot/index.html's Unit 1 data into content/unit01.json and the Unit 1 ledger entry.
// Wrong-choice explanations are produced by running the pilot's own explain() so wording is unchanged.
const fs = require("fs"), path = require("path"), vm = require("vm");
const {ROOT, hiTokens} = require("./lib");

const html = fs.readFileSync(path.join(ROOT, "pilot/index.html"), "utf8");
const js = html.slice(html.indexOf('"use strict";'), html.indexOf("/* ---- views ---- */"));
const ctx = {window: {}, localStorage: {getItem: () => null, setItem() {}}, console};
vm.createContext(ctx);
vm.runInContext(js + "\n;globalThis.__P = {COURSE, TR, GLOSS, BE, STATIC, explain, ids};", ctx);
const {COURSE, TR, GLOSS, BE, STATIC, explain} = ctx.__P;

const vocab = COURSE.vocab.map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {}));
const wrongOf = it => it.opts.filter(o => o !== it.a).map(o => [o, explain(it, o)]);
const mc = (it, extra = {}) => Object.assign({id: it.id, t: "mc"}, it.q ? {q: it.q} : {}, it.hi ? {hi: it.hi} : {}, it.audio ? {audio: true} : {},
  it.say ? {say: it.say} : {}, it.en ? {en: it.en} : {}, {a: it.a, wrong: wrongOf(it)}, extra);
const byPrefix = p => Object.keys(STATIC).filter(k => k.startsWith(p)).map(k => STATIC[k]);

function tileWrong(it){
  return it.extra.map(w => {
    const m = it.ans.find(x => BE[w] && BE[x]) || it.ans.find(x => x.slice(0, 2) === w.slice(0, 2));
    if (m && BE[w]) return [w, `You used ${w}, which ${BE[w]}. This sentence needs ${m}.`];
    if (m) return [w, `You used ${w} where ${m} is needed. The form has to match the gender and number of the noun.`];
    const v = vocab.find(x => x.hi === w);
    return [w, `${w}${v ? ` (“${v.en}”)` : ""} does not belong in this sentence.`];
  });
}

const unit = {
  id: "unit1", n: 1, title: "I am Pratap", titleHi: "मैं · तुम · आप",
  scope: COURSE.scope, pages: "book 2–13",
  skills: {be: "Verb “to be”", plural: "Plurals", adj: "Adjective agreement", build: "Sentence building", usage: "Usage and word order"},
  vocab,
  gloss: GLOSS,
  distractors: {},
  lessons: [
    {id: "be", title: "हूँ, हो, है or हैं?", desc: "Pick the right form of “to be”", skill: "be", items: byPrefix("be:").map(it => mc(it))},
    {id: "plural", title: "One and many", desc: "Noun plurals by gender and ending", skill: "plural", items: byPrefix("pl:").map(it => mc(it, {q: it.q}))},
    {id: "adj", title: "Adjectives that agree", desc: "-ā, -e, -ī, or no change", skill: "adj", items: byPrefix("adj:").map(it => mc(it))},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build",
      items: byPrefix("tl:").map(it => Object.assign({id: it.id, t: "tiles", en: it.en, ans: it.ans, wrong: tileWrong(it)}, it.alt.length ? {alt: it.alt} : {}))},
    {id: "usage", title: "Usage and word order", desc: "Honorifics, questions, what a sentence means", skill: "usage", items: byPrefix("us:").map(it => mc(it))}
  ],
  test: {vocab: 5, be: 4, plural: 3, adj: 4, build: 3, usage: 3}
};

// Ledger: every Hindi form that appears as a prompt, sentence or right answer in Unit 1.
// Wrong-choice forms that are not real words go to distractors instead.
const taught = new Set(vocab.flatMap(v => hiTokens(v.hi)));
const collect = s => s && hiTokens(s).forEach(t => taught.add(t));
for (const l of unit.lessons) for (const it of l.items){
  [it.hi, it.say, it.a, it.q].forEach(collect);
  (it.ans || []).forEach(collect);
}
// Real words offered as wrong choices or extra tiles (pronouns, verb forms, adjective forms) are taught too.
const realWrong = new Set(["हूँ","हो","है","हैं","तुम","आप","मैं","वह","तू","ये","वे","यहाँ","काफ़ी","और","हम","अलमारी","कुरसी","लड़के","लड़कियाँ","लड़का","लड़की",
  "बड़े","बड़ी","बड़ा","छोटा","छोटे","छोटी","दूसरा","दूसरी","दूसरे","पुराना","पुराने","पुरानी","अच्छा","अच्छी","अच्छे","बूढ़ा","बूढ़ी","बूढ़े","कमरा","मकान","आदमी","मेज़","माता","पिता","चिड़िया","साइकिल","पंखा","नहीं","यह","हिन्दुस्तानी"]);
realWrong.forEach(t => taught.add(t));
for (const l of unit.lessons) for (const it of l.items) for (const [w, e] of it.wrong){
  hiTokens(w).forEach(t => { if (!taught.has(t)) unit.distractors[t] = TR[t]; });
  hiTokens(e).forEach(t => { if (!taught.has(t) && TR[t]) unit.distractors[t] = TR[t]; });
}
const forms = {};
[...taught].forEach(t => { if (!TR[t]) throw new Error("no romanisation in pilot for " + t); forms[t] = TR[t]; });
// Missing romanisations the pilot never needed are flagged by the validator.

const ledgerPath = path.join(ROOT, "content/ledger.json");
const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, "utf8")) : {};
ledger["1"] = {forms, grammar: [
  {id: "pronouns", title: "Personal pronouns मैं, हम, तू, तुम, आप, यह, वह, ये, वे"},
  {id: "be-present", title: "Present tense of होना: हूँ, हो, है, हैं"},
  {id: "kya-question", title: "Yes/no questions with क्या"},
  {id: "nahin", title: "Negation with नहीं before the verb"},
  {id: "gender", title: "Grammatical gender of nouns"},
  {id: "plural-direct", title: "Direct plural of nouns"},
  {id: "adj-agree", title: "Adjective agreement (-ā, -e, -ī; invariable adjectives)"},
  {id: "honorific-plural", title: "Honorific plural for respected people"},
  {id: "word-order", title: "Subject–object–verb order; attributive vs predicative adjective"}
], ...(ledger["1"] && ledger["1"].notes ? {notes: ledger["1"].notes} : {})};
fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 1) + "\n");
fs.writeFileSync(path.join(ROOT, "content/unit01.json"), JSON.stringify(unit, null, 1) + "\n");
console.log("unit01.json:", unit.lessons.map(l => `${l.id} ${l.items.length}`).join(", "), "| ledger forms", Object.keys(forms).length, "| distractors", Object.keys(unit.distractors).length);
