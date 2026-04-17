import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, ChevronRight, Lock, Unlock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MilestoneAnimation from "@/components/MilestoneAnimation";
import { ritualQuestions, clans, ClanInfo } from "@/data/clanData";
import { useLearnedItems } from "@/hooks/useLearnedItems";
import { categories } from "@/data/languages";
import { allWords } from "@/data/allWords";
import { santhaliSentences, gondiSentences, kurukhSentences, todaSentences } from "@/data/sentences";
import { santhaliAlphabets, gondiAlphabets, kurukhAlphabets, todaAlphabets } from "@/data/alphabets";
import { playScrollSound, playUnlockSound, playFireSound, playTapSound } from "@/utils/soundEffects";
import tribalVillageImg from "@/assets/tribal-village.jpg";
import ScrollUnfurl from "@/components/ScrollUnfurl";

type Phase = "intro" | "quiz" | "revealing" | "revealed" | "dashboard";

const sentenceCounts: Record<string, number> = {
  santhali: santhaliSentences.length,
  gondi: gondiSentences.length,
  kurukh: kurukhSentences.length,
  toda: todaSentences.length,
};
const alphabetCounts: Record<string, number> = {
  santhali: santhaliAlphabets.length,
  gondi: gondiAlphabets.length,
  kurukh: kurukhAlphabets.length,
  toda: todaAlphabets.length,
};

const ClanFinder = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ santhali: 0, gondi: 0, kurukh: 0, toda: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [assignedClan, setAssignedClan] = useState<ClanInfo | null>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [milestoneAnim, setMilestoneAnim] = useState<{ show: boolean; type: "milestone"; message: string }>({ show: false, type: "milestone", message: "" });
  const { totalLearned } = useLearnedItems();
  // Track previously unlocked milestones
  const [prevUnlocks, setPrevUnlocks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("tribalClan");
    if (saved && clans[saved]) {
      setAssignedClan(clans[saved]);
      setPhase("dashboard");
    }
    // Load previously unlocked milestones
    try {
      const unlocks = JSON.parse(localStorage.getItem("tribalClanUnlocks") || "{}");
      setPrevUnlocks(unlocks);
    } catch { /* */ }
  }, []);

  const handleAnswer = useCallback((optionIdx: number) => {
    if (selectedOption !== null) return;
    playTapSound();
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
        playScrollSound();
        setPhase("revealing");
      }
    }, 600);
  }, [currentQ, scores, selectedOption]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timers = [
      setTimeout(() => setRevealStep(1), 500),
      setTimeout(() => { setRevealStep(2); playFireSound(); }, 1500),
      setTimeout(() => setRevealStep(3), 2500),
      setTimeout(() => { setRevealStep(4); playUnlockSound(); }, 3500),
      setTimeout(() => setPhase("revealed"), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const resetClan = () => {
    localStorage.removeItem("tribalClan");
    localStorage.removeItem("tribalClanUnlocks");
    setAssignedClan(null);
    setPhase("intro");
    setCurrentQ(0);
    setScores({ santhali: 0, gondi: 0, kurukh: 0, toda: 0 });
    setRevealStep(0);
    setPrevUnlocks({});
  };

  const progressData = useMemo(() => {
    if (!assignedClan) return { totalItems: 0, learnedItems: 0, percent: 0 };
    const langId = assignedClan.languageId;
    const langWords = allWords[langId] || {};
    let totalWords = 0, learnedWords = 0;

    try {
      const items: string[] = JSON.parse(localStorage.getItem("tribalLingua_learnedItems") || "[]");
      const itemSet = new Set(items);

      categories.forEach(cat => {
        const catWords = langWords[cat.id] || [];
        totalWords += catWords.length;
        catWords.forEach(w => { if (itemSet.has(`${langId}-word-${w.id}`)) learnedWords++; });
      });

      const totalSentences = sentenceCounts[langId] || 0;
      const sentencesDone = items.filter(id => id.startsWith(`${langId}-sentence-`)).length;
      const totalLetters = alphabetCounts[langId] || 0;
      const lettersDone = items.filter(id => id.startsWith(`${langId}-letter-`)).length;

      const totalItems = totalWords + totalSentences + totalLetters;
      const learnedItems = learnedWords + sentencesDone + lettersDone;
      return { totalItems, learnedItems, percent: totalItems > 0 ? Math.round((learnedItems / totalItems) * 100) : 0 };
    } catch {
      return { totalItems: 0, learnedItems: 0, percent: 0 };
    }
  }, [assignedClan, totalLearned]);

  const houseUnlocked = true;
  const questsUnlocked = progressData.percent >= 10 || prevUnlocks.quests;
  const warUnlocked = progressData.percent >= 40 || prevUnlocks.war;
  const elderUnlocked = progressData.percent >= 75 || prevUnlocks.elder;

  // Persist unlock state
  useEffect(() => {
    const unlocks: Record<string, boolean> = { ...prevUnlocks };
    let changed = false;
    if (questsUnlocked && !unlocks.quests) { unlocks.quests = true; changed = true; }
    if (warUnlocked && !unlocks.war) { unlocks.war = true; changed = true; }
    if (elderUnlocked && !unlocks.elder) { unlocks.elder = true; changed = true; }
    if (changed) {
      localStorage.setItem("tribalClanUnlocks", JSON.stringify(unlocks));
      setPrevUnlocks(unlocks);
      // Show milestone animation for new unlocks
      if (elderUnlocked && !prevUnlocks.elder) {
        playUnlockSound();
        setMilestoneAnim({ show: true, type: "milestone", message: "Elder Chamber Unlocked!" });
      } else if (warUnlocked && !prevUnlocks.war) {
        playUnlockSound();
        setMilestoneAnim({ show: true, type: "milestone", message: "Clan War Unlocked!" });
      } else if (questsUnlocked && !prevUnlocks.quests) {
        playUnlockSound();
        setMilestoneAnim({ show: true, type: "milestone", message: "Clan Quests Unlocked!" });
      }
    }
  }, [questsUnlocked, warUnlocked, elderUnlocked]);

  // Fog opacity based on progress (100% = fully fogged, 0% = clear)
  const fogOpacity = Math.max(0, 1 - progressData.percent / 100);

  return (
    <div className="min-h-screen pb-24 overflow-hidden relative" style={{ background: "#080f0a" }}>
      <MilestoneAnimation
        show={milestoneAnim.show}
        type={milestoneAnim.type}
        message={milestoneAnim.message}
        onComplete={() => setMilestoneAnim(p => ({ ...p, show: false }))}
      />

      {/* INTRO PHASE */}
      {phase === "intro" && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <button onClick={() => navigate(-1)} className="absolute top-6 left-4" style={{ color: "#4ade8088" }}>
            <ArrowLeft className="h-6 w-6" />
          </button>
          {/* Mountain backdrop */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-[60%]" style={{
              background: "linear-gradient(180deg, transparent 0%, #0a1a0f 30%, #0d2418 60%, #14532d22 100%)"
            }} />
            {/* Fog layers */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute w-full animate-fog-drift" style={{
                height: "80px",
                top: `${20 + i * 25}%`,
                background: `radial-gradient(ellipse at center, rgba(200,220,210,${0.08 - i * 0.02}), transparent 70%)`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 3}s`,
              }} />
            ))}
          </div>
          <div className="animate-fade-in-up text-center space-y-6 relative z-10">
            <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center animate-float"
              style={{ border: "2px solid #22c55e33", background: "radial-gradient(circle, #14532d33, transparent)", boxShadow: "0 0 60px #22c55e11" }}>
              <Sparkles className="w-12 h-12" style={{ color: "#4ade80" }} />
            </div>
            <h1 className="font-heading text-3xl tracking-wide" style={{ color: "#d1fae5" }}>
              The Clan Ritual
            </h1>
            <p className="font-body text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "#4ade8066" }}>
              The ancient spirits will guide you through five sacred questions. Answer with your heart — your clan awaits.
            </p>
            <button
              onClick={() => { setPhase("quiz"); playScrollSound(); }}
              className="mt-8 px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #166534, #15803d)",
                color: "#d1fae5",
                boxShadow: "0 0 40px #22c55e22, 0 4px 20px rgba(0,0,0,0.4)",
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
          {/* Fog background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-full animate-fog-drift" style={{
                height: "100px",
                top: `${i * 25}%`,
                background: `radial-gradient(ellipse at center, rgba(200,220,210,${0.06}), transparent 70%)`,
                animationDelay: `${i * 1.5}s`,
              }} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mb-10 relative z-10">
            {ritualQuestions.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-500"
                style={{
                  width: i === currentQ ? 14 : 10,
                  height: i === currentQ ? 14 : 10,
                  background: i < currentQ ? "#4ade80" : i === currentQ ? "#22c55e" : "#1a2e1f",
                  boxShadow: i <= currentQ ? "0 0 12px #22c55e44" : "none",
                }}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full relative z-10">
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
                    border: `1px solid ${selectedOption === i ? "#22c55e" : "#1a2e1f55"}`,
                    background: selectedOption === i
                      ? "linear-gradient(135deg, #166534aa, #14532daa)"
                      : selectedOption !== null ? "#0a0a0a44" : "linear-gradient(135deg, #0d1f1144, #0a1a0f44)",
                    color: selectedOption === i ? "#d1fae5" : selectedOption !== null ? "#1a2e1f" : "#86efac99",
                    boxShadow: selectedOption === i ? "0 0 30px #22c55e22" : "none",
                    backdropFilter: "blur(10px)",
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

      {/* REVEALING PHASE — Parchment scroll unfurls */}
      {phase === "revealing" && assignedClan && (
        <ScrollUnfurl show={true} accentColor={assignedClan.accentColor} onComplete={() => setPhase("revealed")}>
          <div className="text-center space-y-3">
            <p className="font-body text-[11px] tracking-[0.3em] uppercase" style={{ color: "#6b4226" }}>
              The spirits have spoken
            </p>
            <div className="text-5xl">{assignedClan.spiritAnimalEmoji}</div>
            <h1 className="font-heading text-2xl font-bold" style={{ color: "#3a2415" }}>
              {assignedClan.name}
            </h1>
            <p className="font-body text-xs italic" style={{ color: "#6b4226" }}>
              "{assignedClan.motto}"
            </p>
          </div>
        </ScrollUnfurl>
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
              onClick={() => { setPhase("dashboard"); playUnlockSound(); }}
              className="w-full py-4 rounded-xl font-heading text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ background: `linear-gradient(135deg, ${assignedClan.color}, ${assignedClan.color}cc)`, color: assignedClan.accentColor, boxShadow: `0 0 30px ${assignedClan.color}33`, minHeight: 65 }}
            >
              Enter Your Village →
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD PHASE — Foggy Tribal Village */}
      {phase === "dashboard" && assignedClan && (
        <div className="relative z-10 min-h-screen pb-28">
          {/* Village Map with fog overlay */}
          <div className="relative w-full" style={{ height: "55vh", minHeight: 380 }}>
            <img
              src={tribalVillageImg}
              alt="Tribal Village"
              className="w-full h-full object-cover"
              style={{ filter: `brightness(${0.6 + progressData.percent * 0.004})` }}
            />

            {/* Fog overlay — clears as user progresses */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `linear-gradient(180deg, 
                rgba(8,15,10,${fogOpacity * 0.95}) 0%,
                rgba(15,25,18,${fogOpacity * 0.85}) 30%,
                rgba(20,35,25,${fogOpacity * 0.7}) 60%,
                rgba(8,15,10,${fogOpacity * 0.9}) 100%)`,
            }} />

            {/* Animated fog wisps */}
            {fogOpacity > 0.1 && [...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full animate-fog-drift pointer-events-none" style={{
                height: "60px",
                top: `${10 + i * 18}%`,
                background: `radial-gradient(ellipse at center, rgba(180,200,190,${fogOpacity * 0.12}), transparent 60%)`,
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${10 + i * 3}s`,
              }} />
            ))}

            {/* Fireflies on revealed areas */}
            {progressData.percent > 5 && [...Array(10)].map((_, i) => (
              <div key={i} className="absolute rounded-full animate-glow-pulse pointer-events-none"
                style={{
                  width: "3px", height: "3px",
                  background: "#7dffb3",
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  opacity: (1 - fogOpacity) * 0.7,
                }}
              />
            ))}

            {/* Interactive village elements overlaid on the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central bonfire — always visible */}
              <button
                onClick={() => { navigate(`/learn/${assignedClan.languageId}`); playFireSound(); }}
                className="absolute text-3xl transition-transform hover:scale-125 active:scale-95"
                style={{ top: "45%", left: "50%", transform: "translate(-50%,-50%)", filter: `opacity(${Math.max(0.3, 1 - fogOpacity * 0.5)})` }}
                title="Learn"
              >
                🔥
              </button>

              {/* Village elements unlocked by progress */}
              {[
                { emoji: "🏠", label: "Clan House", top: "65%", left: "25%", unlocked: houseUnlocked, action: () => navigate(`/learn/${assignedClan.languageId}`) },
                { emoji: "⚔️", label: "Quests", top: "30%", left: "72%", unlocked: questsUnlocked, action: () => navigate(`/quiz/${assignedClan.languageId}`) },
                { emoji: "🏺", label: "Clan War", top: "20%", left: "28%", unlocked: warUnlocked, action: () => navigate(`/quiz/${assignedClan.languageId}`) },
                { emoji: "👁️", label: "Elder", top: "12%", left: "50%", unlocked: elderUnlocked, action: () => navigate("/elder") },
                { emoji: "📜", label: "Scrolls", top: "72%", left: "70%", unlocked: houseUnlocked, action: () => navigate(`/folkvault/${assignedClan.languageId}`) },
                { emoji: "🗿", label: "Stones", top: "55%", left: "18%", unlocked: progressData.percent >= 20, action: () => navigate(`/history/${assignedClan.languageId}`) },
              ].map((el, i) => (
                <button
                  key={i}
                  onClick={() => { if (el.unlocked) { playTapSound(); el.action(); } }}
                  className={`absolute text-2xl transition-all duration-300 ${el.unlocked ? "hover:scale-125 active:scale-95" : "grayscale opacity-20"}`}
                  style={{
                    top: el.top, left: el.left,
                    transform: "translate(-50%,-50%)",
                    filter: el.unlocked ? `drop-shadow(0 0 8px rgba(74,222,128,0.4))` : "none",
                  }}
                  disabled={!el.unlocked}
                  title={el.unlocked ? el.label : `${el.label} (Locked)`}
                >
                  {el.emoji}
                  <span className="block text-[8px] font-body font-semibold mt-0.5"
                    style={{ color: el.unlocked ? "#d1fae5" : "#1a2e1f" }}>
                    {el.label}
                  </span>
                  {!el.unlocked && <Lock className="w-3 h-3 mx-auto mt-0.5" style={{ color: "#1a3a22" }} />}
                </button>
              ))}
            </div>

            {/* Progress badge overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center gap-3 rounded-xl px-3 py-2"
              style={{ background: "rgba(8,15,10,0.85)", backdropFilter: "blur(10px)", border: "1px solid #1a2e1f" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: `${assignedClan.color}33` }}>
                {assignedClan.spiritAnimalEmoji}
              </div>
              <div className="flex-1">
                <p className="font-heading text-xs" style={{ color: "#d1fae5" }}>{assignedClan.name}</p>
                <div className="h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: "#1a2e1f" }}>
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${progressData.percent}%`, background: `linear-gradient(90deg, ${assignedClan.color}, ${assignedClan.accentColor})` }} />
                </div>
              </div>
              <span className="font-heading text-sm" style={{ color: assignedClan.accentColor }}>{progressData.percent}%</span>
            </div>
          </div>

          {/* Action buttons below the map */}
          <div className="px-5 pt-4 space-y-2 max-w-lg mx-auto">
            <p className="text-center font-body text-xs mb-2" style={{ color: "#4ade8066" }}>
              {fogOpacity > 0.5 ? "🌫️ Learn words to clear the fog and reveal the village" : fogOpacity > 0.1 ? "🌿 The village emerges from the mist..." : "✨ Your village is revealed!"}
            </p>

            {[
              { icon: "📖", label: `Learn ${assignedClan.language}`, desc: "Words · Letters · Phrases", unlocked: true, action: () => navigate(`/learn/${assignedClan.languageId}`) },
              { icon: "⚔️", label: "Clan Quests", desc: questsUnlocked ? "Test your skills" : "10% to unlock", unlocked: questsUnlocked, action: () => navigate(`/quiz/${assignedClan.languageId}`) },
              { icon: "📜", label: "Clan Stories", desc: "Tales of your people", unlocked: true, action: () => navigate(`/folkvault/${assignedClan.languageId}`) },
              { icon: "👁️", label: "Elder Chamber", desc: elderUnlocked ? "Speak with the Glyph-Guard" : "75% to unlock", unlocked: elderUnlocked, action: () => navigate("/elder") },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => { if (item.unlocked) { playTapSound(); item.action(); } }}
                className={`w-full flex items-center gap-4 rounded-xl p-4 transition-all ${item.unlocked ? "active:scale-[0.98]" : "opacity-40"}`}
                style={{ background: "rgba(13,31,17,0.5)", border: "1px solid #1a2e1f", backdropFilter: "blur(5px)", minHeight: 60 }}
                disabled={!item.unlocked}
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <p className="font-heading text-sm" style={{ color: item.unlocked ? "#d1fae5" : "#1a2e1f" }}>{item.label}</p>
                  <p className="font-body text-[11px]" style={{ color: "#22c55e55" }}>{item.desc}</p>
                </div>
                {item.unlocked ? <ChevronRight className="w-4 h-4" style={{ color: "#166534" }} /> : <Lock className="w-4 h-4" style={{ color: "#1a2e1f" }} />}
              </button>
            ))}

            <button onClick={resetClan} className="w-full text-center py-3 font-body text-xs" style={{ color: "#1a3a2244" }}>
              Retake the Clan Ritual
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default ClanFinder;
