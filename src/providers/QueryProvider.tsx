/**
 * React Query Provider Configuration
 * Optimized caching and error handling for the expenses tracker app
 */

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client with optimized settings for user personalization
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache user data for 5 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Keep in cache for 10 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        // Retry failed requests only once to prevent resource exhaustion
        retry: 1,
        // Add delay between retries
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Don't refetch on window focus for user data
        refetchOnWindowFocus: false,
        // Refetch on reconnect for fresh data
        refetchOnReconnect: true,
        // Show stale data while refetching
        refetchOnMount: "always",
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
        // Network mode for offline support
        networkMode: "online",
      },
    },
  });
};

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // Create query client instance
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
