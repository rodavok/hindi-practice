"use strict";
// Unit 14 (book pp. 176–191): यह तो काठमांडु में ख़रीदा गया. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 187–189, Quick Vocab pp. 177, 182, 14.1–14.8 pp. 178–185)
  "अनुपस्थित":"anupasthit","अमीर":"amīr","अर्थ":"arth","आँखें":"ā̃khẽ","आबादी":"ābādī","आर्थिक":"ārthik","इलाक़ा":"ilāqā","ऊल-जलूल":"ūl-jalūl",
  "क़रीब":"qarīb","कारण":"kāraṇ","किधर":"kidhar","बग़ल":"bagal","द्वारा":"dvārā","बीच":"bīc","ख़बर":"khabar","गुस्ताख़ी":"gustākhī",
  "घटिया":"ghaṭiyā","चटनी":"caṭnī","चेहरा":"cehrā","ज़बान":"zabān","जहाँ":"jahā̃","जितना":"jitnā","उतना":"utnā","जिधर":"jidhar",
  "जैसा":"jaisā","वैसा":"vaisā","जोड़ना":"joṛnā","डाँटना":"ḍā̃ṭnā","तमिल":"tamil","ताज़ा":"tāzā","तालाब":"tālāb","तालियाँ":"tāliyā̃",
  "दक्षिण":"dakṣiṇ","दबना":"dabnā","दिलचस्प":"dilcasp","दुबारा":"dubārā","दूरदर्शन":"dūrdarśan","धुलना":"dhulnā","नदी":"nadī",
  "निराशा":"nirāśā","परिवर्तन":"parivartan","पाकिस्तान":"pākistān","पुल":"pul","प्रकार":"prakār","प्रदेश":"pradeś","प्रयोग":"prayog",
  "प्राचीन":"prācīn","प्राप्त":"prāpt","प्रेम":"prem","फ़ारसी":"fārsī","फूल":"phūl","बचा":"bacā","बढ़िया":"baṛhiyā","बिठाना":"biṭhānā",
  "बिल्ली":"billī","बोली":"bolī","भीगा":"bhīgā","भीगी":"bhīgī","भ्रष्ट":"bhraṣṭ","मक्खन":"makkhan","मच्छर":"macchar","मज़ाक़":"mazāq",
  "महिला":"mahilā","महीन":"mahīn","महोदय":"mahoday","मुलाक़ात":"mulāqāt","मौक़ा":"mauqā","राजस्थान":"rājasthān","लादना":"lādnā",
  "लेख":"lekh","लेखक":"lekhak","व्यक्ति":"vyakti","शादी-शुदा":"śādī-śudā","शानदार":"śāndār","सफल":"saphal","सफलता":"saphaltā",
  "साहित्य":"sāhity","स्वादिष्ट":"svādiṣṭ","टूटना":"ṭūṭnā","बनना":"bannā",
  // relative forms (14.5–14.7)
  "जितनी":"jitnī","जितने":"jitne","उतनी":"utnī","उतने":"utne","जैसी":"jaisī","वैसी":"vaisī",
  // passive and intransitive forms (14.1–14.2)
  "बोली":"bolī","बोला":"bolā","भेजी":"bhejī","बनाए":"banāe","लाए":"lāe","लाई":"lāī","लाया":"lāyā","पी":"pī","पिया":"piyā",
  "खोली":"kholī","खोला":"kholā","पकड़ा":"pakṛā","पकड़ी":"pakṛī","लिखी":"likhī","लिखा":"likhā","उठाया":"uṭhāyā","गाया":"gāyā","जाया":"jāyā",
  "उठा":"uṭhā","उठी":"uṭhī","बिठाया":"biṭhāyā","बेचा":"becā","दिखाई":"dikhāī","रखा":"rakhā",
  "टूट":"ṭūṭ","टूटी":"ṭūṭī","तोड़":"toṛ","तोड़ी":"toṛī","तोड़ा":"toṛā","बन":"ban","बिकती":"biktī","बिकता":"biktā","बिकते":"bikte",
  "धुलते":"dhulte","धुलती":"dhultī","धुलता":"dhultā",
  // oblique infinitives with लगना and देना (14.3–14.4)
  "रोने":"rone","भौंकने":"bhaũkne","हँसने":"hãsne","खेलने":"khelne","पढ़ने":"paṛhne","आने":"āne","जाने":"jāne","सोने":"sone",
  "भौंकता":"bhaũktā","खेलते":"khelte","आता":"ātā","हँसना":"hãsnā","बजाना":"bajānā","लगने":"lagne","दीं":"dī̃",
  // forms produced by earlier units' rules
  "इलाक़े":"ilāqe","ताज़े":"tāze","गुंडों":"guṇḍõ","मुझसे":"mujhse","बग़ीचे":"bagīce","साड़ियाँ":"sāṛiyā̃",
  "खाऊँगा":"khāū̃gā","जाओगे":"jāoge","जाऊँगा":"jāū̃gā","कहोगे":"kahoge","करूँगा":"karū̃gā","कहता":"kahtā","करें":"karẽ",
  "दिखाना":"dikhānā","खिड़कियों":"khiṛkiyõ","धोए":"dhoe","देखकर":"dekhkar","देखो":"dekho","बोलता":"boltā","पहनती":"pahantī","भेजे":"bheje","कहती":"kahtī","पूरे":"pūre","हफ़्ते":"hafte","बताया":"batāyā","ऐसी":"aisī","ख़रीदे":"kharīde","सुनी":"sunī","जातीं":"jātī̃","कमाता":"kamātā","बनाती":"banātī","पढ़ते":"paṛhte"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "बोलया":"bolyā","भेजया":"bhejyā","पकड़या":"pakṛyā","खोलया":"kholyā","टूटाया":"ṭūṭāyā","तोड़ाया":"toṛāyā",
  "जहाँओं":"jahā̃õ","जिधरों":"jidharõ","लगनेगा":"lagnegā","देनेगा":"denegā","हँसनेगा":"hãsnegā"
};

const PASS = "The passive is the perfective participle + जाना (बोला जाना “to be spoken”). Both parts agree with the subject, in any tense.";
const PASSKO = "If the subject takes को, the passive reverts to masculine singular (खिड़कियों को खोला गया).";
const AGENT = "The doer, if mentioned, takes से or, more formally, के द्वारा. ने is never used in the passive.";
const INAB = "A negative passive with से often means “can't (bring oneself to)”: the person takes से.";
const JAYA = "Some intransitive verbs have a passive too, used for suggestions. The participle of जाना there is जाया, not गया.";
const TRANS = "Hindi often has two verbs where English has one: intransitive टूटना “break (by itself)” and transitive तोड़ना “break (something)”. बनना, बिकना and धुलना are the intransitive partners of बनाना, बेचना and धोना.";
const LAGB = "Oblique infinitive + लगना “to begin to”. लगना takes no ने, and it agrees with its subject.";
const SHURU = "Direct infinitive + शुरू करना is also “to begin to”, often deliberate. It takes ने in the perfective.";
const DENA = "Oblique infinitive + देना “to let, allow”. देना takes ने in the perfective, and it agrees with a direct object unless the object takes को.";
const JITNA = "जितना … उतना “as much … as”. Both agree like adjectives with what they describe.";
const JAISA = "जैसा … वैसा “as … so” describes kind or manner. जिस तरह का … उस तरह का and जिस तरह (से) … उस तरह (से) are alternatives.";
const JAHAN = "जहाँ … वहाँ “where … there”, जहाँ भी “wherever”, जिधर … उधर “whither … thither”.";

const passive = [
  gap("pv:0", "आजकल ऐसी मिठाई घर पर नहीं बनाई ___ ।", "{These days}[0] such[1] sweets[2] {aren't made}[5+6+7] at home[3+4].", "जाती", [["जाता","जाता is masculine. Both parts of the passive agree with मिठाई, feminine."], ["जाते","जाते is masculine plural. मिठाई is feminine."]], PASS),
  gap("pv:1", "इस इलाक़े में उर्दू भी ___ जाती है ।", "Urdu[3] is[7] also[4] spoken[5+6] in[2] this[0] area[1].", "बोली", [["बोला","बोला is masculine. The participle agrees with उर्दू, feminine: बोली."], ["बोल","Stem + जाना makes a compound verb (बोल जाना “to speak out”). The passive uses the perfective participle: बोली."], ["बोलया","Not a word. बोलना has a consonant stem, so its perfective is बोला, बोली, with no -y-."]], PASS),
  gap("pv:2", "ये चिट्ठियाँ कल ___ गईं ।", "These[0] letters[1] {were sent}[3+4] yesterday[2].", "भेजी", [["भेजा","भेजा is masculine. Both parts agree with चिट्ठियाँ, feminine plural: भेजी गईं."], ["भेज","The passive uses the perfective participle, भेजी, not the stem."], ["भेजया","Not a word. भेजना has a consonant stem, so its perfective is भेजा, भेजी, with no -y-."]], PASS),
  gap("pv:3", "अगले साल यहाँ एक नया अस्पताल बनाया ___ ।", "A[3] new[4] hospital[5] {will be built}[6+7] here[2] {next year}[0+1].", "जाएगा", [["जाएगी","जाएगी is feminine. अस्पताल is masculine."], ["जाएँगे","जाएँगे is plural. It is one hospital."]], PASS),
  meaning("pv:5", "यह किताब पिछले साल लिखी गई थी ।", "This book was written last year.", [["This book was being written last year.","That would be लिखी जा रही थी."], ["I wrote this book last year.","That would be the active मैंने यह किताब लिखी. लिखी गई थी is passive."]], PASS),
  mc("pv:6", "Which verb means “to be spoken”?", "बोला जाना", [["बोल जाना","Stem + जाना makes a compound verb, बोल जाना “to speak out”. The passive is the perfective participle + जाना."], ["बोलना","बोलना is the active verb “to speak”."]], PASS),
  gap("pv:7", "सारा सामान ऊपर ले ___ गया ।", "All[0] the luggage[1] {was taken}[3+4+5] upstairs[2].", "जाया", [["गया","In the passive the participle of जाना is जाया — ले जाया गया."], ["जाए","जाए is the subjunctive. The passive needs the participle जाया before गया."]], "ले जाना “to take away” has a passive too, ले जाया जाना. The participle of जाना in a passive is जाया."),
  gap("pv:8", "मेहमानों के लिए ताज़े फल ख़रीदे ___ हैं ।", "Fresh[3] fruit[4] {has been bought}[5+6+7] for[1+2] the guests[0].", "गए", [["गई","गई is feminine. फल is masculine."], ["गया","गया is singular. ताज़े फल is plural here, and ख़रीदे already shows it: ख़रीदे गए."]], PASS),
  mc("pv:9", "Make this passive, leaving out the doer", "यहाँ बहुत चाय पी जाती है ।", [["यहाँ बहुत चाय पिया जाता है ।","पिया जाता is masculine. The passive agrees with चाय, feminine: पी जाती."], ["यहाँ बहुत चाय पी जाती हैं ।","हैं is plural. चाय is a singular subject: है."]], PASS, {hi: "लोग यहाँ बहुत चाय पीते हैं ।", audio: true, say: "यहाँ बहुत चाय पी जाती है ।", en: "{A lot of}[1] tea[2] {is drunk}[3+4+5] here[0]."}),
  gap("pv:10", "पहले यह शहर बहुत साफ़ रखा ___ था ।", "This[1] town[2] {used to be kept}[0+5+6+7] very[3] clean[4].", "जाता", [["जाती","जाती is feminine. शहर is masculine."], ["जाते","जाते is plural. It is one town."]], PASS),
  gap("pv:11", "क्या खिड़कियाँ खोली ___ ?", "Shall[0+3] the windows[1] {be opened}[2]?", "जाएँ", [["जाए","जाए is singular. खिड़कियाँ is plural: जाएँ."], ["जाओ","जाओ is the तुम command. A passive suggestion takes the subjunctive: जाएँ."]], "The subjunctive passive makes a suggestion or request: खोली जाएँ “should be opened”.")
];

const passko = [
  gap("pk:0", "सारी खिड़कियों को खोला ___ ।", "All[0] the windows[1+2] {were opened}[3+4].", "गया", [["गईं","With को after the subject the passive reverts to masculine singular: खोला गया."], ["गई","गई is feminine. With को the passive is masculine singular, whatever the noun."], ["खोलया","Not a word. खोलना has a consonant stem, so its perfective is खोला, with no -y-. The gap needs गया anyway."]], PASSKO),
  gap("pk:1", "उन गुंडों को कल पकड़ा ___ ।", "Those[0] louts[1+2] {were caught}[4+5] yesterday[3].", "गया", [["गए","गए is plural. With को the passive is masculine singular: पकड़ा गया."], ["गई","गई is feminine. With को the passive is masculine singular."], ["पकड़या","Not a word. पकड़ना has a consonant stem, so its perfective is पकड़ा, with no -y-. The gap needs गया anyway."]], PASSKO),
  gap("pk:2", "यह किताब एक प्रसिद्ध लेखक ___ लिखी गई थी ।", "This[0] book[1] {was written}[7+8+9] by[5+6] a[2] famous[3] writer[4].", "के द्वारा", [["ने","ने marks the doer of an active perfective verb. In the passive the doer takes से or के द्वारा."], ["को","को would make the writer the person it was written to. The doer takes से or के द्वारा."]], AGENT),
  gap("pk:3", "इतना भारी थैला मुझसे उठाया नहीं ___ ।", "I[3] {can't}[5+6] lift[4] such[0] a heavy[1] bag[2].", "जाता", [["जाती","जाती is feminine. The passive agrees with थैला, masculine."], ["जाते","जाते is plural. It is one bag."]], INAB),
  gap("pk:4", "___ उसकी बातें सुनी नहीं जातीं ।", "I[0] {can't bear}[4+5] to listen[3] to his[1] talk[2].", "मुझसे", [["मैंने","ने marks the doer of an active verb. In a passive of inability the person takes से — मुझसे."], ["मुझे","मुझे is the को form. Inability in the passive takes से — मुझसे."]], INAB),
  meaning("pk:5", "बच्चों से चुप नहीं रहा गया ।", "The children couldn't keep quiet.", [["The children kept quiet.","नहीं … गया is negative: they could not."], ["The children were told to keep quiet.","Nothing is said or told. से with a negative passive shows inability."]], "Even intransitive verbs such as रहना can be used in a passive of inability."),
  gap("pk:6", "आज रात को कहाँ ___ जाए ?", "Where[3] {shall we go}[4+5] tonight[0+1+2]?", "जाया", [["गया","In this passive the participle of जाना is जाया, not गया."], ["जाता","The passive uses the perfective participle. For जाना that is जाया."]], JAYA),
  mc("pk:8", "Make this passive, leaving out the doer", "चोर को पकड़ा गया ।", [["चोर को पकड़ी गई ।","With को the passive is masculine singular: पकड़ा गया."], ["चोर ने पकड़ा गया ।","ने is never used in the passive."]], PASSKO, {hi: "पुलिस ने चोर को पकड़ा ।", audio: true, say: "चोर को पकड़ा गया ।", en: "The thief[0+1] {was caught}[2+3]."}),
  meaning("pk:9", "मेहमानों को बग़ीचे में बिठाया गया ।", "The guests were seated in the garden.", [["The guests sat down in the garden.","That would be the active मेहमान बग़ीचे में बैठे. बिठाया गया is the passive of बिठाना “to make sit”."], ["The guests will be seated in the garden.","गया is past. The future would be बिठाया जाएगा."]], PASSKO)
];

const trans = [
  gap("tr:0", "यह खिड़की किसने ___ ?", "Who[2] broke[3] this[0] window[1]?", "तोड़ी", [["टूटी","टूटना is intransitive: it can't take ने. With किसने the transitive तोड़ना is needed."], ["तोड़ा","तोड़ा is masculine. With ने the verb agrees with खिड़की, feminine."], ["तोड़ाया","Not a word. The perfective of तोड़ना is तोड़ा, तोड़ी, with nothing added."]], TRANS),
  gap("tr:1", "कल रात हवा से पेड़ की एक डाल ___ गई ।", "{Last night}[0+1] a[6] branch[7] of[5] a tree[4] broke[8+9] in the wind[2+3].", "टूट", [["तोड़","तोड़ना is transitive: someone breaks something. The branch broke by itself — टूट गई."], ["टूटी","The compound verb uses the stem — टूट गई."], ["टूटाया","Not a word. टूटना has no -āyā form. The compound verb needs the stem टूट."]], TRANS),
  gap("tr:2", "इस दुकान में अच्छी साड़ियाँ ___ हैं ।", "Good[3] saris[4] {are sold}[5+6] in[2] this[0] shop[1].", "बिकती", [["बिकता","बिकता is masculine singular. साड़ियाँ is feminine plural."], ["बिकते","बिकते is masculine. साड़ियाँ is feminine."]], "बिकना “to be sold” is the intransitive partner of बेचना. बेची जाती हैं (passive) would also be right, with more stress on the act of selling."),
  mc("tr:3", "Which intransitive verb pairs with बनाना “to make”?", "बनना", [["बिकना","बिकना “to be sold” pairs with बेचना “to sell”."], ["टूटना","टूटना “to break (by itself)” pairs with तोड़ना."]], "बनना “to be made, come into being” is the intransitive partner of बनाना."),
  gap("tr:4", "इस होटल में कपड़े रोज़ ___ हैं ।", "Clothes[3] {are washed}[5+6] {every day}[4] in[2] this[0] hotel[1].", "धुलते", [["धुलती","धुलती is feminine. कपड़े is masculine."], ["धुलता","धुलता is singular. कपड़े is plural."]], "धुलना “to be washed” is the intransitive partner of धोना. धोए जाते हैं (passive) would also be right."),
  meaning("tr:5", "शहर में नया पुल बन रहा है ।", "A new bridge is being built in the town.", [["The new bridge in the town has broken.","That would be टूट गया है. बन रहा है is “is being made”."], ["A new bridge was built in the town.","बन रहा है is continuous: it is still being built."]], TRANS),
  gap("tr:6", "हमारा काम कल शुरू ___ ।", "Our[0] work[1] began[3+4] yesterday[2].", "हुआ", [["हुई","हुई is feminine. काम is masculine."], ["हुए","हुए is plural. It is one piece of work."]], "शुरू होना “to begin” is intransitive. शुरू किया गया (passive) would also be right.")
];

const begin = [
  gap("bg:0", "माँ को न देखकर बच्चा रोने ___ ।", "{Not seeing}[2+3] its mother[0+1], the child[4] began[6] to cry[5].", "लगा", [["लगी","लगी is feminine. लगना agrees with बच्चा, masculine."], ["लगे","लगे is plural. It is one child."], ["लगनेगा","Not a word. The future of लगना is लगेगा, built on the stem. Here the past लगा is needed."]], LAGB),
  gap("bg:1", "मेहमान को देखकर कुत्ता ___ लगा ।", "Seeing[2] the guest[0+1], the dog[3] began[5] to bark[4].", "भौंकने", [["भौंकना","लगना “to begin” takes the oblique infinitive: भौंकने."], ["भौंकता","भौंकता is the imperfective participle. लगना “to begin” takes the oblique infinitive."]], LAGB),
  gap("bg:2", "सब लड़कियाँ गाना गाने ___ ।", "All[0] the girls[1] began[4] to sing[3] (a song[2]).", "लगीं", [["लगी","लगी is singular. लड़कियाँ is feminine plural: लगीं."], ["लगे","लगे is masculine. लड़कियाँ is feminine."]], LAGB),
  gap("bg:3", "मेरी बात सुनकर ___ हँसने लगा ।", "Hearing[2] what I said[0+1], Raj[3] began[5] to laugh[4].", "राज", [["राज ने","लगना does not take ने, even in the perfective."], ["राज को","“To begin” with लगना takes a plain subject: राज."]], LAGB),
  gap("bg:4", "सीता ने इस साल तबला सीखना शुरू ___ ।", "Sita[0+1] started[6+7] learning[5] the tabla[4] {this year}[2+3].", "किया", [["की","की is feminine. Nothing here is feminine: तबला सीखना is masculine."], ["हुआ","शुरू होना is intransitive and takes no ने. With सीता ने the verb is शुरू किया."]], SHURU),
  gap("bg:5", "अब सब लोग ___ शुरू करें ।", "Now[0] everyone[1+2] {should start}[4+5] reading[3].", "पढ़ना", [["पढ़ने","शुरू करना takes the direct infinitive, पढ़ना. The oblique पढ़ने goes with लगना."], ["पढ़ते","पढ़ते is the imperfective participle. शुरू करना takes the infinitive."]], SHURU),
  gap("bg:6", "माँ ने बच्चों को बाहर ___ दिया ।", "Mother[0+1] let[6] the children[2+3] play[5] outside[4].", "खेलने", [["खेलना","देना “to let” takes the oblique infinitive: खेलने दिया."], ["खेलते","खेलते is the imperfective participle. देना “to let” takes the oblique infinitive."]], DENA),
  gap("bg:7", "उसने मुझे अपनी पुरानी चिट्ठियाँ पढ़ने ___ ।", "She[0] let[6] me[1] read[5] her[2] old[3] letters[4].", "दीं", [["दिए","दिए is masculine. देना agrees with the direct object चिट्ठियाँ, feminine plural: दीं."], ["दी","दी is singular. चिट्ठियाँ is plural, and the nasal goes on the last word: दीं."]], DENA),
  gap("bg:8", "उसे अंदर ___ दो ।", "Let[3] him[0] come[2] in[1].", "आने", [["आना","देना “to let” takes the oblique infinitive: आने दो."], ["आता","आता is the imperfective participle. देना “to let” takes the oblique infinitive."]], DENA),
  gap("bg:9", "बच्चों को आग के पास मत ___ दो ।", "Don't[5] let[7] the children[0+1] go[6] near[3+4] the fire[2].", "जाने", [["जाना","देना “to let” takes the oblique infinitive: जाने दो."], ["गए","गए is the perfective. देना “to let” takes the oblique infinitive: जाने."]], DENA),
  mc("bg:10", "Which sentence means “The guests began to eat”?", "मेहमान खाना खाने लगे ।", [["मेहमानों ने खाना खाने लगे ।","लगना never takes ने — मेहमान … लगे."], ["मेहमान खाना खाना लगे ।","लगना “to begin” takes the oblique infinitive — खाने."]], LAGB, {say: "मेहमान खाना खाने लगे ।", en: "The guests[0] began[3] to eat[1+2]."}),
  meaning("bg:11", "रात को मुझे डर लगने लगा ।", "At night I began to feel afraid.", [["At night I was afraid to start.","लगने लगा is “began to be felt”: डर लगना + लगना “to begin”."], ["At night I began to frighten people.","डर लगना is “to feel fear”. The person who feels it takes को."]], LAGB)
];

const rel = [
  gap("rl:0", "मैं ___ खाना खा सकता हूँ, उतना खाऊँगा ।", "I[0] {will eat}[7] {as much}[1+6] food[2] as I {can}[4+5] eat[3]. (a man speaking)", "जितना", [["कितना","कितना is the question word “how much?”. The relative begins with j-, जितना."], ["उतना","उतना is the correlative, which picks up the relative in the second clause."]], JITNA),
  gap("rl:1", "जितनी किताबें तुम्हारे पास हैं, ___ मेरे पास नहीं हैं ।", "I[6+7] {don't have}[8+9] {as many}[0+5] books[1] as you[2+3] {do}[4].", "उतनी", [["उतना","उतना is masculine singular. The correlative agrees with किताबें, feminine plural: उतनी."], ["जितनी","जितनी is the relative. The second clause takes the correlative उतनी."]], JITNA),
  gap("rl:2", "जैसा मैं कहता हूँ, ___ करो ।", "Do[5] as[0+4] I[1] say[2+3]. (a man speaking)", "वैसा", [["कैसा","कैसा is the question word “what kind?”. The correlative begins with v-, वैसा."], ["जैसा","जैसा opens the relative clause. The second clause takes the correlative वैसा."]], JAISA),
  gap("rl:3", "___ साड़ी सीता ने पहनी थी, वैसी मुझे भी चाहिए ।", "I[7] want[9] a sari[1] like[0+6] the one Sita[2+3] wore[4+5] too[8].", "जैसी", [["जैसा","जैसा is masculine. It agrees with साड़ी, feminine: जैसी."], ["जैसे","जैसे is masculine plural or oblique. साड़ी is feminine singular."]], JAISA),
  gap("rl:4", "___ तुम जाओगे, वहाँ मैं भी जाऊँगा ।", "Where[0] you[1] go[2], I[4] {will go}[6] too[5] (lit. “… there[3] …”). (a man speaking)", "जहाँ", [["कहाँ","कहाँ is the question word “where?”. The relative begins with j-, जहाँ."], ["वहाँ","वहाँ is the correlative “there”, which opens the second clause."], ["जहाँओं","Not a word. जहाँ never changes."]], JAHAN),
  gap("rl:5", "जहाँ ___ जाओ, अपना ध्यान रखना ।", "Wherever[0+1] you go[2], {take care of}[4+5] yourself[3].", "भी", [["तक","जहाँ तक is “as far as”. “Wherever” is जहाँ भी."], ["से","जहाँ से is “from where”. “Wherever” is जहाँ भी."]], JAHAN),
  gap("rl:6", "___ देखो, उधर लोग ही लोग हैं ।", "Wherever[0] you look[1], there[2] are[6] crowds of people[3+4+5].", "जिधर", [["किधर","किधर is the question word “whereabouts?”. The relative is जिधर."], ["इधर","इधर is “here, over here”. The relative is जिधर."], ["जिधरों","Not a word. जिधर never changes."]], JAHAN),
  mc("rl:7", "Which sentence says the same, with the clauses reversed?", "वहाँ बहुत अमीर लोग आते हैं जहाँ सीता काम करती है ।", [["जहाँ बहुत अमीर लोग आते हैं, वहाँ सीता काम करती है ।","This changes the meaning: “Sita works wherever lots of rich people come”."], ["वहाँ बहुत अमीर लोग आते हैं कहाँ सीता काम करती है ।","कहाँ is the question word. The relative is जहाँ."]], "The two clauses can be swapped round, correlative clause first, without changing the meaning.", {hi: "जहाँ सीता काम करती है, वहाँ बहुत अमीर लोग आते हैं ।", audio: true, say: "वहाँ बहुत अमीर लोग आते हैं जहाँ सीता काम करती है ।", en: "{Lots of}[1] rich[2] people[3] come[4+5] there[0] where[6] Sita[7] works[8+9+10]."}),
  meaning("rl:8", "जितना पैसा राज कमाता है, उतना मैं नहीं कमाता ।", "I don't earn as much money as Raj does.", [["Raj doesn't earn as much money as I do.","नहीं goes with मैं … कमाता, it is I who earn less."], ["I earn as much money as Raj does.","नहीं makes it negative: not as much."]], JITNA),
  meaning("rl:9", "जैसा तुम कहोगे, वैसा ही होगा ।", "It will be just as you say.", [["How will it be, do you think?","That would be a question with कैसा. जैसा … वैसा is “as … so”."], ["Whatever happens, you will talk about it.","जैसा … वैसा compares manner: things will happen the way you say."]], JAISA),
  gap("rl:10", "___ तरह से माँ खाना बनाती हैं, उस तरह से कोई नहीं बनाता ।", "Nobody[10+11] cooks[12] {the way}[7+8+9] that[0+1+2] Mother[3] cooks[4+5+6].", "जिस", [["किस","किस तरह is the question “in what way?”. The relative is जिस तरह."], ["उस","उस तरह is the correlative, which comes in the second clause."]], JAISA),
  gap("rl:11", "जिस तरह ___ कपड़े सीता पहनती है, उस तरह के कपड़े मुझे भी पसंद हैं ।", "I[11] too[12] like[13+14] clothes[10] {of the kind}[7+8+9] that[0+1+2] Sita[4] wears[5+6] (lit. “… clothes[3] …”).", "के", [["का","का is masculine singular. It agrees with कपड़े, plural: के."], ["की","की is feminine. कपड़े is masculine."]], JAISA)
];

const build = [
  tiles("tl:0", "These[0] shoes[1] {were made}[4+5] in Agra[2+3].", ["ये","जूते","आगरा","में","बनाए","गए"], [["बनाई","बनाई is feminine. The passive agrees with जूते, masculine plural: बनाए गए."], ["बना","The passive uses the perfective participle of बनाना — बनाए."]], {alt: [["आगरा","में","ये","जूते","बनाए","गए"]]}),
  tiles("tl:1", "Tea[2] {is made}[3+4+5] every[0] evening[1].", ["हर","शाम","चाय","बनाई","जाती","है"], [["बनाया","बनाया is masculine. चाय is feminine: बनाई जाती."], ["जाता","जाता is masculine. Both parts agree with चाय — बनाई जाती."]], {alt: [["चाय","हर","शाम","बनाई","जाती","है"]]}),
  tiles("tl:2", "The children[0+1] {were sent}[3+4] to school[2].", ["बच्चों","को","स्कूल","भेजा","गया"], [["गए","With को after the subject the passive is masculine singular: भेजा गया."], ["भेजे","भेजे गए would be right without को (बच्चे स्कूल भेजे गए). With बच्चों को the passive is masculine singular."]]),
  tiles("tl:3", "This[0] poem[1] {was written}[5+6] by[3+4] Sita[2].", ["यह","कविता","सीता","के","द्वारा","लिखी","गई"], [["ने","ने is never used in the passive. The doer takes के द्वारा or से."], ["लिखा","लिखा is masculine. The passive agrees with कविता, feminine."]], {alt: [["सीता","के","द्वारा","यह","कविता","लिखी","गई"]]}),
  tiles("tl:4", "Raj[0+1] {couldn't}[3+4] {get up}[2].", ["राज","से","उठा","नहीं","गया"], [["ने","Inability in the passive takes से, not ने."], ["उठी","उठी is feminine. The passive of an intransitive verb is masculine singular: उठा गया."]], {alt: [["राज","से","नहीं","उठा","गया"]]}),
  tiles("tl:5", "Seeing[1] me[0], Sita[2] began[4] to laugh[3].", ["मुझे","देखकर","सीता","हँसने","लगी"], [["हँसना","लगना “to begin” takes the oblique infinitive: हँसने."], ["लगा","लगा is masculine. सीता is a woman: लगी."], ["हँसनेगा","Not a word. लगना “to begin” follows the oblique infinitive हँसने."]], {alt: [["सीता","मुझे","देखकर","हँसने","लगी"]]}),
  tiles("tl:6", "Grandma[0+1] let[5] me[2] go[4] to Delhi[3].", ["दादी","ने","मुझे","दिल्ली","जाने","दिया"], [["जाना","देना “to let” takes the oblique infinitive — जाने."], ["दी","दी is feminine. There is no direct object here, so दिया."], ["देनेगा","Not a word. The future of देना is देगा. Here the past is needed — दिया."]]),
  tiles("tl:7", "Mohan[0+1] started[4+5] cooking[2+3].", ["मोहन","ने","खाना","बनाना","शुरू","किया"], [["बनाने","शुरू करना takes the direct infinitive — बनाना शुरू किया."], ["हुआ","शुरू होना is intransitive and takes no ने. With मोहन ने it is शुरू किया."]]),
  tiles("tl:8", "There aren't[7+8] {as many}[0+5] trees[1] here[6] as {there are}[4] {in the village}[2+3].", ["जितने","पेड़","गाँव","में","हैं","उतने","यहाँ","नहीं","हैं"], [["कितने","कितने is the question word. The relative is जितने."], ["उतना","उतना is singular. The correlative agrees with पेड़, here plural: उतने."]], {alt: [["यहाँ","उतने","पेड़","नहीं","हैं","जितने","गाँव","में","हैं"], ["उतने","पेड़","यहाँ","नहीं","हैं","जितने","गाँव","में","हैं"], ["जितने","पेड़","गाँव","में","हैं","यहाँ","उतने","नहीं","हैं"]]}),
  tiles("tl:9", "Do[6] just[5] as[0+4] Mother[1] says[2+3].", ["जैसा","माँ","कहती","हैं","वैसा","ही","करो"], [["कैसा","कैसा is the question word. The relative is जैसा."], ["कहता","कहता is masculine. माँ is a woman, and respect makes it plural: कहती हैं."]], {alt: [["वैसा","ही","करो","जैसा","माँ","कहती","हैं"], ["जैसा","माँ","कहती","हैं","वैसा","करो"], ["वैसा","करो","जैसा","माँ","कहती","हैं"]]}),
  tiles("tl:10", "Wherever[1+2] we[0] went[3], we[5] got[8] good[6] food[7] (lit. “… there[4] …”).", ["हम","जहाँ","भी","गए","वहाँ","हमें","अच्छा","खाना","मिला"], [["कहाँ","कहाँ is the question word. “Wherever” is जहाँ भी."], ["हमने","मिलना takes no ने — the receiver takes को, हमें."]], {alt: [["जहाँ","भी","हम","गए","वहाँ","हमें","अच्छा","खाना","मिला"], ["हम","जहाँ","भी","गए","हमें","अच्छा","खाना","मिला"], ["जहाँ","भी","हम","गए","हमें","अच्छा","खाना","मिला"], ["हम","जहाँ","भी","गए","हमें","वहाँ","अच्छा","खाना","मिला"], ["जहाँ","भी","हम","गए","हमें","वहाँ","अच्छा","खाना","मिला"], ["वहाँ","हमें","अच्छा","खाना","मिला","जहाँ","भी","हम","गए"]]}),
  tiles("tl:11", "My[0] cup[1] broke[2+3].", ["मेरा","प्याला","टूट","गया"], [["तोड़","तोड़ना is transitive: someone breaks something. The cup broke by itself: टूट गया."], ["गई","गई is feminine. प्याला is masculine."]])
];

const mean = [
  meaning("mn:0", "यह फ़िल्म बच्चों को नहीं दिखाई जाएगी ।", "This film won't be shown to children.", [["The children won't show this film.","बच्चों को is “to the children”. दिखाई जाएगी is passive: the film will be shown."], ["This film wasn't shown to children.","जाएगी is future: “won't be shown”."]]),
  meaning("mn:1", "बच्चे खेलने लगे और बड़े बातें करने लगे ।", "The children began to play and the grown-ups began to talk.", [["The children let the grown-ups play and talk.","“Let” would be देना. लगना with the oblique infinitive is “begin to”."], ["The children played and the grown-ups talked.","लगे adds “began to”."]]),
  meaning("mn:2", "मुझे सोने दो !", "Let me sleep!", [["I have to sleep!","“Have to” would be मुझे सोना है. सोने दो is “let (me) sleep”."], ["I'm beginning to fall asleep!","“Begin to” is लगना. देना with the oblique infinitive is “let”."]]),
  meaning("mn:3", "जितना काम आज हुआ, उतना पूरे हफ़्ते में नहीं हुआ ।", "Not as much work got done in the whole week as got done today.", [["As much work got done today as in the whole week.","नहीं हुआ makes the second clause negative."], ["Less work got done today than in the whole week.","It is the other way round: the week saw less work than today."]]),
  meaning("mn:4", "जहाँ पहले तालाब था, वहाँ अब एक बड़ा होटल है ।", "Where there used to be a pond, there's now a big hotel.", [["There's now a big hotel next to the pond.","जहाँ … वहाँ is “where … there”: the hotel stands where the pond was."], ["Where is the big hotel that used to be by the pond?","जहाँ is the relative “where”, not a question."]]),
  meaning("mn:5", "दुकान में घटिया सामान बेचा जा रहा था ।", "Inferior goods were being sold in the shop.", [["Fine goods were being sold in the shop.","घटिया means “inferior, low grade”."], ["Inferior goods will be sold in the shop.","जा रहा था is past continuous: “were being sold”."]]),
  meaning("mn:6", "उस बेचारे से बोला नहीं गया ।", "The poor fellow couldn't speak.", [["Nobody spoke to the poor fellow.","से with a negative passive shows inability: he could not speak."], ["The poor fellow wasn't told.","“Told” would be बताया. बोला गया is from बोलना “to speak”."]])
];

const usage = [
  mc("us:0", "The Hindi passive is made of …", "the perfective participle + जाना", [["the verb stem + जाना","Stem + जाना makes a compound verb (बोल जाना “to speak out”)."], ["the imperfective participle + जाना","The passive uses the perfective participle: बोला जाना."]], PASS),
  mc("us:1", "In a passive sentence, what does the verb agree with?", "The subject, unless it takes को", [["The doer, marked with से or के द्वारा","The doer is often not mentioned, and the verb never agrees with it."], ["Always masculine singular, as after को","Only when the subject takes को. Otherwise both parts agree with the subject."]], PASS+" "+PASSKO),
  mc("us:2", "In the passive, the doer of the action takes …", "से or के द्वारा", [["ने","ने is never used in the passive."], ["को","को on the subject makes the passive masculine singular. The doer takes से or के द्वारा."]], AGENT),
  mc("us:3", "What does a negative passive with से often suggest?", "Inability or unwillingness", [["A polite request","Requests use the subjunctive passive, e.g. खोली जाएँ."], ["A planned action","Planned action is more typical of शुरू करना or the infinitive + होना."]], INAB),
  mc("us:4", "लगना “to begin to” takes …", "the oblique infinitive, and never ने", [["the direct infinitive, with ने in the perfective","That describes शुरू करना."], ["the oblique infinitive, with ने in the perfective","That describes देना “to let”. लगना never takes ने."]], LAGB),
  mc("us:5", "देना “to let, allow” takes …", "the oblique infinitive, and ने in the perfective", [["the oblique infinitive, but never ने","देना is transitive: उसने मुझे जाने दिया."], ["the direct infinitive, like शुरू करना","देना “to let” takes the oblique infinitive: जाने दो."]], DENA),
  mc("us:6", "In कहाँ जाया जाए ? why is it जाया and not गया?", "In the passive the participle of जाना is जाया", [["जाया is the subjunctive of जाना","The subjunctive is जाए. जाया is the participle used only in the passive."], ["जाया is a dialect form of गया","It is standard: the passive of जाना always uses जाया."]], JAYA),
  mc("us:7", "बेची जाती हैं and बिकती हैं can both mean “are sold”. How do they differ?", "The passive stresses the act of selling, बिकना things being on sale", [["बिकना is not used in modern Hindi","Both are everyday Hindi."], ["बेची जाती हैं is only used in the past","The passive can be used in any tense."]], TRANS)
];

const unit = {
  id: "unit14", n: 14, title: "This was bought in Kathmandu", titleHi: "यह तो काठमांडु में ख़रीदा गया",
  scope: "The passive: perfective participle + जाना, both agreeing with the subject, in any tense and with compound verbs; को on the subject makes it masculine singular; the agent with से or के द्वारा; intransitive passives for suggestions (बैठा जाए, जाया); से + negative passive for inability; transitive and intransitive pairs (तोड़ना/टूटना, बनाना/बनना, बेचना/बिकना, धोना/धुलना); oblique infinitive + लगना “to begin to”, direct infinitive + शुरू करना; oblique infinitive + देना “to let”; relative-correlatives जितना … उतना, जैसा … वैसा, जिस तरह का … उस तरह का, जहाँ … वहाँ, जहाँ भी, जिधर … उधर; clause reversal and mixed pairs",
  pages: "book 176–191",
  skills: {passive: "The passive", passko: "को, से and जाया", trans: "Transitive pairs", begin: "Begin to, let", rel: "Relatives 3–6", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अनुपस्थित","absent","a"],["अमीर","rich, wealthy","a"],["अर्थ","meaning","n","m"],["आँखें दिखाना","to look angrily","v"],["आबादी","population, settlement","n","f"],
    ["आर्थिक","financial","a"],["इलाक़ा","area","n","m"],["ऊल-जलूल","silly, pointless","a"],["क़रीब","about, roughly","x"],["काँटा","thorn; fork","n","m"],
    ["कारण","reason, cause","n","m"],["कि","when (suddenly)","x"],["किधर","where? whither?","x"],["की बग़ल में","next to","x"],["के कारण","because of","x"],
    ["के द्वारा","by, by means of","x"],["के बीच में","in the middle of","x"],["ख़बर","news; information","n","f"],["गुस्ताख़ी","rudeness, impertinence","n","f"],["घटिया","inferior, low grade (invariable)","a"],
    ["चटनी","chutney","n","f"],["चेहरा","face, features","n","m"],["चोरी करना","to steal","v"],["जब कि","while, whereas","x"],["ज़बान","language, tongue","n","f"],
    ["जहाँ … वहाँ","where … there","x"],["जहाँ भी","wherever","x"],["जितना … उतना","as much as …","x"],["जिधर … उधर","whither … thither","x"],["जैसा … वैसा","as … so","x"],
    ["जोड़ना","to add","v"],["डाँटना","to scold","v"],["तमिल","Tamil","n","f"],["ताज़ा","fresh","a"],["तालाब","pond","n","m"],
    ["तालियाँ बजाना","to clap","v"],["दक्षिण","south","n","m"],["दबना","to yield, cower","v"],["दिलचस्प","interesting","a"],["दुबारा","again, a second time","x"],
    ["दूरदर्शन","television; Doordarshan","n","m"],["देना","(with oblique infinitive) to allow, let","v"],["धुलना","to be washed","v"],["नदी","river","n","f"],["निराशा","disappointment, despair","n","f"],
    ["परिवर्तन","alteration","n","m"],["पाकिस्तान","Pakistan","n","m"],["पुल","bridge","n","m"],["प्रकार","manner, way, type, kind","n","m"],["प्रदेश","state, province","n","m"],
    ["प्रयोग","use, usage","n","m"],["प्राचीन","ancient","a"],["प्राप्त करना","to obtain, attain","v"],["प्रेम","love","n","m"],["फ़ारसी","Persian","n","f"],
    ["फूल","flower","n","m"],["बचा","saved, left","a"],["बढ़िया","nice, of good quality (invariable)","a"],["बस","enough! that's all!","x"],["बिठाना","to make sit","v"],
    ["बिल्ली","cat","n","f"],["बोली","speech, dialect","n","f"],["भीगा","wet","a"],["भीगी बिल्ली","‘wet cat’, timid creature","n","f"],["भ्रष्ट","corrupted","a"],
    ["भ्रष्ट करना","to corrupt","v"],["मक्खन","butter","n","m"],["मच्छर","mosquito","n","m"],["मज़ाक़","joke","n","m"],["महसूस होना","to be felt, experienced","v"],
    ["महिला","lady","n","f"],["महीन","fine, delicate","a"],["महोदय","gentleman, sir","n","m"],["मुलाक़ात","meeting, encounter","n","f"],["मौक़ा","chance, opportunity","n","m"],
    ["राजस्थान","Rajasthan","n","m"],["लगना","(with oblique infinitive) to begin to","v"],["लादना","to load","v"],["लेख","article (written)","n","m"],["लेखक","writer","n","m"],
    ["व्यक्ति","person, individual","n","m"],["शादी-शुदा","married (invariable)","a"],["शानदार","magnificent","a"],["सफल","successful","a"],["सफलता","success","n","f"],
    ["साहित्य","literature","n","m"],["स्वादिष्ट","tasty","a"],["हवाई डाक","airmail","n","f"],["टूटना","to break (intransitive)","v"],["बनना","to be made, come into being","v"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "passive", title: "बोला जाना", desc: "The passive: “is spoken”, “was built”, “will be sent”", skill: "passive", items: passive},
    {id: "passko", title: "मुझसे नहीं जाता", desc: "Passive with को, the doer with से or के द्वारा, inability, जाया", skill: "passko", items: passko},
    {id: "trans", title: "टूटना और तोड़ना", desc: "Intransitive and transitive pairs", skill: "trans", items: trans},
    {id: "begin", title: "करने लगना, करने देना", desc: "“Begin to” and “let, allow”", skill: "begin", items: begin},
    {id: "rel", title: "जितना, जैसा, जहाँ", desc: "“As much as”, “as … so”, “where … there”", skill: "rel", items: rel},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "The passive, लगना, देना and relatives", skill: "usage", items: usage}
  ],
  test: {vocab: 4, passive: 3, passko: 3, trans: 2, begin: 3, rel: 3, build: 2, meaning: 1, usage: 1},
  _grammar: [
    {id: "passive", title: "The passive: perfective participle + जाना (बोला जाना “to be spoken”), both parts agreeing with the subject, in any tense (बोली जाती है, लिखा गया, बनाए जाएँगे, दिया जा रहा है, लाई जाए) and with compound verbs (बंद कर दी गई थी); if the subject takes को the verb reverts to masculine singular (सड़कों को साफ़ किया गया), as with ने and चाहिए; the agent, if mentioned, takes से or more formally के द्वारा; intransitive verbs in the passive for suggestions (बैठा जाए ?, बाज़ार जाया जाए ?), with जाया as the participle of जाना; से + negative passive for inability or unwillingness (मुझसे खाया नहीं जाता). Participle + जाना is passive, stem + जाना a compound verb"},
    {id: "transitivity", title: "Transitive and intransitive pairs: तोड़ना/टूटना, बनाना/बनना, बेचना/बिकना, धोना/धुलना, शुरू करना/शुरू होना; the passive of the transitive (बनाया जाता है) and the active intransitive (बनता है) can express similar meanings, the passive stressing the act"},
    {id: "lagna-begin", title: "Oblique infinitive + लगना “to begin to” (बारिश होने लगी), no ने, rarely negative; direct infinitive + शुरू करना “to begin to”, more deliberate, with ने (लिखना शुरू किया)"},
    {id: "dena-allow", title: "Oblique infinitive + देना “to let, allow” (मुझे जाने दो); देना takes ने and the perfective agrees with a direct object unless marked with को (गाड़ी चलाने दी, मिठाइयाँ खाने दीं)"},
    {id: "relatives-3-6", title: "Relative-correlatives: जितना … उतना “as much … as”; जैसा … वैसा “as … so” (adjectival and adverbial), with alternatives जिस तरह का … उस तरह का and जिस तरह (से) … उस तरह (से); जहाँ … वहाँ “where … there”, जहाँ भी “wherever”; जिधर … उधर “whither … thither”; the clauses can be reversed; mixed pairs (जितने लोग …, सभी …); relative clauses as parenthesis or afterthought; जो कि"}
  ]
};

writeUnit(14, unit, {forms, fake});
