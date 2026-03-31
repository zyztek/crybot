# 📦 Component Library

Complete reference guide for all React components in CryptoFaucet Hub.

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Analytics Components](#analytics-components)
4. [DeFi Components](#defi-components)
5. [Gaming & NFTs](#gaming--nfts)
6. [Blockchain Tools](#blockchain-tools)
7. [Utility Components](#utility-components)
8. [UI Primitives](#ui-primitives)

---

## Overview

The project contains **70+ React components** organized by functionality. All components follow consistent patterns and use Tailwind CSS for styling.

### Component Patterns

```tsx
// Standard component interface
interface ComponentProps {
  // Required props
  title: string;
  // Optional props
  variant?: 'default' | 'compact' | 'expanded';
  className?: string;
  onAction?: () => void;
}

// Component usage
<Component title="Example" variant="default" onAction={() => console.log('clicked')} />;
```

### Shared Utilities

All components use the `cn()` utility for class name merging:

```tsx
import { cn } from '@/utils/cn';

<div className={cn('base-class', isActive && 'active-class', variant === 'compact' && 'p-2')} />;
```

---

## Core Components

### DashboardView

Main dashboard displaying user statistics, portfolio overview, and quick actions.

**Location:** `src/components/DashboardView.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showSidebar` | `boolean` | `true` | Toggle sidebar visibility |
| `defaultTab` | `string` | `'overview'` | Initial tab selection |

**State:**

- Active tab navigation
- Portfolio balance display
- Recent transactions

**Example:**

```tsx
<DashboardView showSidebar={true} defaultTab="overview" />
```

---

### WalletView

Wallet management interface supporting multiple blockchain networks.

**Location:** `src/components/WalletView.tsx`

**Features:**

- Connect multiple wallets (MetaMask, WalletConnect)
- View balances across networks
- Send/receive transactions
- Network switching

**Supported Networks:**

```typescript
const SUPPORTED_NETWORKS = [
  'ethereum',
  'sepolia', // Testnet
  'arbitrum',
  'optimism',
  'polygon',
  'bsc',
  'solana',
];
```

---

### FaucetsView

Cryptocurrency faucet listing and claiming interface.

**Location:** `src/components/FaucetsView.tsx`

**Features:**

- Filter faucets by network
- Claim history tracking
- Cooldown timers
- Claim limits

**Faucet Data Structure:**

```typescript
interface Faucet {
  id: string;
  name: string;
  network: string;
  tokenSymbol: string;
  dripAmount: number;
  cooldown: number; // hours
  isActive: boolean;
}
```

---

### SettingsView

User preferences and application settings.

**Location:** `src/components/SettingsView.tsx`

**Setting Categories:**

- **Appearance:** Theme, language, currency
- **Notifications:** Email, push, SMS
- **Security:** 2FA, password, sessions
- **Network:** Default network, RPC endpoints
- **Privacy:** Data sharing, analytics

---

## Analytics Components

### AdvancedAnalytics

Comprehensive analytics dashboard with charts and metrics.

**Location:** `src/components/AdvancedAnalytics.tsx`

**Features:**

- Portfolio performance charts (Recharts)
- ROI calculator
- Time range filtering (7d, 30d, 90d, custom)
- Network breakdown
- Comparison mode

**Charts:**

```tsx
// Uses Recharts for data visualization
import { AreaChart, LineChart, BarChart, PieChart } from 'recharts';
```

---

### CryptoChart

Interactive cryptocurrency price charts.

**Location:** `src/components/CryptoChart.tsx`

**Features:**

- Multiple timeframe views (1H, 4H, 1D, 1W, 1M)
- Technical indicators
- Volume display
- Price alerts

**Configuration:**

```typescript
interface ChartConfig {
  symbol: string;
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  indicators: ('EMA' | 'SMA' | 'RSI' | 'MACD')[];
}
```

---

### GasTracker

Real-time gas price monitoring across networks.

**Location:** `src/components/GasTracker.tsx`

**Features:**

- Current gas prices (Gwei)
- Historical gas chart
- Gas estimation for transactions
- Network comparison

**Gas Data:**

```typescript
interface GasPrice {
  network: string;
  slow: number; // Gwei
  standard: number;
  fast: number;
  baseFee: number;
}
```

---

### PerformanceAnalyzer

Portfolio performance tracking and analysis.

**Location:** `src/components/PerformanceAnalyzer.tsx`

**Metrics:**

- Total portfolio value
- Profit/Loss calculation
- ROI percentage
- Historical performance
- Asset allocation

---

## DeFi Components

### YieldFarming

Yield farming opportunities display and management.

**Location:** `src/components/YieldFarming.tsx`

**Features:**

- APY comparison across protocols
- Pool information
- Risk assessment
- One-click deposit (mock)

**Supported Protocols:**

```typescript
const YIELD_PROTOCOLS = [
  { name: 'Uniswap V3', chain: 'ethereum' },
  { name: 'Aave', chain: 'ethereum' },
  { name: 'Curve', chain: 'ethereum' },
  { name: 'PancakeSwap', chain: 'bsc' },
];
```

---

### Staking

Staking pools and rewards tracking.

**Location:** `src/components/Staking.tsx`

**Features:**

- Active stakes display
- Reward calculation
- Unstaking interface
- Lock period information

---

### LendingProtocol

Lending and borrowing interface.

**Location:** `src/components/LendingProtocol.tsx`

**Features:**

- Supply assets (lend)
- Borrow against collateral
- Interest rate display
- Liquidation warnings

---

### LiquidityPoolAnalyzer

LP position analysis and impermanent loss calculator.

**Location:** `src/components/LiquidityPoolAnalyzer.tsx`

**Features:**

- Position value tracking
- Impermanent loss calculation
- Fee revenue display
- Pool composition

---

## Gaming & NFTs

### Games

Central hub for all crypto games.

**Location:** `src/components/Games.tsx`

**Available Games:**

- Crash Game
- Dice Game
- Lottery
- Spin Wheel

---

### NFTGallery

NFT collection viewer and manager.

**Location:** `src/components/NFTGallery.tsx`

**Features:**

- Grid/list view toggle
- Collection filtering
- Metadata display
- Transfer functionality (mock)

---

### NFTMarketplace

NFT trading platform interface.

**Location:** `src/components/NFTMarketplace.tsx`

**Features:**

- Browse listings
- Filter by collection
- Price history
- Make offers (mock)

---

### Lottery

Crypto lottery system with rewards.

**Location:** `src/components/Lottery.tsx`

**Features:**

- Current jackpot display
- Ticket purchase (mock)
- Previous winners
- Draw schedule

---

## Blockchain Tools

### BlockchainExplorer

On-chain data exploration tool.

**Location:** `src/components/BlockchainExplorer.tsx`

**Features:**

- Address lookup
- Transaction search
- Block information
- Token tracking

---

### TransactionSimulator

Transaction simulation and gas estimation.

**Location:** `src/components/TransactionSimulator.tsx`

**Features:**

- TX preview
- Gas estimation
- Failure analysis
- Rollback simulation

---

### SmartContractAuditor

Smart contract security analysis.

**Location:** `src/components/SmartContractAuditor.tsx`

**Features:**

- Contract verification
- Vulnerability scanning
- ABI decoding
- Contract interaction

---

### CrossChainBridge

Cross-chain asset bridging interface.

**Location:** `src/components/CrossChainBridge.tsx`

**Supported Bridges:**

- Across Protocol
- Stargate
- Celer Bridge

---

## Utility Components

### ErrorBoundary

React error boundary for graceful error handling.

**Location:** `src/components/ErrorBoundary.tsx`

**Usage:**

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

---

### FaucetCard

Reusable card component for faucet display.

**Location:** `src/components/FaucetCard.tsx`

**Props:**

```typescript
interface FaucetCardProps {
  faucet: Faucet;
  onClaim: () => void;
  isLoading?: boolean;
  cooldownRemaining?: number;
}
```

---

### LeaderboardView

User rankings and leaderboard display.

**Location:** `src/components/LeaderboardView.tsx`

**Features:**

- Top users by points
- Filter by timeframe
- User search
- Personal ranking

---

## UI Primitives

### Layout Components

Located in `src/components/layout/`:

| Component   | Purpose              |
| ----------- | -------------------- |
| `Sidebar`   | Navigation sidebar   |
| `Header`    | Top navigation bar   |
| `Footer`    | Page footer          |
| `Container` | Main content wrapper |

### UI Components

Located in `src/components/ui/`:

| Component  | Purpose                      |
| ---------- | ---------------------------- |
| `Button`   | Action buttons with variants |
| `Input`    | Form inputs                  |
| `Card`     | Content containers           |
| `Modal`    | Dialog windows               |
| `Toast`    | Notification toasts          |
| `Dropdown` | Selection menus              |

---

## Testing Components

Each component has a corresponding test file:

```bash
src/components/
├── DashboardView.tsx
├── DashboardView.test.tsx
├── WalletView.tsx
├── WalletView.test.tsx
└── ...
```

**Running Component Tests:**

```bash
# Test specific component
npm test -- src/components/DashboardView.test.tsx

# Test all components
npm test -- src/components
```

---

## Performance Considerations

### Memoization

Components use React.memo for expensive renders:

```tsx
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

### Lazy Loading

Large components are lazy-loaded:

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

---

## Next Steps

- [API Reference](../api/index.md) - Backend endpoints
- [Deployment Guide](../deployment/index.md) - Production setup
- [Development Guide](../development/index.md) - Contributing

---

_Last updated: 2025-01-27_
