import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { tribalHistory } from "@/data/history";

const topics = [
  { id: "history", name: "History", icon: "📜" },
  { id: "culture", name: "Culture", icon: "🎭" },
  { id: "tradition", name: "Traditions", icon: "🕯️" },
  { id: "foods", name: "Traditional Foods", icon: "🍲" },
  { id: "medicine", name: "Herbal Medicine", icon: "🌿" },
];

const HistoryLanguage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);

  if (!lang) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate("/history")} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">{lang.emoji} {lang.name}</h1>
          <p className="mt-1 font-body text-sm opacity-80">Explore cultural heritage</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-3">
        {topics.map((topic, i) => (
          <button
            key={topic.id}
            onClick={() => navigate(`/history/${language}/${topic.id}`)}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="text-3xl">{topic.icon}</span>
            <div className="text-left">
              <h3 className="font-heading text-base font-semibold text-foreground">{topic.name}</h3>
            </div>
          </button>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default HistoryLanguage;
