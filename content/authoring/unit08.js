"use strict";
// Unit 8 (book pp. 90–103): अरुण जी लखनऊ में क्या कर रहे हैं ? Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 101–102, Quick Vocab pp. 91 and 94–95, and words from the grammar sections)
  "अगला":"aglā","अठारह":"aṭhārah","अस्पताल":"aspatāl","आँख":"ā̃kh","आगरा":"āgrā","आजकल":"ājkal","आम":"ām","तौर":"taur","ऐश":"aiś",
  "कमाना":"kamānā","कलकत्ता":"kalkattā","कहानी":"kahānī","काठमांडु":"kāṭhmāṇḍu","ग़ल्त":"galt","गली":"galī","घंटा":"ghaṇṭā","चलाना":"calānā",
  "जन्मदिन":"janmdin","जून":"jūn","ज़ोर":"zor","डाल":"ḍāl","तंग":"tang","तकलीफ़":"taklīf","तारीख़":"tārīkh","ताली":"tālī","तू-तू":"tū-tū","मैं-मैं":"maĩ-maĩ",
  "थकान":"thakān","थाली":"thālī","थोड़ा-सा":"thoṛā-sā","दल":"dal","दाहिना":"dāhinā","दिखना":"dikhnā","दिली":"dilī","नंबर":"nambar","निकलना":"nikalnā",
  "नेपाल":"nepāl","पल":"pal","पहर":"pahar","पिछला":"pichlā","पुस्तक":"pustak","पूरा":"pūrā","प्रोग्राम":"progrām","फ़रवरी":"farvarī","बनाना":"banānā",
  "बायाँ":"bāyā̃","भगवान":"bhagvān","भेजना":"bhejnā","मई":"maī","महीना":"mahīnā","मिलाना":"milānā","मोड़":"moṛ","मोर":"mor","विलंब":"vilamb",
  "सन्":"san","सब्ज़ी":"sabzī","सवेरा":"saverā","सावधानी":"sāvdhānī","सिर":"sir","सीधा":"sīdhā","सीधे":"sīdhe","सीधी":"sīdhī","सारी":"sārī","चला":"calā","सैंतालीस":"saĩtālīs","हाथ":"hāth","हे":"he",
  // the continuous (8.1)
  "रहा":"rahā","रही":"rahī","रहे":"rahe",
  // oblique adverbs and adverbial phrases (8.3)
  "दाहिने":"dāhine","बायें":"bāyẽ","सवेरे":"savere","अगले":"agle","पिछले":"pichle","महीने":"mahīne","सारे":"sāre","दिनों":"dinõ","कलकत्ते":"kalkatte",
  // forms produced by this or earlier units' rules
  "घंटे":"ghaṇṭe","हाथों":"hāthõ","कहानियाँ":"kahāniyā̃","औरतें":"auratẽ","चलाते":"calāte","चलाइए":"calāie",
  // verb stems used in the continuous (8.1)
  "बना":"banā","सोच":"soc","धो":"dho","खेल":"khel","हँस":"hãs","दिख":"dikh","भेज":"bhej"
};
const fake = {
  "रहीं":"rahī̃","पिछलें":"pichlẽ","महीनें":"mahīnẽ","सवेरें":"saverẽ","दिनें":"dinẽ","घंटें":"ghaṇṭẽ","हाथें":"hāthẽ","कहानियें":"kahāniyẽ",
  "एकवीं":"ekvī̃","दोवीं":"dovī̃","कलकत्तों":"kalkattõ","सीधें":"sīdhẽ"
};

const CONT = "The continuous is the verb stem + रहा, रही or रहे + the auxiliary: बोल रहा है “is speaking”, बोल रहा था “was speaking”.";
const OBL = "Phrases of time like this are oblique even though no postposition follows (a “ghostposition”).";
const KA = "Relatives, houses and parts of the body: X का, की, के … है, agreeing with what is possessed.";
const PAS = "Portable things, money and time: X के पास … है.";

const cont = [
  gap("cn:0", "माँ रसोईघर में चाय बना ___ हैं ।", "Mother[0] {is making}[4+5+6] tea[3] in[2] the kitchen[1].", "रही", [["रहा","रहा is masculine. माँ is a woman: बना रही हैं."], ["रहे","रहे is masculine plural. Respect makes a woman's auxiliary plural (हैं), but रही stays feminine."]], "रहा, रही, रहे agree with the subject like an -ā adjective; the auxiliary comes last."),
  gap("cn:1", "बच्चे बग़ीचे में खेल रहे ___ ।", "{The children}[0] {are playing}[3+4+5] in[2] the garden[1].", "हैं", [["है","है is singular. बच्चे is plural: खेल रहे हैं."], ["हो","हो goes only with तुम."]], "The auxiliary is the present of होना, agreeing with the subject: हूँ, है, हैं, हो."),
  gap("cn:2", "तुम क्या सोच ___ हो ?", "What[1] are[4] you[0] thinking[2+3]? (to a man)", "रहे", [["रहा","रहा is singular. तुम always takes plural agreement: सोच रहे हो."], ["रहते","रहते is the imperfective participle of रहना “to live, stay”. The continuous needs रहा, रही or रहे straight after the stem."]], "To a woman: तुम क्या सोच रही हो ?"),
  mc("cn:3", "Make it continuous (“is …ing”)", "राज अपनी साइकिल धो रहा है ।", [["राज अपनी साइकिल धोना रहा है ।","The continuous is built on the stem धो, not on the infinitive धोना."], ["राज अपनी साइकिल धो रहा हैं ।","हैं is plural. Raj, spoken of plainly, takes है."]], "Replace the participle धोता with the stem + रहा — धो रहा है.", {hi: "राज अपनी साइकिल धोता है ।", audio: true, say: "राज अपनी साइकिल धो रहा है ।", en: "Raj[0] {is washing}[3+4+5] {his (own)}[1] bicycle[2]."}),
  gap("cn:4", "मैं बच्चों के लिए ___ लिख रहा हूँ ।", "I[0] {am writing}[5+6+7] stories[4] for[2+3] the children[1]. (a man speaking)", "कहानियाँ", [["कहानी","कहानी is singular, “a story”. The English has “stories”."], ["कहानियें","Not a word: feminine nouns in -ī make the plural in -iyā̃, as in लड़कियाँ."]], "कहानी “story” is feminine: plural कहानियाँ."),
  gap("cn:5", "हलो, क्या पिंकी बोल ___ है ?", "Hello[0], is[5] that Pinki[2] speaking[3+4]?", "रही", [["रहा","रहा is masculine. Pinki is a girl."], ["रहे","रहे is plural. Pinki, spoken of plainly, takes the singular: बोल रही है."]], "On the phone the continuous identifies the speaker: मैं … बोल रहा हूँ (or रही हूँ) “this is … speaking”."),
  gap("cn:6", "आप आजकल क्या पढ़ ___ हैं ?", "What[2] are[5] you[0] reading[3+4] nowadays[1]? (to a man)", "रहे", [["रहा","रहा is singular. आप always takes plural agreement: पढ़ रहे हैं."], ["रही","रही is feminine. This is asked of a man."]], "The continuous also covers what is going on over a period, like English “these days I'm reading …”."),
  gap("cn:7", "हम लोग शनिवार को लखनऊ ___ रहे हैं ।", "We[0+1] {are going}[5+6+7] to Lucknow[4] on Saturday[2+3].", "जा", [["जाना","The continuous is built on the stem: जा रहे हैं, not on the infinitive जाना."], ["जाओ","जाओ is the तुम command. The continuous needs the bare stem: जा रहे हैं."]], "The continuous can refer to a planned event in the near future, as English “we are going on Saturday”."),
  gap("cn:8", "पिता जी अख़बार पढ़ रहे ___ ।", "Father[0+1] {is reading}[3+4+5] the newspaper[2].", "हैं", [["है","A respected person takes plural agreement: पिता जी … पढ़ रहे हैं."], ["हूँ","हूँ goes only with मैं."]], "Respect makes both रहे and the auxiliary plural."),
  mc("cn:9", "Which means “Raj isn't working today”?", "राज आज काम नहीं कर रहा है ।", [["राज आज काम नहीं करता है ।","करता है is the imperfective: “Raj doesn't work” as a habit. What is going on now needs the continuous, कर रहा है."], ["राज आज काम नहीं कर रही है ।","रही is feminine. Raj is a man."]], "नहीं goes before the verb: नहीं कर रहा है.")
];

const past = [
  gap("pc:0", "कल रात दस बजे मैं एक कहानी पढ़ ___ था ।", "{At ten o'clock}[2+3] {last night}[0+1] I[4] {was reading}[7+8+9] a[5] story[6]. (a man speaking)", "रहा", [["रही","रही is feminine. The speaker is a man."], ["रहे","रहे is plural. मैं takes the singular: पढ़ रहा था."]], "The past continuous is the stem + रहा, रही, रहे + था, थी, थे, थीं — “was …ing”."),
  gap("pc:1", "उस समय लड़कियाँ बाहर खेल रही ___ ।", "{At that time}[0+1] the girls[2] {were playing}[4+5+6] outside[3].", "थीं", [["थी","थी is singular. लड़कियाँ is plural."], ["थे","थे is masculine. लड़कियाँ is feminine."]], "Feminine plural: रही थीं. Only the auxiliary carries the plural nasal."),
  mc("pc:2", "Which means “The women were laughing”?", "औरतें हँस रही थीं ।", [["औरतें हँस रहीं थीं ।","With the auxiliary present only थीं carries the plural nasal: रही थीं, just as उठती थीं."], ["औरतें हँस रही थी ।","थी is singular. औरतें is plural: थीं."]], "रही is the same for feminine singular and plural; the auxiliary shows the number."),
  gap("pc:3", "पिछले साल मेरे भाई लखनऊ में काम कर रहे ___ ।", "{Last year}[0+1] my[2] brothers[3] {were working}[6+7+8+9] in[5] Lucknow[4].", "थे", [["था","था is singular. The English has “brothers”, and रहे is plural: रहे थे."], ["थीं","थीं is feminine. भाई is masculine."]], "रहे थे “were …ing” for a masculine plural subject."),
  mc("pc:4", "Put it in the past (“was …ing”)", "सीता अपनी सहेली के साथ गपशप कर रही थी ।", [["सीता अपनी सहेली के साथ गपशप कर रहा था ।","रहा is masculine. Only the auxiliary changes: रही है becomes रही थी."], ["सीता अपनी सहेली के साथ गपशप करती थी ।","करती थी is the past imperfective, “used to chat”. “Was chatting” keeps रही."]], "Replace है with थी. रही stays.", {hi: "सीता अपनी सहेली के साथ गपशप कर रही है ।", audio: true, say: "सीता अपनी सहेली के साथ गपशप कर रही थी ।", en: "Sita[0] {was chatting}[5+6+7+8] with[3+4] {her (own)}[1] friend[2]."}),
  gap("pc:5", "तुम कल शाम को कहाँ जा रही ___ ?", "Where[4] {were you}[0+7] going[5+6] {yesterday evening}[1+2+3]? (to a woman)", "थीं", [["थी","तुम always takes plural agreement: a woman is asked … जा रही थीं."], ["थे","थे is masculine. This is asked of a woman."]], "तुम with a woman: रही हो in the present, रही थीं in the past.")
];

const have = [
  gap("hv:0", "सीता ___ तीन बहिनें हैं ।", "Sita[0+1] has[4] three[2] sisters[3].", "की", [["का","का goes with a masculine singular noun. The possessive agrees with बहिनें, which is feminine: की."], ["को","को is used for ailments such as a cold or fever. For relatives, use का, की, के."]], KA),
  gap("hv:1", "मेरे चाचा जी ___ गाँव में एक बड़ा मकान है ।", "My[0] uncle[1+2] has[3+9] a[6] big[7] house[8] in[5] the village[4].", "का", [["की","की is feminine. The possessive agrees with मकान, which is masculine: का."], ["को","को is for ailments. For a house, use का, की, के."]], "The possessive agrees with the thing possessed, not with the owner: चाचा जी का मकान."),
  gap("hv:2", "क्या ___ पास गाड़ी है ?", "Do you[1] have[2+4] a car[3]?", "आपके", [["आपका","Before पास the possessive is oblique: आपके पास."], ["आप","के पास needs the possessive before it: आपके पास."]], PAS),
  gap("hv:3", "मेरे पति ___ कल से बुख़ार है ।", "My[0] husband[1+2] {has had}[6] a fever[5] since[4] yesterday[3].", "को", [["का","का, की, के are for relatives, houses and parts of the body. Ailments take को."], ["की","की is for relatives and the like, and बुख़ार is masculine anyway. Ailments take को."]], "Ailments: X को बुख़ार है, X को ज़ुकाम है."),
  gap("hv:4", "उस औरत ___ चार बेटे हैं ।", "That[0] woman[1+2] has[5] four[3] sons[4].", "के", [["की","The possessive agrees with बेटे (masculine plural), not with the woman: के."], ["को","को is for ailments. For relatives, use का, की, के."]], KA),
  gap("hv:5", "___ एक छोटी बहिन है ।", "I[0] have[4] a[1] younger[2] sister[3].", "मेरी", [["मेरे पास","के पास is for portable things, money and time. For a relative, use the possessive: मेरी."], ["मेरा","मेरा is masculine. It agrees with बहिन, which is feminine: मेरी."]], "With pronouns the possessive (मेरा, तुम्हारा …) stands in for X का — मेरी एक बहिन है “I have a sister”."),
  gap("hv:6", "मेरे पास सिर्फ़ दो ___ हैं ।", "I[0] have[1+5] only[2] two[3] hours[4].", "घंटे", [["घंटा","घंटा is singular. With दो it is plural: घंटे."], ["घंटें","Not a word: masculine nouns in -ā make the plural in -e, with no nasal."]], "Time is possessed with के पास — मेरे पास समय है."),
  gap("hv:7", "इस मूर्ति के चार ___ हैं ।", "This[0] statue[1] has[2+5] four[3] hands[4].", "हाथ", [["हाथें","Not a word: masculine nouns that don't end in -ā are the same in the plural: चार हाथ."], ["हाथों","हाथों is the oblique plural, used before a postposition. Here the hands are the subject."]], "Parts of the body: के agrees with हाथ (masculine plural), whatever the gender of मूर्ति."),
  mc("hv:8", "Put it in the past", "मेरे पास एक पुरानी गाड़ी थी ।", [["मेरे पास एक पुरानी गाड़ी था ।","The verb agrees with गाड़ी, which is feminine: थी."], ["मेरी पास एक पुरानी गाड़ी थी ।","के पास never changes: मेरे पास, whatever is possessed."]], "In the के पास construction the thing possessed is the subject.", {hi: "मेरे पास एक पुरानी गाड़ी है ।", audio: true, say: "मेरे पास एक पुरानी गाड़ी थी ।", en: "I[0] had[1+5] an[2] old[3] car[4]."}),
  mc("hv:9", "Which means “Do you have a pen?” (to तुम)", "क्या तुम्हारे पास क़लम है ?", [["क्या तुम्हें क़लम है ?","The को construction (तुम्हें = तुम को) is for ailments. A pen is a portable thing: के पास."], ["क्या तुम्हारी पास क़लम है ?","के पास never changes, whatever is possessed: तुम्हारे पास."]], PAS)
];

const adv = [
  gap("ad:0", "___ साल हम लंदन में थे ।", "{Last year}[0+1] we[2] were[5] in[4] London[3].", "पिछले", [["पिछला","The phrase is oblique: पिछले साल."], ["अगले","अगले साल means “next year”."], ["पिछलें","Not a word: the oblique of पिछला is पिछले, with no nasal."]], OBL),
  gap("ad:1", "अगले ___ मेरे दोस्त लंदन से आ रहे हैं ।", "My[2] friends[3] {are coming}[6+7+8] from[5] London[4] next[0] month[1].", "महीने", [["महीना","The time phrase is oblique, so महीना becomes महीने."], ["महीनें","Not a word: the oblique of महीना is महीने, with no nasal."]], OBL),
  gap("ad:2", "मैं ___ उठता हूँ ।", "I[0] {get up}[2+3] {early in the morning}[1]. (a man speaking)", "सवेरे", [["सवेरा","सवेरा is the noun “early morning”. As an adverb it is oblique: सवेरे."], ["सवेरें","Not a word: the oblique of सवेरा is सवेरे."]], OBL),
  gap("ad:3", "उन ___ यहाँ बिजली नहीं थी ।", "{In those days}[0+1] {there was}[5] no[4] electricity[3] here[2].", "दिनों", [["दिन","With उन the phrase is oblique plural: उन दिनों."], ["दिनें","Not a word: दिन has no plural in -ẽ. The oblique plural is दिनों."]], OBL),
  gap("ad:4", "आप ___ समय दफ़्तर जाते हैं ?", "{At what}[1] time[2] do[5] you[0] go[4] {to the office}[3]?", "किस", [["कौन","कौन is direct. The phrase is oblique: किस समय."], ["क्या","क्या does not go before a noun to mean “which, what”. The oblique of कौन gives किस समय."]], OBL),
  gap("ad:5", "मेरा भाई ___ दिन सोता है ।", "My[0] brother[1] sleeps[4+5] {the whole}[2] day[3].", "सारे", [["हर","हर दिन means “every day”. “The whole day” is सारे दिन, oblique."], ["सारी","सारी is feminine. दिन is masculine."]], OBL),
  gap("ad:6", "मैं ___ पहर थोड़ा आराम करता हूँ ।", "I[0] rest[4+5+6] {a little}[3] {in the afternoon}[1+2]. (a man speaking)", "तीसरे", [["तीसरा","The phrase is oblique: तीसरे पहर."], ["तीन","तीसरे पहर, “in the third watch”, is the afternoon. तीन पहर would be “three watches”."]], OBL),
  gap("ad:7", "___ शाम हम सिनेमा जा रहे हैं ।", "{This evening}[0+1] we[2] {are going}[4+5+6] to the cinema[3].", "आज", [["इस","“This evening” is आज शाम — इस and यह are not used here."], ["यह","“This evening” is आज शाम — यह and इस are not used here."]], "आज शाम “this evening”, आज सुबह “this morning”."),
  mc("ad:8", "Why is it कलकत्ते in मेरे चाचा जी कलकत्ते जा रहे हैं ?", "The destination of a verb of motion is usually oblique, as if a postposition were there", [["Because चाचा जी is plural","रहे हैं is plural for respect, but that has nothing to do with the place name."], ["Because the sentence is in the continuous","The tense makes no difference: वह कलकत्ते जाता है too."]], "Compare सीता अपने दफ़्तर जा रही है, where अपने shows the oblique."),
  gap("ad:9", "मोहन का घर इस ___ है ।", "Mohan's[0+1] house[2] is[5] {in this direction}[3+4].", "तरफ़", [["तरह","तरह means “way, manner”. “Direction” is तरफ़."], ["समय","समय means “time”."]], "इस तरफ़ “in this direction” is oblique, like the time phrases.")
];

const manner = [
  gap("mr:0", "वह ___ से बोल रहा है ।", "He[0] {is speaking}[3+4+5] loudly[1+2].", "ज़ोर", [["ध्यान","ध्यान से means “attentively”."], ["देर","देर से means “late”."]], "ज़ोर “force” + से = “forcefully, loudly”."),
  gap("mr:1", "हम बस ___ स्कूल जाते हैं ।", "We[0] go[4+5] {to school}[3] by[2] bus[1].", "से", [["पर","Means of transport take से — बस से “by bus”."], ["का","का links two nouns (“the bus's …”). “By bus” is बस से."]], "से forms adverbial phrases: बस से, हाथ से, देर से."),
  gap("mr:2", "राज हमेशा ___ समय पर आता है ।", "Raj[0] always[1] comes[5+6] punctually[2+3+4].", "ठीक", [["ग़ल्त","ग़ल्त समय पर would be “at the wrong time”."], ["किस","किस समय asks “at what time?”."]], "ठीक समय पर “punctually” is formed with पर."),
  gap("mr:3", "सीता हिन्दी बहुत अच्छी ___ बोलती है ।", "Sita[0] speaks[5+6] Hindi[1] {very well}[2+3+4].", "तरह", [["तरफ़","तरफ़ means “direction”. “Well” is अच्छी तरह, “in a good manner”."], ["समय","अच्छा समय would be “a good time”. “Well” is अच्छी तरह."]], "अच्छी agrees with तरह (f); से may follow: अच्छी तरह से."),
  gap("mr:4", "___ तौर पर मैं सुबह चाय पीता हूँ ।", "Usually[0+1+2] I[3] drink[6+7] tea[5] {in the morning}[4]. (a man speaking)", "आम", [["ख़ास","ख़ास तौर पर means “specially”."], ["ठीक","ठीक goes with तरह or से, “properly”. “Usually” is आम तौर पर."]], "आम “ordinary” + तौर पर = “usually”."),
  gap("mr:5", "मेरा दफ़्तर ___ है ।", "My[0] office[1] is[3] upstairs[2].", "ऊपर", [["नीचे","नीचे means “downstairs, below”."], ["के ऊपर","के ऊपर “on top of” needs a noun before it. On its own, ऊपर is an adverb: “upstairs”."]], "The second part of a compound postposition can stand alone as an adverb: ऊपर, नीचे, बाहर, अंदर."),
  gap("mr:6", "आप ___ जाइए ।", "{Please go}[0+2] straight[1].", "सीधे", [["सीधी","सीधी is the feminine adjective “straight”. The adverb ends in -e: सीधे."], ["सीधें","Not a word: the adverb is सीधे, with no nasal."]], "Some adverbs in -e pair with adjectives: कैसा and कैसे, सीधा and सीधे, बायाँ and बायें."),
  gap("mr:7", "आप दफ़्तर ___ जाते हैं ?", "How[2] do[4] you[0] go[3] {to the office}[1]?", "कैसे", [["कैसा","कैसा is the adjective “what kind of?”. “How?” is the adverb कैसे."], ["कैसी","कैसी is the feminine adjective. “How?” is the adverb कैसे."]], "कैसे “how?” does not change."),
  gap("mr:8", "आप ___ से गाड़ी चलाइए ।", "Please[0] drive[4] {the car}[3] carefully[1+2].", "सावधानी", [["ज़ोर","ज़ोर से means “forcefully”."], ["देर","देर से means “late”."]], "सावधानी “care” + से = “carefully”.")
];

const date = [
  gap("dt:0", "मेरी बेटी ___ मार्च को आ रही है ।", "My[0] daughter[1] {is coming}[5+6+7] on[4] {the first}[2] of March[3].", "पहली", [["पहला","पहला is masculine. A date agrees with the understood feminine तारीख़ “date”: पहली."], ["एकवीं","Not a word. The first and second of the month use the ordinals पहली and दूसरी."]], "The first and second of the month are पहली and दूसरी. After that, the plain number."),
  gap("dt:1", "हमारी छुट्टी ___ जून को शुरू होती है ।", "Our[0] holiday[1] starts[5+6+7] on[4] {the fifth}[2] of June[3].", "पाँच", [["पाँचवीं","From the third onwards dates use the plain number: पाँच जून."], ["पाँचवाँ","From the third onwards dates use the plain number, and पाँचवाँ is masculine anyway."]], "तीन मार्च, पाँच जून, but पहली and दूसरी."),
  gap("dt:2", "कल ___ फ़रवरी थी ।", "Yesterday[0] was[3] {the second}[1] of February[2].", "दूसरी", [["दूसरा","A date agrees with the feminine तारीख़ — दूसरी."], ["दोवीं","Not a word. “Second” is दूसरी."]], "थी agrees with the date, too."),
  mc("dt:3", "How is the year 1916 said?", "सन् उन्नीस सौ सोलह", [["सन् उन्नीस सौ और सोलह","No word for “and” comes between the hundreds and the rest."], ["सन् सोलह सौ उन्नीस","That is 1619: the hundreds come first, उन्नीस सौ “nineteen hundred”."]], "Years are said in hundreds after सन् “year (of the era)”."),
  gap("dt:4", "हम सन् दो ___ नौ में लंदन में रहते थे ।", "{In 2009}[1+2+3+4+5] we[0] {used to live}[8+9] in[7] London[6].", "हज़ार", [["सौ","दो सौ नौ is 209."], ["हज़ारों","हज़ारों is “thousands of”."]], "दो हज़ार नौ “two thousand nine”."),
  mc("dt:5", "In पहली मई “1st May”, what does पहली agree with?", "The understood feminine noun तारीख़ “date”", [["The month मई","Masculine months take it too: पहली जून. पहली agrees with the understood तारीख़."], ["Nothing: पहली never changes","पहला is an ordinary ordinal that agrees; dates take the feminine because of तारीख़."]], "पहली तारीख़ “the first date” → पहली.")
];

const build = [
  tiles("tl:0", "My[0] brother[1] {is washing}[4+5+6] {his (own)}[2] car[3].", ["मेरा","भाई","अपनी","गाड़ी","धो","रहा","है"], [["रही","रही is feminine. भाई is masculine: धो रहा है."], ["धोता","धोता है is the imperfective, “washes” as a habit. “Is washing” needs the stem धो + रहा."]]),
  tiles("tl:1", "{The children}[0] {were playing}[2+3+4] outside[1].", ["बच्चे","बाहर","खेल","रहे","थे"], [["रही","रही is feminine. बच्चे is masculine."], ["था","था is singular. बच्चे is plural: रहे थे."]]),
  tiles("tl:2", "Pinki[0] {is writing}[6+7+8] a[4] letter[5] in[3] {her (own)}[1] room[2].", ["पिंकी","अपने","कमरे","में","एक","चिट्ठी","लिख","रही","है"], [["उसके","उसके would be someone else's room. For the subject's own room, use अपने."], ["कमरा","Before में the noun is oblique: कमरे."]], {alt: [["अपने","कमरे","में","पिंकी","एक","चिट्ठी","लिख","रही","है"], ["पिंकी","एक","चिट्ठी","अपने","कमरे","में","लिख","रही","है"]]}),
  tiles("tl:3", "My[0] neighbour[1+2] has[5] two[3] daughters[4].", ["मेरे","पड़ोसी","की","दो","बेटियाँ","हैं"], [["का","का is masculine. The possessive agrees with बेटियाँ, which is feminine: की."], ["को","को is for ailments. For relatives, use का, की, के."]]),
  tiles("tl:4", "Mohan[0] has[1+2+6] a[3] new[4] bicycle[5].", ["मोहन","के","पास","एक","नई","साइकिल","है"], [["नया","नया is masculine. साइकिल is feminine."], ["को","को is for ailments. A bicycle is a portable thing: के पास."]]),
  tiles("tl:5", "My[0] grandmother[1+2] {has had}[3+7] a cold[6] since[5] Monday[4].", ["मेरी","दादी","जी","को","सोमवार","से","ज़ुकाम","है"], [["की","Ailments take को — दादी जी को ज़ुकाम है."], ["हैं","The verb agrees with ज़ुकाम, which is singular: है. Respect for दादी जी does not affect it."]], {alt: [["सोमवार","से","मेरी","दादी","जी","को","ज़ुकाम","है"]]}),
  tiles("tl:6", "{Next month}[0+1] my[2] uncle[3+4] {is going}[6+7+8] to Calcutta[5].", ["अगले","महीने","मेरे","चाचा","जी","कलकत्ते","जा","रहे","हैं"], [["अगला","The time phrase is oblique: अगले महीने."], ["कलकत्तों","Not a word. The destination is oblique singular: कलकत्ते."]], {alt: [["मेरे","चाचा","जी","अगले","महीने","कलकत्ते","जा","रहे","हैं"]]}),
  tiles("tl:7", "{Listen to}[4] this[0] story[1] carefully[2+3]. (to तुम)", ["यह","कहानी","ध्यान","से","सुनो"], [["इस","इस is oblique, used before a postposition. यह कहानी is the object, with no postposition: यह."], ["सुनिए","सुनिए is the आप command. This is said to तुम — सुनो."]], {alt: [["ध्यान","से","यह","कहानी","सुनो"]]}),
  tiles("tl:8", "{The children}[0] {get up}[2+3] {early in the morning}[1].", ["बच्चे","सवेरे","उठते","हैं"], [["सवेरा","सवेरा is the noun. As a time phrase it is oblique: सवेरे."], ["उठता","उठता is singular. बच्चे is plural."]], {alt: [["सवेरे","बच्चे","उठते","हैं"]]}),
  tiles("tl:9", "Our[0] new[1] programme[2] starts[6+7+8] on[5] {the first}[3] of February[4].", ["हमारा","नया","प्रोग्राम","पहली","फ़रवरी","को","शुरू","होता","है"], [["पहला","A date agrees with the feminine तारीख़ — पहली."], ["एकवीं","Not a word. The first of the month is पहली."]], {alt: [["पहली","फ़रवरी","को","हमारा","नया","प्रोग्राम","शुरू","होता","है"]]}),
  tiles("tl:10", "Usually[1+2+3] he[0] comes[7+8] home[6] late[4+5].", ["वह","आम","तौर","पर","देर","से","घर","आता","है"], [["आती","आती is feminine. The English says “he”."], ["ख़ास","ख़ास तौर पर means “specially”. “Usually” is आम तौर पर."]], {alt: [["आम","तौर","पर","वह","देर","से","घर","आता","है"], ["वह","आम","तौर","पर","घर","देर","से","आता","है"], ["आम","तौर","पर","वह","घर","देर","से","आता","है"]]}),
  tiles("tl:11", "{In those days}[0+1] we[2] lived[6+7] in[5] a[3] village[4].", ["उन","दिनों","हम","एक","गाँव","में","रहते","थे"], [["वे","वे is direct. Before दिनों the phrase is oblique: उन दिनों."], ["दिन","The phrase is oblique plural: उन दिनों."]], {alt: [["हम","उन","दिनों","एक","गाँव","में","रहते","थे"]]}),
  tiles("tl:12", "{Please sit}[0+2] inside[1].", ["आप","अंदर","बैठिए"], [["के","के अंदर needs a noun before it. On its own, अंदर is an adverb."], ["बैठो","बैठो is the तुम command. With आप, बैठिए."]])
];

const mean = [
  meaning("mn:0", "मेरी बहिन अगले महीने भारत आ रही है ।", "My sister is coming to India next month.", [["My sister came to India last month.","अगले महीने is “next month”, and आ रही है is not a past tense."], ["My sister comes to India every month.","A habit would be the imperfective, आती है. Here the continuous tells of a planned event."]]),
  meaning("mn:1", "मेरे पास थोड़ा-सा समय है ।", "I have a little time.", [["I have no time.","“No time” would need नहीं."], ["I have a lot of time.","“A lot” would be बहुत. थोड़ा-सा is “a little”."]]),
  meaning("mn:2", "उस समय पिता जी अख़बार पढ़ रहे थे ।", "At that time Father was reading the newspaper.", [["At that time Father used to read the newspaper.","“Used to read” would be the past imperfective, पढ़ते थे. पढ़ रहे थे is “was reading”."], ["Father is reading the newspaper now.","थे puts it in the past, and उस समय is “at that time”."]]),
  meaning("mn:3", "शर्मा जी की दो बेटियाँ हैं ।", "Mr Sharma has two daughters.", [["These are Mr Sharma's two daughters.","“These are” would need ये. With no subject pronoun, X की … हैं means “X has …”."], ["Mr Sharma has two sons.","बेटियाँ are daughters. Sons would be बेटे, with के."]]),
  meaning("mn:4", "मेरा छोटा भाई हमेशा मेरा सिर खाता है ।", "My little brother always pesters me.", [["My little brother always eats my food.","सिर is “head”, and सिर खाना is an idiom: “to pester”."], ["My little brother always hurts my head.","सिर खाना is an idiom meaning “to pester”."]]),
  meaning("mn:5", "माँ जी आज बीमार दिख रही हैं ।", "Mother looks ill today.", [["Mother is looking at a sick person today.","दिखना means “to appear, seem”. “To look at” is देखना."], ["Mother was ill today.","दिख रही हैं is present, and it says how she seems."]]),
  meaning("mn:6", "मेरे पति सावधानी से गाड़ी चलाते हैं ।", "My husband drives carefully.", [["My husband drives fast.","सावधानी से is “with care”, “carefully”."], ["My husband is driving carefully.","चलाते हैं is the imperfective, a habit. “Is driving” would be चला रहे हैं."]]),
  meaning("mn:7", "दूसरे दिन हम काठमांडु में थे ।", "The next day we were in Kathmandu.", [["On the second of the month we were in Kathmandu.","A date would be दूसरी, agreeing with तारीख़. दूसरे दिन is “the next day”."], ["For two days we were in Kathmandu.","“Two days” would be दो दिन. दूसरे दिन is “the next day”."]])
];

const usage = [
  mc("ru:0", "How is the continuous formed?", "Verb stem + रहा, रही or रहे + the auxiliary", [["Imperfective participle + रहा + the auxiliary","The participle (बोलता) is not used: it is the bare stem, बोल रहा है."], ["Infinitive + रहा + the auxiliary","The infinitive (बोलना) is not used: it is the bare stem, बोल रहा है."]], CONT),
  mc("ru:1", "Which construction says “X has …” for relatives, houses and parts of the body?", "X का, की, के …, agreeing with what is possessed", [["X के पास …","के पास is for portable things, money and time (and servants)."], ["X को …","को is for ailments, as in X को बुख़ार है."]], "Hindi has no verb “to have”: it uses होना with को, के पास or का."),
  mc("ru:2", "Which is the neutral word order?", "Subject, adverb, indirect object, direct object, verb", [["Subject, verb, direct object, indirect object","The verb comes at the end in Hindi."], ["Direct object, subject, adverb, verb","Putting the object first is possible for effect, but the neutral order starts with the subject."]], "The indirect object, with को, comes before the direct object. Changes from this order shift the emphasis."),
  mc("ru:3", "Which part is emphasised by its position?", "अपनी बहिन को, just before the verb", [["मोहन, the first word","The first place is the normal place for the subject. The position just before the verb often bears emphasis."], ["किताबें, the direct object","किताबें has moved away from the verb. It is अपनी बहिन को, now just before the verb, that bears the emphasis."]], "Neutral order would be मोहन अपनी बहिन को किताबें भेज रहा है.", {hi: "मोहन किताबें अपनी बहिन को भेज रहा है ।", audio: true, say: "मोहन किताबें अपनी बहिन को भेज रहा है ।", en: "Mohan[0] {is sending}[5+6+7] books[1] to[4] {his (own)}[2] sister[3]."}),
  mc("ru:4", "What does ऊपर mean with no noun and no के before it?", "It is an adverb: “up, upstairs”", [["It still means “on top of”, with a noun understood","On its own ऊपर has its own adverb sense: मेरा दफ़्तर ऊपर है “my office is upstairs”."], ["It cannot be used without के","The second part of a compound postposition is often used alone as an adverb."]], "के ऊपर “on top of”, ऊपर “up, upstairs”; likewise के नीचे and नीचे."),
  mc("ru:5", "Someone says आप बैठो. What is unusual about it?", "It pairs आप with the तुम command form", [["Nothing: बैठो is the आप command","The आप command is बैठिए, and बैठो belongs to तुम. The mix is heard as a friendly compromise."], ["आप is plural, so it should be बैठे","बैठे is not a command. The usual आप command is बैठिए."]], "Speakers often mix honorific levels in real speech."),
  mc("ru:6", "What does this word mean?", "branch (of a tree)", [["daal, lentils","That is दाल, with a dental d. डाल has the retroflex ḍ."], ["political party","That is दल, with a short vowel and a dental d."]], "Keep dental and retroflex consonants apart, as in दाल and डाल.", {hi: "डाल", audio: true}),
  mc("ru:7", "What does this word mean?", "peacock", [["turn, bend","That is मोड़, with a flapped ṛ at the end."], ["pearl","That is मोती."]], "मोर and मोड़ are a minimal pair.", {hi: "मोर", audio: true})
];

const unit = {
  id: "unit8", n: 8, title: "What is Arun doing in Lucknow?", titleHi: "अरुण जी लखनऊ में क्या कर रहे हैं ?",
  scope: "The present and past continuous (बोल रहा है, बोल रही थीं), including near-future and phone use; “to have” with को (ailments), के पास (things, money, time) and का/की/के (relatives, houses, body parts); oblique adverbial phrases (पिछले साल, उन दिनों, सवेरे, तीसरे पहर) and oblique destinations (कलकत्ते जाना); adverbs with से and पर (ज़ोर से, अच्छी तरह, आम तौर पर); postposition parts as adverbs (ऊपर, बाहर); कैसे, सीधे; dates (पहली, दूसरी, then cardinals; सन्); word order and emphasis; colloquial usage and minimal pairs",
  pages: "book 90–103",
  skills: {cont: "Present continuous", past: "Past continuous", have: "Expressing “to have”", adv: "Oblique adverbial phrases", manner: "Adverbs of manner and place", date: "Dates and years", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अंदर","inside, within (adverb)","x"],["अगला","next","a"],["अठारह","eighteen","x"],["अलग","separately","x"],["अस्पताल","hospital","n","m"],["आँख","eye","n","f"],
    ["आगरा","Agra","n","m"],["आजकल","nowadays","x"],["आम","ordinary","a"],["आम तौर पर","usually","x"],["ख़ास तौर पर","specially","x"],["ऊपर","up; upstairs","x"],
    ["ऐश","luxury","n","m"],["ऐश करना","to live a life of pleasure","v"],["कमाना","to earn","v"],["कलकत्ता","Calcutta","n","m"],["कहानी","story","n","f"],
    ["काठमांडु","Kathmandu","n","m"],["के पास","in (one's) possession","x"],["ग़ल्त","wrong, incorrect","a"],["गली","lane","n","f"],["घंटा","hour","n","m"],
    ["चलाना","to drive","v"],["जन्मदिन","birthday","n","m"],["जून","June","n","m"],["ज़ोर","force, strength","n","m"],["ज़ोर से","forcefully, loudly","x"],
    ["डाल","branch (of a tree)","n","f"],["तंग","narrow","a"],["तंग करना","to harass","v"],["तकलीफ़","trouble, distress","n","f"],["तरह","way, manner","n","f"],
    ["अच्छी तरह","well","x"],["बुरी तरह","badly","x"],["तारीख़","date","n","f"],["ताली","clapping","n","f"],["तू-तू मैं-मैं करना","to call names, trade insults","v"],
    ["तैयार करना","to prepare","v"],["थकान","tiredness","n","f"],["थाली","platter, plate of food","n","f"],["थोड़ा-सा","a little","x"],["दल","political party","n","m"],
    ["दाहिना","right (opposite of left)","a"],["दाहिने","to the right","x"],["दिखना","to appear, seem","v"],["दिली","of the heart, intimate","a"],["देर से","late","x"],
    ["नंबर","number","n","m"],["नज़दीक","nearby","x"],["निकलना","to come out, go out, emerge","v"],["नीचे","down; downstairs","x"],["नेपाल","Nepal","n","m"],
    ["पल","moment","n","m"],["पहर","watch (part of the day)","n","m"],["तीसरे पहर","in the afternoon","x"],["पिछला","last, previous","a"],["पुस्तक","book (formal word)","n","f"],
    ["पूरा","full, complete","a"],["प्रोग्राम","programme, plan","n","m"],["फ़रवरी","February","n","f"],["बनाना","to make","v"],["बायाँ","left (opposite of right)","a"],
    ["बायें","to the left","x"],["बस से","by bus","x"],["भगवान","God","n","m"],["भेजना","to send","v"],["मई","May","n","f"],["महीना","month","n","m"],
    ["मिलाना","to dial, phone","v"],["मोड़","turn, bend","n","m"],["मोर","peacock","n","m"],["विलंब","delay (formal)","n","m"],["सन्","year (of an era)","n","m"],
    ["सब्ज़ी","vegetable(s)","n","f"],["सवेरा","early morning","n","m"],["सवेरे","early in the morning","x"],["साथ","along, in company","x"],["सावधानी","care","n","f"],
    ["सावधानी से","carefully","x"],["सिर","head","n","m"],["सिर खाना","to pester","v"],["सीधा","straight, straightforward","a"],["सीधे","straight (ahead)","x"],
    ["सैंतालीस","forty-seven","x"],["हाथ","hand","n","m"],["हाथ से","by hand","x"],["हे","oh!","x"],
    ["अगले महीने","next month","x"],["पिछले साल","last year","x"],["दूसरे दिन","the next day","x"],["उन दिनों","in those days","x"],["सारे दिन","the whole day","x"],
    ["किस समय","at what time?","x"],["इस तरफ़","in this direction","x"],["आज शाम","this evening","x"],["ठीक समय पर","punctually","x"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "cont", title: "बोल रहा है", desc: "The present continuous: “is …ing”", skill: "cont", items: cont},
    {id: "past", title: "बोल रहा था", desc: "The past continuous: “was …ing”", skill: "past", items: past},
    {id: "have", title: "मेरे पास, मेरी बहिन", desc: "Saying “to have”: को, के पास, का", skill: "have", items: have},
    {id: "adv", title: "पिछले साल, उन दिनों", desc: "Oblique phrases of time and place", skill: "adv", items: adv},
    {id: "manner", title: "ज़ोर से, अच्छी तरह", desc: "Adverbs with से and पर; ऊपर, सीधे, कैसे", skill: "manner", items: manner},
    {id: "date", title: "पहली मई, सन्", desc: "Dates and years", skill: "date", items: date},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "The continuous, “to have”, word order, sounds", skill: "usage", items: usage}
  ],
  test: {vocab: 4, cont: 3, past: 2, have: 3, adv: 2, manner: 2, date: 1, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "continuous", title: "Continuous tenses: stem + रहा, रही, रहे + हूँ, है, हैं, हो (present) or था, थी, थे, थीं (past), “is …ing, was …ing” (बच्चे बाहर खेल रहे थे); feminine plural रही हैं, रही थीं"},
    {id: "continuous-uses", title: "The continuous for planned near-future events (हम शनिवार को लखनऊ जा रहे हैं) and for naming oneself on the phone (मैं … बोल रहा हूँ)"},
    {id: "to-have", title: "“To have”: X को for ailments (मेरे पति को बुख़ार है); X के पास for portable things, money, time, servants (मेरे पास दो घंटे हैं); X का, की, के for relatives, houses, parts of the body, agreeing with what is possessed (सीता की तीन बहिनें हैं); some speakers use के for relatives regardless"},
    {id: "oblique-adverbials", title: "Oblique adverbial phrases with no postposition: अगले महीने, पिछले साल, दूसरे दिन, उन दिनों, सारे दिन, सवेरे, तीसरे पहर, किस समय, इस तरफ़; the destination of a motion verb is usually oblique (कलकत्ते जाना); आज शाम, आज सुबह without इस"},
    {id: "se-par-adverbs", title: "Adverbial phrases with से and पर — बस से, हाथ से, देर से, ज़ोर से, ध्यान से, सावधानी से, अच्छी तरह (से), ठीक समय पर, आम तौर पर, ख़ास तौर पर"},
    {id: "postposition-adverbs", title: "The second part of a compound postposition used alone as an adverb (ऊपर, नीचे, बाहर, अंदर, साथ, सामने, नज़दीक, बाद); adverbs in -e paired with adjectives: कैसे, सीधे, दाहिने, बायें"},
    {id: "dates", title: "Dates: पहली and दूसरी (agreeing with तारीख़ f) for the 1st and 2nd, cardinals after that (पाँच जून); years with सन्, in hundreds and with no “and” (सन् उन्नीस सौ सोलह)"},
    {id: "word-order", title: "Neutral word order: subject, adverb, indirect object + को, direct object, verb; the position just before the verb often bears emphasis; afterthoughts may follow the verb"},
    {id: "colloquial", title: "Colloquial usage: यह and वह (वो) for plurals, आप with a तुम command, the “royal” हम; minimal pairs such as दाल and डाल, मोर and मोड़, ताली and थाली"}
  ]
};

writeUnit(8, unit, {forms, fake});
