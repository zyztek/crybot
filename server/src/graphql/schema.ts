/**
 * GraphQL Schema
 *
 * Defines types, queries, and mutations for the CryptoFaucet Hub API
 */

import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers } from './resolvers/user.js';
import { walletResolvers } from './resolvers/wallet.js';
import { faucetResolvers } from './resolvers/faucet.js';
import { transactionResolvers } from './resolvers/transaction.js';
import { achievementResolvers } from './resolvers/achievement.js';
import { analyticsResolvers } from './resolvers/analytics.js';
import { leaderboardResolvers } from './resolvers/leaderboard.js';

const typeDefs = `#graphql
  # ============== Scalars ==============
  scalar DateTime
  scalar JSON

  # ============== User Types ==============
  type User {
    id: ID!
    email: String!
    username: String
    walletAddress: String
    referralCode: String!
    referredById: String
    referrerEarnings: String!
    level: Int!
    totalEarned: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    wallets: [Wallet!]!
    transactions: [Transaction!]!
    achievements: [UserAchievement!]!
    referrals: [User!]!
  }

  type Session {
    id: ID!
    token: String!
    refreshToken: String!
    expiresAt: DateTime!
    ipAddress: String
    userAgent: String
    createdAt: DateTime!
  }

  # ============== Wallet Types ==============
  type Wallet {
    id: ID!
    userId: String!
    coin: String!
    address: String
    balance: String!
    isCustodial: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============== Transaction Types ==============
  type Transaction {
    id: ID!
    userId: String!
    type: String!
    coin: String!
    amount: String!
    fee: String!
    txHash: String
    fromAddress: String
    toAddress: String
    status: String!
    confirmations: Int!
    metadata: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ============== Faucet Types ==============
  type Faucet {
    id: ID!
    name: String!
    coin: String!
    network: String!
    faucetUrl: String
    apiEndpoint: String
    amountMin: String!
    amountMax: String!
    intervalHours: Int!
    isActive: Boolean!
    requiresApiKey: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    claims: [FaucetClaim!]!
  }

  type FaucetClaim {
    id: ID!
    userId: String!
    faucetId: String
    coin: String!
    amount: String!
    ipAddress: String!
    txHash: String
    status: String!
    claimedAt: DateTime!
  }

  # ============== Achievement Types ==============
  type Achievement {
    id: ID!
    name: String!
    description: String!
    icon: String!
    coin: String
    target: Int!
    reward: String!
    type: String!
    createdAt: DateTime!
  }

  type UserAchievement {
    id: ID!
    userId: String!
    achievementId: String!
    achievement: Achievement
    progress: Int!
    completed: Boolean!
    completedAt: DateTime
    claimedAt: DateTime
  }

  # ============== Analytics Types ==============
  type DailyStats {
    id: ID!
    date: DateTime!
    totalClaims: Int!
    totalVolume: String!
    newUsers: Int!
    activeUsers: Int!
    feesEarned: String!
    createdAt: DateTime!
  }

  type AnalyticsSummary {
    totalUsers: Int!
    totalClaims: Int!
    totalVolume: String!
    activeUsers24h: Int!
    topCoins: [CoinStats!]!
  }

  type CoinStats {
    coin: String!
    claims: Int!
    volume: String!
  }

  # ============== Leaderboard Types ==============
  type LeaderboardEntry {
    id: ID!
    userId: String!
    username: String!
    score: String!
    rank: Int!
    period: String!
    updatedAt: DateTime!
  }

  # ============== Auth Types ==============
  type AuthPayload {
    token: String!
    refreshToken: String!
    user: User!
  }

  # ============== Input Types ==============
  input RegisterInput {
    email: String!
    password: String!
    username: String
    referralCode: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    walletAddress: String
  }

  input CreateWalletInput {
    coin: String!
    address: String
    isCustodial: Boolean
  }

  input ClaimFaucetInput {
    faucetId: String!
    coin: String!
    network: String!
    address: String!
  }

  # ============== Queries ==============
  type Query {
    # User queries
    me: User
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!

    # Wallet queries
    wallet(id: ID!): Wallet
    wallets(coin: String): [Wallet!]!

    # Transaction queries
    transaction(id: ID!): Transaction
    transactions(coin: String, type: String, limit: Int, offset: Int): [Transaction!]!
    myTransactions(limit: Int, offset: Int): [Transaction!]!

    # Faucet queries
    faucet(id: ID!): Faucet
    faucets(coin: String, network: String, activeOnly: Boolean): [Faucet!]!
    faucetClaim(id: ID!): FaucetClaim
    myFaucetClaims(limit: Int, offset: Int): [FaucetClaim!]!

    # Achievement queries
    achievement(id: ID!): Achievement
    achievements(coin: String): [Achievement!]!
    myAchievements: [UserAchievement!]!

    # Analytics queries
    dailyStats(date: DateTime): [DailyStats!]!
    analyticsSummary: AnalyticsSummary!

    # Leaderboard queries
    leaderboard(period: String!, limit: Int): [LeaderboardEntry!]!
  }

  # ============== Mutations ==============
  type Mutation {
    # Auth mutations
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
    refreshToken(refreshToken: String!): AuthPayload!

    # User mutations
    updateUser(input: UpdateUserInput!): User!

    # Wallet mutations
    createWallet(input: CreateWalletInput!): Wallet!
    deleteWallet(id: ID!): Boolean!

    # Faucet mutations
    claimFaucet(input: ClaimFaucetInput!): FaucetClaim!

    # Achievement mutations
    claimAchievement(id: ID!): UserAchievement!
  }
`;

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...walletResolvers.Query,
    ...faucetResolvers.Query,
    ...transactionResolvers.Query,
    ...achievementResolvers.Query,
    ...analyticsResolvers.Query,
    ...leaderboardResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...walletResolvers.Mutation,
    ...faucetResolvers.Mutation,
    ...achievementResolvers.Mutation,
  },
  User: {
    wallets: async (parent: { id: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.wallet.findMany({ where: { userId: parent.id } });
    },
    transactions: async (parent: { id: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.transaction.findMany({ where: { userId: parent.id }, take: 50 });
    },
    achievements: async (parent: { id: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.userAchievement.findMany({ where: { userId: parent.id } });
    },
    referrals: async (parent: { id: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.user.findMany({ where: { referredById: parent.id } });
    },
  },
  Faucet: {
    claims: async (parent: { id: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.faucetClaim.findMany({ where: { faucetId: parent.id }, take: 50 });
    },
  },
  UserAchievement: {
    achievement: async (parent: { achievementId: string }) => {
      const { prisma } = await import('../lib/prisma.js');
      return prisma.achievement.findUnique({ where: { id: parent.achievementId } });
    },
  },
  DateTime: {
    __parseValue(value: string) {
      return new Date(value);
    },
    __serialize(value: Date) {
      return value.toISOString();
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;