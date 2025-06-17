/**
 * User Store - Zustand Store for User Personalization
 * Persistent store for user preferences and frequently accessed data
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, Account, UserPreferences } from "../types/database.types";
import { Theme } from "../types/database.types";

// Store state interface
interface UserStoreState {
  // User data
  user: User | null;
  accounts: Account[];

  // Loading states
  isLoading: boolean;
  isInitialized: boolean;

  // Error state
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setAccounts: (accounts: Account[]) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  addAccount: (account: Account) => void;
  updateAccount: (accountId: number, updates: Partial<Account>) => void;
  removeAccount: (accountId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearUser: () => void;

  // Computed getters
  getUserPreferences: () => UserPreferences | null;
  getTotalBalance: () => number;
  getAccountById: (id: number) => Account | undefined;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accounts: [],
      isLoading: false,
      isInitialized: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({ user, error: null });
      },

      setAccounts: (accounts) => {
        set({ accounts });
      },

      updateUserPreferences: (preferences) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            ...preferences,
          };
          set({ user: updatedUser });
        }
      },

      addAccount: (account) => {
        set((state) => ({
          accounts: [...state.accounts, account],
        }));
      },

      updateAccount: (accountId, updates) => {
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === accountId ? { ...account, ...updates } : account
          ),
        }));
      },

      removeAccount: (accountId) => {
        set((state) => ({
          accounts: state.accounts.filter(
            (account) => account.id !== accountId
          ),
        }));
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      setInitialized: (isInitialized) => {
        set({ isInitialized });
      },

      clearUser: () => {
        set({
          user: null,
          accounts: [],
          error: null,
          isInitialized: false,
        });
      },

      // Computed getters
      getUserPreferences: () => {
        const user = get().user;
        if (!user) return null;

        return {
          country: user.country,
          currency: user.currency,
          theme: user.theme,
        };
      },

      getTotalBalance: () => {
        const accounts = get().accounts;
        return accounts.reduce((total, account) => total + account.balance, 0);
      },

      getAccountById: (id) => {
        const accounts = get().accounts;
        return accounts.find((account) => account.id === id);
      },
    }),
    {
      name: "user-store", // Storage key
      storage: createJSONStorage(() => localStorage),

      // Only persist essential user data and preferences
      partialize: (state) => ({
        user: state.user,
        accounts: state.accounts,
        isInitialized: state.isInitialized,
      }),

      // Skip hydration for loading and error states
      skipHydration: false,

      // Version for migration support
      version: 1,

      // Migration function for future store updates
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);

// Selectors for optimized re-renders
export const useUserData = () => useUserStore((state) => state.user);
export const useUserAccounts = () => useUserStore((state) => state.accounts);
export const useUserPreferences = () =>
  useUserStore((state) => state.getUserPreferences());
export const useUserTheme = () =>
  useUserStore((state) => state.user?.theme || Theme.LIGHT);
export const useUserCurrency = () =>
  useUserStore((state) => state.user?.currency || "AUD");
export const useUserCountry = () =>
  useUserStore((state) => state.user?.country || "Australia");
export const useTotalBalance = () =>
  useUserStore((state) => state.getTotalBalance());
export const useUserLoading = () => useUserStore((state) => state.isLoading);
export const useUserError = () => useUserStore((state) => state.error);
export const useUserInitialized = () =>
  useUserStore((state) => state.isInitialized);

// Action selectors - Use individual selectors to avoid infinite loops
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useSetAccounts = () => useUserStore((state) => state.setAccounts);
export const useUpdateUserPreferences = () =>
  useUserStore((state) => state.updateUserPreferences);
export const useAddAccount = () => useUserStore((state) => state.addAccount);
export const useUpdateAccount = () =>
  useUserStore((state) => state.updateAccount);
export const useRemoveAccount = () =>
  useUserStore((state) => state.removeAccount);
export const useSetLoading = () => useUserStore((state) => state.setLoading);
export const useSetError = () => useUserStore((state) => state.setError);
export const useSetInitialized = () =>
  useUserStore((state) => state.setInitialized);
export const useClearUser = () => useUserStore((state) => state.clearUser);

// Legacy action selector for backward compatibility - DO NOT USE in useEffect dependencies
export const useUserActions = () =>
  useUserStore((state) => ({
    setUser: state.setUser,
    setAccounts: state.setAccounts,
    updateUserPreferences: state.updateUserPreferences,
    addAccount: state.addAccount,
    updateAccount: state.updateAccount,
    removeAccount: state.removeAccount,
    setLoading: state.setLoading,
    setError: state.setError,
    setInitialized: state.setInitialized,
    clearUser: state.clearUser,
  }));
