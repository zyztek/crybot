/**
 * Environment Utility Tests
 * 
 * Unit tests for src/utils/env.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

const createMockEnv = (overrides: Record<string, unknown> = {}) => ({
  VITE_API_URL: 'http://localhost:3000/api',
  VITE_API_TIMEOUT: '30000',
  VITE_ENABLE_ANALYTICS: 'true',
  VITE_ENABLE_REFERRAL: 'false',
  VITE_DEFAULT_NETWORK: 'sepolia',
  VITE_SUPPORTED_NETWORKS: 'sepolia,mainnet,arbitrum',
  MODE: 'test',
  ...overrides,
});

describe('getEnv', () => {
  beforeEach(() => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
  });

  it('should return the env value when present', async () => {
    const { getEnv } = await import('./env');
    expect(getEnv('VITE_API_URL', 'default')).toBe('http://localhost:3000/api');
  });

  it('should return default when env var is not set', async () => {
    const { getEnv } = await import('./env');
    expect(getEnv('NON_EXISTENT_VAR', 'default')).toBe('default');
  });

  it('should return default when env var is empty string', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_API_URL: '' }) });
    const { getEnv } = await import('./env');
    expect(getEnv('VITE_API_URL', 'default')).toBe('default');
  });
});

describe('getEnvBool', () => {
  beforeEach(() => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
  });

  it('should return true for "true" string', async () => {
    const { getEnvBool } = await import('./env');
    expect(getEnvBool('VITE_ENABLE_ANALYTICS', false)).toBe(true);
  });

  it('should return true for "1" string', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_ENABLE_ANALYTICS: '1' }) });
    const { getEnvBool } = await import('./env');
    expect(getEnvBool('VITE_ENABLE_ANALYTICS', false)).toBe(true);
  });

  it('should return false for "false" string', async () => {
    const { getEnvBool } = await import('./env');
    expect(getEnvBool('VITE_ENABLE_REFERRAL', false)).toBe(false);
  });

  it('should return default when env var is not set', async () => {
    const { getEnvBool } = await import('./env');
    expect(getEnvBool('NON_EXISTENT', true)).toBe(true);
  });

  it('should return default when env var is undefined', async () => {
    const { getEnvBool } = await import('./env');
    expect(getEnvBool('NON_EXISTENT', false)).toBe(false);
  });
});

describe('getEnvNumber', () => {
  beforeEach(() => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
  });

  it('should return parsed number when valid', async () => {
    const { getEnvNumber } = await import('./env');
    expect(getEnvNumber('VITE_API_TIMEOUT', 0)).toBe(30000);
  });

  it('should return default when env var is not set', async () => {
    const { getEnvNumber } = await import('./env');
    expect(getEnvNumber('NON_EXISTENT', 5000)).toBe(5000);
  });

  it('should return default when value is NaN', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_API_TIMEOUT: 'not-a-number' }) });
    const { getEnvNumber } = await import('./env');
    expect(getEnvNumber('VITE_API_TIMEOUT', 5000)).toBe(5000);
  });

  it('should return default when value is empty string', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_API_TIMEOUT: '' }) });
    const { getEnvNumber } = await import('./env');
    expect(getEnvNumber('VITE_API_TIMEOUT', 5000)).toBe(5000);
  });
});

describe('getEnvArray', () => {
  beforeEach(() => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
  });

  it('should return array from comma-separated string', async () => {
    const { getEnvArray } = await import('./env');
    const result = getEnvArray('VITE_SUPPORTED_NETWORKS', []);
    expect(result).toEqual(['sepolia', 'mainnet', 'arbitrum']);
  });

  it('should trim whitespace from array elements', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_SUPPORTED_NETWORKS: 'sepolia, mainnet , arbitrum' }) });
    const { getEnvArray } = await import('./env');
    const result = getEnvArray('VITE_SUPPORTED_NETWORKS', []);
    expect(result).toEqual(['sepolia', 'mainnet', 'arbitrum']);
  });

  it('should filter empty strings', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_SUPPORTED_NETWORKS: 'sepolia,,mainnet' }) });
    const { getEnvArray } = await import('./env');
    const result = getEnvArray('VITE_SUPPORTED_NETWORKS', []);
    expect(result).toEqual(['sepolia', 'mainnet']);
  });

  it('should return default when env var is not set', async () => {
    const { getEnvArray } = await import('./env');
    expect(getEnvArray('NON_EXISTENT', ['default'])).toEqual(['default']);
  });

  it('should return default when env var is empty string', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ VITE_SUPPORTED_NETWORKS: '' }) });
    const { getEnvArray } = await import('./env');
    expect(getEnvArray('VITE_SUPPORTED_NETWORKS', ['fallback'])).toEqual(['fallback']);
  });
});

describe('Environment mode checks', () => {
  it('isProduction should return true when MODE is production', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ MODE: 'production' }) });
    const { isProduction } = await import('./env');
    expect(isProduction()).toBe(true);
  });

  it('isProduction should return false when MODE is not production', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
    const { isProduction } = await import('./env');
    expect(isProduction()).toBe(false);
  });

  it('isDevelopment should return true when MODE is development', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ MODE: 'development' }) });
    const { isDevelopment } = await import('./env');
    expect(isDevelopment()).toBe(true);
  });

  it('isDevelopment should return false when MODE is not development', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv() });
    const { isDevelopment } = await import('./env');
    expect(isDevelopment()).toBe(false);
  });

  it('isTest should return true when MODE is test', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ MODE: 'test' }) });
    const { isTest } = await import('./env');
    expect(isTest()).toBe(true);
  });

  it('isTest should return false when MODE is not test', async () => {
    vi.stubGlobal('import.meta', { env: createMockEnv({ MODE: 'production' }) });
    const { isTest } = await import('./env');
    expect(isTest()).toBe(false);
  });
});