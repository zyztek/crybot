import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { Achievement, LeaderboardEntry } from '@/types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: 'First Claim',
    description: 'Make your first claim',
    icon: '🎯',
    progress: 1,
    total: 1,
    unlocked: true,
    reward: '0.00001 BTC',
  },
  {
    id: 2,
    title: 'Claim Master',
    description: 'Claim 100 times',
    icon: '⚡',
    progress: 45,
    total: 100,
    unlocked: false,
    reward: '0.0001 BTC',
  },
  {
    id: 3,
    title: 'Bitcoin Lover',
    description: 'Earn 0.001 BTC total',
    icon: '₿',
    progress: 0.00023,
    total: 0.001,
    unlocked: false,
    reward: '0.00005 BTC',
  },
  {
    id: 4,
    title: 'Referral Star',
    description: 'Refer 10 users',
    icon: '⭐',
    progress: 24,
    total: 10,
    unlocked: true,
    reward: '0.00002 BTC',
  },
  {
    id: 5,
    title: 'Week Streak',
    description: 'Claim 7 days in a row',
    icon: '🔥',
    progress: 5,
    total: 7,
    unlocked: false,
    reward: '0.00003 BTC',
  },
  {
    id: 6,
    title: 'Coin Collector',
    description: 'Use 5 different faucets',
    icon: '💎',
    progress: 5,
    total: 5,
    unlocked: true,
    reward: '0.00002 BTC',
  },
  {
    id: 7,
    title: 'High Roller',
    description: 'Withdraw 0.01 BTC',
    icon: '👑',
    progress: 0.0001,
    total: 0.01,
    unlocked: false,
    reward: '0.0001 BTC',
  },
  {
    id: 8,
    title: 'Early Bird',
    description: 'Claim before 8 AM',
    icon: '🌅',
    progress: 3,
    total: 10,
    unlocked: false,
    reward: '0.00001 BTC',
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'CryptoKing', totalClaimed: '2.45678 BTC', claims: 5234, avatar: '👑' },
  { rank: 2, username: 'SatoshiFan', totalClaimed: '1.98765 BTC', claims: 4567, avatar: '🎩' },
  { rank: 3, username: 'ETHMaster', totalClaimed: '1.54321 BTC', claims: 3987, avatar: '⚡' },
  { rank: 4, username: 'DogeWhale', totalClaimed: '1.23456 BTC', claims: 3542, avatar: '🐕' },
  {
    rank: 5,
    username: 'CryptoUser123',
    totalClaimed: '0.87654 BTC',
    claims: 2345,
    avatar: '🦊',
    isUser: true,
  },
  { rank: 6, username: 'BitcoinHODL', totalClaimed: '0.76543 BTC', claims: 2134, avatar: '💰' },
  { rank: 7, username: 'SolanaSun', totalClaimed: '0.65432 BTC', claims: 1987, avatar: '☀️' },
  { rank: 8, username: 'LTCInvest', totalClaimed: '0.54321 BTC', claims: 1765, avatar: '💎' },
  { rank: 9, username: 'BNBHolder', totalClaimed: '0.43210 BTC', claims: 1543, avatar: '⬡' },
  { rank: 10, username: 'NewCryptoKid', totalClaimed: '0.32109 BTC', claims: 1234, avatar: '🌟' },
];

export interface AchievementsState {
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  updateAchievementProgress: (id: number, progress: number) => void;
  unlockAchievement: (id: number) => void;
}

 
export const createAchievementsStore: StateCreator<AchievementsState> = (
  set: any,
  get: any,
  api: any
) => ({
  achievements: INITIAL_ACHIEVEMENTS,
  leaderboard: LEADERBOARD,
  updateAchievementProgress: (id, progress) =>
    set((state: AchievementsState) => ({
      achievements: state.achievements.map(a =>
        a.id === id ? { ...a, progress: Math.min(progress, a.total) } : a
      ),
    })),
  unlockAchievement: id =>
    set((state: AchievementsState) => ({
      achievements: state.achievements.map(a => (a.id === id ? { ...a, unlocked: true } : a)),
    })),
});
