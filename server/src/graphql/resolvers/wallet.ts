/**
 * Wallet GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

interface Context {
  userId?: string;
}

export const walletResolvers = {
  Query: {
    wallet: async (_: unknown, { id }: { id: string }) => {
      return prisma.wallet.findUnique({
        where: { id },
      });
    },
    wallets: async (_: unknown, { coin }: { coin?: string }, context: Context) => {
      const where = context.userId ? { userId: context.userId } : {};
      if (coin) {
        Object.assign(where, { coin });
      }
      return prisma.wallet.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  Mutation: {
    createWallet: async (_: unknown, { input }: { input: { coin: string; address?: string; isCustodial?: boolean } }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const { coin, address, isCustodial = false } = input;

      const existingWallet = await prisma.wallet.findUnique({
        where: {
          userId_coin: {
            userId: context.userId,
            coin,
          },
        },
      });

      if (existingWallet) {
        throw new Error('Wallet already exists for this coin');
      }

      return prisma.wallet.create({
        data: {
          userId: context.userId,
          coin,
          address,
          isCustodial,
        },
      });
    },
    deleteWallet: async (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const wallet = await prisma.wallet.findUnique({
        where: { id },
      });

      if (!wallet || wallet.userId !== context.userId) {
        throw new Error('Wallet not found');
      }

      await prisma.wallet.delete({
        where: { id },
      });

      return true;
    },
  },
};

export default walletResolvers;