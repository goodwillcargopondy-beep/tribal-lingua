import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { santhaliSentences, gondiSentences, kurukhSentences } from "@/data/sentences";
import { useLearnedItems } from "@/hooks/useLearnedItems";
import { useRef } from "react";

const sentenceMap: Record<string, typeof santhaliSentences> = {
  santhali: santhaliSentences,
  gondi: gondiSentences,
  kurukh: kurukhSentences,
};

const LearnSentences = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const sentences = sentenceMap[language || ""] || [];
  const { isLearned, toggleLearned } = useLearnedItems();
  const lastTapRef = useRef<Record<string, number>>({});

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleDoubleTap = (itemId: string) => {
    const now = Date.now();
    const fullId = `${language}-sentence-${itemId}`;
    const lastTap = lastTapRef.current[fullId] || 0;
    if (now - lastTap < 400) {
      toggleLearned(fullId);
      lastTapRef.current[fullId] = 0;
    } else {
      lastTapRef.current[fullId] = now;
    }
  };

  const learnedCount = sentences.filter(s => isLearned(`${language}-sentence-${s.id}`)).length;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate(`/learn/${language}`)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">💬 Common Sentences</h1>
          <p className="font-body text-sm opacity-80">{lang?.name} phrases</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${sentences.length ? (learnedCount / sentences.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-body opacity-80">{learnedCount}/{sentences.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-3">
        <p className="text-xs font-body text-muted-foreground text-center italic">
          Double-tap a phrase to mark it as learned ✨
        </p>
        {sentences.map((sentence, i) => {
          const fullId = `${language}-sentence-${sentence.id}`;
          const learned = isLearned(fullId);
          return (
            <div
              key={sentence.id}
              onClick={() => handleDoubleTap(sentence.id)}
              className={`rounded-xl p-5 card-shadow animate-fade-in-up cursor-pointer select-none transition-all duration-300
                ${learned
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400/50"
                  : "bg-card border-2 border-transparent"
                }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-heading text-lg font-bold text-foreground">{sentence.tribal}</p>
                  <p className="mt-1 text-sm font-body italic text-muted-foreground">/ {sentence.pronunciation} /</p>
                  <p className="mt-1 text-sm font-body text-foreground">{sentence.english}</p>
                </div>
                {learned && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-1" />}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-body text-secondary">{sentence.category}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSpeak(sentence.pronunciation); }}
                  className="ml-auto flex items-center gap-1 text-sm font-body font-medium text-secondary"
                >
                  <Volume2 className="h-4 w-4" /> Listen
                </button>
              </div>
            </div>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnSentences;
