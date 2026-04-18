import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, X, Volume2, RotateCcw, Trophy, Star } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MilestoneAnimation from "@/components/MilestoneAnimation";
import { languages } from "@/data/languages";
import { allWords } from "@/data/allWords";
import { Word } from "@/data/languages";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const difficulties = [
  { id: "easy", name: "Easy", stars: 1, questionCount: 5, xpMultiplier: 1 },
  { id: "medium", name: "Medium", stars: 2, questionCount: 8, xpMultiplier: 2 },
  { id: "hard", name: "Hard", stars: 3, questionCount: 10, xpMultiplier: 3 },
  { id: "expert", name: "Expert", stars: 4, questionCount: 12, xpMultiplier: 4 },
  { id: "master", name: "Master", stars: 5, questionCount: 15, xpMultiplier: 5 },
];

const quizCategories = [
  { id: "mcq", name: "MCQ", icon: "📝", desc: "Pick the right answer" },
  { id: "match", name: "Match Pairs", icon: "🔗", desc: "Connect words & meanings" },
  { id: "unscramble", name: "Unscramble", icon: "🔀", desc: "Rearrange the letters" },
  { id: "audio", name: "Audio Quiz", icon: "🎧", desc: "Listen and identify" },
  { id: "fillblanks", name: "Fill in Blanks", icon: "✏️", desc: "Complete the word" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAllWords(language: string): Word[] {
  const langWords = allWords[language] || {};
  return Object.values(langWords).flat();
}

// MCQ Component
const MCQQuiz = ({ words, questionCount, onComplete }: { words: Word[]; questionCount: number; onComplete: (score: number, total: number) => void }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const pool = useState(() => shuffle(words).slice(0, questionCount))[0];

  const question = pool[current];
  const options = useState(() =>
    pool.map((q) => {
      const wrong = shuffle(words.filter((w) => w.id !== q.id)).slice(0, 3);
      return shuffle([q, ...wrong]);
    })
  )[0];

  const handleSelect = (opt: Word) => {
    if (selected) return;
    setSelected(opt.id);
    const correct = opt.id === question.id;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < pool.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        onComplete(score + (correct ? 1 : 0), pool.length);
      }
    }, 800);
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-body text-muted-foreground">{current + 1} / {pool.length}</span>
        <span className="text-sm font-body text-secondary font-semibold">Score: {score}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((current + 1) / pool.length) * 100}%` }} />
      </div>
      <div className="rounded-xl bg-card p-6 card-shadow text-center">
        <span className="text-5xl">{question.image}</span>
        <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{question.tribal}</h3>
        <p className="text-sm font-body text-muted-foreground italic">What does this word mean?</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options[current]?.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            disabled={!!selected}
            className={`rounded-xl p-4 text-center font-body font-medium transition-all ${
              selected === opt.id
                ? opt.id === question.id
                  ? "bg-green-500 text-white scale-[1.02]"
                  : "bg-red-500 text-white scale-[0.98]"
                : selected && opt.id === question.id
                ? "bg-green-500 text-white"
                : "bg-card card-shadow text-foreground hover:scale-[1.02]"
            }`}
          >
            {opt.english}
          </button>
        ))}
      </div>
    </div>
  );
};

// Match Quiz Component
const MatchQuiz = ({ words, questionCount, onComplete }: { words: Word[]; questionCount: number; onComplete: (score: number, total: number) => void }) => {
  const count = Math.min(questionCount, 6);
  const pool = useState(() => shuffle(words).slice(0, count))[0];
  const [tribalSelected, setTribalSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const shuffledEnglish = useState(() => shuffle(pool))[0];

  const handleTribalClick = (id: string) => {
    if (matched.includes(id)) return;
    setTribalSelected(id);
  };

  const handleEnglishClick = (word: Word) => {
    if (!tribalSelected || matched.includes(word.id)) return;
    if (tribalSelected === word.id) {
      setMatched((m) => [...m, word.id]);
      setTribalSelected(null);
      if (matched.length + 1 === pool.length) {
        setTimeout(() => onComplete(pool.length, pool.length), 500);
      }
    } else {
      setWrongPair(word.id);
      setTimeout(() => {
        setWrongPair(null);
        setTribalSelected(null);
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-body text-muted-foreground text-center">Tap a tribal word, then tap its English meaning</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <h4 className="text-xs font-body font-semibold text-muted-foreground text-center">Tribal</h4>
          {pool.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTribalClick(w.id)}
              disabled={matched.includes(w.id)}
              className={`w-full rounded-xl p-3 text-center font-heading text-sm font-bold transition-all ${
                matched.includes(w.id)
                  ? "bg-green-500/20 text-green-700 scale-[0.95]"
                  : tribalSelected === w.id
                  ? "bg-secondary text-secondary-foreground scale-[1.02]"
                  : "bg-card card-shadow text-foreground"
              }`}
            >
              {w.image} {w.tribal}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-body font-semibold text-muted-foreground text-center">English</h4>
          {shuffledEnglish.map((w) => (
            <button
              key={w.id}
              onClick={() => handleEnglishClick(w)}
              disabled={matched.includes(w.id)}
              className={`w-full rounded-xl p-3 text-center font-body text-sm font-medium transition-all ${
                matched.includes(w.id)
                  ? "bg-green-500/20 text-green-700 scale-[0.95]"
                  : wrongPair === w.id
                  ? "bg-red-500 text-white"
                  : "bg-card card-shadow text-foreground"
              }`}
            >
              {w.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Unscramble Quiz
const UnscrambleQuiz = ({ words, questionCount, onComplete }: { words: Word[]; questionCount: number; onComplete: (score: number, total: number) => void }) => {
  const pool = useState(() => shuffle(words).slice(0, questionCount))[0];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const question = pool[current];
  const scrambled = useState(() => pool.map((w) => shuffle(w.english.split("")).join("")))[0];

  const handleSubmit = () => {
    const correct = input.toLowerCase().trim() === question.english.toLowerCase();
    if (correct) setScore((s) => s + 1);
    setRevealed(true);
    setTimeout(() => {
      if (current + 1 < pool.length) {
        setCurrent((c) => c + 1);
        setInput("");
        setRevealed(false);
      } else {
        onComplete(score + (correct ? 1 : 0), pool.length);
      }
    }, 1200);
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-body text-muted-foreground">{current + 1} / {pool.length}</span>
        <span className="text-sm font-body text-secondary font-semibold">Score: {score}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((current + 1) / pool.length) * 100}%` }} />
      </div>
      <div className="rounded-xl bg-card p-6 card-shadow text-center">
        <span className="text-4xl">{question.image}</span>
        <p className="mt-2 text-sm font-body text-muted-foreground">Unscramble this word:</p>
        <h3 className="mt-2 font-heading text-3xl font-bold text-secondary tracking-widest">
          {scrambled[current]}
        </h3>
        <p className="mt-1 text-sm font-body text-muted-foreground italic">Hint: {question.tribal}</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Type the word..."
          className="flex-1 rounded-xl bg-card p-4 font-body text-sm text-foreground placeholder:text-muted-foreground card-shadow outline-none focus:ring-2 focus:ring-secondary"
        />
        <button onClick={handleSubmit} className="rounded-xl bg-secondary px-6 font-heading text-sm font-semibold text-secondary-foreground">
          Check
        </button>
      </div>
      {revealed && (
        <div className={`rounded-xl p-3 text-center font-body text-sm ${input.toLowerCase().trim() === question.english.toLowerCase() ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"}`}>
          {input.toLowerCase().trim() === question.english.toLowerCase()
            ? "✅ Correct!"
            : `❌ The answer was: ${question.english}`}
        </div>
      )}
    </div>
  );
};

// Audio Quiz
const AudioQuiz = ({ words, questionCount, onComplete }: { words: Word[]; questionCount: number; onComplete: (score: number, total: number) => void }) => {
  const pool = useState(() => shuffle(words).slice(0, questionCount))[0];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const question = pool[current];
  const options = useState(() =>
    pool.map((q) => {
      const wrong = shuffle(words.filter((w) => w.id !== q.id)).slice(0, 3);
      return shuffle([q, ...wrong]);
    })
  )[0];

  const handleSpeak = useCallback(() => {
    const u = new SpeechSynthesisUtterance(question.pronunciation);
    u.rate = 0.6;
    speechSynthesis.speak(u);
  }, [question]);

  useEffect(() => {
    handleSpeak();
  }, [handleSpeak]);

  const handleSelect = (opt: Word) => {
    if (selected) return;
    setSelected(opt.id);
    const correct = opt.id === question.id;
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < pool.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        onComplete(score + (correct ? 1 : 0), pool.length);
      }
    }, 800);
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-body text-muted-foreground">{current + 1} / {pool.length}</span>
        <span className="text-sm font-body text-secondary font-semibold">Score: {score}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((current + 1) / pool.length) * 100}%` }} />
      </div>
      <div className="rounded-xl bg-card p-8 card-shadow text-center">
        <button onClick={handleSpeak} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 transition-transform hover:scale-110 active:scale-95">
          <Volume2 className="h-10 w-10 text-secondary" />
        </button>
        <p className="mt-3 text-sm font-body text-muted-foreground">Listen and select the correct word</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options[current]?.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            disabled={!!selected}
            className={`rounded-xl p-4 text-center transition-all ${
              selected === opt.id
                ? opt.id === question.id
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : selected && opt.id === question.id
                ? "bg-green-500 text-white"
                : "bg-card card-shadow text-foreground hover:scale-[1.02]"
            }`}
          >
            <span className="text-2xl">{opt.image}</span>
            <p className="mt-1 font-body text-sm font-medium">{opt.english}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// Fill in Blanks Quiz
const FillBlanksQuiz = ({ words, questionCount, onComplete }: { words: Word[]; questionCount: number; onComplete: (score: number, total: number) => void }) => {
  const pool = useState(() => shuffle(words).slice(0, questionCount))[0];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const question = pool[current];
  const hint = question.english.charAt(0) + "_".repeat(question.english.length - 2) + question.english.charAt(question.english.length - 1);

  const handleSubmit = () => {
    const correct = input.toLowerCase().trim() === question.english.toLowerCase();
    if (correct) setScore((s) => s + 1);
    setRevealed(true);
    setTimeout(() => {
      if (current + 1 < pool.length) {
        setCurrent((c) => c + 1);
        setInput("");
        setRevealed(false);
      } else {
        onComplete(score + (correct ? 1 : 0), pool.length);
      }
    }, 1200);
  };

  if (!question) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-body text-muted-foreground">{current + 1} / {pool.length}</span>
        <span className="text-sm font-body text-secondary font-semibold">Score: {score}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${((current + 1) / pool.length) * 100}%` }} />
      </div>
      <div className="rounded-xl bg-card p-6 card-shadow text-center">
        <span className="text-5xl">{question.image}</span>
        <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{question.tribal}</h3>
        <p className="mt-1 text-sm font-body text-muted-foreground">/ {question.pronunciation} /</p>
        <p className="mt-2 font-heading text-xl tracking-[0.3em] text-secondary">{hint}</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Fill in the blanks..."
          className="flex-1 rounded-xl bg-card p-4 font-body text-sm text-foreground placeholder:text-muted-foreground card-shadow outline-none focus:ring-2 focus:ring-secondary"
        />
        <button onClick={handleSubmit} className="rounded-xl bg-secondary px-6 font-heading text-sm font-semibold text-secondary-foreground">
          Check
        </button>
      </div>
      {revealed && (
        <div className={`rounded-xl p-3 text-center font-body text-sm ${input.toLowerCase().trim() === question.english.toLowerCase() ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"}`}>
          {input.toLowerCase().trim() === question.english.toLowerCase()
            ? "✅ Correct!"
            : `❌ The answer was: ${question.english}`}
        </div>
      )}
    </div>
  );
};

// Results Screen
const QuizResults = ({ score, total, xpEarned, onRestart, onBack }: { score: number; total: number; xpEarned: number; onRestart: () => void; onBack: () => void }) => {
  const percentage = Math.round((score / total) * 100);
  const emoji = percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : percentage >= 40 ? "💪" : "📚";
  const [anim, setAnim] = useState({ show: true });
  const animType: "quiz_complete" | "low_score" = percentage >= 50 ? "quiz_complete" : "low_score";
  const animMsg = percentage >= 80 ? "Excellent quest!" : percentage >= 50 ? "Quiz complete!" : "Try again, brave one";

  return (
    <div className="space-y-5 animate-fade-in-up">
      <div className="rounded-xl bg-card p-8 card-shadow text-center">
        <span className="text-6xl">{emoji}</span>
        <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
          {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Great Job!" : percentage >= 40 ? "Good Try!" : "Keep Practicing!"}
        </h2>
        <p className="mt-2 text-4xl font-heading font-bold text-secondary">{percentage}%</p>
        <p className="mt-1 font-body text-sm text-muted-foreground">{score} out of {total} correct</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-body text-secondary font-semibold">
          <Star className="h-4 w-4" /> +{xpEarned} XP earned
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={onRestart} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-heading text-sm font-semibold text-secondary-foreground">
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
        <button onClick={onBack} className="flex-1 rounded-xl bg-card py-4 font-heading text-sm font-semibold text-foreground card-shadow">
          Back to Quiz
        </button>
      </div>
      <MilestoneAnimation show={anim.show} type={animType} message={animMsg} onComplete={() => setAnim({ show: false })} />
    </div>
  );
};

// Main Quiz Language Page
const QuizLanguage = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const lang = languages.find((l) => l.id === language);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; xp: number } | null>(null);

  if (!lang) return null;

  const words = getAllWords(language || "");
  const difficulty = difficulties.find((d) => d.id === selectedDifficulty);

  const handleQuizComplete = async (score: number, total: number) => {
    const xp = Math.round(score * (difficulty?.xpMultiplier || 1) * 10);
    setQuizResult({ score, total, xp });
    setQuizActive(false);

    if (user) {
      try {
        await supabase.from("quiz_results").insert({
          user_id: user.id,
          language: language || "",
          quiz_type: selectedCategory || "",
          difficulty: selectedDifficulty || "",
          score,
          total_questions: total,
          xp_earned: xp,
        });
        // Update profile XP
        const { data: profile } = await supabase.from("profiles").select("xp, quizzes_completed").eq("user_id", user.id).single();
        if (profile) {
          await supabase.from("profiles").update({
            xp: (profile.xp || 0) + xp,
            quizzes_completed: (profile.quizzes_completed || 0) + 1,
          }).eq("user_id", user.id);
        }
      } catch (e) {
        console.error("Failed to save quiz result:", e);
      }
    }
  };

  const startQuiz = () => {
    setQuizResult(null);
    setQuizActive(true);
  };

  const resetQuiz = () => {
    setQuizResult(null);
    setQuizActive(false);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  // Step 1: Category selection
  if (!selectedCategory) {
    return (
      <div className="min-h-screen pb-24 tribal-pattern-bg">
        <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
          <div className="mx-auto max-w-lg">
            <button onClick={() => navigate("/quiz")} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="font-heading text-2xl font-bold">{lang.emoji} {lang.name} Quiz</h1>
            <p className="mt-1 font-body text-sm opacity-80">Choose a quiz type</p>
          </div>
        </header>
        <main className="mx-auto max-w-lg px-5 -mt-6 space-y-3">
          {quizCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="flex w-full items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="text-3xl">{cat.icon}</span>
              <div className="text-left">
                <h3 className="font-heading text-base font-semibold text-foreground">{cat.name}</h3>
                <p className="text-sm font-body text-muted-foreground">{cat.desc}</p>
              </div>
            </button>
          ))}
        </main>
        <BottomNav />
      </div>
    );
  }

  // Step 2: Difficulty selection
  if (!selectedDifficulty) {
    return (
      <div className="min-h-screen pb-24 tribal-pattern-bg">
        <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
          <div className="mx-auto max-w-lg">
            <button onClick={() => setSelectedCategory(null)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="font-heading text-2xl font-bold">Select Difficulty</h1>
            <p className="mt-1 font-body text-sm opacity-80">{quizCategories.find((c) => c.id === selectedCategory)?.name}</p>
          </div>
        </header>
        <main className="mx-auto max-w-lg px-5 -mt-6 space-y-3">
          {difficulties.map((diff, i) => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className="flex w-full items-center justify-between rounded-xl bg-card p-5 card-shadow transition-transform hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="text-left">
                <h3 className="font-heading text-base font-semibold text-foreground">{diff.name}</h3>
                <p className="text-sm font-body text-muted-foreground">{diff.questionCount} questions · {diff.xpMultiplier}x XP</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < diff.stars ? "text-secondary fill-secondary" : "text-muted"}`} />
                ))}
              </div>
            </button>
          ))}
        </main>
        <BottomNav />
      </div>
    );
  }

  // Step 3: Quiz or Results
  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <button onClick={() => quizActive ? setQuizActive(false) : setSelectedDifficulty(null)} className="mb-3 flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">
            {quizCategories.find((c) => c.id === selectedCategory)?.icon}{" "}
            {quizCategories.find((c) => c.id === selectedCategory)?.name}
          </h1>
          <p className="mt-1 font-body text-sm opacity-80">{difficulty?.name} · {lang.name}</p>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-5 -mt-6">
        {quizResult ? (
          <QuizResults
            score={quizResult.score}
            total={quizResult.total}
            xpEarned={quizResult.xp}
            onRestart={startQuiz}
            onBack={resetQuiz}
          />
        ) : quizActive ? (
          <>
            {selectedCategory === "mcq" && <MCQQuiz words={words} questionCount={difficulty!.questionCount} onComplete={handleQuizComplete} />}
            {selectedCategory === "match" && <MatchQuiz words={words} questionCount={difficulty!.questionCount} onComplete={handleQuizComplete} />}
            {selectedCategory === "unscramble" && <UnscrambleQuiz words={words} questionCount={difficulty!.questionCount} onComplete={handleQuizComplete} />}
            {selectedCategory === "audio" && <AudioQuiz words={words} questionCount={difficulty!.questionCount} onComplete={handleQuizComplete} />}
            {selectedCategory === "fillblanks" && <FillBlanksQuiz words={words} questionCount={difficulty!.questionCount} onComplete={handleQuizComplete} />}
          </>
        ) : (
          <div className="space-y-4 animate-fade-in-up">
            <div className="rounded-xl bg-card p-6 card-shadow text-center">
              <span className="text-5xl">{quizCategories.find((c) => c.id === selectedCategory)?.icon}</span>
              <h2 className="mt-3 font-heading text-xl font-bold text-foreground">Ready?</h2>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                {difficulty!.questionCount} questions · {difficulty!.name} level · {difficulty!.xpMultiplier}x XP
              </p>
            </div>
            <button
              onClick={startQuiz}
              className="w-full rounded-xl bg-secondary py-4 font-heading text-base font-semibold text-secondary-foreground card-shadow"
            >
              Start Quiz 🚀
            </button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default QuizLanguage;
