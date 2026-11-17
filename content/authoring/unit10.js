"use strict";
// Unit 10 (book pp. 118–128): मैं क्या बोलूँ ?. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 126–127, Quick Vocab pp. 119 and 122, and words from the grammar sections)
  "बार":"bār","अवश्य":"avaśy","असंभव":"asambhav","आख़िर":"ākhir","आटो":"āṭo","आधा":"ādhā","इतना":"itnā","इलाज":"ilāj","उचित":"ucit",
  "उतारना":"utārnā","उम्मीद":"ummīd","कंजूस":"kanjūs","काँटा":"kā̃ṭā","कामचोर":"kāmcor","ख़रीदारी":"kharīdārī","खींचना":"khī̃cnā",
  "ख़ुद":"khud","गर्व":"garv","गाय":"gāy","गुस्सा":"gussā","चपरासी":"caprāsī","चम्मच":"cammac","चाहना":"cāhnā","छुरी":"churī",
  "ज़िम्मेदारी":"zimmedārī","झूठ":"jhūṭh","टेढ़ा":"ṭeṛhā","डेढ़":"ḍeṛh","तुरंत":"turant","दाम":"dām","निवेदन":"nivedan","नोट":"noṭ",
  "पकड़ना":"pakaṛnā","पड़ना":"paṛnā","पता":"patā","पुलिस":"pulis","बोरियत":"boriyat","भारी":"bhārī","भूल":"bhūl","भूलना":"bhūlnā",
  "मंदिर":"mandir","मक्खी":"makkhī","मक्खियाँ":"makkhiyā̃","मगर":"magar","मदद":"madad","मामला":"māmlā","माहिर":"māhir","यक़ीन":"yaqīn",
  "यदि":"yadi","रिक्शा":"rikśā","लिस्ट":"lisṭ","वक़्त":"vaqt","वापस":"vāpas","विश्वास":"viśvās","संभव":"sambhav","सफ़ाई":"safāī",
  "सलाह":"salāh","सीढ़ी":"sīṛhī","हफ़्ता":"haftā","बँटाना":"bãṭānā","मेसेज":"mesej","वाला":"vālā","दूधवाला":"dūdhvālā","ऊपरवाला":"ūparvālā",
  // the subjunctive (10.1, 10.2)
  "बोलूँ":"bolū̃","बोले":"bole","बोलें":"bolẽ","करे":"kare","करें":"karẽ","आऊँ":"āū̃","आए":"āe","आएँ":"āẽ",
  "जाऊँ":"jāū̃","जाए":"jāe","जाएँ":"jāẽ","हों":"hõ","लूँ":"lū̃","लें":"lẽ","दूँ":"dū̃","दें":"dẽ","बनाऊँ":"banāū̃","बनाए":"banāe",
  "पढ़ूँ":"paṛhū̃","पढ़े":"paṛhe","लिखूँ":"likhū̃","लिखे":"likhe","पड़े":"paṛe","पड़ें":"paṛẽ","पड़ूँ":"paṛū̃","सोएँ":"soẽ","सोए":"soe",
  "कहे":"kahe","कहें":"kahẽ","कहूँ":"kahū̃","मिले":"mile","मिलें":"milẽ","पिएँ":"piẽ","पिए":"pie","चाहें":"cāhẽ","चाहे":"cāhe",
  "लाऊँ":"lāū̃","लाए":"lāe","खाएँ":"khāẽ","खाए":"khāe","पहुँचें":"pahũcẽ",
  // चाहना (10.3)
  "चाहता":"cāhtā","चाहती":"cāhtī","चाहते":"cāhte",
  // -वाला (10.5)
  "दूधवाली":"dūdhvālī","दूधवाले":"dūdhvāle","रिक्शेवाले":"rikśevāle","रिक्शेवाला":"rikśevālā","रिक्शेवाली":"rikśevālī",
  "नीचेवाले":"nīcevāle","नीचेवाला":"nīcevālā","नीचेवाली":"nīcevālī","ऊपरवाली":"ūparvālī","ऊपरवाले":"ūparvāle",
  "बोलनेवाले":"bolnevāle","बोलनेवाला":"bolnevālā","चलनेवाली":"calnevālī","चलनेवाला":"calnevālā","खानेवाले":"khānevāle","खानेवाली":"khānevālī",
  "आनेवाले":"ānevāle","आनेवाला":"ānevālā","रहनेवाली":"rahnevālī","रहनेवाला":"rahnevālā","रहनेवाले":"rahnevāle",
  "गानेवाली":"gānevālī","गानेवाला":"gānevālā","चलानेवाला":"calānevālā","जानेवाला":"jānevālā","दिल्लीवाली":"dillīvālī","दिल्लीवाला":"dillīvālā","दिल्लीवाले":"dillīvāle",
  // forms produced by earlier units' rules
  "आऊँगा":"āū̃gā","आऊँगी":"āū̃gī","खाएँगे":"khāẽge","चलो":"calo","कहिए":"kahie","इतनी":"itnī","अकेली":"akelī","रिक्शे":"rikśe",
  "बनाऊँगा":"banāū̃gā","पहुँचना":"pahũcnā","पहुँचेंगे":"pahũcẽge","चलूँगा":"calū̃gā","लिखना":"likhnā","पढ़ना":"paṛhnā",
  "मिलो":"milo","वाली":"vālī","वाले":"vāle","बोलने":"bolne","चलने":"calne","होने":"hone","आने":"āne","खानेवाला":"khānevālā","गानेवाले":"gānevāle","करनेवाली":"karnevālī","करनेवाला":"karnevālā","होनेवाला":"honevālā","होनेवाली":"honevālī","बोलो":"bolo","बोलिए":"bolie","लाओ":"lāo","सोते":"sote","लाता":"lātā","बताओ":"batāo","रहो":"raho"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "देऊँ":"deū̃","लेऊँ":"leū̃","देएँ":"deẽ","लेएँ":"leẽ",
  "बोलनावाले":"bolnāvāle","चलनावाली":"calnāvālī","रहनावाली":"rahnāvālī","आनावाले":"ānāvāle","करनावाला":"karnāvālā","जानावाला":"jānāvālā",
  "होनावाली":"honāvālī"
};

const SUB = "The subjunctive is the future without -gā/-gī/-ge: मैं बोलूँ, तू, यह, वह बोले, तुम बोलो, हम, आप, ये, वे बोलें. Masculine and feminine forms are the same.";
const IRR = "होना, लेना and देना follow their futures: हूँ, हो, हों — लूँ, ले, लें — दूँ, दे, दें.";
const KI = "After expressions of wish, request, possibility or necessity (ज़रूरी है कि, संभव है कि, निवेदन है कि, … से कहो कि) the कि clause takes the subjunctive.";
const AUX = "The subjunctive हो, हों as an auxiliary gives “may be …ing”, “may …”: खा रहा हो, जानती हो. The future होगा is surer: “must be”.";
const CHAH = "चाहना + direct infinitive when the one who wants is the one who acts (मैं जाना चाहता हूँ), with a different person, चाहना कि + subjunctive (मैं चाहता हूँ कि तुम जाओ).";
const COND = "अगर (or यदि) … तो — the अगर clause may be imperfective, future or subjunctive; the तो clause is usually future or a command. अगर can be dropped, तो cannot.";
const VALA = "वाला, वाली, वाले agree like an -ā adjective. It relates a person or thing to the noun, adverb or oblique infinitive before it.";
const VINF = "Before वाला the infinitive is oblique, in -ne: बोलनेवाला, आनेवाला.";

const sub = [
  gap("su:0", "मैं आपके लिए चाय ___ ?", "Shall I[0] make[4] tea[3] for[2] you[1]?", "बनाऊँ", [["बनाए","बनाए goes with तू, यह and वह. मैं takes -ū̃: बनाऊँ."], ["बनाऊँगा","बनाऊँगा is the future, “will I make?”, a plain question about what will happen. An offer, “shall I?”, uses the subjunctive."]], SUB),
  gap("su:1", "शायद सीता आज शाम को ___ ।", "Sita[1] {may come}[0+5] {this evening}[2+3+4].", "आए", [["आएँ","आएँ is plural. Sita, spoken of plainly, takes the singular: आए."], ["आऊँ","आऊँ goes with मैं."]], "शायद “perhaps” often takes the subjunctive: शायद सीता आए “Sita may come”."),
  gap("su:2", "आप लोग कल सुबह नौ बजे ___ ।", "You[0+1] should come[6] {at nine}[4+5] {tomorrow morning}[2+3].", "आएँ", [["आए","आए is singular. आप always takes plural agreement: आएँ."], ["आओ","आओ goes with तुम. आप takes -ẽ."]], "The आप subjunctive is a polite suggestion or mild command."),
  gap("su:3", "मैं यह चिट्ठी किस को ___ ?", "Who[3] should I[0] give[5] this[1] letter[2] to[4]?", "दूँ", [["देऊँ","Not a word: देना is irregular. Its future is दूँगा, so the subjunctive is दूँ."], ["दे","दे goes with तू, यह and वह. मैं takes दूँ."]], IRR),
  gap("su:4", "शायद वह आज घर पर न ___ ।", "He[1] {may not be}[0+5+6] {at home}[3+4] today[2].", "हो", [["हों","हों is plural. वह, spoken of plainly, takes हो."], ["हूँ","हूँ goes only with मैं."]], IRR),
  gap("su:5", "बच्चे क्लास में हिन्दी ही ___ ।", "{The children}[0] {should speak}[5] only[4] Hindi[3] in[2] class[1].", "बोलें", [["बोले","बोले is singular. बच्चे is plural: बोलें."], ["बोलूँ","बोलूँ goes only with मैं."]], SUB),
  gap("su:6", "मैं चाय ___ कि कॉफ़ी ?", "Should I[0] have[2] tea[1] or[3] coffee[4]?", "लूँ", [["लेऊँ","Not a word: लेना is irregular. Its future is लूँगा, so the subjunctive is लूँ."], ["ले","ले goes with तू, यह and वह. मैं takes लूँ."]], "Between two choices कि can mean “or”: लूँ कि … “should I take … or …?”."),
  mc("su:7", "Make it a suggestion (“shall we …?”)", "हम बाज़ार जाएँ ?", [["हम बाज़ार जाऊँ ?","जाऊँ goes with मैं. हम takes -ẽ: जाएँ."], ["हम बाज़ार जाए ?","जाए is singular. हम takes the plural: जाएँ."]], "Drop -ge from the future: जाएँगे → जाएँ.", {hi: "हम बाज़ार जाएँगे ।", audio: true, say: "हम बाज़ार जाएँ ?", en: "Shall we[0] go[2] {to the market}[1]?"}),
  mc("su:8", "What is the subjunctive of देना with आप?", "दें", [["देएँ","Not a word: देना is irregular. देंगे → दें."], ["देंगे","देंगे is the future. Drop -ge for the subjunctive: दें."]], IRR),
  mc("su:9", "What is the subjunctive of होना with वे?", "हों", [["हो","हो goes with तू, यह, वह and तुम. वे takes हों."], ["होंगे","होंगे is the future, “will be” or “must be”. Drop -ge for the subjunctive: हों."]], IRR),
  gap("su:10", "पिंकी यह बात किसी से न ___ ।", "Pinki[0] {should not}[5] tell[6] anyone[3+4] {this}[1+2].", "कहे", [["कहें","कहें is plural. Pinki, spoken of plainly, takes the singular: कहे."], ["कहूँ","कहूँ goes only with मैं."]], "The subjunctive is made negative with न — न कहे “should not tell”.")
];

const ki = [
  gap("ki:0", "ज़रूरी है कि बच्चे जल्दी ___ ।", "{It's}[1] important[0] that[2] {the children}[3] {go to sleep}[5] early[4].", "सोएँ", [["सोए","सोए is singular. बच्चे is plural: सोएँ."], ["सोते","सोते is the imperfective participle. After ज़रूरी है कि the verb is subjunctive."]], KI),
  gap("ki:1", "संभव है कि आज रात को पानी ___ ।", "{It's}[1] possible[0] that[2] {it may rain}[6+7] tonight[3+4+5].", "पड़े", [["पड़ें","पड़ें is plural. In पानी पड़ना “to rain” the subject पानी is singular."], ["पड़ूँ","पड़ूँ goes only with मैं."]], KI),
  gap("ki:2", "मेरा आप से निवेदन है कि आप यहाँ सिग्रेट न ___ ।", "My[0] request[3] {to you}[1+2] is[4] that[5] you[6] {do not smoke}[8+9+10] here[7].", "पिएँ", [["पिए","पिए is singular. आप takes the plural: पिएँ."], ["पियो","पियो is the तुम form. आप takes -ẽ."]], "निवेदन है कि “the request is that …” is a polite formula followed by the subjunctive."),
  gap("ki:3", "यह असंभव है कि मोहन झूठ ___ ।", "It[0] is[2] impossible[1] that[3] Mohan[4] {would lie}[5+6].", "बोले", [["बोलें","बोलें is plural. Mohan, spoken of plainly, takes the singular: बोले."], ["बोलो","बोलो goes with तुम."]], "संभव and असंभव है कि take the subjunctive: “it is (im)possible that he might …”."),
  gap("ki:4", "मुझे पूरा यक़ीन है कि राज कल ___ ।", "I[0] am[3] quite[1] sure[2] that[4] Raj[5] {will come}[7] tomorrow[6].", "आएगा", [["आए","आए is the subjunctive, for something uncertain or wished for. यक़ीन “confidence” calls for the future: आएगा."], ["आएगी","आएगी is feminine. Raj is a man."]], "A confident expectation (यक़ीन, विश्वास) takes the future, not the subjunctive."),
  gap("ki:5", "मोहन से कहिए कि वह मुझे फ़ोन ___ ।", "Please tell[2] Mohan[0+1] that[3] he[4] {should phone}[6+7] me[5].", "करे", [["करो","करो goes with तुम. The subject of the कि clause is वह — करे."], ["करें","करें is plural. वह, spoken of plainly, takes the singular: करे."]], "Reported commands: X से कहो कि … + subjunctive “tell X to …”."),
  gap("ki:6", "उचित नहीं है कि तुम इतनी रात को अकेली बाहर ___ ।", "It {isn't}[1+2] proper[0] that[3] you[4] {go out}[9+10] alone[8] {so late at night}[5+6+7]. (to a woman)", "जाओ", [["जाए","जाए goes with तू, यह and वह. तुम takes जाओ."], ["जाऊँ","जाऊँ goes only with मैं."]], "उचित है कि “it is proper that” takes the subjunctive. The तुम subjunctive looks like the command form: जाओ.")
];

const aux = [
  gap("ax:0", "मोहन को अभी फ़ोन मत करो, शायद वह खाना खा रहा ___ ।", "{Don't}[4] phone[3+5] Mohan[0+1] now[2]; he[7] {may be}[6+11] {having his meal}[8+9+10].", "हो", [["हों","हों is plural. वह, spoken of plainly, takes हो."], ["हूँ","हूँ goes only with मैं."]], AUX),
  gap("ax:1", "शायद वह अमरीकन लड़की भी हिन्दी ___ हो ।", "Perhaps[0] that[1] American[2] girl[3] knows[6+7] Hindi[5] too[4].", "जानती", [["जानता","जानता is masculine. लड़की is feminine."], ["जानते","जानते is masculine plural. लड़की is feminine singular."]], "The imperfective participle + हो — “may know, may be in the habit of”."),
  mc("ax:2", "Make it less certain (“may be …ing”)", "राज दफ़्तर में काम कर रहा हो ।", [["राज दफ़्तर में काम कर रहा है ।","है states a fact: “Raj is working”. “May be working” needs the subjunctive हो."], ["राज दफ़्तर में काम कर रहे हो ।","रहे is plural. Raj, spoken of plainly, takes रहा."]], "होगा “must be” becomes हो “may be”; रहा stays.", {hi: "राज दफ़्तर में काम कर रहा होगा ।", audio: true, say: "राज दफ़्तर में काम कर रहा हो ।", en: "Raj[0] {may be working}[3+4+5+6] in[2] the office[1]."}),
  gap("ax:3", "अगर पिता जी आराम कर रहे ___ तो हम बाद में आएँगे ।", "If[0] Father[1] {is resting}[3+4+5+6], we[8] {will come}[11] later[9+10].", "हों", [["हो","हो is singular. पिता जी takes the plural of respect: हों."], ["हूँ","हूँ goes only with मैं."]], "The continuous may stand in an अगर clause, with the subjunctive auxiliary."),
  mc("ax:4", "Which means “Perhaps the guests are coming now”?", "शायद मेहमान अभी आ रहे हों ।", [["शायद मेहमान अभी आ रहे थे ।","थे is past: “perhaps the guests were coming”."], ["शायद मेहमान अभी आ रही हों ।","रही is feminine. मेहमान is masculine: आ रहे हों."]], AUX)
];

const chah = [
  gap("ch:0", "सुहास अगले साल लंदन ___ चाहता है ।", "Suhas[0] wants[5+6] {to go}[4] to London[3] {next year}[1+2].", "जाना", [["जाने","चाहना takes the direct infinitive: जाना चाहता है."], ["जाए","The subjunctive needs कि and a different person: चाहता है कि वह जाए. Here Suhas himself will go."]], CHAH),
  gap("ch:1", "मैं आप से कुछ पूछना ___ हूँ ।", "I[0] want[5+6] {to ask}[4] you[1+2] something[3]. (a woman speaking)", "चाहती", [["चाहता","चाहता is masculine. The speaker is a woman."], ["चाहिए","चाहिए is a separate construction with को (मुझे … चाहिए). With मैं as subject the verb is चाहना."]], "चाहना is a regular verb: चाहता, चाहती, चाहते + है."),
  gap("ch:2", "सीता चाहती है कि मैं उसकी चिट्ठी ___ ।", "Sita[0] wants[1+2] me[4] {to read}[7] her[5] letter[6].", "पढ़ूँ", [["पढ़ना","Sita wants someone else to read, so the infinitive will not do. Use कि + subjunctive: कि मैं पढ़ूँ."], ["पढ़े","पढ़े goes with तू, यह and वह. मैं takes पढ़ूँ."]], CHAH),
  gap("ch:3", "हम चाहते हैं कि आप हमारे साथ खाना ___ ।", "We[0] want[1+2] you[4] {to have}[8] a meal[7] with[6] us[5].", "खाएँ", [["खाइए","खाइए is a command. After चाहना कि the verb is subjunctive: खाएँ."], ["खाए","खाए is singular. आप takes the plural: खाएँ."]], CHAH),
  gap("ch:4", "मोहन चाहता था कि हम उसके घर ___ ।", "Mohan[0] wanted[1+2] us[4] {to come}[7] to his[5] house[6].", "आएँ", [["आएँगे","आएँगे is the future. After चाहना कि the verb is subjunctive: आएँ."], ["आओ","आओ goes with तुम. हम takes आएँ."]], "The subjunctive stays the same after a past चाहता था."),
  mc("ch:5", "Which means “I want to go home”? (a man speaking)", "मैं घर जाना चाहता हूँ ।", [["मुझे घर जाना चाहता है ।","चाहना takes a direct subject, मैं. मुझे … goes with चाहिए, a separate construction."], ["मैं घर जाने चाहता हूँ ।","चाहना takes the direct infinitive, जाना, not the oblique."]], CHAH),
  mc("ch:6", "Change it to “Mother wants you to …”", "माँ चाहती हैं कि आप कल फिर आएँ ।", [["माँ चाहती हैं कि आप कल फिर आइए ।","आइए is a command and cannot follow चाहना कि. Use the subjunctive: आएँ."], ["माँ चाहती हैं कि आप कल फिर आएँगे ।","आएँगे is the future. After चाहना कि the verb is subjunctive: आएँ."]], CHAH, {hi: "आप कल फिर आइए ।", audio: true, say: "माँ चाहती हैं कि आप कल फिर आएँ ।", en: "Mother[0] wants[1+2] you[4] {to come}[7] again[6] tomorrow[5]."}),
  gap("ch:7", "राज चाहता है कि उसकी बहिनें उसकी मदद ___ ।", "Raj[0] wants[1+2] his[4] sisters[5] {to help}[7+8] him[6].", "करें", [["करे","करे is singular. बहिनें is plural: करें."], ["करना","Raj wants others to act, so use कि + subjunctive, not the infinitive."]], "मदद करना “to help”: X की मदद करना “to help X”.")
];

const cond = [
  gap("co:0", "अगर तुम्हारे पास वक़्त हो ___ मेरी मदद करो ।", "If[0] you[1+2] have[4] time[3], {then}[5] help[7+8] me[6].", "तो", [["कि","कि introduces a “that” clause. The “then” clause of a condition starts with तो."], ["और","और is “and”. A condition needs तो."]], COND),
  gap("co:1", "अगर आप लोग शाम को ___ तो हम साथ खाना खाएँगे ।", "If[0] you[1+2] come[5] {in the evening}[3+4], {then}[6] we[7] {will eat}[9+10] together[8].", "आएँ", [["आओ","आओ goes with तुम. आप लोग takes -ẽ: आएँ."], ["आऊँ","आऊँ goes only with मैं."]], COND),
  gap("co:2", "अगर दुकान बंद हो तो मैं कल वापस ___ ।", "If[0] the shop[1] {is shut}[2+3], {then}[4] I[5] {will come back}[7+8] tomorrow[6]. (a man speaking)", "आऊँगा", [["आऊँगी","आऊँगी is feminine. The speaker is a man."], ["आएगा","आएगा goes with तू, यह and वह. मैं takes आऊँगा."]], "The तो clause usually has the future: “I will come back”."),
  gap("co:3", "___ आप को कोई तकलीफ़ हो तो मुझे बताइए ।", "If[0] you[1+2] have[5] any[3] trouble[4], {please tell}[8] me[7].", "अगर", [["कि","कि introduces a “that” clause. “If” is अगर."], ["तो","तो begins the second clause, “then”. The first clause begins with अगर."]], COND),
  gap("co:4", "अगर तुम बाज़ार जा रहे हो तो मेरे लिए फल ___ ।", "If[0] you[1] {are going}[3+4+5] to the market[2], {then}[6] bring[10] some fruit[9] for[8] me[7].", "लाओ", [["लाऊँ","लाऊँ goes only with मैं."], ["लाता","लाता is the imperfective participle. The तो clause here is a command: लाओ."]], "The तो clause can be a command, and the अगर clause can be continuous."),
  gap("co:5", "अगर तुम्हें बस न ___ तो आटो से आओ ।", "If[0] you[1] {don't get}[3+4] a bus[2], {then}[5] come[8] by[7] auto[6].", "मिले", [["मिलो","The subject of मिलना here is बस, the thing that is found, not तुम — मिले."], ["मिलें","मिलें is plural. बस is singular."]], "With मिलना “to be found, got”, the thing got is the subject and the person takes को."),
  mc("co:6", "Which conditional is grammatical?", "पिंकी घर पर हो तो उसे यह किताब दो ।", [["अगर पिंकी घर पर हो उसे यह किताब दो ।","तो cannot be dropped. Only अगर is optional."], ["अगर पिंकी घर पर हो कि उसे यह किताब दो ।","The second clause begins with तो, not कि."]], COND, {say: "पिंकी घर पर हो तो उसे यह किताब दो ।", en: "{If Pinki is}[0+3] {at home}[1+2], {then}[4] give[8] her[5] this[6] book[7]."}),
  gap("co:7", "जल्दी चलो, ___ तो हमें देर होगी ।", "Hurry[0+1], otherwise[2+3] we[4] {will be late}[5+6].", "नहीं", [["अगर","अगर तो is not a phrase. “Otherwise” is नहीं तो."], ["भी","भी तो is not “otherwise”. “Otherwise” is नहीं तो."]], "नहीं तो “otherwise, if not”.")
];

const vala = [
  gap("va:0", "हमारा ___ हर सुबह छह बजे आता है ।", "Our[0] milkman[1] comes[6+7] {every morning}[2+3] {at six}[4+5].", "दूधवाला", [["दूधवाली","दूधवाली is feminine, a milkwoman. आता is masculine."], ["दूधवाले","दूधवाले is plural or oblique. हमारा and आता are masculine singular."]], VALA),
  gap("va:1", "___ से पूछो कि स्टेशन कितनी दूर है ।", "Ask[2] the rickshaw driver[0+1] how[5] far[6] the station[4] is[7]. (the driver is a man)", "रिक्शेवाले", [["रिक्शेवाला","Before से the word is oblique: रिक्शेवाले से."], ["रिक्शेवाली","रिक्शेवाली is feminine. The driver here is a man."]], "The noun before वाला may itself be oblique: रिक्शा → रिक्शेवाला. Before a postposition, वाला becomes वाले."),
  gap("va:2", "___ कमरे में कौन रहता है ?", "Who[3] lives[4+5] in[2] the downstairs[0] room[1]?", "नीचेवाले", [["नीचेवाला","Before में the phrase is oblique: नीचेवाले कमरे में."], ["नीचेवाली","नीचेवाली is feminine. कमरा is masculine."]], "After an adverb, वाला makes an adjective: नीचेवाला कमरा “the downstairs room”."),
  gap("va:3", "लंदन में भी बहुत-से हिन्दी ___ हैं ।", "{There are}[6] many[3] Hindi[4] speakers[5] in[1] London[0] too[2].", "बोलनेवाले", [["बोलनावाले","Not a word: before वाला the infinitive is oblique, बोलने."], ["बोलनेवाला","बोलनेवाला is singular. बहुत-से and हैं need the plural: बोलनेवाले."]], "Oblique infinitive + वाला names the doer: हिन्दी बोलनेवाला “Hindi speaker”."),
  gap("va:4", "जल्दी करो, रेलगाड़ी ___ है ।", "Hurry[0+1], the train[2] {is about to leave}[3+4].", "चलनेवाली", [["चलनेवाला","चलनेवाला is masculine. रेलगाड़ी is feminine."], ["चलनावाली","Not a word: before वाला the infinitive is oblique, चलने."]], "Oblique infinitive + वाला + है — “is about to …”."),
  gap("va:5", "बच्चे खाना ___ थे ।", "{The children}[0] {were about to eat}[1+2+3].", "खानेवाले", [["खानेवाली","खानेवाली is feminine. बच्चे is masculine plural."], ["खानेवाला","खानेवाला is singular. बच्चे is plural: खानेवाले थे."]], "With था, थी, थे — “was about to …”."),
  gap("va:6", "___ महीने में हम मसूरी जाएँगे ।", "{In}[2] the coming[0] month[1] we[3] {will go}[5] to Mussoorie[4].", "आनेवाले", [["आनेवाला","Before में the phrase is oblique: आनेवाले महीने में."], ["आनावाले","Not a word: before वाला the infinitive is oblique, आने."]], "आनेवाला “coming, next” is an adjective made with वाला."),
  gap("va:7", "सीता बनारस की ___ है ।", "Sita[0] is[4] from[2+3] Banaras[1].", "रहनेवाली", [["रहनेवाला","रहनेवाला is masculine. Sita is a woman."], ["रहनावाली","Not a word: before वाला the infinitive is oblique, रहने."]], "X का रहनेवाला “a resident of X, from X”; का agrees with रहनेवाला."),
  gap("va:8", "गाना ___ लड़की कौन है ?", "Who[3] is[4] the girl[2] {who sings}[0+1]?", "गानेवाली", [["गानेवाला","गानेवाला is masculine. लड़की is feminine."], ["गानेवाले","गानेवाले is plural or oblique. लड़की is singular and direct here: गानेवाली."]], VALA),
  gap("va:10", "पिंकी अभी अपना काम शुरू ___ थी ।", "Pinki[0] {was just about to start}[1+4+5+6] {her (own)}[2] work[3].", "करनेवाली", [["करनावाला","Not a word: before वाला the infinitive is oblique, करने. And Pinki is a woman: करनेवाली."], ["करनेवाला","करनेवाला is masculine. Pinki is a woman."]], "With था, थी, थे — “was about to …”. "+VINF),
  gap("va:11", "मेरा काम ख़त्म ___ है ।", "My[0] work[1] {is about to finish}[2+3+4].", "होनेवाला", [["होनावाली","Not a word: before वाला the infinitive is oblique, होने."], ["होनेवाली","होनेवाली is feminine. काम is masculine."]], "Oblique infinitive + वाला + है — “is about to …”."),
  mc("va:9", "Which means “the woman from Delhi”?", "दिल्लीवाली", [["दिल्लीवाला","दिल्लीवाला is masculine, “the man from Delhi”."], ["दिल्लीवाले","दिल्लीवाले is plural or oblique: “people from Delhi”."]], VALA)
];

const build = [
  tiles("tl:0", "Shall I[0] bring[2] water[1]?", ["मैं","पानी","लाऊँ"], [["लाए","लाए goes with तू, यह and वह. मैं takes लाऊँ."], ["लाओ","लाओ goes with तुम. मैं takes लाऊँ."]]),
  tiles("tl:1", "We[0] want[3+4] {to go}[2] to Agra[1].", ["हम","आगरा","जाना","चाहते","हैं"], [["जाने","चाहना takes the direct infinitive: जाना."], ["चाहिए","चाहिए is a separate construction with को. With हम as subject the verb is चाहना."]]),
  tiles("tl:2", "Pinki[0] wants[1+2] me[4] {to write}[7] her[5] a letter[6].", ["पिंकी","चाहती","है","कि","मैं","उसे","चिट्ठी","लिखूँ"], [["लिखना","Pinki wants someone else to write: use कि + subjunctive, लिखूँ."], ["लिखे","लिखे goes with तू, यह and वह. मैं takes लिखूँ."]]),
  tiles("tl:3", "If[0] Raj[1] comes[2], {then}[3] tell[5] me[4]. (to तुम)", ["अगर","राज","आए","तो","मुझे","बताओ"], [["कि","The second clause of a condition begins with तो, not कि."], ["आएँ","आएँ is plural. Raj, spoken of plainly, takes आए."]], {alt: [["राज","अगर","आए","तो","मुझे","बताओ"]]}),
  tiles("tl:4", "You[0] {should phone}[2+3] tomorrow[1]. (to आप)", ["आप","कल","फ़ोन","करें"], [["करे","करे is singular. आप takes करें."], ["करो","करो goes with तुम. आप takes करें."]], {alt: [["कल","आप","फ़ोन","करें"]]}),
  tiles("tl:5", "{It's}[1] possible[0] that[2] Mohan[3] {won't come}[5+6] today[4].", ["संभव","है","कि","मोहन","आज","न","आए"], [["नहीं","The subjunctive is made negative with न."], ["आएँ","आएँ is plural. Mohan, spoken of plainly, takes आए."]], {alt: [["संभव","है","कि","आज","मोहन","न","आए"]]}),
  tiles("tl:6", "{The upstairs}[0] neighbour[1] is[4] very[2] lazy[3]. (a man)", ["ऊपरवाला","पड़ोसी","बहुत","कामचोर","है"], [["ऊपरवाली","ऊपरवाली is feminine. पड़ोसी is masculine."], ["ऊपरवाले","ऊपरवाले is plural or oblique. With है the neighbour is one man: ऊपरवाला."]]),
  tiles("tl:7", "Our[0] guests[1] {are about to arrive}[2+3].", ["हमारे","मेहमान","आनेवाले","हैं"], [["आनेवाला","आनेवाला is singular. The guests are plural: आनेवाले हैं."], ["आनावाले","Not a word: before वाला the infinitive is oblique, आने."]]),
  tiles("tl:8", "Do you[1] know[6+7] the man[4+5] {who lives}[3] upstairs[2]?", ["क्या","आप","ऊपर","रहनेवाले","आदमी","को","जानते","हैं"], [["रहनेवाला","Before को the phrase is oblique: रहनेवाले आदमी को."], ["रहता","रहता is the imperfective participle. “Who lives” before a noun is रहनेवाला."]]),
  tiles("tl:9", "If[0] you[1] wish[2], {then}[3] I[4] {will come}[7] with[6] you[5]. (a man speaking)", ["अगर","आप","चाहें","तो","मैं","आपके","साथ","चलूँगा"], [["चाहे","चाहे is singular. आप takes चाहें."], ["चाहिए","चाहिए is “ought, need”, a separate construction. “If you wish” is अगर आप चाहें."]], {alt: [["आप","अगर","चाहें","तो","मैं","आपके","साथ","चलूँगा"]]}),
  tiles("tl:10", "{It's}[0+2] essential[1] that[3] we[4] reach[8] the station[7] {on time}[5+6].", ["यह","ज़रूरी","है","कि","हम","समय","पर","स्टेशन","पहुँचें"], [["पहुँचेंगे","पहुँचेंगे is the future. After ज़रूरी है कि the verb is subjunctive: पहुँचें."], ["पहुँचना","After ज़रूरी है कि the verb is a full subjunctive, पहुँचें, not the infinitive."]], {alt: [["यह","ज़रूरी","है","कि","हम","स्टेशन","समय","पर","पहुँचें"]]}),
  tiles("tl:12", "You[0] {should take}[3] this[1] book[2]. (to आप)", ["आप","यह","किताब","लें"], [["लेएँ","Not a word: लेना is irregular. लेंगे → लें."], ["ले","ले is singular. आप takes लें."]]),
  tiles("tl:11", "Should we[0] go[3] by[2] rickshaw[1] or[4] by[6] auto[5]?", ["हम","रिक्शे","से","जाएँ","कि","आटो","से"], [["जाऊँ","जाऊँ goes only with मैं. हम takes जाएँ."], ["रिक्शा","Before से the noun is oblique: रिक्शे से."]])
];

const mean = [
  meaning("mn:0", "शायद प्रकाश को यह बात मालूम हो ।", "Prakash may know about this.", [["Prakash must know about this.","“Must” would be the future: मालूम होगा. हो is “may”."], ["Prakash doesn't know about this.","Nothing here is negative. शायद … हो is “may”."]]),
  meaning("mn:1", "मैं चाहता हूँ कि तुम मेरे भाई से मिलो ।", "I want you to meet my brother.", [["I want to meet your brother.","That would be मैं तुम्हारे भाई से मिलना चाहता हूँ. Here तुम is the one who will meet."], ["You want me to meet your brother.","मैं is the one who wants; तुम मिलो is the wish."]]),
  meaning("mn:2", "मोहन अपनी छोटी बहिन को बहुत चाहता है ।", "Mohan is very fond of his little sister.", [["Mohan needs his little sister.","“Need” would be चाहिए. चाहना with a person as object means “to be fond of”."], ["His little sister is very fond of Mohan.","Mohan is the subject (चाहता है). को marks the one he is fond of."]]),
  meaning("mn:3", "अगर मोहन वापस आए तो उसे मेरा पता दीजिए ।", "If Mohan comes back, please give him my address.", [["If Mohan comes back, please ask him for my address.","“Ask” would be पूछना. दीजिए is “please give”."], ["Mohan has come back and given me his address.","अगर … तो is “if … then”, and दीजिए is a request."]]),
  meaning("mn:4", "गाड़ी चलानेवाला आदमी मेरा भाई है ।", "The man driving the car is my brother.", [["My brother is about to drive the car.","“About to” would be चलानेवाला है with भाई as subject. Here चलानेवाला describes आदमी."], ["My brother drives the car every day.","Nothing here says “every day”. गाड़ी चलानेवाला आदमी is “the man driving the car”."]]),
  meaning("mn:5", "प्रताप दिल्ली जानेवाला था ।", "Pratap was about to go to Delhi.", [["Pratap used to go to Delhi.","That would be जाता था. जानेवाला था is “was about to go”."], ["Pratap was on his way to Delhi.","That would be जा रहा था, the continuous. जानेवाला था is “was about to go”."]]),
  meaning("mn:6", "मुझे पता नहीं था कि उसका घर इतनी दूर है ।", "I didn't know that his house was so far away.", [["I knew that his house was far away.","पता नहीं था is “didn't know”."], ["His house isn't far away, as far as I know.","नहीं goes with पता था — “I didn't know”. दूर “far” is not negated."]])
];

const usage = [
  mc("us:0", "How is the subjunctive formed?", "Take the future and drop -gā, -gī or -ge", [["Add -e to the infinitive","The infinitive is not the base. Start from the future: बोलेगा → बोले."], ["Add हो to the imperfective participle","बोलता हो is the subjunctive auxiliary, “may speak (habitually)”. The plain subjunctive is one word, बोले."]], SUB),
  mc("us:1", "Which subjunctive form looks the same as a command?", "The तुम form: बोलो, जाओ", [["The आप form: बोलें is the same as बोलिए","बोलें and बोलिए are different forms, though both can be polite requests."], ["The मैं form: बोलूँ","There is no command for मैं. बोलूँ is “may I speak?”."]], "This is why the तुम subjunctive (तुम रहो) reads as a mild command."),
  mc("us:2", "How is a subjunctive made negative?", "With न — वह न आए", [["With मत","मत goes with commands. The subjunctive takes न."], ["With नहीं","नहीं is the usual negative of the other tenses. With the subjunctive the book uses न, although नहीं is also heard in speech."]], "The negative for subjunctives is न."),
  mc("us:3", "In an “if” sentence, which word can be left out?", "अगर (तो must stay)", [["तो (अगर must stay)","It is the other way round: तो is essential."], ["Neither अगर nor तो","अगर is often dropped: राज आए तो …"]], COND),
  mc("us:4", "In an अगर clause about the future, which verb form makes the condition seem least likely?", "The subjunctive: अगर वह आए", [["The future: अगर वह आएगा","The future suggests the speaker thinks it likely."], ["The imperfective: अगर वह आता है","The imperfective is a neutral forecast."]], "Imperfective is neutral, future is likely, subjunctive is less likely (“should he come”)."),
  mc("us:5", "When does चाहना take a plain infinitive?", "When the one who wants is the one who acts", [["When the wish is polite","Politeness has nothing to do with it. The test is whether the subject changes."], ["When the wish is in the past","चाहता था कि … takes the subjunctive too, when the subject changes."]], CHAH),
  mc("us:6", "Which word is a formal (Sanskrit) synonym of अगर?", "यदि", [["मगर","मगर means “but”."], ["कि","कि means “that”, or “or” between choices."]], "यदि वह आए तो … = अगर वह आए तो …"),
  mc("us:8", "Which form means “about to go”?", "जानेवाला", [["जानावाला","Not a word: before वाला the infinitive is oblique, जाने."], ["जाता","जाता is the imperfective participle, “goes, going”."]], VINF),
  mc("us:7", "What can जानेवाला है mean?", "“is about to go”", [["“used to go”","That would be जाता था."], ["“must be going”","That would be जा रहा होगा."]], "Oblique infinitive + वाला + होना — “about to …”. "+VINF)
];

const unit = {
  id: "unit10", n: 10, title: "What should I say?", titleHi: "मैं क्या बोलूँ ?",
  scope: "The subjunctive (बोलूँ, बोले, बोलो, बोलें; हूँ/हो/हों, लूँ, दूँ) for suggestions, mild commands and uncertainty, negated with न; कि clauses after wish, request, possibility and necessity (ज़रूरी है कि, संभव है कि, निवेदन है कि, से कहो कि) against the future for confident expectation; the subjunctive auxiliary (खा रहा हो, जानती हो); चाहना with a direct infinitive or कि + subjunctive, and “be fond of”; conditionals with अगर/यदि … तो, नहीं तो; the suffix -वाला after nouns, adverbs and oblique infinitives (दूधवाला, नीचेवाला, बोलनेवाला, आनेवाला, “about to”)",
  pages: "book 118–128 (129 blank)",
  skills: {sub: "The subjunctive", ki: "कि + subjunctive", aux: "The subjunctive auxiliary", chah: "चाहना", cond: "Conditionals", vala: "The suffix -वाला", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अब की बार","this time","x"],["अवश्य","certainly","x"],["असंभव","impossible","a"],["आख़िर","after all","x"],["आटो","auto-rickshaw","n","m"],
    ["आधा","half","a"],["इतना","so (as in “so big”), so much","a"],["इलाज","treatment, cure","n","m"],["उचित","proper, appropriate","a"],["उतारना","to take down, take off","v"],
    ["उम्मीद","hope","n","f"],["कंजूस","miserly, mean","a"],["काँटा","fork","n","m"],["कामचोर","work-shy, lazy","a"],["कि","or","x"],
    ["ख़रीदारी","buying, shopping","n","f"],["ख़ाली करना","to vacate","v"],["खींचना","to draw; take (a photo)","v"],["ख़ुद","oneself","x"],["गर्व","pride","n","m"],
    ["गाय","cow","n","f"],["गुस्सा","anger","n","m"],["चपरासी","peon, orderly","n","m"],["चम्मच","spoon","n","m"],["चाहना","to want, wish, be fond of","v"],
    ["छुरी","knife","n","f"],["ज़िम्मेदारी","responsibility","n","f"],["झूठ","lie","n","m"],["टेढ़ा","twisted, complex","a"],["डेढ़","one and a half","a"],
    ["तुरंत","immediately","x"],["दाम","price","n","m"],["नहीं तो","otherwise","x"],["निवेदन","request","n","m"],["नोट","note","n","m"],
    ["पकड़ना","to catch, grab, hold","v"],["पड़ना","to fall","v"],["पता","address","n","m"],["पता नहीं","don't know, no idea","x"],["पता होना","to know, be aware","v"],
    ["पानी पड़ना","to rain","v"],["पुलिस","police (used in the singular)","n","f"],["बार","time, occasion","n","f"],["बार बार","time and again","x"],
    ["बोरियत","boredom","n","f"],["भारी","heavy","a"],["भूल","mistake","n","f"],["भूल करना","to make a mistake","v"],["भूलना","to forget, err","v"],
    ["मंदिर","temple","n","m"],["मक्खी","fly","n","f"],["मक्खियाँ मारना","to “kill flies”, laze about","v"],["मगर","but","x"],["मदद","help","n","f"],
    ["मदद देना","to help","v"],["मामला","matter, affair","n","m"],["माहिर","expert, skilled","a"],["यक़ीन","confidence, faith","n","m"],["यदि","if (formal)","x"],
    ["रिक्शा","rickshaw","n","m"],["लिस्ट","list","n","f"],["वक़्त","time","n","m"],["वापस","back","x"],["वापस आना","to come back","v"],
    ["विश्वास","belief, trust","n","m"],["संभव","possible","a"],["सफ़ाई","cleaning","n","f"],["सलाह","advice","n","f"],["सीढ़ी","stair, staircase","n","f"],
    ["हफ़्ता","week","n","m"],["हाथ बँटाना","to lend a hand","v"],["मेसेज","message","n","m"],
    ["वाला","(suffix) person or thing connected with; about to","x"],["दूधवाला","milkman","n","m"],["ऊपरवाला","God (the one up above)","n","m"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  lessons: [
    {id: "sub", title: "मैं क्या बोलूँ ?", desc: "The subjunctive: “may I, should I, shall we”", skill: "sub", items: sub},
    {id: "ki", title: "ज़रूरी है कि …", desc: "कि clauses after wish, request, possibility", skill: "ki", items: ki},
    {id: "aux", title: "आ रहा हो", desc: "“May be …ing”: the subjunctive auxiliary", skill: "aux", items: aux},
    {id: "chah", title: "चाहना", desc: "“Want to …” and “want someone to …”", skill: "chah", items: chah},
    {id: "cond", title: "अगर … तो", desc: "“If … then”", skill: "cond", items: cond},
    {id: "vala", title: "दूधवाला", desc: "The suffix -वाला: “-er”, “about to”", skill: "vala", items: vala},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Subjunctive, conditionals, वाला", skill: "usage", items: usage}
  ],
  test: {vocab: 4, sub: 3, ki: 2, aux: 1, chah: 2, cond: 2, vala: 2, build: 3, meaning: 2, usage: 1},
  _grammar: [
    {id: "subjunctive", title: "The subjunctive: the future without -gā/-gī/-ge — मैं बोलूँ, तू/यह/वह बोले, तुम बोलो, हम/आप/ये/वे बोलें, the same for both genders; होना हूँ/हो/हों, लेना लूँ/ले/लें, देना दूँ/दे/दें; negative with न"},
    {id: "subjunctive-uses", title: "Uses of the subjunctive: suggestions and deliberative questions (मैं चाय बनाऊँ ?), polite or mild commands (आप लोग नौ बजे आएँ; the तुम form equals the imperative), and uncertainty with शायद"},
    {id: "subjunctive-ki", title: "कि + subjunctive after expressions of wish, request, possibility, propriety or necessity (ज़रूरी है कि, संभव/असंभव है कि, उचित है कि, निवेदन है कि, X से कहो कि); a confident expectation (यक़ीन, विश्वास) takes the future instead"},
    {id: "subjunctive-aux", title: "The subjunctive auxiliary हो/हों with the continuous and the imperfective participle, “may be …ing” (शायद वह खाना खा रहा हो; जानती हो), against the presumptive होगा “must be”"},
    {id: "chahna", title: "चाहना “to want, wish”: + direct infinitive when the subject is the same (सुहास लंदन जाना चाहता है); चाहना कि + subjunctive when it changes (माँ चाहती हैं कि आप कल फिर आएँ); also “to be fond of”; distinct from चाहिए"},
    {id: "conditionals", title: "Conditionals अगर/यदि … तो: imperfective (neutral), future (likely) or subjunctive (less likely) in the अगर clause; future or imperative in the तो clause; the continuous may appear in the अगर clause; अगर may be dropped, तो may not; नहीं तो “otherwise”"},
    {id: "vala", title: "The suffix -वाला/-वाली/-वाले, agreeing like an adjective: after a noun, a person connected with it (दूधवाला, रिक्शेवाला with oblique noun, दिल्लीवाली); after an adverb, an adjective (नीचेवाला कमरा) or noun (ऊपरवाला “God”); after an oblique infinitive, a doer (हिन्दी बोलनेवाला) or adjective (आनेवाला महीना), and with होना “about to” (रेलगाड़ी चलनेवाली है)"},
    {id: "ki-or", title: "कि “or” between alternatives in a question (चाय लूँ कि कॉफ़ी ?)"}
  ]
};

writeUnit(10, unit, {forms, fake});
