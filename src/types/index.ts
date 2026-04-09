/**
 * Represents a cryptocurrency faucet
 * @interface Faucet
 */
export interface Faucet {
  id: number;
  name: string;
  coin: string;
  icon: string;
  reward: string;
  timer: number;
  status: 'available' | 'claimed' | 'wait';
  category: 'hot' | 'stable' | 'new' | 'premium';
  difficulty: 'easy' | 'medium' | 'hard';
  translations: {
    es: string;
    en: string;
  };
}

/**
 * Represents a claim history entry
 * @interface ClaimHistory
 */
export interface ClaimHistory {
  id: number;
  faucet: string;
  faucetId: number;
  coin: string;
  amount: string;
  time: string;
  date: string;
}

/**
 * Represents wallet balance across multiple cryptocurrencies
 * @interface WalletBalance
 */
export interface WalletBalance {
  btc: string;
  eth: string;
  doge: string;
  sol: string;
  ltc: string;
  bnb: string;
  xrp: string;
  ada: string;
  avax: string;
  dot: string;
  matic: string;
  link: string;
  atom: string;
  uni: string;
}

/**
 * Represents a user achievement
 * @interface Achievement
 */
export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  unlocked: boolean;
  reward: string;
}

/**
 * Represents a user account
 * @interface User
 */
export interface User {
  username: string;
  email: string;
  level: number;
  xp: number;
  maxXp: number;
  memberSince: string;
  avatar: string;
  twoFactorEnabled: boolean;
  referralCode: string;
  totalReferrals: number;
  referralEarnings: string;
  totalEarned?: string;
  totalClaims?: number;
}

/**
 * Represents a leaderboard entry
 * @interface LeaderboardEntry
 */
export interface LeaderboardEntry {
  rank: number;
  username: string;
  totalClaimed: string;
  claims: number;
  avatar: string;
  isUser?: boolean;
}

// Re-export tab types from modular system
export type {
  BaseTabType,
  CommunityTabType,
  DeFiTabType,
  GamingTabType,
  TabType,
  TradingTabType,
  UtilityTabType,
} from './tabs';

/**
 * Union type of available social media icon types
 * @type SocialIconType
 */
export type SocialIconType =
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'youtube'
  | 'discord'
  | 'telegram'
  | 'whatsapp';

export {
  TAB_CATEGORIES,
  isBaseTab,
  isCommunityTab,
  isDeFiTab,
  isGamingTab,
  isTradingTab,
  isUtilityTab,
} from './tabs';
