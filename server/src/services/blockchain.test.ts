/**
 * Blockchain Service Tests
 *
 * Unit tests for server/src/services/blockchain.ts
 * Testing blockchain service operations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EthereumService, BitcoinService, SolanaService } from './blockchain.js';

// Mock config
vi.mock('../config/index.js', () => ({
  blockchainConfig: {
    eth: { rpcUrl: 'https://eth.sepolia.org', chainId: 11155111 },
    btc: { rpcUrl: 'http://localhost:8332', username: 'user', password: 'pass' },
    solana: { rpcUrl: 'https://api.devnet.solana.com' },
  },
}));

describe('EthereumService', () => {
  let service: EthereumService;

  beforeEach(() => {
    service = new EthereumService();
  });

  describe('constructor', () => {
    it('should create instance without provider when no RPC URL provided', () => {
      const svc = new EthereumService();
      expect(svc).toBeDefined();
    });

    it('should create instance with provider when RPC URL provided', () => {
      const svc = new EthereumService('https://eth.sepolia.org');
      expect(svc).toBeDefined();
    });
  });

  describe('getBalance', () => {
    it('should throw error when provider not configured', async () => {
      await expect(service.getBalance('0x123')).rejects.toThrow('Ethereum provider not configured');
    });
  });

  describe('sendTransaction', () => {
    it('should throw error when provider not configured', async () => {
      await expect(
        service.sendTransaction('0xprivatekey', '0xreceiver', '1000000000000000000')
      ).rejects.toThrow('Ethereum provider not configured');
    });
  });

  describe('getTransactionReceipt', () => {
    it('should throw error when provider not configured', async () => {
      await expect(service.getTransactionReceipt('0xtxhash')).rejects.toThrow(
        'Ethereum provider not configured'
      );
    });
  });

  describe('getGasPrice', () => {
    it('should throw error when provider not configured', async () => {
      await expect(service.getGasPrice()).rejects.toThrow('Ethereum provider not configured');
    });
  });

  describe('estimateGas', () => {
    it('should throw error when provider not configured', async () => {
      await expect(service.estimateGas('0xreceiver', '1000')).rejects.toThrow(
        'Ethereum provider not configured'
      );
    });
  });
});

describe('BitcoinService', () => {
  let service: BitcoinService;

  beforeEach(() => {
    service = new BitcoinService();
  });

  describe('constructor', () => {
    it('should create instance without config', () => {
      const svc = new BitcoinService();
      expect(svc).toBeDefined();
    });

    it('should create instance with config', () => {
      const svc = new BitcoinService('http://localhost:8332', 'user', 'pass');
      expect(svc).toBeDefined();
    });
  });

  describe('getBalance', () => {
    it('should throw error when RPC not configured', async () => {
      await expect(service.getBalance('bc1qxyz')).rejects.toThrow('Bitcoin RPC not configured');
    });
  });

  describe('sendTransaction', () => {
    it('should throw error when RPC not configured', async () => {
      await expect(service.sendTransaction('from', 'to', '1000')).rejects.toThrow(
        'Bitcoin RPC not configured'
      );
    });
  });

  describe('getTransaction', () => {
    it('should throw error when RPC not configured', async () => {
      await expect(service.getTransaction('txhash')).rejects.toThrow('Bitcoin RPC not configured');
    });
  });
});

describe('SolanaService', () => {
  let service: SolanaService;

  beforeEach(() => {
    service = new SolanaService();
  });

  describe('constructor', () => {
    it('should create instance without config', () => {
      const svc = new SolanaService();
      expect(svc).toBeDefined();
    });

    it('should create instance with RPC URL', () => {
      const svc = new SolanaService('https://api.devnet.solana.com');
      expect(svc).toBeDefined();
    });
  });

  describe('getBalance', () => {
    it('should throw error when RPC not configured', async () => {
      await expect(service.getBalance('GhQvfWzpFeLPEaEGjtGv2GwpV5JvYqkQ')).rejects.toThrow(
        'Solana RPC not configured'
      );
    });
  });

  describe('getTokenBalance', () => {
    it('should throw error when RPC not configured', async () => {
      await expect(
        service.getTokenBalance('GhQvfWzpFeLPEaEGjtGv2GwpV5JvYqkQ', 'mintaddress')
      ).rejects.toThrow('Solana RPC not configured');
    });
  });
});
