/**
 * Database Types for Expenses Tracker
 * TypeScript interfaces for all database tables with complete type safety
 */

// Base types for common fields
export interface BaseEntity {
  id: string;
  created_at: string;
}

// Theme options as const object for better TypeScript support
export const Theme = {
  LIGHT: "0",
  DARK: "1",
  SYSTEM: "2",
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

// Country and Currency types (can be extended)
export type Country =
  | "Australia"
  | "USA"
  | "UK"
  | "Canada"
  | "Germany"
  | "France"
  | "Japan"
  | "Other";
export type Currency = "AUD" | "USD" | "GBP" | "CAD" | "EUR" | "JPY";

/**
 * Users Table Interface
 * Represents a user in the system with personalization options
 */
export interface User extends BaseEntity {
  id: string; // UUID primary key
  created_at: string; // ISO timestamp
  name: string; // User's display name
  picture: string; // Profile picture URL
  email: string; // User's email address
  country: Country; // User's country (default: 'Australia')
  currency: Currency; // User's preferred currency (default: 'AUD')
  theme: Theme; // User's theme preference (default: '1' = light)
  authId: string; // Supabase auth user ID (foreign key)
}

/**
 * Account Table Interface
 * Represents a financial account belonging to a user
 */
export interface Account {
  id: number; // int8 primary key
  created_at: string; // ISO timestamp
  description: string; // Account description (default: 'wallet')
  balance: number; // Account balance (default: 0)
  idUser: string; // UUID foreign key to users table
  icon: string; // Account icon (default: '💰')
}

/**
 * Insert Types (for creating new records)
 * These exclude auto-generated fields like id and created_at
 */
export interface UserInsert {
  name: string;
  picture: string;
  email: string;
  country?: Country;
  currency?: Currency;
  theme?: Theme;
  authId: string;
}

export interface AccountInsert {
  description?: string;
  balance?: number;
  idUser: string;
  icon?: string;
}

/**
 * Update Types (for partial updates)
 * All fields are optional for updates
 */
export interface UserUpdate {
  name?: string;
  picture?: string;
  email?: string;
  country?: Country;
  currency?: Currency;
  theme?: Theme;
}

export interface AccountUpdate {
  description?: string;
  balance?: number;
  icon?: string;
}

/**
 * Query Response Types
 * For API responses and error handling
 */
export interface DatabaseResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export interface DatabaseListResponse<T> {
  data: T[];
  error: string | null;
  isLoading: boolean;
  count?: number;
}

/**
 * User Profile with Accounts
 * Complete user profile including their accounts
 */
export interface UserProfile extends User {
  accounts: Account[];
}

/**
 * Authentication User Data
 * Data received from Google OAuth that we use to create/update users
 */
export interface AuthUserData {
  id: string; // Supabase auth ID
  email: string;
  name: string;
  picture: string;
}

/**
 * User Preferences
 * Subset of user data for preferences management
 */
export interface UserPreferences {
  country: Country;
  currency: Currency;
  theme: Theme;
}
