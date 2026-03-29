/**
 * Testnet Operations API Routes
 * 
 * LEGITIMATE USE CASE: Manage authorized personas and automated test wallet funding
 * For QA, demo environments, education, and DevRel operations only.
 */

import { Router } from 'express';
import { z } from 'zod';
import { testnetOrchestrator, type TestnetChain, type Persona } from '../services/testnetOrchestrator.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// ============== VALIDATION SCHEMAS ==============

const createPersonaSchema = z.object({
  name: z.string().min(1).max(100),
  project: z.string().min(1).max(100),
  environment: z.enum(['qa', 'demo', 'development', 'education']),
  chains: z.array(z.enum(['sepolia', 'holesky', 'goerli', 'solana', 'bitcoin-testnet', 'bsc-testnet'])).min(1),
  walletAddress: z.string(),
  minBalance: z.string().default('0.01'),
  maxClaimsPerDay: z.number().min(1).max(100).default(10),
});

const fundWalletSchema = z.object({
  walletAddress: z.string(),
  chain: z.enum(['sepolia', 'holesky', 'goerli', 'solana', 'bitcoin-testnet', 'bsc-testnet']),
  amount: z.string().optional(),
});

// ============== ROUTES ==============

// GET /api/testnet/chains - Get supported testnet chains
router.get('/chains', asyncHandler(async (req, res) => {
  const chains = testnetOrchestrator.getSupportedChains();
  const chainConfigs = chains.map(chain => testnetOrchestrator.getChainConfig(chain));

  res.json({
    success: true,
    data: chainConfigs,
  });
}));

// GET /api/testnet/personas - Get all personas
router.get('/personas', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const project = req.query.project as string | undefined;
  const personas = await testnetOrchestrator.getPersonas(project);

  res.json({
    success: true,
    data: personas,
  });
}));

// POST /api/testnet/personas - Create a new persona (authorized test identity)
router.post('/personas', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  // Only allow admins to create personas
  // In production, add proper role check
  const data = createPersonaSchema.parse(req.body);

  const persona = await testnetOrchestrator.createPersona({
    name: data.name,
    project: data.project,
    environment: data.environment,
    chains: data.chains,
    walletAddress: data.walletAddress,
    minBalance: data.minBalance,
    maxClaimsPerDay: data.maxClaimsPerDay,
  });

  res.status(201).json({
    success: true,
    data: persona,
    message: `Created persona: ${persona.name}`,
  });
}));

// GET /api/testnet/balance/:chain/:address - Check wallet balance
router.get('/balance/:chain/:address', asyncHandler(async (req, res) => {
  const chainParam = req.params.chain;
  const addressParam = req.params.address;

  if (!chainParam || Array.isArray(chainParam)) {
    return res.status(400).json({ success: false, error: 'Invalid chain parameter' });
  }
  if (!addressParam || Array.isArray(addressParam)) {
    return res.status(400).json({ success: false, error: 'Invalid address parameter' });
  }

  const chain = chainParam as TestnetChain;
  const address = addressParam;

  const config = testnetOrchestrator.getChainConfig(chain);
  if (!config) {
    return res.status(400).json({ success: false, error: 'Unsupported chain' });
  }

  try {
    const balance = await testnetOrchestrator.getBalance(address, chain);

    res.json({
      success: true,
      data: {
        chain: config.name,
        address,
        balance,
        nativeSymbol: config.nativeSymbol,
        explorer: config.explorer,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get balance';
    res.status(500).json({ success: false, error: message });
  }
}));

// POST /api/testnet/fund - Fund a wallet manually
router.post('/fund', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const data = fundWalletSchema.parse(req.body);

  const amount = data.amount || testnetOrchestrator.getChainConfig(data.chain)?.nativeSymbol || '0.01';
  const result = await testnetOrchestrator.fundWallet(data.walletAddress, data.chain, amount);

  res.json({
    success: result.success,
    data: {
      chain: result.chain,
      amount: result.amount,
      txHash: result.txHash,
      explorer: result.txHash ? `${testnetOrchestrator.getChainConfig(data.chain)?.explorer}/tx/${result.txHash}` : null,
    },
    error: result.error,
  });
}));

// GET /api/testnet/status - Get orchestrator status
router.get('/status', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      ready: testnetOrchestrator.isReady(),
      supportedChains: testnetOrchestrator.getSupportedChains(),
      configuredChains: testnetOrchestrator.getSupportedChains().filter(
        chain => testnetOrchestrator.getChainConfig(chain)?.rpcUrl
      ),
    },
  });
}));

// POST /api/testnet/funding-cycle - Trigger a funding cycle (for testing/scheduling)
router.post('/funding-cycle', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  // Only allow admins or scheduled jobs
  const results = await testnetOrchestrator.runFundingCycle();

  res.json({
    success: true,
    data: {
      processed: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    },
  });
}));

export default router;