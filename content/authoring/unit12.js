"use strict";
// Unit 12 (book pp. 146–158): उनसे पूछकर मुझे बता दो. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 155–157, Quick Vocab pp. 146–147, 150–151, 12.2 table p. 149, 12.4–12.5 pp. 153–154)
  "अंत":"ant","अद्भुत":"adbhut","अवकाश":"avkāś","आठों":"āṭhõ","आवाज़":"āvāz","कविता":"kavitā","कृपा":"kṛpā","करके":"karke",
  "खेद":"khed","खोना":"khonā","गृह":"gṛh","मंत्री":"mantrī","ग्वालियर":"gvāliyar","चला":"calā","चिढ़ाना":"ciṛhānā","चुकना":"cuknā",
  "छोड़कर":"choṛkar","जान-बूझकर":"jān-būjhkar","जी-हुज़ूरी":"jī-huzūrī","टैक्सी":"ṭaiksī","डिगरी":"ḍigrī","डिनर":"ḍinar","ढाई":"ḍhāī",
  "तीसरे":"tīsre","दौड़ना":"dauṛnā","धीमा":"dhīmā","नहाना":"nahānā","नाश्ता":"nāśtā","पछताना":"pachtānā","परीक्षा":"parīkṣā",
  "पार":"pār","पौन":"paun","पौना":"paunā","पौने":"paune","प्रकाशक":"prakāśak","बदमाश":"badmāś","बदलना":"badalnā","बर्थ":"barth",
  "बाँटना":"bā̃ṭnā","बोतल":"botal","भाभी":"bhābhī","भूलकर":"bhūlkar","भोजन":"bhojan","मिठाई":"miṭhāī","मिनट":"minaṭ","मुड़ना":"muṛnā",
  "रेडियो":"reḍiyo","ले":"le","लेना-देना":"lenā-denā","विवाह":"vivāh","विशेष":"viśeṣ","वैर":"vair","सकना":"saknā","समाचार":"samācār",
  "सवा":"savā","साढ़े":"sāṛhe","साथी":"sāthī","साबुन":"sābun","सेब":"seb","होकर":"hokar","होली":"holī","होल्ड":"holḍ",
  "बैठ":"baiṭh","सो":"so","समझ":"samajh","हो":"ho","लौट":"lauṭ","निकल":"nikal",
  // conjunctive participles (12.1)
  "जाकर":"jākar","खाकर":"khākar","पीकर":"pīkar","बैठकर":"baiṭhkar","लौटकर":"lauṭkar","नहाकर":"nahākar",
  "पहुँचकर":"pahũckar","दौड़कर":"dauṛkar","पढ़कर":"paṛhkar",
  // time (12.2)
  "बजा":"bajā","बजकर":"bajkar","बजने":"bajne","बज":"baj","बजनेवाले":"bajnevāle",
  // सकना, पाना, चुकना (12.3)
  "सकता":"saktā","सकेगी":"sakegī","चल":"cal","देख":"dekh","बेच":"bec","सकती":"saktī","सकते":"sakte","सकेगा":"sakegā","सका":"sakā","सकी":"sakī","सकूँ":"sakū̃","सक":"sak",
  "पाया":"pāyā","पाई":"pāī","पाए":"pāe","पाईं":"pāī̃","पा":"pā",
  "चुका":"cukā","चुकी":"cukī","चुके":"cuke",
  // compound verbs and verbs in combination (12.4–12.5)
  "चली":"calī","चले":"cale","निकली":"niklī","बदल":"badal","खो":"kho","धो":"dho","तोड़":"toṛ","बना":"banā",
  "पी":"pī","दे":"de",
  // forms produced by earlier units' rules
  "करेगा":"karegā","नहाता":"nahātā","नहाया":"nahāyā","पहुँचे":"pahũce","दौड़ा":"dauṛā","होता":"hotā","चलेगी":"calegī","पूरी":"pūrī",
  "खाता":"khātā","बैठा":"baiṭhā","जाता":"jātā","हँसकर":"hãskar","धीमी":"dhīmī","सकेंगे":"sakẽge","पहुँच":"pahũc",
  "ख़रीदीं":"kharīdī̃","सुनकर":"sunkar","बजता":"bajtā","सकतीं":"saktī̃"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "करकर":"karkar","कियाकर":"kiyākar","जानाकर":"jānākar","गयाकर":"gayākar","नहानाकर":"nahānākar","बैठनाकर":"baiṭhnākar",
  "दौड़नाकर":"dauṛnākar","खानाकर":"khānākar","सकया":"sakyā","पाआ":"pāā","चुकया":"cukyā","बजेकर":"bajekar"
};

const CP = "The conjunctive participle is the verb stem + कर (नहाकर “having bathed”, “after bathing”). It links a first action to the main verb.";
const KARKE = "करना is the exception: its conjunctive participle is करके only.";
const CPNE = "The conjunctive participle does not affect the main clause: whether the doer takes ने depends only on the main verb.";
const TIME = "Telling the time: एक बजा है, but दो बजे हैं and upwards. “At” a time is the oblique बजे, even for one o'clock.";
const FRAC = "सवा “plus a quarter”, साढ़े “plus a half” (from three upwards), पौने “less a quarter”. 1.30 is डेढ़, 2.30 is ढाई.";
const MINS = "Minutes past the hour use बजकर (दो बजकर दस मिनट), minutes to the hour use बजने में (दो बजने में दस मिनट).";
const SAK = "सकना “can”, पाना “manage to” and चुकना “have already” follow the bare stem of another verb, agree with the subject and never take ने.";
const COMPNE = "A compound verb takes ने only when both verbs are ने verbs (बेच दिया, खा लिया). With जाना as the second verb there is no ने.";
const JANA = "जाना as the second verb gives completeness or a change of state (सो जाना, बदल जाना, हो जाना).";
const LENA = "लेना as the second verb turns the benefit towards the doer, देना away from the doer.";
const COMB = "In लौट आना, ले जाना, निकल आना both verbs keep their meaning. The last verb is आना or जाना, so there is no ने.";

const cp = [
  gap("cp:0", "राज ___ नाश्ता करेगा ।", "{After bathing}[1] Raj[0] {will have}[3] breakfast[2].", "नहाकर", [["नहाता","नहाता is the imperfective participle, “bathing (habitually)”. A first action linked to the main verb is stem + कर."], ["नहाया","नहाया is the perfective, “bathed”. Hindi does not join two verbs this way. The first action is stem + कर."], ["नहानाकर","Not a word. कर goes on the bare stem, not on the infinitive: नहाकर."]], CP),
  gap("cp:1", "हम दिल्ली ___ तुम्हें फ़ोन करेंगे ।", "We[0] {will phone}[4+5] you[3] {after reaching}[2] Delhi[1].", "पहुँचकर", [["पहुँचे","पहुँचे is the perfective or the subjunctive. The first of two actions is stem + कर."], ["पहुँचना","पहुँचना is the infinitive. The conjunctive participle is the stem + कर."]], CP),
  gap("cp:2", "मोहन सामान तैयार ___ स्टेशन गया ।", "Mohan[0] got[3] the luggage[1] ready[2] and went[5] to the station[4].", "करके", [["करकर","Not a word. "+KARKE], ["किया","किया is the perfective, “did”. The first action takes the conjunctive participle."], ["कियाकर","Not a word. कर never goes on the perfective participle, and करना has करके."]], KARKE),
  gap("cp:3", "सीता ने बाज़ार ___ एक साड़ी ख़रीदी ।", "Sita[0] went[3] to the market[2] and bought[6] a[4] sari[5].", "जाकर", [["जानाकर","Not a word. कर goes on the bare stem, not on the infinitive: जाकर."], ["गयाकर","Not a word. कर goes on the bare stem, not on the perfective: जाकर."], ["गई","गई is the perfective. Hindi does not string two finite verbs together like this. The first action is जाकर."]], CP+" The main verb ख़रीदना still takes ने, सीता ने."),
  gap("cp:4", "___ दूध पीकर सो गई ।", "Pinki[0] drank[2] {her milk}[1] and {went to sleep}[3+4].", "पिंकी", [["पिंकी ने","The main verb सो जाना is intransitive, so there is no ने, even though पीकर has an object."], ["पिंकी को","को does not mark the subject of सो जाना. The subject stays in the plain form."]], CPNE),
  gap("cp:5", "बच्चे ___ बाहर गए ।", "{The children}[0] went[3] out[2] running[1].", "दौड़कर", [["दौड़ना","दौड़ना is the infinitive. The manner of the main action is stem + कर."], ["दौड़ा","दौड़ा is the perfective, “ran”, and it is singular. The manner of the main action is stem + कर."], ["दौड़नाकर","Not a word. कर goes on the bare stem: दौड़कर."]], "Some conjunctive participles work as adverbs of manner: दौड़कर “running”, हँसकर “laughingly”."),
  gap("cp:6", "उसने ___ मेरा गिलास तोड़ा ।", "He[0] broke[4] my[2] glass[3] deliberately[1].", "जान-बूझकर", [["छोड़कर","छोड़कर “apart from” follows a noun with को (राज को छोड़कर)."], ["होकर","होकर “via” follows the name of a place (लखनऊ से होकर)."]], "जान-बूझकर “deliberately” is built on two conjunctive participles."),
  gap("cp:7", "राज को ___ सब लोग आए ।", "Everyone[3+4] came[5] except[1+2] Raj[0].", "छोड़कर", [["होकर","होकर means “via”, of a route."], ["भूलकर","राज को भूलकर would mean “having forgotten Raj”, and भूलकर भी is “even by mistake”. “Except” is को छोड़कर."]], "X को छोड़कर “apart from X, except X”."),
  gap("cp:8", "हम लखनऊ से ___ बनारस गए ।", "We[0] went[5] to Banaras[4] via[2+3] Lucknow[1].", "होकर", [["होता","होता is the imperfective participle of होना. “Via” is (से) होकर."], ["छोड़कर","छोड़कर “except” follows को, not a route."]], "(से) होकर “via”: लखनऊ से होकर “via Lucknow”."),
  mc("cp:9", "Join the two sentences with a conjunctive participle", "मोहन ने घर लौटकर अख़बार पढ़ा ।", [["मोहन घर लौटकर अख़बार पढ़ा ।","पढ़ना is transitive and the main verb is perfective, so the doer takes ने. लौटकर does not change that."], ["मोहन ने घर लौटा अख़बार पढ़ा ।","लौटा is the perfective. The first action goes into the conjunctive participle, लौटकर."]], CPNE, {hi: "मोहन घर लौटा । उसने अख़बार पढ़ा ।", audio: true, say: "मोहन ने घर लौटकर अख़बार पढ़ा ।", en: "Mohan[0] returned[3] home[2] and read[5] the newspaper[4]."}),
  mc("cp:10", "Use a conjunctive participle instead of “… के बाद”", "खाना खाकर हम बाज़ार गए ।", [["खाना खाकर हमने बाज़ार गए ।","जाना is intransitive, so हम takes no ने. खाकर does not change that."], ["खाना खाता हम बाज़ार गए ।","खाता is the imperfective participle. Use stem + कर, खाकर."], ["खाना खानाकर हम बाज़ार गए ।","खानाकर is not a word. कर goes on the bare stem: खाकर."]], CP, {hi: "खाना खाने के बाद हम बाज़ार गए ।", audio: true, say: "खाना खाकर हम बाज़ार गए ।", en: "{After a meal}[0+1] we[2] went[4] to the market[3]."}),
  gap("cp:11", "कृपा ___ धीमी आवाज़ में बोलिए ।", "Please[0+1] speak[5] {in a low voice}[2+3+4].", "करके", [["कीजिए","कीजिए is the polite imperative. “Kindly” is the fixed phrase कृपा करके."], ["करकर","Not a word. "+KARKE]], "कृपा करके and मेहरबानी करके “kindly, please” are conjunctive participles of करना.")
];

const time = [
  gap("tm:0", "क्या एक ___ है ?", "{Is it}[3] one[1] o'clock[2]?", "बजा", [["बजे","बजे is plural, used from two o'clock upwards (दो बजे हैं). One o'clock is singular."], ["बजता","बजता is the imperfective, “strikes (regularly)”. Telling the time uses the perfective बजा."]], TIME),
  gap("tm:1", "साढ़े चार ___ हैं ।", "It's[3] {half past}[0] four[1+2].", "बजे", [["बजा","बजा goes with one o'clock (एक बजा है). साढ़े चार is plural."], ["बजकर","बजकर adds minutes past the hour (चार बजकर दस मिनट)."]], TIME),
  mc("tm:2", "How do you say “The film will start at half past one”?", "फ़िल्म डेढ़ बजे शुरू होगी ।", [["फ़िल्म साढ़े एक बजे शुरू होगी ।","The book uses साढ़े from three upwards. Half past one is डेढ़, “one and a half”."], ["फ़िल्म सवा बजे शुरू होगी ।","सवा बजे is at a quarter past one."]], FRAC, {say: "फ़िल्म डेढ़ बजे शुरू होगी ।", en: "{The film}[0] {will start}[3+4] at[2] {half past one}[1]."}),
  gap("tm:3", "हमारी बस ___ बजे चलेगी ।", "Our[0] bus[1] {will leave}[4] at[3] {half past two}[2].", "ढाई", [["डेढ़","डेढ़ बजे is at half past one."], ["सवा दो","सवा दो is a quarter past two."]], FRAC),
  gap("tm:4", "मैं हर दिन ___ सात बजे उठता हूँ ।", "I[0] {get up}[6+7] at[5] {a quarter to}[3] seven[4] every[1] day[2].", "पौने", [["पौन","पौन “three-quarters” is used alone for a quarter to one (पौन बजा). Before an hour it is पौने."], ["सवा","सवा सात is a quarter past seven."]], FRAC),
  gap("tm:5", "चार ___ में बीस मिनट हैं ।", "It's[5] twenty[3] minutes[4] to[1+2] four[0].", "बजने", [["बजकर","बजकर gives minutes past the hour. Minutes to the hour use बजने में."], ["बजे","बजे is not used here. Minutes to the hour use the oblique infinitive, बजने में."]], MINS),
  gap("tm:6", "मेहमान तीन ___ पच्चीस मिनट पर पहुँचे ।", "{The guests}[0] arrived[6] at[5] twenty-five[3] minutes[4] past[2] three[1].", "बजकर", [["बजने में","तीन बजने में पच्चीस मिनट is twenty-five to three."], ["बजे","बजे cannot take minutes after it. Minutes past the hour use बजकर."], ["बजेकर","Not a word. कर goes on the bare stem of बजना, बजकर."]], MINS),
  gap("tm:7", "कल एक ___ मुझसे मिलो ।", "Meet[4] me[3] at[2] one[1] tomorrow[0].", "बजे", [["बजा","बजा is used in telling the time (एक बजा है). “At” a time takes the oblique बजे, even for one o'clock."], ["बजकर","बजकर adds minutes past the hour (एक बजकर दस मिनट)."]], TIME),
  gap("tm:8", "जल्दी करो, पाँच बज ___ हैं !", "{Hurry up}[0+1], it's[5] {just striking}[3+4] five[2]!", "रहे", [["रहा","रहा is singular. पाँच takes the plural, बज रहे हैं."], ["रही","रही is feminine. The time is told with masculine forms."]], "The continuous of बजना, बज रहे हैं, gives “it's just … o'clock”."),
  meaning("tm:9", "बारह बजनेवाले हैं ।", "It's about to strike twelve.", [["It's half past twelve.","That would be साढ़े बारह बजे हैं. बजनेवाले हैं means “about to strike”."], ["It's ten past twelve.","That would be बारह बजकर दस मिनट हैं. Infinitive + वाला means “about to”."]], "बजनेवाले हैं — “(the hour) is about to strike”."),
  mc("tm:10", "What does तीसरे पहर mean?", "in the afternoon", [["all day long","That is आठों पहर, “all eight watches”."], ["at three o'clock","पहर is a watch of about three hours, not an hour. Three o'clock is तीन बजे."]], "पहर is one of the eight three-hour watches of the traditional day. It survives in दोपहर, तीसरे पहर and आठों पहर."),
  gap("tm:11", "बच्चे ___ नौ बजे स्कूल पहुँचे ।", "{The children}[0] reached[5] school[4] at[3] {a quarter past}[1] nine[2].", "सवा", [["साढ़े","साढ़े नौ is half past nine."], ["पौने","पौने नौ is a quarter to nine."]], FRAC)
];

const modal = [
  gap("md:0", "मैं आज शाम को नहीं आ ___ ।", "I[0] can't[4+6] come[5] {this evening}[1+2+3]. (a man speaking)", "सकता", [["सकती","सकती is feminine. The speaker is a man."], ["सकूँ","सकूँ is the subjunctive, “that I may be able”. A plain statement “I can't” is सकता."]], "सकना follows the bare stem: आ सकता “can come”. In the negative the auxiliary हूँ is usually dropped."),
  gap("md:1", "___ वह चिट्ठी नहीं पढ़ सकी ।", "Sita[0] couldn't[3+5] read[4] that[1] letter[2].", "सीता", [["सीता ने","सकना never takes ने, even after a transitive stem like पढ़."], ["सीता को","को does not mark the subject of सकना. The subject stays in the plain form."]], SAK),
  gap("md:2", "क्या तुम कल मेरे साथ बाज़ार चल ___ हो ?", "Can[7+8] you[1] come[6] to the market[5] with[4] me[3] tomorrow[2]? (to a woman)", "सकती", [["सकते","सकते is masculine. The cue is to a woman."], ["सकतीं","With an auxiliary the feminine plural nasal goes on the last word only, and तुम … हो needs none: सकती हो."]], SAK),
  gap("md:3", "राज कल दफ़्तर नहीं पहुँच ___ ।", "Raj[0] {won't be able to}[3+5] get[4] to the office[2] tomorrow[1].", "सकेगा", [["सकेगी","सकेगी is feminine. Raj is a man."], ["सकेंगे","सकेंगे is plural. Raj, spoken of plainly, takes the singular."]], "सकना has a future: सकेगा, सकेगी, सकेंगे “will be able”."),
  gap("md:4", "बच्चे पूरी कहानी नहीं सुन ___ ।", "{The children}[0] {didn't manage to}[3+5] hear[4] the whole[1] story[2].", "पाए", [["पाया","पाया is singular. बच्चे is plural."], ["पाईं","पाईं is feminine plural, as if agreeing with कहानी. पाना agrees with the subject, बच्चे."]], SAK),
  mc("md:5", "Which says “I can't hear your voice” (a man on the phone, trying)?", "मैं तुम्हारी आवाज़ नहीं सुन पा रहा हूँ ।", [["मैं तुम्हारी आवाज़ नहीं सुन सक रहा हूँ ।","सकना is never used in the continuous. पाना can be: सुन पा रहा हूँ."], ["मैं तुम्हारी आवाज़ नहीं सुनकर पा रहा हूँ ।","पाना follows the bare stem (सुन), not the conjunctive participle."]], "पाना “manage to” can be continuous, सकना cannot.", {say: "मैं तुम्हारी आवाज़ नहीं सुन पा रहा हूँ ।", en: "I[0] {am not managing}[3+5+6+7] to hear[4] your[1] voice[2]."}),
  gap("md:6", "मैं यह फ़िल्म देख ___ हूँ ।", "I[0] {have already seen}[3+4+5] this[1] film[2]. (a man speaking)", "चुका", [["चुकी","चुकी is feminine. The speaker is a man."], ["चुके","चुके is plural. मैं takes the singular."], ["चुकया","Not a word. The perfective of चुकना is चुका, with no -y-."]], SAK),
  gap("md:7", "___ चिट्ठी लिख चुकी है ।", "Pinki[0] {has already written}[2+3+4] the letter[1].", "पिंकी", [["पिंकी ने","चुकना never takes ने, even after a transitive stem like लिख."], ["पिंकी को","को does not mark the subject of चुकना. The subject stays in the plain form."]], SAK),
  mc("md:8", "Answer “No, he hasn't read it yet.”", "नहीं, उसने अभी पत्र नहीं पढ़ा है ।", [["नहीं, वह अभी पत्र नहीं पढ़ चुका है ।","The book notes that चुकना is rarely used in the negative. The usual reply drops it and uses the plain perfective, with ने."], ["नहीं, उसने अभी पत्र नहीं पढ़ चुका है ।","चुकना never takes ने, and in the negative the plain perfective is used instead: उसने … नहीं पढ़ा है."]], "चुकना is rarely negative. “Not yet” uses the plain perfective.", {hi: "क्या राज पत्र पढ़ चुका है ?", audio: true, say: "नहीं, उसने अभी पत्र नहीं पढ़ा है ।", en: "No[0], he[1] {hasn't}[4+6] read[5] the letter[3] yet[2]."}),
  mc("md:9", "Which sentence is correct?", "मैं हिन्दी बोल सकता हूँ ।", [["मैं हिन्दी सकता हूँ ।","सकना cannot stand alone. It always follows a verb stem, बोल सकता."], ["मैं हिन्दी बोलना सकता हूँ ।","सकना follows the bare stem, not the infinitive, बोल सकता."]], "सकना, पाना and चुकना never stand alone: the stem of the main verb comes first.", {say: "मैं हिन्दी बोल सकता हूँ ।", en: "I[0] can[3+4] speak[2] Hindi[1]."}),
  gap("md:10", "दूधवाला अब तक आ ___ होगा ।", "{The milkman}[0] {will have}[5] {already come}[3+4] {by now}[1+2].", "चुका", [["चुकी","चुकी is feminine. दूधवाला is a man."], ["चुके","चुके is plural. दूधवाला is one man."]], "चुका होगा “will have already …, must have already …”.")
];

const comp = [
  gap("cv:0", "छोटा बच्चा जल्दी सो ___ ।", "The little[0] child[1] {fell asleep}[3+4] quickly[2].", "गया", [["गई","गई is feminine. बच्चा is masculine."], ["गए","गए is plural. छोटा बच्चा is one child."]], JANA),
  gap("cv:1", "___ सारा दूध पी गया ।", "Mohan[0] {drank up}[3+4] all[1] {the milk}[2].", "मोहन", [["मोहन ने","पी जाना ends in जाना, which is intransitive, so there is no ने."], ["मोहन को","को does not mark the subject. The subject of पी जाना stays in the plain form."]], COMPNE),
  gap("cv:2", "सीता ने सारे कपड़े धो ___ ।", "Sita[0] washed[4+5] all[2] {the clothes}[3].", "लिए", [["ली","ली would agree with सीता. With ने the verb agrees with कपड़े, masculine plural."], ["लिया","लिया is singular. कपड़े is plural."]], COMPNE),
  gap("cv:3", "___ वह पुराना गिलास तोड़ दिया ।", "Raj[0] broke[5+6] that[2] old[3] glass[4].", "राज ने", [["राज","In तोड़ देना both verbs are ने verbs, so the doer takes ने."], ["राज को","को does not mark the doer. The doer of a transitive perfective takes ने."]], COMPNE),
  gap("cv:4", "सीता ने मेरे लिए चाय बना ___ ।", "Sita[0] made[5+6] tea[4] for[3] me[2].", "दी", [["दिया","दिया is masculine. With ने the verb agrees with चाय, feminine."], ["दीं","दीं is plural. चाय is singular."]], LENA+" "+COMPNE),
  mc("cv:5", "Grandma can't read. Ask Raj to read her letter out to her.", "राज, दादी का पत्र पढ़कर सुना दो ।", [["राज, दादी का पत्र पढ़ लो ।","With लेना the benefit flows towards the doer, “read it to yourself”. Reading aloud to someone is पढ़कर सुनाना, with देना because it is done for her."], ["राज, दादी का पत्र पढ़कर दो ।","पढ़कर दो is two actions, “read it and then hand it over”, not reading it out."]], LENA, {say: "राज, दादी का पत्र पढ़कर सुना दो ।", en: "Raj[0], {read out}[4+5+6] Grandma's[1+2] letter[3]."}),
  gap("cv:6", "मेरी चाबी खो ___ ।", "My[0] key[1] {got lost}[2+3].", "गई", [["दी","खो देना is transitive, “to lose something”, and needs a doer with ने (मैंने चाबी खो दी). Here चाबी itself is the subject."], ["गया","गया is masculine. चाबी is feminine."]], "With verbs that can be transitive or intransitive (खोना, बदलना), जाना as the second verb makes the use intransitive."),
  gap("cv:7", "यह शहर बहुत बदल ___ है ।", "This[0] town[1] {has changed}[3+4+5] {a lot}[2].", "गया", [["दिया","बदल देना is transitive, “to change something”, and needs a doer with ने. Here the town itself has changed."], ["गई","गई is feminine. शहर is masculine."]], "With verbs that can be transitive or intransitive (खोना, बदलना), जाना as the second verb makes the use intransitive."),
  gap("cv:8", "मौसम ठंडा हो ___ है ।", "{The weather}[0] {has turned}[2+3+4] cold[1].", "गया", [["गई","गई is feminine. मौसम is masculine."], ["गए","गए is plural. मौसम is singular."]], JANA),
  gap("cv:9", "अरे, बस आ ___ है !", "Oh[0], the bus[1] {has arrived}[2+3+4]!", "गई", [["गया","गया is masculine. बस is feminine."], ["गईं","गईं is plural, and before है there is no nasal. It is one bus."]], JANA),
  mc("cv:10", "Which sentence is more natural?", "आज राज ने अख़बार नहीं पढ़ा ।", [["आज राज ने अख़बार नहीं पढ़ लिया ।","Compound verbs express manner, so they are much less used in the negative: an action that hasn't happened has no manner."], ["आज राज ने अख़बार नहीं पढ़ दिया ।","पढ़ देना is “read out for someone”, and a compound is out of place in a plain negative statement anyway."]], "Compound verbs are mostly used with completed actions and commands, much less with negatives.", {say: "आज राज ने अख़बार नहीं पढ़ा ।", en: "Raj[1] {didn't read}[4+5] the newspaper[3] today[0]."})
];

const comb = [
  gap("cb:0", "पिता जी शाम को घर लौट ___ ।", "Father[0+1] {came back}[5+6] home[4] {in the evening}[2+3].", "आए", [["गए","लौट गए is “went back”. The cue is “came back”."], ["आया","आया is singular. पिता जी takes the respectful plural."]], COMB),
  gap("cb:1", "बच्चों को स्कूल ले ___ ।", "{Please take}[3+4] the children[0+1] to school[2].", "जाइए", [["आइए","ले आइए is “bring (here)”. Taking them away to school is ले जाइए."], ["गए","गए is the perfective, “took”. The cue is a command."]], COMB),
  gap("cb:2", "___ अपने साथ बहुत सामान ले आई ।", "Sita[0] brought[5+6] {a lot of}[3] luggage[4] {with her}[1+2].", "सीता", [["सीता ने","ले आना ends in आना, so there is no ने, though लेना is transitive."], ["सीता को","को does not mark the subject. The subject of ले आना stays in the plain form."]], COMB),
  gap("cb:3", "मुझसे नाराज़ होकर संगीता ___ गई ।", "Sangeeta[3] {got angry}[1+2] with me[0] and {went away}[4+5].", "चली", [["चला","चला is masculine. In चला जाना the first verb is a participle and agrees with the subject."], ["चले","चले is plural. संगीता, spoken of plainly, takes चली."]], "In चला जाना “to go away” चला is a participle, not a stem, so it agrees with the subject: संगीता चली गई."),
  gap("cb:4", "रात को चाँद निकल ___ ।", "The moon[2] {came out}[3+4] {at night}[0+1].", "आया", [["आई","आई is feminine. चाँद is masculine."], ["आए","आए is plural. There is one moon."]], COMB),
  mc("cb:5", "What is the difference between ले आना and ले जाना?", "ले आना “bring”, ले जाना “take away”", [["ले आना “take away”, ले जाना “bring”","It is the other way round: आना is towards the speaker, जाना away."], ["ले आना takes ने, ले जाना does not","Neither takes ने. The last verb, आना or जाना, is intransitive."]], COMB),
  meaning("cb:6", "उषा अपनी किताबें ले गई ।", "Usha took her books away.", [["Usha brought her books.","That would be ले आई. ले गई is “took away”."], ["Usha bought her books.","“Bought” would be ख़रीदीं. ले गई is “took away”."]], COMB)
];

const build = [
  tiles("tl:0", "I[0] {will come}[2] {after bathing}[1]. (a man speaking)", ["मैं","नहाकर","आऊँगा"], [["नहाना","नहाना is the infinitive. The first action is stem + कर, नहाकर."], ["मैंने","आना is intransitive, so मैं takes no ने."], ["नहानाकर","Not a word. कर goes on the bare stem: नहाकर."]], {alt: [["नहाकर","मैं","आऊँगा"]]}),
  tiles("tl:1", "Sita[0] sat[4] in[3] the garden[2] and read[6] the newspaper[5].", ["सीता","ने","बग़ीचे","में","बैठकर","अख़बार","पढ़ा"], [["पढ़ी","पढ़ी would agree with सीता. With ने the verb agrees with अख़बार, masculine."], ["बैठा","बैठा is a participle, “seated”. The first action is the conjunctive participle बैठकर."], ["बैठनाकर","Not a word. कर goes on the bare stem: बैठकर."]], {alt: [["बग़ीचे","में","बैठकर","सीता","ने","अख़बार","पढ़ा"]]}),
  tiles("tl:2", "We[0] can't[2+4] come[3] today[1].", ["हम","आज","नहीं","आ","सकते"], [["सकता","सकता is singular. हम takes सकते."], ["हमने","सकना never takes ने."], ["सकया","Not a word. The perfective of सकना is सका, with no -y-, and here the present सकते is needed."]], {alt: [["आज","हम","नहीं","आ","सकते"], ["हम","आज","आ","नहीं","सकते"], ["आज","हम","आ","नहीं","सकते"]]}),
  tiles("tl:3", "Raj[0] couldn't[2+4] {get to}[3] the station[1].", ["राज","स्टेशन","नहीं","पहुँच","पाया"], [["ने","पाना after a verb stem never takes ने, and पहुँचना is intransitive anyway."], ["पाई","पाई is feminine. पाना agrees with the subject, राज."], ["पाआ","Not a word. After a vowel stem the masculine singular inserts -y-: पाया."]], {alt: [["राज","स्टेशन","पहुँच","नहीं","पाया"]]}),
  tiles("tl:4", "{The guests}[0] {have already reached}[2+3+4] the station[1].", ["मेहमान","स्टेशन","पहुँच","चुके","हैं"], [["चुका","चुका is singular. The guests are plural (हैं)."], ["पहुँचकर","चुकना follows the bare stem, पहुँच चुके."], ["चुकया","Not a word. The perfective of चुकना is चुका, चुके, चुकी."]]),
  tiles("tl:5", "Pinki[0] {went to sleep}[3+4] at[2] ten[1].", ["पिंकी","दस","बजे","सो","गई"], [["ने","सो जाना is intransitive, so there is no ने."], ["बजा","“At” a time takes the oblique बजे."]], {alt: [["दस","बजे","पिंकी","सो","गई"]]}),
  tiles("tl:6", "Grandma[0] gave[5+6] the children[2+3] apples[4].", ["दादी","ने","बच्चों","को","सेब","दे","दिए"], [["दी","दी would agree with दादी. With ने the verb agrees with सेब, masculine plural here."], ["दीं","दीं is feminine plural. सेब is masculine."]], {alt: [["दादी","ने","सेब","बच्चों","को","दे","दिए"],["दादी","ने","बच्चों","को","सेब","दिए"],["दादी","ने","सेब","बच्चों","को","दिए"]]}),
  tiles("tl:7", "Take[4+5] this[0] bag[1] {with you}[2+3].", ["यह","थैला","अपने","साथ","ले","जाओ"], [["आओ","ले आओ is “bring”. “Take away” is ले जाओ."], ["तुम्हारे","The subject's own company is अपने साथ, not तुम्हारे साथ."]], {alt: [["अपने","साथ","यह","थैला","ले","जाओ"]]}),
  tiles("tl:8", "Sangeeta[0] came[4+5] out[3] of[2] the house[1].", ["संगीता","घर","से","बाहर","निकल","आई"], [["ने","निकल आना ends in आना, so there is no ने."], ["आया","आया is masculine. Sangeeta is a woman."]], {alt: [["संगीता","घर","से","बाहर","आई"]]}),
  tiles("tl:9", "It's[3] {a quarter past}[0] five[1+2].", ["सवा","पाँच","बजे","हैं"], [["बजा","बजा goes with one o'clock (एक बजा है). Two and upwards take बजे हैं."], ["पौने","पौने पाँच is a quarter to five."]]),
  tiles("tl:10", "It's[4] ten[2] minutes[3] past[1] six[0].", ["छह","बजकर","दस","मिनट","हैं"], [["बजने","छह बजने में दस मिनट would be “ten to six”."], ["बजा","बजा goes with one o'clock (एक बजा है). Minutes past the hour use बजकर."], ["बजेकर","Not a word. कर goes on the bare stem of बजना, बजकर."]], {order: "The hour comes first: छह बजकर दस मिनट is ten past six, दस बजकर छह मिनट would be six minutes past ten."}),
  tiles("tl:11", "{The children}[0] ate[4+5] all[2] {the mangoes}[3].", ["बच्चों","ने","सारे","आम","खा","लिए"], [["लिया","लिया is singular. सारे आम is plural."], ["बच्चे","Before ने the noun is oblique, बच्चों."]])
];

const mean = [
  meaning("mn:0", "राज जान-बूझकर देर से आया ।", "Raj came late on purpose.", [["Raj came late by mistake.","That is the opposite. जान-बूझकर is “deliberately”."], ["Raj knew he would come late.","जान-बूझकर is one adverb, “deliberately”, not a separate verb “knew”."]]),
  meaning("mn:1", "पिंकी को छोड़कर सब बच्चे सो गए ।", "All the children except Pinki went to sleep.", [["Only Pinki went to sleep.","It is the other way round: everyone except Pinki went to sleep."], ["All the children went to sleep near Pinki.","को छोड़कर means “except”, not “near” (के पास)."]]),
  meaning("mn:2", "तुम आज आओगे कि कल ?", "Will you come today or tomorrow?", [["Will you come today and tomorrow?","कि between two simple alternatives in a question means “or”, not “and”."], ["Did you come today or yesterday?","आओगे is future, so कल here is “tomorrow”."]]),
  meaning("mn:3", "मेरा छोटा भाई तीसरे पहर सो जाता है ।", "My little brother goes to sleep in the afternoon.", [["My little brother sleeps for three hours.","पहर is a watch of about three hours, but तीसरे पहर is a phrase, “in the afternoon”."], ["My little brother went to sleep at three.","सो जाता है is the present habitual, and “at three” would be तीन बजे."]]),
  meaning("mn:4", "वह तुम्हारी बात समझ गया ।", "He realized what you meant.", [["He couldn't understand what you said.","That would be नहीं समझ पाया or नहीं समझ सका."], ["He understood you and left.","समझ गया is one compound verb, “realized”. There is no leaving."]]),
  meaning("mn:5", "सीता दस बजकर बीस मिनट पर घर से निकली ।", "Sita left home at twenty past ten.", [["Sita left home at twenty to ten.","That would be दस बजने में बीस मिनट पर."], ["Sita left home at half past ten.","That would be साढ़े दस बजे."]]),
  meaning("mn:6", "आप अब घर जा सकते हैं ।", "You can go home now.", [["You managed to go home.","That would be पाना in the past, जा पाए."], ["You have already gone home.","That would be चुकना, जा चुके हैं."]])
];

const usage = [
  mc("us:0", "Does the conjunctive participle decide whether the main verb takes ने?", "No, only the main verb decides about ने", [["Yes, a transitive conjunctive participle brings ने","No. In पिंकी दूध पीकर सो गई there is no ने, because सो जाना is intransitive."], ["Yes, an intransitive conjunctive participle removes ने","No. In सीता ने बाज़ार जाकर साड़ी ख़रीदी the doer keeps ने."]], CPNE),
  mc("us:1", "After a verb stem, which of सकना, पाना and चुकना take ने?", "None of them", [["All three, after a transitive stem","They never take ने. Compare सीता वह चिट्ठी नहीं पढ़ सकी."], ["Only the one meaning “have already”","चुकना doesn't take ने either: पिंकी चिट्ठी लिख चुकी है."]], SAK),
  mc("us:2", "Which of these is never used in the continuous?", "सकना", [["पाना","पाना can be, as in सुन पा रहा हूँ."], ["होना","होना has a continuous, हो रहा है."]], "सकना is never continuous. To say “I can't … (right now)” use पाना, as in नहीं सुन पा रहा हूँ."),
  mc("us:3", "When does a compound verb take ने?", "When both verbs are ने verbs (बेच दिया)", [["Whenever the main verb is transitive (पी गया)","Not enough. पी गया has no ने, because जाना is intransitive."], ["Whenever the second verb is transitive (हँस दी)","Not enough. हँसना is intransitive, so वह हँस दी has no ने."]], COMPNE),
  mc("us:4", "What does लेना suggest as the second verb of a compound?", "The benefit flows towards the doer", [["The benefit flows away from the doer","That is देना."], ["The action is already finished","That is चुकना."]], LENA),
  mc("us:5", "What does जाना add as the second verb of a compound?", "Completeness or a change of state", [["Motion away from the speaker","In a compound जाना loses that meaning. It keeps it only in combinations such as लौट जाना."], ["Ability","That is सकना."]], JANA),
  mc("us:6", "Why are compound verbs rarely used in negative sentences?", "They express manner, and an action that didn't happen has no manner", [["They always take ने","They don't. सो गया has no ने."], ["They cannot be used in the past","They are mostly used with completed actions, as in खा लिया."]], "Compound verbs are mostly used with completed actions and commands, much less with negatives, continuous tenses and conjunctive participles."),
  mc("us:7", "How do लौट आना and चला जाना differ in form?", "लौट is a bare stem, चला a participle that agrees (चली गई)", [["Both लौट and चला are bare stems","चला agrees with the subject, as in संगीता चली गई."], ["Both लौट and चला are participles that agree","लौट never changes, as in सीता लौट आई, वे लौट आए."]], "In लौट आना the first verb is a stem. In चला जाना, चला आना it is a participle that agrees with the subject.")
];

const unit = {
  id: "unit12", n: 12, title: "Ask him and tell me", titleHi: "उनसे पूछकर मुझे बता दो",
  scope: "The conjunctive participle (stem + कर, करना करके, colloquial stem + के) linking actions, independent of ने, and as adverbs (दौड़कर, जान-बूझकर, कृपा करके, को छोड़कर, से होकर, भूलकर भी); telling the time with बजना (एक बजा है, दो बजे हैं, सवा, साढ़े, पौने, पौन, डेढ़, ढाई, बजकर, बजने में, बज रहे हैं, बजनेवाले हैं, पहर); सकना, पाना, चुकना after a stem, without ने; compound verbs with जाना, लेना, देना and the ने rule for them; verbs in combination (लौट आना, ले जाना, निकल आना, चला जाना); कि “or”",
  pages: "book 146–158 (159 blank)",
  skills: {cp: "Conjunctive participle", time: "Telling the time", modal: "सकना, पाना, चुकना", comp: "Compound verbs", comb: "Verbs in combination", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अंत","end","n","m"],["अद्भुत","remarkable","a"],["अवकाश","leisure, free time","n","m"],["आठों पहर","all day long","x"],["आम","mango","n","m"],
    ["आराम करना","to rest","v"],["आवाज़","voice, sound","n","f"],["कविता","poem, poetry","n","f"],["कृपा","kindness, grace","n","f"],["कृपा करके","kindly, please (formal)","x"],
    ["खेद","regret","n","m"],["खोना","to lose, be lost","v"],["गृह मंत्री","home minister (m or f)","n","m"],["ग्वालियर","Gwalior","n","m"],["चला आना","to come along, approach","v"],
    ["चला जाना","to go away, go one's way","v"],["चिढ़ाना","to irritate, tease","v"],["चुकना","(after a verb stem) to have already done","v"],["को छोड़कर","apart from, except for","x"],["जान-बूझकर","deliberately","x"],
    ["जी-हुज़ूरी","sycophancy, flattery","n","f"],["टैक्सी","taxi","n","f"],["डिगरी","degree","n","f"],["डिनर","dinner","n","m"],["ढाई","two and a half","a"],
    ["तीसरे पहर","in the afternoon","x"],["दौड़ना","to run","v"],["धीमा","low, faint","a"],["नहाना","to bathe","v"],["नाश्ता","breakfast","n","m"],
    ["पछताना","to regret, repent","v"],["परीक्षा","examination","n","f"],["परीक्षा देना","to take (sit) an exam","v"],["पाना","(after a verb stem) to manage to","v"],["पार करना","to cross","v"],
    ["पास करना","to pass (an exam)","v"],["पौन","three-quarters (12.45 in telling the time)","a"],["पौना","three-quarter (adjective)","a"],["पौने","a quarter to (with an hour)","a"],["प्रकाशक","publisher","n","m"],
    ["बदमाश","villain, rogue","n","m"],["बदलना","to change","v"],["बर्थ","berth","n","m"],["बाँटना","to divide, share out","v"],["बोतल","bottle","n","f"],
    ["भाभी","elder brother's wife","n","f"],["भूलकर भी","even by mistake","x"],["भेंट","meeting, encounter","n","f"],["भोजन","food (formal)","n","m"],["भोजन करना","to dine","v"],
    ["मगर","crocodile","n","m"],["मिठाई","sweet, sweet dish","n","f"],["मिनट","minute","n","m"],["मुड़ना","to turn","v"],["मेहरबानी करके","kindly, please (Perso-Arabic)","x"],
    ["रेडियो","radio","n","m"],["ले आना","to bring","v"],["ले जाना","to take away","v"],["लेना-देना","dealings, connection","n","m"],["विवाह","marriage","n","m"],
    ["विशेष","particular","a"],["वैर","hostility","n","m"],["सकना","(after a verb stem) to be able","v"],["समाचार","news","n","m"],["सवा","one and a quarter, plus a quarter","a"],
    ["साढ़े","plus a half","a"],["साथी","companion, friend","n","m"],["साबुन","soap","n","m"],["सेब","apple","n","m"],["से होकर","via","x"],
    ["होली","Holi, spring festival of colours","n","f"],["होल्ड करना","to hold (a phone line)","v"],
    ["बैठ जाना","to sit down","v"],["सो जाना","to go to sleep","v"],["समझ जाना","to realize","v"],["हो जाना","to become","v"],["आ जाना","to arrive","v"],
    ["लौट आना","to come back","v"],["लौट जाना","to go back","v"],["निकल आना","to come out","v"],["निकल जाना","to go out, leave","v"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "cp", title: "जाकर, खाकर, करके", desc: "The conjunctive participle: “having gone, after eating”", skill: "cp", items: cp},
    {id: "time", title: "कितने बजे हैं ?", desc: "Telling the time: बजा, बजे, सवा, साढ़े, पौने, बजकर, बजने में", skill: "time", items: time},
    {id: "modal", title: "सकना, पाना, चुकना", desc: "“Can”, “manage to”, “have already”", skill: "modal", items: modal},
    {id: "comp", title: "सो गया, खा लिया, दे दिया", desc: "Compound verbs with जाना, लेना, देना", skill: "comp", items: comp},
    {id: "comb", title: "लौट आना, ले जाना", desc: "Verbs in combination, and चला जाना", skill: "comb", items: comb},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Conjunctive participle, सकना, compounds", skill: "usage", items: usage}
  ],
  test: {vocab: 4, cp: 3, time: 3, modal: 3, comp: 3, comb: 1, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "conjunctive-participle", title: "The conjunctive participle: stem + कर (जाकर “having gone, after going”); करना has करके only; colloquially stem + के (जाके). It links a first action to the main verb, usually with the same subject, and does not affect the main clause: whether the doer takes ने depends on the main verb alone (सीता ने बाज़ार जाकर साड़ी ख़रीदी, पिंकी दूध पीकर सो गई)"},
    {id: "cp-adverbs", title: "Conjunctive participles as adverbs and set phrases: दौड़कर “running”, हँसकर “laughingly”, कृपा करके and मेहरबानी करके “kindly”, (को) छोड़कर “apart from”, जान-बूझकर “deliberately”, (से) होकर “via”, भूलकर भी “even by mistake”"},
    {id: "ki-or", title: "कि “or” between a simple pair of alternatives (आज कि कल ?)"},
    {id: "telling-time", title: "Telling the time with बजना: एक बजा है, दो बजे हैं and upwards; सवा “plus a quarter”, साढ़े “plus a half” (from three upwards), पौने “less a quarter”; पौन बजा 12.45, सवा बजा 1.15, डेढ़ बजा 1.30, ढाई बजे 2.30; “at” with the oblique बजे; minutes past with बजकर, to with बजने में; बज रहे हैं “it's just …”, बजनेवाले हैं “it's about to strike …”; पहर “watch” in दोपहर, तीसरे पहर, आठों पहर"},
    {id: "sakna-pana-cukna", title: "सकना “can”, पाना “manage to”, चुकना “have already” follow the bare stem of a verb, agree with the subject and never take ने (सीता वह चिट्ठी नहीं पढ़ सकी); पाना but never सकना can be continuous (नहीं सुन पा रहा हूँ); चुकना is rarely negative; they never stand alone"},
    {id: "compound-verbs", title: "Compound verbs: stem + जाना (completeness or change of state: सो जाना, हो जाना; intransitive use of बदलना, खोना), लेना (benefit towards the doer), देना (benefit away from the doer); ने only when both verbs are ने verbs (खा लिया, but खा गया); mostly with completed actions and commands, much less with negatives, continuous tenses and conjunctive participles"},
    {id: "verbs-in-combination", title: "Verbs in combination, each keeping its own meaning: लौट आना, लौट जाना, ले आना, ले जाना, निकल आना, निकल जाना, with no ने; चला जाना “go away” and चला आना “come along”, where चला is a participle agreeing with the subject (संगीता चली गई)"}
  ]
};

writeUnit(12, unit, {forms, fake});
