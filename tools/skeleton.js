// Centre lines for glyph outlines, so the demo can draw a letter by moving a pen along it.
// Outline (font units, M/L/Q/Z) → raster → thinning → graph → ordered strokes.
// The order is decorative: it is not the handwriting stroke order.
const S = 4;                      // font units per pixel
const PEN = +(process.env.PEN || 3.4);  // pen width in stroke half-widths

function contours(d){
  const tok = d.match(/[MLQZ]|-?\d+(?:\.\d+)?/g), cs = [];
  let i = 0, cur = null, px = 0, py = 0, cmd = "M";
  const num = () => +tok[i++];
  while (i < tok.length){
    if (/[MLQZ]/.test(tok[i])) cmd = tok[i++];
    if (cmd === "M"){ px = num(); py = num(); cur = [[px, py]]; cs.push(cur); cmd = "L"; }
    else if (cmd === "L"){ px = num(); py = num(); cur.push([px, py]); }
    else if (cmd === "Q"){
      const cx = num(), cy = num(), x = num(), y = num();
      for (let k = 1; k <= 10; k++){ const t = k / 10, a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, e = t * t; cur.push([a * px + b * cx + e * x, a * py + b * cy + e * y]); }
      px = x; py = y;
    }
  }
  return cs;
}

// nonzero fill on a pixel grid; pixel (i,j) centre is ((ox+i+.5)S, (oy+j+.5)S)
function raster(d){
  const cs = contours(d), pts = cs.flat();
  const ox = Math.floor(Math.min(...pts.map(p => p[0])) / S) - 3, oy = Math.floor(Math.min(...pts.map(p => p[1])) / S) - 3;
  const W = Math.ceil(Math.max(...pts.map(p => p[0])) / S) - ox + 4, H = Math.ceil(Math.max(...pts.map(p => p[1])) / S) - oy + 4;
  const g = new Uint8Array(W * H);
  for (let j = 0; j < H; j++){
    const y = (oy + j + 0.5) * S, xs = [];
    for (const c of cs) for (let k = 0; k < c.length; k++){
      const p = c[k], q = c[(k + 1) % c.length];
      if (p[1] <= y && q[1] > y) xs.push([p[0] + (y - p[1]) / (q[1] - p[1]) * (q[0] - p[0]), 1]);
      else if (q[1] <= y && p[1] > y) xs.push([p[0] + (y - p[1]) / (q[1] - p[1]) * (q[0] - p[0]), -1]);
    }
    xs.sort((a, b) => a[0] - b[0]);
    let w = 0;
    for (let k = 0; k < xs.length - 1; k++){
      w += xs[k][1];
      if (w !== 0) for (let i = Math.max(0, Math.ceil(xs[k][0] / S - ox - 0.5)); i <= Math.min(W - 1, Math.floor(xs[k + 1][0] / S - ox - 0.5)); i++) g[j * W + i] = 1;
    }
  }
  return {g, W, H, ox, oy};
}
const inside = (R, x, y) => { const i = Math.floor(x / S - R.ox), j = Math.floor(y / S - R.oy); return i >= 0 && j >= 0 && i < R.W && j < R.H && R.g[j * R.W + i] === 1; };

function distance(R){
  const {g, W, H} = R, D = new Float32Array(W * H).fill(1e9);
  for (let k = 0; k < W * H; k++) if (!g[k]) D[k] = 0;
  const pass = (i, j, di, dj, c) => { const ii = i + di, jj = j + dj; if (ii >= 0 && jj >= 0 && ii < W && jj < H) D[j * W + i] = Math.min(D[j * W + i], D[jj * W + ii] + c); };
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++){ pass(i, j, -1, 0, 1); pass(i, j, 0, -1, 1); pass(i, j, -1, -1, 1.414); pass(i, j, 1, -1, 1.414); }
  for (let j = H - 1; j >= 0; j--) for (let i = W - 1; i >= 0; i--){ pass(i, j, 1, 0, 1); pass(i, j, 0, 1, 1); pass(i, j, 1, 1, 1.414); pass(i, j, -1, 1, 1.414); }
  return D;
}

// Zhang–Suen thinning
const NB = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];   // P2..P9 (j grows with font y)
function thin(R){
  const {W, H} = R, s = Uint8Array.from(R.g);
  const at = (i, j) => (i >= 0 && j >= 0 && i < W && j < H) ? s[j * W + i] : 0;
  let changed = true;
  while (changed){
    changed = false;
    for (const step of [0, 1]){
      const del = [];
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++){
        if (!s[j * W + i]) continue;
        const p = NB.map(([a, b]) => at(i + a, j + b)), B = p.reduce((x, y) => x + y, 0);
        let A = 0; for (let k = 0; k < 8; k++) if (!p[k] && p[(k + 1) % 8]) A++;
        if (B < 2 || B > 6 || A !== 1) continue;
        if (step === 0 ? (p[0] * p[2] * p[4] || p[2] * p[4] * p[6]) : (p[0] * p[2] * p[6] || p[0] * p[4] * p[6])) continue;
        del.push(j * W + i);
      }
      if (del.length){ changed = true; del.forEach(k => s[k] = 0); }
    }
  }
  return s;
}

// skeleton pixels → edges between nodes (ends and junctions)
function graph(R, s){
  const {W, H} = R, on = (i, j) => i >= 0 && j >= 0 && i < W && j < H && s[j * W + i] === 1;
  const nbrs = k => { const i = k % W, j = (k / W) | 0; return NB.map(([a, b]) => on(i + a, j + b) ? (j + b) * W + i + a : -1).filter(x => x >= 0); };
  const cn = k => { const i = k % W, j = (k / W) | 0, p = NB.map(([a, b]) => on(i + a, j + b) ? 1 : 0); let A = 0; for (let q = 0; q < 8; q++) if (!p[q] && p[(q + 1) % 8]) A++; return A; };
  const px = []; for (let k = 0; k < W * H; k++) if (s[k]) px.push(k);
  const isNode = new Set(px.filter(k => { const n = nbrs(k).length; return n <= 1 || cn(k) >= 3; }));
  // merge touching junction pixels into one node
  const nodeOf = new Map(); let nid = 0;
  for (const k of isNode){ if (nodeOf.has(k)) continue; const st = [k]; nodeOf.set(k, nid); while (st.length){ const c = st.pop(); for (const q of nbrs(c)) if (isNode.has(q) && !nodeOf.has(q)){ nodeOf.set(q, nid); st.push(q); } } nid++; }
  const seen = new Set(), edges = [];
  const is4 = (a, b) => Math.abs(a - b) === 1 || Math.abs(a - b) === W;
  const walk = (start, first) => {
    const path = [start, first]; let prev = start, cur = first; seen.add(first);
    while (!isNode.has(cur)){
      const c = nbrs(cur).filter(q => q !== prev && (isNode.has(q) ? !(nodeOf.get(q) === nodeOf.get(start) && path.length < 4) : !seen.has(q)));
      if (!c.length) break;
      const nx = c.find(q => isNode.has(q)) ?? c.find(q => is4(q, cur)) ?? c[0];
      if (!isNode.has(nx)) seen.add(nx);
      path.push(nx); prev = cur; cur = nx;
    }
    return path;
  };
  for (const k of isNode) for (const q of nbrs(k)) if (!isNode.has(q) && !seen.has(q)) edges.push(walk(k, q));
  for (const k of px) if (!isNode.has(k) && !seen.has(k)){            // closed loops without nodes
    seen.add(k); const c = nbrs(k).filter(q => !seen.has(q)); if (c.length) { const p = walk(k, c[0]); edges.push([k, ...p.slice(1), k]); }
  }
  const lone = [...new Set([...isNode].filter(k => nbrs(k).length === 0))];
  const pt = k => [(R.ox + (k % W) + 0.5) * S, (R.oy + ((k / W) | 0) + 0.5) * S];
  return {
    edges: edges.filter(p => p.length >= 2).map(p => ({a: nodeOf.get(p[0]) ?? -1, b: nodeOf.get(p[p.length - 1]) ?? -1, end: [p[0], p[p.length - 1]].map(k => isNode.has(k) && nbrs(k).length === 1), px: p, pts: p.map(pt)})),
    lone: lone.map(pt)
  };
}

const len = pts => pts.reduce((a, p, i) => i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0);
function smooth(pts){ if (pts.length < 5) return pts; return pts.map((p, i) => i === 0 || i === pts.length - 1 ? p : [0, 1].map(d => (pts[i - 1][d] + 2 * p[d] + pts[i + 1][d]) / 4)); }
function rdp(pts, eps){
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  let m = 0, mi = 0;
  for (let i = 1; i < pts.length - 1; i++){ const d = Math.abs((b[0] - a[0]) * (a[1] - pts[i][1]) - (a[0] - pts[i][0]) * (b[1] - a[1])) / L; if (d > m){ m = d; mi = i; } }
  return m > eps ? [...rdp(pts.slice(0, mi + 1), eps).slice(0, -1), ...rdp(pts.slice(mi), eps)] : [a, b];
}
const dir = (pts, fromEnd) => { const p = fromEnd ? pts.slice(-6).reverse() : pts.slice(0, 6), a = p[0], b = p[p.length - 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };

// order edges into strokes: body first, pen keeps going the straightest way; headline last, left to right
function order(edges){
  const head = e => { const ys = e.pts.map(p => p[1]), xs = e.pts.map(p => p[0]); return Math.min(...ys) > 530 && Math.max(...ys) < 660 && Math.max(...ys) - Math.min(...ys) < 70 && Math.max(...xs) - Math.min(...xs) > 70; };
  const body = edges.filter(e => !head(e)), heads = edges.filter(head);
  const used = new Set(), strokes = [];
  const deg = n => body.filter(e => !used.has(e) && (e.a === n || e.b === n)).length;
  let pen = null;
  while (used.size < body.length){
    const free = body.filter(e => !used.has(e));
    const starts = free.flatMap(e => [[e, false], [e, true]]).map(([e, rev]) => ({e, rev, n: rev ? e.b : e.a, p: rev ? e.pts[e.pts.length - 1] : e.pts[0]}));
    const odd = starts.filter(s => s.n < 0 || deg(s.n) % 2 === 1);
    const pool = odd.length ? odd : starts;
    const score = s => pen ? Math.hypot(s.p[0] - pen[0], s.p[1] - pen[1]) : s.p[0] - s.p[1] * 0.3;
    let s = pool.reduce((m, x) => score(x) < score(m) ? x : m);
    let stroke = [], e = s.e, rev = s.rev;
    while (e){
      used.add(e);
      const pts = rev ? [...e.pts].reverse() : e.pts;
      stroke = stroke.length ? stroke.concat(pts.slice(1)) : pts.slice();
      const n = rev ? e.a : e.b, d = dir(stroke, true).map(v => -v);
      const next = n < 0 ? [] : body.filter(x => !used.has(x) && (x.a === n || x.b === n));
      if (!next.length) break;
      const pick = next.map(x => { const r = x.a !== n; const dd = dir(r ? [...x.pts].reverse() : x.pts, false); return {x, r, dot: dd[0] * d[0] + dd[1] * d[1]}; }).reduce((m, x) => x.dot > m.dot ? x : m);
      if (pick.dot < -0.2 && next.length > 1) break;   // a sharp turn back: lift the pen
      e = pick.x; rev = pick.r;
    }
    strokes.push(stroke); pen = stroke[stroke.length - 1];
  }
  heads.map(e => e.pts[0][0] <= e.pts[e.pts.length - 1][0] ? e.pts : [...e.pts].reverse()).sort((a, b) => a[0][0] - b[0][0]).forEach(p => strokes.push(p));
  return strokes;
}

// strokes for glyph `d`; `hide` = outline of a base glyph drawn on top (fused shapes), whose area the pen skips
function centreLines(d, hide){
  const R = raster(d), D = distance(R), s = thin(R), {edges, lone} = graph(R, s);
  const skelD = []; for (let k = 0; k < s.length; k++) if (s[k]) skelD.push(D[k]);
  skelD.sort((a, b) => a - b);
  const r = skelD.length ? skelD[Math.floor(skelD.length * 0.9)] : 4;
  // drop short spurs that run from a junction to a loose end
  const spur = Math.max(4, 1.6 * (skelD[skelD.length >> 1] || 4));
  const degree = n => edges.filter(e => e.a === n || e.b === n).length;
  const kept = edges.filter(e => !((e.end[0] !== e.end[1]) && e.px.length < spur && degree(e.end[0] ? e.b : e.a) >= 3));
  let strokes = order(kept).map(p => rdp(smooth(p), 2.5));
  // Thinning stops about half a stroke short of each loose end, so the pen would miss the flat
  // ends and serifs. Push every loose end (one with no other line nearby) out past the outline;
  // the colour is masked by the glyph, so the overshoot never shows.
  const rU = r * S, near = 2.4 * rU, ext = 2.2 * rU;
  const all = strokes.map(p => densify(p, 6));
  const loose = (k, end) => {
    const s = all[k], e = end ? s[s.length - 1] : s[0], cut = Math.ceil(near / 6) + 2;
    return all.every((o, m) => o.every((q, i) => (m === k && (end ? i >= o.length - cut : i < cut)) || (q[0] - e[0]) ** 2 + (q[1] - e[1]) ** 2 > near * near));
  };
  strokes = strokes.map((p, k) => {
    if (p.length < 2) return p;
    let out = p.slice();
    if (loose(k, false)){ const d = dir(p, false); out.unshift([p[0][0] - d[0] * ext, p[0][1] - d[1] * ext]); }
    if (loose(k, true)){ const d = dir(p, true), q = p[p.length - 1]; out.push([q[0] - d[0] * ext, q[1] - d[1] * ext]); }
    return out;
  });
  const H = hide ? raster(hide) : null;
  if (H){
    const split = [];
    for (const st of strokes){ let cur = []; const dense = densify(st, 6);
      for (const p of dense){ if (inside(H, p[0], p[1])) { if (cur.length) split.push(cur); cur = []; } else cur.push(p); }
      if (cur.length) split.push(cur); }
    strokes = split.filter(p => len(p) > 30).map(p => rdp(p, 2.5));
  }
  // A pen wider than the stroke fills its corners and flares as it passes; the glyph mask trims it.
  const w = Math.round((PEN * r + 4) * S);
  // coverage of the visible area by the pen of width w
  const dense = strokes.flatMap(p => densify(p, 6));
  let tot = 0, cov = 0;
  for (let j = 0; j < R.H; j++) for (let i = 0; i < R.W; i++){
    if (!R.g[j * R.W + i]) continue;
    const x = (R.ox + i + 0.5) * S, y = (R.oy + j + 0.5) * S;
    if (H && inside(H, x, y)) continue;
    tot++;
    if (dense.some(p => (p[0] - x) ** 2 + (p[1] - y) ** 2 <= (w / 2) ** 2)) cov++;
  }
  return {w, s: strokes.map(p => p.map(q => [Math.round(q[0]), Math.round(q[1])])), cover: tot ? cov / tot : 1, lone: lone.length};
}
function densify(pts, step){
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++){ const [a, b] = [pts[i - 1], pts[i]], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let k = 1; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); }
  return out;
}

module.exports = {centreLines};
