/**
 * Analytics Routes
 */

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { sumStringAmounts, groupAndSumByCoin } from '../utils/index.js';

const router = Router();

// ============== ROUTES ==============

// GET /api/analytics/overview - Get overall analytics (admin)
router.get(
  '/overview',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      activeUsersLast30Days,
      activeUsersLast7Days,
      totalClaims,
      claimTransactions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { updatedAt: { gte: thirtyDaysAgo } },
      }),
      prisma.user.count({
        where: { updatedAt: { gte: sevenDaysAgo } },
      }),
      prisma.faucetClaim.count(),
      prisma.transaction.findMany({
        where: { type: 'claim' },
        select: { amount: true },
      }),
    ]);

    // Calculate total volume using helper function
    const totalVolume = sumStringAmounts(claimTransactions);

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsersLast30Days,
        activeUsersLast7Days,
        totalClaims,
        totalVolume,
      },
    });
  })
);

// GET /api/analytics/daily - Get daily statistics
router.get(
  '/daily',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const days = parseInt(req.query.days as string) || 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const dailyStats = await prisma.dailyStats.findMany({
      where: { date: { gte: startDate } },
      orderBy: { date: 'desc' },
    });

    res.json({
      success: true,
      data: dailyStats,
    });
  })
);

// GET /api/analytics/user - Get user's personal analytics
router.get(
  '/user',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalClaims, earnedTransactions, claimHistory, achievementProgress] = await Promise.all([
      prisma.faucetClaim.count({ where: { userId: req.user!.id } }),
      prisma.transaction.findMany({
        where: {
          userId: req.user!.id,
          type: { in: ['claim', 'referral_bonus', 'achievement_reward'] },
        },
        select: { amount: true },
      }),
      prisma.faucetClaim.findMany({
        where: { userId: req.user!.id },
        select: { coin: true, amount: true },
      }),
      prisma.userAchievement.findMany({
        where: { userId: req.user!.id },
        include: { achievement: true },
      }),
    ]);

    // Calculate totals using helper functions
    const totalEarned = sumStringAmounts(earnedTransactions);
    const byCoinStats = groupAndSumByCoin(claimHistory);
    const byCoin = Object.entries(byCoinStats).map(([coin, data]) => ({
      coin,
      count: data.count,
      total: data.total,
    }));

    const completedAchievements = achievementProgress.filter(a => a.completed).length;

    res.json({
      success: true,
      data: {
        totalClaims,
        totalEarned,
        byCoin,
        achievements: {
          completed: completedAchievements,
          total: achievementProgress.length,
          inProgress: achievementProgress.length - completedAchievements,
        },
      },
    });
  })
);

export default router;
