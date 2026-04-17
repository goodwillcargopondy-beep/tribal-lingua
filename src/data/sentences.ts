export interface Sentence {
  id: string;
  tribal: string;
  pronunciation: string;
  english: string;
  category: string;
}

export const santhaliSentences: Sentence[] = [
  { id: "ss1", tribal: "ᱡᱚᱦᱟᱨ! ᱟᱹᱰᱤ ᱟᱠᱟ ᱢᱮ?", pronunciation: "Johar! Adi aka me?", english: "Hello! How are you?", category: "greetings" },
  { id: "ss2", tribal: "ᱟᱹᱭᱩᱵ ᱟᱠᱟᱱᱟ, ᱥᱟᱨᱟᱱ", pronunciation: "Ayub akana, saran", english: "I am fine, thank you", category: "greetings" },
  { id: "ss3", tribal: "ᱟᱢ ᱧᱩᱛᱩᱢ ᱪᱮᱫ?", pronunciation: "Am nyutum ched?", english: "What is your name?", category: "greetings" },
  { id: "ss4", tribal: "ᱤᱧ ᱧᱩᱛᱩᱢ... ᱠᱟᱱᱟ", pronunciation: "Inj nyutum... kana", english: "My name is...", category: "greetings" },
  { id: "ss5", tribal: "ᱟᱢ ᱚᱠᱟ ᱠᱷᱚᱱ ᱦᱤᱡᱩᱠ ᱠᱟᱱᱟ?", pronunciation: "Am oka khon hijuk kana?", english: "Where are you from?", category: "conversation" },
  { id: "ss6", tribal: "ᱤᱧ ᱡᱷᱟᱨᱠᱷᱟᱸᱰ ᱨᱮ ᱛᱷᱟᱹᱯᱟᱱᱟ", pronunciation: "Inj Jharkhand re thapana", english: "I live in Jharkhand", category: "conversation" },
  { id: "ss7", tribal: "ᱤᱧ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱟᱹᱰᱤ ᱠᱩᱥᱤ ᱜᱮ", pronunciation: "Inj Santari parhaw kate adi kusi ge", english: "I am very happy to learn Santhali", category: "learning" },
  { id: "ss8", tribal: "ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱮ", pronunciation: "Daka jom me", english: "Please eat food", category: "daily" },
  { id: "ss9", tribal: "ᱟᱹᱰᱤ ᱡᱚᱦᱟᱨ, ᱥᱮᱱ ᱢᱮ", pronunciation: "Adi johar, sen me", english: "Farewell, goodbye", category: "greetings" },
  { id: "ss10", tribal: "ᱱᱚᱣᱟ ᱫᱤᱱ ᱫᱚ ᱟᱹᱭᱩᱵ ᱜᱮ", pronunciation: "Nowa din do ayub ge", english: "Today is a good day", category: "daily" },
  { id: "ss11", tribal: "ᱤᱧ ᱥᱟᱱᱛᱟᱲᱤ ᱨᱚᱲ ᱢᱮᱱᱟᱠ ᱠᱟᱱᱟ", pronunciation: "Inj Santari ror menak kana", english: "I am speaking Santhali", category: "learning" },
  { id: "ss12", tribal: "ᱵᱟᱦᱟ ᱯᱚᱨᱵ ᱨᱮ ᱡᱩᱫᱤ ᱥᱮᱨᱮᱧ ᱠᱟᱱᱟ", pronunciation: "Baha porob re judi serenj kana", english: "We sing songs at Baha festival", category: "culture" },
  { id: "ss13", tribal: "ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱫᱚ ᱟᱢᱟᱠ ᱵᱚᱝᱜᱟ ᱠᱟᱱᱟ", pronunciation: "Marang Buru do amak bonga kana", english: "Marang Buru is our great spirit", category: "culture" },
  { id: "ss14", tribal: "ᱤᱧ ᱯᱟᱲᱦᱟᱣ ᱵᱟᱝ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱱᱟ", pronunciation: "Inj parhaw bang bujhaw lena", english: "I didn't understand the lesson", category: "learning" },
  { id: "ss15", tribal: "ᱫᱟᱹ ᱫᱟᱹᱞᱮᱱᱟ, ᱟᱹᱰᱤ ᱨᱟᱹᱥᱠᱟ", pronunciation: "Da dalena, adi raska", english: "It's raining, so beautiful", category: "daily" },
  { id: "ss16", tribal: "ᱵᱤᱨ ᱨᱮ ᱥᱮᱱᱫᱨᱟ ᱥᱮᱱ ᱞᱮᱱᱟ", pronunciation: "Bir re sendra sen lena", english: "We went hunting in the forest", category: "culture" },
  { id: "ss17", tribal: "ᱡᱟᱦᱮᱨᱛᱷᱟᱱ ᱨᱮ ᱯᱩᱡᱟ ᱠᱟᱱᱟ", pronunciation: "Jaherthan re puja kana", english: "We worship at the sacred grove", category: "culture" },
  { id: "ss18", tribal: "ᱟᱹᱰᱤ ᱡᱩᱫᱤ ᱮᱱᱮᱡ ᱠᱟᱱᱟ", pronunciation: "Adi judi enej kana", english: "We dance together", category: "daily" },
  { id: "ss19", tribal: "ᱤᱧᱟᱜ ᱠᱷᱮᱛ ᱨᱮ ᱫᱷᱟᱱ ᱜᱮ", pronunciation: "Injak khet re dhan ge", english: "There is paddy in my field", category: "daily" },
  { id: "ss20", tribal: "ᱥᱟᱱᱛᱟᱲ ᱯᱟᱲᱜᱟᱱᱟᱭᱤᱛ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱜᱮ", pronunciation: "Santar parganayet adi marang ge", english: "The Santhal council is very important", category: "culture" },
];

export const gondiSentences: Sentence[] = [
  { id: "gs1", tribal: "నమస్కార్! ఏం జరుగుతున్నది?", pronunciation: "Namaskaar! Em jarugutunnadi?", english: "Hello! How are you?", category: "greetings" },
  { id: "gs2", tribal: "నేను బాగున్నా, ధన్యవాద్", pronunciation: "Nenu baagunnaa, dhanyavaad", english: "I am fine, thank you", category: "greetings" },
  { id: "gs3", tribal: "నీ పేరు ఏంటి?", pronunciation: "Nee peru enti?", english: "What is your name?", category: "greetings" },
  { id: "gs4", tribal: "నా పేరు... అని", pronunciation: "Naa peru... ani", english: "My name is...", category: "greetings" },
  { id: "gs5", tribal: "నీవు ఎక్కడ నుండి వచ్చావు?", pronunciation: "Neevu ekkada nundi vacchavu?", english: "Where are you from?", category: "conversation" },
  { id: "gs6", tribal: "నేను మధ్యప్రదేశ్ లో ఉంటాను", pronunciation: "Nenu Madhya Pradesh lo untanu", english: "I live in Madhya Pradesh", category: "conversation" },
  { id: "gs7", tribal: "గోండీ నేర్చుకోవడం చాలా ఆనందంగా ఉంది", pronunciation: "Gondi nerchukovdam chaala anandanga undi", english: "It's joyful to learn Gondi", category: "learning" },
  { id: "gs8", tribal: "అన్నం తినండి", pronunciation: "Annam tinandi", english: "Please eat food", category: "daily" },
  { id: "gs9", tribal: "వెళ్తాను, మళ్ళీ కలుద్దాం", pronunciation: "Veltanu, malli kaluddaam", english: "I'll go, let's meet again", category: "greetings" },
  { id: "gs10", tribal: "ఈ రోజు చాలా మంచి రోజు", pronunciation: "Ee roju chaala manchi roju", english: "Today is a very good day", category: "daily" },
  { id: "gs11", tribal: "నేను గోండీ మాట్లాడుతున్నాను", pronunciation: "Nenu Gondi maatlaadutunnanu", english: "I am speaking Gondi", category: "learning" },
  { id: "gs12", tribal: "దండారి పండుగలో నాట్యం చేస్తాము", pronunciation: "Dandaari pandugalo naatyam chestamu", english: "We dance at the Dandari festival", category: "culture" },
  { id: "gs13", tribal: "లింగో దేవ్ మా పెద్ద దేవుడు", pronunciation: "Lingo Dev maa pedda devudu", english: "Lingo Dev is our great god", category: "culture" },
  { id: "gs14", tribal: "నాకు పాఠం అర్థం కాలేదు", pronunciation: "Naaku paatham artham kaaledu", english: "I didn't understand the lesson", category: "learning" },
  { id: "gs15", tribal: "వాన పడుతోంది, చాలా అందంగా ఉంది", pronunciation: "Vaana paduthondi, chaala andanga undi", english: "It's raining, so beautiful", category: "daily" },
  { id: "gs16", tribal: "అడవిలో వేటకు వెళ్ళాము", pronunciation: "Adavilo vetaku vellamu", english: "We went hunting in the forest", category: "culture" },
  { id: "gs17", tribal: "పెన్ దగ్గర పూజ చేస్తాము", pronunciation: "Pen daggara pooja chestamu", english: "We worship at the sacred place", category: "culture" },
  { id: "gs18", tribal: "అందరూ కలిసి నాట్యం చేస్తాము", pronunciation: "Andaroo kalisi naatyam chestamu", english: "We all dance together", category: "daily" },
  { id: "gs19", tribal: "మా పొలంలో వరి ఉంది", pronunciation: "Maa polamlo vari undi", english: "There is paddy in our field", category: "daily" },
  { id: "gs20", tribal: "గోండ్ సంస్కృతి చాలా గొప్పది", pronunciation: "Gond samskriti chaala goppadi", english: "Gond culture is very great", category: "culture" },
];

export const kurukhSentences: Sentence[] = [
  { id: "ks1", tribal: "नमस्कार! केंज अस?", pronunciation: "Namaskaar! Kenj as?", english: "Hello! How are you?", category: "greetings" },
  { id: "ks2", tribal: "ठीक अस, धन्यवाद", pronunciation: "Theek as, dhanyavaad", english: "I am fine, thank you", category: "greetings" },
  { id: "ks3", tribal: "एंज नाम का अस?", pronunciation: "Enj naam ka as?", english: "What is your name?", category: "greetings" },
  { id: "ks4", tribal: "एंज नाम... अस", pronunciation: "Enj naam... as", english: "My name is...", category: "greetings" },
  { id: "ks5", tribal: "एन ओखा खोन आई?", pronunciation: "En okha khon aai?", english: "Where are you from?", category: "conversation" },
  { id: "ks6", tribal: "एन झारखंड रे थापा", pronunciation: "En Jharkhand re thaapa", english: "I live in Jharkhand", category: "conversation" },
  { id: "ks7", tribal: "कुड़ुख़ सीखना बहुत खुशी की बात", pronunciation: "Kurukh seekhna bahut khushi ki baat", english: "Learning Kurukh brings great joy", category: "learning" },
  { id: "ks8", tribal: "खाना खाओ", pronunciation: "Khaana khaao", english: "Please eat food", category: "daily" },
  { id: "ks9", tribal: "जाई आस, फिर मिलेंगे", pronunciation: "Jaai aas, phir milenge", english: "Goodbye, we'll meet again", category: "greetings" },
  { id: "ks10", tribal: "आज बहुत अच्छा दिन है", pronunciation: "Aaj bahut achcha din hai", english: "Today is a very good day", category: "daily" },
  { id: "ks11", tribal: "एन कुड़ुख़ बोल रहे अस", pronunciation: "En Kurukh bol rahe as", english: "I am speaking Kurukh", category: "learning" },
  { id: "ks12", tribal: "करमा पर्व में नाचना बहुत सुंदर", pronunciation: "Karma parv mein naachna bahut sundar", english: "Dancing at Karma festival is beautiful", category: "culture" },
  { id: "ks13", tribal: "धर्मेश हमारा बड़ा भगवान है", pronunciation: "Dharmesh hamara bada bhagwaan hai", english: "Dharmesh is our great god", category: "culture" },
  { id: "ks14", tribal: "पाठ समझ नहीं आया", pronunciation: "Paath samajh naheen aaya", english: "I didn't understand the lesson", category: "learning" },
  { id: "ks15", tribal: "बारिश हो रहा, बहुत सुंदर", pronunciation: "Baarish ho raha, bahut sundar", english: "It's raining, so beautiful", category: "daily" },
  { id: "ks16", tribal: "जंगल में शिकार पर गए थे", pronunciation: "Jangal mein shikaar par gaye the", english: "We went hunting in the forest", category: "culture" },
  { id: "ks17", tribal: "सरना थान में पूजा करते हैं", pronunciation: "Sarna thaan mein pooja karte hain", english: "We worship at the sacred grove", category: "culture" },
  { id: "ks18", tribal: "सब मिलकर नाचते हैं", pronunciation: "Sab milkar naachte hain", english: "We all dance together", category: "daily" },
  { id: "ks19", tribal: "हमारे खेत में धान है", pronunciation: "Hamare khet mein dhaan hai", english: "There is paddy in our field", category: "daily" },
  { id: "ks20", tribal: "उराँव संस्कृति बहुत महान है", pronunciation: "Oraon sanskriti bahut mahaan hai", english: "Oraon culture is very great", category: "culture" },
];

export const todaSentences: Sentence[] = [
  { id: "ts1", tribal: "வணக்கம்! எப்படி இருக்கீங்க?", pronunciation: "Vanakkam! Eppadi irukkeenga?", english: "Hello! How are you?", category: "greetings" },
  { id: "ts2", tribal: "நான் நல்லா இருக்கேன், நன்றி", pronunciation: "Naan nallaa irukken, nandri", english: "I am fine, thank you", category: "greetings" },
  { id: "ts3", tribal: "உங்க பேரு என்ன?", pronunciation: "Unga peru enna?", english: "What is your name?", category: "greetings" },
  { id: "ts4", tribal: "என் பேரு...", pronunciation: "En peru...", english: "My name is...", category: "greetings" },
  { id: "ts5", tribal: "நீங்க எங்கருந்து வந்தீங்க?", pronunciation: "Neenga engerundhu vandheenga?", english: "Where are you from?", category: "conversation" },
  { id: "ts6", tribal: "நான் நீலகிரியில் இருக்கேன்", pronunciation: "Naan Neelagiriyil irukken", english: "I live in the Nilgiris", category: "conversation" },
  { id: "ts7", tribal: "தோடா மொழி கத்துக்கறேன்", pronunciation: "Toda mozhi katthukkaren", english: "I am learning the Toda language", category: "learning" },
  { id: "ts8", tribal: "சாப்பிடுங்க", pronunciation: "Saappidunga", english: "Please eat", category: "daily" },
  { id: "ts9", tribal: "போய்வரேன்", pronunciation: "Poivaren", english: "Goodbye (I'll go and come)", category: "greetings" },
  { id: "ts10", tribal: "இன்னைக்கு நல்ல நாள்", pronunciation: "Innaikku nalla naal", english: "Today is a good day", category: "daily" },
  { id: "ts11", tribal: "எருமைகள் காட்டில் இருக்கு", pronunciation: "Erumaikal kaattil irukku", english: "The buffaloes are in the forest", category: "daily" },
  { id: "ts12", tribal: "மோட் பண்டிகை மிகவும் புனிதம்", pronunciation: "Modh pandigai migavum punitham", english: "The Modh festival is very sacred", category: "culture" },
  { id: "ts13", tribal: "கோயிலில் பால் காணிக்கை", pronunciation: "Koyilil paal kaanikkai", english: "Milk offering at the dairy temple", category: "culture" },
  { id: "ts14", tribal: "எனக்கு புரியலை", pronunciation: "Enakku puriyalai", english: "I don't understand", category: "learning" },
  { id: "ts15", tribal: "மழை பெய்யுது", pronunciation: "Mazhai peyyudhu", english: "It is raining", category: "daily" },
  { id: "ts16", tribal: "மலையில் ஏறுவோம்", pronunciation: "Malaiyil eruvom", english: "Let's climb the mountain", category: "daily" },
  { id: "ts17", tribal: "நாங்க ஒன்றா பாடுவோம்", pronunciation: "Naanga ondraa paaduvom", english: "We will sing together", category: "culture" },
  { id: "ts18", tribal: "எருமை பாலை குடிங்க", pronunciation: "Erumai paalai kudinga", english: "Drink the buffalo milk", category: "daily" },
  { id: "ts19", tribal: "மண்டு எங்கள் வீடு", pronunciation: "Mund engal veedu", english: "The hamlet is our home", category: "daily" },
  { id: "ts20", tribal: "தோடா கலாச்சாரம் மிக பழமையானது", pronunciation: "Toda kalaachaaram miga pazhamaiyaanadhu", english: "Toda culture is very ancient", category: "culture" },
];
