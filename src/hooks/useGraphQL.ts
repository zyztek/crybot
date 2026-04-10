/**
 * useGraphQL Hook
 *
 * React hook for executing GraphQL queries and mutations
 * Provides loading, error, and data states
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GraphQLResponse,
  GraphQLVariables,
  MUTATIONS_EXTENDED,
  QUERIES_EXTENDED,
  graphqlMutation,
  graphqlQuery,
} from '../services/graphql';

// ============ Type Definitions for Extended Queries/Mutations ============

// Staking types
export interface StakingPool {
  id: string;
  name: string;
  coin: string;
  network: string;
  apy: string;
  tvl: string;
  minStake: string;
  maxStake: string;
  lockPeriod: string;
  isActive: boolean;
}

export interface StakingPosition {
  id: string;
  poolId: string;
  poolName: string;
  coin: string;
  stakedAmount: string;
  rewardsEarned: string;
  startTime: string;
  unlockTime: string;
  status: string;
}

// DeFi types
export interface DeFiAsset {
  id: string;
  protocol: string;
  token: string;
  amount: string;
  value: string;
  apy: string;
  type: string;
}

export interface DeFiPortfolio {
  totalValue: string;
  totalYield: string;
  totalDebt: string;
  netWorth: string;
  assets: DeFiAsset[];
  debts: any[];
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  imageUrl?: string;
  publishedAt: string;
}

export interface MarketSentiment {
  overall: string;
  fearGreedIndex: number;
  bullish: number;
  bearish: number;
}

// NFT types
export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  floorPrice: string;
  volume24h: string;
  category: string;
}

// Lottery types
export interface LotteryRound {
  id: string;
  status: string;
  prizePool: string;
  ticketPrice: string;
  startTime: string;
  endTime: string;
  winningNumbers?: number[];
}

// Airdrop types
export interface Airdrop {
  id: string;
  name: string;
  description: string;
  status: string;
  network: string;
  amount: string;
  claimUrl?: string;
}

// Price Alert types
export interface PriceAlert {
  id: string;
  coin: string;
  targetPrice: number;
  condition: string;
  isActive: boolean;
}

// Whale Alert types
export interface WhaleAlert {
  id: string;
  coin: string;
  amount: string;
  value: string;
  from: string;
  to: string;
  txHash: string;
  timestamp: string;
}

// Trading Signal types
export interface TradingSignal {
  id: string;
  coin: string;
  signal: string;
  confidence: number;
  entryPrice: string;
  takeProfit: string;
  stopLoss: string;
  timeframe: string;
}

// Mission types
export interface Mission {
  id: string;
  title: string;
  description: string;
  status: string;
  reward: string;
  progress: number;
  maxProgress: number;
}

// Validator types
export interface Validator {
  id: string;
  name: string;
  network: string;
  commission: string;
  uptime: string;
  tokens: string;
  status: string;
}

// DAO types
export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  status: string;
  forVotes: string;
  againstVotes: string;
  startTime: string;
  endTime: string;
}

// Bridge types
export interface BridgeQuote {
  fromNetwork: string;
  toNetwork: string;
  token: string;
  amount: string;
  estimatedReceive: string;
  fee: string;
  estimatedTime: string;
}

// Token Safety types
export interface TokenSafety {
  isSafe: boolean;
  riskScore: string;
  risks: string[];
  verified: boolean;
}

// Referral types
export interface ReferralStats {
  totalReferrals: number;
  totalEarnings: string;
  pendingRewards: string;
}

// Converter types
export interface ConversionRate {
  fromCoin: string;
  toCoin: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
}

// Notification types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  data?: any;
}

// Wallet types
export interface WalletBalance {
  coin: string;
  available: string;
  pending: string;
  total: string;
  lastUpdated: string;
}

export interface WalletAddress {
  coin: string;
  address: string;
  isCustodial: boolean;
  qrCode?: string;
}

// Transaction types
export interface Transaction {
  id: string;
  type: string;
  coin: string;
  amount: string;
  fee: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  confirmations: number;
  createdAt: string;
  completedAt?: string;
}

// Faucet types
export interface FaucetStatus {
  coin: string;
  network: string;
  lastClaim: string;
  nextClaim: string;
  isAvailable: boolean;
}

export interface FaucetStats {
  totalClaimed: string;
  totalUsers: number;
  averageClaim: string;
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  completedAt?: string;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  referrals: number;
  earnings: string;
}

// User Settings types
export interface UserSettings {
  theme: string;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Security Settings types
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  withdrawalConfirmations: boolean;
}

// Session types
export interface Session {
  id: string;
  device: string;
  ip: string;
  location: string;
  lastActive: string;
  currentSession: boolean;
}

// API Key types
export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: string[];
  createdAt: string;
  lastUsed?: string;
}

// Webhook types
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
  createdAt: string;
}

// Support Ticket types
export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  lastUpdated: string;
}

// Platform Stats types
export interface PlatformStats {
  totalUsers: number;
  totalClaims: string;
  totalVolume: string;
  activeFaucets: number;
}

// Bitcoin ETF types
export interface BTCEtfFlow {
  symbol: string;
  name: string;
  flow: number;
  flowChange24h: number;
  price: number;
  priceChange24h: number;
  totalHoldings: number;
  avgDailyInflow: number;
  lastUpdate: string;
  inflowHistory?: { date: string; inflow: number }[];
}

export interface BTCEtfSummary {
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
  btcPrice: number;
  btcPriceImpact: number;
  period: string;
  updatedAt: string;
}

// Coinbase Premium types
export interface CoinbasePremium {
  currentPremium: number;
  avgPremium: number;
  maxPremium: number;
  minPremium: number;
  coinbasePrice: number;
  otherExchangesAvg: number;
  priceDifference: number;
  volume: number;
  updatedAt: string;
  history: {
    timestamp: string;
    coinbasePrice: number;
    otherExchangesAvg: number;
    premium: number;
    volume: number;
  }[];
}

// Multisig types
export interface MultisigWallet {
  id: string;
  name: string;
  address: string;
  threshold: number;
  signers: { address: string; name: string; status: string }[];
  createdAt: string;
}

export interface MultisigTransaction {
  id: string;
  walletId: string;
  to: string;
  amount: string;
  token: string;
  data?: string;
  status: string;
  signatures: string[];
  requiredSignatures: number;
  createdAt: string;
  expiresAt: string;
  executedAt?: string;
}

// Activity Log types
export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

interface UseGraphQLState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseGraphQLOptions {
  immediate?: boolean;
  variables?: GraphQLVariables;
}

/**
 * Hook for executing GraphQL queries
 */
export function useGraphQLQuery<T>(
  query: string,
  options: UseGraphQLOptions = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<void>;
  refetch: () => Promise<void>;
} {
  const { immediate = false, variables = {} } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(
    async (vars?: GraphQLVariables) => {
      setLoading(true);
      setError(null);

      const currentVars = vars ?? variablesRef.current;

      try {
        const response = await graphqlQuery<T>(query, currentVars);

        if (response.errors && response.errors.length > 0) {
          throw new Error(response.errors[0].message);
        }

        setData(response.data ?? null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, refetch };
}

/**
 * Hook for executing GraphQL mutations
 */
export function useGraphQLMutation<T>(
  mutation: string,
  options: UseGraphQLOptions = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<T | null>;
  reset: () => void;
} {
  const { immediate = false, variables = {} } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(
    async (vars?: GraphQLVariables): Promise<T | null> => {
      setLoading(true);
      setError(null);

      const currentVars = vars ?? variablesRef.current;

      try {
        const response = await graphqlMutation<T>(mutation, currentVars);

        if (response.errors && response.errors.length > 0) {
          throw new Error(response.errors[0].message);
        }

        const result = response.data ?? null;
        setData(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [mutation]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for executing both queries and mutations with a unified interface
 */
export function useGraphQL<T>(
  queryOrMutation: string,
  options: UseGraphQLOptions & { isMutation?: boolean } = {}
): UseGraphQLState<T> & {
  execute: (vars?: GraphQLVariables) => Promise<void | T | null>;
  refetch: () => Promise<void>;
  reset: () => void;
} {
  const { immediate = false, variables = {}, isMutation = false } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const variablesRef = useRef(variables);

  const execute = useCallback(
    async (vars?: GraphQLVariables): Promise<void | T | null> => {
      setLoading(true);
      setError(null);

      const currentVars = vars ?? variablesRef.current;

      try {
        let response: GraphQLResponse<T>;

        if (isMutation) {
          response = await graphqlMutation<T>(queryOrMutation, currentVars);
        } else {
          response = await graphqlQuery<T>(queryOrMutation, currentVars);
        }

        if (response.errors && response.errors.length > 0) {
          throw new Error(response.errors[0].message);
        }

        const result = response.data ?? null;
        setData(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    },
    [queryOrMutation, isMutation]
  );

  const refetch = useCallback(async () => {
    if (!isMutation) {
      await execute();
    }
  }, [execute, isMutation]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (immediate && !isMutation) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, refetch, reset };
}

// Export Query and Mutation keys for type checking
export const QUERY_KEYS = {
  GET_STAKING_POOLS: QUERIES_EXTENDED.GET_STAKING_POOLS,
  GET_MY_STAKING_POSITIONS: QUERIES_EXTENDED.GET_MY_STAKING_POSITIONS,
  GET_DEFI_PORTFOLIO: QUERIES_EXTENDED.GET_DEFI_PORTFOLIO,
  GET_DEFI_PROTOCOLS: QUERIES_EXTENDED.GET_DEFI_PROTOCOLS,
  GET_YIELD_OPPORTUNITIES: QUERIES_EXTENDED.GET_YIELD_OPPORTUNITIES,
  GET_NEWS_ARTICLES: QUERIES_EXTENDED.GET_NEWS_ARTICLES,
  GET_NEWS_CATEGORIES: QUERIES_EXTENDED.GET_NEWS_CATEGORIES,
  GET_MARKET_SENTIMENT: QUERIES_EXTENDED.GET_MARKET_SENTIMENT,
  GET_NFT_COLLECTIONS: QUERIES_EXTENDED.GET_NFT_COLLECTIONS,
  GET_MY_NFTS: QUERIES_EXTENDED.GET_MY_NFTS,
  GET_LOTTERY_ROUNDS: QUERIES_EXTENDED.GET_LOTTERY_ROUNDS,
  GET_MY_LOTTERY_TICKETS: QUERIES_EXTENDED.GET_MY_LOTTERY_TICKETS,
  GET_AIRDROPS: QUERIES_EXTENDED.GET_AIRDROPS,
  GET_MY_AIRDROP_CLAIMS: QUERIES_EXTENDED.GET_MY_AIRDROP_CLAIMS,
  GET_PRICE_ALERTS: QUERIES_EXTENDED.GET_PRICE_ALERTS,
  GET_WHALE_ALERTS: QUERIES_EXTENDED.GET_WHALE_ALERTS,
  GET_TRADING_SIGNALS: QUERIES_EXTENDED.GET_TRADING_SIGNALS,
  GET_MISSIONS: QUERIES_EXTENDED.GET_MISSIONS,
  GET_MY_MISSIONS: QUERIES_EXTENDED.GET_MY_MISSIONS,
  GET_VALIDATORS: QUERIES_EXTENDED.GET_VALIDATORS,
  GET_DAO_PROPOSALS: QUERIES_EXTENDED.GET_DAO_PROPOSALS,
  GET_MY_DAO_VOTES: QUERIES_EXTENDED.GET_MY_DAO_VOTES,
  GET_BRIDGE_QUOTE: QUERIES_EXTENDED.GET_BRIDGE_QUOTE,
  GET_BRIDGE_HISTORY: QUERIES_EXTENDED.GET_BRIDGE_HISTORY,
  CHECK_TOKEN_SAFETY: QUERIES_EXTENDED.CHECK_TOKEN_SAFETY,
  GET_TOKEN_INFO: QUERIES_EXTENDED.GET_TOKEN_INFO,
  GET_REFERRAL_STATS: QUERIES_EXTENDED.GET_REFERRAL_STATS,
  GET_CONVERSION_RATE: QUERIES_EXTENDED.GET_CONVERSION_RATE,
  GET_DEX_QUOTE: QUERIES_EXTENDED.GET_DEX_QUOTE,
  GET_POOL_INFO: QUERIES_EXTENDED.GET_POOL_INFO,
  GET_NOTIFICATIONS: QUERIES_EXTENDED.GET_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATION_COUNT: QUERIES_EXTENDED.GET_UNREAD_NOTIFICATION_COUNT,
  GET_WALLET_BALANCE: QUERIES_EXTENDED.GET_WALLET_BALANCE,
  GET_ALL_WALLET_BALANCES: QUERIES_EXTENDED.GET_ALL_WALLET_BALANCES,
  GET_WALLET_ADDRESS: QUERIES_EXTENDED.GET_WALLET_ADDRESS,
  GET_TRANSACTION_DETAILS: QUERIES_EXTENDED.GET_TRANSACTION_DETAILS,
  GET_PENDING_TRANSACTIONS: QUERIES_EXTENDED.GET_PENDING_TRANSACTIONS,
  GET_FAUCET_STATUS: QUERIES_EXTENDED.GET_FAUCET_STATUS,
  GET_FAUCET_HISTORY: QUERIES_EXTENDED.GET_FAUCET_HISTORY,
  GET_FAUCET_STATS: QUERIES_EXTENDED.GET_FAUCET_STATS,
  GET_ALL_ACHIEVEMENTS: QUERIES_EXTENDED.GET_ALL_ACHIEVEMENTS,
  GET_ACHIEVEMENT_DETAILS: QUERIES_EXTENDED.GET_ACHIEVEMENT_DETAILS,
  GET_COMPLETED_ACHIEVEMENTS_V2: QUERIES_EXTENDED.GET_COMPLETED_ACHIEVEMENTS_V2,
  GET_TOP_REFERRERS: QUERIES_EXTENDED.GET_TOP_REFERRERS,
  GET_TOP_CLAIMERS: QUERIES_EXTENDED.GET_TOP_CLAIMERS,
  GET_MY_RANK: QUERIES_EXTENDED.GET_MY_RANK,
  GET_USER_SETTINGS: QUERIES_EXTENDED.GET_USER_SETTINGS,
  GET_SECURITY_SETTINGS: QUERIES_EXTENDED.GET_SECURITY_SETTINGS,
  GET_ACTIVE_SESSIONS: QUERIES_EXTENDED.GET_ACTIVE_SESSIONS,
  GET_API_KEYS: QUERIES_EXTENDED.GET_API_KEYS,
  GET_WEBHOOKS: QUERIES_EXTENDED.GET_WEBHOOKS,
  GET_SUPPORT_TICKETS: QUERIES_EXTENDED.GET_SUPPORT_TICKETS,
  GET_PLATFORM_STATS: QUERIES_EXTENDED.GET_PLATFORM_STATS,
  GET_COIN_STATS: QUERIES_EXTENDED.GET_COIN_STATS,
  GET_BTC_ETF_FLOWS: QUERIES_EXTENDED.GET_BTC_ETF_FLOWS,
  GET_BTC_ETF_SUMMARY: QUERIES_EXTENDED.GET_BTC_ETF_SUMMARY,
  GET_COINBASE_PREMIUM: QUERIES_EXTENDED.GET_COINBASE_PREMIUM,
  GET_GAS_PRICES: QUERIES_EXTENDED.GET_GAS_PRICES,
  GET_TOKEN_PRICES: QUERIES_EXTENDED.GET_TOKEN_PRICES,
  GET_HISTORICAL_GAS: QUERIES_EXTENDED.GET_HISTORICAL_GAS,
  GET_MULTISIG_WALLETS: (QUERIES_EXTENDED as any).GET_MULTISIG_WALLETS,
  GET_MULTISIG_TRANSACTIONS: (QUERIES_EXTENDED as any).GET_MULTISIG_TRANSACTIONS,
};

export const MUTATION_KEYS = {
  STAKE_TOKEN: MUTATIONS_EXTENDED.STAKE_TOKEN,
  UNSTAKE_TOKEN: MUTATIONS_EXTENDED.UNSTAKE_TOKEN,
  CLAIM_STAKING_REWARDS: MUTATIONS_EXTENDED.CLAIM_STAKING_REWARDS,
  SUPPLY_LIQUIDITY: MUTATIONS_EXTENDED.SUPPLY_LIQUIDITY,
  WITHDRAW_LIQUIDITY: MUTATIONS_EXTENDED.WITHDRAW_LIQUIDITY,
  SWAP_TOKENS: MUTATIONS_EXTENDED.SWAP_TOKENS,
  ADD_LIQUIDITY: MUTATIONS_EXTENDED.ADD_LIQUIDITY,
  REMOVE_LIQUIDITY: MUTATIONS_EXTENDED.REMOVE_LIQUIDITY,
  EXECUTE_SWAP: MUTATIONS_EXTENDED.EXECUTE_SWAP,
  MINT_NFT: MUTATIONS_EXTENDED.MINT_NFT,
  TRANSFER_NFT: MUTATIONS_EXTENDED.TRANSFER_NFT,
  BUY_NFT: MUTATIONS_EXTENDED.BUY_NFT,
  LIST_NFT: MUTATIONS_EXTENDED.LIST_NFT,
  BUY_LOTTERY_TICKET: MUTATIONS_EXTENDED.BUY_LOTTERY_TICKET,
  CLAIM_LOTTERY_PRIZE: MUTATIONS_EXTENDED.CLAIM_LOTTERY_PRIZE,
  CLAIM_AIRDROP: MUTATIONS_EXTENDED.CLAIM_AIRDROP,
  VERIFY_AIRDROP: MUTATIONS_EXTENDED.VERIFY_AIRDROP,
  CREATE_PRICE_ALERT: MUTATIONS_EXTENDED.CREATE_PRICE_ALERT,
  UPDATE_PRICE_ALERT: MUTATIONS_EXTENDED.UPDATE_PRICE_ALERT,
  DELETE_PRICE_ALERT: MUTATIONS_EXTENDED.DELETE_PRICE_ALERT,
  CREATE_TRADING_SIGNAL: MUTATIONS_EXTENDED.CREATE_TRADING_SIGNAL,
  FOLLOW_TRADING_SIGNAL: MUTATIONS_EXTENDED.FOLLOW_TRADING_SIGNAL,
  SUBSCRIBE_WHALE_ALERTS: MUTATIONS_EXTENDED.SUBSCRIBE_WHALE_ALERTS,
  UNSUBSCRIBE_WHALE_ALERTS: MUTATIONS_EXTENDED.UNSUBSCRIBE_WHALE_ALERTS,
  UPDATE_MISSION_PROGRESS: MUTATIONS_EXTENDED.UPDATE_MISSION_PROGRESS,
  CLAIM_MISSION_REWARD: MUTATIONS_EXTENDED.CLAIM_MISSION_REWARD,
  CLAIM_ACHIEVEMENT_REWARD: MUTATIONS_EXTENDED.CLAIM_ACHIEVEMENT_REWARD,
  DELEGATE_TO_VALIDATOR: MUTATIONS_EXTENDED.DELEGATE_TO_VALIDATOR,
  UNDELEGATE: MUTATIONS_EXTENDED.UNDELEGATE,
  REDELEGATE: MUTATIONS_EXTENDED.REDELEGATE,
  CREATE_PROPOSAL: MUTATIONS_EXTENDED.CREATE_PROPOSAL,
  VOTE_ON_PROPOSAL: MUTATIONS_EXTENDED.VOTE_ON_PROPOSAL,
  EXECUTE_PROPOSAL: MUTATIONS_EXTENDED.EXECUTE_PROPOSAL,
  INITIATE_BRIDGE: MUTATIONS_EXTENDED.INITIATE_BRIDGE,
  COMPLETE_BRIDGE: MUTATIONS_EXTENDED.COMPLETE_BRIDGE,
  CANCEL_BRIDGE: MUTATIONS_EXTENDED.CANCEL_BRIDGE,
  CREATE_WEBHOOK: MUTATIONS_EXTENDED.CREATE_WEBHOOK,
  DELETE_WEBHOOK: MUTATIONS_EXTENDED.DELETE_WEBHOOK,
  CREATE_API_KEY: MUTATIONS_EXTENDED.CREATE_API_KEY,
  REVOKE_API_KEY: MUTATIONS_EXTENDED.REVOKE_API_KEY,
  GENERATE_REFERRAL_CODE: MUTATIONS_EXTENDED.GENERATE_REFERRAL_CODE,
  CLAIM_REFERRAL_REWARD: MUTATIONS_EXTENDED.CLAIM_REFERRAL_REWARD,
  MARK_NOTIFICATION_READ: MUTATIONS_EXTENDED.MARK_NOTIFICATION_READ,
  MARK_ALL_NOTIFICATIONS_READ: MUTATIONS_EXTENDED.MARK_ALL_NOTIFICATIONS_READ,
  DELETE_NOTIFICATION: MUTATIONS_EXTENDED.DELETE_NOTIFICATION,
  GENERATE_WALLET_ADDRESS: MUTATIONS_EXTENDED.GENERATE_WALLET_ADDRESS,
  TRANSFER_WALLET: MUTATIONS_EXTENDED.TRANSFER_WALLET,
  REQUEST_WITHDRAWAL: MUTATIONS_EXTENDED.REQUEST_WITHDRAWAL,
  CANCEL_WITHDRAWAL: MUTATIONS_EXTENDED.CANCEL_WITHDRAWAL,
  CLAIM_FAUCET_V2: MUTATIONS_EXTENDED.CLAIM_FAUCET_V2,
  VERIFY_FAUCET_CLAIM_V2: (MUTATIONS_EXTENDED as any).VERIFY_FAUCET_CLAIM_V2,
  UPDATE_SETTINGS: MUTATIONS_EXTENDED.UPDATE_SETTINGS,
  ENABLE_2FA: MUTATIONS_EXTENDED.ENABLE_2FA,
  DISABLE_2FA: MUTATIONS_EXTENDED.DISABLE_2FA,
  TERMINATE_ALL_SESSIONS: MUTATIONS_EXTENDED.REVOKE_ALL_SESSIONS,
  CREATE_MULTISIG_WALLET: MUTATIONS_EXTENDED.CREATE_MULTISIG_WALLET,
  CREATE_MULTISIG_TRANSACTION: MUTATIONS_EXTENDED.CREATE_MULTISIG_TRANSACTION,
  SIGN_MULTISIG_TRANSACTION: MUTATIONS_EXTENDED.SIGN_MULTISIG_TRANSACTION,
  EXECUTE_MULTISIG_TRANSACTION: MUTATIONS_EXTENDED.EXECUTE_MULTISIG_TRANSACTION,
};

export default {
  useGraphQLQuery,
  useGraphQLMutation,
  useGraphQL,
  QUERY_KEYS,
  MUTATION_KEYS,
};

// ============ Helper Functions for Extended Queries/Mutations ============

/**
 * Helper function to use Staking queries
 */
export function useStaking() {
  const fetchPools = useGraphQLQuery<{ stakingPools: StakingPool[] }>(
    QUERIES_EXTENDED.GET_STAKING_POOLS,
    { immediate: false }
  );
  const fetchPositions = useGraphQLQuery<{ myStakingPositions: StakingPosition[] }>(
    QUERIES_EXTENDED.GET_MY_STAKING_POSITIONS,
    { immediate: false }
  );
  const stake = useGraphQLMutation<{ stakeToken: any }>(MUTATIONS_EXTENDED.STAKE_TOKEN);
  const unstake = useGraphQLMutation<{ unstakeToken: any }>(MUTATIONS_EXTENDED.UNSTAKE_TOKEN);
  const claimRewards = useGraphQLMutation<{ claimStakingRewards: any }>(
    MUTATIONS_EXTENDED.CLAIM_STAKING_REWARDS
  );

  return {
    fetchPools,
    fetchPositions,
    stake,
    unstake,
    claimRewards,
  };
}

/**
 * Helper function to use DeFi queries
 */
export function useDeFi() {
  const fetchPortfolio = useGraphQLQuery<{ defiPortfolio: DeFiPortfolio }>(
    QUERIES_EXTENDED.GET_DEFI_PORTFOLIO,
    { immediate: false }
  );
  const fetchProtocols = useGraphQLQuery<{ defiProtocols: any[] }>(
    QUERIES_EXTENDED.GET_DEFI_PROTOCOLS,
    { immediate: false }
  );
  const fetchYieldOpportunities = useGraphQLQuery<{ yieldOpportunities: any[] }>(
    QUERIES_EXTENDED.GET_YIELD_OPPORTUNITIES,
    { immediate: false }
  );
  const supplyLiquidity = useGraphQLMutation<{ supplyLiquidity: any }>(
    MUTATIONS_EXTENDED.SUPPLY_LIQUIDITY
  );
  const withdrawLiquidity = useGraphQLMutation<{ withdrawLiquidity: any }>(
    MUTATIONS_EXTENDED.WITHDRAW_LIQUIDITY
  );

  return {
    fetchPortfolio,
    fetchProtocols,
    fetchYieldOpportunities,
    supplyLiquidity,
    withdrawLiquidity,
  };
}

/**
 * Helper function to use News queries
 */
export function useNews() {
  const fetchArticles = useGraphQLQuery<{ newsArticles: NewsArticle[] }>(
    QUERIES_EXTENDED.GET_NEWS_ARTICLES,
    { immediate: false }
  );
  const fetchCategories = useGraphQLQuery<{ newsCategories: string[] }>(
    QUERIES_EXTENDED.GET_NEWS_CATEGORIES,
    { immediate: false }
  );
  const fetchSentiment = useGraphQLQuery<{ marketSentiment: MarketSentiment }>(
    QUERIES_EXTENDED.GET_MARKET_SENTIMENT,
    { immediate: false }
  );

  return {
    fetchArticles,
    fetchCategories,
    fetchSentiment,
  };
}

/**
 * Helper function to use NFT queries
 */
export function useNFT() {
  const fetchCollections = useGraphQLQuery<{ nftCollections: NFTCollection[] }>(
    QUERIES_EXTENDED.GET_NFT_COLLECTIONS,
    { immediate: false }
  );
  const fetchMyNFTs = useGraphQLQuery<{ myNFTs: any[] }>(QUERIES_EXTENDED.GET_MY_NFTS, {
    immediate: false,
  });
  const mint = useGraphQLMutation<{ mintNFT: any }>(MUTATIONS_EXTENDED.MINT_NFT);
  const transfer = useGraphQLMutation<{ transferNFT: any }>(MUTATIONS_EXTENDED.TRANSFER_NFT);
  const buy = useGraphQLMutation<{ buyNFT: any }>(MUTATIONS_EXTENDED.BUY_NFT);
  const list = useGraphQLMutation<{ listNFT: any }>(MUTATIONS_EXTENDED.LIST_NFT);

  return {
    fetchCollections,
    fetchMyNFTs,
    mint,
    transfer,
    buy,
    list,
  };
}

/**
 * Helper function to use Lottery queries
 */
export function useLottery() {
  const fetchRounds = useGraphQLQuery<{ lotteryRounds: LotteryRound[] }>(
    QUERIES_EXTENDED.GET_LOTTERY_ROUNDS,
    { immediate: false }
  );
  const fetchMyTickets = useGraphQLQuery<{ myLotteryTickets: any[] }>(
    QUERIES_EXTENDED.GET_MY_LOTTERY_TICKETS,
    { immediate: false }
  );
  const buyTicket = useGraphQLMutation<{ buyLotteryTicket: any }>(
    MUTATIONS_EXTENDED.BUY_LOTTERY_TICKET
  );
  const claimPrize = useGraphQLMutation<{ claimLotteryPrize: any }>(
    MUTATIONS_EXTENDED.CLAIM_LOTTERY_PRIZE
  );

  return {
    fetchRounds,
    fetchMyTickets,
    buyTicket,
    claimPrize,
  };
}

/**
 * Helper function to use Airdrop queries
 */
export function useAirdrop() {
  const fetchAirdrops = useGraphQLQuery<{ airdrops: Airdrop[] }>(QUERIES_EXTENDED.GET_AIRDROPS, {
    immediate: false,
  });
  const fetchMyClaims = useGraphQLQuery<{ myAirdropClaims: any[] }>(
    QUERIES_EXTENDED.GET_MY_AIRDROP_CLAIMS,
    { immediate: false }
  );
  const claim = useGraphQLMutation<{ claimAirdrop: any }>(MUTATIONS_EXTENDED.CLAIM_AIRDROP);
  const verify = useGraphQLMutation<{ verifyAirdrop: any }>(MUTATIONS_EXTENDED.VERIFY_AIRDROP);

  return {
    fetchAirdrops,
    fetchMyClaims,
    claim,
    verify,
  };
}

/**
 * Helper function to use Gas/Oracle queries
 */
export function useGasOracle() {
  const fetchGasPrices = useGraphQLQuery<{ gasPrices: any }>(QUERIES_EXTENDED.GET_GAS_PRICES, {
    immediate: false,
  });
  const fetchTokenPrices = useGraphQLQuery<{ tokenPrices: any[] }>(
    QUERIES_EXTENDED.GET_TOKEN_PRICES,
    { immediate: false }
  );
  const fetchHistoricalGas = useGraphQLQuery<{ historicalGas: any[] }>(
    QUERIES_EXTENDED.GET_HISTORICAL_GAS,
    { immediate: false }
  );

  return {
    fetchGasPrices,
    fetchTokenPrices,
    fetchHistoricalGas,
  };
}

/**
 * Helper function to use Price Alert queries
 */
export function usePriceAlerts() {
  const fetchAlerts = useGraphQLQuery<{ priceAlerts: PriceAlert[] }>(
    QUERIES_EXTENDED.GET_PRICE_ALERTS,
    { immediate: false }
  );
  const create = useGraphQLMutation<{ createPriceAlert: any }>(
    MUTATIONS_EXTENDED.CREATE_PRICE_ALERT
  );
  const deleteAlert = useGraphQLMutation<{ deletePriceAlert: boolean }>(
    MUTATIONS_EXTENDED.DELETE_PRICE_ALERT
  );
  const update = useGraphQLMutation<{ updatePriceAlert: any }>(
    MUTATIONS_EXTENDED.UPDATE_PRICE_ALERT
  );

  return {
    fetchAlerts,
    create,
    delete: deleteAlert,
    update,
  };
}

/**
 * Helper function to use Whale Alert queries
 */
export function useWhaleAlerts() {
  const fetchAlerts = useGraphQLQuery<{ whaleAlerts: WhaleAlert[] }>(
    QUERIES_EXTENDED.GET_WHALE_ALERTS,
    { immediate: false }
  );
  const subscribe = useGraphQLMutation<{ subscribeWhaleAlerts: any }>(
    MUTATIONS_EXTENDED.SUBSCRIBE_WHALE_ALERTS
  );
  const unsubscribe = useGraphQLMutation<{ unsubscribeWhaleAlerts: boolean }>(
    MUTATIONS_EXTENDED.UNSUBSCRIBE_WHALE_ALERTS
  );

  return {
    fetchAlerts,
    subscribe,
    unsubscribe,
  };
}

/**
 * Helper function to use Trading Signals queries
 */
export function useTradingSignals() {
  const fetchSignals = useGraphQLQuery<{ tradingSignals: TradingSignal[] }>(
    QUERIES_EXTENDED.GET_TRADING_SIGNALS,
    { immediate: false }
  );
  const createSignal = useGraphQLMutation<{ createTradingSignal: any }>(
    MUTATIONS_EXTENDED.CREATE_TRADING_SIGNAL
  );
  const followSignal = useGraphQLMutation<{ followTradingSignal: any }>(
    MUTATIONS_EXTENDED.FOLLOW_TRADING_SIGNAL
  );

  return {
    fetchSignals,
    createSignal,
    followSignal,
  };
}

/**
 * Helper function to use Missions queries
 */
export function useMissions() {
  const fetchMissions = useGraphQLQuery<{ missions: Mission[] }>(QUERIES_EXTENDED.GET_MISSIONS, {
    immediate: false,
  });
  const fetchMyMissions = useGraphQLQuery<{ myMissions: any[] }>(QUERIES_EXTENDED.GET_MY_MISSIONS, {
    immediate: false,
  });
  const claimReward = useGraphQLMutation<{ claimMissionReward: any }>(
    MUTATIONS_EXTENDED.CLAIM_MISSION_REWARD
  );
  const updateProgress = useGraphQLMutation<{ updateMissionProgress: any }>(
    MUTATIONS_EXTENDED.UPDATE_MISSION_PROGRESS
  );

  return {
    fetchMissions,
    fetchMyMissions,
    claimReward,
    updateProgress,
  };
}

/**
 * Helper function to use Validators queries
 */
export function useValidators() {
  const fetchValidators = useGraphQLQuery<{ validators: Validator[] }>(
    QUERIES_EXTENDED.GET_VALIDATORS,
    { immediate: false }
  );
  const delegate = useGraphQLMutation<{ delegateToValidator: any }>(
    MUTATIONS_EXTENDED.DELEGATE_TO_VALIDATOR
  );
  const undelegate = useGraphQLMutation<{ undelegate: any }>(MUTATIONS_EXTENDED.UNDELEGATE);
  const redelegate = useGraphQLMutation<{ redelegate: any }>(MUTATIONS_EXTENDED.REDELEGATE);

  return {
    fetchValidators,
    delegate,
    undelegate,
    redelegate,
  };
}

/**
 * Helper function to use DAO queries
 */
export function useDAO() {
  const fetchProposals = useGraphQLQuery<{ daoProposals: DAOProposal[] }>(
    QUERIES_EXTENDED.GET_DAO_PROPOSALS,
    { immediate: false }
  );
  const fetchMyVotes = useGraphQLQuery<{ myDAOVotes: any[] }>(QUERIES_EXTENDED.GET_MY_DAO_VOTES, {
    immediate: false,
  });
  const createProposal = useGraphQLMutation<{ createProposal: any }>(
    MUTATIONS_EXTENDED.CREATE_PROPOSAL
  );
  const vote = useGraphQLMutation<{ voteOnProposal: any }>(MUTATIONS_EXTENDED.VOTE_ON_PROPOSAL);
  const executeProposal = useGraphQLMutation<{ executeProposal: any }>(
    MUTATIONS_EXTENDED.EXECUTE_PROPOSAL
  );

  return {
    fetchProposals,
    fetchMyVotes,
    createProposal,
    vote,
    executeProposal,
  };
}

/**
 * Helper function to use Bridge queries
 */
export function useBridge() {
  const fetchQuote = useGraphQLQuery<{ bridgeQuote: BridgeQuote }>(
    QUERIES_EXTENDED.GET_BRIDGE_QUOTE,
    { immediate: false }
  );
  const fetchHistory = useGraphQLQuery<{ bridgeHistory: any[] }>(
    QUERIES_EXTENDED.GET_BRIDGE_HISTORY,
    { immediate: false }
  );
  const initiate = useGraphQLMutation<{ initiateBridge: any }>(MUTATIONS_EXTENDED.INITIATE_BRIDGE);
  const complete = useGraphQLMutation<{ completeBridge: any }>(MUTATIONS_EXTENDED.COMPLETE_BRIDGE);
  const cancel = useGraphQLMutation<{ cancelBridge: any }>(MUTATIONS_EXTENDED.CANCEL_BRIDGE);

  return {
    fetchQuote,
    fetchHistory,
    initiate,
    complete,
    cancel,
  };
}

/**
 * Helper function to use Token Security queries
 */
export function useTokenSecurity() {
  const checkSafety = useGraphQLQuery<{ checkTokenSafety: TokenSafety }>(
    QUERIES_EXTENDED.CHECK_TOKEN_SAFETY,
    { immediate: false }
  );
  const getTokenInfo = useGraphQLQuery<{ tokenInfo: any }>(QUERIES_EXTENDED.GET_TOKEN_INFO, {
    immediate: false,
  });

  return {
    checkSafety,
    getTokenInfo,
  };
}

/**
 * Helper function to use Referral queries
 */
export function useReferral() {
  const fetchStats = useGraphQLQuery<{ referralStats: ReferralStats }>(
    QUERIES_EXTENDED.GET_REFERRAL_STATS,
    { immediate: false }
  );
  const generateCode = useGraphQLMutation<{ generateReferralCode: any }>(
    MUTATIONS_EXTENDED.GENERATE_REFERRAL_CODE
  );
  const claimReward = useGraphQLMutation<{ claimReferralReward: any }>(
    MUTATIONS_EXTENDED.CLAIM_REFERRAL_REWARD
  );

  return {
    fetchStats,
    generateCode,
    claimReward,
  };
}

/**
 * Helper function to use Converter queries
 */
export function useConverter() {
  const getRate = useGraphQLQuery<{ conversionRate: ConversionRate }>(
    QUERIES_EXTENDED.GET_CONVERSION_RATE,
    { immediate: false }
  );
  const swap = useGraphQLMutation<{ swapTokens: any }>(MUTATIONS_EXTENDED.SWAP_TOKENS);

  return {
    getRate,
    swap,
  };
}

/**
 * Helper function to use DEX queries
 */
export function useDEX() {
  const getQuote = useGraphQLQuery<{ dexQuote: any }>(QUERIES_EXTENDED.GET_DEX_QUOTE, {
    immediate: false,
  });
  const getPoolInfo = useGraphQLQuery<{ poolInfo: any }>(QUERIES_EXTENDED.GET_POOL_INFO, {
    immediate: false,
  });
  const executeSwap = useGraphQLMutation<{ executeSwap: any }>(MUTATIONS_EXTENDED.EXECUTE_SWAP);
  const addLiquidity = useGraphQLMutation<{ addLiquidity: any }>(MUTATIONS_EXTENDED.ADD_LIQUIDITY);
  const removeLiquidity = useGraphQLMutation<{ removeLiquidity: any }>(
    MUTATIONS_EXTENDED.REMOVE_LIQUIDITY
  );

  return {
    getQuote,
    getPoolInfo,
    executeSwap,
    addLiquidity,
    removeLiquidity,
  };
}

/**
 * Export all helper functions for convenience
 */
/**
 * Helper function to use Notification queries
 */
export function useNotifications() {
  const fetchNotifications = useGraphQLQuery<{ notifications: Notification[] }>(
    QUERIES_EXTENDED.GET_NOTIFICATIONS,
    { immediate: false }
  );
  const fetchUnreadCount = useGraphQLQuery<{ unreadNotificationCount: number }>(
    QUERIES_EXTENDED.GET_UNREAD_NOTIFICATION_COUNT,
    { immediate: false }
  );
  const markRead = useGraphQLMutation<{ markNotificationRead: any }>(
    MUTATIONS_EXTENDED.MARK_NOTIFICATION_READ
  );
  const markAllRead = useGraphQLMutation<{ markAllNotificationsRead: any }>(
    MUTATIONS_EXTENDED.MARK_ALL_NOTIFICATIONS_READ
  );
  const deleteNotification = useGraphQLMutation<{ deleteNotification: boolean }>(
    MUTATIONS_EXTENDED.DELETE_NOTIFICATION
  );

  return {
    fetchNotifications,
    fetchUnreadCount,
    markRead,
    markAllRead,
    deleteNotification,
  };
}

/**
 * Helper function to use Wallet queries
 */
export function useWallet() {
  const fetchBalance = useGraphQLQuery<{ walletBalance: WalletBalance }>(
    QUERIES_EXTENDED.GET_WALLET_BALANCE,
    { immediate: false }
  );
  const fetchAllBalances = useGraphQLQuery<{ allWalletBalances: WalletBalance[] }>(
    QUERIES_EXTENDED.GET_ALL_WALLET_BALANCES,
    { immediate: false }
  );
  const fetchAddress = useGraphQLQuery<{ walletAddress: WalletAddress }>(
    QUERIES_EXTENDED.GET_WALLET_ADDRESS,
    { immediate: false }
  );
  const generateAddress = useGraphQLMutation<{ generateWalletAddress: any }>(
    MUTATIONS_EXTENDED.GENERATE_WALLET_ADDRESS
  );
  const transfer = useGraphQLMutation<{ transferWallet: any }>(MUTATIONS_EXTENDED.TRANSFER_WALLET);

  return {
    fetchBalance,
    fetchAllBalances,
    fetchAddress,
    generateAddress,
    transfer,
  };
}

/**
 * Helper function to use Transaction queries
 */
export function useTransactions() {
  const fetchTransaction = useGraphQLQuery<{ transaction: Transaction }>(
    QUERIES_EXTENDED.GET_TRANSACTION_DETAILS,
    { immediate: false }
  );
  const fetchPending = useGraphQLQuery<{ pendingTransactions: Transaction[] }>(
    QUERIES_EXTENDED.GET_PENDING_TRANSACTIONS,
    { immediate: false }
  );
  const requestWithdrawal = useGraphQLMutation<{ requestWithdrawal: any }>(
    MUTATIONS_EXTENDED.REQUEST_WITHDRAWAL
  );
  const cancelWithdrawal = useGraphQLMutation<{ cancelWithdrawal: any }>(
    MUTATIONS_EXTENDED.CANCEL_WITHDRAWAL
  );

  return {
    fetchTransaction,
    fetchPending,
    requestWithdrawal,
    cancelWithdrawal,
  };
}

/**
 * Helper function to use Faucet queries
 */
export function useFaucet() {
  const fetchStatus = useGraphQLQuery<{ faucetStatus: FaucetStatus }>(
    QUERIES_EXTENDED.GET_FAUCET_STATUS,
    { immediate: false }
  );
  const fetchHistory = useGraphQLQuery<{ faucetHistory: any[] }>(
    QUERIES_EXTENDED.GET_FAUCET_HISTORY,
    { immediate: false }
  );
  const fetchStats = useGraphQLQuery<{ faucetStats: FaucetStats }>(
    QUERIES_EXTENDED.GET_FAUCET_STATS,
    { immediate: false }
  );
  const claim = useGraphQLMutation<{ claimFaucetV2: any }>(MUTATIONS_EXTENDED.CLAIM_FAUCET_V2);
  const verifyClaim = useGraphQLMutation<{ verifyFaucetClaim: any }>(
    MUTATIONS_EXTENDED.VERIFY_FAUCET_CLAIM_V2
  );

  return {
    fetchStatus,
    fetchHistory,
    fetchStats,
    claim,
    verifyClaim,
  };
}

/**
 * Helper function to use Achievement queries
 */
export function useAchievements() {
  const fetchAll = useGraphQLQuery<{ achievements: Achievement[] }>(
    QUERIES_EXTENDED.GET_ALL_ACHIEVEMENTS,
    { immediate: false }
  );
  const fetchDetail = useGraphQLQuery<{ achievement: Achievement }>(
    QUERIES_EXTENDED.GET_ACHIEVEMENT_DETAILS,
    { immediate: false }
  );
  const fetchCompleted = useGraphQLQuery<{ completedAchievements: Achievement[] }>(
    QUERIES_EXTENDED.GET_COMPLETED_ACHIEVEMENTS_V2,
    { immediate: false }
  );
  const claimReward = useGraphQLMutation<{ claimAchievementReward: any }>(
    MUTATIONS_EXTENDED.CLAIM_ACHIEVEMENT_REWARD
  );

  return {
    fetchAll,
    fetchDetail,
    fetchCompleted,
    claimReward,
  };
}

/**
 * Helper function to use Leaderboard queries
 */
export function useLeaderboard() {
  const fetchTopReferrers = useGraphQLQuery<{ topReferrers: LeaderboardEntry[] }>(
    QUERIES_EXTENDED.GET_TOP_REFERRERS,
    { immediate: false }
  );
  const fetchTopClaimers = useGraphQLQuery<{ topClaimers: LeaderboardEntry[] }>(
    QUERIES_EXTENDED.GET_TOP_CLAIMERS,
    { immediate: false }
  );
  const fetchMyRank = useGraphQLQuery<{ myRank: LeaderboardEntry }>(QUERIES_EXTENDED.GET_MY_RANK, {
    immediate: false,
  });

  return {
    fetchTopReferrers,
    fetchTopClaimers,
    fetchMyRank,
  };
}

/**
 * Helper function to use Settings queries
 */
export function useSettings() {
  const fetchUserSettings = useGraphQLQuery<{ userSettings: UserSettings }>(
    QUERIES_EXTENDED.GET_USER_SETTINGS,
    { immediate: false }
  );
  const updateSettings = useGraphQLMutation<{ updateUserSettings: any }>(
    MUTATIONS_EXTENDED.UPDATE_SETTINGS
  );

  return {
    fetchUserSettings,
    updateSettings,
  };
}

/**
 * Helper function to use Security queries
 */
export function useSecurity() {
  const fetchSecuritySettings = useGraphQLQuery<{ securitySettings: SecuritySettings }>(
    QUERIES_EXTENDED.GET_SECURITY_SETTINGS,
    { immediate: false }
  );
  const enable2FA = useGraphQLMutation<{ enable2FA: any }>(MUTATIONS_EXTENDED.ENABLE_2FA);
  const disable2FA = useGraphQLMutation<{ disable2FA: any }>(MUTATIONS_EXTENDED.DISABLE_2FA);
  const verify2FA = useGraphQLMutation<{ verify2FA: any }>(MUTATIONS_EXTENDED.ENABLE_2FA);

  return {
    fetchSecuritySettings,
    enable2FA,
    disable2FA,
    verify2FA,
  };
}

/**
 * Helper function to use Sessions queries
 */
export function useSessions() {
  const fetchSessions = useGraphQLQuery<{ activeSessions: Session[] }>(
    QUERIES_EXTENDED.GET_ACTIVE_SESSIONS,
    { immediate: false }
  );
  const terminateSession = useGraphQLMutation<{ terminateSession: boolean }>(
    MUTATIONS_EXTENDED.TERMINATE_ALL_SESSIONS
  );
  const terminateAllSessions = useGraphQLMutation<{ terminateAllSessions: number }>(
    MUTATIONS_EXTENDED.TERMINATE_ALL_SESSIONS
  );

  return {
    fetchSessions,
    terminateSession,
    terminateAllSessions,
  };
}

/**
 * Helper function to use API Keys queries
 */
export function useApiKeys() {
  const fetchKeys = useGraphQLQuery<{ apiKeys: ApiKey[] }>(QUERIES_EXTENDED.GET_API_KEYS, {
    immediate: false,
  });
  const createKey = useGraphQLMutation<{ createAPIKey: any }>(MUTATIONS_EXTENDED.CREATE_API_KEY);
  const revokeKey = useGraphQLMutation<{ revokeAPIKey: boolean }>(
    MUTATIONS_EXTENDED.REVOKE_API_KEY
  );
  const updateKey = useGraphQLMutation<{ updateAPIKey: any }>(MUTATIONS_EXTENDED.CREATE_API_KEY);

  return {
    fetchKeys,
    createKey,
    revokeKey,
    updateKey,
  };
}

/**
 * Helper function to use Webhooks queries
 */
export function useWebhooks() {
  const fetchWebhooks = useGraphQLQuery<{ webhooks: Webhook[] }>(QUERIES_EXTENDED.GET_WEBHOOKS, {
    immediate: false,
  });
  const createWebhook = useGraphQLMutation<{ createWebhook: any }>(
    MUTATIONS_EXTENDED.CREATE_WEBHOOK
  );
  const updateWebhook = useGraphQLMutation<{ updateWebhook: any }>(
    MUTATIONS_EXTENDED.CREATE_WEBHOOK
  );
  const deleteWebhook = useGraphQLMutation<{ deleteWebhook: boolean }>(
    MUTATIONS_EXTENDED.DELETE_WEBHOOK
  );
  const testWebhook = useGraphQLMutation<{ testWebhook: any }>(MUTATIONS_EXTENDED.CREATE_WEBHOOK);

  return {
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook,
  };
}

/**
 * Helper function to use Support queries
 */
export function useSupport() {
  const fetchTickets = useGraphQLQuery<{ supportTickets: SupportTicket[] }>(
    QUERIES_EXTENDED.GET_SUPPORT_TICKETS,
    { immediate: false }
  );
  const createTicket = useGraphQLMutation<{ createSupportTicket: any }>(
    MUTATIONS_EXTENDED.CREATE_SUPPORT_TICKET
  );
  const updateTicket = useGraphQLMutation<{ updateSupportTicket: any }>(
    MUTATIONS_EXTENDED.UPDATE_SUPPORT_TICKET
  );
  const addComment = useGraphQLMutation<{ addTicketComment: any }>(
    MUTATIONS_EXTENDED.ADD_TICKET_COMMENT
  );
  const closeTicket = useGraphQLMutation<{ closeSupportTicket: any }>(
    MUTATIONS_EXTENDED.CLOSE_SUPPORT_TICKET
  );

  return {
    fetchTickets,
    createTicket,
    updateTicket,
    addComment,
    closeTicket,
  };
}

/**
 * Helper function to use Platform Stats queries
 */
export function usePlatformStats() {
  const fetchStats = useGraphQLQuery<{ platformStats: PlatformStats }>(
    QUERIES_EXTENDED.GET_PLATFORM_STATS,
    { immediate: false }
  );
  const fetchCoinStats = useGraphQLQuery<{ coinStats: any[] }>(QUERIES_EXTENDED.GET_COIN_STATS, {
    immediate: false,
  });
  const fetchActivityLog = useGraphQLQuery<{ activityLog: ActivityLog[] }>(
    QUERIES_EXTENDED.GET_ACTIVITY_LOG,
    { immediate: false }
  );

  return {
    fetchStats,
    fetchCoinStats,
    fetchActivityLog,
  };
}

/**
 * Export all helper functions for convenience
 */
/**
 * Helper function to use Bitcoin ETF queries
 */
export function useBTCEtf() {
  const fetchFlows = useGraphQLQuery<{ btcEtfFlows: BTCEtfFlow[] }>(
    QUERIES_EXTENDED.GET_BTC_ETF_FLOWS,
    { immediate: false }
  );
  const fetchSummary = useGraphQLQuery<{ btcEtfSummary: BTCEtfSummary }>(
    QUERIES_EXTENDED.GET_BTC_ETF_SUMMARY,
    { immediate: false }
  );

  return {
    fetchFlows,
    fetchSummary,
  };
}

/**
 * Helper function to use Coinbase Premium queries
 */
export function useCoinbasePremium() {
  const fetchPremium = useGraphQLQuery<{ coinbasePremium: CoinbasePremium }>(
    QUERIES_EXTENDED.GET_COINBASE_PREMIUM,
    { immediate: false }
  );

  return {
    fetchPremium,
  };
}

/**
 * Helper function to use Multisig wallet queries
 */
export function useMultisig() {
  const fetchWallets = useGraphQLQuery<{ multisigWallets: MultisigWallet[] }>(
    QUERIES_EXTENDED.GET_MULTISIG_WALLETS,
    { immediate: false }
  );
  const fetchTransactions = useGraphQLQuery<{ multisigTransactions: MultisigTransaction[] }>(
    QUERIES_EXTENDED.GET_MULTISIG_TRANSACTIONS,
    { immediate: false }
  );
  const createWallet = useGraphQLMutation<{ createMultisigWallet: any }>(
    MUTATIONS_EXTENDED.CREATE_MULTISIG_WALLET
  );
  const createTransaction = useGraphQLMutation<{ createMultisigTransaction: any }>(
    MUTATIONS_EXTENDED.CREATE_MULTISIG_TRANSACTION
  );
  const signTransaction = useGraphQLMutation<{ signMultisigTransaction: any }>(
    MUTATIONS_EXTENDED.SIGN_MULTISIG_TRANSACTION
  );
  const executeTransaction = useGraphQLMutation<{ executeMultisigTransaction: any }>(
    MUTATIONS_EXTENDED.EXECUTE_MULTISIG_TRANSACTION
  );

  return {
    fetchWallets,
    fetchTransactions,
    createWallet,
    createTransaction,
    signTransaction,
    executeTransaction,
  };
}

export const useGraphQLHelpers = {
  useStaking,
  useDeFi,
  useNews,
  useNFT,
  useLottery,
  useAirdrop,
  useGasOracle,
  usePriceAlerts,
  useWhaleAlerts,
  useTradingSignals,
  useMissions,
  useValidators,
  useDAO,
  useBridge,
  useTokenSecurity,
  useReferral,
  useConverter,
  useDEX,
  // New helper hooks
  useNotifications,
  useWallet,
  useTransactions,
  useFaucet,
  useAchievements,
  useLeaderboard,
  useSettings,
  useSecurity,
  useSessions,
  useApiKeys,
  useWebhooks,
  useSupport,
  usePlatformStats,
  // NEW: Bitcoin ETF, Coinbase Premium, Multisig
  useBTCEtf,
  useCoinbasePremium,
  useMultisig,
};
