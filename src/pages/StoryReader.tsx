import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { stories } from "@/data/stories";

const StoryReader = () => {
  const { language, storyId } = useParams<{ language: string; storyId: string }>();
  const navigate = useNavigate();
  const langStories = stories[language || ""] || [];
  const story = langStories.find((s) => s.id === storyId);

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  if (!story) return null;

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => navigate(`/folkvault/${language}`)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-4xl">{story.emoji}</span>
          <h1 className="mt-2 font-heading text-2xl font-bold">{story.title}</h1>
          <p className="font-body text-sm opacity-80">{story.language}</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {story.tribalText.map((line, i) => (
          <div key={i} className="rounded-xl overflow-hidden card-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="bg-primary p-4">
              <p className="font-heading text-base text-primary-foreground italic">{line}</p>
            </div>
            <div className="bg-card p-4">
              <p className="text-sm font-body text-foreground">{story.englishText[i]}</p>
              <p className="mt-1 text-xs font-body italic text-muted-foreground">/ {story.pronunciation[i]} /</p>
              <button
                onClick={() => handleSpeak(story.pronunciation[i])}
                className="mt-2 flex items-center gap-1 text-sm font-body font-medium text-secondary"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default StoryReader;
