import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Volume2, Loader2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import glyphGuardImg from "@/assets/glyph-guard.png";
import { supabase } from "@/integrations/supabase/client";
import { playTapSound, playScrollSound } from "@/utils/soundEffects";

interface Message {
  role: "user" | "elder";
  text: string;
  tribal?: string;
  pronunciation?: string;
}

const ElderChamber = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: "elder", text: "Greetings, young seeker. I am the Glyph-Guard, keeper of ancient scripts and forgotten tongues. Ask me about our tribes, languages, traditions, or healing ways.", tribal: "ᱡᱚᱦᱟᱨ, ᱵᱟᱲᱟ ᱦᱚᱲ!", pronunciation: "Johar, bara hor!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const chatHistory = useRef<{ role: string; content: string }[]>([]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    playTapSound();

    const userMsg: Message = { role: "user", text: userText };
    setMessages(prev => [...prev, userMsg]);
    chatHistory.current.push({ role: "user", content: userText });
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("glyph-guard-chat", {
        body: { messages: chatHistory.current.slice(-10) },
      });

      if (error) throw error;

      const elderMsg: Message = {
        role: "elder",
        text: data.english || "The spirits are silent. Ask again, young one.",
        tribal: data.tribal || undefined,
        pronunciation: data.pronunciation || undefined,
      };

      chatHistory.current.push({ role: "assistant", content: data.english || "" });
      setMessages(prev => [...prev, elderMsg]);
      playScrollSound();
    } catch (err) {
      console.error("Elder Chamber error:", err);
      setMessages(prev => [...prev, {
        role: "elder",
        text: "The spirit winds are turbulent. Try again in a moment, young one.",
        tribal: "ᱟᱨ ᱢᱤᱫ ᱵᱟᱨ ᱩᱫᱩᱜ ᱢᱮ",
        pronunciation: "Ar mid bar udug me",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.7;
    speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #0a1510, #0d2418, #081210)" }}>
      {/* Ambient fireflies */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-glow-pulse"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: "#4ade80",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="px-5 pt-10 pb-3 flex items-center gap-3 relative z-10">
        <button onClick={() => navigate(-1)} className="p-2" style={{ color: "#4ade8088" }}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-heading text-lg" style={{ color: "#d1fae5" }}>Elder Chamber</h1>
          <p className="text-[10px] font-body" style={{ color: "#22c55e55" }}>The Glyph-Guard speaks</p>
        </div>
      </header>

      {/* Elder Avatar */}
      <div className="flex justify-center py-2 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden animate-float"
            style={{ border: "2px solid #22c55e33", boxShadow: "0 0 60px #22c55e22, 0 0 120px #22c55e11" }}>
            <img src={glyphGuardImg} alt="Glyph-Guard Elder" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-heading font-semibold"
            style={{ background: "linear-gradient(135deg, #166534, #14532d)", color: "#d1fae5", boxShadow: "0 0 15px #22c55e33" }}>
            Glyph-Guard
          </div>
          {loading && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#166534" }}>
              <Loader2 className="w-3 h-3 animate-spin" style={{ color: "#4ade80" }} />
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 relative z-10" style={{ maxHeight: "calc(100vh - 320px)" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
              style={{
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #166534, #14532d)"
                  : "linear-gradient(135deg, #0d1f11, #0a1a0f)",
                border: `1px solid ${msg.role === "user" ? "#22c55e33" : "#1a2e1f"}`,
                boxShadow: msg.role === "elder" ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
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
              <p className="text-sm font-body leading-relaxed" style={{ color: msg.role === "user" ? "#d1fae5" : "#a7d8b8" }}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: "#0d1f11", border: "1px solid #1a2e1f" }}>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full animate-glow-pulse" style={{ background: "#22c55e66", animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-6 pt-2 relative z-10">
        <div className="flex gap-2 items-center rounded-xl px-4 py-2"
          style={{ background: "linear-gradient(135deg, #0d1f11, #0a1a0f)", border: "1px solid #1a2e1f", boxShadow: "0 -4px 20px rgba(0,0,0,0.3)" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask the Glyph-Guard..."
            className="flex-1 bg-transparent text-sm font-body outline-none placeholder:opacity-30"
            style={{ color: "#d1fae5" }}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ background: "linear-gradient(135deg, #166534, #14532d)", color: "#4ade80", opacity: !input.trim() ? 0.4 : 1 }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElderChamber;
