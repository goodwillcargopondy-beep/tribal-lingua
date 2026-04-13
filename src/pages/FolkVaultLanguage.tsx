import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { languages } from "@/data/languages";
import { stories } from "@/data/stories";

const FolkVaultLanguage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const lang = languages.find((l) => l.id === language);
  const langStories = stories[language || ""] || [];

  if (!lang) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate("/folkvault")} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">{lang.emoji} {lang.name} Stories</h1>
          <p className="mt-1 font-body text-sm opacity-80">Folk tales & legends</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {langStories.map((story, i) => (
          <div
            key={story.id}
            className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{story.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold text-foreground">{story.title}</h3>
                <p className="mt-1 text-sm font-body text-muted-foreground line-clamp-2">{story.excerpt}</p>
                <button
                  onClick={() => navigate(`/folkvault/${language}/${story.id}`)}
                  className="mt-3 flex items-center gap-1 text-sm font-body font-medium text-secondary"
                >
                  <BookOpen className="h-4 w-4" /> Read story
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default FolkVaultLanguage;
