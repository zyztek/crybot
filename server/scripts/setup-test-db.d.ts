/**
 * Test Database Setup Script
 *
 * Sets up a clean PostgreSQL database for integration tests.
 * Usage: npx tsx scripts/setup-test-db.ts
 *
 * Environment variables:
 *   TEST_DATABASE_URL - Full connection string for test database (required)
 *   DATABASE_URL - Fallback connection string (used if TEST_DATABASE_URL not set)
 */
import { PrismaClient } from '@prisma/client';
interface SetupResult {
    success: boolean;
    error?: string;
    cleanup?: () => Promise<void>;
}
/**
 * Drop all tables to clean the database
 */
declare function cleanDatabase(prisma: PrismaClient): Promise<void>;
/**
 * Seed the database with test data
 */
declare function seedDatabase(prisma: PrismaClient): Promise<void>;
/**
 * Create test users with transactions and achievements for testing
 */
declare function createTestData(prisma: PrismaClient): Promise<{
    userIds: string[];
}>;
/**
 * Main setup function
 */
declare function setupTestDatabase(): Promise<SetupResult>;
export { setupTestDatabase, cleanDatabase, seedDatabase, createTestData };
//# sourceMappingURL=setup-test-db.d.ts.map