import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Learn from "./pages/Learn";
import LearnLanguage from "./pages/LearnLanguage";
import LearnWords from "./pages/LearnWords";
import LearnLetters from "./pages/LearnLetters";
import LearnSentences from "./pages/LearnSentences";
import FolkVault from "./pages/FolkVault";
import FolkVaultLanguage from "./pages/FolkVaultLanguage";
import StoryReader from "./pages/StoryReader";
import Quiz from "./pages/Quiz";
import QuizLanguage from "./pages/QuizLanguage";
import History from "./pages/History";
import HistoryLanguage from "./pages/HistoryLanguage";
import HistoryTopic from "./pages/HistoryTopic";
import Profile from "./pages/Profile";
import ClanFinder from "./pages/ClanFinder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:language" element={<LearnLanguage />} />
            <Route path="/learn/:language/words" element={<LearnWords />} />
            <Route path="/learn/:language/words/:category" element={<LearnWords />} />
            <Route path="/learn/:language/letters" element={<LearnLetters />} />
            <Route path="/learn/:language/sentences" element={<LearnSentences />} />
            <Route path="/folkvault" element={<FolkVault />} />
            <Route path="/folkvault/:language" element={<FolkVaultLanguage />} />
            <Route path="/folkvault/:language/:storyId" element={<StoryReader />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:language" element={<QuizLanguage />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:language" element={<HistoryLanguage />} />
            <Route path="/history/:language/:topic" element={<HistoryTopic />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
