/**
 * GraphQL Client Service
 *
 * Lightweight GraphQL client using fetch API
 * Connects to the backend GraphQL endpoint
 */

import { getToken } from './api';

const GRAPHQL_ENDPOINT = '/graphql';

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; locations?: Array<{ line: number; column: number }> }>;
}

export interface GraphQLVariables {
  [key: string]: unknown;
}

export interface GraphQLQueryOptions {
  variables?: GraphQLVariables;
  headers?: Record<string, string>;
}

/**
 * Execute a GraphQL query or mutation
 */
export async function graphqlFetch<T>(
  query: string,
  options: GraphQLQueryOptions = {}
): Promise<GraphQLResponse<T>> {
  const { variables = {}, headers = {} } = options;

  // Get auth token if available
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  headers['Content-Type'] = 'application/json';

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}

/**
 * Execute a GraphQL query (read operations)
 */
export async function graphqlQuery<T>(
  query: string,
  variables?: GraphQLVariables
): Promise<GraphQLResponse<T>> {
  return graphqlFetch<T>(query, { variables });
}

/**
 * Execute a GraphQL mutation (write operations)
 */
export async function graphqlMutation<T>(
  mutation: string,
  variables?: GraphQLVariables
): Promise<GraphQLResponse<T>> {
  return graphqlFetch<T>(mutation, { variables });
}

// Pre-built queries for common operations
export const QUERIES = {
  // User queries
  GET_ME: `
    query GetMe {
      me {
        id
        email
        username
        walletAddress
        referralCode
        level
        totalEarned
        createdAt
      }
    }
  `,

  GET_USER: `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        email
        username
        walletAddress
        referralCode
        level
        totalEarned
        createdAt
        wallets {
          id
          coin
          address
          balance
        }
      }
    }
  `,

  // Wallet queries
  GET_WALLETS: `
    query GetWallets($coin: String) {
      wallets(coin: $coin) {
        id
        userId
        coin
        address
        balance
        isCustodial
        createdAt
      }
    }
  `,

  // Transaction queries
  GET_TRANSACTIONS: `
    query GetTransactions($coin: String, $type: String, $limit: Int, $offset: Int) {
      transactions(coin: $coin, type: $type, limit: $limit, offset: $offset) {
        id
        userId
        type
        coin
        amount
        fee
        txHash
        fromAddress
        toAddress
        status
        confirmations
        createdAt
      }
    }
  `,

  GET_MY_TRANSACTIONS: `
    query GetMyTransactions($limit: Int, $offset: Int) {
      myTransactions(limit: $limit, $offset: $offset) {
        id
        type
        coin
        amount
        fee
        txHash
        status
        createdAt
      }
    }
  `,

  // Faucet queries
  GET_FAUCETS: `
    query GetFaucets($coin: String, $network: String, $activeOnly: Boolean) {
      faucets(coin: $coin, network: $network, activeOnly: $activeOnly) {
        id
        name
        coin
        network
        faucetUrl
        amountMin
        amountMax
        intervalHours
        isActive
        requiresApiKey
      }
    }
  `,

  // Achievement queries
  GET_ACHIEVEMENTS: `
    query GetAchievements($coin: String) {
      achievements(coin: $coin) {
        id
        name
        description
        icon
        coin
        target
        reward
        type
      }
    }
  `,

  GET_MY_ACHIEVEMENTS: `
    query GetMyAchievements {
      myAchievements {
        id
        achievementId
        progress
        completed
        completedAt
        claimedAt
        achievement {
          id
          name
          description
          icon
          coin
          target
          reward
          type
        }
      }
    }
  `,

  // Analytics queries
  GET_ANALYTICS_SUMMARY: `
    query GetAnalyticsSummary {
      analyticsSummary {
        totalUsers
        totalClaims
        totalVolume
        activeUsers24h
        topCoins {
          coin
          claims
          volume
        }
      }
    }
  `,

  // Leaderboard queries
  GET_LEADERBOARD: `
    query GetLeaderboard($period: String!, $limit: Int) {
      leaderboard(period: $period, limit: $limit) {
        id
        userId
        username
        score
        rank
        period
        updatedAt
      }
    }
  `,
};

// Additional Queries for Extended Features
export const QUERIES_EXTENDED = {
  // Staking queries
  GET_STAKING_POOLS: `
    query GetStakingPools($network: String, $status: String) {
      stakingPools(network: $network, status: $status) {
        id
        name
        coin
        network
        apy
        tvl
        minStake
        maxStake
        lockPeriod
        rewardsCoin
        isActive
        totalStakers
        createdAt
      }
    }
  `,

  GET_MY_STAKING_POSITIONS: `
    query GetMyStakingPositions($limit: Int, $offset: Int) {
      myStakingPositions(limit: $limit, offset: $offset) {
        id
        poolId
        poolName
        coin
        stakedAmount
        rewardsEarned
        rewardsClaimed
        startTime
        unlockTime
        status
        compounded
      }
    }
  `,

  GET_STAKING_REWARDS_HISTORY: `
    query GetStakingRewardsHistory($limit: Int) {
      stakingRewardsHistory(limit: $limit) {
        id
        positionId
        amount
        type
        txHash
        createdAt
      }
    }
  `,

  // DeFi Dashboard queries
  GET_DEFI_PORTFOLIO: `
    query GetDeFiPortfolio {
      defiPortfolio {
        totalValue
        totalYield
        totalDebt
        netWorth
        assets {
          id
          protocol
          token
          amount
          value
          apy
          type
        }
        debts {
          id
          protocol
          token
          amount
          value
          interestRate
        }
      }
    }
  `,

  GET_DEFI_PROTOCOLS: `
    query GetDeFiProtocols($category: String, $network: String) {
      defiProtocols(category: $category, network: $network) {
        id
        name
        logo
        category
        network
        tvl
        apy
        riskLevel
        description
        website
        docsUrl
      }
    }
  `,

  GET_YIELD_OPPORTUNITIES: `
    query GetYieldOpportunities($minApy: Float, $network: String, $riskLevel: String) {
      yieldOpportunities(minApy: $minApy, network: $network, riskLevel: $riskLevel) {
        id
        protocol
        token
        network
        apy
        tvl
        lockPeriod
        riskLevel
        type
        actions
      }
    }
  `,

  // News queries
  GET_NEWS_ARTICLES: `
    query GetNewsArticles($category: String, $limit: Int, $offset: Int) {
      newsArticles(category: $category, limit: $limit, offset: $offset) {
        id
        title
        summary
        content
        source
        author
        imageUrl
        url
        category
        tags
        publishedAt
        trending
        sentiment
      }
    }
  `,

  GET_NEWS_CATEGORIES: `
    query GetNewsCategories {
      newsCategories {
        id
        name
        slug
        articleCount
        icon
      }
    }
  `,

  GET_MARKET_SENTIMENT: `
    query GetMarketSentiment {
      marketSentiment {
        overall
        fearGreedIndex
        socialSentiment
        newsSentiment
        trendingCoins
        updatedAt
      }
    }
  `,

  // NFT queries
  GET_NFT_COLLECTIONS: `
    query GetNFTCollections($category: String, $sortBy: String, $limit: Int) {
      nftCollections(category: $category, sortBy: $sortBy, limit: $limit) {
        id
        name
        symbol
        description
        imageUrl
        bannerUrl
        floorPrice
        totalVolume
        totalSupply
        ownersCount
        blockchain
        contractAddress
        website
        socialLinks
      }
    }
  `,

  GET_MY_NFTS: `
    query GetMyNFTs($collectionId: ID, $limit: Int, $offset: Int) {
      myNFTs(collectionId: $collectionId, limit: $limit, offset: $offset) {
        id
        tokenId
        name
        description
        imageUrl
        animationUrl
        attributes
        collection {
          id
          name
          symbol
        }
        acquiredAt
        acquiredPrice
        currentValue
      }
    }
  `,

  GET_NFT_MARKET_DATA: `
    query GetNFTMarketData($collectionId: ID!) {
      nftMarketData(collectionId: $collectionId) {
        floorPrice
        highestSale
        averagePrice
        totalVolume
        totalSales
        holdersCount
        priceHistory {
          date
          price
          volume
        }
      }
    }
  `,

  // Lottery queries
  GET_LOTTERY_ROUNDS: `
    query GetLotteryRounds($status: String, $limit: Int) {
      lotteryRounds(status: $status, limit: $limit) {
        id
        name
        ticketPrice
        prizePool
        startTime
        endTime
        status
        winningNumbers
        totalTickets
        myTickets
      }
    }
  `,

  GET_MY_LOTTERY_TICKETS: `
    query GetMyLotteryTickets($roundId: ID) {
      myLotteryTickets(roundId: $roundId) {
        id
        roundId
        numbers
        isWinner
        prize
        purchasedAt
      }
    }
  `,

  // Airdrop queries
  GET_AIRDROPS: `
    query GetAirdrops($status: String, $network: String, $limit: Int) {
      airdrops(status: $status, network: $network, limit: $limit) {
        id
        name
        description
        logoUrl
        tokenName
        tokenSymbol
        totalAmount
        perUser
        network
        status
        startTime
        endTime
        requirements
        website
        isClaimed
        canClaim
      }
    }
  `,

  GET_MY_AIRDROP_CLAIMS: `
    query GetMyAirdropClaims {
      myAirdropClaims {
        id
        airdropId
        airdropName
        tokenAmount
        txHash
        claimedAt
        status
      }
    }
  `,

  // VIP queries
  GET_VIP_TIERS: `
    query GetVIPTiers {
      vipTiers {
        id
        name
        level
        requiredVolume
        requiredReferrals
        benefits
        icon
        color
      }
    }
  `,

  GET_MY_VIP_STATUS: `
    query GetMyVIPStatus {
      myVipStatus {
        tierId
        tierName
        level
        currentVolume
        currentReferrals
        nextTierAt
        benefitsUnlocked
        progress
      }
    }
  `,

  // Gas/Oracle queries
  GET_GAS_PRICES: `
    query GetGasPrices($network: String) {
      gasPrices(network: $network) {
        network
        slow
        standard
        fast
        fastest
        lastUpdated
      }
    }
  `,

  GET_TOKEN_PRICES: `
    query GetTokenPrices($coins: [String!]!) {
      tokenPrices(coins: $coins) {
        coin
        price
        change24h
        change7d
        marketCap
        volume24h
        updatedAt
      }
    }
  `,

  GET_ORACLE_DATA: `
    query GetOracleData($feedIds: [String!]) {
      oracleData(feedIds: $feedIds) {
        id
        name
        value
        timestamp
        source
        confidence
      }
    }
  `,

  // Analytics extended queries
  GET_PORTFOLIO_ANALYTICS: `
    query GetPortfolioAnalytics($timeRange: String) {
      portfolioAnalytics(timeRange: $timeRange) {
        totalValue
        totalProfit
        totalLoss
        profitPercentage
        allocation {
          coin
          value
          percentage
        }
        history {
          date
          value
        }
      }
    }
  `,

  GET_TRANSACTION_ANALYTICS: `
    query GetTransactionAnalytics($timeRange: String, $coin: String) {
      transactionAnalytics(timeRange: $timeRange, coin: $coin) {
        totalTransactions
        totalVolume
        averageTransactionSize
        byType {
          type
          count
          volume
        }
        byStatus {
          status
          count
        }
      }
    }
  `,

  // Price Alerts queries
  GET_PRICE_ALERTS: `
    query GetPriceAlerts($activeOnly: Boolean) {
      priceAlerts(activeOnly: $activeOnly) {
        id
        coin
        targetPrice
        condition
        isActive
        triggered
        triggeredAt
        createdAt
      }
    }
  `,

  // Whale Alerts queries
  GET_WHALE_ALERTS: `
    query GetWhaleAlerts($coin: String, $minAmount: Float, $limit: Int) {
      whaleAlerts(coin: $coin, minAmount: $minAmount, limit: $limit) {
        id
        coin
        amount
        usdValue
        fromAddress
        toAddress
        txHash
        type
        timestamp
      }
    }
  `,

  // Trading Signals queries
  GET_TRADING_SIGNALS: `
    query GetTradingSignals($coin: String, $timeframe: String, $limit: Int) {
      tradingSignals(coin: $coin, timeframe: $timeframe, limit: $limit) {
        id
        coin
        signal
        entryPrice
        takeProfitPrices
        stopLoss
        confidence
        timeframe
        createdAt
        expiresAt
        rationale
      }
    }
  `,

  // Mission/Task queries
  GET_MISSIONS: `
    query GetMissions($status: String) {
      missions(status: $status) {
        id
        title
        description
        type
        reward
        rewardCoin
        requirements
        progress
        maxProgress
        isCompleted
        isClaimed
        expiresAt
        createdAt
      }
    }
  `,

  GET_MY_MISSIONS: `
    query GetMyMissions {
      myMissions {
        id
        missionId
        progress
        completed
        claimedAt
        mission {
          id
          title
          description
          type
          reward
        }
      }
    }
  `,

  // Shop queries
  GET_SHOP_ITEMS: `
    query GetShopItems($category: String, $sortBy: String) {
      shopItems(category: $category, sortBy: $sortBy) {
        id
        name
        description
        price
        priceCoin
        imageUrl
        category
        stock
        isLimited
        expiresAt
      }
    }
  `,

  GET_MY_PURCHASES: `
    query GetMyPurchases($limit: Int, $offset: Int) {
      myPurchases(limit: $limit, offset: $offset) {
        id
        itemId
        itemName
        price
        purchasedAt
        status
      }
    }
  `,

  // Converter queries
  GET_CONVERSION_RATE: `
    query GetConversionRate($from: String!, $to: String!, $amount: Float!) {
      conversionRate(from: $from, to: $to, amount: $amount) {
        fromCoin
        toCoin
        fromAmount
        toAmount
        rate
        fee
        total
      }
    }
  `,

  // Token analysis queries
  GET_TOKEN_ANALYSIS: `
    query GetTokenAnalysis($contractAddress: String!, $network: String!) {
      tokenAnalysis(contractAddress: $contractAddress, network: $network) {
        name
        symbol
        price
        marketCap
        supply
        holders
        topHolders
        transfers24h
        isMintable
        isPaused
        trustScore
        security {
          isVerified
          isHoneypot
          isOpenSource
          hasProxy
          hasBlacklist
        }
        socialLinks
        website
      }
    }
  `,

  // Validator queries
  GET_VALIDATORS: `
    query GetValidators($network: String, $status: String) {
      validators(network: $network, status: $status) {
        id
        name
        network
        commission
        uptime
        totalStaked
        delegators
        rewardRate
        status
        website
        socialLinks
      }
    }
  `,

  GET_MY_VALIDATORS: `
    query GetMyValidators {
      myValidators {
        id
        validatorId
        validatorName
        network
        stakedAmount
        rewardsEarned
        startTime
        status
      }
    }
  `,

  // Governance/DAO queries
  GET_DAO_PROPOSALS: `
    query GetDAOProposals($status: String, $limit: Int) {
      daoProposals(status: $status, limit: $limit) {
        id
        title
        description
        status
        votesFor
        votesAgainst
        totalVotes
        quorum
        createdAt
        endsAt
        executedAt
        creator
      }
    }
  `,

  GET_MY_DAO_VOTES: `
    query GetMyDAOVotes($proposalId: ID) {
      myDAOVotes(proposalId: $proposalId) {
        id
        proposalId
        vote
        weight
        votedAt
      }
    }
  `,

  // Bridge queries
  GET_BRIDGE_QUOTE: `
    query GetBridgeQuote($fromNetwork: String!, $toNetwork: String!, $token: String!, $amount: Float!) {
      bridgeQuote(fromNetwork: $fromNetwork, toNetwork: $toNetwork, token: $token, amount: $amount) {
        fromNetwork
        toNetwork
        token
        amount
        estimatedReceive
        fee
        feeToken
        estimatedTime
        route
      }
    }
  `,

  GET_BRIDGE_HISTORY: `
    query GetBridgeHistory($limit: Int, $offset: Int) {
      bridgeHistory(limit: $limit, offset: $offset) {
        id
        fromNetwork
        toNetwork
        token
        sentAmount
        receivedAmount
        fee
        status
        txHash
        bridgeTxHash
        createdAt
        completedAt
      }
    }
  `,

  // Events/Calendar queries
  GET_CALENDAR_EVENTS: `
    query GetCalendarEvents($startDate: String, $endDate: String, $category: String) {
      calendarEvents(startDate: $startDate, endDate: $endDate, category: $category) {
        id
        title
        description
        date
        time
        category
        coin
        importance
        source
        url
      }
    }
  `,

  // Scam/Token Security queries
  CHECK_TOKEN_SAFETY: `
    query CheckTokenSafety($contractAddress: String!, $network: String!) {
      checkTokenSafety(contractAddress: $contractAddress, network: $network) {
        isSafe
        riskScore
        risks {
          type
          severity
          description
        }
        isVerified
        isHoneypot
        isMintable
        hasProxy
        hasBlacklist
        holderDistribution
        tokenInfo {
          name
          symbol
          decimals
          totalSupply
        }
      }
    }
  `,

  // Referral extended queries
  GET_REFERRAL_STATS: `
    query GetReferralStats {
      referralStats {
        totalReferrals
        activeReferrals
        totalEarnings
        pendingEarnings
        referralLink
        commissionRate
      }
    }
  `,

  GET_REFERRAL_ACTIVITY: `
    query GetReferralActivity($limit: Int, $offset: Int) {
      referralActivity(limit: $limit, offset: $offset) {
        id
        userId
        username
        action
        reward
        status
        createdAt
      }
    }
  `,
};

export const MUTATIONS = {
  // Auth mutations
  REGISTER: `
    mutation Register($input: RegisterInput!) {
      register(input: $input) {
        token
        refreshToken
        user {
          id
          email
          username
        }
      }
    }
  `,

  LOGIN: `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        refreshToken
        user {
          id
          email
          username
        }
      }
    }
  `,

  REFRESH_TOKEN: `
    mutation RefreshToken($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        token
        refreshToken
        user {
          id
          email
          username
        }
      }
    }
  `,

  // User mutations
  UPDATE_USER: `
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        username
        walletAddress
      }
    }
  `,

  // Wallet mutations
  CREATE_WALLET: `
    mutation CreateWallet($input: CreateWalletInput!) {
      createWallet(input: $input) {
        id
        coin
        address
        balance
        isCustodial
      }
    }
  `,

  DELETE_WALLET: `
    mutation DeleteWallet($id: ID!) {
      deleteWallet(id: $id)
    }
  `,

  // Faucet mutations
  CLAIM_FAUCET: `
    mutation ClaimFaucet($input: ClaimFaucetInput!) {
      claimFaucet(input: $input) {
        id
        userId
        faucetId
        coin
        amount
        ipAddress
        txHash
        status
        claimedAt
      }
    }
  `,

  // Achievement mutations
  CLAIM_ACHIEVEMENT: `
    mutation ClaimAchievement($id: ID!) {
      claimAchievement(id: $id) {
        id
        achievementId
        progress
        completed
        claimedAt
      }
    }
  `,
};

// Extended Mutations for Additional Features
export const MUTATIONS_EXTENDED = {
  // Staking mutations
  STAKE_TOKEN: `
    mutation StakeToken($poolId: ID!, $amount: Float!, $compound: Boolean) {
      stakeToken(poolId: $poolId, amount: $amount, compound: $compound) {
        id
        poolId
        stakedAmount
        rewardsEarned
        startTime
        unlockTime
        status
        txHash
      }
    }
  `,

  UNSTAKE_TOKEN: `
    mutation UnstakeToken($positionId: ID!) {
      unstakeToken(positionId: $positionId) {
        id
        status
        txHash
        releasedAmount
      }
    }
  `,

  CLAIM_STAKING_REWARDS: `
    mutation ClaimStakingRewards($positionId: ID, $compound: Boolean) {
      claimStakingRewards(positionId: $positionId, compound: $compound) {
        id
        amount
        txHash
      }
    }
  `,

  // DeFi mutations
  SUPPLY_LIQUIDITY: `
    mutation SupplyLiquidity($protocolId: ID!, $token: String!, $amount: Float!) {
      supplyLiquidity(protocolId: $protocolId, token: $token, amount: $amount) {
        id
        protocolId
        token
        amount
        sharesReceived
        apy
        txHash
      }
    }
  `,

  WITHDRAW_LIQUIDITY: `
    mutation WithdrawLiquidity($positionId: ID!, $amount: Float) {
      withdrawLiquidity(positionId: $positionId, amount: $amount) {
        id
        amountReceived
        txHash
      }
    }
  `,

  // Lending mutations
  SUPPLY_TO_LENDING: `
    mutation SupplyToLending($protocolId: ID!, $token: String!, $amount: Float!) {
      supplyToLending(protocolId: $protocolId, token: $token, amount: $amount) {
        id
        token
        amount
        collateralValue
        apy
        txHash
      }
    }
  `,

  WITHDRAW_FROM_LENDING: `
    mutation WithdrawFromLending($positionId: ID!, $amount: Float!) {
      withdrawFromLending(positionId: $positionId, amount: $amount) {
        id
        amountReceived
        remainingCollateral
        txHash
      }
    }
  `,

  BORROW: `
    mutation Borrow($protocolId: ID!, $token: String!, $amount: Float!) {
      borrow(protocolId: $protocolId, token: $token, amount: $amount) {
        id
        token
        amount
        interestRate
        healthFactor
        txHash
      }
    }
  `,

  REPAY_LOAN: `
    mutation RepayLoan($positionId: ID!, $amount: Float!) {
      repayLoan(positionId: $positionId, amount: $amount) {
        id
        amountRepaid
        remainingDebt
        healthFactor
        txHash
      }
    }
  `,

  // Swap/DEX mutations
  EXECUTE_SWAP: `
    mutation ExecuteSwap($fromToken: String!, $toToken: String!, $amount: Float!, $slippage: Float) {
      executeSwap(fromToken: $fromToken, toToken: $toToken, amount: $amount, slippage: $slippage) {
        id
        fromToken
        toToken
        fromAmount
        toAmount
        priceImpact
        route
        txHash
      }
    }
  `,

  // NFT mutations
  MINT_NFT: `
    mutation MintNFT($collectionId: ID!) {
      mintNFT(collectionId: $collectionId) {
        id
        tokenId
        name
        imageUrl
        txHash
      }
    }
  `,

  TRANSFER_NFT: `
    mutation TransferNFT($nftId: ID!, $toAddress: String!) {
      transferNFT(nftId: $nftId, toAddress: $toAddress) {
        id
        txHash
      }
    }
  `,

  LIST_NFT_FOR_SALE: `
    mutation ListNFTForSale($nftId: ID!, $price: Float!, $currency: String!) {
      listNFTForSale(nftId: $nftId, price: $price, currency: $currency) {
        id
        price
        currency
        txHash
      }
    }
  `,

  CANCEL_NFT_SALE: `
    mutation CancelNFTSale($listingId: ID!) {
      cancelNFTSale(listingId: $listingId) {
        id
        txHash
      }
    }
  `,

  BUY_NFT: `
    mutation BuyNFT($listingId: ID!) {
      buyNFT(listingId: $listingId) {
        id
        nftId
        price
        txHash
      }
    }
  `,

  // Lottery mutations
  BUY_LOTTERY_TICKET: `
    mutation BuyLotteryTicket($roundId: ID!, $numbers: [Int!]!) {
      buyLotteryTicket(roundId: $roundId, numbers: $numbers) {
        id
        roundId
        numbers
        price
        txHash
      }
    }
  `,

  CLAIM_LOTTERY_PRIZE: `
    mutation ClaimLotteryPrize($ticketId: ID!) {
      claimLotteryPrize(ticketId: $ticketId) {
        id
        prize
        txHash
      }
    }
  `,

  // Airdrop mutations
  CLAIM_AIRDROP: `
    mutation ClaimAirdrop($airdropId: ID!) {
      claimAirdrop(airdropId: $airdropId) {
        id
        airdropId
        amount
        txHash
      }
    }
  `,

  // Price Alert mutations
  CREATE_PRICE_ALERT: `
    mutation CreatePriceAlert($coin: String!, $targetPrice: Float!, $condition: String!) {
      createPriceAlert(coin: $coin, targetPrice: $targetPrice, condition: $condition) {
        id
        coin
        targetPrice
        condition
        isActive
        createdAt
      }
    }
  `,

  UPDATE_PRICE_ALERT: `
    mutation UpdatePriceAlert($id: ID!, $targetPrice: Float, $isActive: Boolean) {
      updatePriceAlert(id: $id, targetPrice: $targetPrice, isActive: $isActive) {
        id
        targetPrice
        isActive
      }
    }
  `,

  DELETE_PRICE_ALERT: `
    mutation DeletePriceAlert($id: ID!) {
      deletePriceAlert(id: $id)
    }
  `,

  // Trading Signal mutations
  SUBSCRIBE_SIGNAL: `
    mutation SubscribeSignal($signalId: ID!) {
      subscribeSignal(signalId: $signalId) {
        id
        signalId
        subscribedAt
      }
    }
  `,

  UNSUBSCRIBE_SIGNAL: `
    mutation UnsubscribeSignal($subscriptionId: ID!) {
      unsubscribeSignal(subscriptionId: $subscriptionId)
    }
  `,

  // Mission mutations
  UPDATE_MISSION_PROGRESS: `
    mutation UpdateMissionProgress($missionId: ID!) {
      updateMissionProgress(missionId: $missionId) {
        id
        missionId
        progress
      }
    }
  `,

  CLAIM_MISSION_REWARD: `
    mutation ClaimMissionReward($missionId: ID!) {
      claimMissionReward(missionId: $missionId) {
        id
        missionId
        reward
        rewardCoin
        txHash
      }
    }
  `,

  // Shop mutations
  PURCHASE_ITEM: `
    mutation PurchaseItem($itemId: ID!, $quantity: Int) {
      purchaseItem(itemId: $itemId, quantity: $quantity) {
        id
        itemId
        itemName
        quantity
        totalPrice
        txHash
      }
    }
  `,

  // Token analysis mutations
  ADD_TOKEN_TO_WATCHLIST: `
    mutation AddTokenToWatchlist($contractAddress: String!, $network: String!) {
      addTokenToWatchlist(contractAddress: $contractAddress, network: $network) {
        id
        contractAddress
        network
        addedAt
      }
    }
  `,

  REMOVE_TOKEN_FROM_WATCHLIST: `
    mutation RemoveTokenFromWatchlist($watchlistId: ID!) {
      removeTokenFromWatchlist(watchlistId: $watchlistId)
    }
  `,

  // Validator mutations
  DELEGATE_TO_VALIDATOR: `
    mutation DelegateToValidator($validatorId: ID!, $amount: Float!) {
      delegateToValidator(validatorId: $validatorId, amount: $amount) {
        id
        validatorId
        amount
        rewardsEarned
        startTime
        txHash
      }
    }
  `,

  UNDELEGATE: `
    mutation Undelegate($positionId: ID!) {
      undelegate(positionId: $positionId) {
        id
        amount
        txHash
      }
    }
  `,

  CLAIM_VALIDATOR_REWARDS: `
    mutation ClaimValidatorRewards($positionId: ID!) {
      claimValidatorRewards(positionId: $positionId) {
        id
        amount
        txHash
      }
    }
  `,

  // DAO/Governance mutations
  CREATE_PROPOSAL: `
    mutation CreateProposal($title: String!, $description: String!, $actions: String!) {
      createProposal(title: $title, description: $description, actions: $actions) {
        id
        title
        status
        createdAt
      }
    }
  `,

  VOTE_ON_PROPOSAL: `
    mutation VoteOnProposal($proposalId: ID!, $vote: String!, $weight: Float) {
      voteOnProposal(proposalId: $proposalId, vote: $vote, weight: $weight) {
        id
        proposalId
        vote
        weight
        votedAt
      }
    }
  `,

  EXECUTE_PROPOSAL: `
    mutation ExecuteProposal($proposalId: ID!) {
      executeProposal(proposalId: $proposalId) {
        id
        executedAt
        txHash
      }
    }
  `,

  // Bridge mutations
  INITIATE_BRIDGE: `
    mutation InitiateBridge($fromNetwork: String!, $toNetwork: String!, $token: String!, $amount: Float!) {
      initiateBridge(fromNetwork: $fromNetwork, toNetwork: $toNetwork, token: $token, amount: $amount) {
        id
        fromNetwork
        toNetwork
        token
        amount
        fee
        estimatedReceive
        txHash
      }
    }
  `,

  COMPLETE_BRIDGE: `
    mutation CompleteBridge($bridgeId: ID!) {
      completeBridge(bridgeId: $bridgeId) {
        id
        status
        txHash
      }
    }
  `,

  // Whale Alert mutations
  SUBSCRIBE_WHALE_ALERTS: `
    mutation SubscribeWhaleAlerts($coin: String, $minAmount: Float) {
      subscribeWhaleAlerts(coin: $coin, minAmount: $minAmount) {
        id
        coin
        minAmount
        subscribedAt
      }
    }
  `,

  UNSUBSCRIBE_WHALE_ALERTS: `
    mutation UnsubscribeWhaleAlerts($subscriptionId: ID!) {
      unsubscribeWhaleAlerts(subscriptionId: $subscriptionId)
    }
  `,

  // Gas Alert mutations
  CREATE_GAS_ALERT: `
    mutation CreateGasAlert($network: String!, $targetPrice: Float!, $condition: String!) {
      createGasAlert(network: $network, targetPrice: $targetPrice, condition: $condition) {
        id
        network
        targetPrice
        condition
        createdAt
      }
    }
  `,

  DELETE_GAS_ALERT: `
    mutation DeleteGasAlert($id: ID!) {
      deleteGasAlert(id: $id)
    }
  `,

  // User settings mutations
  UPDATE_NOTIFICATION_SETTINGS: `
    mutation UpdateNotificationSettings($input: NotificationSettingsInput!) {
      updateNotificationSettings(input: $input) {
        email
        push
        sms
        telegram
      }
    }
  `,

  UPDATE_SECURITY_SETTINGS: `
    mutation UpdateSecuritySettings($input: SecuritySettingsInput!) {
      updateSecuritySettings(input: $input) {
        twoFactorEnabled
        sessionTimeout
        allowedIPs
      }
    }
  `,

  // Backup/Export mutations
  EXPORT_DATA: `
    mutation ExportData($format: String!) {
      exportData(format: $format) {
        url
        expiresAt
      }
    }
  `,

  // Multi-sig mutations
  CREATE_MULTISIG_WALLET: `
    mutation CreateMultisigWallet($name: String!, $signers: [String!]!, $requiredSignatures: Int!) {
      createMultisigWallet(name: $name, signers: $signers, requiredSignatures: $requiredSignatures) {
        id
        address
        name
      }
    }
  `,

  EXECUTE_MULTISIG_TRANSACTION: `
    mutation ExecuteMultisigTransaction($walletId: ID!, $txId: ID!) {
      executeMultisigTransaction(walletId: $walletId, txId: $txId) {
        id
        txHash
      }
    }
  `,

  // Token Vesting mutations
  CREATE_VESTING_SCHEDULE: `
    mutation CreateVestingSchedule($recipient: String!, $token: String!, $totalAmount: Float!, $startTime: String!, $duration: Int!, $cliff: Int) {
      createVestingSchedule(recipient: $recipient, token: $token, totalAmount: $totalAmount, startTime: $startTime, duration: $duration, cliff: $cliff) {
        id
        recipient
        totalAmount
        startTime
        duration
      }
    }
  `,

  CLAIM_VESTED_TOKENS: `
    mutation ClaimVestedTokens($vestingId: ID!) {
      claimVestedTokens(vestingId: $vestingId) {
        id
        amount
        txHash
      }
    }
  `,

  // Contract interaction mutations
  INTERACT_WITH_CONTRACT: `
    mutation InteractWithContract($contractAddress: String!, $network: String!, $abi: String!, $functionName: String!, $args: JSON) {
      interactWithContract(contractAddress: $contractAddress, network: $network, abi: $abi, functionName: $functionName, args: $args) {
        id
        txHash
        result
      }
    }
  `,

  // Batch transactions mutations
  BATCH_TRANSACTION: `
    mutation BatchTransaction($transactions: [TransactionInput!]!) {
      batchTransaction(transactions: $transactions) {
        id
        status
        transactions {
          txHash
          status
        }
      }
    }
  `,

  // Portfolio rebalancing mutations
  REBALANCE_PORTFOLIO: `
    mutation RebalancePortfolio($targets: [PortfolioTarget!]!, $slippage: Float) {
      rebalancePortfolio(targets: $targets, slippage: $slippage) {
        id
        swaps {
          fromToken
          toToken
          fromAmount
          toAmount
          txHash
        }
        totalValue
      }
    }
  `,

  // DCA Strategy mutations
  CREATE_DCA_STRATEGY: `
    mutation CreateDCAStrategy($input: DCAStrategyInput!) {
      createDCAStrategy(input: $input) {
        id
        fromToken
        toToken
        amount
        frequency
        startTime
        isActive
      }
    }
  `,

  PAUSE_DCA_STRATEGY: `
    mutation PauseDCAStrategy($strategyId: ID!) {
      pauseDCAStrategy(strategyId: $strategyId) {
        id
        isActive
      }
    }
  `,

  RESUME_DCA_STRATEGY: `
    mutation ResumeDCAStrategy($strategyId: ID!) {
      resumeDCAStrategy(strategyId: $strategyId) {
        id
        isActive
      }
    }
  `,

  CANCEL_DCA_STRATEGY: `
    mutation CancelDCAStrategy($strategyId: ID!) {
      cancelDCAStrategy(strategyId: $strategyId)
    }
  `,

  // Grid Trading mutations
  CREATE_GRID_BOT: `
    mutation CreateGridBot($token: String!, $lowerPrice: Float!, $upperPrice: Float!, $gridCount: Int!, $investment: Float!) {
      createGridBot(token: $token, lowerPrice: $lowerPrice, upperPrice: $upperPrice, gridCount: $gridCount, investment: $investment) {
        id
        token
        lowerPrice
        upperPrice
        gridCount
        isActive
      }
    }
  `,

  STOP_GRID_BOT: `
    mutation StopGridBot($botId: ID!) {
      stopGridBot(botId: $botId) {
        id
        totalProfit
        closedPositions
      }
    }
  `,

  // Copy Trading mutations
  FOLLOW_TRADER: `
    mutation FollowTrader($traderId: ID!, $allocation: Float!) {
      followTrader(traderId: $traderId, allocation: $allocation) {
        id
        traderId
        allocation
        startedAt
      }
    }
  `,

  UNFOLLOW_TRADER: `
    mutation UnfollowTrader($followId: ID!) {
      unfollowTrader(followId: $followId)
    }
  `,

  ADJUST_COPY_ALLOCATION: `
    mutation AdjustCopyAllocation($followId: ID!, $allocation: Float!) {
      adjustCopyAllocation(followId: $followId, allocation: $allocation) {
        id
        allocation
      }
    }
  `,

  // Token Lock mutations
  LOCK_TOKENS: `
    mutation LockTokens($token: String!, $amount: Float!, $duration: Int!, $beneficiary: String) {
      lockTokens(token: $token, amount: $amount, duration: $duration, beneficiary: $beneficiary) {
        id
        token
        amount
        lockEnd
        beneficiary
      }
    }
  `,

  UNLOCK_TOKENS: `
    mutation UnlockTokens($lockId: ID!) {
      unlockTokens(lockId: $lockId) {
        id
        amount
        txHash
      }
    }
  `,

  // Webhook mutations
  CREATE_WEBHOOK: `
    mutation CreateWebhook($url: String!, $events: [String!]!) {
      createWebhook(url: $url, events: $events) {
        id
        url
        events
        secret
      }
    }
  `,

  DELETE_WEBHOOK: `
    mutation DeleteWebhook($webhookId: ID!) {
      deleteWebhook(webhookId: $webhookId)
    }
  `,

  // API Key mutations
  CREATE_API_KEY: `
    mutation CreateAPIKey($name: String!, $permissions: [String!], $expiresAt: String) {
      createAPIKey(name: $name, permissions: $permissions, expiresAt: $expiresAt) {
        id
        name
        key
        permissions
        expiresAt
        createdAt
      }
    }
  `,

  REVOKE_API_KEY: `
    mutation RevokeAPIKey($keyId: ID!) {
      revokeAPIKey(keyId: $keyId)
    }
  `,
};

export default {
  query: graphqlQuery,
  mutation: graphqlMutation,
  fetch: graphqlFetch,
  QUERIES,
  MUTATIONS,
  QUERIES_EXTENDED,
  MUTATIONS_EXTENDED,
};