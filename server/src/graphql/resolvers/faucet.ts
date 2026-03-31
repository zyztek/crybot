/**
 * Faucet GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

interface Context {
  userId?: string;
}

export const faucetResolvers = {
  Query: {
    faucet: async (_: unknown, { id }: { id: string }) => {
      return prisma.faucet.findUnique({
        where: { id },
      });
    },
    faucets: async (_: unknown, { coin, network, activeOnly = true }: { coin?: string; network?: string; activeOnly?: boolean }) => {
      const where: Record<string, unknown> = {};
      if (coin) where.coin = coin;
      if (network) where.network = network;
      if (activeOnly) where.isActive = true;

      return prisma.faucet.findMany({
        where,
        orderBy: { name: 'asc' },
      });
    },
    faucetClaim: async (_: unknown, { id }: { id: string }) => {
      return prisma.faucetClaim.findUnique({
        where: { id },
      });
    },
    myFaucetClaims: async (_: unknown, { limit = 50, offset = 0 }: { limit?: number; offset?: number }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return prisma.faucetClaim.findMany({
        where: { userId: context.userId },
        take: limit,
        skip: offset,
        orderBy: { claimedAt: 'desc' },
      });
    },
  },
  Mutation: {
    claimFaucet: async (_: unknown, { input }: { input: { faucetId?: string; coin: string; network: string; address: string } }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const { faucetId, coin, network, address } = input;

      // Check for recent claims
      const recentClaim = await prisma.faucetClaim.findFirst({
        where: {
          userId: context.userId,
          coin,
          claimedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { claimedAt: 'desc' },
      });

      if (recentClaim) {
        throw new Error('You have already claimed in the last 24 hours');
      }

      // Get faucet details for amount
      let faucet = null;
      if (faucetId) {
        faucet = await prisma.faucet.findUnique({ where: { id: faucetId } });
      } else {
        faucet = await prisma.faucet.findUnique({
          where: { coin_network: { coin, network } },
        });
      }

      if (!faucet) {
        throw new Error('Faucet not found');
      }

      // Calculate random amount between min and max
      const min = BigInt(faucet.amountMin);
      const max = BigInt(faucet.amountMax);
      const amount = (BigInt(Math.floor(Math.random() * Number(max - min))) + min).toString();

      // Create claim
      const claim = await prisma.faucetClaim.create({
        data: {
          userId: context.userId,
          faucetId: faucet.id,
          coin,
          amount,
          ipAddress: '0.0.0.0', // Would be from request in real implementation
          status: 'pending',
        },
      });

      // Update user total earned
      await prisma.user.update({
        where: { id: context.userId },
        data: {
          totalEarned: (BigInt(faucet.amountMin) + BigInt(faucet.amountMax)).toString(),
        },
      });

      return claim;
    },
  },
};

export default faucetResolvers;