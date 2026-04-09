import { createContext, useContext, useState } from 'react';
import useAuthSession from '../hooks/useAuthSession';
import useFaucetClaim from '../hooks/useFaucetClaim';
import { texts, useCryptoStore } from '../store/cryptoStore';
import { BaseTabType } from '../types/tabs';

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  // Auth state
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: any;
  handleLogin: () => void;
  handleLogout: () => void;
  referrals: any;

  // UI state
  activeTab: BaseTabType;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  notifications: number;
  showWalletAddress: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearSearch: () => void;

  // Data state
  walletBalance: any;
  faucets: any;
  history: any;
  achievements: any;
  leaderboard: any;
  withdrawalHistory: any[];

  // Actions
  setActiveTab: (tab: BaseTabType) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  toggleWalletAddress: () => void;
  copyReferralCode: () => void;
  handleClaimFaucet: (faucet: any) => void;
  t: any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children }: AppProviderProps) {
  const {
    isLoggedIn,
    activeTab,
    language,
    theme,
    notifications,
    showWalletAddress,
    user,
    walletBalance,
    faucets,
    history,
    achievements,
    leaderboard,
    setActiveTab,
    toggleLanguage,
    toggleTheme,
    toggleWalletAddress,
    copyReferralCode,
  } = useCryptoStore();

  // Custom hooks for auth and faucet claims
  const { isInitialized, handleLogin, handleLogout, referrals } = useAuthSession();
  const { handleClaimFaucet } = useFaucetClaim();

  // Local state for search
  const [searchTerm, setSearchTerm] = useState('');

  // Mock withdrawal history for wallet view
  const withdrawalHistory = [
    {
      id: 1,
      coin: 'BTC',
      amount: '0.0001',
      address: 'bc1q...',
      status: 'completed',
      date: '2024-01-10',
    },
  ];

  // Get translations for current language
  const t = texts[language];

  const contextValue: AppContextType = {
    // Auth state
    isLoggedIn,
    isInitialized,
    user,
    handleLogin,
    handleLogout,
    referrals,

    // UI state
    activeTab,
    language,
    theme,
    notifications,
    showWalletAddress,
    searchTerm,
    setSearchTerm,
    onClearSearch: () => setSearchTerm(''),

    // Data state
    walletBalance,
    faucets,
    history,
    achievements,
    leaderboard,
    withdrawalHistory,

    // Actions
    setActiveTab,
    toggleLanguage,
    toggleTheme,
    toggleWalletAddress,
    copyReferralCode,
    handleClaimFaucet,
    t,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
