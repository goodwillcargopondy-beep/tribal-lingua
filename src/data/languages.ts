export interface Word {
  id: string;
  tribal: string;
  english: string;
  pronunciation: string;
  category: string;
  image: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  speakers: string;
  description: string;
  emoji: string;
}

export const languages: Language[] = [
  {
    id: "santhali",
    name: "Santhali",
    nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
    region: "Jharkhand, West Bengal, Odisha",
    speakers: "~7.6 million",
    description: "One of the oldest languages of the Austroasiatic family, spoken by the Santhal people.",
    emoji: "🌿",
  },
  {
    id: "gondi",
    name: "Gondi",
    nativeName: "గోండీ",
    region: "Madhya Pradesh, Maharashtra, Chhattisgarh",
    speakers: "~2.9 million",
    description: "A Dravidian language spoken by the Gond people across central India.",
    emoji: "🏔️",
  },
  {
    id: "kurukh",
    name: "Kurukh",
    nativeName: "कुड़ुख़",
    region: "Jharkhand, Chhattisgarh, West Bengal",
    speakers: "~2 million",
    description: "A Dravidian language spoken by the Oraon people, also known as Oraon.",
    emoji: "🌾",
  },
];

export const categories = [
  { id: "animals", name: "Animals", icon: "🐾", color: "terracotta" },
  { id: "food", name: "Food & Drinks", icon: "🍲", color: "gold" },
  { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦", color: "forest" },
  { id: "nature", name: "Nature", icon: "🌳", color: "earth" },
  { id: "greetings", name: "Greetings", icon: "🙏", color: "terracotta" },
  { id: "numbers", name: "Numbers", icon: "🔢", color: "forest" },
];

export const sampleWords: Record<string, Word[]> = {
  "santhali-animals": [
    { id: "s1", tribal: "ᱥᱤᱧ", english: "Tiger", pronunciation: "Sing", category: "animals", image: "🐅" },
    { id: "s2", tribal: "ᱫᱟᱠ", english: "Bird", pronunciation: "Dak", category: "animals", image: "🐦" },
    { id: "s3", tribal: "ᱜᱟᱭ", english: "Cow", pronunciation: "Gay", category: "animals", image: "🐄" },
    { id: "s4", tribal: "ᱥᱮᱛᱟ", english: "Dog", pronunciation: "Seta", category: "animals", image: "🐕" },
    { id: "s5", tribal: "ᱢᱮᱣ", english: "Goat", pronunciation: "Mew", category: "animals", image: "🐐" },
    { id: "s6", tribal: "ᱵᱤᱞ", english: "Cat", pronunciation: "Bil", category: "animals", image: "🐈" },
  ],
  "santhali-food": [
    { id: "s7", tribal: "ᱡᱚᱢ", english: "Rice", pronunciation: "Jom", category: "food", image: "🍚" },
    { id: "s8", tribal: "ᱫᱟᱠᱟ", english: "Water", pronunciation: "Daka", category: "food", image: "💧" },
    { id: "s9", tribal: "ᱡᱤᱞ", english: "Fish", pronunciation: "Jil", category: "food", image: "🐟" },
  ],
  "santhali-greetings": [
    { id: "s10", tribal: "ᱡᱚᱦᱟᱨ", english: "Hello", pronunciation: "Johar", category: "greetings", image: "🙏" },
    { id: "s11", tribal: "ᱥᱟᱨᱟᱱ", english: "Thank you", pronunciation: "Saran", category: "greetings", image: "🤝" },
  ],
  "gondi-animals": [
    { id: "g1", tribal: "నారి", english: "Tiger", pronunciation: "Naari", category: "animals", image: "🐅" },
    { id: "g2", tribal: "పిట్ట", english: "Bird", pronunciation: "Pitta", category: "animals", image: "🐦" },
    { id: "g3", tribal: "మాన్", english: "Cow", pronunciation: "Maan", category: "animals", image: "🐄" },
    { id: "g4", tribal: "కుక్కూ", english: "Dog", pronunciation: "Kukkoo", category: "animals", image: "🐕" },
  ],
  "gondi-greetings": [
    { id: "g5", tribal: "నమస్కార్", english: "Hello", pronunciation: "Namaskaar", category: "greetings", image: "🙏" },
  ],
  "kurukh-animals": [
    { id: "k1", tribal: "बाघ", english: "Tiger", pronunciation: "Baagh", category: "animals", image: "🐅" },
    { id: "k2", tribal: "चिड़ी", english: "Bird", pronunciation: "Chidi", category: "animals", image: "🐦" },
    { id: "k3", tribal: "गऊ", english: "Cow", pronunciation: "Gau", category: "animals", image: "🐄" },
  ],
  "kurukh-greetings": [
    { id: "k4", tribal: "नमस्कार", english: "Hello", pronunciation: "Namaskaar", category: "greetings", image: "🙏" },
  ],
};
