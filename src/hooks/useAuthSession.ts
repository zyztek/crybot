/**
 * useAuthSession Hook - Handles authentication initialization and session management
 * 
 * Manages:
 * - Initial session sync on mount
 * - Login/logout handlers
 * - Loading states
 */

import { useState, useEffect, useCallback } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { useApi } from './useApi';

interface Referral {
  id: string;
  username: string;
  createdAt: string;
  earnings?: string;
}

interface UseAuthSessionReturn {
  isInitialized: boolean;
  isLoading: boolean;
  handleLogin: () => void;
  handleLogout: () => Promise<void>;
  referrals: Referral[];
}

export const useAuthSession = (): UseAuthSessionReturn => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const store = useCryptoStore();
  const { 
    logout: apiLogout, 
    fetchFaucets, 
    fetchWallets, 
    fetchAchievements, 
    fetchLeaderboard, 
    fetchUserStats,
    fetchReferrals: fetchReferralsApi,
    syncAuth 
  } = useApi();

  const [referrals, setReferrals] = useState<
    Array<{ id: string; username: string; createdAt: string; earnings?: string }>
  >([]);

  // Initialize on mount - check for existing session
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const success = await syncAuth();
        if (success) {
          store.login();
          // Fetch all real data from API in parallel
          await Promise.all([
            fetchFaucets(),
            fetchWallets(),
            fetchAchievements(),
            fetchLeaderboard('all_time'),
            fetchUserStats(),
          ]).catch(err => console.error('Failed to fetch initial data:', err));

          // Fetch referrals for the referral view
          const referralsData = await fetchReferralsApi();
          if (referralsData?.referrals) {
            setReferrals(
              referralsData.referrals.map(r => ({
                id: r.id,
                username: r.username,
                createdAt: r.createdAt,
              }))
            );
          }
        }
      }
      setIsInitialized(true);
      setIsLoading(false);
    };
    init();
  }, [store, syncAuth, fetchFaucets, fetchWallets, fetchAchievements, fetchLeaderboard, fetchUserStats, fetchReferralsApi]);

  // Handle login from LoginScreen
  const handleLogin = useCallback(() => {
    store.login();
  }, [store]);

  // Handle logout with API call
  const handleLogout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      store.logout();
    }
  }, [store, apiLogout]);

  return {
    isInitialized,
    isLoading,
    handleLogin,
    handleLogout,
    referrals,
  };
};

export default useAuthSession;