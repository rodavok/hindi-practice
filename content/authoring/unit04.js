"use strict";
// Unit 4 (book pp. 38–49): वह ख़ूबसूरत आदमी कौन था ? Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary
  "था":"thā","थी":"thī","थे":"the","थीं":"thī̃","अकेला":"akelā","अफ़सोस":"afsos","अरे":"are","उम्र":"umr","एकदम":"ekdam","कम":"kam","कल":"kal","काम":"kām",
  "कालेज":"kālej","कि":"ki","कुछ":"kuch","क्लास":"klās","खाना":"khānā","ख़ुशी":"khuśī","ख़ूबसूरत":"khūbsūrat","गरम":"garam","गोली":"golī","गोलियाँ":"goliyā̃",
  "चाँदी":"cā̃dī","चाचा":"cācā","चाय":"cāy","ज़ुकाम":"zukām","ज़्यादा":"zyādā","ठंडा":"ṭhaṇḍā","ठंडी":"ṭhaṇḍī","ठंडे":"ṭhaṇḍe","तो":"to","दफ़्तर":"daftar",
  "दाल":"dāl","दुकान":"dukān","दुकानें":"dukānẽ","दोस्त":"dost","पड़ोसी":"paṛosī","पसंद":"pasand","पहले":"pahle","पहाड़":"pahāṛ","प्यारा":"pyārā","प्रिय":"priy",
  "बंद":"band","बाज़ार":"bāzār","बाल-बच्चे":"bāl-bacce","बाहर":"bāhar","बुख़ार":"bukhār","मज़बूत":"mazbūt","मतलब":"matlab","महल":"mahal","माँ":"mā̃",
  "मित्र":"mitr","मेहनती":"mehnatī","रिश्तेदार":"riśtedār","वाराणसी":"vārāṇasī","विदेश":"videś","समोसा":"samosā","समोसे":"samose","साल":"sāl","सोना":"sonā",
  "सौ":"sau","होशियार":"hośiyār","आशा":"āśā","ऊँचा":"ū̃cā","ऊँचे":"ū̃ce","प्यारी":"pyārī","प्यारे":"pyāre",
  "गाड़ियाँ":"gāṛiyā̃",
  // vocative forms (4.5)
  "बच्चो":"bacco","लड़को":"laṛko","लड़कियो":"laṛkiyo","दोस्तो":"dosto","भाइयो":"bhāiyo","बेटो":"beṭo",
  // forms that earlier units' rules produce but the ledger lacks
  "बच्चों":"baccõ","लड़कों":"laṛkõ","दोस्तों":"dostõ","भाइयों":"bhāiyõ",
  // names
  "मोहन":"mohan","सुहास":"suhās","पिंकी":"pinkī","प्रकाश":"prakāś","सीता":"sītā","राज":"rāj"
};
const fake = {
  "लंबों":"lambõ"
};

const MS = "था is masculine singular.", FS = "थी is feminine singular.", MP = "थे is masculine plural (also used for आप, तुम, हम and respected people).", FP = "थीं is feminine plural (also used for आप, तुम, हम and respected women).";

const past = [
  gap("pa:0", "कल मैं बाज़ार में ___ ।", "Yesterday[0] I[1] was[4] in[3] the market[2]. (a woman speaking)", "थी", [["था", MS + " A woman says मैं थी."], ["थीं","थीं is plural. मैं is one person, so a woman says मैं थी."]], "Unlike है, the past tense shows gender: मैं था (man), मैं थी (woman)."),
  gap("pa:1", "पिंकी कल बीमार ___ ।", "Pinki[0] was[3] ill[2] yesterday[1].", "थी", [["था", MS + " Pinki is a woman."], ["थे", MP]], "One woman spoken of plainly takes थी."),
  gap("pa:2", "दोनों दुकानें बंद ___ ।", "Both[0] shops[1] were[3] closed[2].", "थीं", [["थी","थी is singular, but there are two shops."], ["थे","थे is masculine. दुकान is feminine."]], "दुकानें is feminine plural, so the verb is थीं."),
  gap("pa:3", "समोसे बहुत गरम ___ ।", "The samosas[0] were[3] very[1] hot[2].", "थे", [["था","था is singular, but समोसे is plural."], ["थीं","थीं is feminine. समोसा is masculine."]], "समोसे is masculine plural, so the verb is थे."),
  gap("pa:4", "शर्मा जी पहले वाराणसी में ___ ।", "{Mr Sharma}[0+1] was[5] in[4] Varanasi[3] before[2].", "थे", [["था","A respected man (शर्मा जी) takes the honorific plural थे, though he is one person."], ["थीं", FP + " Mr Sharma is a man."]], "Respect works in the past as in the present: शर्मा जी … थे."),
  gap("pa:5", "आप कल कहाँ ___ ?", "Where[2] were[3] you[0] yesterday[1]? (to a woman)", "थीं", [["थी","आप is grammatically plural, so even for one woman the verb is थीं."], ["थे","थे is right for a man. A woman is asked आप … थीं ?"]], "आप takes the plural: थे for a man, थीं for a woman."),
  gap("pa:6", "हम लोग कल बाहर ___ ।", "We[0+1] were[4] out[3] yesterday[2]. (men speaking)", "थे", [["था","था is singular, but हम लोग is plural."], ["थीं","थीं would be said by women. Men say हम थे."]], "हम is plural: थे for men or a mixed group, थीं for women."),
  gap("pa:7", "कमरा बहुत गंदा ___ ।", "The room[0] was[3] very[1] dirty[2].", "था", [["थी","थी is feminine, but कमरा is masculine."], ["थे","थे is plural, but here कमरा is one room."]], "कमरा is masculine singular, like गंदा, so the verb is था."),
  gap("pa:8", "ये पहाड़ बहुत ऊँचे ___ ।", "These[0] mountains[1] were[4] very[2] high[3].", "थे", [["था","पहाड़ looks the same in the plural, but ये and ऊँचे show that it is plural here."], ["थीं","थीं is feminine. पहाड़ is masculine."]], "ये पहाड़ is masculine plural, so the verb is थे."),
  gap("pa:9", "किताबें कहाँ ___ ?", "Where[1] were[2] the books[0]?", "थीं", [["थी","थी is singular, but किताबें is plural."], ["थे","थे is masculine. किताब is feminine."]], "किताबें is feminine plural, so the verb is थीं."),
  gap("pa:10", "प्रकाश पहले विदेश में ___ ।", "Prakash[0] was[4] abroad[2+3] before[1].", "था", [["थी", FS + " Prakash is a man."], ["थीं", FP]], "Prakash spoken of plainly takes था. विदेश में means “abroad”."),
  gap("pa:11", "मोहन कल दुकान पर नहीं ___ ।", "Mohan[0] {wasn't}[4+5] at[3] the shop[2] yesterday[1].", "था", [["थे","थे would show respect or a plural. Mohan spoken of plainly takes था."], ["थी", FS]], "नहीं comes before the verb, as in the present: नहीं था."),
  mc("pa:12", "Put this sentence into the past tense", "लड़कियाँ बाहर थीं ।", [["लड़कियाँ बाहर थी ।","थी is singular, but लड़कियाँ is plural."], ["लड़कियाँ बाहर थे ।","थे is masculine. लड़की is feminine."]], "हैं becomes थीं for a feminine plural subject.", {hi: "लड़कियाँ बाहर हैं ।", audio: true, say: "लड़कियाँ बाहर थीं ।", en: "The girls[0] were[2] outside[1]."})
];

const TO = "तो is not a postposition, so it never changes the case of the word before it.";
const to = [
  mc("to:0", "What does तो do at the start of this question?", "It means “so, then” (तो at the start links to what was said before)", [["It contrasts आप with other people","That use puts तो after the word: आप तो …. At the start of a sentence तो means “so, then”."], ["It makes आप oblique", TO]], "At the beginning of a sentence or phrase, तो means “so” or “then”.", {hi: "तो आप कल बीमार थे ?", audio: true, say: "तो आप कल बीमार थे ?", en: "So[0] were[4] you[1] ill[3] yesterday[2]? (to a man)"}),
  mc("to:1", "What does तो add after मैं here?", "It contrasts “I” with Pinki: “I, for my part, was at college”", [["It means “so”, linking to the last sentence","तो means “so” only at the start. After a word it contrasts that word with something else."], ["It makes मैं oblique", TO]], "After a word or phrase, तो sets it against something else in the same context.", {hi: "मैं तो कालेज में थी, पर पिंकी बाहर थी ।", audio: true, say: "मैं तो कालेज में थी, पर पिंकी बाहर थी ।", en: "I[0] was[4] at[3] college[2], but[5] Pinki[6] was[8] out[7]. (a woman speaking)"}),
  gap("to:2", "कमरा ___ बड़ा था, पर बग़ीचा बहुत छोटा था ।", "The room[0] was[3] big[2], but[4] the garden[5] was[8] very[6] small[7].", "तो", [["भी","भी would say the room too was big, as well as something else. The sentence sets the room against the garden."], ["से","से is a postposition (“from, than”). It would need the oblique कमरे and makes no sense here."]], "तो after कमरा contrasts the room with the garden. " + TO),
  mc("to:3", "Is तो a postposition?", "No, so the word before it stays in the direct case", [["Yes, so the word before it becomes oblique","Postpositions such as में and से make a word oblique. तो does not: कमरा तो, not कमरे तो."], ["Only when it comes first in the sentence","At the start तो means “so”. It never works as a postposition."]], TO),
  meaning("to:4", "आज तो मौसम अच्छा है ।", "Today the weather is good (on other days it isn't).", [["So the weather is good today?","“So” would put तो first: तो आज मौसम अच्छा है ? Here it follows आज and contrasts today with other days."], ["The weather is good today too.","“Too” is भी. तो sets today against other days."]], "तो after आज contrasts today with other days."),
  gap("to:5", "___ सीता कल कहाँ थी ?", "So[0] where[3] was[4] Sita[1] yesterday[2]?", "तो", [["भी","भी means “too, also” and never comes first."], ["कि","कि (“that”) joins a clause to words like मालूम है. It does not open a question."]], "At the start of a sentence तो means “so, then”."),
  mc("to:6", "In मोहन तो बाज़ार में था, which word does तो contrast?", "मोहन — Mohan was at the market, unlike the others", [["बाज़ार — the market, rather than somewhere else","To contrast the place, तो would follow it: बाज़ार में तो."], ["था — he was, but no longer is","तो points back at what comes just before it, here मोहन, not the verb था."]], "तो contrasts the word or phrase just before it.")
];

const cmp = [
  gap("cm:0", "यह महल उस महल ___ बड़ा है ।", "This[0] palace[1] is[6] bigger[5] than[4] that[2] palace[3].", "से", [["में","में means “in”. “Than” is से."], ["तक","तक means “up to, as far as”. “Than” is से."]], "Comparisons use से “than” after the thing compared against, and an ordinary adjective."),
  gap("cm:1", "मेरा कमरा तुम्हारे ___ से छोटा है ।", "My[0] room[1] is[6] smaller[5] than[4] your[2] room[3].", "कमरे", [["कमरा","कमरा is the direct form. Before से it is oblique: कमरे."], ["कमरों","कमरों is the oblique plural, “rooms”. The English says one room."]], "The noun before से is oblique, like any noun before a postposition."),
  gap("cm:2", "पिंकी प्रकाश से ___ है ।", "Pinki[0] is[4] younger[3] than[2] Prakash[1].", "छोटी", [["छोटा","The adjective agrees with the subject, Pinki, not with Prakash."], ["छोटे","छोटे would be plural or respectful. Pinki spoken of plainly takes the singular."]], "The adjective agrees with the subject of the sentence. Of people, छोटा and बड़ा mean “younger” and “older”."),
  gap("cm:3", "यह चाय उस चाय से ___ गरम है ।", "This[0] tea[1] is[7] less[5] hot[6] than[4] that[2] tea[3].", "कम", [["ज़्यादा","ज़्यादा means “more”. “Less” is कम."], ["और","और before an adjective means “more”, the opposite of “less”."]], "कम “less” before the adjective gives “less … than”."),
  gap("cm:4", "राज सब ___ होशियार है ।", "Raj[0] is[4] the cleverest[3] {of all}[1+2].", "से", [["को","को means “to”. The superlative uses सब से."], ["तक","तक means “up to”. The superlative uses सब से."]], "सब से “than all” before an adjective makes the superlative."),
  gap("cm:5", "मेरी बहिन ___ से बड़ी है ।", "My[0] sister[1] is[5] older[4] than[3] me[2].", "मुझ", [["मैं","मैं is the direct form. Before से it becomes मुझ."], ["मेरा","मेरा means “my”. Before से you need the pronoun itself, मुझ."]], "मैं becomes मुझ before a postposition, also before से “than”."),
  gap("cm:6", "यह गाड़ी उन ___ से नई है ।", "This[0] car[1] is[6] newer[5] than[4] those[2] cars[3].", "गाड़ियों", [["गाड़ियाँ","गाड़ियाँ is the direct plural. Before से the oblique plural is needed."], ["गाड़ी","उन is plural, so the noun must be plural too."]], "The noun compared against is oblique before से — गाड़ियों."),
  gap("cm:7", "सुहास उन ___ लड़कों से ज़्यादा मेहनती है ।", "Suhas[0] is[7] more[5] hardworking[6] than[4] those[1] tall[2] boys[3].", "लंबे", [["लंबा","लंबा is the direct form. Its noun लड़कों is oblique, so the adjective is too."], ["लंबों","Adjectives never take -õ. Their -e form serves for the oblique plural."]], "An -ā adjective before an oblique noun takes -e."),
  gap("cm:8", "समोसे दाल से ज़्यादा ___ थे ।", "The samosas[0] were[5] colder[3+4] than[2] the daal[1].", "ठंडे", [["ठंडी","ठंडी would agree with दाल. The adjective agrees with the subject, समोसे."], ["ठंडा","ठंडा is singular, but समोसे is plural."]], "The adjective agrees with the subject, here masculine plural समोसे."),
  gap("cm:9", "मेरी किताब ___ किताब से ज़्यादा पुरानी है ।", "My[0] book[1] is[7] older[5+6] than[4] your[2] book[3]. (to तुम)", "तुम्हारी", [["तुम्हारे","-e is for masculine nouns. Feminine -ī forms never change, even before से."], ["तुम्हारा","तुम्हारा is masculine, but किताब is feminine."]], "The possessive agrees with किताब, feminine; -ī forms stay -ī in the oblique."),
  gap("cm:10", "दिल्ली मेरा सब से ___ शहर है ।", "Delhi[0] is[6] my[1] dearest[2+3+4] city[5].", "प्यारा", [["प्यारी","प्यारा describes शहर, which is masculine."], ["प्यारे","प्यारे is plural or oblique. शहर here is singular and direct."]], "In सब से प्यारा शहर the adjective agrees with शहर.")
];

const ko = [
  gap("ko:0", "चाचा जी को कल बुख़ार ___ ।", "Uncle[0+1+2] had[5] a fever[4] yesterday[3].", "था", [["थे","Respect for चाचा जी does not matter here: the subject is बुख़ार, masculine singular."], ["थी","थी is feminine. बुख़ार is masculine."]], "In X को बुख़ार है the subject is बुख़ार, not the sufferer, so the verb agrees with बुख़ार."),
  gap("ko:1", "माँ को आशा ___ कि बच्चे घर पर हैं ।", "Mother[0+1] hopes[2+3] that[4] the children[5] are[8] at[7] home[6].", "है", [["हैं","The verb agrees with आशा, feminine singular, not with माँ, however respected."], ["हूँ","हूँ goes only with मैं."]], "In X को आशा है the subject is आशा."),
  gap("ko:2", "पिंकी को चाय पसंद ___ ।", "Pinki[0+1] likes[3+4] tea[2].", "है", [["हैं","हैं would need a plural subject. The subject is चाय, the thing liked."], ["हो","हो goes only with तुम."]], "X को Y पसंद है is literally “Y is pleasing to X”: the verb agrees with Y."),
  gap("ko:3", "सीता को ये पुरानी गाड़ियाँ पसंद ___ ।", "Sita[0+1] likes[5+6] these[2] old[3] cars[4].", "हैं", [["है","है would agree with Sita, but the subject is the thing liked, गाड़ियाँ, which is plural."], ["हो","हो goes only with तुम."]], "With पसंद the verb agrees with the thing liked."),
  gap("ko:4", "___ को यह शहर बहुत पसंद है ।", "I[0+1] like[5+6] this[2] city[3] {a lot}[4].", "मुझ", [["मैं","मैं is the direct form. Before को it becomes मुझ. The subject here is शहर."], ["मेरा","मेरा means “my”. Before को you need the pronoun itself, मुझ."]], "The person who likes something is marked with को, so मैं becomes मुझ."),
  gap("ko:5", "पिंकी को ___ है कि दुकान बंद है ।", "Pinki[0+1] {is sorry}[2+3] that[4] the shop[5] is[7] closed[6].", "अफ़सोस", [["ख़ुशी","ख़ुशी is “happiness”: पिंकी को ख़ुशी है means “Pinki is glad”."], ["आशा","आशा is “hope”: पिंकी को आशा है means “Pinki hopes”."]], "X को अफ़सोस है is “X is sorry”, literally “to X there is regret”."),
  gap("ko:6", "सीता को ___ है कि कालेज कल बंद है ।", "Sita[0+1] is[3] glad[2] that[4] the college[5] is[8] closed[7] tomorrow[6].", "ख़ुशी", [["अफ़सोस","अफ़सोस is “regret”: सीता को अफ़सोस है means “Sita is sorry”."], ["ज़ुकाम","ज़ुकाम is “a cold”: सीता को ज़ुकाम है means “Sita has a cold”, and a cold cannot be about something."]], "X को ख़ुशी है कि … is “X is glad that …”. With a present-tense verb, कल means “tomorrow”."),
  gap("ko:7", "मोहन को ___ नहीं है कि पिंकी कौन है ।", "Mohan[0+1] {doesn't}[3] know[2+4] who[7] Pinki[6] is[8].", "मालूम", [["पसंद","पसंद means “liked”. “Know” is मालूम, “known”."], ["ख़ुशी","ख़ुशी means “happiness”. “Know” is मालूम."]], "X को मालूम है is “X knows”, literally “to X it is known”."),
  gap("ko:8", "___ भाई को बुख़ार है ।", "My[0] brother[1+2] has[4] a fever[3].", "मेरे", [["मेरा","मेरा is the direct form. भाई is oblique before को, so the possessive takes -e."], ["मेरी","मेरी is feminine, but भाई is masculine."]], "को is a postposition, so the sufferer and its possessive are oblique."),
  gap("ko:9", "इन ___ को चाय पसंद नहीं है ।", "These[0] girls[1+2] {don't}[5] like[4+6] tea[3].", "लड़कियों", [["लड़कियाँ","लड़कियाँ is the direct plural. Before को the oblique plural is needed."], ["लड़की","इन is plural, so the noun must be plural too."]], "The person who likes takes को, so the noun is oblique: लड़कियों को."),
  mc("ko:10", "In मोहन को समोसे पसंद हैं, what is the grammatical subject?", "समोसे", [["मोहन","Mohan is the one who likes, marked with को. The verb हैं agrees with समोसे, not with him."], ["पसंद","पसंद is an adjective, “pleasing”. It describes the subject, समोसे."]], "With पसंद the thing liked is the subject; the person is oblique with को."),
  mc("ko:12", "Put this sentence into the past tense", "बच्चों को बुख़ार था ।", [["बच्चों को बुख़ार थे ।","थे would agree with the children, but the subject is बुख़ार, masculine singular."], ["बच्चों को बुख़ार थी ।","थी is feminine. बुख़ार is masculine."]], "The verb agrees with बुख़ार, so है becomes था.", {hi: "बच्चों को बुख़ार है ।", audio: true, say: "बच्चों को बुख़ार था ।", en: "The children[0+1] had[3] a fever[2]."}),
  mc("ko:11", "Which sentence means “Mother likes silver”?", "माँ को चाँदी पसंद है ।", [["माँ चाँदी पसंद है ।","Without को this does not say who likes it. The person who likes takes को."], ["माँ को चाँदी पसंद हैं ।","The verb agrees with चाँदी, which is singular. Respect for माँ does not change it."]], "X को Y पसंद है — Y is the subject, and the verb agrees with it.")
];

const ki = [
  mc("ki:0", "Which sentence means “Do you know where my glasses are?”", "क्या आप को मालूम है कि मेरा चश्मा कहाँ है ?", [["क्या आप को मालूम है कि कहाँ मेरा चश्मा है ?","After कि the question keeps its own order, मेरा चश्मा कहाँ है ?, with nothing moved."], ["क्या आप मालूम हैं कि मेरा चश्मा कहाँ है ?","The person who knows takes को — आप को मालूम है."]], "The core question मेरा चश्मा कहाँ है ? stays unchanged after कि."),
  gap("ki:1", "क्या पिंकी को मालूम है ___ सुहास कल कैसा था ?", "Does[0] Pinki[1+2] know[3+4] how[8] Suhas[6] was[9] yesterday[7]?", "कि", [["तो","तो means “so” or adds contrast. It does not join a clause to मालूम है."], ["और","और means “and”. A clause after मालूम है is joined with कि."]], "कि “that” introduces the clause after मालूम है. English often leaves it out."),
  mc("ki:2", "In this sentence, the words after कि…", "keep the order of the plain question, unchanged", [["are rearranged, as English rearranges “where was Pinki?”","English turns “where was Pinki?” into “where Pinki was”. Hindi leaves the core question पिंकी कल कहाँ थी ? as it is."], ["lose their verb","The verb थी stays. The words after कि are a full question."]], "The words after कि are the core question, unchanged.", {hi: "माँ को मालूम है कि पिंकी कल कहाँ थी ।", audio: true, say: "माँ को मालूम है कि पिंकी कल कहाँ थी ।", en: "Mother[0+1] knows[2+3] where[7] Pinki[5] was[8] yesterday[6]."}),
  meaning("ki:3", "हम को मालूम है कि चाचा जी कल वाराणसी में थे ।", "We know that Uncle was in Varanasi yesterday.", [["We know that Uncle will be in Varanasi tomorrow.","थे is past, so कल here means “yesterday”."], ["Does Uncle know that we were in Varanasi?","हम को मालूम है says “we know”. There is no क्या, and चाचा जी is the one in Varanasi."]], "कल means “yesterday” or “tomorrow”; the tense shows which.")
];

const VOC = "The vocative is like the oblique, except that the plural ending -o has no nasal.";
const voc = [
  gap("vo:0", "___, खाना गरम है !", "Children[0], the food[1] is[3] hot[2]!", "बच्चो", [["बच्चों","बच्चों, with a nasal, is the oblique plural, used before a postposition. Calling out to people uses -o without the nasal."], ["बच्चे","बच्चे is the direct plural. When you address people, the vocative is used."]], VOC),
  gap("vo:1", "___, तुम बहुत होशियार हो ।", "Son[0], you[1] are[4] very[2] clever[3].", "बेटे", [["बेटा","बेटा is the direct form. Addressing someone uses the vocative, like the oblique: बेटे."], ["बेटो","बेटो is the vocative plural, for several sons."]], "A masculine noun in -ā takes -e in the vocative singular, as in the oblique."),
  gap("vo:2", "___, आज कालेज बंद है ।", "Boys[0], the college[2] is[4] closed[3] today[1].", "लड़को", [["लड़कों","लड़कों, with a nasal, is the oblique plural. The vocative plural has no nasal."], ["लड़के","लड़के is the direct plural, or the vocative of one boy."]], VOC),
  gap("vo:3", "___, चाय ठंडी है !", "Girls[0], the tea[1] is[3] cold[2]!", "लड़कियो", [["लड़कियों","लड़कियों, with a nasal, is the oblique plural. The vocative plural has no nasal."], ["लड़कियाँ","लड़कियाँ is the direct plural. When you address people, the vocative is used."]], "Nouns in -ī take -iyo in the vocative plural."),
  gap("vo:4", "___, यह मेरा घर है ।", "Friends[0], this[1] is[4] my[2] house[3].", "दोस्तो", [["दोस्तों","दोस्तों, with a nasal, is the oblique plural. The vocative plural has no nasal."], ["दोस्त","दोस्त is singular, “friend”. The English addresses several."]], VOC),
  gap("vo:5", "___, कल आप लोग कहाँ थे ?", "Brothers[0], where[4] were[5] you[2+3] yesterday[1]?", "भाइयो", [["भाइयों","भाइयों, with a nasal, is the oblique plural. Addressing people drops the nasal."], ["भाई","भाई is the direct form. The vocative plural is भाइयो."]], "भाई takes -iyo in the vocative plural: the -ī shortens, as in the oblique."),
  mc("vo:6", "How is the vocative (the form for calling out to someone) made?", "Like the oblique, but the plural ending is -o, without a nasal", [["Like the direct case","The direct case would give बेटा and बच्चे. The vocative gives बेटे and बच्चो."], ["Like the oblique, with the plural in -õ","-õ with a nasal is the oblique plural. The vocative plural has a plain -o: बच्चो, not बच्चों."]], VOC)
];

const build = [
  tiles("tl:0", "Yesterday[0] the shop[1] was[3] closed[2].", ["कल","दुकान","बंद","थी"], [["था","दुकान is feminine, so the verb is थी."], ["थीं","थीं is plural, but there is one shop."]], {alt: [["दुकान","कल","बंद","थी"]]}),
  tiles("tl:1", "Sita[0] is[4] cleverer[3] than[2] Mohan[1].", ["सीता","मोहन","से","होशियार","है"], [["में","में means “in”. “Than” is से."], ["को","को means “to”. “Than” is से."]], {order: "The one compared against comes just before से — सीता मोहन से होशियार है means Sita is cleverer than Mohan."}),
  tiles("tl:2", "My[0] neighbour[1+2] has[4] a cold[3]. (a man)", ["मेरे","पड़ोसी","को","ज़ुकाम","है"], [["मेरा","पड़ोसी is oblique before को, so the possessive takes -e: मेरे."], ["हैं","The verb agrees with ज़ुकाम, masculine singular."]]),
  tiles("tl:3", "My[0] friend[1+2] likes[4+5] samosas[3]. (a man)", ["मेरे","दोस्त","को","समोसे","पसंद","हैं"], [["है","The verb agrees with the thing liked, समोसे, which is plural."], ["दोस्तों","दोस्तों is the oblique plural, “friends”. The English says one friend."]]),
  tiles("tl:4", "Children[0], the samosas[1] are[4] very[2] hot[3]!", ["बच्चो","समोसे","बहुत","गरम","हैं"], [["बच्चों","बच्चों is the oblique plural. Calling out to people uses the vocative बच्चो, without the nasal."], ["है","है is singular, but समोसे is plural."]]),
  tiles("tl:5", "This[0] palace[1] is[5] the oldest[2+3+4].", ["यह","महल","सब","से","पुराना","है"], [["पुरानी","पुरानी is feminine, but महल is masculine."], ["में","में means “in”. The superlative is सब से."]]),
  tiles("tl:6", "Does[0] Pinki[1+2] know[3+4] where[7] the tablets[6] are[8]?", ["क्या","पिंकी","को","मालूम","है","कि","गोलियाँ","कहाँ","हैं"], [["थीं","थीं is past, “were”. The English says “are”."], ["कौन","कौन asks “who?”. “Where” is कहाँ."]], {order: "After कि the core question keeps its own order: गोलियाँ कहाँ हैं ?"}),
  tiles("tl:7", "Prakash[0+1] was[5] in[4] the market[3] yesterday[2].", ["प्रकाश","जी","कल","बाज़ार","में","थे"], [["था","A respected man (प्रकाश जी) takes the honorific plural थे."], ["थीं","थीं is feminine. Prakash is a man."]], {alt: [["कल","प्रकाश","जी","बाज़ार","में","थे"]]}),
  tiles("tl:8", "Those[0] girls[1] were[4] very[2] hardworking[3].", ["वे","लड़कियाँ","बहुत","मेहनती","थीं"], [["थी","थी is singular, but लड़कियाँ is plural."], ["थे","थे is masculine. लड़की is feminine."]]),
  tiles("tl:9", "Is[5] Pinki[1] older[4] than[3] you[2]? (to तुम)", ["क्या","पिंकी","तुम","से","बड़ी","है"], [["तुम्हारे","तुम्हारे means “your”. Before से the pronoun itself stays तुम."], ["बड़ा","बड़ा is masculine. The adjective agrees with the subject, Pinki."]]),
  tiles("tl:10", "This[0] room[1] is[7] less[5] airy[6] than[4] that[2] one[3].", ["यह","कमरा","उस","कमरे","से","कम","हवादार","है"], [["वह","वह is the direct form. Before an oblique noun it becomes उस."], ["कमरों","कमरों is the oblique plural, “rooms”. The English compares with one room."]])
];

const mean = [
  meaning("mn:0", "मेरा दोस्त मुझ से ज़्यादा होशियार है ।", "My friend is cleverer than me.", [["I am cleverer than my friend.","The one before से is the one compared against: मुझ से “than me”."], ["My friend is very clever, like me.","मुझ से ज़्यादा means “more than me”."]]),
  meaning("mn:1", "बाहर बहुत ठंडा था ।", "It was very cold outside.", [["It is very cold outside.","था is past, “was”. “Is” would be है."], ["It was very hot outside.","ठंडा means “cold”. “Hot” is गरम."]]),
  meaning("mn:2", "पहले वाराणसी में मेरे कई रिश्तेदार थे ।", "I used to have several relatives in Varanasi.", [["Several of my relatives are in Varanasi now.","पहले … थे is past: “previously … were”."], ["Several of my friends were in Varanasi before.","रिश्तेदार means “relative”. “Friend” is दोस्त."]]),
  meaning("mn:3", "सीता को कल बुख़ार था, पर आज वह ठीक है ।", "Sita had a fever yesterday, but today she is fine.", [["Sita has a fever today, but yesterday she was fine.","The fever goes with कल … था, and ठीक है with आज."], ["Sita had a cold yesterday, but today she is fine.","बुख़ार is “fever”. “A cold” is ज़ुकाम."]]),
  meaning("mn:4", "ओ दोस्तो, यह बाज़ार सब से सस्ता है !", "Oh friends, this market is the cheapest!", [["Oh friends, this market is cheaper than the others!","सब से before the adjective is the superlative, “the cheapest”."], ["Oh friend, all the markets are cheap!","दोस्तो is plural, and यह बाज़ार is one market. सब से सस्ता means “cheapest of all”."]]),
  meaning("mn:5", "क्या आप को यह खाना पसंद नहीं है ?", "Don't you like this food?", [["Do you like this food?","नहीं makes the question negative."], ["Don't you know this food?","मालूम means “known”. पसंद means “liked”."]]),
  meaning("mn:6", "यह महल सौ साल पुराना है ।", "This palace is a hundred years old.", [["This palace is ten years old.","सौ is “hundred”. “Ten” is दस."], ["This mountain is a hundred years old.","महल is “palace”. “Mountain” is पहाड़."]]),
  meaning("mn:7", "क्या तुम को मालूम है कि दुकान कल बंद थी ?", "Do you know that the shop was closed yesterday?", [["Do you know whether the shop is closed tomorrow?","थी is past, so कल means “yesterday”."], ["Do you know why the shop was closed yesterday?","There is no क्यों “why” here. कि just means “that”."]])
];

const usage = [
  mc("us:0", "What does से mean in यह गाड़ी उस गाड़ी से सस्ती है ?", "than", [["from","से can mean “from”, but after the thing compared against, with an adjective, it means “than”."], ["with","से can mean “with”, but in a comparison it means “than”."]], "Comparisons use से “than”. The adjective itself does not change."),
  mc("us:1", "Which word can mean “more” before the adjective in a comparison?", "either ज़्यादा or और", [["only ज़्यादा","और also means “more” before an adjective: और लंबा “taller”."], ["only बहुत","बहुत means “very”. “More” is ज़्यादा or और."]], "ज़्यादा or और before the adjective makes a comparison more specific; it is also used when “than whom” is not stated."),
  mc("us:2", "How does the past tense of “to be” differ from the present?", "It shows gender as well as number", [["The past tense does not show number","था and थी are singular; थे and थीं are plural."], ["Both tenses show gender in the same way","है and हैं are the same for men and women. Only the past shows gender."]], "Unlike है, the past tense distinguishes masculine and feminine: था, थी, थे, थीं."),
  mc("us:3", "Which phrase means “of all” in a superlative?", "सब से", [["सब को","को means “to”. The superlative uses सब से, “than all”."], ["सब तक","तक means “up to”. The superlative uses सब से."]], "सब से अच्छा, literally “better than all”, is “best”."),
  mc("us:4", "What does कल mean in कल मैं बीमार थी ?", "yesterday", [["tomorrow","कल means both “yesterday” and “tomorrow”. थी is past, so here it is “yesterday”."], ["today","“Today” is आज."]], "कल is “yesterday” or “tomorrow”; the tense of the verb shows which."),
  mc("us:5", "In casual speech, where else can the question word क्या go in a yes/no question?", "At the very end: वह घर पर है क्या ?", [["Just before the verb: वह घर पर क्या है ?","That would ask “what is at home?”. Casual speech can move the yes/no क्या to the end."], ["Nowhere else: क्या must always come first","In casual speech the yes/no क्या is often put at the very end instead."]], "क्या normally starts a yes/no question, but in casual speech it is often added at the end.")
];

const unit = {
  id: "unit4", n: 4, title: "Who was that handsome man?", titleHi: "वह ख़ूबसूरत आदमी कौन था ?",
  scope: "Past tense था, थी, थे, थीं; तो “so, as for”; comparison with से, ज़्यादा, कम, सब से; को constructions (मुझ को ज़ुकाम है, पसंद, मालूम); कि clauses; the vocative case",
  pages: "book 38–49",
  skills: {past: "Past tense of होना", to: "तो", cmp: "Comparison", ko: "को constructions", voc: "Vocative", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["था","was (masculine)","v"],["थी","was (feminine)","v"],["थे","were (masculine)","v"],["थीं","were (feminine)","v"],
    ["अकेला","alone","a"],["अफ़सोस","regret","n","m"],["अरे","oh! what!","x"],["उम्र","age","n","f"],["एकदम","completely","x"],["और","more (in comparisons)","x"],
    ["कम","less, little","a"],["कल","yesterday; tomorrow","x"],["काम","work","n","m"],["कालेज","college","n","m"],["कि","that (joins a clause)","x"],["कुछ नहीं","nothing","x"],
    ["क्लास","class","n","f"],["खाना","food","n","m"],["ख़ुशी","happiness, pleasure","n","f"],["ख़ूबसूरत","beautiful, handsome","a"],["गरम","warm, hot","a"],
    ["गोली","tablet, pill","n","f"],["घर पर","at home","x"],["चाँदी","silver","n","f"],["चाचा","uncle (father's brother)","n","m"],["चाय","tea","n","f"],
    ["ज़ुकाम","a cold (illness)","n","m"],["ज़्यादा","more, very","a"],["ठंडा","cold, cool","a"],["तो","so; as for","x"],["दफ़्तर","office","n","m"],
    ["दाल","daal, lentils","n","f"],["दुकान","shop","n","f"],["दोस्त","friend","n","m"],["पड़ोसी","neighbour","n","m"],["पसंद","liked, pleasing","a"],
    ["पहले","previously, before","x"],["पहाड़","hill, mountain","n","m"],["प्यारा","dear, lovely","a"],["प्रिय","dear (in letters)","a"],["बंद","closed, shut","a"],
    ["बाज़ार","market","n","m"],["बाल-बच्चे","children, family","n","m"],["बाहर","out, outside","x"],["बुख़ार","fever","n","m"],["मज़बूत","strong","a"],
    ["मतलब","meaning","n","m"],["महल","palace","n","m"],["माँ","Ma, mother","n","f"],["मालूम","known","a"],["मित्र","friend (formal word)","n","m"],
    ["मेहनती","hardworking","a"],["रिश्तेदार","relative","n","m"],["वाराणसी","Varanasi, Banaras","n","f"],["विदेश","abroad, foreign country","n","m"],
    ["समोसा","samosa","n","m"],["साल","year","n","m"],["सोना","gold","n","m"],["सौ","hundred","x"],["होशियार","clever, intelligent","a"],
    ["आशा","hope","n","f"],["ऊँचा","high, lofty","a"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {
    "तो": "after a word, sets it against something else (“as for …, at least”); at the start of a sentence it means “so”",
    "कि": "“that”, introducing the clause that follows; English often leaves it out"
  },
  lessons: [
    {id: "past", title: "था, थी, थे, थीं", desc: "“Was” and “were”: the past tense shows gender", skill: "past", items: past},
    {id: "to", title: "तो", desc: "“So” at the start; contrast after a word", skill: "to", items: to},
    {id: "cmp", title: "से, ज़्यादा, कम, सब से", desc: "Comparisons and superlatives", skill: "cmp", items: cmp},
    {id: "ko", title: "मुझ को ज़ुकाम है", desc: "को constructions: the verb agrees with the thing", skill: "ko", items: ko},
    {id: "ki", title: "मालूम है कि …", desc: "Questions inside a sentence with कि", skill: "ko", items: ki},
    {id: "voc", title: "बच्चो ! बेटे !", desc: "The vocative case, for calling out", skill: "voc", items: voc},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Comparison, the past, कल and क्या", skill: "usage", items: usage}
  ],
  test: {vocab: 4, past: 3, to: 1, cmp: 3, ko: 3, ki: 1, voc: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "be-past", title: "Past tense of होना — था (m sg), थी (f sg), थे (m pl), थीं (f pl); unlike है it shows gender; आप, तुम, हम and respected people take the plural"},
    {id: "to", title: "तो — at the start of a phrase “so, then”; after a word it contrasts that word with something else; it is not a postposition and does not affect case"},
    {id: "comparison", title: "Comparison: X Y से adjective (“X is more … than Y”), with the compared noun oblique; ज़्यादा or और “more”, कम “less”; superlative with सब से"},
    {id: "ko-construction", title: "को constructions: मुझ को ज़ुकाम है — the thing (ज़ुकाम, बुख़ार, अफ़सोस, आशा, ख़ुशी, or what is मालूम/पसंद) is the subject and the verb agrees with it; the person is oblique with को"},
    {id: "ki-clause", title: "कि “that” introduces a clause; an embedded question keeps the order of the direct question (… मालूम है कि राज कहाँ है)"},
    {id: "vocative", title: "Vocative case: like the oblique, but the plural ending is -o without a nasal (बेटे ! बच्चो ! भाइयो !)"},
    {id: "kya-final", title: "In casual speech the yes/no क्या can come at the end of the sentence"},
    {id: "kal", title: "कल means “yesterday” or “tomorrow”; the tense shows which"}
  ]
};

writeUnit(4, unit, {forms, fake});
