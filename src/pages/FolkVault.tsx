import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";

const FolkVault = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading text-2xl font-bold">FolkVault</h1>
          <p className="mt-1 font-body text-sm opacity-80">Choose a language to explore stories</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {languages.map((lang, i) => (
          <button
            key={lang.id}
            onClick={() => {
              if (lang.locked) {
                toast({ title: `${lang.name} — Coming Soon`, description: "Stories for this language will be added soon." });
                return;
              }
              navigate(`/folkvault/${lang.id}`);
            }}
            className={`relative w-full rounded-xl bg-card p-6 text-left card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up ${lang.locked ? "opacity-70" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {lang.locked && (
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-body font-medium text-muted-foreground">
                <Lock className="h-3 w-3" /> Soon
              </div>
            )}
            <div className="flex items-start gap-4">
              <span className="text-4xl">{lang.emoji}</span>
              <div className="flex-1">
                <h2 className="font-heading text-xl font-bold text-foreground">{lang.name}</h2>
                <p className="mt-1 text-sm font-body text-muted-foreground">Explore folk tales & legends</p>
              </div>
            </div>
          </button>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default FolkVault;
