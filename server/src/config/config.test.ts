/**
 * Server Configuration Tests
 *
 * Unit tests for server/src/config/index.ts
 * Testing config structure and default behavior
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Test the helper functions directly
describe('Config Helper Functions', () => {
  // Import the module with cleared env to test defaults
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear all env to test defaults
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default PORT when env not set', async () => {
    const { serverConfig } = await import('./index.js');
    expect(serverConfig.port).toBe(3000);
  });

  it('should default to development mode', async () => {
    const { serverConfig } = await import('./index.js');
    expect(serverConfig.nodeEnv).toBe('development');
  });

  it('isDevelopment should return true in development', async () => {
    const { serverConfig } = await import('./index.js');
    expect(serverConfig.isDevelopment()).toBe(true);
  });

  it('isProduction should return false in development', async () => {
    const { serverConfig } = await import('./index.js');
    expect(serverConfig.isProduction()).toBe(false);
  });

  it('isTest should return false in development', async () => {
    const { serverConfig } = await import('./index.js');
    expect(serverConfig.isTest()).toBe(false);
  });
});

describe('Database Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default database URL', async () => {
    const { databaseConfig } = await import('./index.js');
    expect(databaseConfig.url).toContain('localhost:5432');
    expect(databaseConfig.url).toContain('crybot');
  });
});

describe('JWT Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default JWT secret', async () => {
    const { jwtConfig } = await import('./index.js');
    expect(jwtConfig.secret).toContain('your-super-secret');
  });

  it('should have default token expiry', async () => {
    const { jwtConfig } = await import('./index.js');
    expect(jwtConfig.expiresIn).toBe('7d');
  });

  it('should have default refresh token expiry', async () => {
    const { jwtConfig } = await import('./index.js');
    expect(jwtConfig.refreshExpiresIn).toBe('30d');
  });
});

describe('CORS Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default CORS origin', async () => {
    const { corsConfig } = await import('./index.js');
    expect(corsConfig.origin).toBe('http://localhost:5173');
  });

  it('should have credentials enabled by default', async () => {
    const { corsConfig } = await import('./index.js');
    expect(corsConfig.credentials).toBe(true);
  });

  it('should have all HTTP methods configured', async () => {
    const { corsConfig } = await import('./index.js');
    expect(corsConfig.methods).toContain('GET');
    expect(corsConfig.methods).toContain('POST');
    expect(corsConfig.methods).toContain('PUT');
    expect(corsConfig.methods).toContain('DELETE');
    expect(corsConfig.methods).toContain('PATCH');
    expect(corsConfig.methods).toContain('OPTIONS');
  });

  it('should have required headers configured', async () => {
    const { corsConfig } = await import('./index.js');
    expect(corsConfig.allowedHeaders).toContain('Content-Type');
    expect(corsConfig.allowedHeaders).toContain('Authorization');
  });
});

describe('Rate Limit Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default rate limit window', async () => {
    const { rateLimitConfig } = await import('./index.js');
    expect(rateLimitConfig.windowMs).toBe(15 * 60 * 1000); // 15 minutes
  });

  it('should have default max requests', async () => {
    const { rateLimitConfig } = await import('./index.js');
    expect(rateLimitConfig.maxRequests).toBe(100);
  });

  it('should have default auth max attempts', async () => {
    const { rateLimitConfig } = await import('./index.js');
    expect(rateLimitConfig.authMaxAttempts).toBe(10);
  });

  it('should have default faucet max claims', async () => {
    const { rateLimitConfig } = await import('./index.js');
    expect(rateLimitConfig.faucetMaxClaims).toBe(5);
  });

  it('should have default faucet window', async () => {
    const { rateLimitConfig } = await import('./index.js');
    expect(rateLimitConfig.faucetWindowMs).toBe(24 * 60 * 60 * 1000); // 24 hours
  });
});

describe('Blockchain Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have default ETH RPC URL', async () => {
    const { blockchainConfig } = await import('./index.js');
    expect(blockchainConfig.eth.rpcUrl).toBe('https://eth.sepolia.org');
  });

  it('should have default ETH chain ID', async () => {
    const { blockchainConfig } = await import('./index.js');
    expect(blockchainConfig.eth.chainId).toBe(11155111);
  });

  it('should have default Sepolia RPC URL', async () => {
    const { blockchainConfig } = await import('./index.js');
    expect(blockchainConfig.sepolia.rpcUrl).toBe('https://rpc.sepolia.org');
  });

  it('should have default Solana RPC URL', async () => {
    const { blockchainConfig } = await import('./index.js');
    expect(blockchainConfig.solana.rpcUrl).toBe('https://api.devnet.solana.com');
  });

  it('should have faucet private key (empty by default)', async () => {
    const { blockchainConfig } = await import('./index.js');
    expect(blockchainConfig.faucet.privateKey).toBe('');
  });
});

describe('App Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should have app name', async () => {
    const { appConfig } = await import('./index.js');
    expect(appConfig.name).toBe('CryptoFaucet Hub');
  });

  it('should have API prefix', async () => {
    const { appConfig } = await import('./index.js');
    expect(appConfig.apiPrefix).toBe('/api');
  });

  it('should have WebSocket path', async () => {
    const { appConfig } = await import('./index.js');
    expect(appConfig.websocketPath).toBe('/ws');
  });
});

describe('Combined Config Export', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should export all config sections', async () => {
    const { config } = await import('./index.js');
    expect(config.server).toBeDefined();
    expect(config.database).toBeDefined();
    expect(config.jwt).toBeDefined();
    expect(config.cors).toBeDefined();
    expect(config.rateLimit).toBeDefined();
    expect(config.blockchain).toBeDefined();
    expect(config.app).toBeDefined();
  });

  it('should export default config', async () => {
    const config = await import('./index.js');
    expect(config.serverConfig).toBeDefined();
    expect(config.databaseConfig).toBeDefined();
    expect(config.jwtConfig).toBeDefined();
    expect(config.corsConfig).toBeDefined();
    expect(config.rateLimitConfig).toBeDefined();
    expect(config.blockchainConfig).toBeDefined();
    expect(config.appConfig).toBeDefined();
  });
});
