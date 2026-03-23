/**
 * Authentication Routes
 */

import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { jwtConfig } from '../config/index.js';

const router = Router();

// ============== VALIDATION SCHEMAS ==============

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  referralCode: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// ============== HELPERS ==============

const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const generateTokens = (userId: string, sessionId: string) => {
  const accessToken = jwt.sign(
    { userId, sessionId },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
  );
  
  const refreshToken = jwt.sign(
    { userId, sessionId, type: 'refresh' },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshExpiresIn } as jwt.SignOptions
  );
  
  return { accessToken, refreshToken };
};

// ============== ROUTES ==============

// POST /api/auth/register - Register new user
router.post('/register', asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  
  // Check if email exists
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  
  if (existingEmail) {
    return res.status(409).json({
      success: false,
      error: 'Email already registered',
      code: 'EMAIL_EXISTS',
    });
  }
  
  // Check username if provided
  if (data.username) {
    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username },
    });
    
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        error: 'Username already taken',
        code: 'USERNAME_EXISTS',
      });
    }
  }
  
  // Handle referral
  let referredById: string | null = null;
  if (data.referralCode) {
    const referrer = await prisma.user.findUnique({
      where: { referralCode: data.referralCode },
    });
    
    if (referrer) {
      referredById = referrer.id;
    }
  }
  
  // Hash password
  const passwordHash = await bcrypt.hash(data.password, 12);
  
  // Create user with default wallets
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      username: data.username,
      referralCode: generateReferralCode(),
      referredById,
      wallets: {
        create: [
          { coin: 'BTC', balance: '0', isCustodial: true },
          { coin: 'ETH', balance: '0', isCustodial: true },
          { coin: 'DOGE', balance: '0', isCustodial: true },
          { coin: 'SOL', balance: '0', isCustodial: true },
          { coin: 'LTC', balance: '0', isCustodial: true },
          { coin: 'BNB', balance: '0', isCustodial: true },
        ],
      },
    },
    include: {
      wallets: true,
    },
  });
  
  // Create session
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      token: uuidv4(),
      refreshToken: uuidv4(),
      expiresAt,
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    },
  });
  
  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id, sessionId);
  
  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        referralCode: user.referralCode,
        level: user.level,
        totalEarned: user.totalEarned,
        createdAt: user.createdAt,
      },
      wallets: user.wallets.map(w => ({
        coin: w.coin,
        balance: w.balance,
      })),
      accessToken,
      refreshToken,
    },
  });
}));

// POST /api/auth/login - Login user
router.post('/login', asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: {
      wallets: true,
    },
  });
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS',
    });
  }
  
  // Verify password
  const isValid = await bcrypt.compare(data.password, user.passwordHash);
  
  if (!isValid) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS',
    });
  }
  
  // Create session
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      token: uuidv4(),
      refreshToken: uuidv4(),
      expiresAt,
      ipAddress: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    },
  });
  
  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id, sessionId);
  
  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        referralCode: user.referralCode,
        level: user.level,
        totalEarned: user.totalEarned,
        createdAt: user.createdAt,
      },
      wallets: user.wallets.map(w => ({
        coin: w.coin,
        balance: w.balance,
      })),
      accessToken,
      refreshToken,
    },
  });
}));

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      error: 'Refresh token is required',
      code: 'MISSING_REFRESH_TOKEN',
    });
  }
  
  // Verify refresh token
  const payload = jwt.verify(
    refreshToken,
    jwtConfig.secret
  ) as { userId: string; sessionId: string; type: string };
  
  if (payload.type !== 'refresh') {
    return res.status(401).json({
      success: false,
      error: 'Invalid refresh token',
      code: 'INVALID_REFRESH_TOKEN',
    });
  }
  
  // Check if session exists
  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });
  
  if (!session || session.refreshToken !== refreshToken || session.expiresAt < new Date()) {
    return res.status(401).json({
      success: false,
      error: 'Session expired',
      code: 'SESSION_EXPIRED',
    });
  }
  
  // Generate new tokens
  const tokens = generateTokens(payload.userId, payload.sessionId);
  
  res.json({
    success: true,
    data: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    },
  });
}));

// POST /api/auth/logout - Logout user
router.post('/logout', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  if (req.sessionId) {
    await prisma.session.delete({
      where: { id: req.sessionId },
    });
  }
  
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
}));

// GET /api/auth/me - Get current user
router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: {
      wallets: true,
      achievements: {
        include: {
          achievement: true,
        },
      },
    },
  });
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
      code: 'NOT_FOUND',
    });
  }
  
  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      referralCode: user.referralCode,
      referrerEarnings: user.referrerEarnings,
      level: user.level,
      totalEarned: user.totalEarned,
      createdAt: user.createdAt,
      wallets: user.wallets.map(w => ({
        coin: w.coin,
        balance: w.balance,
        address: w.address,
      })),
      achievements: user.achievements.map(a => ({
        id: a.achievement.id,
        name: a.achievement.name,
        description: a.achievement.description,
        icon: a.achievement.icon,
        progress: a.progress,
        completed: a.completed,
        completedAt: a.completedAt,
      })),
    },
  });
}));

export default router;