import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { santhaliSentences, gondiSentences, kurukhSentences } from "@/data/sentences";

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
          <h1 className="font-heading text-2xl font-bold">💬 Common Sentences</h1>
          <p className="font-body text-sm opacity-80">{lang?.name} phrases</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-3">
        {sentences.map((sentence, i) => (
          <div
            key={sentence.id}
            className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <p className="font-heading text-lg font-bold text-foreground">{sentence.tribal}</p>
            <p className="mt-1 text-sm font-body italic text-muted-foreground">/ {sentence.pronunciation} /</p>
            <p className="mt-1 text-sm font-body text-foreground">{sentence.english}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-body text-secondary">{sentence.category}</span>
              <button
                onClick={() => handleSpeak(sentence.pronunciation)}
                className="ml-auto flex items-center gap-1 text-sm font-body font-medium text-secondary"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnSentences;
