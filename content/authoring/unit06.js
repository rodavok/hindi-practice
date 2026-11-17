"use strict";
// Unit 6 (book pp. 64–77): प्रताप क्या करता है ? Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 74–76, Quick Vocab pp. 65 and 69, and words from the grammar sections)
  "अकेलापन":"akelāpan","अक्सर":"aksar","अपना":"apnā","इक्कीस":"ikkīs","उच्चारण":"uccāraṇ","प्रोनंसियेशन":"pronansiyeśan","उठना":"uṭhnā","उन्नीस":"unnīs",
  "कंपनी":"kampanī","कभी":"kabhī","तरफ़":"taraf","तरह":"tarah","अंदर":"andar","आगे":"āge","ऊपर":"ūpar","नीचे":"nīce","पास":"pās","पीछे":"pīche",
  "बाद":"bād","बारे":"bāre","यहाँ":"yahā̃","लिए":"lie","साथ":"sāth","सामने":"sāmne","रखना":"rakhnā","ख़ूब":"khūb","गपशप":"gapśap","गोश्त":"gośt",
  "चाँद":"cā̃d","चुप":"cup","छोड़ना":"choṛnā","जानना":"jānnā","टुकड़ा":"ṭukṛā","डरना":"ḍarnā","डाकघर":"ḍākghar","तेरा":"terā","थोड़ा":"thoṛā",
  "दिन":"din","भर":"bhar","देवनागरी":"devnāgarī","नफ़रत":"nafrat","नापसंद":"nāpasand","प्यार":"pyār","फिर":"phir","बचपन":"bacpan","बजे":"baje",
  "बधाई":"badhāī","बाप":"bāp","बारह":"bārah","मन":"man","महसूस":"mahsūs","मालिक":"mālik","मुन्ना":"munnā","मुश्किल":"muśkil","मेहमान":"mehmān",
  "लंबाई":"lambāī","लखनऊ":"lakhnaū","लिपि":"lipi","वाह":"vāh","विदेशी":"videśī","वैसे":"vaise","व्यंग्य":"vyangya","शराब":"śarāb","शरारत":"śarārat",
  "शुक्रवार":"śukravār","शुद्ध":"śuddh","संस्कृत":"sanskṛt","सहेली":"sahelī","साड़ी":"sāṛī","सीखना":"sīkhnā","सोचना":"socnā","स्टेशन":"sṭeśan",
  "हँसना":"hãsnā","हँसाना":"hãsānā","हमारा":"hamārā","हमेशा":"hameśā","होनहार":"honhār","स्कूल":"skūl","ऐसा":"aisā","रहना":"rahnā","खेलना":"khelnā",
  "समझना":"samajhnā","इसका":"iskā","किनका":"kinkā","भाषा":"bhāṣā","उर्दू":"urdū","सात":"sāt","आठ":"āṭh","कितने":"kitne",
  // possessive pronouns (6.2), अपना (6.3) and forms produced by earlier rules
  "तेरी":"terī","तेरे":"tere","इसकी":"iskī","इसके":"iske","हमारी":"hamārī","हमारे":"hamāre","इनके":"inke","उनकी":"unkī",
  "अपनी":"apnī","अपने":"apne","सहेलियाँ":"saheliyā̃","पहाड़ों":"pahāṛõ","गाँवों":"gā̃võ","कुत्तों":"kuttõ","रखो":"rakho",
  // imperfective participles (6.1)
  "करता":"kartā","करती":"kartī","करते":"karte","करतीं":"kartī̃","पीता":"pītā","पीती":"pītī","पीते":"pīte","पढ़ते":"paṛhte",
  "बोलता":"boltā","बोलती":"boltī","पढ़ता":"paṛhtā","बोलते":"bolte","बोलतीं":"boltī̃","उठती":"uṭhtī","उठते":"uṭhte","उठतीं":"uṭhtī̃","जानता":"jāntā","जानती":"jāntī","जानते":"jānte",
  "हँसती":"hãstī","हँसते":"hãste","हँसतीं":"hãstī̃","हँसता":"hãstā","हँसाती":"hãsātī","सीखता":"sīkhtā","सीखती":"sīkhtī","सीखतीं":"sīkhtī̃","सीखते":"sīkhte",
  "खेलता":"kheltā","खेलते":"khelte","सोता":"sotā","सोती":"sotī","सोते":"sote","जाता":"jātā","जाती":"jātī","जातीं":"jātī̃","जाते":"jāte","लाते":"lāte",
  "समझती":"samajhtī","समझतीं":"samajhtī̃","आता":"ātā","आती":"ātī","कहता":"kahtā","कहते":"kahte","होता":"hotā","होती":"hotī","होते":"hote",
  "धोता":"dhotā","डरता":"ḍartā","सोचता":"soctā","बैठता":"baiṭhtā","रहता":"rahtā","रहते":"rahte","चलता":"caltā"
};
const fake = {"हँसतें":"hãstẽ","सालों":"sālõ"};

const NASAL = "The nasal -tī̃ appears only when हैं is dropped after नहीं. With हैं present, the feminine participle is -tī.";

const pres = [
  gap("pr:0", "मेरी बहिन लंदन में काम ___ है ।", "My[0] sister[1] works[4+5+6] in[3] London[2].", "करती", [["करता","करता is masculine. बहिन is feminine, so the participle is करती."], ["करतीं",NASAL]], "The participle agrees with the subject: masculine -tā, feminine -tī."),
  gap("pr:1", "मैं सुबह चाय ___ हूँ ।", "I[0] drink[3+4] tea[2] {in the morning}[1]. (a man speaking)", "पीता", [["पीती","पीती is feminine. The speaker is a man."], ["पीते","-te is masculine plural, for हम, तुम, आप and plural subjects. मैं takes -tā."]], "मैं पीता हूँ for a man, मैं पीती हूँ for a woman."),
  gap("pr:2", "तुम रात को क्या पढ़ते ___ ?", "What[3] do[5] you[0] read[4] {at night}[1+2]?", "हो", [["हैं","हैं goes with हम, आप, ये, वे and plural nouns. तुम takes हो."], ["है","है goes with तू, यह and वह. तुम takes हो."]], "The participle is followed by the present of होना, as in तुम पढ़ते हो."),
  gap("pr:3", "हम घर पर पंजाबी ___ हैं ।", "We[0] speak[4+5] Panjabi[3] {at home}[1+2].", "बोलते", [["बोलता","बोलता is singular. हम is plural, so the masculine participle is बोलते."], ["बोलना","बोलना is the infinitive. The tense uses the participle, stem + -tā, -tī, -te."]], "हम takes the -te participle and हैं (a group of women would say बोलती हैं)."),
  gap("pr:4", "माँ जी सुबह जल्दी ___ हैं ।", "Mother[0] {gets up}[4+5] early[3] {in the morning}[2].", "उठती", [["उठते","उठते is masculine. Respect makes the verb plural, but माँ is feminine: उठती हैं."], ["उठतीं",NASAL]], "A respected woman takes the feminine participle with हैं."),
  gap("pr:5", "मोहन जी हिन्दी और संस्कृत ___ हैं ।", "{Mohan ji}[0+1] knows[5+6] Hindi[2] and[3] Sanskrit[4].", "जानते", [["जानता","जानता is for one man spoken of plainly. जी shows respect, so the verb is plural: जानते हैं."], ["जानती","जानती is feminine. Mohan is a man."]], "Respect takes plural agreement, as with है and हैं in unit 1."),
  gap("pr:6", "वे लड़कियाँ बहुत ___ हैं ।", "Those[0] girls[1] laugh[3+4] {a lot}[2].", "हँसती", [["हँसते","हँसते is masculine. लड़कियाँ are feminine."], ["हँसतीं",NASAL]], "Feminine plural: -tī with हैं."),
  mc("pr:7", "Change the subject to मेरी बहिनें", "मेरी बहिनें संस्कृत सीखती हैं ।", [["मेरी बहिनें संस्कृत सीखतीं हैं ।",NASAL], ["मेरी बहिनें संस्कृत सीखते हैं ।","सीखते is masculine. बहिनें are feminine."]], "Feminine plural: the participle is सीखती and the auxiliary हैं.", {hi: "मेरा भाई संस्कृत सीखता है ।", audio: true, say: "मेरी बहिनें संस्कृत सीखती हैं ।", en: "My[0] sisters[1] learn[3+4] Sanskrit[2]."}),
  gap("pr:8", "बच्चे बग़ीचे में ___ हैं ।", "{The children}[0] play[3+4] in[2] the garden[1].", "खेलते", [["खेलता","खेलता is singular. बच्चे is plural."], ["खेलना","खेलना is the infinitive. A statement uses the participle."]], "Masculine plural: -te with हैं."),
  gap("pr:9", "आप किस दफ़्तर में काम ___ हैं ?", "{Which office}[1+2] do[6] you[0] work[4+5] in[3]? (to a man)", "करते", [["करता","करता is singular. आप always takes plural agreement."], ["करो","करो is the तुम command, not a statement."]], "आप takes -te (or -tī for a woman) with हैं."),
  gap("pr:10", "मैं बहुत कम ___ हूँ ।", "I[0] sleep[3+4] {very little}[1+2]. (a woman speaking)", "सोती", [["सोता","सोता is masculine. The speaker is a woman."], ["सोना","सोना is the infinitive (and also the noun “gold”). The tense uses the participle."]], "सोना “to sleep”: stem so-, participle सोता, सोती, सोते.")
];

const neg = [
  gap("ng:0", "मोहन दफ़्तर नहीं ___ ।", "Mohan[0] doesn't[2] go[3] {to the office}[1].", "जाता", [["जाते","जाते is plural. Mohan, spoken of plainly, is one person."], ["जातीं","जातीं is the feminine plural form used when हैं is dropped. Mohan is a man."]], "In a negative sentence the auxiliary can be dropped: मोहन दफ़्तर नहीं जाता ।"),
  gap("ng:1", "मेरी बेटियाँ स्कूल नहीं ___ ।", "My[0] daughters[1] don't[3] go[4] {to school}[2].", "जातीं", [["जाती","With हैं dropped, the feminine plural participle takes over its nasal: जातीं."], ["जाते","जाते is masculine. बेटियाँ are feminine."]], "Without the auxiliary, a feminine plural participle is nasalized to make up for the lost हैं."),
  mc("ng:2", "Make this sentence negative", "सीता शुक्रवार को बाज़ार नहीं जाती ।", [["सीता शुक्रवार को बाज़ार नहीं जातीं ।","जातीं is for feminine plural subjects. सीता is one person."], ["सीता शुक्रवार को बाज़ार मत जाती ।","मत is only for commands. Statements are made negative with नहीं."]], "नहीं goes before the verb, and है can be dropped.", {hi: "सीता शुक्रवार को बाज़ार जाती है ।", audio: true, say: "सीता शुक्रवार को बाज़ार नहीं जाती ।", en: "Sita[0] doesn't[4] go[5] {to the market}[3] {on Fridays}[1+2]."}),
  mc("ng:3", "Why does बोलतीं have a nasal here?", "हैं has been dropped, and the feminine plural participle takes its nasal", [["Every participle after नहीं is nasalized","Only the feminine plural one is. The masculine plural stays बोलते, वे नहीं बोलते."], ["लड़कियाँ ends in a nasal, so the verb copies it","The nasal makes up for the dropped हैं. It has nothing to do with the noun's ending."]], "With हैं it is बोलती हैं, and without it नहीं बोलतीं.", {hi: "ये लड़कियाँ पंजाबी नहीं बोलतीं ।", audio: true, say: "ये लड़कियाँ पंजाबी नहीं बोलतीं ।", en: "These[0] girls[1] don't[3] speak[4] Panjabi[2]."}),
  gap("ng:4", "ये लड़के क्लास में कभी नहीं ___ ।", "These[0] boys[1] never[4+5] laugh[6] in[3] class[2].", "हँसते", [["हँसतें","Not a word: only the feminine plural participle takes a nasal when हैं is dropped."], ["हँसता","हँसता is singular. लड़के is plural."]], "कभी नहीं “never”; the masculine plural stays हँसते without हैं."),
  gap("ng:5", "पापा ___ समोसे लाते हैं ।", "Papa[0] sometimes[1+2] brings[4+5] samosas[3].", "कभी कभी", [["कभी नहीं","कभी नहीं means “never”."], ["हमेशा","हमेशा means “always”."]], "कभी कभी “sometimes”, कभी नहीं “never”."),
  mc("ng:6", "Make this sentence negative", "मेरी सहेलियाँ उर्दू नहीं समझतीं ।", [["मेरी सहेलियाँ उर्दू नहीं समझती ।","With हैं dropped, the feminine plural participle must carry the nasal: समझतीं."], ["मेरी सहेलियाँ उर्दू मत समझतीं ।","मत is only for commands. Statements are made negative with नहीं."]], "Feminine plural without हैं gives नहीं समझतीं.", {hi: "मेरी सहेलियाँ उर्दू समझती हैं ।", audio: true, say: "मेरी सहेलियाँ उर्दू नहीं समझतीं ।", en: "My[0] friends[1] don't[3] understand[4] Urdu[2]. (a girl speaking)"})
];

const uses = [
  gap("uz:0", "मेरी पत्नी को गुजराती ___ है ।", "My[0] wife[1] knows[2+4+5] Gujarati[3].", "आती", [["आता","The verb agrees with the language, गुजराती, which is feminine."], ["जानती","जानना needs the knower as subject (मेरी पत्नी गुजराती जानती है). With को the verb is आना."]], "Knowing a language: X को (language) आना, literally “Gujarati comes to my wife”."),
  gap("uz:1", "___ हिन्दी बिलकुल नहीं आती ।", "He[0] doesn't[3] know[4] Hindi[1] {at all}[2].", "उसे", [["वह","With आना the person who knows takes को, giving उस को or उसे."], ["उसका","उसका means “his”. The knower takes को."]], "उसे (= उस को) … आती. Hindi “comes to” him."),
  gap("uz:2", "लोग उसे शैतान ___ हैं ।", "People[0] call[3+4] him[1] a devil[2].", "कहते", [["कहता","कहता is singular. लोग is plural."], ["बोलते","बोलना is “to speak”. To call someone something is कहना."]], "X को Y कहना “to call X Y”; X को क्या कहते हैं ? asks what X is called."),
  gap("uz:3", "पहाड़ों पर हवा ठंडी ___ है ।", "{In the mountains}[0+1] the air[2] is[4+5] cold[3].", "होती", [["होता","होता is masculine. हवा is feminine."], ["होते","होते is masculine plural. हवा is feminine singular."]], "होता है states what is generally true; है alone describes one particular case."),
  mc("uz:4", "Which means “I know that the shop is closed today”?", "मुझे मालूम है कि आज दुकान बंद है ।", [["मालूम होता है कि आज दुकान बंद है ।","मालूम होता है means “it seems”."], ["मैं मालूम हूँ कि आज दुकान बंद है ।","मालूम takes the को construction: मुझे मालूम है."]], "मुझे मालूम है “I know”; मालूम होता है “it seems”."),
  gap("uz:5", "मोहन और सीता हिन्दी ___ हैं ।", "Mohan[0] and[1] Sita[2] learn[4+5] Hindi[3].", "सीखते", [["सीखती","When the subjects are people of both sexes the verb is masculine plural. The nearest-word rule is only for things."], ["सीखता","सीखता is singular. There are two people."]], "A man and a woman together take the masculine plural."),
  gap("uz:6", "इस दुकान में कुरसियाँ और पलंग ___ हैं ।", "In[2] this[0] shop[1] the chairs[3] and[4] beds[5] are[7] old[6].", "पुराने", [["पुरानी","For things of mixed gender, agreement follows the nearest one: पलंग, masculine plural."], ["पुराना","पुराना is singular. There are several things."]], "With things, the gender of the nearest item decides; the verb follows the same rule."),
  gap("uz:7", "बस कितने ___ आती है ?", "{What time}[1+2] does[4] the bus[0] come[3]?", "बजे", [["साल","साल means “year”. Clock time is बजे."], ["दिन","दिन means “day”. Clock time is बजे."]], "कितने बजे ? “at what time?”; सात बजे “at seven o'clock”."),
  mc("uz:8", "Someone about to leave says “अच्छा, मैं चलता हूँ ।”. What does it mean?", "Well, I'm off.", [["I walk well.","अच्छा at the start is “well then”, not “proficiently”."], ["I often go for walks.","The imperfective is usually habitual, but here it is an idiom for leaving now."]], "The imperfective is used idiomatically for something about to happen: मैं चलता हूँ “I'm off”."),
  gap("uz:9", "मेरा बेटा दस साल ___ है ।", "My[0] son[1] is[5] ten[2] years[3] old[4].", "का", [["की","की is feminine. का agrees with the subject, बेटा."], ["के","के would be for a plural or respected subject. बेटा is one boy."]], "In X साल का “X years old”, का agrees with the person."),
  mc("uz:10", "In मेरा बेटा दस साल का है, why is साल not in the oblique plural?", "The ten years make one block of time, not separate years", [["The word for “year” has no plural","It does: सालों is its oblique plural, used when years are counted one by one."], ["The postposition after it does not make it oblique","It does: का is a postposition. Here the years are taken as a single block."]], "The same idea gives दस दिन में “in ten days”.")
];

const poss = [
  gap("po:0", "क्या यह ___ किताब है ?", "Is[4] this[1] your[2] book[3]? (to तू)", "तेरी", [["तेरा","तेरा is masculine. किताब is feminine."], ["तुम्हारी","तुम्हारी goes with तुम. With तू the possessive is तेरा."]], "तू gives तेरा, तेरी, तेरे."),
  gap("po:1", "___ बच्चे बहुत होशियार हैं ।", "Her[0] children[1] are[4] very[2] clever[3]. (a woman nearby)", "इसके", [["इसकी","The possessive agrees with the thing possessed, बच्चे, not with the owner. Her being a woman makes no difference."], ["इसका","इसका is singular. बच्चे is plural."]], "इसका “his, her (of this one)” agrees like an -ā adjective."),
  mc("po:2", "Which asks “whose?” about several owners?", "किनका", [["किसका","किसका asks about a single owner."], ["कौनसा","कौनसा means “which?”."]], "किन is the plural oblique of कौन, so किन + का."),
  gap("po:3", "___ कमरे में दो खिड़कियाँ हैं ।", "{There are}[5] two[3] windows[4] in[2] our[0] room[1].", "हमारे", [["हमारा","कमरे is oblique before में, so हमारा becomes हमारे too."], ["हमारी","हमारी is feminine. कमरा is masculine."]], "A possessive agrees with its noun in case as well: हमारे कमरे में."),
  mc("po:4", "Which means “This bicycle is mine”?", "यह साइकिल मेरी है ।", [["यह मेरी साइकिल है ।","This means “This is my bicycle”. Before the noun the possessive just describes it."], ["यह साइकिल मेरा है ।","मेरा is masculine. साइकिल is feminine."]], "After the noun, the possessive is what the sentence says about it: “is mine”."),
  gap("po:5", "___ दादी जी बहुत बूढ़ी हैं ।", "Our[0] grandmother[1] is[5] very[3] old[4].", "हमारी", [["हमारे","Respect makes a masculine possessive plural (हमारे पिता जी), but a feminine one stays हमारी."], ["हमारा","हमारा is masculine. दादी is feminine."]], "हमारा “our” agrees with दादी."),
  gap("po:6", "प्रकाश जी यहाँ हैं, यह ___ बेटा है ।", "{Prakash ji}[0+1] is[3] here[2]; this[4] is[7] his[5] son[6].", "इनका", [["इसका","इसका is for someone spoken of plainly. प्रकाश जी is respected, so the plural इनका."], ["इनके","इनके is plural or oblique. बेटा is singular and direct."]], "A respected person is referred to in the plural: इनका, उनका.")
];

const OWN = "When the owner is the subject of the clause, Hindi uses अपना instead.";
const apna = [
  gap("ap:0", "सीता ___ भाई के साथ बाज़ार जाती है ।", "Sita[0] goes[6+7] {to the market}[5] with[3+4] {her (own)}[1] brother[2].", "अपने", [["उसके","उसके would mean someone else's brother. " + OWN], ["अपनी","अपना agrees with भाई, which is masculine and oblique before के साथ, not with Sita."]], "अपना refers back to the subject and agrees with the thing possessed."),
  gap("ap:1", "मैं ___ कपड़े धोता हूँ ।", "I[0] wash[3+4] my[1] clothes[2].", "अपने", [["मेरे","The owner is मैं, the subject. " + OWN], ["अपना","अपना is singular. कपड़े is plural."]], "“My” referring back to मैं is अपना."),
  gap("ap:2", "तुम ___ जूते यहाँ रखो ।", "You[0] put[4] your[1] shoes[2] here[3].", "अपने", [["तुम्हारे","In a command “your” is always अपना, because the subject of a command is “you”."], ["अपनी","अपनी is feminine. जूते is masculine plural."]], "Commands always take अपना for “your”."),
  gap("ap:3", "मैं और ___ बहिन हिन्दी सीखते हैं ।", "My[2] sister[3] and[1] I[0] learn[5+6] Hindi[4]. (a man speaking)", "मेरी", [["अपनी","मैं और मेरी बहिन is a joint subject. अपना refers back to a subject; it cannot be part of one."], ["मेरा","मेरा is masculine. बहिन is feminine."]], "In a joint subject joined by और the ordinary possessive is used."),
  gap("ap:4", "___ भाई डाकघर में काम करता है ।", "My[0] brother[1] works[4+5+6] in[3] {the post office}[2].", "मेरा", [["अपना","भाई is itself the subject, so there is nothing for अपना to refer back to."], ["मेरी","मेरी is feminine. भाई is masculine."]], "अपना never goes with the subject itself."),
  mc("ap:5", "Which says that Mohan reads his own newspaper?", "मोहन अपना अख़बार पढ़ता है ।", [["मोहन उसका अख़बार पढ़ता है ।","उसका here means someone else's newspaper. " + OWN], ["मोहन अपनी अख़बार पढ़ता है ।","अख़बार is masculine, so it is अपना."]], "अपना points back to the subject, Mohan."),
  gap("ap:6", "ये मेरे ___ कपड़े हैं ।", "These[0] are[4] {my very own}[1+2] clothes[3].", "अपने", [["अपना","अपना is singular. कपड़े is plural."], ["अपनी","अपनी is feminine. कपड़े is masculine."]], "A possessive followed by अपना is emphatic: “my very own”."),
  gap("ap:7", "वे ___ दादी जी से बहुत प्यार करते हैं ।", "They[0] love[4+6+7+8] {their (own)}[1] grandmother[2] {very much}[5].", "अपनी", [["उनकी","उनकी would mean someone else's grandmother. " + OWN], ["अपने","Respect makes masculine forms plural, but दादी is feminine: अपनी."]], "प्यार करना “to love” marks the person loved with से or को."),
  mc("ap:8", "When does Hindi use अपना instead of मेरा, उसका and so on?", "When the owner is the subject of the same clause", [["Whenever the owner is a person","मेरा भाई डाकघर में काम करता है uses मेरा because the owner (मैं) is not the subject."], ["Only with मैं and हम","अपना works with every subject: सीता अपने भाई के साथ बाज़ार जाती है."]], "If you can add “own” without changing the sense, use अपना (except in a joint subject).")
];

const POSS = "With pronouns, compound postpositions are built on the possessive form.";
const cpp = [
  gap("cp:0", "कुत्ता पलंग ___ नीचे है ।", "{The dog}[0] is[4] under[2+3] the bed[1].", "के", [["की","की is used only with तरफ़ and तरह, which are feminine. नीचे takes के."], ["का","Compound postpositions begin with के, not का."]], "के नीचे “beneath, below”."),
  gap("cp:1", "___ के पीछे कौन है ?", "Who[3] is[4] behind[1+2] the door[0]?", "दरवाज़े", [["दरवाज़ा","A compound postposition takes the oblique, like a simple one: दरवाज़े."], ["दरवाज़ों","दरवाज़ों is plural. There is one door."]], "के पीछे “behind” needs the oblique case."),
  gap("cp:2", "हम स्टेशन ___ तरफ़ जाते हैं ।", "We[0] go[4+5] towards[2+3] the station[1].", "की", [["के","तरफ़ is a feminine noun, so the postposition is की तरफ़."], ["का","Compound postpositions never begin with का. तरफ़ is feminine, so it is की तरफ़."]], "की तरफ़ “towards” and की तरह “like” use की."),
  gap("cp:3", "यह चाय ___ लिए है ।", "This[0] tea[1] is[4] for[3] you[2]. (to तुम)", "तुम्हारे", [["तुम के",POSS + " तुम्हारा gives तुम्हारे लिए."], ["तुम्हारी","लिए is preceded by के, so तुम्हारा becomes तुम्हारे."]], "मेरे लिए, तुम्हारे लिए, उसके लिए …"),
  gap("cp:4", "मोहन ___ साथ दफ़्तर जाता है ।", "Mohan[0] goes[4+5] {to the office}[3] with[2] me[1].", "मेरे", [["मुझ के",POSS + " मेरा gives मेरे साथ."], ["मेरी","साथ is preceded by के, so मेरा becomes मेरे."]], "के साथ “with”: मेरे साथ “with me”."),
  gap("cp:5", "सीता अपनी माँ ___ तरह हँसती है ।", "Sita[0] laughs[5+6] like[3+4] her[1] mother[2].", "की", [["के","तरह is a feminine noun, so it is की तरह."], ["का","Postpositions use की or के, never का."]], "की तरह “like”."),
  gap("cp:6", "हम शुक्रवार को चाचा जी ___ यहाँ जाते हैं ।", "We[0] go[7+8] {to Uncle's}[3+5] place[6] {on Fridays}[1+2].", "के", [["की","यहाँ is not a feminine noun. It is के यहाँ."], ["में","के यहाँ means “at the place of”. में cannot go before यहाँ."]], "के यहाँ “at someone's place (home)”."),
  gap("cp:7", "नौ बजे ___ पहले आइए ।", "{Please come}[4] before[2+3] {nine o'clock}[0+1].", "से", [["की","पहले takes से or के, never की."], ["पर","पर means “on”. “Before” is से पहले."]], "पहले “before” can take से or के."),
  gap("cp:8", "मैं अक्सर अपने गाँव ___ सोचता हूँ ।", "I[0] often[1] think[7+8] about[4+5+6] my[2] village[3].", "के बारे में", [["के साथ","के साथ means “with”."], ["के लिए","के लिए means “for”."]], "के बारे में “about, concerning” has three words."),
  gap("cp:9", "डाकघर स्टेशन के ___ है ।", "{The post office}[0] is[4] opposite[2+3] the station[1].", "सामने", [["पीछे","के पीछे means “behind”."], ["ऊपर","के ऊपर means “on top of”."]], "के सामने “facing, opposite”.")
];

const build = [
  tiles("tl:0", "{The guests}[0] drink[4+5] tea[3] in[2] the garden[1].", ["मेहमान","बग़ीचे","में","चाय","पीते","हैं"], [["पीता","मेहमान is plural here, as हैं shows, so the participle is पीते."], ["बग़ीचा","बग़ीचा is direct. Before में it is oblique: बग़ीचे."]], {alt: [["मेहमान","चाय","बग़ीचे","में","पीते","हैं"]]}),
  tiles("tl:1", "Pinki[0] amuses[3+4] the children[1+2].", ["पिंकी","बच्चों","को","हँसाती","है"], [["हँसती","हँसना is “to laugh”. “To make laugh” is हँसाना, so हँसाती."], ["बच्चे","Before को the oblique plural is needed: बच्चों."]]),
  tiles("tl:2", "My[0] sister[1] is[5] sixteen[2] years[3] old[4].", ["मेरी","बहिन","सोलह","साल","की","है"], [["का","का agrees with the subject, बहिन, which is feminine: की."], ["सालों","The sixteen years form one block of time, so साल is not made oblique plural."]]),
  tiles("tl:3", "Raj[0] sits[5+6] near[3+4] {his (own)}[1] father[2].", ["राज","अपने","पिता","के","पास","बैठता","है"], [["उसके","उसके would be someone else's father. When the owner is the subject, Hindi uses अपना."], ["अपना","Before के पास the possessive is oblique: अपने."]]),
  tiles("tl:4", "Do[5] you[1+2] know[4] Sanskrit[3]? (to आप)", ["क्या","आप","को","संस्कृत","आती","है"], [["आता","The verb agrees with संस्कृत, which is feminine: आती."], ["हैं","The verb agrees with संस्कृत, which is singular: है."]], {alt: [["आप","को","संस्कृत","आती","है","क्या"]]}),
  tiles("tl:5", "{The books}[0] are[4] {on top of}[2+3] the cupboard[1].", ["किताबें","अलमारी","के","ऊपर","हैं"], [["की","Only तरफ़ and तरह take की. ऊपर takes के."], ["है","किताबें is plural, so the verb is हैं."]]),
  tiles("tl:6", "{Please sit}[0+4] under[2+3] the tree[1]. (to आप)", ["आप","पेड़","के","नीचे","बैठिए"], [["बैठो","बैठो is the तुम command. आप takes बैठिए."], ["की","Only तरफ़ and तरह take की. नीचे takes के."]]),
  tiles("tl:7", "{The children}[0] sleep[3+4] {at ten o'clock}[1+2].", ["बच्चे","दस","बजे","सोते","हैं"], [["सोता","सोता is singular. बच्चे is plural."], ["सोना","सोना is the infinitive. The tense uses the participle."]], {alt: [["दस","बजे","बच्चे","सोते","हैं"]]}),
  tiles("tl:8", "What[3] is[5] this[0] fruit[1] called[2+4]?", ["इस","फल","को","क्या","कहते","हैं"], [["कहता","The unstated subject is “they”, plural: कहते हैं."], ["बोलते","बोलना is “to speak”. “To call” is कहना."]]),
  tiles("tl:9", "This[0] room[1] is[3] ours[2].", ["यह","कमरा","हमारा","है"], [["हमारी","हमारी is feminine. कमरा is masculine."], ["हमारे","हमारे is plural or oblique. कमरा here is singular and direct."]], {order: "यह हमारा कमरा है would mean “This is our room”. To say the room is ours, the possessive comes after the noun."}),
  tiles("tl:10", "Their[0] friends[1] live[5+6] near[3+4] the station[2].", ["उनके","दोस्त","स्टेशन","के","पास","रहते","हैं"], [["उनका","दोस्त is plural here, so उनका becomes उनके."], ["रहता","रहता is singular. The friends are several."]]),
  tiles("tl:11", "Pratap[0] {is afraid of}[2+3+4] dogs[1].", ["प्रताप","कुत्तों","से","डरता","है"], [["को","डरना marks what is feared with से."], ["कुत्ते","Before से the oblique plural is needed: कुत्तों."]])
];

const mean = [
  meaning("mn:0", "मेरे चाचा जी कभी नहीं हँसते ।", "My uncle never laughs.", [["My uncle always laughs.","“Always” would be हमेशा. कभी नहीं is “never”."], ["My uncle sometimes laughs.","“Sometimes” would be कभी कभी."]]),
  meaning("mn:1", "मेरे पति को संस्कृत नहीं आती ।", "My husband doesn't know Sanskrit.", [["My husband doesn't like Sanskrit.","Liking is पसंद, as in मेरे पति को संस्कृत पसंद नहीं है."], ["My husband doesn't learn Sanskrit.","Learning is सीखना, as in मेरे पति संस्कृत नहीं सीखते."]]),
  meaning("mn:2", "सीता अपनी सहेली के साथ स्कूल जाती है ।", "Sita goes to school with her friend.", [["Sita's friend goes to school.","Sita is the subject, and के साथ means “with”."], ["Sita goes to her friend's school.","के साथ means “with”, not “of”."]]),
  meaning("mn:3", "मोहन उसकी गाड़ी में दफ़्तर जाता है ।", "Mohan goes to the office in his (someone else's) car.", [["Mohan goes to the office in his own car.","“His own” would be अपनी गाड़ी. उसकी refers to someone other than the subject."], ["Mohan goes to his office by bus.","गाड़ी is a car; a bus would be बस."]]),
  meaning("mn:4", "गाँवों में लोग जल्दी उठते हैं ।", "In villages people get up early.", [["In the village people got up early.","उठते हैं is the imperfective present, a habit, not the past. गाँवों is plural."], ["In villages people go to bed early.","उठना is “to get up”. Going to bed would be सोना."]]),
  meaning("mn:5", "मालूम होता है कि मालिक आज बीमार हैं ।", "It seems the boss is ill today.", [["I know the boss is ill today.","“I know” would be मुझे मालूम है कि …. मालूम होता है means “it seems”."], ["The boss knows he is ill today.","मालिक is the subject of the second clause only. मालूम होता है means “it seems”."]]),
  meaning("mn:6", "हमारे दफ़्तर के पीछे एक बड़ा पेड़ है ।", "There is a big tree behind our office.", [["There is a big tree in front of our office.","“In front of” is के आगे or के सामने. के पीछे is “behind”."], ["There is a big tree inside our office.","“Inside” is के अंदर."]]),
  meaning("mn:7", "पिंकी हमेशा सब को हँसाती है ।", "Pinki always makes everyone laugh.", [["Pinki always laughs at everyone.","हँसाना is “to make laugh”. Laughing is हँसना, as in हँसती."], ["Pinki never makes anyone laugh.","हमेशा means “always”. “Never” is कभी नहीं."]])
];

const usage = [
  mc("ru:0", "When can हूँ, है, हो or हैं be dropped after the participle?", "In negative sentences", [["In questions","Questions keep the auxiliary: तुम रात को क्या पढ़ते हो ?"], ["Whenever the subject is plural","Plural subjects keep हैं, as in बच्चे बग़ीचे में खेलते हैं."]], "After नहीं the auxiliary is often left out: मोहन दफ़्तर नहीं जाता."),
  mc("ru:1", "What does the imperfective present describe?", "Habits and regular events, and ongoing states of mind", [["An action going on right now, like “he is speaking”","Continuous actions have a separate tense, taught in Unit 8."], ["A single event in the past","The past of होना is था. This tense is present."]], "बोलता है “speaks” (habitually); सोचता है “thinks”."),
  mc("ru:2", "How are compound postpositions used with pronouns?", "With the possessive form: मेरे लिए, उसके साथ", [["With the direct pronoun: मैं के लिए","A postposition never follows a direct pronoun. " + POSS], ["With the oblique pronoun: मुझ के लिए",POSS + " मेरा gives मेरे लिए."]], "मेरा → मेरे लिए, हमारा → हमारी तरफ़, अपना → अपने बारे में."),
  mc("ru:3", "Which word is the grammatical subject of उसे ज़ुकाम है ?", "ज़ुकाम", [["उसे","उसे is उस को. A word followed by को is never the subject: the subject must be in the direct case."], ["है","है is the verb."]], "In the को construction the thing (here ज़ुकाम) is the subject, and the person takes को."),
  mc("ru:4", "Why do की तरफ़ and की तरह use की ?", "Because those two nouns are feminine", [["Because the noun before them is feminine","The noun before does not matter: बहिन के साथ, घर की तरफ़. Only तरफ़ and तरह make it की."], ["Because the postposition means “towards”","की is the feminine form of का. तरफ़ is a noun meaning “direction”."]], "Other compound postpositions begin with के."),
];

const unit = {
  id: "unit6", n: 6, title: "What does Pratap do?", titleHi: "प्रताप क्या करता है ?",
  scope: "The imperfective present (बोलता है, बोलती हैं), dropping the auxiliary in negatives (नहीं बोलतीं); आना for knowing a language; X को क्या कहते हैं ?; होता है for general truths; मालूम होता है; mixed-gender agreement; कितने बजे; X साल का; possessive pronouns तेरा, इसका, हमारा, किनका, अपना, compound postpositions (के लिए, की तरफ़, मेरे साथ …)",
  pages: "book 64–77",
  skills: {pres: "Imperfective present", neg: "Negatives", uses: "Uses of the present", poss: "Possessive pronouns", apna: "Reflexive अपना", cpp: "Compound postpositions", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अकेलापन","loneliness","n","m"],["अक्सर","often, usually","x"],["अच्छा","well, proficiently","x"],["अपना","(one's) own","p"],["इक्कीस","twenty-one","x"],
    ["उच्चारण","pronunciation","n","m"],["प्रोनंसियेशन","‘pronunciation’ (English loanword)","n","m"],["उठना","to get up, rise","v"],["उन्नीस","nineteen","x"],
    ["कंपनी","company, firm","n","f"],["कभी कभी","sometimes","x"],["कभी नहीं","never","x"],["की तरफ़","towards","x"],["की तरह","like","x"],["के अंदर","inside","x"],
    ["के आगे","in front of, ahead of","x"],["के ऊपर","on top of","x"],["के नीचे","beneath, below","x"],["से पहले","before","x"],["के पास","near","x"],["के पीछे","behind","x"],
    ["के बाद","after","x"],["के बारे में","about, concerning","x"],["के बाहर","outside (of)","x"],["के यहाँ","at the place of","x"],["के लिए","for","x"],
    ["के साथ","with, in company of","x"],["के सामने","facing, opposite","x"],["ख़याल रखना","to take care of","v"],["ध्यान रखना","to look after, mind","v"],
    ["ख़ूब","a lot, well","x"],["गपशप","gossip","n","f"],["गोश्त","meat","n","m"],["चाँद","moon","n","m"],["चुप","silent","a"],["चौदह","fourteen","x"],
    ["छोड़ना","to leave","v"],["जानना","to know","v"],["टुकड़ा","piece, bit","n","m"],["डरना","to fear, be afraid (of: से)","v"],["डाकघर","post office","n","m"],
    ["तेरा","your (from तू)","p"],["थोड़ा","a little","a"],["दिन","day","n","m"],["दिन भर","all day","x"],["देवनागरी","Devanagari script","n","f"],
    ["नफ़रत","hatred","n","f"],["नापसंद करना","to dislike","v"],["प्यार","love, affection","n","m"],["प्यार करना","to love","v"],["फिर","then; again","x"],
    ["बचपन","childhood","n","m"],["बजे","o'clock","x"],["कितने बजे","at what time?","x"],["बधाई","congratulation","n","f"],["बात करना","to talk, converse (with: से)","v"],
    ["बाप","father (familiar)","n","m"],["बारह","twelve","x"],["मन","mind","n","m"],["महसूस करना","to feel, experience","v"],["मालिक","boss","n","m"],
    ["मुन्ना","Munna (pet name for a little boy)","n","m"],["मुश्किल","difficult","a"],["मेहमान","guest","n","m"],["लंबाई","height, length","n","f"],["लखनऊ","Lucknow","n","m"],
    ["लिपि","script, writing system","n","f"],["वाह","wonderful! (admiration or scorn)","x"],["विदेशी","foreigner","n","m"],["वैसे","actually","x"],["व्यंग्य","sarcasm","n","m"],
    ["शराब","alcohol, liquor","n","f"],["शरारत","mischief","n","f"],["शुक्रवार","Friday","n","m"],["शुद्ध","pure, unmixed","a"],["संस्कृत","Sanskrit","n","f"],
    ["सहेली","girl's female friend","n","f"],["साड़ी","sari","n","f"],["साल","year","n","m"],["सीखना","to learn","v"],["सोचना","to think","v"],["सोना","to sleep","v"],
    ["स्टेशन","station","n","m"],["हँसना","to laugh","v"],["हँसाना","to make laugh","v"],["हमारा","our, ours","p"],["हमेशा","always","x"],["होनहार","promising","a"],
    ["स्कूल","school","n","m"],["ऐसा","thus, so, like this","a"],["रहना","to stay, live","v"],["खेलना","to play","v"],["समझना","to understand; to consider","v"],
    ["इसका","his, her, its (of this one)","p"],["किनका","whose? (plural)","p"],["भाषा","language","n","f"],["उर्दू","Urdu","n","f"],["सात","seven","x"],["आठ","eight","x"],
    ["मालूम होना","to seem","v"],["आना","(with को) to know (a language)","v"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "pres", title: "बोलता, बोलती, बोलते", desc: "The imperfective present", skill: "pres", items: pres},
    {id: "neg", title: "नहीं बोलतीं", desc: "Negatives: dropping हैं, कभी नहीं", skill: "neg", items: neg},
    {id: "uses", title: "आती है, होता है", desc: "Languages, names, general truths, time and age", skill: "uses", items: uses},
    {id: "poss", title: "मेरा, तेरा, हमारा", desc: "The possessive pronouns", skill: "poss", items: poss},
    {id: "apna", title: "अपना", desc: "The reflexive possessive", skill: "apna", items: apna},
    {id: "cpp", title: "के लिए, की तरफ़", desc: "Compound postpositions", skill: "cpp", items: cpp},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "The auxiliary, अपना and postpositions", skill: "usage", items: usage}
  ],
  test: {vocab: 4, pres: 3, neg: 2, uses: 2, poss: 2, apna: 2, cpp: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "imperfective-present", title: "Imperfective present: stem + -tā, -tī, -te (agreeing with the subject) + हूँ, है, हो, हैं, for habits, regular events and ongoing states of mind"},
    {id: "imperfective-negative", title: "In the negative the auxiliary can be dropped; a feminine plural participle is then nasalized (नहीं बोलतीं)"},
    {id: "imperfective-idiom", title: "Idiomatic imperfective for something about to happen: अच्छा, मैं चलता हूँ “I'm off”, अभी आता हूँ"},
    {id: "kitne-baje", title: "कितने बजे ? “at what time?”; सात बजे “at seven o'clock”"},
    {id: "ana-language", title: "Knowing a language: X को (language) आना, the verb agreeing with the language"},
    {id: "kya-kahte", title: "X को क्या कहते हैं ? “what is X called?”; X को Y कहना “to call X Y”"},
    {id: "hota-hai", title: "होता है for general statements of lasting validity, है alone for a particular case"},
    {id: "malum-hota", title: "मालूम होता है “it seems” against मुझे मालूम है “I know”"},
    {id: "mixed-gender-verb", title: "Mixed genders: people take a masculine plural verb; things take the gender of the nearest item"},
    {id: "possessive-pronouns", title: "The full set of possessive pronouns: मेरा, तेरा, इसका, उसका, हमारा, तुम्हारा, आपका, इनका, उनका, किसका, किनका; they agree with the thing possessed; the possessive before the noun describes it, after the noun it is the predicate (यह मेरी साइकिल है against यह साइकिल मेरी है)"},
    {id: "saal-ka", title: "X साल का “X years old”, का agreeing with the person; साल stays unpluralized as a single block of time"},
    {id: "apna", title: "अपना refers to the subject of the clause and replaces the possessive; not used for the subject itself or in a joint subject; always used for “your” in commands; मेरा अपना “my very own”"},
    {id: "compound-postpositions", title: "Compound postpositions (के लिए, के साथ, के पास, के बारे में …; की तरफ़, की तरह, से पहले) take the oblique; with pronouns they use the possessive: मेरे लिए, उसके साथ"},
    {id: "pronoun-construction-types", title: "Two construction types: वह बीमार है and उसे ज़ुकाम है, where the thing is the subject and the person takes को"}
  ]
};

writeUnit(6, unit, {forms, fake});
