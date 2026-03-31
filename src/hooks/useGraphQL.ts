/**
 * useGraphQL Hook
 *
 * React hook for executing GraphQL queries and mutations
 * Provides loading, error, and data states
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { graphqlQuery, graphqlMutation, GraphQLResponse, GraphQLVariables, QUERIES_EXTENDED, MUTATIONS_EXTENDED } from '../services/graphql';

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

  const execute = useCallback(async (vars?: GraphQLVariables) => {
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
  }, [query]);

  const refetch = useCallback(async () => {
    await execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const execute = useCallback(async (vars?: GraphQLVariables): Promise<T | null> => {
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
  }, [mutation]);

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

  const execute = useCallback(async (vars?: GraphQLVariables): Promise<void | T | null> => {
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
  }, [queryOrMutation, isMutation]);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, refetch, reset };
}

export default {
  useGraphQLQuery,
  useGraphQLMutation,
  useGraphQL,
};

// ============ Helper Functions for Extended Queries/Mutations ============

/**
 * Helper function to use Staking queries
 */
export function useStaking() {
  const fetchPools = useGraphQLQuery<{ stakingPools: StakingPool[] }>(QUERIES_EXTENDED.GET_STAKING_POOLS, { immediate: false });
  const fetchPositions = useGraphQLQuery<{ myStakingPositions: StakingPosition[] }>(QUERIES_EXTENDED.GET_MY_STAKING_POSITIONS, { immediate: false });
  const stake = useGraphQLMutation<{ stakeToken: any }>(MUTATIONS_EXTENDED.STAKE_TOKEN);
  const unstake = useGraphQLMutation<{ unstakeToken: any }>(MUTATIONS_EXTENDED.UNSTAKE_TOKEN);
  const claimRewards = useGraphQLMutation<{ claimStakingRewards: any }>(MUTATIONS_EXTENDED.CLAIM_STAKING_REWARDS);

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
  const fetchPortfolio = useGraphQLQuery<{ defiPortfolio: DeFiPortfolio }>(QUERIES_EXTENDED.GET_DEFI_PORTFOLIO, { immediate: false });
  const fetchProtocols = useGraphQLQuery<{ defiProtocols: any[] }>(QUERIES_EXTENDED.GET_DEFI_PROTOCOLS, { immediate: false });
  const fetchYieldOpportunities = useGraphQLQuery<{ yieldOpportunities: any[] }>(QUERIES_EXTENDED.GET_YIELD_OPPORTUNITIES, { immediate: false });
  const supplyLiquidity = useGraphQLMutation<{ supplyLiquidity: any }>(MUTATIONS_EXTENDED.SUPPLY_LIQUIDITY);
  const withdrawLiquidity = useGraphQLMutation<{ withdrawLiquidity: any }>(MUTATIONS_EXTENDED.WITHDRAW_LIQUIDITY);

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
  const fetchArticles = useGraphQLQuery<{ newsArticles: NewsArticle[] }>(QUERIES_EXTENDED.GET_NEWS_ARTICLES, { immediate: false });
  const fetchCategories = useGraphQLQuery<{ newsCategories: string[] }>(QUERIES_EXTENDED.GET_NEWS_CATEGORIES, { immediate: false });
  const fetchSentiment = useGraphQLQuery<{ marketSentiment: MarketSentiment }>(QUERIES_EXTENDED.GET_MARKET_SENTIMENT, { immediate: false });

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
  const fetchCollections = useGraphQLQuery<{ nftCollections: NFTCollection[] }>(QUERIES_EXTENDED.GET_NFT_COLLECTIONS, { immediate: false });
  const fetchMyNFTs = useGraphQLQuery<{ myNFTs: any[] }>(QUERIES_EXTENDED.GET_MY_NFTS, { immediate: false });
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
  const fetchRounds = useGraphQLQuery<{ lotteryRounds: LotteryRound[] }>(QUERIES_EXTENDED.GET_LOTTERY_ROUNDS, { immediate: false });
  const fetchMyTickets = useGraphQLQuery<{ myLotteryTickets: any[] }>(QUERIES_EXTENDED.GET_MY_LOTTERY_TICKETS, { immediate: false });
  const buyTicket = useGraphQLMutation<{ buyLotteryTicket: any }>(MUTATIONS_EXTENDED.BUY_LOTTERY_TICKET);
  const claimPrize = useGraphQLMutation<{ claimLotteryPrize: any }>(MUTATIONS_EXTENDED.CLAIM_LOTTERY_PRIZE);

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
  const fetchAirdrops = useGraphQLQuery<{ airdrops: Airdrop[] }>(QUERIES_EXTENDED.GET_AIRDROPS, { immediate: false });
  const fetchMyClaims = useGraphQLQuery<{ myAirdropClaims: any[] }>(QUERIES_EXTENDED.GET_MY_AIRDROP_CLAIMS, { immediate: false });
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
  const fetchGasPrices = useGraphQLQuery<{ gasPrices: any }>(QUERIES_EXTENDED.GET_GAS_PRICES, { immediate: false });
  const fetchTokenPrices = useGraphQLQuery<{ tokenPrices: any[] }>(QUERIES_EXTENDED.GET_TOKEN_PRICES, { immediate: false });
  const fetchHistoricalGas = useGraphQLQuery<{ historicalGas: any[] }>(QUERIES_EXTENDED.GET_HISTORICAL_GAS, { immediate: false });

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
  const fetchAlerts = useGraphQLQuery<{ priceAlerts: PriceAlert[] }>(QUERIES_EXTENDED.GET_PRICE_ALERTS, { immediate: false });
  const create = useGraphQLMutation<{ createPriceAlert: any }>(MUTATIONS_EXTENDED.CREATE_PRICE_ALERT);
  const deleteAlert = useGraphQLMutation<{ deletePriceAlert: boolean }>(MUTATIONS_EXTENDED.DELETE_PRICE_ALERT);
  const update = useGraphQLMutation<{ updatePriceAlert: any }>(MUTATIONS_EXTENDED.UPDATE_PRICE_ALERT);

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
  const fetchAlerts = useGraphQLQuery<{ whaleAlerts: WhaleAlert[] }>(QUERIES_EXTENDED.GET_WHALE_ALERTS, { immediate: false });
  const subscribe = useGraphQLMutation<{ subscribeWhaleAlerts: any }>(MUTATIONS_EXTENDED.SUBSCRIBE_WHALE_ALERTS);
  const unsubscribe = useGraphQLMutation<{ unsubscribeWhaleAlerts: boolean }>(MUTATIONS_EXTENDED.UNSUBSCRIBE_WHALE_ALERTS);

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
  const fetchSignals = useGraphQLQuery<{ tradingSignals: TradingSignal[] }>(QUERIES_EXTENDED.GET_TRADING_SIGNALS, { immediate: false });
  const createSignal = useGraphQLMutation<{ createTradingSignal: any }>(MUTATIONS_EXTENDED.CREATE_TRADING_SIGNAL);
  const followSignal = useGraphQLMutation<{ followTradingSignal: any }>(MUTATIONS_EXTENDED.FOLLOW_TRADING_SIGNAL);

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
  const fetchMissions = useGraphQLQuery<{ missions: Mission[] }>(QUERIES_EXTENDED.GET_MISSIONS, { immediate: false });
  const fetchMyMissions = useGraphQLQuery<{ myMissions: any[] }>(QUERIES_EXTENDED.GET_MY_MISSIONS, { immediate: false });
  const claimReward = useGraphQLMutation<{ claimMissionReward: any }>(MUTATIONS_EXTENDED.CLAIM_MISSION_REWARD);
  const updateProgress = useGraphQLMutation<{ updateMissionProgress: any }>(MUTATIONS_EXTENDED.UPDATE_MISSION_PROGRESS);

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
  const fetchValidators = useGraphQLQuery<{ validators: Validator[] }>(QUERIES_EXTENDED.GET_VALIDATORS, { immediate: false });
  const delegate = useGraphQLMutation<{ delegateToValidator: any }>(MUTATIONS_EXTENDED.DELEGATE_TO_VALIDATOR);
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
  const fetchProposals = useGraphQLQuery<{ daoProposals: DAOProposal[] }>(QUERIES_EXTENDED.GET_DAO_PROPOSALS, { immediate: false });
  const fetchMyVotes = useGraphQLQuery<{ myDAOVotes: any[] }>(QUERIES_EXTENDED.GET_MY_DAO_VOTES, { immediate: false });
  const createProposal = useGraphQLMutation<{ createProposal: any }>(MUTATIONS_EXTENDED.CREATE_PROPOSAL);
  const vote = useGraphQLMutation<{ voteOnProposal: any }>(MUTATIONS_EXTENDED.VOTE_ON_PROPOSAL);
  const executeProposal = useGraphQLMutation<{ executeProposal: any }>(MUTATIONS_EXTENDED.EXECUTE_PROPOSAL);

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
  const fetchQuote = useGraphQLQuery<{ bridgeQuote: BridgeQuote }>(QUERIES_EXTENDED.GET_BRIDGE_QUOTE, { immediate: false });
  const fetchHistory = useGraphQLQuery<{ bridgeHistory: any[] }>(QUERIES_EXTENDED.GET_BRIDGE_HISTORY, { immediate: false });
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
  const checkSafety = useGraphQLQuery<{ checkTokenSafety: TokenSafety }>(QUERIES_EXTENDED.CHECK_TOKEN_SAFETY, { immediate: false });
  const getTokenInfo = useGraphQLQuery<{ tokenInfo: any }>(QUERIES_EXTENDED.GET_TOKEN_INFO, { immediate: false });

  return {
    checkSafety,
    getTokenInfo,
  };
}

/**
 * Helper function to use Referral queries
 */
export function useReferral() {
  const fetchStats = useGraphQLQuery<{ referralStats: ReferralStats }>(QUERIES_EXTENDED.GET_REFERRAL_STATS, { immediate: false });
  const generateCode = useGraphQLMutation<{ generateReferralCode: any }>(MUTATIONS_EXTENDED.GENERATE_REFERRAL_CODE);
  const claimReward = useGraphQLMutation<{ claimReferralReward: any }>(MUTATIONS_EXTENDED.CLAIM_REFERRAL_REWARD);

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
  const getRate = useGraphQLQuery<{ conversionRate: ConversionRate }>(QUERIES_EXTENDED.GET_CONVERSION_RATE, { immediate: false });
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
  const getQuote = useGraphQLQuery<{ dexQuote: any }>(QUERIES_EXTENDED.GET_DEX_QUOTE, { immediate: false });
  const getPoolInfo = useGraphQLQuery<{ poolInfo: any }>(QUERIES_EXTENDED.GET_POOL_INFO, { immediate: false });
  const executeSwap = useGraphQLMutation<{ executeSwap: any }>(MUTATIONS_EXTENDED.EXECUTE_SWAP);
  const addLiquidity = useGraphQLMutation<{ addLiquidity: any }>(MUTATIONS_EXTENDED.ADD_LIQUIDITY);
  const removeLiquidity = useGraphQLMutation<{ removeLiquidity: any }>(MUTATIONS_EXTENDED.REMOVE_LIQUIDITY);

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
};