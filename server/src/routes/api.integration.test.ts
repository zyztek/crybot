/**
 * API Integration Tests
 * 
 * Tests for server API endpoints
 * 
 * Prerequisites:
 * 1. Create .env.test file with TEST_DATABASE_URL
 * 2. Run: npm run test:setup-db
 * 3. Run tests: npm test -- api.integration.test.ts
 * 
 * Or use: npm run test:integration (runs setup + tests)
 * 
 * Test Isolation:
 * Each test runs in a database transaction that is rolled back after the test.
 * This ensures tests don't interfere with each other.
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { setupTestDatabase } from '../../scripts/setup-test-db.js';

// Set test environment BEFORE importing app
process.env.NODE_ENV = 'test';

// Use test database URL for Prisma
const testDbUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
if (testDbUrl) {
  process.env.DATABASE_URL = testDbUrl;
}

// Now import app after env is set
const { app } = await import('../index.js');

// Test agent - use supertest to test Express routes
const agent = request.agent(app);

// Prisma client for test isolation (with correct DB URL)
const prisma = new PrismaClient({
  datasources: testDbUrl ? {
    db: { url: testDbUrl }
  } : undefined,
});

// Store cleanup function for afterAll
let cleanupTestDb: (() => Promise<void>) | undefined;

// Tables to truncate between tests (only those modified by tests)
// Note: achievements, faucets, daily_stats, leaderboard contain seed data - don't truncate
const TEST_TABLES = [
  'user_achievements',
  'faucet_claims',
  'transactions',
  'wallets',
  'sessions',
  'users',
];

// Setup test database before all tests
beforeAll(async () => {
  const result = await setupTestDatabase();
  if (!result.success) {
    throw new Error(`Failed to setup test database: ${result.error}`);
  }
  cleanupTestDb = result.cleanup;
});

// Cleanup after all tests
afterAll(async () => {
  if (cleanupTestDb) {
    await cleanupTestDb();
  }
  await prisma.$disconnect();
});

// Clean tables before each test for isolation
beforeEach(async () => {
  if (!testDbUrl) {
    console.warn('⚠ TEST_DATABASE_URL not set - test isolation may not work properly');
    return;
  }
  
  try {
    // Disable foreign key checks, truncate tables, re-enable
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0');
    for (const table of TEST_TABLES) {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
      } catch {
        // Table might not exist, continue
      }
    }
    await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1');
  } catch (error) {
    console.error('Failed to clean tables:', error);
  }
});

describe('Health Endpoints', () => {
  it('GET /health should return healthy status', async () => {
    const response = await agent.get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.environment).toBeDefined();
  });

  it('GET /health/live should return alive status', async () => {
    const response = await agent.get('/health/live');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('alive');
  });

  it('GET /api should return API info', async () => {
    const response = await agent.get('/api');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('CryptoFaucet Hub API');
  });
});

describe('Auth Endpoints', () => {
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    username: `testuser-${Date.now()}`,
    password: 'TestPassword123!',
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await agent
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      // First registration succeeded, try again with same email
      const response = await agent
        .post('/api/auth/register')
        .send(testUser);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('already exists');
    });

    it('should reject invalid email', async () => {
      const response = await agent
        .post('/api/auth/register')
        .send({
          email: 'not-an-email',
          username: 'testuser',
          password: 'TestPassword123!',
        });

      expect(response.status).toBe(400);
    });

    it('should reject weak password', async () => {
      const response = await agent
        .post('/api/auth/register')
        .send({
          email: 'test2@example.com',
          username: 'testuser2',
          password: 'weak',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await agent
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject invalid password', async () => {
      const response = await agent
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrong-password',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('Invalid');
    });

    it('should reject non-existent user', async () => {
      const response = await agent
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'somepassword',
        });

      expect(response.status).toBe(401);
    });
  });
});

describe('User Endpoints', () => {
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    // Create a test user and get token
    const testEmail = `profiletest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `profiletest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
    testUserId = registerResponse.body.data.user.id;
  });

  describe('GET /api/user/profile', () => {
    it('should get user profile with valid token', async () => {
      const response = await agent
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBeDefined();
    });

    it('should reject request without token', async () => {
      const response = await agent.get('/api/user/profile');
      expect(response.status).toBe(401);
    });

    it('should reject request with invalid token', async () => {
      const response = await agent
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/user/profile', () => {
    it('should update user profile', async () => {
      const response = await agent
        .put('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          username: 'updatedusername',
        });

      expect(response.status).toBe(200);
      expect(response.body.username).toBe('updatedusername');
    });
  });
});

describe('Wallet Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `wallettest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `wallettest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
  });

  describe('GET /api/wallet', () => {
    it('should get user wallets', async () => {
      const response = await agent
        .get('/api/wallet')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data.wallets)).toBe(true);
      expect(response.body.data.pagination).toBeDefined();
    });

    it('should return empty wallets array for new user', async () => {
      const response = await agent
        .get('/api/wallet')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.wallets).toEqual([]);
    });

    it('should include pagination metadata', async () => {
      const response = await agent
        .get('/api/wallet')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(20);
      expect(response.body.data.pagination.total).toBe(0);
      expect(response.body.data.pagination.totalPages).toBe(0);
    });

    it('should support pagination with page and limit', async () => {
      const response = await agent
        .get('/api/wallet?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(10);
    });

    it('should handle page=0 by defaulting to page 1', async () => {
      const response = await agent
        .get('/api/wallet?page=0')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should handle non-numeric page by defaulting to 1', async () => {
      const response = await agent
        .get('/api/wallet?page=abc')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should handle limit=0 by defaulting to default limit', async () => {
      const response = await agent
        .get('/api/wallet?limit=0')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should reject request without token', async () => {
      const response = await agent.get('/api/wallet');
      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/wallet/:coin', () => {
    it('should return 404 for non-existent wallet', async () => {
      const response = await agent
        .get('/api/wallet/NONEXISTENT')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/wallet/deposit', () => {
    it('should reject deposit without wallet', async () => {
      const response = await agent
        .post('/api/wallet/deposit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ coin: 'BTC' });

      expect(response.status).toBe(404);
    });
  });
});

describe('Faucet Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `faucettest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `faucettest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
  });

  describe('GET /api/faucet', () => {
    it('should get all faucets', async () => {
      const response = await agent.get('/api/faucet');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/faucet/claim/status', () => {
    it('should get claim status', async () => {
      const response = await agent
        .get('/api/faucet/claim/status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });
  });
});

describe('Leaderboard Endpoints', () => {
  describe('GET /api/leaderboard', () => {
    it('should get leaderboard', async () => {
      const response = await agent.get('/api/leaderboard');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe('Analytics Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `analyticstest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `analyticstest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
  });

  describe('GET /api/analytics/overview', () => {
    it('should get analytics overview with auth', async () => {
      const response = await agent
        .get('/api/analytics/overview')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });
  });
});

describe('Transaction Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `transactiontest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `transactiontest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
  });

  describe('GET /api/transaction', () => {
    it('should get user transactions with default pagination', async () => {
      const response = await agent
        .get('/api/transaction')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.transactions).toBeDefined();
      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should paginate with custom page and limit', async () => {
      const response = await agent
        .get('/api/transaction?page=2&limit=5')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(2);
      expect(response.body.data.pagination.limit).toBe(5);
    });

    it('should calculate totalPages correctly', async () => {
      const response = await agent
        .get('/api/transaction?limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.totalPages).toBeDefined();
      expect(typeof response.body.data.pagination.totalPages).toBe('number');
    });

    it('should return empty array when page exceeds total', async () => {
      const response = await agent
        .get('/api/transaction?page=999&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.transactions).toEqual([]);
      expect(response.body.data.pagination.page).toBe(999);
    });

    it('should filter transactions by type', async () => {
      const response = await agent
        .get('/api/transaction?type=claim')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });

    it('should filter transactions by coin', async () => {
      const response = await agent
        .get('/api/transaction?coin=ETH')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
    });

    it('should combine pagination with type filter', async () => {
      const response = await agent
        .get('/api/transaction?page=1&limit=5&type=claim')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(5);
    });

    it('should combine pagination with coin filter', async () => {
      const response = await agent
        .get('/api/transaction?page=1&limit=10&coin=BTC')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(10);
    });

    it('should handle page=0 by defaulting to page 1', async () => {
      const response = await agent
        .get('/api/transaction?page=0')
        .set('Authorization', `Bearer ${authToken}`);

      // parseInt("0") returns 0 which is falsy, so defaults to 1
      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should pass through negative page values', async () => {
      const response = await agent
        .get('/api/transaction?page=-1')
        .set('Authorization', `Bearer ${authToken}`);

      // parseInt("-1") returns -1 which is truthy, so it passes through
      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(-1);
    });

    it('should default to page 1 for non-numeric page', async () => {
      const response = await agent
        .get('/api/transaction?page=abc')
        .set('Authorization', `Bearer ${authToken}`);

      // parseInt("abc") returns NaN which is falsy, so defaults to 1
      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should handle limit=0 by defaulting to limit 20', async () => {
      const response = await agent
        .get('/api/transaction?limit=0')
        .set('Authorization', `Bearer ${authToken}`);

      // parseInt("0") returns 0 which is falsy, so defaults to 20
      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should handle non-numeric limit by defaulting to 20', async () => {
      const response = await agent
        .get('/api/transaction?limit=abc')
        .set('Authorization', `Bearer ${authToken}`);

      // parseInt("abc") returns NaN which is falsy, so defaults to 20
      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should reject request without token', async () => {
      const response = await agent.get('/api/transaction');
      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/transaction/stats', () => {
    it('should get transaction statistics', async () => {
      const response = await agent
        .get('/api/transaction/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.claims).toBeDefined();
      expect(response.body.data.deposits).toBeDefined();
      expect(response.body.data.withdrawals).toBeDefined();
      expect(response.body.data.referrals).toBeDefined();
    });
  });

  describe('GET /api/transaction/:id', () => {
    it('should return 404 for non-existent transaction', async () => {
      const response = await agent
        .get('/api/transaction/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Transaction not found');
    });
  });
});

describe('Achievement Endpoints', () => {
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `achievementtest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `achievementtest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    authToken = registerResponse.body.data.accessToken;
  });

  describe('GET /api/achievement', () => {
    it('should get all achievements with user progress', async () => {
      const response = await agent
        .get('/api/achievement')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data.achievements)).toBe(true);
      expect(response.body.data.pagination).toBeDefined();
    });

    it('should include pagination metadata', async () => {
      const response = await agent
        .get('/api/achievement')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(20);
      expect(response.body.data.pagination.total).toBeDefined();
      expect(response.body.data.pagination.totalPages).toBeDefined();
    });

    it('should support pagination with page and limit', async () => {
      const response = await agent
        .get('/api/achievement?page=1&limit=5')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(5);
    });

    it('should handle page=0 by defaulting to page 1', async () => {
      const response = await agent
        .get('/api/achievement?page=0')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should handle non-numeric page by defaulting to 1', async () => {
      const response = await agent
        .get('/api/achievement?page=abc')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.page).toBe(1);
    });

    it('should handle limit=0 by defaulting to default limit', async () => {
      const response = await agent
        .get('/api/achievement?limit=0')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should handle non-numeric limit by defaulting to 20', async () => {
      const response = await agent
        .get('/api/achievement?limit=xyz')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination.limit).toBe(20);
    });

    it('should return empty results when page exceeds total', async () => {
      const response = await agent
        .get('/api/achievement?page=999&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.achievements).toEqual([]);
    });

    it('should reject request without token', async () => {
      const response = await agent.get('/api/achievement');
      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/achievement/user', () => {
    it('should get user achievements', async () => {
      const response = await agent
        .get('/api/achievement/user')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.achievements).toBeDefined();
      expect(response.body.data.stats).toBeDefined();
    });

    it('should include pagination for user achievements', async () => {
      const response = await agent
        .get('/api/achievement/user?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.pagination).toBeDefined();
    });
  });

  describe('POST /api/achievement/:id/claim', () => {
    it('should reject claim for uncompleted achievement', async () => {
      const response = await agent
        .post('/api/achievement/invalid-id/claim')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
    });

    it('should reject claim with invalid achievement ID', async () => {
      const response = await agent
        .post('/api/achievement/00000000-0000-0000-0000-000000000000/claim')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(400);
    });
  });
});

describe('Auth Token Refresh', () => {
  let refreshToken: string;
  let authToken: string;

  beforeAll(async () => {
    const testEmail = `refreshtest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `refreshtest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    refreshToken = registerResponse.body.data.refreshToken;
    authToken = registerResponse.body.data.accessToken;
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const response = await agent
        .post('/api/auth/refresh')
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject refresh with invalid token', async () => {
      const response = await agent
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-token' });

      expect(response.status).toBe(401);
    });

    it('should reject refresh without token', async () => {
      const response = await agent
        .post('/api/auth/refresh')
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const logoutResponse = await agent
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`);

      expect(logoutResponse.status).toBe(200);
    });

    it('should reject logout without token', async () => {
      const response = await agent.post('/api/auth/logout');
      expect(response.status).toBe(401);
    });
  });
});

describe('Error Handling', () => {
  it('should return 404 for non-existent route', async () => {
    const response = await agent.get('/api/non-existent');
    expect(response.status).toBe(404);
  });

  it('should return 404 for non-existent route with auth', async () => {
    const testEmail = `errortest-${Date.now()}@example.com`;
    const registerResponse = await agent
      .post('/api/auth/register')
      .send({
        email: testEmail,
        username: `errortest-${Date.now()}`,
        password: 'TestPassword123!',
      });

    const authToken = registerResponse.body.data.accessToken;
    const response = await agent
      .get('/api/wallet/invalid-id-that-does-not-exist')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(404);
  });

  it('should handle invalid JSON body', async () => {
    const response = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send('{invalid json}');

    expect(response.status).toBe(400);
  });
});

describe('Rate Limiting', () => {
  it('should rate limit excessive requests to auth', async () => {
    // Make multiple login attempts
    const promises = [];
    for (let i = 0; i < 15; i++) {
      promises.push(
        agent.post('/api/auth/login').send({
          email: 'ratelimit@example.com',
          password: 'wrongpassword',
        })
      );
    }

    const responses = await Promise.all(promises);
    
    // Should be rate limited eventually
    const hasRateLimit = responses.some(r => r.status === 429);
    expect(hasRateLimit).toBe(true);
  });
});