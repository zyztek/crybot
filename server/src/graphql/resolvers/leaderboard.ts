/**
 * Leaderboard GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

export const leaderboardResolvers = {
  Query: {
    leaderboard: async (_: unknown, { period = 'all_time', limit = 100 }: { period?: string; limit?: number }) => {
      return prisma.leaderboard.findMany({
        where: { period },
        orderBy: { rank: 'asc' },
        take: limit,
      });
    },
  },
};

export default leaderboardResolvers;