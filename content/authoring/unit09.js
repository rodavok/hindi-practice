"use strict";
// Unit 9 (book pp. 104–117): भविष्य में. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 114–116, Quick Vocab pp. 105 and 108, and words from the grammar sections)
  "अकेले":"akele","अगर":"agar","अच्छा-ख़ासा":"acchā-khāsā","अधिक":"adhik","अमरीका":"amrīkā","असली":"aslī","आसान":"āsān","इंतज़ाम":"intazām",
  "इतिहास":"itihās","इरादा":"irādā","ईव-टीज़िंग":"īv-ṭīzing","उषा":"uṣā","कठिन":"kaṭhin","काल":"kāl","आस-पास":"ās-pās","ख़रीदना":"kharīdnā",
  "ग़लत":"galat","गाना":"gānā","गुंडा":"guṇḍā","गुंडागर्दी":"guṇḍāgardī","ग्यारह":"gyārah","चिल्लाना":"cillānā","छपना":"chapnā","जनता":"jantā",
  "डाक":"ḍāk","तबला":"tablā","तैरना":"tairnā","थोड़ा-बहुत":"thoṛā-bahut","थोड़े":"thoṛe","दर्शन":"darśan","दावत":"dāvat","नमक":"namak",
  "नुक़सान":"nuqsān","नौजवान":"naujavān","परंतु":"parantu","पहचानना":"pahcānnā","पहुँचना":"pahũcnā","प्राध्यापक":"prādhyāpak","फ़ायदा":"fāydā",
  "फ़ोन":"fon","बजाना":"bajānā","बनारस":"banāras","बिकना":"biknā","बोर":"bor","भतीजा":"bhatījā","भविष्य":"bhaviṣy","भोला":"bholā","भोला-सा":"bholā-sā",
  "मँगवाना":"mãgvānā","मचाना":"macānā","मना":"manā","मसूरी":"masūrī","महाराजा":"mahārājā","मिलना":"milnā","मिस्त्री":"mistrī","यहीं":"yahī̃",
  "रवानी":"ravānī","रुकना":"ruknā","रेलगाड़ी":"relgāṛī","रोशनी":"rośnī","लायक़":"lāyaq","योग्य":"yogy","लौटना":"lauṭnā","वहीं":"vahī̃",
  "विश्वविद्यालय":"viśvavidyālay","व्यवस्था":"vyavasthā","समझ":"samajh","सही":"sahī","हवाई":"havāī","जहाज़":"jahāz","हिलना":"hilnā","ही":"hī",
  "पंडित":"paṇḍit","बहुत-सा":"bahut-sā",
  // ही coalesced with pronouns and adverbs (9.4)
  "मुझी":"mujhī","यही":"yahī","वही":"vahī","इसी":"isī","उसी":"usī","हमीं":"hamī̃","उन्हीं":"unhī̃","सभी":"sabhī",
  // the future (9.1)
  "जाऊँगा":"jāū̃gā","जाऊँगी":"jāū̃gī","जाएगा":"jāegā","जाएगी":"jāegī","जाएँगे":"jāẽge","जाएँगी":"jāẽgī",
  "लिखेगा":"likhegā","लिखेगी":"likhegī","लिखेंगी":"likhẽgī","करेंगे":"karẽge","करूँगा":"karū̃gā",
  "आएँगे":"āẽge","आओगे":"āoge","आएगा":"āegā","आएगी":"āegī",
  "सीखेगी":"sīkhegī","सीखेगा":"sīkhegā",
  "ख़रीदूँगी":"kharīdū̃gī","ख़रीदूँगा":"kharīdū̃gā","ख़रीदेगी":"kharīdegī","खाएगा":"khāegā","खाओगे":"khāoge","खाऊँगा":"khāū̃gā",
  "लौटेंगे":"lauṭẽge","लौटेगा":"lauṭegā","लौटोगे":"lauṭoge","बोलेगा":"bolegā",
  "मिलेंगे":"milẽge","मिलेगा":"milegā",
  // irregular futures and vowel shortening (9.1)
  "हूँगा":"hū̃gā","हूँगी":"hū̃gī","होगा":"hogā","होगी":"hogī","होंगे":"hõge","होंगी":"hõgī","होगे":"hoge",
  "लूँगा":"lū̃gā","लूँगी":"lū̃gī","लेगी":"legī","लेंगे":"lẽge","लेंगी":"lẽgī","दूँगा":"dū̃gā","दूँगी":"dū̃gī","देगा":"degā",
  "पिएगा":"piegā","पिएगी":"piegī","छुएगा":"chuegā","छुऊँगा":"chuū̃gā",
  // quantity (9.5)
  "बहुत-सी":"bahut-sī","बहुत-से":"bahut-se","लाल-सा":"lāl-sā","लाल-सी":"lāl-sī","लाल-से":"lāl-se",
  // oblique infinitives (9.6)
  "खाने":"khāne","करने":"karne","पहुँचने":"pahũcne","खेलने":"khelne","भेजने":"bhejne","सुनने":"sunne","चलाने":"calāne","लेने":"lene","बनाने":"banāne",
  // forms produced by earlier units' rules
  "धोओ":"dhoo","आओगी":"āogī","साड़ियाँ":"sāṛiyā̃","पीने":"pīne","पहुँचते":"pahũcte","बनाता":"banātā","सुनता":"suntā",
  "बोलूँगा":"bolū̃gā","बोलेगी":"bolegī","खाएगी":"khāegī","देंगे":"dẽge","छूता":"chūtā",
  "इन्हीं":"inhī̃","तुम्हीं":"tumhī̃","जाने":"jāne","रहने":"rahne","उठने":"uṭhne","गाने":"gāne"
};
const fake = {
  "आओगा":"āogā","जाऊँगे":"jāū̃ge","देऊँगा":"deū̃gā","देऊँगी":"deū̃gī","लेएगी":"leegī","हमहीं":"hamhī̃","उनहीं":"unhī̃","मुझही":"mujhhī",
  "खानें":"khānẽ","खेलनें":"khelnẽ","रहनें":"rahnẽ","चलानें":"calānẽ"
};

const FUT = "The future adds -ū̃gā to the stem for मैं, -egā for तू, यह, वह, -oge for तुम and -ẽge for हम, आप, ये, वे. Feminine forms end in -ī: -ū̃gī, -egī, -ogī, -ẽgī.";
const IRR = "होना, लेना and देना are irregular: हूँगा, होगा, होगे, होंगे — लूँगा, लेगी, लेंगे — दूँगा, देगा, देंगे.";
const PRES = "The future of होना can make an assumption about the present: “must be”. It may follow a continuous (जा रहा होगा) or an imperfective participle (जाता होगा).";
const HI = "ही emphasises or limits the word just before it, often “only”.";
const INF = "The infinitive is also a masculine noun: direct as a subject (जाना), oblique in -e before a postposition or for purpose (जाने).";

const fut = [
  gap("fu:0", "मैं कल सुबह दिल्ली ___ ।", "I[0] {will go}[4] to Delhi[3] {tomorrow morning}[1+2]. (a man speaking)", "जाऊँगा", [["जाऊँगी","जाऊँगी is feminine. The speaker is a man."], ["जाएगा","जाएगा goes with तू, यह and वह. मैं takes -ū̃gā: जाऊँगा."], ["जाऊँगे","Not a word: मैं takes -ū̃gā or -ū̃gī, never a plural ending."]], FUT),
  gap("fu:1", "सीता शाम को एक चिट्ठी ___ ।", "Sita[0] {will write}[5] a[3] letter[4] {in the evening}[1+2].", "लिखेगी", [["लिखेगा","लिखेगा is masculine. Sita is a woman."], ["लिखेंगी","लिखेंगी is plural. Sita, spoken of plainly, takes the singular."]], "वह, यह and a singular noun take -egā (m) or -egī (f)."),
  gap("fu:2", "तुम लोग कल किस समय ___ ?", "{At what time}[3+4] will you[0+1] come[5] tomorrow[2]?", "आओगे", [["आएँगे","-ẽge goes with हम, आप, ये and वे. तुम takes -oge: आओगे."], ["आओगा","Not a word: तुम always takes plural agreement, -oge (or -ogī)."]], "तुम — आओगे (to men or a mixed group), आओगी (to women)."),
  gap("fu:4", "क्या आप कल हमारे घर ___ ?", "Will you[1] come[5] to our[3] house[4] tomorrow[2]?", "आएँगे", [["आओगे","आओगे goes with तुम. आप takes -ẽge: आएँगे."], ["आएगा","आएगा is singular. आप always takes plural agreement."]], "After a vowel stem the endings are spelled with a full vowel letter, as in आएगा, आएँगे."),
  mc("fu:5", "Put it in the future", "पिंकी तबला सीखेगी ।", [["पिंकी तबला सीखती होगी ।","सीखती होगी is the presumptive: “Pinki must be learning the tabla”. The simple future is one word, सीखेगी."], ["पिंकी तबला सीखेगा ।","सीखेगा is masculine. Pinki is a girl."]], "The future has no separate auxiliary: सीखती है becomes सीखेगी.", {hi: "पिंकी तबला सीखती है ।", audio: true, say: "पिंकी तबला सीखेगी ।", en: "Pinki[0] {will learn}[2] the tabla[1]."}),
  gap("fu:7", "मैं आज सारी सब्ज़ी ___ ।", "I[0] {will buy}[4] all[2] the vegetables[3] today[1]. (a woman speaking)", "ख़रीदूँगी", [["ख़रीदूँगा","ख़रीदूँगा is masculine. The speaker is a woman."], ["ख़रीदेगी","ख़रीदेगी goes with वह or यह. मैं takes -ū̃gī."]], FUT),
  mc("fu:8", "Which means “Mohan won't come today”?", "मोहन आज नहीं आएगा ।", [["मोहन आज नहीं आता ।","आता is the imperfective: a habit, “doesn't come”. “Won't come” is the future, आएगा."], ["मोहन आज नहीं आएगी ।","आएगी is feminine. Mohan is a man."]], "नहीं goes before the future verb, which needs no auxiliary."),
  gap("fu:9", "तू यह खाना ___ ?", "Will you[0] eat[3] this[1] food[2]? (to तू, a boy)", "खाएगा", [["खाओगे","खाओगे goes with तुम. तू takes the singular, -egā."], ["खाऊँगा","खाऊँगा goes with मैं."]], "तू takes the same endings as वह — खाएगा, खाएगी."),
  gap("fu:10", "वे लोग कल लखनऊ से ___ ।", "They[0+1] {will return}[5] from[4] Lucknow[3] tomorrow[2].", "लौटेंगे", [["लौटेगा","लौटेगा is singular. वे लोग is plural."], ["लौटोगे","-oge goes only with तुम."]], FUT)
];

const irr = [
  gap("ir:0", "मैं तुम्हें कल पैसे ___ ।", "I[0] {will give}[4] you[1] the money[3] tomorrow[2]. (a man speaking)", "दूँगा", [["देऊँगा","Not a word: देना is irregular, and the stem vowel drops: दूँगा."], ["दूँगी","दूँगी is feminine. The speaker is a man."]], IRR),
  gap("ir:1", "आप कौनसी साड़ी ___ ?", "Which[1] sari[2] will you[0] take[3]? (to a woman)", "लेंगी", [["लेएगी","Not a word: लेना is irregular, लेगी, लेंगी. And आप takes the plural."], ["लेंगे","लेंगे is masculine. This is asked of a woman."]], IRR),
  gap("ir:2", "कल बहुत गर्मी ___ ।", "Tomorrow[0] {it will be}[3] very[1] hot[2].", "होगी", [["होगा","होगा is masculine. The verb agrees with गर्मी, which is feminine."], ["होंगी","होंगी is plural. गर्मी is singular."]], "होना — होगा, होगी (singular); होंगे, होंगी (plural)."),
  gap("ir:3", "तुम कल घर पर ___ ?", "Will you[0] be[4] {at home}[2+3] tomorrow[1]? (to a man)", "होगे", [["होंगे","होंगे goes with हम, आप, ये, वे. तुम takes होगे."], ["होगा","होगा is singular. तुम always takes plural agreement."]], IRR),
  gap("ir:4", "मैं सिर्फ़ एक समोसा ___ ।", "I[0] {will take}[4] only[1] one[2] samosa[3]. (a woman speaking)", "लूँगी", [["लूँगा","लूँगा is masculine. The speaker is a woman."], ["लेगी","लेगी goes with वह or यह. मैं takes लूँगी."]], IRR),
  gap("ir:5", "बच्चा ठंडा दूध नहीं ___ ।", "{The child}[0] {won't drink}[3+4] cold[1] milk[2].", "पिएगा", [["पीता","पीता is the imperfective, “doesn't drink” as a habit. “Won't drink” is the future."], ["पिएगी","पिएगी is feminine. बच्चा is masculine."]], "Stems in -ī and -ū shorten the vowel in the future: पीना → पिएगा, छूना → छुएगा."),
  mc("ir:6", "What is the future of छूना with वह (a man)?", "छुएगा", [["छूता","छूता is the imperfective participle, not the future."], ["छुऊँगा","छुऊँगा is the मैं form. वह takes -egā."]], "छूना shortens ū to u in the future: छुएगा."),
  gap("ir:8", "मैं दस बजे दफ़्तर में ___ ।", "I[0] {will be}[5] in[4] the office[3] {at ten o'clock}[1+2]. (a man speaking)", "हूँगा", [["होगा","होगा goes with तू, यह and वह. मैं takes हूँगा."], ["हूँगी","हूँगी is feminine. The speaker is a man."]], IRR)
];

const pres = [
  gap("pr:0", "कल इस समय मैं लखनऊ जा रहा ___ ।", "{At this time}[1+2] tomorrow[0] I[3] {will be going}[5+6+7] to Lucknow[4]. (a man speaking)", "हूँगा", [["हूँ","हूँ is present: “I am going”. “Will be going” needs the future auxiliary, हूँगा."], ["होगा","होगा goes with वह. मैं takes हूँगा."]], "The future continuous is the stem + रहा, रही, रहे + the future of होना."),
  gap("pr:1", "अगले साल मेरी बेटी लंदन में पढ़ रही ___ ।", "{Next year}[0+1] my[2] daughter[3] {will be studying}[6+7+8] in[5] London[4].", "होगी", [["होगा","होगा is masculine. बेटी is feminine."], ["थी","थी is past: “was studying”."]], "पढ़ रही होगी “will be studying”."),
  gap("pr:2", "राज अभी दफ़्तर में ___ ।", "Raj[0] {must be}[4] in[3] the office[2] now[1].", "होगा", [["है","है states a fact: “Raj is in the office”. “Must be” is an assumption, which the future expresses."], ["थी","थी is feminine and past."]], PRES),
  gap("pr:3", "माँ अभी बग़ीचे में काम कर रही ___ ।", "Mother[0] {must be working}[4+5+6+7] in[3] the garden[2] {right now}[1].", "होंगी", [["होंगे","होंगे is masculine. Respect makes Mother's auxiliary plural, but it stays feminine."], ["हूँगी","हूँगी goes only with मैं."]], PRES),
  gap("pr:4", "वह लड़की हमारे स्कूल में पढ़ती ___ ।", "That[0] girl[1] {presumably studies}[5+6] at[4] our[2] school[3].", "होगी", [["होगा","होगा is masculine. लड़की is feminine."], ["है","है states a fact: “studies”. “Presumably” is an assumption: पढ़ती होगी."]], "The imperfective participle + होगा makes an assumption about a habit or state."),
  mc("pr:6", "Make it an assumption (“must be …ing”)", "सीता चिट्ठी लिख रही होगी ।", [["सीता चिट्ठी लिखेगी ।","लिखेगी is the simple future, “Sita will write”. “Must be writing” keeps रही and puts the auxiliary in the future."], ["सीता चिट्ठी लिख रही होगा ।","होगा is masculine. Sita is a woman."]], "है becomes होगी — रही stays.", {hi: "सीता चिट्ठी लिख रही है ।", audio: true, say: "सीता चिट्ठी लिख रही होगी ।", en: "Sita[0] {must be writing}[2+3+4] a letter[1]."}),
  mc("pr:7", "In वह अभी दफ़्तर में होगा, what does होगा express?", "An assumption about the present: “he must be in the office now”", [["A future event: “he will be in the office”","अभी “now” shows that the speaker means the present. Without it, होगा could also be future."], ["A past habit","A past habit would be the imperfective with था."]], PRES),
  gap("pr:8", "प्रताप कल इस समय हवाई जहाज़ में ___ ।", "{At this time}[2+3] tomorrow[1] Pratap[0] {will be}[7] on[6] the plane[4+5].", "होगा", [["होंगे","होंगे is plural. Pratap, spoken of plainly, takes होगा."], ["था","था is past: “was”. कल with the future means “tomorrow”."]], "कल is “yesterday” or “tomorrow”; the tense decides.")
];

const hi = [
  gap("hi:0", "मैं ___ यह काम करूँगा ।", "{Only I}[0+1] {will do}[4] this[2] work[3]. (a man speaking)", "ही", [["भी","भी means “also”: “I too will do this work”."], ["तो","तो sets मैं against others (“as for me”). “Only” is ही."]], HI),
  gap("hi:1", "मेरा दफ़्तर ___ है ।", "My[0] office[1] is[3] {right here}[2].", "यहीं", [["यही","यही is यह + ही, “this very one”. “Right here” is यहीं, with the nasal."], ["वहीं","वहीं is “right there”."]], "यहाँ + ही = यहीं, वहाँ + ही = वहीं."),
  gap("hi:2", "मुझे ___ साड़ी पसंद है ।", "I[0] like[3+4] {this very}[1] sari[2].", "यही", [["यहीं","यहीं is “right here”, a place. “This very” is यही."], ["वही","वही is “that very one, the same”."]], "यह + ही = यही, वह + ही = वही."),
  gap("hi:3", "हम ___ दिन लौटेंगे ।", "We[0] {will return}[3] {that same}[1] day[2].", "उसी", [["उसे","उसे is उस को, “to him, her, it”. A time phrase needs the oblique उस + ही — उसी दिन."], ["वही","वही is direct. A time phrase is oblique: उसी दिन."]], "उस + ही = उसी, इस + ही = इसी."),
  gap("hi:4", "मेरे पास दो ___ घंटे हैं ।", "I[0+1] have[5] only[3] two[2] hours[4].", "ही", [["भी","भी means “also, even”."], ["सिर्फ़","सिर्फ़ goes before what it limits: सिर्फ़ दो घंटे. ही follows it: दो ही घंटे."]], HI),
  gap("hi:5", "पिंकी ___ आ रही है ।", "Pinki[0] {is coming}[2+3+4] {right now}[1].", "अभी", [["सभी","सभी (सब + ही) means “all, absolutely all”."], ["यहीं","यहीं is “right here”, a place, not a time."]], "अब + ही = अभी “right now”."),
  mc("hi:6", "What does हम + ही become?", "हमीं", [["हमहीं","Not a word: हम + ही coalesces to हमीं."], ["हमें","हमें is हम को, “to us”."]], "Some pronouns coalesce with ही — मुझी, हमीं, उसी, उन्हीं."),
  mc("hi:7", "What does उन + ही become?", "उन्हीं", [["उनहीं","Not a word: उन + ही is written उन्हीं."], ["उन्हें","उन्हें is उन को, “to them”."]], "उन + ही = उन्हीं, इन + ही = इन्हीं, तुम + ही = तुम्हीं."),
  gap("hi:9", "यह ___ दुकान है ।", "This[0] is[3] {the same}[1] shop[2].", "वही", [["वहीं","वहीं is “right there”, a place."], ["वह","यह वह दुकान है is just “this is that shop”. “The same” needs ही — वही."]], "वही and उसी also mean “the same”."),
  gap("hi:10", "मोहन बीमार है, ___ लिए वह आज नहीं आएगा ।", "Mohan[0] is[2] ill[1]; {that's why}[3+4] he[5] won't[7] come[8] today[6].", "इसी", [["यही","यही is direct. Before लिए the pronoun is oblique: इसी लिए."], ["इसे","इसे is इस को, “to this”."]], "इसी लिए “for this very reason, that's why” is more emphatic than इस लिए “so”."),
  mc("hi:11", "Which means “Only Sita knows Gujarati”?", "सीता ही गुजराती जानती है ।", [["सीता गुजराती ही जानती है ।","ही limits the word before it, here गुजराती — “Sita knows only Gujarati”."], ["सीता भी गुजराती जानती है ।","भी means “also”: “Sita too knows Gujarati”."]], "ही follows the word it limits and does not change its case.")
];

const qty = [
  gap("qt:0", "मेरे पास ___ साड़ियाँ हैं ।", "I[0+1] have[4] many[2] saris[3]. (a woman speaking)", "बहुत-सी", [["बहुत-सा","-sā agrees like an adjective. साड़ियाँ is feminine: बहुत-सी."], ["बहुत-से","बहुत-से is masculine. साड़ियाँ is feminine."]], "बहुत-सा, -sī, -se “many, a lot of” agrees with its noun."),
  gap("qt:1", "बाज़ार में ___ लोग थे ।", "{There were}[4] many[2] people[3] in[1] the market[0].", "बहुत-से", [["बहुत-सी","बहुत-सी is feminine. लोग is masculine plural."], ["बहुत-सा","बहुत-सा is singular. लोग is plural."]], "बहुत-से लोग “many people”."),
  gap("qt:2", "उसका कुरता ___ है ।", "His[0] kurta[1] is[3] reddish[2].", "लाल-सा", [["लाल-सी","लाल-सी is feminine. कुरता is masculine."], ["लाल-से","लाल-से is plural. कुरता is singular."]], "-sā after an adjective gives an “-ish” sense and agrees like an -ā adjective."),
  gap("qt:3", "इस गाँव में बहुत ___ लोग रहते हैं ।", "{Very few}[3+4] people[5] live[6+7] in[2] this[0] village[1].", "कम", [["ज़्यादा","बहुत ज़्यादा is “very many, too many”."], ["कम से कम","कम से कम is “at least”, and needs a number after it."]], "कम “little, few, less” and ज़्यादा “much, many, more” are both adjectives and adverbs."),
  gap("qt:4", "मुझे ___ दो घंटे चाहिए ।", "I[0] need[6] {at least}[1+2+3] two[4] hours[5].", "कम से कम", [["ज़्यादा से ज़्यादा","ज़्यादा से ज़्यादा is “at most”."], ["बहुत कम","बहुत कम is “very little”."]], "कम से कम “at least”; ज़्यादा से ज़्यादा and अधिक से अधिक “at most”."),
  gap("qt:5", "मैं ___ पाँच समोसे खाऊँगा ।", "I[0] {will eat}[6] {at most}[1+2+3] five[4] samosas[5]. (a man speaking)", "ज़्यादा से ज़्यादा", [["कम से कम","कम से कम is “at least”."], ["बहुत-से","बहुत-से is “many”, and does not go with a number."]], "ज़्यादा से ज़्यादा “at most”."),
  mc("qt:7", "Which means “many big houses”?", "बहुत-से बड़े मकान", [["बहुत बड़े मकान","Here बहुत qualifies बड़े — “very big houses”."], ["बहुत-सा बड़ा मकान","बहुत-सा बड़ा मकान is singular: “a lot of big house”."]], "-se after बहुत shows that it qualifies the noun, not the adjective."),
  gap("qt:8", "मेरे पास ___ पैसा है ।", "I[0+1] have[4] {a certain amount of}[2] money[3].", "थोड़ा-बहुत", [["बहुत-सा","बहुत-सा पैसा is “a lot of money”."], ["कम से कम","कम से कम is “at least”, and needs a quantity after it."]], "थोड़ा-बहुत “a certain amount, some”.")
];

const inf = [
  gap("in:0", "अकेले ___ मुश्किल है ।", "Living[1] alone[0] is[3] difficult[2].", "रहना", [["रहने","रहने is the oblique, used before a postposition or for purpose. As a subject the infinitive is direct."], ["रहता","रहता is the imperfective participle. “Living” as a subject is the infinitive, रहना."], ["रहनें","Not a word: the oblique infinitive ends in -ne, with no nasal."]], INF),
  gap("in:1", "खाना ___ से पहले हाथ धोओ ।", "Wash[5] {your hands}[4] before[2+3] eating[0+1]. (to तुम)", "खाने", [["खाना","Before a postposition the infinitive is oblique: खाने से पहले."], ["खानें","Not a word: the oblique infinitive ends in -ne, with no nasal."]], INF),
  gap("in:3", "दफ़्तर ___ पर मैं चाय पीता हूँ ।", "{On reaching}[1+2] the office[0] I[3] drink[5+6] tea[4]. (a man speaking)", "पहुँचने", [["पहुँचना","Before पर the infinitive is oblique: पहुँचने पर."], ["पहुँचते","पहुँचते is the imperfective participle. “On reaching” is the oblique infinitive + पर."]], "Oblique infinitive + पर “on …ing”."),
  gap("in:4", "बच्चे बग़ीचे में ___ जा रहे हैं ।", "{The children}[0] {are going}[4+5+6] to play[3] in[2] the garden[1].", "खेलने", [["खेलना","For purpose the infinitive is oblique: खेलने जा रहे हैं."], ["खेलनें","Not a word: the oblique infinitive ends in -ne, with no nasal."]], "The oblique infinitive on its own can express purpose, “in order to”."),
  gap("in:5", "मैं यह चिट्ठी भेजने के ___ डाकघर जा रहा हूँ ।", "I[0] {am going}[7+8+9] {to the post office}[6] to send[3+4+5] this[1] letter[2]. (a man speaking)", "लिए", [["साथ","के साथ means “with”."], ["बाद","के बाद means “after”."]], "Purpose: the oblique infinitive alone, or followed by के लिए or को."),
  gap("in:6", "उसके गाने ___ लायक़ हैं ।", "Her[0] songs[1] are[4] worth[3] {listening to}[2].", "सुनने", [["सुनना","Before लायक़ the infinitive is oblique: सुनने लायक़."], ["सुनता","सुनता is the imperfective participle. “Worth …ing” is the oblique infinitive + लायक़."]], "Oblique infinitive + (के) लायक़ or योग्य “worth …ing”."),
  gap("in:7", "मेरी बेटी को तबला बजाना ___ है ।", "My[0] daughter[1+2] can[5+6] play[4] the tabla[3].", "आता", [["आती","The verb agrees with its subject, the infinitive बजाना, a masculine noun. बेटी has को and does not control the verb."], ["आते","आते is plural. The subject is the infinitive, which is singular."]], "X को + infinitive + आना “X knows how to …”."),
  gap("in:8", "मेरे पति को खाना ___ नहीं आता है ।", "My[0] husband[1+2] can't[5+6+7] cook[3+4].", "बनाना", [["बनाने","As the subject of आना the infinitive is direct: बनाना."], ["बनाता","बनाता is the imperfective participle. आना takes the infinitive."]], "The infinitive is the subject of आता है, so it stays direct."),
  gap("in:9", "मैं अभी अपने भाई को फ़ोन ___ जा रहा हूँ ।", "I[0] {am going}[7+8+9] {to phone}[4+5+6] {my (own)}[2] brother[3] {right now}[1]. (a man speaking)", "करने", [["करना","With जाना of purpose the infinitive is oblique: करने जा रहा हूँ."], ["करूँगा","करूँगा is the future, “I will do”; it cannot go before जा रहा हूँ."]], "Oblique infinitive + जा रहा हूँ “I'm going to …”, as in English."),
  gap("in:10", "गाड़ी ___ में सावधानी ज़रूरी है ।", "Care[3] is[5] essential[4] in[2] driving[1] a car[0].", "चलाने", [["चलाना","Before में the infinitive is oblique: चलाने में."], ["चलानें","Not a word: the oblique infinitive ends in -ne, with no nasal."]], INF),
  mc("in:11", "Why is it जाने in जाने से पहले?", "जाने is the oblique infinitive: a masculine noun before a postposition", [["Because जाने is plural","There is nothing plural here. -ne is the oblique singular, as in कमरे में."], ["Because जाने is the imperfective participle","The participle is जाता, जाते. जाने is the oblique of the infinitive जाना."]], INF)
];

const build = [
  tiles("tl:1", "{The girls}[0] {will go}[4] {to the market}[3] {in the evening}[1+2].", ["लड़कियाँ","शाम","को","बाज़ार","जाएँगी"], [["जाएँगे","जाएँगे is masculine. लड़कियाँ is feminine."], ["जाएगी","जाएगी is singular. लड़कियाँ is plural."]], {alt: [["शाम","को","लड़कियाँ","बाज़ार","जाएँगी"], ["लड़कियाँ","बाज़ार","शाम","को","जाएँगी"]]}),
  tiles("tl:2", "I[0] {will give}[4] you[1] this[2] book[3]. (a woman speaking, to तुम)", ["मैं","तुम्हें","यह","किताब","दूँगी"], [["देऊँगी","Not a word: देना is irregular, दूँगी."], ["दूँगा","दूँगा is masculine. The speaker is a woman."]], {alt: [["मैं","यह","किताब","तुम्हें","दूँगी"]]}),
  tiles("tl:3", "{At this time}[1+2] tomorrow[0] Sita[3] {will be working}[6+7+8+9] in[5] the office[4].", ["कल","इस","समय","सीता","दफ़्तर","में","काम","कर","रही","होगी"], [["होगा","होगा is masculine. Sita is a woman."], ["रहा","रहा is masculine. Sita is a woman: कर रही होगी."]], {alt: [["सीता","कल","इस","समय","दफ़्तर","में","काम","कर","रही","होगी"]]}),
  tiles("tl:4", "Mohan[0] {must be}[4] {at home}[2+3] now[1].", ["मोहन","अभी","घर","पर","होगा"], [["है","है states a fact: “Mohan is at home”. “Must be” is the future, होगा."], ["होगी","होगी is feminine. Mohan is a man."]], {alt: [["अभी","मोहन","घर","पर","होगा"]]}),
  tiles("tl:5", "We[0] {will meet}[3] {right here}[2] tomorrow[1].", ["हम","कल","यहीं","मिलेंगे"], [["यही","यही is “this very one”. “Right here” is यहीं."], ["मिलेगा","मिलेगा is singular. हम takes -ẽge."]], {alt: [["कल","हम","यहीं","मिलेंगे"]]}),
  tiles("tl:6", "My[3] uncle[4+5] lives[6+7] in[2] {this very}[0] village[1].", ["इसी","गाँव","में","मेरे","चाचा","जी","रहते","हैं"], [["यही","यही is direct. Before में the phrase is oblique: इसी गाँव में."], ["रहता","चाचा जी takes plural agreement for respect: रहते हैं."]], {alt: [["मेरे","चाचा","जी","इसी","गाँव","में","रहते","हैं"]]}),
  tiles("tl:7", "{There are}[6] many[3] new[4] shops[5] in[2] this[0] lane[1].", ["इस","गली","में","बहुत-सी","नई","दुकानें","हैं"], [["बहुत-से","बहुत-से is masculine. दुकानें is feminine."], ["नए","नए is masculine. दुकानें is feminine."]], {alt: [["बहुत-सी","नई","दुकानें","इस","गली","में","हैं"]]}),
  tiles("tl:8", "{Getting up}[1] {early in the morning}[0] is[3] good[2].", ["सवेरे","उठना","अच्छा","है"], [["उठने","As a subject the infinitive is direct: उठना."], ["अच्छी","अच्छी is feminine. The infinitive is a masculine noun: अच्छा."]]),
  tiles("tl:9", "After[3+4] finishing[1+2] the work[0] we[5] {will go}[7] home[6].", ["काम","ख़त्म","करने","के","बाद","हम","घर","जाएँगे"], [["करना","Before के बाद the infinitive is oblique: करने."], ["पहले","के पहले means “before”."]], {alt: [["हम","काम","ख़त्म","करने","के","बाद","घर","जाएँगे"]]}),
  tiles("tl:10", "Pinki[0] {is going}[6+7+8] to the station[5] to fetch[4] {her (own)}[1] brother[2+3].", ["पिंकी","अपने","भाई","को","लेने","स्टेशन","जा","रही","है"], [["लेना","For purpose the infinitive is oblique: लेने."], ["उसके","उसके would be someone else's brother. For the subject's own, use अपने."]], {alt: [["पिंकी","स्टेशन","अपने","भाई","को","लेने","जा","रही","है"]]}),
  tiles("tl:11", "Raj[0+1] {can sing}[2+3+4].", ["राज","को","गाना","आता","है"], [["गाने","As the subject of आना the infinitive is direct: गाना."], ["आती","The verb agrees with the infinitive गाना, which is masculine: आता."]]),
  tiles("tl:12", "Will you[0] take[2] tea[1] or[3] coffee[4]? (to a woman)", ["आप","चाय","लेंगी","या","कॉफ़ी"], [["लेएगी","Not a word: लेना is irregular, लेगी, लेंगी."], ["लेंगे","लेंगे is masculine. This is asked of a woman."]], {alt: [["आप","चाय","या","कॉफ़ी","लेंगी"]]})
];

const mean = [
  meaning("mn:0", "राज इस समय रेलगाड़ी में होगा ।", "Raj must be on the train at the moment.", [["Raj was on the train at this time.","Past would be था. होगा with इस समय is an assumption about now."], ["Raj is on the train at the moment, I know.","है would state it as a fact. होगा is an assumption: “must be”."]]),
  meaning("mn:1", "हम अगले महीने ही लौटेंगे ।", "We'll return only next month.", [["We'll return next month too.","“Too” would be भी. ही is “only, not until”."], ["We returned last month.","अगले महीने is “next month”, and लौटेंगे is future."]]),
  meaning("mn:2", "मेरे पास बहुत-से कपड़े हैं ।", "I have lots of clothes.", [["I have very good clothes.","That would be बहुत अच्छे कपड़े. बहुत-से qualifies कपड़े — “many”."], ["I have quite expensive clothes.","-se after an adjective like महँगे would give “quite expensive”. बहुत-से is “many”."]]),
  meaning("mn:3", "इस गाँव का पानी पीने लायक़ नहीं है ।", "The water of this village isn't fit to drink.", [["The water of this village isn't easy to drink.","“Easy” would be आसान. लायक़ is “worth, fit for”."], ["Nobody drinks the water of this village.","Nothing here says “nobody”. पीने लायक़ is “worth drinking, fit to drink”."]]),
  meaning("mn:4", "मेरे छोटे भाई को साइकिल चलाना नहीं आता ।", "My little brother can't ride a bicycle.", [["My little brother doesn't come by bicycle.","With an infinitive as subject, आना means “to know how to”."], ["My little brother doesn't like riding a bicycle.","“Like” would be पसंद."]]),
  meaning("mn:5", "यह कमरा काफ़ी बड़ा है ।", "This room is quite big.", [["This room isn't big enough.","Before an adjective काफ़ी means “quite”. Nothing here is negative."], ["This room is very small.","बड़ा is “big”, and काफ़ी is “quite”, not “very”."]]),
  meaning("mn:6", "इस कमरे में खाना खाना मना है ।", "Eating is not allowed in this room.", [["Eat your food in this room.","A command would be खाओ. खाना खाना is the verbal noun “eating food”."], ["There is no food in this room.","मना “prohibited” is not “there is no”."]])
];

const usage = [
  mc("us:0", "Which three verbs have irregular futures?", "होना, लेना, देना", [["जाना, आना, करना","These are regular: जाऊँगा, आएगा, करेंगे."], ["पीना, छूना, होना","पीना and छूना only shorten their vowel: पिएगा, छुएगा."]], IRR),
  mc("us:1", "Does the future tense use an auxiliary verb?", "No: the future is one word, like बोलेगा", [["Yes: like the present, it adds है","The future needs no auxiliary: बोलेगा on its own is “will speak”."], ["Only in the negative, with नहीं","The negative is नहीं बोलेगा, still with no auxiliary."]], FUT),
  mc("us:2", "What is the difference between यहीं and यही?", "यहीं is “right here”, a place; यही is “this very one”", [["None: यहीं and यही are two spellings of one word","They are different words: यहाँ + ही gives यहीं, यह + ही gives यही."], ["यहीं is plural, यही singular","Neither is plural. The nasal comes from यहाँ."]], "Likewise वहीं “right there” and वही “that very one”."),
  mc("us:3", "What does -sī add in लाल-सी?", "An “-ish” sense: “reddish”", [["“Very red”","That would be बहुत लाल."], ["“Many red (things)”","-sā after बहुत gives “many”; after an adjective it gives “-ish”."]], "-sā agrees like an -ā adjective: लाल-सा, लाल-सी, लाल-से."),
  mc("us:4", "Does ही change the case of the word before it?", "No: ही is not a postposition, so the word stays as it is", [["Yes: the word before ही becomes oblique","Only a postposition makes a word oblique. ही is like भी."], ["Yes: the word before ही becomes plural","ही has nothing to do with number."]], HI),
  mc("us:5", "Which is the formal (Sanskrit-derived) word for “but”?", "परंतु", [["लेकिन","लेकिन is the everyday word."], ["पर","पर is the everyday short word for “but”."]], "Formal words: पुस्तक, कठिन, व्यवस्था, परंतु — everyday words: किताब, मुश्किल, इंतज़ाम, लेकिन.")
];

const unit = {
  id: "unit9", n: 9, title: "In the future", titleHi: "भविष्य में",
  scope: "The future tense (बोलूँगा, बोलेगी, बोलोगे, बोलेंगे) and the irregular futures of होना, लेना, देना, with vowel shortening (पिएगा); the future continuous (जा रहा होगा) and the presumptive future (“must be”: वह दफ़्तर में होगा, पढ़ती होगी); emphatic ही and its coalesced forms (यही, वही, इसी, उसी, यहीं, वहीं, अभी, सभी, हमीं); expressions of quantity (बहुत-सा/-सी/-से, -सा “-ish”, कम, ज़्यादा, कम से कम, ज़्यादा से ज़्यादा, थोड़ा-बहुत, काफ़ी); the infinitive as verbal noun: subject, oblique before postpositions (जाने से पहले, पहुँचने पर), purpose, लायक़/योग्य “worth …ing”, and with आना “know how to”",
  pages: "book 104–116",
  skills: {fut: "The future tense", irr: "Irregular futures", pres: "Future continuous and presumptive", hi: "Emphatic ही", qty: "Expressions of quantity", inf: "The infinitive as noun", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अकेले","alone","x"],["अगर","if","x"],["अच्छा-ख़ासा","really good","a"],["अधिक","much, many, more","a"],["अधिक से अधिक","at the most (formal)","x"],
    ["अमरीका","America","n","m"],["असली","real","a"],["आसान","easy","a"],["इंतज़ाम","arrangement(s), organization","n","m"],["इतिहास","history","n","m"],
    ["इरादा","intention","n","m"],["ईव-टीज़िंग","Eve-teasing (harassment of women)","n","f"],["उषा","dawn","n","f"],["कठिन","hard, difficult (formal)","a"],
    ["कभी","sometime","x"],["कम से कम","at least","x"],["काल","time, period of day","n","m"],["के आस-पास","around, in the vicinity of","x"],
    ["ख़रीदना","to buy, purchase","v"],["ग़लत","wrong (another spelling)","a"],["गाना","song","n","m"],["गाना गाना","to sing (a song)","v"],
    ["गुंडा","lout, hooligan","n","m"],["गुंडागर्दी","hooliganism","n","f"],["ग्यारह","eleven","x"],["चिल्लाना","to shout","v"],["छपना","to be printed","v"],
    ["जनता","the public, the people","n","f"],["ज़्यादा से ज़्यादा","at most","x"],["ठीक करना","to put right, fix","v"],["डाक","mail, post","n","f"],
    ["तबला","tabla (drum)","n","m"],["तैरना","to swim","v"],["थोड़ा-बहुत","a certain amount","x"],["थोड़े","scarcely, hardly","x"],
    ["दर्शन","sight (of), auspicious meeting (with)","n","m"],["दावत","(invitation to) a dinner","n","f"],["ध्यान देना","to pay attention","v"],["नमक","salt","n","m"],
    ["नुक़सान","harm","n","m"],["नौजवान","youth, young man","n","m"],["परंतु","but (formal)","x"],["पसंद करना","to like, approve","v"],
    ["पहचानना","to recognize","v"],["पहुँचना","to arrive","v"],["प्राध्यापक","lecturer","n","m"],["फ़ायदा","profit, advantage, point","n","m"],
    ["फ़ोन करना","to phone","v"],["बजाना","to play (music)","v"],["बनारस","Banaras, Varanasi","n","m"],["बिकना","to be sold","v"],["बोर करना","to bore","v"],
    ["भतीजा","nephew","n","m"],["भविष्य","future","n","m"],["भोला","innocent, guileless","a"],["भोला-सा","quite innocent","a"],["मँगवाना","to order, send for","v"],
    ["मचाना","to create (noise etc.)","v"],["मना","prohibited","a"],["मसूरी","Mussoorie","n","f"],["महाराजा","maharaja","n","m"],["मिलना","to meet (with से)","v"],
    ["मिस्त्री","mechanic, artisan","n","m"],["यहीं","right here","x"],["वहीं","right there","x"],["रवानी","fluency","n","f"],["रुकना","to stop, stay on","v"],
    ["रेलगाड़ी","train","n","f"],["रोशनी","light","n","f"],["लायक़","worth (doing)","x"],["योग्य","worth (doing) (formal)","x"],["लौटना","to return","v"],
    ["विश्वविद्यालय","university","n","m"],["व्यवस्था","arrangement(s) (formal)","n","f"],["समझ","understanding","n","f"],["समझ में आना","to be understood","v"],
    ["सही","true, correct","a"],["हवाई जहाज़","aeroplane","n","m"],["हाथ आना","to come to hand","v"],["हिलना","to move, stir","v"],["ही","only (emphatic)","x"],
    ["पंडित","pandit (title of a scholar)","n","m"],["बहुत-सा","many, a lot of","a"],
    ["यही","this very one","p"],["वही","that very one; the same","p"],["इसी","this very (oblique)","p"],["उसी","that very; the same (oblique)","p"],
    ["हमीं","we ourselves, only we","p"],["सभी","all, absolutely all","x"],["इसी लिए","for this very reason, that's why","x"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {"ही": "emphasises or limits the word before it (“only”, “very”, “right”); often no single English word"},
  lessons: [
    {id: "fut", title: "बोलूँगा, बोलेगी", desc: "The future tense: “will …”", skill: "fut", items: fut},
    {id: "irr", title: "होगा, लूँगा, दूँगा", desc: "Irregular futures; पिएगा, छुएगा", skill: "irr", items: irr},
    {id: "pres", title: "जा रहा होगा", desc: "“Will be …ing” and “must be”", skill: "pres", items: pres},
    {id: "hi", title: "ही, यही, यहीं", desc: "Emphatic ही and its special forms", skill: "hi", items: hi},
    {id: "qty", title: "बहुत-सी, कम से कम", desc: "Many, little, at least, at most", skill: "qty", items: qty},
    {id: "inf", title: "जाने से पहले", desc: "The infinitive as a noun: “going”, “to go”", skill: "inf", items: inf},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "The future, ही, -सा, formal words", skill: "usage", items: usage}
  ],
  test: {vocab: 4, fut: 3, irr: 2, pres: 2, hi: 2, qty: 2, inf: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "future", title: "The future tense: stem + -ū̃gā/-ū̃gī (मैं), -egā/-egī (तू, यह, वह), -oge/-ogī (तुम), -ẽge/-ẽgī (हम, आप, ये, वे), one word with no auxiliary (सीता चिट्ठी लिखेगी)"},
    {id: "future-irregular", title: "Irregular futures of होना (हूँगा, होगा, होगे, होंगे), लेना (लूँगा, लेगी, लेंगे) and देना (दूँगा, देगा, देंगे); stems in -ī and -ū shorten the vowel (पिएगा, छुएगा)"},
    {id: "future-continuous", title: "The future auxiliary in the continuous: stem + रहा, रही, रहे + होगा, “will be …ing” (कल इस समय मैं लखनऊ जा रहा हूँगा)"},
    {id: "presumptive", title: "Presumptive future: होगा and the future auxiliary make an assumption about the present, “must be” (राज अभी दफ़्तर में होगा; वह लड़की हमारे स्कूल में पढ़ती होगी)"},
    {id: "emphatic-hi", title: "Emphatic ही limits the word before it and causes no change of case; coalesced forms मुझी, तुझी, यही, वही, इसी, उसी, हमीं, तुम्हीं, इन्हीं, उन्हीं, यहीं, वहीं, अभी, सभी; वही/उसी “the same”; इसी लिए “that's why”"},
    {id: "quantity", title: "Quantity: बहुत-सा/-सी/-से “many” (बहुत-से लोग) against बहुत “very”; -सा “-ish” (लाल-सा); कम, ज़्यादा, अधिक as adjectives and adverbs; कम से कम, ज़्यादा से ज़्यादा, अधिक से अधिक, थोड़ा-बहुत, काफ़ी “quite, enough”; बहुत ज़्यादा “too much”, बहुत कम “too little”"},
    {id: "verbal-noun", title: "The infinitive as a masculine verbal noun: direct as subject (अकेले रहना आसान नहीं है); oblique before postpositions (खाने से पहले, करने के बाद, पहुँचने पर); oblique for purpose, alone or with के लिए or को (खेलने जा रहे हैं); oblique infinitive + जा रहा हूँ “I'm going to …, about to …” (फ़ोन करने जा रहा हूँ)"},
    {id: "infinitive-constructions", title: "Oblique infinitive + (के) लायक़ or योग्य “worth …ing”; X को + infinitive + आना “X knows how to …” (मेरी बेटी को तबला बजाना आता है)"},
    {id: "register", title: "Formal Sanskrit-derived words beside everyday ones: पुस्तक/किताब, कठिन/मुश्किल, व्यवस्था/इंतज़ाम, परंतु/लेकिन"}
  ]
};

writeUnit(9, unit, {forms, fake});
