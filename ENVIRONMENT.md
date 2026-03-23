# Environment Setup Guide

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| npm | 10+ | Included with Node.js |
| Docker | Latest | [docker.com](https://docker.com) |
| Git | 2.30+ | [git-scm.com](https://git-scm.com) |

## Quick Setup (Recommended)

### Interactive Wizard
```bash
# Clone the repository
git clone https://github.com/zyztek/crybot.git
cd crybot

# Run interactive setup
npm run setup
```

### Auto Setup (Non-interactive)
```bash
# Linux/Mac
npm run setup:auto

# Windows
scripts\auto-setup.bat
```

## Manual Setup

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Configure Environment

Create `.env` in project root:
```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws
VITE_APP_NAME=CryptoFaucet Hub
```

Create `server/.env`:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://crybot:crybot_dev_password@localhost:5432/crybot?schema=public
JWT_SECRET=your-secret-key-minimum-32-characters
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=http://localhost:5173

# Blockchain RPC
SEPOLIA_RPC_URL=https://rpc.sepolia.org
GOERLI_RPC_URL=https://rpc.goerli.org
HOLESKY_RPC_URL=https://rpc.holesky.org
```

### 3. Setup Database

**Option A: Docker**
```bash
docker-compose -f docker-compose.db.yml up -d
```

**Option B: Local PostgreSQL**
Ensure PostgreSQL is running on localhost:5432

### 4. Generate Prisma Client
```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Start Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server && npm run dev
```

## Verify Installation

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API: http://localhost:3000/api
- Health: http://localhost:3000/health

## Troubleshooting

### Port Already in Use
```bash
# Find process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### Database Connection Failed
```bash
# Check Docker
docker ps

# Restart database
docker-compose -f docker-compose.db.yml restart
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Clear TypeScript cache
cd server && rm -rf dist
npm run build
```