import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import glyphGuardImg from "@/assets/glyph-guard.png";

interface ElderDialogue {
  trigger: string[];
  tribalResponse: string;
  pronunciation: string;
  englishResponse: string;
}

const elderDialogues: ElderDialogue[] = [
  { trigger: ["hello", "hi", "hey", "greetings"], tribalResponse: "ᱡᱚᱦᱟᱨ, ᱵᱟᱲᱟ ᱦᱚᱲ!", pronunciation: "Johar, bara hor!", englishResponse: "Greetings, young one! The forest spirits guided you here." },
  { trigger: ["name", "who are you", "what are you"], tribalResponse: "ᱤᱧ ᱫᱚ ᱜᱞᱤᱯᱷ-ᱜᱟᱨᱰ ᱠᱟᱱᱟ।", pronunciation: "Inj do Glyph-Guard kana.", englishResponse: "I am the Glyph-Guard — keeper of ancient scripts and forgotten tongues." },
  { trigger: ["teach", "learn", "word", "language"], tribalResponse: "ᱟᱹᱯᱤᱞ ᱠᱟᱛᱷᱟ — ᱟᱹᱰᱤ ᱥᱮᱨᱢᱟ ᱞᱟᱹᱠᱛᱤ।", pronunciation: "Apil katha — adi serma lakti.", englishResponse: "Words are like seeds — plant them in your mind and they will grow into wisdom." },
  { trigger: ["story", "tale", "legend"], tribalResponse: "ᱟᱹᱫᱤ ᱫᱤᱱ ᱨᱮ ᱵᱤᱨ ᱠᱟᱹᱦᱟᱱᱤ ᱛᱟᱦᱮᱸᱱᱟ।", pronunciation: "Adi din re bir kahani tahena.", englishResponse: "In the ancient days, the forest itself told stories. Sit and listen, child." },
  { trigger: ["clan", "tribe", "people"], tribalResponse: "ᱟᱢᱟᱠ ᱠᱷᱩᱴ ᱫᱚ ᱟᱢᱟᱠ ᱦᱚᱲ ᱠᱟᱱᱟ।", pronunciation: "Amak khut do amak hor kana.", englishResponse: "Your clan is your family across time. Honor their memory by learning their tongue." },
  { trigger: ["forest", "nature", "tree"], tribalResponse: "ᱵᱤᱨ ᱫᱚ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ ᱜᱮ — ᱩᱱᱤ ᱛᱮ ᱡᱤᱣᱤ ᱮᱢᱟ।", pronunciation: "Bir do adi marang ge — uni te jiwi ema.", englishResponse: "The forest is sacred — it gives us life, medicine, and the songs of our ancestors." },
  { trigger: ["help", "guide", "lost"], tribalResponse: "ᱟᱞᱮ ᱥᱮᱱ ᱞᱮᱱᱟ — ᱤᱧ ᱟᱢᱟᱠ ᱥᱟᱹᱜᱟᱹᱤ ᱠᱟᱱᱟ।", pronunciation: "Ale sen lena — inj amak sagai kana.", englishResponse: "Walk forward — I am your guide. Every word you learn clears the fog." },
  { trigger: ["strong", "power", "strength"], tribalResponse: "ᱥᱟᱹᱠᱛᱤ ᱫᱚ ᱠᱟᱹᱦᱟᱱᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ।", pronunciation: "Sakti do kahani re tahena.", englishResponse: "True strength lies not in the arm, but in the stories passed from elder to child." },
  { trigger: ["music", "song", "dance", "drum"], tribalResponse: "ᱢᱟᱹᱡᱷᱤ ᱥᱮᱨᱮᱧ — ᱵᱤᱨ ᱮᱱᱮᱡ ᱮᱫᱟ!", pronunciation: "Majhi serenj — bir enej eda!", englishResponse: "When the drum speaks, even the trees dance. Music is the heartbeat of our people." },
  { trigger: ["food", "eat", "cook"], tribalResponse: "ᱵᱤᱨ ᱨᱮᱱᱟᱠ ᱫᱟᱠᱟ ᱫᱚ ᱟᱹᱰᱤ ᱨᱟᱹᱥᱠᱟᱹ ᱜᱮ।", pronunciation: "Bir renak daka do adi raska ge.", englishResponse: "The forest provides the purest food. Our ancestors ate what the earth offered." },
  { trigger: ["spirit", "god", "divine", "pray"], tribalResponse: "ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱟᱢᱟᱠ ᱨᱟᱠᱷᱟ ᱮᱫᱟ।", pronunciation: "Marang Buru amak rakha eda.", englishResponse: "The Great Mountain Spirit watches over all. Offer gratitude to the wind and rain." },
  { trigger: ["medicine", "heal", "herb"], tribalResponse: "ᱡᱟᱲᱤ-ᱵᱩᱴᱤ ᱫᱚ ᱵᱤᱨ ᱨᱮᱱᱟᱠ ᱫᱟᱹᱨᱩ ᱠᱟᱱᱟ।", pronunciation: "Jari-buti do bir renak daru kana.", englishResponse: "Every leaf holds a cure. The forest is the greatest healer known to our people." },
  { trigger: ["water", "river", "rain"], tribalResponse: "ᱫᱟᱹ ᱫᱚ ᱡᱤᱣᱤ ᱠᱟᱱᱟ — ᱫᱟᱹ ᱵᱟᱝ ᱛᱮ ᱡᱤᱣᱤ ᱵᱟᱝ।", pronunciation: "Da do jiwi kana — da bang te jiwi bang.", englishResponse: "Water is life itself. Without water, there is no life. Protect the rivers." },
  { trigger: ["festival", "celebrate", "sohrai", "baha"], tribalResponse: "ᱯᱚᱨᱵ ᱫᱚ ᱟᱢᱟᱠ ᱡᱟᱹᱛᱤ ᱨᱮᱱᱟᱠ ᱥᱟᱹᱱᱟᱢ ᱠᱟᱱᱟ।", pronunciation: "Porob do amak jati renak sanam kana.", englishResponse: "Festivals bind our people across villages and generations. Celebrate with your whole heart!" },
  { trigger: ["ancestor", "elder", "old", "ancient"], tribalResponse: "ᱦᱟᱲᱟᱢ ᱠᱚ ᱠᱟᱹᱦᱟᱱᱤ ᱫᱚ ᱟᱢᱟᱠ ᱦᱚᱲ ᱨᱮᱱᱟᱠ ᱜᱮ।", pronunciation: "Haram ko kahani do amak hor renak ge.", englishResponse: "The stories of the elders are the roots of your people. Never let them wither." },
  { trigger: ["brave", "courage", "fear"], tribalResponse: "ᱵᱚᱲ ᱫᱚ ᱵᱤᱨ ᱨᱮᱱᱟᱠ ᱥᱤᱧ ᱞᱮᱠᱟ ᱜᱮ।", pronunciation: "Bor do bir renak sing leka ge.", englishResponse: "Courage is like the tiger of the forest — silent but fearless. Face what comes." },
  { trigger: ["home", "house", "village"], tribalResponse: "ᱟᱹᱛᱩ ᱫᱚ ᱢᱚᱱᱮ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ।", pronunciation: "Atu do mone re tahena.", englishResponse: "Home is not just a place — it lives in the heart. Carry your village wherever you go." },
  { trigger: ["goodbye", "bye", "leave", "farewell"], tribalResponse: "ᱥᱟᱨᱟᱱ ᱢᱮ — ᱟᱞᱮ ᱧᱩᱛᱩᱢ ᱡᱚᱠᱮᱪ ᱞᱮᱱᱟ!", pronunciation: "Saran me — ale nyutum jokech lena!", englishResponse: "Go well, young one. May the forest spirits walk beside you always." },
  { trigger: ["thank", "thanks", "grateful"], tribalResponse: "ᱥᱟᱨᱟᱱ — ᱟᱢᱟᱠ ᱢᱚᱱᱮ ᱫᱚ ᱟᱹᱰᱤ ᱡᱚᱠᱮᱪ ᱜᱮ。", pronunciation: "Saran — amak mone do adi jokech ge.", englishResponse: "Your heart is pure. The spirits smile upon those who carry gratitude." },
  { trigger: ["quiz", "test", "challenge"], tribalResponse: "ᱯᱟᱹᱨᱤᱠᱷᱟ ᱫᱚ ᱢᱚᱱᱮ ᱨᱮᱱᱟᱠ ᱛᱟᱹᱞ ᱠᱟᱱᱟ।", pronunciation: "Parikha do mone renak tal kana.", englishResponse: "A test sharpens the mind like stone sharpens an axe. Face the quiz with courage!" },
];

const defaultResponse: ElderDialogue = {
  trigger: [],
  tribalResponse: "ᱤᱧ ᱟᱢᱟᱠ ᱠᱟᱹᱛᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱱᱟ — ᱟᱨ ᱢᱤᱫ ᱠᱟᱹᱛᱷᱟ ᱩᱫᱩᱜ ᱢᱮ।",
  pronunciation: "Inj amak katha bujhaw lena — ar mid katha udug me.",
  englishResponse: "I sense your words, young one. Ask me about the forest, stories, clans, or our ancient ways."
};

function findResponse(input: string): ElderDialogue {
  const lower = input.toLowerCase();
  for (const d of elderDialogues) {
    if (d.trigger.some(t => lower.includes(t))) return d;
  }
  return defaultResponse;
}

interface Message {
  role: "user" | "elder";
  text: string;
  tribal?: string;
  pronunciation?: string;
}

const ElderChamber = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "elder", text: "Greetings, young seeker. I am the Glyph-Guard, keeper of ancient scripts. Speak, and I shall answer in the tongue of the ancestors.", tribal: "ᱡᱚᱦᱟᱨ, ᱵᱟᱲᱟ ᱦᱚᱲ!", pronunciation: "Johar, bara hor!" }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    const response = findResponse(input.trim());
    const elderMsg: Message = {
      role: "elder",
      text: response.englishResponse,
      tribal: response.tribalResponse,
      pronunciation: response.pronunciation,
    };
    setMessages(prev => [...prev, userMsg, elderMsg]);
    setInput("");
  };

  const handleSpeak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.7;
    speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #060d08, #0a1a0f)" }}>
      {/* Header */}
      <header className="px-5 pt-10 pb-4 flex items-center gap-3 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2" style={{ color: "#4ade8088" }}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-heading text-lg" style={{ color: "#d1fae5" }}>Elder Chamber</h1>
          <p className="text-[10px] font-body" style={{ color: "#22c55e55" }}>Speak with the Glyph-Guard</p>
        </div>
      </header>

      {/* Elder Avatar */}
      <div className="flex justify-center py-2">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 animate-float" style={{ borderColor: "#22c55e44", boxShadow: "0 0 40px #22c55e22" }}>
            <img src={glyphGuardImg} alt="Glyph-Guard Elder" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-heading font-semibold" style={{ background: "#166534", color: "#d1fae5" }}>
            Glyph-Guard
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: "calc(100vh - 340px)" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
              style={{
                background: msg.role === "user" ? "#166534" : "#0d1f11",
                border: `1px solid ${msg.role === "user" ? "#22c55e44" : "#1a2e1f"}`,
              }}
            >
              {msg.tribal && (
                <p className="font-heading text-sm mb-1" style={{ color: "#86efac" }}>{msg.tribal}</p>
              )}
              {msg.pronunciation && (
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-body italic" style={{ color: "#22c55e66" }}>/ {msg.pronunciation} /</p>
                  <button onClick={() => handleSpeak(msg.pronunciation!)} className="p-0.5" style={{ color: "#4ade80" }}>
                    <Volume2 className="h-3 w-3" />
                  </button>
                </div>
              )}
              <p className="text-sm font-body" style={{ color: msg.role === "user" ? "#d1fae5" : "#86efac99" }}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-6 pt-2">
        <div className="flex gap-2 items-center rounded-xl px-4 py-2" style={{ background: "#0d1f11", border: "1px solid #1a2e1f" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask the Glyph-Guard..."
            className="flex-1 bg-transparent text-sm font-body outline-none placeholder:opacity-30"
            style={{ color: "#d1fae5" }}
          />
          <button onClick={handleSend} className="p-2 rounded-full transition-all hover:scale-110" style={{ background: "#16653466", color: "#4ade80" }}>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElderChamber;
