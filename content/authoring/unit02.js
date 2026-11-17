"use strict";
// Unit 2 (book pp. 14–24): सवाल और जवाब. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, agreeWhy, writeUnit} = require("../../tools/author");

const forms = {
  "अख़बार":"akhbār","अध्यापक":"adhyāpak","अभी":"abhī","आज":"āj","काग़ज़":"kāgaz","कितना":"kitnā","कितनी":"kitnī","कितने":"kitne","कृपया":"kṛpayā",
  "कैसा":"kaisā","कैसी":"kaisī","कैसे":"kaise","कौन":"kaun","क्यों":"kyõ","क्योंकि":"kyõki","ख़राब":"kharāb","ख़ुश":"khuś","गंदा":"gandā","गंदी":"gandī","गंदे":"gande",
  "चप्पल":"cappal","चप्पलें":"cappalẽ","चिट्ठी":"ciṭṭhī","चिट्ठियाँ":"ciṭṭhiyā̃","छात्र":"chātr","छात्रा":"chātrā","छात्राएँ":"chātrāẽ","जवाब":"javāb","जूता":"jūtā","जूते":"jūte",
  "ज़्यादातर":"zyādātar","दिल्ली":"dillī","दुबला":"dublā","दुबली":"dublī","दुबले":"duble","धन्यवाद":"dhanyavād","न":"na","नमस्कार":"namaskār","नया":"nayā","नई":"naī","नए":"nae",
  "नाराज़":"nārāz","नौ":"nau","पतला":"patlā","पतली":"patlī","पतले":"patle","पर":"par","परेशान":"pareśān","पाँच":"pā̃c","पागल":"pāgal","प्रदूषण":"pradūṣaṇ",
  "बहिन":"bahin","बहिनें":"bahinẽ","बात":"bāt","बिलकुल":"bilkul","बीमार":"bīmār","बुरा":"burā","बुरी":"burī","बुरे":"bure","बेटा":"beṭā","बेटे":"beṭe","बेटी":"beṭī","बेटियाँ":"beṭiyā̃",
  "भाई":"bhāī","भी":"bhī","महँगा":"mahãgā","महँगी":"mahãgī","महँगे":"mahãge","मालूम":"mālūm","मेहरबानी":"meharbānī","मोटा":"moṭā","मोटी":"moṭī","मोटे":"moṭe","मौसम":"mausam",
  "या":"yā","लंबा":"lambā","लंबी":"lambī","लंबे":"lambe","विद्यार्थी":"vidyārthī","शब्दकोश":"śabdkoś","श्री":"śrī","श्रीमती":"śrīmatī","सख़्त":"sakht","सब":"sab","सर":"sar",
  "सवाल":"savāl","सस्ता":"sastā","सस्ती":"sastī","सस्ते":"saste","साहब":"sāhab","सोमवार":"somvār","सोलह":"solah","चौदह":"caudah","हलो":"halo","हवा":"havā","हाल":"hāl","हिन्दी":"hindī",
  "नमस्ते":"namaste","शर्मा":"śarmā","ऋषि":"ṛṣi","संगीता":"sangītā","कमला":"kamlā","राज":"rāj","प्रताप":"pratāp","मैडम":"maiḍam"
};
const fake = {
  "छात्रें":"chātrẽ","छात्रियाँ":"chātriyā̃","बेटीएँ":"beṭīẽ","चिट्ठीएँ":"ciṭṭhīẽ","चिट्ठे":"ciṭṭhe","चप्पलियाँ":"cappaliyā̃","चप्पले":"cappale","बहिनियाँ":"bahiniyā̃","बहिने":"bahine",
  "जूताएँ":"jūtāẽ","बेटाएँ":"beṭāẽ","भाईएँ":"bhāīẽ","भाये":"bhāye","अख़बारें":"akhbārẽ","अख़बारे":"akhbāre","सवालें":"savālẽ","सवाले":"savāle",
  "ख़ुशी":"khuśī","ख़ुशा":"khuśā","सख़्ता":"sakhtā","सख़्ते":"sakhte"
};

const QW = {
  "क्या":"क्या asks “what?” about a thing (at the very start of a sentence it instead turns the sentence into a yes/no question).",
  "कौन":"कौन asks “who?”, about a person.",
  "क्यों":"क्यों asks “why?”.",
  "कैसा":"कैसा (“what kind of, how”) in its -ā form goes only with a masculine singular word.",
  "कैसी":"कैसी is the -ī form of कैसा, for feminine words.",
  "कैसे":"कैसे is the -e form of कैसा, for masculine plurals and for आप and तुम.",
  "कितना":"कितना (“how much”) in its -ā form goes with a masculine singular word.",
  "कितनी":"कितनी is the -ī form of कितना, for feminine words.",
  "कितने":"कितने (“how many”) is the -e form of कितना, for masculine plurals."
};
const qw = ws => ws.map(w => [w, QW[w]]);
const ag = ws => ws.map(w => [w, agreeWhy(w)]);

const ask = [
  gap("ask:0", "यह ___ है ?", "What[1] is[2] this[0]?", "क्या", qw(["कौन","क्यों"]), "The question is about a thing, so it takes क्या."),
  gap("ask:1", "वह लड़की ___ है ?", "Who[2] is[3] that[0] girl[1]?", "कौन", qw(["क्या","कितनी"]), "The question is about a person, so it takes कौन."),
  gap("ask:2", "आप ___ हैं ?", "How[1] are[2] you[0]? (to a man)", "कैसे", qw(["कैसा","कौन"]), "आप is grammatically plural, so कैसा takes its -e form, कैसे."),
  gap("ask:3", "मौसम ___ है ?", "{What is}[2] the weather[0] like[1]?", "कैसा", qw(["कैसी","कैसे"]), "मौसम is masculine singular, so कैसा keeps its -ā form."),
  gap("ask:4", "यहाँ ___ छात्राएँ हैं ?", "{How many}[1] {female students}[2] are[3] here[0]?", "कितनी", qw(["कितने","कितना"]), "छात्राएँ is feminine, so it takes कितनी."),
  gap("ask:5", "संगीता ___ परेशान है ?", "Why[1] is[3] Sangeeta[0] upset[2]?", "क्यों", qw(["कौन","कैसी"]), "Asking for a reason needs क्यों."),
  gap("ask:6", "वह मोटी किताब ___ है ?", "What[3] is[4] that[0] thick[1] book[2]?", "क्या", qw(["कौन","कितनी"]), "The question is about a thing, so it takes क्या."),
  gap("ask:7", "ये ___ जूते हैं ?", "{What kind of}[1] shoes[2] are[3] these[0]?", "कैसे", qw(["कैसी","कैसा"]), "जूते is masculine plural, so it takes कैसे."),
  gap("ask:8", "वह ___ चिट्ठी है ?", "{What kind of}[1] letter[2] is[3] that[0]?", "कैसी", qw(["कैसा","कैसे"]), "चिट्ठी is feminine, so it takes कैसी."),
  gap("ask:9", "शब्दकोश ___ महँगा है ?", "{How expensive}[1+2] is[3] the dictionary[0]?", "कितना", qw(["कितनी","कितने"]), "शब्दकोश is masculine singular, so it takes कितना, just like महँगा."),
  gap("ask:10", "आज ___ विद्यार्थी हैं ?", "{How many}[1] students[2] {are there}[3] today[0]?", "कितने", qw(["कितना","कितनी"]), "A count of students (a group, or male students) takes the masculine plural कितने."),
  gap("ask:11", "तुम ___ हो ?", "Who[1] are[2] you[0]?", "कौन", qw(["क्या","क्यों"]), "The question is about a person, so it takes कौन.")
];

const agree = [
  gap("ag:0", "प्रताप और संगीता ___ हैं ।", "Pratap[0] and[1] Sangeeta[2] are[4] tall[3].", "लंबे", [["लंबी","लंबी is feminine. Sangeeta alone would take it, but a mixed group of people takes the masculine plural."],["लंबा","लंबा is masculine singular, but the subject is two people."]], "A group of people of mixed gender takes the masculine plural."),
  gap("ag:1", "ये जूते और चप्पलें ___ हैं ।", "These[0] shoes[1] and[2] sandals[3] are[5] new[4].", "नई", [["नए","नए would agree with जूते, but with things of mixed gender the adjective agrees with the nearest noun, चप्पलें."],["नया","नया is masculine singular, but the subject is plural."]], "With things of mixed gender, the adjective agrees with the nearest noun. चप्पलें is feminine."),
  gap("ag:2", "ये किताबें और अख़बार ___ हैं ।", "These[0] books[1] and[2] newspapers[3] are[5] old[4].", "पुराने", [["पुरानी","पुरानी would agree with किताबें, but the nearest noun is अख़बार, which is masculine."],["पुराना","पुराना is masculine singular, but there are several newspapers."]], "With things of mixed gender, the adjective agrees with the nearest noun. अख़बार here is masculine plural."),
  gap("ag:3", "आप बहुत ___ हैं ।", "You[0] are[3] very[1] tall[2]. (to a man)", "लंबे", [["लंबा","आप is grammatically plural, so even for one man the adjective takes the plural -e form."],["लंबी","लंबी would suit a woman, but this is said to a man."]], "आप is grammatically plural, so the adjective is plural too."),
  gap("ag:4", "आप ___ हैं ?", "How[1] are[2] you[0]? (to a woman)", "कैसी", [["कैसे","कैसे is right for a man or a group. A woman is addressed with the feminine कैसी."],["कैसा","कैसा is masculine singular, and आप is grammatically plural in any case."]], "Feminine forms stay -ī in the plural, so a woman is asked आप कैसी हैं ?"),
  gap("ag:5", "तुम ___ बेटी हो ।", "You[0] are[3] a good[1] daughter[2].", "अच्छी", ag(["अच्छे","अच्छा"]), "बेटी is feminine, so the adjective takes -ī."),
  gap("ag:6", "तुम अच्छे ___ हो ।", "You[0] are[3] a good[1] son[2].", "बेटे", [["बेटा","With तुम, a masculine noun in -ā shows its -e plural even for one person."],["बेटी","बेटी means “daughter”."]], "तुम is grammatically plural, so बेटा becomes बेटे, as in तुम लड़के."),
  gap("ag:7", "तुम अच्छी ___ हो ।", "You[0] are[3] good[1] daughters[2].", "बेटियाँ", [["बेटी","बेटी is one daughter. Feminine nouns show their plural only when there really are several."],["बेटे","बेटे means “son” or “sons”."]], "There are several daughters, so the numerical plural बेटियाँ is needed."),
  gap("ag:8", "वह किताब बहुत ___ है ।", "That[0] book[1] is[4] very[2] expensive[3].", "महँगी", ag(["महँगा","महँगे"]), "किताब is feminine."),
  gap("ag:9", "यह शब्दकोश ___ है ।", "This[0] dictionary[1] is[3] cheap[2].", "सस्ता", ag(["सस्ती","सस्ते"]), "शब्दकोश is masculine singular."),
  gap("ag:10", "हवा ___ है ।", "The air[0] is[2] dirty[1].", "गंदी", ag(["गंदा","गंदे"]), "हवा ends in -ā but is feminine, so the adjective takes -ī."),
  gap("ag:11", "वह लड़की ___ है ।", "That[0] girl[1] is[3] happy[2].", "ख़ुश", [["ख़ुशी","ख़ुश never changes. ख़ुशी is a different word, a noun meaning “happiness”."],["ख़ुशा","ख़ुश never changes, so this is not a real form."]], "Adjectives that do not end in -ā, like ख़ुश, never change."),
  gap("ag:12", "यह ___ अख़बार है ।", "This[0] is[3] a new[1] newspaper[2].", "नया", ag(["नई","नए"]), "अख़बार is masculine singular."),
  gap("ag:13", "दो ___ जूते", "two[0] dirty[1] shoes[2]", "गंदे", ag(["गंदा","गंदी"]), "जूते is masculine plural."),
  gap("ag:14", "श्रीमती शर्मा ___ हैं ।", "Mrs[0] Sharma[1] is[3] strict[2].", "सख़्त", [["सख़्ता","सख़्त never changes, so this is not a real form."],["सख़्ते","सख़्त never changes, so this is not a real form."]], "Adjectives that do not end in -ā, like सख़्त, never change.")
];

const PLM = "Masculine nouns ending in -ā change it to -e.", PLMX = "Masculine nouns that do not end in -ā stay the same in the plural.";
const PLFI = "Feminine nouns ending in -ī change it to -iyā̃.", PLFC = "Feminine nouns that do not end in -ī add -ẽ.";
const plq = (id, hi, en, g, a, wrong, why) => mc(id, `Pick the plural of “${en}” (${g === "m" ? "masculine" : "feminine"})`, a, wrong, why, {hi, audio: true});
const plural = [
  plq("pl:0", "छात्रा", "female student", "f", "छात्राएँ", [["छात्रें","-ẽ is added to the whole word, so छात्रा keeps its -ā."],["छात्रियाँ","-iyā̃ belongs to feminine nouns ending in -ī."],["छात्रा","This is the singular. Feminine nouns change in the plural."]], "Feminine nouns that do not end in -ī add -ẽ, even when they end in -ā."),
  plq("pl:1", "बेटी", "daughter", "f", "बेटियाँ", [["बेटीएँ","Feminine nouns in -ī do not just add -ẽ."],["बेटे","बेटे is the plural of बेटा, “son”."]], PLFI),
  plq("pl:2", "चिट्ठी", "letter", "f", "चिट्ठियाँ", [["चिट्ठीएँ","Feminine nouns in -ī do not just add -ẽ."],["चिट्ठे","The -e plural is for masculine nouns in -ā."]], PLFI),
  plq("pl:3", "चप्पल", "sandal", "f", "चप्पलें", [["चप्पलियाँ","-iyā̃ belongs to feminine nouns ending in -ī."],["चप्पले","The -e plural is for masculine nouns in -ā."]], PLFC),
  plq("pl:4", "बहिन", "sister", "f", "बहिनें", [["बहिनियाँ","-iyā̃ belongs to feminine nouns ending in -ī."],["बहिने","The -e plural is for masculine nouns in -ā."]], PLFC),
  plq("pl:5", "जूता", "shoe", "m", "जूते", [["जूताएँ","-ẽ is a feminine plural ending."],["जूता","This is the singular. Masculine nouns in -ā change."]], PLM),
  plq("pl:6", "बेटा", "son", "m", "बेटे", [["बेटाएँ","-ẽ is a feminine plural ending."],["बेटियाँ","बेटियाँ means “daughters”."]], PLM),
  plq("pl:7", "भाई", "brother", "m", "भाई", [["भाईएँ","-ẽ is a feminine plural ending."],["भाये","Only masculine nouns ending in -ā take -e."]], PLMX),
  plq("pl:8", "अख़बार", "newspaper", "m", "अख़बार", [["अख़बारें","-ẽ is a feminine plural ending, and अख़बार is masculine."],["अख़बारे","Only masculine nouns ending in -ā take -e."]], PLMX),
  plq("pl:9", "सवाल", "question", "m", "सवाल", [["सवालें","-ẽ is a feminine plural ending, and सवाल is masculine."],["सवाले","Only masculine nouns ending in -ā take -e."]], PLMX),
  mc("pl:10", "तुम अच्छे बेटे हो । can mean…", "“You are a good son” or “You are good sons”", [["only “You are good sons”","With तुम, बेटा takes its -e form even for one son, so the sentence fits one son too."],["only “You are a good son”","बेटे is also the ordinary plural, so the sentence fits several sons too."]], "With तुम, masculine nouns in -ā show -e for one person as well as for several. लोग can be added to make a plural clear.", {hi: "तुम अच्छे बेटे हो ।", audio: true}),
  mc("pl:11", "तुम अच्छी बेटी हो । can mean…", "only “You are a good daughter”", [["only “You are good daughters”","For several daughters the noun itself becomes plural: बेटियाँ."],["either one daughter or several","Feminine nouns show the plural only when there really are several, so बेटी means one."]], "Feminine nouns change only for a real (numerical) plural.", {hi: "तुम अच्छी बेटी हो ।", audio: true})
];

const usage = [
  mc("us:0", "Which sentence means “Rishi is ill too” (as well as someone else)?", "ऋषि भी बीमार है ।", [["ऋषि बीमार भी है ।","भी qualifies the word just before it. Here that is बीमार, so this means Rishi is ill as well as being something else."],["भी ऋषि बीमार है ।","भी never comes first. It follows the word it qualifies."]], "भी (“also, too”) qualifies the word immediately before it."),
  mc("us:1", "Which sentence means “The book is cheap too” (as well as good)?", "किताब सस्ती भी है ।", [["किताब भी सस्ती है ।","Here भी follows किताब, so it means the book too is cheap, as well as other things."],["भी किताब सस्ती है ।","भी never comes first. It follows the word it qualifies."]], "भी (“also, too”) qualifies the word immediately before it."),
  mc("us:2", "What does न add at the end of this sentence?", "It asks the listener to agree: “…aren't you?”", [["It makes the sentence negative: “You aren't Indian.”","A negative needs नहीं before the verb. न after the sentence asks for agreement."],["It turns it into a plain yes/no question, like क्या","A plain yes/no question starts with क्या. न at the end expects the answer “yes”."]], "After a statement, न works like “isn't it?” or the French “n'est-ce pas?”.", {hi: "आप हिन्दुस्तानी हैं, न ?", audio: true}),
  mc("us:3", "What does this greeting mean?", "How are things?", [["What is this?","That would be यह क्या है ? हाल means “condition”."],["What is the weather like?","That would be मौसम कैसा है ?"]], "क्या हाल है ? is literally “what is the condition?”, a casual “how are things?”.", {hi: "क्या हाल है ?", audio: true}),
  mc("us:4", "Which word is the formal “please”?", "कृपया", [["धन्यवाद","धन्यवाद is the formal “thank you”."],["मेहरबानी","मेहरबानी means “kindness”; मेहरबानी है is a way of saying “thank you”."],["शुक्रिया","शुक्रिया is a colloquial “thanks”."]]),
  mc("us:5", "Which greeting is the formal one?", "नमस्कार", [["हलो","हलो is a casual loanword greeting."],["धन्यवाद","धन्यवाद means “thank you”, not “hello”."]], "नमस्ते and नमस्कार are the formal greetings, usually said with the hands folded."),
  mc("us:6", "What does लोग add in this sentence?", "It makes clear that several people are meant", [["It shows extra respect","आप or जी show respect. लोग marks a real plural of several people."],["It turns the sentence into a question","Nothing here is a question; क्या or a question word would be needed."]], "Since वे can be a respectful way to refer to one person, adding लोग makes the number clear.", {hi: "वे लोग परेशान हैं ।", audio: true}),
  mc("us:7", "आप कैसे हैं ? can be said to…", "one man, or a group of people", [["only a group of people","आप is grammatically plural, so कैसे fits one man as well."],["only a woman","A woman is asked आप कैसी हैं ?"]], "आप is grammatically plural, so its adjective is plural whether one or many are meant."),
  mc("us:8", "What does मालूम नहीं mean?", "I don't know", [["Not at all","That is बिलकुल नहीं."],["No, thank you","That would need धन्यवाद or शुक्रिया."]], "मालूम नहीं is literally “not known”."),
  mc("us:9", "How does जी change शर्मा जी compared with plain शर्मा?", "It adds respect, roughly “Mr Sharma”", [["It means “Mrs Sharma”","Mrs is श्रीमती, placed before the name."],["It means “Sharma's son”","जी adds respect; it says nothing about family."]], "जी after a name is polite and cordial, about as formal as आप.")
];

const build = [
  tiles("tl:0", "Who[2] is[3] that[0] man[1]?", ["वह","आदमी","कौन","है"], [["क्या","क्या asks “what?”. For a person, use कौन."],["हैं","हैं goes with plural or respected subjects. One man spoken of plainly takes है."]]),
  tiles("tl:1", "How[1] are[2] you[0]? (formal, to a man)", ["आप","कैसे","हैं"], [["कैसा","आप is grammatically plural, so it needs कैसे, not the singular कैसा."],["हो","हो goes only with तुम. आप takes हैं."]]),
  tiles("tl:2", "This[0] newspaper[1] is[4] quite[2] cheap[3].", ["यह","अख़बार","काफ़ी","सस्ता","है"], [["सस्ती","सस्ती is feminine, but अख़बार is masculine."],["हैं","हैं is plural. One newspaper takes है."]]),
  tiles("tl:3", "These[0] sandals[1] are[4] very[2] dirty[3].", ["ये","चप्पलें","बहुत","गंदी","हैं"], [["गंदे","गंदे is masculine plural, but चप्पलें is feminine."],["है","है is singular. Several sandals take हैं."]]),
  tiles("tl:4", "The student[0] is[3] ill[2] too[1].", ["विद्यार्थी","भी","बीमार","है"], [["हैं","हैं is plural. One student spoken of plainly takes है."],["क्यों","क्यों means “why”, which is not in the sentence."]], {order: "भी follows the word it qualifies. “The student too” is विद्यार्थी भी, and the verb comes last."}),
  tiles("tl:5", "Why[1] is[3] Kamala[0] angry[2]?", ["कमला","क्यों","नाराज़","है"], [["कौन","कौन means “who”, but the question asks “why”."],["हैं","हैं is plural. Kamala spoken of plainly takes है."]], {alt: [["क्यों","कमला","नाराज़","है"]]}),
  tiles("tl:6", "{How many}[0] girls[1] {are there}[2]?", ["कितनी","लड़कियाँ","हैं"], [["कितने","कितने is masculine plural, but लड़कियाँ is feminine."],["है","है is singular. Several girls take हैं."]]),
  tiles("tl:7", "The weather[1] is[3] bad[2] today[0].", ["आज","मौसम","ख़राब","है"], [["हैं","हैं is plural. मौसम is singular."],["कैसा","कैसा means “what like?”, but this sentence is a statement."]], {alt: [["मौसम","आज","ख़राब","है"]]}),
  tiles("tl:8", "Sangeeta[0] and[1] Rishi[2] are[4] tall[3].", ["संगीता","और","ऋषि","लंबे","हैं"], [["लंबी","A mixed group of people takes the masculine plural, लंबे."],["है","है is singular. Two people take हैं."]]),
  tiles("tl:9", "Is[3] the book[1] new[2] or[4] old[5]?", ["क्या","किताब","नई","है","या","पुरानी"], [["नया","नया is masculine, but किताब is feminine."],["हैं","हैं is plural. One book takes है."]]),
  tiles("tl:10", "We[0+1] are[4] not[3] upset[2].", ["हम","लोग","परेशान","नहीं","हैं"], [["है","है goes with one person or thing. हम takes हैं."],["हो","हो goes only with तुम."]]),
  tiles("tl:11", "That[0] is[4] not[3] a bad[1] thing[2].", ["वह","बुरी","बात","नहीं","है"], [["बुरा","बुरा is masculine, but बात is feminine."],["बुरे","बुरे is masculine plural, but बात is feminine singular."]])
];

const mean = [
  meaning("mn:0", "शब्दकोश सस्ता है, लेकिन किताब महँगी है ।", "The dictionary is cheap, but the book is expensive.", [["The dictionary is expensive, but the book is cheap.","सस्ता (“cheap”) goes with शब्दकोश and महँगी (“expensive”) with किताब."],["The dictionary and the book are both cheap.","लेकिन means “but”, and महँगी means “expensive”."]]),
  meaning("mn:1", "कितने लड़के बीमार हैं ?", "How many boys are ill?", [["Why are the boys ill?","“Why” is क्यों. कितने means “how many”."],["Are the boys ill?","A plain yes/no question would start with क्या. कितने asks for a number."]]),
  meaning("mn:2", "अभी सब ठीक है ।", "Everything is fine at the moment.", [["Everything is fine today.","“Today” is आज. अभी means “at the moment, right now”."],["Is everything fine now?","There is no क्या or question mark, so this is a statement."]]),
  meaning("mn:3", "भाई बीमार है और बहिन भी बीमार है ।", "The brother is ill and the sister is ill too.", [["The brother is ill, but the sister is well.","और means “and”, and भी बीमार means “ill too”."],["Is the brother ill too?","This is a statement, and भी follows बहिन, not भाई."]]),
  meaning("mn:4", "यह जवाब बिलकुल ठीक है ।", "This answer is completely right.", [["This question is completely right.","“Question” is सवाल. जवाब means “answer”."],["This answer is not right at all.","बिलकुल नहीं would mean “not at all”. Here बिलकुल means “completely”."]]),
  meaning("mn:5", "ज़्यादातर छात्राएँ जापानी हैं ।", "Most of the female students are Japanese.", [["All the students are Japanese.","ज़्यादातर means “mostly, most”, not “all”."],["Most of the boys are Japanese.","छात्राएँ are female students."]]),
  meaning("mn:6", "प्रदूषण बहुत ख़राब है, पर हवा आज साफ़ है ।", "Pollution is very bad, but the air is clean today.", [["Pollution is very bad, and the air is dirty today.","पर means “but”, and साफ़ means “clean”."],["Is the pollution bad today?","This is a statement, not a question."]]),
  meaning("mn:7", "आप कौन हैं, साहब ?", "Who are you, sir?", [["How are you, sir?","That would be आप कैसे हैं ? कौन asks “who”."],["What is this, sir?","That would be यह क्या है ? आप means “you”."]])
];

const unit = {
  id: "unit2", n: 2, title: "Questions and answers", titleHi: "सवाल और जवाब",
  scope: "Question words क्या, कौन, कैसा, कितना, क्यों; adjective agreement with mixed genders and with आप and तुम; भी and न; honorific and numerical plurals; greetings and polite words",
  pages: "book 14–24",
  skills: {ask: "Question words", agree: "Agreement", plural: "Plurals", usage: "Usage and conventions", meaning: "Reading sentences"},
  vocab: [
    ["अख़बार","newspaper","n","m"],["अध्यापक","teacher","n","m"],["अभी","right now","x"],["आज","today","x"],["काग़ज़","paper","n","m"],["कितना","how much, how many","x"],
    ["किताब","book","n","f"],["कृपया","please (formal)","x"],["कैसा","what kind of, how","x"],["कौन","who","x"],["क्यों","why","x"],["क्योंकि","because","x"],
    ["ख़राब","bad, spoiled","a"],["ख़ुश","happy","a"],["गंदा","dirty","a"],["चप्पल","sandal","n","f"],["चिट्ठी","letter, note","n","f"],["छात्र","student (male)","n","m"],
    ["छात्रा","student (female)","n","f"],["जवाब","answer","n","m"],["जूता","shoe","n","m"],["ज़्यादातर","mostly","x"],["दिल्ली","Delhi","n","f"],["दुबला","thin (of a person)","a"],
    ["धन्यवाद","thank you (formal)","x"],["नमस्कार","hello (formal)","x"],["नया","new","a"],["नाराज़","angry","a"],["नौ","nine","x"],["पतला","thin","a"],["पर","but","x"],
    ["परेशान","upset, troubled","a"],["पाँच","five","x"],["पागल","crazy","a"],["प्रदूषण","pollution","n","m"],["बहिन","sister","n","f"],["बात","matter, thing","n","f"],
    ["बिलकुल","completely","x"],["बीमार","ill","a"],["बुरा","bad","a"],["बेटा","son","n","m"],["बेटी","daughter","n","f"],["भाई","brother","n","m"],["भी","also, too","x"],
    ["महँगा","expensive","a"],["मालूम नहीं","I don't know","x"],["मेहरबानी","kindness","n","f"],["मोटा","fat, thick","a"],["मौसम","weather","n","m"],["या","or","x"],
    ["लंबा","tall, long","a"],["विद्यार्थी","student","n","m"],["शब्दकोश","dictionary","n","m"],["श्री","Mr","x"],["श्रीमती","Mrs","x"],["सख़्त","strict","a"],
    ["सब","everything, all","x"],["सवाल","question","n","m"],["सस्ता","cheap","a"],["साहब","sir, Mr","n","m"],["सोमवार","Monday","n","m"],["सोलह","sixteen","x"],
    ["चौदह","fourteen","x"],["हलो","hello (casual)","x"],["हवा","air","n","f"],["हाल","condition, state","n","m"],["हिन्दी","Hindi","n","f"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "ask", title: "क्या, कौन, कैसा, कितना, क्यों", desc: "Pick the right question word and its form", skill: "ask", items: ask},
    {id: "agree", title: "Agreement", desc: "Mixed genders, आप and तुम, invariable adjectives", skill: "agree", items: agree},
    {id: "plural", title: "More plurals", desc: "New nouns, honorific and real plurals", skill: "plural", items: plural},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "भी, न and polite words", desc: "Word position and conversational conventions", skill: "usage", items: usage}
  ],
  test: {vocab: 5, ask: 4, agree: 4, plural: 2, build: 3, meaning: 2, usage: 3},
  _grammar: [
    {id: "interrogatives", title: "Question words क्या, कौन, क्यों; कैसा and कितना inflect like -ā adjectives"},
    {id: "mixed-gender", title: "Mixed-gender agreement: people take the masculine plural; things agree with the nearest noun"},
    {id: "bhi", title: "भी qualifies the word immediately before it"},
    {id: "na-tag", title: "न after a statement asks for agreement"},
    {id: "conventions", title: "Greetings and politeness: नमस्ते/नमस्कार, जी, श्री/श्रीमती, साहब, कृपया, धन्यवाद, क्या हाल है"},
    {id: "ap-tum-plural", title: "आप and तुम take plural adjectives; masculine -ā nouns show -e with them; feminine nouns pluralise only numerically"},
    {id: "log", title: "लोग marks a numerical plural (हम लोग, वे लोग)"}
  ]
};

writeUnit(2, unit, {forms, fake});
