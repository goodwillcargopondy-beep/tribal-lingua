import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, ScrollText } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import DailyWordCard from "@/components/DailyWordCard";
import { languages } from "@/data/languages";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-8 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-sm opacity-80">Welcome back 👋</p>
              <h1 className="font-heading text-2xl font-bold">Tribal Lingua</h1>
            </div>
            {!user && (
              <button
                onClick={() => navigate("/auth")}
                className="rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-body font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-4 space-y-5">
        <DailyWordCard />

        <button
          onClick={() => navigate("/learn")}
          className="flex w-full items-center gap-4 rounded-lg bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
            <BookOpen className="h-7 w-7 text-secondary" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-heading text-base font-semibold text-foreground">Resume Learning</h3>
            <p className="text-sm font-body text-muted-foreground">Continue where you left off</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* FolkVault / Stories */}
        <button
          onClick={() => navigate("/folkvault")}
          className="flex w-full items-center gap-4 rounded-lg bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <ScrollText className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-heading text-base font-semibold text-foreground">FolkVault Stories</h3>
            <p className="text-sm font-body text-muted-foreground">Folk tales & legends</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">Explore Languages</h2>
            <button onClick={() => navigate("/learn")} className="text-sm font-body font-medium text-secondary">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => navigate(`/learn/${lang.id}`)}
                className="flex w-full items-center gap-4 rounded-lg bg-card p-4 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span className="text-3xl">{lang.emoji}</span>
                <div className="flex-1 text-left">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{lang.name}</h3>
                  <p className="text-xs font-body text-muted-foreground">{lang.region}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
