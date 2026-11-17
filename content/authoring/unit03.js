"use strict";
// Unit 3 (book pp. 26–36): घर में कमरे. Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary
  "तुम्हारा":"tumhārā","तुम्हारी":"tumhārī","तुम्हारे":"tumhāre","तबियत":"tabiyat","घर":"ghar","घरों":"gharõ","परिवार":"parivār","पति":"pati","पत्नी":"patnī",
  "कई":"kaī","छह":"chah","सारा":"sārā","सारी":"sārī","सारे":"sāre","सामान":"sāmān","वग़ैरह":"vagairah","अब":"ab","फ़र्श":"farś","दरी":"darī","दरियाँ":"dariyā̃",
  "ओ":"o","कहाँ":"kahā̃","बाथरूम":"bāthrūm","में":"mẽ","सुबह":"subah","से":"se","वहाँ":"vahā̃","ख़ैर":"khair","मेरा":"merā","मेरी":"merī","मेरे":"mere",
  "आपका":"āpkā","आपकी":"āpkī","आपके":"āpke","चश्मा":"caśmā","रे":"re","शायद":"śāyad","दराज़":"darāz","दराज़ें":"darāzẽ","दराज़ों":"darāzõ",
  "बहुत-सारा":"bahut-sārā","बहुत-सारी":"bahut-sārī","बहुत-सारे":"bahut-sāre","चीज़":"cīz","चीज़ें":"cīzẽ","तक":"tak","को":"ko","रात":"rāt","समय":"samay","बस":"bas",
  "आराम":"ārām","भारत":"bhārat","कपड़ा":"kapṛā","कपड़े":"kapṛe","कपड़ों":"kapṛõ","क़लम":"qalam","काला":"kālā","काली":"kālī","काले":"kāle","गाँव":"gā̃v","गाँवों":"gā̃võ",
  "चार":"cār","तस्वीर":"tasvīr","तस्वीरें":"tasvīrẽ","दस":"das","दीवार":"dīvār","दीवारें":"dīvārẽ","दीवारों":"dīvārõ","पर्दा":"pardā","पर्दे":"parde","पर्दों":"pardõ",
  "रसोईघर":"rasoīghar","रसोईघरों":"rasoīgharõ","लंदन":"landan","शहर":"śahar","शहरों":"śaharõ","हिन्दू":"hindū","हिन्दुओं":"hinduõ","मूर्ति":"mūrti",
  // oblique pronouns
  "मुझ":"mujh","तुझ":"tujh","इस":"is","इन":"in","उस":"us","उन":"un","किस":"kis","किन":"kin","मुझसे":"mujhse",
  // oblique forms of nouns from units 1–2, and plurals the earlier units' rules produce
  "कमरों":"kamrõ","मकानों":"makānõ","लड़कों":"laṛkõ","लड़कियों":"laṛkiyõ","आदमियों":"ādmiyõ","मेज़ों":"mezõ","माताओं":"mātāõ","चिड़ियों":"ciṛiyõ",
  "अलमारियों":"almāriyõ","गाड़ियों":"gāṛiyõ","दरवाज़ों":"darvāzõ","बग़ीचे":"bagīce","बग़ीचों":"bagīcõ","बच्चे":"bacce","खिड़कियाँ":"khiṛkiyā̃",
  // name
  "राम":"rām"
};
const fake = {
  "कमराओं":"kamrāõ","लड़कीयों":"laṛkīyõ","आदमीयों":"ādmīyõ","आदमीओं":"ādmīõ","हिन्दूओं":"hindūõ","हिन्दुयों":"hinduyõ","मेज़ियों":"meziyõ","मातों":"mātõ",
  "घरे":"ghare","घरें":"gharẽ","चिड़ियाओं":"ciṛiyāõ","गाँवें":"gā̃vẽ","गाँवे":"gā̃ve","शहरे":"śahare","रसोईघरे":"rasoīghare","बाथरूमे":"bāthrūme",
  "छोटों":"choṭõ","पुरानों":"purānõ","बड़ों":"baṛõ","सफ़ेदे":"safede","सफ़ेदा":"safedā","कपड़ाओं":"kapṛāõ","दीवारे":"dīvāre","पर्दाओं":"pardāõ"
};

// Postposition meanings, used for wrong choices.
const PP = {
  "में":"में means “in”, inside something.",
  "पर":"पर means “on” a surface, or “at” a place or time (घर पर “at home”, समय पर “on time”).",
  "तक":"तक means “up to, as far as, until”.",
  "को":"को means “to”, and with a few time words “at” (रात को “at night”).",
  "से":"से means “from, by, with, since”."
};
const pp = ws => ws.map(w => [w, PP[w]]);

const post = [
  gap("pp:0", "किताबें अलमारी ___ हैं ।", "The books[0] are[3] in[2] the cupboard[1].", "में", pp(["पर","से"]), "Inside a cupboard is में. Like every postposition, it follows its noun: अलमारी में."),
  gap("pp:1", "अख़बार पलंग ___ है ।", "The newspaper[0] is[3] on[2] the bed[1].", "पर", [["में","में would put the newspaper inside the bed. On a surface is पर."], ["तक", PP["तक"]]], "On a surface is पर, placed after the noun."),
  gap("pp:2", "आप कहाँ ___ हैं ?", "Where[1] are[3] you[0] from[2]?", "से", [["में","कहाँ में is not said. “From where” is कहाँ से."], ["तक","कहाँ तक asks “how far?”, not “where from?”."]], "“From” is से, so आप कहाँ से हैं ? asks where someone comes from."),
  gap("pp:3", "मैं लंदन ___ हूँ ।", "I[0] am[3] from[2] London[1].", "से", [["में","मैं लंदन में हूँ would mean “I am in London”."], ["पर", PP["पर"]]], "Where someone comes from takes से."),
  gap("pp:4", "वह सोमवार ___ दिल्ली में है ।", "She[0] is[5] in[4] Delhi[3] until[2] Monday[1].", "तक", [["से","सोमवार से would mean “since Monday”, the opposite end of the time."], ["को", PP["को"] + " “Until” is तक."]], "“Until” is तक, after the time word."),
  gap("pp:5", "रात ___ बग़ीचा बहुत सुन्दर है ।", "At[1] night[0] the garden[2] is[5] very[3] beautiful[4].", "को", [["तक","रात तक would mean “until night”."], ["से","रात से would mean “since last night”."]], "रात को is the set phrase for “at night”."),
  gap("pp:6", "दादी जी सुबह ___ बीमार हैं ।", "Grandmother[0] {has been}[5] ill[4] since[3] the morning[2].", "से", [["तक","सुबह तक would mean “until the morning”."], ["को", PP["को"] + " “Since” is से."]], "“Since” a time is से. Hindi uses the present tense for a state that has lasted since then."),
  gap("pp:7", "चिड़िया पत्थर ___ है ।", "The bird[0] is[3] on[2] the stone[1].", "पर", [["में","में would put the bird inside the stone. On top of it is पर."], ["से", PP["से"]]], "On a surface is पर."),
  gap("pp:8", "दराज़ ___ क्या है ?", "What[2] is[3] in[1] the drawer[0]?", "में", [["पर","दराज़ पर would be “on the drawer”, on top of it."], ["को", PP["को"]]], "Inside something is में."),
  gap("pp:9", "यहाँ ___ वहाँ तक सब साफ़ है ।", "Everything[4] is[6] clean[5] from[1] here[0] to[3] there[2].", "से", [["में","यहाँ में is not said. The starting point is यहाँ से."], ["को","को marks “to”, but the starting point of a stretch is से."]], "से … तक is “from … to, as far as”."),
];

const OBM = "Before a postposition a noun is oblique. Masculine nouns in -ā change it to -e in the oblique singular.";
const OBX = "Masculine nouns that do not end in -ā, and all feminine nouns, look the same in the oblique singular as in the direct.";
const OBP = "Every noun takes -õ in the oblique plural.";
const obl = [
  gap("ob:0", "___ में दो पलंग हैं ।", "There are[4] two[2] beds[3] in[1] the room[0].", "कमरे", [["कमरा","कमरा is the direct form. In front of में the noun is oblique, so -ā becomes -e."], ["कमरों","कमरों is the oblique plural, “in the rooms”, but the sentence is about one room."]], OBM),
  gap("ob:1", "बच्चे ___ में हैं ।", "The children[0] are[3] in[2] the garden[1].", "बग़ीचे", [["बग़ीचा","बग़ीचा is the direct form. Before में it must be oblique: बग़ीचे."], ["बग़ीचों","बग़ीचों is the oblique plural, “in the gardens”."]], OBM),
  gap("ob:2", "इन ___ में कई बच्चे हैं ।", "There are[5] several[3] children[4] in[2] these[0] houses[1].", "घरों", [["घर","घर is the singular (direct or oblique). इन is plural, so the noun must be the oblique plural."], ["घरें","-ẽ is a feminine direct plural ending. घर is masculine, and before में it needs the oblique plural -õ."]], OBP),
  gap("ob:3", "दो ___ पर किताबें हैं ।", "There are[4] books[3] on[2] two[0] tables[1].", "मेज़ों", [["मेज़ें","मेज़ें is the direct plural. Before पर the oblique plural -õ is needed."], ["मेज़","मेज़ is singular, but there are two tables."]], OBP),
  gap("ob:4", "इन ___ में कई कुरसियाँ हैं ।", "There are[5] several[3] chairs[4] in[2] these[0] rooms[1].", "कमरों", [["कमरे","कमरे before में is the oblique singular, “in the room”. इन is plural, so the oblique plural is needed."], ["कमरा","कमरा is the direct singular."]], OBP),
  gap("ob:5", "उन ___ में संगीता कौन है ?", "Which[4] of[2] those[0] girls[1] is[5] Sangeeta[3]?", "लड़कियों", [["लड़कियाँ","लड़कियाँ is the direct plural. Before में the oblique plural is needed."], ["लड़कीयों","Before -õ, a final -ī shortens to -iy-: लड़कियों."]], "Feminine nouns in -ī take -iyõ in the oblique plural. में here means “among”."),
  gap("ob:6", "इन ___ में दो अध्यापक हैं ।", "There are[5] two[3] teachers[4] among[2] these[0] men[1].", "आदमियों", [["आदमी","आदमी is the same in the direct singular and plural, but before a postposition the oblique plural is आदमियों."], ["आदमीयों","Before -õ, a final -ī shortens to -iy-: आदमियों."]], "Masculine nouns in -ī change to -iy- before the oblique plural -õ."),
  gap("ob:7", "पिता जी ___ में हैं ।", "Father[0] is[4] in[3] the kitchen[2].", "रसोईघर", [["रसोईघरे","Only masculine nouns ending in -ā change to -e. रसोईघर does not change in the oblique singular."], ["रसोईघरों","रसोईघरों is the oblique plural, “in the kitchens”."]], OBX),
  gap("ob:8", "___ पर नए पर्दे हैं ।", "There are[4] new[2] curtains[3] on[1] the doors[0].", "दरवाज़ों", [["दरवाज़े","दरवाज़े before पर is the oblique singular, “on the door”. The English says doors."], ["दरवाज़ा","दरवाज़ा is the direct singular."]], OBP),
  gap("ob:9", "मेरी पत्नी इस ___ से है ।", "My[0] wife[1] is[5] from[4] this[2] town[3].", "शहर", [["शहरों","शहरों is the oblique plural, but इस is singular."], ["शहरे","Only masculine nouns ending in -ā change to -e."]], OBX),
  gap("ob:10", "किताब ___ में है ।", "The book[0] is[3] in[2] the drawer[1].", "दराज़", [["दराज़ों","दराज़ों is the oblique plural, “in the drawers”."], ["दराज़ें","दराज़ें is the direct plural. Feminine nouns do not change in the oblique singular."]], OBX)
];

const opl = (id, hi, en, g, a, wrong, why) => mc(id, `Pick the oblique plural of “${en}” (${g === "m" ? "masculine" : "feminine"})`, a, wrong, why, {hi, audio: true});
const osg = (id, hi, en, g, a, wrong, why) => mc(id, `Pick the oblique singular of “${en}” (${g === "m" ? "masculine" : "feminine"})`, a, wrong, why, {hi, audio: true});
const oforms = [
  opl("of:0", "कमरा", "room", "m", "कमरों", [["कमरे","कमरे is the direct plural and the oblique singular, not the oblique plural."], ["कमराओं","The final -ā of a masculine noun drops before -õ."]], "Masculine nouns in -ā replace it with -õ."),
  opl("of:1", "लड़की", "girl", "f", "लड़कियों", [["लड़कियाँ","लड़कियाँ is the direct plural."], ["लड़कीयों","Before -õ, a final -ī shortens to -iy-."]], "Nouns in -ī take -iyõ."),
  opl("of:2", "आदमी", "man", "m", "आदमियों", [["आदमी","आदमी is unchanged in the direct plural, but every noun changes in the oblique plural."], ["आदमीओं","A final -ī becomes -iy- before -õ."]], "Nouns in -ī take -iyõ, masculine or feminine."),
  opl("of:3", "हिन्दू", "Hindu", "m", "हिन्दुओं", [["हिन्दूओं","A final -ū shortens to -u- before -õ."], ["हिन्दुयों","-iy- is for nouns in -ī. Nouns in -ū just shorten the vowel."]], "A final -ū shortens to -u- before the -õ ending."),
  opl("of:5", "माता", "mother", "f", "माताओं", [["माताएँ","माताएँ is the direct plural."], ["मातों","Only masculine nouns lose their -ā. Feminine माता keeps it and adds -õ."]], "Feminine nouns in -ā keep the -ā and add -õ."),
  opl("of:7", "चिड़िया", "bird", "f", "चिड़ियों", [["चिड़ियाँ","चिड़ियाँ is the direct plural."], ["चिड़ियाओं","Nouns in -iyā behave like nouns in -ī and take -iyõ."]], "Feminine nouns in -iyā take -iyõ."),
  osg("of:8", "कपड़ा", "garment", "m", "कपड़े", [["कपड़ा","कपड़ा is the direct form. A masculine noun in -ā does not keep it before a postposition."], ["कपड़ों","कपड़ों is the oblique plural."]], "Masculine nouns in -ā change it to -e in the oblique singular."),
  osg("of:9", "दीवार", "wall", "f", "दीवार", [["दीवारें","दीवारें is the direct plural. Feminine nouns do not change in the oblique singular."], ["दीवारे","-e belongs to masculine nouns in -ā."]], "Feminine nouns look the same in the oblique singular as in the direct."),
  osg("of:10", "पर्दा", "curtain", "m", "पर्दे", [["पर्दों","पर्दों is the oblique plural."], ["पर्दा","Masculine nouns in -ā change in the oblique singular."]], "Masculine nouns in -ā change it to -e in the oblique singular.")
];

const adj = [
  gap("aj:0", "___ कमरे में दो खिड़कियाँ हैं ।", "There are[5] two[3] windows[4] in[2] the big[0] room[1].", "बड़े", [["बड़ा","बड़ा is the direct form. When its noun is oblique, an -ā adjective changes to -e."], ["बड़ी","बड़ी is feminine, but कमरा is masculine."]], "कमरे is oblique before में, so the adjective is oblique too: बड़े."),
  gap("aj:1", "___ कुरसी पर कौन है ?", "Who[3] is[4] on[2] the black[0] chair[1]?", "काली", [["काले","-e is the oblique of masculine -ā adjectives. कुरसी is feminine, and -ī never changes."], ["काला","काला is masculine, but कुरसी is feminine."]], "Feminine -ī adjectives stay -ī in the oblique."),
  gap("aj:2", "___ अलमारी में कई कपड़े हैं ।", "There are[5] several[3] clothes[4] in[2] my[0] cupboard[1].", "मेरी", [["मेरे","मेरा agrees with the thing possessed, अलमारी, which is feminine. The -e form is for masculine nouns."], ["मेरा","मेरा is masculine, but अलमारी is feminine."]], "मेरा agrees like an adjective with the thing possessed."),
  gap("aj:3", "क्या ___ घर में बग़ीचा है ?", "Is[5] there a garden[4] at[3] your[1] house[2]?", "आपके", [["आपका","आपका is the direct form. घर is oblique before में, so its possessive is too: आपके."], ["आपकी","आपकी is feminine, but घर is masculine."]], "आपका works like an -ā adjective: -e before an oblique masculine noun."),
  gap("aj:4", "दादी जी एक ___ गाँव से हैं ।", "Grandmother[0] is[6] from[5] a[2] small[3] village[4].", "छोटे", [["छोटा","छोटा is the direct form. Before से, गाँव is oblique and so is its adjective."], ["छोटी","छोटी is feminine. The adjective agrees with गाँव, not with grandmother."]], "The adjective agrees with its own noun, गाँव, which is oblique before से."),
  gap("aj:5", "___ कमरों में नई दरियाँ हैं ।", "There are[5] new[3] rugs[4] in[2] the small[0] rooms[1].", "छोटे", [["छोटों","Adjectives never take -õ. Their -e form serves for the oblique singular and plural."], ["छोटा","छोटा is the direct singular."]], "In the oblique plural, the noun takes -õ but the adjective only -e."),
  gap("aj:6", "___ कमरे में कौन है ?", "Who[3] is[4] in[2] your[0] room[1]? (to तुम)", "तुम्हारे", [["तुम्हारा","तुम्हारा is the direct form. कमरे is oblique, so the possessive takes -e."], ["तुम्हारी","तुम्हारी is feminine, but कमरा is masculine."]], "तुम्हारा works like an -ā adjective."),
  gap("aj:7", "___ परिवार में चार बेटियाँ हैं ।", "There are[5] four[3] daughters[4] in[2] my[0] family[1].", "मेरे", [["मेरी","मेरी would agree with बेटियाँ, but the possessive goes with परिवार."], ["मेरा","मेरा is the direct form. परिवार is oblique before में."]], "मेरा agrees with परिवार, masculine and oblique here."),
  gap("aj:8", "उस ___ दीवार पर एक तस्वीर है ।", "There is[6] a[4] picture[5] on[3] that[0] white[1] wall[2].", "सफ़ेद", [["सफ़ेदे","सफ़ेद does not end in -ā, so it never changes."], ["सफ़ेदा","सफ़ेद never changes, so this is not a real form."]], "Adjectives that do not end in -ā never change, in the oblique too."),
  gap("aj:10", "___ साइकिल कहाँ है ?", "Where[2] is[3] your[0] bicycle[1]? (to तुम)", "तुम्हारी", [["तुम्हारा","तुम्हारा is masculine, but साइकिल is feminine."], ["तुम्हारे","-e is for masculine nouns, oblique or plural. साइकिल is feminine."]], "The possessive agrees with the thing possessed, साइकिल."),
  gap("aj:11", "___ कपड़े कहाँ हैं ?", "Where[2] are[3] my[0] clothes[1]?", "मेरे", [["मेरा","मेरा is singular, but कपड़े is plural."], ["मेरी","मेरी is feminine, but कपड़े is masculine."]], "Here कपड़े is the subject, in the direct plural, and मेरे agrees with it.")
];

const pron = [
  gap("pr:0", "___ कमरे में कौन है ?", "Who[3] is[4] in[2] this[0] room[1]?", "इस", [["यह","यह is the direct form. Before a noun followed by a postposition it becomes इस."], ["इन","इन is the oblique plural, but कमरे here is one room."]], "यह becomes इस in the oblique singular."),
  gap("pr:1", "___ गाड़ियों में कितने लोग हैं ?", "{How many}[3] people[4] are[5] in[2] those[0] cars[1]?", "उन", [["वे","वे is the direct form. Before an oblique noun it becomes उन."], ["उस","उस is singular, but गाड़ियों is plural."]], "वे becomes उन in the oblique."),
  gap("pr:2", "तुम्हारी किताब ___ कमरे में है ?", "Which[2] room[3] is[5] your[0] book[1] in[4]?", "किस", [["कौन","कौन is the direct form. Before a noun and a postposition it becomes किस."], ["किन","किन is plural, but the question asks about one room."]], "कौन and क्या both become किस in the oblique singular."),
  gap("pr:3", "___ से", "from[1] me[0]", "मुझ", [["मैं","मैं is the direct form, only for the subject. Before a postposition it becomes मुझ."], ["मेरा","मेरा means “my”. After a postposition you need the pronoun itself, मुझ."]], "मैं becomes मुझ before a postposition."),
  gap("pr:4", "___ में क्या है ?", "What[2] is[3] in[1] that[0]?", "उस", [["वह","वह is the direct form. Before में it becomes उस."], ["उन","उन is the oblique plural, “in those”."]], "वह becomes उस in the oblique singular."),
  gap("pr:5", "___ कमरों में पंखे हैं ?", "Which[0] rooms[1] {are there}[4] fans[3] in[2]?", "किन", [["किस","किस is singular, but कमरों is plural."], ["कौन","कौन is the direct form."]], "कौन and क्या become किन in the oblique plural."),
  gap("pr:6", "___ अलमारियों में किताबें हैं ।", "There are[4] books[3] in[2] these[0] cupboards[1].", "इन", [["ये","ये is the direct form. Before an oblique noun it becomes इन."], ["इस","इस is singular, but अलमारियों is plural."]], "ये becomes इन in the oblique."),
  gap("pr:8", "तुम ___ से नाराज़ हो ?", "Who[1] are[4] you[0] angry[3] with[2]?", "किस", [["कौन","कौन is the direct form. Before से it becomes किस."], ["क्या","क्या is a direct form, and it asks about things, not people."]], "कौन becomes किस before a postposition."),
  gap("pr:9", "क्या आप ___ से नाराज़ हैं ?", "Are[5] you[1] angry[4] with[3] me[2]?", "मुझ", [["मैं","मैं is only for the subject. Before से it becomes मुझ."], ["मेरे","मेरे means “my”. After से you need the pronoun itself, मुझ."]], "मैं becomes मुझ before a postposition."),
  gap("pr:10", "संगीता ___ से नाराज़ है ।", "Sangeeta[0] is[4] angry[3] with[2] them[1].", "उन", [["वे","वे is the direct form, only for the subject. Before से it becomes उन."], ["उस","उस is singular, “him” or “her”."]], "वे becomes उन before a postposition.")
];

const build = [
  tiles("tl:0", "There are[3] clothes[2] in[1] the cupboard[0].", ["अलमारी","में","कपड़े","हैं"], [["पर","पर means “on”. Inside a cupboard is में."], ["है","है is singular, but कपड़े is plural."]], {order: "For “there is/are …”, the place comes first and the thing after it: अलमारी में कपड़े हैं."}),
  tiles("tl:1", "The clothes[0] are[3] in[2] the cupboard[1].", ["कपड़े","अलमारी","में","हैं"], [["अलमारियों","अलमारियों is the oblique plural, “cupboards”. There is one cupboard."], ["कपड़ा","कपड़ा is singular, but the English says clothes."]], {order: "To say where known things are (“the clothes”), they come first and the place follows. Place-first would mean “there are clothes…”."}),
  tiles("tl:2", "Where[2] is[3] your[0] room[1]?", ["तुम्हारा","कमरा","कहाँ","है"], [["तुम्हारे","Here कमरा is the subject, so it is direct singular and so is its possessive: तुम्हारा."], ["हो","हो goes with the subject तुम. The subject here is कमरा."]]),
  tiles("tl:3", "There are[5] four[3] chairs[4] in[2] this[0] room[1].", ["इस","कमरे","में","चार","कुरसियाँ","हैं"], [["यह","यह is the direct form. Before a noun with a postposition it becomes इस."], ["कमरा","कमरा is direct. Before में it is oblique: कमरे."]]),
  tiles("tl:4", "Kamala[0] is[4] in[3] the small[1] kitchen[2].", ["कमला","छोटे","रसोईघर","में","है"], [["छोटा","An -ā adjective before an oblique noun takes -e."], ["हैं","हैं is plural or honorific. Kamala spoken of plainly takes है."]]),
  tiles("tl:5", "My[0] wife[1] is[4] from[3] London[2].", ["मेरी","पत्नी","लंदन","से","है"], [["मेरा","मेरा is masculine, but पत्नी is feminine."], ["में","में means “in”. “From” is से."]]),
  tiles("tl:6", "What[3] is[4] in[2] those[0] drawers[1]?", ["उन","दराज़ों","में","क्या","है"], [["वे","वे is the direct form. Before an oblique noun it becomes उन."], ["दराज़ें","दराज़ें is the direct plural. Before में the oblique plural is needed."]]),
  tiles("tl:7", "Grandmother[0] is[4] at[3] home[2].", ["दादी","जी","घर","पर","हैं"], [["है","A respected grandmother (दादी जी) takes the honorific plural हैं."], ["से","से means “from”. “At home” is घर पर."]]),
  tiles("tl:8", "There are[5] {lots of}[3] books[4] on[2] the black[0] tables[1].", ["काली","मेज़ों","पर","बहुत-सारी","किताबें","हैं"], [["मेज़ें","मेज़ें is the direct plural. Before पर the oblique plural is needed."], ["बहुत-सारे","बहुत-सारा agrees with किताबें, which is feminine."]]),
  tiles("tl:9", "Is[6] there a bus[5] from[2] here[1] to[4] Delhi[3]?", ["क्या","यहाँ","से","दिल्ली","तक","बस","है"], [["में","में means “in”. “From” is से."], ["पर", PP["पर"] + " “As far as” is तक."]]),
  tiles("tl:10", "Who[3] is[4] in[2] that[0] car[1]?", ["उस","गाड़ी","में","कौन","है"], [["वह","वह is the direct form. Before a noun with a postposition it becomes उस."], ["गाड़ियों","गाड़ियों is the oblique plural, “cars”."]]),
  tiles("tl:11", "Perhaps[0] Father[1] is[5] in[4] the garden[3].", ["शायद","पिता","जी","बग़ीचे","में","हैं"], [["बग़ीचा","बग़ीचा is direct. Before में it is oblique: बग़ीचे."], ["है","A respected father (पिता जी) takes the honorific plural हैं."]], {alt: [["पिता","जी","शायद","बग़ीचे","में","हैं"]]})
];

const mean = [
  meaning("mn:0", "खिड़की पर एक चिड़िया है ।", "There is a bird at the window.", [["The bird is at the window.","That would be चिड़िया खिड़की पर है. With the place first, the sense is “there is …”."], ["There are two birds at the window.","एक means “one”. Two would be दो चिड़ियाँ."]]),
  meaning("mn:1", "चिड़िया खिड़की पर है ।", "The bird is at the window.", [["There is a bird at the window.","That would put the place first: खिड़की पर चिड़िया है."], ["Where is the bird?","There is no कहाँ and no question mark. This is the answer to that question."]]),
  meaning("mn:2", "वे लोग सुबह से यहाँ हैं ।", "Those people have been here since the morning.", [["Those people are here until the morning.","“Until” is तक. से with a time means “since”."], ["Those people are from here.","That would be वे लोग यहाँ से हैं. Here से follows सुबह, “since the morning”."]]),
  meaning("mn:3", "मेरा भाई लंदन में है और मेरी बहिन भारत में ।", "My brother is in London and my sister is in India.", [["My brother is from London and my sister is from India.","“From” would be से. में means “in”."], ["My sister is in London and my brother is in India.","भाई (brother) goes with लंदन, बहिन (sister) with भारत."]]),
  meaning("mn:4", "उस घर में सारा सामान पुराना है ।", "All the furniture in that house is old.", [["All the furniture in those houses is old.","उस is singular. “Those houses” would be उन घरों में."], ["All the furniture in this house is new.","उस means “that”, and पुराना means “old”."]]),
  meaning("mn:5", "आप किस शहर से हैं ?", "Which city are you from?", [["Which city are you in?","“In” would be में. से means “from”."], ["Who are you angry with?","There is no नाराज़ here. किस शहर means “which city”."]]),
  meaning("mn:6", "रात को यह गाँव बहुत सुन्दर है ।", "This village is very beautiful at night.", [["This village is very beautiful until night.","“Until” would be तक. रात को means “at night”."], ["This village is very beautiful in the morning.","“Morning” is सुबह. रात means “night”."]]),
  meaning("mn:7", "ख़ैर, शायद वह आज बीमार है ।", "Well, perhaps he is ill today.", [["Well, he is certainly ill today.","शायद means “perhaps”. “Certainly” is ज़रूर."], ["Well, perhaps he is happy today.","बीमार means “ill”. “Happy” is ख़ुश."]])
];

const usage = [
  mc("us:0", "Which sentence means “There is a newspaper on the chair”?", "कुरसी पर अख़बार है ।", [["अख़बार कुरसी पर है ।","This puts the newspaper first: “The newspaper is on the chair”, the answer to “where is the newspaper?”."], ["कुरसी अख़बार पर है ।","This says the chair is on the newspaper. पर follows the word it relates to."]], "For “there is …”, the place phrase comes first and the thing after it."),
  mc("us:1", "Which question does this sentence answer?", "अख़बार कहाँ है ?", [["कुरसी पर क्या है ?","That is answered with the place first: कुरसी पर अख़बार है."], ["अख़बार कैसा है ?","कैसा asks what something is like. The answer would describe the paper."]], "In an answer, the answer words take the place of the question word: कुरसी पर replaces कहाँ.", {hi: "अख़बार कुरसी पर है ।", audio: true}),
  mc("us:2", "When must a noun be in the oblique case?", "When a postposition follows it", [["When it is the subject of the verb","A verb subject is always in the direct case."], ["Whenever it is plural","Plural subjects are direct too. Only a following postposition makes a noun oblique."]], "Any noun, pronoun or adjective before a postposition is oblique, even when its form does not change."),
  mc("us:3", "Which pronouns keep the same form before a postposition?", "हम, तुम, आप", [["मैं, तू, यह","These change: मुझ, तुझ, इस."], ["वह, वे, कौन","These change: उस, उन, and किस or किन."]], "हम, तुम and आप are the same in the direct and oblique cases."),
  mc("us:4", "किस is the oblique singular of…", "both कौन and क्या", [["only कौन","क्या also becomes किस before a postposition."], ["only यह","यह becomes इस."]], "किस (singular) and किन (plural) are the oblique forms of both कौन and क्या."),
  mc("us:5", "Another correct way to write मुझ से is…", "मुझसे", [["मैं से","मैं is the direct form, only for the subject."], ["मेरा से","मेरा means “my”. After a postposition you need the pronoun itself."]], "A postposition after a pronoun may be written separately or joined to it as one word."),
  mc("us:6", "In मेज़ पर, which case is मेज़ in?", "Oblique, because a postposition follows it", [["Direct, because its form has not changed","Feminine nouns look the same in the oblique singular, but a following postposition always makes a noun oblique."], ["Oblique plural","The oblique plural would be मेज़ों."]], "A noun before a postposition is oblique even when it looks like the direct form."),
  mc("us:7", "Which phrase means “on the white walls”?", "सफ़ेद दीवारों पर", [["सफ़ेद दीवारें पर","दीवारें is the direct plural. Before पर the noun takes -õ."], ["सफ़ेदे दीवारों पर","सफ़ेद does not end in -ā, so it never changes."]], "The noun takes the oblique plural -õ; an adjective not ending in -ā stays the same."),
];

const unit = {
  id: "unit3", n: 3, title: "Rooms in the house", titleHi: "घर में कमरे",
  scope: "Postpositions में, पर, तक, को, से; the oblique case of nouns, adjectives and pronouns; possessives मेरा, तुम्हारा, आपका; “there is” word order and कहाँ",
  pages: "book 26–36",
  skills: {post: "Postpositions", obl: "Oblique nouns", adj: "Oblique adjectives and possessives", pron: "Oblique pronouns", usage: "Rules and word order", meaning: "Reading sentences"},
  vocab: [
    ["तुम्हारा","your (to तुम)","p"],["तबियत","health","n","f"],["घर","house, home","n","m"],["परिवार","family","n","m"],["पति","husband","n","m"],["पत्नी","wife","n","f"],
    ["कई","several","a"],["छह","six","x"],["सारा","all, whole","a"],["सामान","furniture, things","n","m"],["वग़ैरह","and so on, etc.","x"],["अब","now","x"],
    ["फ़र्श","floor","n","m"],["दरी","floor rug","n","f"],["ओ","oh!","x"],["कहाँ","where?","x"],["बाथरूम","bathroom","n","m"],["में","in","x"],["सुबह","morning","n","f"],
    ["से","from, by, with, since","x"],["वहाँ","there","x"],["ख़ैर","well, anyway","x"],["मेरा","my, mine","p"],["आपका","your (to आप)","p"],["चश्मा","glasses","n","m"],
    ["रे","eh, hey","x"],["पर","on","x"],["उस","that (oblique of वह)","p"],["शायद","perhaps","x"],["दराज़","drawer","n","f"],["बहुत-सारा","lots of","a"],["चीज़","thing, object","n","f"],
    ["तक","up to, as far as","x"],["को","to, at","x"],["रात","night","n","f"],["समय","time","n","m"],["बस","bus","n","f"],["आराम","rest, comfort","n","m"],["आराम से","comfortably, easily","x"],
    ["भारत","India","n","m"],["इस","this (oblique of यह)","p"],["इन","these (oblique of ये)","p"],["उन","those (oblique of वे)","p"],["कपड़ा","cloth, garment","n","m"],
    ["क़लम","pen","n","f"],["काला","black","a"],["किस","oblique singular of कौन and क्या","p"],["किन","oblique plural of कौन and क्या","p"],["गाँव","village","n","m"],
    ["चार","four","x"],["तस्वीर","picture","n","f"],["तुझ","oblique of तू","p"],["दस","ten","x"],["दीवार","wall","n","f"],["पर्दा","curtain","n","m"],
    ["मुझ","oblique of मैं","p"],["रसोईघर","kitchen","n","m"],["लंदन","London","n","m"],["शहर","town, city","n","m"],["हिन्दू","Hindu","n","m"],["मूर्ति","image, statue","n","f"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "post", title: "में, पर, तक, को, से", desc: "Pick the postposition that fits", skill: "post", items: post},
    {id: "obl", title: "Nouns before postpositions", desc: "The oblique case, singular and plural", skill: "obl", items: obl},
    {id: "oforms", title: "Oblique forms", desc: "Pick the oblique singular or plural of a noun", skill: "obl", items: oforms},
    {id: "adj", title: "Adjectives and मेरा, तुम्हारा, आपका", desc: "Adjectives and possessives in the oblique", skill: "adj", items: adj},
    {id: "pron", title: "मुझ, इस, उस, किस…", desc: "Pronouns before postpositions", skill: "pron", items: pron},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and word order", desc: "The oblique case and “there is …”", skill: "usage", items: usage}
  ],
  test: {vocab: 4, post: 3, obl: 3, oforms: 2, adj: 3, pron: 2, build: 3, meaning: 1, usage: 1},
  _grammar: [
    {id: "postpositions", title: "Simple postpositions में, पर, तक, को, से follow their noun or pronoun"},
    {id: "oblique-nouns", title: "Oblique case before a postposition: masculine -ā nouns take -e in the singular; all nouns take -õ in the plural (-ī → -iyõ, -ū → -uõ)"},
    {id: "oblique-adj", title: "Adjectives in the oblique: -ā becomes -e (singular and plural); -ī and invariable adjectives do not change"},
    {id: "possessives", title: "मेरा, तुम्हारा, आपका agree like -ā adjectives with the thing possessed"},
    {id: "oblique-pronouns", title: "Oblique pronouns मुझ, तुझ, इस, उस, इन, उन, किस, किन; हम, तुम, आप unchanged; pronoun and postposition may be written as one word"},
    {id: "there-is", title: "“There is …” puts the place first (कुरसी पर अख़बार है); the known thing first answers कहाँ “where?” (अख़बार कुरसी पर है)"},
    {id: "subject-direct", title: "A verb subject is always in the direct case"}
  ]
};

writeUnit(3, unit, {forms, fake});
