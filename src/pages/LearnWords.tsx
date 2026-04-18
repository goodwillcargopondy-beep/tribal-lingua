import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2, CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MilestoneAnimation from "@/components/MilestoneAnimation";
import { languages, categories } from "@/data/languages";
import { allWords } from "@/data/allWords";
import { useLearnedItems } from "@/hooks/useLearnedItems";
import { useRef, useState, useEffect } from "react";

const LearnWords = () => {
  const { language, category } = useParams<{ language: string; category?: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const cat = category ? categories.find((c) => c.id === category) : null;
  const { isLearned, toggleLearned } = useLearnedItems();
  const lastTapRef = useRef<Record<string, number>>({});
  const [anim, setAnim] = useState<{ show: boolean; type: "category_complete"; message?: string }>({ show: false, type: "category_complete" });
  const wasCompleteRef = useRef(false);

  const langWords = allWords[language || ""] || {};
  const words = langWords[category || "animals"] || [];

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleDoubleTap = (itemId: string) => {
    const now = Date.now();
    const fullId = `${language}-word-${itemId}`;
    const lastTap = lastTapRef.current[fullId] || 0;
    if (now - lastTap < 400) {
      toggleLearned(fullId);
      lastTapRef.current[fullId] = 0;
    } else {
      lastTapRef.current[fullId] = now;
    }
  };

  const learnedInCategory = words.filter(w => isLearned(`${language}-word-${w.id}`)).length;

  useEffect(() => {
    if (words.length > 0 && learnedInCategory === words.length && !wasCompleteRef.current) {
      wasCompleteRef.current = true;
      setAnim({ show: true, type: "category_complete", message: `${cat?.name || "Category"} mastered!` });
    }
    if (learnedInCategory < words.length) wasCompleteRef.current = false;
  }, [learnedInCategory, words.length, cat?.name]);

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate(`/learn/${language}`)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">
            {cat ? cat.icon + " " + cat.name : "Words"}
          </h1>
          <p className="font-body text-sm opacity-80">{lang?.name} vocabulary</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-primary-foreground/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${words.length ? (learnedInCategory / words.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs font-body opacity-80">{learnedInCategory}/{words.length}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6">
        <p className="text-xs font-body text-muted-foreground text-center mb-3 italic">
          Double-tap a word to mark it as learned ✨
        </p>
        {words.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center card-shadow">
            <p className="text-4xl mb-3">📚</p>
            <h3 className="font-heading text-lg font-semibold text-foreground">Coming Soon</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">
              We're adding more words for this category. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {words.map((word, i) => {
              const fullId = `${language}-word-${word.id}`;
              const learned = isLearned(fullId);
              return (
                <div
                  key={word.id}
                  onClick={() => handleDoubleTap(word.id)}
                  className={`group rounded-xl p-4 card-shadow transition-all duration-300 animate-fade-in-up cursor-pointer select-none
                    ${learned
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-400/50 ring-1 ring-emerald-300/20"
                      : "bg-card border-2 border-transparent hover:scale-[1.02]"
                    }`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <div className="text-center relative">
                    {learned && (
                      <CheckCircle2 className="absolute -top-1 -right-1 h-5 w-5 text-emerald-500" />
                    )}
                    <span className="text-4xl">{word.image}</span>
                    <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{word.tribal}</h3>
                    <p className="font-body text-sm text-foreground">{word.english}</p>
                    <p className="text-xs font-body italic text-muted-foreground">/ {word.pronunciation} /</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSpeak(word.pronunciation); }}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary/10 py-2.5 text-sm font-body font-medium text-secondary transition-colors hover:bg-secondary/20"
                    style={{ minHeight: 44 }}
                  >
                    <Volume2 className="h-4 w-4" />
                    Listen
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
      <MilestoneAnimation show={anim.show} type={anim.type} message={anim.message} onComplete={() => setAnim({ ...anim, show: false })} />
    </div>
  );
};

export default LearnWords;
