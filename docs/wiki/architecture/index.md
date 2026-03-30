# 🏗️ CryptoFaucet Hub Architecture Guide

## Table of Contents

1. [System Overview](#system-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [State Management](#state-management)
6. [API Design](#api-design)
7. [Security Architecture](#security-architecture)
8. [Deployment Architecture](#deployment-architecture)

---

## System Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CryptoFaucet Hub                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│  │   Frontend   │     │    Backend   │     │  External    │   │
│  │   (React)    │────▶│   (Express)  │────▶│   Services   │   │
│  └──────────────┘     └──────────────┘     └──────────────┘   │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│  │  Zustand     │     │  PostgreSQL  │     │ Ethereum     │   │
│  │  State Store │     │   Database   │     │  Testnet     │   │
│  └──────────────┘     └──────────────┘     └──────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | React | 19.x | UI Framework |
| **Language** | TypeScript | 5.6.x | Type Safety |
| **Styling** | Tailwind CSS | 4.x | UI Styling |
| **State** | Zustand | 5.x | State Management |
| **Charts** | Recharts | 2.x | Data Visualization |
| **Icons** | Lucide React | 0.577.x | Icon System |
| **Build** | Vite | 6.x | Development & Build |
| **Backend** | Express | 5.x | API Server |
| **ORM** | Prisma | 7.x | Database ORM |
| **Database** | PostgreSQL | 16.x | Primary Database |
| **Testing** | Vitest | 2.x | Unit Testing |
| **E2E** | Playwright | 1.x | End-to-End Testing |

---

## Frontend Architecture

### Project Structure

```
src/
├── components/          # React Components (70+)
│   ├── layout/         # Layout components
│   ├── ui/             # UI primitives
│   └── *.tsx           # Feature components
├── contexts/           # React Contexts
├── hooks/              # Custom Hooks
├── store/              # Zustand Store
│   ├── slices/         # Store slices
│   └── cryptoStore.ts  # Main store
├── utils/              # Utility Functions
└── App.tsx             # Main Application
```

### Component Categories

#### Core Components
- **DashboardView** - Main dashboard with stats and charts
- **WalletView** - Wallet management and connections
- **FaucetsView** - Crypto faucet listing and interactions
- **SettingsView** - User preferences and configuration

#### Analytics Components
- **AdvancedAnalytics** - Comprehensive analytics dashboard
- **CryptoChart** - Interactive price charts
- **GasTracker** - Gas price monitoring
- **PerformanceAnalyzer** - Portfolio performance tracking

#### DeFi Components
- **YieldFarming** - Yield farming opportunities
- **Staking** - Staking pools and rewards
- **LendingProtocol** - Lending/borrowing platforms
- **LiquidityPoolAnalyzer** - LP analysis tools

#### Gaming & NFTs
- **Games** - Crypto gaming hub
- **NFTGallery** - NFT collection viewer
- **NFTMarketplace** - NFT trading platform
- **Lottery** - Crypto lottery system

#### Blockchain Tools
- **BlockchainExplorer** - On-chain data explorer
- **TransactionSimulator** - TX simulation
- **SmartContractAuditor** - Contract analysis
- **CrossChainBridge** - Cross-chain bridging

### State Management

#### Zustand Store Architecture

```typescript
// Main store combining all slices
interface CryptoStore extends 
  AuthStore, 
  UIStore, 
  UserStore, 
  WalletStore, 
  FaucetStore, 
  AchievementsStore {
  // Combined state and actions
}
```

#### Store Slices

| Slice | Purpose | Key State |
|-------|---------|-----------|
| **authStore** | Authentication state | user, token, isAuthenticated |
| **uiStore** | UI preferences | theme, language, sidebar |
| **userStore** | User profile | profile, preferences, stats |
| **walletStore** | Wallet connections | wallets, balances, connections |
| **faucetStore** | Faucet data | faucets, claims, history |
| **achievementsStore** | Achievements | achievements, progress |

#### Persistence Configuration

```typescript
const createStorage = () => {
  // Handles localStorage with error recovery
  return {
    getItem: (name) => localStorage.getItem(name),
    setItem: (name, value) => localStorage.setItem(name, value),
    removeItem: (name) => localStorage.removeItem(name),
  };
};

export const useCryptoStore = create(
  persist(
    (set, get, api) => ({
      // Store implementation
    }),
    {
      name: 'crybot-storage',
      storage: createStorage(),
      partialize: (state) => ({ /* selective persistence */ }),
    }
  )
);
```

### Component Patterns

#### Component Structure

```tsx
// Standard component pattern
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const Component = ({ title, onAction }: ComponentProps) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <div className={cn('container', 'p-4')}>
      <h1>{title}</h1>
    </div>
  );
};
```

#### Error Boundary Pattern

```tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

---

## Backend Architecture

### Project Structure

```
server/
├── src/
│   ├── config/         # Configuration
│   │   └── index.ts    # Environment config
│   ├── middleware/     # Express middleware
│   │   ├── auth.ts     # JWT authentication
│   │   ├── error.ts    # Error handling
│   │   └── validate.ts # Request validation
│   ├── routes/         # API endpoints
│   │   ├── auth.ts     # Authentication routes
│   │   ├── user.ts     # User management
│   │   ├── faucet.ts   # Faucet operations
│   │   ├── wallet.ts   # Wallet operations
│   │   └── *.ts        # Other routes
│   ├── services/       # Business logic
│   │   ├── blockchain.ts       # Blockchain interactions
│   │   ├── faucetService.ts    # Faucet logic
│   │   └── scheduler.ts        # Scheduled tasks
│   ├── utils/          # Utilities
│   │   └── helpers.ts  # Helper functions
│   ├── websocket/      # WebSocket handlers
│   │   └── index.ts    # Real-time updates
│   └── index.ts        # Server entry point
└── prisma/
    ├── schema.prisma   # Database schema
    └── migrations/     # Database migrations
```

### API Routes

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/auth` | POST | Authentication (login, register, refresh) |
| `/api/user` | GET, PUT, DELETE | User profile management |
| `/api/wallet` | GET, POST, DELETE | Wallet connections |
| `/api/faucet` | GET, POST | Faucet operations |
| `/api/transaction` | GET, POST | Transaction tracking |
| `/api/achievement` | GET, POST | Achievement management |
| `/api/leaderboard` | GET | Rankings and scores |
| `/api/analytics` | GET | Analytics data |
| `/api/testnetOps` | POST | Testnet operations (authorized) |

### Service Layer

#### Blockchain Service

```typescript
// server/src/services/blockchain.ts
export class BlockchainService {
  async getBalance(address: string, network: string): Promise<BigNumber> {
    const provider = this.getProvider(network);
    return provider.getBalance(address);
  }

  async getTransaction(txHash: string): Promise<Transaction> {
    const provider = this.getProvider('sepolia');
    return provider.getTransaction(txHash);
  }

  async sendTransaction(tx: TransactionRequest): Promise<string> {
    const wallet = this.getAuthorizedWallet();
    return wallet.sendTransaction(tx);
  }

  async getGasPrice(): Promise<GasPrice> {
    const provider = this.getProvider('sepolia');
    return provider.getGasPrice();
  }

  private getProvider(network: string): JsonRpcProvider {
    // Provider instantiation logic
  }
}
```

#### Faucet Service

```typescript
// server/src/services/faucetService.ts
export class FaucetService {
  async claimFaucet(userId: string, network: string): Promise<FaucetClaim> {
    // Rate limiting check
    await this.checkRateLimit(userId, network);
    
    // Balance check
    await this.checkFaucetBalance(network);
    
    // Process claim
    const tx = await this.processClaim(userId, network);
    
    // Record in database
    return this.recordClaim(userId, network, tx.hash);
  }

  private async checkRateLimit(userId: string, network: string): Promise<void> {
    const recentClaims = await prisma.faucetClaim.findMany({
      where: {
        userId,
        network,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }
    });
    
    if (recentClaims.length >= MAX_CLAIMS_PER_DAY) {
      throw new RateLimitError('Daily claim limit exceeded');
    }
  }
}
```

### Middleware Stack

```typescript
// Middleware execution order
app.use(corsMiddleware);           // CORS headers
app.use(rateLimitMiddleware);      // Rate limiting
app.use(authMiddleware);           // JWT verification (protected routes)
app.use(validateMiddleware);       // Request validation
app.use(loggingMiddleware);        // Request logging
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │──────▶│   Wallet    │       │   Faucet    │
└─────────────┘       └─────────────┘       └─────────────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│ Achievement │       │ Transaction │       │  FaucetClaim│
└─────────────┘       └─────────────┘       └─────────────┘
       │
       ▼
┌─────────────┐
│    Persona  │
└─────────────┘
```

### Prisma Schema Models

```prisma
// server/prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  wallets       Wallet[]
  faucetClaims  FaucetClaim[]
  achievements  UserAchievement[]
  referrals     Referral[]      @relation("referrer")
  referredBy    Referral?       @relation("referred")
}

model Wallet {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  address     String
  network     String
  type        WalletType
  createdAt   DateTime @default(now())
}

model Faucet {
  id          String   @id @default(cuid())
  name        String
  network     String
  address     String
  tokenSymbol String
  tokenAddress String?
  dripAmount  Decimal
  cooldown    Int      // hours
  isActive    Boolean  @default(true)
  
  claims      FaucetClaim[]
}

model FaucetClaim {
  id          String   @id @default(cuid())
  userId      String
  faucetId    String
  faucet      Faucet   @relation(fields: [faucetId], references: [id])
  txHash      String
  amount      Decimal
  network     String
  createdAt   DateTime @default(now())
  
  @@index([userId, createdAt])
}

model Achievement {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String
  requirement Int
  reward      Decimal
  category    String
  
  userProgress UserAchievement[]
}

model UserAchievement {
  id            String     @id @default(cuid())
  userId        String
  achievementId String
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  progress      Int        @default(0)
  unlockedAt    DateTime?
  claimed       Boolean    @default(false)
  
  @@unique([userId, achievementId])
}

model Persona {
  id          String   @id @default(cuid())
  name        String
  authorized  Boolean  @default(false)
  address     String
  createdAt   DateTime @default(now())
  
  operations  TestnetOperation[]
}

model TestnetOperation {
  id          String   @id @default(cuid())
  personaId   String
  persona     Persona  @relation(fields: [personaId], references: [id])
  type        String
  txHash      String?
  status      OperationStatus @default(PENDING)
  metadata    Json?
  createdAt   DateTime @default(now())
  completedAt DateTime?
}
```

### Database Indexes

```prisma
// Performance indexes
@@index([userId, createdAt])        // FaucetClaim queries
@@index([network, isActive])        // Faucet filtering
@@index([userId, achievementId])    // Achievement lookups
@@index([status, createdAt])        // Operation filtering
```

---

## API Design

### REST API Conventions

#### URL Structure
```
/api/{resource}/{action}
```

#### HTTP Methods
| Method | Usage | Response Code |
|--------|-------|---------------|
| `GET` | Retrieve resources | 200, 404 |
| `POST` | Create resources | 201, 400 |
| `PUT` | Update resources | 200, 400 |
| `DELETE` | Remove resources | 204, 404 |

#### Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Resource data
  },
  "meta": {
    "page": 1,
    "total": 100,
    "limit": 20
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

### Authentication Flow

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│ Login   │────▶│ Validate│────▶│ Issue   │
│         │     │ Request │     │  creds  │     │  JWT    │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
                                                  │
                                                  ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │◀────│ Access  │◀────│ Verify  │◀────│ Include │
│         │     │ API     │     │  JWT    │     │  Token  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

### Rate Limiting

```typescript
// Rate limit configuration
const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
};
```

---

## Security Architecture

### Authentication

- **JWT Tokens**: Short-lived access tokens (15 min)
- **Refresh Tokens**: Long-lived refresh tokens (7 days)
- **Password Hashing**: Argon2id algorithm
- **Session Management**: Token rotation on refresh

### API Security

| Protection | Implementation |
|------------|----------------|
| **CORS** | Configured allowed origins |
| **Rate Limiting** | Per-IP and per-user limits |
| **Input Validation** | Zod schema validation |
| **SQL Injection** | Prisma parameterized queries |
| **XSS Prevention** | React auto-escaping |
| **CSRF Protection** | Token-based validation |

### Environment Security

```typescript
// Required environment variables for production
const requiredEnvVars = [
  'JWT_SECRET',
  'DATABASE_URL',
  'NODE_ENV',
];
```

---

## Deployment Architecture

### Docker Compose Setup

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:3000

  backend:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/crybot
    depends_on:
      - db

  db:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### GitHub Pages Deployment

```yaml
# .github/workflows/cd.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/deploy-pages@v4
```

---

## Performance Optimization

### Frontend Optimizations

| Technique | Implementation |
|-----------|----------------|
| **Code Splitting** | Vite automatic chunks |
| **Lazy Loading** | React.lazy() for routes |
| **Memoization** | useMemo, useCallback |
| **Virtualization** | react-window for lists |
| **Image Optimization** | Lazy loaded images |

### Backend Optimizations

| Technique | Implementation |
|-----------|----------------|
| **Caching** | Redis for API responses |
| **Database Indexing** | Prisma indexes |
| **Connection Pooling** | Prisma connection pool |
| **Pagination** | Cursor-based pagination |
| **Compression** | Gzip compression |

---

## Monitoring & Logging

### Application Logs

```typescript
// Structured logging
console.log(JSON.stringify({
  level: 'info',
  message: 'API request',
  timestamp: new Date().toISOString(),
  path: '/api/user',
  userId: user.id,
  duration: responseTime,
}));
```

### Health Checks

```yaml
# .github/workflows/schedule.yml
name: Health Check
on:
  schedule:
    - cron: '0 2 * * *'
jobs:
  health:
    runs-on: ubuntu-latest
    steps:
      - run: curl -f http://localhost:3000/health || exit 1
      - run: curl -f http://localhost:5173 || exit 1
```

---

## Next Steps

- [API Reference](../api/index.md) - Detailed API documentation
- [Component Library](../components/index.md) - UI component docs
- [Deployment Guide](../deployment/index.md) - Production deployment
- [Security Guide](../security/index.md) - Security best practices

---

*Last updated: 2025-01-27*