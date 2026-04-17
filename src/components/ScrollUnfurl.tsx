import { useEffect, useState } from "react";

interface Props {
  show: boolean;
  onComplete?: () => void;
  children: React.ReactNode;
  accentColor?: string;
}

/**
 * Parchment scroll unfurl animation.
 * Two rolled "rods" pull apart vertically, revealing the parchment + content.
 * Glyphs ignite around the borders during reveal.
 */
const ScrollUnfurl = ({ show, onComplete, children, accentColor = "#d4a76a" }: Props) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!show) { setStage(0); return; }
    const t1 = setTimeout(() => setStage(1), 100);   // scroll appears
    const t2 = setTimeout(() => setStage(2), 700);   // unfurls
    const t3 = setTimeout(() => setStage(3), 1800);  // glyphs ignite
    const t4 = setTimeout(() => setStage(4), 2700);  // content fully revealed
    const t5 = setTimeout(() => onComplete?.(), 4200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [show, onComplete]);

  if (!show) return null;

  const glyphs = ["◆", "◯", "▲", "✦", "❋", "⟁", "☾", "✺"];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-sm pointer-events-none">
      <div className="relative w-[88%] max-w-md">
        {/* Top rod */}
        <div
          className="absolute left-0 right-0 h-3 rounded-full transition-all duration-700 ease-out"
          style={{
            top: stage >= 2 ? "0%" : "50%",
            background: "linear-gradient(180deg, #6b4226, #3a2415)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
            transform: stage >= 1 ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            zIndex: 3,
          }}
        />
        {/* Bottom rod */}
        <div
          className="absolute left-0 right-0 h-3 rounded-full transition-all duration-700 ease-out"
          style={{
            bottom: stage >= 2 ? "0%" : "50%",
            background: "linear-gradient(0deg, #6b4226, #3a2415)",
            boxShadow: "0 -4px 12px rgba(0,0,0,0.6), inset 0 -1px 0 rgba(255,255,255,0.15)",
            transform: stage >= 1 ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            zIndex: 3,
          }}
        />

        {/* Parchment */}
        <div
          className="relative overflow-hidden transition-all duration-700 ease-out"
          style={{
            height: stage >= 2 ? "min(70vh, 480px)" : "0px",
            background: `
              radial-gradient(ellipse at top, rgba(212,167,106,0.12), transparent 70%),
              radial-gradient(ellipse at bottom, rgba(139,92,40,0.18), transparent 70%),
              linear-gradient(180deg, #f3e1bf 0%, #e8cf9a 50%, #d4b377 100%)
            `,
            boxShadow: stage >= 2
              ? `inset 0 0 60px rgba(101,67,33,0.45), 0 0 80px ${accentColor}55`
              : "none",
            border: stage >= 2 ? "1px solid #6b4226" : "none",
            borderRadius: "2px",
          }}
        >
          {/* Parchment texture grain */}
          {stage >= 2 && (
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(101,67,33,0.4) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(101,67,33,0.3) 0%, transparent 35%)",
              }}
            />
          )}

          {/* Igniting border glyphs */}
          {stage >= 3 && glyphs.map((g, i) => {
            const positions = [
              { top: "8%", left: "10%" }, { top: "8%", right: "10%" },
              { bottom: "8%", left: "10%" }, { bottom: "8%", right: "10%" },
              { top: "50%", left: "5%" }, { top: "50%", right: "5%" },
              { top: "8%", left: "50%" }, { bottom: "8%", left: "50%" },
            ][i];
            return (
              <span
                key={i}
                className="absolute font-heading text-lg"
                style={{
                  ...positions,
                  color: accentColor,
                  textShadow: `0 0 12px ${accentColor}, 0 0 24px ${accentColor}88`,
                  animation: `glyphIgnite 0.6s ease-out ${i * 0.08}s forwards`,
                  opacity: 0,
                }}
              >
                {g}
              </span>
            );
          })}

          {/* Content */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 transition-opacity duration-700"
            style={{ opacity: stage >= 4 ? 1 : 0 }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollUnfurl;
