/**
 * User Data Hooks - React Query Integration
 * Custom hooks for seamless user data management with optimal caching
 */

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserById,
  getUserProfileByAuthId,
  updateUser,
  upsertUserFromAuth,
  getUserAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../supabase/UserService";
import type {
  User,
  Account,
  UserUpdate,
  AccountInsert,
  AccountUpdate,
  AuthUserData,
} from "../types/database.types";
import { useUserStore } from "../store/UserStore";

// =====================================================
// QUERY KEYS
// =====================================================

export const userQueryKeys = {
  all: ["users"] as const,
  byId: (id: string) => [...userQueryKeys.all, "byId", id] as const,
  byAuthId: (authId: string) =>
    [...userQueryKeys.all, "byAuthId", authId] as const,
  profile: (id: string) => [...userQueryKeys.all, "profile", id] as const,
  profileByAuthId: (authId: string) =>
    [...userQueryKeys.all, "profileByAuthId", authId] as const,
  accounts: (userId: string) =>
    [...userQueryKeys.all, "accounts", userId] as const,
};

// =====================================================
// USER QUERY HOOKS
// =====================================================

/**
 * Hook to get user profile by auth ID with Zustand integration
 */
export const useUserProfile = (authId: string | null) => {
  const query = useQuery({
    queryKey: userQueryKeys.profileByAuthId(authId || ""),
    queryFn: () => getUserProfileByAuthId(authId!),
    enabled: !!authId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
};

/**
 * Hook to get user by ID
 */
export const useUser = (userId: string | null) => {
  return useQuery({
    queryKey: userQueryKeys.byId(userId || ""),
    queryFn: () => getUserById(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to get user accounts
 */
export const useUserAccountsQuery = (userId: string | null) => {
  const query = useQuery({
    queryKey: userQueryKeys.accounts(userId || ""),
    queryFn: () => getUserAccounts(userId!),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes (accounts change more frequently)
    gcTime: 5 * 60 * 1000,
  });

  React.useEffect(() => {
    if (query.data) {
      useUserStore.getState().setAccounts(query.data);
    }
  }, [query.data]);

  return query;
};

// =====================================================
// USER MUTATION HOOKS
// =====================================================

/**
 * Hook to update user preferences with optimistic updates
 */
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: string;
      updates: UserUpdate;
    }) => updateUser(userId, updates),

    onMutate: async ({ updates }: { updates: UserUpdate }) => {
      // Optimistically update Zustand store
      useUserStore.getState().updateUserPreferences(updates);
      return { updates };
    },

    onError: (error: Error) => {
      console.error("Failed to update user:", error);
    },

    onSuccess: (data: User | null) => {
      // Update with server response
      if (data) {
        useUserStore.getState().setUser(data);
      }
    },
  });
};

/**
 * Hook to create or update user from authentication
 */
export const useUpsertUserFromAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (authUserData: AuthUserData) =>
      upsertUserFromAuth(authUserData),

    onSuccess: (data: User) => {
      // Update all relevant queries
      queryClient.setQueryData(userQueryKeys.byId(data.id), data);
      queryClient.setQueryData(userQueryKeys.byAuthId(data.authId), data);

      // Update Zustand store
      useUserStore.getState().setUser(data);
      useUserStore.getState().setInitialized(true);

      // Prefetch user accounts
      queryClient.prefetchQuery({
        queryKey: userQueryKeys.accounts(data.id),
        queryFn: () => getUserAccounts(data.id),
      });
    },

    onError: (error: Error) => {
      console.error("Error upserting user from auth:", error);
    },
  });
};

// =====================================================
// ACCOUNT MUTATION HOOKS
// =====================================================

/**
 * Hook to create a new account
 */
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountData: AccountInsert) => createAccount(accountData),

    onSuccess: (data: Account | null, variables: AccountInsert) => {
      if (data) {
        // Update accounts query
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.accounts(variables.idUser),
        });

        // Update Zustand store
        useUserStore.getState().addAccount(data);
      }
    },
  });
};

/**
 * Hook to update an account with optimistic updates
 */
export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: ({
      accountId,
      updates,
    }: {
      accountId: number;
      updates: AccountUpdate;
    }) => updateAccount(accountId, updates),

    onMutate: async ({ accountId, updates }) => {
      // Optimistically update Zustand store
      useUserStore.getState().updateAccount(accountId, updates);
      return { accountId, updates };
    },

    onError: (error: Error) => {
      console.error("Failed to update account:", error);
    },
  });
};

/**
 * Hook to delete an account
 */
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: ({ accountId }: { accountId: number }) =>
      deleteAccount(accountId),

    onMutate: async ({ accountId }: { accountId: number }) => {
      // Optimistically remove from store
      useUserStore.getState().removeAccount(accountId);
      return { accountId };
    },

    onError: (error: Error) => {
      console.error("Failed to delete account:", error);
    },
  });
};

// =====================================================
// COMBINED HOOKS
// =====================================================

/**
 * Main hook for user data management
 * Combines user profile and accounts with loading states
 */
/**
 * Main hook for user data management
 * Returns React Query data directly without automatic store updates
 */
export const useUserData = (authId: string | null) => {
  const userProfileQuery = useUserProfile(authId);

  // Return query data directly - let the UserProvider handle store updates
  return {
    user: userProfileQuery.data || null,
    accounts: userProfileQuery.data?.accounts || [],
    isLoading: userProfileQuery.isLoading,
    isError: userProfileQuery.isError,
    error: userProfileQuery.error,
    isInitialized: !!userProfileQuery.data && !userProfileQuery.isLoading,
    refetch: userProfileQuery.refetch,
  };
};
