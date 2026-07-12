import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Profile } from '../types';
import * as authService from '../services/auth';

interface AuthContextValue {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean; // initial session check
  isPending: boolean; // ongoing auth action
  error: string | null;
  signUp: (input: authService.SignUpInput) => Promise<{ error?: string }>;
  login: (input: authService.LoginInput) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  resetPassword: (pw: string) => Promise<{ error?: string }>;
  updateProfile: (updates: authService.UpdateProfileInput) => Promise<{ error?: string }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'uid-auth-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session on mount (mock: localStorage; Supabase: onAuthStateChange)
  useEffect(() => {
    let active = true;
    (async () => {
      // TODO: replace with `supabase.auth.getSession()` / `getCurrentUser()`
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          const current = await authService.getCurrentUser();
          if (active && current) setUser(current);
        }
      } catch {
        /* ignore parse errors */
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const persist = (u: Profile | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const wrap = async (fn: () => Promise<{ user?: Profile | null; error?: string }>) => {
    setIsPending(true);
    setError(null);
    try {
      const res = await fn();
      if (res.error) {
        setError(res.error);
        return { error: res.error };
      }
      if (res.user) {
        setUser(res.user);
        persist(res.user);
      }
      return {};
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong';
      setError(msg);
      return { error: msg };
    } finally {
      setIsPending(false);
    }
  };

  const signUp = useCallback(
    (input: authService.SignUpInput) => wrap(() => authService.signUp(input)),
    [],
  );

  const login = useCallback(
    (input: authService.LoginInput) => wrap(() => authService.login(input)),
    [],
  );

  const logout = useCallback(async () => {
    setIsPending(true);
    await authService.logout();
    setUser(null);
    persist(null);
    setIsPending(false);
  }, []);

  const forgotPassword = useCallback(
    (email: string) => wrap(() => authService.forgotPassword(email).then(r => ({ user: null, ...r }))),
    [],
  );

  const resetPassword = useCallback(
    (pw: string) => wrap(() => authService.resetPassword(pw).then(r => ({ user: null, ...r }))),
    [],
  );

  const updateProfile = useCallback(
    (updates: authService.UpdateProfileInput) => wrap(() => authService.updateProfile(updates)),
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isPending,
    error,
    signUp,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
