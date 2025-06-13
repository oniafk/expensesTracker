import type { User } from "@supabase/supabase-js";

/**
 * Authentication state types
 */
export interface AuthUser extends User {
  // Add custom user properties if needed
  displayName?: string;
  avatarUrl?: string;
}

/**
 * Auth loading states
 */
export type AuthLoadingState =
  | "idle"
  | "signing-in"
  | "signing-out"
  | "initializing";

/**
 * Auth error types
 */
export interface AuthError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Auth event types for tracking
 */
export type AuthEvent =
  | "sign-in-started"
  | "sign-in-success"
  | "sign-in-failed"
  | "sign-out-started"
  | "sign-out-success"
  | "sign-out-failed"
  | "session-expired";

/**
 * Provider types for future expansion
 */
export type AuthProvider = "google" | "github" | "facebook" | "apple";

/**
 * Auth configuration
 */
export interface AuthConfig {
  redirectUrl?: string;
  rememberMe?: boolean;
  provider?: AuthProvider;
}
