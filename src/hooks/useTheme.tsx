/**
 * Theme Management Hook
 * Provides theme switching functionality with Zustand integration
 */

import { useCallback } from "react";
import { Theme } from "../types/database.types";
import { useUserTheme, useUserStore, useUserData } from "../store/UserStore";
import { useUpdateUser } from "./useUserData";

export const useTheme = () => {
  const currentTheme = useUserTheme();
  const user = useUserData();
  const updateUserMutation = useUpdateUser();

  // Get actual theme considering system preference
  const getEffectiveTheme = useCallback((): "light" | "dark" => {
    if (currentTheme === Theme.SYSTEM) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return currentTheme === Theme.DARK ? "dark" : "light";
  }, [currentTheme]);

  // Change theme function
  const setTheme = useCallback(
    async (newTheme: Theme) => {
      // Immediately update local state for instant UI feedback
      useUserStore.getState().updateUserPreferences({ theme: newTheme });

      // Update in database if user is logged in
      if (user?.id) {
        try {
          await updateUserMutation.mutateAsync({
            userId: user.id,
            updates: { theme: newTheme },
          });
        } catch (error) {
          console.error("Failed to update theme in database:", error);
          // Optionally revert local change if DB update fails
        }
      }
    },
    [user?.id, updateUserMutation]
  );

  // Toggle between light and dark (skip system)
  const toggleTheme = useCallback(() => {
    const effectiveTheme = getEffectiveTheme();
    const newTheme = effectiveTheme === "light" ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  }, [getEffectiveTheme, setTheme]);

  return {
    theme: currentTheme,
    effectiveTheme: getEffectiveTheme(),
    setTheme,
    toggleTheme,
    isUpdating: updateUserMutation.isPending,
  };
};
