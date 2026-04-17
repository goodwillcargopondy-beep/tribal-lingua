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
  locked?: boolean;
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
  {
    id: "toda",
    name: "Toda",
    nativeName: "தோடா",
    region: "Nilgiri Hills, Tamil Nadu",
    speakers: "~1,600 (endangered)",
    description: "An ancient Dravidian language of the Toda pastoralist people of the Nilgiris.",
    emoji: "🐃",
  },
  {
    id: "irula",
    name: "Irula",
    nativeName: "இருளர்",
    region: "Tamil Nadu, Kerala, Karnataka",
    speakers: "~200,000",
    description: "A Dravidian language of the Irula tribal community. Coming soon.",
    emoji: "🌙",
    locked: true,
  },
];

export const categories = [
  { id: "animals", name: "Animals", icon: "🐾", color: "terracotta" },
  { id: "food", name: "Food & Drinks", icon: "🍲", color: "gold" },
  { id: "family", name: "Family", icon: "👨‍👩‍👧‍👦", color: "forest" },
  { id: "nature", name: "Nature", icon: "🌳", color: "earth" },
  { id: "greetings", name: "Greetings", icon: "🙏", color: "terracotta" },
  { id: "numbers", name: "Numbers", icon: "🔢", color: "forest" },
  { id: "colors", name: "Colors", icon: "🎨", color: "gold" },
  { id: "body", name: "Body Parts", icon: "🦴", color: "earth" },
  { id: "clothing", name: "Clothing", icon: "👗", color: "terracotta" },
  { id: "weather", name: "Weather", icon: "🌤️", color: "forest" },
  { id: "tools", name: "Tools", icon: "🔧", color: "gold" },
  { id: "music", name: "Music", icon: "🎵", color: "earth" },
  { id: "home", name: "Home", icon: "🏠", color: "terracotta" },
  { id: "village", name: "Village", icon: "🏘️", color: "forest" },
  { id: "festivals", name: "Festivals", icon: "🎉", color: "gold" },
];

export const sampleWords: Record<string, Word[]> = {};
