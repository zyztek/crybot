import { create } from 'zustand';
import type { StateCreator } from 'zustand';

export interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthStore: StateCreator<AuthState> = (set: any, get: any, api: any) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
});
