import BottomNav from "@/components/BottomNav";
import { Settings, Award, BarChart3, Flame, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 tribal-pattern-bg">
      <header className="tribal-gradient px-5 pb-10 pt-12 text-primary-foreground">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-2xl font-heading font-bold">
              G
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold">Guest Learner</h1>
              <p className="font-body text-sm opacity-80">Level 3 · Language Explorer</p>
            </div>
          </div>
          <button className="rounded-full p-2 hover:bg-primary-foreground/10">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 -mt-6 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
          {[
            { icon: BookOpen, label: "Words", value: "24" },
            { icon: Flame, label: "Streak", value: "3" },
            { icon: Star, label: "XP", value: "180" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-4 text-center card-shadow">
              <stat.icon className="mx-auto h-6 w-6 text-secondary" />
              <p className="mt-2 font-heading text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs font-body text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements Preview */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-semibold text-foreground">Achievements</h3>
            <Award className="h-5 w-5 text-gold" />
          </div>
          <div className="flex gap-3">
            {["🌱 First Word", "🔥 3-Day Streak", "📖 Story Reader"].map((badge) => (
              <div key={badge} className="rounded-lg bg-muted px-3 py-2 text-xs font-body text-foreground">
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-secondary" />
            <h3 className="font-heading text-base font-semibold text-foreground">Weekly Progress</h3>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[30, 45, 20, 60, 80, 55, 40].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-secondary/20 transition-all" style={{ height: `${h}%` }}>
                <div className="h-full rounded-t-md bg-secondary" style={{ height: `${Math.random() * 60 + 40}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-body text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-secondary py-4 font-heading text-sm font-semibold text-secondary-foreground card-shadow animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Sign in to save progress
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
