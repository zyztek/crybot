/**
 * Achievement GraphQL Resolvers
 */

import { prisma } from '../../lib/prisma.js';

interface Context {
  userId?: string;
}

export const achievementResolvers = {
  Query: {
    achievement: async (_: unknown, { id }: { id: string }) => {
      return prisma.achievement.findUnique({
        where: { id },
      });
    },
    achievements: async (_: unknown, { coin }: { coin?: string }) => {
      const where = coin ? { coin } : {};
      return prisma.achievement.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    },
    myAchievements: async (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return prisma.userAchievement.findMany({
        where: { userId: context.userId },
        include: { achievement: true },
      });
    },
  },
  Mutation: {
    claimAchievement: async (_: unknown, { id }: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      const userAchievement = await prisma.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId: context.userId,
            achievementId: id,
          },
        },
      });

      if (!userAchievement) {
        throw new Error('Achievement not found');
      }

      if (!userAchievement.completed) {
        throw new Error('Achievement not completed');
      }

      if (userAchievement.claimedAt) {
        throw new Error('Achievement already claimed');
      }

      return prisma.userAchievement.update({
        where: { id: userAchievement.id },
        data: { claimedAt: new Date() },
        include: { achievement: true },
      });
    },
  },
};

export default achievementResolvers;