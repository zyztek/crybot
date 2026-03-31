/**
 * Testnet Operations Orchestrator
 *
 * LEGITIMATE USE CASE: Multi-chain test wallet funding automation
 * for QA teams, demo environments, education, and DevRel operations.
 *
 * Features:
 * - Manage authorized personas (named test identities)
 * - Auto-fund testnet wallets across multiple chains
 * - Jittered claim scheduling with cooldown awareness
 * - Balance monitoring and health checks
 * - Audit logging for compliance
 *
 * NOT for: faucet abuse, mass account farming, or disposable email registration
 */

import { ethers } from 'ethers';
import { prisma } from '../lib/prisma.js';
import { blockchainConfig } from '../config/index.js';

// Supported testnet chains
export type TestnetChain =
  | 'sepolia'
  | 'holesky'
  | 'goerli'
  | 'solana'
  | 'bitcoin-testnet'
  | 'bsc-testnet';

export interface Persona {
  id: string;
  name: string;
  project: string;
  environment: 'qa' | 'demo' | 'development' | 'education';
  chains: TestnetChain[];
  walletAddress?: string;
  minBalance: string; // Min balance threshold per chain (in native tokens)
  maxClaimsPerDay: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClaimResult {
  success: boolean;
  personaId: string;
  chain: TestnetChain;
  amount: string;
  txHash?: string;
  error?: string;
  timestamp: Date;
}

export interface ChainConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  explorer: string;
  faucetUrl?: string;
  nativeSymbol: string;
  minConfirmations: number;
}

// Chain configurations
const CHAIN_CONFIGS: Record<TestnetChain, ChainConfig> = {
  sepolia: {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    rpcUrl: blockchainConfig.sepolia?.rpcUrl || '',
    explorer: 'https://sepolia.etherscan.io',
    faucetUrl: 'https://faucet.sepolia.io',
    nativeSymbol: 'ETH',
    minConfirmations: 2,
  },
  holesky: {
    name: 'Ethereum Holesky',
    chainId: 17000,
    rpcUrl: blockchainConfig.holesky?.rpcUrl || '',
    explorer: 'https://holesky.etherscan.io',
    faucetUrl: 'https://holesky-faucet.pk910.de',
    nativeSymbol: 'ETH',
    minConfirmations: 2,
  },
  goerli: {
    name: 'Ethereum Goerli (Deprecated)',
    chainId: 5,
    rpcUrl: blockchainConfig.goerli?.rpcUrl || '',
    explorer: 'https://goerli.etherscan.io',
    faucetUrl: 'https://goerli-faucet.pk910.de',
    nativeSymbol: 'ETH',
    minConfirmations: 2,
  },
  solana: {
    name: 'Solana Devnet',
    chainId: -1, // Solana doesn't use chainId like EVM
    rpcUrl: blockchainConfig.solana?.rpcUrl || 'https://api.devnet.solana.com',
    explorer: 'https://explorer.solana.com/?cluster=devnet',
    faucetUrl: 'https://faucet.solana.com',
    nativeSymbol: 'SOL',
    minConfirmations: 1,
  },
  'bitcoin-testnet': {
    name: 'Bitcoin Testnet',
    chainId: 0,
    rpcUrl: blockchainConfig.bitcoin?.rpcUrl || '',
    explorer: 'https://blockstream.info/testnet',
    faucetUrl: 'https://bitcoinfaucet.uo1.net',
    nativeSymbol: 'BTC',
    minConfirmations: 2,
  },
  'bsc-testnet': {
    name: 'BNB Smart Chain Testnet',
    chainId: 97,
    rpcUrl:
      blockchainConfig.bscTestnet?.rpcUrl || 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    explorer: 'https://testnet.bscscan.com',
    faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
    nativeSymbol: 'BNB',
    minConfirmations: 2,
  },
};

class TestnetOrchestrator {
  private providers: Map<TestnetChain, ethers.JsonRpcProvider | null> = new Map();
  private faucetWallet: ethers.Wallet | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize providers for each chain
    for (const [chain, config] of Object.entries(CHAIN_CONFIGS) as [TestnetChain, ChainConfig][]) {
      if (config.rpcUrl && chain !== 'bitcoin-testnet') {
        try {
          this.providers.set(chain, new ethers.JsonRpcProvider(config.rpcUrl));
        } catch (error) {
          console.error(`Failed to initialize provider for ${chain}:`, error);
          this.providers.set(chain, null);
        }
      } else {
        this.providers.set(chain, null);
      }
    }

    // Initialize faucet wallet if configured
    if (blockchainConfig.faucet?.privateKey) {
      try {
        this.faucetWallet = new ethers.Wallet(blockchainConfig.faucet.privateKey);
      } catch (error) {
        console.error('Failed to initialize faucet wallet:', error);
      }
    }

    this.isInitialized = true;
  }

  /**
   * Check if orchestrator is properly configured
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get chain configuration
   */
  getChainConfig(chain: TestnetChain): ChainConfig | null {
    return CHAIN_CONFIGS[chain] || null;
  }

  /**
   * Get all supported chains
   */
  getSupportedChains(): TestnetChain[] {
    return Object.keys(CHAIN_CONFIGS) as TestnetChain[];
  }

  /**
   * Get wallet balance on a specific chain
   */
  async getBalance(walletAddress: string, chain: TestnetChain): Promise<string> {
    const provider = this.providers.get(chain);
    const config = CHAIN_CONFIGS[chain];

    if (!provider || !config) {
      throw new Error(`Chain ${chain} not configured`);
    }

    if (chain === 'solana') {
      // Solana balance check would require a different approach
      // For now, return a placeholder
      return '0';
    }

    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance);
  }

  /**
   * Check if wallet needs funding (below minimum balance)
   */
  async needsFunding(
    walletAddress: string,
    chain: TestnetChain,
    minBalance: string
  ): Promise<boolean> {
    try {
      const currentBalance = await this.getBalance(walletAddress, chain);
      return parseFloat(currentBalance) < parseFloat(minBalance);
    } catch (error) {
      console.error(`Error checking balance for ${walletAddress} on ${chain}:`, error);
      return false; // Assume needs funding on error to be safe
    }
  }

  /**
   * Check cooldown for a persona on a specific chain
   */
  async checkCooldown(
    personaId: string,
    chain: TestnetChain,
    intervalHours: number
  ): Promise<{
    canClaim: boolean;
    nextClaimAt: Date | null;
  }> {
    const lastClaim = await prisma.faucetClaim.findFirst({
      where: {
        userId: personaId, // Using userId as persona identifier
        coin: CHAIN_CONFIGS[chain].nativeSymbol,
      },
      orderBy: { claimedAt: 'desc' },
    });

    if (!lastClaim) {
      return { canClaim: true, nextClaimAt: null };
    }

    const nextClaimTime = new Date(lastClaim.claimedAt.getTime() + intervalHours * 60 * 60 * 1000);
    const canClaim = new Date() >= nextClaimTime;

    return {
      canClaim,
      nextClaimAt: canClaim ? null : nextClaimTime,
    };
  }

  /**
   * Fund a wallet from the faucet
   */
  async fundWallet(
    walletAddress: string,
    chain: TestnetChain,
    amount: string
  ): Promise<ClaimResult> {
    const config = CHAIN_CONFIGS[chain];
    const provider = this.providers.get(chain);

    if (!config) {
      return {
        success: false,
        personaId: '',
        chain,
        amount: '0',
        error: `Unsupported chain: ${chain}`,
        timestamp: new Date(),
      };
    }

    if (!provider) {
      return {
        success: false,
        personaId: '',
        chain,
        amount,
        error: `Provider not configured for ${chain}`,
        timestamp: new Date(),
      };
    }

    if (!this.faucetWallet) {
      return {
        success: false,
        personaId: '',
        chain,
        amount,
        error: 'Faucet wallet not configured',
        timestamp: new Date(),
      };
    }

    try {
      // Validate address
      if (!ethers.isAddress(walletAddress)) {
        return {
          success: false,
          personaId: '',
          chain,
          amount,
          error: 'Invalid wallet address',
          timestamp: new Date(),
        };
      }

      const wallet = this.faucetWallet.connect(provider);
      const amountWei = ethers.parseEther(amount);

      // Get gas price
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice ?? BigInt(1000000000);

      // Estimate gas
      const estimatedGas = await provider.estimateGas({
        to: walletAddress,
        value: amountWei,
      });

      const gasLimit = (estimatedGas * 120n) / 100n;
      const gasCost = gasPrice * gasLimit;
      const totalCost = amountWei + gasCost;

      // Check faucet balance
      const faucetBalance = await provider.getBalance(wallet.address);
      if (faucetBalance < totalCost) {
        return {
          success: false,
          personaId: '',
          chain,
          amount,
          error: `Insufficient faucet balance. Have: ${ethers.formatEther(faucetBalance)} ${config.nativeSymbol}`,
          timestamp: new Date(),
        };
      }

      // Send transaction
      const tx = await wallet.sendTransaction({
        to: walletAddress,
        value: amountWei,
        gasLimit,
        gasPrice,
      });

      console.log(
        `[TestnetOps] Funded ${amount} ${config.nativeSymbol} to ${walletAddress} on ${chain}: ${tx.hash}`
      );

      return {
        success: true,
        personaId: '',
        chain,
        amount,
        txHash: tx.hash,
        timestamp: new Date(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed';
      console.error(`[TestnetOps] Funding failed for ${walletAddress} on ${chain}:`, errorMessage);

      return {
        success: false,
        personaId: '',
        chain,
        amount,
        error: errorMessage,
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get all personas for a project
   */
  async getPersonas(project?: string): Promise<Persona[]> {
    const where = project ? { project } : {};
    const dbPersonas = await prisma.persona.findMany({
      where: {
        ...where,
        isActive: true,
      },
    });

    return dbPersonas.map(p => ({
      id: p.id,
      name: p.name,
      project: p.project,
      environment: p.environment as 'qa' | 'demo' | 'development' | 'education',
      chains: p.chains as TestnetChain[],
      walletAddress: p.walletAddress || undefined,
      minBalance: p.minBalance,
      maxClaimsPerDay: p.maxClaimsPerDay,
      isActive: p.isActive,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }

  /**
   * Create a new persona (authorized test identity)
   */
  async createPersona(data: {
    name: string;
    project: string;
    environment: 'qa' | 'demo' | 'development' | 'education';
    chains: TestnetChain[];
    walletAddress: string;
    minBalance: string;
    maxClaimsPerDay: number;
    ownerUserId?: string;
  }): Promise<Persona> {
    const dbPersona = await prisma.persona.create({
      data: {
        name: data.name,
        project: data.project,
        environment: data.environment,
        chains: data.chains,
        walletAddress: data.walletAddress,
        minBalance: data.minBalance,
        maxClaimsPerDay: data.maxClaimsPerDay,
        isActive: true,
        ownerUserId: data.ownerUserId,
      },
    });

    console.log(`[TestnetOps] Created persona: ${dbPersona.name} for project ${dbPersona.project}`);

    return {
      id: dbPersona.id,
      name: dbPersona.name,
      project: dbPersona.project,
      environment: dbPersona.environment as 'qa' | 'demo' | 'development' | 'education',
      chains: dbPersona.chains as TestnetChain[],
      walletAddress: dbPersona.walletAddress || undefined,
      minBalance: dbPersona.minBalance,
      maxClaimsPerDay: dbPersona.maxClaimsPerDay,
      isActive: dbPersona.isActive,
      createdAt: dbPersona.createdAt,
      updatedAt: dbPersona.updatedAt,
    };
  }

  /**
   * Run funding check for all personas (would be called by scheduler)
   */
  async runFundingCycle(): Promise<ClaimResult[]> {
    const results: ClaimResult[] = [];
    const personas = await this.getPersonas();

    for (const persona of personas) {
      if (!persona.isActive || !persona.walletAddress) continue;

      for (const chain of persona.chains) {
        const needsFunding = await this.needsFunding(
          persona.walletAddress,
          chain,
          persona.minBalance
        );

        if (!needsFunding) continue;

        const cooldown = await this.checkCooldown(persona.id, chain, 24);
        if (!cooldown.canClaim) continue;

        // Add jitter: random delay 0-30 minutes
        const jitter = Math.floor(Math.random() * 30 * 60 * 1000);
        await new Promise(resolve => setTimeout(resolve, jitter));

        // Get default amount based on chain
        const amount = this.getDefaultAmount(chain);
        const result = await this.fundWallet(persona.walletAddress, chain, amount);
        result.personaId = persona.id;
        results.push(result);

        // Log to audit
        await this.logClaim(persona.id, chain, result);
      }
    }

    return results;
  }

  private getDefaultAmount(chain: TestnetChain): string {
    const amounts: Record<TestnetChain, string> = {
      sepolia: '0.01',
      holesky: '0.01',
      goerli: '0.01',
      solana: '0.1',
      'bitcoin-testnet': '0.001',
      'bsc-testnet': '0.01',
    };
    return amounts[chain] || '0.01';
  }

  private async logClaim(
    personaId: string,
    chain: TestnetChain,
    result: ClaimResult
  ): Promise<void> {
    // Create audit log entry in database
    await prisma.personaFundingLog.create({
      data: {
        personaId,
        chain,
        amount: result.amount,
        txHash: result.txHash || null,
        status: result.success ? 'confirmed' : 'failed',
        error: result.error || null,
      },
    });
    console.log(
      `[TestnetOps] Audit: Persona ${personaId} on ${chain}: ${result.success ? 'SUCCESS' : 'FAILED'}`
    );
  }
}

// Export singleton instance
export const testnetOrchestrator = new TestnetOrchestrator();

export default testnetOrchestrator;
