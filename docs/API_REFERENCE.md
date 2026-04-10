# Crybot API Reference

## Overview

This comprehensive API reference covers all endpoints, authentication methods, and integration options for Crybot.

## Authentication

### Base URL
```
https://api.crybot.com/v1
```

### Authentication Methods

#### JWT Token Authentication
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI...",
    "expiresIn": 604800,
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "user"
    }
  },
  "message": "Login successful"
}
```

#### OAuth2.0 Authentication
```http
GET /api/v1/auth/oauth/google
Redirects to Google OAuth with callback URL

GET /api/v1/auth/oauth/github
Redirects to GitHub OAuth with callback URL

POST /api/v1/auth/oauth/callback
{
  "provider": "google",
  "code": "auth_code_from_provider",
  "state": "random_state_string"
}
```

#### Two-Factor Authentication
```http
POST /api/v1/auth/2fa/enable
{
  "method": "totp" | "sms" | "email",
  "secret": "backup_code_or_totp_secret"
}

Response:
{
  "success": true,
  "data": {
    "backupCodes": ["123456", "789012", "345678"],
    "recoveryInfo": {
      "enabled": true,
      "backupEmail": "recovery@example.com"
    }
  }
}
```

### Headers
```http
Authorization: Bearer <jwt_token>
X-API-Key: <api_key>
Content-Type: application/json
User-Agent: Crybot-App/1.0.0
```

## User Management

### Get User Profile
```http
GET /api/v1/user/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "username": "john_doe",
    "displayName": "John Doe",
    "avatar": "https://cdn.crybot.com/avatars/user_123.jpg",
    "role": "user",
    "level": "premium",
    "joinedAt": "2024-01-01T00:00:00.000Z",
    "lastLoginAt": "2024-01-15T10:30:00.000Z",
    "preferences": {
      "language": "en",
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "privacy": {
        "showBalance": true,
        "showTransactions": true
      }
    },
    "statistics": {
      "totalClaims": 1250,
      "totalEarned": 12.5,
      "totalReferrals": 25,
      "achievementCount": 15
    }
  }
}
```

### Update User Profile
```http
PUT /api/v1/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayName": "John Doe Updated",
  "avatar": "https://cdn.crybot.com/avatars/new_avatar.jpg",
  "preferences": {
    "language": "es",
    "theme": "light",
    "notifications": {
      "email": true,
      "push": true,
      "sms": true
    }
  }
}

Response:
{
  "success": true,
  "message": "Profile updated successfully"
}
```

### Get User Wallets
```http
GET /api/v1/user/wallets
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "wallets": [
      {
        "id": "wallet_123",
        "type": "metamask",
        "address": "0x742d35Cc6634C0532925a3b844B",
        "network": "ethereum",
        "balance": "1.234567",
        "currency": "ETH",
        "isDefault": true,
        "connectedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": "wallet_456",
        "type": "phantom",
        "address": "9WzDX47B2hL7z1zPjQ7q3j5j5h5h5h5h5",
        "network": "solana",
        "balance": "45.123456",
        "currency": "SOL",
        "isDefault": false,
        "connectedAt": "2024-01-14T15:45:00.000Z"
      }
    ]
  }
}
```

### Connect Wallet
```http
POST /api/v1/user/wallets/connect
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "metamask",
  "address": "0x742d35Cc6634C0532925a3b844B",
  "network": "ethereum",
  "signature": "0x1234567890abcdef1234567890abcdef1234567890"
}

Response:
{
  "success": true,
  "data": {
    "wallet": {
      "id": "wallet_123",
      "type": "metamask",
      "address": "0x742d35Cc6634C0532925a3b844B",
      "network": "ethereum",
      "balance": "1.234567",
      "currency": "ETH",
      "isDefault": true,
      "connectedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

## Faucet Operations

### List Available Faucets
```http
GET /api/v1/faucets
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "faucets": [
      {
        "id": "bitcoin_faucet",
        "name": "Bitcoin Faucet",
        "description": "Get free Bitcoin every 24 hours",
        "cryptocurrency": "BTC",
        "amount": "0.00001",
        "interval": 86400,
        "requirements": {
          "minBalance": "0.0001 BTC",
          "maxClaimsPerDay": 1,
          "verificationRequired": true
        },
        "status": "active",
        "nextClaimAt": "2024-01-15T12:00:00.000Z"
      },
      {
        "id": "ethereum_faucet",
        "name": "Ethereum Faucet",
        "description": "Get free Ethereum every 12 hours",
        "cryptocurrency": "ETH",
        "amount": "0.001",
        "interval": 43200,
        "requirements": {
          "minBalance": "0.01 ETH",
          "maxClaimsPerDay": 2,
          "verificationRequired": false
        },
        "status": "active",
        "nextClaimAt": "2024-01-15T14:00:00.000Z"
      }
    ],
    "totalAvailable": 25,
    "categories": ["major", "altcoins", "defi_tokens"]
  }
}
```

### Get Faucet Details
```http
GET /api/v1/faucets/{faucet_id}
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "bitcoin_faucet",
    "name": "Bitcoin Faucet",
    "description": "Get free Bitcoin every 24 hours",
    "cryptocurrency": "BTC",
    "amount": "0.00001",
    "interval": 86400,
    "requirements": {
      "minBalance": "0.0001 BTC",
      "maxClaimsPerDay": 1,
      "verificationRequired": true
    },
    "status": "active",
    "nextClaimAt": "2024-01-15T12:00:00.000Z",
    "statistics": {
      "totalClaims": 15420,
      "totalDistributed": "0.1542",
      "activeUsers": 1250,
      "averageClaimTime": "45s"
    }
  }
}
```

### Claim from Faucet
```http
POST /api/v1/faucets/{faucet_id}/claim
Authorization: Bearer <token>
Content-Type: application/json

{
  "captcha": "human_verification_code",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

Response:
{
  "success": true,
  "data": {
    "claim": {
      "id": "claim_123456",
      "faucetId": "bitcoin_faucet",
      "userId": "user_123",
      "amount": "0.00001",
      "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
      "status": "pending",
      "estimatedConfirmation": "2024-01-15T12:05:00.000Z",
      "confirmedAt": "2024-01-15T12:08:00.000Z"
    },
    "userStats": {
      "totalClaims": 1251,
      "totalEarned": "0.1251",
      "nextAvailableClaim": "2024-01-16T12:00:00.000Z"
    }
  },
  "message": "Claim submitted successfully"
}
```

### Get Claim History
```http
GET /api/v1/faucets/history
Authorization: Bearer <token>
Query Parameters:
- limit: Number of records to return (default: 50, max: 100)
- offset: Number of records to skip (default: 0)
- status: Filter by claim status (pending, confirmed, failed)
- cryptocurrency: Filter by cryptocurrency (BTC, ETH, etc.)

Response:
{
  "success": true,
  "data": {
    "claims": [
      {
        "id": "claim_123456",
        "faucet": {
          "id": "bitcoin_faucet",
          "name": "Bitcoin Faucet",
          "cryptocurrency": "BTC"
        },
        "amount": "0.00001",
        "status": "confirmed",
        "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
        "claimedAt": "2024-01-15T12:08:00.000Z",
        "confirmedAt": "2024-01-15T12:10:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 1251,
      "hasMore": true
    }
  }
}
```

## Trading Operations

### Get Price Data
```http
GET /api/v1/trading/prices
Query Parameters:
- symbols: Comma-separated list of cryptocurrency symbols (BTC,ETH,SOL,etc.)
- interval: Time interval (1m,5m,15m,1h,4h,1d)
- convert: Convert to specific currency (USD,EUR,etc.)

Response:
{
  "success": true,
  "data": {
    "prices": {
      "BTC": {
        "symbol": "BTC",
        "name": "Bitcoin",
        "price": "45234.56",
        "change24h": "2.34",
        "change7d": "-5.67",
        "marketCap": "885432100000",
        "volume24h": "23456789000",
        "circulatingSupply": "19500000"
      },
      "ETH": {
        "symbol": "ETH",
        "name": "Ethereum",
        "price": "2456.78",
        "change24h": "1.23",
        "change7d": "3.45",
        "marketCap": "295678900000",
        "volume24h": "123456789000",
        "circulatingSupply": "120234567"
      }
    },
    "timestamp": "2024-01-15T12:00:00.000Z"
  }
}
```

### Get Trading Signals
```http
GET /api/v1/trading/signals
Authorization: Bearer <token>
Query Parameters:
- cryptocurrency: Filter signals for specific cryptocurrency
- type: Signal type (buy,sell,hold,warning)
- timeframe: Analysis timeframe (1m,5m,15m,1h,4h,1d)

Response:
{
  "success": true,
  "data": {
    "signals": [
      {
        "id": "signal_123",
        "cryptocurrency": "BTC",
        "type": "buy",
        "strength": 0.85,
        "confidence": 0.92,
        "targetPrice": "46000",
        "stopLoss": "44000",
        "takeProfit": "48000",
        "timeframe": "4h",
        "reason": "RSI oversold + support level",
        "createdAt": "2024-01-15T12:00:00.000Z",
        "expiresAt": "2024-01-15T16:00:00.000Z"
      }
    ],
    "statistics": {
      "accuracy": "78.5",
      "winRate": "65.2",
      "averageReturn": "12.3"
    }
  }
}
```

### Get Portfolio Data
```http
GET /api/v1/trading/portfolio
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "portfolio": {
      "totalValue": "15432.89",
      "totalValueChange24h": "2.34",
      "assets": [
        {
          "cryptocurrency": "BTC",
          "amount": "0.25",
          "value": "11308.64",
          "price": "45234.56",
          "change24h": "2.34",
          "allocation": "73.2"
        },
        {
          "cryptocurrency": "ETH",
          "amount": "3.5",
          "value": "8600.73",
          "price": "2456.78",
          "change24h": "1.23",
          "allocation": "55.7"
        }
      ]
    },
    "performance": {
      "totalReturn": "234.56",
      "totalReturnPercentage": "1.52",
      "sharpeRatio": "1.23",
      "maxDrawdown": "-12.5",
      "volatility": "0.15"
    }
  }
}
```

## DeFi Operations

### Get Yield Farming Data
```http
GET /api/v1/defi/yield
Authorization: Bearer <token>
Query Parameters:
- protocols: Comma-separated list of protocols (aave,compound,uniswap,etc.)
- chain: Filter by blockchain (ethereum,polygon,arbitrum,etc.)
- minAPY: Minimum APY percentage
- maxRisk: Maximum risk level (1-10)

Response:
{
  "success": true,
  "data": {
    "protocols": [
      {
        "id": "aave_v3",
        "name": "Aave V3",
        "chain": "ethereum",
        "category": "lending",
        "tvl": "5234567890",
        "apy": "4.2",
        "riskScore": 3,
        "features": ["variable_rates", "collateral_optimization"],
        "status": "active"
      }
    ],
    "statistics": {
      "totalTVL": "12567890000",
      "averageAPY": "5.6",
      "highestAPY": "12.3",
      "totalProtocols": 45
    }
  }
}
```

### Get Staking Data
```http
GET /api/v1/defi/staking
Authorization: Bearer <token>
Query Parameters:
- cryptocurrency: Filter by cryptocurrency
- protocol: Filter by staking protocol
- status: Filter by staking status (active,completed,pending)

Response:
{
  "success": true,
  "data": {
    "staking": [
      {
        "id": "eth2_staking",
        "cryptocurrency": "ETH",
        "protocol": "Ethereum 2.0",
        "amount": "2.5",
        "apy": "4.5",
        "lockPeriod": 365,
        "rewards": {
          "current": "0.1125",
          "projected": "0.125",
          "currency": "ETH"
        },
        "status": "active",
        "startedAt": "2024-01-01T00:00:00.000Z",
        "unlockAt": "2025-01-01T00:00:00.000Z"
      }
    ],
    "statistics": {
      "totalStaked": "15.678",
      "totalRewards": "0.892",
      "averageAPY": "5.8"
    }
  }
}
```

## Analytics Operations

### Get Analytics Data
```http
GET /api/v1/analytics/dashboard
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 125000,
      "activeUsers": 45000,
      "totalClaims": 15420,
      "totalVolume": "2345678900",
      "totalTransactions": 89000",
      "averageClaimAmount": "0.000015",
      "topCryptocurrencies": ["BTC", "ETH", "USDT", "USDC"]
    },
    "performance": {
      "uptime": "99.95",
      "responseTime": "125ms",
      "errorRate": "0.02",
      "throughput": "1250 req/s"
    },
    "userActivity": {
      "newUsers24h": 450,
      "activeUsers1h": 12500,
      "totalClaims24h": 1250,
      "averageSessionDuration": "8m 45s"
    }
  }
}
```

## Webhooks

### Webhook Configuration
```http
POST /api/v1/webhooks/configure
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://yourapp.com/webhook/crybot",
  "events": ["claim.completed", "price.alert", "wallet.connected", "user.registered"],
  "secret": "webhook_secret_key",
  "active": true,
  "retryPolicy": {
    "maxRetries": 3,
    "retryDelay": 5000
  }
}

Response:
{
  "success": true,
  "data": {
    "webhook": {
      "id": "webhook_123",
      "url": "https://yourapp.com/webhook/crybot",
      "events": ["claim.completed", "price.alert", "wallet.connected", "user.registered"],
      "secret": "webhook_secret_key",
      "status": "active",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

### Webhook Events
```json
{
  "event": "claim.completed",
  "timestamp": "2024-01-15T12:08:00.000Z",
  "data": {
    "claim": {
      "id": "claim_123456",
      "faucetId": "bitcoin_faucet",
      "userId": "user_123",
      "amount": "0.00001",
      "cryptocurrency": "BTC",
      "transactionHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890",
      "status": "confirmed"
    },
    "user": {
      "id": "user_123",
      "email": "user@example.com"
    }
  },
  "signature": "sha256=abcdef1234567890abcdef1234567890abcdef1234567890",
  "secret": "webhook_secret_key"
}
```

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": "The provided email or password is incorrect"
  },
  "timestamp": "2024-01-15T12:08:00.000Z"
}
```

### Error Codes
| Code | Description | HTTP Status |
|------|-------------|------------|
| INVALID_CREDENTIALS | Invalid email or password | 401 |
| TOKEN_EXPIRED | JWT token has expired | 401 |
| INSUFFICIENT_BALANCE | Insufficient balance for claim | 400 |
| RATE_LIMIT_EXCEEDED | Rate limit exceeded | 429 |
| FAUCET_INACTIVE | Faucet is currently inactive | 400 |
| INVALID_WALLET | Invalid wallet address | 400 |
| NETWORK_ERROR | Network connectivity issue | 503 |
| MAINTENANCE_MODE | System under maintenance | 503 |

### Rate Limiting
```http
GET /api/v1/rate-limit
Response:
{
  "success": true,
  "data": {
    "limits": {
      "requests": {
        "current": 45,
        "max": 1000,
        "resetIn": 3600
      },
      "claims": {
        "current": 1,
        "max": 10,
        "resetIn": 86400
      }
    }
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript SDK
```bash
npm install @crybot/sdk
```

```typescript
import { CrybotSDK } from '@crybot/sdk';

const sdk = new CrybotSDK({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.crybot.com/v1',
  timeout: 30000
});

// Authentication
const auth = await sdk.auth.login({
  email: 'user@example.com',
  password: 'secure_password'
});

// Faucet operations
const faucets = await sdk.faucets.list();
const claim = await sdk.faucets.claim('bitcoin_faucet', {
  captcha: 'verification_code'
});

// Trading operations
const prices = await sdk.trading.getPrices(['BTC', 'ETH']);
const portfolio = await sdk.trading.getPortfolio();
```

### Python SDK
```bash
pip install crybot-sdk
```

```python
from crybot_sdk import CrybotClient

client = CrybotClient(
    api_key='your-api-key',
    base_url='https://api.crybot.com/v1'
)

# Authentication
auth = client.auth.login(
    email='user@example.com',
    password='secure_password'
)

# Faucet operations
faucets = client.faucets.list()
claim = client.faucets.claim('bitcoin_faucet')

# Trading operations
prices = client.trading.get_prices(['BTC', 'ETH'])
portfolio = client.trading.get_portfolio()
```

### React Components
```bash
npm install @crybot/react
```

```typescript
import { CrybotProvider, FaucetButton, PriceChart } from '@crybot/react';

function App() {
  return (
    <CrybotProvider apiKey="your-api-key">
      <div>
        <FaucetButton cryptocurrency="bitcoin" />
        <PriceChart symbol="BTC/USD" timeframe="1h" />
      </div>
    </CrybotProvider>
  );
}
```

## Testing

### Test Environment
```
Base URL: https://api-test.crybot.com/v1
Test Faucets: Available
Test Networks: Bitcoin Testnet, Sepolia Testnet
```

### Test Endpoints
```http
POST /api-test/v1/auth/login
{
  "email": "test@example.com",
  "password": "test_password"
}

Response:
{
  "success": true,
  "data": {
    "token": "test_jwt_token",
    "expiresIn": 3600
  }
}
```

This comprehensive API reference covers all major Crybot functionality with detailed examples and error handling.
