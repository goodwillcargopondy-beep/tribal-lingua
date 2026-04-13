import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Brain, ListChecks, Headphones, PenLine } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";

const quizTypes = [
  { icon: ListChecks, title: "Multiple Choice", desc: "Pick the right answer", color: "secondary" },
  { icon: Brain, title: "Match Pairs", desc: "Connect words & meanings", color: "primary" },
  { icon: Headphones, title: "Audio Quiz", desc: "Listen and identify", color: "accent" },
  { icon: PenLine, title: "Fill in Blanks", desc: "Complete the word", color: "secondary" },
];

const QuizLanguage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);

  if (!lang) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate("/quiz")} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">{lang.emoji} {lang.name} Quiz</h1>
          <p className="mt-1 font-body text-sm opacity-80">Test your knowledge</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {quizTypes.map((quiz, i) => (
          <button
            key={quiz.title}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10">
              <quiz.icon className="h-7 w-7 text-secondary" />
            </div>
            <div className="text-left">
              <h3 className="font-heading text-base font-semibold text-foreground">{quiz.title}</h3>
              <p className="text-sm font-body text-muted-foreground">{quiz.desc}</p>
            </div>
          </button>
        ))}

        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-heading text-base font-semibold text-foreground mb-2">Your Best Scores</h3>
          <div className="space-y-2 text-sm font-body text-muted-foreground">
            <p>🏆 MCQ {lang.name}: 85%</p>
            <p>🏆 Audio {lang.name}: 72%</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default QuizLanguage;
