/**
 * Environment Variable Helper
 * 
 * Provides safe access to environment variables with type casting and defaults
 */

/**
 * Get an environment variable with a default value
 * @param key - The environment variable name
 * @param defaultValue - Default value if env var is not set
 * @returns The environment variable value or default
 */
export function getEnv(key: string, defaultValue: string): string {
  return import.meta.env[key] || defaultValue;
}

/**
 * Get a boolean environment variable
 * @param key - The environment variable name
 * @param defaultValue - Default value if env var is not set
 * @returns The boolean value of the env var
 */
export function getEnvBool(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined || value === null) return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Get a number environment variable
 * @param key - The environment variable name
 * @param defaultValue - Default value if env var is not set
 * @returns The number value of the env var
 */
export function getEnvNumber(key: string, defaultValue: number): number {
  const value = import.meta.env[key];
  if (value === undefined || value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Get an array environment variable (comma-separated)
 * @param key - The environment variable name
 * @param defaultValue - Default value if env var is not set
 * @returns The array value of the env var
 */
export function getEnvArray(key: string, defaultValue: string[] = []): string[] {
  const value = import.meta.env[key];
  if (value === undefined || value === null) return defaultValue;
  return value.split(',').map((v: string) => v.trim()).filter(Boolean);
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.MODE === 'production';
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}

/**
 * Check if running in test mode
 */
export function isTest(): boolean {
  return import.meta.env.MODE === 'test';
}