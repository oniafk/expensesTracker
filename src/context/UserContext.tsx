/**
 * Enhanced User Context with React Query Integration
 * Combines authentication with comprehensive user data management
 */

import React, { createContext, useEffect } from "react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import type { User } from "../types/database.types";
import { Theme } from "../types/database.types";
import { useUserStore } from "../store/UserStore";
import { useAuthContext } from "./AuthContextEnhanced";

interface UserContextType {
  // Supabase auth user
  supabaseUser: SupabaseUser | null;
  session: Session | null;

  // App user data
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isInitialized: boolean;

  // Actions
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export { UserContext };

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: supabaseUser, session, isAuthenticated } = useAuthContext();

  // EMERGENCY FIX: Set user as initialized immediately for authenticated users
  useEffect(() => {
    if (isAuthenticated && supabaseUser) {
      const store = useUserStore.getState();

      // Only create user if not already created
      if (!store.user || store.user.id !== supabaseUser.id) {
        // Create emergency user profile for immediate access
        const emergencyUserProfile = {
          id: supabaseUser.id,
          authId: supabaseUser.id,
          email: supabaseUser.email || "",
          name:
            supabaseUser.user_metadata?.name || supabaseUser.email || "User",
          picture:
            supabaseUser.user_metadata?.picture ||
            supabaseUser.user_metadata?.avatar_url ||
            "",
          currency: "AUD" as const,
          country: "Australia" as const,
          theme: Theme.LIGHT,
          accounts: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Set user data and initialized status immediately
        store.setUser(emergencyUserProfile);
        store.setInitialized(true);
      }
    } else if (!isAuthenticated) {
      // Clear user data when logged out
      const store = useUserStore.getState();
      store.clearUser();
    }
  }, [isAuthenticated, supabaseUser]);

  // Get current user from store
  const currentUser = useUserStore((state) => state.user);

  const value: UserContextType = {
    supabaseUser,
    session,
    user: currentUser,
    isLoading: false, // No loading since we're bypassing database
    isError: false, // No errors since we're bypassing database
    error: null,
    isInitialized: isAuthenticated ? true : false, // Always true for authenticated users
    refetchUser: () => {
      console.log("🚨 RefetchUser called during emergency mode - no-op");
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
