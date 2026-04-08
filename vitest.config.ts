import { defineConfig } from 'vitest/config';
import path from 'path';
import os from 'os';

export default defineConfig({
  test: {
    setupFiles: ['./src/test/vitest-setup.ts'],
    environment: 'jsdom',
    globals: true,
    // Parallel execution - use 50% of available CPUs, max 8
    parallelism: Math.min(8, Math.floor(os.cpus().length * 0.5)),
    // Keep isolation enabled to prevent test pollution
    isolate: true,
    // Enable file caching for faster subsequent runs
    cache: true,
    cacheDir: '.vitest-cache',
    // Exclude e2e, integration tests, and node_modules from vitest
    exclude: [
      '**/e2e/**', 
      '**/server/**/api.integration.test.ts', 
      '**/server/dist/**/api.integration.test.js',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
