/**
 * User Context Hooks
 * Separated to resolve Fast Refresh issues
 */

import { useContext } from "react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import type { User } from "../types/database.types";
import { UserContext } from "../context/UserContext";

interface UserContextType {
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isInitialized: boolean;
  refetchUser: () => void;
}

/**
 * Hook to access user context
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

/**
 * Simplified hook for just user data
 */
export const useCurrentUser = () => {
  const { user, isLoading } = useUser();
  return { user, isLoading };
};
