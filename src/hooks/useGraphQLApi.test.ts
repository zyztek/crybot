import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';

// Mock the graphql service - must use a factory function that returns the mock
vi.mock('@/services/graphql', () => {
  const mockGraphqlQuery = vi.fn();
  const mockGraphqlMutation = vi.fn();
  return {
    graphqlQuery: mockGraphqlQuery,
    graphqlMutation: mockGraphqlMutation,
    QUERIES_EXTENDED: {
      GET_STAKING_POOLS: 'query GetStakingPools',
      GET_DEFI_PORTFOLIO: 'query GetDeFiPortfolio',
      GET_NEWS_ARTICLES: 'query GetNewsArticles',
      GET_NFT_COLLECTIONS: 'query GetNFTCollections',
      GET_LOTTERY_ROUNDS: 'query GetLotteryRounds',
      GET_AIRDROPS: 'query GetAirdrops',
      GET_GAS_PRICES: 'query GetGasPrices',
      GET_TOKEN_PRICES: 'query GetTokenPrices',
      GET_PRICE_ALERTS: 'query GetPriceAlerts',
    },
    MUTATIONS_EXTENDED: {
      STAKE_TOKEN: 'mutation StakeToken',
      UNSTAKE_TOKEN: 'mutation UnstakeToken',
      SUPPLY_LIQUIDITY: 'mutation SupplyLiquidity',
      MINT_NFT: 'mutation MintNFT',
    },
    __mockGraphqlQuery: mockGraphqlQuery,
    __mockGraphqlMutation: mockGraphqlMutation,
  };
});

// Mock useToast
vi.mock('./useToast', () => ({
  useToast: () => ({
    success: vi.fn(),
    error: vi.fn(),
  }),
  getFriendlyError: vi.fn((err: unknown) => err instanceof Error ? err.message : 'Error'),
}));

// Import after mocks are set up
import { useGraphQLApi } from './useGraphQLApi';

// Get the mocked functions after the mock is set up
import { __mockGraphqlQuery, __mockGraphqlMutation } from '@/services/graphql';

describe('useGraphQLApi Hook', () => {
  const mockGraphqlQuery = __mockGraphqlQuery;
  const mockGraphqlMutation = __mockGraphqlMutation;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Staking operations', () => {
    it('fetchStakingPools should return pools data', async () => {
      const mockPools = [
        { id: '1', name: 'BTC Staking', apy: '5%', coin: 'BTC' },
        { id: '2', name: 'ETH Staking', apy: '4%', coin: 'ETH' },
      ];

      mockGraphqlQuery.mockResolvedValueOnce({ data: { stakingPools: mockPools } });

      const { result } = renderHook(() => useGraphQLApi());

      const pools = await result.current.fetchStakingPools('ethereum', 'active');

      expect(pools).toEqual(mockPools);
      expect(mockGraphqlQuery).toHaveBeenCalledWith(
        'query GetStakingPools',
        { network: 'ethereum', status: 'active' }
      );
    });

    it('fetchMyStakingPositions should return user positions', async () => {
      const mockPositions = [
        { id: '1', poolId: '1', stakedAmount: '1000', status: 'active' },
      ];

      mockGraphqlQuery.mockResolvedValueOnce({ data: { myStakingPositions: mockPositions } });

      const { result } = renderHook(() => useGraphQLApi());

      const positions = await result.current.fetchMyStakingPositions(10, 0);

      expect(positions).toEqual(mockPositions);
    });

    it('stakeToken should return success on valid stake', async () => {
      mockGraphqlMutation.mockResolvedValueOnce({
        data: { stakeToken: { id: '1', stakedAmount: '100' } },
      });

      const { result } = renderHook(() => useGraphQLApi());

      const response = await result.current.stakeToken('pool1', 100, false);

      expect(response.success).toBe(true);
    });

    it('stakeToken should handle GraphQL errors', async () => {
      mockGraphqlMutation.mockResolvedValueOnce({
        errors: [{ message: 'Insufficient balance' }],
      });

      const { result } = renderHook(() => useGraphQLApi());

      const response = await result.current.stakeToken('pool1', 100);

      expect(response.success).toBe(false);
      expect(response.error).toBe('Insufficient balance');
    });

    it('unstakeToken should return success on valid unstake', async () => {
      mockGraphqlMutation.mockResolvedValueOnce({
        data: { unstakeToken: { id: '1', status: 'pending' } },
      });

      const { result } = renderHook(() => useGraphQLApi());

      const response = await result.current.unstakeToken('position1');

      expect(response.success).toBe(true);
    });
  });

  describe('DeFi operations', () => {
    it('fetchDeFiPortfolio should return portfolio data', async () => {
      const mockPortfolio = {
        totalValue: '10000',
        totalYield: '500',
        assets: [],
        debts: [],
      };

      mockGraphqlQuery.mockResolvedValueOnce({ data: { defiPortfolio: mockPortfolio } });

      const { result } = renderHook(() => useGraphQLApi());

      const portfolio = await result.current.fetchDeFiPortfolio();

      expect(portfolio).toEqual(mockPortfolio);
    });

    it('supplyLiquidity should return success on valid supply', async () => {
      mockGraphqlMutation.mockResolvedValueOnce({
        data: { supplyLiquidity: { id: '1', sharesReceived: '100' } },
      });

      const { result } = renderHook(() => useGraphQLApi());

      const response = await result.current.supplyLiquidity('protocol1', 'ETH', 1000);

      expect(response.success).toBe(true);
    });
  });

  describe('News operations', () => {
    it('fetchNewsArticles should return articles', async () => {
      const mockArticles = [
        { id: '1', title: 'Bitcoin News', category: 'crypto' },
      ];

      mockGraphqlQuery.mockResolvedValueOnce({ data: { newsArticles: mockArticles } });

      const { result } = renderHook(() => useGraphQLApi());

      const articles = await result.current.fetchNewsArticles('crypto', 20, 0);

      expect(articles).toEqual(mockArticles);
    });
  });

  describe('NFT operations', () => {
    it('fetchNFTCollections should return collections', async () => {
      const mockCollections = [
        { id: '1', name: 'Bored Ape', floorPrice: '100' },
      ];

      mockGraphqlQuery.mockResolvedValueOnce({ data: { nftCollections: mockCollections } });

      const { result } = renderHook(() => useGraphQLApi());

      const collections = await result.current.fetchNFTCollections('art', 'volume', 20);

      expect(collections).toEqual(mockCollections);
    });

    it('mintNFT should return success on valid mint', async () => {
      mockGraphqlMutation.mockResolvedValueOnce({
        data: { mintNFT: { id: '1', tokenId: '123' } },
      });

      const { result } = renderHook(() => useGraphQLApi());

      const response = await result.current.mintNFT('collection1');

      expect(response.success).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors gracefully', async () => {
      mockGraphqlQuery.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useGraphQLApi());

      const pools = await result.current.fetchStakingPools();

      expect(pools).toEqual([]);
      expect(result.current.error).toBe('Network error');
    });
  });
});