/**
 * Frontend App Configuration Tests
 * 
 * Unit tests for src/config/appConfig.ts
 */

import { describe, it, expect } from 'vitest';

describe('App Config - API Configuration', () => {
  it('should have default API base URL', async () => {
    const { API_CONFIG } = await import('./appConfig');
    expect(API_CONFIG.baseUrl).toBe('http://localhost:3000/api');
  });

  it('should have default timeout', async () => {
    const { API_CONFIG } = await import('./appConfig');
    expect(API_CONFIG.timeout).toBe(30000);
  });

  it('should have default retry attempts', async () => {
    const { API_CONFIG } = await import('./appConfig');
    expect(API_CONFIG.retryAttempts).toBe(3);
  });
});

describe('App Config - Feature Flags', () => {
  it('should have analytics enabled by default', async () => {
    const { FEATURES } = await import('./appConfig');
    expect(FEATURES.analytics).toBe(true);
  });

  it('should have referral enabled by default', async () => {
    const { FEATURES } = await import('./appConfig');
    expect(FEATURES.referral).toBe(true);
  });

  it('should have leaderboard enabled by default', async () => {
    const { FEATURES } = await import('./appConfig');
    expect(FEATURES.leaderboard).toBe(true);
  });

  it('should have advanced analytics enabled by default', async () => {
    const { FEATURES } = await import('./appConfig');
    expect(FEATURES.advancedAnalytics).toBe(true);
  });
});

describe('App Config - App Configuration', () => {
  it('should have default app name', async () => {
    const { APP_CONFIG } = await import('./appConfig');
    expect(APP_CONFIG.name).toBe('CryptoFaucet Hub');
  });

  it('should have default version', async () => {
    const { APP_CONFIG } = await import('./appConfig');
    expect(APP_CONFIG.version).toBe('1.0.0');
  });

  it('should have default network as sepolia', async () => {
    const { APP_CONFIG } = await import('./appConfig');
    expect(APP_CONFIG.defaultNetwork).toBe('sepolia');
  });

  it('should have default supported networks', async () => {
    const { APP_CONFIG } = await import('./appConfig');
    expect(APP_CONFIG.supportedNetworks).toContain('sepolia');
    expect(APP_CONFIG.supportedNetworks).toContain('mainnet');
    expect(APP_CONFIG.supportedNetworks).toContain('arbitrum');
    expect(APP_CONFIG.supportedNetworks).toContain('optimism');
  });
});

describe('App Config - Network Configuration', () => {
  it('should have default network from APP_CONFIG', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.defaultNetwork).toBe('sepolia');
  });

  it('should have supported networks from APP_CONFIG', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.supportedNetworks).toContain('sepolia');
    expect(NETWORK_CONFIG.supportedNetworks).toContain('mainnet');
  });

  it('isSupported should return true for supported networks', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.isSupported('sepolia')).toBe(true);
    expect(NETWORK_CONFIG.isSupported('mainnet')).toBe(true);
    expect(NETWORK_CONFIG.isSupported('arbitrum')).toBe(true);
  });

  it('isSupported should return false for unsupported networks', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.isSupported('unknown')).toBe(false);
    expect(NETWORK_CONFIG.isSupported('polygon')).toBe(false);
  });

  it('getRpcUrl should return correct RPC for sepolia', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.getRpcUrl('sepolia')).toBe('https://rpc.sepolia.org');
  });

  it('getRpcUrl should return correct RPC for mainnet', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.getRpcUrl('mainnet')).toBe('https://eth.public-rpc.com');
  });

  it('getRpcUrl should return correct RPC for arbitrum', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.getRpcUrl('arbitrum')).toBe('https://arb1.arbitrum.io/rpc');
  });

  it('getRpcUrl should return correct RPC for optimism', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.getRpcUrl('optimism')).toBe('https://mainnet.optimism.io');
  });

  it('getRpcUrl should fallback to sepolia for unknown networks', async () => {
    const { NETWORK_CONFIG } = await import('./appConfig');
    expect(NETWORK_CONFIG.getRpcUrl('unknown')).toBe('https://rpc.sepolia.org');
  });
});

describe('App Config - Combined Config Export', () => {
  it('should export all config sections', async () => {
    const { config } = await import('./appConfig');
    expect(config.api).toBeDefined();
    expect(config.features).toBeDefined();
    expect(config.app).toBeDefined();
    expect(config.network).toBeDefined();
  });

  it('should export default config', async () => {
    const config = await import('./appConfig');
    expect(config.API_CONFIG).toBeDefined();
    expect(config.FEATURES).toBeDefined();
    expect(config.APP_CONFIG).toBeDefined();
    expect(config.NETWORK_CONFIG).toBeDefined();
  });
});