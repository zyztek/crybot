/**
 * Transaction GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

interface Context {
  userId?: string;
}

export const transactionResolvers = {
  Query: {
    transaction: async (_: unknown, { id }: { id: string }) => {
      return prisma.transaction.findUnique({
        where: { id },
      });
    },
    transactions: async (_: unknown, { coin, type, limit = 50, offset = 0 }: { coin?: string; type?: string; limit?: number; offset?: number }) => {
      const where: Record<string, unknown> = {};
      if (coin) where.coin = coin;
      if (type) where.type = type;

      return prisma.transaction.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      });
    },
    myTransactions: async (_: unknown, { limit = 50, offset = 0 }: { limit?: number; offset?: number }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return prisma.transaction.findMany({
        where: { userId: context.userId },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      });
    },
  },
};

export default transactionResolvers;