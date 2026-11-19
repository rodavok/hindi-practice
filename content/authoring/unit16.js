"use strict";
// Unit 16 (book pp. 206–219): वह तुम्हारी तारीफ़ कर रहा था. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 216–218, Quick Vocab pp. 207, 211, 16.1–16.6 pp. 208–214)
  "अनुभव":"anubhav","अहम":"aham","आलसी":"ālsī","इंतज़ाम":"intazām","इंतज़ार":"intazār","इनसान":"insān","इमारत":"imārat","इस्तेमाल":"istemāl",
  "ई-मेल":"ī-mel","उद्घाटन":"udghāṭan","उल्लू":"ullū","कंप्यूटर":"kampyūṭar","क़सूर":"qasūr","कार्यक्रम":"kāryakram","कुली":"kulī",
  "कोशिश":"kośiś","खाँसना":"khā̃snā","गँवाना":"gãvānā","गप":"gap","गुज़ारा":"guzārā","चाहे":"cāhe","चिंता":"cintā","जंगली":"jaṅglī","जन्म":"janm",
  "जानवर":"jānvar","ज़िंदगी":"zindagī","डूबना":"ḍūbnā","ढंग":"ḍhaṅg","तलाश":"talāś","तलाशना":"talāśnā","तहज़ीब":"tahzīb","तारीफ़":"tārīf",
  "दुनिया":"duniyā","देखभाल":"dekhbhāl","देहान्त":"dehānt","निंदा":"nindā","निकालना":"nikālnā","निबंध":"nibandh","नौकर-चाकर":"naukar-cākar",
  "पति-देव":"pati-dev","पीछा":"pīchā","पेंसिल":"pensil","पेशा":"peśā","प्याज़":"pyāz","बेवक़ूफ़":"bevaqūf","मर्द":"mard","माला":"mālā",
  "मीटिंग":"mīṭiṅg","याद":"yād","दिलाना":"dilānā","लहसुन":"lahsun","सदा":"sadā","सवारी":"savārī","साधन":"sādhan","सुनाई":"sunāī","हरेक":"harek","हल":"hal",
  // echo words and repetitions (16.4–16.5)
  "ठीक-ठाक":"ṭhīk-ṭhāk","भीड़-भाड़":"bhīṛ-bhāṛ","गप-शप":"gap-śap","चाय-वाय":"cāy-vāy","नाश्ता-वाश्ता":"nāśtā-vāśtā","तोहफ़ा-वोहफ़ा":"tohfā-vohfā",
  // forms produced by earlier units' rules
  "करेंगे":"karẽge","खोलने":"kholne","खोलना":"kholnā","आती":"ātī","आता":"ātā","दे":"de","देता":"detā","दिलाना":"dilānā",
  "तुम्हारा":"tumhārā","तुम्हारी":"tumhārī","खाने":"khāne","खाता":"khātā","हुई":"huī","रखना":"rakhnā","मिठाइयाँ":"miṭhāiyā̃","मिठाई":"miṭhāī",
  "तीनों":"tīnõ","दसों":"dasõ","रुपये":"rupaye","लिखो":"likho","करो":"karo","पढ़ता":"paṛhtā","पढ़ती":"paṛhtī","लिखता":"likhtā","आते":"āte",
  "लाना":"lānā","लाया":"lāyā","किए":"kie","गई":"gaī","गया":"gayā","सुनाईं":"sunāī̃","छोटे":"choṭe","छोटा":"choṭā",
  "छोटी":"choṭī","कहे":"kahe","रहूँगा":"rahū̃gā","आऊँगा":"āū̃gā","जाऊँगा":"jāū̃gā","आओ":"āo","जाओ":"jāo","समझने":"samajhne","चोरों":"corõ","रास्ता":"rāstā","मिल":"mil","सबने":"sabne","बनाओ":"banāo","भीड़":"bhīṛ"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "मददा":"madadā","देखभाला":"dekhbhālā","तारीफ़ा":"tārīfā","इस्तेमाला":"istemālā","कोशिशा":"kośiśā","इंतज़ारा":"intazārā","इंतज़ामा":"intazāmā",
  "कहींओं":"kahī̃õ","सुनाईया":"sunāīyā","दिखाईया":"dikhāīyā"
};

const CONJ = "In conjunct verbs such as की मदद करना, का इंतज़ार करना, the base noun (मदद, इंतज़ार) is “possessed” by the object, so का or की agrees with the base noun's gender, not with the object.";
const CONJNE = "With ने, a conjunct verb agrees with its own base noun (बच्चों की देखभाल की, साइकिल का इस्तेमाल किया).";
const CONJPASS = "In the passive, the subject of a conjunct verb is the base noun itself (… की तलाश की जा रही है).";
const KOSH = "की कोशिश करना “to try” follows an oblique infinitive, because of की — समझने की कोशिश.";
const EVENT = "Intransitive conjunct verbs describe events, and the event itself is the subject: का जन्म होना, की शादी होना, का देहान्त होना, का उद्घाटन होना.";
const YAD = "याद “memory” makes several verbs: याद करना “remember, think of”, याद होना “be remembered”, याद आना “come to mind, be missed”, याद दिलाना “remind”, याद रखना “keep in mind”, याद रहना “remain remembered”.";
const SUNAI = "दिखाई देना “be visible” and सुनाई देना “be audible” do not take ने. The person who sees or hears takes को.";
const KAHIN = "कहीं “somewhere, anywhere”: कहीं और “somewhere else”, कहीं नहीं “nowhere”, कहीं भी “anywhere at all”, कहीं न कहीं “somewhere or other”; also “much” (कहीं ज़्यादा), “lest” (कहीं … न + subjunctive), and an anxious or rhetorical question.";
const REP = "Repeating a word can show distribution (दो दो “two each”), variety (तरह तरह के “of various kinds”) or emphasis (गरम गरम “piping hot”).";
const ECHO = "An echo word (चाय-वाय “tea or something”) generalizes the word it echoes. Some pairs are fixed (गप-शप, ठीक-ठाक, भीड़-भाड़), and some join two words of similar meaning (नौकर-चाकर).";
const EITHER = "या (तो) … या “either … or”, न … न “neither … nor”, चाहे … चाहे (or चाहे … या) “whether … or”, and चाहे … क्यों न हो “no matter how/what”.";

const conj = [
  gap("cj:0", "क्या आप ___ मदद कर सकते हैं ?", "Can[0+5+6] you[1] help[3+4] me[2]?", "मेरी", [["मेरा","The possessive agrees with the base noun मदद, feminine — मेरी मदद."], ["मुझे","मदद करना takes a possessive — मेरी मदद करना."], ["मददा","Not a word. मदद is a noun and never takes -ā."]], CONJ),
  gap("cj:1", "हम एक घंटे से बस ___ इंतज़ार कर रहे हैं ।", "We[0] {have been waiting}[6+7+8+9] for the bus[4+5] for an hour[1+2+3].", "का", [["की","The possessive agrees with इंतज़ार, masculine, not with बस — बस का इंतज़ार."], ["को","इंतज़ार करना takes a possessive — बस का इंतज़ार."]], CONJ),
  gap("cj:2", "बीमार दादी ___ देखभाल कौन करेगा ?", "Who[4] {will look after}[3+5] sick[0] Grandma[1+2]?", "की", [["का","देखभाल is feminine — दादी की देखभाल."], ["को","देखभाल करना takes a possessive — दादी की देखभाल."], ["देखभाला","Not a word. देखभाल is a noun and never takes -ā."]], CONJ),
  gap("cj:3", "राज ने मेरी बहुत तारीफ़ ___ ।", "Raj[0+1] praised[4+5] me[2] {a lot}[3].", "की", [["किया","With ने the verb agrees with the base noun तारीफ़, feminine — की."], ["कीं","कीं is plural. तारीफ़ is singular."], ["तारीफ़ा","Not a word. तारीफ़ is a noun and never takes -ā."]], CONJNE),
  gap("cj:4", "सीता ने अपनी बहिन की साइकिल का इस्तेमाल ___ ।", "Sita[0+1] used[6+7+8] her[2] sister's[3+4] bicycle[5].", "किया", [["की","की would agree with साइकिल. The verb agrees with the base noun इस्तेमाल, masculine — किया."], ["कीं","कीं is feminine plural. The verb agrees with इस्तेमाल, masculine singular."], ["इस्तेमाला","Not a word. इस्तेमाल is a noun and never takes -ā."]], CONJNE),
  gap("cj:5", "बच्चे ने ख़ुद खाना ___ की कोशिश की ।", "The child[0+1] tried[5+6+7] to eat[4] by himself[2] (lit. “… food[3] …”).", "खाने", [["खाना","Before की the infinitive is oblique — खाने की कोशिश."], ["खाता","खाता is the imperfective participle. की कोशिश करना follows the oblique infinitive."], ["कोशिशा","Not a word. कोशिश is a noun and never takes -ā."]], KOSH),
  gap("cj:6", "चोरों की तलाश ___ जा रही है ।", "The thieves[0] {are being searched for}[1+2+3+4+5+6].", "की", [["किया","In the passive the subject is तलाश, feminine — की जा रही है."], ["किए","किए would agree with चोरों. The subject is the base noun तलाश."]], CONJPASS),
  mc("cj:7", "Which means “Sita followed the thief”?", "सीता ने चोर का पीछा किया ।", [["सीता ने चोर की पीछा की ।","पीछा is masculine — चोर का पीछा किया."], ["सीता चोर का पीछा किया ।","With करना in the perfective the doer takes ने — सीता ने."]], CONJ, {say: "सीता ने चोर का पीछा किया ।", en: "Sita[0+1] followed[3+4+5] the thief[2]."}),
  gap("cj:8", "सरकार ने किराया कम ___ है ।", "The government[0+1] {has reduced}[3+4+5] the fare[2].", "किया", [["की","की would agree with सरकार. With ने the verb agrees with किराया, masculine."], ["हुआ","कम होना is intransitive (“go down”) and takes no ने."]], "Conjunct verbs of the first type are adjective or noun + करना (कम करना “reduce”), with intransitive होना (कम होना)."),
  meaning("cj:9", "हमें आपकी मदद की ज़रूरत है ।", "We need your help.", [["We need to help you.","आपकी मदद is “your help”, help that you give."], ["You need our help.","हमें is the one in need."]], CONJ),
  gap("cj:10", "मैंने तुम्हारा बहुत ___ किया ।", "I[0] waited[3+4] for you[1] {a long time}[2].", "इंतज़ार", [["इंतज़ाम","का इंतज़ाम करना is “to arrange”. “Wait for” is का इंतज़ार करना."], ["तलाश","तलाश is feminine, so it would need तुम्हारी … की. “Wait for” is इंतज़ार."], ["इंतज़ारा","Not a word. The noun is इंतज़ार."]], CONJ),
  gap("cj:11", "दावत का ___ कौन करेगा ?", "Who[3] {will arrange}[2+4] the dinner[0+1]?", "इंतज़ाम", [["इंतज़ार","का इंतज़ार करना is “to wait for”. “Arrange” is का इंतज़ाम करना."], ["इस्तेमाल","का इस्तेमाल करना is “to use”."], ["इंतज़ामा","Not a word. The noun is इंतज़ाम."]], CONJ)
];

const yad = [
  gap("ev:0", "मेरे भाई ___ शादी पिछले साल हुई ।", "My[0] brother[1] {got married}[2+3+6] last[4] year[5].", "की", [["का","शादी is feminine — भाई की शादी."], ["ने","शादी होना is intransitive. The event, शादी, is the subject, and there is no ने."]], EVENT),
  gap("ev:1", "मेरी बेटी का जन्म दिल्ली में ___ ।", "My[0] daughter[1] {was born}[2+3+6] in[5] Delhi[4].", "हुआ", [["हुई","हुई would agree with बेटी. The subject is जन्म, masculine — हुआ."], ["किया","जन्म होना is intransitive — हुआ."]], EVENT),
  gap("ev:2", "पिछले हफ़्ते हमारे पड़ोसी का देहान्त हो ___ ।", "Our[2] neighbour[3+4] {passed away}[5+6+7] last[0] week[1].", "गया", [["गई","गई is feminine. देहान्त is masculine."], ["गए","गए would be a respectful plural. The subject is देहान्त, masculine singular — हो गया."]], EVENT),
  gap("ev:3", "कल नए अस्पताल ___ उद्घाटन होगा ।", "The new[1] hospital[2] {will be opened}[3+4+5] tomorrow[0].", "का", [["की","उद्घाटन is masculine — अस्पताल का उद्घाटन."], ["को","उद्घाटन होना takes a possessive — अस्पताल का उद्घाटन."]], EVENT),
  gap("yd:0", "क्या तुम्हें वह गाना अब भी याद ___ ?", "{Do}[0] you[1] still[4+5] remember[6+7] that[2] song[3]?", "है", [["हो","याद होना agrees with the thing remembered, गाना — है."], ["हैं","हैं is plural. It is one song."]], YAD),
  gap("yd:1", "मुझे अपने गाँव की बहुत याद ___ है ।", "I[0] miss[5+6+7] my[1] village[2+3] {a lot}[4].", "आती", [["आता","याद is feminine — याद आती है."], ["आते","आते is plural. याद is singular."]], YAD),
  gap("yd:2", "कल मुझे यह बात याद ___ ।", "Remind[4+5] me[1] {about this}[2+3] tomorrow[0].", "दिलाना", [["रखना","याद रखना is “to keep in mind”. “Remind” is याद दिलाना."], ["आना","याद आना is “to come to mind”. “Remind” is याद दिलाना."]], YAD),
  gap("yd:3", "यह रास्ता याद ___, कल तुम्हें अकेले आना है ।", "{Keep in mind}[2+3] this[0] route[1], tomorrow[4] you[5] {have to}[8] come[7] alone[6].", "रखना", [["दिलाना","याद दिलाना is “to remind”. “Keep in mind” is याद रखना."], ["आना","याद आना is “to come to mind”. “Keep in mind” is याद रखना."]], YAD),
  gap("yd:4", "दूर से ___ एक गाँव दिखाई दिया ।", "{From a distance}[0+1] we[2] {could see}[5+6] a[3] village[4].", "हमें", [["हमने","दिखाई देना does not take ने. The person who sees takes को — हमें."], ["हम","The person who sees takes को — हमें."], ["दिखाईया","Not a word. The fixed form is दिखाई देना."]], SUNAI),
  gap("yd:5", "मुझे कुछ ___ नहीं देता ।", "I[0] {can't hear}[2+3+4] anything[1].", "सुनाई", [["दिखाई","दिखाई देना is “to be visible”. “Hear” is सुनाई देना."], ["सुनाईया","Not a word. The fixed form is सुनाई देना."]], SUNAI),
  meaning("yd:6", "माँ तुम्हें बहुत याद करती हैं ।", "Mother misses you a lot.", [["Mother reminds you of a lot.","“Remind” is याद दिलाना."], ["You remember Mother a lot.","माँ is the subject: she thinks of you."]], YAD)
];

const kahin = [
  gap("kh:0", "मेरी चाबी ___ नहीं मिल रही ।", "I {can't find}[3+4+5] my[0] key[1] anywhere[2].", "कहीं", [["कहाँ","कहाँ is the question “where?”."], ["कभी","कभी is “ever, sometime”."], ["कहींओं","Not a word. कहीं never changes."]], KAHIN),
  gap("kh:1", "चलो, आज ___ और खाना खाते हैं ।", "{Come on}[0], {let's eat}[4+5+6] {somewhere else}[2+3] today[1].", "कहीं", [["कहाँ","कहाँ is the question “where?”."], ["कोई","कोई और is “someone else”. “Somewhere else” is कहीं और."]], KAHIN),
  gap("kh:2", "वह ___ न कहीं ज़रूर मिलेगा ।", "{It'll}[0] {certainly}[4] {turn up}[5] {somewhere or other}[1+2+3].", "कहीं", [["कभी","कभी न कभी is “sometime or other”."], ["कोई","कोई न कोई is “someone or other”."]], KAHIN),
  gap("kh:3", "हिन्दी बोलना लिखने से ___ ज़्यादा आसान है ।", "Speaking[1] Hindi[0] is[7] much[4] easier[5+6] than[3] writing[2].", "कहीं", [["कहाँ","कहाँ is the question “where?”."], ["कभी","कभी is “ever, sometime”. “Much (more)” is कहीं ज़्यादा."]], KAHIN),
  gap("kh:4", "छाता ले लो, कहीं बारिश ___ हो जाए ।", "Take[1+2] an umbrella[0], {in case}[3+5] it rains[4+6+7].", "न", [["मत","मत is only for commands."], ["भी","कहीं भी is “anywhere at all”. “In case, lest” is कहीं … न."]], KAHIN),
  meaning("kh:5", "कहीं तुम मुझे भूल तो नहीं गए ?", "You haven't forgotten me, have you?", [["Where did you forget me?","कहीं here is not “where”: it makes an anxious question."], ["You've forgotten me somewhere.","कहीं … तो नहीं is a worried question: “surely you haven't …?”."]], KAHIN),
  gap("kh:6", "मूर्ख ___ का !", "Utter[1+2] fool[0]!", "कहीं", [["कहाँ","कहाँ is the question “where?”."], ["कोई","कोई is “someone”. The insult formula is कहीं का."]], "कहीं का “of somewhere” sharpens an insult."),
  mc("kh:7", "Which means “nowhere”?", "कहीं नहीं", [["कहीं भी","कहीं भी is “anywhere at all”."], ["कहीं और","कहीं और is “somewhere else”."]], KAHIN)
];

const rep = [
  mc("rp:0", "Which means “We each gave ten rupees”?", "हम सबने दस दस रुपये दिए ।", [["हम सबने दसों रुपये दिए ।","दसों is “all ten”: “we gave all ten rupees”."], ["हम सबने दस रुपये दिए ।","Without the repetition it is ten rupees altogether, not ten each."]], REP, {say: "हम सबने दस दस रुपये दिए ।", en: "We[0+1] each gave[5] ten[2+3] rupees[4]."}),
  gap("rp:1", "बाज़ार में ___ तरह के फल मिलते हैं ।", "{All kinds of}[2+3+4] fruit[5] {can be had}[6+7] in[1] the market[0].", "तरह", [["किस","किस तरह के is “what kind of?”."], ["उस","उस तरह के is “of that kind”."]], REP),
  meaning("rp:2", "उसने मुझे तरह तरह की कहानियाँ सुनाईं ।", "He told me all sorts of stories.", [["He told me the same story again and again.","तरह तरह की is “of various kinds”."], ["He told me a story like that one.","तरह तरह की is “of various kinds”, not “like that”."]], REP),
  gap("rp:3", "बग़ीचे में छोटे ___ बच्चे खेल रहे थे ।", "Lots of little[2+3] children[4] {were playing}[5+6+7] in[1] the garden[0].", "छोटे", [["छोटा","The repeated adjective agrees too — छोटे छोटे बच्चे."], ["छोटी","छोटी is feminine. बच्चे is masculine."]], REP),
  meaning("rp:4", "मेहमानों के लिए कुछ नाश्ता-वाश्ता बनाओ ।", "Make some snacks or something for the guests.", [["Make breakfast and then lunch for the guests.","नाश्ता-वाश्ता is an echo word, “snacks or something like that”."], ["Make the guests a big breakfast.","The echo word makes it vague: “snacks or something”."]], ECHO),
  gap("rp:5", "गाड़ी अब ___ चल रही है ।", "The car[0] {is running}[3+4+5] fine[2] now[1].", "ठीक-ठाक", [["गप-शप","गप-शप is “chit-chat”."], ["भीड़-भाड़","भीड़-भाड़ is “hustle and bustle”."]], ECHO),
  meaning("rp:6", "शहर की भीड़-भाड़ से दूर एक छोटा-सा गाँव है ।", "Far from the hustle and bustle of the town there's a little village.", [["There's a crowded little village near the town.","दूर is “far”: the village is away from the town's bustle."], ["The crowds have left the town for a little village.","Nobody leaves: भीड़-भाड़ से दूर is “far from the bustle”."]], ECHO),
  gap("rp:8", "हर छात्र को दो ___ किताबें मिलीं ।", "Each[0] student[1+2] got[6] two[3+4] books[5].", "दो", [["दोनों","दोनों is “both”."], ["दूसरी","दूसरी is “second, other”."]], REP)
];

const either = [
  gap("ch:0", "___ तो तुम आज आओ या कल ।", "Come[4] either[0+1] today[3] or[5] tomorrow[6] (lit. “… you[2] …”).", "या", [["न","न … न is “neither … nor”."], ["कि","“Either … or” is या तो … या."]], EITHER),
  gap("ch:1", "यह कमरा न बड़ा है ___ साफ़ ।", "This[0] room[1] is[4] neither[2] big[3] nor[5] clean[6].", "न", [["या","या is “or”. “Neither … nor” is न … न."], ["और","और is “and”. “Neither … nor” is न … न."]], EITHER),
  gap("ch:2", "___ गर्मी हो चाहे ठंड, वह रोज़ सैर करने जाता है ।", "Whether[0] it's[2] hot[1] or[3] cold[4], he[5] goes[9+10] for a walk[7+8] {every day}[6].", "चाहे", [["न","न … न is “neither … nor”."], ["तो","“Whether … or” is चाहे … चाहे (or चाहे … या)."]], EITHER),
  gap("ch:3", "चाहे कोई कुछ भी क्यों ___ कहे, मैं यहीं रहूँगा ।", "{No matter}[0+4+5] what[2+3] anyone[1] says[6], I'll[7] stay[9] {right here}[8]. (a man speaking)", "न", [["भी","The formula is चाहे … क्यों न + subjunctive."], ["तो","The formula is चाहे … क्यों न + subjunctive."]], EITHER),
  meaning("ch:4", "या तो चुप रहो या कमरे से बाहर जाओ ।", "Either keep quiet or leave the room.", [["Neither keep quiet nor leave the room.","या तो … या is “either … or”."], ["Keep quiet and stay in the room.","या तो … या offers a choice: keep quiet, or go out."]], EITHER),
  mc("ch:5", "Which means “I'll go whether you come or not”?", "चाहे तुम आओ या न आओ, मैं जाऊँगा ।", [["जब तुम आओ या न आओ, मैं जाऊँगा ।","जब is “when”. “Whether … or” is चाहे … या."], ["न तुम आओ न आओ, मैं जाऊँगा ।","न … न is “neither … nor”."]], EITHER, {say: "चाहे तुम आओ या न आओ, मैं जाऊँगा ।", en: "I[6] {will go}[7] whether[0] you[1] come[2] or[3] not[4+5]. (a man speaking)"}),
  meaning("ch:6", "न वह आया, न उसका फ़ोन आया ।", "He neither came nor phoned.", [["Either he came or he phoned.","न … न is “neither … nor”."], ["He came, but didn't phone.","Both are negative: he didn't come and didn't phone."]], EITHER)
];

const build = [
  tiles("tl:0", "We[0] {will help}[4+5+6] that[1] old[2] woman[3].", ["हम","उस","बूढ़ी","औरत","की","मदद","करेंगे"], [["का","मदद is feminine — औरत की मदद."], ["ने","ने is used only in the perfective. करेंगे is future."], ["मददा","Not a word. मदद is a noun and never takes -ā."]], {alt: [["उस","बूढ़ी","औरत","की","मदद","हम","करेंगे"]]}),
  tiles("tl:1", "Sita[0+1] tried[4+5+6] to open[3] the window[2].", ["सीता","ने","खिड़की","खोलने","की","कोशिश","की"], [["खोलना","Before की the infinitive is oblique — खोलने की कोशिश."], ["किया","कोशिश is feminine — कोशिश की."]]),
  tiles("tl:2", "My[0] grandmother[1] {was born}[2+3+7+8] in[6] a[4] village[5].", ["मेरी","दादी","का","जन्म","एक","गाँव","में","हुआ","था"], [["की","जन्म is masculine — दादी का जन्म."], ["हुई","हुई would agree with दादी. The subject is जन्म — हुआ."]], {alt: [["मेरी","दादी","का","जन्म","गाँव","में","हुआ","था"]]}),
  tiles("tl:3", "Raj[0+1] misses[5+6+7] his[2] mother[3+4].", ["राज","को","अपनी","माँ","की","याद","आती","है"], [["आता","याद is feminine — याद आती है."], ["ने","याद आना takes को, not ने."]], {alt: [["राज","को","अपनी","माँ","याद","आती","है"]]}),
  tiles("tl:4", "We[0] {could see}[2+3+4+5] the mountains[1].", ["हमें","पहाड़","दिखाई","दे","रहे","थे"], [["हमने","दिखाई देना takes no ने — हमें."], ["रहा","पहाड़ here is plural — दे रहे थे."], ["दिखाईया","Not a word. The fixed form is दिखाई देना."]], {alt: [["पहाड़","हमें","दिखाई","दे","रहे","थे"]]}),
  tiles("tl:5", "I[0] {didn't go}[3+4] anywhere[2] today[1]. (a man speaking)", ["मैं","आज","कहीं","नहीं","गया"], [["कहाँ","कहाँ is the question “where?”."], ["गई","गई is feminine. The speaker is a man."]], {alt: [["आज","मैं","कहीं","नहीं","गया"]]}),
  tiles("tl:6", "Give[5] the children[0+1] three[2+3] sweets[4] each.", ["बच्चों","को","तीन","तीन","मिठाइयाँ","दो"], [["तीनों","तीनों is “all three”."], ["मिठाई","मिठाई is singular. Three sweets — मिठाइयाँ."]]),
  tiles("tl:7", "Don't[2] bring[3] any[0] presents or anything[1].", ["कोई","तोहफ़ा-वोहफ़ा","मत","लाना"], [["किसी","किसी is oblique. Here कोई goes with the object, in the direct case."], ["लाया","लाया is the perfective. A command uses the infinitive — मत लाना."]]),
  tiles("tl:8", "Either[0+1] phone[2+3] or[4] write[6] a letter[5].", ["या","तो","फ़ोन","करो","या","चिट्ठी","लिखो"], [["न","न … न is “neither … nor”."], ["और","और is “and”. “Either … or” is या तो … या."]], {alt: [["फ़ोन","करो","या","चिट्ठी","लिखो"]]}),
  tiles("tl:9", "Raj[0] neither[1] reads[2+3] nor[4] writes[5+6].", ["राज","न","पढ़ता","है","न","लिखता","है"], [["या","या is “or”. “Neither … nor” is न … न."], ["पढ़ती","पढ़ती is feminine. राज is a man."]]),
  tiles("tl:10", "Whether[0] rich[1] or[3] poor[4], everyone[5] comes[7+8] here[6] (lit. “… be[2] …”).", ["चाहे","अमीर","हो","या","ग़रीब","सब","यहाँ","आते","हैं"], [["न","न … न is “neither … nor”."], ["आता","आता is singular. सब “everyone” takes the plural — आते हैं."]], {alt: [["सब","यहाँ","आते","हैं","चाहे","अमीर","हो","या","ग़रीब"]]}),
  tiles("tl:11", "Grandma[0+1] {was looked after}[3+4+5] well[2].", ["दादी","की","अच्छी","देखभाल","की","गई"], [["गया","गया is masculine. देखभाल is feminine — की गई."], ["किया","किया is masculine. The subject of the passive is देखभाल, feminine — की गई."], ["देखभाला","Not a word. देखभाल is a noun and never takes -ā."]])
];

const mean = [
  meaning("mn:0", "पुलिस चोर का पीछा कर रही थी ।", "The police were chasing the thief.", [["The thief was chasing the police.","चोर का पीछा is “the thief's following”: the thief is the one followed."], ["The police were waiting for the thief.","“Wait for” would be का इंतज़ार करना."]]),
  meaning("mn:1", "हम आपका इंतज़ार कर रहे थे ।", "We were waiting for you.", [["You were waiting for us.","हम is the subject: we were waiting."], ["We were looking for you.","“Look for” would be की तलाश करना."]]),
  meaning("mn:2", "दादी को अपने बचपन की बहुत सारी बातें याद हैं ।", "Grandma remembers lots of things from her childhood.", [["Grandma has forgotten lots of things from her childhood.","याद होना is “to be remembered”."], ["Grandma reminds us of her childhood.","“Remind” would be याद दिलाना."]]),
  meaning("mn:3", "मेरे दादा जी का देहान्त मेरे जन्म से पहले हो गया था ।", "My grandfather died before I was born.", [["My grandfather was born before me.","देहान्त is “death”."], ["My grandfather died when I was born.","से पहले is “before”."]]),
  meaning("mn:4", "इस इमारत का इस्तेमाल अब स्कूल के लिए किया जाता है ।", "This building is now used as a school.", [["This building is now being built for a school.","इस्तेमाल is “use”."], ["The school no longer uses this building.","अब … किया जाता है is “is now used”."]]),
  meaning("mn:5", "दूर से किसी के गाने की आवाज़ सुनाई दी ।", "From far away came the sound of someone singing.", [["Someone far away heard a song.","सुनाई देना — the sound is what is heard."], ["From far away someone was seen singing.","सुनाई देना is “to be heard”. “Seen” would be दिखाई देना."]]),
  meaning("mn:6", "उसे इस काम का बहुत अनुभव है ।", "He has a lot of experience of this work.", [["He has a lot of interest in this work.","अनुभव is “experience”."], ["This work is giving him a lot of trouble.","अनुभव is “experience”, not “trouble”."]])
];

const usage = [
  mc("us:0", "In सीता ने साइकिल का इस्तेमाल किया, what does किया agree with?", "इस्तेमाल, the base noun", [["साइकिल, the object","साइकिल “possesses” इस्तेमाल with का. The verb agrees with the base noun."], ["सीता, the doer","With ने the verb never agrees with the doer."]], CONJNE),
  mc("us:1", "Why is it बस का इंतज़ार, not बस की इंतज़ार?", "का agrees with इंतज़ार, which is masculine", [["बस is masculine","बस is feminine. का agrees with इंतज़ार."], ["इंतज़ार never takes की with vehicles","It is about gender only: इंतज़ार is masculine, so का."]], CONJ),
  mc("us:2", "In मेरी बेटी का जन्म दिल्ली में हुआ, what is the subject of हुआ?", "the event itself, जन्म", [["the person born, बेटी","बेटी “possesses” जन्म with का. The event is the subject, so हुआ, not हुई."], ["the place, दिल्ली","दिल्ली takes में. The subject is जन्म."]], EVENT),
  mc("us:3", "Which of these does not take ने in the perfective?", "दिखाई देना and सुनाई देना", [["याद करना and याद रखना","These are transitive and take ने."], ["की कोशिश करना","कोशिश करना takes ने — मैंने कोशिश की."]], SUNAI),
  mc("us:4", "What does the echo word in चाय-वाय add?", "“or something like that”", [["“a lot of”","An echo word makes the noun vague, not bigger."], ["“very hot”","“Piping hot” would be the repetition गरम गरम."]], ECHO),
  mc("us:5", "Which pair joins two words of similar meaning, rather than a word and its echo?", "नौकर-चाकर", [["चाय-वाय","The second half just echoes चाय and has no meaning of its own."], ["भीड़-भाड़","The second half just echoes भीड़."]], ECHO),
  mc("us:6", "Repeating a word, as in दो दो or अलग अलग, can show …", "distribution: “each”, “separately”", [["a question","Questions use क्या and the k- words."], ["the past tense","Repetition has nothing to do with tense."]], REP)
];

const unit = {
  id: "unit16", n: 16, title: "He was praising you", titleHi: "वह तुम्हारी तारीफ़ कर रहा था",
  scope: "Conjunct verbs: adjective or noun + करना/होना; base noun possessed by the object (का इंतज़ाम करना, का इंतज़ार करना, का इस्तेमाल करना, का पीछा करना, की तलाश करना, की देखभाल करना, की निंदा करना, की तारीफ़ करना, की मदद करना), agreement with the base noun under ने and in the passive; की कोशिश करना with the oblique infinitive; तलाश करना, तलाशना; intransitive event verbs (का जन्म होना, की शादी होना, का देहान्त होना, का उद्घाटन होना); याद करना/होना/आना/दिलाना/रखना/रहना; दिखाई देना/पड़ना and सुनाई देना/पड़ना without ने; कहीं and its senses, कहीं का; repetition for distribution, variety and emphasis; echo words (चाय-वाय, ठीक-ठाक, नौकर-चाकर); या तो … या, न … न, चाहे … चाहे, चाहे … क्यों न हो",
  pages: "book 206–219",
  skills: {conj: "Conjunct verbs", yad: "Events and याद", kahin: "कहीं", rep: "Repetition, echo words", either: "Either, neither, whether", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अनुभव","experience","n","m"],["अहम","important","a"],["आलसी","lazy","a"],["इंतज़ाम","arrangement","n","m"],["का इंतज़ाम करना","to arrange","v"],
    ["इंतज़ार","wait, waiting","n","m"],["का इंतज़ार करना","to wait for","v"],["इनसान","human being, person","n","m"],["इमारत","building","n","f"],["इस्तेमाल","use","n","m"],
    ["का इस्तेमाल करना","to use","v"],["ई-मेल","email","n","m"],["उद्घाटन","inauguration","n","m"],["उल्लू","‘owl’, stupid person","n","m"],["कंप्यूटर","computer","n","m"],
    ["कम करना","to reduce","v"],["क़सूर","fault, error","n","m"],["कहीं","somewhere; somehow","x"],["कहीं और","somewhere else","x"],["कहीं का","downright, utter (in insults)","x"],
    ["कहीं ज़्यादा","particularly, much more","x"],["कहीं न कहीं","somewhere or other","x"],["कहीं नहीं","nowhere","x"],["कहीं भी","anywhere at all","x"],["कार्यक्रम","programme","n","m"],
    ["कुली","porter","n","m"],["कोशिश","attempt","n","f"],["की कोशिश करना","to try","v"],["खाँसना","to cough","v"],["गँवाना","to waste, squander","v"],
    ["गप","gossip","n","f"],["गुज़ारा","livelihood, subsistence","n","m"],["चाहे … चाहे","whether … or","x"],["चिंता","anxiety, concern","n","f"],["जंगली","wild","a"],
    ["जन्म","birth","n","m"],["का जन्म होना","to be born","v"],["जानवर","animal","n","m"],["ज़िंदगी","life","n","f"],["डूबना","to be immersed, drown","v"],
    ["ढंग","way, manner","n","m"],["तरह तरह का","of various kinds","x"],["तलाश","search","n","f"],["की तलाश करना","to search for","v"],["तलाशना","to search for","v"],
    ["तहज़ीब","refinement, culture","n","f"],["तारीफ़","praise","n","f"],["की तारीफ़ करना","to praise","v"],["दुनिया","world","n","f"],["देखभाल","supervision, care","n","f"],
    ["की देखभाल करना","to take care of","v"],["देहान्त","death, demise","n","m"],["का देहान्त होना","to die","v"],["न … न","neither … nor","x"],["निंदा","blame, speaking ill","n","f"],
    ["की निंदा करना","to blame","v"],["निकालना","to extract, bring out","v"],["निबंध","essay","n","m"],["नौकर-चाकर","servants etc.","n","m"],["पति-देव","‘respected husband’","n","m"],
    ["का पीछा करना","to follow","v"],["पेंसिल","pencil","n","f"],["पेशा","profession","n","m"],["प्याज़","onion","n","m"],["का प्रयोग करना","to use","v"],
    ["बेवक़ूफ़","stupid","a"],["की मदद करना","to help","v"],["मर्द","man, male","n","m"],["माला","garland","n","f"],["मालूम करना","to ascertain, find out","v"],
    ["मीटिंग","meeting","n","f"],["या तो … या","either … or","x"],["याद","memory","n","f"],["याद आना","to be recalled, come to mind, be missed","v"],["याद करना","to remember, learn by heart; to think of","v"],
    ["याद दिलाना","to remind","v"],["याद रखना","to keep in mind, not forget","v"],["याद रहना","to remain remembered","v"],["याद होना","to be remembered","v"],["लहसुन","garlic","n","m"],
    ["सदा","always, ever","x"],["सवारी","rider, passenger","n","f"],["साधन","means","n","m"],["सुनाई देना","to be heard, be audible","v"],["हरेक","each, every","x"],
    ["हल","solution","n","m"],["हल होना","to be solved","v"],["ठीक-ठाक","fine, in good shape","a"],["भीड़-भाड़","hustle and bustle","n","f"],["गप-शप","chit-chat","n","f"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "conj", title: "की मदद करना", desc: "Conjunct verbs with का and की, agreement with the base noun", skill: "conj", items: conj},
    {id: "yad", title: "याद आना, जन्म होना", desc: "Events, याद verbs, दिखाई देना and सुनाई देना", skill: "yad", items: yad},
    {id: "kahin", title: "कहीं", desc: "“Somewhere”, “much”, “lest”, “utter”", skill: "kahin", items: kahin},
    {id: "rep", title: "दो दो, चाय-वाय", desc: "Repeated words and echo words", skill: "rep", items: rep},
    {id: "either", title: "या तो, न … न, चाहे", desc: "“Either … or”, “neither … nor”, “whether … or”", skill: "either", items: either},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Conjunct verbs, echo words, repetition", skill: "usage", items: usage}
  ],
  test: {vocab: 4, conj: 3, yad: 3, kahin: 2, rep: 3, either: 3, build: 2, meaning: 1, usage: 1},
  _grammar: [
    {id: "conjunct-verbs-2", title: "Conjunct verbs, second type: the base noun is “possessed” by the object with का/की, agreeing with the base noun (का इंतज़ाम करना, का इंतज़ार करना, का इस्तेमाल करना, का पीछा करना; की तलाश करना, की देखभाल करना, की निंदा करना, की तारीफ़ करना, की मदद करना); with ने and in the passive the verb agrees with the base noun (बच्चों की देखभाल की, कंप्यूटर का इस्तेमाल किया, नए घर की तलाश की जाएगी); की कोशिश करना with the oblique infinitive (फ़ोन करने की कोशिश की); some drop the possessive (तलाश करना) or become verbs (तलाशना). First type: adjective/noun + करना, intransitive with होना (ठीक करना, कम करना, शुरू होना)"},
    {id: "event-verbs", title: "Intransitive conjunct verbs for events, with the event as subject: का जन्म होना, की शादी होना, का तलाक़ होना, का देहान्त होना, का उद्घाटन होना"},
    {id: "yad-verbs", title: "याद “memory”: याद करना “remember, learn by heart, think of, summon”, याद होना “be remembered”, याद आना “come to mind, be missed”, याद दिलाना “remind”, याद रखना “keep in mind”, याद रहना “remain remembered”; दिखाई देना/पड़ना “be visible” and सुनाई देना/पड़ना “be audible”, without ने"},
    {id: "kahin", title: "कहीं “somewhere, anywhere”, कहीं और, कहीं नहीं, सब कहीं, कहीं भी, कहीं न कहीं; “somehow” (कहीं पैसे मिल जाएँ तो …), “considerably” (कहीं ज़्यादा), “lest” (कहीं … न + subjunctive), rhetorical questions; कहीं का in insults (बदमाश कहीं का !)"},
    {id: "repetition-echo", title: "Repetition for distribution (एक एक रुपया, अलग अलग), variety (तरह तरह के, कहाँ कहाँ, कौन कौन) and emphasis (साफ़ साफ़, बहुत बहुत, गरम गरम); echo words generalizing a word (चाय-वाय, पेंसिल-वेंसिल, मीटिंग-शीटिंग), fixed echo pairs (गप-शप, ठीक-ठाक, भीड़-भाड़) and pairs of similar words (नौकर-चाकर, मिलना-जुलना, जान-बूझकर)"},
    {id: "either-neither-whether", title: "या (तो) … या “either … or”; न … न “neither … nor”; चाहे … चाहे / या “whether … or”; चाहे alone “no matter whether”; चाहे … क्यों न हो “no matter how/what”"}
  ]
};

writeUnit(16, unit, {forms, fake});
