import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { santhaliAlphabets, gondiAlphabets, kurukhAlphabets } from "@/data/alphabets";
import { useLearnedItems } from "@/hooks/useLearnedItems";
import { useRef } from "react";

const alphabetMap: Record<string, typeof santhaliAlphabets> = {
  santhali: santhaliAlphabets,
  gondi: gondiAlphabets,
  kurukh: kurukhAlphabets,
};

const LearnLetters = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const alphabets = alphabetMap[language || ""] || [];
  const { isLearned, toggleLearned } = useLearnedItems();
  const lastTapRef = useRef<Record<string, number>>({});

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleDoubleTap = (idx: number) => {
    const now = Date.now();
    const fullId = `${language}-letter-${idx}`;
    const lastTap = lastTapRef.current[fullId] || 0;
    if (now - lastTap < 400) {
      toggleLearned(fullId);
      lastTapRef.current[fullId] = 0;
    } else {
      lastTapRef.current[fullId] = now;
    }
  };

  const learnedCount = alphabets.filter((_, i) => isLearned(`${language}-letter-${i}`)).length;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate(`/learn/${language}`)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">🔤 Letters & Alphabets</h1>
          <p className="font-body text-sm opacity-80">{lang?.name} script</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${alphabets.length ? (learnedCount / alphabets.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-body opacity-80">{learnedCount}/{alphabets.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6">
        <p className="text-xs font-body text-muted-foreground text-center mb-3 italic">
          Double-tap a letter to mark it as learned ✨
        </p>
        <div className="grid grid-cols-2 gap-3">
          {alphabets.map((letter, i) => {
            const fullId = `${language}-letter-${i}`;
            const learned = isLearned(fullId);
            return (
              <div
                key={letter.character + i}
                onClick={() => handleDoubleTap(i)}
                className={`rounded-xl p-4 card-shadow animate-fade-in-up cursor-pointer select-none transition-all duration-300
                  ${learned
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400/50"
                    : "bg-card border-2 border-transparent"
                  }`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="text-center relative">
                  {learned && <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-emerald-500" />}
                  <span className="text-4xl font-heading font-bold text-foreground">{letter.character}</span>
                  <p className="mt-1 text-lg font-heading font-semibold text-secondary">{letter.romanized}</p>
                  <p className="text-xs font-body text-muted-foreground">{letter.pronunciation}</p>
                  {letter.example && (
                    <p className="mt-1 text-xs font-body text-muted-foreground italic">{letter.example}</p>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSpeak(letter.romanized); }}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary/10 py-2 text-sm font-body font-medium text-secondary transition-colors hover:bg-secondary/20"
                  style={{ minHeight: 44 }}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  Listen
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnLetters;
