/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: number;
  readonly VITE_API_RETRY_ATTEMPTS: number;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: boolean;
  readonly VITE_ENABLE_REFERRAL: boolean;
  readonly VITE_ENABLE_LEADERBOARD: boolean;
  readonly VITE_ENABLE_ADVANCED_ANALYTICS: boolean;

  // App Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEFAULT_NETWORK: string;
  readonly VITE_SUPPORTED_NETWORKS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
