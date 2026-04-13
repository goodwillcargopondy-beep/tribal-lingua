import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, Type } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages, categories } from "@/data/languages";

const LearnLanguage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);

  if (!lang) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate("/learn")} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{lang.emoji}</span>
            <div>
              <h1 className="font-heading text-2xl font-bold">{lang.name}</h1>
              <p className="font-body text-sm opacity-80">{lang.nativeName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {[
          { icon: MessageSquare, title: "Common Sentences", desc: "Everyday phrases", path: `/learn/${language}/sentences` },
          { icon: Type, title: "Letters & Alphabets", desc: "Script and writing", path: `/learn/${language}/letters` },
        ].map((item, i) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex w-full items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm font-body text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}

        <h2 className="font-heading text-lg font-semibold text-foreground pt-2">Word Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/learn/${language}/words/${cat.id}`)}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.02] active:scale-[0.98] animate-fade-in-up"
              style={{ animationDelay: `${(i + 2) * 0.05}s` }}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-heading text-sm font-semibold text-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default LearnLanguage;
