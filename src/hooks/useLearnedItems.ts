import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "tribalLingua_learnedItems";
const XP_PER_WORD = 5;

function getLocalLearned(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLocalLearned(items: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...items]));
}

export function useLearnedItems() {
  const { user } = useAuth();
  const [learned, setLearned] = useState<Set<string>>(getLocalLearned);

  // Sync count to profile when logged in
  const syncToProfile = useCallback(async (count: number) => {
    if (!user) return;
    try {
      await supabase
        .from("profiles")
        .update({ words_learned: count, xp: count * XP_PER_WORD })
        .eq("user_id", user.id);
    } catch { /* silent */ }
  }, [user]);

  const toggleLearned = useCallback((itemId: string) => {
    setLearned(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
        toast({
          title: "✨ Marked as learned!",
          description: `+${XP_PER_WORD} XP earned`,
        });
      }
      saveLocalLearned(next);
      syncToProfile(next.size);
      return next;
    });
  }, [syncToProfile]);

  const isLearned = useCallback((itemId: string) => learned.has(itemId), [learned]);

  const totalLearned = learned.size;
  const totalXP = totalLearned * XP_PER_WORD;

  // Get progress by language
  const getLanguageProgress = useCallback((languageId: string) => {
    let count = 0;
    learned.forEach(id => {
      if (id.startsWith(`${languageId}-`)) count++;
    });
    return count;
  }, [learned]);

  return { learned, toggleLearned, isLearned, totalLearned, totalXP, getLanguageProgress };
}
