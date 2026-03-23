/**
 * Utility Function Tests
 * 
 * Unit tests for server/src/utils/index.ts
 * Testing helper functions for amount calculations
 */

import { describe, it, expect } from 'vitest';
import { sumStringAmounts, groupAndSumByCoin } from './index.js';

describe('sumStringAmounts', () => {
  it('should return "0" for empty array', () => {
    const result = sumStringAmounts([]);
    expect(result).toBe('0');
  });

  it('should return "0" for undefined', () => {
    const result = sumStringAmounts(undefined as any);
    expect(result).toBe('0');
  });

  it('should sum single item', () => {
    const result = sumStringAmounts([{ amount: '100' }]);
    expect(result).toBe('100');
  });

  it('should sum multiple items', () => {
    const result = sumStringAmounts([
      { amount: '100' },
      { amount: '200' },
      { amount: '300' },
    ]);
    expect(result).toBe('600');
  });

  it('should handle empty string amounts as 0', () => {
    const result = sumStringAmounts([
      { amount: '100' },
      { amount: '' },
      { amount: '200' },
    ]);
    expect(result).toBe('300');
  });

  it('should handle large numbers', () => {
    const result = sumStringAmounts([
      { amount: '1000000000000000000' },
      { amount: '2000000000000000000' },
    ]);
    expect(result).toBe('3000000000000000000');
  });
});

describe('groupAndSumByCoin', () => {
  it('should return empty object for empty array', () => {
    const result = groupAndSumByCoin([]);
    expect(result).toEqual({});
  });

  it('should group and sum by coin', () => {
    const result = groupAndSumByCoin([
      { coin: 'ETH', amount: '100' },
      { coin: 'ETH', amount: '200' },
      { coin: 'BTC', amount: '50' },
    ]);
    
    expect(result['ETH'].count).toBe(2);
    expect(result['ETH'].total).toBe('300');
    expect(result['BTC'].count).toBe(1);
    expect(result['BTC'].total).toBe('50');
  });

  it('should handle multiple coins', () => {
    const result = groupAndSumByCoin([
      { coin: 'ETH', amount: '100' },
      { coin: 'BTC', amount: '100' },
      { coin: 'SOL', amount: '100' },
      { coin: 'ETH', amount: '100' },
    ]);
    
    expect(Object.keys(result)).toHaveLength(3);
    expect(result['ETH'].count).toBe(2);
    expect(result['BTC'].count).toBe(1);
    expect(result['SOL'].count).toBe(1);
  });

  it('should handle empty amounts as 0', () => {
    const result = groupAndSumByCoin([
      { coin: 'ETH', amount: '' },
      { coin: 'ETH', amount: '100' },
    ]);
    
    expect(result['ETH'].total).toBe('100');
  });
});