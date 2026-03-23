/**
 * User Routes
 */

import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ============== VALIDATION SCHEMAS ==============

const updateProfileSchema = z.object({
  username: z.string().min(3).optional(),
  walletAddress: z.string().optional(),
});

// ============== ROUTES ==============

// GET /api/user/profile - Get user profile
router.get('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      wallets: true,
      referrals: {
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }

  return res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      walletAddress: user.walletAddress,
      referralCode: user.referralCode,
      referrerEarnings: user.referrerEarnings,
      referralCount: user.referrals.length,
      level: user.level,
      totalEarned: user.totalEarned,
      createdAt: user.createdAt,
      wallets: user.wallets,
    },
  });
}));

// PUT /api/user/profile - Update user profile
router.put('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const data = updateProfileSchema.parse(req.body);

  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      ...(data.username && { username: data.username }),
      ...(data.walletAddress && { walletAddress: data.walletAddress }),
    },
    include: {
      wallets: true,
    },
  });

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      walletAddress: user.walletAddress,
    },
  });
}));

// GET /api/user/referrals - Get user's referrals
router.get('/referrals', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      referrals: {
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          totalEarned: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  res.json({
    success: true,
    data: {
      referrals: user?.referrals || [],
      totalReferrals: user?.referrals.length || 0,
      totalEarnings: user?.referrerEarnings || '0',
    },
  });
}));

// POST /api/user/claim-referral - Claim referral bonus
router.post('/claim-referral', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
  });

  if (!user || user.referrerEarnings === '0') {
    return res.status(400).json({
      success: false,
      error: 'No referral earnings to claim',
    });
  }

  // Transfer earnings to user's ETH wallet
  const wallet = await prisma.wallet.findFirst({
    where: { userId: user.id, coin: 'ETH' },
  });

  if (!wallet) {
    return res.status(400).json({
      success: false,
      error: 'Wallet not found',
    });
  }

  const earnings = user.referrerEarnings;
  const newBalance = (BigInt(wallet.balance) + BigInt(earnings)).toString();

  await prisma.$transaction([
    prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: newBalance },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { referrerEarnings: '0' },
    }),
    prisma.transaction.create({
      data: {
        userId: user.id,
        type: 'referral_bonus',
        coin: 'ETH',
        amount: earnings,
        status: 'confirmed',
      },
    }),
  ]);

  return res.json({
    success: true,
    message: `Claimed ${earnings} ETH from referrals`,
    data: {
      amount: earnings,
      newBalance,
    },
  });
}));

export default router;