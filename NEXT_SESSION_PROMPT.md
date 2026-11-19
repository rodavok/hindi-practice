# Prompt for the next session

Paste the text below into a new Claude Code chat opened in this folder.

---

Continue the Hindi practice app. Read `CLAUDE.md` first, including "Lessons from Units 1–13". Then read `PROGRESS.md` and `content/SCHEMA.md`.

**Where things stand**
- All 18 units are done and committed on `master`, one commit per unit. There is no remote; don't push.
- `node tools/validate.js` passes with one old warning (Unit 1 `us:7`).
- Units 1–9 were click-tested in the browser. Units 10–18 were not: the browser pane refuses `dist/index.html` and `http://localhost` (a local server answered `curl`, but navigation was denied). Only the validator, an alignment dump and a manual read checked them.
- `dist/artifact.html` with all 18 units was republished to https://claude.ai/artifact/ALQsr6PWsLSuLkKLYZhHeb on 2026-11-19 (version 7). To update it again, publish to that URL and leave `capabilities` out.

**Open, not started (ask before doing):**
- Browser-test Units 10–18 on Normal and Hard. Opening the published artifact may work where the local file didn't.
- Review the "Sentences I'm unsure about" lists in `PROGRESS.md` for Units 14–18 with a Hindi speaker if possible.
- `tools/glyphs.js` has no visarga (ः) rule, so दुःख was left out of Unit 18. Adding it would let the word back in.
- Audio: propose one free, local, Hindi-capable TTS option, preferably Piper, before installing anything. Only `spd-say` is on the machine now. The build already embeds clips from `audio/unitNN/manifest.json`.
- The local "Explain more" server for `/api/explain`, which reads the API key from an env var and never puts it in the page.
