import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { santhaliAlphabets, gondiAlphabets, kurukhAlphabets } from "@/data/alphabets";

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
          <h1 className="font-heading text-2xl font-bold">🔤 Letters & Alphabets</h1>
          <p className="font-body text-sm opacity-80">{lang?.name} script</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6">
        <div className="grid grid-cols-2 gap-3">
          {alphabets.map((letter, i) => (
            <div
              key={letter.character + i}
              className="rounded-xl bg-card p-4 card-shadow animate-fade-in-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="text-center">
                <span className="text-4xl font-heading font-bold text-foreground">{letter.character}</span>
                <p className="mt-1 text-lg font-heading font-semibold text-secondary">{letter.romanized}</p>
                <p className="text-xs font-body text-muted-foreground">{letter.pronunciation}</p>
                {letter.example && (
                  <p className="mt-1 text-xs font-body text-muted-foreground italic">{letter.example}</p>
                )}
              </div>
              <button
                onClick={() => handleSpeak(letter.romanized)}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary/10 py-2 text-sm font-body font-medium text-secondary transition-colors hover:bg-secondary/20"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Listen
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnLetters;
