"use strict";
// Unit 11 (book pp. 130–143): प्रताप वापस आया है. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 141–143, Quick Vocab pp. 130–131, 134, 137–138)
  "आनंद":"ānand","आवश्यकता":"āvaśyaktā","उँगली":"ũglī","उठाना":"uṭhānā","उधार":"udhār","उपहार":"upahār","कब":"kab",
  "क़ीमत":"qīmat","कैमरा":"kaimrā","खोलना":"kholnā","गंगा":"gangā","गिलास":"gilās","गीत":"gīt","गुज़ारना":"guzārnā",
  "घाट":"ghāṭ","घूमना":"ghūmnā","चोर":"cor","छूटना":"chūṭnā","जारी":"jārī","ज़ेवर":"zevar","ट्रेकिंग":"ṭreking",
  "तमाशा":"tamāśā","तिब्बती":"tibbatī","तोड़ना":"toṛnā","तोहफ़ा":"tohfā","दवा":"davā","दादा":"dādā","दुकानदार":"dukāndār",
  "दुर्घटना":"durghaṭnā","दोपहर":"dopahar","नाक":"nāk","नींद":"nī̃d","पच्चीस":"paccīs","पढ़ाई":"paṛhāī","परसों":"parsõ",
  "पहनना":"pahannā","पाठ":"pāṭh","पाना":"pānā","पेट":"peṭ","प्याला":"pyālā","प्रसिद्ध":"prasiddh","फ़िल्म":"film",
  "फ़िल्मी":"filmī","फ़ैक्स":"faiks","फ़ोटो":"foṭo","बजना":"bajnā","बाँह":"bā̃h","बीस":"bīs","बेचना":"becnā","भूत":"bhūt",
  "भेंट":"bhẽṭ","मजबूरी":"majbūrī","मज़ा":"mazā","मानना":"mānnā","माफ़":"māf","माफ़ी":"māfī","माँगना":"mā̃gnā","माली":"mālī",
  "मीठा":"mīṭhā","मुमकिन":"mumkin","रोना":"ronā","लाठी":"lāṭhī","शब्द":"śabd","शिकायत":"śikāyat","सुनाना":"sunānā",
  "नेपाली":"nepālī","रुपया":"rupayā","ने":"ne",
  // ने forms of pronouns (11.3)
  "मैंने":"maĩne","तूने":"tūne","इसने":"isne","उसने":"usne","हमने":"hamne","तुमने":"tumne","आपने":"āpne",
  "इन्होंने":"inhõne","उन्होंने":"unhõne","किसने":"kisne","किन्होंने":"kinhõne","किसीने":"kisīne",
  // perfective participles, intransitive (11.2)
  "उठा":"uṭhā","उठे":"uṭhe","उठी":"uṭhī","उठीं":"uṭhī̃",
  "आया":"āyā","आई":"āī","आईं":"āī̃","गया":"gayā","गए":"gae","गई":"gaī","गईं":"gaī̃","हुआ":"huā","हुए":"hue","हुई":"huī","हुईं":"huī̃",
  "पहुँचा":"pahũcā","पहुँची":"pahũcī","पहुँचीं":"pahũcī̃","लौटा":"lauṭā","लौटे":"lauṭe","लौटी":"lauṭī","लौटीं":"lauṭī̃",
  "रोया":"royā","रोई":"roī","मिला":"milā","मिली":"milī","मिलीं":"milī̃","लाया":"lāyā","लाई":"lāī",
  // perfective participles, transitive (11.3)
  "बेचे":"bece","बेची":"becī","बेचीं":"becī̃","गाया":"gāyā","गाई":"gāī","गाए":"gāe","भेजा":"bhejā","भेजी":"bhejī","भेजीं":"bhejī̃",
  "देखा":"dekhā","देखे":"dekhe","देखी":"dekhī","देखीं":"dekhī̃","बनाया":"banāyā","बनाई":"banāī","बनाईं":"banāī̃","उठाया":"uṭhāyā",
  "सुनाया":"sunāyā","सुनाई":"sunāī","सुनाए":"sunāe","कहा":"kahā","कही":"kahī","पहना":"pahnā","पहनी":"pahnī","पहनीं":"pahnī̃",
  "खोला":"kholā","खोली":"kholī","खोलीं":"kholī̃","तोड़ा":"toṛā","तोड़ी":"toṛī","बुलाया":"bulāyā","बुलाई":"bulāī","बुलाए":"bulāe",
  "चलाया":"calāyā","चलाईं":"calāī̃","पढ़ा":"paṛhā","पढ़ी":"paṛhī","सुना":"sunā","लिखा":"likhā","लिखी":"likhī",
  "समझा":"samjhā","समझी":"samjhī","समझे":"samjhe","ख़रीदी":"kharīdī","माँगी":"mā̃gī","रखे":"rakhe","खाया":"khāyā","सोया":"soyā","सोई":"soī","खाता":"khātā",
  "किया":"kiyā","किए":"kie","कीं":"kī̃","दिया":"diyā","दिए":"die","दी":"dī","दीं":"dī̃","लिया":"liyā","ली":"lī","लीं":"lī̃","पिया":"piyā","पीं":"pī̃",
  // forms produced by earlier units' rules
  "फ़िल्में":"filmẽ","कैमरे":"kaimre","पड़ोसियों":"paṛosiyõ","लेता":"letā","लेते":"lete","लेती":"letī","लेतीं":"letī̃",
  "लौटती":"lauṭtī","रखता":"rakhtā","रख":"rakh","पढ़ता":"paṛhtā","औरतों":"auratõ","देखते":"dekhte"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "खाआ":"khāā","लाआ":"lāā","आआ":"āā","रोआ":"roā","लेया":"leyā","देया":"deyā",
  "वहने":"vahne","वेने":"vene","यहने":"yahne","मुझने":"mujhne","कौनने":"kaunne"
};

const INTR = "Intransitive verbs agree with the subject in the perfective: stem + -ā, -e, -ī, -ī̃ (उठा, उठे, उठी, उठीं).";
const GLIDE = "After a vowel stem the masculine singular inserts -y- — आया, लाया, रोया. जाना and होना are irregular: गया, गए, गई, गईं and हुआ, हुए, हुई, हुईं.";
const NE = "Transitive verbs in the perfective take ने after the doer, and the verb agrees with the direct object, not with the doer.";
const KO = "When the object takes को, or there is no object, the verb with ने is masculine singular.";
const NASAL = "With an auxiliary, the feminine plural nasal goes only on the last word: उठी हैं, उठी थीं (the book's rule).";
const AUXS = "Perfective + है “has …”, + था “had …”, + होगा “will have, must have …”, + हो “may have …”. The auxiliary agrees like the participle.";
const IRRP = "करना, लेना, देना and पीना have irregular participles: किया, किए, की, कीं — लिया, लिए, ली, लीं — दिया, दिए, दी, दीं — पिया, पिए, पी, पीं.";
const PRON = "Before ने — मैंने, तूने, इसने, उसने, हमने, तुमने, आपने, इन्होंने, उन्होंने, किसने, किन्होंने, किसीने.";
const LANA = "लाना “to bring” is transitive but never takes ने — it agrees with its subject like आना.";
const DAT = "In मज़ा आना, आनंद आना and नींद आना the person takes को and आना agrees with मज़ा, आनंद or नींद.";

const intr = [
  gap("in:0", "सीता दो बजे स्टेशन ___ ।", "Sita[0] reached[4] the station[3] {at two o'clock}[1+2].", "पहुँची", [["पहुँचा","पहुँचा is masculine. Sita is a woman."], ["पहुँचीं","पहुँचीं is plural. Sita, spoken of plainly, takes the singular: पहुँची."]], INTR),
  gap("in:1", "मेरे दोस्त परसों लंदन से ___ ।", "My[0] friends[1] returned[5] from[4] London[3] {the day before yesterday}[2].", "लौटे", [["लौटा","लौटा is singular. मेरे दोस्त is plural."], ["लौटीं","लौटीं is feminine plural. मेरे दोस्त is masculine plural."]], INTR),
  gap("in:2", "पिंकी अपनी सहेली के साथ बाज़ार ___ ।", "Pinki[0] went[6] to the market[5] with[3+4] her[1] friend[2].", "गई", [["गया","गया is masculine. Pinki is a girl."], ["गईं","गईं is plural. Pinki, spoken of plainly, takes the singular: गई."]], GLIDE),
  gap("in:3", "कल शहर में एक दुर्घटना ___ ।", "An[3] accident[4] happened[5] in[2] the town[1] yesterday[0].", "हुई", [["हुआ","हुआ is masculine. दुर्घटना is feminine."], ["थी","थी “was” describes a state. An event that took place is हुआ, हुई “happened”."]], "होना has an irregular perfective: हुआ, हुए, हुई, हुईं — “happened”."),
  gap("in:4", "मेरे पिता जी आज सुबह ___ ।", "My[0] father[1] came[5] {this morning}[3+4].", "आए", [["आया","आया is singular. A father is spoken of with respect, in the plural: आए."], ["आआ","Not a word: after a vowel stem the masculine singular inserts -y- (आया), and the plural is आए."]], "पिता जी takes the respectful plural. "+GLIDE),
  gap("in:5", "क्या तुम कभी आगरा ___ हो ?", "Have[5] you[1] ever[2] been[4] to Agra[3]? (to a man)", "गए", [["गया","गया is singular. तुम takes the plural form: गए हो."], ["गई","गई is feminine. The cue is to a man."]], "Perfective + हो, है, हैं — “has, have …”. तुम takes the -e form."),
  gap("in:6", "माँ और दादी मंदिर ___ हैं ।", "Mother[0] and[1] Grandma[2] {have gone}[4+5] to the temple[3].", "गई", [["गईं","Here the auxiliary हैं carries the plural. "+NASAL], ["गए","गए is masculine. माँ and दादी are women."]], NASAL),
  gap("in:7", "छोटा बच्चा क्यों ___ ?", "Why[2] did the little[0] child[1] cry[3]? (a boy)", "रोया", [["रोआ","Not a word: after a vowel stem the masculine singular inserts -y- — रोया."], ["रोई","रोई is feminine. The child is a boy (छोटा बच्चा)."]], GLIDE),
  gap("in:8", "मैं कल तुम्हारे भाई से ___ ।", "I[0] met[5] your[2] brother[3+4] yesterday[1]. (a woman speaking)", "मिली", [["मिला","मिला is masculine. The speaker is a woman."], ["मिलीं","मिलीं is plural. मैं takes the singular."]], "मिलना “to meet” is intransitive: X से मिलना, and the verb agrees with the subject."),
  gap("in:9", "हमें मसूरी में बड़ा मज़ा ___ ।", "We[0] {had great fun}[3+4+5] in[2] Mussoorie[1].", "आया", [["आए","आए is plural, as if agreeing with हमें. The verb agrees with मज़ा, masculine singular."], ["आई","आई is feminine. मज़ा is masculine."]], DAT),
  gap("in:10", "दादी को दोपहर को नींद ___ ।", "Grandma[0+1] {felt sleepy}[4+5] {in the afternoon}[2+3].", "आई", [["आया","आया is masculine. नींद is feminine."], ["आईं","आईं is plural, as if agreeing with a respected दादी. आना agrees with नींद, one thing: आई."]], DAT),
  gap("in:11", "प्रताप बाज़ार से फल ___ ।", "Pratap[0] brought[4] fruit[3] from[2] the market[1].", "लाया", [["लाआ","Not a word: after a vowel stem the masculine singular inserts -y- — लाया."], ["लाई","लाई is feminine. Pratap is a man."]], LANA)
];

const ne = [
  gap("ne:0", "सीता ने अपनी दो पुरानी साड़ियाँ ___ ।", "Sita[0] sold[6] two[3] {of her}[2] old[4] saris[5].", "बेचीं", [["बेची","बेची is singular. साड़ियाँ is plural, so the verb takes the nasal: बेचीं."], ["बेचे","बेचे is masculine plural. साड़ियाँ is feminine."]], NE),
  gap("ne:1", "पिंकी ने एक फ़िल्मी गीत ___ ।", "Pinki[0] sang[5] a[2] film[3] song[4].", "गाया", [["गाई","गाई would agree with पिंकी. With ने the verb agrees with the object, गीत, which is masculine."], ["गाए","गाए is plural. Pinki sang one song."]], NE),
  gap("ne:2", "राज ने अपनी बहिन को एक साड़ी ___ ।", "Raj[0] sent[7] his[2] sister[3+4] a[5] sari[6].", "भेजी", [["भेजा","भेजा would agree with राज. With ने the verb agrees with साड़ी, feminine. बहिन को is the one it was sent to."], ["भेजीं","भेजीं is plural. Raj sent one sari."]], NE),
  gap("ne:3", "बच्चों ने शनिवार को दो फ़िल्में ___ ।", "{The children}[0] saw[6] two[4] films[5] on[3] Saturday[2].", "देखीं", [["देखे","देखे would agree with बच्चों. With ने the verb agrees with फ़िल्में, feminine plural."], ["देखी","देखी is singular. फ़िल्में is plural, so the verb takes the nasal."]], NE),
  gap("ne:4", "दुकानदार ने आज बहुत-से कैमरे बेचे ___ ।", "{The shopkeeper}[0] {has sold}[5+6] {a lot of}[3] cameras[4] today[2].", "हैं", [["है","है would agree with दुकानदार. With ने the auxiliary agrees with the object too: कैमरे is plural."], ["हो","हो goes with तुम."]], AUXS),
  gap("ne:5", "पिंकी ने सब के लिए चाय ___ ।", "Pinki[0] made[6] tea[5] for[3+4] everyone[2].", "बनाई", [["बनाया","बनाया is masculine. चाय is feminine."], ["बनाईं","बनाईं is plural. चाय is singular."]], NE),
  gap("ne:6", "पिंकी ने मेरा कैमरा उठाया ___ ।", "Pinki[0] {had picked up}[4+5] my[2] camera[3].", "था", [["थी","थी would agree with पिंकी. With ने the auxiliary agrees with कैमरा, masculine."], ["थे","थे is plural. कैमरा is singular."]], AUXS),
  gap("ne:7", "माँ ने बच्चों को एक पुराना गीत ___ ।", "Mother[0] sang[7] the children[2+3] an[4] old[5] song[6].", "सुनाया", [["सुनाई","सुनाई would agree with माँ. With ने the verb agrees with गीत, masculine."], ["सुनाए","सुनाए is plural. गीत here is one song (एक पुराना गीत)."]], "सुनाना “to relate, recite” — of a song, “to sing to someone”. "+NE),
  gap("ne:8", "पिंकी ने मुझसे कुछ नहीं ___ ।", "Pinki[0] {didn't}[4] say[5] anything[3] to me[2].", "कहा", [["कही","कही would agree with पिंकी. The object is कुछ, which takes the masculine singular."], ["कहे","कहे is plural. कुछ takes the masculine singular: कहा."]], NE),
  gap("ne:9", "आज सीता ने लाल साड़ी ___ है ।", "Sita[1] {has put on}[5+6] a red[3] sari[4] today[0].", "पहनी", [["पहना","पहना is masculine. With ने the verb agrees with साड़ी, feminine."], ["पहनीं","पहनीं is plural. साड़ी is singular."]], NE)
];

const irr = [
  gap("ir:0", "मोहन ने अपना काम ख़त्म ___ ।", "Mohan[0] finished[4+5] his[2] work[3].", "किया", [["की","की is feminine. In काम ख़त्म करना the verb agrees with काम, masculine."], ["किए","किए is plural. काम is singular here."]], IRRP),
  gap("ir:1", "राज ने मुझे एक तोहफ़ा ___ ।", "Raj[0] gave[5] me[2] a[3] present[4].", "दिया", [["देया","Not a word: देना is irregular. Its participle is दिया."], ["दी","दी is feminine. तोहफ़ा is masculine."]], IRRP),
  gap("ir:2", "सीता ने अपनी सहेली से एक किताब उधार ___ ।", "Sita[0] borrowed[7+8] a[5] book[6] from[4] her[2] friend[3].", "ली", [["लिया","लिया is masculine. With ने the verb agrees with किताब, feminine."], ["लेया","Not a word: लेना is irregular. Its participle is लिया, लिए, ली, लीं."]], "उधार लेना “to borrow”: the verb agrees with the thing borrowed. "+IRRP),
  gap("ir:3", "बच्चों ने दूध ___ ।", "{The children}[0] drank[3] milk[2].", "पिया", [["पिए","पिए would agree with बच्चों. With ने the verb agrees with दूध, masculine singular."], ["पी","पी is feminine. दूध is masculine."]], IRRP),
  gap("ir:4", "पड़ोसियों ने पुलिस से हमारी शिकायत ___ ।", "{The neighbours}[0] complained[5+6] {about us}[4] to[3] the police[2].", "की", [["किया","किया is masculine. In शिकायत करना the verb agrees with शिकायत, feminine."], ["कीं","कीं is plural. शिकायत is singular here."]], "शिकायत करना “to complain”: X की शिकायत करना “to complain about X”. "+IRRP),
  mc("ir:5", "Which sentence is correct?", "लड़कियों ने ठंडा पानी पिया ।", [["लड़कियों ने ठंडा पानी पी ।","पी is feminine, as if agreeing with लड़कियों. With ने the verb agrees with पानी, masculine: पिया."], ["लड़कियाँ ठंडा पानी पीं ।","पीना is transitive, so in the perfective the subject takes ने (लड़कियों ने) and the verb agrees with पानी."]], NE, {say: "लड़कियों ने ठंडा पानी पिया ।", en: "{The girls}[0] drank[4] cold[2] water[3]."}),
  mc("ir:6", "What are the perfective participles of लेना?", "लिया, लिए, ली, लीं", [["किया, किए, की, कीं","Those are the forms of करना."], ["लेता, लेते, लेती, लेतीं","Those are the imperfective participles, “taking”."]], IRRP)
];

const pron = [
  gap("pr:0", "___ यह किताब कहाँ से ख़रीदी ?", "Where[3] did you[0] buy[5] this[1] book[2] from[4]? (to तुम)", "तुमने", [["तुम","ख़रीदना is transitive, so in the perfective तुम takes ने — तुमने."], ["तुम्हें","तुम्हें is तुम + को. The doer of a transitive perfective takes ने — तुमने."]], PRON),
  gap("pr:1", "___ कल एक अच्छा गीत सुना ।", "He[0] heard[5] a[2] good[3] song[4] yesterday[1].", "उसने", [["वहने","Not a word: वह becomes उस before ने — उसने."], ["उसे","उसे is वह + को. The doer takes ने — उसने."]], PRON),
  gap("pr:2", "___ हमें बहुत मदद दी ।", "They[0] gave[4] us[1] {a lot of}[2] help[3].", "उन्होंने", [["वेने","Not a word: before ने, वे becomes उन्होंने."], ["उसने","उसने is singular, “he” or “she”. “They” is उन्होंने."]], PRON),
  gap("pr:3", "___ यह दरवाज़ा खोला ?", "Who[0] opened[3] this[1] door[2]?", "किसने", [["कौनने","Not a word: कौन becomes किस before ने — किसने."], ["कौन","कौन is the direct form. खोलना is transitive, so “who” takes ने — किसने."]], PRON),
  gap("pr:4", "___ आज सुबह क्या खाया ?", "What[3] did you[0] eat[4] {this morning}[1+2]? (to आप)", "आपने", [["आप","खाना is transitive, so in the perfective आप takes ने — आपने."], ["तुमने","तुमने is the तुम form. The cue is to आप."]], PRON),
  gap("pr:5", "___ आज बहुत काम किया ।", "I[0] did[4] {a lot of}[2] work[3] today[1].", "मैंने", [["मुझने","Not a word: मैं stays मैं before ने — मैंने."], ["मुझे","मुझे is मैं + को. The doer takes ने — मैंने."]], PRON),
  gap("pr:6", "___ मेरी बहुत मदद की ।", "{This person}[0] helped[3+4] me[1] {a lot}[2].", "इसने", [["यहने","Not a word: before ने, यह becomes इस — इसने."], ["इसे","इसे is यह + को. The doer takes ने — इसने."]], "मदद करना — the verb agrees with मदद, feminine: की. "+PRON)
];

const ko = [
  gap("ko:0", "सीता ने अपने भाई को ___ ।", "Sita[0] called[5] her[2] brother[3+4].", "बुलाया", [["बुलाई","बुलाई would agree with सीता. With ने the verb never agrees with the doer."], ["बुलाए","बुलाए is plural. With को on the object the verb is masculine singular."]], KO),
  gap("ko:1", "हमने उन लड़कियों को स्टेशन पर ___ ।", "We[0] saw[6] those[1] girls[2+3] at[5] the station[4].", "देखा", [["देखीं","देखीं would agree with लड़कियों. With को on the object the verb no longer agrees: देखा."], ["देखे","देखे is plural. With को on the object the verb is masculine singular."]], KO),
  mc("ko:2", "Add को to the object", "राज ने दोनों गाड़ियों को चलाया ।", [["राज ने दोनों गाड़ियों को चलाईं ।","With को on the object the verb no longer agrees with it: चलाया."], ["राज ने दोनों गाड़ियाँ को चलाया ।","Before को the noun is oblique: गाड़ियों."]], KO, {hi: "राज ने दोनों गाड़ियाँ चलाईं ।", audio: true, say: "राज ने दोनों गाड़ियों को चलाया ।", en: "Raj[0] drove[5] both[2] cars[3+4]."}),
  gap("ko:3", "सीता ने देर तक ___ ।", "Sita[0] wrote[4] {until late}[2+3].", "लिखा", [["लिखी","लिखी would agree with सीता. With ने and no object the verb is masculine singular."], ["लिखे","लिखे is plural. With ने and no object the verb is masculine singular."]], KO),
  mc("ko:4", "Which sentence is correct?", "मोहन मेरे लिए एक तोहफ़ा लाया ।", [["मोहन ने मेरे लिए एक तोहफ़ा लाया ।","लाना never takes ने, though it has an object: मोहन … लाया."], ["मोहन मेरे लिए एक तोहफ़ा लाई ।","लाई is feminine. Mohan is a man."]], LANA, {say: "मोहन मेरे लिए एक तोहफ़ा लाया ।", en: "Mohan[0] brought[5] a[3] present[4] for[2] me[1]."}),
  gap("ko:5", "राज और प्रताप अपने साथ बहुत सामान लाए ___ ।", "Raj[0] and[1] Pratap[2] {had brought}[7+8] {a lot of}[5] luggage[6] {with them}[3+4].", "थे", [["था","था would agree with सामान, as if लाना took ने. लाना agrees with its subject, राज और प्रताप, plural."], ["थी","थी is feminine singular. राज और प्रताप are two men."]], LANA),
  gap("ko:6", "पिंकी ने यह सवाल नहीं ___ ।", "Pinki[0] {didn't}[4] understand[5] this[2] question[3].", "समझा", [["समझी","समझी would agree with पिंकी. With ने the verb agrees with सवाल, masculine."], ["समझे","समझे is plural. सवाल is singular."]], "समझना takes ने when it has an object. Here ने is used, so the verb agrees with the object."),
  mc("ko:7", "Which sentence is correct?", "औरतें कल शाम को लौटीं ।", [["औरतों ने कल शाम को लौटीं ।","लौटना is intransitive, so there is no ने — औरतें … लौटीं."], ["औरतें कल शाम को लौटे ।","लौटे is masculine. औरतें is feminine."]], INTR, {say: "औरतें कल शाम को लौटीं ।", en: "{The women}[0] returned[4] {yesterday evening}[1+2+3]."})
];

const tense = [
  mc("te:0", "Make it “had gone”", "उषा बनारस गई थी ।", [["उषा बनारस गई है ।","है gives “has gone”."], ["उषा बनारस जाती थी ।","जाती थी is the imperfective, “used to go”."]], AUXS, {hi: "उषा बनारस गई ।", audio: true, say: "उषा बनारस गई थी ।", en: "Usha[0] {had gone}[2+3] to Banaras[1]."}),
  gap("te:1", "शायद मोहन घर पहुँचा ___ ।", "Mohan[1] may[0+4] {have reached}[3] home[2].", "हो", [["हों","हों is plural. Mohan, spoken of plainly, takes हो."], ["हूँ","हूँ goes only with मैं."]], "Perfective + subjunctive हो — “may have …”."),
  gap("te:2", "रेलगाड़ी अब तक आगरा पहुँची ___ ।", "The train[0] {will have reached}[4+5] Agra[3] {by now}[1+2].", "होगी", [["होगा","होगा is masculine. रेलगाड़ी is feminine."], ["होंगी","होंगी is plural. रेलगाड़ी is singular."]], "Perfective + होगा — “will have …, must have …”."),
  mc("te:3", "What does वे आए होंगे mean?", "They must have come.", [["They will come.","That is the future: वे आएँगे."], ["They may have come.","“May have” takes the subjunctive: वे आए हों."]], AUXS),
  gap("te:4", "पिछले साल हम दो बार नेपाल गए ___ ।", "{Last year}[0+1] we[2] {had gone}[6+7] to Nepal[5] twice[3+4].", "थे", [["था","था is singular. हम takes the plural."], ["थी","थी is feminine singular. हम takes the plural."]], AUXS),
  mc("te:5", "Make it “have returned”", "मेरी बहिनें स्कूल से लौटी हैं ।", [["मेरी बहिनें स्कूल से लौटीं हैं ।",NASAL], ["मेरी बहिनें स्कूल से लौटती हैं ।","लौटती हैं is the imperfective, “return (regularly)”."]], NASAL, {hi: "मेरी बहिनें स्कूल से लौटीं ।", audio: true, say: "मेरी बहिनें स्कूल से लौटी हैं ।", en: "My[0] sisters[1] {have returned}[4+5] from[3] school[2]."}),
  gap("te:6", "कल मौसम बहुत अच्छा ___ ।", "{The weather}[1] was[4] very[2] good[3] yesterday[0].", "था", [["हुआ","हुआ means “happened” and describes an event. A state, “was”, takes था."], ["थी","थी is feminine. मौसम is masculine."]], "हुआ “happened” describes an action; था “was” describes a state."),
  mc("te:7", "Make it “may have …”", "दादा जी ने अख़बार पढ़ा हो ।", [["दादा जी ने अख़बार पढ़ा हों ।","हों is plural. The verb agrees with अख़बार, masculine singular, not with दादा जी — हो."], ["दादा जी ने अख़बार पढ़ता हो ।","पढ़ता is the imperfective participle. ने goes only with perfective verbs: पढ़ा हो."]], AUXS, {hi: "दादा जी ने अख़बार पढ़ा होगा ।", audio: true, say: "दादा जी ने अख़बार पढ़ा हो ।", en: "Grandpa[0] {may have read}[4+5] the newspaper[3]."})
];

const build = [
  tiles("tl:0", "Raj[0] slept[3] {in the afternoon}[1+2].", ["राज","दोपहर","को","सोया"], [["ने","सोना is intransitive, so there is no ने."], ["सोई","सोई is feminine. Raj is a man."]], {alt: [["दोपहर","को","राज","सोया"]]}),
  tiles("tl:1", "Sita[0] {has come}[3+4] from[2] Delhi[1].", ["सीता","दिल्ली","से","आई","है"], [["आया","आया is masculine. Sita is a woman."], ["आईं","आईं is plural. Sita is one person, and before है the participle has no nasal."]]),
  tiles("tl:2", "I[0] read[4] a[2] story[3] yesterday[1].", ["मैंने","कल","एक","कहानी","पढ़ी"], [["पढ़ा","पढ़ा is masculine. With ने the verb agrees with कहानी, feminine."], ["मैं","पढ़ना with an object takes ने in the perfective: मैंने."]], {alt: [["कल","मैंने","एक","कहानी","पढ़ी"]]}),
  tiles("tl:3", "{The guests}[0] drank[3] coffee[2].", ["मेहमानों","ने","कॉफ़ी","पी"], [["पिया","पिया is masculine. With ने the verb agrees with कॉफ़ी, feminine."], ["मेहमान","मेहमान ने would be one guest. “The guests” before ने is oblique plural: मेहमानों."]]),
  tiles("tl:4", "We[0] saw[3] Mohan[1+2].", ["हमने","मोहन","को","देखा"], [["देखे","देखे is plural. With को on the object the verb is masculine singular."], ["हम","देखना is transitive: in the perfective हम takes ने, हमने."]]),
  tiles("tl:5", "Who[0] broke[3] this[1] glass[2]?", ["किसने","यह","गिलास","तोड़ा"], [["कौन","कौन becomes किस before ने — किसने."], ["तोड़ी","तोड़ी is feminine. गिलास is masculine."]], {alt: [["यह","गिलास","किसने","तोड़ा"]]}),
  tiles("tl:6", "They[0] {had cleaned}[3+4+5] their[1] house[2].", ["उन्होंने","अपना","घर","साफ़","किया","था"], [["थे","थे would agree with उन्होंने. With ने the auxiliary agrees with घर — था."], ["वेने","Not a word: before ने, वे becomes उन्होंने."]]),
  tiles("tl:7", "Pratap[0] brought[3] some[1] fruit[2].", ["प्रताप","कुछ","फल","लाया"], [["ने","लाना never takes ने, though it has an object."], ["लाआ","Not a word: after a vowel stem the masculine singular inserts -y- — लाया."]]),
  tiles("tl:8", "Mohan[0] {must have gone}[2+3] to the office[1].", ["मोहन","दफ़्तर","गया","होगा"], [["होगी","होगी is feminine. Mohan is a man."], ["गई","गई is feminine. Mohan is a man."]]),
  tiles("tl:9", "{The children}[0+1] had[4] {a lot of}[2] fun[3].", ["बच्चों","को","बहुत","मज़ा","आया"], [["बच्चे","Before को the noun is oblique: बच्चों."], ["आई","आई is feminine. आना agrees with मज़ा, masculine."]]),
  tiles("tl:10", "{The shopkeeper}[0] {has opened}[3+4] the shop[2].", ["दुकानदार","ने","दुकान","खोली","है"], [["खोला","खोला is masculine. With ने the verb agrees with दुकान, feminine."], ["खोलीं","खोलीं is plural. दुकान is singular."]]),
  tiles("tl:11", "Sita[0] gave[5] me[2] a[3] book[4].", ["सीता","ने","मुझे","एक","किताब","दी"], [["दिया","दिया is masculine. With ने the verb agrees with किताब, feminine."], ["देया","Not a word: देना is irregular. Its participle is दिया, दिए, दी, दीं."]]),
  tiles("tl:12", "Did you[1] meet[4] Raj[2+3]? (to आप, a man)", ["क्या","आप","राज","से","मिले"], [["आपने","मिलना is intransitive, so there is no ने."], ["मिला","मिला is singular. आप takes the plural: मिले."]])
];

const mean = [
  meaning("mn:0", "राज वहाँ गया होगा ।", "Raj must have gone there.", [["Raj will go there.","That would be the future: जाएगा. गया होगा is “must have gone”."], ["Raj had gone there.","“Had gone” would be गया था. होगा makes it “must have”."]]),
  meaning("mn:1", "किसीने मेज़ पर फल रखे थे ।", "Someone had put fruit on the table.", [["Someone was putting fruit on the table.","That would be the continuous: रख रहा था."], ["Someone used to put fruit on the table.","That would be the imperfective: रखता था."]]),
  meaning("mn:2", "मोहन ने अपने बेटे को कुछ पैसे दिए ।", "Mohan gave his son some money.", [["Mohan's son gave him some money.","Mohan has ने, so he is the doer. बेटे को is the one who received."], ["Mohan borrowed some money from his son.","Borrowing would be उधार लेना with से. दिए is “gave”."]]),
  meaning("mn:3", "उन्होंने मुझे नहीं देखा ।", "They didn't see me.", [["I didn't see them.","That would be मैंने उन्हें नहीं देखा. उन्होंने is the doer."], ["They don't see me.","That would be the imperfective, देखते. देखा is perfective."]]),
  meaning("mn:4", "शायद सीता ने यह फ़िल्म देखी हो ।", "Sita may have seen this film.", [["Sita must have seen this film.","“Must have” would be देखी होगी. हो is “may have”."], ["Sita may see this film.","That would be the plain subjunctive, देखे. देखी हो is “may have seen”."]]),
  meaning("mn:5", "दादा जी को फ़िल्म में नींद आई ।", "Grandpa felt sleepy during the film.", [["We felt sleepy during Grandpa's film.","दादा जी को marks the one who felt sleepy. There is no “we”."], ["Grandpa came late to the film.","आई goes with नींद — नींद आना “to feel sleepy”."]]),
  meaning("mn:6", "माली ने मुझसे माफ़ी माँगी ।", "The gardener apologized to me.", [["I apologized to the gardener.","That would be मैंने माली से माफ़ी माँगी. माली ने is the doer."], ["The gardener forgave me.","“To forgive” is माफ़ करना. माफ़ी माँगना is “to apologize”."]])
];

const usage = [
  mc("us:0", "Which verbs take ने in the perfective?", "Most transitive verbs", [["All verbs","Intransitive verbs such as आना, जाना and लौटना never take ने."], ["Intransitive verbs","It is the other way round: ने goes with transitive verbs."]], NE),
  mc("us:1", "With ने, what does the verb agree with?", "The direct object, if it has no को", [["The doer (the word before ने)","The verb never agrees with a doer marked by ने."], ["Always the masculine singular (देखा, किया)","Only when there is no object, or when the object takes को."]], NE+" "+KO),
  mc("us:2", "लाना “to bring” is transitive. Does it take ने?", "No: वह किताब लाया", [["Yes: उसने किताब लाई","लाना is the exception. It never takes ने."], ["Only with a feminine object (उसने साड़ी लाई)","There is no such rule. लाना never takes ने."]], LANA),
  mc("us:3", "Which verb takes ने only when it has an object?", "समझना", [["लाना","लाना never takes ने."], ["लिखना","लिखना takes ने in the perfective with or without an object."]], "A few verbs, such as समझना, take ने only when a direct object is expressed: हम समझे, but हमने बात समझी."),
  mc("us:4", "What is the masculine singular perfective of खाना?", "खाया", [["खाआ","Not a word: after a vowel stem the masculine singular inserts -y-, खाया."], ["खाता","खाता is the imperfective participle, “eats, eating”."]], GLIDE),
  mc("us:5", "How do हुआ and था differ?", "हुआ “happened” is an event, था “was” a state", [["हुआ is masculine, था feminine","Both are masculine singular. The feminines are हुई and थी."], ["हुआ is present, था past","Both refer to the past."]], "हुआ “happened” describes an action; था “was” describes a state."),
  mc("us:6", "What does a perfective + होगा mean?", "“will have …” or “must have …”", [["“may have …”","That is perfective + हो — आया हो."], ["“had …”","That is perfective + था — आया था."]], AUXS),
  mc("us:7", "In the feminine plural with an auxiliary, which word has the nasal?", "Only the auxiliary: उठी हैं, उठी थीं", [["Both words: उठीं हैं","The book writes the nasal only on the last word, as in उठी हैं."], ["Only the participle: उठीं है","है is singular. The plural must show on the auxiliary: उठी हैं."]], NASAL)
];

const unit = {
  id: "unit11", n: 11, title: "Pratap has come back", titleHi: "प्रताप वापस आया है",
  scope: "Transitivity; perfective participles (stem + -ā, -e, -ī, -ī̃; य after vowel stems, irregular गया and हुआ, किया, लिया, दिया, पिया); perfective tenses of intransitive verbs agreeing with the subject (उठा, उठा है, उठा था); the ने construction of transitive verbs, with agreement with the object, and masculine singular with no object or an object with को; ने forms of pronouns (मैंने, उसने, उन्होंने, किसने, किसीने); लाना without ने and समझना with ने only when it has an object; perfective + होगा “will/must have” and + हो “may have”; हुआ against था; मज़ा आना, नींद आना",
  pages: "book 130–143 (144 Test yourself, 145 blank)",
  skills: {intr: "Intransitive perfective", ne: "The ने construction", irr: "Irregular participles", pron: "ने with pronouns", ko: "को, no object, लाना", tense: "Perfective tenses", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["आख़िर में","in the end","x"],["आनंद","joy, enjoyment","n","m"],["आनंद आना","to feel enjoyment","v"],["आवश्यकता","necessity","n","f"],["उँगली","finger","n","f"],
    ["उठाना","to pick up","v"],["उधार","loan","n","m"],["उधार लेना","to borrow","v"],["उपहार","gift (formal)","n","m"],["कब","when?","x"],
    ["क़ीमत","price, value, cost","n","f"],["कैमरा","camera","n","m"],["खोलना","to open","v"],["गंगा","Ganges","n","f"],["गिलास","tumbler (glass or metal)","n","m"],
    ["गीत","song","n","m"],["गुज़ारना","to spend (time)","v"],["घाट","(steps at) riverbank","n","m"],["घूमना","to tour, roam","v"],["चोर","thief","n","m"],
    ["छूटना","to be left, fall back","v"],["जारी","current, continuing","a"],["जारी रखना","to maintain, keep up","v"],["ज़ेवर","(piece of) jewellery","n","m"],["ट्रेकिंग","trekking","n","f"],
    ["तमाशा","spectacle, show","n","m"],["तिब्बती","Tibetan","a"],["तोड़ना","to break","v"],["तोहफ़ा","present (everyday word)","n","m"],["दवा","medicine","n","f"],
    ["दादा","paternal grandfather","n","m"],["दुकानदार","shopkeeper","n","m"],["दुर्घटना","accident","n","f"],["देर तक","until late","x"],["दोपहर","noon, afternoon","n","f"],
    ["नाक","nose","n","f"],["नींद","sleep","n","f"],["नींद आना","to feel sleepy","v"],["पच्चीस","twenty-five","a"],["पढ़ाई","studies, studying","n","f"],
    ["परसों","the day before yesterday; the day after tomorrow","x"],["पहनना","to put on, wear","v"],["पाठ","lesson, chapter","n","m"],["पाना","to find, obtain","v"],["पेट","stomach","n","m"],
    ["प्याला","cup","n","m"],["प्रसिद्ध","famous","a"],["फ़िल्म","film","n","f"],["फ़िल्मी","film-related, film-style","a"],["फ़ैक्स","fax","n","m"],
    ["फ़ोटो","photograph (f or m)","n","f"],["बजना","to resound, chime","v"],["बाँह","(upper) arm","n","f"],["बीस","twenty","a"],["बेचना","to sell","v"],
    ["भूत","ghost","n","m"],["भेंट","presentation, gift","n","f"],["मजबूरी","compulsion","n","f"],["मज़ा","fun, pleasure","n","m"],["मज़ा आना","to enjoy, have fun","v"],
    ["मानना","to accept, believe","v"],["माफ़ करना","to forgive, excuse","v"],["माफ़ी","forgiveness","n","f"],["माफ़ी माँगना","to apologize","v"],["माली","gardener","n","m"],
    ["मीठा","sweet","a"],["मुमकिन","possible (Perso-Arabic word)","a"],["रोना","to weep, cry","v"],["लाठी","lathi, stick","n","f"],["वापस लेना","to take back","v"],
    ["शब्द","word","n","m"],["शिकायत","complaint","n","f"],["शिकायत करना","to complain","v"],["साथ साथ","together","x"],["सुनाना","to relate, tell, recite","v"],
    ["नेपाली","Nepali","a"],["रुपया","rupee","n","m"],["ने","(marks the doer of a transitive perfective verb)","x"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {"ने": "marks the doer of a transitive verb in the perfective; not translated"},
  lessons: [
    {id: "intr", title: "वह आया", desc: "Perfective of intransitive verbs: “went, came, has gone”", skill: "intr", items: intr},
    {id: "ne", title: "उसने देखा", desc: "The ने construction: the verb agrees with the object", skill: "ne", items: ne},
    {id: "irr", title: "किया, लिया, दिया, पिया", desc: "Irregular perfective participles", skill: "irr", items: irr},
    {id: "pron", title: "मैंने, उसने, किसने", desc: "Pronouns before ने", skill: "pron", items: pron},
    {id: "ko", title: "को और लाना", desc: "Objects with को, no object, and the exception लाना", skill: "ko", items: ko},
    {id: "tense", title: "गया है, गया था, गया होगा", desc: "“has, had, must have, may have …”", skill: "tense", items: tense},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Transitivity, ने, agreement", skill: "usage", items: usage}
  ],
  test: {vocab: 4, intr: 3, ne: 3, irr: 1, pron: 2, ko: 2, tense: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "transitivity", title: "Transitive verbs (can take a direct object: पीना, लिखना) and intransitive verbs (motion or change of state: आना, उठना); in the perfective they take different constructions"},
    {id: "perfective-participle", title: "The perfective participle: stem + -ā, -e, -ī, -ī̃ (उठा, उठे, उठी, उठीं); vowel stems insert -y- in the masculine singular (आया, लाया, रोया; optionally elsewhere: आये, आयी); irregular जाना गया, गए, गई, गईं and होना हुआ, हुए, हुई, हुईं"},
    {id: "perfective-intransitive", title: "Perfective tenses of intransitive verbs agree with the subject: simple perfective (वह उठा), perfect with हूँ, है, हैं (उठा है “has got up”), pluperfect with था (उठा था “had got up”, also a remote past); the feminine plural nasal only on the last word (उठी हैं); हुआ “happened” (event) against था “was” (state)"},
    {id: "ne-construction", title: "The ने construction: transitive verbs in the perfective take ने after the doer (oblique: लड़के ने, लड़कों ने) and agree with the direct object, auxiliary included (सीता ने साड़ी पहनी है); masculine singular when there is no object or the object takes को (उसने लड़कियों को देखा)"},
    {id: "ne-exceptions", title: "लाना is transitive but never takes ने (प्रताप फल लाया); some verbs such as समझना take ने only when an object is expressed (हम समझे, हमने बात समझी); in the dative idioms मज़ा आना, आनंद आना, नींद आना the verb agrees with the noun"},
    {id: "ne-pronouns", title: "Pronouns before ने — मैंने, तूने, इसने, उसने, हमने, तुमने, आपने, इन्होंने, उन्होंने, किसने (sg.), किन्होंने (pl.), किसीने"},
    {id: "irregular-perfectives", title: "Irregular perfective participles: करना किया, किए, की, कीं; लेना लिया, लिए, ली, लीं; देना दिया, दिए, दी, दीं; पीना पिया, पिए, पी, पीं"},
    {id: "perfective-aux", title: "Perfective + future auxiliary होगा “will have, must have …” (वे आए होंगे) and + subjunctive हो “may have …” (शायद मोहन पहुँचा हो)"}
  ]
};

writeUnit(11, unit, {forms, fake});
