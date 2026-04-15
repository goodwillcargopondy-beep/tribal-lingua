import { Volume2, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { santhaliWords } from "@/data/words-santhali";
import { gondiWords } from "@/data/words-gondi";
import { kurukhWords } from "@/data/words-kurukh";
import { useLearnedItems } from "@/hooks/useLearnedItems";

const allDailyWords = [
  ...Object.values(santhaliWords).flat().map(w => ({ ...w, lang: "Santhali", langId: "santhali" })),
  ...Object.values(gondiWords).flat().map(w => ({ ...w, lang: "Gondi", langId: "gondi" })),
  ...Object.values(kurukhWords).flat().map(w => ({ ...w, lang: "Kurukh", langId: "kurukh" })),
];

function getDailyWord() {
  const today = new Date();
  const dayIndex = Math.floor((today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate())) % allDailyWords.length;
  return allDailyWords[dayIndex];
}

const DailyWordCard = () => {
  const word = getDailyWord();
  const { isLearned, toggleLearned } = useLearnedItems();
  const lastTapRef = useRef(0);
  const fullId = `${word.langId}-word-${word.id}`;
  const learned = isLearned(fullId);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.pronunciation);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 400) {
      toggleLearned(fullId);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <div
      onClick={handleDoubleTap}
      className={`relative overflow-hidden rounded-lg p-6 text-primary-foreground card-shadow animate-fade-in-up cursor-pointer select-none transition-all ${
        learned ? "ring-2 ring-emerald-400" : ""
      } bg-primary`}
    >
      <div className="absolute -right-6 -top-6 text-7xl opacity-10">🌿</div>
      {learned && <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-emerald-400" />}
      <p className="text-xs font-body font-medium uppercase tracking-wider opacity-80">
        Word of the Day · {word.lang}
      </p>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <h3 className="font-heading text-3xl font-bold">{word.tribal}</h3>
          <p className="mt-1 text-lg font-body opacity-90">{word.english}</p>
          <p className="text-sm font-body italic opacity-70">/ {word.pronunciation} /</p>
        </div>
        <button
          onClick={handleSpeak}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-transform hover:scale-105 active:scale-95"
        >
          <Volume2 className="h-5 w-5 text-secondary-foreground" />
        </button>
      </div>
      <p className="mt-2 text-[10px] font-body opacity-50 italic">Double-tap to mark as learned ✨</p>
    </div>
  );
};

export default DailyWordCard;
