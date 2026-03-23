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
import { execSync } from 'child_process';
const TEST_DB_NAME = 'crybot_test';
/**
 * Extract database name from connection string
 */
function getDbName(connectionString) {
    try {
        const url = new URL(connectionString);
        const path = url.pathname.replace('/', '');
        return path.split('?')[0];
    }
    catch {
        return TEST_DB_NAME;
    }
}
/**
 * Validate connection string format
 */
function validateConnectionString(connectionString) {
    try {
        const url = new URL(connectionString);
        // Check required parts
        const validProtocols = ['postgresql:', 'postgres:'];
        if (!validProtocols.includes(url.protocol)) {
            return { valid: false, error: 'Connection string must use postgresql:// or postgres:// protocol' };
        }
        if (!url.hostname) {
            return { valid: false, error: 'Connection string must include hostname' };
        }
        return { valid: true };
    }
    catch (error) {
        return {
            valid: false,
            error: `Invalid connection string format: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
/**
 * Test database connection
 */
async function testConnection(prisma) {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return { success: true };
    }
    catch (error) {
        const dbError = error;
        // Provide more helpful error messages
        if (dbError.code === 'ECONNREFUSED') {
            return { success: false, error: 'Connection refused - is PostgreSQL running?' };
        }
        if (dbError.code === '28P01') {
            return { success: false, error: 'Authentication failed - check username and password' };
        }
        if (dbError.code === '3D000') {
            return { success: false, error: `Database does not exist. Create it first or ensure user has CREATE privilege.` };
        }
        return { success: false, error: dbError.message || 'Failed to connect to database' };
    }
}
/**
 * Create a new database if it doesn't exist
 */
async function createDatabase(connectionString) {
    const dbName = getDbName(connectionString);
    // Validate connection string first
    const validation = validateConnectionString(connectionString);
    if (!validation.valid) {
        return { success: false, error: validation.error };
    }
    // Create connection string without database name for admin connection
    let adminConnectionString = connectionString;
    try {
        const url = new URL(connectionString);
        url.pathname = '/postgres';
        adminConnectionString = url.toString();
    }
    catch (error) {
        return { success: false, error: 'Invalid connection string format' };
    }
    // Use a separate PrismaClient for admin operations
    const adminPrisma = new PrismaClient({
        datasources: {
            db: {
                url: adminConnectionString,
            },
        },
        log: ['error'],
    });
    try {
        // Test admin connection first
        console.log(`🔗 Testing connection to PostgreSQL server...`);
        const connTest = await testConnection(adminPrisma);
        if (!connTest.success) {
            return { success: false, error: `Cannot connect to PostgreSQL: ${connTest.error}` };
        }
        console.log(`✓ Connected to PostgreSQL server`);
        // Try to create the database (will fail if already exists - that's OK)
        console.log(`📦 Creating database: ${dbName}...`);
        await adminPrisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);
        console.log(`✓ Created database: ${dbName}`);
        return { success: true };
    }
    catch (error) {
        const dbError = error;
        const errorMessage = dbError.message || 'Unknown error';
        // Handle specific errors
        if (errorMessage.includes('already exists')) {
            console.log(`ℹ Database already exists: ${dbName}`);
            return { success: true };
        }
        // Permission denied - user doesn't have CREATE privilege
        if (dbError.code === '42501' || errorMessage.includes('permission denied')) {
            return {
                success: false,
                error: `Permission denied to create database. Either: (1) Grant CREATE privilege to user, (2) Create database manually as superuser, or (3) Use an existing database.`
            };
        }
        // Database server not running
        if (dbError.code === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED')) {
            return { success: false, error: 'Cannot connect to PostgreSQL server. Is it running?' };
        }
        console.error('Failed to create database:', errorMessage);
        return { success: false, error: `Failed to create database: ${errorMessage}` };
    }
    finally {
        await adminPrisma.$disconnect();
    }
}
/**
 * Drop all tables to clean the database
 */
async function cleanDatabase(prisma) {
    console.log('🧹 Cleaning database tables...');
    // Disable foreign key checks temporarily
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);
    // Drop all tables (in correct order due to foreign keys)
    const tables = [
        'user_achievements',
        'daily_stats',
        'leaderboard',
        'faucet_claims',
        'faucets',
        'transactions',
        'wallets',
        'sessions',
        'users',
    ];
    for (const table of tables) {
        try {
            await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "${table}" CASCADE`);
        }
        catch (error) {
            // Table might not exist, continue but log warning
            console.warn(`⚠ Warning: Could not drop table "${table}":`, error instanceof Error ? error.message : 'Unknown');
        }
    }
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);
    console.log('✓ Database cleaned');
}
/**
 * Run Prisma migrations
 */
async function runMigrations(dbUrl) {
    console.log('📦 Running migrations...');
    try {
        // Run migrate deploy for test environment (non-interactive)
        execSync('npx prisma migrate deploy', {
            cwd: process.cwd(),
            stdio: 'inherit',
            env: { ...process.env, DATABASE_URL: dbUrl },
        });
        console.log('✓ Migrations completed');
        return true;
    }
    catch (error) {
        console.error('Migration failed. Trying db push instead...');
        try {
            execSync('npx prisma db push --skip-generate', {
                cwd: process.cwd(),
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: dbUrl },
            });
            console.log('✓ Schema pushed successfully');
            return true;
        }
        catch (pushError) {
            console.error('Failed to push schema:', pushError);
            return false;
        }
    }
}
/**
 * Seed the database with test data
 */
async function seedDatabase(prisma) {
    console.log('🌱 Seeding test data...');
    // Create test achievements - Claims type
    await prisma.achievement.createMany({
        data: [
            {
                name: 'First Claim',
                description: 'Complete your first faucet claim',
                icon: '🎉',
                coin: null,
                target: 1,
                reward: '10',
                type: 'claims',
            },
            {
                name: 'Active Faucet User',
                description: 'Make 10 faucet claims',
                icon: '💧',
                coin: null,
                target: 10,
                reward: '50',
                type: 'claims',
            },
            {
                name: 'Faucet Enthusiast',
                description: 'Make 50 faucet claims',
                icon: '🌊',
                coin: null,
                target: 50,
                reward: '200',
                type: 'claims',
            },
            {
                name: 'ETH Collector',
                description: 'Claim 100 ETH from faucets',
                icon: '💎',
                coin: 'ETH',
                target: 100,
                reward: '500',
                type: 'claims',
            },
        ],
        skipDuplicates: true,
    });
    // Create test achievements - Volume type
    await prisma.achievement.createMany({
        data: [
            {
                name: 'Small Depositor',
                description: 'Deposit more than 0.1 ETH',
                icon: '💰',
                coin: 'ETH',
                target: 1,
                reward: '25',
                type: 'volume',
            },
            {
                name: ' Whale',
                description: 'Deposit more than 1 ETH',
                icon: '🐋',
                coin: 'ETH',
                target: 1,
                reward: '100',
                type: 'volume',
            },
        ],
        skipDuplicates: true,
    });
    // Create test achievements - Referral type
    await prisma.achievement.createMany({
        data: [
            {
                name: 'Referral Master',
                description: 'Refer 5 new users',
                icon: '👥',
                coin: null,
                target: 5,
                reward: '100',
                type: 'referrals',
            },
            {
                name: 'Network Builder',
                description: 'Refer 25 new users',
                icon: '🏗️',
                coin: null,
                target: 25,
                reward: '500',
                type: 'referrals',
            },
        ],
        skipDuplicates: true,
    });
    // Create test faucets - ETH testnets
    await prisma.faucet.createMany({
        data: [
            {
                name: 'Sepolia ETH Faucet',
                coin: 'ETH',
                network: 'sepolia',
                faucetUrl: 'https://sepoliafaucet.com',
                amountMin: '0.01',
                amountMax: '0.05',
                intervalHours: 24,
                isActive: true,
            },
            {
                name: 'Goerli ETH Faucet',
                coin: 'ETH',
                network: 'goerli',
                faucetUrl: 'https://goerlifaucet.com',
                amountMin: '0.01',
                amountMax: '0.03',
                intervalHours: 24,
                isActive: true,
            },
            {
                name: 'Holesky ETH Faucet',
                coin: 'ETH',
                network: 'holesky',
                faucetUrl: 'https://holeskyfaucet.com',
                amountMin: '0.01',
                amountMax: '0.05',
                intervalHours: 24,
                isActive: true,
            },
        ],
        skipDuplicates: true,
    });
    // Create test faucets - BTC testnet
    await prisma.faucet.createMany({
        data: [
            {
                name: 'Bitcoin Testnet Faucet',
                coin: 'BTC',
                network: 'testnet',
                faucetUrl: 'https://bitcoinfaucet.io',
                amountMin: '0.0001',
                amountMax: '0.0005',
                intervalHours: 24,
                isActive: true,
            },
        ],
        skipDuplicates: true,
    });
    // Create test faucets - Solana devnet
    await prisma.faucet.createMany({
        data: [
            {
                name: 'Solana Devnet Faucet',
                coin: 'SOL',
                network: 'devnet',
                faucetUrl: 'https://faucet.solana.com',
                amountMin: '1',
                amountMax: '5',
                intervalHours: 24,
                isActive: true,
            },
        ],
        skipDuplicates: true,
    });
    console.log('✓ Test data seeded');
}
/**
 * Create test users with transactions and achievements for testing
 */
async function createTestData(prisma) {
    console.log('📝 Creating test users with transaction history...');
    const userIds = [];
    const now = new Date();
    // ===========================================
    // User 1: Active user with balanced history
    // ===========================================
    const user1 = await prisma.user.create({
        data: {
            email: 'test-user-1@example.com',
            passwordHash: '$2a$10$testhashfortesting1234567890',
            username: 'testuser1',
            referralCode: 'TESTUSER1',
            totalEarned: '150',
        },
    });
    userIds.push(user1.id);
    // Create wallets for user1 (multiple coins)
    await prisma.wallet.createMany({
        data: [
            { userId: user1.id, coin: 'ETH', balance: '100', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0fE00' },
            { userId: user1.id, coin: 'BTC', balance: '50', address: 'tb1qxy2kfgx4h8n6r4k5v7l9m3c2p0a9s8d7f6g5' },
            { userId: user1.id, coin: 'SOL', balance: '25', address: 'Dk7G9rYykV1j8W4L6N3M2P1K9J8H7G6F5E4D3C2B1A' },
        ],
    });
    // Create varied transactions for user1
    const transactionData = [
        // ETH claims (last 7 days)
        { userId: user1.id, type: 'claim', coin: 'ETH', amount: '10', status: 'confirmed', txHash: '0xabc123', createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'claim', coin: 'ETH', amount: '15', status: 'confirmed', txHash: '0xdef456', createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'claim', coin: 'ETH', amount: '20', status: 'confirmed', txHash: '0xghi789', createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'claim', coin: 'ETH', amount: '8', status: 'confirmed', txHash: '0xjkl012', createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'claim', coin: 'ETH', amount: '12', status: 'pending', createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000) },
        // BTC claims
        { userId: user1.id, type: 'claim', coin: 'BTC', amount: '0.01', status: 'confirmed', txHash: 'btc123abc', createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'claim', coin: 'BTC', amount: '0.02', status: 'confirmed', txHash: 'btc456def', createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000) },
        // Deposits
        { userId: user1.id, type: 'deposit', coin: 'ETH', amount: '50', status: 'confirmed', txHash: '0xdep001', createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'deposit', coin: 'BTC', amount: '0.1', status: 'confirmed', txHash: 'btcdep001', createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000) },
        // Referral bonuses
        { userId: user1.id, type: 'referral_bonus', coin: 'ETH', amount: '25', status: 'confirmed', createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
        { userId: user1.id, type: 'referral_bonus', coin: 'ETH', amount: '15', status: 'confirmed', createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000) },
        // Withdrawal
        { userId: user1.id, type: 'withdrawal', coin: 'ETH', amount: '5', status: 'confirmed', txHash: '0xwith001', createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
    ];
    await prisma.transaction.createMany({ data: transactionData });
    // Create faucet claims for user1 (with safety check)
    const faucets = await prisma.faucet.findMany();
    if (faucets.length > 0) {
        const faucetClaimData = [
            { userId: user1.id, faucetId: faucets[0].id, coin: 'ETH', amount: '10', ipAddress: '127.0.0.1', status: 'confirmed', claimedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
            { userId: user1.id, faucetId: faucets[0].id, coin: 'ETH', amount: '15', ipAddress: '127.0.0.1', status: 'confirmed', claimedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
            { userId: user1.id, faucetId: faucets[0].id, coin: 'ETH', amount: '20', ipAddress: '127.0.0.1', status: 'confirmed', claimedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
            { userId: user1.id, faucetId: faucets[1]?.id, coin: 'ETH', amount: '8', ipAddress: '192.168.1.1', status: 'confirmed', claimedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
        ];
        await prisma.faucetClaim.createMany({ data: faucetClaimData });
    }
    // Create user achievements with progress for user1
    const achievements = await prisma.achievement.findMany();
    if (achievements.length > 0) {
        await prisma.userAchievement.createMany({
            data: [
                // Completed achievements
                { userId: user1.id, achievementId: achievements[0].id, progress: 1, completed: true, completedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
                { userId: user1.id, achievementId: achievements[1].id, progress: 10, completed: true, completedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000) },
                // In-progress achievements
                { userId: user1.id, achievementId: achievements[2]?.id, progress: 25, completed: false },
                { userId: user1.id, achievementId: achievements[4]?.id, progress: 3, completed: false },
            ],
        });
    }
    // ===========================================
    // User 2: Power user with lots of activity
    // ===========================================
    const user2 = await prisma.user.create({
        data: {
            email: 'test-user-2@example.com',
            passwordHash: '$2a$10$testhashfortesting1234567890',
            username: 'testuser2',
            referralCode: 'TESTUSER2',
            totalEarned: '500',
        },
    });
    userIds.push(user2.id);
    // Create wallets for user2
    await prisma.wallet.createMany({
        data: [
            { userId: user2.id, coin: 'ETH', balance: '400', address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72' },
            { userId: user2.id, coin: 'BTC', balance: '200', address: 'tb1qzy2lfgx4h8n6r4k5v7l9m3c2p0a9s8d7f6g4' },
        ],
    });
    // Create more transactions for user2 (30 days of history) - deterministic amounts
    const moreTransactions = [];
    const ethAmounts = ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50'];
    const btcAmounts = ['0.01', '0.02', '0.03', '0.04', '0.05'];
    for (let i = 0; i < 30; i++) {
        const isClaim = i % 2 === 0;
        const coin = i % 3 === 0 ? 'BTC' : 'ETH';
        const amount = coin === 'BTC' ? btcAmounts[i % btcAmounts.length] : ethAmounts[i % ethAmounts.length];
        moreTransactions.push({
            userId: user2.id,
            type: isClaim ? 'claim' : (i % 5 === 0 ? 'referral_bonus' : 'deposit'),
            coin,
            amount,
            status: 'confirmed',
            txHash: coin === 'BTC' ? `btc${i}abc` : `0x${i}def`,
            createdAt: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
        });
    }
    await prisma.transaction.createMany({ data: moreTransactions });
    // User 2 achievements - mostly completed
    if (achievements.length > 0) {
        await prisma.userAchievement.createMany({
            data: [
                { userId: user2.id, achievementId: achievements[0].id, progress: 1, completed: true, completedAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000) },
                { userId: user2.id, achievementId: achievements[1].id, progress: 10, completed: true, completedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000) },
                { userId: user2.id, achievementId: achievements[2].id, progress: 50, completed: true, completedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000) },
                { userId: user2.id, achievementId: achievements[3]?.id, progress: 100, completed: true, completedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
            ],
        });
    }
    // ===========================================
    // User 3: New user with minimal activity
    // ===========================================
    const user3 = await prisma.user.create({
        data: {
            email: 'test-user-3@example.com',
            passwordHash: '$2a$10$testhashfortesting1234567890',
            username: 'testuser3',
            referralCode: 'TESTUSER3',
            totalEarned: '10',
        },
    });
    userIds.push(user3.id);
    await prisma.wallet.createMany({
        data: [
            { userId: user3.id, coin: 'ETH', balance: '5', address: '0x9ca2f109551bD432803012645Ac136ddd64DBA73' },
        ],
    });
    // Only a few transactions for new user
    await prisma.transaction.createMany({
        data: [
            { userId: user3.id, type: 'claim', coin: 'ETH', amount: '5', status: 'confirmed', createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000) },
            { userId: user3.id, type: 'claim', coin: 'ETH', amount: '5', status: 'confirmed', createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) },
        ],
    });
    // No achievements completed yet
    // ===========================================
    // Create daily stats for all users
    // ===========================================
    const dailyStatsData = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        dailyStatsData.push({ userId: user1.id, date, claims: 3, earned: '55', volume: '100' }, { userId: user2.id, date, claims: 5, earned: '120', volume: '250' }, { userId: user3.id, date, claims: 1, earned: '5', volume: '5' });
    }
    await prisma.dailyStats.createMany({ data: dailyStatsData });
    // ===========================================
    // Create leaderboard entries (using username from user)
    // ===========================================
    const [user1Data, user2Data, user3Data] = await Promise.all([
        prisma.user.findUnique({ where: { id: user1.id } }),
        prisma.user.findUnique({ where: { id: user2.id } }),
        prisma.user.findUnique({ where: { id: user3.id } }),
    ]);
    await prisma.leaderboard.createMany({
        data: [
            { userId: user2.id, username: user2Data?.username || 'testuser2', score: '500', period: 'weekly', rank: 1 },
            { userId: user1.id, username: user1Data?.username || 'testuser1', score: '150', period: 'weekly', rank: 2 },
            { userId: user3.id, username: user3Data?.username || 'testuser3', score: '10', period: 'weekly', rank: 3 },
            { userId: user2.id, username: user2Data?.username || 'testuser2', score: '500', period: 'monthly', rank: 1 },
            { userId: user1.id, username: user1Data?.username || 'testuser1', score: '150', period: 'monthly', rank: 5 },
        ],
    });
    console.log('✓ Created test users with transaction history');
    return { userIds };
}
/**
 * Main setup function
 */
async function setupTestDatabase() {
    console.log('🔧 Setting up test database...\n');
    // Get database URL
    const testDbUrl = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;
    if (!testDbUrl) {
        return {
            success: false,
            error: 'TEST_DATABASE_URL or DATABASE_URL environment variable is required',
        };
    }
    // Set the database URL for Prisma
    process.env.DATABASE_URL = testDbUrl;
    // Create database if needed
    const dbResult = await createDatabase(testDbUrl);
    if (!dbResult.success) {
        return { success: false, error: dbResult.error };
    }
    // Connect to the test database
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: testDbUrl,
            },
        },
        log: ['error', 'warn'],
    });
    try {
        // Test connection
        console.log('🔗 Connecting to test database...');
        const connTest = await testConnection(prisma);
        if (!connTest.success) {
            return { success: false, error: `Cannot connect to test database: ${connTest.error}` };
        }
        console.log('✓ Connected to test database');
        // Clean and migrate
        await cleanDatabase(prisma);
        const migrated = await runMigrations(testDbUrl);
        if (!migrated) {
            return { success: false, error: 'Failed to run migrations. Run "npx prisma db push" manually to create the schema.' };
        }
        // Seed base test data
        await seedDatabase(prisma);
        // Create test users with transactions and achievements
        await createTestData(prisma);
        console.log('\n✅ Test database setup complete!\n');
        // Return cleanup function
        return {
            success: true,
            cleanup: async () => {
                console.log('🧹 Cleaning up test database...');
                try {
                    await cleanDatabase(prisma);
                    console.log('✓ Cleanup complete');
                }
                catch (error) {
                    console.error('⚠ Cleanup warning:', error instanceof Error ? error.message : 'Unknown error');
                }
                finally {
                    await prisma.$disconnect();
                }
            },
        };
    }
    catch (error) {
        // Provide more helpful error message for common issues
        const dbError = error;
        let errorMessage = dbError.message || 'Unknown error';
        // Check for specific errors
        if (dbError.code === 'P1001') {
            errorMessage = `Database server not reachable: ${errorMessage}`;
        }
        else if (dbError.code === 'P1002') {
            errorMessage = `Database server timeout: ${errorMessage}`;
        }
        else if (dbError.code === 'P1003') {
            errorMessage = `Database does not exist: ${errorMessage}`;
        }
        try {
            await prisma.$disconnect();
        }
        catch {
            // Ignore disconnect errors during cleanup
        }
        return {
            success: false,
            error: errorMessage,
        };
    }
}
/**
 * Run setup if called directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
    setupTestDatabase()
        .then((result) => {
        if (!result.success) {
            console.error('\n❌ Setup failed:', result.error);
            process.exit(1);
        }
        process.exit(0);
    })
        .catch((error) => {
        console.error('❌ Unexpected error:', error);
        process.exit(1);
    });
}
// Export for use in tests
export { setupTestDatabase, cleanDatabase, seedDatabase, createTestData };
// Also export a simple CLI runner
async function main() {
    const result = await setupTestDatabase();
    if (!result.success) {
        console.error('\n❌ Setup failed:', result.error);
        process.exit(1);
    }
    process.exit(0);
}
main().catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
});
//# sourceMappingURL=setup-test-db.js.map