/**
 * User GraphQL Resolvers
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';
import { jwtConfig } from '../../config/index.js';

interface Context {
  userId?: string;
}

export const userResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) return null;
      return prisma.user.findUnique({
        where: { id: context.userId },
        select: {
          id: true,
          email: true,
          username: true,
          walletAddress: true,
          referralCode: true,
          referredById: true,
          referrerEarnings: true,
          level: true,
          totalEarned: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
    user: async (_: unknown, { id }: { id: string }) => {
      return prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          walletAddress: true,
          referralCode: true,
          referredById: true,
          referrerEarnings: true,
          level: true,
          totalEarned: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
    users: async (_: unknown, { limit = 50, offset = 0 }: { limit?: number; offset?: number }) => {
      return prisma.user.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          walletAddress: true,
          referralCode: true,
          referredById: true,
          referrerEarnings: true,
          level: true,
          totalEarned: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
  },
  Mutation: {
    register: async (_: unknown, { input }: { input: { email: string; password: string; username?: string; referralCode?: string } }) => {
      const { email, password, username, referralCode } = input;

      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username: username || undefined }] },
      });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      let referredById: string | null = null;
      if (referralCode) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode },
        });
        if (referrer) {
          referredById = referrer.id;
        }
      }

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          username,
          referralCode: newReferralCode,
          referredById,
        },
      });

      const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions);
      const refreshToken = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: '7d' } as jwt.SignOptions);

      await prisma.session.create({
        data: {
          userId: user.id,
          token,
          refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          walletAddress: user.walletAddress,
          referralCode: user.referralCode,
          referredById: user.referredById,
          referrerEarnings: user.referrerEarnings,
          level: user.level,
          totalEarned: user.totalEarned,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    },
    login: async (_: unknown, { input }: { input: { email: string; password: string } }) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions);
      const refreshToken = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: '7d' } as jwt.SignOptions);

      await prisma.session.create({
        data: {
          userId: user.id,
          token,
          refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          walletAddress: user.walletAddress,
          referralCode: user.referralCode,
          referredById: user.referredById,
          referrerEarnings: user.referrerEarnings,
          level: user.level,
          totalEarned: user.totalEarned,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    },
    logout: async (_: unknown, __: unknown, context: Context) => {
      if (context.userId) {
        await prisma.session.deleteMany({
          where: { userId: context.userId },
        });
      }
      return true;
    },
    refreshToken: async (_: unknown, { refreshToken }: { refreshToken: string }) => {
      try {
        const payload = jwt.verify(refreshToken, jwtConfig.secret) as { userId: string };
        const user = await prisma.user.findUnique({ where: { id: payload.userId } });

        if (!user) {
          throw new Error('User not found');
        }

        const newToken = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions);
        const newRefreshToken = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: '7d' } as jwt.SignOptions);

        await prisma.session.create({
          data: {
            userId: user.id,
            token: newToken,
            refreshToken: newRefreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });

        return {
          token: newToken,
          refreshToken: newRefreshToken,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            walletAddress: user.walletAddress,
            referralCode: user.referralCode,
            referredById: user.referredById,
            referrerEarnings: user.referrerEarnings,
            level: user.level,
            totalEarned: user.totalEarned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        };
      } catch {
        throw new Error('Invalid refresh token');
      }
    },
    updateUser: async (_: unknown, { input }: { input: { username?: string; walletAddress?: string } }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return prisma.user.update({
        where: { id: context.userId },
        data: {
          username: input.username,
          walletAddress: input.walletAddress,
        },
        select: {
          id: true,
          email: true,
          username: true,
          walletAddress: true,
          referralCode: true,
          referredById: true,
          referrerEarnings: true,
          level: true,
          totalEarned: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },
  },
};

export default userResolvers;