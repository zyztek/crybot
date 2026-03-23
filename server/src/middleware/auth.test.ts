/**
 * Auth Middleware Tests
 * 
 * Unit tests for server/src/middleware/auth.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mock dependencies
vi.mock('../lib/prisma.js', () => ({
  prisma: {
    session: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('../config/index.js', () => ({
  jwtConfig: {
    secret: 'test-secret-key-minimum-32-characters',
  },
}));

import { authenticate, optionalAuth, AuthRequest, TokenPayload } from './auth.js';
import { prisma } from '../lib/prisma.js';
import { jwtConfig } from '../config/index.js';

// Test helpers
const createMockRequest = (authHeader?: string): Partial<AuthRequest> => ({
  headers: {
    authorization: authHeader,
  } as Record<string, string>,
});

const createMockResponse = (): Partial<Response> => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
});

const createMockNext = (): NextFunction => vi.fn();

// Generate valid JWT token for testing
const generateTestToken = (payload: Partial<TokenPayload> = {}): string => {
  const defaultPayload: TokenPayload = {
    userId: 'user-123',
    sessionId: 'session-456',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  return jwt.sign({ ...defaultPayload, ...payload }, jwtConfig.secret);
};

describe('Auth Middleware', () => {
  let mockReq: Partial<AuthRequest>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = createMockRequest();
    mockRes = createMockResponse();
    mockNext = createMockNext();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('authenticate', () => {
    it('should call next() with no token provided error', async () => {
      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = (mockNext as any).mock.calls[0][0];
      expect(error.message).toBe('No token provided');
    });

    it('should call next() with invalid token format error', async () => {
      mockReq.headers!.authorization = 'InvalidFormat token';

      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = (mockNext as any).mock.calls[0][0];
      expect(error.message).toBe('No token provided');
    });

    it('should call next() with Invalid token error for malformed JWT', async () => {
      mockReq.headers!.authorization = 'Bearer malformed.token.here';

      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = (mockNext as any).mock.calls[0][0];
      expect(error.message).toBe('Invalid token');
    });

    it('should call next() with error when session not found', async () => {
      const token = generateTestToken();
      mockReq.headers!.authorization = `Bearer ${token}`;
      
      (prisma.session.findUnique as any).mockResolvedValue(null);

      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = (mockNext as any).mock.calls[0][0];
      expect(error.message).toBe('Session expired or invalid');
    });

    it('should call next() with error when session is expired', async () => {
      const token = generateTestToken();
      mockReq.headers!.authorization = `Bearer ${token}`;
      
      const expiredSession = {
        id: 'session-456',
        expiresAt: new Date(Date.now() - 1000), // Expired
        user: { id: 'user-123', email: 'test@example.com', username: 'test' },
      };
      (prisma.session.findUnique as any).mockResolvedValue(expiredSession);

      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      const error = (mockNext as any).mock.calls[0][0];
      expect(error.message).toBe('Session expired or invalid');
    });

    it('should attach user to request when session is valid', async () => {
      const token = generateTestToken();
      mockReq.headers!.authorization = `Bearer ${token}`;
      
      const validSession = {
        id: 'session-456',
        expiresAt: new Date(Date.now() + 3600000), // Not expired
        user: { id: 'user-123', email: 'test@example.com', username: 'testuser' },
      };
      (prisma.session.findUnique as any).mockResolvedValue(validSession);

      await authenticate(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        username: 'testuser',
      });
      expect((mockReq as any).sessionId).toBe('session-456');
    });
  });

  describe('optionalAuth', () => {
    it('should call next() with no token (no auth header)', async () => {
      await optionalAuth(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toBeUndefined();
    });

    it('should call next() with invalid token format (no auth failure)', async () => {
      mockReq.headers!.authorization = 'InvalidFormat';

      await optionalAuth(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toBeUndefined();
    });

    it('should continue without auth on JWT verification error', async () => {
      mockReq.headers!.authorization = 'Bearer invalid.token';

      await optionalAuth(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toBeUndefined();
    });

    it('should attach user when session is valid', async () => {
      const token = generateTestToken();
      mockReq.headers!.authorization = `Bearer ${token}`;
      
      const validSession = {
        id: 'session-456',
        expiresAt: new Date(Date.now() + 3600000),
        user: { id: 'user-123', email: 'test@example.com', username: 'testuser' },
      };
      (prisma.session.findUnique as any).mockResolvedValue(validSession);

      await optionalAuth(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        username: 'testuser',
      });
    });

    it('should not attach user when session is expired', async () => {
      const token = generateTestToken();
      mockReq.headers!.authorization = `Bearer ${token}`;
      
      const expiredSession = {
        id: 'session-456',
        expiresAt: new Date(Date.now() - 1000),
        user: { id: 'user-123', email: 'test@example.com', username: 'testuser' },
      };
      (prisma.session.findUnique as any).mockResolvedValue(expiredSession);

      await optionalAuth(mockReq as AuthRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect((mockReq as any).user).toBeUndefined();
    });
  });
});

describe('TokenPayload Interface', () => {
  it('should have correct shape for TokenPayload', () => {
    const payload: TokenPayload = {
      userId: 'user-123',
      sessionId: 'session-456',
      iat: 1234567890,
      exp: 1234571490,
    };

    expect(payload.userId).toBe('user-123');
    expect(payload.sessionId).toBe('session-456');
    expect(payload.iat).toBe(1234567890);
    expect(payload.exp).toBe(1234571490);
  });
});

describe('AuthRequest Interface', () => {
  it('should have user and sessionId properties', () => {
    const req: Partial<AuthRequest> = {
      user: {
        id: 'user-123',
        email: 'test@example.com',
        username: 'testuser',
      },
      sessionId: 'session-456',
    };

    expect(req.user?.id).toBe('user-123');
    expect(req.user?.email).toBe('test@example.com');
    expect(req.user?.username).toBe('testuser');
    expect(req.sessionId).toBe('session-456');
  });

  it('should allow null username', () => {
    const req: Partial<AuthRequest> = {
      user: {
        id: 'user-123',
        email: 'test@example.com',
        username: null,
      },
    };

    expect(req.user?.username).toBeNull();
  });
});