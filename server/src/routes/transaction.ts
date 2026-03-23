/**
 * Transaction Routes
 */

import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { sumStringAmounts } from '../utils/index.js';

const router = Router();

// ============== ROUTES ==============

// GET /api/transaction - Get user transactions
router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const type = req.query.type as string;
  const coinRaw = req.query.coin;
  // Cast to string to satisfy Prisma's StringFilter type
  const coinStr = (typeof coinRaw === 'string' ? coinRaw : undefined) as string | undefined;
  const skip = (page - 1) * limit;
  const userIdFilter = req.user!.id;
  
  // Build where clause - cast to any to satisfy Prisma's StringFilter type
  const where: any = { userId: userIdFilter };
  if (type) where.type = type;
  if (coinStr) where.coin = coinStr;
  const countWhere = where;
  
  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.transaction.count({ where: countWhere }),
  ]);

  res.json({
    success: true,
    data: {
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
}));

// GET /api/transaction/:id - Get specific transaction
router.get('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const idParam = req.params.id;
  const id = typeof idParam === 'string' ? idParam : idParam[0];
  
  const transaction = await prisma.transaction.findFirst({
    where: { id, userId: req.user!.id },
  });

  if (!transaction) {
    return res.status(404).json({
      success: false,
      error: 'Transaction not found',
    });
  }

  res.json({
    success: true,
    data: transaction,
  });
}));

// GET /api/transaction/stats - Get transaction statistics
router.get('/stats', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Get transactions for each type and calculate stats manually (since amount is String)
  const userId = req.user!.id;
  const [claims, deposits, withdrawals, referrals] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId, type: 'claim' as const, createdAt: { gte: thirtyDaysAgo } },
      select: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId, type: 'deposit' as const, createdAt: { gte: thirtyDaysAgo } },
      select: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId, type: 'withdrawal' as const, createdAt: { gte: thirtyDaysAgo } },
      select: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId, type: 'referral_bonus' as const, createdAt: { gte: thirtyDaysAgo } },
      select: { amount: true },
    }),
  ]);

  res.json({
    success: true,
    data: {
      claims: { count: claims.length, total: sumStringAmounts(claims) },
      deposits: { count: deposits.length, total: sumStringAmounts(deposits) },
      withdrawals: { count: withdrawals.length, total: sumStringAmounts(withdrawals) },
      referrals: { count: referrals.length, total: sumStringAmounts(referrals) },
    },
  });
}));

export default router;