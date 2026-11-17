"use strict";
// Unit 7 (book pp. 78–89): पिता जी उर्दू पढ़ाते थे. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 87–89, Quick Vocab pp. 79 and 83, and words from the grammar sections)
  "अलग":"alag","औरत":"aurat","करोड़":"karoṛ","कानपुर":"kānpur","किसी":"kisī","कोई":"koī","नज़दीक":"nazdīk","समान":"samān","खड़ा":"khaṛā",
  "ख़त्म":"khatm","ख़ास":"khās","गर्मी":"garmī","गर्मियाँ":"garmiyā̃","चतुर्थ":"caturth","चावल":"cāval","चाहिए":"cāhie","चौथा":"cauthā","छठा":"chaṭhā",
  "छुट्टी":"chuṭṭī","ज़मीन":"zamīn","ज़रूरत":"zarūrat","ज़रूरी":"zarūrī","जवाब":"javāb","जेब":"jeb","डाक्टर":"ḍākṭar","डिब्बा":"ḍibbā","तीसरा":"tīsrā",
  "तृतीय":"tṛtīy","दर्जन":"darjan","दूर":"dūr","देर":"der","द्वितीय":"dvitīy","नवाँ":"navā̃","पंचम":"pancam","पढ़ाना":"paṛhānā","पहला":"pahlā","पाँचवाँ":"pā̃cvā̃",
  "प्रथम":"pratham","फ़र्क़":"farq","बाबू":"bābū","बिजली":"bijlī","बेकार":"bekār","बैठा":"baiṭhā","महायुद्ध":"mahāyuddh","मार्च":"mārc","मुसलमान":"musalmān",
  "मोती":"motī","रंग":"rang","रोटी":"roṭī","लाख":"lākh","वजह":"vajah","शनिवार":"śanivār","शाम":"śām","शुरू":"śurū","सपना":"sapnā","कुछ":"kuch","सिनेमा":"sinemā",
  "सैकड़ा":"saikṛā","सैर":"sair","स्वर्ग":"svarg","हज़ार":"hazār","हर":"har","होटल":"hoṭal","सातवाँ":"sātvā̃","आठवाँ":"āṭhvā̃","दसवाँ":"dasvā̃","बारहवाँ":"bārahvā̃",
  // aggregatives (7.5)
  "तीनों":"tīnõ","चारों":"cārõ","दर्जनों":"darjanõ","सैकड़ों":"saikṛõ","हज़ारों":"hazārõ","लाखों":"lākhõ","करोड़ों":"karoṛõ",
  // inflected ordinals (7.4) and other forms produced by this or earlier units' rules
  "पहली":"pahlī","तीसरी":"tīsrī","चौथे":"cauthe","पाँचवीं":"pā̃cvī̃","पाँचवें":"pā̃cvẽ","बैठे":"baiṭhe",
  "गर्मियों":"garmiyõ","विद्यार्थियों":"vidyārthiyõ","मेहमानों":"mehmānõ","चप्पलों":"cappalõ",
  // imperfective participles (6.1) used in the past imperfective (7.1)
  "पढ़ाता":"paṛhātā","खाते":"khāte","खाता":"khātā","खाती":"khātī","खेलती":"kheltī","आते":"āte","डरती":"ḍartī",
  "लाती":"lātī","पढ़ती":"paṛhtī","रहती":"rahtī","तीसरे":"tīsre","उठता":"uṭhtā"
};
const fake = {
  "तीनवाँ":"tīnvā̃","चारवाँ":"cārvā̃","छहवाँ":"chahvā̃","दोओं":"doõ","बारहवा":"bārahvā","बारहों":"bārahõ","पाँचवी":"pā̃cvī","पाँचवे":"pā̃cve"
};

const AUX = "The auxiliary agrees with the participle: -tā था, -tī थी, -te थे, and -tī थीं for feminine plural.";
const NEED = "With चाहिए the thing needed is the subject, and the auxiliary agrees with it, not with the person who takes को.";

const past = [
  gap("ps:0", "मेरी दादी जी शाम को बच्चों के साथ गपशप करती ___ ।", "My[0] grandmother[1+2] {used to}[10] chat[8+9] with[6+7] the children[5] {in the evening}[3+4].", "थीं", [["थे","थे is masculine. दादी is feminine: करती थीं."], ["था","था is masculine singular. A respected woman takes the feminine plural थीं."]], "The past imperfective is the participle + था, थी, थे, थीं. Respect makes the auxiliary plural: दादी जी … करती थीं."),
  gap("ps:1", "राज बचपन में बहुत शरारत ___ था ।", "Raj[0] {used to}[6] {get up to}[5] {a lot of}[3] mischief[4] {as a child}[1+2].", "करता", [["करती","करती is feminine. Raj is a boy."], ["करते","करते is plural. Raj, spoken of plainly, is one person, as था shows."]], "The participle agrees with the subject, and था follows it."),
  gap("ps:2", "तुम पहले कहाँ काम करते ___ ?", "Where[2] {did you use to}[0+5] work[3+4] before[1]? (to a man)", "थे", [["था","था is singular. तुम always takes plural agreement: करते थे."], ["थीं","थीं is feminine plural, but the participle करते is masculine. " + AUX]], "तुम … करते थे to a man; a woman would be asked तुम … करती थीं."),
  mc("ps:3", "Put this into the past (“used to …”)", "मेरी बहिनें सुबह जल्दी उठती थीं ।", [["मेरी बहिनें सुबह जल्दी उठतीं थीं ।","Only the auxiliary carries the plural nasal: उठती थीं, just as उठती हैं. The participle is nasalized only when the auxiliary is dropped."], ["मेरी बहिनें सुबह जल्दी उठती थी ।","थी is singular. बहिनें is plural: थीं."]], "Replace हैं with थीं. The participle stays the same.", {hi: "मेरी बहिनें सुबह जल्दी उठती हैं ।", audio: true, say: "मेरी बहिनें सुबह जल्दी उठती थीं ।", en: "My[0] sisters[1] {used to}[5] {get up}[4] early[3] {in the morning}[2]."}),
  gap("ps:4", "उस गाँव में लड़कियाँ स्कूल नहीं ___ थीं ।", "In[2] that[0] village[1] girls[3] {didn't use to}[5+7] go[6] {to school}[4].", "जाती", [["जातीं","With थीं present the participle is not nasalized: जाती थीं. The nasal moves to the participle only when the auxiliary is dropped."], ["जाते","जाते is masculine. लड़कियाँ are feminine."]], "Feminine plural: -tī + थीं."),
  gap("ps:5", "मेरी माँ को संस्कृत आती ___ ।", "My[0] mother[1] {used to know}[2+4+5] Sanskrit[3].", "थी", [["थीं","The verb agrees with संस्कृत, the subject of the को construction, not with माँ. संस्कृत is singular: थी."], ["था","था is masculine. संस्कृत is feminine."]], "X को (language) आना in the past: आती थी, agreeing with the language."),
  gap("ps:6", "बचपन में हम दिन भर ___ थे ।", "{As children}[0+1] we[2] {used to}[6] play[5] {all day}[3+4].", "खेलते", [["खेलता","खेलता is singular. हम is plural: खेलते थे."], ["खेलना","खेलना is the infinitive. The tense uses the participle, stem + -tā, -tī, -te."]], "हम takes the -te participle and थे."),
  mc("ps:7", "There is no auxiliary here. What does the sentence mean?", "In the summer we would stay in the mountains.", [["In the summer we stay in the mountains.","A present statement keeps हैं, which is dropped only after नहीं. With no auxiliary at all, the verb tells of a past routine: “we would …”."], ["Last summer we stayed in the mountains.","A single past event needs the perfective, taught in Unit 11. The imperfective tells of a habit."]], "The ‘routine imperfective’: the participle alone narrates past habits, like English “would”.", {hi: "गर्मियों में हम पहाड़ों पर रहते ।", audio: true, say: "गर्मियों में हम पहाड़ों पर रहते ।", en: "{In the summer}[0+1] we[2] {would stay}[5] in[4] the mountains[3]."}),
  gap("ps:8", "पहले इस शहर में हवा साफ़ ___ थी ।", "{In the past}[0] the air[4] in[3] this[1] city[2] {used to be}[6+7] clean[5].", "होती", [["होता","होता is masculine. हवा is feminine."], ["होते","होते is masculine plural. हवा is feminine singular."]], "होता था and होती थी mean “used to be”, for lasting states in the past."),
  mc("ps:9", "Which means “My brother used to work in Delhi”?", "मेरा भाई दिल्ली में काम करता था ।", [["मेरा भाई दिल्ली में काम करता है ।","करता है is present: “works”. “Used to” needs था."], ["मेरा भाई दिल्ली में काम करते थे ।","करते थे is plural. With मेरा the brother is spoken of plainly, so करता था."]], "Participle + था gives करता था “used to do”."),
  gap("ps:10", "वे लोग चावल नहीं ___ थे ।", "Those[0] people[1] {didn't use to}[3+5] eat[4] rice[2].", "खाते", [["खाता","खाता is singular. लोग is plural."], ["खाती","खाती is feminine. लोग takes the masculine plural."]], "नहीं goes before the participle: नहीं खाते थे.")
];

const koi = [
  gap("ko:0", "दरवाज़े पर ___ है ।", "{There is}[3] someone[2] at[1] the door[0].", "कोई", [["कुछ","कुछ as a pronoun means “something”. For a person, कोई."], ["किसी","किसी is the oblique of कोई, used before a postposition. Here कोई is the subject."]], "As pronouns, कोई “someone” is for people and कुछ “something” for things."),
  gap("ko:1", "मोहन ___ नहीं जानता ।", "Mohan[0] knows[3] nothing[1+2].", "कुछ", [["कोई","कोई नहीं means “nobody”. “Nothing” is कुछ नहीं."], ["किसी","किसी is the oblique of कोई, which is for people. “Nothing” is कुछ नहीं."]], "कुछ नहीं “nothing”, कोई नहीं “nobody”; the two words may stand apart."),
  mc("ko:2", "Which means “everyone”?", "हर कोई", [["कोई न कोई","कोई न कोई means “someone or other”."], ["सब कुछ","सब कुछ means “everything”."]], "हर “each, every” + कोई “someone”."),
  gap("ko:3", "यहाँ ___ हिन्दी बोलता है ।", "Everyone[1+2] here[0] speaks[4+5] Hindi[3].", "हर कोई", [["सब कुछ","सब कुछ is “everything”, for things. For people, हर कोई."], ["कुछ न कुछ","कुछ न कुछ means “something or other”."]], "हर कोई takes a singular verb: हर कोई … बोलता है."),
  gap("ko:4", "मेरी माँ ___ जानती हैं ।", "My[0] mother[1] knows[4+5] everything[2+3].", "सब कुछ", [["हर कोई","हर कोई means “everyone”."], ["कुछ न कुछ","कुछ न कुछ means “something or other”."]], "सब कुछ “everything”."),
  gap("ko:5", "___ और दूध लाओ ।", "Bring[3] some[0] more[1] milk[2].", "कुछ", [["कोई","कोई और means “someone else”. With a substance like milk, कुछ और “some more”."], ["हर","हर means “every”, and goes with a singular countable noun."]], "कुछ और “something else, some more”."),
  gap("ko:6", "यह मेरी साइकिल नहीं है, ___ और की है ।", "This[0] isn't[3+4] my[1] bicycle[2]; it's[8] {someone else's}[5+6+7].", "किसी", [["कोई","Before the postposition की, कोई becomes the oblique किसी, as in किसी और की."], ["किस","किस is the oblique of कौन “who?”. किस की would ask “whose?”."]], "कोई और “someone else”; oblique किसी और.")
];

const kisi = [
  gap("ks:0", "मेज़ पर ___ चिट्ठी है ।", "{There is}[4] some[2] letter[3] on[1] the table[0].", "कोई", [["कुछ","With a single countable item, “some” is कोई. कुछ goes with plurals and with substances."], ["किसी","किसी is the oblique form, used before a postposition. Here the noun is direct."]], "कोई + singular noun: “some, a certain”."),
  gap("ks:1", "क्या आप ___ अच्छे डाक्टर को जानते हैं ?", "Do[7] you[1] know[5+6] a[2] good[3] doctor[4]?", "किसी", [["कोई","The noun is followed by को, so कोई becomes the oblique किसी."], ["किस","किस is the oblique of कौन. किस अच्छे डाक्टर को would mean “which good doctor?”."]], "The oblique of कोई is किसी, both as pronoun and as adjective."),
  gap("ks:2", "___ लड़कियाँ बग़ीचे में खेलती हैं ।", "Some[0] girls[1] play[4+5] in[3] the garden[2].", "कुछ", [["कोई","In the plural, कोई changes to कुछ, as in कुछ लड़कियाँ."], ["किसी","किसी is the singular oblique. The plural of कोई is कुछ."]], "कोई लड़की, but कुछ लड़कियाँ."),
  gap("ks:3", "शाम को मैं ___ विद्यार्थियों को संस्कृत पढ़ाता हूँ ।", "{In the evening}[0+1] I[2] teach[7+8] Sanskrit[6] to[5] some[3] students[4].", "कुछ", [["किसी","किसी is singular. In the plural, कोई and किसी both become कुछ, as in कुछ विद्यार्थियों को."], ["किन","किन is the plural oblique of कौन “who?”, not of कोई."]], "कुछ stays the same before a postposition: कुछ लड़कों के लिए."),
  gap("ks:4", "सीता बाज़ार से ___ दाल लाती है ।", "Sita[0] brings[5+6] some[3] daal[4] from[2] the market[1].", "कुछ", [["कोई","कोई goes with a single countable item. With a substance like daal, “some” is कुछ."], ["किसी","किसी is the oblique of कोई, and there is no postposition after दाल."]], "कुछ goes with substances, as in कुछ दूध, कुछ पैसा."),
  gap("ks:5", "यह कमरा ___ छोटा है ।", "This[0] room[1] is[4] {a bit}[2] small[3].", "कुछ", [["कोई","कोई is not used as an adverb. Before an adjective, “rather, a bit” is कुछ."], ["कई","कई means “several” and goes with plural nouns."]], "कुछ before an adjective means “rather, somewhat”."),
  gap("ks:6", "कल रात होटल में ___ सौ मेहमान थे ।", "{There were}[7] about[4] {a hundred}[5] guests[6] in[3] the hotel[2] {last night}[0+1].", "कोई", [["हर","हर means “every”. Before a number, “about” is कोई."], ["किसी","Before a number कोई means “about” and never becomes किसी."]], "कोई + number: “about, approximately”."),
  gap("ks:7", "मैं ___ दस दिन से बीमार हूँ ।", "I[0] {have been}[6] ill[5] for[4] about[1] ten[2] days[3].", "कोई", [["किसी","Before a number, कोई means “about” and stays कोई even before a postposition such as से."], ["कुछ","Before a number, “about” is कोई."]], "Compare कोई पाँच दिन में “in about five days”."),
  gap("ks:8", "आप ___ शहर में रहते हैं ?", "{Which city}[1+2] do you[0] live[4+5] in[3]? (to a man)", "किस", [["किसी","किसी शहर में means “in some city”. To ask “which?”, use किस, the oblique of कौन."], ["कौनसा","Before में, कौनसा becomes oblique: कौनसे."]], "Don't confuse किसी (oblique of कोई) with किस (oblique of कौन)."),
  gap("ks:9", "___ कमरे में एक पंखा है ।", "{There is}[5] a[3] fan[4] in[2] every[0] room[1].", "हर", [["सब","सब means “all” and goes with a plural: सब कमरों में. With a singular noun, “every” is हर."], ["कुछ","कुछ कमरे would be “some rooms”, and they would be plural and oblique: कुछ कमरों में."]], "हर “each, every” + a singular noun.")
];

const need = [
  gap("nd:0", "___ एक गरम कंबल चाहिए ।", "I[0] need[4] a[1] warm[2] blanket[3].", "मुझे", [["मैं","With चाहिए the person who needs takes को, giving मुझे (= मुझ को)."], ["मेरा","मेरा means “my”. The person who needs takes को, giving मुझे."]], "चाहिए “is needed”: the person takes को, the thing is the subject."),
  gap("nd:1", "मेहमानों को और समोसे चाहिए ___ ।", "{The guests}[0+1] needed[4+5] more[2] samosas[3].", "थे", [["था","था is singular. " + NEED + " समोसे is plural."], ["थीं","थीं is feminine. समोसा is masculine."]], "For the past, add था, थी, थे, थीं to चाहिए."),
  gap("nd:2", "राज को एक नई किताब चाहिए ___ ।", "Raj[0] needed[1+5+6] a[2] new[3] book[4].", "थी", [["था","Raj is a man, but " + NEED + " किताब is feminine: थी."], ["थीं","थीं is plural. There is one book."]], "चाहिए थी agrees with किताब."),
  gap("nd:3", "इस बच्चे को डाक्टर की ___ है ।", "This[0] child[1] needs[2+4+5+6] a doctor[3].", "ज़रूरत", [["ज़रूरी","ज़रूरी is the adjective “necessary”. “Need” is the noun ज़रूरत."], ["ज़रूर","ज़रूर means “of course, certainly”."]], "X को Y की ज़रूरत है “X needs Y”, literally “to X is a need of Y”."),
  gap("nd:4", "हमें एक बड़े कमरे ___ ज़रूरत है ।", "We[0] need[4+5+6] a[1] big[2] room[3].", "की", [["का","ज़रूरत is feminine, so it is की ज़रूरत."], ["को","Only the person takes को. The thing needed is linked by की."]], "ज़रूरत is a feminine noun: की ज़रूरत."),
  mc("nd:5", "Say the same with ज़रूरत", "मोहन को चप्पलों की ज़रूरत है ।", [["मोहन को चप्पलें की ज़रूरत है ।","Before की the noun is oblique: चप्पलों."], ["मोहन को चप्पलों का ज़रूरत है ।","ज़रूरत is feminine, so की, not का."]], "The thing needed becomes oblique before की ज़रूरत.", {hi: "मोहन को चप्पलें चाहिए ।", audio: true, say: "मोहन को चप्पलों की ज़रूरत है ।", en: "Mohan[0] needs[1+3+4+5] sandals[2]."}),
  gap("nd:6", "क्या ___ को चाय चाहिए ?", "Does anyone[1+2] want[4] tea[3]?", "किसी", [["कोई","Before को, कोई becomes the oblique किसी."], ["किस","किस को चाय चाहिए ? asks “who wants tea?”. With क्या, a yes/no question, it is किसी."]], "किसी को “to anyone”."),
  mc("nd:7", "Which means “Nobody needs this old car”?", "किसी को यह पुरानी गाड़ी नहीं चाहिए ।", [["कोई को यह पुरानी गाड़ी नहीं चाहिए ।","Before को, कोई becomes किसी."], ["कोई यह पुरानी गाड़ी नहीं चाहिए ।","The person who needs must take को, as in किसी को."]], "किसी को … नहीं चाहिए “nobody needs”.")
];

const ord = [
  gap("or:0", "मेरी बेटी ___ क्लास में पढ़ती है ।", "My[0] daughter[1] studies[5+6] in[4] the fifth[2] class[3].", "पाँचवीं", [["पाँचवाँ","पाँचवाँ is masculine. क्लास is feminine: पाँचवीं."], ["पाँचवें","पाँचवें is masculine plural or oblique. क्लास is feminine: पाँचवीं."]], "Ordinals inflect like adjectives, with nasal endings: पाँचवाँ, पाँचवीं, पाँचवें."),
  gap("or:1", "यह मेरा ___ सवाल है ।", "This[0] is[4] my[1] third[2] question[3].", "तीसरा", [["तीनवाँ","Not a word: “first” to “fourth” (and “sixth”) are irregular. “Third” is तीसरा."], ["तीसरी","तीसरी is feminine. सवाल is masculine."]], "पहला, दूसरा, तीसरा, चौथा, then पाँचवाँ, छठा, सातवाँ …"),
  gap("or:2", "यह इस साल की ___ छुट्टी है ।", "This[0] is[6] this[1] year's[2+3] first[4] holiday[5].", "पहली", [["पहला","पहला is masculine. छुट्टी is feminine."], ["पहले","पहले is masculine plural or oblique (and also the adverb “before”). छुट्टी is feminine."]], "पहला “first” agrees like an -ā adjective."),
  gap("or:3", "दादी जी अपने ___ बेटे के साथ रहती हैं ।", "Grandmother[0+1] lives[7+8] with[5+6] {her (own)}[2] fourth[3] son[4].", "चौथे", [["चौथा","Before के साथ, the ordinal is oblique like the noun: चौथे बेटे."], ["चारवाँ","Not a word: “fourth” is irregular, चौथा."]], "Ordinals take the oblique like other -ā adjectives."),
  mc("or:4", "Which word means “sixth”?", "छठा", [["छहवाँ","Not a word. छठा is irregular, like पहला to चौथा."], ["छह","छह is “six”, the cardinal number."]], "छठा “sixth”, सातवाँ “seventh”."),
  mc("or:5", "बारह means “twelve”. What is “twelfth”?", "बारहवाँ", [["बारहवा","The ending -vā̃ is nasal: बारहवाँ."], ["बारहों","The ending -õ makes an aggregative, बारहों “all twelve”."]], "From “fifth” on, add the nasal ending -vā̃ to the number."),
  gap("or:6", "___ भाई दिल्ली में रहते हैं ।", "{All three}[0] brothers[1] live[4+5] in[3] Delhi[2].", "तीनों", [["तीन","तीन is just “three”. “All three” is the aggregative तीनों."], ["तीसरे","तीसरे means “third”."]], "Aggregatives add -õ to the number: तीनों, चारों."),
  gap("or:7", "उस सिनेमा में ___ लोग थे ।", "{There were}[5] {hundreds of}[3] people[4] in[2] that[0] cinema[1].", "सैकड़ों", [["सैकड़ा","सैकड़ा is “a hundred” as a noun. “Hundreds of” is the aggregative सैकड़ों."], ["सौ","सौ is “a hundred”. “Hundreds of” is सैकड़ों."]], "Aggregatives also give multiples: दर्जनों, सैकड़ों, हज़ारों."),
  gap("or:8", "___ बच्चे बग़ीचे में खेलते हैं ।", "Both[0] children[1] play[4+5] in[3] the garden[2].", "दोनों", [["दोओं","Not a word: दोनों “both” is irregular."], ["दो","दो is just “two”. “Both” is दोनों."]], "दोनों is the irregular aggregative of दो."),
  gap("or:9", "हर साल ___ विदेशी वाराणसी आते हैं ।", "{Thousands of}[2] foreigners[3] come[5+6] to Varanasi[4] every[0] year[1].", "हज़ारों", [["हज़ार","हज़ार is “a thousand”. “Thousands of” is हज़ारों."], ["सैकड़ों","सैकड़ों means “hundreds of”."]], "हज़ार “thousand” → हज़ारों “thousands of”.")
];

const conj = [
  gap("cj:0", "डाकघर पाँच बजे बंद ___ है ।", "{The post office}[0] closes[3+4+5] {at five o'clock}[1+2].", "होता", [["करता","बंद करना needs an object: someone shuts something. Here the post office itself closes, so बंद होना."], ["होती","होती is feminine. डाकघर is masculine."]], "करना verbs are transitive; their होना partners are intransitive."),
  gap("cj:1", "मैं सात बजे काम शुरू ___ हूँ ।", "I[0] start[4+5+6] work[3] {at seven o'clock}[1+2]. (a man speaking)", "करता", [["होता","काम is the object here: I start it. That is शुरू करना."], ["करती","करती is feminine. The speaker is a man."]], "काम शुरू करना “to begin work”."),
  gap("cj:2", "सोमवार को मेरा काम जल्दी शुरू ___ है ।", "{On Mondays}[0+1] my[2] work[3] starts[5+6+7] early[4].", "होता", [["करता","Nobody is doing the starting here. काम is the subject, so शुरू होना."], ["होती","होती is feminine. काम is masculine."]], "शुरू होना “to begin” has no object."),
  gap("cj:3", "पिंकी हर शनिवार को अपनी साइकिल ___ करती है ।", "Pinki[0] cleans[6+7+8] her[4] bicycle[5] every[1] Saturday[2+3].", "साफ़", [["ख़त्म","ख़त्म करना means “to finish”."], ["शुरू","शुरू करना means “to begin”."]], "साफ़ “clean” + करना “to clean”."),
  gap("cj:4", "मोहन रात को अपना काम ___ करता है ।", "Mohan[0] finishes[5+6+7] his[3] work[4] {at night}[1+2].", "ख़त्म", [["शुरू","शुरू करना means “to begin”."], ["साफ़","साफ़ करना means “to clean”."]], "ख़त्म “finished” + करना “to finish”."),
  mc("cj:5", "Which means “My holiday ends on Friday”?", "मेरी छुट्टी शुक्रवार को ख़त्म होती है ।", [["मेरी छुट्टी शुक्रवार को ख़त्म करती है ।","करना would need someone who finishes something. The holiday itself ends: ख़त्म होना."], ["मेरी छुट्टी शुक्रवार को ख़त्म होता है ।","होता is masculine. छुट्टी is feminine."]], "The intransitive partner of ख़त्म करना is ख़त्म होना."),
  gap("cj:6", "पहले स्कूल आठ बजे शुरू ___ था ।", "School[1] {used to}[6] start[4+5] {at eight o'clock}[2+3] {in the past}[0].", "होता", [["करता","Here स्कूल is the subject and nothing is acted on, so शुरू होना."], ["होती","होती is feminine. स्कूल is masculine."]], "होता था is the past imperfective of शुरू होना.")
];

const build = [
  tiles("tl:0", "Sita[0] {used to}[4] {go for a walk}[2+3] {in the morning}[1].", ["सीता","सुबह","सैर","करती","थी"], [["करता","करता is masculine. Sita is a woman."], ["थीं","थीं is plural. Sita, spoken of plainly, is one person."]], {alt: [["सुबह","सीता","सैर","करती","थी"]]}),
  tiles("tl:1", "Raj[0] needed[1+4+5] {a new}[2] table[3].", ["राज","को","नई","मेज़","चाहिए","थी"], [["था","With चाहिए the auxiliary agrees with the thing needed, मेज़, which is feminine: थी."], ["नया","नया is masculine. मेज़ is feminine."]]),
  tiles("tl:2", "Someone[0] is[4] sitting[3] in[2] the garden[1].", ["कोई","बग़ीचे","में","बैठा","है"], [["कुछ","कुछ is “something”. For a person, कोई."], ["बैठे","बैठे is plural. कोई “someone” is singular."]], {alt: [["बग़ीचे","में","कोई","बैठा","है"]]}),
  tiles("tl:3", "Mohan[0] needs[1+3+4+5] rest[2].", ["मोहन","को","आराम","की","ज़रूरत","है"], [["का","ज़रूरत is feminine, so की ज़रूरत."], ["ज़रूरी","ज़रूरी is the adjective “necessary”. “Need” is the noun ज़रूरत."]]),
  tiles("tl:4", "{All four}[0] daughters[1] go[3+4] {to school}[2].", ["चारों","बेटियाँ","स्कूल","जाती","हैं"], [["चार","चार बेटियाँ is just “four daughters”. “All four” is the aggregative चारों."], ["जाते","जाते is masculine. बेटियाँ is feminine."]]),
  tiles("tl:5", "My[0] first[1] teacher[2] was[4] {a Muslim}[3].", ["मेरे","पहले","अध्यापक","मुसलमान","थे"], [["पहली","पहली is feminine. अध्यापक is masculine."], ["थी","थी is feminine. A respected teacher takes the masculine plural थे."]], {order: "मेरे अध्यापक पहले मुसलमान थे would mean “My teacher was formerly a Muslim”, with पहले as the adverb “before”. As “first”, पहले goes before the noun."}),
  tiles("tl:6", "That[0] shop[1] closes[4+5+6] {at seven o'clock}[2+3].", ["वह","दुकान","सात","बजे","बंद","होती","है"], [["करती","बंद करना needs an object. The shop itself closes: बंद होना."], ["होता","होता is masculine. दुकान is feminine."]], {alt: [["सात","बजे","वह","दुकान","बंद","होती","है"]]}),
  tiles("tl:7", "{The children}[0] {used to}[4] {get up}[3] early[2] {in the morning}[1].", ["बच्चे","सुबह","जल्दी","उठते","थे"], [["उठता","उठता is singular. बच्चे is plural."], ["था","था is singular. बच्चे is plural: उठते थे."]], {alt: [["सुबह","बच्चे","जल्दी","उठते","थे"]]}),
  tiles("tl:8", "These[0] shoes[1] are[4] {a bit}[2] big[3].", ["ये","जूते","कुछ","बड़े","हैं"], [["बड़ा","बड़ा is singular. जूते is plural."], ["कई","कई means “several” and goes before a plural noun. Before an adjective, “a bit” is कुछ."]]),
  tiles("tl:9", "Sita[0] needs[1+4] {a new}[2] sari[3].", ["सीता","को","नई","साड़ी","चाहिए"], [["नया","नया is masculine. साड़ी is feminine."], ["का","The person who needs takes को, not का, so it is सीता को."]]),
  tiles("tl:10", "{Lakhs of}[3] people[4] live[5+6] in[2] this[0] city[1].", ["इस","शहर","में","लाखों","लोग","रहते","हैं"], [["लाख","लाख is “a lakh, a hundred thousand”. “Lakhs of” is the aggregative लाखों."], ["रहता","रहता is singular. लोग is plural."]], {alt: [["लाखों","लोग","इस","शहर","में","रहते","हैं"]]}),
  tiles("tl:11", "Mohan[0] {used to know}[1+3+4] Gujarati[2].", ["मोहन","को","गुजराती","आती","थी"], [["आता","The verb agrees with गुजराती, which is feminine: आती."], ["थे","The verb agrees with गुजराती, which is singular: थी."]])
];

const mean = [
  meaning("mn:0", "बचपन में मैं रात को बहुत डरती थी ।", "As a child I used to be very frightened at night.", [["As a child I was frightened one night.","A single event would need the perfective. डरती थी is a habit: “used to be frightened”."], ["I am very frightened at night.","थी puts it in the past, and बचपन में means “in childhood”."]]),
  meaning("mn:1", "शाम को घर में हमेशा कोई न कोई होता है ।", "There is always someone or other at home in the evening.", [["There is nobody at home in the evening.","“Nobody” would be कोई नहीं."], ["Everyone is at home in the evening.","“Everyone” would be हर कोई."]]),
  meaning("mn:2", "आज मौसम कुछ ठंडा है ।", "The weather is rather cold today.", [["The weather is very cold today.","“Very” would be बहुत. कुछ before an adjective is “rather, a bit”."], ["Some weather is cold today.","कुछ before an adjective is an adverb: “rather”."]]),
  meaning("mn:3", "उसे कुछ और चाहिए था ।", "He needed something else.", [["He needed nothing else.","“Nothing” would be कुछ नहीं."], ["Someone else needed it.","“Someone else” would be कोई और. उसे is the person who needed."]]),
  meaning("mn:4", "स्टेशन पर कोई पाँच विद्यार्थी बैठे थे ।", "About five students were sitting at the station.", [["Five students were sitting at the station.","Before a number, कोई means “about”."], ["Some student was sitting at the station for five hours.","कोई before a number means “about”, and बैठे थे is plural."]]),
  meaning("mn:5", "मेरी तीसरी बहिन डाक्टर है ।", "My third sister is a doctor.", [["My three sisters are doctors.","तीसरी is the ordinal “third”, and है is singular."], ["All three of my sisters are doctors.","“All three” would be the aggregative तीनों."]]),
  meaning("mn:6", "दफ़्तर में हज़ारों चिट्ठियाँ आती थीं ।", "Thousands of letters used to come to the office.", [["A thousand letters came to the office.","हज़ारों is “thousands of”, and आती थीं is a habit: “used to come”."], ["Thousands of letters come to the office.","थीं puts it in the past: “used to come”."]]),
  meaning("mn:7", "मेरे भाई को नए जूते चाहिए थे ।", "My brother needed new shoes.", [["My brother had new shoes.","चाहिए means “is needed”. Having is not expressed this way."], ["My brother needs new shoes.","थे puts it in the past: “needed”."]])
];

const usage = [
  mc("ru:0", "Can the past imperfective translate “Yesterday I went to the market”?", "No: a one-off past event needs the perfective, taught in Unit 11", [["Yes: it covers every past action","It always means “used to …”: habits and regular events."], ["Yes, as long as कल is added","कल does not change the meaning of the tense. A single event needs the perfective."]], "The past imperfective always has the sense “used to …”."),
  mc("ru:1", "Which word is the grammatical subject of राज को नया थैला चाहिए ?", "थैला", [["राज","A word followed by को is never the subject. Raj is the one who needs."], ["चाहिए","चाहिए is the verb, “is needed”."]], "The thing needed is the subject; that is why चाहिए था or थी agrees with it."),
  mc("ru:2", "What is the difference between किसी and किस ?", "किसी is the oblique of कोई “some(one)”; किस is the oblique of कौन “who?”", [["Both are obliques of कौन “who?”","Only किस is. किसी is the oblique of कोई, so किसी को is “to someone” and किस को “to whom?”."], ["किसी is singular and किस is plural","Both are singular. The plural obliques are कुछ (for कोई) and किन (for कौन)."]], "किसी शहर में “in some city”, किस शहर में ? “in which city?”."),
  mc("ru:3", "When does कोई stay कोई before a postposition?", "When it means “about” before a number", [["When it refers to a thing","As an adjective it becomes किसी before a postposition, whatever the noun: किसी दुकान में."], ["Never: it always becomes किसी","Before a number it stays कोई, as in कोई दस दिन से."]], "कोई दस दिन से “for about ten days”."),
  mc("ru:4", "What do कोई and किसी become in the plural?", "कुछ, in both the direct and the oblique", [["किसी in the direct, कोई in the oblique","Both become कुछ, as in कुछ लड़के, कुछ लड़कों के लिए."], ["They stay कोई and किसी","कोई and किसी are singular. With plurals it is कुछ."]], "कई “several” is another plural partner of कोई."),
  mc("ru:5", "Why is it बंद होती है in दुकान बंद होती है ?", "The shop is the subject and nothing is acted on, so the intransitive होना is used", [["Because दुकान is feminine","Gender decides होती against होता, not होना against करना."], ["Because होती है describes a habit","Habits use the imperfective with both verbs: मोहन दुकान बंद करता है is also a habit."]], "करना verbs take an object (मोहन दुकान बंद करता है), but होना verbs do not."),
  mc("ru:6", "How do ordinals such as पाँचवाँ agree?", "Like -ā adjectives, with nasal endings: पाँचवीं, पाँचवें", [["They always stay पाँचवाँ","They agree with the noun: पाँचवीं क्लास, पाँचवें दिन."], ["Like -ā adjectives, without the nasal: पाँचवी, पाँचवे","The nasal stays in every form: पाँचवाँ, पाँचवीं, पाँचवें."]], "पहला, दूसरा, तीसरा, चौथा and छठा agree like ordinary -ā adjectives.")
];

const unit = {
  id: "unit7", n: 7, title: "Father used to teach Urdu", titleHi: "पिता जी उर्दू पढ़ाते थे",
  scope: "The past imperfective (बोलता था, बोलती थीं) and the routine imperfective; कोई and कुछ as pronouns, adjectives and adverbs, oblique किसी, कोई + number, phrases (हर कोई, सब कुछ, कोई न कोई, कुछ और); चाहिए “is needed” with को and its past; की ज़रूरत है; ordinal numbers (पहला … दसवाँ, -वाँ); aggregatives (दोनों, तीनों, सैकड़ों); conjunct verbs with करना and होना (शुरू करना/होना, बंद करना/होना)",
  pages: "book 78–89",
  skills: {past: "Past imperfective", koi: "कोई and कुछ as pronouns", kisi: "कोई, कुछ and किसी with nouns", need: "चाहिए and ज़रूरत", ord: "Ordinals and aggregatives", conj: "Conjunct verbs", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अलग","separate, different","a"],["औरत","woman","n","f"],["करोड़","ten million (crore)","n","m"],["कानपुर","Kanpur","n","m"],["किसी","oblique of कोई","p"],
    ["कुछ","some; somewhat; something","p"],["कुछ और","something else, some more","x"],["कुछ न कुछ","something or other","x"],["कुछ नहीं","nothing","x"],
    ["के नज़दीक","near, close to","x"],["के समान","like, equal to","x"],["कोई","anyone, someone; some, a; about","p"],["कोई और","someone else","x"],["और कोई","any other","x"],
    ["कोई न कोई","someone or other","x"],["कोई नहीं","no one, nobody","x"],["कौन कौन","which various people?","p"],["खड़ा","standing, waiting","a"],
    ["ख़त्म","finished","a"],["ख़त्म करना","to finish","v"],["ख़त्म होना","to end, be finished","v"],["ख़ास","special, particular","a"],["गर्मी","heat; summer","n","f"],
    ["गर्मियाँ","the hot season (plural)","n","f"],["चतुर्थ","fourth (formal), IVth","a"],["चावल","rice","n","m"],["चाहिए","(is) needed, wanted","x"],["चौथा","fourth","a"],
    ["छठा","sixth","a"],["छुट्टी","holiday; free time","n","f"],["ज़मीन","ground; land","n","f"],["ज़रूरत","need","n","f"],["ज़रूरी","urgent, necessary","a"],
    ["जवाब देना","to reply","v"],["जी","yes (polite)","x"],["जेब","pocket","n","f"],["ठीक से","properly; exactly","x"],["डाक्टर","doctor","n","m"],
    ["डिब्बा","box; railway compartment","n","m"],["तरफ़","side, direction","n","f"],["तीसरा","third","a"],["तृतीय","third (formal), IIIrd","a"],["दर्जन","a dozen","n","f"],
    ["दूर","distant, far, away","a"],["दूसरा","second","a"],["देर","delay, a while","n","f"],["द्वितीय","second (formal), IInd","a"],["नवाँ","ninth","a"],
    ["पंचम","fifth (formal), Vth","a"],["पढ़ाना","to teach","v"],["पहला","first","a"],["पाँचवाँ","fifth","a"],["प्रथम","first (formal), Ist","a"],
    ["फ़र्क़","difference, separation","n","m"],["बाद में","later on","x"],["बाबू","clerk","n","m"],["बिजली","electricity","n","f"],["बेकार","useless","a"],
    ["बैठा","seated, sitting","a"],["महायुद्ध","great war","n","m"],["मार्च","March","n","m"],["मुसलमान","Muslim","n","m"],["मोती","pearl","n","m"],["रंग","colour","n","m"],
    ["रोटी","bread; food","n","f"],["लाख","hundred thousand (lakh)","n","m"],["वजह","reason, cause","n","f"],["शनिवार","Saturday","n","m"],["शाम","evening","n","f"],
    ["शुरू करना","to begin, start (something)","v"],["शुरू होना","to begin, get started","v"],["सपना","dream","n","m"],["सपना देखना","to dream","v"],["सब कुछ","everything","x"],
    ["सिनेमा","cinema","n","m"],["सैकड़ा","a hundred (as a group)","n","m"],["सैर","walk, trip","n","f"],["सैर करना","to go for a walk, trip","v"],["स्वर्ग","heaven","n","m"],
    ["हज़ार","thousand","n","m"],["हर","each, every","a"],["हर कोई","everyone","p"],["होटल","hotel; café","n","m"],
    ["सातवाँ","seventh","a"],["आठवाँ","eighth","a"],["दसवाँ","tenth","a"],["बारहवाँ","twelfth","a"],
    ["तीनों","all three","x"],["चारों","all four","x"],["दर्जनों","dozens of","x"],["सैकड़ों","hundreds of","x"],["हज़ारों","thousands of","x"],["लाखों","lakhs of","x"],["करोड़ों","crores of","x"],
    ["बंद करना","to shut (something)","v"],["बंद होना","to close, be shut","v"],["साफ़ करना","to clean","v"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "past", title: "बोलता था, बोलती थी", desc: "The past imperfective: “used to …”", skill: "past", items: past},
    {id: "koi", title: "कोई, कुछ", desc: "Someone, something, everyone, everything", skill: "koi", items: koi},
    {id: "kisi", title: "किसी, कुछ, हर", desc: "Some, about, rather; the oblique किसी", skill: "kisi", items: kisi},
    {id: "need", title: "चाहिए", desc: "Needs and wants; की ज़रूरत है", skill: "need", items: need},
    {id: "ord", title: "पहला, दूसरा, तीनों", desc: "Ordinals and aggregatives", skill: "ord", items: ord},
    {id: "conj", title: "शुरू करना, शुरू होना", desc: "Conjunct verbs with करना and होना", skill: "conj", items: conj},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Tenses, कोई and किसी, चाहिए", skill: "usage", items: usage}
  ],
  test: {vocab: 4, past: 3, koi: 2, kisi: 2, need: 2, ord: 2, conj: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "past-imperfective", title: "Past imperfective: participle + था, थी, थे, थीं, “used to …” for habits and regular events in the past (राज बहुत शरारत करता था)"},
    {id: "routine-imperfective", title: "Routine imperfective: the participle with no auxiliary narrates past habits, like English “would” (गर्मियों में हम पहाड़ों पर रहते)"},
    {id: "koi-kuch-pronoun", title: "कोई “someone” (people) and कुछ “something” (things) as pronouns; कोई नहीं “nobody”, कुछ नहीं “nothing”"},
    {id: "koi-kuch-adjective", title: "कोई “some, a” with a singular countable noun, oblique किसी; plural कुछ (direct and oblique); कई “several”; कुछ with substances (कुछ दाल); कुछ as an adverb “rather” (कुछ छोटा)"},
    {id: "koi-number", title: "कोई before a number means “about”, and does not become किसी (कोई दस दिन से)"},
    {id: "koi-kuch-phrases", title: "हर कोई, कोई न कोई, कोई और / और कोई, सब कुछ, कुछ न कुछ, कुछ और / और कुछ; किसी (oblique of कोई) against किस (oblique of कौन)"},
    {id: "chahie", title: "चाहिए “is needed”: the thing needed is the subject, the person takes को; past चाहिए था/थी/थे/थीं agreeing with the thing; some speakers say चाहिएँ in the plural"},
    {id: "zarurat", title: "X को Y की ज़रूरत है “X needs Y” (ज़रूरत f)"},
    {id: "ordinals", title: "Ordinals पहला, दूसरा, तीसरा, चौथा, पाँचवाँ, छठा, then number + -वाँ; they inflect like adjectives with nasal endings (-वीं, -वें); Sanskrit ordinals प्रथम, द्वितीय … in formal use"},
    {id: "aggregatives", title: "Aggregatives: number + -ओं “all N” (तीनों, चारों; दोनों irregular); multiples दर्जनों, सैकड़ों, हज़ारों, लाखों, करोड़ों"},
    {id: "conjunct-verbs", title: "Conjunct verbs: noun/adjective + करना (transitive: मोहन दुकान बंद करता है) with intransitive partners in होना (दुकान बंद होती है); बंद, साफ़, ख़त्म करना"}
  ]
};

writeUnit(7, unit, {forms, fake});
