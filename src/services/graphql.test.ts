import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  graphqlFetch,
  graphqlQuery,
  graphqlMutation,
  QUERIES,
  MUTATIONS,
  QUERIES_EXTENDED,
  MUTATIONS_EXTENDED,
} from './graphql';

// Mock the api module for token retrieval
vi.mock('./api', () => ({
  getToken: vi.fn().mockReturnValue('mock-token'),
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

describe('GraphQL Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('graphqlFetch', () => {
    it('should make a successful GraphQL request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { me: { id: '1', username: 'test' } } }),
      });

      const result = await graphqlQuery<{ me: { id: string; username: string } }>(
        QUERIES.GET_ME
      );

      expect(result.data?.me.id).toBe('1');
      expect(result.data?.me.username).toBe('test');
      
      // Verify fetch was called with POST and JSON content-type
      expect(mockFetch).toHaveBeenCalledWith(
        '/graphql',
        expect.objectContaining({
          method: 'POST',
        })
      );
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1].headers;
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('should include variables in the request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { user: { id: '1' } } }),
      });

      await graphqlQuery(QUERIES.GET_USER, { id: '1' });

      expect(mockFetch).toHaveBeenCalledWith(
        '/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: QUERIES.GET_USER,
            variables: { id: '1' },
          }),
        })
      );
    });

    it('should handle GraphQL errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          errors: [{ message: 'Unauthorized' }],
        }),
      });

      const result = await graphqlQuery(QUERIES.GET_ME);

      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toBe('Unauthorized');
    });

    it('should throw on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(graphqlQuery(QUERIES.GET_ME)).rejects.toThrow(
        'GraphQL request failed: Internal Server Error'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(graphqlQuery(QUERIES.GET_ME)).rejects.toThrow('Network error');
    });

    it('should use custom headers when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await graphqlFetch(QUERIES.GET_ME, {
        headers: { 'X-Custom-Header': 'custom-value' },
      });

      // Verify custom header is passed
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1].headers;
      expect(headers['X-Custom-Header']).toBe('custom-value');
      expect(headers['Content-Type']).toBe('application/json');
    });
  });

  describe('graphqlQuery', () => {
    it('should call graphqlFetch with query', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { faucets: [] } }),
      });

      await graphqlQuery(QUERIES.GET_FAUCETS);

      // Verify the request body contains the query
      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.query).toBe(QUERIES.GET_FAUCETS);
    });

    it('should pass variables to graphqlFetch', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { transactions: [] } }),
      });

      await graphqlQuery(QUERIES.GET_TRANSACTIONS, {
        coin: 'BTC',
        type: 'claim',
        limit: 10,
        offset: 0,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        '/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: QUERIES.GET_TRANSACTIONS,
            variables: { coin: 'BTC', type: 'claim', limit: 10, offset: 0 },
          }),
        })
      );
    });
  });

  describe('graphqlMutation', () => {
    it('should call graphqlFetch with mutation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { login: { token: 'abc' } } }),
      });

      await graphqlMutation(MUTATIONS.LOGIN, {
        input: { email: 'test@test.com', password: 'password' },
      });

      // Verify the request body contains the mutation
      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.query).toBe(MUTATIONS.LOGIN);
    });
  });

  describe('QUERIES', () => {
    it('should have GET_ME query defined', () => {
      expect(QUERIES.GET_ME).toContain('query GetMe');
      expect(QUERIES.GET_ME).toContain('id');
      expect(QUERIES.GET_ME).toContain('email');
      expect(QUERIES.GET_ME).toContain('username');
    });

    it('should have GET_USER query defined', () => {
      expect(QUERIES.GET_USER).toContain('query GetUser');
      expect(QUERIES.GET_USER).toContain('$id: ID!');
    });

    it('should have GET_WALLETS query defined', () => {
      expect(QUERIES.GET_WALLETS).toContain('query GetWallets');
      expect(QUERIES.GET_WALLETS).toContain('$coin: String');
    });

    it('should have GET_FAUCETS query defined', () => {
      expect(QUERIES.GET_FAUCETS).toContain('query GetFaucets');
      expect(QUERIES.GET_FAUCETS).toContain('name');
      expect(QUERIES.GET_FAUCETS).toContain('coin');
    });

    it('should have GET_LEADERBOARD query defined', () => {
      expect(QUERIES.GET_LEADERBOARD).toContain('query GetLeaderboard');
      expect(QUERIES.GET_LEADERBOARD).toContain('$period: String!');
    });
  });

  describe('MUTATIONS', () => {
    it('should have REGISTER mutation defined', () => {
      expect(MUTATIONS.REGISTER).toContain('mutation Register');
      expect(MUTATIONS.REGISTER).toContain('$input: RegisterInput!');
    });

    it('should have LOGIN mutation defined', () => {
      expect(MUTATIONS.LOGIN).toContain('mutation Login');
      expect(MUTATIONS.LOGIN).toContain('token');
      expect(MUTATIONS.LOGIN).toContain('refreshToken');
    });

    it('should have CLAIM_FAUCET mutation defined', () => {
      expect(MUTATIONS.CLAIM_FAUCET).toContain('mutation ClaimFaucet');
      expect(MUTATIONS.CLAIM_FAUCET).toContain('$input: ClaimFaucetInput!');
    });
  });

  describe('QUERIES_EXTENDED', () => {
    it('should have staking queries defined', () => {
      expect(QUERIES_EXTENDED.GET_STAKING_POOLS).toContain('query GetStakingPools');
      expect(QUERIES_EXTENDED.GET_MY_STAKING_POSITIONS).toContain(
        'query GetMyStakingPositions'
      );
    });

    it('should have DeFi queries defined', () => {
      expect(QUERIES_EXTENDED.GET_DEFI_PORTFOLIO).toContain('query GetDeFiPortfolio');
      expect(QUERIES_EXTENDED.GET_DEFI_PROTOCOLS).toContain('query GetDeFiProtocols');
      expect(QUERIES_EXTENDED.GET_YIELD_OPPORTUNITIES).toContain(
        'query GetYieldOpportunities'
      );
    });

    it('should have news queries defined', () => {
      expect(QUERIES_EXTENDED.GET_NEWS_ARTICLES).toContain('query GetNewsArticles');
      expect(QUERIES_EXTENDED.GET_MARKET_SENTIMENT).toContain('query GetMarketSentiment');
    });

    it('should have NFT queries defined', () => {
      expect(QUERIES_EXTENDED.GET_NFT_COLLECTIONS).toContain('query GetNFTCollections');
      expect(QUERIES_EXTENDED.GET_MY_NFTS).toContain('query GetMyNFTs');
    });

    it('should have lottery queries defined', () => {
      expect(QUERIES_EXTENDED.GET_LOTTERY_ROUNDS).toContain('query GetLotteryRounds');
      expect(QUERIES_EXTENDED.GET_MY_LOTTERY_TICKETS).toContain('query GetMyLotteryTickets');
    });

    it('should have airdrop queries defined', () => {
      expect(QUERIES_EXTENDED.GET_AIRDROPS).toContain('query GetAirdrops');
      expect(QUERIES_EXTENDED.GET_MY_AIRDROP_CLAIMS).toContain('query GetMyAirdropClaims');
    });

    it('should have gas/oracle queries defined', () => {
      expect(QUERIES_EXTENDED.GET_GAS_PRICES).toContain('query GetGasPrices');
      expect(QUERIES_EXTENDED.GET_TOKEN_PRICES).toContain('query GetTokenPrices');
    });

    it('should have price alert queries defined', () => {
      expect(QUERIES_EXTENDED.GET_PRICE_ALERTS).toContain('query GetPriceAlerts');
    });

    it('should have whale alert queries defined', () => {
      expect(QUERIES_EXTENDED.GET_WHALE_ALERTS).toContain('query GetWhaleAlerts');
    });

    it('should have trading signals queries defined', () => {
      expect(QUERIES_EXTENDED.GET_TRADING_SIGNALS).toContain('query GetTradingSignals');
    });

    it('should have mission queries defined', () => {
      expect(QUERIES_EXTENDED.GET_MISSIONS).toContain('query GetMissions');
      expect(QUERIES_EXTENDED.GET_MY_MISSIONS).toContain('query GetMyMissions');
    });

    it('should have DAO queries defined', () => {
      expect(QUERIES_EXTENDED.GET_DAO_PROPOSALS).toContain('query GetDAOProposals');
      expect(QUERIES_EXTENDED.GET_MY_DAO_VOTES).toContain('query GetMyDAOVotes');
    });

    it('should have bridge queries defined', () => {
      expect(QUERIES_EXTENDED.GET_BRIDGE_QUOTE).toContain('query GetBridgeQuote');
      expect(QUERIES_EXTENDED.GET_BRIDGE_HISTORY).toContain('query GetBridgeHistory');
    });

    it('should have token security queries defined', () => {
      expect(QUERIES_EXTENDED.CHECK_TOKEN_SAFETY).toContain('query CheckTokenSafety');
    });
  });

  describe('MUTATIONS_EXTENDED', () => {
    it('should have staking mutations defined', () => {
      expect(MUTATIONS_EXTENDED.STAKE_TOKEN).toContain('mutation StakeToken');
      expect(MUTATIONS_EXTENDED.UNSTAKE_TOKEN).toContain('mutation UnstakeToken');
    });

    it('should have DeFi mutations defined', () => {
      expect(MUTATIONS_EXTENDED.SUPPLY_LIQUIDITY).toContain('mutation SupplyLiquidity');
      expect(MUTATIONS_EXTENDED.WITHDRAW_LIQUIDITY).toContain('mutation WithdrawLiquidity');
    });

    it('should have lending mutations defined', () => {
      expect(MUTATIONS_EXTENDED.SUPPLY_TO_LENDING).toContain('mutation SupplyToLending');
      expect(MUTATIONS_EXTENDED.BORROW).toContain('mutation Borrow');
      expect(MUTATIONS_EXTENDED.REPAY_LOAN).toContain('mutation RepayLoan');
    });

    it('should have NFT mutations defined', () => {
      expect(MUTATIONS_EXTENDED.MINT_NFT).toContain('mutation MintNFT');
      expect(MUTATIONS_EXTENDED.TRANSFER_NFT).toContain('mutation TransferNFT');
      expect(MUTATIONS_EXTENDED.BUY_NFT).toContain('mutation BuyNFT');
    });

    it('should have lottery mutations defined', () => {
      expect(MUTATIONS_EXTENDED.BUY_LOTTERY_TICKET).toContain('mutation BuyLotteryTicket');
      expect(MUTATIONS_EXTENDED.CLAIM_LOTTERY_PRIZE).toContain('mutation ClaimLotteryPrize');
    });

    it('should have airdrop mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CLAIM_AIRDROP).toContain('mutation ClaimAirdrop');
    });

    it('should have price alert mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_PRICE_ALERT).toContain('mutation CreatePriceAlert');
      expect(MUTATIONS_EXTENDED.DELETE_PRICE_ALERT).toContain('mutation DeletePriceAlert');
    });

    it('should have validator mutations defined', () => {
      expect(MUTATIONS_EXTENDED.DELEGATE_TO_VALIDATOR).toContain('mutation DelegateToValidator');
      expect(MUTATIONS_EXTENDED.UNDELEGATE).toContain('mutation Undelegate');
    });

    it('should have DAO mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_PROPOSAL).toContain('mutation CreateProposal');
      expect(MUTATIONS_EXTENDED.VOTE_ON_PROPOSAL).toContain('mutation VoteOnProposal');
    });

    it('should have bridge mutations defined', () => {
      expect(MUTATIONS_EXTENDED.INITIATE_BRIDGE).toContain('mutation InitiateBridge');
      expect(MUTATIONS_EXTENDED.COMPLETE_BRIDGE).toContain('mutation CompleteBridge');
    });

    it('should have DCA strategy mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_DCA_STRATEGY).toContain('mutation CreateDCAStrategy');
      expect(MUTATIONS_EXTENDED.PAUSE_DCA_STRATEGY).toContain('mutation PauseDCAStrategy');
      expect(MUTATIONS_EXTENDED.CANCEL_DCA_STRATEGY).toContain('mutation CancelDCAStrategy');
    });

    it('should have grid bot mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_GRID_BOT).toContain('mutation CreateGridBot');
      expect(MUTATIONS_EXTENDED.STOP_GRID_BOT).toContain('mutation StopGridBot');
    });

    it('should have copy trading mutations defined', () => {
      expect(MUTATIONS_EXTENDED.FOLLOW_TRADER).toContain('mutation FollowTrader');
      expect(MUTATIONS_EXTENDED.UNFOLLOW_TRADER).toContain('mutation UnfollowTrader');
    });

    it('should have webhook mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_WEBHOOK).toContain('mutation CreateWebhook');
      expect(MUTATIONS_EXTENDED.DELETE_WEBHOOK).toContain('mutation DeleteWebhook');
    });

    it('should have API key mutations defined', () => {
      expect(MUTATIONS_EXTENDED.CREATE_API_KEY).toContain('mutation CreateAPIKey');
      expect(MUTATIONS_EXTENDED.REVOKE_API_KEY).toContain('mutation RevokeAPIKey');
    });
  });

  describe('Query/Mutation structure validation', () => {
    it('should have all required fields in GET_ME query', () => {
      expect(QUERIES.GET_ME).toContain('id');
      expect(QUERIES.GET_ME).toContain('email');
      expect(QUERIES.GET_ME).toContain('username');
      expect(QUERIES.GET_ME).toContain('walletAddress');
      expect(QUERIES.GET_ME).toContain('referralCode');
      expect(QUERIES.GET_ME).toContain('level');
    });

    it('should have all required fields in GET_FAUCETS query', () => {
      expect(QUERIES.GET_FAUCETS).toContain('name');
      expect(QUERIES.GET_FAUCETS).toContain('coin');
      expect(QUERIES.GET_FAUCETS).toContain('network');
      expect(QUERIES.GET_FAUCETS).toContain('amountMin');
      expect(QUERIES.GET_FAUCETS).toContain('amountMax');
      expect(QUERIES.GET_FAUCETS).toContain('isActive');
    });

    it('should have proper variable definitions in queries', () => {
      // Check that variables are properly typed
      expect(QUERIES.GET_USER).toContain('$id: ID!');
      expect(QUERIES.GET_FAUCETS).toContain('$coin: String');
      expect(QUERIES.GET_FAUCETS).toContain('$network: String');
      expect(QUERIES_EXTENDED.GET_GAS_PRICES).toContain('$network: String');
      expect(QUERIES_EXTENDED.GET_TOKEN_PRICES).toContain('$coins: [String!]!');
    });
  });
});