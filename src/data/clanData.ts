export interface ClanInfo {
  id: string;
  name: string;
  language: string;
  languageId: string;
  territory: string;
  spiritAnimal: string;
  spiritAnimalEmoji: string;
  color: string;
  accentColor: string;
  crestSymbol: string;
  motto: string;
  description: string;
  starterWords: { word: string; pronunciation: string; meaning: string }[];
  facts: string[];
}

export const clans: Record<string, ClanInfo> = {
  santhali: {
    id: "santhali",
    name: "Clan of the Stone River",
    language: "Santhali",
    languageId: "santhali",
    territory: "Jharkhand, West Bengal, Odisha",
    spiritAnimal: "Deer",
    spiritAnimalEmoji: "🦌",
    color: "#2d5a3d",
    accentColor: "#a0c49d",
    crestSymbol: "◆",
    motto: "We remember what the earth whispers",
    description: "The Santhali clan walks with the rhythm of ancient rivers and stone. They are keepers of memory, guardians of harvest songs, and speakers of one of the oldest languages of the subcontinent.",
    starterWords: [
      { word: "ᱡᱚᱦᱟᱨ", pronunciation: "Johar", meaning: "Hello / Greetings" },
      { word: "ᱧᱮᱞ", pronunciation: "Nyel", meaning: "Water" },
      { word: "ᱵᱟᱝᱜᱟ", pronunciation: "Bonga", meaning: "Spirit / God" },
    ],
    facts: [
      "Santhali has its own script called Ol Chiki, created by Pandit Raghunath Murmu in 1925",
      "The Santhals are one of the largest tribal communities in India",
      "Their traditional dance, the 'Dong', is performed during harvest festivals",
    ],
  },
  gondi: {
    id: "gondi",
    name: "Clan of the Ember Hill",
    language: "Gondi",
    languageId: "gondi",
    territory: "Madhya Pradesh, Maharashtra, Chhattisgarh",
    spiritAnimal: "Tiger",
    spiritAnimalEmoji: "🐅",
    color: "#8b4513",
    accentColor: "#cd7f32",
    crestSymbol: "▲",
    motto: "The fire in the hill never dies",
    description: "The Gondi clan carries the strength of ancient hills and the wisdom of sacred groves. They speak through drums and fire, and their language holds the memory of the Gondwana kingdom.",
    starterWords: [
      { word: "रामराम", pronunciation: "Ram Ram", meaning: "Hello / Greetings" },
      { word: "नीर", pronunciation: "Neer", meaning: "Water" },
      { word: "भूमि", pronunciation: "Bhoomi", meaning: "Earth / Land" },
    ],
    facts: [
      "Gondi is a Dravidian language spoken by over 2.9 million people",
      "The Gond kingdom of Gondwana was one of the largest tribal kingdoms in India",
      "Their deity Bada Dev is worshipped in sacred groves called 'Dev Sthans'",
    ],
  },
  kurukh: {
    id: "kurukh",
    name: "Clan of the Sky Eagle",
    language: "Kurukh",
    languageId: "kurukh",
    territory: "Jharkhand, Chhattisgarh, West Bengal",
    spiritAnimal: "Eagle",
    spiritAnimalEmoji: "🦅",
    color: "#1a4a6e",
    accentColor: "#5cbdb9",
    crestSymbol: "◯",
    motto: "From the mountain top, all truths are seen",
    description: "The Kurukh clan soars with the vision of eagles and the patience of mountains. Known as the Oraon people, they carry songs that reach the sky and stories that root deep into the earth.",
    starterWords: [
      { word: "नमस्कार", pronunciation: "Namaskar", meaning: "Hello / Greetings" },
      { word: "दाक", pronunciation: "Daak", meaning: "Water" },
      { word: "धरती", pronunciation: "Dharti", meaning: "Earth" },
    ],
    facts: [
      "Kurukh belongs to the Dravidian language family, spoken by the Oraon tribe",
      "The Oraon people have a rich tradition of Jatra folk theater",
      "Their harvest festival 'Sarhul' celebrates the marriage of earth and sky",
    ],
  },
};

export interface QuizQuestion {
  question: string;
  options: { text: string; scores: Record<string, number> }[];
}

export const ritualQuestions: QuizQuestion[] = [
  {
    question: "The forest speaks to you. What do you hear first?",
    options: [
      { text: "River song", scores: { santhali: 3, gondi: 1, kurukh: 2 } },
      { text: "Wind in trees", scores: { santhali: 1, gondi: 2, kurukh: 3 } },
      { text: "Drums from a distant hill", scores: { santhali: 1, gondi: 3, kurukh: 2 } },
      { text: "Silence and stone", scores: { santhali: 3, gondi: 2, kurukh: 1 } },
    ],
  },
  {
    question: "A stranger enters your village. What is your first instinct?",
    options: [
      { text: "Offer food", scores: { santhali: 3, gondi: 2, kurukh: 1 } },
      { text: "Study them carefully", scores: { santhali: 1, gondi: 2, kurukh: 3 } },
      { text: "Challenge them to a game", scores: { santhali: 2, gondi: 3, kurukh: 1 } },
      { text: "Sing a welcome", scores: { santhali: 2, gondi: 1, kurukh: 3 } },
    ],
  },
  {
    question: "Your spirit guide appears. It is a —",
    options: [
      { text: "🐅 Tiger", scores: { santhali: 1, gondi: 3, kurukh: 2 } },
      { text: "🦅 Eagle", scores: { santhali: 1, gondi: 2, kurukh: 3 } },
      { text: "🐍 Serpent", scores: { santhali: 2, gondi: 3, kurukh: 1 } },
      { text: "🦌 Deer", scores: { santhali: 3, gondi: 1, kurukh: 2 } },
    ],
  },
  {
    question: "You must learn something new. How do you begin?",
    options: [
      { text: "By watching elders", scores: { santhali: 3, gondi: 2, kurukh: 1 } },
      { text: "By doing it myself", scores: { santhali: 1, gondi: 3, kurukh: 2 } },
      { text: "By listening to songs", scores: { santhali: 2, gondi: 1, kurukh: 3 } },
      { text: "By reading marks on stone", scores: { santhali: 2, gondi: 2, kurukh: 3 } },
    ],
  },
  {
    question: "What does your heart guard most fiercely?",
    options: [
      { text: "Memory", scores: { santhali: 3, gondi: 1, kurukh: 2 } },
      { text: "Family", scores: { santhali: 2, gondi: 3, kurukh: 2 } },
      { text: "Land", scores: { santhali: 1, gondi: 3, kurukh: 2 } },
      { text: "Story", scores: { santhali: 2, gondi: 1, kurukh: 3 } },
    ],
  },
];
