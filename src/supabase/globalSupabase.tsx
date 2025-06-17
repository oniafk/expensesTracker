import { supabase } from "./supabase.config";

export async function getIdAuthSupabase() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }

  if (session?.user) {
    return session.user.id;
  }

  return null;
}
