export interface Story {
  id: string;
  title: string;
  language: string;
  emoji: string;
  excerpt: string;
  tribalText: string[];
  englishText: string[];
  pronunciation: string[];
}

export const stories: Record<string, Story[]> = {
  santhali: [
    {
      id: "s1",
      title: "The First Rain (Baha Bonga)",
      language: "Santhali",
      emoji: "🌧️",
      excerpt: "A tale of how the Santhal people celebrate the first monsoon rains and honor the spirit of nature.",
      tribalText: [
        "ᱟᱹᱫᱤ ᱫᱤᱱ ᱠᱷᱚᱱ ᱥᱟᱱᱛᱟᱲ ᱦᱚᱲ ᱫᱟᱹ ᱵᱚᱝᱜᱟ ᱠᱚ ᱢᱟᱱᱟᱣ ᱠᱮᱫᱮᱭᱟ।",
        "ᱡᱚᱛᱚ ᱵᱷᱮᱜᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱹ ᱡᱟᱦᱟᱸ ᱫᱤᱱ ᱦᱤᱡᱩᱠ ᱮ ᱛᱟᱦᱮᱸᱱᱟ।",
        "ᱢᱤᱫ ᱫᱤᱱ ᱥᱤᱧ ᱵᱚᱝᱜᱟ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱟᱨ ᱫᱟᱹ ᱫᱟᱹᱞᱮᱱᱟ।",
        "ᱦᱚᱲ ᱠᱩᱥᱤ ᱛᱮ ᱮᱱᱮᱡ ᱠᱮᱫᱮᱭᱟ ᱟᱨ ᱥᱮᱨᱮᱧ ᱜᱟᱭᱮᱱᱟ।",
        "ᱱᱚᱣᱟ ᱫᱤᱱ ᱦᱩᱱᱩ ᱥᱟᱱᱛᱟᱲ ᱵᱟᱦᱟ ᱯᱚᱨᱵ ᱢᱟᱱᱟᱣ ᱮᱫᱟ।"
      ],
      englishText: [
        "Since ancient times, the Santhal people have honored the Rain Spirit.",
        "All the villagers would wait eagerly for the day the rains would arrive.",
        "One day, the Sun Spirit grew tired and the rain began to fall.",
        "The people danced with joy and sang songs of gratitude.",
        "To this day, the Santhals celebrate the Baha festival in spring."
      ],
      pronunciation: [
        "Adi din khon Santar hor da bonga ko manaw kedeya.",
        "Joto bhegel lagid da jahan din hijuk e tahena.",
        "Mid din Sing Bonga huyug kana ar da dalena.",
        "Hor kusi te enej kedeya ar serenj gayena.",
        "Nowa din hunu Santar Baha porob manaw eda."
      ]
    },
    {
      id: "s2",
      title: "The Sacred Grove (Jaherthan)",
      language: "Santhali",
      emoji: "🌳",
      excerpt: "The story of how the Jaherthan sacred grove became the spiritual heart of every Santhal village.",
      tribalText: [
        "ᱡᱟᱦᱮᱨᱛᱷᱟᱱ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱠ ᱵᱚᱝᱜᱟ ᱛᱷᱟᱱ ᱠᱟᱱᱟ।",
        "ᱱᱚᱣᱟ ᱛᱷᱟᱱ ᱨᱮ ᱥᱟᱹᱞ ᱫᱟᱨᱮ ᱠᱚ ᱛᱷᱟᱹᱯᱟᱱᱟ ᱜᱮ।",
        "ᱢᱟᱹᱧᱡᱷᱤ ᱦᱟᱲᱟᱢ ᱯᱩᱡᱟ ᱠᱮᱫᱮᱭᱟ ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱛᱟᱹᱭ।",
        "ᱡᱟᱦᱮᱨ ᱮᱨᱟ ᱫᱚ ᱵᱚᱝᱜᱟ ᱠᱚ ᱥᱩᱛᱩᱨ ᱠᱮᱫᱮᱭᱟ।",
        "ᱦᱟᱲᱟᱢ ᱢᱮᱱᱟᱠᱮᱫᱟ ᱡᱟᱦᱮᱨ ᱵᱟᱝ ᱠᱷᱚᱡ ᱨᱮᱠᱟ।"
      ],
      englishText: [
        "The Jaherthan is the sacred grove in every Santhal village.",
        "In this place, Sal trees stand tall as guardians.",
        "The Manjhi (village priest) performs worship to Marang Buru.",
        "The Jaher Era (forest goddess) protects the spirits.",
        "Elders say the Jaher must never be disturbed."
      ],
      pronunciation: [
        "Jaherthan do Santar atu renak bonga than kana.",
        "Nowa than re sal dare ko thapana ge.",
        "Manjhi haram puja kedeya Marang Buru tay.",
        "Jaher Era do bonga ko sutur kedeya.",
        "Haram menakeda Jaher bang khoj reka."
      ]
    },
    {
      id: "s3",
      title: "The Clever Fox and the Drum",
      language: "Santhali",
      emoji: "🦊",
      excerpt: "A folk tale about a clever jackal who finds a drum in the forest and learns that noise without meaning is empty.",
      tribalText: [
        "ᱢᱤᱫ ᱜᱤᱫᱨᱟ ᱵᱤᱨ ᱨᱮ ᱥᱮᱱ ᱞᱮᱱᱟ।",
        "ᱩᱱᱤ ᱢᱤᱫ ᱢᱟᱫᱚᱞ ᱧᱟᱢ ᱠᱮᱫᱮᱭᱟ ᱫᱟᱨᱮ ᱞᱟᱹᱛᱟᱨ ᱨᱮ।",
        "ᱦᱚᱭᱚᱨ ᱫᱟᱨᱮ ᱫᱟᱹ ᱠᱚ ᱢᱟᱫᱚᱞ ᱨᱮ ᱜᱤᱫᱨᱟ ᱱᱟᱣ ᱠᱮᱫᱮᱭᱟ।",
        "ᱜᱤᱫᱨᱟ ᱢᱮᱱᱟᱠᱮᱫᱮᱭᱟ ᱱᱚᱣᱟ ᱨᱮ ᱪᱮᱫ ᱫᱟᱠᱟ ᱛᱟᱦᱮᱸᱱᱟ।",
        "ᱩᱱᱤ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱱᱟ ᱡᱮ ᱨᱚᱲ ᱵᱟᱝ ᱛᱮ ᱠᱚᱨᱟ ᱢᱟᱱᱣᱟ ᱵᱟᱝ ᱜᱮ।"
      ],
      englishText: [
        "A jackal went wandering in the forest one day.",
        "He found a drum lying under a tree.",
        "The wind made the branches hit the drum, making loud sounds.",
        "The jackal thought there must be food inside.",
        "He learned that noise without substance means nothing."
      ],
      pronunciation: [
        "Mid gidra bir re sen lena.",
        "Uni mid madol nyam kedeya dare latar re.",
        "Hoyor dare da ko madol re gidra naw kedeya.",
        "Gidra menakedeya nowa re ched daka tahena.",
        "Uni bujhaw lena je ror bang te kora manwa bang ge."
      ]
    },
    {
      id: "s4",
      title: "The Origin of Sohrai",
      language: "Santhali",
      emoji: "🐄",
      excerpt: "How the great harvest festival Sohrai came to be — a celebration of cattle, harvest, and gratitude.",
      tribalText: [
        "ᱥᱚᱦᱨᱟᱭ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱨᱮᱱᱟᱠ ᱢᱟᱨᱟᱝ ᱯᱚᱨᱵ ᱠᱟᱱᱟ।",
        "ᱱᱚᱣᱟ ᱯᱚᱨᱵ ᱨᱮ ᱜᱟᱭ ᱠᱚ ᱱᱟᱦᱟᱜ ᱮᱫᱟ ᱟᱨ ᱥᱤᱧᱜᱟᱹᱨ ᱮᱫᱟ।",
        "ᱦᱚᱲ ᱮᱨᱚ ᱛᱟᱹᱨᱤᱯ ᱨᱮ ᱵᱚᱝᱜᱟ ᱠᱚ ᱥᱟᱨᱟᱱ ᱮᱫᱟ।",
        "ᱠᱩᱲᱤ ᱠᱚ ᱚᱲᱟᱠ ᱨᱮ ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ ᱮᱫᱟ।",
        "ᱱᱚᱣᱟ ᱯᱚᱨᱵ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱡᱟᱹᱛᱤ ᱛᱟᱹᱭ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱜᱮ।"
      ],
      englishText: [
        "Sohrai is the greatest festival of the Santhal people.",
        "During this festival, cattle are bathed and decorated beautifully.",
        "People thank the spirits during harvest season.",
        "Young women paint beautiful Sohrai art on the walls of houses.",
        "This festival is very important to the Santhal community."
      ],
      pronunciation: [
        "Sohrai do Santar renak marang porob kana.",
        "Nowa porob re gay ko nahag eda ar singgar eda.",
        "Hor ero tarip re bonga ko saran eda.",
        "Kuri ko orak re Sohrai chitar eda.",
        "Nowa porob do Santar jati tay adi marang ge."
      ]
    },
    {
      id: "s5",
      title: "Pilchu Haram and Pilchu Budhi",
      language: "Santhali",
      emoji: "👴",
      excerpt: "The creation story of the first Santhal man and woman, sent by the supreme deity to populate the earth.",
      tribalText: [
        "ᱛᱷᱟᱠᱩᱨ ᱡᱤᱩ ᱫᱚ ᱫᱤᱥᱚᱢ ᱵᱮᱱᱟᱣ ᱠᱮᱫᱮᱭᱟ।",
        "ᱩᱱᱤ ᱯᱤᱞᱪᱩ ᱦᱟᱨᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱫᱷᱤ ᱠᱚ ᱵᱮᱱᱟᱣ ᱠᱮᱫᱮᱭᱟ।",
        "ᱱᱚᱠᱚ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱦᱚᱲ ᱨᱮᱱᱟᱠ ᱟᱹᱫᱤ ᱟᱯᱟ ᱟᱭᱚ ᱠᱟᱱ ᱟᱠᱚᱣᱟ।",
        "ᱱᱚᱠᱚ ᱦᱤᱦᱤᱲᱤ ᱵᱩᱨᱩ ᱨᱮ ᱟᱹᱫᱤ ᱫᱤᱱ ᱛᱷᱟᱯᱟᱱᱟ ᱮᱫᱟ।",
        "ᱱᱚᱣᱟ ᱠᱟᱹᱦᱟᱱᱤ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱡᱟᱹᱛᱤ ᱨᱮᱱᱟᱠ ᱥᱤᱨᱡᱚᱱ ᱠᱟᱹᱦᱟᱱᱤ ᱠᱟᱱᱟ।"
      ],
      englishText: [
        "Thakur Jiu (the Supreme God) created the world.",
        "He created Pilchu Haram and Pilchu Budhi (the first man and woman).",
        "They are considered the first parents of the Santhal people.",
        "They first lived on the Hihiri mountain.",
        "This story is the creation myth of the Santhal people."
      ],
      pronunciation: [
        "Thakur Jiu do disom benaw kedeya.",
        "Uni Pilchu Haram ar Pilchu Budhi ko benaw kedeya.",
        "Noko do Santar hor renak adi apa ayo kan akowa.",
        "Noko Hihiri Buru re adi din thapana eda.",
        "Nowa kahani do Santar jati renak sirjon kahani kana."
      ]
    },
  ],
  gondi: [
    {
      id: "g1",
      title: "Lingo Dev and the Gond People",
      language: "Gondi",
      emoji: "🏔️",
      excerpt: "The legendary origin story of the Gond tribe, guided by their cultural hero Lingo Dev.",
      tribalText: [
        "లింగో దేవ్ గోండ్ ప్రజల మహానాయకుడు.",
        "ఆయన గోండులను ఒక కొండ గుహ నుండి బయటకు తెచ్చాడు.",
        "ఆయన వారికి నాలుగు వంశాలు ఇచ్చాడు.",
        "ఆయన వారికి వ్యవసాయం, నాట్యం, సంగీతం నేర్పించాడు.",
        "ఈ రోజు వరకు గోండ్ ప్రజలు లింగో దేవ్ ను పూజిస్తారు."
      ],
      englishText: [
        "Lingo Dev is the great hero of the Gond people.",
        "He led the Gond people out of a cave in a mountain.",
        "He gave them four clans to organize their society.",
        "He taught them farming, dance, and music.",
        "To this day, the Gond people worship Lingo Dev."
      ],
      pronunciation: [
        "Lingo Dev Gond prajala mahaanayakudu.",
        "Aayana Gondulanu oka konda guha nundi bayataku techchaadu.",
        "Aayana vaariki naalugu vamshalu ichchaadu.",
        "Aayana vaariki vyavasaayam, naatyam, sangeetam nerpinchaadu.",
        "Ee roju varaku Gond prajalu Lingo Dev nu poojistaru."
      ]
    },
    {
      id: "g2",
      title: "The Spirit of the Sal Tree",
      language: "Gondi",
      emoji: "🌳",
      excerpt: "Why the Gond people consider the Sal tree sacred and never cut it near their villages.",
      tribalText: [
        "గోండ్ ప్రజలకు సాల్ చెట్టు చాలా పవిత్రం.",
        "వారు నమ్ముతారు ఈ చెట్టులో దేవతలు నివసిస్తారని.",
        "ఎవరు కూడా ఊరి దగ్గర సాల్ చెట్టు నరకరు.",
        "పూజ సమయంలో సాల్ ఆకులు ఉపయోగిస్తారు.",
        "సాల్ చెట్టు ఉన్నచోట పెన్ (దేవుడు) ఉంటాడని నమ్ముతారు."
      ],
      englishText: [
        "The Sal tree is very sacred to the Gond people.",
        "They believe that gods reside in this tree.",
        "No one ever cuts a Sal tree near the village.",
        "Sal leaves are used during worship ceremonies.",
        "They believe that Pen (God) lives wherever a Sal tree stands."
      ],
      pronunciation: [
        "Gond prajalaku Saal chettu chaala pavitram.",
        "Vaaru nammutaru ee chettulo devatalu nivasistaarani.",
        "Evaru kooda oori daggara Saal chettu narakaru.",
        "Pooja samayamlo Saal aakulu upayogistaru.",
        "Saal chettu unnachota Pen (Devudu) untadani nammutaru."
      ]
    },
    {
      id: "g3",
      title: "The Dandari Dance Legend",
      language: "Gondi",
      emoji: "💃",
      excerpt: "The story behind the famous Dandari dance performed during the harvest festival.",
      tribalText: [
        "దండారి నృత్యం గోండ్ ప్రజల ప్రసిద్ధ నృత్యం.",
        "ఇది పంట సమయంలో చేస్తారు.",
        "యువకులు రంగురంగుల దుస్తులు ధరిస్తారు.",
        "వారు డోలు మరియు బాంసురి వాయిస్తారు.",
        "ఈ నృత్యం ద్వారా వారు భూమికి కృతజ్ఞత చెప్పతారు."
      ],
      englishText: [
        "The Dandari dance is the most famous dance of the Gond people.",
        "It is performed during the harvest season.",
        "Young men wear colorful costumes and feathers.",
        "They play drums and flutes while dancing.",
        "Through this dance, they express gratitude to Mother Earth."
      ],
      pronunciation: [
        "Dandaari nrityam Gond prajala prasiddha nrityam.",
        "Idi panta samayamlo chestaru.",
        "Yuvakulu ranguranguula dustulu dharistaru.",
        "Vaaru Dolu mariyu Baansuri vaayistaru.",
        "Ee nrityam dvaara vaaru bhoomiki krutagnata cheppataru."
      ]
    },
    {
      id: "g4",
      title: "The Nagoba Festival",
      language: "Gondi",
      emoji: "🐍",
      excerpt: "The legend of Nagoba — the snake god worshipped by the Gond people of Telangana.",
      tribalText: [
        "నాగోబా గోండ్ ప్రజల పాము దేవుడు.",
        "కేసలాపూర్ జాతరలో లక్షల మంది వస్తారు.",
        "వారు నాగోబాకు పూజ చేస్తారు రక్షణ కోసం.",
        "ఈ పండుగ నాలుగు రోజులు జరుగుతుంది.",
        "గోండ్ ప్రజలు సాపాలను ఎన్నడూ చంపరు."
      ],
      englishText: [
        "Nagoba is the snake god of the Gond people.",
        "Lakhs of people visit the Keslapur festival.",
        "They worship Nagoba for protection and blessings.",
        "This festival continues for four days.",
        "The Gond people never kill snakes out of reverence."
      ],
      pronunciation: [
        "Naagoba Gond prajala paamu devudu.",
        "Keslapur jaataralo lakshala mandi vastaru.",
        "Vaaru Naagobaku pooja chestaru rakshanaa kosam.",
        "Ee panduga naalugu rojulu jarugutundi.",
        "Gond prajalu saapaalanu ennadoo champaru."
      ]
    },
    {
      id: "g5",
      title: "The Tiger and the Gond Warrior",
      language: "Gondi",
      emoji: "🐅",
      excerpt: "A legendary tale of a brave Gond warrior who saved his village from a man-eating tiger.",
      tribalText: [
        "ఒక ఊరిలో పెద్ద పులి రోజూ వచ్చేది.",
        "అందరూ భయపడ్డారు కానీ ఒక యువకుడు ధైర్యంగా నిలిచాడు.",
        "అతడు విల్లు బాణంతో పులిని ఎదుర్కొన్నాడు.",
        "పెద్ద పోరాటం తర్వాత అతడు పులిని ఓడించాడు.",
        "ఊరు అతడిని వీరుడుగా పూజిస్తూ ఉంది ఈ రోజు వరకు."
      ],
      englishText: [
        "A great tiger used to visit a village every day.",
        "Everyone was afraid, but one young man stood bravely.",
        "He faced the tiger with his bow and arrow.",
        "After a great battle, he defeated the tiger.",
        "The village honors him as a hero to this very day."
      ],
      pronunciation: [
        "Oka oorilo pedda puli rojoo vachchedi.",
        "Andaroo bhayapaddaru kaani oka yuvakudu dhairyamga nilichaadu.",
        "Atadu villu baanamtho pulini edurkonnaadu.",
        "Pedda poraatam tarvaata atadu pulini odinchadu.",
        "Ooru atadini veeruduga poojistoo undi ee roju varaku."
      ]
    },
  ],
  kurukh: [
    {
      id: "k1",
      title: "The Karma Tree Legend",
      language: "Kurukh",
      emoji: "🌳",
      excerpt: "The origin story of the Karma festival — why the Oraon people dance around the Karam tree.",
      tribalText: [
        "करमा पर्व उराँव लोग का सबसे बड़ा त्योहार है।",
        "करम डाली को जंगल से लाकर गाँव में लगाते हैं।",
        "सब लोग मिलकर करम डाली के चारों ओर नाचते हैं।",
        "यह पर्व भाई-बहन के प्रेम का प्रतीक है।",
        "करम राजा की कथा सुनाई जाती है पूरी रात।"
      ],
      englishText: [
        "The Karma festival is the greatest celebration of the Oraon people.",
        "A branch of the Karam tree is brought from the forest and planted in the village.",
        "Everyone gathers and dances around the Karam branch.",
        "This festival symbolizes the bond between brothers and sisters.",
        "The story of the Karam King is narrated throughout the night."
      ],
      pronunciation: [
        "Karma parv Oraon log ka sabse bada tyohaar hai.",
        "Karam daali ko jangal se laakar gaanv mein lagaate hain.",
        "Sab log milkar Karam daali ke chaaron or naachte hain.",
        "Yah parv bhai-bahan ke prem ka prateek hai.",
        "Karam raaja ki katha sunai jaati hai poori raat."
      ]
    },
    {
      id: "k2",
      title: "Dharmesh — The Creator God",
      language: "Kurukh",
      emoji: "🙏",
      excerpt: "The Oraon creation story about Dharmesh, the supreme god who created the world and all living beings.",
      tribalText: [
        "धर्मेश उराँव लोग के सबसे बड़े भगवान हैं।",
        "उन्होंने धरती, आकाश, पानी सब बनाया।",
        "उन्होंने इंसान, जानवर और पेड़-पौधे बनाए।",
        "सरना थान में उनकी पूजा होती है।",
        "धर्मेश की कृपा से फसल अच्छी होती है।"
      ],
      englishText: [
        "Dharmesh is the supreme god of the Oraon people.",
        "He created the earth, sky, and water.",
        "He made humans, animals, and plants.",
        "He is worshipped at the Sarna sacred grove.",
        "By the grace of Dharmesh, the harvest is plentiful."
      ],
      pronunciation: [
        "Dharmesh Oraon log ke sabse bade bhagwaan hain.",
        "Unhone dharti, aakaash, paani sab banaya.",
        "Unhone insaan, jaanvar aur ped-paudhe banaye.",
        "Sarna thaan mein unki pooja hoti hai.",
        "Dharmesh ki kripa se fasal achchi hoti hai."
      ]
    },
    {
      id: "k3",
      title: "The Sarhul Spring Festival",
      language: "Kurukh",
      emoji: "🌸",
      excerpt: "How the Oraon people welcome spring with the beautiful Sarhul festival of flowers and nature worship.",
      tribalText: [
        "सरहुल वसंत ऋतु का त्योहार है।",
        "जब साल के पेड़ पर फूल आते हैं तब सरहुल मनाते हैं।",
        "पाहन (पुजारी) सरना थान में पूजा करते हैं।",
        "औरतें नये कपड़े पहनकर नाचती हैं।",
        "यह प्रकृति को धन्यवाद देने का त्योहार है।"
      ],
      englishText: [
        "Sarhul is the festival of spring.",
        "When the Sal tree blossoms, the Sarhul festival is celebrated.",
        "The Pahan (priest) performs worship at the Sarna sacred grove.",
        "Women wear new clothes and dance joyfully.",
        "This is a festival of giving thanks to nature."
      ],
      pronunciation: [
        "Sarhul vasant ritu ka tyohaar hai.",
        "Jab Saal ke ped par phool aate hain tab Sarhul manaate hain.",
        "Paahan (pujaari) Sarna thaan mein pooja karte hain.",
        "Auraten naye kapde pahankar naachti hain.",
        "Yah prakriti ko dhanyavaad dene ka tyohaar hai."
      ]
    },
    {
      id: "k4",
      title: "The Wise Village Elder",
      language: "Kurukh",
      emoji: "👨‍🦳",
      excerpt: "A tale about a wise Oraon elder who taught his village the importance of unity and sharing.",
      tribalText: [
        "एक गाँव में एक बुजुर्ग महतो रहते थे।",
        "उन्होंने गाँव के लोगों को एकता सिखाई।",
        "एक दिन सूखा पड़ा और सब परेशान हो गए।",
        "महतो ने सबको मिलकर तालाब खोदने को कहा।",
        "सबने मिलकर काम किया और गाँव बच गया।"
      ],
      englishText: [
        "In a village, there lived a wise elder called Mahato.",
        "He taught the village people the importance of unity.",
        "One day, a drought struck and everyone was worried.",
        "The Mahato asked everyone to dig a pond together.",
        "Everyone worked together and the village was saved."
      ],
      pronunciation: [
        "Ek gaanv mein ek buzurg Mahato rahte the.",
        "Unhone gaanv ke logon ko ekta sikhai.",
        "Ek din sookha pada aur sab pareshaan ho gaye.",
        "Mahato ne sabko milkar taalaab khodne ko kaha.",
        "Sabne milkar kaam kiya aur gaanv bach gaya."
      ]
    },
    {
      id: "k5",
      title: "The Sacred Mandar Drum",
      language: "Kurukh",
      emoji: "🥁",
      excerpt: "The legend of how the Mandar drum became the soul of Oraon music and celebrations.",
      tribalText: [
        "मांदर उराँव लोग का पवित्र वाद्य यंत्र है।",
        "कहते हैं धर्मेश ने पहला मांदर बनाया था।",
        "मांदर की आवाज़ सुनकर देवता खुश होते हैं।",
        "हर पर्व और त्योहार में मांदर बजता है।",
        "मांदर के बिना कोई भी उत्सव पूरा नहीं होता।"
      ],
      englishText: [
        "The Mandar drum is the sacred instrument of the Oraon people.",
        "It is said that Dharmesh created the first Mandar.",
        "The gods rejoice when they hear the sound of the Mandar.",
        "The Mandar is played at every festival and celebration.",
        "No celebration is complete without the Mandar drum."
      ],
      pronunciation: [
        "Maandar Oraon log ka pavitra vaadya yantra hai.",
        "Kahte hain Dharmesh ne pahla Maandar banaya tha.",
        "Maandar ki aavaaz sunkar devata khush hote hain.",
        "Har parv aur tyohaar mein Maandar bajta hai.",
        "Maandar ke bina koi bhi utsav poora naheen hota."
      ]
    },
  ],
};
