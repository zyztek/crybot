/**
 * Ethereum Faucet Service
 *
 * Real Ethereum testnet faucet integration with automatic claiming
 * Supports Sepolia, Goerli, and Holesky testnets
 */

import { ethers } from 'ethers';
import { blockchainConfig } from '../config/index.js';

// Configuration for different testnets
const TESTNET_CONFIGS = {
  sepolia: {
    name: 'Sepolia',
    chainId: 11155111,
    rpcUrl: blockchainConfig.sepolia.rpcUrl,
    explorer: 'https://sepolia.etherscan.io',
    minConfirmations: 2,
  },
  goerli: {
    name: 'Goerli',
    chainId: 5,
    rpcUrl: blockchainConfig.goerli.rpcUrl,
    explorer: 'https://goerli.etherscan.io',
    minConfirmations: 2,
  },
  holesky: {
    name: 'Holesky',
    chainId: 17000,
    rpcUrl: blockchainConfig.holesky.rpcUrl,
    explorer: 'https://holesky.etherscan.io',
    minConfirmations: 2,
  },
};

export type TestnetType = 'sepolia' | 'goerli' | 'holesky';

interface FaucetClaimResult {
  success: boolean;
  txHash?: string;
  amount?: string;
  error?: string;
  explorerUrl?: string;
}

interface FaucetWallet {
  privateKey: string;
  address: string;
}

export class EthereumFaucetService {
  private provider: ethers.JsonRpcProvider | null = null;
  private faucetWallet: FaucetWallet | null = null;
  private network: TestnetType;
  private config: typeof TESTNET_CONFIGS.sepolia;

  constructor(network: TestnetType = 'sepolia') {
    this.network = network;
    this.config = TESTNET_CONFIGS[network];

    // Initialize provider if RPC URL is configured
    if (this.config.rpcUrl) {
      this.provider = new ethers.JsonRpcProvider(this.config.rpcUrl);
    }

    // Initialize faucet wallet if private key is configured
    if (blockchainConfig.faucet.privateKey) {
      this.faucetWallet = {
        privateKey: blockchainConfig.faucet.privateKey,
        address: new ethers.Wallet(blockchainConfig.faucet.privateKey).address,
      };
    }
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return this.provider !== null && this.faucetWallet !== null;
  }

  /**
   * Get the current network configuration
   */
  getNetworkConfig() {
    return this.config;
  }

  /**
   * Get faucet wallet address
   */
  getFaucetAddress(): string | null {
    return this.faucetWallet?.address || null;
  }

  /**
   * Get the provider's chain ID
   */
  async getChainId(): Promise<number | null> {
    if (!this.provider) return null;
    const chainId = (await this.provider.getNetwork()).chainId;
    // Convert bigint to number safely (chain IDs fit in safe integer range)
    return Number(chainId);
  }

  /**
   * Get balance of the faucet wallet
   */
  async getFaucetBalance(): Promise<string> {
    if (!this.provider || !this.faucetWallet) {
      throw new Error('Faucet service not configured');
    }

    const balance = await this.provider.getBalance(this.faucetWallet.address);
    return ethers.formatEther(balance);
  }

  /**
   * Send ETH from faucet wallet to a recipient
   */
  async sendEth(toAddress: string, amountEth: string): Promise<FaucetClaimResult> {
    if (!this.provider || !this.faucetWallet) {
      return {
        success: false,
        error: 'Faucet service not configured. Please set FAUCET_PRIVATE_KEY and RPC URL.',
      };
    }

    try {
      // Validate address
      if (!ethers.isAddress(toAddress)) {
        return {
          success: false,
          error: 'Invalid recipient address',
        };
      }

      // Create wallet instance
      const wallet = new ethers.Wallet(this.faucetWallet.privateKey, this.provider);

      // Get current gas price
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice ?? BigInt(1000000000); // 1 gwei fallback

      // Parse amount
      const amount = ethers.parseEther(amountEth);

      // Estimate gas
      const estimatedGas = await this.provider.estimateGas({
        to: toAddress,
        value: amount,
      });

      // Add 20% buffer to gas estimate
      const gasLimitBigInt = (estimatedGas * 120n) / 100n;
      const gasLimit = gasLimitBigInt;

      // Calculate total cost
      const gasCost = gasPrice * gasLimitBigInt;
      const totalCost = amount + gasCost;

      // Check if faucet has enough balance
      const faucetBalance = await this.provider.getBalance(this.faucetWallet.address);
      if (faucetBalance < totalCost) {
        return {
          success: false,
          error: `Insufficient faucet balance. Have: ${ethers.formatEther(faucetBalance)} ETH, Need: ${ethers.formatEther(totalCost)} ETH`,
        };
      }

      // Send transaction
      const tx = await wallet.sendTransaction({
        to: toAddress,
        value: amount,
        gasLimit: gasLimit,
        gasPrice,
      });

      console.log(`Faucet transaction sent: ${tx.hash}`);

      // Wait for confirmation
      const receipt = await tx.wait(this.config.minConfirmations);

      return {
        success: true,
        txHash: receipt.hash,
        amount: amountEth,
        explorerUrl: `${this.config.explorer}/tx/${receipt.hash}`,
      };
    } catch (error) {
      console.error('Faucet transaction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      };
    }
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(
    txHash: string
  ): Promise<{ confirmed: boolean; blockNumber?: number; logs?: unknown }> {
    if (!this.provider) {
      throw new Error('Provider not configured');
    }

    const receipt = await this.provider.getTransactionReceipt(txHash);

    if (!receipt) {
      return { confirmed: false };
    }

    const rawConfirmations = receipt?.confirmations;
    const confirmations = typeof rawConfirmations === 'number' ? rawConfirmations : 0;
    return {
      confirmed: confirmations >= this.config.minConfirmations,
      blockNumber: receipt?.blockNumber,
      logs: receipt?.logs,
    };
  }

  /**
   * Get current gas price in Gwei
   */
  async getGasPrice(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not configured');
    }

    const feeData = await this.provider.getFeeData();
    const gp = feeData.gasPrice ?? BigInt(0);
    return ethers.formatUnits(gp, 'gwei');
  }

  /**
   * Estimate transaction cost
   */
  async estimateTransactionCost(): Promise<{ gasPrice: string; estimatedCost: string }> {
    if (!this.provider) {
      throw new Error('Provider not configured');
    }

    const feeData = await this.provider.getFeeData();
    const gasPrice = feeData.gasPrice ?? BigInt(20000000000); // 20 gwei fallback
    const gasLimit = 21000; // Standard ETH transfer

    const estimatedCost = gasPrice * BigInt(gasLimit);

    return {
      gasPrice: ethers.formatUnits(gasPrice, 'gwei'),
      estimatedCost: ethers.formatEther(estimatedCost),
    };
  }
}

// Export singleton instances for each network
export const sepoliaFaucet = new EthereumFaucetService('sepolia');
export const goerliFaucet = new EthereumFaucetService('goerli');
export const holeskyFaucet = new EthereumFaucetService('holesky');

// Default export
export default {
  sepolia: sepoliaFaucet,
  goerli: goerliFaucet,
  holesky: holeskyFaucet,
  getFaucet: (network: TestnetType) => {
    switch (network) {
      case 'sepolia':
        return sepoliaFaucet;
      case 'goerli':
        return goerliFaucet;
      case 'holesky':
        return holeskyFaucet;
      default:
        return sepoliaFaucet;
    }
  },
};
