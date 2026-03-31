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

export default {
  query: graphqlQuery,
  mutation: graphqlMutation,
  fetch: graphqlFetch,
  QUERIES,
  MUTATIONS,
};