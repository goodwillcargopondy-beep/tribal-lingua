import { Home, BookOpen, Brain, User, ScrollText, Sparkles, Landmark } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const leftItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/learn", icon: BookOpen, label: "Learn" },
  { path: "/folkvault", icon: ScrollText, label: "Stories" },
];

const rightItems = [
  { path: "/quiz", icon: Brain, label: "Quiz" },
  { path: "/history", icon: Landmark, label: "Hist" },
  { path: "/profile", icon: User, label: "Me" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClanActive = location.pathname.startsWith("/clan") || location.pathname === "/elder";

  const renderItem = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => {
    const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
    return (
      <button
        key={path}
        onClick={() => navigate(path)}
        className={`flex flex-1 min-w-0 flex-col items-center gap-0.5 px-0.5 py-1.5 transition-colors ${
          isActive ? "text-secondary" : "text-muted-foreground"
        }`}
      >
        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "stroke-[2.5]" : ""}`} />
        <span className="text-[8px] font-medium font-body truncate max-w-full">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around gap-0.5 px-1 py-1.5 relative">
        {leftItems.map(renderItem)}

        {/* CENTER CLAN BUTTON — enlarged */}
        <button
          onClick={() => navigate("/clan")}
          className={`relative -mt-7 flex shrink-0 flex-col items-center gap-0.5 transition-all ${
            isClanActive ? "scale-105" : ""
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
            ${isClanActive
              ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/40"
              : "bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:scale-105"
            }`}
          >
            <Sparkles className="h-5 w-5 text-emerald-100" />
          </div>
          <span className={`text-[8px] font-semibold font-body ${
            isClanActive ? "text-emerald-500" : "text-muted-foreground"
          }`}>
            Clan
          </span>
        </button>

        {rightItems.map(renderItem)}
      </div>
    </nav>
  );
};

export default BottomNav;
