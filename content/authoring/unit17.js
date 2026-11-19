"use strict";
// Unit 17 (book pp. 220–233): अगर तुम इतनी ज़िद्दी न होतीं … Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 229–231, Quick Vocab pp. 221, 224, 17.1–17.4 pp. 222–228)
  "अंतर":"antar","अजनबी":"ajnabī","असर":"asar","आरंभ":"ārambh","उतरना":"utarnā","उत्तर":"uttar","उबलना":"ubalnā","ओहो":"oho",
  "कटना":"kaṭnā","कष्ट":"kaṣṭ","काटना":"kāṭnā","किंतु":"kintu","क़ीमती":"qīmtī","खाट":"khāṭ","गंभीर":"gambhīr","घड़ी":"ghaṛī","घुसना":"ghusnā",
  "छात्रवृत्ति":"chātravṛtti","जलना":"jalnā","ज़िद्दी":"ziddī","ठग":"ṭhag","ढीला":"ḍhīlā","ढेर":"ḍher","तथापि":"tathāpi","दंगा":"daṅgā",
  "दफ़ा":"dafā","दिमाग़":"dimāg","नाचना":"nācnā","नामुमकिन":"nāmumkin","निहायत":"nihāyat","प्रकाशित":"prakāśit","प्रश्न":"praśn",
  "फँसना":"phãsnā","फाड़ना":"phāṛnā","बर्दाश्त":"bardāśt","बाँसुरी":"bā̃surī","बाक़ी":"bāqī","बातचीत":"bātcīt","बिगड़ना":"bigaṛnā",
  "भागना":"bhāgnā","भेद":"bhed","मचना":"macnā","मज़दूर":"mazdūr","महाभारत":"mahābhārat","माँस":"mā̃s","मुँह":"mũh","मुसाफ़िर":"musāfir",
  "यद्यपि":"yadyapi","यात्रा":"yātrā","योजना":"yojnā","रस्सी":"rassī","राज़ी":"rāzī","रूबरू":"rūbarū","रोकना":"roknā","लकड़ी":"lakṛī",
  "लाभ":"lābh","लूटना":"lūṭnā","लोकप्रिय":"lokpriy","वर्ष":"varṣ","शीघ्र":"śīghr","शूटिंग":"śūṭiṅg","संतुष्ट":"santuṣṭ","संतोष":"santoṣ",
  "सप्ताह":"saptāh","सफ़र":"safar","समाचार-पत्र":"samācār-patr","समाप्त":"samāpt","सहमत":"sahmat","साधारण":"sādhāraṇ","सुझाव":"sujhāv",
  "सुधरना":"sudharnā","हड़ताल":"haṛtāl","हालाँकि":"hālā̃ki",
  // conditional forms (17.1)
  "होते":"hote","होतीं":"hotī̃","होती":"hotī","होगा":"hogā","होंगे":"hõge","ख़रीदता":"kharīdtā","जाता":"jātā","जाएगा":"jāegā","आतीं":"ātī̃",
  "आती":"ātī","आते":"āte","छूटती":"chūṭtī","निकले":"nikle","आता":"ātā","आऊँगा":"āū̃gā","घूमता":"ghūmtā","घूमूँगा":"ghūmū̃gā",
  "गातीं":"gātī̃","गाते":"gāte","मिलता":"miltā","पहुँची":"pahũcī","पहुँचा":"pahũcā","पहुँचीं":"pahũcī̃","करता":"kartā","करेगा":"karegā",
  "हुईं":"huī̃","ली":"lī","लिया":"liyā","मिल":"mil","चलती":"caltī",
  // compound verb forms (17.3)
  "डाले":"ḍāle","डाला":"ḍālā","डालीं":"ḍālī̃","डाली":"ḍālī","बैठा":"baiṭhā","बैठी":"baiṭhī","बैठे":"baiṭhe","पड़े":"paṛe","पड़ा":"paṛā",
  "उठा":"uṭhā","उठी":"uṭhī","उठे":"uṭhe","रखा":"rakhā","रखी":"rakhī","रखे":"rakhe","रखीं":"rakhī̃","फाड़":"phāṛ","काट":"kāṭ","कट":"kaṭ",
  "तोड़":"toṛ","लूट":"lūṭ","खो":"kho","रो":"ro","हँस":"hãs","निकल":"nikal","चिल्ला":"cillā","बता":"batā","ख़रीद":"kharīd","कर":"kar","बना":"banā",
  "लड़":"laṛ","पकड़":"pakaṛ","जल":"jal",
  // forms produced by earlier units' rules
  "डाकुओं":"ḍākuõ","मज़दूरों":"mazdūrõ","गुंडों":"guṇḍõ","दुकानें":"dukānẽ","घरों":"gharõ","लड़कियाँ":"laṛkiyā̃","खिड़कियाँ":"khiṛkiyā̃",
  "ढीली":"ḍhīlī","देखकर":"dekhkar","सुनकर":"sunkar","करके":"karke","लगते":"lagte","रहेंगे":"rahẽge","सबकी":"sabkī","मार":"mār","गुस्से":"gusse","उतर":"utar","बिगड़":"bigaṛ","दंगे":"daṅge","लूटी":"lūṭī","सुनेगा":"sunegā"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "पड़या":"paṛyā","उठया":"uṭhyā","बैठया":"baiṭhyā","डालया":"ḍālyā","रखया":"rakhyā","यद्यापि":"yadyāpi","होतेगा":"hotegā","जातेगा":"jātegā",
  "समाप्ता":"samāptā","हालाँके":"hālā̃ke"
};

const SUPP = "A perfective verb in the अगर clause makes the condition a given, a supposition: अगर मोहन आया तो … “supposing Mohan comes …”.";
const UNF = "An unfulfilled, hypothetical condition uses the imperfective participle without an auxiliary in both clauses (अगर मैं कवि होता तो … लिखता). The feminine plural is nasalized. अगर is often dropped.";
const PAST = "For an unfulfilled condition in the past, the अगर clause can take the perfective participle + होता (बुलाया होता), and the other clause usually has the imperfective participle alone.";
const ALTH = "हालाँकि “although” opens the first clause, and फिर भी or तो भी “even so” the second. Formal Hindi uses यद्यपि … तथापि.";
const NE = "A compound verb takes ने only when both the main verb and the auxiliary take ने.";
const DAL = "डालना as an auxiliary: an action done vigorously, decisively, violently or recklessly (फाड़ डालना, मार डालना, पी डालना). "+NE;
const BAITH = "बैठना as an auxiliary: an action done foolishly or stubbornly (कर बैठना “go and do”). बैठना never takes ने, so the compound doesn't either.";
const PAD = "पड़ना as an auxiliary: suddenness or a change of state, sometimes downward movement (रो पड़ना “burst into tears”, उतर पड़ना).";
const UTH = "उठना as an auxiliary: the start of an action or feeling, sometimes upward movement (बिगड़ उठना “flare up”, जल उठना “burst into flames”).";
const RAKH = "रखना as an auxiliary: firmness, or a result that lasts (देख रखा है “have seen and have my eye on”). "+NE;
const REG = "Formal Hindi uses many Sanskrit loanwords, everyday Hindi a freer mix with many Perso-Arabic words: समाप्त / ख़त्म, प्रश्न / सवाल, वर्ष / साल, यात्रा / सफ़र, उत्तर / जवाब, आवश्यकता / ज़रूरत.";

const cond = [
  gap("if:0", "अगर बारिश ___ तो हम घर पर ही रहेंगे ।", "If[0] it rains[1+2], we[4] {will stay}[8] at home[5+6] (lit. “… then[3] … only[7]”).", "हुई", [["हुआ","बारिश is feminine — हुई."], ["हुईं","हुईं is plural. बारिश is singular."]], SUPP),
  gap("if:1", "अगर मेरे पास पैसे ___ तो मैं नई गाड़ी ख़रीदता ।", "If[0] I[1+2] had[4] the money[3], I[6] {would buy}[9] a new[7] car[8] (lit. “… then[5] …”). (a man speaking)", "होते", [["होंगे","होंगे is future, an open condition. ख़रीदता shows the condition is hypothetical, so the imperfective participle alone — होते."], ["हैं","हैं is present, an open condition. A hypothetical condition takes होते, with no auxiliary."], ["होतेगा","Not a word. The hypothetical is होते, with nothing added."]], UNF),
  gap("if:2", "अगर वह मेहनत करता तो पास हो ___ ।", "If[0] he[1] worked hard[2+3], he'd pass[5+6+7] (lit. “… then[4] …”).", "जाता", [["जाएगा","जाएगा is future. With an unfulfilled condition both clauses take the imperfective participle alone — जाता."], ["गया","गया states a fact. The condition is hypothetical — जाता."], ["जातेगा","Not a word. The hypothetical is जाता, with nothing added."]], UNF),
  gap("if:3", "अगर लड़कियाँ समय पर ___ तो हमारी गाड़ी नहीं छूटती ।", "If[0] the girls[1] {had come}[4] on time[2+3], we {wouldn't have missed}[8+9] our[6] train[7] (lit. “… then[5] …”).", "आतीं", [["आती","The feminine plural is nasalized — आतीं."], ["आते","आते is masculine. लड़कियाँ is feminine."]], UNF),
  gap("if:4", "अगर हम सुबह जल्दी निकले ___ तो समय पर पहुँच जाते ।", "If[0] we[1] {had set out}[4+5] early[3] in the morning[2], we'd {have arrived}[9+10] on time[7+8] (lit. “… then[6] …”).", "होते", [["थे","निकले थे is a plain past fact. A past unfulfilled condition takes the perfective participle + होता — निकले होते."], ["हैं","हैं would make it present. A past unfulfilled condition takes निकले होते."]], PAST),
  meaning("if:5", "अगर पापा यहाँ होते तो बहुत ख़ुश होते ।", "If Papa were here, he'd be very happy.", [["Papa is here and he's very happy.","होते without an auxiliary is hypothetical: he isn't here."], ["When Papa comes, he'll be very happy.","That would be जब … तब with future verbs."]], UNF),
  meaning("if:6", "तुम थोड़ा पहले आते तो खाना गरम मिलता ।", "If you'd come a bit earlier, you'd have got your food hot.", [["You came early, so the food was hot.","आते and मिलता without auxiliaries are hypothetical: you didn't come early."], ["Come a bit earlier and the food will be hot.","That would be a command and a future: पहले आओ, खाना गरम मिलेगा."]], UNF),
  gap("if:7", "अगर गाड़ी समय पर ___ तो हम सीधे होटल जाएँगे ।", "If[0] the train[1] arrives[4] on time[2+3], we[6] {will go}[9] straight[7] to the hotel[8] (lit. “… then[5] …”).", "पहुँची", [["पहुँचा","गाड़ी is feminine — पहुँची."], ["पहुँचीं","पहुँचीं is plural. It is one train."]], SUPP),
  mc("if:8", "Which sentence is a hypothetical (unfulfilled) condition?", "अगर वह यहाँ होता तो मदद करता ।", [["अगर वह यहाँ है तो मदद करेगा ।","This is an open condition: he may well be here."], ["अगर वह यहाँ आया तो मदद करेगा ।","This is a supposition: “if he comes”."]], UNF, {say: "अगर वह यहाँ होता तो मदद करता ।", en: "If[0] he[1] were[3] here[2], he'd help[5+6] (lit. “… then[4] …”)."}),
  gap("if:9", "अगर मुझे पता होता तो मैं भी ___ ।", "If[0] I'd[1] known[2+3], I[5] {would have come}[7] too[6] (lit. “… then[4] …”). (a man speaking)", "आता", [["आऊँगा","आऊँगा is future. With an unfulfilled condition the other clause takes the imperfective participle alone — आता."], ["आया","आया states what happened. The condition is hypothetical — आता."]], UNF),
  gap("if:10", "अगर माँ यहाँ होतीं तो सब कुछ ठीक ___ ।", "If[0] Mother[1] were[3] here[2], everything[5+6] {would be}[8] all right[7] (lit. “… then[4] …”).", "होता", [["होगा","होगा is future. With an unfulfilled condition the other clause takes the imperfective participle alone — होता."], ["हुआ","हुआ states what happened. The condition is hypothetical — होता."]], UNF),
  meaning("if:11", "अगर उसने मेरी बात सुनी होती तो यह सब न होता ।", "If he'd listened to me, none of this would have happened.", [["He listened to me, so none of this happened.","सुनी होती … न होता is counterfactual: he didn't listen."], ["If he listens to me, none of this will happen.","That would be future: सुनेगा … नहीं होगा."]], PAST),
];

const alth = [
  gap("hl:0", "___ वह बीमार था, फिर भी वह दफ़्तर गया ।", "Although[0] he[1] was[3] ill[2], he[6] still[4+5] went[8] to the office[7].", "हालाँकि", [["क्योंकि","क्योंकि is “because”."], ["अगर","अगर is “if”."], ["हालाँके","Not a word. The spelling is हालाँकि."]], ALTH),
  gap("hl:1", "हालाँकि यह काम मुश्किल है, ___ भी हम इसे करेंगे ।", "Although[0] this[1] work[2] is[4] difficult[3], we'll[7] do[9] it[8] {all the same}[5+6].", "फिर", [["जब","जब भी is “whenever”."], ["कभी","कभी भी is “ever, at any time”."]], ALTH),
  gap("hl:2", "___ मोहन की योजना अच्छी थी, तथापि वह सफल नहीं हुई ।", "Although[0] Mohan's[1+2] plan[3] was[5] good[4], {nevertheless}[6] it[7] {did not}[9] succeed[8+10].", "यद्यपि", [["यदि","यदि is “if”. The formal “although” is यद्यपि."], ["तथापि","तथापि is “nevertheless”, which opens the second clause."], ["यद्यापि","Not a word. The spelling is यद्यपि."]], ALTH),
  gap("hl:3", "यद्यपि यात्रा लंबी थी, ___ किसी को कष्ट नहीं हुआ ।", "Although[0] the journey[1] was[3] long[2], {nevertheless}[4] nobody[5+6+8] {was put to}[9] any trouble[7].", "तथापि", [["यद्यपि","यद्यपि opens the first clause. The second clause takes तथापि."], ["हालाँकि","हालाँकि opens the first clause. The second clause takes तथापि (or फिर भी)."]], ALTH),
  meaning("hl:4", "हालाँकि सीता अमीर नहीं है, फिर भी वह सबकी मदद करती है ।", "Although Sita isn't rich, she still helps everyone.", [["Because Sita isn't rich, she helps everyone.","हालाँकि is “although”, not “because”."], ["Sita is rich, so she helps everyone.","नहीं है — she is not rich."]], ALTH),
  mc("hl:5", "Which is the formal, Sanskritic way to say “although … even so”?", "यद्यपि … तथापि", [["हालाँकि … फिर भी","This is the everyday form."], ["जब … तब","जब … तब is “when … then”."]], ALTH),
  meaning("hl:6", "हालाँकि घड़ी पुरानी है, तो भी ठीक चलती है ।", "Although the watch is old, it still keeps good time.", [["Because the watch is old, it doesn't keep good time.","हालाँकि is “although”, and ठीक चलती है is “keeps good time”."], ["The watch is new, but it doesn't keep good time.","पुरानी is “old”, and ठीक चलती है is positive."]], ALTH),
  gap("hl:7", "हालाँकि रात बहुत हो गई थी, तो ___ बच्चे खेलते रहे ।", "Although[0] it {had got}[3+4+5] very[2] late[1], the children[8] {went on}[10] playing[9] {all the same}[6+7].", "भी", [["ही","तो ही is not used here. “Even so” is तो भी (or फिर भी)."], ["तक","तो तक is not a phrase. “Even so” is तो भी."]], ALTH),
];

const comp = [
  gap("cv:0", "बच्चों ने सारे आम खा ___ ।", "The children[0+1] {gobbled up}[4+5] all[2] the mangoes[3].", "डाले", [["डाला","डाला is singular. With ने the verb agrees with आम, here plural — खा डाले."], ["डालीं","डालीं is feminine. आम is masculine."], ["डालया","Not a word. डालना has a consonant stem: डाला, डाले, with no -y-."]], DAL),
  gap("cv:1", "___ गुस्से में अपने मालिक से लड़ बैठा ।", "Raj[0] {went and quarrelled}[6+7] with[5] his[3] boss[4] in anger[1+2].", "राज", [["राज ने","लड़ना and बैठना don't take ने, so the compound doesn't either."], ["राज को","The subject of लड़ बैठा is a plain राज."], ["बैठया","Not a word. बैठना has a consonant stem: बैठा, with no -y-."]], BAITH),
  gap("cv:2", "फ़िल्म का अंत देखकर बच्चे रो ___ ।", "Seeing[3] the end[2] of the film[0+1], the children[4] {burst into tears}[5+6].", "पड़े", [["पड़ा","पड़ा is singular. बच्चे is plural."], ["डाले","Bursting into tears is रो पड़ना. डालना is for vigorous action on something."], ["पड़या","Not a word. पड़ना has a consonant stem: पड़ा, पड़े, with no -y-."]], PAD),
  gap("cv:3", "आग देखकर लोग घरों से बाहर निकल ___ ।", "Seeing[1] the fire[0], people[2] rushed[6+7] out[5] of their houses[3+4].", "पड़े", [["पड़ा","पड़ा is singular. लोग is plural."], ["बैठे","बैठना suggests something foolish, “went and did”. A sudden rush is निकल पड़ना."]], PAD),
  gap("cv:4", "डर से वह चिल्ला ___ ।", "He[2] {cried out}[3+4] in fear[0+1].", "उठा", [["उठी","उठी is feminine. The cue says “he”."], ["डाला","चिल्लाना is intransitive. A sudden outburst is चिल्ला उठना."], ["उठया","Not a word. उठना has a consonant stem: उठा, with no -y-."]], UTH),
  gap("cv:5", "मैंने तुम्हारे लिए खाना बना ___ है ।", "I[0] {have made}[4+5+6] food[3] for[2] you[1] (and it's ready).", "रखा", [["रखी","रखी is feminine. With ने the verb agrees with खाना, masculine."], ["रखे","रखे is plural. खाना is singular."], ["रखया","Not a word. रखना has a consonant stem: रखा, with no -y-."]], RAKH),
  gap("cv:6", "माँ ने मेहमानों के लिए मिठाइयाँ ख़रीद ___ हैं ।", "Mother[0+1] {has bought}[6+7+8] sweets[5] for[3+4] the guests[2] (and has them ready).", "रखी", [["रखा","With ने the verb agrees with मिठाइयाँ, feminine plural — ख़रीद रखी हैं."], ["रखीं","The nasal goes on the last word only — रखी हैं."]], RAKH),
  meaning("cv:7", "डाकुओं ने पूरे गाँव को लूट डाला ।", "The bandits looted the whole village.", [["The bandits were robbed by the village.","डाकुओं ने is the doer."], ["The bandits tried to loot the whole village.","लूट डाला is done, and done ruthlessly: no “tried”."]], DAL),
  mc("cv:8", "Which is right for “Raj went and made a mistake”?", "राज ग़लती कर बैठा ।", [["राज ने ग़लती कर बैठा ।","A compound verb takes ने only if both verbs take ने. बैठना doesn't."], ["राज ने ग़लती कर बैठी ।","बैठना doesn't take ने, so the verb agrees with राज — कर बैठा."]], BAITH, {say: "राज ग़लती कर बैठा ।", en: "Raj[0] {went and made}[2+3] a mistake[1]."}),
  gap("cv:9", "किसी ने दुकान की सारी खिड़कियाँ तोड़ ___ ।", "Someone[0+1] smashed[6+7] all[4] the windows[5] of the shop[2+3].", "डालीं", [["डाला","With ने the verb agrees with खिड़कियाँ, feminine plural."], ["डाली","डाली is singular. खिड़कियाँ is plural, and the nasal goes on the last word — डालीं."]], DAL),
  meaning("cv:10", "पुलिस ने चोरों को पकड़ रखा है ।", "The police are holding the thieves.", [["The police are trying to catch the thieves.","पकड़ रखा है is done and lasting: they have them."], ["The thieves have caught the police.","पुलिस ने is the doer."]], RAKH),
  mc("cv:11", "Which auxiliary suggests doing something foolishly?", "बैठना", [["उठना","उठना suggests the start of an action or feeling."], ["रखना","रखना suggests firmness or a lasting result."]], BAITH),
  gap("cv:12", "किसी ने उस बेचारे कुत्ते को मार ___ ।", "Someone[0+1] killed[6+7] that[2] poor[3] dog[4+5].", "डाला", [["डाली","With को on the object the verb is masculine singular — मार डाला."], ["बैठा","बैठना doesn't take ने, so किसी ने … मार बैठा is impossible."]], DAL),
  meaning("cv:13", "मैंने कुछ पैसे बचा रखे हैं ।", "I've saved up some money.", [["I've spent some money.","बचा रखे हैं is “have saved and kept”."], ["I need to save some money.","रखे हैं is done: the money is already saved."]], RAKH),
];

const reg = [
  mc("rg:0", "Which is the formal, Sanskritic word for ख़त्म “finished”?", "समाप्त", [["ख़ाली","ख़ाली is “empty”."], ["बाक़ी","बाक़ी is “remaining, left”."], ["समाप्ता","Not a word. The word is समाप्त."]], REG),
  mc("rg:1", "Which is the everyday, Perso-Arabic word for प्रश्न “question”?", "सवाल", [["जवाब","जवाब is “answer”."], ["मतलब","मतलब is “meaning”."]], REG),
  mc("rg:2", "Which is the formal, Sanskritic word for साल “year”?", "वर्ष", [["सप्ताह","सप्ताह is “week”."], ["वक़्त","वक़्त is “time”, and Perso-Arabic."]], REG),
  mc("rg:3", "Which is the everyday, Perso-Arabic word for यात्रा “journey”?", "सफ़र", [["सवारी","सवारी is “rider, passenger”."], ["समाचार","समाचार is “news”, and formal."]], REG),
  mc("rg:4", "Which is the formal, Sanskritic word for हफ़्ता “week”?", "सप्ताह", [["वर्ष","वर्ष is “year”."], ["महीना","महीना is “month”."]], REG),
  mc("rg:5", "Which is the everyday, Perso-Arabic word for उत्तर “reply”?", "जवाब", [["सवाल","सवाल is “question”."], ["सलाह","सलाह is “advice”."]], REG),
  mc("rg:6", "Which sentence is in the more formal, Sanskritic style?", "मुझे इस पुस्तक की आवश्यकता है ।", [["मुझे इस किताब की ज़रूरत है ।","This is everyday Hindi: किताब and ज़रूरत are Perso-Arabic."], ["मुझे यह किताब चाहिए ।","This is everyday Hindi, with the Perso-Arabic किताब."]], REG, {say: "मुझे इस पुस्तक की आवश्यकता है ।", en: "I[0] need[3+4+5] this[1] book[2]."}),
  mc("rg:7", "Which is the everyday word for कठिन “difficult”?", "मुश्किल", [["आसान","आसान is “easy”."], ["ज़रूरी","ज़रूरी is “necessary, urgent”."]], REG),
  mc("rg:8", "Which word must be Sanskritic, judging by its letters?", "विशेष", [["ख़ास","The dotted kh of ख़ास shows a Persian origin."], ["क़ीमती","The dotted q of क़ीमती shows a Persian origin."]], "Only Sanskrit loanwords contain the letters ṇ, ṣ, kṣ and jñ (as in विशेष). Only words from Persian contain the dotted q, kh and g."),
  mc("rg:9", "Which is the formal word for “but”?", "किंतु", [["मगर","मगर is the everyday, Perso-Arabic “but”."], ["लेकिन","लेकिन is the everyday “but”."]], REG)
];

const build = [
  tiles("tl:0", "If[0] I[1] were[3] rich[2], I'd travel[6] the world[5] (lit. “… then[4] …”). (a man speaking)", ["अगर","मैं","अमीर","होता","तो","दुनिया","घूमता"], [["होगा","होगा is future. A hypothetical condition takes होता."], ["घूमूँगा","The other clause also takes the imperfective participle alone — घूमता."]], {alt: [["मैं","अमीर","होता","तो","दुनिया","घूमता"]]}),
  tiles("tl:1", "If[0] he[1] {had taken}[3+4] the medicine[2], he[6] {would have got}[8+9] better[7] (lit. “… then[5] …”).", ["अगर","उसने","दवा","ली","होती","तो","वह","ठीक","हो","जाता"], [["लिया","With ने the participle agrees with दवा, feminine — ली होती."], ["होगा","होगा is future. The other clause of a counterfactual takes the participle — हो जाता."]], {alt: [["उसने","दवा","ली","होती","तो","वह","ठीक","हो","जाता"]]}),
  tiles("tl:2", "Although[0] it {had got}[2+3+4] late[1], he[7] came[8] {all the same}[5+6].", ["हालाँकि","देर","हो","गई","थी","फिर","भी","वह","आया"], [["क्योंकि","क्योंकि is “because”."], ["गया","देर is feminine — हो गई थी."], ["हालाँके","Not a word. The spelling is हालाँकि."]], {alt: [["हालाँकि","देर","हो","गई","थी","वह","फिर","भी","आया"], ["हालाँकि","देर","हो","गई","थी","वह","आया"]]}),
  tiles("tl:3", "Although[0] the work[1] was[3] difficult[2], {nevertheless}[4] we[5] finished[7+8] it[6].", ["यद्यपि","काम","कठिन","था","तथापि","हमने","उसे","समाप्त","किया"], [["यदि","यदि is “if”."], ["हम","With ने in the perfective — हमने."], ["यद्यापि","Not a word. The spelling is यद्यपि."]], {alt: [["यद्यपि","काम","कठिन","था","हमने","उसे","समाप्त","किया"]]}),
  tiles("tl:4", "The workers[0+1] {cut down}[4+5] all[2] the trees[3].", ["मज़दूरों","ने","सारे","पेड़","काट","डाले"], [["डाला","डाला is singular. The verb agrees with पेड़, here plural — काट डाले."], ["कट","कटना is intransitive, “be cut”. With ने the transitive काटना is needed — काट."]]),
  tiles("tl:5", "Sita[0] {went and lost}[3+4] her[1] key[2].", ["सीता","अपनी","चाबी","खो","बैठी"], [["ने","बैठना doesn't take ने, so neither does the compound."], ["बैठा","बैठा is masculine. The verb agrees with सीता."]], {alt: [["सीता","चाबी","खो","बैठी"]]}),
  tiles("tl:6", "Hearing[1] the noise[0], the child[2] {burst into tears}[3+4].", ["आवाज़","सुनकर","बच्चा","रो","पड़ा"], [["ने","रोना and पड़ना don't take ने."], ["डाला","Bursting into tears is रो पड़ना."], ["पड़या","Not a word. पड़ना has a consonant stem: पड़ा, with no -y-."]], {alt: [["बच्चा","आवाज़","सुनकर","रो","पड़ा"]]}),
  tiles("tl:7", "Suddenly[0] the crowd[1] {cried out}[2+3].", ["अचानक","भीड़","चिल्ला","उठी"], [["उठा","भीड़ is feminine — उठी."], ["ने","चिल्लाना and उठना don't take ने."]], {alt: [["भीड़","अचानक","चिल्ला","उठी"]]}),
  tiles("tl:8", "I[0] {have already}[2+3+5+6] told[4] him[1].", ["मैंने","उसे","पहले","से","बता","रखा","है"], [["रखी","रखी is feminine. There's no feminine object here — बता रखा है."], ["मैं","बताना and रखना both take ने, so the compound does — मैंने."]], {alt: [["मैंने","पहले","से","उसे","बता","रखा","है"], ["उसे","मैंने","पहले","से","बता","रखा","है"], ["मैंने","उसे","पहले","बता","रखा","है"], ["मैंने","पहले","उसे","बता","रखा","है"]]}),
  tiles("tl:9", "If[0] the girls[1] were[3] here[2], they'd sing[5] (lit. “… then[4] …”).", ["अगर","लड़कियाँ","यहाँ","होतीं","तो","गातीं"], [["होती","The feminine plural is nasalized — होतीं."], ["गाते","गाते is masculine. लड़कियाँ is feminine — गातीं."]], {alt: [["लड़कियाँ","यहाँ","होतीं","तो","गातीं"]]}),
  tiles("tl:10", "If[0] Mohan[1] comes[2], {ask him to sit down}[4+5] (lit. “… then[3] …”).", ["अगर","मोहन","आया","तो","उसे","बिठाना"], [["आई","आई is feminine. मोहन is a man."], ["आता","आता without an auxiliary would make it hypothetical, “if Mohan came”."]], {alt: [["मोहन","आया","तो","उसे","बिठाना"]]}),
  tiles("tl:11", "This[0] news[1] {will be published}[3+4] soon[2].", ["यह","समाचार","शीघ्र","प्रकाशित","होगा"], [["होगी","होगी is feminine. समाचार is masculine."], ["हुआ","हुआ is past. “Will be published” is future — होगा."]])
];

const mean = [
  meaning("mn:0", "अगर मुझे छात्रवृत्ति मिल जाती तो मैं विदेश पढ़ने जाता ।", "If I'd got the scholarship, I'd have gone abroad to study.", [["I got the scholarship and went abroad to study.","मिल जाती and जाता are hypothetical: it didn't happen."], ["If I get the scholarship, I'll go abroad to study.","That would be future: मिलेगी … जाऊँगा."]]),
  meaning("mn:1", "हड़ताल के कारण आज कोई बस नहीं चल रही ।", "Because of the strike no buses are running today.", [["The buses are running in spite of the strike.","के कारण is “because of”."], ["There'll be a strike today because the buses aren't running.","It's the other way round: the strike stops the buses."]]),
  meaning("mn:2", "इस दवा का असर बहुत जल्दी पड़ता है ।", "This medicine takes effect very quickly.", [["This medicine is very expensive.","असर is “effect”."], ["This medicine has to be taken quickly.","असर पड़ना is “to have an effect”."]]),
  meaning("mn:3", "दंगे में कई दुकानें जल गईं ।", "Several shops burned down in the riot.", [["Several shops were looted in the riot.","जल गईं is “burned”. “Looted” would be लूटी गईं."], ["Several shops closed before the riot.","जलना is “to burn”."]]),
  meaning("mn:4", "हम सब इस योजना से सहमत हैं ।", "We all agree with this plan.", [["We're all fed up with this plan.","सहमत is “in agreement”."], ["We all made this plan together.","सहमत होना is “to agree”."]]),
  meaning("mn:5", "ढीली रस्सी टूट गई ।", "The loose rope broke.", [["The rope was tied tight.","ढीली is “loose”."], ["Someone cut the loose rope.","टूट गई is intransitive: it broke by itself."]]),
  meaning("mn:6", "यह निहायत क़ीमती घड़ी है ।", "This is an extremely valuable watch.", [["This watch isn't worth much.","निहायत क़ीमती is “extremely valuable”."], ["This watch was very cheap.","क़ीमती is “costly, valuable”."]])
];

const usage = [
  mc("us:0", "In an unfulfilled condition (अगर मैं अमीर होता …), the verbs are …", "imperfective participles with no auxiliary", [["future forms","Future forms make an open condition."], ["perfective participles with an auxiliary","A perfective in the अगर clause makes a supposition, and an auxiliary makes it a plain statement."]], UNF),
  mc("us:1", "What does a perfective verb in the अगर clause (अगर मोहन आया …) suggest?", "a supposition, “supposing Mohan comes”", [["that Mohan has already come","The perfective here isn't past: it treats the condition as a given."], ["that Mohan will never come","That would be an unfulfilled condition, with आता."]], SUPP),
  mc("us:2", "A compound verb takes ने only when …", "both the main verb and the auxiliary take ने", [["the auxiliary takes ने","Both must: पी डाला takes ने, but कर बैठा doesn't."], ["the main verb takes ने","Both must: करना takes ने, but कर बैठना doesn't."]], NE),
  mc("us:3", "Which auxiliary adds a sense of suddenness?", "पड़ना", [["रखना","रखना suggests firmness or a lasting result."], ["डालना","डालना suggests vigour or recklessness."]], PAD),
  mc("us:4", "Which auxiliary suggests the start of an action or feeling?", "उठना", [["बैठना","बैठना suggests something done foolishly."], ["रखना","रखना suggests firmness or a lasting result."]], UTH),
  mc("us:5", "Which word is the formal, Sanskritic one?", "आवश्यकता", [["ज़रूरत","ज़रूरत is the everyday, Perso-Arabic word for “need”."], ["मुश्किल","मुश्किल is the everyday word for “difficult”."]], REG),
  mc("us:6", "हालाँकि “although” is usually answered in the second clause by …", "फिर भी or तो भी", [["तब","तब answers जब “when”."], ["वहाँ","वहाँ answers जहाँ “where”."]], ALTH)
];

const unit = {
  id: "unit17", n: 17, title: "If you weren't so stubborn …", titleHi: "अगर तुम इतनी ज़िद्दी न होतीं …",
  scope: "Conditionals (2): a perfective verb in the अगर clause for a supposition (अगर राम आया तो …); unfulfilled conditions with the imperfective participle and no auxiliary in both clauses (feminine plural nasalized, अगर often dropped); past counterfactuals with perfective participle + होता (बुलाया होता); हालाँकि … फिर भी / तो भी “although … even so”, formal यद्यपि … तथापि; compound verbs (2) with डालना (vigour), बैठना (foolishness), पड़ना (suddenness), उठना (inception), रखना (firmness), taking ने only when both verbs do; registers of vocabulary: Perso-Arabic and Sanskritic synonyms",
  pages: "book 220–232",
  skills: {cond: "Conditionals", alth: "Although", comp: "Compound verbs", reg: "Formal and everyday words", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अंतर","difference","n","m"],["अजनबी","stranger","n","m"],["असर","effect, impact","n","m"],["असर पड़ना","to have an effect","v"],["आख़िर","end","n","m"],
    ["आरंभ","beginning","n","m"],["उतरना","to get down, alight","v"],["उत्तर","reply","n","m"],["उबलना","to boil, rage","v"],["ओहो","oho! oh no!","x"],
    ["कटना","to be cut","v"],["कष्ट","trouble, distress","n","m"],["काटना","to cut","v"],["किंतु","but","x"],["क़ीमती","costly, valuable","a"],
    ["खाट","bedstead, ‘cot’","n","f"],["गंभीर","serious, profound","a"],["घड़ी","wristwatch","n","f"],["घुसना","to enter (forcibly, or uninvited)","v"],["छात्रवृत्ति","scholarship","n","f"],
    ["जलना","to burn","v"],["ज़िद्दी","obstinate, stubborn","a"],["ठग","swindler, robber","n","m"],["ढीला","loose","a"],["ढेर","pile, heap","n","m"],
    ["तथापि","nevertheless, even so","x"],["दंगा","riot","n","m"],["दफ़ा","time, occasion","n","f"],["दिमाग़","mind, brain","n","m"],["नाचना","to dance","v"],
    ["का नाम लेना","to mention","v"],["नामुमकिन","impossible","a"],["निहायत","extremely","x"],["प्रकाशित","published","a"],["प्रश्न","question","n","m"],
    ["फँसना","to be stuck, caught, snared","v"],["फाड़ना","to tear","v"],["फिर भी","even so","x"],["बर्दाश्त करना","to tolerate, endure","v"],["बाँसुरी","bamboo flute","n","f"],
    ["बाक़ी","remaining, left","a"],["बात बनना","to work out, come off","v"],["बातचीत","conversation, negotiation","n","f"],["बिगड़ना","to go wrong, get angry","v"],["भागना","to run away, flee","v"],
    ["भेद","difference","n","m"],["मचना","to break out, be caused","v"],["मज़दूर","worker, labourer","n","m"],["महाभारत","the Mahabharata (epic war)","n","m"],["माँस","meat","n","m"],
    ["मुँह","mouth, face","n","m"],["मुसाफ़िर","traveller","n","m"],["मेरा सिर","‘my foot!’","x"],["यद्यपि","although","x"],["यात्रा","journey, travel","n","f"],
    ["योजना","plan, scheme","n","f"],["रस्सी","string, cord","n","f"],["राज़ी","agreeable, content","a"],["रूबरू","face to face","x"],["रोकना","to stop","v"],
    ["लकड़ी","wood; stick","n","f"],["लाभ","profit, advantage","n","m"],["लूटना","to loot, steal, pillage","v"],["लोकप्रिय","popular","a"],["वर्ष","year","n","m"],
    ["वापस मिलना","to be got back","v"],["शीघ्र","soon, quickly","x"],["शूटिंग","‘shooting’, filming","n","f"],["संतुष्ट","satisfied","a"],["संतोष","satisfaction","n","m"],
    ["सप्ताह","week","n","m"],["सफ़र","journey, travel","n","m"],["समाचार-पत्र","newspaper","n","m"],["समाप्त","finished, concluded","a"],["सहमत","in agreement","a"],
    ["साधारण","ordinary","a"],["सुझाव","suggestion","n","m"],["सुझाव देना","to make a suggestion","v"],["सुधरना","to improve, be put right","v"],["हड़ताल","strike, lockout","n","f"],
    ["हड़ताल करना","to strike","v"],["हालाँकि","although","x"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "cond", title: "अगर … होता", desc: "Suppositions and unfulfilled conditions", skill: "cond", items: cond},
    {id: "alth", title: "हालाँकि … फिर भी", desc: "“Although … even so”, formal यद्यपि … तथापि", skill: "alth", items: alth},
    {id: "comp", title: "कर बैठना, रो पड़ना", desc: "Compound verbs with डालना, बैठना, पड़ना, उठना, रखना", skill: "comp", items: comp},
    {id: "reg", title: "समाप्त और ख़त्म", desc: "Formal (Sanskritic) and everyday (Perso-Arabic) words", skill: "reg", items: reg},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Conditions, compound verbs, registers", skill: "usage", items: usage}
  ],
  test: {vocab: 4, cond: 4, alth: 2, comp: 4, reg: 3, build: 2, meaning: 2, usage: 1},
  _grammar: [
    {id: "conditionals-2", title: "Conditionals (2): a perfective verb in the अगर clause makes the condition a given, a supposition (अगर राम आया तो …); an unfulfilled or hypothetical condition uses the imperfective participle without auxiliary in both clauses (अगर मैं कवि होता तो … लिखता), feminine plural nasalized (जातीं … कमातीं), अगर/यदि often dropped; a specifically past unfulfilled condition takes perfective participle + होता in the अगर clause (आए होते, मिली होती) and usually the imperfective participle alone in the other; continuous forms too (सो रही होती)"},
    {id: "although", title: "हालाँकि “although” … फिर भी or तो भी “even so”; formal Sanskritic यद्यपि … तथापि"},
    {id: "compound-verbs-2", title: "Compound verbs (2): auxiliaries डालना (vigorous, decisive, violent or reckless: फाड़ डाला, मार डाला, पी डालो), बैठना (foolish or stubborn: कर बैठा, कह बैठी), पड़ना (suddenness, change of state, downward: उतर पड़े, रो पड़ा, हँस पड़ी), उठना (inception, upward: बिगड़ उठे, जल उठा, नाच उठे), रखना (firmness, lasting result: दे रखी है, कह रखा है, देख रखा है); ने only when both main verb and auxiliary take ने"},
    {id: "registers", title: "The vocabulary of Hindi: formal, Sanskritic words and everyday, often Perso-Arabic synonyms (अख़बार / समाचार-पत्र, अगर / यदि, ख़त्म / समाप्त, ख़बर / समाचार, ज़रूरत / आवश्यकता, जवाब / उत्तर, सवाल / प्रश्न, साल / वर्ष, हफ़्ता / सप्ताह, सफ़र / यात्रा, शुरू / आरंभ …); English loanwords; only Sanskrit loans contain ज्ञ, ण, ष, क्ष, only Persian ones क़, ख़, ग़"}
  ]
};

writeUnit(17, unit, {forms, fake});
