/**
 * Real-time Subscriptions Hook
 * Supabase real-time updates for user data synchronization
 */

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabase.config";
import type { User, Account } from "../types/database.types";
import { useUserStore } from "../store/UserStore";
import { userQueryKeys } from "./useUserData";

/**
 * Hook to subscribe to real-time user data updates
 */
export const useUserRealtimeSubscription = (userId: string | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    // Subscribe to user updates
    const userSubscription = supabase
      .channel(`user-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          const updatedUser = payload.new as User;

          // Update React Query cache
          queryClient.setQueryData(userQueryKeys.byId(userId), updatedUser);

          // Update Zustand store
          useUserStore.getState().setUser(updatedUser);
        }
      )
      .subscribe();

    // Subscribe to account changes
    const accountSubscription = supabase
      .channel(`accounts-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "account",
          filter: `idUser=eq.${userId}`,
        },
        (payload) => {
          const newAccount = payload.new as Account;

          // Update React Query cache
          queryClient.setQueryData<Account[]>(
            userQueryKeys.accounts(userId),
            (old) => (old ? [...old, newAccount] : [newAccount])
          );

          // Update Zustand store
          useUserStore.getState().addAccount(newAccount);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "account",
          filter: `idUser=eq.${userId}`,
        },
        (payload) => {
          const updatedAccount = payload.new as Account;

          // Update React Query cache
          queryClient.setQueryData<Account[]>(
            userQueryKeys.accounts(userId),
            (old) =>
              old
                ? old.map((acc) =>
                    acc.id === updatedAccount.id ? updatedAccount : acc
                  )
                : [updatedAccount]
          );

          // Update Zustand store
          useUserStore
            .getState()
            .updateAccount(updatedAccount.id, updatedAccount);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "account",
          filter: `idUser=eq.${userId}`,
        },
        (payload) => {
          const deletedAccount = payload.old as Account;

          // Update React Query cache
          queryClient.setQueryData<Account[]>(
            userQueryKeys.accounts(userId),
            (old) =>
              old ? old.filter((acc) => acc.id !== deletedAccount.id) : []
          );

          // Update Zustand store
          useUserStore.getState().removeAccount(deletedAccount.id);
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      userSubscription.unsubscribe();
      accountSubscription.unsubscribe();
    };
  }, [userId, queryClient]);
};

/**
 * Hook to handle connection status
 */
export const useRealtimeConnection = () => {
  useEffect(() => {
    const channel = supabase.channel("connection-status");

    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Real-time connection established");
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to real-time updates");
        } else if (status === "CHANNEL_ERROR") {
          console.error("Real-time connection error");
        } else if (status === "TIMED_OUT") {
          console.warn("Real-time connection timed out");
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);
};
