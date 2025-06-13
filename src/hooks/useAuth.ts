import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore";

/**
 * Custom hook for authentication with automatic initialization
 * Provides a clean API for components to interact with auth
 */
export const useAuth = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    error,
    isInitialized,
    signInWithGoogle,
    signOut,
    clearError,
    initializeAuth,
  } = useAuthStore();

  // Auto-initialize auth on first use
  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  return {
    // State (computed properties for better DX)
    isAuthenticated,
    user,
    isLoading,
    error,
    isInitialized,

    // Computed helpers
    userEmail: user?.email,
    userDisplayName: user?.user_metadata?.full_name || user?.email,
    userAvatar: user?.user_metadata?.avatar_url,

    // Actions
    signInWithGoogle,
    signOut,
    clearError,
  };
};

/**
 * Hook for protecting routes - redirects if not authenticated
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isInitialized, isLoading } = useAuth();

  return {
    isAuthenticated,
    isInitialized,
    isLoading,
    // Helper to determine if we should show protected content
    canShowProtectedContent: isInitialized && isAuthenticated,
    // Helper to determine if we should show loading spinner
    shouldShowLoading: !isInitialized || isLoading,
  };
};

/**
 * Lightweight hook for components that only need auth status
 */
export const useAuthStatus = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};
