import { Volume2 } from "lucide-react";

const DailyWordCard = () => {
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance("Johar");
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-primary p-6 text-primary-foreground card-shadow animate-fade-in-up">
      <div className="absolute -right-6 -top-6 text-7xl opacity-10">🌿</div>
      <p className="text-xs font-body font-medium uppercase tracking-wider opacity-80">Word of the Day · Santhali</p>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <h3 className="font-heading text-3xl font-bold">ᱡᱚᱦᱟᱨ</h3>
          <p className="mt-1 text-lg font-body opacity-90">Hello</p>
          <p className="text-sm font-body italic opacity-70">/ Johar /</p>
        </div>
        <button
          onClick={handleSpeak}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-transform hover:scale-105 active:scale-95"
        >
          <Volume2 className="h-5 w-5 text-secondary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default DailyWordCard;
