import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading text-2xl font-bold">Choose a Language</h1>
          <p className="mt-1 font-body text-sm opacity-80">Start your journey into tribal languages</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {languages.map((lang, i) => (
          <button
            key={lang.id}
            onClick={() => navigate(`/learn/${lang.id}`)}
            className="w-full rounded-xl bg-card p-6 text-left card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{lang.emoji}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-heading text-xl font-bold text-foreground">{lang.name}</h2>
                  <span className="font-heading text-sm text-muted-foreground">{lang.nativeName}</span>
                </div>
                <p className="mt-1 text-sm font-body text-muted-foreground">{lang.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs font-body text-muted-foreground">
                  <span>📍 {lang.region}</span>
                  <span>👥 {lang.speakers}</span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-secondary" style={{ width: `${Math.random() * 30 + 5}%` }} />
                </div>
              </div>
            </div>
          </button>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Learn;
