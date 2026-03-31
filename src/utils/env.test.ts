/**
 * Environment Utility Tests
 *
 * Unit tests for src/utils/env.ts
 */

import { describe, it, expect } from 'vitest';

// Test the env utility functions directly by importing them
// These tests verify the functions work with the vitest environment

describe('getEnv', () => {
  it('should have a default value fallback for non-existent vars', async () => {
    const { getEnv } = await import('./env');
    // Use a unique key that definitely doesn't exist
    const result = getEnv('NON_EXISTENT_TEST_VAR_XYZ123', 'default');
    expect(result).toBe('default');
  });
});

describe('getEnvBool', () => {
  it('should have a default value fallback for non-existent vars', async () => {
    const { getEnvBool } = await import('./env');
    const result = getEnvBool('NON_EXISTENT_TEST_BOOL_XYZ', true);
    expect(result).toBe(true);
  });

  it('should have default false for non-existent vars', async () => {
    const { getEnvBool } = await import('./env');
    const result = getEnvBool('NON_EXISTENT_TEST_BOOL_XYZ', false);
    expect(result).toBe(false);
  });
});

describe('getEnvNumber', () => {
  it('should have a default value fallback for non-existent vars', async () => {
    const { getEnvNumber } = await import('./env');
    const result = getEnvNumber('NON_EXISTENT_TEST_NUM_XYZ', 5000);
    expect(result).toBe(5000);
  });
});

describe('getEnvArray', () => {
  it('should have a default value fallback for non-existent vars', async () => {
    const { getEnvArray } = await import('./env');
    const result = getEnvArray('NON_EXISTENT_TEST_ARRAY_XYZ', ['default']);
    expect(result).toEqual(['default']);
  });
});

describe('Environment mode checks', () => {
  it('isTest returns true in vitest environment', async () => {
    const { isTest } = await import('./env');
    expect(isTest()).toBe(true);
  });

  it('isProduction returns false in vitest environment', async () => {
    const { isProduction } = await import('./env');
    expect(isProduction()).toBe(false);
  });

  it('isDevelopment returns false in vitest environment', async () => {
    const { isDevelopment } = await import('./env');
    expect(isDevelopment()).toBe(false);
  });
});
