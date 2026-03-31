/**
 * Server Configuration - Centralized environment-based settings
 *
 * Provides type-safe access to environment variables with defaults
 */

// Helper to get env with type safety
const getEnv = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

const getEnvBool = (key: string, defaultValue: boolean = false): boolean => {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value === 'true' || value === '1';
};

// ============== SERVER CONFIG ==============
export const serverConfig = {
  port: getEnvNumber('PORT', 3000),
  nodeEnv: getEnv('NODE_ENV', 'development'),
  isDevelopment: () => getEnv('NODE_ENV', 'development') === 'development',
  isProduction: () => getEnv('NODE_ENV', 'development') === 'production',
  isTest: () => getEnv('NODE_ENV', 'development') === 'test',
};

// ============== DATABASE CONFIG ==============
export const databaseConfig = {
  url: getEnv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/crybot?schema=public'),
};

// ============== JWT CONFIG ==============
export const jwtConfig = {
  secret: getEnv('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production-min-32-chars'),
  expiresIn: '7d',
  refreshExpiresIn: '30d',
};

// ============== CORS CONFIG ==============
export const corsConfig = {
  origin: getEnv('CORS_ORIGIN', 'http://localhost:5173'),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// ============== RATE LIMIT CONFIG ==============
export const rateLimitConfig = {
  windowMs: getEnvNumber('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000), // 15 minutes
  maxRequests: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 100),
  authMaxAttempts: 10,
  faucetMaxClaims: 5,
  faucetWindowMs: 24 * 60 * 60 * 1000, // 24 hours
};

// ============== BLOCKCHAIN CONFIG ==============
export const blockchainConfig = {
  eth: {
    rpcUrl: getEnv('ETH_RPC_URL', 'https://eth.sepolia.org'),
    chainId: getEnvNumber('ETH_CHAIN_ID', 11155111),
  },
  sepolia: {
    rpcUrl: getEnv('SEPOLIA_RPC_URL', 'https://rpc.sepolia.org'),
  },
  goerli: {
    rpcUrl: getEnv('GOERLI_RPC_URL', 'https://rpc.goerli.ethereum.org'),
  },
  holesky: {
    rpcUrl: getEnv('HOLESKY_RPC_URL', 'https://rpc.holesky.ethereum.org'),
  },
  btc: {
    rpcUrl: getEnv('BTC_RPC_URL', ''),
    username: getEnv('BTC_USERNAME', ''),
    password: getEnv('BTC_PASSWORD', ''),
  },
  solana: {
    rpcUrl: getEnv('SOLANA_RPC_URL', 'https://api.devnet.solana.com'),
  },
  faucet: {
    privateKey: getEnv('FAUCET_PRIVATE_KEY', ''),
  },
};

// ============== APP CONFIG ==============
export const appConfig = {
  name: 'CryptoFaucet Hub',
  version: getEnv('npm_package_version', '1.0.0'),
  apiPrefix: '/api',
  websocketPath: '/ws',
};

// Export combined config
export const config = {
  server: serverConfig,
  database: databaseConfig,
  jwt: jwtConfig,
  cors: corsConfig,
  rateLimit: rateLimitConfig,
  blockchain: blockchainConfig,
  app: appConfig,
};

export default config;
