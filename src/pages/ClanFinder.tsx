import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, ChevronRight, Lock, Unlock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { ritualQuestions, clans, ClanInfo } from "@/data/clanData";

type Phase = "intro" | "quiz" | "revealing" | "revealed" | "dashboard";

const ClanFinder = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ santhali: 0, gondi: 0, kurukh: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [assignedClan, setAssignedClan] = useState<ClanInfo | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [pathProgress, setPathProgress] = useState(0);

  // Check localStorage for existing clan
  useEffect(() => {
    const saved = localStorage.getItem("tribalClan");
    if (saved && clans[saved]) {
      setAssignedClan(clans[saved]);
      setPhase("dashboard");
      setPathProgress(100);
    }
  }, []);

  const handleAnswer = useCallback((optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    const option = ritualQuestions[currentQ].options[optionIdx];
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([k, v]) => { newScores[k] += v; });
    setScores(newScores);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < ritualQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // Determine clan
        const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
        const clan = clans[winner];
        setAssignedClan(clan);
        localStorage.setItem("tribalClan", winner);
        setPhase("revealing");
      }
    }, 600);
  }, [currentQ, scores, selectedOption]);

  // Reveal animation sequence
  useEffect(() => {
    if (phase !== "revealing") return;
    const timers = [
      setTimeout(() => setRevealStep(1), 500),
      setTimeout(() => setRevealStep(2), 1500),
      setTimeout(() => setRevealStep(3), 2500),
      setTimeout(() => setRevealStep(4), 3500),
      setTimeout(() => setPhase("revealed"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Path unlock animation on dashboard
  useEffect(() => {
    if (phase !== "dashboard") return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setPathProgress(Math.min(progress, 100));
      if (progress >= 100) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  const resetClan = () => {
    localStorage.removeItem("tribalClan");
    setAssignedClan(null);
    setPhase("intro");
    setCurrentQ(0);
    setScores({ santhali: 0, gondi: 0, kurukh: 0 });
    setPathProgress(0);
    setRevealStep(0);
  };

  return (
    <div className="min-h-screen pb-24 bg-[#0a0a0a] overflow-hidden relative">
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* INTRO PHASE */}
      {phase === "intro" && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <button onClick={() => navigate(-1)} className="absolute top-6 left-4 text-emerald-400/70">
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="animate-fade-in-up text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-900/20 animate-float">
              <Sparkles className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="font-heading text-3xl text-emerald-100 tracking-wide">
              The Clan Ritual
            </h1>
            <p className="font-body text-emerald-300/70 text-sm max-w-xs mx-auto leading-relaxed">
              The ancient spirits will guide you through five sacred questions. 
              Answer with your heart — your clan awaits.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="mt-8 px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase
                bg-gradient-to-r from-emerald-700 to-emerald-600 text-emerald-100
                shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]
                transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ minHeight: 65 }}
            >
              Begin the Ritual
            </button>
          </div>
        </div>
      )}

      {/* QUIZ PHASE */}
      {phase === "quiz" && (
        <div className="relative z-10 flex flex-col min-h-screen px-5 pt-12 pb-28">
          {/* Progress stones */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {ritualQuestions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i < currentQ ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                  : i === currentQ ? "bg-emerald-500 scale-125 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  : "bg-emerald-900/40"
                }`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
            <p className="text-emerald-500/50 text-xs font-body uppercase tracking-[0.3em] mb-4">
              Question {currentQ + 1} of {ritualQuestions.length}
            </p>
            <h2
              key={currentQ}
              className="font-heading text-xl text-emerald-100 text-center leading-relaxed mb-10 animate-fade-in-up"
            >
              "{ritualQuestions[currentQ].question}"
            </h2>

            <div className="w-full space-y-3">
              {ritualQuestions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl font-body text-sm transition-all duration-300
                    border border-emerald-800/30 backdrop-blur-sm
                    ${selectedOption === i
                      ? "bg-emerald-600/40 border-emerald-400 text-emerald-100 scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : selectedOption !== null
                        ? "bg-emerald-950/20 text-emerald-600/50"
                        : "bg-emerald-950/30 text-emerald-200/80 hover:bg-emerald-900/40 hover:border-emerald-600/50 active:scale-[0.98]"
                    }`}
                  style={{ minHeight: 65 }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full border border-emerald-700/50 flex items-center justify-center text-xs text-emerald-500/70 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVEALING PHASE */}
      {phase === "revealing" && assignedClan && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <div className="text-center space-y-6">
            {revealStep >= 1 && (
              <p className="font-body text-emerald-500/60 text-sm animate-fade-in-up tracking-widest uppercase">
                The spirits have spoken...
              </p>
            )}
            {revealStep >= 2 && (
              <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center text-5xl animate-fade-in-up"
                style={{
                  background: `radial-gradient(circle, ${assignedClan.color}44, transparent)`,
                  boxShadow: `0 0 60px ${assignedClan.color}33`,
                }}
              >
                {assignedClan.spiritAnimalEmoji}
              </div>
            )}
            {revealStep >= 3 && (
              <h1 className="font-heading text-3xl tracking-wide animate-fade-in-up"
                style={{ color: assignedClan.accentColor }}
              >
                {assignedClan.name}
              </h1>
            )}
            {revealStep >= 4 && (
              <p className="font-body text-sm italic animate-fade-in-up" style={{ color: `${assignedClan.accentColor}99` }}>
                "{assignedClan.motto}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* REVEALED PHASE — Identity Card */}
      {phase === "revealed" && assignedClan && (
        <div className="relative z-10 flex flex-col items-center min-h-screen px-5 pt-10 pb-28">
          <div className="animate-fade-in-up w-full max-w-sm space-y-6">
            {/* Clan Card */}
            <div
              className="rounded-2xl p-6 space-y-4 border"
              style={{
                background: `linear-gradient(145deg, ${assignedClan.color}22, ${assignedClan.color}0a)`,
                borderColor: `${assignedClan.color}44`,
                boxShadow: `0 8px 40px ${assignedClan.color}15`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: `${assignedClan.color}33` }}
                >
                  {assignedClan.spiritAnimalEmoji}
                </div>
                <div>
                  <h2 className="font-heading text-lg" style={{ color: assignedClan.accentColor }}>
                    {assignedClan.name}
                  </h2>
                  <p className="font-body text-xs text-emerald-400/60">{assignedClan.language} · {assignedClan.territory}</p>
                </div>
              </div>
              <p className="font-body text-xs leading-relaxed text-emerald-200/60">
                {assignedClan.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400/50 font-body">
                <span>Spirit Animal:</span>
                <span className="font-semibold text-emerald-300">{assignedClan.spiritAnimal} {assignedClan.spiritAnimalEmoji}</span>
              </div>
            </div>

            {/* Starter Words */}
            <div className="space-y-2">
              <h3 className="font-heading text-sm text-emerald-300/80">Your First Words</h3>
              {assignedClan.starterWords.map((w, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-emerald-950/40 border border-emerald-800/20 px-4 py-3">
                  <span className="font-heading text-lg text-emerald-200">{w.word}</span>
                  <span className="font-body text-xs text-emerald-500/60">/{w.pronunciation}/</span>
                  <span className="ml-auto font-body text-xs text-emerald-400/70">{w.meaning}</span>
                </div>
              ))}
            </div>

            {/* Enter Clan */}
            <button
              onClick={() => setPhase("dashboard")}
              className="w-full py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase
                transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${assignedClan.color}, ${assignedClan.color}cc)`,
                color: assignedClan.accentColor,
                boxShadow: `0 0 30px ${assignedClan.color}33`,
                minHeight: 65,
              }}
            >
              Enter Your Clan House →
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD PHASE — Forest Path */}
      {phase === "dashboard" && assignedClan && (
        <div className="relative z-10 min-h-screen px-5 pt-8 pb-28">
          <div className="mx-auto max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-body text-xs uppercase tracking-widest" style={{ color: `${assignedClan.accentColor}88` }}>
                  Your Clan
                </p>
                <h1 className="font-heading text-xl" style={{ color: assignedClan.accentColor }}>
                  {assignedClan.name}
                </h1>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${assignedClan.color}33` }}
              >
                {assignedClan.spiritAnimalEmoji}
              </div>
            </div>

            {/* Forest Path SVG */}
            <div className="relative rounded-2xl overflow-hidden mb-6 border border-emerald-800/20"
              style={{ height: 360, background: "linear-gradient(180deg, #0a1a0f 0%, #0d1f14 50%, #0a150e 100%)" }}
            >
              {/* Tree silhouettes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice">
                {/* Background trees */}
                {[40, 100, 160, 240, 300, 360].map((x, i) => (
                  <g key={i} opacity={0.15 + (i % 3) * 0.05}>
                    <polygon points={`${x},${280 - i * 15} ${x - 20},${320} ${x + 20},${320}`} fill="#1a5a2a" />
                    <polygon points={`${x},${260 - i * 15} ${x - 15},${290 - i * 15} ${x + 15},${290 - i * 15}`} fill="#1a5a2a" />
                  </g>
                ))}

                {/* The path — black to green transition */}
                <defs>
                  <linearGradient id="pathGrad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset={`${pathProgress}%`} stopColor={assignedClan.color} />
                    <stop offset={`${Math.min(pathProgress + 5, 100)}%`} stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Path curve */}
                <path
                  d="M200,340 C200,300 180,260 190,220 C200,180 220,160 200,120 C180,80 200,40 200,20"
                  stroke="url(#pathGrad)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />

                {/* Path dots */}
                {[
                  { cx: 200, cy: 330, label: "Clan House", unlocked: true },
                  { cx: 190, cy: 250, label: "Quests", unlocked: pathProgress > 30 },
                  { cx: 205, cy: 170, label: "Clan War", unlocked: pathProgress > 60 },
                  { cx: 195, cy: 80, label: "Elder Chamber", unlocked: pathProgress > 90 },
                ].map((node, i) => (
                  <g key={i}>
                    <circle
                      cx={node.cx} cy={node.cy} r={node.unlocked ? 12 : 8}
                      fill={node.unlocked ? assignedClan.color : "#1a1a1a"}
                      stroke={node.unlocked ? assignedClan.accentColor : "#333"}
                      strokeWidth={2}
                    />
                    {node.unlocked && (
                      <circle cx={node.cx} cy={node.cy} r={4} fill={assignedClan.accentColor} />
                    )}
                  </g>
                ))}

                {/* Fireflies on unlocked path */}
                {pathProgress > 20 && [...Array(6)].map((_, i) => (
                  <circle
                    key={i}
                    cx={185 + Math.sin(i * 1.2) * 30}
                    cy={320 - (i * 50)}
                    r={1.5}
                    fill="#7dffb3"
                    opacity={pathProgress > (i * 16) ? 0.7 : 0}
                  >
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </svg>

              {/* Node labels */}
              {[
                { x: "58%", y: "88%", label: "Clan House", icon: "🏠", unlocked: true },
                { x: "58%", y: "66%", label: "Quests", icon: "⚔️", unlocked: pathProgress > 30 },
                { x: "60%", y: "44%", label: "Clan War", icon: "🔥", unlocked: pathProgress > 60 },
                { x: "58%", y: "19%", label: "Elder Chamber", icon: "👁️", unlocked: pathProgress > 90 },
              ].map((node, i) => (
                <div
                  key={i}
                  className="absolute flex items-center gap-2 font-body text-xs"
                  style={{ left: node.x, top: node.y, transform: "translateY(-50%)" }}
                >
                  <span>{node.icon}</span>
                  <span className={node.unlocked ? "text-emerald-300" : "text-emerald-800/40"}>
                    {node.label}
                  </span>
                  {!node.unlocked && <Lock className="w-3 h-3 text-emerald-800/30" />}
                  {node.unlocked && <Unlock className="w-3 h-3 text-emerald-500/50" />}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/learn/${assignedClan.languageId}`)}
                className="w-full flex items-center gap-4 rounded-xl bg-emerald-950/40 border border-emerald-800/20 p-4 transition-all hover:bg-emerald-900/30 active:scale-[0.98]"
                style={{ minHeight: 65 }}
              >
                <span className="text-2xl">📖</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm text-emerald-200">Learn {assignedClan.language}</p>
                  <p className="font-body text-xs text-emerald-500/60">Start your clan's language journey</p>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => navigate(`/quiz/${assignedClan.languageId}`)}
                className="w-full flex items-center gap-4 rounded-xl bg-emerald-950/40 border border-emerald-800/20 p-4 transition-all hover:bg-emerald-900/30 active:scale-[0.98]"
                style={{ minHeight: 65 }}
              >
                <span className="text-2xl">⚔️</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm text-emerald-200">Clan Quests</p>
                  <p className="font-body text-xs text-emerald-500/60">Test your skills in battle</p>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => navigate(`/folkvault/${assignedClan.languageId}`)}
                className="w-full flex items-center gap-4 rounded-xl bg-emerald-950/40 border border-emerald-800/20 p-4 transition-all hover:bg-emerald-900/30 active:scale-[0.98]"
                style={{ minHeight: 65 }}
              >
                <span className="text-2xl">📜</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm text-emerald-200">Clan Stories</p>
                  <p className="font-body text-xs text-emerald-500/60">Tales of your people</p>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>

              {/* Retake quiz */}
              <button
                onClick={resetClan}
                className="w-full text-center py-3 font-body text-xs text-emerald-700/50 hover:text-emerald-500/70 transition-colors"
              >
                Retake the Clan Ritual
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default ClanFinder;
