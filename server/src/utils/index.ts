/**
 * Utility Functions
 * Shared helper functions used across the application
 */

/**
 * Sum an array of transaction amounts (stored as strings in the database)
 * Uses BigInt for precision with crypto amounts
 *
 * @param items - Array of objects with an amount property
 * @returns Sum of all amounts as a string
 */
export function sumStringAmounts<T extends { amount: string }>(items: T[]): string {
  if (!items || items.length === 0) {
    return '0';
  }
  return items.reduce((sum, t) => sum + BigInt(t.amount || '0'), 0n).toString();
}

/**
 * Group amounts by coin and sum them
 * Returns a map of coin -> { count, total }
 *
 * @param items - Array of objects with coin and amount properties
 * @returns Map of coin to aggregated statistics
 */
export function groupAndSumByCoin<T extends { coin: string; amount: string }>(
  items: T[]
): Record<string, { count: number; total: string }> {
  const result = items.reduce(
    (acc, item) => {
      if (!acc[item.coin]) {
        acc[item.coin] = { count: 0, total: '0' };
      }
      acc[item.coin].count++;
      acc[item.coin].total = (BigInt(acc[item.coin].total) + BigInt(item.amount || '0')).toString();
      return acc;
    },
    {} as Record<string, { count: number; total: string }>
  );

  return result;
}
