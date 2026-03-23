/**
 * Error Handler Middleware Tests
 * 
 * Unit tests for server/src/middleware/errorHandler.ts
 */

import { describe, it, expect, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { 
  AppError, 
  NotFoundError, 
  UnauthorizedError, 
  ForbiddenError,
  ValidationError,
  ConflictError,
  errorHandler, 
  notFoundHandler,
  asyncHandler
} from './errorHandler.js';

// Mock Response
const createMockResponse = () => {
  const res: Partial<Response> = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as Response;
};

// Mock Request
const createMockRequest = (options: { method?: string; originalUrl?: string } = {}) => {
  return {
    method: options.method || 'GET',
    originalUrl: options.originalUrl || '/test',
  } as Request;
};

// Mock NextFunction
const mockNext = vi.fn() as NextFunction;

describe('AppError', () => {
  it('should create error with message and status code', () => {
    const error = new AppError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
  });

  it('should create error with code', () => {
    const error = new AppError('Test error', 400, 'TEST_CODE');
    expect(error.code).toBe('TEST_CODE');
  });
});

describe('NotFoundError', () => {
  it('should create 404 error', () => {
    const error = new NotFoundError('User');
    expect(error.message).toBe('User not found');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
  });
});

describe('UnauthorizedError', () => {
  it('should create 401 error with default message', () => {
    const error = new UnauthorizedError();
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized');
  });

  it('should create 401 error with custom message', () => {
    const error = new UnauthorizedError('Invalid token');
    expect(error.message).toBe('Invalid token');
  });
});

describe('ForbiddenError', () => {
  it('should create 403 error', () => {
    const error = new ForbiddenError();
    expect(error.statusCode).toBe(403);
  });
});

describe('ValidationError', () => {
  it('should create 400 error', () => {
    const error = new ValidationError('Invalid input');
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('VALIDATION_ERROR');
  });
});

describe('ConflictError', () => {
  it('should create 409 error', () => {
    const error = new ConflictError('Duplicate entry');
    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('CONFLICT');
  });
});

describe('errorHandler', () => {
  it('should handle ZodError', () => {
    const res = createMockResponse();
    const req = createMockRequest();
    const zodError = new ZodError([
      { path: ['email'], message: 'Invalid email', code: 'invalid_enum_value' }
    ] as any);

    errorHandler(zodError as Error, req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: 'Validation Error',
        code: 'VALIDATION_ERROR',
      })
    );
  });

  it('should handle AppError', () => {
    const res = createMockResponse();
    const req = createMockRequest();
    const appError = new AppError('Not allowed', 403);

    errorHandler(appError, req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Not allowed',
      code: undefined,
    });
  });

  it('should handle unknown error in production', () => {
    const res = createMockResponse();
    const req = createMockRequest();
    
    // Mock process.env.NODE_ENV and console.error
    const originalEnv = process.env.NODE_ENV;
    const originalConsoleError = console.error;
    console.error = vi.fn();
    process.env.NODE_ENV = 'production';
    
    const unknownError = new Error('Something went wrong');
    errorHandler(unknownError, req, res, mockNext);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    });
    
    // Restore
    process.env.NODE_ENV = originalEnv;
    console.error = originalConsoleError;
  });
});

describe('notFoundHandler', () => {
  it('should return 404 for unknown routes', () => {
    const res = createMockResponse();
    const req = createMockRequest({ method: 'GET', originalUrl: '/unknown' });

    notFoundHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Route GET /unknown not found',
      code: 'ROUTE_NOT_FOUND',
    });
  });
});

describe('asyncHandler', () => {
  it('should wrap async function and catch errors', async () => {
    const res = createMockResponse();
    const req = createMockRequest();
    const error = new Error('Async error');
    
    const handler = asyncHandler(async (req, res, next) => {
      throw error;
    });
    
    await handler(req, res, mockNext);
    
    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it('should call next with result on success', async () => {
    const res = createMockResponse();
    const req = createMockRequest();
    const result = { data: 'test' };
    
    const handler = asyncHandler(async (req, res, next) => {
      res.json(result);
      return result;
    });
    
    await handler(req, res, mockNext);
    
    // Verify the response was sent with the result
    expect(res.json).toHaveBeenCalledWith(result);
  });
});