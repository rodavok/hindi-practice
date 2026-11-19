/* ---- word pages: a sheet over the current screen with one word in focus. It shows the word (drawn while it
   is spoken), its meanings, stem or parts, the taught forms grouped by construction, rules from the items,
   sentences already seen, and related words to move on to. "Back" steps back through the words visited,
   "Close" (or Escape) returns to the screen underneath, untouched. Data: content/words.json (tools/words.js).
   Only what belongs to an open unit is shown. Declared with var/function so the engine can call in at any time. ---- */
var WX = DATA.words || null;
var WP_FU = null, WP_OF = null, WP_GRP = null;
var wpStack = [], wpHist = false, wpLastFocus = null;

function wpIndex(){
  if (WP_FU) return;
  WP_FU = {}; Object.keys(DATA.ledger).sort((a, b) => a - b).forEach(k => Object.keys(DATA.ledger[k].forms).forEach(f => { if (WP_FU[f] == null) WP_FU[f] = +k; }));
  WP_OF = {};
  if (WX) for (const [h, e] of Object.entries(WX.heads)) (e.f || []).forEach(([f]) => (WP_OF[f] = WP_OF[f] || []).push(h));
  WP_GRP = [];
  if (WX) Object.values(WX.kinds).forEach(([g]) => { if (!WP_GRP.includes(g)) WP_GRP.push(g); });
}
function wpMax(){ return (() => { const open = UNITS.filter(unlocked); return open.length ? open[open.length - 1].n : UNITS[0].n; })(); }
function wpClean(s){ return String(s).replace(/[।?!,.…“”"'()]/g, "").trim(); }
function wpHead(h){ return WX && WX.heads[h]; }
function wpHeadUnit(h){ const e = wpHead(h); if (!e) return null; return e.s.length ? Math.min(...e.s.map(s => s[0])) : WP_FU[h] ?? (h.split(/\s+/).every(t => WP_FU[t] != null) ? Math.max(...h.split(/\s+/).map(t => WP_FU[t])) : null); }
const wpHeadVisible = (h, max) => { const u = wpHeadUnit(h); return u != null && u <= max; };
/* can this form open a page? (a taught form with something to show, never a distractor) */
function wpKnown(form){
  if (!WX) return false;
  wpIndex();
  const f = wpClean(form), max = wpMax();
  if (!f || !isHi(f)) return false;
  if (wpHead(f)) return wpHeadVisible(f, max);
  return (WP_OF[f] || []).some(h => wpHeadVisible(h, max)) && WP_FU[f] != null && WP_FU[f] <= max;
}
function wpAttr(form){ return wpKnown(form) ? ` data-wp="${esc(wpClean(form))}" role="button" tabindex="0"` : ""; }
/* Hindi text that opens its word page when it is a single taught form */
function hiLink(s){ return isHi(s) && !/\s/.test(wpClean(s)) && wpKnown(s) ? `<span class="wlink"${wpAttr(s)}>${hiHTML(s)}</span>` : hiHTML(s); }
function showLink(s){ return isHi(s) ? hiLink(s) : esc(s); }
function wpIsOpen(){ return wpStack.length > 0; }

const WP_C = {n: "noun", a: "adjective", p: "pronoun", v: "verb", x: ""};
const wpRom = s => tr(s);
const wpSense = (c, g, en) => `${[WP_C[c], g === "m" ? "masculine" : g === "f" ? "feminine" : ""].filter(Boolean).join(", ")}`;

/* ---- opening, going back, closing; the browser's back button steps back too, where the page allows it ---- */
function openWord(form){
  if (!wpKnown(form)) return;
  const w = wpClean(form);
  if (wpStack.length && wpStack[wpStack.length - 1] === w) return;
  if (!wpStack.length){ wpLastFocus = document.activeElement; }
  wpStack.push(w);
  try { history.pushState({wp: wpStack.length}, ""); wpHist = true; } catch (e) { wpHist = false; }
  wpRender(true);
}
function wpBack(){ if (wpHist) history.back(); else wpTo(wpStack.length - 1); }
function wpClose(){ if (wpHist && wpStack.length) history.go(-wpStack.length); else wpTo(0); }
function wpTo(depth){
  wpStack.length = Math.max(0, Math.min(depth, wpStack.length));
  if (wpStack.length) wpRender(false); else wpHide();
}
window.addEventListener("popstate", e => { if (!wpStack.length) return; wpTo(e.state && e.state.wp ? e.state.wp : 0); });
function wpHide(){
  const sh = document.getElementById("wsheet");
  if (sh) sh.remove();
  root.inert = false; foot.inert = false; document.body.classList.remove("wopen");
  if (drRun) drFinish(drRun);
  if (wpLastFocus && wpLastFocus.isConnected) wpLastFocus.focus({preventScroll: true});
}

/* ---- the page ---- */
function wpRender(fresh){
  wpIndex();
  const max = wpMax(), w = wpStack[wpStack.length - 1];
  const viaForm = !wpHead(w) || (!wpHead(w).s.length && WP_OF[w]);
  const kinds = WX.kinds, kindOK = k => kinds[k] && kinds[k][2] <= max;
  const formKinds = (hd, f) => { const x = (wpHead(hd).f || []).find(r => r[0] === f); return x ? x[1].split(" ").filter(kindOK) : []; };
  // a form shared by two headwords opens the reading taught first (की: का before करना)
  const firstU = hd => Math.min(99, ...formKinds(hd, w).map(k => kinds[k][2]));
  const owners = (WP_OF[w] || []).filter(hd => wpHeadVisible(hd, max) && formKinds(hd, w).length).sort((a, b) => firstU(a) - firstU(b));
  const h = wpHead(w) && !viaForm ? w : owners[0] || w, e = wpHead(h) || {s: []};
  const kindText = ks => ks.map(k => /^(Commands|Plural and oblique|Agreement|Pronoun forms|Infinitive)$/.test(kinds[k][0]) ? kinds[k][1] : `${kinds[k][1]} (${kinds[k][0].toLowerCase()})`).join("; ");
  const chip = (hw, sub) => `<button class="wchip" data-wp="${esc(hw)}"><span class="hi" lang="hi">${esc(hw)}</span><span class="tr">${esc(wpRom(hw))}</span>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;
  const firstEn = hw => { const x = wpHead(hw); const s = x && x.s.filter(s => s[0] <= max)[0]; return s ? s[3] : ""; };
  const prev = wpStack.length > 1 ? wpStack[wpStack.length - 2] : null;

  let html = `<div class="wbar"><button class="x" id="wpback">‹ ${prev ? `<span class="hi" lang="hi">${esc(prev)}</span>` : "Back"}</button><span class="wbar-t">Word</span><button class="x" id="wpclose" aria-label="Close the word page">Close ✕</button></div><div class="wbody">`;

  // the word itself
  const hero = SND && SND.words[h] && !hasAudio() ? soundHTML(h) : `<div class="big" lang="hi" data-draw>${esc(h)}</div><div class="tr">${esc(wpRom(h))}</div>`;
  html += `<section class="whero"><div class="txt">${hero}</div>${hasAudio() ? `<button class="spk big-spk" id="wpplay" aria-label="Hear ${esc(h)}">${SPK}</button>` : ""}</section>`;
  if (h !== w){
    const ks = formKinds(h, w);
    html += `<p class="wfrom"><span class="wform" data-play="${esc(w)}" role="button" tabindex="0"><span class="hi" lang="hi" data-draw>${esc(w)}</span> <span class="tr">${esc(wpRom(w))}</span></span> is ${ks.length ? `the ${esc(kindText(ks))}` : "a form"} of <b class="hi" lang="hi">${esc(h)}</b>.</p>`;
  }
  // meanings
  const senses = e.s.filter(s => s[0] <= max);
  if (senses.length) html += `<section><h3>Meaning</h3><ul class="wsenses">${senses.map(([u, c, g, en]) => `<li><span>${esc(en)}</span><small>${esc([wpSense(c, g), `Unit ${u}`].filter(Boolean).join(" · "))}</small></li>`).join("")}</ul></section>`;
  else html += `<section><p class="note">${GLOSS[h] ? esc(`${h} ${GLOSS[h]}.`) : `Not in a vocabulary list. First taught in Unit ${wpHeadUnit(h)}.`}</p></section>`;
  if (senses.length && GLOSS[h]) html += `<p class="note">${esc(`${h} ${GLOSS[h]}.`)}</p>`;

  // root: stem, parts, same-root words
  const rel = (e.r || []).filter(([hw]) => wpHeadVisible(hw, max));
  const relOf = k => rel.filter(r => r[1] === k);
  const isVerb = senses.some(s => s[1] === "v") && /ना$/.test(h) && !/\s/.test(h);
  const rootRows = [];
  if (isVerb){ const st = h.slice(0, -2), rom = wpRom(h).replace(/nā$/, ""); rootRows.push(`<div class="wrow"><b>Stem</b><span><span class="hi" lang="hi">${esc(st)}</span> <span class="tr">${esc(rom)}-</span> + <span class="hi" lang="hi">ना</span> <span class="tr">-nā</span></span></div>`); }
  if (relOf("part").length) rootRows.push(`<div class="wrow"><b>Made of</b><span class="wchips">${relOf("part").map(([hw]) => chip(hw, firstEn(hw))).join("")}</span></div>`);
  if (relOf("root").length) rootRows.push(`<div class="wrow"><b>Same root</b><span class="wchips">${relOf("root").map(([hw]) => chip(hw, firstEn(hw))).join("")}</span></div>`);
  if (rootRows.length) html += `<section><h3>Root</h3>${rootRows.join("")}</section>`;

  // forms, grouped by construction, in the order the book teaches them
  const forms = (e.f || []).filter(([f]) => WP_FU[f] != null && WP_FU[f] <= max);
  const groups = {};
  forms.forEach(([f, ks, irr]) => ks.split(" ").filter(kindOK).forEach(k => { const g = kinds[k][0]; (groups[g] = groups[g] || []).push({f, k, irr, u: Math.max(kinds[k][2], WP_FU[f])}); }));
  const gU = g => Math.min(...groups[g].map(x => x.u)); // the unit a group was first met for this word
  const gk = Object.keys(groups).sort((a, b) => gU(a) - gU(b) || WP_GRP.indexOf(a) - WP_GRP.indexOf(b));
  if (gk.length) html += `<section><h3>Forms</h3><p class="note">Tap a form to hear it.</p>${gk.map(g => `<div class="wgroup"><h4>${esc(g)} <small>Unit ${gU(g)}</small></h4><div class="wforms">${groups[g].map(({f, k, irr}) =>
    `<button class="wform${f === w ? " here" : ""}" data-play="${esc(f)}"><span class="hi" lang="hi" data-draw>${esc(f)}</span><span class="tr">${esc(wpRom(f))}</span><small>${esc(kinds[k][1])}${irr ? ` · <em>irregular</em>` : ""}</small></button>`).join("")}</div></div>`).join("")}</section>`;

  // rules: hand notes, then the rule notes of items about this word
  const notes = (e.n || []).filter(([u]) => u <= max).map(([u, t]) => [u, t]);
  (e.w || []).forEach(([u, id]) => { const U = UNITS.find(x => x.n === u); const it = U && u <= max && U._items[id]; if (it && it.why && !notes.some(n => n[1] === it.why)) notes.push([u, it.why]); });
  if (notes.length) html += `<section><h3>Rules for this word</h3><ul class="wnotes">${notes.slice(0, 6).map(([u, t]) => `<li>${wpHiText(t)} <small>Unit ${u}</small></li>`).join("")}</ul></section>`;

  // sentences already met: items answered before, or anything from a passed unit
  const ex = [];
  (e.x || []).forEach(([u, id]) => {
    const U = UNITS.find(x => x.n === u); if (!U || u > max) return;
    const it = U._items[id]; if (!it || !(passed(U) || ust(U).srs[id])) return;
    const hi = it.t === "tiles" ? it.ans.join(" ") : it.say;
    if (hi && it.en) ex.push({u, hi, en: plainEn(it.en)});
  });
  if (ex.length) html += `<section><h3>In sentences you've met</h3><ul class="wex">${ex.slice(0, 3).map((x, i) => `<li><div class="wexline"><button class="spk" data-ex="${i}" aria-label="Hear the sentence">${SPK}</button><span class="wexhi">${words(x.hi).map(t => `<span class="wtok"${wpAttr(t)}><span class="hi" lang="hi">${esc(t)}</span></span>`).join(" ")}</span></div><div class="wexen">${esc(x.en)} <small>Unit ${x.u}</small></div></li>`).join("")}</ul></section>`;

  // related words
  const RL = {opp: "Opposite", syn: "Similar meaning", pair: "", in: "Used in"};
  const relRows = ["opp", "syn", "pair", "in"].map(k => {
    let rs = relOf(k); if (!rs.length) return "";
    if (k === "in") rs = rs.slice(0, 6);
    const lab = k === "pair" ? (wpHead(rs[0][0]).s.some(s => s[2] === "f") ? "Feminine" : "Masculine") : RL[k];
    return `<div class="wrow"><b>${lab}</b><span class="wchips">${rs.map(([hw, , note]) => chip(hw, k === "syn" && note ? `also “${note}”` : firstEn(hw))).join("")}</span></div>`;
  }).join("");
  const alsoOf = owners.filter(o => o !== h);
  const alsoRow = alsoOf.length ? `<div class="wrow"><b>Also a form of</b><span class="wchips">${alsoOf.map(o => chip(o, kindText(formKinds(o, w)) || firstEn(o))).join("")}</span></div>` : "";
  if (relRows || alsoRow) html += `<section><h3>Related words</h3>${alsoRow}${relRows}</section>`;
  html += `</div>`;

  let sh = document.getElementById("wsheet");
  if (!sh){
    sh = document.createElement("div"); sh.id = "wsheet"; sh.className = "wsheet";
    sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
    document.body.appendChild(sh);
    root.inert = true; foot.inert = true; document.body.classList.add("wopen");
  }
  sh.setAttribute("aria-label", `Word page: ${h}`);
  sh.innerHTML = `<div class="win">${html}</div>`;
  sh.scrollTop = 0;
  sh.querySelector("#wpback").onclick = wpBack;
  sh.querySelector("#wpclose").onclick = wpClose;
  const heroEl = sh.querySelector(".whero [data-draw]");
  const play = () => speakDraw(h, heroEl ? [heroEl] : []);
  const pb = sh.querySelector("#wpplay"); if (pb) pb.onclick = play;
  sh.querySelectorAll("[data-play]").forEach(b => b.onclick = () => speakDraw(b.dataset.play, [b.querySelector("[data-draw]")].filter(Boolean)));
  sh.querySelectorAll("[data-ex]").forEach(b => b.onclick = () => { const line = b.parentElement.querySelector(".wexhi"); speakDraw(ex[+b.dataset.ex].hi, [...line.querySelectorAll(".hi")]); });
  sh.querySelector("#wpback").focus({preventScroll: true});
  if (hasAudio()) requestAnimationFrame(() => { if (wpStack[wpStack.length - 1] === w) play(); });
}
/* a rule's text with its Hindi words romanised in brackets, as the book prints them */
function wpHiText(t){
  return esc(t).replace(/[ऀ-ॿ][ऀ-ॿ‌‍]*(?:-[ऀ-ॿ]+)*/g, m => { const r = TR[m]; return `<span class="hi" lang="hi">${m}</span>${r ? `<span class="tr"> ${esc(r)}</span>` : ""}`; });
}
/* unit page: the unit's words, each opening its page */
function wordListHTML(u){
  if (!WX) return "";
  const ws = u.vocab.filter(v => wpKnown(v.hi) || wpHead(v.hi));
  if (!ws.length) return "";
  return `<details class="backup wordlist"><summary>Words in this unit (${ws.length})</summary><p class="note">Tap a word to open its page: its forms, rules and related words.</p><div class="wchips">${ws.map(v => `<button class="wchip" data-wp="${esc(v.hi)}"><span class="hi" lang="hi">${esc(v.hi)}</span><span class="tr">${esc(tr(v.hi))}</span><small>${esc(v.en)}</small></button>`).join("")}</div></details>`;
}

/* one listener for every word link, wherever it is drawn (drawing rewrites the text inside, so no per-element handlers) */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-wp]");
  if (!el) return;
  if (!el.closest("#wsheet") && view === "run" && run && !run.done) return; // never before the question is answered
  e.preventDefault(); openWord(el.dataset.wp);
});
document.addEventListener("keydown", e => {
  if (wpIsOpen()){
    if (e.key === "Escape"){ e.preventDefault(); wpClose(); return; }
    const el = document.activeElement;
    if ((e.key === "Enter" || e.key === " ") && el && el.matches("[data-wp]:not(button), [data-play]:not(button)")){ e.preventDefault(); el.click(); }
    e.stopImmediatePropagation(); // the lesson underneath gets no keys while the sheet is open
    return;
  }
  const el = document.activeElement;
  if ((e.key === "Enter" || e.key === " ") && el && el.matches("[data-wp]:not(button)")){ e.preventDefault(); e.stopImmediatePropagation(); el.click(); }
}, true);
