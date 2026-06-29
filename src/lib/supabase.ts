import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * Returns a singleton Supabase browser client, or null when the public env
 * vars are not set. Callers must handle null so the app keeps working in
 * localStorage-only mode (e.g. before env vars are configured on the host).
 */
export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  cached = url && key ? createClient(url, key) : null;
  return cached;
}
