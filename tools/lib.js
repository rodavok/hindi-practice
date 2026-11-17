"use strict";
// Shared helpers for the validator, build and port tools.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CONTENT = path.join(ROOT, "content");

const isHi = s => /[ऀ-ॿ]/.test(s);
const PUNCT = /[।?!,.…“”"'()]/g;
// Hindi tokens of a string, punctuation stripped, gap markers dropped.
const hiTokens = s => String(s).split(/\s+/).map(w => w.replace(PUNCT, "")).filter(w => w && w !== "___" && isHi(w));
// Word list used for alignment (same rule as the engine's words()).
const words = s => String(s).split(/\s+/).filter(w => w && !/^[।?!,.…]+$/.test(w));
const alignTargets = en => {
  const out = [];
  String(en).replace(/(\{[^}]+\}|[^\s\[\]{}]+)\[([\d+]+)\]/g, (m, w, ix) => { ix.split("+").forEach(i => out.push(+i)); return m; });
  return out;
};

function loadUnits(){
  return fs.readdirSync(CONTENT).filter(f => /^unit\d\d\.json$/.test(f)).sort()
    .map(f => Object.assign(JSON.parse(fs.readFileSync(path.join(CONTENT, f), "utf8")), {_file: f}));
}
const loadLedger = () => JSON.parse(fs.readFileSync(path.join(CONTENT, "ledger.json"), "utf8"));

module.exports = {ROOT, CONTENT, isHi, hiTokens, words, alignTargets, loadUnits, loadLedger};
