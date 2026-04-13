import { useNavigate } from "react-router-dom";
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
            onClick={() => navigate(`/folkvault/${lang.id}`)}
            className="w-full rounded-xl bg-card p-6 text-left card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
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
