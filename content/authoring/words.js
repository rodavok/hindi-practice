"use strict";
// Hand-made tables for the word pages, read by tools/words.js (which writes content/words.json).
// Everything here is checked against the vocabulary and the ledger: a headword must be a vocab
// word, a form must be a ledger form, and every Hindi token in a note must be taught by the note's unit.
// Forms of regular words are generated from their part of speech and gender, so only exceptions go here.

// Irregular verb forms: headword → { form: kind id }. Forms not (yet) in the ledger are skipped. A kind id may list several readings, joined by space.
// Kinds are defined in tools/words.js (KINDS). These forms are marked “irregular” on the page.
const irregular = {
  "करना": {"किया":"perf-ms", "किए":"perf-mp", "किये":"perf-mp", "की":"perf-f", "कीं":"perf-fp", "कीजिए":"imp-ap", "कीजिएगा":"imp-apg"},
  "लेना": {"लिया":"perf-ms", "लिए":"perf-mp", "लिये":"perf-mp", "ली":"perf-f", "लीं":"perf-fp", "लो":"imp-tum subj-tum", "लीजिए":"imp-ap", "लीजिएगा":"imp-apg"},
  "देना": {"दिया":"perf-ms", "दिए":"perf-mp", "दिये":"perf-mp", "दी":"perf-f", "दीं":"perf-fp", "दो":"imp-tum subj-tum", "दीजिए":"imp-ap", "दीजिएगा":"imp-apg"},
  "पीना": {"पीजिए":"imp-ap", "पीजिएगा":"imp-apg"},
  "जाना": {"गया":"perf-ms", "गए":"perf-mp", "गये":"perf-mp", "गई":"perf-f", "गयी":"perf-f", "गईं":"perf-fp"},
  "होना": {"हूँ":"be-1 subj-1", "है":"be-3", "हो":"be-tum subj-tum subj-3", "हैं":"be-pl", "था":"was-ms", "थे":"was-mp", "थी":"was-f", "थीं":"was-fp",
           "हुआ":"perf-ms", "हुए":"perf-mp", "हुई":"perf-f", "हुईं":"perf-fp", "हों":"subj-pl",
           "हूँगा":"fut-1m", "हूँगी":"fut-1f", "होगा":"fut-3m", "होगी":"fut-3f", "होगे":"fut-tumm", "होंगे":"fut-plm", "होंगी":"fut-plf"}
};
// Forms that are regular but belong to a second construction as well (not marked irregular).
const alsoKinds = {
  "रहना": {"रहा":"cont-ms", "रहे":"cont-mp", "रही":"cont-f", "रहीं":"cont-fp"}
};

// Pronoun families: the direct form → { related form: kind id }. Many of these forms are headwords too.
const pronouns = {
  "मैं": {"मुझ":"pr-obl", "मुझे":"pr-ko", "मेरा":"pr-poss", "मुझसे":"pr-se", "मुझी":"pr-hi", "मैंने":"pr-ne"},
  "हम": {"हमें":"pr-ko", "हमारा":"pr-poss", "हमसे":"pr-se", "हमीं":"pr-hi", "हमने":"pr-ne"},
  "तुम": {"तुम्हें":"pr-ko", "तुम्हारा":"pr-poss", "तुमसे":"pr-se", "तुम्हीं":"pr-hi", "तुमने":"pr-ne"},
  "आप": {"आपका":"pr-poss", "आपसे":"pr-se", "आपको":"pr-ko-full", "आपने":"pr-ne"},
  "यह": {"ये":"pr-pl", "इस":"pr-obl", "इसे":"pr-ko", "इसका":"pr-poss", "इसी":"pr-hi-obl", "यही":"pr-hi", "इन":"pr-oblpl", "इन्हें":"pr-kopl", "इनका":"pr-posspl", "इन्हीं":"pr-hi-oblpl", "इसने":"pr-ne", "इन्होंने":"pr-ne"},
  "वह": {"वे":"pr-pl", "उस":"pr-obl", "उसे":"pr-ko", "उसका":"pr-poss", "उसी":"pr-hi-obl", "वही":"pr-hi", "उन":"pr-oblpl", "उन्हें":"pr-kopl", "उनका":"pr-posspl", "उन्हीं":"pr-hi-oblpl", "उसने":"pr-ne", "उन्होंने":"pr-ne"},
  "कौन": {"किस":"pr-obl", "किसे":"pr-ko", "किसका":"pr-poss", "किन":"pr-oblpl", "किन्हें":"pr-kopl", "किनका":"pr-posspl", "किसने":"pr-ne", "किन्होंने":"pr-ne"},
  "कोई": {"किसी":"pr-obl", "किसीने":"pr-ne"},
  "जो": {"जिस":"pr-obl", "जिसे":"pr-ko", "जिसका":"pr-poss", "जिन":"pr-oblpl", "जिन्हें":"pr-kopl", "जिनका":"pr-posspl", "जिसने":"pr-ne", "जिन्होंने":"pr-ne"}
};
// Small words that inflect like -ā adjectives but are not listed as adjectives.
const inflectLikeA = ["का", "वाला", "सा", "कितना", "कैसा", "जितना", "उतना", "इतना", "जैसा", "वैसा", "ऐसा"];

// Opposites (both must be headwords). Shown under “Related” as “opposite”.
const opposites = [
  ["बड़ा","छोटा"], ["अच्छा","बुरा"], ["नया","पुराना"], ["साफ़","गंदा"], ["महँगा","सस्ता"], ["मोटा","पतला"], ["मोटा","दुबला"], ["गरम","ठंडा"],
  ["आसान","मुश्किल"], ["आसान","कठिन"], ["सही","ग़लत"], ["अमीर","ग़रीब"], ["संभव","असंभव"], ["मुमकिन","नामुमकिन"], ["ख़ूबसूरत","बदसूरत"],
  ["दाहिना","बायाँ"], ["अगला","पिछला"], ["बंद","खुला"], ["ज़्यादा","कम"], ["जवान","बूढ़ा"],
  ["आना","जाना"], ["देना","लेना"], ["उठना","बैठना"], ["हँसना","रोना"], ["ख़रीदना","बेचना"], ["खोलना","बंद करना"], ["पूछना","बताना"],
  ["याद करना","भूलना"], ["जीना","मरना"], ["बनाना","तोड़ना"],
  ["यहाँ","वहाँ"], ["इधर","उधर"], ["ऊपर","नीचे"], ["अंदर","बाहर"], ["के अंदर","के बाहर"], ["के ऊपर","के नीचे"], ["के आगे","के पीछे"],
  ["जी हाँ","जी नहीं"], ["दिन","रात"], ["सुबह","शाम"], ["आदमी","औरत"], ["पति","पत्नी"], ["भाई","बहिन"], ["माता","पिता"],
  ["माँ","बाप"], ["पहले","बाद में"], ["से पहले","के बाद"], ["सच","झूठ"], ["कभी कभी","कभी नहीं"], ["हमेशा","कभी नहीं"]
];
// Verbs from one root that the generated rules don't find (the -lā causatives and a few irregular pairs).
const sameRoot = [
  ["खाना","खिलाना"], ["देना","दिलवाना"], ["सोना","सुलाना"], ["धोना","धुलना"], 
  ["बैठना","बिठाना"], ["लेटना","लिटाना"], ["टूटना","तोड़ना"], ["टूटना","तुड़ाना"], ["तोड़ना","तुड़ाना"], ["छूटना","छोड़ना"], ["बिकना","बेचना"],
  ["देखना","दिखना"], ["देखना","दीखना"], ["निकलना","निकालना"], ["घूमना","घुमाना"], ["मरना","मारना"],
  ["कहना","कहलवाना"], ["लदना","लादना"], ["उतरना","उतारना"]
];
// Pairs to drop from the generated lists: [a, b] for related words, or [form, headword] for forms.
const notRelated = [];
const notForm = [["लड़के","लड़ना"], ["डरो","डर"]];

// Notes on single words, in my own wording: headword → [[unit, text]]. Hindi in the text must be taught by that unit.
const notes = {
  "करना": [[5, "Its आप command is irregular: कीजिए."], [11, "Its perfective is irregular: किया, किए, की, कीं."]],
  "लेना": [[5, "Irregular commands: लो with तुम, लीजिए with आप."], [11, "Its perfective is irregular: लिया, लिए, ली, लीं."]],
  "देना": [[5, "Irregular commands: दो with तुम, दीजिए with आप."], [11, "Its perfective is irregular: दिया, दिए, दी, दीं."]],
  "पीना": [[5, "Its आप command is irregular: पीजिए. With तुम it is पियो."]],
  "जाना": [[11, "Its perfective is irregular: गया, गए, गई, गईं."]],
  "होना": [[4, "Its past tense था, थे, थी, थीं agrees with the subject in number and gender."]],
  "लाना": [[11, "Although लाना has an object, it never takes ने in the perfective."]]
};

module.exports = {irregular, alsoKinds, pronouns, inflectLikeA, opposites, sameRoot, notRelated, notForm, notes};
