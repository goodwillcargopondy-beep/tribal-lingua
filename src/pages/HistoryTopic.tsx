import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { tribalHistory } from "@/data/history";

const HistoryTopic = () => {
  const { language, topic: topicId } = useParams<{ language: string; topic: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const langData = tribalHistory[language || ""];
  const topic = langData?.[topicId || ""];

  if (!lang || !topic) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate(`/history/${language}`)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-3xl">{topic.icon}</span>
          <h1 className="mt-2 font-heading text-2xl font-bold">{topic.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {topic.content.map((paragraph, i) => (
          <div
            key={i}
            className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <p className="font-body text-sm text-foreground leading-relaxed">{paragraph}</p>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default HistoryTopic;
