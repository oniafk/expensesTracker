/**
 * Enhanced User Service
 * Complete CRUD operations for users and accounts with TypeScript support
 */

import { supabase } from "./supabase.config";
import type {
  User,
  Account,
  UserInsert,
  UserUpdate,
  AccountInsert,
  AccountUpdate,
  UserProfile,
  AuthUserData,
} from "../types/database.types";

// =====================================================
// USER OPERATIONS
// =====================================================

/**
 * Create a new user in the database
 * @param userData - User data to insert
 * @returns Promise<User | null>
 */
export const createUser = async (
  userData: UserInsert
): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert(userData)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating user:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

/**
 * Get user by auth ID
 * @param authId - Supabase auth user ID
 * @returns Promise<User | null>
 */
export const getUserByAuthId = async (authId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("authId", authId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      console.error("Error getting user by auth ID:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in getUserByAuthId:", error);
    throw error;
  }
};

/**
 * Get user by ID
 * @param userId - User UUID
 * @returns Promise<User | null>
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error getting user by ID:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

/**
 * Update user data
 * @param userId - User UUID
 * @param updates - Partial user data to update
 * @returns Promise<User | null>
 */
export const updateUser = async (
  userId: string,
  updates: UserUpdate
): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating user:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
};

/**
 * Create or update user from Google OAuth data
 * @param authUserData - Data from Google OAuth
 * @returns Promise<User>
 */
export const upsertUserFromAuth = async (
  authUserData: AuthUserData
): Promise<User> => {
  try {
    // First try to get existing user
    const existingUser = await getUserByAuthId(authUserData.id);

    if (existingUser) {
      // Update existing user with latest auth data
      const updatedUser = await updateUser(existingUser.id, {
        name: authUserData.name,
        picture: authUserData.picture,
        email: authUserData.email,
      });

      return updatedUser!;
    } else {
      // Create new user
      const newUser = await createUser({
        name: authUserData.name,
        picture: authUserData.picture,
        email: authUserData.email,
        authId: authUserData.id,
        // Defaults will be applied by database
      });

      return newUser!;
    }
  } catch (error) {
    console.error("Error in upsertUserFromAuth:", error);
    throw error;
  }
};

// =====================================================
// ACCOUNT OPERATIONS
// =====================================================

/**
 * Get all accounts for a user
 * @param userId - User UUID
 * @returns Promise<Account[]>
 */
export const getUserAccounts = async (userId: string): Promise<Account[]> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("idUser", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error getting user accounts:", error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error("Error in getUserAccounts:", error);
    throw error;
  }
};

/**
 * Create a new account for a user
 * @param accountData - Account data to insert
 * @returns Promise<Account | null>
 */
export const createAccount = async (
  accountData: AccountInsert
): Promise<Account | null> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .insert(accountData)
      .select("*")
      .single();

    if (error) {
      console.error("Error creating account:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error;
  }
};

/**
 * Update an account
 * @param accountId - Account ID
 * @param updates - Partial account data to update
 * @returns Promise<Account | null>
 */
export const updateAccount = async (
  accountId: number,
  updates: AccountUpdate
): Promise<Account | null> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .update(updates)
      .eq("id", accountId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating account:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error in updateAccount:", error);
    throw error;
  }
};

/**
 * Delete an account
 * @param accountId - Account ID
 * @returns Promise<boolean>
 */
export const deleteAccount = async (accountId: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("account")
      .delete()
      .eq("id", accountId);

    if (error) {
      console.error("Error deleting account:", error);
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    throw error;
  }
};

// =====================================================
// COMBINED OPERATIONS
// =====================================================

/**
 * Get complete user profile with accounts
 * @param userId - User UUID
 * @returns Promise<UserProfile | null>
 */
export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const [user, accounts] = await Promise.all([
      getUserById(userId),
      getUserAccounts(userId),
    ]);

    if (!user) {
      return null;
    }

    return {
      ...user,
      accounts,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
};

/**
 * Get complete user profile by auth ID
 * @param authId - Supabase auth user ID
 * @returns Promise<UserProfile | null>
 */
export const getUserProfileByAuthId = async (
  authId: string
): Promise<UserProfile | null> => {
  try {
    const user = await getUserByAuthId(authId);

    if (!user) {
      return null;
    }

    const accounts = await getUserAccounts(user.id);

    return {
      ...user,
      accounts,
    };
  } catch (error) {
    console.error("Error in getUserProfileByAuthId:", error);
    throw error;
  }
};

// =====================================================
// LEGACY SUPPORT
// =====================================================

/**
 * @deprecated Use createUser instead
 */
export const InsertUsers = createUser;
