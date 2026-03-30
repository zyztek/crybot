# 🪙 CryptoFaucet Hub - Complete Developer Guide

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture](#architecture)
3. [API Reference](#api-reference)
4. [Deployment](#deployment)
5. [Troubleshooting](#troubleshooting)
6. [Development Guide](#development)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

| Requirement | Version | Installation |
|-------------|---------|--------------|
| Node.js | ≥20.x | [nodejs.org](https://nodejs.org/) |
| npm | ≥10.x | Comes with Node.js |
| PostgreSQL | ≥16.x | [postgresql.org](https://www.postgresql.org/download/) |
| Docker | ≥24.x (optional) | [docker.com](https://www.docker.com/) |
| Git | ≥2.x | [git-scm.com](https://git-scm.com/) |

### Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/zyztek/crybot.git
cd crybot

# 2. Install dependencies
npm install

# 3. Setup database (automatic)
npm run setup:auto

# 4. Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/crybot

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Optional Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REFERRAL=true
VITE_DEFAULT_NETWORK=sepolia
```

---

## 🏗️ Architecture

### Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
├─────────────────────────────────────────────────────────────────┤
│  React 19 + TypeScript 5.6 + Vite 5                            │
│  Zustand (State Management)                                    │
│  Tailwind CSS 4 (Styling)                                      │
│  Recharts (Charts)                                             │
│  Lucide React (Icons)                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
├─────────────────────────────────────────────────────────────────┤
│  Express 4 + TypeScript                                        │
│  Prisma ORM (Database)                                         │
│  PostgreSQL 16                                                  │
│  JWT + Bcrypt (Auth)                                           │
│  WebSocket (Real-time)                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       INFRASTRUCTURE                            │
├─────────────────────────────────────────────────────────────────┤
│  Docker + Docker Compose                                       │
│  GitHub Actions (CI/CD)                                        │
│  GitHub Pages (Frontend Hosting)                               │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
crybot/
├── .github/                    # GitHub configuration
│   ├── workflows/             # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   ├── CODEOWNERS             # Code ownership
│   └── dependabot.yml         # Dependency updates
├── src/                       # Frontend source
│   ├── components/            # React components (70+)
│   ├── store/                 # Zustand stores
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── contexts/              # React contexts
│   └── types/                 # TypeScript definitions
├── server/                    # Backend source
│   ├── src/                   # Express server
│   ├── prisma/                # Database schema
│   └── scripts/               # Setup scripts
├── docs/                      # Documentation
└── tests/                     # Test files
```

### State Management

The application uses **Zustand** for state management with a slice pattern:

```typescript
// Store slices located in src/store/slices/
// - authStore.ts       # Authentication state
// - uiStore.ts         # UI preferences (language, theme)
// - userStore.ts       # User profile data
// - walletStore.ts     # Cryptocurrency balances
// - faucetStore.ts     # Faucet data and claims
// - achievementsStore.ts # Achievements and leaderboard
```

### Data Flow

```
User Action → Component → Hook → Store → Action → API → Database
                ↓
           Re-render ← State Update
```

---

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update user profile |
| GET | `/api/user/wallets` | Get user wallets |
| GET | `/api/user/referrals` | Get referral data |

### Faucet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/faucets` | List all faucets |
| GET | `/api/faucets/:id` | Get faucet details |
| POST | `/api/faucets/:id/claim` | Claim faucet |
| GET | `/api/faucets/history` | Get claim history |

### Achievement Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/achievements` | List achievements |
| GET | `/api/achievements/progress` | User progress |
| POST | `/api/achievements/:id/progress` | Update progress |
| GET | `/api/leaderboard` | Get leaderboard |

### API Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { },
  "message": "Success message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🚀 Deployment

### Docker Deployment (Recommended)

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: crybot
      POSTGRES_PASSWORD: your-password
      POSTGRES_DB: crybot
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://crybot:your-password@postgres:5432/crybot
      JWT_SECRET: your-secret
    depends_on:
      - postgres

  frontend:
    build: .
    ports:
      - "5173:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### GitHub Pages Deployment

The project automatically deploys to GitHub Pages on push to `main`:

1. Build creates single HTML file (vite-plugin-singlefile)
2. GitHub Actions deploys to `gh-pages` branch
3. Available at: `https://zyztek.github.io/crybot/`

### Manual Deployment

```bash
# Build frontend
npm run build

# Start production server
npm run build:production
npm run preview

# Or with Docker
docker-compose up -d
```

---

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Error

**Error:** `Error: P1001: Can't reach database server`

**Solution:**
```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Start PostgreSQL (macOS)
brew services start postgresql

# Start PostgreSQL (Ubuntu)
sudo systemctl start postgresql
```

#### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5173`

**Solution:**
```bash
# Find process using port
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

#### TypeScript Errors

**Error:** Multiple TypeScript compilation errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run typecheck
npm run typecheck
```

#### Test Failures

**Error:** Tests failing

**Solution:**
```bash
# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- src/store/cryptoStore.test.ts
```

---

## 💻 Development Guide

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run typecheck` | Run TypeScript check |

### Running with Docker

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up -d
```

### Database Management

```bash
# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio
```

### Code Style

- Follow ESLint configuration
- Use TypeScript strict mode
- Write tests for new features
- Document complex logic

---

## 📊 Metrics & Monitoring

### Test Coverage

```bash
npm test -- --coverage
```

Current coverage:
- Unit Tests: 95+
- Test Files: 30+
- Coverage: ~85%

### Performance Benchmarks

| Metric | Value |
|--------|-------|
| Initial Load | <2s |
| Build Time | ~30s |
| Test Suite | ~90s |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 📞 Support

- Open an [Issue](https://github.com/zyztek/crybot/issues)
- Join our [Discord](https://discord.gg/crybot)
- Email: support@crypto-faucet-hub.com

---

*Last Updated: January 2024*
*Version: 1.0.0*