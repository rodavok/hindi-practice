"use strict";
// Unit 15 (book pp. 192–205): हिन्दी सीखते जाओ ! Every sentence below is composed for the app; only words and grammar facts come from the book.
const {gap, meaning, mc, tiles, writeUnit} = require("../../tools/author");

const forms = {
  // vocabulary (end list pp. 202–204, Quick Vocab pp. 193, 197, 15.1–15.7 pp. 193–200)
  "अँधेरा":"ãdherā","अगस्त":"agast","अचानक":"acānak","अनौपचारिक":"anaupcārik","रूप":"rūp","असल":"asal","आधीरात":"ādhīrāt","आपस":"āpas",
  "आसानी":"āsānī","इनकार":"inkār","उड़ना":"uṛnā","उदाहरण":"udāharaṇ","उपन्यास":"upanyās","औपचारिक":"aupcārik","काँपना":"kā̃pnā",
  "किनारा":"kinārā","किराया":"kirāyā","बजाय":"bajāy","बिना":"binā","मारे":"māre","सिवा":"sivā","ग़रीब":"garīb","ग़लती":"galtī",
  "गाली":"gālī","गोरा":"gorā","घना":"ghanā","घमंड":"ghamaṇḍ","चपाती":"capātī","चौकीदार":"caukīdār","जंगल":"jaṅgal","जँभाई":"jãbhāī",
  "ज़माना":"zamānā","जीते":"jīte","जीना":"jīnā","जीवन":"jīvan","झेंपना":"jhẽpnā","ट्रेन":"ṭren","डरपोक":"ḍarpok","ड्राइवर":"ḍrāivar",
  "तरक़्क़ी":"taraqqī","थकना":"thaknā","देश":"deś","धोखा":"dhokhā","नल":"nal","नेता":"netā","नौकरी":"naukrī","परवाह":"parvāh","पहिया":"pahiyā",
  "पूँछ":"pū̃ch","पैदल":"paidal","फुसफुसाना":"phusphusānā","बंदर":"bandar","बढ़ना":"baṛhnā","बत्तीसी":"battīsī","बर्फ़":"barf","बादल":"bādal",
  "ब्राह्मण":"brāhmaṇ","भिखारी":"bhikhārī","मशहूर":"maśhūr","यात्री":"yātrī","राजधानी":"rājdhānī","व्यक्तिगत":"vyaktigat","शक्ति":"śakti",
  "शराबी":"śarābī","सच":"sac","समस्या":"samasyā","समुद्र":"samudr","सरकार":"sarkār","सरकारी":"sarkārī","सितार":"sitār","सूरज":"sūraj",
  "स्नान":"snān","स्वयं":"svayam","हालत":"hālat",
  // -सा forms (15.5) and जैसा forms (15.4)
  "छोटा-सा":"choṭā-sā","छोटी-सी":"choṭī-sī","छोटे-से":"choṭe-se","की-सी":"kī-sī","का-सा":"kā-sā","के-से":"ke-se","एक-से":"ek-se",
  "कोई-सी":"koī-sī","कोई-सा":"koī-sā","थकी-सी":"thakī-sī",
  // participles with रहना, जाना and करना (15.1–15.2)
  "खेलते":"khelte","करती":"kartī","रोती":"rotī","रोता":"rotā","चलते":"calte","चलता":"caltā","बढ़ता":"baṛhtā","बोलता":"boltā","सुनते":"sunte",
  "सुना":"sunā","सुनी":"sunī","पढ़ा":"paṛhā","पढ़ी":"paṛhī","बजाया":"bajāyā","आए":"āe","खेला":"khelā","नहाया":"nahāyā",
  "पढ़ती":"paṛhtī","पढ़ता":"paṛhtā","लिखते":"likhte","लिखने":"likhne","करूँगी":"karū̃gī","करूँगा":"karū̃gā","करेगी":"karegī",
  "लगता":"lagtā","रहीं":"rahī̃","रहोगे":"rahoge",
  // forms produced by earlier units' rules
  "अँधेरे":"ãdhere","चश्मे":"caśme","पहाड़ों":"pahāṛõ","बिल्लियों":"billiyõ","दोस्तों":"dostõ","हमसे":"hamse","आपसे":"āpse","आपको":"āpko",
  "छाते":"chāte","समझती":"samajhtī","बजाईं":"bajāī̃","दिखते":"dikhte","देता":"detā","तुम्हारा":"tumhārā",
  "बढ़ते":"baṛhte","डरती":"ḍartī","डरता":"ḍartā","बाँट":"bā̃ṭ","कमरे":"kamre","बच्चे":"bacce","हफ़्ते":"hafte","करते":"karte",
  "डरो":"ḍaro","छूटता":"chūṭtā","थोड़ी":"thoṛī","इतने":"itne","पूछा":"pūchā","रो":"ro","कहीं":"kahī̃","ऐसे":"aise","पहन":"pahan","लड़ते":"laṛte","डरा":"ḍarā","पूछने":"pūchne","लड़ती":"laṛtī","माँगता":"mā̃gtā","गोरा-सा":"gorā-sā","एक-सा":"ek-sā"
};
// Deliberately invalid forms (Hard level pads tile items with these): all non-words.
const fake = {
  "पढ़या":"paṛhyā","खेलया":"khelyā","सुनया":"sunyā","डरया":"ḍaryā","उसों":"usõ","आपसों":"āpsõ","बजायों":"bajāyõ","बिनों":"binõ",
  "छोटी-सा":"choṭī-sā","छोटा-सी":"choṭā-sī"
};

const KEEP = "Imperfective participle + रहना “to keep on doing”: the participle agrees with the subject (वह काम करती रही).";
const GOON = "Imperfective participle + जाना also means “to go on doing”, but suggests progress towards some culmination (किराया बढ़ता गया).";
const HAB = "Perfective participle + करना “to do habitually”. The participle is invariable in -ā (देखा करती है), and only करना agrees. With जाना the participle is जाया.";
const SE = "से has many uses: “from”, “by”, “with”, “than”, “because of”, and with a noun it forms an adverb (मुश्किल से “with difficulty”, आसानी से “easily”).";
const SEV = "Several verbs take से for the person or thing involved: इनकार करना, कहना, डरना, नफ़रत करना, नाराज़ होना, पूछना, प्यार करना, बातें करना, मिलना, माँगना, लड़ना, शादी करना, शिकायत करना.";
const SINCE = "से also means “since, for”. For a situation that still goes on, Hindi uses a present-tense verb (हम सोमवार से यहाँ हैं).";
const JAISA = "जैसा “like” agrees like an adjective with the noun it describes, and puts the word before it into the oblique (मुझ जैसा) or follows a possessive (मेरे जैसा).";
const SA = "-sā (-sī, -se) after an adjective moderates it (“-ish”) or stresses it (छोटी-सी “tiny”). It agrees, and takes the oblique when needed.";
const REFL = "ख़ुद “myself, yourself, himself …” (more formal आप, स्वयं) depends on the subject. As an object, “oneself” is अपने को or अपने आप को. अपने आप is also “of one's own accord”, आपस में “among themselves”.";
const INV = "Some compound postpositions can be inverted: के बिना / बिना … के, के बजाय / बजाय … के, के मारे / मारे … के, के सिवा / सिवा … के.";

const keep = [
  gap("kp:0", "बारिश में भी बच्चे बाहर खेलते ___ ।", "The children[3] {went on}[6] playing[5] outside[4] even[2] in the rain[0+1].", "रहे", [["रहा","रहा is singular. बच्चे is plural: खेलते रहे."], ["रहीं","रहीं is feminine. बच्चे is masculine."]], KEEP),
  gap("kp:1", "मैं उसे बार बार फ़ोन करती ___, पर उसने जवाब नहीं दिया ।", "I[0] {kept on}[6] phoning[4+5] him[1] {again and again}[2+3], but[7] he[8] {didn't}[10] answer[9+11]. (a woman speaking)", "रही", [["रहा","रहा is masculine. The speaker is a woman: करती रही."], ["रहे","रहे is plural. मैं is singular."]], KEEP),
  gap("kp:2", "सीता सारी रात ___ रही ।", "Sita[0] {kept on}[4] crying[3] all[1] night[2].", "रोती", [["रोता","रोता is masculine. The participle agrees with सीता — रोती."], ["रोना","रहना “keep on” follows the imperfective participle, not the infinitive."]], KEEP),
  gap("kp:3", "डरो मत, ___ रहो !", "{Don't be afraid}[0+1], keep[3] going[2]!", "चलते", [["चलता","The participle agrees with the subject, तुम (masculine plural): चलते रहो."], ["चलना","रहना “keep on” follows the imperfective participle, not the infinitive."]], KEEP),
  gap("kp:4", "नदी का पानी बढ़ता ___ ।", "The water[2] in the river[0+1] {went on}[4] rising[3].", "गया", [["गई","गई is feminine. पानी is masculine."], ["गए","गए is plural. पानी is singular."]], GOON),
  meaning("kp:5", "वह चुप रहा और काम करता रहा ।", "He said nothing and went on working.", [["He said nothing and stopped working.","करता रहा is “kept on working”."], ["He kept quiet so that he could work.","There is no purpose here: करता रहा is “went on working”."]], KEEP),
  gap("kp:6", "लड़कियाँ आपस में बातें करती ___ ।", "The girls[0] {went on}[5] chatting[3+4] among themselves[1+2].", "रहीं", [["रही","रही is singular. लड़कियाँ is plural, and the nasal goes on the last word: करती रहीं."], ["रहे","रहे is masculine. लड़कियाँ is feminine."]], KEEP),
  gap("kp:7", "पैसे ख़त्म हो गए, फिर भी वह ख़रीदारी करता ___ ।", "The money[0] {ran out}[1+2+3], but[4+5] he[6] still {went on}[9] shopping[7+8].", "रहा", [["रहे","रहे is plural. वह here is one man, as करता shows."], ["रही","रही is feminine. करता shows the subject is a man."]], KEEP),
  mc("kp:8", "Which means “to keep on writing”?", "लिखते रहना", [["लिखा करना","Perfective participle + करना is “to write habitually”."], ["लिखने लगना","Oblique infinitive + लगना is “to begin to write”."]], KEEP),
  gap("kp:9", "हम आगे बढ़ते ___ और गाँव पीछे छूटता गया ।", "We[0] {went on}[3] moving[2] forward[1], and[4] the village[5] {fell further and further}[7+8] behind[6].", "गए", [["गया","गया is singular. हम is plural: बढ़ते गए."], ["जाते","जाते alone is not a finite verb. The past here is बढ़ते गए."]], GOON)
];

const habit = [
  gap("hb:0", "दादा जी रोज़ शाम को रेडियो ___ करते थे ।", "Grandfather[0+1] {used to}[7+8] listen[6] to the radio[5] every[2] evening[3+4].", "सुना", [["सुनते","The habitual uses the perfective participle: सुना करते थे."], ["सुनी","The participle in this construction is invariable in -ā: सुना."], ["सुनया","Not a word. सुनना has a consonant stem: its perfective participle is सुना, with no -y-."]], HAB),
  gap("hb:1", "सीता हर रात अपनी माँ को फ़ोन ___ करती है ।", "Sita[0] {makes a habit of}[7+8+9] phoning[6] her[3] mother[4+5] every[1] night[2].", "किया", [["की","The participle is invariable in -ā — फ़ोन किया करती है. Only करना agrees with सीता."], ["करती","The habitual uses the perfective participle — किया करती है."]], HAB),
  gap("hb:2", "बचपन में मैं गर्मियों में मसूरी ___ करता था ।", "{As a child}[0+1] I[2] {used to}[7+8] go[6] to Mussoorie[5] in the hot season[3+4]. (a man speaking)", "जाया", [["गया","With करना the participle of जाना is जाया, not गया."], ["जाता","The habitual uses the perfective participle. For जाना that is जाया."]], HAB),
  gap("hb:3", "पहले यहाँ एक बड़ा बाज़ार ___ करता था ।", "There {used to be}[5+6+7] a[2] big[3] market[4] here[1] (lit. “formerly[0] …”).", "हुआ", [["होता","The habitual uses the perfective participle: हुआ करता था."], ["हुई","The participle is invariable in -ā: हुआ."]], HAB),
  gap("hb:4", "रोज़ थोड़ी हिन्दी ___ करो ।", "{Make a habit of}[4] reading[3] a little[1] Hindi[2] {every day}[0].", "पढ़ा", [["पढ़ी","The participle is invariable in -ā: पढ़ा करो, even though हिन्दी is feminine."], ["पढ़ते","The habitual uses the perfective participle, पढ़ा."], ["पढ़या","Not a word. पढ़ना has a consonant stem: its perfective participle is पढ़ा, with no -y-."]], HAB),
  gap("hb:5", "मेरी बहिन रोज़ दो घंटे सितार बजाया ___ है ।", "My[0] sister[1] plays[6+7+8] the sitar[5] for two[3] hours[4] {every day}[2].", "करती", [["करता","करता is masculine. करना agrees with बहिन."], ["करते","करते is plural. बहिन is one person."]], HAB),
  mc("hb:6", "Rewrite with the habitual (perfective participle + करना)", "राज हर साल दिल्ली आया करता है ।", [["राज हर साल दिल्ली आता करता है ।","The habitual uses the perfective participle, आया, not आता."], ["राज हर साल दिल्ली आए करता है ।","The participle is invariable in -ā: आया करता है."]], HAB, {hi: "राज हर साल दिल्ली आता है ।", audio: true, say: "राज हर साल दिल्ली आया करता है ।", en: "Raj[0] comes[4+5+6] to Delhi[3] every[1] year[2]."}),
  meaning("hb:7", "वह हमेशा देर से आया करता है ।", "He's always coming late.", [["He came late once.","आया करता है is habitual: he does it regularly."], ["He will come late.","करता है is present habitual, not future."]], HAB),
  gap("hb:8", "शादी के बाद भी मैं यहाँ आया ___ ।", "{Even after}[1+2+3] the wedding[0], I[4] {will keep coming}[6+7] here[5]. (a woman speaking)", "करूँगी", [["करूँगा","करूँगा is masculine. The speaker is a woman."], ["करेगी","करेगी goes with वह. मैं takes करूँगी."]], HAB),
  mc("hb:9", "Which means “I used to work here”?", "मैं यहाँ काम किया करता था ।", [["मैं यहाँ काम करता रहा ।","करता रहा is “I went on working here”."], ["मैं यहाँ काम करने लगा ।","करने लगा is “I began to work here”."]], HAB, {say: "मैं यहाँ काम किया करता था ।", en: "I[0] {used to}[4+5] work[2+3] here[1]. (a man speaking)"}),
  gap("hb:10", "पहले गाँव के लोग इस तालाब में नहाया ___ थे ।", "The village[1+2] people[3] {used to}[8+9] bathe[7] in[6] this[4] pond[5] (lit. “formerly[0] …”).", "करते", [["करता","करता is singular. लोग is plural."], ["करती","करती is feminine. लोग is masculine."]], HAB)
];

const se = [
  gap("se:0", "इतने सारे सामान के साथ हम ___ से स्टेशन पहुँचे ।", "With[3+4] so[0] much[1] luggage[2], we[5] reached[9] the station[8] {with difficulty}[6+7].", "मुश्किल", [["आसानी","आसानी से is “easily”."], ["आराम","आराम से is “comfortably”."]], SE),
  gap("se:1", "यह सवाल बहुत आसान है, तुम इसे ___ से कर सकते हो ।", "This[0] question[1] is[4] very[2] easy[3], you[5] can[10+11] do[9] it[6] easily[7+8].", "आसानी", [["मुश्किल","मुश्किल से is “with difficulty”."], ["देर","देर से is “late”."]], SE),
  gap("se:2", "सीता ने मोहन ___ शादी की ।", "Sita[0+1] married[3+4+5] Mohan[2].", "से", [["को","शादी करना takes से — X से शादी करना."], ["का","का would make शादी “Mohan's wedding”. The person married takes से."]], SEV),
  gap("se:3", "मेरी बहिन अँधेरे ___ डरती है ।", "My[0] sister[1] {is afraid}[4+5] of the dark[2+3].", "से", [["को","डरना takes से — अँधेरे से डरती है."], ["का","डरना takes से, not a possessive."]], SEV),
  gap("se:4", "पिता जी ___ नाराज़ हैं ।", "Father[0+1] is[4] cross[3] with us[2].", "हमसे", [["हमें","हमें is the को form. नाराज़ होना takes से — हमसे."], ["हमारे","नाराज़ होना takes से — हमसे."]], SEV),
  gap("se:5", "उसने पैसे लेने ___ इनकार कर दिया ।", "He[0] refused[3+4+5+6] to take[2] the money[1].", "से", [["को","इनकार करना takes से, with the oblique infinitive: लेने से."], ["में","इनकार करना takes से."]], SEV),
  meaning("se:6", "मैं दो हफ़्ते से बीमार हूँ ।", "I've been ill for two weeks.", [["I was ill for two weeks.","That would be था. हूँ with से means it is still going on."], ["I'll be ill for two weeks.","हूँ is present: the illness started two weeks ago and continues."]], SINCE),
  meaning("se:7", "उसने मुझसे मेरा पता पूछा ।", "He asked me my address.", [["I asked him his address.","उसने is the asker. मुझसे is the person asked."], ["He told me his address.","पूछना is “to ask”. “Told” would be बताया."]], SEV),
  mc("se:8", "Which postposition goes with नफ़रत करना “to hate”?", "से", [["को","नफ़रत करना takes से — वह मुझसे नफ़रत करता है."], ["पर","नफ़रत करना takes से."]], SEV),
  gap("se:9", "बच्चों ने ___ से तालियाँ बजाईं ।", "The children[0+1] clapped[4+5] happily[2+3].", "ख़ुशी", [["देर","देर से is “late”."], ["मुश्किल","मुश्किल से is “with difficulty”."]], SE),
  gap("se:10", "मैं आपसे ___ रूप से मिलना चाहता हूँ ।", "I[0] {would like}[6+7] to meet[5] you[1] personally[2+3+4]. (a man speaking)", "व्यक्तिगत", [["औपचारिक","औपचारिक रूप से is “formally”."], ["अनौपचारिक","अनौपचारिक रूप से is “informally”."]], "A more formal style of adverb uses रूप “form” + से — औपचारिक रूप से, व्यक्तिगत रूप से."),
  meaning("se:11", "बच्चा भूख से रो रहा है ।", "The child is crying with hunger.", [["The child has been crying since he got hungry.","से here means “because of, with”, not “since”."], ["The child is crying more than usual.","There is no comparison: से here means “because of”."]], SE)
];

const like = [
  gap("js:0", "राज ___ लड़के बहुत कम हैं ।", "There are[5] very[3] few[4] boys[2] like[1] Raj[0].", "जैसे", [["जैसा","जैसा agrees like an adjective with लड़के, masculine plural: जैसे."], ["जैसी","जैसी is feminine. लड़के is masculine."]], JAISA),
  gap("js:1", "तुम ___ जैसी होशियार नहीं हो ।", "You[0] {aren't}[4+5] as clever[3] as[2] her[1]. (to a girl)", "उस", [["वह","जैसा puts the word before it into the oblique: उस जैसी."], ["उसे","उसे is the को form. Before जैसा the oblique is उस."], ["उसों","Not a word. Before जैसा the oblique of वह is उस."]], JAISA),
  gap("js:2", "मुझे तुम्हारे ___ दोस्त कहीं नहीं मिलेगा ।", "I[0] {won't find}[5+6] a friend[3] like[2] you[1] anywhere[4].", "जैसा", [["जैसे","जैसे is plural or oblique. दोस्त is the singular subject of मिलेगा — जैसा."], ["जैसी","जैसी is feminine. दोस्त is masculine."]], JAISA),
  gap("js:3", "वह ऐसे बोल रहा था ___ कि सब कुछ जानता हो ।", "He[0] {was talking}[2+3+4] as though[5+6] he knew[9+10] everything[7+8] (lit. “thus[1] …”).", "जैसे", [["कैसे","कैसे is the question word “how?”."], ["जैसा","जैसा कि is “as” (as I said). “As though” is जैसे कि, with the subjunctive."]], "जैसे (कि) means “as, just as”, and with a subjunctive verb “as though”."),
  gap("js:4", "गाँव में हमारा एक ___ घर है ।", "We[2] have[6] a[3] little[4] house[5] in the village[0+1].", "छोटा-सा", [["छोटी-सी","छोटी-सी is feminine. घर is masculine."], ["छोटे-से","छोटे-से is plural or oblique. घर is a direct singular subject here."], ["छोटी-सा","Not a word. Both parts agree: छोटा-सा, छोटी-सी, छोटे-से."]], SA),
  gap("js:5", "उस ___ कमरे में पाँच लोग रहते हैं ।", "Five[4] people[5] live[6+7] in[3] that[0] tiny[1] room[2].", "छोटे-से", [["छोटा-सा","Before में the phrase is oblique: उस छोटे-से कमरे में."], ["छोटी-सी","छोटी-सी is feminine. कमरा is masculine."]], SA),
  gap("js:6", "उसकी आवाज़ बच्चे ___ है ।", "His[0] voice[1] is[4] like a child's[2+3].", "की-सी", [["का-सा","का-सा is masculine. It agrees with आवाज़, feminine."], ["के-से","के-से is plural or oblique. आवाज़ is feminine singular."]], "-sā can follow a noun + possessive: नेता का-सा घमंड “arrogance like a politician's”. "+SA),
  meaning("js:7", "दोनों भाई एक-से दिखते हैं ।", "The two brothers look alike.", [["Only one of the two brothers can be seen.","एक-से is “alike, similar”, not “one”."], ["The two brothers are always together.","एक-से दिखते हैं is “look alike”."]], "एक-सा means “similar”."),
  mc("js:8", "Which means “Put on any sari (you like)”?", "कोई-सी साड़ी पहन लो ।", [["कौनसी साड़ी पहन लो ।","कौनसी is the question “which?”."], ["कोई-सा साड़ी पहन लो ।","कोई-सा agrees with साड़ी, feminine: कोई-सी."]], "कोई-सा means “any one (out of a range)”.", {say: "कोई-सी साड़ी पहन लो ।", en: "{Put on}[2+3] any[0] sari[1]."}),
  meaning("js:9", "सीता आज कुछ थकी-सी लग रही थी ।", "Sita was looking a bit tired today.", [["Sita was very tired today.","-sī moderates: “a bit tired, tired-ish”."], ["Sita was tired of waiting today.","Nothing about waiting: थकी-सी is “somewhat tired”."]], SA)
];

const refl = [
  gap("rf:0", "यह सारा खाना माँ ने ___ बनाया है ।", "Mother[3+4] {has made}[6+7] all[1] this[0] food[2] herself[5].", "ख़ुद", [["अपना","अपना is “one's own”. “Herself” is ख़ुद."], ["अपने को","अपने को is the object “herself”. Here she is the doer: ख़ुद."]], REFL),
  gap("rf:1", "गृह मंत्री जी ने यह चिट्ठी ___ लिखी है ।", "The Home[0] Minister[1+2+3] {has written}[7+8] this[4] letter[5] himself[6].", "स्वयं", [["अपने","अपने is the possessive “own”. “Himself” is स्वयं."], ["आपस","आपस में is “among themselves”."]], REFL),
  gap("rf:2", "सीता ___ बहुत सुन्दर समझती है ।", "Sita[0] thinks[5+6] herself[1+2] very[3] beautiful[4] (lit. “considers herself …”).", "अपने को", [["ख़ुद","ख़ुद is “herself” as the doer. As the object, “herself” is अपने को."], ["अपना","अपना is the possessive “one's own”. The object “herself” is अपने को."]], REFL),
  gap("rf:3", "यह समस्या ___ ठीक हो जाएगी ।", "This[0] problem[1] {will sort itself out}[4+5+6] (lit. “… {of its own accord}[2+3] …”).", "अपने आप", [["आपस में","आपस में is “among themselves”."], ["अपना","अपना is “one's own”. “Of its own accord” is अपने आप."]], REFL),
  gap("rf:4", "दोनों भाई ___ में लड़ते रहते हैं ।", "The two[0] brothers[1] {keep on}[5+6] fighting[4] among themselves[2+3].", "आपस", [["अपने","“Among themselves” is आपस में."], ["अपने आप","अपने आप is “of one's own accord”. “Among themselves” is आपस में."], ["आपसों","Not a word. आपस is used only in आपस में."]], REFL),
  gap("rf:5", "बिना चश्मे ___ मैं कुछ नहीं पढ़ सकता ।", "I[3] {can't}[5+7] read[6] anything[4] without[0+2] my glasses[1]. (a man speaking)", "के", [["का","The inverted form keeps के — बिना चश्मे के."], ["से","बिना … के is “without”."]], INV),
  gap("rf:6", "ख़ुशी के ___ वह रोने लगी ।", "She[3] began[5] to cry[4] {for joy}[0+1+2].", "मारे", [["बिना","के बिना is “without”."], ["बजाय","के बजाय is “instead of”."]], "के मारे “stricken by, because of” is used with a feeling or sensation. "+INV),
  gap("rf:7", "चाय के ___ कॉफ़ी पीजिए ।", "Have[4] coffee[3] {instead of}[1+2] tea[0].", "बजाय", [["सिवा","के सिवा is “apart from”."], ["मारे","के मारे is “stricken by”."], ["बजायों","Not a word. बजाय never changes."]], INV),
  meaning("rf:8", "आपके सिवा यहाँ कोई हिन्दी नहीं जानता ।", "Apart from you, nobody here knows Hindi.", [["Nobody here knows Hindi as well as you.","के सिवा is “apart from”, not a comparison."], ["Without you nobody here would learn Hindi.","के सिवा is “apart from, except”."]], INV)
];

const build = [
  tiles("tl:0", "Sita[0] {kept on}[4] reading[3] {till late}[1+2].", ["सीता","देर","तक","पढ़ती","रही"], [["पढ़ता","पढ़ता is masculine. The participle agrees with सीता."], ["रहा","रहा is masculine. सीता takes रही."]], {alt: [["देर","तक","सीता","पढ़ती","रही"]]}),
  tiles("tl:1", "Keep[3] writing[2] letters[1] to me[0].", ["मुझे","चिट्ठी","लिखते","रहना"], [["लिखना","रहना “keep on” follows the imperfective participle: लिखते रहना."], ["लिखने","The oblique infinitive goes with लगना or देना. “Keep on” takes the imperfective participle: लिखते."]]),
  tiles("tl:2", "We[0] {used to}[5+6] play[4] in[3] this[1] garden[2].", ["हम","इस","बग़ीचे","में","खेला","करते","थे"], [["खेलना","The habitual uses the perfective participle, खेला."], ["खेलया","Not a word. खेलना has a consonant stem: its perfective participle is खेला, with no -y-."]], {alt: [["इस","बग़ीचे","में","हम","खेला","करते","थे"]]}),
  tiles("tl:3", "Grandma[0] {used to}[7+8] come[6] to see[5] us[4] every[1] Friday[2+3].", ["दादी","हर","शुक्रवार","को","हमसे","मिलने","आया","करती","थीं"], [["आई","The participle is invariable in -ā — आया करती थीं."], ["करता","करता is masculine. करना agrees with दादी — करती थीं."]], {alt: [["हर","शुक्रवार","को","दादी","हमसे","मिलने","आया","करती","थीं"]]}),
  tiles("tl:4", "She[0] {is afraid}[3+4] of cats[1+2].", ["वह","बिल्लियों","से","डरती","है"], [["को","डरना takes से — बिल्लियों से."], ["डरता","डरता is masculine. The cue says “she”."], ["डरया","Not a word. डरना has a consonant stem, so its perfective is डरा. Here the present डरती है is needed anyway."]], {alt: [["बिल्लियों","से","वह","डरती","है"]]}),
  tiles("tl:5", "I[0] want[4+5] to ask[3] you[1] something[2]. (a man speaking)", ["मैं","आपसे","कुछ","पूछना","चाहता","हूँ"], [["आपको","पूछना takes से — आपसे."], ["पूछने","चाहना takes the direct infinitive: पूछना चाहता हूँ."]], {alt: [["मैं","कुछ","आपसे","पूछना","चाहता","हूँ"]]}),
  tiles("tl:6", "There's[4] nobody[2+3] like[1] you[0].", ["तुम्हारे","जैसा","कोई","नहीं","है"], [["कैसा","कैसा is the question word. “Like” is जैसा."], ["तुम्हारा","Before जैसा the possessive is oblique: तुम्हारे जैसा."]], {alt: [["कोई","तुम्हारे","जैसा","नहीं","है"], ["कोई","तुम्हारे","जैसा","नहीं"], ["तुम्हारे","जैसा","कोई","नहीं"]]}),
  tiles("tl:7", "{Over there}[0] is[4] a[1] little[2] shop[3].", ["वहाँ","एक","छोटी-सी","दुकान","है"], [["छोटा-सा","छोटा-सा is masculine. दुकान is feminine: छोटी-सी."], ["छोटे-से","छोटे-से is plural or oblique. दुकान is a direct singular subject."], ["छोटा-सी","Not a word. Both parts agree: छोटी-सी."]], {alt: [["वहाँ","छोटी-सी","दुकान","है"], ["एक","छोटी-सी","दुकान","वहाँ","है"]]}),
  tiles("tl:8", "Raj[0] {will do}[4] this[1] work[2] himself[3].", ["राज","यह","काम","ख़ुद","करेगा"], [["अपना","अपना is “one's own”. “Himself” is ख़ुद."], ["करेगी","करेगी is feminine. राज is a man."]], {alt: [["यह","काम","राज","ख़ुद","करेगा"], ["राज","ख़ुद","यह","काम","करेगा"]]}),
  tiles("tl:9", "The friends[0+1] shared[5+6] the money[2] among themselves[3+4].", ["दोस्तों","ने","पैसे","आपस","में","बाँट","लिए"], [["अपने","“Among themselves” is आपस में."], ["दोस्त","With ने the noun is oblique: दोस्तों ने."]], {alt: [["दोस्तों","ने","आपस","में","पैसे","बाँट","लिए"]]}),
  tiles("tl:10", "Don't[4] go[5] out[3] without[0+2] an umbrella[1].", ["बिना","छाते","के","बाहर","मत","जाओ"], [["छाता","Before के the noun is oblique: छाते."], ["का","The inverted form keeps के — बिना छाते के."], ["बिनों","Not a word. बिना never changes."]], {alt: [["छाते","के","बिना","बाहर","मत","जाओ"]]}),
  tiles("tl:11", "Sita[0] {has been working}[4+5+6+7] here[3] since[2] March[1].", ["सीता","मार्च","से","यहाँ","काम","कर","रही","है"], [["तक","मार्च तक is “until March”."], ["रहा","रहा is masculine. सीता takes रही."]], {alt: [["सीता","यहाँ","मार्च","से","काम","कर","रही","है"], ["मार्च","से","सीता","यहाँ","काम","कर","रही","है"]]})
];

const mean = [
  meaning("mn:0", "वह बोलता गया और हम सुनते रहे ।", "He went on talking and we kept listening.", [["He spoke and left, and we stayed to listen.","बोलता गया is “went on speaking”, not “spoke and went”."], ["He talked to us while we lived there.","सुनते रहे is “kept on listening”."]]),
  meaning("mn:1", "हमारे गाँव में पहले एक भी स्कूल नहीं हुआ करता था ।", "There didn't use to be a single school in our village.", [["There's no school in our village now.","हुआ करता था is “used to be”: this was in the past."], ["A school is going to be built in our village.","हुआ करता था describes a past state."]]),
  meaning("mn:2", "अचानक बत्ती चली गई और चारों तरफ़ घना अँधेरा हो गया ।", "Suddenly the lights went out and it became pitch dark all around.", [["Suddenly the light came on and it got bright all around.","चली गई is “went (out)”, and अँधेरा is “darkness”."], ["The light slowly went out and it became cold all around.","अचानक is “suddenly”, and घना अँधेरा is “thick darkness”."]]),
  meaning("mn:3", "मुझे उस जैसा मेहनती आदमी आज तक नहीं मिला ।", "I've never come across a man as hardworking as him.", [["I've never met that hardworking man.","जैसा is “like”: a man like him."], ["He has never come across a hardworking man like me.","मुझे is the receiver: it is I who haven't found one."]]),
  meaning("mn:4", "सीता अपने भाई से बहुत लड़ती है ।", "Sita fights with her brother a lot.", [["Sita fights for her brother a lot.","से with लड़ना is “with, against”. “For” would be के लिए."], ["Sita's brother fights with her a lot.","सीता is the subject: she does the fighting."]]),
  meaning("mn:5", "पहाड़ से पूरा शहर दिखाई देता है ।", "The whole town can be seen from the hill.", [["The whole town can see the hill.","शहर is what is visible: दिखाई देना “to be visible”."], ["The hill shows the whole town to visitors.","दिखाई देना is intransitive, “to be visible”, not “to show”."]]),
  meaning("mn:6", "वह मुझसे पैसे माँगता रहता है ।", "He keeps asking me for money.", [["He asked me for money once.","माँगता रहता है is “keeps on asking”."], ["He keeps giving me money.","माँगना is “to ask for”, and the person asked takes से."]])
];

const usage = [
  mc("us:0", "In वह काम करता रहा “he kept on working”, करता is …", "the imperfective participle, agreeing with the subject", [["the perfective participle, always in -ā","That describes the habitual construction."], ["the oblique infinitive","That describes “begin to” and “let”."]], KEEP),
  mc("us:1", "How does करता जाना differ from करता रहना?", "करता जाना suggests a progressive build-up", [["करता जाना is only used of movement","जाना here is not “go” in space: किराया बढ़ता गया “the rent went on rising”."], ["करता रहना is only used in the future","Both work in any tense: वह करती रही, करते रहोगे."]], GOON),
  mc("us:2", "In the habitual (perfective participle + करना), the participle …", "is always masculine singular in -ā", [["agrees with the subject","Only करना agrees. The participle stays in -ā."], ["agrees with the object","The participle stays in -ā, whatever the object."]], HAB),
  mc("us:3", "In the habitual, the participle of जाना is …", "जाया", [["गया","गया is the ordinary perfective. With करना it is जाया, as in the passive."], ["जाता","The habitual uses the perfective participle, not the imperfective."]], HAB),
  mc("us:4", "With से “since, for”, a situation that still goes on takes …", "a present-tense verb", [["a past-tense verb","A past verb would say it is over. हम सोमवार से यहाँ हैं “we've been here since Monday”."], ["a future-tense verb","The present is used for something that started earlier and continues."]], SINCE),
  mc("us:5", "जैसा “like” puts the word before it …", "into the oblique (मुझ जैसा, उस जैसा)", [["into the direct case (मैं जैसा, वह जैसा)","जैसा works like a postposition, so the word before it is oblique."], ["after a possessive only (मेरे जैसा)","Both मुझ जैसा and मेरे जैसा are used."]], JAISA),
  mc("us:6", "What does -sā add to an adjective (छोटा-सा, गोरा-सा)?", "It moderates it (“-ish”) or stresses it (“tiny”)", [["It makes it plural","-sā agrees with the noun, but adds no plural meaning."], ["It makes it a question","Questions use क्या, कौनसा and so on. -sā is “-ish, rather”."]], SA)
];

const unit = {
  id: "unit15", n: 15, title: "Go on learning Hindi!", titleHi: "हिन्दी सीखते जाओ !",
  scope: "Imperfective participle + रहना “to keep on doing” and + जाना “to go on doing” (progressive); perfective participle (invariable -ā) + करना “to do habitually”, including हुआ करना, जाया करना, आया करना; से revisited: “from, by, with, than, because of”, noun + से adverbs (मुश्किल से, आसानी से, ख़ुशी से), रूप से adverbs, verbs that take से, से “since” with a present-tense verb; जैसा “like” with the oblique or a possessive, जैसे (कि) “as, as though”; -सा “-ish, -like”, कोई-सा, एक-सा; inverted postpositions (बिना … के, बजाय … के, मारे … के, सिवा … के); reflexives ख़ुद, आप, स्वयं, अपने को, अपने आप, आपस में",
  pages: "book 192–204",
  skills: {keep: "Keep on, go on", habit: "Habitual किया करना", se: "Uses of से", like: "जैसा and -sā", refl: "Reflexives, postpositions", usage: "Rules and usage", meaning: "Reading sentences"},
  vocab: [
    ["अँधेरा","darkness","n","m"],["अगस्त","August","n","m"],["अचानक","suddenly, unexpectedly","x"],["अनौपचारिक रूप से","informally","x"],["अपने आप","of one's own accord, oneself","x"],
    ["असल में","really, in reality","x"],["आधीरात","midnight","n","f"],["आपस में","between, among themselves","x"],["आसानी से","easily","x"],["इनकार करना","to refuse (to), with से","v"],
    ["उड़ना","to fly","v"],["उदाहरण","example","n","m"],["उपन्यास","novel","n","m"],["औपचारिक रूप से","formally","x"],["कब से","since when?","x"],
    ["काँपना","to shiver, tremble","v"],["किनारा","edge, shore","n","m"],["किराया","rent, fare","n","m"],["के बजाय","instead of","x"],["के बिना","without","x"],
    ["के मारे","stricken by (a sensation), through","x"],["के सिवा","apart from (also सिवाय)","x"],["ग़रीब","poor","a"],["ग़लती","mistake","n","f"],["गाली","abuse, swearing","n","f"],
    ["गाली देना","to abuse, swear at","v"],["गोरा","pale, fair; white person","a"],["घना","dense, thick","a"],["घमंड","pride, arrogance","n","m"],["चपाती","chapati","n","f"],
    ["चौकीदार","watchman","n","m"],["जंगल","jungle, scrub","n","m"],["जँभाई","yawn","n","f"],["जँभाई लेना","to yawn","v"],["ज़माना","period, age, time","n","m"],
    ["जीते रहो","bless you (‘stay living’)","x"],["जीना","to live, be alive","v"],["जीवन","life","n","m"],["जैसा","like, such as","x"],["जैसे कि","as if, as though","x"],
    ["झेंपना","to be embarrassed","v"],["ट्रेन","train","n","f"],["डरपोक","timid","a"],["ड्राइवर","driver","n","m"],["तरक़्क़ी","progress, advancement","n","f"],
    ["थकना","to be tired","v"],["दिखाई देना","to be visible, appear","v"],["देश","country","n","m"],["धोखा","trick, deceit","n","m"],["धोखा देना","to trick, deceive","v"],
    ["नल","pipe, tap","n","m"],["नेता","leader, politician","n","m"],["नौकरी","job, employment, service","n","f"],["परवाह करना","to care","v"],["पहिया","wheel","n","m"],
    ["पूँछ","tail","n","f"],["पैदल","on foot, walking","x"],["फुसफुसाना","to whisper","v"],["बंदर","monkey","n","m"],["बढ़ना","to increase, grow","v"],
    ["बत्तीसी","set of 32, the teeth","n","f"],["बत्तीसी दिखाना","to grin broadly","v"],["बर्फ़","snow, ice","n","f"],["बादल","cloud","n","m"],["ब्राह्मण","Brahmin","n","m"],
    ["भिखारी","beggar","n","m"],["मशहूर","famous","a"],["यात्री","traveller, passenger","n","m"],["राजधानी","the capital","n","f"],["रात भर","all night","x"],
    ["व्यक्तिगत रूप से","personally","x"],["शक्ति","power","n","f"],["शराबी","drunkard","n","m"],["शुरू","beginning","n","m"],["सच","true","a"],
    ["समस्या","problem","n","f"],["समुद्र","sea, ocean","n","m"],["सरकार","government","n","f"],["सरकारी","governmental","a"],["सितार","sitar","n","m"],
    ["सूरज","sun","n","m"],["स्नान करना","to bathe (esp. ritually)","v"],["स्वयं","oneself","p"],["हालत","state, condition","n","f"],["मुश्किल से","with difficulty","x"],
    ["ख़ुशी से","happily","x"]
  ].map(([hi, en, c, g]) => Object.assign({hi, en, c}, g ? {g} : {})),
  gloss: {},
  lessons: [
    {id: "keep", title: "करता रहना, करता जाना", desc: "“Keep on doing”, “go on doing”", skill: "keep", items: keep},
    {id: "habit", title: "किया करना", desc: "Habitual actions: “used to”, “make a habit of”", skill: "habit", items: habit},
    {id: "se", title: "से", desc: "Adverbs with से, verbs that take से, से “since”", skill: "se", items: se},
    {id: "like", title: "जैसा, छोटा-सा", desc: "“Like”, “as though”, “-ish”", skill: "like", items: like},
    {id: "refl", title: "ख़ुद, अपने आप", desc: "Reflexives and inverted postpositions", skill: "refl", items: refl},
    {id: "build", title: "Build sentences", desc: "Tap the words in order", skill: "build", items: build},
    {id: "meaning", title: "What does it mean?", desc: "Read a sentence, pick the translation", skill: "meaning", items: mean},
    {id: "usage", title: "Rules and usage", desc: "Continuous and habitual, से, जैसा, -sā", skill: "usage", items: usage}
  ],
  test: {vocab: 4, keep: 3, habit: 3, se: 3, like: 3, refl: 2, build: 2, meaning: 1, usage: 1},
  _grammar: [
    {id: "rahna-jana-continuative", title: "Imperfective participle + रहना “to keep on doing” (वह काम करती रही; the participle agrees with the subject) and + जाना “to go on doing”, suggesting progress towards a culmination (किराया बढ़ता गया, खाता जा रहा है)"},
    {id: "habitual-karna", title: "Perfective participle + करना “to do habitually”: the participle is invariable in -ā (देखा करती है, गालियाँ दिया करती है), in any tense and in commands (लिखा करना, आया करो); with intransitives हुआ करना, जाया करना, आया करना"},
    {id: "se-revisited", title: "से “from, by, with, than, because of”; noun + से adverbs (मुश्किल से, आसानी से, आराम से, ख़ुशी से, देर से); रूप से adverbs (औपचारिक रूप से, अनौपचारिक रूप से, व्यक्तिगत रूप से); verbs taking से (इनकार करना, कहना, डरना, नफ़रत करना, नाराज़ होना, पूछना, प्यार करना/होना, बातें करना, मिलना, माँगना, लड़ना, शादी करना, शिकायत करना); के साथ for “in company with”; से “since, for” with a present-tense verb for a continuing situation (हम सोमवार से यहाँ हैं)"},
    {id: "jaisa-like", title: "जैसा “like” as a postposition, agreeing adjectivally and taking the oblique (मुझ जैसे लोग) or a possessive (मेरे जैसे, छोटू के जैसे); जैसे (कि) “as, just as”, with a subjunctive “as though”"},
    {id: "sa-suffix", title: "-सा, -सी, -से “-ish, -like” after adjectives (गोरा-सा, छोटी-सी, बहुत-से), after a noun + possessive (बंदर की-सी पूँछ), after verb stems (बैठ-सी गई); oblique when required (घने-से जंगल में); कौनसा, कोई-सा “any one”, एक-सा “similar”"},
    {id: "inverted-postpositions", title: "Inverted compound postpositions: के बिना / बिना … के, के बजाय / बजाय … के, के मारे / मारे … के, के सिवा / सिवा … के"},
    {id: "reflexives", title: "Reflexives ख़ुद “oneself” (formal आप, स्वयं); oblique अपने को, अपने आप को (अपने को बड़ा आदमी समझता है); अपने आप “of one's own accord”; आपस में “between, among themselves”"}
  ]
};

writeUnit(15, unit, {forms, fake});
