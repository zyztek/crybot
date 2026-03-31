/**
 * useGraphQLApi Hook - GraphQL Integration with Zustand Store
 *
 * Provides GraphQL data fetching and integrates with the store
 */

import { useCallback, useState } from 'react';
import { graphqlQuery, graphqlMutation, QUERIES_EXTENDED, MUTATIONS_EXTENDED } from '@/services/graphql';
import { getFriendlyError, useToast } from './useToast';

export const useGraphQLApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  // Note: store available for future integration with Zustand
  // const store = useCryptoStore();

  // ============ STAKING QUERIES ============
  
  const fetchStakingPools = useCallback(async (network?: string, status?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ stakingPools: any[] }>(
        QUERIES_EXTENDED.GET_STAKING_POOLS,
        { network, status }
      );
      return response.data?.stakingPools || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyStakingPositions = useCallback(async (limit = 10, offset = 0) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ myStakingPositions: any[] }>(
        QUERIES_EXTENDED.GET_MY_STAKING_POSITIONS,
        { limit, offset }
      );
      return response.data?.myStakingPositions || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stakeToken = useCallback(async (poolId: string, amount: number, compound = false) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ stakeToken: any }>(
        MUTATIONS_EXTENDED.STAKE_TOKEN,
        { poolId, amount, compound }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Stake submitted successfully!');
      return { success: true, data: response.data?.stakeToken };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const unstakeToken = useCallback(async (positionId: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ unstakeToken: any }>(
        MUTATIONS_EXTENDED.UNSTAKE_TOKEN,
        { positionId }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Unstake submitted successfully!');
      return { success: true, data: response.data?.unstakeToken };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ DEFI QUERIES ============

  const fetchDeFiPortfolio = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ defiPortfolio: any }>(
        QUERIES_EXTENDED.GET_DEFI_PORTFOLIO
      );
      return response.data?.defiPortfolio || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDeFiProtocols = useCallback(async (category?: string, network?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ defiProtocols: any[] }>(
        QUERIES_EXTENDED.GET_DEFI_PROTOCOLS,
        { category, network }
      );
      return response.data?.defiProtocols || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchYieldOpportunities = useCallback(async (minApy?: number, network?: string, riskLevel?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ yieldOpportunities: any[] }>(
        QUERIES_EXTENDED.GET_YIELD_OPPORTUNITIES,
        { minApy, network, riskLevel }
      );
      return response.data?.yieldOpportunities || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const supplyLiquidity = useCallback(async (protocolId: string, token: string, amount: number) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ supplyLiquidity: any }>(
        MUTATIONS_EXTENDED.SUPPLY_LIQUIDITY,
        { protocolId, token, amount }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Liquidity supplied successfully!');
      return { success: true, data: response.data?.supplyLiquidity };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ NEWS QUERIES ============

  const fetchNewsArticles = useCallback(async (category?: string, limit = 20, offset = 0) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ newsArticles: any[] }>(
        QUERIES_EXTENDED.GET_NEWS_ARTICLES,
        { category, limit, offset }
      );
      return response.data?.newsArticles || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchNewsCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ newsCategories: any[] }>(
        QUERIES_EXTENDED.GET_NEWS_CATEGORIES
      );
      return response.data?.newsCategories || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMarketSentiment = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ marketSentiment: any }>(
        QUERIES_EXTENDED.GET_MARKET_SENTIMENT
      );
      return response.data?.marketSentiment || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ NFT QUERIES ============

  const fetchNFTCollections = useCallback(async (category?: string, sortBy = 'volume', limit = 20) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ nftCollections: any[] }>(
        QUERIES_EXTENDED.GET_NFT_COLLECTIONS,
        { category, sortBy, limit }
      );
      return response.data?.nftCollections || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMyNFTs = useCallback(async (collectionId?: string, limit = 20, offset = 0) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ myNFTs: any[] }>(
        QUERIES_EXTENDED.GET_MY_NFTS,
        { collectionId, limit, offset }
      );
      return response.data?.myNFTs || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mintNFT = useCallback(async (collectionId: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ mintNFT: any }>(
        MUTATIONS_EXTENDED.MINT_NFT,
        { collectionId }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('NFT minted successfully!');
      return { success: true, data: response.data?.mintNFT };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ LOTTERY QUERIES ============

  const fetchLotteryRounds = useCallback(async (status?: string, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ lotteryRounds: any[] }>(
        QUERIES_EXTENDED.GET_LOTTERY_ROUNDS,
        { status, limit }
      );
      return response.data?.lotteryRounds || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buyLotteryTicket = useCallback(async (roundId: string, numbers: number[]) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ buyLotteryTicket: any }>(
        MUTATIONS_EXTENDED.BUY_LOTTERY_TICKET,
        { roundId, numbers }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Ticket purchased successfully!');
      return { success: true, data: response.data?.buyLotteryTicket };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ AIRDROP QUERIES ============

  const fetchAirdrops = useCallback(async (status?: string, network?: string, limit = 20) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ airdrops: any[] }>(
        QUERIES_EXTENDED.GET_AIRDROPS,
        { status, network, limit }
      );
      return response.data?.airdrops || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const claimAirdrop = useCallback(async (airdropId: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ claimAirdrop: any }>(
        MUTATIONS_EXTENDED.CLAIM_AIRDROP,
        { airdropId }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Airdrop claimed successfully!');
      return { success: true, data: response.data?.claimAirdrop };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ GAS/ORACLE QUERIES ============

  const fetchGasPrices = useCallback(async (network?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ gasPrices: any }>(
        QUERIES_EXTENDED.GET_GAS_PRICES,
        { network }
      );
      return response.data?.gasPrices || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTokenPrices = useCallback(async (coins: string[]) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ tokenPrices: any[] }>(
        QUERIES_EXTENDED.GET_TOKEN_PRICES,
        { coins }
      );
      return response.data?.tokenPrices || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ PRICE ALERTS QUERIES ============

  const fetchPriceAlerts = useCallback(async (activeOnly = true) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ priceAlerts: any[] }>(
        QUERIES_EXTENDED.GET_PRICE_ALERTS,
        { activeOnly }
      );
      return response.data?.priceAlerts || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPriceAlert = useCallback(async (coin: string, targetPrice: number, condition: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ createPriceAlert: any }>(
        MUTATIONS_EXTENDED.CREATE_PRICE_ALERT,
        { coin, targetPrice, condition }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Price alert created!');
      return { success: true, data: response.data?.createPriceAlert };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const deletePriceAlert = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ deletePriceAlert: boolean }>(
        MUTATIONS_EXTENDED.DELETE_PRICE_ALERT,
        { id }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Price alert deleted');
      return { success: true };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ WHALE ALERTS QUERIES ============

  const fetchWhaleAlerts = useCallback(async (coin?: string, minAmount?: number, limit = 20) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ whaleAlerts: any[] }>(
        QUERIES_EXTENDED.GET_WHALE_ALERTS,
        { coin, minAmount, limit }
      );
      return response.data?.whaleAlerts || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subscribeWhaleAlerts = useCallback(async (coin?: string, minAmount?: number) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ subscribeWhaleAlerts: any }>(
        MUTATIONS_EXTENDED.SUBSCRIBE_WHALE_ALERTS,
        { coin, minAmount }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Subscribed to whale alerts!');
      return { success: true, data: response.data?.subscribeWhaleAlerts };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ TRADING SIGNALS QUERIES ============

  const fetchTradingSignals = useCallback(async (coin?: string, timeframe = '1d', limit = 20) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ tradingSignals: any[] }>(
        QUERIES_EXTENDED.GET_TRADING_SIGNALS,
        { coin, timeframe, limit }
      );
      return response.data?.tradingSignals || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ MISSIONS QUERIES ============

  const fetchMissions = useCallback(async (status?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ missions: any[] }>(
        QUERIES_EXTENDED.GET_MISSIONS,
        { status }
      );
      return response.data?.missions || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const claimMissionReward = useCallback(async (missionId: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ claimMissionReward: any }>(
        MUTATIONS_EXTENDED.CLAIM_MISSION_REWARD,
        { missionId }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Mission reward claimed!');
      return { success: true, data: response.data?.claimMissionReward };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ ANALYTICS QUERIES ============

  const fetchPortfolioAnalytics = useCallback(async (timeRange = '30d') => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ portfolioAnalytics: any }>(
        QUERIES_EXTENDED.GET_PORTFOLIO_ANALYTICS,
        { timeRange }
      );
      return response.data?.portfolioAnalytics || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ VALIDATOR QUERIES ============

  const fetchValidators = useCallback(async (network?: string, status?: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ validators: any[] }>(
        QUERIES_EXTENDED.GET_VALIDATORS,
        { network, status }
      );
      return response.data?.validators || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const delegateToValidator = useCallback(async (validatorId: string, amount: number) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ delegateToValidator: any }>(
        MUTATIONS_EXTENDED.DELEGATE_TO_VALIDATOR,
        { validatorId, amount }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Delegation submitted!');
      return { success: true, data: response.data?.delegateToValidator };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ DAO QUERIES ============

  const fetchDAOProposals = useCallback(async (status?: string, limit = 20) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ daoProposals: any[] }>(
        QUERIES_EXTENDED.GET_DAO_PROPOSALS,
        { status, limit }
      );
      return response.data?.daoProposals || [];
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const voteOnProposal = useCallback(async (proposalId: string, vote: string, weight?: number) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ voteOnProposal: any }>(
        MUTATIONS_EXTENDED.VOTE_ON_PROPOSAL,
        { proposalId, vote, weight }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Vote submitted!');
      return { success: true, data: response.data?.voteOnProposal };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ BRIDGE QUERIES ============

  const fetchBridgeQuote = useCallback(async (
    fromNetwork: string,
    toNetwork: string,
    token: string,
    amount: number
  ) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ bridgeQuote: any }>(
        QUERIES_EXTENDED.GET_BRIDGE_QUOTE,
        { fromNetwork, toNetwork, token, amount }
      );
      return response.data?.bridgeQuote || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initiateBridge = useCallback(async (
    fromNetwork: string,
    toNetwork: string,
    token: string,
    amount: number
  ) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ initiateBridge: any }>(
        MUTATIONS_EXTENDED.INITIATE_BRIDGE,
        { fromNetwork, toNetwork, token, amount }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Bridge initiated!');
      return { success: true, data: response.data?.initiateBridge };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // ============ TOKEN SECURITY QUERIES ============

  const checkTokenSafety = useCallback(async (contractAddress: string, network: string) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ checkTokenSafety: any }>(
        QUERIES_EXTENDED.CHECK_TOKEN_SAFETY,
        { contractAddress, network }
      );
      return response.data?.checkTokenSafety || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ REFERRAL QUERIES ============

  const fetchReferralStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ referralStats: any }>(
        QUERIES_EXTENDED.GET_REFERRAL_STATS
      );
      return response.data?.referralStats || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ CONVERTER QUERIES ============

  const getConversionRate = useCallback(async (
    from: string,
    to: string,
    amount: number
  ) => {
    setIsLoading(true);
    try {
      const response = await graphqlQuery<{ conversionRate: any }>(
        QUERIES_EXTENDED.GET_CONVERSION_RATE,
        { from, to, amount }
      );
      return response.data?.conversionRate || null;
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============ SWAP/DEX MUTATIONS ============

  const executeSwap = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: number,
    slippage = 0.5
  ) => {
    setIsLoading(true);
    try {
      const response = await graphqlMutation<{ executeSwap: any }>(
        MUTATIONS_EXTENDED.EXECUTE_SWAP,
        { fromToken, toToken, amount, slippage }
      );
      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }
      toast.success('Swap executed successfully!');
      return { success: true, data: response.data?.executeSwap };
    } catch (err) {
      const message = getFriendlyError(err);
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isLoading,
    error,
    // Staking
    fetchStakingPools,
    fetchMyStakingPositions,
    stakeToken,
    unstakeToken,
    // DeFi
    fetchDeFiPortfolio,
    fetchDeFiProtocols,
    fetchYieldOpportunities,
    supplyLiquidity,
    // News
    fetchNewsArticles,
    fetchNewsCategories,
    fetchMarketSentiment,
    // NFT
    fetchNFTCollections,
    fetchMyNFTs,
    mintNFT,
    // Lottery
    fetchLotteryRounds,
    buyLotteryTicket,
    // Airdrop
    fetchAirdrops,
    claimAirdrop,
    // Gas/Oracle
    fetchGasPrices,
    fetchTokenPrices,
    // Price Alerts
    fetchPriceAlerts,
    createPriceAlert,
    deletePriceAlert,
    // Whale Alerts
    fetchWhaleAlerts,
    subscribeWhaleAlerts,
    // Trading Signals
    fetchTradingSignals,
    // Missions
    fetchMissions,
    claimMissionReward,
    // Analytics
    fetchPortfolioAnalytics,
    // Validators
    fetchValidators,
    delegateToValidator,
    // DAO
    fetchDAOProposals,
    voteOnProposal,
    // Bridge
    fetchBridgeQuote,
    initiateBridge,
    // Token Security
    checkTokenSafety,
    // Referral
    fetchReferralStats,
    // Converter
    getConversionRate,
    // DEX
    executeSwap,
  };
};

export default useGraphQLApi;