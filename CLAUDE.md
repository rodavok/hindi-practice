# Hindi practice app

A personal, Duolingo-style practice app for Snell & Weightman, *Complete Hindi* (2016). Private study only.

## Layout

- `content/unitNN.json` — one unit's content. Schema: `content/SCHEMA.md`.
- `content/ledger.json` — cumulative word forms and grammar points by unit. Enforces "only use what has been taught".
- `content/authoring/unitNN.js` — the script that generates `unitNN.json` and the unit's ledger entry. Edit this, not the JSON. Run `node content/authoring/unitNN.js`. Helpers in `tools/author.js` (`gap`, `meaning`, `mc`, `tiles`, `agreeWhy`, `writeUnit`).
- `src/engine.js`, `src/style.css`, `src/shell.html` — the shared engine, split out of `pilot/index.html` (kept for reference).
- `tools/validate.js` — must pass before anything is committed: `node tools/validate.js [unit]`.
- `tools/build.js` — writes `dist/index.html` (one self-contained page, gitignored).
- `PROGRESS.md` — one row per unit, plus items to review.

## Rules for every unit

- The PDF is a scan with no text layer. Render only the unit's pages: `pdftoppm -r 125 -gray -f A -l B -png <pdf> pages/uNN` (`pages/` is gitignored). Book page N = PDF page N + 34. Never load the whole PDF.
- Unit start pages (book): 1:2 2:14 3:26 4:38 5:50 6:64 7:78 8:90 9:104 10:118 11:130 12:146 13:160 14:176 15:192 16:206 17:220 18:234.
- Record the unit's vocabulary (Hindi, romanisation, English, part of speech, gender) and grammar points. Follow the book's spellings (कुरसी, बहिन, हिन्दी…).
- Compose every sentence yourself. Do not transcribe the book's dialogues, reading passages or exercise text. Individual words and grammar facts are fine. Use the key to exercises only to confirm a grammar point.
- Use only words and grammar from the ledger up to and including the unit. `writeUnit` refuses undeclared tokens; declare only forms the book has taught by then.
- Wrong choices must be plausible: other forms of the same word, or same-type words from the unit. Deliberately invalid forms go in `fake` (→ `distractors`). Hard level pads sentence building with these, so a `fake` entry must never be a word that could fit any of the unit's tile sentences.
- Every sentence item gets alignment marks; every wrong choice and extra tile gets an explanation.
- Aim for 60–80 fixed items per unit across the skills the unit teaches, and a `test` spec of about 22 items.
- Romanisation style: as the book (ā ī ū ṛ ṭ ḍ ṇ ś ṣ, nasal vowels ã ā̃ ĩ ī̃ ũ ū̃ ẽ õ, nukta letters as kh g z f without underline).
- Click-only interaction; no typed Hindi. Keep the pilot's look (greys, purple accent, light and dark).
- Keep the PDF, page images and `dist/` out of any public repository.
- Check Hindi carefully. List every item you are unsure about in `PROGRESS.md`.

## After each unit

`node content/authoring/unitNN.js && node tools/validate.js && node tools/build.js`, update `PROGRESS.md`, commit (explicit paths, never `git add -A`).
