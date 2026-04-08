/**
 * Faucet Routes
 */

import { Router } from 'express';
import { ethers } from 'ethers';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import faucetService from '../services/faucetService.js';
import { wsEvents, WS_EVENTS } from '../websocket/index.js';

const router = Router();

// ============== VALIDATION SCHEMAS ==============

const claimSchema = z.object({
  coin: z.string().min(1),
  network: z.string().optional().default('testnet'),
});

// ============== HELPERS ==============

const getFaucetAmount = (coin: string): string => {
  const amounts: Record<string, { min: string; max: string }> = {
    BTC: { min: '1000', max: '5000' },
    ETH: { min: '10000000000000000', max: '50000000000000000' }, // 0.01-0.05 ETH in wei
    DOGE: { min: '100', max: '500' },
    SOL: { min: '1000000', max: '5000000' }, // 0.001-0.005 SOL in lamports
    LTC: { min: '1000', max: '5000' },
    BNB: { min: '10000000000000000', max: '50000000000000000' },
  };

  const range = amounts[coin] || { min: '1000', max: '5000' };
  const amount = Math.floor(
    Math.random() * (parseInt(range.max) - parseInt(range.min)) + parseInt(range.min)
  ).toString();

  return amount;
};

// ============== ROUTES ==============

// GET /api/faucet - Get all available faucets
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const faucets = await prisma.faucet.findMany({
      where: { isActive: true },
      orderBy: { coin: 'asc' },
    });

    res.json({
      success: true,
      data: faucets,
    });
  })
);

// GET /api/faucet/:coin - Get specific faucet
router.get(
  '/:coin',
  asyncHandler(async (req, res) => {
    const coinParam = req.params.coin;
    if (!coinParam || Array.isArray(coinParam)) {
      return res.status(400).json({ success: false, error: 'Invalid coin parameter' });
    }
    const network = (req.query.network as string) || 'testnet';

    const faucet = await prisma.faucet.findUnique({
      where: {
        coin_network: {
          coin: coinParam.toUpperCase(),
          network,
        },
      },
    });

    if (!faucet || !faucet.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Faucet not available',
      });
    }

    return res.json({
      success: true,
      data: faucet,
    });
  })
);

// POST /api/faucet/claim - Claim faucet
router.post(
  '/claim',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const data = claimSchema.parse(req.body);
    const coin = data.coin.toUpperCase();
    const network = data.network;
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';

    // Find faucet
    const faucet = await prisma.faucet.findUnique({
      where: {
        coin_network: {
          coin,
          network,
        },
      },
    });

    if (!faucet || !faucet.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Faucet not available',
      });
    }

    // Check if user recently claimed this coin
    const lastClaim = await prisma.faucetClaim.findFirst({
      where: {
        userId: req.user!.id,
        coin,
        claimedAt: {
          gte: new Date(Date.now() - faucet.intervalHours * 60 * 60 * 1000),
        },
      },
      orderBy: { claimedAt: 'desc' },
    });

    if (lastClaim) {
      const nextClaimTime = new Date(
        lastClaim.claimedAt.getTime() + faucet.intervalHours * 60 * 60 * 1000
      );
      const hoursRemaining = Math.ceil((nextClaimTime.getTime() - Date.now()) / (1000 * 60 * 60));

      return res.status(429).json({
        success: false,
        error: `You can claim again in ${hoursRemaining} hours`,
        code: 'CLAIM_TOO_SOON',
        nextClaimAt: nextClaimTime.toISOString(),
      });
    }

    // Check IP-based rate limit
    const recentIpClaim = await prisma.faucetClaim.findFirst({
      where: {
        ipAddress,
        coin,
        claimedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours
        },
      },
    });

    if (recentIpClaim) {
      return res.status(429).json({
        success: false,
        error: 'IP address already claimed today',
        code: 'IP_LIMIT_REACHED',
      });
    }

    // Calculate claim amount
    const amount = getFaucetAmount(coin);

    // For ETH claims, use real blockchain service
    let txHash: string | null = null;
    let claimStatus: 'confirmed' | 'pending' = 'confirmed';
    let explorerUrl: string | null = null;

    if (coin === 'ETH' && network) {
      const faucet = faucetService.getFaucet(network as 'sepolia' | 'goerli' | 'holesky');

      if (faucet.isConfigured()) {
        // Get user's wallet address
        const user = await prisma.user.findUnique({
          where: { id: req.user!.id },
        });

        if (user?.walletAddress && ethers.isAddress(user.walletAddress)) {
          // Convert wei to ETH for display
          const amountEth = ethers.formatEther(BigInt(amount));

          // Send real transaction
          const result = await faucet.sendEth(user.walletAddress, amountEth);

          if (result.success && result.txHash) {
            txHash = result.txHash;
            explorerUrl = result.explorerUrl || null;
            console.log(`Real ETH faucet claim: ${result.txHash} to ${user.walletAddress}`);
          } else {
            // If blockchain transaction fails, fall back to mock
            console.error(`ETH faucet claim failed: ${result.error}`);
            txHash = `fallback_${Date.now()}`;
          }
        } else {
          // No wallet address, use mock tx
          console.log('User has no wallet address, using mock transaction');
          txHash = `mock_${Date.now()}`;
        }
      } else {
        // Faucet not configured, use mock tx
        console.log('Ethereum faucet not configured, using mock transaction');
        txHash = `mock_${Date.now()}`;
      }
    } else {
      // Non-ETH coins use mock transactions
      txHash = `mock_${Date.now()}`;
    }

    // Create claim record
    const claim = await prisma.faucetClaim.create({
      data: {
        userId: req.user!.id,
        faucetId: faucet.id,
        coin,
        amount,
        ipAddress,
        status: claimStatus,
        txHash: txHash,
      },
    });

    // Update user wallet balance
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId_coin: {
          userId: req.user!.id,
          coin,
        },
      },
    });

    if (wallet) {
      const newBalance = (BigInt(wallet.balance) + BigInt(amount)).toString();

      await prisma.$transaction([
        prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: newBalance },
        }),
        prisma.transaction.create({
          data: {
            userId: req.user!.id,
            type: 'claim',
            coin,
            amount,
            txHash: txHash,
            status: 'confirmed',
          },
        }),
      ]);
    }

    res.json({
      success: true,
      data: {
        id: claim.id,
        coin,
        amount,
        status: claimStatus,
        txHash,
        explorerUrl,
        claimedAt: claim.claimedAt,
      },
      message: `Successfully claimed ${amount} ${coin}`,
    });

    // Emit WebSocket event for real-time updates
    wsEvents.emit(WS_EVENTS.FAUCET_CLAIMED, {
      userId: req.user!.id,
      coin,
      amount,
      txHash,
      status: claimStatus,
      timestamp: claim.claimedAt,
    });
  })
);

// GET /api/faucet/history - Get user's claim history
router.get(
  '/history',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [claims, total] = await Promise.all([
      prisma.faucetClaim.findMany({
        where: { userId: req.user!.id },
        include: {
          faucet: true,
        },
        orderBy: { claimedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.faucetClaim.count({
        where: { userId: req.user!.id },
      }),
    ]);

    res.json({
      success: true,
      data: {
        claims: claims.map((c: any) => ({
          id: c.id,
          coin: c.coin,
          amount: c.amount,
          status: c.status,
          txHash: c.txHash,
          claimedAt: c.claimedAt,
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

// GET /api/faucet/status/:coin - Check if user can claim
router.get(
  '/status/:coin',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const coinParam = req.params.coin;
    if (!coinParam || Array.isArray(coinParam)) {
      return res.status(400).json({ success: false, error: 'Invalid coin parameter' });
    }
    const faucet = await prisma.faucet.findUnique({
      where: {
        coin_network: {
          coin: coinParam.toUpperCase(),
          network: 'testnet',
        },
      },
    });

    if (!faucet) {
      return res.status(404).json({
        success: false,
        error: 'Faucet not found',
      });
    }

    const lastClaim = await prisma.faucetClaim.findFirst({
      where: {
        userId: req.user!.id,
        coin: coinParam.toUpperCase(),
      },
      orderBy: { claimedAt: 'desc' },
    });

    const canClaim =
      !lastClaim ||
      new Date(lastClaim.claimedAt.getTime() + faucet.intervalHours * 60 * 60 * 1000) <= new Date();

    const nextClaimAt = lastClaim
      ? new Date(lastClaim.claimedAt.getTime() + faucet.intervalHours * 60 * 60 * 1000)
      : null;

    res.json({
      success: true,
      data: {
        canClaim,
        nextClaimAt: canClaim ? null : nextClaimAt?.toISOString(),
        intervalHours: faucet.intervalHours,
        lastClaimAmount: lastClaim?.amount || null,
        lastClaimAt: lastClaim?.claimedAt || null,
      },
    });
  })
);

export default router;
