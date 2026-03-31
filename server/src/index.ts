/**
 * CryptoFaucet Hub - Backend API Server
 *
 * Main entry point for the Express API server
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { WebSocketServer } from 'ws';

import { prisma } from './lib/prisma.js';
import { errorHandler, notFoundHandler, asyncHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import walletRoutes from './routes/wallet.js';
import faucetRoutes from './routes/faucet.js';
import transactionRoutes from './routes/transaction.js';
import achievementRoutes from './routes/achievement.js';
import analyticsRoutes from './routes/analytics.js';
import leaderboardRoutes from './routes/leaderboard.js';
import testnetOpsRoutes from './routes/testnetOps.js';

// WebSocket handler
import { setupWebSocket } from './websocket/index.js';

// GraphQL handler
import { graphqlHandler } from './graphql/index.js';

// Config
import { serverConfig, corsConfig, rateLimitConfig } from './config/index.js';

const { port: PORT, nodeEnv: NODE_ENV } = serverConfig;

// Create Express app - export for testing
export const app = express();

// Export server variable for testing
let server: ReturnType<typeof app.listen> | null = null;

// ============== MIDDLEWARE ==============

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

// CORS configuration
app.use(cors(corsConfig));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request logging
app.use(requestLogger);

// ============== RATE LIMITING ==============

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.maxRequests,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: rateLimitConfig.windowMs,
  max: rateLimitConfig.authMaxAttempts,
  message: { error: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Faucet claim rate limit
const faucetLimiter = rateLimit({
  windowMs: rateLimitConfig.faucetWindowMs,
  max: rateLimitConfig.faucetMaxClaims,
  message: { error: 'Daily faucet claim limit reached.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);
app.use('/api/faucet/claim', faucetLimiter);

// ============== HEALTH CHECK ==============

// Basic health check (no DB)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Deep health check (with DB connectivity)
app.get(
  '/health/ready',
  asyncHandler(async (req, res) => {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        database: 'connected',
        api: 'ready',
      },
    });
  })
);

// Liveness check (for Kubernetes/Docker)
app.get('/health/live', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'CryptoFaucet Hub API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// ============== API ROUTES ==============

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/faucet', faucetRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/achievement', achievementRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/testnet', testnetOpsRoutes);

// ============== GRAPHQL ==============

app.use(graphqlHandler);

// ============== ERROR HANDLING ==============

app.use(notFoundHandler);
app.use(errorHandler);

// ============== START SERVER ==============

// Only start server if not in test mode (allows integration tests to import app without port conflict)
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║         CryptoFaucet Hub API Server                       ║
╠═══════════════════════════════════════════════════════════╣
║  Environment: ${NODE_ENV.padEnd(43)}║
║  Port: ${PORT.toString().padEnd(49)}║
║  Database: ${NODE_ENV === 'development' ? 'PostgreSQL (local)' : 'PostgreSQL (production)'.padEnd(35)}║
╚═══════════════════════════════════════════════════════════╝
    `);
  });

  // Setup WebSocket
  const wss = new WebSocketServer({ server, path: '/ws' });
  setupWebSocket(wss);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await prisma.$disconnect();
    server?.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    await prisma.$disconnect();
    server?.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

// Export for testing
export default app;
export { server };
export function startServer() {
  if (server) return server;
  server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  return server;
}
