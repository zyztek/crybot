/**
 * App Configuration - Environment-based settings
 *
 * Provides centralized access to environment variables with sensible defaults
 */

import { getEnv } from '../utils/env';

// API Configuration
export const API_CONFIG = {
  baseUrl: getEnv('VITE_API_URL', 'http://localhost:3000/api'),
  timeout: parseInt(getEnv('VITE_API_TIMEOUT', '30000'), 10),
  retryAttempts: parseInt(getEnv('VITE_API_RETRY_ATTEMPTS', '3'), 10),
};

// Feature Flags
export const FEATURES = {
  analytics: getEnv('VITE_ENABLE_ANALYTICS', 'true') === 'true',
  referral: getEnv('VITE_ENABLE_REFERRAL', 'true') === 'true',
  leaderboard: getEnv('VITE_ENABLE_LEADERBOARD', 'true') === 'true',
  advancedAnalytics: getEnv('VITE_ENABLE_ADVANCED_ANALYTICS', 'true') === 'true',
};

// App Configuration
export const APP_CONFIG = {
  name: getEnv('VITE_APP_NAME', 'CryptoFaucet Hub'),
  version: getEnv('VITE_APP_VERSION', '1.0.0'),
  defaultNetwork: getEnv('VITE_DEFAULT_NETWORK', 'sepolia'),
  supportedNetworks: getEnv('VITE_SUPPORTED_NETWORKS', 'sepolia,mainnet,arbitrum,optimism').split(
    ','
  ),
};

// Network Configuration
export const NETWORK_CONFIG = {
  defaultNetwork: APP_CONFIG.defaultNetwork,
  supportedNetworks: APP_CONFIG.supportedNetworks,

  isSupported(network: string): boolean {
    return APP_CONFIG.supportedNetworks.includes(network);
  },

  getRpcUrl(network: string): string {
    const rpcUrls: Record<string, string> = {
      sepolia: 'https://rpc.sepolia.org',
      mainnet: 'https://eth.public-rpc.com',
      arbitrum: 'https://arb1.arbitrum.io/rpc',
      optimism: 'https://mainnet.optimism.io',
    };
    return rpcUrls[network] || rpcUrls.sepolia;
  },
};

// Export combined config object
export const config = {
  api: API_CONFIG,
  features: FEATURES,
  app: APP_CONFIG,
  network: NETWORK_CONFIG,
};

export default config;
