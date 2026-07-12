// ───────────────────────────────────────────────────────────
// Supabase client placeholder
//
// Supabase is NOT connected yet.  When you are ready to go live:
//
//   1.  Add the following two values to your `.env` file:
//
//         VITE_SUPABASE_URL=https://<your-project>.supabase.co
//         VITE_SUPABASE_ANON_KEY=<your-anon-key>
//
//   2.  Uncomment the `createClient` import and the client block
//       below, then delete the `export const supabase = null` line.
//
//   3.  The auth service in /services/auth.ts already imports
//       `supabase` from this file, so no other code needs to change.
// ───────────────────────────────────────────────────────────

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TODO: Replace `null` with `createClient(...)` once credentials are set.
export const supabase = null;

export type SupabaseClient = typeof supabase;
