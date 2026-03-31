/**
 * Testnet Funding Scheduler
 *
 * LEGITIMATE USE CASE: Automated test wallet funding for authorized personas
 * Runs on a schedule to maintain minimum balances across testnet chains
 *
 * This scheduler:
 * - Runs every N minutes to check wallet balances
 * - Funds wallets that are below minimum balance threshold
 * - Respects cooldown periods between claims
 * - Adds random jitter to avoid detection patterns
 * - Logs all operations for audit trail
 */

import { testnetOrchestrator } from './testnetOrchestrator.js';

export interface SchedulerConfig {
  intervalMs: number; // How often to run (default: 5 minutes)
  minBalance: string; // Minimum balance threshold
  maxClaimsPerCycle: number; // Max claims per funding cycle
  jitterMs: number; // Random jitter to add (0-30 minutes)
}

const DEFAULT_CONFIG: SchedulerConfig = {
  intervalMs: 5 * 60 * 1000, // 5 minutes
  minBalance: '0.005', // 0.005 ETH minimum
  maxClaimsPerCycle: 10, // Max 10 claims per cycle
  jitterMs: 30 * 60 * 1000, // 0-30 minutes jitter
};

class TestnetScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private config: SchedulerConfig;
  private isRunning = false;
  private lastRun: Date | null = null;
  private totalRuns = 0;
  private totalFunded = 0;

  constructor(config: Partial<SchedulerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Start the scheduler
   */
  start(): void {
    if (this.isRunning) {
      console.log('[Scheduler] Already running');
      return;
    }

    console.log(
      `[Scheduler] Starting testnet funding scheduler (interval: ${this.config.intervalMs}ms)`
    );
    this.isRunning = true;

    // Run immediately on start
    this.runCycle();

    // Then run on interval
    this.intervalId = setInterval(() => {
      this.runCycle();
    }, this.config.intervalMs);
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('[Scheduler] Stopped');
  }

  /**
   * Run a funding cycle
   */
  private async runCycle(): Promise<void> {
    this.totalRuns++;
    this.lastRun = new Date();

    console.log(
      `[Scheduler] Running funding cycle #${this.totalRuns} at ${this.lastRun.toISOString()}`
    );

    if (!testnetOrchestrator.isReady()) {
      console.log('[Scheduler] Orchestrator not ready, skipping cycle');
      return;
    }

    try {
      // Get all personas
      const personas = await testnetOrchestrator.getPersonas();

      if (personas.length === 0) {
        console.log('[Scheduler] No personas configured, skipping cycle');
        return;
      }

      let fundedThisCycle = 0;

      for (const persona of personas) {
        if (fundedThisCycle >= this.config.maxClaimsPerCycle) {
          console.log('[Scheduler] Max claims per cycle reached');
          break;
        }

        if (!persona.isActive || !persona.walletAddress) {
          continue;
        }

        // Check each chain the persona is configured for
        for (const chain of persona.chains) {
          if (fundedThisCycle >= this.config.maxClaimsPerCycle) break;

          // Check if funding is needed
          const needsFunding = await testnetOrchestrator.needsFunding(
            persona.walletAddress,
            chain,
            this.config.minBalance
          );

          if (!needsFunding) {
            continue;
          }

          // Check cooldown
          const cooldown = await testnetOrchestrator.checkCooldown(persona.id, chain, 24);
          if (!cooldown.canClaim) {
            console.log(
              `[Scheduler] ${persona.name} on ${chain}: cooldown active until ${cooldown.nextClaimAt}`
            );
            continue;
          }

          // Add jitter (0-30 minutes random delay)
          const jitter = Math.floor(Math.random() * this.config.jitterMs);
          await new Promise(resolve => setTimeout(resolve, jitter));

          // Get default amount for chain
          const amount = this.getDefaultAmount(chain);

          // Fund the wallet
          const result = await testnetOrchestrator.fundWallet(persona.walletAddress, chain, amount);

          if (result.success) {
            fundedThisCycle++;
            this.totalFunded++;
            console.log(
              `[Scheduler] ✅ Funded ${persona.name}: ${amount} ${chain} (tx: ${result.txHash})`
            );
          } else {
            console.log(
              `[Scheduler] ❌ Failed to fund ${persona.name} on ${chain}: ${result.error}`
            );
          }
        }
      }

      console.log(
        `[Scheduler] Cycle #${this.totalRuns} complete: ${fundedThisCycle} wallets funded`
      );
    } catch (error) {
      console.error('[Scheduler] Error during funding cycle:', error);
    }
  }

  private getDefaultAmount(chain: string): string {
    const amounts: Record<string, string> = {
      sepolia: '0.01',
      holesky: '0.01',
      goerli: '0.01',
      solana: '0.1',
      'bitcoin-testnet': '0.001',
      'bsc-testnet': '0.01',
    };
    return amounts[chain] || '0.01';
  }

  /**
   * Get scheduler status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun?.toISOString() || null,
      totalRuns: this.totalRuns,
      totalFunded: this.totalFunded,
      config: this.config,
    };
  }

  /**
   * Manually trigger a funding cycle
   */
  async triggerManualCycle(): Promise<{ success: boolean; funded: number; message: string }> {
    if (!this.isRunning) {
      // Run a single cycle if scheduler isn't running
      await this.runCycle();
      return { success: true, funded: this.totalFunded, message: 'Manual cycle completed' };
    }

    // If scheduler is running, just trigger it
    return { success: true, funded: 0, message: 'Cycle already scheduled' };
  }
}

// Export singleton
export const testnetScheduler = new TestnetScheduler();

export default testnetScheduler;
