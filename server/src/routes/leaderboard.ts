/**
 * Leaderboard Routes
 */

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ============== ROUTES ==============

// GET /api/leaderboard - Get leaderboard
router.get('/', optionalAuth, asyncHandler(async (req: AuthRequest, res) => {
  const period = req.query.period as string || 'all_time';
  const limit = parseInt(req.query.limit as string) || 50;

  const leaderboard = await prisma.leaderboard.findMany({
    where: { period },
    orderBy: { rank: 'asc' },
    take: limit,
  });

  // If user is authenticated, include their rank
  let userRank = null;
  if (req.user) {
    const userEntry = await prisma.leaderboard.findFirst({
      where: { userId: req.user.id, period },
    });
    if (userEntry) {
      userRank = userEntry;
    }
  }

  res.json({
    success: true,
    data: {
      entries: leaderboard,
      userRank,
    },
  });
}));

// GET /api/leaderboard/me - Get user's rank
router.get('/me', asyncHandler(async (req: AuthRequest, res) => {
  const periods = ['daily', 'weekly', 'monthly', 'all_time'];
  
  const userRanks = await Promise.all(
    periods.map(async (period) => {
      const entry = await prisma.leaderboard.findFirst({
        where: { userId: req.user!.id, period },
      });
      return {
        period,
        rank: entry?.rank || null,
        score: entry?.score || '0',
      };
    })
  );

  res.json({
    success: true,
    data: userRanks,
  });
}));

export default router;