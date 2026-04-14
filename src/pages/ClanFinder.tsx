import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, ChevronRight, Lock, Unlock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { ritualQuestions, clans, ClanInfo } from "@/data/clanData";
import { useLearnedItems } from "@/hooks/useLearnedItems";
import { categories } from "@/data/languages";
import { allWords } from "@/data/allWords";
import { santhaliSentences, gondiSentences, kurukhSentences } from "@/data/sentences";
import { santhaliAlphabets, gondiAlphabets, kurukhAlphabets } from "@/data/alphabets";

type Phase = "intro" | "quiz" | "revealing" | "revealed" | "dashboard";

const sentenceCounts: Record<string, number> = {
  santhali: santhaliSentences.length,
  gondi: gondiSentences.length,
  kurukh: kurukhSentences.length,
};
const alphabetCounts: Record<string, number> = {
  santhali: santhaliAlphabets.length,
  gondi: gondiAlphabets.length,
  kurukh: kurukhAlphabets.length,
};

const ClanFinder = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ santhali: 0, gondi: 0, kurukh: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [assignedClan, setAssignedClan] = useState<ClanInfo | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const { getLanguageProgress, totalLearned } = useLearnedItems();

  useEffect(() => {
    const saved = localStorage.getItem("tribalClan");
    if (saved && clans[saved]) {
      setAssignedClan(clans[saved]);
      setPhase("dashboard");
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
        const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
        const clan = clans[winner];
        setAssignedClan(clan);
        localStorage.setItem("tribalClan", winner);
        setPhase("revealing");
      }
    }, 600);
  }, [currentQ, scores, selectedOption]);

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

  const resetClan = () => {
    localStorage.removeItem("tribalClan");
    setAssignedClan(null);
    setPhase("intro");
    setCurrentQ(0);
    setScores({ santhali: 0, gondi: 0, kurukh: 0 });
    setRevealStep(0);
  };

  // Compute real progress for the forest path
  const progressData = useMemo(() => {
    if (!assignedClan) return { totalItems: 0, learnedItems: 0, percent: 0, categoriesComplete: 0, totalCategories: 0, sentencesDone: 0, totalSentences: 0, lettersDone: 0, totalLetters: 0 };
    const langId = assignedClan.languageId;
    const langWords = allWords[langId] || {};
    let totalWords = 0;
    let learnedWords = 0;
    let categoriesComplete = 0;

    categories.forEach(cat => {
      const catWords = langWords[cat.id] || [];
      totalWords += catWords.length;
      let catLearned = 0;
      catWords.forEach(w => {
        const id = `${langId}-word-${w.id}`;
        if (localStorage.getItem("tribalLingua_learnedItems")) {
          try {
            const items: string[] = JSON.parse(localStorage.getItem("tribalLingua_learnedItems") || "[]");
            if (items.includes(id)) { learnedWords++; catLearned++; }
          } catch { /* */ }
        }
      });
      if (catWords.length > 0 && catLearned === catWords.length) categoriesComplete++;
    });

    // Count sentences
    const totalSentences = sentenceCounts[langId] || 0;
    let sentencesDone = 0;
    try {
      const items: string[] = JSON.parse(localStorage.getItem("tribalLingua_learnedItems") || "[]");
      sentencesDone = items.filter(id => id.startsWith(`${langId}-sentence-`)).length;
    } catch { /* */ }

    // Count letters
    const totalLetters = alphabetCounts[langId] || 0;
    let lettersDone = 0;
    try {
      const items: string[] = JSON.parse(localStorage.getItem("tribalLingua_learnedItems") || "[]");
      lettersDone = items.filter(id => id.startsWith(`${langId}-letter-`)).length;
    } catch { /* */ }

    const totalItems = totalWords + totalSentences + totalLetters;
    const learnedItems = learnedWords + sentencesDone + lettersDone;
    const percent = totalItems > 0 ? Math.round((learnedItems / totalItems) * 100) : 0;

    return { totalItems, learnedItems, percent, categoriesComplete, totalCategories: categories.length, sentencesDone, totalSentences, lettersDone, totalLetters };
  }, [assignedClan, totalLearned]);

  // Milestone thresholds for unlocking path nodes
  const houseUnlocked = true; // always
  const questsUnlocked = progressData.percent >= 10;
  const warUnlocked = progressData.percent >= 40;
  const elderUnlocked = progressData.percent >= 75;

  return (
    <div className="min-h-screen pb-24 overflow-hidden relative" style={{ background: "#060d08" }}>
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: progressData.percent > 20 ? "#4ade80" : "#1a1a1a",
              opacity: progressData.percent > 20 ? 0.3 + Math.random() * 0.3 : 0.1,
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
          <button onClick={() => navigate(-1)} className="absolute top-6 left-4" style={{ color: "#4ade8088" }}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="animate-fade-in-up text-center space-y-6">
            <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center animate-float"
              style={{ border: "2px solid #22c55e33", background: "radial-gradient(circle, #14532d22, transparent)" }}>
              <Sparkles className="w-12 h-12" style={{ color: "#4ade80" }} />
            </div>
            <h1 className="font-heading text-3xl tracking-wide" style={{ color: "#d1fae5" }}>
              The Clan Ritual
            </h1>
            <p className="font-body text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "#4ade8066" }}>
              The ancient spirits will guide you through five sacred questions. Answer with your heart — your clan awaits.
            </p>
            <button
              onClick={() => setPhase("quiz")}
              className="mt-8 px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #166534, #15803d)",
                color: "#d1fae5",
                boxShadow: "0 0 40px #22c55e22",
                minHeight: 65,
              }}
            >
              Begin the Ritual
            </button>
          </div>
        </div>
      )}

      {/* QUIZ PHASE */}
      {phase === "quiz" && (
        <div className="relative z-10 flex flex-col min-h-screen px-5 pt-12 pb-28">
          <div className="flex items-center justify-center gap-3 mb-10">
            {ritualQuestions.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-500"
                style={{
                  width: i === currentQ ? 14 : 10,
                  height: i === currentQ ? 14 : 10,
                  background: i < currentQ ? "#4ade80" : i === currentQ ? "#22c55e" : "#1a2e1f",
                  boxShadow: i <= currentQ ? "0 0 8px #22c55e44" : "none",
                }}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
            <p className="text-xs font-body uppercase tracking-[0.3em] mb-4" style={{ color: "#22c55e55" }}>
              Question {currentQ + 1} of {ritualQuestions.length}
            </p>
            <h2 key={currentQ} className="font-heading text-xl text-center leading-relaxed mb-10 animate-fade-in-up" style={{ color: "#d1fae5" }}>
              "{ritualQuestions[currentQ].question}"
            </h2>
            <div className="w-full space-y-3">
              {ritualQuestions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedOption !== null}
                  className="w-full text-left px-5 py-4 rounded-xl font-body text-sm transition-all duration-300"
                  style={{
                    border: `1px solid ${selectedOption === i ? "#22c55e" : "#1a2e1f"}`,
                    background: selectedOption === i ? "#166534aa" : selectedOption !== null ? "#0a0a0a" : "#0d1f1166",
                    color: selectedOption === i ? "#d1fae5" : selectedOption !== null ? "#1a2e1f" : "#86efac99",
                    boxShadow: selectedOption === i ? "0 0 20px #22c55e33" : "none",
                    minHeight: 65,
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
                      style={{ border: "1px solid #1a3a22", color: "#22c55e77" }}>
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
              <p className="font-body text-sm animate-fade-in-up tracking-widest uppercase" style={{ color: "#22c55e66" }}>
                The spirits have spoken...
              </p>
            )}
            {revealStep >= 2 && (
              <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl animate-fade-in-up"
                style={{ background: `radial-gradient(circle, ${assignedClan.color}66, transparent)`, boxShadow: `0 0 80px ${assignedClan.color}44` }}>
                {assignedClan.spiritAnimalEmoji}
              </div>
            )}
            {revealStep >= 3 && (
              <h1 className="font-heading text-3xl tracking-wide animate-fade-in-up" style={{ color: assignedClan.accentColor }}>
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
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: `linear-gradient(145deg, ${assignedClan.color}22, ${assignedClan.color}0a)`, border: `1px solid ${assignedClan.color}44`, boxShadow: `0 8px 40px ${assignedClan.color}15` }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${assignedClan.color}33` }}>
                  {assignedClan.spiritAnimalEmoji}
                </div>
                <div>
                  <h2 className="font-heading text-lg" style={{ color: assignedClan.accentColor }}>{assignedClan.name}</h2>
                  <p className="font-body text-xs" style={{ color: "#4ade8066" }}>{assignedClan.language} · {assignedClan.territory}</p>
                </div>
              </div>
              <p className="font-body text-xs leading-relaxed" style={{ color: "#d1fae566" }}>{assignedClan.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-sm" style={{ color: "#86efac99" }}>Your First Words</h3>
              {assignedClan.starterWords.map((w, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#0d1f1166", border: "1px solid #1a2e1f" }}>
                  <span className="font-heading text-lg" style={{ color: "#d1fae5" }}>{w.word}</span>
                  <span className="font-body text-xs" style={{ color: "#22c55e66" }}>/{w.pronunciation}/</span>
                  <span className="ml-auto font-body text-xs" style={{ color: "#4ade8088" }}>{w.meaning}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("dashboard")}
              className="w-full py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ background: `linear-gradient(135deg, ${assignedClan.color}, ${assignedClan.color}cc)`, color: assignedClan.accentColor, boxShadow: `0 0 30px ${assignedClan.color}33`, minHeight: 65 }}
            >
              Enter Your Clan House →
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD PHASE — Immersive Forest */}
      {phase === "dashboard" && assignedClan && (
        <div className="relative z-10 min-h-screen px-5 pt-8 pb-28">
          <div className="mx-auto max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: `${assignedClan.accentColor}66` }}>Your Clan</p>
                <h1 className="font-heading text-xl" style={{ color: assignedClan.accentColor }}>{assignedClan.name}</h1>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${assignedClan.color}33` }}>
                {assignedClan.spiritAnimalEmoji}
              </div>
            </div>

            {/* Progress summary */}
            <div className="rounded-xl px-4 py-3 mb-4 flex items-center gap-3" style={{ background: "#0d1f1166", border: "1px solid #1a2e1f" }}>
              <div className="flex-1">
                <p className="font-body text-xs" style={{ color: "#86efac88" }}>
                  {progressData.learnedItems} / {progressData.totalItems} items learned
                </p>
                <div className="h-2 rounded-full mt-1.5 overflow-hidden" style={{ background: "#1a2e1f" }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progressData.percent}%`, background: `linear-gradient(90deg, ${assignedClan.color}, ${assignedClan.accentColor})` }} />
                </div>
              </div>
              <span className="font-heading text-lg" style={{ color: assignedClan.accentColor }}>{progressData.percent}%</span>
            </div>

            {/* THE FOREST PATH — Full immersive SVG */}
            <div className="relative rounded-2xl overflow-hidden mb-5" style={{ height: 440, border: "1px solid #1a2e1f" }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice">
                {/* Dark soil / ground gradient */}
                <defs>
                  <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#030a05" />
                    <stop offset="100%" stopColor="#0a1a0f" />
                  </linearGradient>
                  <linearGradient id="forestReveal" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor={progressData.percent > 5 ? "#0d3320" : "#0a0a0a"} />
                    <stop offset={`${Math.min(progressData.percent, 100)}%`} stopColor={progressData.percent > 5 ? "#166534" : "#0a0a0a"} />
                    <stop offset={`${Math.min(progressData.percent + 3, 100)}%`} stopColor="#0a0a0a" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                  <filter id="treeglow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={assignedClan.accentColor} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={assignedClan.accentColor} stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="400" height="440" fill="url(#groundGrad)" />

                {/* Tree silhouettes — dark when locked, green when unlocked */}
                {[
                  { x: 30, h: 80, base: 400 }, { x: 70, h: 100, base: 390 }, { x: 120, h: 60, base: 410 },
                  { x: 330, h: 90, base: 395 }, { x: 370, h: 70, base: 405 }, { x: 280, h: 85, base: 398 },
                  { x: 50, h: 75, base: 300 }, { x: 350, h: 65, base: 310 },
                  { x: 40, h: 70, base: 200 }, { x: 360, h: 80, base: 210 },
                  { x: 60, h: 90, base: 100 }, { x: 340, h: 75, base: 110 },
                  { x: 30, h: 60, base: 50 }, { x: 370, h: 70, base: 40 },
                ].map((tree, i) => {
                  const treeProgress = ((440 - tree.base) / 440) * 100;
                  const isGreen = treeProgress < progressData.percent;
                  return (
                    <g key={i}>
                      {/* Trunk */}
                      <rect x={tree.x - 3} y={tree.base - tree.h * 0.3} width={6} height={tree.h * 0.3} fill={isGreen ? "#1a3a22" : "#111"} />
                      {/* Canopy layers */}
                      <polygon
                        points={`${tree.x},${tree.base - tree.h} ${tree.x - tree.h * 0.35},${tree.base - tree.h * 0.3} ${tree.x + tree.h * 0.35},${tree.base - tree.h * 0.3}`}
                        fill={isGreen ? "#14532d" : "#0d0d0d"}
                        opacity={isGreen ? 0.8 : 0.3}
                      />
                      <polygon
                        points={`${tree.x},${tree.base - tree.h * 0.8} ${tree.x - tree.h * 0.28},${tree.base - tree.h * 0.35} ${tree.x + tree.h * 0.28},${tree.base - tree.h * 0.35}`}
                        fill={isGreen ? "#166534" : "#111"}
                        opacity={isGreen ? 0.7 : 0.2}
                      />
                    </g>
                  );
                })}

                {/* Main path — S-curve from bottom to top */}
                <path
                  d="M200,430 C160,380 240,340 200,300 C160,260 240,220 200,180 C160,140 240,100 200,60 C180,30 200,10 200,10"
                  stroke="url(#forestReveal)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  filter="url(#treeglow)"
                />
                {/* Path border glow */}
                <path
                  d="M200,430 C160,380 240,340 200,300 C160,260 240,220 200,180 C160,140 240,100 200,60 C180,30 200,10 200,10"
                  stroke={assignedClan.color}
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.15}
                />

                {/* Path nodes */}
                {[
                  { cx: 200, cy: 410, unlocked: houseUnlocked },
                  { cx: 220, cy: 300, unlocked: questsUnlocked },
                  { cx: 180, cy: 190, unlocked: warUnlocked },
                  { cx: 200, cy: 50, unlocked: elderUnlocked },
                ].map((node, i) => (
                  <g key={i}>
                    {node.unlocked && <circle cx={node.cx} cy={node.cy} r={24} fill="url(#nodeGlow)" />}
                    <circle
                      cx={node.cx} cy={node.cy}
                      r={node.unlocked ? 14 : 10}
                      fill={node.unlocked ? assignedClan.color : "#111"}
                      stroke={node.unlocked ? assignedClan.accentColor : "#222"}
                      strokeWidth={node.unlocked ? 2.5 : 1.5}
                    />
                    {node.unlocked && (
                      <circle cx={node.cx} cy={node.cy} r={5} fill={assignedClan.accentColor}>
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                ))}

                {/* Fireflies scattered on unlocked area */}
                {progressData.percent > 5 && [...Array(12)].map((_, i) => {
                  const fy = 430 - (i * 35);
                  const fx = 100 + Math.sin(i * 1.7) * 100 + Math.random() * 60;
                  const visible = ((440 - fy) / 440) * 100 < progressData.percent;
                  if (!visible) return null;
                  return (
                    <circle key={i} cx={fx} cy={fy} r={1.5} fill="#7dffb3" opacity={0.5}>
                      <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2 + (i % 4)}s`} repeatCount="indefinite" />
                      <animate attributeName="cy" values={`${fy};${fy - 3};${fy}`} dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />
                    </circle>
                  );
                })}
              </svg>

              {/* Node labels overlay */}
              {[
                { x: "60%", y: "91%", label: "Clan House", icon: "🏠", unlocked: houseUnlocked, desc: "Your home base" },
                { x: "62%", y: "66%", label: "Quests", icon: "⚔️", unlocked: questsUnlocked, desc: "10% to unlock" },
                { x: "14%", y: "41%", label: "Clan War", icon: "🔥", unlocked: warUnlocked, desc: "40% to unlock" },
                { x: "58%", y: "9%", label: "Elder Chamber", icon: "👁️", unlocked: elderUnlocked, desc: "75% to unlock" },
              ].map((node, i) => (
                <div
                  key={i}
                  className="absolute flex items-center gap-1.5 font-body"
                  style={{ left: node.x, top: node.y, transform: "translateY(-50%)" }}
                >
                  <span className="text-base">{node.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: node.unlocked ? "#d1fae5" : "#1a2e1f" }}>
                      {node.label}
                    </p>
                    {!node.unlocked && (
                      <p className="text-[9px] flex items-center gap-0.5" style={{ color: "#1a3a2266" }}>
                        <Lock className="w-2.5 h-2.5" /> {node.desc}
                      </p>
                    )}
                    {node.unlocked && (
                      <p className="text-[9px] flex items-center gap-0.5" style={{ color: "#22c55e66" }}>
                        <Unlock className="w-2.5 h-2.5" /> Unlocked
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={() => navigate(`/learn/${assignedClan.languageId}`)}
                className="w-full flex items-center gap-4 rounded-xl p-4 transition-all active:scale-[0.98]"
                style={{ background: "#0d1f1166", border: "1px solid #1a2e1f", minHeight: 65 }}
              >
                <span className="text-2xl">📖</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm" style={{ color: "#d1fae5" }}>Learn {assignedClan.language}</p>
                  <p className="font-body text-xs" style={{ color: "#22c55e55" }}>
                    Words · Letters · Phrases
                  </p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: "#166534" }} />
              </button>

              <button
                onClick={() => navigate(`/quiz/${assignedClan.languageId}`)}
                className={`w-full flex items-center gap-4 rounded-xl p-4 transition-all ${questsUnlocked ? "active:scale-[0.98]" : "opacity-40"}`}
                style={{ background: "#0d1f1166", border: "1px solid #1a2e1f", minHeight: 65 }}
                disabled={!questsUnlocked}
              >
                <span className="text-2xl">⚔️</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm" style={{ color: questsUnlocked ? "#d1fae5" : "#1a2e1f" }}>Clan Quests</p>
                  <p className="font-body text-xs" style={{ color: "#22c55e55" }}>
                    {questsUnlocked ? "Test your skills" : "Learn 10% to unlock"}
                  </p>
                </div>
                {questsUnlocked ? <ChevronRight className="w-4 h-4" style={{ color: "#166534" }} /> : <Lock className="w-4 h-4" style={{ color: "#1a2e1f" }} />}
              </button>

              <button
                onClick={() => navigate(`/folkvault/${assignedClan.languageId}`)}
                className="w-full flex items-center gap-4 rounded-xl p-4 transition-all active:scale-[0.98]"
                style={{ background: "#0d1f1166", border: "1px solid #1a2e1f", minHeight: 65 }}
              >
                <span className="text-2xl">📜</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm" style={{ color: "#d1fae5" }}>Clan Stories</p>
                  <p className="font-body text-xs" style={{ color: "#22c55e55" }}>Tales of your people</p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: "#166534" }} />
              </button>

              <button
                onClick={resetClan}
                className="w-full text-center py-3 font-body text-xs transition-colors"
                style={{ color: "#1a3a2266" }}
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
