import { Word } from "./languages";

// Toda is an oral Dravidian language of the Nilgiri Hills.
// Toda has no native script — words shown in Tamil script (commonly used regionally) + romanized pronunciation.
export const todaWords: Record<string, Word[]> = {
  animals: [
    { id: "ta1", tribal: "எரு", english: "Buffalo", pronunciation: "Eru", category: "animals", image: "🐃" },
    { id: "ta2", tribal: "புலி", english: "Tiger", pronunciation: "Puli", category: "animals", image: "🐅" },
    { id: "ta3", tribal: "மான்", english: "Deer", pronunciation: "Maan", category: "animals", image: "🦌" },
    { id: "ta4", tribal: "நரி", english: "Fox", pronunciation: "Nari", category: "animals", image: "🦊" },
    { id: "ta5", tribal: "பறவை", english: "Bird", pronunciation: "Paravai", category: "animals", image: "🐦" },
    { id: "ta6", tribal: "நாய்", english: "Dog", pronunciation: "Naai", category: "animals", image: "🐕" },
    { id: "ta7", tribal: "பூனை", english: "Cat", pronunciation: "Poonai", category: "animals", image: "🐈" },
    { id: "ta8", tribal: "ஆடு", english: "Goat", pronunciation: "Aadu", category: "animals", image: "🐐" },
    { id: "ta9", tribal: "குதிரை", english: "Horse", pronunciation: "Kuthirai", category: "animals", image: "🐎" },
    { id: "ta10", tribal: "பாம்பு", english: "Snake", pronunciation: "Paambu", category: "animals", image: "🐍" },
  ],
  food: [
    { id: "tf1", tribal: "பால்", english: "Milk", pronunciation: "Paal", category: "food", image: "🥛" },
    { id: "tf2", tribal: "நீர்", english: "Water", pronunciation: "Neer", category: "food", image: "💧" },
    { id: "tf3", tribal: "சோறு", english: "Rice", pronunciation: "Soru", category: "food", image: "🍚" },
    { id: "tf4", tribal: "வெண்ணெய்", english: "Butter", pronunciation: "Vennai", category: "food", image: "🧈" },
    { id: "tf5", tribal: "தயிர்", english: "Curd", pronunciation: "Thayir", category: "food", image: "🥣" },
    { id: "tf6", tribal: "தேன்", english: "Honey", pronunciation: "Then", category: "food", image: "🍯" },
  ],
  family: [
    { id: "tfa1", tribal: "அப்பா", english: "Father", pronunciation: "Appa", category: "family", image: "👨" },
    { id: "tfa2", tribal: "அம்மா", english: "Mother", pronunciation: "Amma", category: "family", image: "👩" },
    { id: "tfa3", tribal: "தம்பி", english: "Brother", pronunciation: "Thambi", category: "family", image: "👦" },
    { id: "tfa4", tribal: "தங்கை", english: "Sister", pronunciation: "Thangai", category: "family", image: "👧" },
    { id: "tfa5", tribal: "பாட்டி", english: "Grandmother", pronunciation: "Patti", category: "family", image: "👵" },
    { id: "tfa6", tribal: "தாத்தா", english: "Grandfather", pronunciation: "Thaatha", category: "family", image: "👴" },
  ],
  nature: [
    { id: "tn1", tribal: "மலை", english: "Mountain", pronunciation: "Malai", category: "nature", image: "⛰️" },
    { id: "tn2", tribal: "ஆறு", english: "River", pronunciation: "Aaru", category: "nature", image: "🏞️" },
    { id: "tn3", tribal: "மரம்", english: "Tree", pronunciation: "Maram", category: "nature", image: "🌳" },
    { id: "tn4", tribal: "சூரியன்", english: "Sun", pronunciation: "Sooriyan", category: "nature", image: "☀️" },
    { id: "tn5", tribal: "சந்திரன்", english: "Moon", pronunciation: "Chandhiran", category: "nature", image: "🌙" },
    { id: "tn6", tribal: "மழை", english: "Rain", pronunciation: "Mazhai", category: "nature", image: "🌧️" },
    { id: "tn7", tribal: "பூ", english: "Flower", pronunciation: "Poo", category: "nature", image: "🌸" },
    { id: "tn8", tribal: "காடு", english: "Forest", pronunciation: "Kaadu", category: "nature", image: "🌲" },
  ],
  greetings: [
    { id: "tg1", tribal: "வணக்கம்", english: "Hello", pronunciation: "Vanakkam", category: "greetings", image: "🙏" },
    { id: "tg2", tribal: "நன்றி", english: "Thank you", pronunciation: "Nandri", category: "greetings", image: "🤝" },
    { id: "tg3", tribal: "போய்வரேன்", english: "Goodbye", pronunciation: "Poivaren", category: "greetings", image: "👋" },
  ],
  numbers: [
    { id: "tno1", tribal: "ஒன்று", english: "One", pronunciation: "Ondru", category: "numbers", image: "1️⃣" },
    { id: "tno2", tribal: "இரண்டு", english: "Two", pronunciation: "Irandu", category: "numbers", image: "2️⃣" },
    { id: "tno3", tribal: "மூன்று", english: "Three", pronunciation: "Moondru", category: "numbers", image: "3️⃣" },
    { id: "tno4", tribal: "நான்கு", english: "Four", pronunciation: "Naangu", category: "numbers", image: "4️⃣" },
    { id: "tno5", tribal: "ஐந்து", english: "Five", pronunciation: "Aindhu", category: "numbers", image: "5️⃣" },
  ],
  body: [
    { id: "tb1", tribal: "தலை", english: "Head", pronunciation: "Thalai", category: "body", image: "🧠" },
    { id: "tb2", tribal: "கண்", english: "Eye", pronunciation: "Kann", category: "body", image: "👁️" },
    { id: "tb3", tribal: "கை", english: "Hand", pronunciation: "Kai", category: "body", image: "✋" },
    { id: "tb4", tribal: "கால்", english: "Foot", pronunciation: "Kaal", category: "body", image: "🦶" },
    { id: "tb5", tribal: "வாய்", english: "Mouth", pronunciation: "Vaai", category: "body", image: "👄" },
  ],
  home: [
    { id: "th1", tribal: "வீடு", english: "House", pronunciation: "Veedu", category: "home", image: "🏠" },
    { id: "th2", tribal: "கதவு", english: "Door", pronunciation: "Kadhavu", category: "home", image: "🚪" },
    { id: "th3", tribal: "நெருப்பு", english: "Fire", pronunciation: "Neruppu", category: "home", image: "🔥" },
    { id: "th4", tribal: "பாத்திரம்", english: "Pot", pronunciation: "Paathiram", category: "home", image: "🏺" },
  ],
  village: [
    { id: "tv1", tribal: "மண்டு", english: "Hamlet", pronunciation: "Mund", category: "village", image: "🏘️" },
    { id: "tv2", tribal: "கோயில்", english: "Temple/Dairy", pronunciation: "Koyil", category: "village", image: "⛩️" },
    { id: "tv3", tribal: "வழி", english: "Path", pronunciation: "Vazhi", category: "village", image: "🛤️" },
  ],
  festivals: [
    { id: "tfe1", tribal: "மோட்", english: "Modh festival", pronunciation: "Modh", category: "festivals", image: "🎉" },
    { id: "tfe2", tribal: "பால்விழா", english: "Milk ceremony", pronunciation: "Paalvizha", category: "festivals", image: "🥛" },
  ],
};
