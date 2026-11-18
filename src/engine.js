"use strict";
/* Hindi practice engine. Content arrives as window.HINDI = {units:[...], ledger:{...}, audio:{...}}.
   Item schema: see content/SCHEMA.md. Behaviour follows pilot/index.html. */
const DATA = window.HINDI;
const UNITS = DATA.units.slice().sort((a, b) => a.n - b.n);
const TR = {};
Object.keys(DATA.ledger).forEach(k => Object.assign(TR, DATA.ledger[k].forms));
UNITS.forEach(u => Object.assign(TR, u.distractors || {}));
const GLOSS = Object.assign({}, ...UNITS.map(u => u.gloss || {}));
/* Optional pre-recorded clips: { "हिन्दी text": "data:audio/... or URL" }. Used first when present. */
const AUDIO = DATA.audio || {};

const BASE_SKILLS = {vocab:"Vocabulary", listen:"Listening", build:"Sentence building"};
const LEVELS = [{name:"Easy", opts:3, extra:1, pairs:4},{name:"Standard", opts:4, extra:2, pairs:5},{name:"Hard", opts:6, extra:6, pairs:7}];
const PASS = 80;
const isHi = s => /[ऀ-ॿ]/.test(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plainEn = s => s.replace(/\[[\d+]+\]/g, "").replace(/[{}]/g, "");
const words = s => s.split(/\s+/).filter(w => w && !/^[।?!,.…]+$/.test(w));
function tr(s){
  return s.split(/\s+/).map(w => {
    const core = w.replace(/[।?!,.…“”"'()]/g, "");
    if (!core) return "";
    if (core === "___") return "___";
    return TR[core] ?? (isHi(core) ? "" : core);
  }).filter(Boolean).join(" ");
}
const hiHTML = s => `<span><span class="hi" lang="hi">${esc(s)}</span>${tr(s) ? `<span class="tr"> ${esc(tr(s))}</span>` : ""}</span>`;
const show1 = s => isHi(s) ? hiHTML(s) : esc(s);
function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const sample = (a, n) => shuffle(a).slice(0, n);
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);

/* ---- storage: one key per unit (the pilot's key for Unit 1), plus app-wide settings ---- */
/* Each stored object carries _t, the time it last changed. localStorage is the working copy;
   when the hosted page offers a per-user store (claude.use("db")), it syncs on top (see sync). */
const PFX = "hindi-practice:", APPKEY = PFX + "app";
const load = k => { try { return JSON.parse(localStorage.getItem(k)) || null; } catch (e) { return null; } };
const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const body = v => { const {_t, ...b} = v; return JSON.stringify(b); };
const seen = {}; // key -> body last stored, so save() writes only what changed
let app = Object.assign({translit:true, level:1, unlockAll:false, reviewDay:null, reviewBest:null}, load(APPKEY) || {});
if (!load(APPKEY)){ const u1 = load(PFX + "unit1"); if (u1){ if (u1.translit != null) app.translit = u1.translit; if (u1.level != null) app.level = u1.level; } }
if (!LEVELS[app.level]) app.level = 1;
seen[APPKEY] = body(app);
const ustate = {};
function ust(u){
  if (!ustate[u.id]){ const s = ustate[u.id] = Object.assign({best:{}, missed:{}, skills:{}, srs:{}}, load(PFX + u.id) || {}); s.srs = s.srs || {}; seen[PFX + u.id] = body(s); }
  return ustate[u.id];
}
const getKey = k => k === APPKEY ? app : ustate[k.slice(PFX.length)];
function save(){
  const now = Date.now();
  [APPKEY, ...Object.keys(ustate).map(id => PFX + id)].forEach(k => {
    const v = getKey(k), b = body(v);
    if (seen[k] === b) return;
    seen[k] = b; v._t = now; store(k, v); sync.dirty(k);
  });
}
const L = () => LEVELS[app.level];

/* ---- cloud sync: one private document per unit plus one for settings, under data/users/<id>/ ----
   Merge rule: the newer copy wins, except best scores, which keep the higher of the two,
   so a passed test (and the units it unlocks) is never lost. */
const sync = (() => {
  let db = null, uid = null, status = "connecting", pending = new Set(), timer = null, pulling = null;
  const chain = {};
  const ref = k => db.collection("data/users/" + uid).doc(k.slice(PFX.length));
  const allKeys = () => [APPKEY, ...UNITS.map(u => PFX + u.id)];
  const set = s => { status = s; const el = document.getElementById("syncnote"); if (el) el.textContent = label(); };
  function label(){
    return {connecting:"Checking for saved progress…", synced:"Progress syncs to your claude.ai account, so it follows you between devices.",
      syncing:"Saving progress…", local:"Progress is saved on this device only. Open this page on claude.ai while signed in to sync it across devices.",
      error:"Could not reach your saved progress. It is kept on this device and will sync next time."}[status];
  }
  function dirty(k){ if (!db) return; pending.add(k); clearTimeout(timer); timer = setTimeout(flush, 1500); }
  function write(k){
    const v = getKey(k); if (!v) return Promise.resolve();
    const doc = {_t: v._t || Date.now(), json: body(v)};
    return chain[k] = (chain[k] || Promise.resolve()).then(() => ref(k).set(doc));
  }
  function flush(){
    clearTimeout(timer);
    if (!db || !pending.size) return;
    const ks = [...pending]; pending.clear(); set("syncing");
    Promise.all(ks.map(write)).then(() => set("synced"), () => { ks.forEach(k => pending.add(k)); set("error"); });
  }
  function merge(k, local, remote){
    const lt = local._t || 0, rt = remote._t || 0;
    const out = JSON.parse(JSON.stringify(rt > lt ? remote : local));
    if (k !== APPKEY){
      out.best = Object.assign({}, local.best, remote.best);
      for (const id in local.best) out.best[id] = Math.max(local.best[id] || 0, (remote.best || {})[id] || 0);
    }
    out._t = Math.max(lt, rt);
    return out;
  }
  async function pullOne(k){
    if (k !== APPKEY) ust(UNITS.find(u => PFX + u.id === k));
    const snap = await ref(k).get(), local = getKey(k), hadLocal = load(k) != null;
    if (!snap.exists){ if (hadLocal) await write(k); return false; }
    const d = snap.data(); let remote;
    try { remote = Object.assign(JSON.parse(d.json), {_t: d._t || 0}); } catch (e) { return false; }
    const out = merge(k, local, remote), ob = body(out), rb = body(remote);
    if (ob !== rb) out._t = Date.now(); // the merge made a version neither side had
    const changed = ob !== seen[k];
    if (changed || (local._t || 0) !== out._t){
      if (k === APPKEY){ app = Object.assign({translit:true, level:1, unlockAll:false, reviewDay:null, reviewBest:null}, out); if (!LEVELS[app.level]) app.level = 1; }
      else ustate[k.slice(PFX.length)] = Object.assign({best:{}, missed:{}, skills:{}, srs:{}}, out);
      seen[k] = ob; store(k, getKey(k));
    }
    if (ob !== rb) await write(k);
    return changed;
  }
  function pull(){
    if (!db || pulling) return pulling;
    set("syncing");
    pulling = Promise.all(allKeys().map(pullOne)).then(ch => {
      set("synced");
      if (ch.some(Boolean) && (view === "home" || view === "unit")) rerender();
    }, () => set("error")).finally(() => { pulling = null; });
    return pulling;
  }
  async function start(){
    const c = window.claude;
    if (!c || typeof c.use !== "function") return set("local");
    const timeout = new Promise(r => setTimeout(() => r(null), 10000));
    try {
      const [d, u] = await Promise.race([Promise.all([c.use("db"), c.use("user")]), timeout.then(() => [null, null])]);
      uid = u ? await u.id() : null;
      db = d && uid ? d : null;
    } catch (e) { db = null; }
    if (!db) return set("local");
    await pull();
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); else pull(); });
    window.addEventListener("pagehide", flush);
  }
  return {dirty, start, label};
})();

/* ---- audio: recorded clip, then a Hindi browser voice, then the hosted page's voice ---- */
let voice = null, cloudTTS = null, askClaude = null;
function pickVoice(){
  if (!("speechSynthesis" in window)) return;
  voice = speechSynthesis.getVoices().find(v => /^hi(-|_|$)/i.test(v.lang)) || null;
  if (view === "home" || view === "unit") rerender();
}
const audioSource = () => Object.keys(AUDIO).length ? "recorded clips" : voice ? "browser voice" : cloudTTS ? "built-in voice" : "";
const hasAudio = () => !!audioSource();
function speak(text){
  text = text.replace(/___/g, "").replace(/[।]/g, "").trim();
  try {
    if (AUDIO[text]) { new Audio(AUDIO[text]).play().catch(() => {}); return; }
    if (voice){
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice; u.lang = voice.lang; u.rate = 0.85;
      speechSynthesis.speak(u);
    } else if (cloudTTS) cloudTTS.speak(text, {language:"hi", rate:0.85}).catch(() => {});
  } catch (e) {}
}
const SPK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';

/* ---- per-unit runtime: vocabulary, fixed items, lessons ---- */
function prepare(u){
  if (u._ready) return u;
  u._V = u.vocab.map(v => Object.assign({}, v));
  u._items = {};
  u._skills = Object.assign({}, BASE_SKILLS, u.skills);
  u.lessons.forEach(l => l.items.forEach(raw => {
    const it = Object.assign({}, raw, {skill: raw.skill || l.skill, _u: u, _lesson: l.id});
    it.wrongMap = Object.fromEntries((raw.wrong || []).map(([c, e]) => [c, e]));
    if (it.t === "mc") it.opts = [it.a, ...(raw.wrong || []).map(x => x[0])];
    if (it.t === "tiles") { it.extra = (raw.wrong || []).map(x => x[0]); it.alt = raw.alt || []; }
    u._items[it.id] = it;
  }));
  /* Hard level pads sentence building with this unit's declared distractor forms only (mostly
     invalid words), so a padding tile can never complete a second correct sentence. */
  u._tilepool = Object.keys(u.distractors || {}).filter(w => !/\s/.test(w));
  const ids = lid => Object.values(u._items).filter(i => i._lesson === lid);
  const V = u._V;
  const testSpec = u.test || {vocab:5};
  u._lessons = [
    {id:"words", title:"Words: read and choose", desc:"Hindi to English and back", n:14, make:() => sample(V, 14).map((w, i) => vocabItem(u, w, i % 2 ? "e2h" : "h2e"))},
    {id:"listen", title:"Words: listen and choose", desc:"Hear a word, pick its meaning", n:10, needsAudio:true, make:() => sample(V, 10).map(w => vocabItem(u, w, "listen"))},
    {id:"match", title:"Match pairs", desc:"Words and their meanings", n:3, unit:"rounds", make:() => [0, 1, 2].map(n => matchItem(u, n))},
    ...u.lessons.map(l => ({id:l.id, title:l.title, desc:l.desc, n:l.items.length, make:() => shuffle(ids(l.id))})),
    {id:"test", title:"Unit test", desc:`A mix of everything. ${PASS}% to pass`, test:true,
      n:Object.values(testSpec).reduce((a, b) => a + b, 0),
      make:() => shuffle(Object.entries(testSpec).flatMap(([k, n]) => k === "vocab"
        ? sample(V, n).map((w, i) => vocabItem(u, w, hasAudio() && i < 2 ? "listen" : i % 2 ? "e2h" : "h2e"))
        : sample(ids(k), n)))}
  ];
  u._ready = true; return u;
}
UNITS.forEach(prepare);

function vocabItem(u, w, mode){ // mode: h2e, e2h, listen
  const need = L().opts - 1, V = u._V;
  const pool = V.filter(o => o.hi !== w.hi && o.en !== w.en);
  const same = pool.filter(o => o.c === w.c);
  const ds = sample(same.length >= need ? same : pool, need);
  const base = {kind:"vocab", word:w.hi, _u:u};
  if (mode === "h2e") return {...base, id:`v:${w.hi}:h2e`, t:"mc", skill:"vocab", q:"What does this mean?", hi:w.hi, audio:true, opts:[w.en, ...ds.map(d => d.en)], a:w.en};
  if (mode === "e2h") return {...base, id:`v:${w.hi}:e2h`, t:"mc", skill:"vocab", q:`Which word means “${w.en}”?`, opts:[w.hi, ...ds.map(d => d.hi)], a:w.hi, say:w.hi};
  return {...base, id:`v:${w.hi}:listen`, t:"listen", skill:"listen", q:"Listen. What did you hear?", sayNow:w.hi, opts:[w.en, ...ds.map(d => d.en)], a:w.en, reveal:w.hi};
}
function matchItem(u, n){ const ws = sample(u._V, L().pairs); return {id:`m:${n}`, t:"match", skill:"vocab", q:"Match each word to its meaning", pairs:ws.map(w => [w.hi, w.en]), nosave:true, _u:u}; }
function itemById(u, id){
  if (u._items[id]) return u._items[id];
  const m = id.match(/^v:(.+):(h2e|e2h|listen)$/);
  if (m){ const w = u._V.find(x => x.hi === m[1]); if (w) return vocabItem(u, w, m[2] === "listen" && !hasAudio() ? "h2e" : m[2]); }
  return null;
}

/* ---- unlocking and spaced review ---- */
const passed = u => (ust(u).best.test || 0) >= PASS;
const unlocked = u => app.unlockAll || u.n === UNITS[0].n || passed(UNITS[UNITS.indexOf(u) - 1]);
const INTERVALS = [1, 2, 4, 8, 16, 32];
function record(it, ok){
  if (it.nosave) return;
  const s = ust(it._u);
  if (ok) delete s.missed[it.id]; else s.missed[it.id] = 1;
  const box = ok ? Math.min((s.srs[it.id] ? s.srs[it.id][0] : 0) + 1, INTERVALS.length - 1) : 0;
  s.srs[it.id] = [box, today() + (ok ? INTERVALS[box] : 0)];
}
function reviewPool(){
  const done = UNITS.filter(passed), t = today(), missed = [], due = [];
  done.forEach(u => {
    const s = ust(u);
    Object.keys(s.missed).forEach(id => { const it = itemById(u, id); if (it) missed.push(it); });
    Object.entries(s.srs).forEach(([id, [, d]]) => { if (d <= t && !s.missed[id]){ const it = itemById(u, id); if (it) due.push([d, it]); } });
  });
  return {done, missed, due: due.sort((a, b) => a[0] - b[0]).map(x => x[1])};
}
function reviewItems(){
  const {done, missed, due} = reviewPool();
  let items = [...shuffle(missed), ...due].slice(0, 20);
  if (items.length < 10 && done.length){ // top up with never-seen fixed items from completed units
    const seen = new Set(items.map(i => i._u.id + i.id));
    const fresh = done.flatMap(u => Object.values(u._items).filter(i => !ust(u).srs[i.id] && !seen.has(u.id + i.id)));
    items = items.concat(sample(fresh, 10 - items.length));
  }
  return shuffle(items);
}

/* ---- why an answer was wrong ---- */
function explain(it, chosen){
  if (it.t === "match") return "";
  if (it.t === "tiles") return explainTiles(it, chosen);
  if (it.kind === "vocab"){
    const V = it._u._V, c = V.find(x => x.hi === chosen || x.en === chosen), w = V.find(x => x.hi === it.word);
    return c && w ? `${c.hi} (${tr(c.hi)}) means “${c.en}”. ${w.hi} (${tr(w.hi)}) means “${w.en}”.` : "";
  }
  const e = it.wrongMap[chosen] || "";
  return it.why && !e.includes(it.why) ? `${e} ${it.why}`.trim() : e;
}
function explainTiles(it, got){
  const ans = it.ans, key = a => a.slice().sort().join(" ");
  if (key(ans) === key(got)) return it.order || "You picked the right words but in the wrong order. Hindi puts the subject first and the verb last, with नहीं just before the verb. An adjective placed before a noun belongs to it (“a big room”); placed after it, the adjective is what the sentence says about the noun (“the room is big”).";
  const parts = [];
  const extraUsed = got.filter(w => !ans.includes(w));
  extraUsed.forEach(w => {
    if (it.wrongMap[w]) parts.push(it.wrongMap[w]);
    else if (it._u.distractors && w in it._u.distractors) parts.push(`${w} is not a correct form here.`);
    else { const v = it._u._V.find(x => x.hi === w); parts.push(`${w}${v ? ` (“${v.en}”)` : ""} does not belong in this sentence.`); }
  });
  const missing = ans.filter(w => !got.includes(w));
  if (missing.length) parts.push(`You left out ${missing.join(", ")}.`);
  if (got.length !== ans.length && !parts.length) parts.push("The sentence has the wrong number of words.");
  if (!parts.length) parts.push("A word is repeated or in the wrong place.");
  return parts.join(" ");
}

/* ---- colour-matched translation ---- */
function alignHTML(en, toks){
  const col = {}; let n = 0;
  const enH = esc(en).replace(/(\{[^}]+\}|[^\s\[\]{}]+)\[([\d+]+)\]/g, (m, w, ix) => { const c = n++ % 7; ix.split("+").forEach(i => col[+i] = c); return `<span class="al al${c}">${w.replace(/[{}]/g, "")}</span>`; });
  const hiH = toks.map((w, i) => { const c = w.replace(/[।?!,.…]/g, ""); return `<span class="tok${i in col ? ` al al${col[i]}` : ""}"><span class="hi" lang="hi">${esc(w)}</span><span class="tr">${esc(TR[c] || "")}</span></span>`; }).join("");
  const notes = [...new Set(toks.map(w => w.replace(/[।?!,.…]/g, "")).filter((w, i) => !(i in col) && GLOSS[w]))].map(w => `${w} ${GLOSS[w]}.`).join(" ");
  return `<div class="align"><div class="line">${hiH}</div><div class="enline">${enH}</div>${notes ? `<p class="note">${esc(notes)}</p>` : ""}</div>`;
}
const alignFor = it => it.t === "tiles" ? alignHTML(it.en, it.ans) : it.en && it.say ? alignHTML(it.en, words(it.say)) : "";

/* ---- sound colours: outlines pre-shaped by tools/glyphs.js, drawn glyph by glyph so a vowel sign or reph gets its own colour ---- */
const SND = DATA.sounds || null;
const sid = n => "g-" + n.replace("#", "_");
function soundDefs(){
  if (!SND || document.getElementById("snd-defs")) return;
  const clip = new Set();
  Object.values(SND.words).forEach(w => w.t.forEach(t => t.p.forEach(q => { if (q.length > 4) clip.add(q[0]); })));
  const defs = Object.entries(SND.glyphs).map(([n, d]) => `<path id="${sid(n)}" d="${d}"/>`).join("") + [...clip].map(n => `<clipPath id="k-${sid(n)}"><use href="#${sid(n)}"/></clipPath>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `<svg id="snd-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${defs}</defs></svg>`);
}
function soundHTML(form){
  const e = SND && SND.words[form]; if (!e) return "";
  const H = 52, use = (n, x, y, c) => `<use href="#${sid(n)}" transform="translate(${x} ${y})" class="sc${c}"/>`;
  const svgs = e.t.map((t, i) => `<svg class="snd" viewBox="${t.vb[0]} -980 ${t.vb[1]} 1400" width="${Math.round(t.vb[1] * H / 1400)}" height="${H}" role="img" aria-label="${esc(form)}" style="display:inline-block"><g transform="scale(1,-1)">${t.p.map(([n, x, y, c, plain, c2]) => plain ? use(n, x, y, c) + `<use href="#${sid(plain)}" clip-path="url(#k-${sid(n)})" transform="translate(${x} ${y})" class="sc${c2}"/>` : use(n, x, y, c)).join("")}</g></svg>${e.s[i] ? esc(e.s[i]) : ""}`).join("");
  const rom = e.r.map(([t, c, k]) => k === "-" ? esc(t) : `<span class="${c >= 0 && k !== "s" ? "sc" + c : ""}${k === "i" ? " i" : ""}${k === "s" ? " s" : ""}">${esc(t)}</span>`).join("");
  return `<div class="sndw"><div>${svgs}</div><div class="sndr tr">${rom}</div></div>`;
}
function soundsHTML(it){
  if (!SND) return "";
  const cand = [it.word, it.hi, it.reveal, isHi(it.a || "") ? it.a : "", ...(it.say ? words(it.say) : []), ...(it.t === "tiles" ? it.ans : [])];
  const forms = [...new Set(cand.filter(Boolean).flatMap(c => isHi(c) ? [c.replace(/[।?!,.…“”"'()]/g, "").trim()] : []))].filter(f => SND.words[f]).slice(0, 8);
  const cards = forms.map(soundHTML).join("");
  return cards ? `<details class="sounds"><summary>Sounds</summary><div class="sndgrid">${cards}</div><p class="note">One colour is one sound. A dotted “a” is the built-in a, a grey (a) is not pronounced. Letters that the script fuses into one shape share a colour.</p></details>` : "";
}

/* ---- "Explain more": the hosted page's sample hook, else the local helper (tools/explain-server) ---- */
function askPrompt(it, chosen){
  const right = it.t === "tiles" ? it.ans.join(" ") : it.a, mine = it.t === "tiles" ? chosen.join(" ") : chosen;
  const scope = UNITS.filter(u => u.n <= it._u.n).map(u => `Unit ${u.n}: ${u.scope}`).join("; ");
  return `You are a patient Hindi tutor. A beginner got a practice question wrong. They have only studied: ${scope}.
Explain in at most five short sentences why their answer is wrong and why the right answer is right. Name the specific rule. Give a romanisation after each Hindi word. Do not use grammar beyond what they have studied. Plain text only, no lists or headings.

Question: ${it.q}${it.t === "tiles" ? `\nEnglish sentence: ${plainEn(it.en)}` : ""}${it.hi ? `\nHindi shown: ${it.hi}` : ""}${it.reveal ? `\nWord played aloud: ${it.reveal}` : ""}
${it.opts ? `Choices: ${it.opts.join(" | ")}` : `Word tiles offered: ${[...it.ans, ...it.extra].join(" | ")}`}
Learner's answer: ${mine}
Right answer: ${right}${it.why ? `\nRule note: ${it.why}` : ""}`;
}
function wireAsk(root, it, chosen){
  const btn = root.querySelector(".askbtn"), out = root.querySelector(".ai");
  if (!btn) return;
  btn.onclick = async () => {
    btn.disabled = true; btn.textContent = "Asking Claude…";
    try {
      const r = await askClaude(askPrompt(it, chosen), {modelTier:"quick", onText: ({text}) => { out.textContent = text; }});
      out.textContent = r.text; btn.hidden = true;
    } catch (e) {
      if (e && e.text) out.textContent = e.text;
      btn.textContent = e && e.code === "rate_limited" ? "Busy. Try again in a moment" : "Could not get an explanation";
      if (e && e.code === "rate_limited") btn.disabled = false;
    }
  };
}
const askHTML = () => askClaude ? `<button class="askbtn">Ask Claude to explain more</button><div class="ai" aria-live="polite"></div>` : "";

/* ---- views ---- */
const root = document.getElementById("app"), foot = document.getElementById("foot"), fb = document.getElementById("fb"), footbtns = document.getElementById("footbtns");
let view = "home", run = null, cur = null;
const rerender = () => view === "unit" && cur ? unitView(cur) : home();

function toolsHTML(){
  const lv = L();
  return `<div class="tools">
      <button class="chip" id="trbtn" aria-pressed="${app.translit}">Romanised hints ${app.translit ? "on" : "off"}</button>
      <span class="chip">${hasAudio() ? "Audio: " + audioSource() : "No audio"}</span>
    </div></header>
  <div class="levelrow">
    <div class="seg" role="group" aria-label="Difficulty">${LEVELS.map((l, i) => `<button data-lv="${i}" aria-pressed="${i === app.level}">${l.name}</button>`).join("")}</div>
    <span class="note">${lv.opts} choices per word, ${lv.pairs} pairs to match, ${lv.extra === 1 ? "1 extra tile" : `up to ${lv.extra} extra tiles`} in sentence building.</span>
  </div>
  ${hasAudio() ? "" : `<div class="warn">No Hindi voice is available here, so words will not be read aloud and the listening lessons are off. Opening this page in Google Chrome usually fixes that.</div>`}`;
}
function wireTools(){
  document.getElementById("trbtn").onclick = () => { app.translit = !app.translit; save(); rerender(); };
  root.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => { app.level = +b.dataset.lv; save(); rerender(); });
}

function home(){
  view = "home"; run = null; cur = null; foot.hidden = true;
  document.body.classList.toggle("notr", !app.translit);
  const rp = reviewPool(), nrev = rp.missed.length + rp.due.length, reviewedToday = app.reviewDay === today();
  root.innerHTML = `
  <header class="top">
    <h1>Hindi practice<span class="hi" lang="hi">हिन्दी</span></h1>
    ${toolsHTML()}
  ${rp.done.length ? `<h2>Daily review</h2><div class="lessons"><button class="lesson test" data-review="1"><span class="n">↻</span><span><b>Review</b><small>${nrev ? `${nrev} ${nrev === 1 ? "item is" : "items are"} due from completed units` : "Nothing due. A short mixed set from completed units"}${reviewedToday ? " · done today" : ""}</small></span><span class="score${reviewedToday ? " ok" : ""}">${reviewedToday ? `${app.reviewBest}%` : nrev ? `${nrev} due` : "Extra"}</span></button></div>` : ""}
  <h2>Units</h2>
  <div class="lessons">
    ${UNITS.map(u => { const s = ust(u), open = unlocked(u), tb = s.best.test;
      const doneL = u._lessons.filter(l => !l.test && (s.best[l.id] || 0) >= PASS).length, totL = u._lessons.filter(l => !l.test).length;
      return `<button class="lesson" data-u="${u.id}" ${open ? "" : "disabled"}><span class="n">${u.n}</span><span><b>${esc(u.title)}</b> <span class="hi" lang="hi" style="color:var(--muted)">${esc(u.titleHi)}</span><small>${esc(u.scope)}</small><div class="bar" style="margin-top:6px"><i style="width:${Math.round(100 * doneL / totL)}%"></i></div><small>${doneL} of ${totL} lessons at ${PASS}%+</small></span>${!open ? `<span class="score">Locked</span>` : tb == null ? `<span class="score">Test: new</span>` : `<span class="score${tb >= PASS ? " ok" : ""}">Test ${tb}%</span>`}</button>`; }).join("")}
  </div>
  <label class="note" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="unlock" ${app.unlockAll ? "checked" : ""}> Unlock every unit (normally a unit opens when the previous unit's test is passed)</label>
  <p class="note" id="syncnote">${esc(sync.label())}</p>
  <p class="note keys">Keys: 1 to 6 choose, Enter checks.</p>`;
  wireTools();
  document.getElementById("unlock").onchange = e => { app.unlockAll = e.target.checked; save(); home(); };
  root.querySelectorAll("[data-u]").forEach(b => b.onclick = () => unitView(UNITS.find(u => u.id === b.dataset.u)));
  const rv = root.querySelector("[data-review]");
  if (rv) rv.onclick = () => { const items = reviewItems(); if (items.length) begin({id:"review", title:"Daily review"}, items); };
}

function unitView(u){
  view = "unit"; run = null; cur = u; foot.hidden = true;
  document.body.classList.toggle("notr", !app.translit);
  const s = ust(u), missed = Object.keys(s.missed).filter(id => itemById(u, id));
  const sk = Object.keys(u._skills).filter(k => s.skills[k]);
  root.innerHTML = `
  <button class="x" id="back" style="align-self:flex-start;padding-left:0">← All units</button>
  <header class="top">
    <h1>Unit ${u.n}: ${esc(u.title)}<span class="hi" lang="hi">${esc(u.titleHi)}</span></h1>
    ${toolsHTML()}
  <p class="note">${esc(u.scope)}.</p>
  ${sk.length ? `<h2>Strengths and gaps</h2><div class="skills">${sk.map(k => { const x = s.skills[k], p = Math.round(100 * x.c / x.n); return `<div class="skill"><span><b>${esc(u._skills[k])}</b><em>${p}% of ${x.n}</em></span><div class="bar"><i style="width:${p}%"></i></div></div>`; }).join("")}</div>` : ""}
  <h2>Lessons</h2>
  <div class="lessons">
    ${u._lessons.map((l, i) => { const b = s.best[l.id]; const off = l.needsAudio && !hasAudio();
      return `<button class="lesson${l.test ? " test" : ""}" data-l="${l.id}" ${off ? "disabled" : ""}><span class="n">${l.test ? "★" : i + 1}</span><span><b>${l.title.split(/\s+/).some(isHi) ? `<span class="hi" lang="hi">${esc(l.title)}</span>` : esc(l.title)}</b><small>${esc(l.desc)} · ${l.n} ${l.unit || "questions"}</small></span>${b == null ? `<span class="score">New</span>` : `<span class="score${b >= PASS ? " ok" : ""}">Best ${b}%</span>`}</button>`; }).join("")}
    ${missed.length ? `<button class="lesson" data-l="mistakes"><span class="n">↺</span><span><b>Practise your mistakes</b><small>Questions you got wrong last time</small></span><span class="score">${missed.length} left</span></button>` : ""}
  </div>`;
  wireTools();
  document.getElementById("back").onclick = home;
  root.querySelectorAll("[data-l]").forEach(b => b.onclick = () => start(u, b.dataset.l));
}

function start(u, id){
  if (id === "mistakes") return begin({id, title:"Practise your mistakes"}, shuffle(Object.keys(ust(u).missed).map(i => itemById(u, i)).filter(Boolean)).slice(0, 15), u);
  const lesson = u._lessons.find(l => l.id === id);
  begin(lesson, lesson.make(), u);
}
function begin(lesson, items, u){
  if (!items.length) return rerender();
  run = {lesson, items, i:0, right:0, wrong:[], u:u || null};
  view = "run"; show();
}
const leave = () => run && run.u ? unitView(run.u) : home();

function show(){
  const it = run.items[run.i]; run.sel = null; run.done = false;
  const head = `<div class="runhead"><button class="x" id="quit">Quit</button><div class="bar"><i style="width:${100 * run.i / run.items.length}%"></i></div><span class="count">${run.i + 1} / ${run.items.length}</span></div>${!run.u ? `<p class="note">Unit ${it._u.n}</p>` : ""}<p class="q">${esc(it.q || "")}</p>`;
  let body = "";
  if (it.t === "mc" || it.t === "listen"){
    it._opts = shuffle(it.opts);
    if (it.t === "listen") body += `<div class="prompt" style="justify-content:center"><button class="spk big-spk" id="spk" aria-label="Play the word again">${SPK}</button></div>`;
    else if (it.hi) body += `<div class="prompt"><div class="txt"><div class="big" lang="hi">${esc(it.hi)}</div><div class="tr">${esc(tr(it.hi))}</div></div>${it.audio && hasAudio() ? `<button class="spk" id="spk" aria-label="Hear it">${SPK}</button>` : ""}</div>`;
    body += `<div class="opts">${it._opts.map((o, k) => `<button class="opt" data-k="${k}"><kbd>${k + 1}</kbd>${isHi(o) ? hiHTML(o) : `<span>${esc(o)}</span>`}</button>`).join("")}</div>`;
  } else if (it.t === "tiles"){
    const n = L().extra, more = n > it.extra.length ? sample(it._u._tilepool.filter(w => !it.ans.includes(w) && !it.extra.includes(w)), n - it.extra.length) : [];
    it._bank = shuffle([...it.ans, ...it.extra.slice(0, n), ...more]).map((w, k) => ({w, k})); run.sel = [];
    body += `<div class="prompt"><div class="txt"><div style="font-size:22px;font-weight:600">${esc(plainEn(it.en))}</div></div></div><div class="slot" id="slot" aria-label="Your sentence"></div><div class="bank" id="bank"></div>`;
  } else if (it.t === "match"){
    run.m = {left:null, done:0, errs:0};
    const A = shuffle(it.pairs.map(p => p[0])), B = shuffle(it.pairs.map(p => p[1]));
    body += `<div class="match">${A.map((h, k) => `<button class="opt" data-side="l" data-v="${esc(h)}">${hiHTML(h)}</button><button class="opt" data-side="r" data-v="${esc(B[k])}"><span>${esc(B[k])}</span></button>`).join("")}</div>`;
  }
  root.innerHTML = head + body;
  document.getElementById("quit").onclick = leave;
  const spk = document.getElementById("spk");
  if (spk) spk.onclick = () => speak(it.sayNow || it.hi);
  if (it.t === "listen") speak(it.sayNow);
  if (it.t === "mc" || it.t === "listen") root.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(+b.dataset.k));
  if (it.t === "tiles") drawTiles();
  if (it.t === "match") root.querySelectorAll(".match .opt").forEach(b => b.onclick = () => matchClick(b));
  foot.hidden = it.t === "match"; foot.className = "foot";
  fb.innerHTML = "";
  footbtns.innerHTML = `<button class="go" id="go" disabled>Check</button>`;
  document.getElementById("go").onclick = check;
  window.scrollTo(0, 0);
}

function pick(k){
  if (run.done) return;
  run.sel = k;
  root.querySelectorAll(".opts .opt").forEach(b => b.classList.toggle("sel", +b.dataset.k === k));
  document.getElementById("go").disabled = false;
}
function drawTiles(){
  const it = run.items[run.i];
  const tile = (o, used) => `<button class="tile${used ? " used" : ""}" data-k="${o.k}" ${used || run.done ? "disabled" : ""}><span class="hi" lang="hi">${esc(o.w)}</span><span class="tr">${esc(TR[o.w] || "")}</span></button>`;
  document.getElementById("slot").innerHTML = run.sel.map(k => tile(it._bank.find(o => o.k === k))).join("");
  document.getElementById("bank").innerHTML = it._bank.map(o => tile(o, run.sel.includes(o.k))).join("");
  document.querySelectorAll("#bank .tile").forEach(b => b.onclick = () => { run.sel.push(+b.dataset.k); speak(it._bank.find(o => o.k === +b.dataset.k).w); drawTiles(); });
  document.querySelectorAll("#slot .tile").forEach(b => b.onclick = () => { run.sel = run.sel.filter(k => k !== +b.dataset.k); drawTiles(); });
  const go = document.getElementById("go"); if (go && !run.done) go.disabled = !run.sel.length;
}
function matchClick(b){
  const it = run.items[run.i], m = run.m;
  if (b.classList.contains("done")) return;
  if (b.dataset.side === "l"){ root.querySelectorAll('.match [data-side="l"]').forEach(x => x.classList.remove("sel")); b.classList.add("sel"); m.left = b; speak(b.dataset.v); return; }
  if (!m.left) return;
  const ok = it.pairs.some(p => p[0] === m.left.dataset.v && p[1] === b.dataset.v);
  if (ok){ [m.left, b].forEach(x => { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; }); m.left = null; m.done++;
    if (m.done === it.pairs.length) finish(m.errs === 0, null);
  } else { m.errs++; b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 500); }
}

function check(){
  const it = run.items[run.i];
  if (run.done) return next();
  if (it.t === "mc" || it.t === "listen"){
    if (run.sel == null) return;
    const chosen = it._opts[run.sel];
    root.querySelectorAll(".opts .opt").forEach(b => { const o = it._opts[+b.dataset.k]; b.disabled = true; if (o === it.a) b.classList.add("right"); else if (+b.dataset.k === run.sel) b.classList.add("wrong"); });
    if (it.say) speak(it.say);
    finish(chosen === it.a, chosen);
  } else if (it.t === "tiles"){
    const got = run.sel.map(k => it._bank.find(o => o.k === k).w);
    const ok = [it.ans, ...it.alt].some(a => a.join(" ") === got.join(" "));
    speak(it.ans.join(" "));
    finish(ok, got);
    drawTiles();
  }
}
function finish(ok, chosen){
  const it = run.items[run.i]; run.done = true;
  const why = ok ? "" : it.t === "match" ? `${run.m.errs} wrong ${run.m.errs === 1 ? "try" : "tries"} this round.` : explain(it, chosen);
  if (ok) run.right++; else run.wrong.push({it, chosen, why});
  const s = ust(it._u), sk = s.skills[it.skill] || (s.skills[it.skill] = {c:0, n:0}); sk.n++; if (ok) sk.c++;
  record(it, ok);
  save();
  const right = it.t === "tiles" ? it.ans.join(" ") : it.a;
  foot.hidden = false; foot.className = "foot " + (ok ? "good" : "bad");
  fb.innerHTML = `<strong>${ok ? "Correct" : "Not quite"}</strong>${!ok && right ? `Right answer: ${show1(right)}` : ""}${it.reveal ? ` The word was ${hiHTML(it.reveal)}.` : ""}${it.t === "match" && !ok ? esc(why) : ""}`;
  const al = alignFor(it), snd = it.t !== "match" ? soundsHTML(it) : "";
  if (it.t !== "match" && (al || !ok || snd)){
    const d = document.createElement("div"); d.className = "detail";
    d.innerHTML = `${!ok && why ? `<h3>Why</h3><p>${esc(why)}</p>` : ""}${al ? `<h3>Word by word</h3>${al}` : ""}${snd}${!ok ? askHTML() : ""}`;
    if (d.innerHTML){ root.appendChild(d); wireAsk(d, it, chosen); }
  }
  footbtns.innerHTML = `<button class="go" id="go">${run.i + 1 === run.items.length ? "See results" : "Continue"}</button>`;
  const go = document.getElementById("go"); go.onclick = next; go.focus({preventScroll:true});
}
function next(){ run.i++; if (run.i >= run.items.length) results(); else show(); }

function results(){
  view = "results"; foot.hidden = true;
  const n = run.items.length, pct = Math.round(100 * run.right / n), l = run.lesson, u = run.u;
  if (l.id === "review"){ app.reviewDay = today(); app.reviewBest = Math.max(app.reviewDay === today() && app.reviewBest != null ? app.reviewBest : 0, pct); }
  else if (u && l.id !== "mistakes" && l.id !== "retry") ust(u).best[l.id] = Math.max(ust(u).best[l.id] || 0, pct);
  save();
  const nextU = u && l.test && pct >= PASS ? UNITS[UNITS.indexOf(u) + 1] : null;
  const verdict = l.test ? (pct >= PASS ? `Passed.${nextU ? ` Unit ${nextU.n} is open.` : ""}` : "Not yet. Work through the missed items below, then try again.") : pct === 100 ? "Clean run." : pct >= PASS ? "Solid. A few to review." : "Worth another pass.";
  const by = {}; run.wrong.forEach(w => by[w.it.skill] = (by[w.it.skill] || 0) + 1);
  const label = k => (run.wrong.find(w => w.it.skill === k).it._u._skills[k]) || k;
  const weak = Object.keys(by).sort((a, b) => by[b] - by[a]).map(k => `${label(k)} (${by[k]})`).join(", ");
  const row = ({it, chosen, why}) => {
    if (it.t === "match") return `<li>Match round: ${it.pairs.map(p => `${hiHTML(p[0])} = ${esc(p[1])}`).join(", ")}<span class="note">${esc(why)}</span></li>`;
    const mine = it.t === "tiles" ? chosen.join(" ") : chosen, right = it.t === "tiles" ? it.ans.join(" ") : it.a;
    return `<li><span>${esc(it.t === "tiles" ? plainEn(it.en) : it.q)}${it.hi ? ` ${hiHTML(it.hi)}` : ""}${it.reveal ? ` ${hiHTML(it.reveal)}` : ""}</span>
      <div class="cmp"><span class="yours"><b>You chose</b>${show1(mine)}</span><span class="right"><b>Right answer</b>${show1(right)}</span></div>
      ${why ? `<span>${esc(why)}</span>` : ""}${askHTML()}</li>`;
  };
  root.innerHTML = `
  <h2>${esc(l.title)}</h2>
  <div class="result"><div class="pct">${pct}%</div><div>${run.right} of ${n} correct. ${verdict}</div>${weak ? `<div class="note">Missed by area: ${esc(weak)}</div>` : ""}</div>
  <div class="row">${run.wrong.some(w => !w.it.nosave) ? `<button class="go" id="again">Retry the ones I missed</button>` : ""}<button class="go alt" id="back">${u ? "Back to lessons" : "Back to units"}</button></div>
  ${run.wrong.length ? `<h2>Review</h2><ul class="missed">${run.wrong.map(row).join("")}</ul>` : ""}`;
  root.querySelectorAll(".missed li").forEach((li, i) => wireAsk(li, run.wrong[i].it, run.wrong[i].chosen));
  document.getElementById("back").onclick = leave;
  const again = document.getElementById("again");
  if (again) again.onclick = () => begin({id:"retry", title:"Retry"}, shuffle(run.wrong.map(w => w.it).filter(it => !it.nosave)), u);
  window.scrollTo(0, 0);
}

document.addEventListener("keydown", e => {
  if (view !== "run" || !run) return;
  const it = run.items[run.i];
  if (/^[1-6]$/.test(e.key) && (it.t === "mc" || it.t === "listen") && !run.done && +e.key <= it._opts.length){ pick(+e.key - 1); e.preventDefault(); }
  else if (e.key === "Enter"){ const go = document.getElementById("go"); if (go && !go.disabled && document.activeElement !== go){ go.click(); e.preventDefault(); } }
});

if ("speechSynthesis" in window){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
soundDefs();
home();
sync.start();
/* Keep the last question clear of the fixed check bar, whose height varies on a phone. */
if ("ResizeObserver" in window) new ResizeObserver(() => document.body.style.setProperty("--foot-h", (foot.hidden ? 0 : foot.offsetHeight) + "px")).observe(foot);
/* Optional capabilities: the hosted page's hooks, else the local explain helper if it is running. */
if (window.claude && typeof window.claude.use === "function"){
  window.claude.use("sample").then(s => { askClaude = s || null; }).catch(() => {});
  window.claude.use("tts").then(t => { cloudTTS = t || null; if (view === "home" || view === "unit") rerender(); }).catch(() => {});
} else if (location.protocol.startsWith("http") && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
  fetch("/api/explain", {method:"OPTIONS"}).then(r => { if (r.ok) askClaude = async (prompt, opts) => {
    const r2 = await fetch("/api/explain", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({prompt})});
    const j = await r2.json(); if (!r2.ok) throw {code:j.code, text:j.error}; return {text:j.text};
  }; }).catch(() => {});
}
