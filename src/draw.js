/* ---- drawing while speaking: when a prompt or an answer is played, the Hindi already on screen is
   redrawn letter by letter, each sound's colour laid down by a pen that runs along the letter's centre
   line (content/strokes.json, from tools/strokes.js) while that sound is heard. It only ever redraws
   text that is already showing, so it cannot give an answer away. The pen's path is decorative, not a
   handwriting stroke order. Timing is estimated per sound and fitted to the real length of the audio. ---- */
const STROKES = DATA.strokes || null;
const DR_MIN_MS = 380;     // a letter takes at least this long to draw, so the pen is visible at speech speed
const DR_SHARE = 0.82;     // share of a letter's time spent moving the pen; the rest fades in what it missed
const DR_LEAD = 1.5, DR_TAIL = 1.0, DR_GAP = 0.6;   // silence before, after and between words, in weight units
const drReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const drLen = new Map();   // text → measured ms, this session
let drRun = null, drUid = 0, drHooked = false;

/* sound lengths, in weight units */
function drWeight(text, kind){
  if (kind === "s") return 0;
  const nfd = text.normalize("NFD"), base = nfd.replace(/[̀-ͯ]/g, "");
  if (/^[aeiou]+$/.test(base)){
    let w = kind === "i" ? 0.8 : base.length > 1 ? 1.6 : /[āīū]/.test(text) || /^[eo]$/.test(base) ? 1.5 : 0.9;
    if (/̃/.test(nfd)) w += 0.3;
    return w;
  }
  // a cluster such as śv or cc counts each consonant; an h after a consonant is aspiration
  const n = base.replace(/(?<=[^aeiou])h/g, "").length, asp = n < base.length ? 0.2 : 0;
  if (n > 1) return 0.85 * n + asp;
  if (/ṛ/.test(text) && !asp) return 0.7;
  return 1.0 + asp;
}
const drUnitKey = src => "hindi-draw-unit:" + src;
function drUnit(src){ try { return +localStorage.getItem(drUnitKey(src)) || 100; } catch (e) { return 100; } }
function drLearn(src, text, ms, W){
  if (!(ms > 150)) return;
  drLen.set(src + "|" + text, ms);
  const u = ms / W, old = (() => { try { return +localStorage.getItem(drUnitKey(src)) || 0; } catch (e) { return 0; } })();
  try { localStorage.setItem(drUnitKey(src), String(old ? old * 0.6 + u * 0.4 : u)); } catch (e) {}
}

/* which on-screen Hindi is being spoken: the word-by-word line, the prompt, the right option, or the answer note */
const drClean = s => s.replace(/___/g, "").replace(/[।?!,.…“”"'()]/g, "").replace(/\s+/g, " ").trim();
function drTargets(text){
  const want = drClean(text), txt = el => el.dataset.dwText ?? el.textContent;
  const line = document.querySelector(".detail .align .line");
  if (line){ const toks = [...line.querySelectorAll(".tok > .hi")]; if (toks.length && drClean(toks.map(txt).join(" ")) === want) return toks; }
  for (const sel of [".prompt .big", ".opts .opt.right .hi", "#fb .hi"])
    for (const el of document.querySelectorAll(sel)) if (drClean(txt(el)) === want) return [el];
  return [];
}

/* one word form → its glyph layers paired with its sounds (as in the Sounds panel's colouring) */
function drForm(e, acc, last){
  const spans = e.r.filter(s => s[2] !== "-").map(([t, c, k]) => ({t, c, k, w: drWeight(t, k)}));
  const vr = e.t.flatMap(t => t.p).find(q => q[0] === "rvocalicvowelsigndeva");
  if (vr) spans.forEach(s => { if (s.t === "ṛ" && s.c === vr[3]) s.w = 1.1; });
  const li = spans.map(s => s.w > 0).lastIndexOf(true);
  if (li >= 0) spans[li].w *= last ? 1.35 : 1.15;
  spans.forEach(s => { s.a = acc; acc += s.w; s.b = acc; });
  const runs = [];
  spans.forEach(s => { const r = runs[runs.length - 1]; if (r && r.c === s.c) r.b = s.b; else runs.push({c: s.c, a: s.a, b: s.b}); });
  const layers = [];
  e.t.forEach((t, ti) => t.p.forEach(([n, x, y, c, plain, c2]) => {
    layers.push({ti, n, x, y, c, key: plain ? `${n}|${plain}` : n});
    if (plain) layers.push({ti, n: plain, x, y, c: c2, clip: n, key: plain});
  }));
  const groups = [], seen = {};
  layers.forEach(L => { const g = groups[groups.length - 1]; if (g && g.c === L.c) g.layers.push(L); else groups.push({c: L.c, layers: [L]}); });
  groups.forEach(g => {
    const rs = runs.filter(r => r.c === g.c), k = seen[g.c] = (seen[g.c] ?? -1) + 1;
    const run = rs[Math.min(k, rs.length - 1)] || {a: spans[0] ? spans[0].a : acc, b: acc};
    g.layers.forEach(L => { L.a = run.a; L.b = run.b; });
  });
  return {layers, end: acc};
}

const drPathD = s => "M" + s.map(p => p.join(" ")).join("L");
const drSegLen = s => s.reduce((a, p, i) => i ? a + Math.hypot(p[0] - s[i - 1][0], p[1] - s[i - 1][1]) : 0, 0);
function drSVG(t, layers, uid){
  const [vx, vw] = t.vb;
  const masks = layers.map(L => {
    const sk = STROKES[L.key] || {w: 100, s: []};
    L.s = sk.s; L.lens = sk.s.map(drSegLen); L.total = L.lens.reduce((a, b) => a + b, 0); L.id = `dw${uid}-${L.j}`;
    const pens = sk.s.map((s, k) => `<path d="${drPathD(s)}" fill="none" stroke="#fff" stroke-width="${sk.w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L.lens[k].toFixed(1)} 99999" stroke-dashoffset="${L.lens[k].toFixed(1)}"/>`).join("");
    return `<mask id="${L.id}" maskUnits="userSpaceOnUse" x="${vx - 200}" y="-2000" width="${vw + 400}" height="4000"><g transform="translate(${L.x} ${L.y})">${pens}<use href="#${sid(L.n)}" fill="#fff" opacity="0"/></g></mask>`;
  }).join("");
  const base = t.p.map(([n, x, y]) => `<use href="#${sid(n)}" transform="translate(${x} ${y})" class="dwb"/>`).join("");
  const col = layers.map(L => `<g mask="url(#${L.id})"><use href="#${sid(L.n)}" transform="translate(${L.x} ${L.y})" class="dwf${L.c % 5}"${L.clip ? ` clip-path="url(#k-${sid(L.clip)})"` : ""}/></g>`).join("");
  const nib = `<clipPath id="dwk${uid}"><use href="#${sid(t.p[0][0])}"/></clipPath><g clip-path="url(#dwk${uid})"><circle r="75" fill="url(#dw-sheen)" opacity="0"/></g>`;
  return `<svg class="dw" viewBox="${vx} -980 ${vw} 1400" style="width:${(vw / 1000).toFixed(3)}em" aria-hidden="true"><defs>${masks}</defs><g transform="scale(1,-1)">${base}${col}${nib}</g></svg>`;
}

/* replace each target's text with drawable glyphs; returns every layer and the total weight */
function drBuild(els){
  if (!document.getElementById("dw-defs")) document.body.insertAdjacentHTML("afterbegin", `<svg id="dw-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="dw-sheen"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs></svg>`);
  const all = [], svgs = [];
  let acc = DR_LEAD;
  const items = [];   // per element: [{pre, form, e, post} | {text}]
  els.forEach(el => {
    const text = el.dataset.dwText ?? el.textContent; el.dataset.dwText = text;
    const whole = drClean(text);
    if (SND.words[whole] && whole.includes(" ")) { items.push([el, text, [{form: whole, e: SND.words[whole], pre: "", post: ""}]]); return; }
    items.push([el, text, text.split(/(\s+)/).map(tok => {
      if (/^\s*$/.test(tok)) return {text: tok};
      const m = tok.match(/^([।?!,.…“”"'()]*)(.*?)([।?!,.…“”"'()]*)$/), e = SND.words[m[2]];
      return e ? {form: m[2], e, pre: m[1], post: m[3]} : {text: tok};
    })]);
  });
  const forms = items.flatMap(([, , parts]) => parts.filter(p => p.e));
  items.forEach(([el, text, parts]) => {
    let html = "";
    parts.forEach(p => {
      if (!p.e){ html += esc(p.text); if (p.text.trim()) acc += 0.4 * p.text.trim().length; return; }
      const f = drForm(p.e, acc, p === forms[forms.length - 1]);
      acc = f.end + DR_GAP;
      html += esc(p.pre) + p.e.t.map((t, ti) => {
        const uid = ++drUid, ls = f.layers.filter(L => L.ti === ti);
        ls.forEach(L => { L.j = all.length; L.svg = uid; all.push(L); });
        return drSVG(t, ls, uid) + (p.e.s && p.e.s[ti] ? esc(p.e.s[ti]) : "");
      }).join("") + esc(p.post);
    });
    el.innerHTML = `<span class="dw-sr">${esc(text)}</span>${html}`;
  });
  // element handles for painting
  all.forEach(L => {
    const m = document.getElementById(L.id);
    L.pens = [...m.querySelectorAll("path")]; L.fill = m.querySelector("use");
  });
  const nibs = {};
  all.forEach(L => { if (!nibs[L.svg]){ const c = document.getElementById("dwk" + L.svg); nibs[L.svg] = {clip: c.firstElementChild, dot: c.nextElementSibling.firstElementChild}; } });
  return {layers: all, nibs, W: acc - DR_GAP + DR_TAIL, live: () => all.length && all[0].fill.isConnected};
}

/* a point `d` along a layer's strokes */
function drAlong(L, d){
  for (let k = 0; k < L.s.length; k++){
    if (d > L.lens[k]) { d -= L.lens[k]; continue; }
    const s = L.s[k];
    for (let i = 1; i < s.length; i++){
      const l = Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
      if (d <= l || i === s.length - 1){ const t = l ? Math.min(1, d / l) : 0; return [L.x + s[i - 1][0] + (s[i][0] - s[i - 1][0]) * t, L.y + s[i - 1][1] + (s[i][1] - s[i - 1][1]) * t]; }
      d -= l;
    }
  }
  return null;
}
/* progress u (weight units) → pens, fills and the nib; mpu = ms per weight unit */
function drPaint(P, u, mpu){
  const minU = mpu ? DR_MIN_MS / mpu : 0;
  let tip = null, tipA = -Infinity;
  P.layers.forEach(L => {
    let f = (u - L.a) / Math.max(L.b - L.a, minU, 0.01);
    f = drReduce ? (f > 0 ? 1 : 0) : Math.max(0, Math.min(1, f));
    const g = L.total ? Math.min(1, f / DR_SHARE) : 0, drawn = g * L.total;
    let left = drawn;
    L.pens.forEach((el, k) => { const l = L.lens[k], v = Math.max(0, Math.min(l, left)); left -= l; el.setAttribute("stroke-dashoffset", (l - v).toFixed(1)); });
    const fade = L.total ? Math.max(0, (f - DR_SHARE + 0.08) / (1 - DR_SHARE + 0.08)) : f;
    L.fill.setAttribute("opacity", Math.min(1, fade).toFixed(3));
    if (g > 0 && g < 1 && L.a > tipA){ const p = drAlong(L, drawn); if (p){ tip = {p, L}; tipA = L.a; } }
  });
  Object.entries(P.nibs).forEach(([svg, nb]) => {
    const on = tip && !drReduce && +svg === tip.L.svg;
    nb.dot.setAttribute("opacity", on ? 1 : 0);
    if (on){ nb.dot.setAttribute("cx", tip.p[0].toFixed(1)); nb.dot.setAttribute("cy", tip.p[1].toFixed(1)); nb.clip.setAttribute("href", "#" + sid(tip.L.n)); nb.clip.setAttribute("transform", `translate(${tip.L.x} ${tip.L.y})`); }
  });
}

/* one clock: ms since the sound began; after the audio ends it runs on until the last letter is drawn */
function drFrame(){
  const r = drRun;
  if (!r) return;
  if (!r.P.live()) { drRun = null; return; }
  if (r.t0 != null){
    const mpu = r.D / r.P.W, u = (performance.now() - r.t0) / mpu;
    drPaint(r.P, u, mpu);
    const minU = DR_MIN_MS / mpu, end = Math.max(...r.P.layers.map(L => L.a + Math.max(L.b - L.a, minU)));
    if (r.audioDone && u > end + 0.2) return drFinish(r);
  } else if (r.audioDone) return drFinish(r);
  r.raf = requestAnimationFrame(drFrame);
}
function drFinish(r){
  if (!r || drRun !== r) return;
  drRun = null; cancelAnimationFrame(r.raf);
  if (r.P && r.P.live()) drPaint(r.P, Infinity, 0);
}

/* speak `text` and draw it where it already shows; falls back to plain speech */
function speakDraw(text){
  if (!SND || !STROKES || !hasAudio()) return speak(text);
  if (drRun) drFinish(drRun);
  const key = drClean(text), src = AUDIO[text.replace(/___/g, "").replace(/[।]/g, "").trim()] ? "clip" : voice ? "browser" : cloudTTS ? "cloud" : "";
  if (src === "cloud" && !drHooked && cloudTTS.onPosition){
    drHooked = true;
    // start only from an early position, so a late report from a reading that was just replaced can't jump ahead
    cloudTTS.onPosition(e => { const q = drRun; if (q && q.src === "cloud" && !q.audioDone && (q.t0 != null || e.ms < 400)){ const t = performance.now() - e.ms; q.t0 = q.t0 == null ? t : q.t0 * 0.6 + t * 0.4; } });
  }
  const r = drRun = {src, t0: null, audioDone: false, P: null, raf: 0};
  speak(text, {
    start(){ if (drRun === r && r.t0 == null) r.t0 = performance.now(); },
    end(ms){ if (drRun !== r) return; if (r.P && ms) drLearn(src, key, ms, r.P.W); r.audioDone = true; },
    fail(){ if (drRun === r) drFinish(r); }
  });
  // the answer panel is built just after the answer is spoken, so look for the text on the next frame
  requestAnimationFrame(() => {
    if (drRun !== r) return;
    const els = drTargets(text);
    if (!els.length) { drRun = null; return; }
    r.P = drBuild(els);
    r.D = drLen.get(src + "|" + key) || r.P.W * drUnit(src);
    drPaint(r.P, -1, r.D / r.P.W);
    r.raf = requestAnimationFrame(drFrame);
  });
}
