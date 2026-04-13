import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
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
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
