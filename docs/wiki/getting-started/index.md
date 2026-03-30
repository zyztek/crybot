# 🚀 Getting Started with CryptoFaucet Hub

Welcome to CryptoFaucet Hub! This comprehensive guide will help you set up, configure, and start using the platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure your development environment meets the following requirements:

### Required Software

| Software | Version | Description |
|----------|---------|-------------|
| **Node.js** | ≥20.x | JavaScript runtime - LTS recommended |
| **npm** | ≥10.x | Package manager - comes with Node.js |
| **Git** | ≥2.x | Version control system |
| **PostgreSQL** | ≥16.x | Database (optional for frontend-only) |
| **Docker** | ≥24.x | Containerization (optional) |

### System Requirements

- **OS**: Windows 10+, macOS 11+, Ubuntu 20.04+, or WSL2
- **RAM**: Minimum 4GB, recommended 8GB
- **Storage**: At least 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 15+, Edge 90+

### Network Requirements

- Internet connection for npm packages
- For blockchain features: Access to Ethereum Sepolia testnet
- For full functionality: Open ports 3000 (backend), 5173 (frontend)

---

## Quick Start

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/zyztek/crybot.git

# Navigate to the project directory
cd crybot

# Switch to the main branch
git checkout main
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm install

# Or install frontend only
npm install --legacy-peer-deps

# Install backend dependencies only
cd server && npm install && cd ..
```

### Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit the environment file with your settings
# See Environment Configuration section below
```

### Step 4: Initialize Database (Optional - Backend Features)

```bash
# Run the interactive setup wizard
npm run setup:auto

# Or manually:
# 1. Create a PostgreSQL database
# 2. Update DATABASE_URL in .env
# 3. Run: cd server && npx prisma migrate dev
```

### Step 5: Start Development Server

```bash
# Start the frontend development server
npm run dev

# The application will be available at http://localhost:5173
```

---

## Environment Configuration

### Creating Your .env File

Create a `.env` file in the project root with the following variables:

### Frontend Variables

```env
# Application Mode
VITE_APP_MODE=development
VITE_NODE_ENV=development

# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_API_RETRY_ATTEMPTS=3

# Analytics (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_GOOGLE_ANALYTICS_ID=

# Feature Flags
VITE_ENABLE_REFERRAL=true
VITE_ENABLE_AIRDROP=true
VITE_ENABLE_NFT=true
VITE_ENABLE_GAMES=true
VITE_ENABLE_STAKING=true
VITE_ENABLE_YIELD_FARMING=true
VITE_ENABLE_DAO=true
VITE_ENABLE_TESTNET=true

# Network Configuration
VITE_DEFAULT_NETWORK=sepolia
VITE_SUPPORTED_NETWORKS=sepolia,mainnet,arbitrum,optimism,polygon

# Wallet Connection
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_PROJECT_ID=your_infura_project_id

# UI Configuration
VITE_DEFAULT_LANGUAGE=en
VITE_ENABLE_DARK_MODE=true
VITE_DEFAULT_CURRENCY=USD

# Referral System
VITE_REFERRAL_COMMISSION_RATE=0.05
VITE_REFERRAL_BONUS_AMOUNT=0.001
```

### Backend Variables (Optional)

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/crybot
DATABASE_POOL_SIZE=10
DATABASE_SSL=false

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# API Keys
ALCHEMY_API_KEY=your_alchemy_key
INFURA_API_KEY=your_infura_key
ETHERSCAN_API_KEY=your_etherscan_key
COINGECKO_API_KEY=your_coingecko_key

# External Services
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@crybot.com

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173

# Feature Flags
ENABLE_TESTNET_ORCHESTRATOR=true
ENABLE_EMAIL_NOTIFICATIONS=false
ENABLE_WEBHOOKS=false
```

### Environment Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `development` | Full debugging, hot reload | Local development |
| `production` | Optimized, minified | Production deployment |
| `test` | Test database, mock services | Running tests |

---

## Running the Application

### Frontend Only (Default)

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Full Stack (Frontend + Backend)

```bash
# Terminal 1: Start Backend
cd server
npm run dev

# Terminal 2: Start Frontend
npm run dev
```

### Using Docker

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests (single run) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run setup:auto` | Run interactive setup wizard |

---

## Project Structure

```
crybot/
├── .github/                  # GitHub configurations
│   ├── workflows/           # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── projects/            # GitHub Projects
├── docs/                    # Documentation
│   └── wiki/               # Wiki content
├── server/                  # Backend (Express + Prisma)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   └── prisma/             # Database schema & migrations
├── src/                     # Frontend (React + TypeScript)
│   ├── components/         # React components (70+)
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state management
│   └── utils/              # Utility functions
├── public/                  # Static assets
└── package.json            # Root package configuration
```

### Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/components/` | 70+ React components for all features |
| `src/store/slices/` | Zustand state management slices |
| `server/src/routes/` | Express API route handlers |
| `server/src/services/` | Backend business logic |
| `server/prisma/` | PostgreSQL schema and migrations |

---

## Next Steps

Now that you have the application running, explore these resources:

1. **[Architecture Guide](../architecture/index.md)** - Understand the system design
2. **[API Reference](../api/index.md)** - Explore backend endpoints
3. **[Component Library](../components/index.md)** - Learn about UI components
4. **[Deployment Guide](../deployment/index.md)** - Deploy to production
5. **[Development Guide](../development/index.md)** - Contribute to the project

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find and kill process using port 5173
lsof -i :5173
kill -9 <PID>
```

#### Node Version Mismatch
```bash
# Check your Node version
node --version

# Use nvm to switch versions
nvm use 20
```

#### Database Connection Failed
```bash
# Verify PostgreSQL is running
pg_isready -h localhost -p 5432

# Check connection string format
postgresql://user:password@host:port/database
```

#### Missing Dependencies
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## Getting Help

- **GitHub Issues**: Report bugs or request features
- **GitHub Discussions**: Ask questions and share ideas
- **Wiki**: Full documentation at [docs/wiki](../index.md)

---

*Last updated: 2025-01-27*