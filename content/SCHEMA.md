# Content schema

One file per unit, `content/unitNN.json`, plus the cumulative `content/ledger.json`.
`node tools/validate.js` checks all of it; `node tools/build.js` bundles it into `dist/index.html`.

## ledger.json

```json
{ "1": { "forms": { "लड़का": "laṛkā", "लड़के": "laṛke" },
         "grammar": [ { "id": "be-present", "title": "Present tense of होना" } ] },
  "2": { ... } }
```

- `forms`: every Hindi word form the book has taught by the end of that unit and that is not in an earlier unit's entry, with its romanisation. Inflected forms are listed separately (लड़का, लड़के, लड़कों are three entries). Proper names used in items go here too.
- `grammar`: the grammar points the unit introduces. Items may only rely on grammar from this unit or earlier.
- A form is usable in unit N if it appears in the ledger entry for N or any earlier unit.

## unitNN.json

| key | meaning |
| --- | --- |
| `id`, `n` | `"unit2"`, `2`. `id` is also the localStorage key suffix (`hindi-practice:unit2`). |
| `title`, `titleHi`, `scope`, `pages` | Display title, a Hindi subtitle, one-line scope (also sent to the LLM helper), book pages read. |
| `skills` | `{ key: label }` for the item skills used in this unit. `vocab`, `listen` and `build` exist already. |
| `vocab` | `[{ hi, en, c, g? }]`. `c`: `n` noun, `a` adjective, `p` pronoun, `v` verb, `x` other. `g`: `m`/`f`, required for nouns. Drives the generated word, listening and matching lessons. |
| `gloss` | `{ hindiWord: "note" }` for words with no English counterpart in alignments (क्या, जी, को…). |
| `distractors` | `{ form: romanisation }` for wrong-choice forms that are not taught words, including deliberately wrong forms such as लड़काएँ. |
| `lessons` | `[{ id, title, desc, skill, items: [...] }]`. Lesson ids `words`, `listen`, `match`, `test`, `mistakes` are reserved (generated). |
| `test` | `{ vocab: 5, lessonId: n, ... }`: how many items the unit test draws from each lesson. |

### Item: multiple choice (`"t": "mc"`)

```json
{ "id": "be:2", "t": "mc", "q": "Fill the gap", "hi": "यह कमरा साफ़ ___ ।",
  "say": "यह कमरा साफ़ है ।", "en": "This[0] room[1] is[3] clean[2].",
  "a": "है",
  "wrong": [["हैं", "हैं goes with plural subjects…"], ["हो", "…"]],
  "why": "The subject is one thing, so it takes है." }
```

- `q` question text; `hi` Hindi prompt shown large (optional, `___` marks a gap); `audio: true` shows a play button for `hi`.
- `say`: the full Hindi sentence, read aloud after answering and used for the word-by-word panel.
- `en`: English with alignment marks for `say`. `word[i]` ties a word to Hindi word `i` (0-based, punctuation not counted), `{two words}[i]` ties a phrase, `word[i+j]` ties one English word to two Hindi words. Every Hindi word in `say` must be aligned or glossed.
- `a`: right answer. `wrong`: `[choice, explanation]` pairs, at least two. The explanation is shown when that choice is picked, followed by `why` (unless already contained in it).

### Item: tap the tiles (`"t": "tiles"`)

```json
{ "id": "tl:0", "t": "tiles", "en": "This[0] room[1] is[3] big[2].",
  "ans": ["यह","कमरा","बड़ा","है"], "alt": [["…"]],
  "wrong": [["बड़ी", "You used बड़ी where बड़ा is needed…"], ["हैं", "…"]],
  "order": "optional explanation for right words in the wrong order" }
```

- `ans` the tiles in order; `alt` other accepted answers: other orders, or a correct shorter sentence using only some of the tiles; `wrong` the extra tiles with the explanation shown if the learner uses one. Hard level pads the bank with the unit's `distractors` forms (single words only), explained as “not a correct form here”. Never put a real word that could fit a tile sentence into `distractors`.

## Validator rules

Fails when: a Hindi token has no romanisation; an answer is missing from its choices; choices or extra tiles contain duplicates; an alignment mark points outside the sentence or a Hindi word is neither aligned nor glossed; a wrong choice or extra tile has no explanation; a prompt, sentence, right answer or vocab word uses a form not in the ledger up to that unit; a wrong choice is neither in the ledger nor in the unit's `distractors`.

## words.json

Written by `node tools/words.js` from the units, the ledger and `content/authoring/words.js`. Do not edit by hand.

```json
{ "kinds": { "imp-ap": ["Commands", "आप command", 5] },
  "heads": { "लेना": { "s": [[5, "v", "", "to take, receive"]],
                      "f": [["लीजिए", "imp-ap", 1]],
                      "r": [["देना", "opp"], ["खींचना", "syn", "take"]],
                      "n": [[11, "Its perfective is irregular: …"]],
                      "w": [[5, "ir:5"]], "x": [[5, "ir:0"]] } } }
```

- `kinds`: what a form is: `[group, label, unit the grammar is taught]`. A label is shown only from that unit.
- `heads`: one entry per vocabulary headword, plus a plain entry (`s` empty) for every other ledger form that belongs to no headword (names, -वाला compounds…).
  - `s` meanings `[unit, c, g, en]`; `f` forms `[form, kinds (space-separated), irregular]`, ledger forms only;
  - `r` related `[headword, kind, shared English?]`, kind one of `opp`, `syn` (same English sense), `pair` (masculine/feminine), `root` (verbs of one root), `part` (made of), `in` (used in);
  - `n` notes `[unit, text]`; `w` items whose `why` names the word or a form of it; `x` items that use it in a sentence, `[unit, item id]`.
- The app shows a page only for taught forms of open units, and an example sentence only once its item has been answered or its unit passed.

