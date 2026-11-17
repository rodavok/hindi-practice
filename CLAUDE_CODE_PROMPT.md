# Prompt for Claude Code: build the rest of the Hindi practice app

Start Claude Code in the `Hindi Learning` folder and paste everything below the line.

---

This folder is the project root for a personal, Duolingo-style Hindi practice app. I'm learning from a textbook I have here as a PDF (Snell & Weightman, *Complete Hindi*, 2016). A working pilot for Unit 1 is at `pilot/index.html`. Your job is to turn the pilot into a proper project and produce Units 2 to 18.

## Read first

Read `pilot/index.html` end to end before planning. It is one self-contained page containing:

- `COURSE`: Unit 1's content (`vocab`, and item lists `be`, `plural`, `adj`, `tiles`, `usage`).
- `TR`: the romanisation of every Hindi word form shown on screen.
- `AUDIO`: an empty map from Hindi text to an audio data URI, played in preference to any synthesised voice.
- `LEVELS`: Easy, Standard and Hard, which set the number of choices per vocabulary question, pairs per matching round, and extra tiles per sentence-building question.
- `explain` and `explainTiles`: a rule-based reason for every wrong choice, shown after the answer and again in the end-of-lesson review beside "You chose" and "Right answer".
- Alignment marks in English sentences for colour-matched translations: `word[i]` ties an English word to Hindi word `i`, `{two words}[i]` ties a phrase, `word[i+j]` ties one English word to two Hindi words. `GLOSS` explains Hindi words that have no English counterpart.
- The engine: multiple choice, listen-and-choose, tap-the-tiles sentence building, match pairs, best score per lesson, accuracy per skill, a missed-items queue, and a unit test with an 80% pass mark. Progress is in `localStorage`.
- Two hooks that only work in the hosted copy of the page and resolve to nothing locally: `claude.use("sample")` behind "Ask Claude to explain more", and `claude.use("tts")` as a fallback voice.

Keep the pilot's behaviour, look (greys with a purple accent, light and dark) and click-only interaction unless I ask otherwise. I do not want to type Hindi.

## Facts about the PDF

- 388 pages, a scan with no text layer and no bookmarks. Render pages to images and read them visually; `pdftoppm -r 125 -gray` is legible for Devanagari.
- Book page N is PDF page N + 34 (Unit 1 starts on book page 2, PDF page 36).
- Unit start pages, book numbering: 1: 2, 2: 14, 3: 26, 4: 38, 5: 50, 6: 64, 7: 78, 8: 90, 9: 104, 10: 118, 11: 130, 12: 146, 13: 160, 14: 176, 15: 192, 16: 206, 17: 220, 18: 234. Appendixes 257, key to exercises 265, Hindi–English glossary 305, English–Hindi glossary 325.
- Each unit has two or three dialogues, numbered grammar sections, a quick-vocab list per dialogue, exercises after the dialogues, a unit vocabulary list, and a "Test yourself" section.
- The book has its own spellings for some words (for example कुरसी). Follow them so the app matches what I'm reading.
- Never load the whole PDF. Work one unit at a time, and only that unit's pages.

## Phase 1: project setup (stop for my review at the end)

1. `git init`. Add the PDF and any rendered page images to `.gitignore`. Nothing derived from the PDF goes in a public repository.
2. Propose, then build, this layout:
   - `content/unitNN.json`: one file per unit, with a documented schema (`content/SCHEMA.md`).
   - `content/ledger.json`: the cumulative list of every word form and grammar point introduced so far, by unit. This is what enforces "only use what has been taught".
   - `src/`: the shared engine, split out of the pilot.
   - `tools/validate`: the validator described below.
   - `tools/build`: emits a single self-contained HTML file to `dist/`.
   - `CLAUDE.md`: the rules in this prompt that every later session needs, so I don't have to paste it again.
   - `PROGRESS.md`: one row per unit with its status, item counts, and the items you were unsure about.
3. Port Unit 1 from the pilot into this layout and show that it behaves the same.
4. Add a home screen listing all units with progress. A unit unlocks when the previous unit's test is passed, with a switch to override.
5. Add spaced review: a daily session that draws missed and stale items from all completed units.

## Phase 2: Unit 2, end to end (stop for my review)

Do Unit 2 completely using the per-unit steps below, so I can judge quality before you repeat it sixteen times.

## Phase 3: Units 3 to 18

One unit per session or subagent, in order. After each unit: run the validator, rebuild, update `PROGRESS.md` and the ledger, and commit. Stop and ask me only if a unit needs a new item type or explanation rule you are unsure how to design.

## Per-unit steps

1. Render that unit's pages and read them.
2. Record the unit's vocabulary (Hindi, romanisation, English, part of speech, gender) and its grammar points, and add them to the ledger.
3. Write **new** practice items that drill that vocabulary and grammar. Take the kinds of practice from the unit's own exercises (gap fill, transformation, translation, comprehension) but compose every sentence yourself. Do not transcribe the book's dialogues, reading passages or exercise text into the app; individual words and grammar facts are fine. Pen-and-paper prompts don't convert directly to multiple choice in any case.
4. Use only words and grammar from the ledger up to and including this unit.
5. Make wrong choices plausible: other forms of the same word, or words of the same type from this unit.
6. Give every sentence item alignment marks, and every wrong choice an explanation. Later units will need new explanation rules (postpositions, oblique case, tenses, compound verbs) and new click-based item types; add them to the engine as needed.
7. Use the key to exercises only to confirm your understanding of a grammar point.
8. Aim for 60 to 80 items per unit across the skills that unit teaches, plus a unit test.

## Validator

It must fail if any of these is true: a Hindi token lacks a romanisation; an answer is missing from its choices; choices contain duplicates; an alignment mark points outside the sentence or leaves a Hindi word unaccounted for; a wrong choice has no explanation; an item uses a word form that is not in the ledger for that unit or earlier.

## Audio

The pilot tries, in order: clips in `AUDIO`, a Hindi voice from the browser's speech synthesis, then the hosted page's built-in voice. I'm on Linux, where browsers other than Google Chrome usually have no Hindi voice. I want free, local, Hindi-specific speech, not a paid general-purpose service. Check what works on my machine and propose one option before implementing:

- Preferred: generate one clip per word and sentence at build time with Piper, which has Hindi (`hi_IN`) voices, and store them per unit. This works offline in any browser.
- eSpeak NG through speech-dispatcher, which gives Firefox a Hindi voice. Accurate but robotic.
- Relying on Google Chrome's online Hindi voice.

Verify the current state of each option yourself; don't trust this list.

## "Explain more" button

Replace the hosted hook with a local one that sends the question, my answer, the right answer and the unit's scope to an LLM. Keep the API key out of the page: call the API from a small local server that reads the key from an environment variable.

## Constraints

- Private study only. Keep the PDF and anything derived from it out of any public repository.
- No accounts or backend beyond the local helper above. If syncing progress across devices is added later, use a proper authentication method (an established identity provider or passkeys, server-side sessions, no home-made password storage) and say so in the plan.
- Check your Hindi carefully. For every unit, list in `PROGRESS.md` any item you are unsure about so I can review it.

Begin with Phase 1: read the pilot, then show me the proposed schema and layout before writing code.
