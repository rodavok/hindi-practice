# Hindi practice app

A personal, Duolingo-style practice app for Snell & Weightman, *Complete Hindi* (2016). Private study only.

## Layout

- `content/unitNN.json` — one unit's content. Schema: `content/SCHEMA.md`.
- `content/ledger.json` — cumulative word forms and grammar points by unit. Enforces "only use what has been taught".
- `content/authoring/unitNN.js` — the script that generates `unitNN.json` and the unit's ledger entry. Edit this, not the JSON. Run `node content/authoring/unitNN.js`. Helpers in `tools/author.js` (`gap`, `meaning`, `mc`, `tiles`, `agreeWhy`, `writeUnit`).
- `src/engine.js`, `src/style.css`, `src/shell.html` — the shared engine, split out of `pilot/index.html` (kept for reference).
- `tools/validate.js` — must pass before anything is committed: `node tools/validate.js [unit]`.
- `tools/glyphs.js` — writes `content/glyphs.json`: every ledger form drawn glyph by glyph (HarfBuzz + Noto Sans Devanagari, font in `tools/fonts/`) with one colour per sound, plus matching romanisation spans. The app shows it under “Sounds” in the answer panel. Needs `npm install` (harfbuzzjs, dev only). Re-run it whenever a unit adds words; `tools/validate.js` fails if a ledger form is missing. Forms it can only colour as one shape are listed on each run and in `PROGRESS.md`.
- `tools/strokes.js` — writes `content/strokes.json`: a centre line for every glyph in `content/glyphs.json` (thinned from the outline by `tools/skeleton.js`). `src/draw.js` uses it to redraw the Hindi already on screen with a pen, one sound colour at a time, while a prompt or an answer is spoken. It never draws text that isn't showing, so Listen answers stay hidden. Re-run it after `tools/glyphs.js`. `demo/` holds the standalone demo it grew from.
- `tools/build.js` — writes `dist/index.html` (one self-contained page, gitignored) and `dist/artifact.html` (the same page without the document skeleton).
- The app is published privately at https://claude.ai/artifact/ALQsr6PWsLSuLkKLYZhHeb, which is how it runs on the phone. To update it, publish `dist/artifact.html` to that URL and leave `capabilities` out so it keeps db, user, sample and tts. Progress is kept in localStorage and synced per user through `db` (`data/users/<id>/<app|unitN>`; newer copy wins, best scores keep the max).
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

## Lessons from Units 1–13

Content quality:
- Never set two correct answers against each other. If both forms are possible, for example नहीं and न with the subjunctive, or an agreeing and a non-agreeing infinitive with चाहिए, don't make one the wrong choice. Pick a contrast that is plainly wrong.
- Don't overstate rules. Explain a wrong choice as "the book teaches X here" or "X is more usual", not "X is wrong", unless it really is ungrammatical.
- Where the book's rule differs from everyday Hindi, follow the book, keep the colloquial form out of the choices, and note it in `PROGRESS.md`.
- Tiles: add an `alt` for every other correct answer the tiles allow. This covers other word orders and correct shorter sentences, such as one that drops an optional pronoun or adverb. Otherwise a right answer gets marked wrong.
- Declare 10 or more `fake` forms per unit so Hard level has padding. Check each against every tile sentence in the unit.
- Explanations go through the Hindi tokenizer, which strips only `।?!,.…“”"'()`. Don't put `;` or other punctuation next to Hindi words; use a comma.
- When a word can't be taught yet, such as टिकट, keep it out of the items rather than declaring it early.

Process:
- When a subagent writes a unit, tell it to:
  - write `content/authoring/unitNN.js` early and in stages (one agent stalled for hours without saving)
  - not edit `src/` or `tools/`
  - not commit
  - delete any scratch copies of book text or page crops when done
- If an agent hits a rate limit, resume it with SendMessage rather than starting over.
- Before committing, review the unit yourself:
  - run the validator
  - read a sample item from every lesson
  - click through every fixed item in the browser, answering wrongly to check the explanations, on Normal and Hard
- If the browser pane can't open `dist/index.html`, which has been the case since Unit 10, say so and list the unit as not browser-tested in `PROGRESS.md`.
- Check that the scratchpad holds no book text before finishing.

## After each unit

`node content/authoring/unitNN.js && node tools/glyphs.js && node tools/strokes.js && node tools/validate.js && node tools/build.js`, update `PROGRESS.md`, commit (explicit paths, never `git add -A`).
