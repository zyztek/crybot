/**
 * Wallet Routes
 */

import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ============== VALIDATION SCHEMAS ==============

const updateBalanceSchema = z.object({
  coin: z.string().min(1),
  amount: z.string(),
});

// ============== ROUTES ==============

// GET /api/wallet - Get all user wallets with pagination
router.get(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [wallets, total] = await Promise.all([
      prisma.wallet.findMany({
        where: { userId: req.user!.id },
        orderBy: { coin: 'asc' },
        skip,
        take: limit,
      }),
      prisma.wallet.count({ where: { userId: req.user!.id } }),
    ]);

    res.json({
      success: true,
      data: {
        wallets,
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

// GET /api/wallet/:coin - Get specific wallet
router.get(
  '/:coin',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const coinParam = req.params.coin;
    if (!coinParam || Array.isArray(coinParam)) {
      return res.status(400).json({ success: false, error: 'Coin parameter is required' });
    }
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId_coin: {
          userId: req.user!.id,
          coin: coinParam.toUpperCase(),
        },
      },
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found',
      });
    }

    return res.json({
      success: true,
      data: wallet,
    });
  })
);

// POST /api/wallet/deposit - Generate deposit address
router.post(
  '/deposit',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const coinBody = req.body?.coin;

    if (!coinBody || typeof coinBody !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Coin is required',
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId_coin: {
          userId: req.user!.id,
          coin: coinBody.toUpperCase(),
        },
      },
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found',
      });
    }

    // In production, you would generate a real deposit address here
    // For now, return a mock address
    const depositAddress = `${coinBody.toUpperCase()}_deposit_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Update wallet with address
    const updatedWallet = await prisma.wallet.update({
      where: { id: wallet.id },
      data: { address: depositAddress },
    });

    return res.json({
      success: true,
      data: {
        coin: updatedWallet.coin,
        address: depositAddress,
        isCustodial: updatedWallet.isCustodial,
      },
    });
  })
);

// POST /api/wallet/withdraw - Request withdrawal
router.post(
  '/withdraw',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const coinBody = req.body?.coin;
    const amount = req.body?.amount;
    const toAddress = req.body?.toAddress;

    if (!coinBody || !amount || !toAddress) {
      return res.status(400).json({
        success: false,
        error: 'Coin, amount, and toAddress are required',
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId_coin: {
          userId: req.user!.id,
          coin: coinBody.toUpperCase(),
        },
      },
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found',
      });
    }

    const amountBigInt = BigInt(amount);
    const balanceBigInt = BigInt(wallet.balance);

    if (amountBigInt > balanceBigInt) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient balance',
      });
    }

    // Create withdrawal transaction
    const tx = await prisma.transaction.create({
      data: {
        userId: req.user!.id,
        type: 'withdrawal',
        coin: coinBody.toUpperCase(),
        amount: String(amount),
        toAddress,
        status: 'pending',
      },
    });

    // Deduct from balance
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: (balanceBigInt - amountBigInt).toString(),
      },
    });

    res.json({
      success: true,
      data: {
        id: tx.id,
        coin: tx.coin,
        amount: tx.amount,
        status: tx.status,
        createdAt: tx.createdAt,
      },
    });
  })
);

export default router;
