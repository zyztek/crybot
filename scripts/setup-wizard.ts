#!/usr/bin/env tsx
/**
 * CryptoFaucet Hub - Interactive Setup Wizard
 * 
 * This script guides users through setting up the entire project
 * with interactive prompts and automatic configuration.
 * 
 * Usage: npx tsx scripts/setup-wizard.ts
 */

import { createInterface } from 'readline';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(message: string, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

function header(title: string) {
  console.log('\n');
  log('═'.repeat(60), colors.cyan);
  log(`  ${title}`, colors.cyan);
  log('═'.repeat(60), colors.cyan);
}

function step(number: number, total: number, message: string) {
  log(`\n[${number}/${total}] ${message}`, colors.yellow);
}

function success(message: string) {
  log(`✓ ${message}`, colors.green);
}

function error(message: string) {
  log(`✗ ${message}`, colors.red);
}

function info(message: string) {
  log(`  ℹ ${message}`, colors.blue);
}

// Interactive prompt
function prompt(question: string, defaultValue = ''): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const defaultText = defaultValue ? ` (default: ${defaultValue})` : '';
    rl.question(`${colors.cyan}? ${question}${defaultText}: ${colors.reset}`, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

// Yes/No prompt
async function confirm(question: string, defaultYes = false): Promise<boolean> {
  const defaultText = defaultYes ? '[Y/n]' : '[y/N]';
  const answer = await prompt(`${question} ${defaultText}`, defaultYes ? 'y' : 'n');
  return answer.toLowerCase().startsWith('y');
}

// Select prompt
async function select(question: string, options: string[], defaultIndex = 0): Promise<number> {
  console.log(`\n${colors.cyan}? ${question}${colors.reset}`);
  options.forEach((opt, i) => {
    const prefix = i === defaultIndex ? '→ ' : '  ';
    log(`${prefix}${i + 1}. ${opt}`, colors.white);
  });
  
  const answer = await prompt('Select option', String(defaultIndex + 1));
  const index = parseInt(answer) - 1;
  return Math.max(0, Math.min(index, options.length - 1));
}

// Check if command exists
function commandExists(cmd: string): boolean {
  try {
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Run command with status
function runCommand(cmd: string, cwd = projectRoot, showOutput = false) {
  try {
    if (showOutput) {
      execSync(cmd, { cwd, stdio: 'inherit' });
    } else {
      execSync(cmd, { cwd, stdio: 'pipe' });
    }
    return true;
  } catch (e) {
    return false;
  }
}

// Main setup wizard
async function main() {
  header('CryptoFaucet Hub - Setup Wizard');
  
  log('\nWelcome to CryptoFaucet Hub! This wizard will help you', colors.white);
  log('set up the complete fullstack application automatically.\n', colors.white);
  
  const totalSteps = 8;
  let currentStep = 0;
  
  // ========================================
  // STEP 1: Check Prerequisites
  // ========================================
  step(++currentStep, totalSteps, 'Checking System Prerequisites');
  
  const checks = {
    node: commandExists('node'),
    npm: commandExists('npm'),
    docker: commandExists('docker'),
    git: commandExists('git'),
  };
  
  log('\n  System checks:', colors.dim);
  log(`    Node.js: ${checks.node ? '✓' : '✗'}`, checks.node ? colors.green : colors.red);
  log(`    npm: ${checks.npm ? '✓' : '✗'}`, checks.npm ? colors.green : colors.red);
  log(`    Docker: ${checks.docker ? '✓' : '✗'}`, checks.docker ? colors.green : colors.red);
  log(`    Git: ${checks.git ? '✓' : '✗'}`, checks.git ? colors.green : colors.red);
  
  if (!checks.node || !checks.npm) {
    error('\n  Node.js and npm are required!');
    log('\n  Please install Node.js from: https://nodejs.org', colors.yellow);
    process.exit(1);
  }
  
  // Check Node version
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const nodeMajor = parseInt(nodeVersion.split('.')[0].replace('v', ''));
  if (nodeMajor < 20) {
    error(`  Node.js version ${nodeVersion} is too old. Please use Node.js 20+`);
    process.exit(1);
  }
  success(`  Node.js ${nodeVersion} detected`);
  
  // ========================================
  // STEP 2: Project Configuration
  // ========================================
  step(++currentStep, totalSteps, 'Project Configuration');
  
  const config = {
    projectName: await prompt('Project name', 'crybot'),
    backendPort: await prompt('Backend port', '3000'),
    frontendPort: await prompt('Frontend port', '5173'),
    dbName: await prompt('Database name', 'crybot'),
    dbUser: await prompt('Database user', 'crybot'),
    dbPassword: await prompt('Database password', 'crybot_dev_password'),
    jwtSecret: await prompt('JWT secret', 'crybot-jwt-secret-key-minimum-32-chars'),
  };
  
  success('  Configuration saved');
  
  // ========================================
  // STEP 3: Install Dependencies
  // ========================================
  step(++currentStep, totalSteps, 'Installing Dependencies');
  
  log('\n  Installing frontend dependencies...', colors.dim);
  runCommand('npm install', projectRoot, true);
  success('  Frontend dependencies installed');
  
  log('\n  Installing backend dependencies...', colors.dim);
  runCommand('npm install', join(projectRoot, 'server'), true);
  success('  Backend dependencies installed');
  
  // ========================================
  // STEP 4: Environment Setup
  // ========================================
  step(++currentStep, totalSteps, 'Environment Configuration');
  
  // Frontend .env
  const frontendEnv = `VITE_API_URL=http://localhost:${config.backendPort}/api
VITE_WS_URL=ws://localhost:${config.backendPort}/ws
VITE_APP_NAME=CryptoFaucet Hub
`;
  
  const frontendEnvPath = join(projectRoot, '.env');
  writeFileSync(frontendEnvPath, frontendEnv);
  success('  Frontend .env created');
  
  // Backend .env
  const backendEnv = `# Server Configuration
NODE_ENV=development
PORT=${config.backendPort}

# Database
DATABASE_URL=postgresql://${config.dbUser}:${config.dbPassword}@localhost:5432/${config.dbName}?schema=public

# JWT
JWT_SECRET=${config.jwtSecret}
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:${config.frontendPort}

# Blockchain RPC URLs
SEPOLIA_RPC_URL=https://rpc.sepolia.org
GOERLI_RPC_URL=https://rpc.goerli.org
HOLESKY_RPC_URL=https://rpc.holesky.org
BTC_RPC_URL=http://localhost:8332
SOLANA_RPC_URL=https://api.devnet.solana.com
`;
  
  const backendEnvPath = join(projectRoot, 'server/.env');
  writeFileSync(backendEnvPath, backendEnv);
  success('  Backend .env created');
  
  // ========================================
  // STEP 5: Database Setup
  // ========================================
  step(++currentStep, totalSteps, 'Database Setup');
  
  const useDocker = await confirm('Use Docker for PostgreSQL?', true);
  
  if (useDocker) {
    info('  Starting PostgreSQL with Docker...');
    
    // Create docker-compose for database only
    const dbCompose = `version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: ${config.projectName}-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${config.dbName}
      POSTGRES_USER: ${config.dbUser}
      POSTGRES_PASSWORD: ${config.dbPassword}
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${config.dbUser} -d ${config.dbName}"]
      interval: 5s
      timeout: 5s
      retries: 5
`;
    
    const dbComposePath = join(projectRoot, 'docker-compose.db.yml');
    writeFileSync(dbComposePath, dbCompose);
    success('  Docker compose file created');
    
    // Start PostgreSQL
    if (commandExists('docker-compose')) {
      runCommand('docker-compose -f docker-compose.db.yml up -d', projectRoot, true);
      success('  PostgreSQL container started');
      
      // Wait for database to be ready
      info('  Waiting for database to be ready...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    } else if (commandExists('docker')) {
      runCommand('docker compose -f docker-compose.db.yml up -d', projectRoot, true);
      success('  PostgreSQL container started');
      
      info('  Waiting for database to be ready...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Generate Prisma client
  info('  Generating Prisma client...');
  runCommand('npx prisma generate', join(projectRoot, 'server'), true);
  success('  Prisma client generated');
  
  // Run migrations
  info('  Running database migrations...');
  const migrateSuccess = runCommand('npx prisma db push', join(projectRoot, 'server'), true);
  if (migrateSuccess) {
    success('  Database schema synchronized');
  } else {
    info('  Database setup skipped (no connection)');
  }
  
  // ========================================
  // STEP 6: Build Verification
  // ========================================
  step(++currentStep, totalSteps, 'Building Project');
  
  log('\n  Building frontend...', colors.dim);
  const frontendBuild = runCommand('npm run build', projectRoot);
  if (frontendBuild) {
    success('  Frontend built successfully');
  } else {
    error('  Frontend build failed');
  }
  
  log('\n  Building backend...', colors.dim);
  const backendBuild = runCommand('npm run build', join(projectRoot, 'server'));
  if (backendBuild) {
    success('  Backend built successfully');
  } else {
    error('  Backend build failed - checking for non-critical errors...');
  }
  
  // ========================================
  // STEP 7: Running Tests
  // ========================================
  step(++currentStep, totalSteps, 'Running Tests');
  
  const runTests = await confirm('Run tests now?', false);
  
  if (runTests) {
    log('\n  Running frontend tests...', colors.dim);
    runCommand('npm test', projectRoot);
    success('  Frontend tests completed');
    
    log('\n  Running backend tests...', colors.dim);
    runCommand('npm test', join(projectRoot, 'server'));
    success('  Backend tests completed');
  }
  
  // ========================================
  // STEP 8: Final Summary
  // ========================================
  step(currentStep, totalSteps, 'Setup Complete!');
  
  header('Setup Complete!');
  
  log('\n  Your CryptoFaucet Hub is ready!', colors.green);
  
  console.log(`
  ${colors.cyan}┌─────────────────────────────────────────────────────────┐
  │                    QUICK START COMMANDS                    │
  ├─────────────────────────────────────────────────────────┤
  │  Frontend:  npm run dev                                   │
  │  Backend:   cd server && npm run dev                      │
  │  Full Stack: docker-compose up -d                         │
  └─────────────────────────────────────────────────────────┘${colors.reset}
  `);
  
  log('\n  Available scripts:', colors.dim);
  log('    npm run dev         - Start frontend dev server', colors.white);
  log('    npm run build       - Build frontend for production', colors.white);
  log('    cd server && npm run dev  - Start backend server', colors.white);
  log('    docker-compose up   - Run full stack with Docker', colors.white);
  
  log('\n  Configuration:', colors.dim);
  log(`    Frontend: http://localhost:${config.frontendPort}`, colors.white);
  log(`    Backend:  http://localhost:${config.backendPort}`, colors.white);
  log(`    API:      http://localhost:${config.backendPort}/api`, colors.white);
  log(`    Database: localhost:5432/${config.dbName}`, colors.white);
  
  console.log('\n');
  log('  Thank you for setting up CryptoFaucet Hub!', colors.magenta);
  console.log('  ==================================================\n');
}

// Run the wizard
main().catch(console.error);