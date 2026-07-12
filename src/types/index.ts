// ───────────────────────────────────────────────────────────
// Database Types
// These interfaces mirror the Supabase tables that will back the
// authentication and membership system.  When Supabase is connected,
// generate the concrete types with `supabase gen types typescript` and
// replace these placeholder interfaces with the generated ones — the
// service layer already consumes these shapes, so no UI changes needed.
// ───────────────────────────────────────────────────────────

export type MembershipType = 'student' | 'individual' | 'family' | 'lifetime';
export type MembershipStatus = 'active' | 'expired' | 'pending' | 'suspended';

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string | null;
  membership_type: MembershipType;
  membership_status: MembershipStatus;
  renewal_date: string | null; // ISO date string
  discount_code: string | null;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Membership {
  id: string;
  profile_id: string;
  type: MembershipType;
  status: MembershipStatus;
  start_date: string; // ISO date string
  renewal_date: string | null; // ISO date string
  price_paid: number;
  payment_id?: string | null;
  created_at?: string;
}

export interface MemberEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  image_url?: string | null;
  url?: string | null;
}

export interface MemberNews {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string
  url?: string | null;
  image_url?: string | null;
}

export interface AuthSession {
  user: Profile | null;
  isAuthenticated: boolean;
}

// Shape returned by the auth service after a successful sign-up / login
export interface AuthResult {
  user: Profile | null;
  error?: string;
}
