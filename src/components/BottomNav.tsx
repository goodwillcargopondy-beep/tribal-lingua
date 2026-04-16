import { Home, BookOpen, Brain, User, ScrollText, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const leftItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/learn", icon: BookOpen, label: "Learn" },
  { path: "/folkvault", icon: ScrollText, label: "Stories" },
];

const rightItems = [
  { path: "/quiz", icon: Brain, label: "Quiz" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isClanActive = location.pathname.startsWith("/clan") || location.pathname === "/elder";

  const renderItem = ({ path, icon: Icon, label }: typeof leftItems[0]) => {
    const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
    return (
      <button
        key={path}
        onClick={() => navigate(path)}
        className={`flex flex-col items-center gap-0.5 px-1.5 py-1.5 transition-colors ${
          isActive ? "text-secondary" : "text-muted-foreground"
        }`}
      >
        <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
        <span className="text-[8px] font-medium font-body">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 relative">
        {leftItems.map(renderItem)}

        {/* CENTER CLAN BUTTON */}
        <button
          onClick={() => navigate("/clan")}
          className={`relative -mt-7 flex flex-col items-center gap-0.5 transition-all ${
            isClanActive ? "scale-105" : ""
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
            ${isClanActive
              ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/40"
              : "bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:scale-105"
            }`}
          >
            <Sparkles className="h-6 w-6 text-emerald-100" />
          </div>
          <span className={`text-[8px] font-semibold font-body mt-0.5 ${
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
