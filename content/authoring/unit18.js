"use strict";
// Unit 18 (book pp. 234–256): ऐसा प्यार जो रोके भी नहीं रुकता. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 252–255, Quick Vocab pp. 235, 243–245, 18.1–18.3 pp. 237–249)
  "अधेड़":"adheṛ","अनुवाद":"anuvād","अर्ज़ी":"arzī","आकाश":"ākāś","आत्मीयता":"ātmīytā","आश्चर्य":"āścary","आश्चर्यजनक":"āścaryajanak",
  "इकलौता":"iklautā","इश्क़":"iśq","लड़ाना":"laṛānā","इस्त्री":"istrī","उड़ाना":"uṛānā","ऊबना":"ūbnā","एकाध":"ekādh","कथक":"kathak",
  "क़दम":"qadam","कमाल":"kamāl","कमी":"kamī","क़सम":"qasam","कहलवाना":"kahalvānā","कान":"kān","ख़ुदा":"khudā","खुला":"khulā","गला":"galā",
  "गले":"gale","लगाना":"lagānā","गिरना":"girnā","गोद":"god","घास":"ghās","घुमाना":"ghumānā","चुनना":"cunnā","छुटभैया":"chuṭbhaiyā",
  "छेड़ना":"cheṛnā","छोकरी":"chokrī","जनाब":"janāb","जाना-पहचाना":"jānā-pahcānā","ज़ाहिर":"zāhir","ज़िद":"zid","झट":"jhaṭ","झाड़ना":"jhāṛnā",
  "झूमना":"jhūmnā","टकराना":"ṭakrānā","टपकना":"ṭapaknā","टहलना":"ṭahalnā","तलाक़-शुदा":"talāq-śudā","तुड़ाना":"tuṛānā","तुलना":"tulnā",
  "तेज़":"tez","थामना":"thāmnā","दया":"dayā","दर्ज़ी":"darzī","दास्तान":"dāstān","दिलवाना":"dilvānā","दीखना":"dīkhnā",
  "धंधा":"dhandhā","धूमधाम":"dhūmdhām","नरसों":"narsõ","नर्तक":"nartak","नाच":"nāc","नचाना":"nacānā","नृत्य":"nṛty","नेक":"nek",
  "पतंग":"pataṅg","परिस्थिति":"paristhiti","पवन":"pavan","पहुँचाना":"pahũcānā","पारिवारिक":"pārivārik","पैदा":"paidā","प्रतीत":"pratīt",
  "प्रधान":"pradhān","फिरना":"phirnā","फ़िलहाल":"filhāl","बचना":"bacnā","बचाना":"bacānā","बसना":"basnā","बसाना":"basānā","बस्ती":"bastī",
  "बीतना":"bītnā","बेचैन":"becain","बैठक":"baiṭhak","मरम्मत":"marammat","मस्त":"mast","मापना":"māpnā","मुस्कराना":"muskarānā","मूल":"mūl",
  "यानी":"yānī","राय":"rāy","रेशम":"reśam","लखपति":"lakhpati","लदना":"ladnā","लाजवाब":"lājavāb","लिटाना":"liṭānā","लेटना":"leṭnā",
  "लोट-पोट":"loṭ-poṭ","वर्णन":"varṇan","विस्तार":"vistār","वेतन":"vetan","शंका":"śaṅkā","शख़्स":"śakhs","शर्म":"śarm","श्रावण":"śrāvaṇ",
  "सदस्य":"sadasy","समझाना":"samjhānā","सलवार":"salvār","क़मीज़":"qamīz","साँस":"sā̃s","भरना":"bharnā","सितारा":"sitārā","सिलवाना":"silvānā",
  "सिलसिला":"silsilā","सिलसिले":"silsile","सुलाना":"sulānā","सूझना":"sūjhnā","स्थायी":"sthāyī","स्वभाव":"svabhāv","स्वीकार":"svīkār",
  "हँसी-मज़ाक":"hãsī-mazāk","ह्विस्की":"hviskī","बनवाना":"banvānā","लिखवाना":"likhvānā","करवाना":"karvānā",
  // participles (18.1)
  "टूटा":"ṭūṭā","टूटे":"ṭūṭe","टूटी":"ṭūṭī","बैठी":"baiṭhī","बैठा":"baiṭhā","बैठे":"baiṭhe","गिरे":"gire","गिरा":"girā","गिरी":"girī","लिए":"lie",
  "लिया":"liyā","गाते":"gāte","बना":"banā","बनी":"banī","बने":"bane","खड़ी":"khaṛī","खड़ा":"khaṛā","खड़े":"khaṛe","लिखते":"likhte","लिखता":"likhtā",
  "जाते":"jāte","उतरते":"utarte","आते":"āte","टकराते":"ṭakrāte","बची":"bacī","बचा":"bacā","बचाई":"bacāī","बचाया":"bacāyā",
  "पूछे":"pūche","पूछा":"pūchā","सुनते":"sunte","सोचे":"soce","सोचा":"socā","सोचते":"socte","खाते":"khāte","बनाया":"banāyā","बनाई":"banāī","बनाता":"banātā",
  "रहते":"rahte","उठाए":"uṭhāe","उठाया":"uṭhāyā","उठे":"uṭhe","करते":"karte","किए":"kie","मिले":"mile","मिलते":"milte","हँसते":"hãste","हँसता":"hãstā",
  "चलते":"calte","चलता":"caltā","बनाते":"banāte","रोते":"rote","खाए":"khāe","खाया":"khāyā",
  // transitive and causative forms (18.2–18.3)
  "सुला":"sulā","लिटा":"liṭā","लेट":"leṭ","समझाई":"samjhāī","समझाया":"samjhāyā","खिलाया":"khilāyā","खिलाई":"khilāī","दिखाई":"dikhāī","दिखी":"dikhī","दिखाया":"dikhāyā","उड़ा":"uṛā","उड़":"uṛ","उड़ते":"uṛte","लद":"lad",
  "लाद":"lād","समझाओ":"samjhāo","करवा":"karvā","करवाई":"karvāī","करवाया":"karvāyā","लिखवाई":"likhvāī","लिखवाया":"likhvāyā","पढ़वाई":"paṛhvāī",
  "धुलवाए":"dhulvāe","धुलवाईं":"dhulvāī̃","कटवा":"kaṭvā","बनवाया":"banvāyā","मँगवाई":"mãgvāī",
  // forms produced by earlier units' rules
  "दरवाज़े":"darvāze","मिस्त्री":"mistrī","कपड़े":"kapṛe","चीज़ें":"cīzẽ","छुओ":"chuo","पुलिस":"pulis",
  "लौट":"lauṭ","बजे":"baje","गए":"gae","गया":"gayā","हुए":"hue","हुआ":"huā","हुई":"huī","थीं":"thī̃","सब्ज़ी":"sabzī","अपने":"apne",
  "चिट्ठी":"ciṭṭhī","सफ़ाई":"safāī","गाने":"gāne","गाती":"gātī","महीने":"mahīne","दूसरों":"dūsrõ","बीतता":"bīttā","बीता":"bītā","सड़क":"saṛak","पकड़े":"pakṛe","थक":"thak","गिरते":"girte","सबसे":"sabse","धुलवाना":"dhulvānā","कटवाना":"kaṭvānā","गाता":"gātā","बताए":"batāe","जली":"jalī"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "लिखावाई":"likhāvāī","धोलवाए":"dholvāe","कटावा":"kaṭāvā","सोवाया":"sovāyā","उड़ावा":"uṛāvā","टूटाई":"ṭūṭāī","चलतेते":"caltete","हुआए":"huāe",
  "पहुँचतेते":"pahũctete","बनावाया":"banāvāyā"
};

const ADJ = "Used as an adjective, a participle (imperfective बीतता, perfective बीता) agrees with its noun. हुआ, agreeing too, can be added to stress an ongoing or a completed state (रोती हुई लड़की, टूटा हुआ प्याला).";
const STATE = "A perfective participle with हुआ describes a state resulting from an earlier action: खिड़की टूटी हुई थी “was broken” (state), but खिड़की टूट गई थी “had broken” (event).";
const ADV = "Used as an adverb, the participle (+ हुए) has the invariable -e ending (हँसते हुए, पकड़े हुए, लिए हुए).";
const REPT = "A repeated imperfective participle in -e, without हुए, shows an action repeated over time or running alongside the main verb (चलते चलते थक गए).";
const NEAR = "A repeated imperfective participle in -e followed by बचना describes a narrow escape (गिरते गिरते बचा “nearly fell”).";
const SAMAY = "Imperfective participle in -e + समय or वक़्त means “at the time of doing, while doing”.";
const HI = "Imperfective participle in -e + ही means “as soon as”. With two different subjects, the participle may be “possessed” with का (माँ के आते ही).";
const BINA = "बिना + perfective participle in -e means “without doing” (बिना पूछे, बिना सोचे). The order खाए बिना is also used.";
const SINCE = "Time since a completed event: perfective participle (+ हुए) with the time as subject (उसे गए दो घंटे हो गए). Time since a current situation began: imperfective participle + हुए (यहाँ रहते हुए दो साल हुए).";
const POSS = "Participles can be “possessed” like nouns: माँ का बनाया खाना “food made by Mother”, आपके रहते “while you're here”. A possessed transitive with an intransitive shows a failed attempt (मेरे उठाए भी वह नहीं उठा).";
const PAIR = "Transitive verbs are often made from intransitives by lengthening the stem (बचना → बचाना, सोना → सुलाना) or the first syllable (मरना → मारना, कटना → काटना).";
const CAUS = "Causative verbs in -vā- mean “to get something done (by someone)”: बनवाना, लिखवाना, करवाना. The person who does the work takes से.";

const part = [
  gap("pt:0", "मेज़ पर एक ___ हुआ प्याला रखा था ।", "A[2] broken[3+4] cup[5] {had been put}[6+7] on[1] the table[0].", "टूटा", [["टूटी","टूटी is feminine. प्याला is masculine."], ["टूटे","टूटे is plural or oblique. प्याला is a direct singular subject."], ["टूटाई","Not a word. The participle of टूटना is टूटा, टूटी, टूटे."]], ADJ),
  gap("pt:1", "खिड़की के पास ___ हुई लड़की मेरी बहिन है ।", "The girl[5] sitting[3+4] by[1+2] the window[0] is[8] my[6] sister[7].", "बैठी", [["बैठा","बैठा is masculine. It agrees with लड़की."], ["बैठे","बैठे is masculine plural or oblique. लड़की is feminine."]], ADJ),
  gap("pt:2", "हमने सड़क पर एक ___ हुए आदमी की मदद की ।", "We[0] helped[7+8+9] a[3] man[6] who had fallen[4+5] in the road[1+2].", "गिरे", [["गिरा","Before की the phrase is oblique — गिरे हुए आदमी की."], ["गिरी","गिरी is feminine. आदमी is masculine."]], ADJ),
  gap("pt:3", "राज हाथ में किताब ___ हुए खड़ा था ।", "Raj[0] {was standing}[6+7] holding[4+5] a book[3] in[2] his hand[1].", "लिए", [["लिया","Used as an adverb, the participle is invariable in -e — लिए हुए."], ["लेता","लेता is the imperfective. “Holding” is the state after taking: लिए हुए."]], ADV),
  meaning("pt:4", "मैंने उसे गाना गाते हुए सुना ।", "I heard her singing a song.", [["She heard me singing a song.","मैंने is the hearer, उसे the singer."], ["I asked her to sing a song.","सुना is “heard”, and गाते हुए “singing”."]], "With verbs of seeing and hearing, the participle describes the person seen or heard."),
  gap("pt:5", "सीता गाते ___ घर आई ।", "Sita[0] came[4] home[3] singing[1+2].", "हुए", [["हुआ","गाते is the -e form, used as an adverb, so हुए follows — गाते हुए."], ["हुई","With गाती, हुई would match (गाती हुई). With गाते it is गाते हुए."], ["हुआए","Not a word. The form is हुए."]], ADV),
  gap("pt:6", "यह कुरता हाथ से ___ हुआ है ।", "This[0] kurta[1] is[6] hand-made[2+3+4+5].", "बना", [["बनी","बनी is feminine. कुरता is masculine."], ["बने","बने is plural. It is one kurta."]], ADJ),
  mc("pt:7", "Which sentence describes a state: “the window was broken (and still was)”?", "खिड़की टूटी हुई थी ।", [["खिड़की टूट गई थी ।","This describes the event: “the window had broken”."], ["खिड़की तोड़ी गई थी ।","This is the passive: “the window had been broken (by someone)”."]], STATE, {say: "खिड़की टूटी हुई थी ।", en: "The window[0] was[3] broken[1+2]."}),
  gap("pt:8", "बाहर ___ हुई गाड़ी किसकी है ?", "Whose[4] is[5] the car[3] standing[1+2] outside[0]?", "खड़ी", [["खड़ा","खड़ा is masculine. गाड़ी is feminine."], ["खड़े","खड़े is masculine plural or oblique. गाड़ी is feminine."]], "खड़ा “standing” is an adjective, but behaves like बैठा and पड़ा and can take हुआ. "+ADJ)
];

const adv = [
  gap("pa:0", "सारा दिन चिट्ठियाँ लिखते ___ मेरा हाथ थक गया ।", "Writing[3+4] letters[2] all[0] day[1] long, my[5] hand[6] {got tired}[7+8].", "लिखते", [["लिखता","The repeated participle is invariable in -e — लिखते लिखते."], ["लिखना","The repetition uses the participle, not the infinitive — लिखते लिखते."]], REPT),
  gap("pa:1", "दफ़्तर जाते ___ बाज़ार से दूध ले आना ।", "{On your way}[1+2] to the office[0], {bring}[6+7] milk[5] from the market[3+4].", "समय", [["ही","जाते ही is “as soon as you go”. “On your way” is जाते समय."], ["बाद","“After” would be जाने के बाद, with the oblique infinitive."]], SAMAY),
  gap("pa:2", "बस से उतरते ___ मैंने तुम्हें फ़ोन किया ।", "{As soon as}[3] I[4] got off[2] the bus[0+1], I phoned[6+7] you[5].", "ही", [["समय","उतरते समय is “while getting off”. “As soon as” is उतरते ही."], ["भी","भी is “also, even”. “As soon as” is उतरते ही."]], HI),
  gap("pa:3", "माँ ___ आते ही बच्चे खाना खाने बैठ गए ।", "{As soon as}[1+3] Mother[0] came[2], the children[4] {sat down}[7+8] to eat[5+6].", "के", [["का","The participle आते is in -e, so the possessive is oblique — माँ के आते ही."], ["को","With two subjects the participle is “possessed” — माँ के आते ही."]], HI),
  gap("pa:4", "गाड़ी पेड़ से टकराते टकराते ___ ।", "The car[0] {narrowly missed}[5] hitting[2+3+4] a tree[1].", "बची", [["बचा","बचा is masculine. गाड़ी is feminine."], ["बचाई","बचाना is transitive, “to save (something)”. The car escaped — बची."]], NEAR),
  gap("pa:5", "बिना ___ मेरी चीज़ें मत छुओ ।", "Don't[4] touch[5] my[2] things[3] without[0] asking[1].", "पूछे", [["पूछा","बिना takes the perfective participle in -e — बिना पूछे."], ["पूछना","बिना takes the perfective participle in -e, not the infinitive."]], BINA),
  meaning("pa:6", "रेडियो सुनते सुनते दादा जी सो गए ।", "Grandpa fell asleep listening to the radio.", [["Grandpa went to sleep and then listened to the radio.","सुनते सुनते runs alongside: he was listening when he fell asleep."], ["Grandpa listens to the radio every night before sleeping.","सो गए is a single past event."]], REPT),
  mc("pa:7", "Which means “without thinking”?", "बिना सोचे", [["बिना सोचा","बिना takes the perfective participle in -e — सोचे."], ["सोचते समय","सोचते समय is “while thinking”."]], BINA),
  gap("pa:8", "खाना खाते ___ बात मत करो ।", "Don't[4] talk[3+5] while[2] eating[0+1].", "समय", [["ही","खाते ही is “as soon as you eat”."], ["बिना","बिना takes the perfective participle — बिना खाए “without eating”."]], SAMAY),
  meaning("pa:9", "मेरी बात सुनते ही वह हँस पड़ा ।", "As soon as he heard what I said, he burst out laughing.", [["He laughed all the time I was talking.","सुनते ही is “as soon as he heard”."], ["He laughed before he heard what I said.","सुनते ही is “immediately on hearing”."]], HI)
];

const since = [
  gap("sn:0", "राज को गए हुए एक घंटा हो ___ ।", "It's[6+7] an[4] hour[5] since Raj[0+1] went[2+3].", "गया", [["गए","गए is plural. The time, एक घंटा, is the subject — singular."], ["गई","गई is feminine. घंटा is masculine."]], SINCE),
  gap("sn:1", "सीता को यहाँ काम ___ हुए छह महीने हो गए हैं ।", "Sita[0+1] {has been working}[3+4+5+8+9+10] here[2] for six[6] months[7].", "करते", [["किए","किए हुए would be time since a completed event. She is still working — करते हुए."], ["करती","In this construction the participle is in -e — करते हुए."]], SINCE),
  gap("sn:2", "माँ का ___ खाना सबसे अच्छा होता है ।", "The food[3] Mother[0+1] makes[2] is[7] the best[4+5+6].", "बनाया", [["बनाई","बनाई is feminine. खाना is masculine."], ["बनाता","The possessed participle here is perfective — माँ का बनाया खाना."]], POSS),
  gap("sn:3", "आपके ___ हमें किसी बात की चिंता नहीं ।", "While[1] you're[0] around[1], we[2] {have no}[7] worries[6] about anything[3+4+5].", "रहते", [["रहे","रहे is perfective. “While you're around” uses the imperfective — आपके रहते."], ["रहना","The possessed form uses the participle — आपके रहते."]], POSS),
  gap("sn:4", "मेरे ___ भी वह नहीं उठा ।", "{Despite my trying}[0+1+2] to get him up, he[3] {didn't}[4] {get up}[5].", "उठाए", [["उठाया","The possessed participle in this construction is in -e — मेरे उठाए."], ["उठे","उठना is intransitive. The trying is transitive — उठाना, मेरे उठाए."]], POSS),
  meaning("sn:5", "उसे गए हुए दस मिनट भी नहीं हुए थे कि वह लौट आया ।", "He'd been gone barely ten minutes when he came back.", [["He came back after ten minutes and left again.","गए हुए … नहीं हुए थे — ten minutes hadn't even passed since he left."], ["He left ten minutes after coming back.","The order is the other way round: he left, and soon came back."]], SINCE),
  mc("sn:6", "Which means “I've been waiting for an hour”?", "मुझे इंतज़ार करते हुए एक घंटा हो गया है ।", [["मुझे इंतज़ार किए हुए एक घंटा हो गया है ।","किए हुए measures time since a finished act, not a wait still going on."], ["मैंने एक घंटे इंतज़ार किया ।","This is “I waited for an hour”, and the wait is over."]], SINCE, {say: "मुझे इंतज़ार करते हुए एक घंटा हो गया है ।", en: "I[0] {have been waiting}[1+2+3+6+7+8] for an[4] hour[5]."})
];

const trans = [
  mc("tr:0", "Which is the transitive partner of पहुँचना “to arrive”?", "पहुँचाना", [["बचाना","बचाना “to save” pairs with बचना “to escape”."], ["समझाना","समझाना “to explain” pairs with समझना “to understand”."]], PAIR),
  gap("tr:1", "पुलिस ने बच्चे को नदी से ___ ।", "The police[0+1] saved[6] the child[2+3] from[5] the river[4].", "बचाया", [["बचा","बचना is intransitive, “to escape”. With ने the transitive बचाना is needed."], ["बचाई","With को on the object the verb is masculine singular — बचाया."]], PAIR),
  gap("tr:2", "माँ ने बच्चे को ___ दिया ।", "Mother[0+1] {put}[4+5] the child[2+3] {to sleep}[4].", "सुला", [["सो","सोना is intransitive. “Put to sleep” is सुलाना."], ["सोने","सोने दिया is “let (the child) sleep”. “Put to sleep” is सुला दिया."], ["सोवाया","Not a word. The transitive of सोना is सुलाना."]], PAIR),
  gap("tr:3", "सीता ने मेहमानों को खाना ___ ।", "Sita[0+1] served[5] the guests[2+3] food[4].", "खिलाया", [["खाया","खाया is “ate”. “Served, fed” is खिलाया."], ["खिलाई","खिलाई is feminine. खाना is masculine."]], "Some transitives have a second transitive: खाना “to eat”, खिलाना “to serve, feed”. "+PAIR),
  gap("tr:4", "उसने मुझे अपनी नई गाड़ी ___ ।", "He[0] showed[5] me[1] his[2] new[3] car[4].", "दिखाई", [["दिखी","दिखना is intransitive, “to appear”. With ने the transitive दिखाना is needed."], ["दिखाया","दिखाया is masculine. With ने the verb agrees with गाड़ी, feminine."]], PAIR),
  mc("tr:5", "मरना “to die” → मारना “to kill”. How is the transitive formed?", "by lengthening the vowel of the first syllable", [["by adding -ā to the stem","That is the pattern of बचना → बचाना."], ["by adding -vā- to the stem","-vā- makes a causative (बनवाना)."]], PAIR),
  gap("tr:6", "बच्चे बाहर पतंग ___ रहे हैं ।", "The children[0] {are flying}[3+4+5] kites[2] outside[1].", "उड़ा", [["उड़","उड़ना is intransitive: the kites would be flying by themselves."], ["उड़ते","उड़ते is the participle. The continuous uses the stem — उड़ा रहे हैं."], ["उड़ावा","Not a word. The transitive of उड़ना is उड़ाना."]], PAIR),
  gap("tr:7", "गाड़ी पर सारा सामान ___ गया ।", "All[2] the luggage[3] {got loaded}[4+5] onto[1] the cart[0].", "लद", [["लाद","लादना is transitive. “Got loaded” is the intransitive लदना — लद गया."], ["लादना","The compound verb needs the stem of लदना — लद गया."]], PAIR),
  meaning("tr:8", "मुझे यह सवाल समझाओ ।", "Explain this question to me.", [["I understand this question.","समझाना is “to explain”. “Understand” is समझना."], ["Ask me this question.","“Ask” would be पूछना."]], PAIR),
  mc("tr:9", "Which verb means “to have (something) broken”?", "तुड़ाना", [["तोड़ना","तोड़ना is “to break (something)”."], ["टूटना","टूटना is “to be broken, break”."]], "Some verbs form a three-way series: intransitive टूटना, transitive तोड़ना, and a second transitive तुड़ाना.")
];

const caus = [
  gap("cs:0", "पिता जी मिस्त्री से गाड़ी ठीक ___ रहे हैं ।", "Father[0+1] {is having}[6+7+8] the car[4] repaired[5] by[3] the mechanic[2].", "करवा", [["कर","ठीक कर रहे हैं is “is repairing (himself)”. The mechanic does it — करवा."], ["हो","ठीक हो रहे हैं is intransitive, “getting better”."]], CAUS),
  gap("cs:1", "उसने यह चिट्ठी किसी से ___ ।", "She[0] had[5] this[1] letter[2] written[5] by someone[3+4].", "लिखवाई", [["लिखवाया","लिखवाया is masculine. With ने the verb agrees with चिट्ठी, feminine."], ["लिखी","लिखी is “wrote (herself)”. Someone else wrote it — लिखवाई."], ["लिखावाई","Not a word. The causative is लिखवाना, लिखवाई."]], CAUS),
  gap("cs:2", "मैंने यह कविता अपने दोस्त ___ पढ़वाई ।", "I[0] had[6] my[3] friend[4+5] read[6] this[1] poem[2].", "से", [["ने","ने marks the main doer, मैंने. The one made to do it takes से."], ["का","का would make it “my friend's poem”. The person made to read takes से."]], CAUS),
  mc("cs:3", "Which verb means “to cause to be made”?", "बनवाना", [["बनाना","बनाना is “to make”."], ["बनना","बनना is “to be made, come into being”."], ["बनावाया","Not a word. The causative is बनवाना."]], CAUS),
  meaning("cs:4", "मैंने अपने कमरे की सफ़ाई करवाई ।", "I had my room cleaned.", [["I cleaned my room.","करवाई is causative: someone else did the cleaning."], ["My room needs cleaning.","करवाई is a past act: the cleaning was done."]], CAUS),
  gap("cs:5", "सीता ने अपने सारे कपड़े धोबी से ___ ।", "Sita[0+1] had[7] all[3] her[2] clothes[4] washed[7] by[6] the dhobi[5].", "धुलवाए", [["धुलवाईं","धुलवाईं is feminine. कपड़े is masculine."], ["धोए","धोए is “washed (herself)”. The dhobi did it — धुलवाए."], ["धोलवाए","Not a word. The causative of धोना is धुलवाना."]], CAUS),
  gap("cs:6", "माली से बग़ीचे की घास ___ दो ।", "Have[5+6] the gardener[0+1] cut[5] the grass[4] in the garden[2+3].", "कटवा", [["काट","काट दो is “cut (it yourself)”. Getting the gardener to do it is कटवा दो."], ["कट","कटना is intransitive, “be cut”."], ["कटावा","Not a word. The causative is कटवाना."]], CAUS),
  mc("cs:7", "In a causative sentence, the person made to do the work takes …", "से", [["ने","ने goes on the main doer in the perfective: मैंने … लिखवाई."], ["का","का makes a possessive. The person made to do the work takes से."]], CAUS),
  meaning("cs:8", "राज ने अपना पुराना घर बेच दिया और नया बनवाया ।", "Raj sold his old house and had a new one built.", [["Raj sold his old house and built a new one himself.","बनवाया is causative: someone else built it."], ["Raj's old house fell down and he built a new one.","बेच दिया is “sold”."]], CAUS)
];

const build = [
  tiles("tl:0", "There's[6] a[2] broken[3+4] chair[5] in[1] the room[0].", ["कमरे","में","एक","टूटी","हुई","कुरसी","है"], [["टूटा","टूटा is masculine. कुरसी is feminine."], ["टूटे","टूटे is plural or oblique. कुरसी is feminine."], ["टूटाई","Not a word. The participle is टूटी."]], {alt: [["कमरे","में","एक","टूटी","कुरसी","है"], ["एक","टूटी","हुई","कुरसी","कमरे","में","है"], ["कमरे","में","टूटी","हुई","कुरसी","है"]]}),
  tiles("tl:1", "The children[0] came[4] home[3] laughing[1+2].", ["बच्चे","हँसते","हुए","घर","आए"], [["हँसता","As an adverb the participle is in -e — हँसते हुए."], ["हुआ","हँसते is the -e form, so हुए follows."]], {alt: [["बच्चे","घर","हँसते","हुए","आए"]]}),
  tiles("tl:2", "{As soon as}[3] I[0] reached[2] home[1], it began[6] to rain[4+5].", ["मेरे","घर","पहुँचते","ही","बारिश","होने","लगी"], [["समय","पहुँचते समय is “while reaching”. “As soon as” is पहुँचते ही."], ["लगा","बारिश is feminine — लगी."], ["पहुँचतेते","Not a word. The participle is पहुँचते."]], {alt: [["घर","पहुँचते","ही","बारिश","होने","लगी"]]}),
  tiles("tl:3", "Don't[3] go[4] out[2] without[0] eating[1].", ["बिना","खाए","बाहर","मत","जाओ"], [["खाया","बिना takes the perfective participle in -e — खाए."], ["खाते","खाते is imperfective. “Without eating” is बिना खाए."]], {alt: [["खाए","बिना","बाहर","मत","जाओ"]]}),
  tiles("tl:4", "It's[5+6] six[3] months[4] since we[0] met[1+2].", ["हमें","मिले","हुए","छह","महीने","हो","गए"], [["मिलते","मिलते हुए is for a situation still going on. Time since the meeting is मिले हुए."], ["गया","गया is singular. छह महीने is plural — हो गए."]], {alt: [["हमें","मिले","छह","महीने","हो","गए"]]}),
  tiles("tl:5", "Mother[3] sings[5+6] songs[4] while[2] cooking[0+1].", ["खाना","बनाते","समय","माँ","गाने","गाती","हैं"], [["बनाया","बनाते समय uses the imperfective participle in -e."], ["गाता","गाता is masculine. माँ takes गाती हैं."]], {alt: [["माँ","खाना","बनाते","समय","गाने","गाती","हैं"]]}),
  tiles("tl:6", "I[0] had[5] my[1] brother[2+3] write[5] the letter[4].", ["मैंने","अपने","भाई","से","चिट्ठी","लिखवाई"], [["लिखवाया","लिखवाया is masculine. With ने the verb agrees with चिट्ठी, feminine."], ["ने","The person made to write takes से. ने goes only on मैंने."], ["लिखावाई","Not a word. The causative is लिखवाई."]], {alt: [["मैंने","चिट्ठी","अपने","भाई","से","लिखवाई"], ["मैंने","भाई","से","चिट्ठी","लिखवाई"], ["मैंने","चिट्ठी","भाई","से","लिखवाई"]]}),
  tiles("tl:7", "Father[0+1+2] {laid}[7+8] the child[3+4] {down}[7] on[6] the bed[5].", ["पिता","जी","ने","बच्चे","को","पलंग","पर","लिटा","दिया"], [["लेट","लेटना is intransitive, “to lie down”. Laying someone down is लिटाना."], ["दी","With को on the object the verb is masculine singular — दिया."]], {alt: [["पिता","जी","ने","पलंग","पर","बच्चे","को","लिटा","दिया"]]}),
  tiles("tl:8", "We[2] {got tired}[3+4] walking and walking[0+1].", ["चलते","चलते","हम","थक","गए"], [["चलता","The repeated participle is invariable in -e — चलते चलते."], ["गया","गया is singular. हम is plural — थक गए."], ["चलतेते","Not a word. The participle is चलते."]], {alt: [["हम","चलते","चलते","थक","गए"]]}),
  tiles("tl:9", "The man[4] standing[2+3] at[1] the door[0] is[6] a tailor[5].", ["दरवाज़े","पर","खड़ा","हुआ","आदमी","दर्ज़ी","है"], [["खड़ी","खड़ी is feminine. आदमी is masculine."], ["खड़े","खड़े is plural or oblique. आदमी is a direct singular subject."]], {alt: [["दरवाज़े","पर","खड़ा","आदमी","दर्ज़ी","है"]]}),
  tiles("tl:10", "Sita[0+1] showed[5] me[2] a[3] picture[4].", ["सीता","ने","मुझे","एक","तस्वीर","दिखाई"], [["दिखी","दिखना is intransitive, “to appear”. With ने the transitive दिखाना is needed."], ["दिखाया","तस्वीर is feminine — दिखाई."]], {alt: [["सीता","ने","एक","तस्वीर","मुझे","दिखाई"]]}),
  tiles("tl:11", "Raj[0+1] explained[5] the whole[3] matter[4] to me[2].", ["राज","ने","मुझे","सारी","बात","समझाई"], [["समझी","समझना is “to understand”. “Explain” is the transitive समझाना."], ["समझाया","With ने the verb agrees with बात, feminine — समझाई."]], {alt: [["राज","ने","सारी","बात","मुझे","समझाई"]]})
];

const mean = [
  meaning("mn:0", "पुल पर खड़े हुए लोग नदी को देख रहे थे ।", "The people standing on the bridge were looking at the river.", [["The people were standing up to look at the river.","खड़े हुए is “standing”, describing the people."], ["The people stood the bridge over the river.","खड़े हुए लोग is “people (who were) standing”."]]),
  meaning("mn:1", "मुझे यहाँ आए हुए अभी एक ही हफ़्ता हुआ है ।", "I've only been here a week.", [["I'll be here for only a week.","आए हुए … हुआ है is time since arrival, not a future plan."], ["I came here a week ago and then left.","The time is counted up to now: I'm still here."]]),
  meaning("mn:2", "वह बिना बताए घर से चला गया ।", "He left home without telling anyone.", [["He told everyone and left home.","बिना बताए is “without telling”."], ["He left home to tell someone.","बिना is “without”."]]),
  meaning("mn:3", "उसने अपना सारा काम दूसरों से करवाया ।", "He got others to do all his work.", [["He did all the others' work.","करवाया is causative, and दूसरों से are the ones who did it."], ["He did all his work with others.","करवाया is “had done”: he did none of it himself."]]),
  meaning("mn:4", "बच्चा रोते रोते सो गया ।", "The child cried himself to sleep.", [["The child woke up crying.","सो गया is “fell asleep”."], ["The child stopped crying and went to sleep.","रोते रोते is “while crying”: he was still crying."]]),
  meaning("mn:5", "दरवाज़ा खुला हुआ था ।", "The door was open.", [["Someone opened the door.","खुला हुआ था describes a state, not the act of opening."], ["The door was shut.","खुला is “open”."]]),
  meaning("mn:6", "माँ ने बाज़ार से सब्ज़ी मँगवाई ।", "Mother had vegetables fetched from the market.", [["Mother went to the market to buy vegetables.","मँगवाई is causative: someone else fetched them."], ["Mother sold vegetables at the market.","मँगवाना is “to order, have fetched”."]])
];

const usage = [
  mc("us:0", "In जली हुई गाड़ी, what does हुई add?", "It stresses the completed state", [["It makes the phrase passive","The passive is participle + जाना."], ["It turns the phrase into a question","हुई confirms the state: “a burned car”."]], ADJ),
  mc("us:1", "Used as an adverb (हँसते हुए, लिए हुए), the participle ends in …", "-e, invariable", [["-ī, always","-ī is feminine, used when the participle agrees as an adjective."], ["-ā, like the perfective","As an adverb the book's form is invariable -e."]], ADV),
  mc("us:2", "What does an imperfective participle + ही mean (आते ही)?", "as soon as", [["while, at the time of","That is the participle + समय or वक़्त."], ["without","“Without” is बिना + perfective participle in -e."]], HI),
  mc("us:3", "To say “it's a year since he left”, Hindi uses …", "the perfective participle, with the time as subject", [["the imperfective participle","The imperfective is for a situation still going on: रहते हुए एक साल हुआ."], ["the infinitive + से","That isn't how time since is shown in this unit."]], SINCE),
  mc("us:4", "Causative verbs such as बनवाना and लिखवाना contain …", "-vā- before -nā", [["-ā- before -nā","That makes a transitive, such as बनाना."], ["a lengthened first syllable","That makes some transitives, such as मारना from मरना."]], CAUS),
  mc("us:5", "In मैंने भाई से चिट्ठी लिखवाई, who wrote the letter?", "the brother", [["I did","I had it written. भाई से marks the one who wrote it."], ["nobody: it's a request","लिखवाई is a past act: the letter was written."]], CAUS),
  mc("us:6", "What does मेरे उठाए भी वह नहीं उठा mean?", "He didn't get up, though I tried to get him up", [["He didn't get up, so I didn't lift him","मेरे उठाए is “my getting (him) up”, a failed attempt."], ["I didn't get up when he tried to wake me","वह is the one who didn't get up."]], POSS)
];

const unit = {
  id: "unit18", n: 18, title: "A love that won't be stopped", titleHi: "ऐसा प्यार जो रोके भी नहीं रुकता",
  scope: "Participles: imperfective and perfective participles as adjectives, agreeing, with optional हुआ for an ongoing or completed state (रोती हुई लड़की, टूटा हुआ प्याला); state vs event (टूटी हुई थी / टूट गई थी); adverbial participles in invariable -e (हँसते हुए, लिए हुए); repeated participles for repeated or parallel action (चलते चलते); गिरते गिरते बचना; -ते समय, -ते ही (possessed: माँ के आते ही); time since an event (गए हुए एक घंटा हुआ) and since a situation began (रहते हुए एक साल हुआ); बिना + -e; possessed participles (माँ का बनाया, आपके रहते, मेरे उठाए भी … नहीं उठा); intransitive and transitive pairs (बचना/बचाना, सोना/सुलाना, मरना/मारना, लदना/लादना, दिखना/दिखाना, खाना/खिलाना, टूटना/तोड़ना/तुड़ाना); causatives in -vā- with से for the agent",
  pages: "book 234–256",
  skills: {part: "Participles", adv: "Participles: while, as soon as", since: "Since, possessed participles", trans: "Transitive pairs", caus: "Causatives", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अधेड़","middle-aged","a"],["अनुवाद","translation","n","m"],["अर्ज़ी","application","n","f"],["आकाश","sky","n","m"],["आत्मीयता से","cordially","x"],
    ["आश्चर्य","surprise","n","m"],["आश्चर्यजनक","astonishing","a"],["इकलौता","sole, only (child)","a"],["इश्क़","romantic love","n","m"],["इश्क़ लड़ाना","to have an affair","v"],
    ["इस्त्री","clothes iron; ironing","n","f"],["उड़ाना","to make fly; to indulge","v"],["ऊबना","to be bored","v"],["एकाध","one or two, a couple (of)","a"],["कथक","kathak (dance style)","n","m"],
    ["क़दम","step, pace","n","m"],["कमाल","miracle, wonder","n","m"],["कमी","lack, want","n","f"],["क़सम","oath","n","f"],["कहलवाना","to send word","v"],
    ["कान","ear","n","m"],["ख़ुदा","God","n","m"],["ख़ुदा की क़सम","by God","x"],["खुला","open","a"],["गला","throat, neck","n","m"],
    ["गले लगाना","to embrace","v"],["गिरना","to fall","v"],["गोद","lap, embrace","n","f"],["घास","grass","n","f"],["घुमाना","to make go round, show round","v"],
    ["चुनना","to choose","v"],["छुटभैया","a nobody","n","m"],["छेड़ना","to stir up, start up","v"],["छोकरी","young girl, lass","n","f"],["जनाब","sir","x"],
    ["जाना-पहचाना","recognized, known","a"],["ज़ाहिर","clear, evident","a"],["ज़िद","obstinacy","n","f"],["झट से","suddenly, briskly","x"],["झाड़ना","to spout, pour out","v"],
    ["झूमना","to sway (in pleasure)","v"],["टकराना","to collide","v"],["टपकना","to drop in, appear unexpectedly","v"],["टहलना","to stroll","v"],["तंग आना","to be fed up","v"],
    ["तलाक़-शुदा","divorced","a"],["तुड़ाना","to cause to be broken","v"],["तुलना","to be determined (to, पर)","v"],["तेज़","quick, rapid","a"],["थामना","to hold, support","v"],
    ["दया","compassion","n","f"],["दर्ज़ी","tailor","n","m"],["दास्तान","tale","n","f"],["दिलवाना","to cause to be given","v"],["दीखना","to appear, be visible, seem","v"],
    ["धंधा","work, occupation","n","m"],["धूमधाम","pomp, show","n","m"],["न कि","and not","x"],["नरसों","three days ago/ahead","x"],
    ["नर्तक","dancer","n","m"],["नाच","dance","n","m"],["नाच नचाना","to lead (someone) a fine dance","v"],["नृत्य","dance (formal)","n","m"],["नेक","good, virtuous, decent","a"],
    ["पतंग","kite (toy)","n","f"],["परिस्थिति","circumstance","n","f"],["पवन","wind","n","m"],["पहुँचाना","to convey, deliver","v"],["पारिवारिक","familial","a"],
    ["पैदा होना","to be born, produced","v"],["प्रतीत होना","to appear, seem","v"],["प्रधान मंत्री","prime minister","n","m"],["फिरना","to turn, move","v"],["फ़िलहाल","in the meantime","x"],
    ["बचना","to escape, survive","v"],["बचाना","to rescue, save","v"],["बसना","to dwell, settle","v"],["बसाना","to settle, found","v"],["बस्ती","settlement, slum","n","f"],
    ["बात काटना","to interrupt","v"],["बीतना","to pass (of time)","v"],["बेचैन","restless","a"],["बैठक","sitting room","n","f"],["मरम्मत","repair","n","f"],
    ["की मरम्मत करना","to repair, set right","v"],["मस्त","blithely joyful, delighted","a"],["मापना","to measure, cover","v"],["मुस्कराना","to smile","v"],["मूल","origin","n","m"],
    ["यानी","that is to say","x"],["राय","opinion","n","f"],["रेशम","silk","n","m"],["लखपति","rich man, ‘millionaire’","n","m"],["लगाना","to apply, affix","v"],
    ["लदना","to be loaded","v"],["लाजवाब","beyond compare","a"],["लिटाना","to make lie down","v"],["लेटना","to lie, recline","v"],["लोट-पोट","rolling, helpless (with laughter)","a"],
    ["वर्णन","description","n","m"],["का वर्णन करना","to describe","v"],["विस्तार से","at length, in detail","x"],["वेतन","pay, salary","n","m"],["शंका","doubt, suspicion","n","f"],
    ["शख़्स","individual, fellow","n","m"],["शर्म","shame","n","f"],["शर्म आना","to feel ashamed","v"],["श्रावण","Shravan (monsoon month)","n","m"],["सदस्य","member","n","m"],
    ["समझाना","to explain; to console","v"],["सलवार क़मीज़","salwar qameez","n","f"],["साँस","breath, sigh","n","f"],["ठंडी साँस भरना","to heave a deep sigh","v"],["सितारा","star","n","m"],
    ["सिलवाना","to cause to be sewn","v"],["सिलसिला","connection","n","m"],["के सिलसिले में","in connection with","x"],["सुलाना","to make sleep","v"],["सूझना","to occur to the mind","v"],
    ["स्थायी रूप से","permanently","x"],["स्वभाव","nature, disposition","n","m"],["स्वीकार करना","to accept","v"],["हँसी-मज़ाक","laughter, fun, joking","n","m"],["हाथ मिलाना","to join hands","v"],
    ["ह्विस्की","whisky","n","f"],["बनवाना","to have made, have built","v"],["लिखवाना","to have written","v"],["करवाना","to have done","v"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "part", title: "टूटा हुआ, बैठी हुई", desc: "Participles as adjectives and adverbs", skill: "part", items: part},
    {id: "adv", title: "आते ही, जाते समय", desc: "Repeated participles, “while”, “as soon as”, “without”", skill: "adv", items: adv},
    {id: "since", title: "गए हुए, आपके रहते", desc: "Time since, possessed participles", skill: "since", items: since},
    {id: "trans", title: "बचना और बचाना", desc: "Intransitive and transitive pairs", skill: "trans", items: trans},
    {id: "caus", title: "बनवाना, लिखवाना", desc: "Causatives: getting something done", skill: "caus", items: caus},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Participles, transitives, causatives", skill: "usage", items: usage}
  ],
  test: {vocab: 4, part: 3, adv: 3, since: 2, trans: 3, caus: 3, build: 2, meaning: 1, usage: 1},
  _grammar: [
    {id: "participles-adj-adv", title: "Participles: imperfective (बीतता) and perfective (बीता) as adjectives, agreeing with the noun, with optional हुआ confirming an ongoing or completed state (रोती हुई लड़की, जली हुई कार, टूटा हुआ, बैठी हुई, पड़े हुए); टूटा हुआ था (state) vs टूट गया था (event); खड़ा behaves like बैठा and पड़ा; as adverbs in invariable -e (उड़ते हुए दिखाई दी, पकड़े हुए खड़ी थीं, लिए हुए आया, पहने हुए थी); with verbs of perception (तारीफ़ करते सुना)"},
    {id: "participle-constructions", title: "Participle constructions: repeated participle in -e for repeated or parallel action or “just as” (खेलते खेलते थक गए, देखते देखते, पहुँचते पहुँचते); repeated -e + बचना for a narrow escape (गिरते गिरते बचा); -ते समय/वक़्त “while”; -ते ही “as soon as”, possessed with two subjects (ख़त के आते ही); time since a completed event with the perfective participle and the time as subject (मरे हुए एक महीना हुआ है); time since a current situation began with the imperfective (सीखते हुए आठ महीने हुए हैं); बिना + perfective in -e “without” (बिना बोले, बिना सोचे); possessed participles (मेरा कहा, मेरा लिखा हुआ, रवि के रहते, मेरे जीते जी); possessed transitive + intransitive for a failed attempt (हमारे बचाए वह नहीं बची)"},
    {id: "transitivity-2", title: "Intransitive and transitive pairs: lengthened stem (बनना/बनाना, उठना/उठाना, पहुँचना/पहुँचाना, बचना/बचाना, लगना/लगाना, समझना/समझाना), lengthened non-final syllable (कटना/काटना, निकलना/निकालना, मरना/मारना, लदना/लादना), first-syllable change (घूमना/घुमाना, लेटना/लिटाना, बैठना/बिठाना, सोना/सुलाना), vowel change (धुलना/धोना, टूटना/तोड़ना, बिकना/बेचना, दीखना/देखना); second transitives (खाना/खिलाना, बोलना/बुलाना, देखना/दिखाना, सुनना/सुनाना); three-way series (टूटना/तोड़ना/तुड़ाना, दिखना/देखना/दिखाना)"},
    {id: "causatives", title: "Causative verbs in -vā-: लिखवाना “cause to be written”, बनवाना, सिखवाना, सिलवाना, करवाना, बुलवाना, कहलवाना, दिलवाना; the person who does the work takes से (दर्ज़ी से कुरते सिलवाने हैं)"}
  ]
};

writeUnit(18, unit, {forms, fake});
