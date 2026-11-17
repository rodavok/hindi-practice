# Prompt for the next session

Paste the text below into a new Claude Code chat opened in this folder.

---

Continue the Hindi practice app. Read `CLAUDE.md` first, including "Lessons from Units 1–13". Then read `PROGRESS.md` and `content/SCHEMA.md`.

**Where things stand**
- Units 1–13 are done and committed, one commit per unit, on `master`. There is no remote; don't push.
- `node tools/validate.js` passes with one old warning (Unit 1 `us:7`).
- Units 1–9 were click-tested in the browser. Units 10–13 were not, because the browser pane refused to open `dist/index.html`. Only the validator and a manual read checked them.

**Next: Units 14–18, one unit at a time.** After each unit, stop and ask me before starting the next.

| Unit | Book pages | PDF pages |
| --- | --- | --- |
| 14 | 176–191 | 210–225 |
| 15 | 192–205 | 226–239 |
| 16 | 206–219 | 240–253 |
| 17 | 220–233 | 254–267 |
| 18 | 234–end of unit (check where it ends) | 268–… |

For each unit:
1. Render only that unit's pages into `pages/`.
2. Write `content/authoring/unitNN.js`, using `content/authoring/unit13.js` as the template.
3. Follow every rule in `CLAUDE.md`.
4. Run `node content/authoring/unitNN.js && node tools/validate.js && node tools/build.js`.
5. Review a sample item from every lesson. Try a browser click-test of `dist/index.html`, on Normal and Hard levels, and say if it isn't possible.
6. Add the unit's row and its unsure items to `PROGRESS.md`.
7. Delete any scratch copies of book text.
8. Commit only the unit's files, with explicit paths.
9. Offer to republish `dist/artifact.html` to https://claude.ai/artifact/ALQsr6PWsLSuLkKLYZhHeb so the phone gets the update. Leave `capabilities` out.

If you hand a unit to a subagent, give it the "Process" brief from `CLAUDE.md`:
- save its work early, in stages
- don't touch `src/` or `tools/`
- don't commit
- clean up its scratch copies

**Also open, not started (ask before doing):**
- Browser-test Units 10–13. Opening the published artifact may work where the local file didn't.
- Audio: propose one free, local, Hindi-capable TTS option, preferably Piper, before installing anything. Only `spd-say` is on the machine now. The build already embeds clips from `audio/unitNN/manifest.json`.
- The local "Explain more" server for `/api/explain`, which reads the API key from an env var and never puts it in the page.
