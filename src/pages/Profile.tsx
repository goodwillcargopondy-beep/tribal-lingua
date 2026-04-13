import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Settings, Award, BarChart3, Flame, BookOpen, Star, Trophy, LogOut, LogIn, Target, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileData {
  display_name: string | null;
  xp: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  words_learned: number;
  stories_read: number;
  quizzes_completed: number;
}

interface DailyActivity {
  activity_date: string;
  xp_earned: number;
}

const achievements = [
  { id: "first_word", name: "First Word", icon: "🌱", desc: "Learn your first word", xpRequired: 10 },
  { id: "word_collector", name: "Word Collector", icon: "📚", desc: "Learn 50 words", xpRequired: 500 },
  { id: "word_master", name: "Word Master", icon: "🎓", desc: "Learn 100 words", xpRequired: 1000 },
  { id: "quiz_starter", name: "Quiz Starter", icon: "📝", desc: "Complete first quiz", xpRequired: 50 },
  { id: "quiz_champion", name: "Quiz Champion", icon: "🏆", desc: "Complete 10 quizzes", xpRequired: 300 },
  { id: "streak_3", name: "3-Day Streak", icon: "🔥", desc: "3 day learning streak", xpRequired: 100 },
  { id: "streak_7", name: "Week Warrior", icon: "⚡", desc: "7 day learning streak", xpRequired: 250 },
  { id: "streak_30", name: "Monthly Master", icon: "🌟", desc: "30 day learning streak", xpRequired: 1000 },
  { id: "story_reader", name: "Story Reader", icon: "📖", desc: "Read your first story", xpRequired: 30 },
  { id: "cultural_explorer", name: "Cultural Explorer", icon: "🗺️", desc: "Explore all 3 languages", xpRequired: 200 },
  { id: "xp_500", name: "Rising Star", icon: "⭐", desc: "Earn 500 XP", xpRequired: 500 },
  { id: "xp_1000", name: "Language Hero", icon: "🦸", desc: "Earn 1000 XP", xpRequired: 1000 },
];

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<DailyActivity[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadWeeklyActivity();
      loadAchievements();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    if (data) setProfile(data);
  };

  const loadWeeklyActivity = async () => {
    if (!user) return;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data } = await supabase
      .from("daily_activity")
      .select("activity_date, xp_earned")
      .eq("user_id", user.id)
      .gte("activity_date", weekAgo.toISOString().split("T")[0])
      .order("activity_date");
    if (data) setWeeklyActivity(data);
  };

  const loadAchievements = async () => {
    if (!user) return;
    const { data } = await supabase.from("user_achievements").select("achievement_id").eq("user_id", user.id);
    if (data) setEarnedBadges(data.map((a) => a.achievement_id));
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const xp = profile?.xp || 0;
  const level = Math.floor(xp / 200) + 1;
  const xpInLevel = xp % 200;
  const levelProgress = (xpInLevel / 200) * 100;
  const levelTitle = level <= 2 ? "Beginner" : level <= 5 ? "Explorer" : level <= 10 ? "Scholar" : level <= 20 ? "Expert" : "Master";

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date();
  const weekData = days.map((d, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const activity = weeklyActivity.find((a) => a.activity_date === dateStr);
    return { day: d, xp: activity?.xp_earned || 0 };
  });
  const maxXp = Math.max(...weekData.map((d) => d.xp), 1);

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-2xl font-heading font-bold">
              {user ? (profile?.display_name?.[0]?.toUpperCase() || "U") : "G"}
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold">{user ? profile?.display_name || "Learner" : "Guest Learner"}</h1>
              <p className="font-body text-sm opacity-80">Level {level} · {levelTitle}</p>
            </div>
          </div>
          {user ? (
            <button onClick={handleSignOut} className="rounded-full p-2 hover:bg-primary-foreground/10">
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <button onClick={() => navigate("/auth")} className="rounded-full p-2 hover:bg-primary-foreground/10">
              <LogIn className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {/* XP Progress Bar */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              <span className="font-heading text-lg font-bold text-foreground">{xp} XP</span>
            </div>
            <span className="text-xs font-body text-muted-foreground">Level {level} → {level + 1}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${levelProgress}%` }} />
          </div>
          <p className="mt-1 text-xs font-body text-muted-foreground text-right">{200 - xpInLevel} XP to next level</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          {[
            { icon: "📝", label: "Words", value: profile?.words_learned || 0 },
            { icon: "🔥", label: "Streak", value: profile?.current_streak || 0 },
            { icon: "📖", label: "Stories", value: profile?.stories_read || 0 },
            { icon: "🏆", label: "Quizzes", value: profile?.quizzes_completed || 0 },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-3 text-center card-shadow">
              <p className="text-xl">{stat.icon}</p>
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] font-body text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Daily Streak */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-5 w-5 text-secondary" />
            <h3 className="font-heading text-base font-semibold text-foreground">Daily Streak</h3>
            <span className="ml-auto rounded-full bg-secondary/10 px-3 py-1 text-sm font-heading font-bold text-secondary">
              {profile?.current_streak || 0} days
            </span>
          </div>
          <p className="text-xs font-body text-muted-foreground">
            Longest streak: {profile?.longest_streak || 0} days 🏅
          </p>
        </div>

        {/* Weekly Progress Chart */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-secondary" />
            <h3 className="font-heading text-base font-semibold text-foreground">Weekly Progress</h3>
          </div>
          <div className="flex items-end gap-2 h-24">
            {weekData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-muted flex-1 relative" style={{ height: "100%" }}>
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-secondary transition-all"
                    style={{ height: `${d.xp ? (d.xp / maxXp) * 100 : 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-body text-muted-foreground">
            {weekData.map((d, i) => (
              <span key={i} className="flex-1 text-center">{d.day}</span>
            ))}
          </div>
        </div>

        {/* Achievements / Badges */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-secondary" />
            <h3 className="font-heading text-base font-semibold text-foreground">Awards & Badges</h3>
            <span className="ml-auto text-xs font-body text-muted-foreground">
              {earnedBadges.length}/{achievements.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((badge) => {
              const earned = earnedBadges.includes(badge.id) || xp >= badge.xpRequired;
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-3 text-center transition-all ${earned ? "bg-secondary/10" : "bg-muted/50 opacity-50"}`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <p className="mt-1 text-[10px] font-body font-semibold text-foreground leading-tight">{badge.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {!user && (
          <button
            onClick={() => navigate("/auth")}
            className="w-full rounded-xl bg-secondary py-4 font-heading text-sm font-semibold text-secondary-foreground card-shadow animate-fade-in-up"
            style={{ animationDelay: "0.25s" }}
          >
            Sign in to save progress
          </button>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
