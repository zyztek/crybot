# 🚀 CryptoFaucet Hub - Full Stack Application

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production Ready-10B981" alt="Status">
  <img src="https://img.shields.io/badge/Tests-95+-FFD700" alt="Tests">
  <img src="https://img.shields.io/badge/License-MIT-8B5CF6" alt="License">
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Interactive Setup](#interactive-setup)
  - [Automatic Setup](#automatic-setup)
  - [Manual Setup](#manual-setup)
  - [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 📖 Overview

**CryptoFaucet Hub** is a comprehensive full-stack cryptocurrency faucet automation platform. It provides users with the ability to claim testnet tokens from various blockchain networks (Ethereum, Bitcoin, Solana), track their earnings, compete on leaderboards, and more.

### 🎯 Key Goals
- 🔰 Automated testnet token claiming
- 📊 Real-time portfolio tracking
- 🏆 Leaderboard competitions
- 🎮 Gamification with achievements
- 🔄 Cross-chain support

---

## ✨ Features

### Frontend (React + TypeScript + Tailwind)
- 🖥️ Modern responsive UI with glassmorphism effects
- 🌙 Dark theme with purple/slate gradient palette
- 🌐 Bilingual support (English/Spanish)
- 📱 Mobile-first responsive design
- 📊 Interactive charts with Recharts
- 🔔 Toast notifications system
- 🎯 Animated transitions and micro-interactions
- 🃏 70+ UI components

### Backend (Express + TypeScript + Prisma)
- 🔐 JWT authentication with refresh tokens
- 📈 RESTful API with 9+ endpoints
- 🗄️ PostgreSQL database with Prisma ORM
- 🔒 Rate limiting and security middleware
- 📡 WebSocket support for real-time updates
- ✅ Comprehensive error handling
- 🧪 95+ unit tests

### Blockchain Integration
- ⛽ Ethereum (Sepolia, Goerli, Holesky)
- ₿ Bitcoin (via RPC)
- ◎ Solana (Devnet)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, Zustand, Recharts |
| **Backend** | Express.js, TypeScript, Prisma ORM |
| **Database** | PostgreSQL 16 |
| **Authentication** | JWT with refresh tokens |
| **Container** | Docker, Docker Compose |
| **Testing** | Vitest, React Testing Library |
| **Styling** | Tailwind CSS v4, Custom animations |

---

## 🚀 Quick Start

### Option 1: Interactive Setup Wizard (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd crybot

# Run the interactive setup wizard
npx tsx scripts/setup-wizard.ts
```

The wizard will guide you through:
1. ✅ System prerequisites check
2. ⚙️ Project configuration
3. 📦 Dependencies installation
4. 🔧 Environment setup
5. 🗄️ Database configuration
6. 🏗️ Project build
7. 🧪 Tests execution
8. 📝 Final summary

---

### Option 2: Automatic Setup (Non-Interactive)

**Linux/Mac:**
```bash
chmod +x scripts/auto-setup.sh
./scripts/auto-setup.sh
```

**Windows:**
```cmd
scripts\auto-setup.bat
```

Or use npm:
```bash
npm run setup
```

---

### Option 3: Manual Setup

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd server && npm install

# 3. Create environment files (see Configuration section)

# 4. Start PostgreSQL with Docker
docker compose -f docker-compose.db.yml up -d

# 5. Generate Prisma client
cd server && npx prisma generate

# 6. Run database migrations
npx prisma db push

# 7. Start development servers
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server && npm run dev
```

---

### Option 4: Docker Full Stack

```bash
# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 📂 Project Structure

```
crybot/
├── .env                    # Frontend environment variables
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # Frontend TypeScript config
├── docker-compose.yml      # Full stack Docker compose
├── docker-compose.db.yml   # Database only Docker compose
├── Dockerfile              # Frontend Docker image
├── nginx.conf              # Nginx configuration
│
├── server/                 # Backend API
│   ├── .env               # Backend environment variables
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # Backend TypeScript config
│   ├── vitest.config.ts   # Test configuration
│   ├── Dockerfile         # Backend Docker image
│   ├── docker-compose.yml # Backend Docker compose
│   │
│   ├── src/
│   │   ├── index.ts       # Main entry point
│   │   ├── config/        # Configuration modules
│   │   ├── middleware/    # Express middleware
│   │   │   ├── auth.ts    # JWT authentication
│   │   │   └── errorHandler.ts
│   │   ├── routes/        # API routes
│   │   │   ├── auth.ts    # Authentication endpoints
│   │   │   ├── user.ts    # User management
│   │   │   ├── wallet.ts  # Wallet operations
│   │   │   ├── faucet.ts  # Faucet claims
│   │   │   ├── transaction.ts
│   │   │   ├── achievement.ts
│   │   │   ├── analytics.ts
│   │   │   └── leaderboard.ts
│   │   ├── services/      # Business logic
│   │   │   ├── blockchain.ts
│   │   │   └── faucetService.ts
│   │   ├── lib/           # Database & utilities
│   │   │   └── prisma.ts  # Prisma client
│   │   ├── utils/         # Helper functions
│   │   └── websocket/     # WebSocket handlers
│   │
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Database seeder
│   │
│   ├── scripts/
│   │   └── setup-test-db.ts
│   │
│   └── dist/              # Compiled JavaScript
│
├── src/                   # Frontend React app
│   ├── App.tsx           # Main application
│   ├── main.tsx          # Entry point
│   ├── index.css         # Global styles + animations
│   │
│   ├── components/       # React components (70+)
│   │   ├── layout/       # Layout components
│   │   ├── ui/           # Reusable UI components
│   │   └── *.tsx         # Feature components
│   │
│   ├── store/            # Zustand state management
│   │   ├── cryptoStore.ts
│   │   └── slices/       # Store slices
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useApi.ts     # API communication
│   │   └── useToast.tsx  # Notifications
│   │
│   ├── services/         # Frontend services
│   │   └── api.ts        # API client
│   │
│   ├── i18n/             # Internationalization
│   │   └── translations.ts
│   │
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   │
│   ├── utils/            # Helper functions
│   │   └── cn.ts         # Class name utility
│   │
│   └── test/             # Test setup & fixtures
│
└── scripts/              # Automation scripts
    ├── setup-wizard.ts   # Interactive setup (Node.js)
    ├── auto-setup.sh     # Linux/Mac auto setup
    └── auto-setup.bat    # Windows auto setup
```

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:3000/api
Production:  https://your-domain.com/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout user |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update user profile |
| GET | `/user/stats` | Get user statistics |

### Wallet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/wallet` | Get user wallets (paginated) |
| POST | `/wallet` | Create new wallet |
| GET | `/wallet/:id` | Get wallet details |
| DELETE | `/wallet/:id` | Delete wallet |

### Faucet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/faucet` | Get available faucets |
| POST | `/faucet/claim` | Claim faucet rewards |
| GET | `/faucet/history` | Get claim history |

### Transaction Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transaction` | Get transactions |
| GET | `/transaction/stats` | Get transaction statistics |

### Achievement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/achievement` | Get achievements (paginated) |
| POST | `/achievement/:id/claim` | Claim achievement reward |

### Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/overview` | Get analytics overview |
| GET | `/analytics/portfolio` | Get portfolio analytics |

### Leaderboard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard` | Get leaderboard |

### Health Check Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/health/ready` | Deep health check (with DB) |
| GET | `/health/live` | Liveness probe |

---

## 🧪 Testing

### Frontend Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- App.test.tsx
```

### Backend Tests
```bash
# Run all tests
cd server && npm test

# Run specific test file
cd server && npm test -- auth.test.ts

# Run tests in watch mode
cd server && npm run test:watch

# Run integration tests (requires database)
cd server && npm run test:integration
```

### Test Coverage
- ✅ **95+ unit tests** covering:
  - Authentication (JWT, refresh tokens)
  - Configuration management
  - Blockchain service operations
  - Error handling middleware
  - Utility functions

---

## ⚙️ Configuration

### Frontend Environment Variables

Create `.env` in project root:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws
VITE_APP_NAME=CryptoFaucet Hub
```

### Backend Environment Variables

Create `server/.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://crybot:crybot_dev_password@localhost:5432/crybot?schema=public

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:5173

# Blockchain RPC URLs
SEPOLIA_RPC_URL=https://rpc.sepolia.org
GOERLI_RPC_URL=https://rpc.goerli.org
HOLESKY_RPC_URL=https://rpc.holesky.org
BTC_RPC_URL=http://localhost:8332
SOLANA_RPC_URL=https://api.devnet.solana.com
```

---

## 💻 Development

### Development Mode

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
cd server && npm run dev
```

### Build for Production

```bash
# Build frontend (single HTML file)
npm run build

# Build backend
cd server && npm run build

# Start production backend
cd server && npm start
```

### Docker Development

```bash
# Start all services with hot reload
docker-compose -f docker-compose.yml up --build

# View logs
docker-compose logs -f backend
```

---

## 🚀 Deployment

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16

### Production Build

```bash
# 1. Build frontend
npm run build:production

# 2. Build backend
cd server && npm run build

# 3. Start with Docker
docker-compose -f docker-compose.yml up -d --build
```

### Environment-Specific Builds

```bash
# Staging
npm run build:staging
cd server && npm run build:staging

# Production
npm run build:production
cd server && npm run build:production
```

---

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Start database
docker-compose -f docker-compose.db.yml up -d

# Verify connection
docker exec -it crybot-postgres psql -U crybot -d crybot
```

#### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>           # Linux/Mac
```

#### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear TypeScript cache
rm -rf server/dist
cd server && npm run build
```

#### Prisma Issues
```bash
# Regenerate Prisma client
cd server && npx prisma generate

# Reset database
npx prisma db push --force-reset

# View database in Prisma Studio
npx prisma studio
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)

---

<p align="center">
  <strong>⭐ Star us on GitHub if you find this project useful!</strong>
</p>

<p align="center">
  Built with ❤️ by the CryptoFaucet Hub Team
</p>