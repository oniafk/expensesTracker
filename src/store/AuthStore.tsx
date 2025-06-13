import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../supabase/supabase.config";
import type { User } from "@supabase/supabase-js";

/**
 * Authentication state interface
 * Defines the shape of our auth store state
 */
interface AuthState {
  // Core authentication state
  isAuthenticated: boolean;
  user: User | null;

  // Loading and error states
  isLoading: boolean;
  error: string | null;

  // Session management
  isInitialized: boolean;
}

/**
 * Authentication actions interface
 * Defines all the actions our store can perform
 */
interface AuthActions {
  // Authentication methods
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;

  // Session management
  initializeAuth: () => Promise<void>;
  clearError: () => void;

  // Internal state setters (for better organization)
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
}

/**
 * Complete store type combining state and actions
 */
type AuthStore = AuthState & AuthActions;

/**
 * Main authentication store with persistence and type safety
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
      isInitialized: false,

      // Authentication actions
      signInWithGoogle: async () => {
        const { setLoading, setError } = get();

        try {
          setLoading(true);
          setError(null);

          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/dashboard`,
            },
          });

          if (error) {
            setError(error.message);
            throw error;
          }

          // Note: User data comes through the auth state change listener
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Authentication failed";
          setError(errorMessage);
          console.error("Google sign-in error:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      signOut: async () => {
        const { setLoading, setError, setUser } = get();

        try {
          setLoading(true);
          setError(null);

          const { error } = await supabase.auth.signOut();

          if (error) {
            setError(error.message);
            throw error;
          }

          // Clear user state
          setUser(null);
          set({ isAuthenticated: false });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Sign out failed";
          setError(errorMessage);
          console.error("Sign out error:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      // Session management
      initializeAuth: async () => {
        try {
          set({ isLoading: true, error: null });

          // Get current session
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession();

          if (error) {
            console.error("Session initialization error:", error);
            set({ error: error.message });
            return;
          }

          if (session?.user) {
            set({
              isAuthenticated: true,
              user: session.user,
            });
          }

          // Set up auth state listener
          supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth state changed:", event, session?.user?.email);

            if (session?.user) {
              set({
                isAuthenticated: true,
                user: session.user,
                error: null,
              });
            } else {
              set({
                isAuthenticated: false,
                user: null,
              });
            }
          });
        } catch (error) {
          console.error("Auth initialization failed:", error);
          set({ error: "Failed to initialize authentication" });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },

      // Utility actions
      clearError: () => set({ error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        // Only persist essential data (not loading states)
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
