import { vi } from 'vitest';
import type { TranslationTexts } from '@/i18n/translations';
import type {
  TabType,
  User,
  WalletBalance,
  ClaimHistory,
  Faucet,
  Achievement,
  LeaderboardEntry,
} from '@/types';

// Mock Translations (Spanish)
export const mockTranslations: TranslationTexts = {
  login: 'Iniciar Sesión',
  register: 'Registrarse',
  dashboard: 'Panel',
  faucets: 'Faucets',
  wallet: 'Billetera',
  referral: 'Referidos',
  leaderboard: 'Ranking',
  achievements: 'Logros',
  settings: 'Configuración',
  premium: 'Premium',
  hot: '🔥 Hot',
  stable: 'Estable',
  new: 'Nuevo',
  claimNow: 'Claim Ahora',
  remaining: 'restantes',
  claim: 'Reclamar',
  welcome: '¡Bienvenido!',
  totalClaimed: 'Total Reclamado',
  todayClaims: 'Claims Hoy',
  activeFaucets: 'Faucets Activos',
  availableCoins: 'Monedas',
  referralTitle: 'Programa de Referidos',
  referralDesc: 'Gana 10% de lo que ganen tus referidos',
  copyCode: 'Copiar Código',
  shareLink: 'Compartir Enlace',
  totalEarnings: 'Ganancias Totales',
  yourCode: 'Tu Código',
  leaderboardTitle: 'Ranking Global',
  rank: 'Rango',
  user: 'Usuario',
  claimed: 'Reclamado',
  claims: 'Claims',
  withdraw: 'Retirar',
  deposit: 'Depositar',
  balance: 'Balance',
  address: 'Dirección',
  history: 'Historial',
  recentWithdrawals: 'Retiros Recientes',
  achievementsTitle: 'Tus Logros',
  unlocked: 'Desbloqueado',
  locked: 'Bloqueado',
  progress: 'Progreso',
  complete: '¡Completado!',
  settingsTitle: 'Ajustes',
  account: 'Cuenta',
  security: 'Seguridad',
  notifications: 'Notificaciones',
  preferences: 'Preferencias',
  lang: 'Idioma',
  currency: 'Moneda',
  theme: 'Tema',
  logout: 'Cerrar Sesión',
  viewMore: 'Ver Más',
  connect: 'Conectar',
};

// Mock Translations (English)
export const mockTranslationsEn: TranslationTexts = {
  login: 'Login',
  register: 'Register',
  dashboard: 'Dashboard',
  faucets: 'Faucets',
  wallet: 'Wallet',
  referral: 'Referrals',
  leaderboard: 'Leaderboard',
  achievements: 'Achievements',
  settings: 'Settings',
  premium: 'Premium',
  hot: '🔥 Hot',
  stable: 'Stable',
  new: 'New',
  claimNow: 'Claim Now',
  remaining: 'remaining',
  claim: 'Claim',
  welcome: 'Welcome!',
  totalClaimed: 'Total Claimed',
  todayClaims: "Today's Claims",
  activeFaucets: 'Active Faucets',
  availableCoins: 'Available Coins',
  referralTitle: 'Referral Program',
  referralDesc: 'Earn 10% of what your referrals earn',
  copyCode: 'Copy Code',
  shareLink: 'Share Link',
  totalEarnings: 'Total Earnings',
  yourCode: 'Your Code',
  leaderboardTitle: 'Global Leaderboard',
  rank: 'Rank',
  user: 'User',
  claimed: 'Claimed',
  claims: 'Claims',
  withdraw: 'Withdraw',
  deposit: 'Deposit',
  balance: 'Balance',
  address: 'Address',
  history: 'History',
  recentWithdrawals: 'Recent Withdrawals',
  achievementsTitle: 'Your Achievements',
  unlocked: 'Unlocked',
  locked: 'Locked',
  progress: 'Progress',
  complete: 'Completed!',
  settingsTitle: 'Settings',
  account: 'Account',
  security: 'Security',
  notifications: 'Notifications',
  preferences: 'Preferences',
  lang: 'Language',
  currency: 'Currency',
  theme: 'Theme',
  logout: 'Logout',
  viewMore: 'View More',
  connect: 'Connect',
};

// Mock User
export const mockUser: User = {
  username: 'CryptoUser123',
  email: 'user@email.com',
  level: 12,
  xp: 2450,
  maxXp: 5000,
  memberSince: '2024-01-15',
  avatar: '🦊',
  twoFactorEnabled: true,
  referralCode: 'CRYPTO2024',
  totalReferrals: 24,
  referralEarnings: '0.00450 BTC',
};

// Mock Wallet Balance
export const mockWalletBalance: WalletBalance = {
  btc: '0.00023045',
  eth: '0.012340',
  doge: '45.6789',
  sol: '2.4567',
  ltc: '0.5678',
  bnb: '0.1234',
  xrp: '0.0',
  ada: '0.0',
  avax: '0.0',
  dot: '0.0',
  matic: '0.0',
  link: '0.0',
  atom: '0.0',
  uni: '0.0',
};

// Mock Claim History
export const mockHistory: ClaimHistory[] = [
  {
    id: 1,
    faucet: 'FreeBitco.in',
    faucetId: 1,
    coin: 'BTC',
    amount: '0.00001000',
    time: '14:32',
    date: 'Hoy',
  },
  {
    id: 2,
    faucet: 'FireFaucet',
    faucetId: 2,
    coin: 'ETH',
    amount: '0.0005',
    time: '14:25',
    date: 'Hoy',
  },
];

// Mock Faucets
export const mockFaucets: Faucet[] = [
  {
    id: 1,
    name: 'FreeBitco.in',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00001000',
    timer: 60,
    status: 'available',
    category: 'premium',
    difficulty: 'easy',
    translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
  },
  {
    id: 2,
    name: 'FireFaucet',
    coin: 'ETH',
    icon: 'Ξ',
    reward: '0.0005',
    timer: 30,
    status: 'available',
    category: 'hot',
    difficulty: 'medium',
    translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
  },
  {
    id: 3,
    name: 'Cointiply',
    coin: 'DOGE',
    icon: 'Ð',
    reward: '5.50',
    timer: 45,
    status: 'wait',
    category: 'stable',
    difficulty: 'easy',
    translations: { es: 'Moneda Gratis', en: 'Free Coins' },
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
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
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
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
];

// Mock Withdrawal History
export const mockWithdrawalHistory = [
  {
    id: 1,
    coin: 'BTC',
    amount: '0.0001',
    address: 'bc1q...',
    status: 'completed' as const,
    date: '2024-01-10',
  },
  {
    id: 2,
    coin: 'ETH',
    amount: '0.005',
    address: '0x1234...',
    status: 'pending' as const,
    date: '2024-01-12',
  },
  {
    id: 3,
    coin: 'DOGE',
    amount: '25.0',
    address: 'D8A7...',
    status: 'completed' as const,
    date: '2024-01-08',
  },
];

// All translations combined for easy access
export const allTranslations = {
  es: mockTranslations,
  en: mockTranslationsEn,
};

// Mock TabType for testing navigation
export const mockTabs: TabType[] = [
  'faucets',
  'dashboard',
  'wallet',
  'referral',
  'leaderboard',
  'achievements',
  'settings',
];

// Mock Lazy-loaded tabs
export const mockLazyTabs: TabType[] = [
  'analytics',
  'games',
  'portfolio',
  'lottery',
  'yield',
  'defi',
  'airdrop',
  'nft',
];

// Mock Faucets with different statuses
export const mockFaucetsByStatus = {
  available: [
    {
      id: 1,
      name: 'FreeBitco.in',
      coin: 'BTC',
      icon: '₿',
      reward: '0.00001000',
      timer: 60,
      status: 'available' as const,
      category: 'premium' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
    },
    {
      id: 2,
      name: 'FireFaucet',
      coin: 'ETH',
      icon: 'Ξ',
      reward: '0.0005',
      timer: 30,
      status: 'available' as const,
      category: 'hot' as const,
      difficulty: 'medium' as const,
      translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
    },
  ],
  wait: [
    {
      id: 3,
      name: 'Cointiply',
      coin: 'DOGE',
      icon: 'Ð',
      reward: '5.50',
      timer: 45,
      status: 'wait' as const,
      category: 'stable' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Moneda Gratis', en: 'Free Coins' },
    },
  ],
  claimed: [
    {
      id: 4,
      name: 'ClaimNow',
      coin: 'SOL',
      icon: '◎',
      reward: '0.001',
      timer: 60,
      status: 'claimed' as const,
      category: 'new' as const,
      difficulty: 'hard' as const,
      translations: { es: 'Reclamar Ahora', en: 'Claim Now' },
    },
  ],
};

// Mock Faucets by difficulty
export const mockFaucetsByDifficulty = {
  easy: [
    {
      id: 1,
      name: 'FreeBitco.in',
      coin: 'BTC',
      icon: '₿',
      reward: '0.00001000',
      timer: 60,
      status: 'available' as const,
      category: 'premium' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
    },
  ],
  medium: [
    {
      id: 2,
      name: 'FireFaucet',
      coin: 'ETH',
      icon: 'Ξ',
      reward: '0.0005',
      timer: 30,
      status: 'available' as const,
      category: 'hot' as const,
      difficulty: 'medium' as const,
      translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
    },
  ],
  hard: [
    {
      id: 5,
      name: 'MegaFaucet',
      coin: 'BNB',
      icon: '⬡',
      reward: '0.0001',
      timer: 120,
      status: 'available' as const,
      category: 'premium' as const,
      difficulty: 'hard' as const,
      translations: { es: 'Mega Faucet', en: 'Mega Faucet' },
    },
  ],
};

// Mock Faucets by category
export const mockFaucetsByCategory = {
  premium: [
    {
      id: 1,
      name: 'FreeBitco.in',
      coin: 'BTC',
      icon: '₿',
      reward: '0.00001000',
      timer: 60,
      status: 'available' as const,
      category: 'premium' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
    },
  ],
  hot: [
    {
      id: 2,
      name: 'FireFaucet',
      coin: 'ETH',
      icon: 'Ξ',
      reward: '0.0005',
      timer: 30,
      status: 'available' as const,
      category: 'hot' as const,
      difficulty: 'medium' as const,
      translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
    },
  ],
  stable: [
    {
      id: 3,
      name: 'Cointiply',
      coin: 'DOGE',
      icon: 'Ð',
      reward: '5.50',
      timer: 45,
      status: 'wait' as const,
      category: 'stable' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Moneda Gratis', en: 'Free Coins' },
    },
  ],
  new: [
    {
      id: 6,
      name: 'NewFaucet',
      coin: 'LTC',
      icon: 'Ł',
      reward: '0.0001',
      timer: 20,
      status: 'available' as const,
      category: 'new' as const,
      difficulty: 'easy' as const,
      translations: { es: 'Faucet Nuevo', en: 'New Faucet' },
    },
  ],
};

// Mock Extended History (for pagination/lazy loading tests)
export const mockExtendedHistory: ClaimHistory[] = [
  {
    id: 1,
    faucet: 'FreeBitco.in',
    faucetId: 1,
    coin: 'BTC',
    amount: '0.00001000',
    time: '14:32',
    date: 'Hoy',
  },
  {
    id: 2,
    faucet: 'FireFaucet',
    faucetId: 2,
    coin: 'ETH',
    amount: '0.0005',
    time: '14:25',
    date: 'Hoy',
  },
  {
    id: 3,
    faucet: 'Cointiply',
    faucetId: 3,
    coin: 'DOGE',
    amount: '5.50',
    time: '13:45',
    date: 'Hoy',
  },
  {
    id: 4,
    faucet: 'FreeBitco.in',
    faucetId: 1,
    coin: 'BTC',
    amount: '0.00001000',
    time: '12:20',
    date: 'Ayer',
  },
  {
    id: 5,
    faucet: 'MegaFaucet',
    faucetId: 4,
    coin: 'BNB',
    amount: '0.0001',
    time: '11:15',
    date: 'Ayer',
  },
];

// Mock User with different states
export const mockUsers = {
  basic: mockUser,
  newUser: {
    username: 'NewUser',
    email: 'new@email.com',
    level: 1,
    xp: 100,
    maxXp: 1000,
    memberSince: '2024-03-01',
    avatar: '🐣',
    twoFactorEnabled: false,
    referralCode: 'NEWUSER2024',
    totalReferrals: 0,
    referralEarnings: '0 BTC',
  },
  vipUser: {
    username: 'VIPUser',
    email: 'vip@email.com',
    level: 50,
    xp: 50000,
    maxXp: 50000,
    memberSince: '2023-01-01',
    avatar: '👑',
    twoFactorEnabled: true,
    referralCode: 'VIP2024',
    totalReferrals: 100,
    referralEarnings: '0.5 BTC',
  },
};

// Mock Wallet with different balances
export const mockWallets = {
  empty: { btc: '0', eth: '0', doge: '0', sol: '0', ltc: '0', bnb: '0', xrp: '0', ada: '0', avax: '0', dot: '0', matic: '0', link: '0', atom: '0', uni: '0' },
  small: mockWalletBalance,
  large: {
    btc: '1.23456789',
    eth: '10.543210',
    doge: '10000.5678',
    sol: '50.1234',
    ltc: '25.5678',
    bnb: '5.1234',
    xrp: '100.0',
    ada: '500.0',
    avax: '50.0',
    dot: '200.0',
    matic: '1000.0',
    link: '100.0',
    atom: '50.0',
    uni: '25.0',
  },
};

// Mock Achievement variants
export const mockAchievementVariants = {
  unlocked: [
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
  ],
  inProgress: [
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
  ],
  justStarted: [
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
  ],
  nearComplete: [
    {
      id: 4,
      title: 'High Roller',
      description: 'Earn 1 BTC total',
      icon: '💰',
      progress: 0.95,
      total: 1,
      unlocked: false,
      reward: '0.001 BTC',
    },
  ],
};

// Mock Notification types
export const mockNotifications = [
  {
    id: 1,
    type: 'claim' as const,
    message: 'You claimed 0.00001 BTC from FreeBitco.in',
    time: '5 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'referral' as const,
    message: 'Your referral earned 0.0001 BTC',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'achievement' as const,
    message: 'Achievement unlocked: First Claim!',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'system' as const,
    message: 'Maintenance scheduled for tomorrow',
    time: '1 day ago',
    read: true,
  },
];

// Mock ContentArea props
export const mockContentAreaProps = {
  faucets: mockFaucets,
  walletBalance: mockWalletBalance,
  history: mockHistory,
  achievements: mockAchievements,
  leaderboard: mockLeaderboard,
  withdrawalHistory: mockWithdrawalHistory,
  user: mockUser,
  showWalletAddress: false,
  language: 'es' as const,
  t: mockTranslations,
};

// Mock Leaderboard with more users
export const mockExtendedLeaderboard: LeaderboardEntry[] = [
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
  { rank: 6, username: 'SolanaStar', totalClaimed: '0.65432 BTC', claims: 1876, avatar: '🌟' },
  { rank: 7, username: 'LiteLad', totalClaimed: '0.43210 BTC', claims: 1234, avatar: '🪙' },
  { rank: 8, username: 'BNBBoost', totalClaimed: '0.32109 BTC', claims: 987, avatar: '🚀' },
  { rank: 9, username: 'NewbieMiner', totalClaimed: '0.12345 BTC', claims: 456, avatar: '⛏️' },
  { rank: 10, username: 'FaucetFan', totalClaimed: '0.09876 BTC', claims: 234, avatar: '💎' },
];

// Mock Daily Missions
interface DailyMission {
  id: number;
  name: string;
  nameZH: string;
  description: string;
  descriptionZH: string;
  icon: string;
  iconColor: string;
  bgGradient: string;
  progress: number;
  target: number;
  reward: number;
  rewardType: string;
  completed: boolean;
}

export const mockDailyMissions: DailyMission[] = [
  {
    id: 1,
    name: 'Complete 5 Faucet Claims',
    nameZH: '完成5次水龙头领取',
    description: 'Claim from any faucet 5 times',
    descriptionZH: '从任意水龙头领取5次',
    icon: 'target',
    iconColor: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
    progress: 3,
    target: 5,
    reward: 50,
    rewardType: 'FAUCBITS',
    completed: false,
  },
  {
    id: 2,
    name: 'Login 3 Days in a Row',
    nameZH: '连续登录3天',
    description: 'Keep your streak going',
    descriptionZH: '保持你的登录连胜',
    icon: 'flame',
    iconColor: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    progress: 3,
    target: 3,
    reward: 100,
    rewardType: 'FAUCBITS',
    completed: true,
  },
];

// Mock News Items
interface NewsItem {
  id: number;
  title: string;
  titleZH: string;
  category: string;
  categoryZH: string;
  categoryColor: string;
  content: string;
  contentZH: string;
  source: string;
  time: string;
  timeZH: string;
  trending: boolean;
  image: string;
}

export const mockNewsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Bitcoin Reaches New All-Time High',
    titleZH: '比特币创下历史新高',
    category: 'Market',
    categoryZH: '市场',
    categoryColor: 'green',
    content: 'Bitcoin has surged past $100,000 for the first time',
    contentZH: '比特币首次突破10万美元',
    source: 'CryptoNews',
    time: '2 hours ago',
    timeZH: '2小时前',
    trending: true,
    image: '📈',
  },
  {
    id: 2,
    title: 'New Ethereum Upgrade Announced',
    titleZH: '以太坊新升级宣布',
    category: 'Technology',
    categoryZH: '技术',
    categoryColor: 'blue',
    content: 'Ethereum Foundation reveals plans for the next major network upgrade',
    contentZH: '以太坊基金会公布下一次重大网络升级计划',
    source: 'ETH Daily',
    time: '4 hours ago',
    timeZH: '4小时前',
    trending: true,
    image: '⚡',
  },
  {
    id: 3,
    title: 'CryptoFaucet Hub Launches VIP Program',
    titleZH: 'CryptoFaucet Hub 推出VIP计划',
    category: 'Platform',
    categoryZH: '平台',
    categoryColor: 'purple',
    content: 'We are excited to announce our new VIP membership tiers',
    contentZH: '我们很高兴宣布新的VIP会员等级',
    source: 'Official',
    time: '6 hours ago',
    timeZH: '6小时前',
    trending: false,
    image: '🎉',
  },
];

// Mock Market Stats
export const mockMarketStats = [
  { label: 'Market Cap', labelZH: '市值', value: '$3.2T', change: '+5.2%', isUp: true },
  { label: '24h Volume', labelZH: '24h交易量', value: '$128B', change: '+12.8%', isUp: true },
  { label: 'BTC Dominance', labelZH: 'BTC主导地位', value: '52%', change: '-1.2%', isUp: false },
  { label: 'Active Wallets', labelZH: '活跃钱包', value: '420M', change: '+3.5%', isUp: true },
];

// Mock Crypto Events
interface CryptoEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type:
    | 'conference'
    | 'airdrop'
    | 'listing'
    | 'burn'
    | 'upgrade'
    | 'partnership'
    | 'hackathon'
    | 'earnings'
    | 'farming';
  status: 'upcoming' | 'live' | 'completed';
  impact: 'high' | 'medium' | 'low';
  description: string;
  project?: string;
  location?: string;
}

export const mockCryptoEvents: CryptoEvent[] = [
  {
    id: 1,
    title: 'Ethereum Cancun Upgrade',
    date: '2024-03-15',
    time: '14:00 UTC',
    type: 'upgrade',
    status: 'upcoming',
    impact: 'high',
    description: 'Major network upgrade introducing EIP-4844',
    project: 'Ethereum',
  },
  {
    id: 2,
    title: 'Bitcoin Halving',
    date: '2024-04-19',
    time: '00:00 UTC',
    type: 'burn',
    status: 'upcoming',
    impact: 'high',
    description: 'Bitcoin block reward halves from 6.25 to 3.125 BTC',
    project: 'Bitcoin',
  },
  {
    id: 3,
    title: 'Binance Blockchain Week',
    date: '2024-05-06',
    time: '09:00 UTC',
    type: 'conference',
    status: 'upcoming',
    impact: 'medium',
    description: 'Annual blockchain conference',
    project: 'Binance',
    location: 'Dubai',
  },
  {
    id: 4,
    title: 'Solana Airdrop Distribution',
    date: '2024-03-20',
    time: '16:00 UTC',
    type: 'airdrop',
    status: 'upcoming',
    impact: 'high',
    description: 'First airdrop season distributing tokens',
    project: 'Solana',
  },
];

// Mock Settings props (onLogout should be provided by tests)
export const mockSettingsProps = {
  user: mockUser,
  lang: 'es' as const,
};

// Mock Theme variants
export const mockThemes = {
  dark: { name: 'Dark', value: 'dark' },
  light: { name: 'Light', value: 'light' },
  auto: { name: 'Auto', value: 'auto' },
};

// Mock Languages
export const mockLanguages = {
  es: { name: 'Español', code: 'es' },
  en: { name: 'English', code: 'en' },
  zh: { name: '中文', code: 'zh' },
};

// Mock Currencies
export const mockCurrencies = {
  btc: { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
  eth: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
  doge: { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð' },
  sol: { name: 'Solana', symbol: 'SOL', icon: '◎' },
};

// Mock Notification Settings
export const mockNotificationSettings = {
  emailNotifications: true,
  pushNotifications: false,
  claimReminders: true,
  referralUpdates: true,
};

// Mock Gas Tracker data
export const mockGasData = {
  eth: { slow: '20 gwei', normal: '35 gwei', fast: '50 gwei' },
  bsc: { slow: '5 gwei', normal: '8 gwei', fast: '12 gwei' },
  polygon: { slow: '50 gwei', normal: '80 gwei', fast: '120 gwei' },
};

// Mock Price data
export const mockPriceData = {
  btc: { price: 67500.0, change24h: 2.5, change7d: 5.2 },
  eth: { price: 3450.0, change24h: 1.8, change7d: 3.1 },
  doge: { price: 0.165, change24h: -0.5, change7d: 1.2 },
  sol: { price: 175.5, change24h: 3.2, change7d: 8.5 },
};

// Mock Dex Prices for comparison
export const mockDexPrices = {
  btc: { uniswap: 67500, sushiswap: 67495, curve: 67502, pancake: 67498 },
  eth: { uniswap: 3450, sushiswap: 3452, curve: 3449, pancake: 3451 },
};

// Mock Staking pools
export const mockStakingPools = [
  {
    id: 1,
    name: 'BTC Staking',
    token: 'BTC',
    apy: 4.5,
    lockPeriod: 30,
    minStake: 0.01,
    totalStaked: '2500 BTC',
  },
  {
    id: 2,
    name: 'ETH Staking',
    token: 'ETH',
    apy: 5.2,
    lockPeriod: 90,
    minStake: 0.1,
    totalStaked: '15000 ETH',
  },
  {
    id: 3,
    name: 'SOL Staking',
    token: 'SOL',
    apy: 6.8,
    lockPeriod: 30,
    minStake: 1,
    totalStaked: '50000 SOL',
  },
];

// Mock NFT items
export const mockNftItems = [
  {
    id: 1,
    name: 'Crypto Punk #1234',
    collection: 'CryptoPunks',
    image: '🦄',
    price: '2.5 ETH',
    owner: '0x1234...',
  },
  {
    id: 2,
    name: 'Bored Ape #5678',
    collection: 'Bored Ape Yacht Club',
    image: '🦍',
    price: '15 ETH',
    owner: '0x5678...',
  },
];

// Mock Liquidity Pools
export const mockLiquidityPools = [
  { id: 1, pair: 'WBTC/ETH', tvl: '$45M', apy: 12.5, volume24h: '$2.5M' },
  { id: 2, pair: 'USDC/ETH', tvl: '$120M', apy: 8.2, volume24h: '$15M' },
];

// Helper to create custom store states
export const createMockStoreState = (
  overrides: Partial<{
    isLoggedIn: boolean;
    language: 'es' | 'en' | 'zh';
    activeTab: TabType;
    faucets: Faucet[];
    walletBalance: WalletBalance;
    history: ClaimHistory[];
    achievements: Achievement[];
    notifications: number;
    showWalletAddress: boolean;
    user: User | null;
  }> = {}
) => ({
  isLoggedIn: false,
  activeTab: 'faucets' as TabType,
  language: 'es' as const,
  notifications: 0,
  showWalletAddress: false,
  user: mockUser,
  walletBalance: mockWalletBalance,
  faucets: mockFaucets,
  history: mockHistory,
  achievements: mockAchievements,
  leaderboard: mockLeaderboard,
  ...overrides,
});
