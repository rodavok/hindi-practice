"use strict";
// Unit 5 (book pp. 50–62): यहाँ बैठिए. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 60–62, Quick Vocab pp. 51 and 55, and words from the grammar sections)
  "आना":"ānā","इधर":"idhar","उधर":"udhar","कंबल":"kambal","करना":"karnā","कहना":"kahnā","का":"kā","की":"kī","के":"ke","कॉफ़ी":"kāfī","कुत्ता":"kuttā",
  "कुरता":"kurtā","कौनसा":"kaunsā","कौनसी":"kaunsī","कौनसे":"kaunse","ख़त":"khat","ख़याल":"khayāl","खान":"khān","मार्केट":"mārkeṭ","खिलाना":"khilānā",
  "खिलौना":"khilaunā","खिलौने":"khilaune","घोड़ा":"ghoṛā","चलना":"calnā","चाबी":"cābī","कुत्ते":"kutte","छूना":"chūnā","जगाना":"jagānā","ज़रा":"zarā","जल्दी":"jaldī",
  "जाना":"jānā","झगड़ा":"jhagṛā","ठहरना":"ṭhaharnā","ढूँढ़ना":"ḍhū̃ṛhnā","तैयार":"taiyār","थैला":"thailā","दूध":"dūdh","देखना":"dekhnā","देना":"denā",
  "देवर":"devar","धोना":"dhonā","धोबी":"dhobī","ध्यान":"dhyān","नारा":"nārā","नौकर":"naukar","नौकरों":"naukarõ","पड़ा":"paṛā","पढ़ना":"paṛhnā","पान":"pān",
  "पानी":"pānī","पापा":"pāpā","पीना":"pīnā","पूछना":"pūchnā","पेड़":"peṛ","पैसा":"paisā","पैसे":"paise","फल":"phal","बताना":"batānā","बुलाना":"bulānā",
  "बैठना":"baiṭhnā","बोलना":"bolnā","भैया":"bhaiyā","मत":"mat","मारना":"mārnā","रखना":"rakhnā","लाना":"lānā","लिखना":"likhnā","लेना":"lenā","शैतान":"śaitān",
  "सचमुच":"sacmuc","सरल":"saral","सिग्रेट":"sigreṭ","सुनना":"sunnā","होना":"honā","अंकल":"ankal","अम्माँ":"ammā̃","नाम":"nām","पत्र":"patr",
  // possessive pronouns (5.3) and the short forms of pronoun + को (5.5)
  "उसका":"uskā","उसकी":"uskī","उसके":"uske","उनका":"unkā","उनके":"unke","इनका":"inkā","किसका":"kiskā","किसकी":"kiskī",
  "मुझे":"mujhe","तुझे":"tujhe","इसे":"ise","उसे":"use","हमें":"hamẽ","तुम्हें":"tumhẽ","इन्हें":"inhẽ","उन्हें":"unhẽ","किसे":"kise","किन्हें":"kinhẽ",
  // command forms (5.2)
  "आ":"ā","आओ":"āo","आइए":"āie","जा":"jā","जाओ":"jāo","जाइए":"jāie","खा":"khā","खाओ":"khāo","खाइए":"khāie",
  "पढ़":"paṛh","पढ़ो":"paṛho","पढ़िए":"paṛhie","पढ़िएगा":"paṛhiegā","लिख":"likh","बोल":"bol","लिखो":"likho","सुन":"sun","सुनो":"suno","सुनिए":"sunie",
  "बैठ":"baiṭh","बैठो":"baiṭho","बैठिए":"baiṭhie","बैठिएगा":"baiṭhiegā","कर":"kar","करो":"karo","कीजिए":"kījie","ले":"le","लो":"lo","लीजिए":"lījie",
  "दे":"de","दीजिए":"dījie","पी":"pī","पियो":"piyo","पीजिए":"pījie","ला":"lā","लाओ":"lāo","लाइए":"lāie","पूछो":"pūcho","पूछिए":"pūchie",
  "कहो":"kaho","बताओ":"batāo","बताइए":"batāie","बुलाओ":"bulāo","जगाओ":"jagāo","जगाइए":"jagāie","खिलाओ":"khilāo","खिलाइए":"khilāie","रखिए":"rakhie"
};
const fake = {
  "सु":"su","बैठिना":"baiṭhinā","लेइए":"leie","देइए":"deie","पीइए":"pīie","देओ":"deo","लेओ":"leo","पढ़ोगा":"paṛhogā","नौकरें":"naukarẽ","उन्हे":"unhe"
};

const TUM = "With तुम the command is stem + -o.", AAP = "With आप the command is stem + -ie.", TU = "With तू the command is the bare stem.";

const inf = [
  mc("inf:0", "What is the stem of लिखना ?", "लिख", [["लिखना","लिखना is the infinitive itself. The stem is what is left when the ending -nā is removed."], ["लिखो","लिखो is the तुम command, stem + -o."]], "The infinitive is the stem plus -nā: likh + nā."),
  mc("inf:1", "What is the stem of सुनना ?", "सुन", [["सु","Only the ending -nā comes off. The stem keeps its own न, so it is सुन."], ["सुनो","सुनो is the तुम command, stem + -o."]], "Remove -nā from सुनना and सुन is left."),
  mc("inf:2", "Which infinitive does बैठिए come from?", "बैठना", [["बैठिना","Not a word. Take -ie off बैठिए to get the stem बैठ, then add -nā."], ["बैठ","बैठ is the stem (and the तू command), not the infinitive."]], "Dictionaries list verbs by the infinitive, stem + -nā."),
  mc("inf:3", "Which verb means “to bring”?", "लाना", [["लेना","लेना means “to take, receive”."], ["रखना","रखना means “to put, keep”."]]),
  mc("inf:4", "Which verb means “to call, invite”?", "बुलाना", [["बोलना","बोलना means “to speak”."], ["बताना","बताना means “to tell”."]]),
  mc("inf:5", "How is the infinitive ending -nā written?", "Always as a full letter, never as a conjunct", [["As a conjunct when the stem ends in a consonant","The book stresses that -nā is always written with a full न, as in सुनना."], ["As -ne in the dictionary form","Dictionaries list verbs in the -nā form: बोलना, पढ़ना."]], "The infinitive is stem + -nā, with a full न.")
];

const cmd = [
  gap("cd:0", "तुम यह ख़त ___ ।", "You[0] read[3] this[1] letter[2]. (to तुम)", "पढ़ो", [["पढ़िए","पढ़िए is the आप command. " + TUM], ["पढ़","पढ़ alone is the तू command. " + TUM]], "Each pronoun has its own command: तू पढ़, तुम पढ़ो, आप पढ़िए."),
  gap("cd:1", "आप ज़रा इधर ___ ।", "{Please come}[0+3] {over here}[2] {for a moment}[1]. (to आप)", "आइए", [["आओ","आओ is the तुम command. " + AAP], ["आ","आ is the bare stem, the तू command, far too blunt with आप."]], "आप takes stem + -ie: आइए."),
  gap("cd:2", "तू जल्दी ___ !", "You[0] go[2] quickly[1]! (to तू)", "जा", [["जाओ","जाओ is the तुम command. " + TU], ["जाइए","जाइए is the polite आप command. " + TU]], "The तू command is the stem alone. Its brevity shows intimacy or bluntness."),
  gap("cd:3", "आप दाल ___ ।", "{Please have}[0+2] some daal[1]. (to आप)", "खाइए", [["खाओ","खाओ is the तुम command. " + AAP], ["खा","खा is the bare stem, the तू command."]], "खाना gives खाइए, the stem खा + -ie."),
  gap("cd:4", "तुम खिड़की बंद ___ ।", "You[0] close[2+3] the window[1]. (to तुम)", "करो", [["कीजिए","कीजिए is the आप command of करना. " + TUM], ["कर","कर is the bare stem, the तू command."]], "In बंद करना “to close” only करना changes; बंद stays as it is."),
  gap("cd:5", "बच्चो, तुम लोग जल्दी ___ !", "Children[0], you[1+2] come[4] quickly[3]!", "आओ", [["आ","आ is the तू command, for one person you are very close to. तुम लोग takes आओ."], ["आइए","आइए is the आप command. " + TUM]], "तुम लोग takes the तुम command, stem + -o."),
  mc("cd:6", "Which is the extra-polite form of पढ़िए ?", "पढ़िएगा", [["पढ़ोगा","-gā is added only to the आप command: paṛhie + gā."], ["पढ़ना","The infinitive पढ़ना can be a command, but it lacks the deference of the आप form."]], "Adding -gā to the आप command makes it extra polite: “please be so kind as to read”."),
  mc("cd:7", "Turn this तुम command into an आप command", "आप वह किताब लाइए ।", [["आप वह किताब लाओ ।","लाओ is the तुम form. " + AAP], ["आप वह किताब ला ।","ला is the bare stem, the तू command."]], "आप takes stem + -ie: लाइए.", {hi: "तुम वह किताब लाओ ।", audio: true, say: "आप वह किताब लाइए ।", en: "{Please bring}[0+3] that[1] book[2]. (to आप)"}),
  mc("cd:8", "What kind of command is this?", "An infinitive used as a command, to be carried out later", [["The intimate bare-stem command","The तू command would be the bare stem पढ़. Here the infinitive पढ़ना is used."], ["The extra-polite command","That would be पढ़िएगा. The infinitive lacks the deference of the आप command."]], "The infinitive often gives a “deferred” command, and is most at home where तुम would be used.", {hi: "रात को यह किताब पढ़ना ।", audio: true, say: "रात को यह किताब पढ़ना ।", en: "Read[4] this[2] book[3] at[1] night[0]."}),
  mc("cd:9", "How do you politely attract someone's attention, like “excuse me”?", "सुनिए", [["सुन","सुन is the blunt तू command."], ["सुनो","सुनो is the familiar तुम command, not the polite one."]], "सुनिए “please listen” is the polite way to attract attention.")
];

const irr = [
  gap("ir:0", "आप यह किताब ___ ।", "{Please take}[0+3] this[1] book[2]. (to आप)", "लीजिए", [["लेइए","Not a word: लेना is irregular, and its आप command is लीजिए."], ["लो","लो is the तुम command of लेना."]], "Four verbs have irregular आप commands: कीजिए, लीजिए, दीजिए, पीजिए."),
  gap("ir:1", "तुम उसे यह फल ___ ।", "You[0] give[4] him[1] this[2] fruit[3]. (to तुम)", "दो", [["देओ","Not a word: देना is irregular in the तुम command too, which is दो."], ["दीजिए","दीजिए is the आप command. With तुम it is दो."]], "देना and लेना have irregular तुम commands: दो and लो."),
  gap("ir:2", "आप सीता को यह थैला ___ ।", "{Please give}[0+5] Sita[1+2] this[3] bag[4]. (to आप)", "दीजिए", [["देइए","Not a word: देना is irregular, and its आप command is दीजिए."], ["दो","दो is the तुम command. With आप it is दीजिए."]], "देना gives the irregular आप command दीजिए."),
  gap("ir:3", "आप आराम ___ ।", "Please[0] rest[1+2]. (to आप)", "कीजिए", [["करो","करो is the तुम command. आप takes the irregular कीजिए."], ["कर","कर is the bare stem, the तू command."]], "आराम करना “to rest”: करना has the irregular आप command कीजिए."),
  gap("ir:4", "आप बाहर सिग्रेट ___ ।", "{Please smoke}[0+2+3] outside[1]. (to आप)", "पीजिए", [["पीइए","Not a word: पीना is irregular, and its आप command is पीजिए."], ["पियो","पियो is the तुम command."]], "पीना “to drink; to smoke” gives the irregular आप command पीजिए."),
  mc("ir:5", "Which four verbs have irregular आप commands?", "करना, लेना, देना, पीना", [["करना, लेना, देना, खाना","खाना is regular: खाइए."], ["आना, जाना, लेना, देना","आना and जाना are regular: आइए, जाइए."]], "करना कीजिए, लेना लीजिए, देना दीजिए, पीना पीजिए."),
  mc("ir:6", "What are the तुम commands of लेना and देना ?", "लो, दो", [["लेओ, देओ","Not words: these two verbs are irregular, giving लो and दो."], ["ले, दे","ले and दे are the bare stems, the तू commands."]], "लेना and देना are irregular in the तुम command: लो, दो."),
  mc("ir:7", "Turn this आप command into a तुम command", "तुम ठंडी कॉफ़ी पियो ।", [["तुम ठंडी कॉफ़ी पीजिए ।","पीजिए is the आप command. With तुम it is पियो."], ["तुम ठंडी कॉफ़ी पी ।","पी is the bare stem, the तू command."]], "पीना gives पियो in the तुम command.", {hi: "आप ठंडी कॉफ़ी पीजिए ।", audio: true, say: "तुम ठंडी कॉफ़ी पियो ।", en: "You[0] have[3] some cold[1] coffee[2]. (to तुम)"})
];

const neg = [
  gap("ng:0", "बच्चो, उस पलंग पर ___ बैठो !", "Children[0], don't[4] sit[5] on[3] that[1] bed[2]!", "मत", [["नहीं","The book makes commands negative with न or मत, not नहीं."], ["क्या","क्या asks a question. It cannot make a command negative."]], "मत (or the milder न) before the verb makes a command negative."),
  mc("ng:1", "Which word gives the more forceful “don't”?", "मत", [["न","न also makes a command negative, but it is the milder word."], ["नहीं","The book makes commands negative with न or मत, not नहीं."]], "The negative for commands is न or, more forcefully, मत."),
  gap("ng:2", "उस धोबी ___ पूछो कि मेरा कुरता कहाँ है ।", "Ask[2+3] that[0] washerman[1] where[7] my[5] kurta[6] is[8]. (to तुम)", "से", [["को","पूछना marks the person asked with से, not को."], ["पर","पर means “on”. The person asked takes से."]], "पूछना “to ask” and कहना “to say” mark the person addressed with से."),
  gap("ng:3", "उस नौकर ___ कहो कि कमरा गंदा है ।", "Tell[2+3] that[0] servant[1] that[4] the room[5] is[7] dirty[6]. (to तुम)", "से", [["को","कहना marks the person told with से, not को. (बताना “to tell” does take को.)"], ["का","का shows possession, “the servant's”."]], "कहना “to say (to)” takes से for the person addressed."),
  gap("ng:4", "पापा ___ बताओ कि गाड़ी कहाँ है ।", "Tell[1+2] Papa[0] where[5] the car[4] is[6]. (to तुम)", "को", [["से","से goes with कहना and पूछना. बताना “to tell” marks the person with को."], ["में","में means “in”."]], "बताना takes को for the person told, the indirect object."),
  mc("ng:5", "Make this command negative", "तुम यह खाना मत खाओ ।", [["तुम यह खाना नहीं खाओ ।","The book makes commands negative with न or मत, not नहीं."], ["तुम यह खाना मत खाइए ।","खाइए is the आप command. With तुम keep खाओ."]], "मत (or न) goes just before the verb.", {hi: "तुम यह खाना खाओ ।", audio: true, say: "तुम यह खाना मत खाओ ।", en: "Don't[3] you[0] eat[4] this[1] food[2]."}),
  gap("ng:6", "आप वहाँ ___ जाइए ।", "{Please don't}[0+2] go[3] there[1]. (to आप)", "न", [["नहीं","The book makes commands negative with न or मत, not नहीं."], ["क्या","क्या asks a question. It cannot make a command negative."]], "न before the verb is the milder “don't”; मत would also be correct.")
];

const ka = [
  gap("ka:0", "यह राज ___ थैला है ।", "This[0] is[4] Raj's[1+2] bag[3].", "का", [["की","की is feminine. थैला is masculine."], ["के","के is plural or oblique. थैला here is singular and direct."]], "का agrees with the thing possessed, थैला, not with Raj."),
  gap("ka:1", "सीता ___ साइकिल कहाँ है ?", "Where[3] is[4] Sita's[0+1] bicycle[2]?", "की", [["का","का is masculine. साइकिल is feminine."], ["के","के is masculine plural or oblique. साइकिल is feminine."]], "With a feminine thing possessed, का becomes की."),
  gap("ka:2", "ये मोहन ___ खिलौने हैं ।", "These[0] are[4] Mohan's[1+2] toys[3].", "के", [["का","का is singular. खिलौने is plural."], ["की","की is feminine. खिलौना is masculine."]], "With a masculine plural thing possessed, का becomes के."),
  gap("ka:3", "उस ___ का घोड़ा बहुत बड़ा है ।", "That[0] boy's[1+2] horse[3] is[6] very[4] big[5].", "लड़के", [["लड़का","का is a postposition, so the owner is oblique: लड़के."], ["लड़कों","लड़कों is plural, “boys'”. उस is singular."]], "Being a postposition, का needs the oblique case before it."),
  gap("ka:4", "इन ___ के खिलौने कहाँ हैं ?", "Where[4] are[5] these[0] children's[1+2] toys[3]?", "बच्चों", [["बच्चे","बच्चे is the oblique singular (or direct plural). इन is plural, so the oblique plural is needed."], ["बच्चो","बच्चो is the vocative, for calling out to children."]], "The owner before का is oblique: बच्चों."),
  gap("ka:5", "मेरा चश्मा भैया ___ कमरे में है ।", "My[0] glasses[1] are[6] in[5] Brother's[2+3] room[4].", "के", [["का","कमरा is oblique before में (कमरे), so का becomes के too."], ["की","की is feminine. कमरा is masculine."]], "When the thing possessed is oblique, का becomes के."),
  gap("ka:6", "___ देवर की गाड़ी नई है ।", "My[0] brother-in-law's[1+2] car[3] is[5] new[4]. (a woman speaking)", "मेरे", [["मेरा","देवर is oblique because की follows it, so मेरा becomes मेरे."], ["मेरी","मेरी would agree with गाड़ी, but “my” goes with देवर."]], "मेरा agrees with देवर, which is oblique before की, although देवर itself does not change."),
  gap("ka:7", "यह ___ कुत्ता है ।", "This[0] is[3] his[1] dog[2].", "उसका", [["उसकी","उसकी is feminine. कुत्ता is masculine."], ["वह का","का needs the oblique: वह becomes उस, written उसका."]], "उसका “his, her” agrees with the thing possessed, like any का."),
  gap("ka:8", "यह ___ किताब है ?", "Whose[1] book[2] is[3] this[0]?", "किसकी", [["किसका","किसका is masculine. किताब is feminine."], ["कौन की","कौन becomes किस before a postposition, written किसकी."]], "किसका “whose?” agrees with the thing possessed."),
  gap("ka:9", "मोहन और सीता यहाँ हैं, पर ___ बच्चे बाहर हैं ।", "Mohan[0] and[1] Sita[2] are[4] here[3], but[5] their[6] children[7] are[9] out[8].", "उनके", [["उनका","उनका is singular. बच्चे is plural."], ["उसके","उसके is “his, her”, for one person. Mohan and Sita are two."]], "उनका “their” agrees with बच्चे, masculine plural."),
  gap("ka:10", "मोहन ___ दोस्त की गाड़ी कहाँ है ?", "Where[5] is[6] Mohan's[0+1] friend's[2+3] car[4]?", "के", [["का","दोस्त is oblique because की follows it, so Mohan's का becomes के."], ["की","की would agree with गाड़ी. The first का belongs to दोस्त."]], "In a chain each का agrees with the next noun, and a noun before a postposition is oblique."),
  gap("ka:11", "यह ___ का कमरा है ।", "This[0] is[4] the servants'[1+2] room[3].", "नौकरों", [["नौकर","नौकर का would be “the servant's”, one servant."], ["नौकरें","Not a word: the oblique plural of नौकर is नौकरों."]], "The owner before का is oblique, here plural: नौकरों.")
];

const ko = [
  gap("ko:0", "आप पापा ___ यह अख़बार दीजिए ।", "{Please give}[0+5] this[3] newspaper[4] to[2] Papa[1]. (to आप)", "को", [["से","देना marks the person given to with को, not से."], ["का","पापा का would mean “Papa's”."]], "The indirect object, the person something is given to, takes को."),
  gap("ko:1", "तुम ___ वह कुरता दो ।", "You[0] give[4] me[1] that[2] kurta[3]. (to तुम)", "मुझे", [["मैं","मैं is the direct form. “To me” is मुझे (= मुझ को)."], ["मेरा","मेरा means “my”."]], "मुझे is the short form of मुझ को."),
  gap("ko:2", "आप इन लड़कियों ___ समोसे खिलाइए ।", "{Please serve}[0+5] these[1] girls[2+3] samosas[4]. (to आप)", "को", [["से","खिलाना marks the person fed with को."], ["के","के would make “the girls' samosas”, and leave no one being served."]], "With खिलाना “to give to eat” the person served is the indirect object, with को."),
  gap("ko:3", "___ यह कुरता पसंद नहीं है ।", "She[0] doesn't[4] like[3+5] this[1] kurta[2].", "उसे", [["वह","वह is direct. With पसंद the person takes को, so उस को or उसे."], ["उसका","उसका means “his, her (possessive)”."]], "उसे is the short form of उस को."),
  mc("ko:4", "Which is another way of writing उन को ?", "उन्हें", [["उन्हे","The short form has a nasal: उन्हें."], ["इन्हें","इन्हें is इन को, “to these (people)”."]], "Oblique pronoun + को has a short form: उन को = उन्हें."),
  mc("ko:5", "Which pronoun has no short form with को ?", "आप", [["तुम","तुम को has the short form तुम्हें."], ["हम","हम को has the short form हमें."]], "आप को has no alternative form."),
  gap("ko:6", "तुम उस नौकर ___ बुलाओ ।", "You[0] call[4] that[1] servant[2+3]. (to तुम)", "को", [["से","बुलाना takes the person called as a direct object, marked with को."], ["का","का shows possession."]], "People as direct objects nearly always take को."),
  mc("ko:7", "Why does कुत्ते have को here?", "The object is one particular animal, so को marks it", [["जगाना always takes से","से is not used here. को marks a specific direct object."], ["को means “to”: “wake to the dog”","With a direct object को is not translated. It marks the object as specific."]], "को marks a specific direct object, much like “the” in English.", {hi: "उस कुत्ते को मत जगाओ ।", audio: true, say: "उस कुत्ते को मत जगाओ ।", en: "Don't[3] wake[4] that[0] dog[1+2]. (to तुम)"}),
  gap("ko:8", "तुम ___ यहाँ मत लाओ !", "Don't[3] you[0] bring[4] him[1] here[2]!", "उसे", [["वह","वह is the subject form. The person brought is the object, with को, so उसे."], ["उसका","उसका means “his”."]], "A person as object takes को, and उसे is short for उस को."),
  gap("ko:9", "आप ___ पानी दीजिए ।", "{Please give}[0+3] {these people}[1] water[2]. (to आप)", "इन्हें", [["ये","ये is direct. The person given to takes को, so इन को or इन्हें."], ["इनका","इनका means “their (of these people)”."]], "इन्हें is the short form of इन को.")
];

const build = [
  tiles("tl:0", "{Please sit}[0+3] in[2] the garden[1]. (to आप)", ["आप","बग़ीचे","में","बैठिए"], [["बैठो","बैठो is the तुम command. आप takes बैठिए."], ["बग़ीचा","बग़ीचा is direct. Before में it is oblique: बग़ीचे."]]),
  tiles("tl:1", "You[0] give[4] the money[3] to[2] Mohan[1]. (to तुम)", ["तुम","मोहन","को","पैसे","दो"], [["दीजिए","दीजिए is the आप command. तुम takes दो."], ["से","देना marks the person given to with को."]], {alt: [["तुम","पैसे","मोहन","को","दो"]]}),
  tiles("tl:2", "Don't[3] you[0] take[4] my[1] book[2]! (to तू)", ["तू","मेरी","किताब","मत","ले"], [["लो","लो is the तुम command. तू takes the bare stem ले."], ["नहीं","The book makes commands negative with न or मत, not नहीं."]]),
  tiles("tl:3", "Mohan's[0+1] sister[2] is[4] clever[3].", ["मोहन","की","बहिन","होशियार","है"], [["का","का is masculine. बहिन is feminine."], ["के","के is plural or oblique. बहिन is feminine singular."]]),
  tiles("tl:4", "Where[4] are[5] those[0] boys'[1+2] dogs[3]?", ["उन","लड़कों","के","कुत्ते","कहाँ","हैं"], [["लड़के","लड़के is the oblique singular. उन and “boys'” need लड़कों."], ["का","कुत्ते is plural, so का becomes के."]]),
  tiles("tl:5", "{Please give}[0+4] me[1] that[2] blanket[3]. (to आप)", ["आप","मुझे","वह","कंबल","दीजिए"], [["मैं","मैं is direct. “To me” is मुझे."], ["दो","दो is the तुम command. आप takes दीजिए."]], {alt: [["आप","वह","कंबल","मुझे","दीजिए"]]}),
  tiles("tl:6", "{Please ask}[0+3] the servant[1+2] where[6] the milk[5] is[7]. (to आप)", ["आप","नौकर","से","पूछिए","कि","दूध","कहाँ","है"], [["को","पूछना marks the person asked with से."], ["कौन","कौन asks “who?”. “Where” is कहाँ."]], {order: "After कि the question keeps its own order: दूध कहाँ है ?"}),
  tiles("tl:7", "You[0] wake[3] the children[1+2]. (to तुम)", ["तुम","बच्चों","को","जगाओ"], [["बच्चे","Before को the oblique plural is needed: बच्चों."], ["जगाइए","जगाइए is the आप command. तुम takes जगाओ."]]),
  tiles("tl:8", "Whose[1] bag[2] is[3] this[0]?", ["यह","किसका","थैला","है"], [["किसकी","किसकी is feminine. थैला is masculine."], ["कौन","कौन becomes किस before का, written किसका."]], {alt: [["यह","थैला","किसका","है"]]}),
  tiles("tl:9", "{Please tell}[0+3] Mother[1+2] that[4] the tea[5] is[7] ready[6]. (to आप)", ["आप","माँ","को","बताइए","कि","चाय","तैयार","है"], [["से","बताना marks the person told with को. से goes with कहना and पूछना."], ["हैं","चाय is singular, so the verb is है."]]),
  tiles("tl:10", "Rishi's[0+1] dog[2] is[4] black[3].", ["ऋषि","का","कुत्ता","काला","है"], [["की","की is feminine. कुत्ता is masculine."], ["काली","काली is feminine. कुत्ता is masculine."]])
];

const mean = [
  meaning("mn:0", "उन्हें कॉफ़ी सचमुच पसंद है ।", "They really like coffee.", [["They really don't like coffee.","There is no नहीं, so the sentence is positive."], ["We really like coffee.","उन्हें is उन को, “to them”. “We” would be हमें."]]),
  meaning("mn:1", "राज, ज़रा इधर आओ ।", "Raj, come over here a moment.", [["Raj, go over there a moment.","इधर is “here” and आओ is “come”. “Go over there” would be उधर जाओ."], ["Raj, don't come here.","There is no मत or न, so the command is positive."]]),
  meaning("mn:2", "उसे बताइए कि नौकर बीमार है ।", "Please tell him that the servant is ill.", [["Please ask him whether the servant is ill.","“Ask” is पूछना, with से. बताइए is “please tell”."], ["Please tell the servant that he is ill.","उसे is the person told. नौकर is the one who is ill."]]),
  meaning("mn:3", "भैया, कुत्ते को कुछ खिलाओ ।", "Brother, give the dog something to eat.", [["Brother, eat something.","“Eat” would be खाओ. खिलाओ is “give to eat”."], ["Brother, don't feed the dog.","There is no मत or न, so the command is positive."]]),
  meaning("mn:4", "आप ये फल रसोईघर में रखिए ।", "Please put these fruits in the kitchen.", [["Please bring these fruits from the kitchen.","रखना is “to put, keep”, and में is “in”. “Bring from” would be से लाइए."], ["Please eat these fruits in the kitchen.","“Eat” would be खाइए. रखिए is “please put”."]]),
  meaning("mn:5", "किसका कुत्ता बाहर है ?", "Whose dog is outside?", [["Which dog is outside?","“Which” is कौनसा. किसका is “whose”."], ["Who is outside?","That would be बाहर कौन है ? किसका asks about the owner."]]),
  meaning("mn:6", "कौनसा कुरता आपका है ?", "Which kurta is yours?", [["Whose kurta is this?","“Whose” is किसका. कौनसा is “which”."], ["Is this your kurta?","That would be क्या यह आपका कुरता है ?"]]),
  meaning("mn:7", "कल सुबह जल्दी आना ।", "Come early tomorrow morning.", [["Don't come early tomorrow morning.","There is no मत or न, so the command is positive."], ["Come early this morning.","कल means “yesterday” or “tomorrow”. A command can only look ahead, so it is “tomorrow”."]])
];

const usage = [
  mc("us:0", "Which form is the most polite?", "बैठिएगा", [["बैठिए","बैठिए is the ordinary polite आप command. Adding -gā makes it extra polite."], ["बैठो","बैठो is the familiar तुम command."]], "The ending -iegā is an extra-polite variant of the आप command."),
  mc("us:1", "Which postposition do कहना and पूछना use for the person addressed?", "से", [["को","को goes with बताना and देना. कहना and पूछना take से."], ["का","का shows possession."]], "माँ से पूछो “ask Mother”; उस से कहो “tell him”."),
  mc("us:2", "What does the bare-stem तू command suggest?", "Intimacy, or bluntness", [["Great respect","Respect is shown by the आप command, in -ie or -iegā."], ["A command for later","That is the infinitive used as a command."]], "The तू command is the stem alone; its brevity accentuates its lack of formality."),
  mc("us:3", "When does a direct object usually take को ?", "When it is specific, and nearly always when it is a person", [["Always","A generic object takes no को, as in फल लाओ “bring some fruit”."], ["Never: को only means “to”","को also marks a specific direct object, as in उस नौकर को बुलाओ."]], "को marks a specific direct object, often like English “the”."),
  mc("us:4", "When the thing possessed is oblique, का becomes …", "के", [["की","की is only for feminine things possessed, and does not change."], ["का","का stays only when the thing possessed is masculine singular and direct."]], "का agrees with the thing possessed in gender, number and case."),
  mc("us:5", "Which word means “which?” and agrees like an -ā adjective?", "कौनसा", [["कौन","कौन means “who?” and does not agree."], ["किसका","किसका means “whose?”."]], "कौनसा, कौनसी, कौनसे “which?” agree with their noun.")
];

const unit = {
  id: "unit5", n: 5, title: "Please sit here", titleHi: "यहाँ बैठिए",
  scope: "The infinitive and stem; commands for तू, तुम, आप (-ie, -iegā, irregular कीजिए, लीजिए, दीजिए, पीजिए, लो, दो) and the infinitive as a command; न and मत; से with कहना and पूछना; possession with का; को with indirect and specific direct objects; मुझे, उसे, उन्हें …",
  pages: "book 50–62",
  skills: {verb: "Infinitive and stem", cmd: "Commands", neg: "Negatives, से and को", ka: "Possession with का", ko: "को with objects", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["आना","to come","v"],["इधर","here, over here","x"],["उधर","there, over there","x"],["कंबल","blanket","n","m"],["करना","to do","v"],["कहना","to say (to)","v"],
    ["का","'s, of (possession)","x"],["कॉफ़ी","coffee","n","f"],["कुत्ता","dog","n","m"],["कुरता","kurta, Indian shirt","n","m"],["कौनसा","which?","a"],["ख़त","letter","n","m"],
    ["ख़याल","opinion","n","m"],["खान मार्केट","Khan Market (in Delhi)","n","m"],["खाना","to eat","v"],["खिलाना","to serve, give to eat","v"],["खिलौना","toy","n","m"],
    ["घोड़ा","horse","n","m"],["चलना","to move","v"],["चाबी","key","n","f"],["छूना","to touch","v"],["जगाना","to wake (someone) up","v"],["ज़रा","just, a little","x"],
    ["जल्दी","quickly, soon, early","x"],["जाना","to go","v"],["झगड़ा","quarrel, row","n","m"],["झगड़ा करना","to quarrel","v"],["ठहरना","to stop, wait","v"],
    ["ढूँढ़ना","to look for, find","v"],["तैयार","ready","a"],["थैला","bag, cloth bag","n","m"],["दूध","milk","n","m"],["देखना","to see, look","v"],["देना","to give","v"],
    ["देवर","husband's younger brother","n","m"],["धोना","to wash","v"],["धोबी","dhobi, washerman","n","m"],["ध्यान","attention","n","m"],["ध्यान से","attentively","x"],
    ["न","don't (milder, in commands)","x"],["नारा","slogan","n","m"],["नौकर","servant","n","m"],["पड़ा","lying","a"],["पढ़ना","to read, study","v"],["पान","paan","n","m"],
    ["पानी","water","n","m"],["पापा","Papa, Father","n","m"],["पीना","to drink; to smoke","v"],["पूछना","to ask","v"],["पेड़","tree","n","m"],
    ["पैसा","money; paisa","n","m"],["फल","fruit","n","m"],["बंद करना","to close, shut","v"],["बताना","to tell","v"],["बुलाना","to call, invite","v"],["बैठना","to sit","v"],
    ["बोलना","to speak","v"],["भैया","brother","n","m"],["मत","don't (more forceful)","x"],["मारना","to beat, hit","v"],["रखना","to put, keep","v"],["लाना","to bring","v"],
    ["लिखना","to write","v"],["लेना","to take, receive","v"],["शैतान","devil","n","m"],["सचमुच","really","x"],["सरल","simple","a"],["साफ़ करना","to clean","v"],
    ["सिग्रेट","cigarette","n","f"],["सुनना","to listen, hear","v"],["होना","to be, become","v"],["ऋषि","sage, seer","n","m"],["अंकल","uncle","n","m"],
    ["अम्माँ","Mum","n","f"],["नाम","name","n","m"],["पत्र","letter (formal word)","n","m"],["सुनिए","excuse me (please listen)","x"],
    ["उसका","his, her, its","p"],["उनका","their","p"],["किसका","whose?","p"],
    ["मुझे","to me (= मुझ को)","p"],["तुझे","to you (= तुझ को)","p"],["इसे","to this one (= इस को)","p"],["उसे","to him, to her (= उस को)","p"],["हमें","to us (= हम को)","p"],
    ["तुम्हें","to you (= तुम को)","p"],["इन्हें","to these (= इन को)","p"],["उन्हें","to them (= उन को)","p"],["किसे","to whom? (= किस को)","p"],["किन्हें","to whom? (plural, = किन को)","p"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "verb", title: "बोलना, बोल", desc: "The infinitive and the stem", skill: "verb", items: inf},
    {id: "cmd", title: "बैठ, बैठो, बैठिए", desc: "Commands for तू, तुम and आप", skill: "cmd", items: cmd},
    {id: "irr", title: "कीजिए, लीजिए, दीजिए, पीजिए", desc: "Irregular commands", skill: "cmd", items: irr},
    {id: "neg", title: "मत, न, से कहना", desc: "Negative commands; से and को with verbs of telling", skill: "neg", items: neg},
    {id: "ka", title: "का, की, के", desc: "Possession with का", skill: "ka", items: ka},
    {id: "ko", title: "को, मुझे, उसे", desc: "को with objects, and the short pronoun forms", skill: "ko", items: ko},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Politeness, से, को and का", skill: "usage", items: usage}
  ],
  test: {vocab: 4, verb: 1, cmd: 3, irr: 2, neg: 2, ka: 3, ko: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "infinitive", title: "The infinitive is stem + -nā (always a full न): बोलना, stem बोल-. The stem is the basis of many verb forms"},
    {id: "imperative", title: "Commands: तू takes the bare stem (intimate or blunt), तुम stem + -o, आप stem + -ie; -iegā is extra polite; the infinitive can be a (deferred) command, mostly in तुम contexts"},
    {id: "imperative-irregular", title: "Irregular आप commands कीजिए, लीजिए, दीजिए, पीजिए; irregular तुम commands लो, दो; पीना gives पियो"},
    {id: "neg-command", title: "Commands are made negative with न or, more forcefully, मत before the verb"},
    {id: "se-kahna", title: "कहना “to say” and पूछना “to ask” mark the person addressed with से (बताना and देना take को)"},
    {id: "sunie", title: "सुनिए “please listen” politely attracts attention"},
    {id: "possession-ka", title: "Possession with का: the owner is oblique; का, की, के agrees with the thing possessed and is के when that is oblique; pronouns: उसका, उनका, किसका …"},
    {id: "ko-objects", title: "को marks the indirect object (X को दो); a direct object takes को when it is specific, and nearly always when it is a person"},
    {id: "pronoun-ko-short", title: "Short forms of pronoun + को: मुझे, तुझे, इसे, उसे, हमें, तुम्हें, इन्हें, उन्हें, किसे, किन्हें (आप को has none)"},
    {id: "kaunsa", title: "कौनसा “which?” agrees like an -ā adjective"}
  ]
};

writeUnit(5, unit, {forms, fake});
