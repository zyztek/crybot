/**
 * Analytics GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

interface TransactionSelect {
  amount: string;
}

export const analyticsResolvers = {
  Query: {
    dailyStats: async (_: unknown, { date }: { date?: string }) => {
      if (date) {
        const targetDate = new Date(date);
        return prisma.dailyStats.findMany({
          where: {
            date: {
              gte: new Date(targetDate.setHours(0, 0, 0, 0)),
              lt: new Date(targetDate.setHours(23, 59, 59, 999)),
            },
          },
        });
      }

      // Return last 30 days by default
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      return prisma.dailyStats.findMany({
        where: {
          date: { gte: thirtyDaysAgo },
        },
        orderBy: { date: 'desc' },
      });
    },
    analyticsSummary: async () => {
      const totalUsers = await prisma.user.count();
      const totalClaims = await prisma.faucetClaim.count();
      
      // Get total volume from transactions
      const transactions = await prisma.transaction.findMany({
        where: { status: 'confirmed' },
        select: { amount: true },
      });
      const totalVolume = transactions.reduce((sum: bigint, t: TransactionSelect) => {
        return sum + BigInt(t.amount || '0');
      }, BigInt(0)).toString();

      // Active users in last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const activeUsers24h = await prisma.user.count({
        where: {
          updatedAt: { gte: yesterday },
        },
      });

      // Top coins by volume - use raw query to avoid type issues
      const coinStatsRaw = await prisma.$queryRaw<Array<{ coin: string; claims: bigint; volume: string }>>`
        SELECT coin, COUNT(*) as claims, COALESCE(SUM(CAST(amount AS DECIMAL)), 0) as volume
        FROM transactions
        WHERE status = 'confirmed'
        GROUP BY coin
        ORDER BY volume DESC
        LIMIT 10
      `;

      const topCoins = coinStatsRaw.map((stat: { coin: string; claims: bigint; volume: string }) => ({
        coin: stat.coin,
        claims: Number(stat.claims),
        volume: stat.volume || '0',
      }));

      return {
        totalUsers,
        totalClaims,
        totalVolume,
        activeUsers24h,
        topCoins,
      };
    },
  },
};

export default analyticsResolvers;