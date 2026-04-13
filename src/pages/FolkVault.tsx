import BottomNav from "@/components/BottomNav";
import { BookOpen } from "lucide-react";

const stories = [
  { id: "1", title: "The First Rain", language: "Santhali", emoji: "🌧️", excerpt: "A tale of how the Santhal people celebrate the first monsoon rains..." },
  { id: "2", title: "The Mountain Spirit", language: "Gondi", emoji: "🏔️", excerpt: "Deep in the forests of Central India, the Gond people tell of a spirit..." },
  { id: "3", title: "The Harvest Song", language: "Kurukh", emoji: "🌾", excerpt: "Every autumn, the Oraon people gather to sing songs of gratitude..." },
  { id: "4", title: "The Sacred Grove", language: "Santhali", emoji: "🌳", excerpt: "The Jaherthan is a sacred grove where Santhal spirits are believed to dwell..." },
];

const FolkVault = () => {
  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <h1 className="font-heading text-2xl font-bold">FolkVault</h1>
          <p className="mt-1 font-body text-sm opacity-80">Stories & folklore from tribal traditions</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {stories.map((story, i) => (
          <div
            key={story.id}
            className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{story.emoji}</span>
              <div className="flex-1">
                <span className="text-xs font-body font-medium text-secondary">{story.language}</span>
                <h3 className="font-heading text-base font-semibold text-foreground">{story.title}</h3>
                <p className="mt-1 text-sm font-body text-muted-foreground line-clamp-2">{story.excerpt}</p>
                <button className="mt-3 flex items-center gap-1 text-sm font-body font-medium text-secondary">
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

export default FolkVault;
