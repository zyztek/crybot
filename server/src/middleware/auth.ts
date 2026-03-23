/**
 * Authentication Middleware
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { UnauthorizedError } from './errorHandler.js';
import { jwtConfig } from '../config/index.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string | null;
  };
  sessionId?: string;
}

export interface TokenPayload {
  userId: string;
  sessionId: string;
  iat: number;
  exp: number;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token using config
    const payload = jwt.verify(
      token,
      jwtConfig.secret
    ) as TokenPayload;
    
    // Check if session exists and is valid
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });
    
    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedError('Session expired or invalid');
    }
    
    // Attach user to request
    req.user = {
      id: session.user.id,
      email: session.user.email,
      username: session.user.username,
    };
    req.sessionId = session.id;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }
    
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(
      token,
      jwtConfig.secret
    ) as TokenPayload;
    
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true },
    });
    
    if (session && session.expiresAt > new Date()) {
      req.user = {
        id: session.user.id,
        email: session.user.email,
        username: session.user.username,
      };
      req.sessionId = session.id;
    }
    
    next();
  } catch {
    // Continue without auth
    next();
  }
};