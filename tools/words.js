"use strict";
// Writes content/words.json, the index behind the word pages: for every headword in the units' vocabulary,
// its meanings, the ledger forms that belong to it (with what each form is), related words, notes, and
// the items that show it in a sentence. The app hides whatever belongs to a unit that isn't open yet.
//
// Forms are generated forward from each headword's part of speech and gender (and content/authoring/words.js
// for irregular verbs and pronouns), then kept only if the ledger has them. So a form can only ever be a
// taught form, and one form may belong to several headwords (की: का and करना).
// Usage: node tools/words.js [--report]   Re-run after a unit adds words; tools/validate.js fails if the file is stale.
const fs = require("fs"), path = require("path");
const {ROOT, CONTENT, hiTokens, loadUnits, loadLedger} = require("./lib");
const OUT = path.join(CONTENT, "words.json");

// kind id → [group, label, grammar id]. The grammar id (content/ledger.json) gives the unit a label appears from.
const G = {noun: "Plural and oblique", adj: "Agreement", imp: "Commands", inf: "Infinitive", vala: "With वाला", impf: "Imperfective participle (-tā)",
  perf: "Perfective participle", cont: "Continuous (with a stem)", subj: "Subjunctive", fut: "Future", cp: "Conjunctive participle", be: "Present of होना",
  was: "Past of होना", pr: "Pronoun forms"};
const KINDS = {
  "n-pl": [G.noun, "plural", "plural-direct"], "n-e": [G.noun, "plural, oblique singular", "plural-direct"],
  "n-oblpl": [G.noun, "oblique plural", "oblique-nouns"], "n-voc": [G.noun, "vocative plural", "vocative"],
  "a-f": [G.adj, "feminine", "adj-agree"], "a-e": [G.adj, "masculine plural, oblique", "adj-agree"],
  "imp-tu": [G.imp, "stem, तू command", "imperative"], "imp-tum": [G.imp, "तुम command", "imperative"],
  "imp-ap": [G.imp, "आप command", "imperative"], "imp-apg": [G.imp, "आप command, extra polite", "imperative"],
  "inf-obl": [G.inf, "oblique infinitive", "verbal-noun"], "inf-f": [G.inf, "infinitive agreeing with a feminine", "chahie-infinitive"],
  "vala-ms": [G.vala, "masculine", "vala"], "vala-f": [G.vala, "feminine", "vala"], "vala-mp": [G.vala, "masculine plural, oblique", "vala"],
  "impf-ms": [G.impf, "masculine", "imperfective-present"], "impf-mp": [G.impf, "masculine plural", "imperfective-present"],
  "impf-f": [G.impf, "feminine", "imperfective-present"], "impf-fp": [G.impf, "feminine plural", "imperfective-present"],
  "perf-ms": [G.perf, "masculine", "perfective-participle"], "perf-mp": [G.perf, "masculine plural", "perfective-participle"],
  "perf-f": [G.perf, "feminine", "perfective-participle"], "perf-fp": [G.perf, "feminine plural", "perfective-participle"],
  "cont-ms": [G.cont, "masculine", "continuous"], "cont-mp": [G.cont, "masculine plural", "continuous"],
  "cont-f": [G.cont, "feminine", "continuous"], "cont-fp": [G.cont, "feminine plural", "continuous"],
  "subj-1": [G.subj, "मैं", "subjunctive"], "subj-3": [G.subj, "तू, यह, वह", "subjunctive"], "subj-tum": [G.subj, "तुम", "subjunctive"], "subj-pl": [G.subj, "हम, आप, ये, वे", "subjunctive"],
  "fut-1m": [G.fut, "मैं, masculine", "future"], "fut-1f": [G.fut, "मैं, feminine", "future"], "fut-3m": [G.fut, "तू, यह, वह, masculine", "future"], "fut-3f": [G.fut, "तू, यह, वह, feminine", "future"],
  "fut-tumm": [G.fut, "तुम, masculine", "future"], "fut-tumf": [G.fut, "तुम, feminine", "future"], "fut-plm": [G.fut, "हम, आप, ये, वे, masculine", "future"], "fut-plf": [G.fut, "हम, आप, ये, वे, feminine", "future"],
  "cp-kar": [G.cp, "with -kar", "conjunctive-participle"], "cp-ke": [G.cp, "with -ke", "conjunctive-participle"],
  "be-1": [G.be, "मैं", "be-present"], "be-3": [G.be, "तू, यह, वह", "be-present"], "be-tum": [G.be, "तुम", "be-present"], "be-pl": [G.be, "हम, आप, ये, वे", "be-present"],
  "was-ms": [G.was, "masculine", "be-past"], "was-mp": [G.was, "masculine plural", "be-past"], "was-f": [G.was, "feminine", "be-past"], "was-fp": [G.was, "feminine plural", "be-past"],
  "pr-pl": [G.pr, "plural", "pronouns"], "pr-obl": [G.pr, "oblique", "oblique-pronouns"], "pr-oblpl": [G.pr, "oblique plural", "oblique-pronouns"],
  "pr-ko": [G.pr, "with को, short form", "pronoun-ko-short"], "pr-kopl": [G.pr, "plural with को, short form", "pronoun-ko-short"],
  "pr-poss": [G.pr, "possessive", "possessives"], "pr-posspl": [G.pr, "possessive, plural", "possessives"], "pr-se": [G.pr, "with से", "oblique-pronouns"],
  "pr-hi": [G.pr, "with ही", "emphatic-hi"], "pr-ne": [G.pr, "with ने", "ne-pronouns"], "pr-ko-full": [G.pr, "with को", "ko-construction"], "pr-hi-obl": [G.pr, "oblique with ही", "emphatic-hi"], "pr-hi-oblpl": [G.pr, "oblique plural with ही", "emphatic-hi"]
};
const KORDER = Object.keys(KINDS);

const MATRA = {"ा":"आ", "ि":"इ", "ी":"ई", "ु":"उ", "ू":"ऊ", "े":"ए", "ै":"ऐ", "ो":"ओ", "ौ":"औ"};
const INDEP = Object.fromEntries(Object.entries(MATRA).map(([m, v]) => [v, m]));
const last = s => s.slice(-1);
// Stem class: C consonant-final, A ā/o-final, U ū-final, I ī-final, E e-final (ले, दे)
function stemClass(s){
  const c = last(s);
  if (c === "ा" || c === "आ" || c === "ो" || c === "ओ") return "A";
  if (c === "ू" || c === "ऊ") return "U";
  if (c === "ी" || c === "ई") return "I";
  if (c === "े" || c === "ए") return "E";
  return "C";
}
// add a vowel-initial suffix written with its matra (e.g. "ो", "िए"): after a vowel use the independent letter
const addV = (s, suf) => /[ािीुूेैोौआइईउऊएऐओऔ]$/.test(s) && MATRA[suf[0]] ? s + MATRA[suf[0]] + suf.slice(1) : s + suf;
const shortV = s => s.replace(/ी$/, "ि").replace(/ई$/, "इ").replace(/ू$/, "ु").replace(/ऊ$/, "उ");

function verbForms(head){
  const S = head.slice(0, -2), cls = stemClass(S), out = [];
  const add = (f, k, irr) => out.push([f, k, !!irr]);
  ["ता:impf-ms", "ते:impf-mp", "ती:impf-f", "तीं:impf-fp", "ने:inf-obl", "नी:inf-f", "नेवाला:vala-ms", "नेवाली:vala-f", "नेवाले:vala-mp", "कर:cp-kar", "के:cp-ke"]
    .forEach(x => { const [suf, k] = x.split(":"); add(S + suf, k); });
  add(S, "imp-tu");
  if (cls === "C"){
    add(S + "ो", "imp-tum subj-tum"); add(S + "िए", "imp-ap"); add(S + "िएगा", "imp-apg");
    add(S + "ूँ", "subj-1"); add(S + "े", "subj-3 perf-mp"); add(S + "ें", "subj-pl");
    add(S + "ा", "perf-ms"); add(S + "ी", "perf-f"); add(S + "ीं", "perf-fp");
    [["ूँगा","fut-1m"],["ूँगी","fut-1f"],["ेगा","fut-3m"],["ेगी","fut-3f"],["ोगे","fut-tumm"],["ोगी","fut-tumf"],["ेंगे","fut-plm"],["ेंगी","fut-plf"]].forEach(([s, k]) => add(S + s, k));
  } else if (cls === "E"){
    const b = S.slice(0, -1); // ल, द
    add(b + "ूँ", "subj-1", 1); add(S, "subj-3", 1); add(b + "ो", "subj-tum", 1); add(S + "ं", "subj-pl", 1);
    [["ूँगा","fut-1m"],["ूँगी","fut-1f"],["ेगा","fut-3m"],["ेगी","fut-3f"],["ोगे","fut-tumm"],["ोगी","fut-tumf"],["ेंगे","fut-plm"],["ेंगी","fut-plf"]].forEach(([s, k]) => add(b + s, k, 1));
  } else {
    const T = cls === "A" ? S : shortV(S); // पी → पि, छू → छु before a vowel
    if (cls === "I"){ add(T + "यो", "imp-tum subj-tum"); add(T + "ओ", "imp-tum subj-tum"); }
    else { add(T + "ओ", "imp-tum subj-tum"); add(T + "इए", "imp-ap"); add(T + "इएगा", "imp-apg"); }
    add(T + "ऊँ", "subj-1"); add(T + "ए", "subj-3 perf-mp"); add(T + "एँ", "subj-pl");
    add(T + "या", "perf-ms"); add(T + "ये", "perf-mp");
    if (cls === "I"){ add(S, "perf-f"); add(S + "ं", "perf-fp"); }
    else { add(T + "ई", "perf-f"); add(T + "यी", "perf-f"); add(T + "ईं", "perf-fp"); add(T + "यीं", "perf-fp"); }
    if (cls === "U") add(T + "आ", "perf-ms");
    [["ऊँगा","fut-1m"],["ऊँगी","fut-1f"],["एगा","fut-3m"],["एगी","fut-3f"],["ओगे","fut-tumm"],["ओगी","fut-tumf"],["एँगे","fut-plm"],["एँगी","fut-plf"],["योगे","fut-tumm"],["योगी","fut-tumf"]]
      .forEach(([s, k]) => add(T + s, k));
  }
  return out;
}
function nounForms(head, g){
  const out = [], add = (f, k) => out.push([f, k, false]), c = last(head);
  if (g === "m"){
    if (c === "ा"){ const s = head.slice(0, -1); add(s + "े", "n-e"); add(s + "ों", "n-oblpl"); add(s + "ो", "n-voc"); }
    else if (c === "ी" || c === "ई"){ const s = shortV(head); add(s + "यों", "n-oblpl"); add(s + "यो", "n-voc"); }
    else if (c === "ू" || c === "ऊ"){ const s = shortV(head); add(s + "ओं", "n-oblpl"); add(s + "ओ", "n-voc"); }
    else { add(addV(head, "ों"), "n-oblpl"); add(addV(head, "ो"), "n-voc"); }
  } else {
    if (/िया$/.test(head)){ add(head + "ँ", "n-pl"); add(head.slice(0, -1) + "ों", "n-oblpl"); add(head.slice(0, -1) + "ो", "n-voc"); }
    else if (c === "ी" || c === "ई" || c === "ि"){ const s = shortV(head); add(s + "याँ", "n-pl"); add(s + "यों", "n-oblpl"); add(s + "यो", "n-voc"); }
    else if (c === "ू" || c === "ऊ"){ const s = shortV(head); add(s + "एँ", "n-pl"); add(s + "ओं", "n-oblpl"); add(s + "ओ", "n-voc"); }
    else if (c === "ा"){ add(head + "एँ", "n-pl"); add(head + "ओं", "n-oblpl"); add(head + "ओ", "n-voc"); }
    else { add(addV(head, "ें"), "n-pl"); add(addV(head, "ों"), "n-oblpl"); add(addV(head, "ो"), "n-voc"); }
  }
  return out;
}
function adjForms(head){
  if (/ाँ$/.test(head)){ const s = head.slice(0, -2); return [[s + "ीं", "a-f", false], [s + "ें", "a-e", false], [s.replace(/य$/, "") + "ईं", "a-f", false], [s.replace(/य$/, "") + "एँ", "a-e", false]]; } // पाँचवाँ, बायाँ
  if (last(head) !== "ा") return [];
  const s = head.slice(0, -1), out = [["" + s + "ी", "a-f", false], [s + "े", "a-e", false]];
  if (/या$/.test(head)){ const b = head.slice(0, -2); out.push([b + "ई", "a-f", false], [b + "ए", "a-e", false]); }
  return out;
}

// an English sense, for matching: lower case, quotes dropped, leading article dropped; "?" and qualifiers in brackets are kept
const normSense = s => s.toLowerCase().replace(/[“”"'!.]/g, "").replace(/\s+/g, " ").trim().replace(/^(a|an|the) /, "");
const SECOND = new Set(["घर", "वाला", "दार", "ख़ाना", "भर", "पन", "गार"]);
const STOP = new Set(["be", "is", "it", "one", "so", "then", "thing", "matter", "also", "some", "very", "here", "there", "now", "only", "just", "and", "or"]);

function build(){
  const T = require("../content/authoring/words");
  const units = loadUnits(), ledger = loadLedger(), problems = [];
  const FU = {}; Object.keys(ledger).sort((a, b) => a - b).forEach(k => Object.keys(ledger[k].forms).forEach(f => { if (FU[f] == null) FU[f] = +k; }));
  const GU = {}; Object.keys(ledger).forEach(k => ledger[k].grammar.forEach(g => { if (GU[g.id] == null) GU[g.id] = +k; }));
  for (const [k, [, , gid]] of Object.entries(KINDS)) if (GU[gid] == null) problems.push(`kind ${k}: grammar id “${gid}” is not in the ledger`);

  // headwords and their senses
  const H = {};
  units.forEach(u => u.vocab.forEach(v => {
    const h = H[v.hi] || (H[v.hi] = {s: [], f: new Map(), r: new Map(), n: [], w: [], x: []});
    if (!h.s.some(s => s[1] === v.c && s[3] === v.en)) h.s.push([u.n, v.c, v.g || "", v.en]);
  }));
  const isHead = h => !!H[h];
  const claim = (head, form, kinds, irr) => {
    if (form === head || FU[form] == null) return;
    if (T.notForm.some(([f, hh]) => f === form && hh === head)) return;
    const e = head && H[head].f.get(form) || {k: new Set(), irr: false};
    kinds.split(" ").forEach(k => { if (!KINDS[k]) problems.push(`unknown kind “${k}” for ${form}`); e.k.add(k); });
    e.irr = e.irr || !!irr;
    H[head].f.set(form, e);
  };
  for (const [hi, h] of Object.entries(H)){
    if (/\s/.test(hi)) continue;
    const cs = new Set(h.s.map(s => s[1]));
    if (cs.has("v") && /ना$/.test(hi) && !/^(था|थी|थे|थीं)$/.test(hi)) verbForms(hi).forEach(([f, k, irr]) => claim(hi, f, k, irr));
    h.s.filter(s => s[1] === "n").forEach(s => nounForms(hi, s[2]).forEach(([f, k]) => claim(hi, f, k)));
    if (cs.has("a") || (cs.has("p") && last(hi) === "ा") || T.inflectLikeA.includes(hi)) adjForms(hi).forEach(([f, k]) => claim(hi, f, k));
  }
  const tab = (t, irr) => { for (const [hd, fs] of Object.entries(t)){ if (!isHead(hd)) { problems.push(`words.js: “${hd}” is not a headword`); continue; }
    for (const [f, k] of Object.entries(fs)) claim(hd, f, k, irr); } }; // forms not in the ledger yet are skipped by claim()
  tab(T.irregular, true); tab(T.alsoKinds, false); tab(T.pronouns, false);

  // form → headwords
  const OF = {};
  for (const [hi, h] of Object.entries(H)) for (const f of h.f.keys()) (OF[f] = OF[f] || []).push(hi);

  // every other ledger form gets a plain page (no meanings), so it can still show its parts and sentences
  const plain = Object.keys(FU).filter(f => !H[f] && !OF[f] && !/\s/.test(f));
  plain.forEach(f => { H[f] = {s: [], f: new Map(), r: new Map(), n: [], w: [], x: []}; });
  const resolve = x => H[x] && H[x].s.length ? [x] : OF[x] || (H[x] ? [x] : []);

  // related words
  const rel = (a, b, kind, note) => { if (a === b || !H[a] || !H[b]) return; if (T.notRelated.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return;
    if (!H[a].r.has(b)) H[a].r.set(b, note ? [kind, note] : [kind]); };
  // same meaning: a shared English sense within one part of speech
  const bySense = {};
  for (const [hi, h] of Object.entries(H)) h.s.forEach(([, c, , en]) => en.split(/[,;]/).map(normSense).forEach(x => {
    if (x.length < 3 || STOP.has(x) || /[ऀ-ॿ]/.test(x) || /^\d/.test(x)) return;
    const k = c + "|" + x; (bySense[k] = bySense[k] || new Set()).add(hi);
  }));
  const kin = (a, b) => (OF[a] || []).includes(b) || (OF[b] || []).includes(a) || (OF[a] || []).some(x => (OF[b] || []).includes(x));
  for (const [k, set] of Object.entries(bySense)) if (set.size > 1 && set.size <= 6) for (const a of set) for (const b of set) if (!kin(a, b)) rel(a, b, "syn", k.split("|")[1].replace(/^to /, ""));
  // opposites and hand-listed same-root verbs
  T.opposites.forEach(([a, b]) => { if (!isHead(a) || !isHead(b)) problems.push(`words.js opposites: “${isHead(a) ? b : a}” is not a headword`); rel(a, b, "opp"); rel(b, a, "opp"); });
  T.sameRoot.forEach(([a, b]) => { if (!isHead(a) || !isHead(b)) problems.push(`words.js sameRoot: “${isHead(a) ? b : a}” is not a headword`); });
  // verbs from one root: बनना / बनाना / बनवाना, सीखना / सिखाना, जागना / जगाना …
  const verbs = Object.keys(H).filter(hi => !/\s/.test(hi) && /ना$/.test(hi) && H[hi].s.some(s => s[1] === "v"));
  const stemOf = new Map(verbs.map(v => [v.slice(0, -2), v]));
  const vary = s => { // one vowel of the stem shortened (or ā dropped), as in a causative or a transitive pair
    const out = new Set([s]);
    for (let i = 0; i < s.length; i++){
      const c = s[i], sw = {"ा":[""], "ी":["ि"], "ू":["ु"], "ो":["ु"]}[c];
      if (sw) sw.forEach(r => out.add(s.slice(0, i) + r + s.slice(i + 1)));
    }
    return out;
  };
  const parent = {}; const find = x => parent[x] && parent[x] !== x ? (parent[x] = find(parent[x])) : x;
  const join = (a, b) => { parent[find(a)] = find(b); };
  verbs.forEach(v => parent[v] = v);
  for (const v of verbs){
    const S = v.slice(0, -2);
    for (const t of vary(S)) for (const suf of ["ा", "वा"]){ const w = stemOf.get(t + suf); if (w && w !== v) join(v, w); }
  }
  T.sameRoot.forEach(([a, b]) => { if (parent[a] && parent[b]) join(a, b); });
  const fam = {}; verbs.forEach(v => (fam[find(v)] = fam[find(v)] || []).push(v));
  Object.values(fam).forEach(vs => { if (vs.length > 1) vs.forEach(a => vs.forEach(b => rel(a, b, "root"))); });
  // masculine / feminine pairs of nouns: लड़का / लड़की, धोबी / धोबिन
  const nouns = g => Object.keys(H).filter(hi => H[hi].s.some(s => s[1] === "n" && s[2] === g));
  // only for people and animals, judged from the English, so ताला / ताली and चोर / चोरी are not paired
  const LIVING = /\b(boy|girl|son|daughter|man|woman|husband|wife|brother|sister|father|mother|grand\w*|uncle|aunt|king|queen|student|pupil|teacher|servant|friend|washer\w*|actor|actress|dog|bitch|horse|mare|cat|cow|bull|bird|child|person|neighbour|relative|guest|god|goddess)\b/i;
  const living = hi => H[hi].s.some(s => s[1] === "n" && LIVING.test(s[3]));
  const fem = new Set(nouns("f").filter(living));
  nouns("m").filter(living).forEach(m => {
    const s = last(m) === "ा" ? m.slice(0, -1) : shortV(m);
    [s + "ी", s + "िया", s + "न", s + "िन", s + "इन", m + "नी", m + "ा", m + "ानी"].forEach(f => { if (fem.has(f)){ rel(m, f, "pair"); rel(f, m, "pair"); } });
  });
  // phrases and compounds: खान मार्केट, बंद करना, बहुत-सारा, रसोईघर, दूधवाला
  for (const hi of Object.keys(H)){
    const parts = hi.split(/[\s-]+/);
    if (parts.length > 1){ parts.forEach(p => { if (H[p]){ rel(hi, p, "part"); rel(p, hi, "in"); } }); continue; }
    // one-word compounds: both halves real headwords of 3+ letters (or a common second half such as घर, वाला);
    // a plain page may also start with a form (रिक्शे-वाला → रिक्शा)
    const cp = [...hi], isPlain = !H[hi].s.length, real = x => H[x] && H[x].s.length;
    for (let i = 2; i <= cp.length - 2; i++){
      const a = cp.slice(0, i).join(""), b0 = cp.slice(i).join(""), b = /^वाल[ेी]$/.test(b0) ? "वाला" : b0;
      if (/^[ािीुूेैोौंँ्ृ़]/.test(b0) || !real(b)) continue;
      if (!(SECOND.has(b) || ([...b].length >= 3 && i >= 3))) continue;
      const A = real(a) && i >= 3 ? [a] : isPlain || SECOND.has(b) ? (OF[a] || []).filter(x => [...x].length >= 3) : [];
      if (!A.length) continue;
      A.forEach(x => { rel(hi, x, "part"); rel(x, hi, "in"); }); rel(hi, b, "part"); rel(b, hi, "in");
    }
  }

  // notes: hand-written, and gender against the usual ending
  for (const [hd, ns] of Object.entries(T.notes)){
    if (!isHead(hd)) { problems.push(`words.js notes: “${hd}” is not a headword`); continue; }
    ns.forEach(([u, text]) => {
      hiTokens(text).forEach(t => { if (FU[t] == null || FU[t] > u) problems.push(`words.js notes ${hd}: “${t}” is not taught by unit ${u}`); });
      H[hd].n.push([u, text]);
    });
  }
  for (const [hi, h] of Object.entries(H)) h.s.forEach(([u, c, g, en]) => {
    if (c !== "n" || /^[A-Z]/.test(en) || /\s/.test(hi)) return;
    if (g === "m" && /[ीई]$/.test(hi)) h.n.push([u, "Masculine, although it ends in -ī like many feminine nouns."]);
    if (g === "f" && /ा$/.test(hi) && !/िया$/.test(hi)) h.n.push([u, "Feminine, although it ends in -ā like many masculine nouns."]);
  });

  // rules from the items (their “why”), and example sentences
  const items = [];
  units.forEach(u => u.lessons.forEach(l => l.items.forEach(it => items.push({u: u.n, it,
    sent: it.t === "tiles" ? it.ans.join(" ") : it.say && it.en ? it.say : null,
    whyT: it.why ? new Set(hiTokens(it.why)) : null}))));
  for (const [hi, h] of Object.entries(H)){
    const forms = new Set([hi, ...h.f.keys()]), multi = /\s/.test(hi);
    const has = (s, set) => multi ? (" " + hiTokens(s).join(" ") + " ").includes(" " + hi + " ") : hiTokens(s).some(t => set.has(t));
    // an item's rule note counts only if it names this word or one of its forms (the word, not just the item's answer)
    const mention = [], seenWhy = new Set();
    items.forEach(x => {
      if (!x.it.why || seenWhy.has(x.it.why)) return;
      if (mention.some(m => m.it.why.includes(x.it.why) || x.it.why.includes(m.it.why))) return; // one note repeating another
      if (multi ? x.it.why.includes(hi) : [...x.whyT].some(t => forms.has(t))){ mention.push(x); seenWhy.add(x.it.why); }
    });
    h.w = mention.slice(0, 4).map(x => [x.u, x.it.id]);
    const ex = items.filter(x => x.sent && has(x.sent, forms)).sort((a, b) => a.u - b.u || a.sent.length - b.sent.length);
    const pick = [], byU = {}; ex.forEach(x => (byU[x.u] = byU[x.u] || []).push(x));
    for (let round = 0; pick.length < 6 && round < 6; round++) Object.keys(byU).sort((a, b) => a - b).forEach(k => { if (pick.length < 6 && byU[k][round]) pick.push(byU[k][round]); });
    h.x = pick.sort((a, b) => a.u - b.u).map(x => [x.u, x.it.id]);
  }

  // output
  const heads = {};
  for (const hi of Object.keys(H).sort()){
    const h = H[hi], o = {s: h.s};
    const f = [...h.f].map(([form, e]) => [form, [...e.k].sort((a, b) => KORDER.indexOf(a) - KORDER.indexOf(b)).join(" "), e.irr ? 1 : 0])
      .sort((a, b) => KORDER.indexOf(a[1].split(" ")[0]) - KORDER.indexOf(b[1].split(" ")[0]) || FU[a[0]] - FU[b[0]]);
    if (f.length) o.f = f;
    const order = ["opp", "syn", "pair", "root", "part", "in"];
    const r = [...h.r].map(([w, k]) => [w, ...k]).sort((a, b) => order.indexOf(a[1]) - order.indexOf(b[1])).slice(0, 12);
    if (r.length) o.r = r;
    if (h.n.length) o.n = h.n;
    if (h.w.length) o.w = h.w;
    if (h.x.length) o.x = h.x;
    heads[hi] = o;
  }
  const kinds = Object.fromEntries(Object.entries(KINDS).map(([k, [g, l, gid]]) => [k, [g, l, GU[gid] || 99]]));
  return {data: {kinds, heads}, problems, unclaimed: plain, OF};
}

if (require.main === module){
  const {data, problems, unclaimed, OF} = build();
  if (problems.length){ console.error(problems.join("\n")); process.exit(1); }
  const json = JSON.stringify(data);
  fs.writeFileSync(OUT, json);
  const hs = Object.values(data.heads);
  console.log(`content/words.json: ${hs.length} headwords, ${hs.reduce((a, h) => a + (h.f || []).length, 0)} forms, ${hs.filter(h => h.r).length} with related words, ${(json.length / 1024).toFixed(0)} KB`);
  console.log(`${unclaimed.length} ledger forms are neither a headword nor a known form (they get a plain page)${process.argv.includes("--report") ? ":\n" + unclaimed.join(" ") : ""}`);
  if (process.argv.includes("--report")){
    console.log("\nForms claimed by more than one headword:");
    Object.entries(OF).filter(([, hs]) => hs.length > 1).forEach(([f, hs]) => console.log(`  ${f}: ${hs.join(", ")}`));
  }
}
module.exports = {build, KINDS, OUT};
