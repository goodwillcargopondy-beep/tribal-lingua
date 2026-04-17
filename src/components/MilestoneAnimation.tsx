import { useState, useEffect } from "react";
import glyphGuardImg from "@/assets/glyph-guard.png";

type AnimType =
  | "learned"
  | "milestone"
  | "quiz_complete"
  | "story_complete"
  | "category_complete"
  | "phrase_complete"
  | "streak_kept"
  | "streak_lost"
  | "low_score";

interface Props {
  show: boolean;
  type: AnimType;
  message?: string;
  onComplete: () => void;
}

const MilestoneAnimation = ({ show, type, message, onComplete }: Props) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!show) { setStep(0); return; }
    setStep(1);
    const t1 = setTimeout(() => setStep(2), 400);
    const t2 = setTimeout(() => setStep(3), 1200);
    const t3 = setTimeout(() => { setStep(0); onComplete(); }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [show, onComplete]);

  if (!show || step === 0) return null;

  const configs: Record<AnimType, { emoji: string; title: string; color: string; particles: string; useGuard?: boolean; sad?: boolean }> = {
    learned: { emoji: "✨", title: "Word Learned!", color: "#4ade80", particles: "🍃🌿✨🌱" },
    milestone: { emoji: "🔓", title: message || "Milestone Unlocked!", color: "#f59e0b", particles: "🔥⚡🌟✨", useGuard: true },
    quiz_complete: { emoji: "🏆", title: "Quiz Complete!", color: "#8b5cf6", particles: "🎯⭐🏅🎉" },
    story_complete: { emoji: "📜", title: "Story Finished!", color: "#ec4899", particles: "📖🌙🕯️✨" },
    category_complete: { emoji: "🌳", title: "Category Mastered!", color: "#22c55e", particles: "🌿🍃🌱🌲✨", useGuard: true },
    phrase_complete: { emoji: "💬", title: "Phrase Learned!", color: "#06b6d4", particles: "💧✨🌊🌿" },
    streak_kept: { emoji: "🔥", title: message || "Streak Kept Alive!", color: "#fb923c", particles: "🔥⚡🌟✨🪵" },
    streak_lost: { emoji: "💧", title: message || "Streak Broken", color: "#64748b", particles: "💧🌧️🍂", sad: true },
    low_score: { emoji: "🌧️", title: message || "Try Again, Brave One", color: "#475569", particles: "🌧️💧🍂", sad: true },
  };
  const cfg = configs[type];
  const particleChars = cfg.particles.match(/./gu) || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Particles */}
      {step >= 1 && particleChars.map((p, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
            animation: cfg.sad ? `sadParticle 1.8s ease-in forwards` : `milestoneParticle 1.5s ease-out forwards`,
            animationDelay: `${i * 0.1}s`,
            opacity: 0,
          }}
        >
          {p}
        </span>
      ))}

      {/* Center content */}
      <div
        className="flex flex-col items-center gap-3 transition-all duration-500"
        style={{
          transform: step >= 2 ? "scale(1)" : cfg.sad ? "scale(0.7)" : "scale(0.3)",
          opacity: step >= 2 ? 1 : 0,
          filter: cfg.sad ? "saturate(0.4)" : "none",
        }}
      >
        {cfg.useGuard ? (
          <div className="w-20 h-20 rounded-full overflow-hidden border-2" style={{ borderColor: cfg.color, boxShadow: `0 0 40px ${cfg.color}66` }}>
            <img src={glyphGuardImg} alt="Glyph-Guard" className="w-full h-full object-cover" />
          </div>
        ) : (
          <span className="text-5xl" style={{ filter: `drop-shadow(0 0 20px ${cfg.color})` }}>{cfg.emoji}</span>
        )}
        <p
          className="font-heading text-lg font-bold text-center px-4"
          style={{ color: cfg.color, textShadow: `0 0 20px ${cfg.color}66` }}
        >
          {cfg.title}
        </p>
        {step >= 3 && message && !["milestone", "streak_kept", "streak_lost", "low_score"].includes(type) && (
          <p className="font-body text-xs text-center" style={{ color: `${cfg.color}99` }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default MilestoneAnimation;
