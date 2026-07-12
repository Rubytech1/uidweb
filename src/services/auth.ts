// ───────────────────────────────────────────────────────────
// Authentication Service
//
// Every function below is a placeholder.  It returns mock data so the
// UI is fully functional today.  When Supabase is connected (see
// /lib/supabase.ts), replace the TODO bodies with the corresponding
// Supabase Auth calls — the function signatures and return types stay
// the same, so no UI changes are required.
// ───────────────────────────────────────────────────────────

import type { AuthResult, Profile } from '../types';
// import { supabase } from '../lib/supabase'; // TODO: uncomment when Supabase is connected

// ── Mock user used while Supabase is not connected ──────────────
const MOCK_USER: Profile = {
  id: 'mock-0001',
  first_name: 'Demo',
  last_name: 'Member',
  username: 'demomember',
  email: 'demo@uid-toronto.ca',
  phone: '+1 (416) 555-0148',
  membership_type: 'individual',
  membership_status: 'active',
  renewal_date: '2026-12-31',
  discount_code: 'UID-2026-XK7P',
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface SignUpInput {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  emailOrUsername: string;
  password: string;
  remember?: boolean;
}

export interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  avatar_url?: string;
}

// ── signUp ─────────────────────────────────────────────────────
export async function signUp(input: SignUpInput): Promise<AuthResult> {
  await delay(1200); // simulate network latency

  // TODO: Supabase implementation:
  // const { data, error } = await supabase.auth.signUp({
  //   email: input.email,
  //   password: input.password,
  //   options: {
  //     data: {
  //       first_name: input.first_name,
  //       last_name: input.last_name,
  //       username: input.username,
  //     },
  //   },
  // });
  // if (error) return { user: null, error: error.message };
  // return { user: mapToProfile(data.user) };

  console.info('[auth.signUp] mock signup for', input.email);
  return { user: { ...MOCK_USER, first_name: input.first_name, last_name: input.last_name, username: input.username, email: input.email } };
}

// ── login ───────────────────────────────────────────────────────
export async function login(input: LoginInput): Promise<AuthResult> {
  await delay(1000);

  // TODO: Supabase implementation:
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email: input.emailOrUsername.includes('@') ? input.emailOrUsername : undefined,
  //   password: input.password,
  // });
  // if (error) return { user: null, error: error.message };
  // return { user: await fetchProfile(data.user.id) };

  console.info('[auth.login] mock login for', input.emailOrUsername);
  return { user: { ...MOCK_USER, email: input.emailOrUsername.includes('@') ? input.emailOrUsername : MOCK_USER.email } };
}

// ── logout ──────────────────────────────────────────────────────
export async function logout(): Promise<{ error?: string }> {
  await delay(300);

  // TODO: Supabase implementation:
  // const { error } = await supabase.auth.signOut();
  // return { error: error?.message };

  console.info('[auth.logout] mock logout');
  return {};
}

// ── getCurrentUser ───────────────────────────────────────────────
export async function getCurrentUser(): Promise<Profile | null> {
  await delay(200);

  // TODO: Supabase implementation:
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) return null;
  // return fetchProfile(user.id);

  return MOCK_USER;
}

// ── forgotPassword ───────────────────────────────────────────────
export async function forgotPassword(email: string): Promise<{ error?: string }> {
  await delay(900);

  // TODO: Supabase implementation:
  // const { error } = await supabase.auth.resetPasswordForEmail(email, {
  //   redirectTo: `${window.location.origin}/reset-password`,
  // });
  // return { error: error?.message };

  console.info('[auth.forgotPassword] mock reset for', email);
  return {};
}

// ── resetPassword ────────────────────────────────────────────────
export async function resetPassword(newPassword: string): Promise<{ error?: string }> {
  await delay(1000);

  // TODO: Supabase implementation:
  // const { error } = await supabase.auth.updateUser({ password: newPassword });
  // return { error: error?.message };

  console.info('[auth.resetPassword] mock reset, pw length:', newPassword.length);
  return {};
}

// ── updateProfile ────────────────────────────────────────────────
export async function updateProfile(updates: UpdateProfileInput): Promise<AuthResult> {
  await delay(700);

  // TODO: Supabase implementation:
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) return { user: null, error: 'Not authenticated' };
  // const { data, error } = await supabase
  //   .from('profiles')
  //   .update(updates)
  //   .eq('id', user.id)
  //   .select()
  //   .single();
  // if (error) return { user: null, error: error.message };
  // return { user: data as Profile };

  console.info('[auth.updateProfile] mock update', updates);
  return { user: { ...MOCK_USER, ...updates } };
}
