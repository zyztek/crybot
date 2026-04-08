/**
 * useFaucetClaim Hook - Handles faucet claiming logic
 * 
 * Manages:
 * - API-based faucet claims
 * - Store updates after successful claims
 */

import { useCallback } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { useApi } from './useApi';
import type { Faucet } from '@/types';

export const useFaucetClaim = () => {
  const store = useCryptoStore();
  const { claimFaucet: apiClaimFaucet } = useApi();

  // Handle faucet claim - converts to match ContentArea's expected signature
  const handleClaimFaucet = useCallback(
    async (faucet: Faucet) => {
      try {
        const result = await apiClaimFaucet(faucet.coin);
        if (result.success) {
          // Update local state via store
          store.claimFaucet(faucet);
          return { success: true };
        }
        return { success: false, error: result.error };
      } catch (err) {
        return { success: false, error: 'Failed to claim faucet' };
      }
    },
    [store, apiClaimFaucet]
  );

  return {
    handleClaimFaucet,
  };
};

export default useFaucetClaim;