import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages, categories } from "@/data/languages";
import { allWords } from "@/data/allWords";

const LearnWords = () => {
  const { language, category } = useParams<{ language: string; category?: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const cat = category ? categories.find((c) => c.id === category) : null;

  const langWords = allWords[language || ""] || {};
  const words = langWords[category || "animals"] || [];

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

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
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6">
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
            {words.map((word, i) => (
              <div
                key={word.id}
                className="group rounded-xl bg-card p-4 card-shadow transition-transform hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className="text-center">
                  <span className="text-4xl">{word.image}</span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{word.tribal}</h3>
                  <p className="font-body text-sm text-foreground">{word.english}</p>
                  <p className="text-xs font-body italic text-muted-foreground">/ {word.pronunciation} /</p>
                </div>
                <button
                  onClick={() => handleSpeak(word.pronunciation)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary/10 py-2.5 text-sm font-body font-medium text-secondary transition-colors hover:bg-secondary/20"
                >
                  <Volume2 className="h-4 w-4" />
                  Listen
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnWords;
