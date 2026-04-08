/**
 * Achievement Routes
 */

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { wsEvents, WS_EVENTS } from '../websocket/index.js';

const router = Router();

// ============== ROUTES ==============

// GET /api/achievement - Get all achievements with user progress and pagination
router.get(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [achievements, total] = await Promise.all([
      prisma.achievement.findMany({
        include: {
          userProgress: {
            where: { userId: req.user!.id },
          },
        },
        orderBy: { type: 'asc' },
        skip,
        take: limit,
      }),
      prisma.achievement.count(),
    ]);

    res.json({
      success: true,
      data: {
        achievements: achievements.map(a => ({
          id: a.id,
          name: a.name,
          description: a.description,
          icon: a.icon,
          coin: a.coin,
          target: a.target,
          reward: a.reward,
          type: a.type,
          progress: a.userProgress[0]?.progress || 0,
          completed: a.userProgress[0]?.completed || false,
          completedAt: a.userProgress[0]?.completedAt || null,
          claimedAt: a.userProgress[0]?.claimedAt || null,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  })
);

// GET /api/achievement/user - Get user's achievements
router.get(
  '/user',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.user!.id },
      include: {
        achievement: true,
      },
      orderBy: { completedAt: 'desc' },
    });

    const completed = achievements.filter((a: any) => a.completed).length;
    const inProgress = achievements.filter((a: any) => !a.completed && a.progress > 0).length;

    res.json({
      success: true,
      data: {
        achievements: achievements.map(a => ({
          id: a.achievement.id,
          name: a.achievement.name,
          description: a.achievement.description,
          icon: a.achievement.icon,
          target: a.achievement.target,
          reward: a.achievement.reward,
          progress: a.progress,
          completed: a.completed,
          completedAt: a.completedAt,
          claimedAt: a.claimedAt,
        })),
        stats: {
          total: achievements.length,
          completed,
          inProgress,
        },
      },
    });
  })
);

// POST /api/achievement/:id/claim - Claim achievement reward
router.post(
  '/:id/claim',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const id = req.params.id;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ success: false, error: 'Invalid achievement ID' });
    }

    const userAchievement = await prisma.userAchievement.findFirst({
      where: {
        achievementId: id,
        userId: req.user!.id,
        completed: true,
        claimedAt: null,
      },
    });

    if (!userAchievement) {
      return res.status(400).json({
        success: false,
        error: 'Achievement not completed or already claimed',
      });
    }

    const achievement = await prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      return res.status(404).json({
        success: false,
        error: 'Achievement not found',
      });
    }

    // Add reward to user's wallet (ETH by default)
    const wallet = await prisma.wallet.findFirst({
      where: { userId: req.user!.id, coin: 'ETH' },
    });

    if (wallet) {
      const newBalance = (BigInt(wallet.balance) + BigInt(achievement.reward)).toString();

      await prisma.$transaction([
        prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: newBalance },
        }),
        prisma.userAchievement.update({
          where: { id: userAchievement.id },
          data: { claimedAt: new Date() },
        }),
        prisma.transaction.create({
          data: {
            userId: req.user!.id,
            type: 'achievement_reward',
            coin: 'ETH',
            amount: achievement.reward,
            status: 'confirmed',
            metadata: { achievementId: id, achievementName: achievement.name },
          },
        }),
      ]);
    }

    res.json({
      success: true,
      message: `Claimed ${achievement.reward} ETH reward`,
      data: {
        amount: achievement.reward,
      },
    });

    // Emit WebSocket event for real-time updates
    wsEvents.emit(WS_EVENTS.ACHIEVEMENT_CLAIMED, {
      userId: req.user!.id,
      achievementId: id,
      achievementName: achievement.name,
      reward: achievement.reward,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
