# API Reference

## Base URL

```
Development: http://localhost:3000/api
Production:  https://your-domain.com/api
```

## Authentication

All protected routes require JWT access token in the header:

```
Authorization: Bearer <access_token>
```

### Endpoints

#### POST /api/auth/register

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "referralCode": "optional"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "email": "user@example.com", "username": "username" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### POST /api/auth/login

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/refresh

Refresh access token using refresh token.

#### POST /api/auth/logout

Logout user and invalidate tokens.

---

## User Endpoints

### GET /api/user/profile

Get current user profile.

### PUT /api/user/profile

Update user profile.

### GET /api/user/stats

Get user statistics.

---

## Wallet Endpoints

### GET /api/wallet

Get all wallets (paginated).

**Query Parameters:**

- `page` (default: 1)
- `limit` (default: 20)

### POST /api/wallet

Create a new wallet.

### GET /api/wallet/:id

Get wallet by ID.

### DELETE /api/wallet/:id

Delete a wallet.

---

## Faucet Endpoints

### GET /api/faucet

Get all available faucets.

### POST /api/faucet/claim

Claim faucet rewards.

**Request:**

```json
{
  "coin": "ETH",
  "network": "sepolia",
  "walletAddress": "0x..."
}
```

### GET /api/faucet/history

Get claim history.

---

## Transaction Endpoints

### GET /api/transaction

Get all transactions.

### GET /api/transaction/stats

Get transaction statistics.

---

## Achievement Endpoints

### GET /api/achievement

Get all achievements (paginated).

### POST /api/achievement/:id/claim

Claim achievement reward.

---

## Analytics Endpoints

### GET /api/analytics/overview

Get analytics overview.

### GET /api/analytics/portfolio

Get portfolio analytics.

---

## Leaderboard Endpoints

### GET /api/leaderboard

Get leaderboard.

**Query Parameters:**

- `period`: daily | weekly | monthly | all_time

---

## Health Check Endpoints

### GET /api/health

Basic health check.

### GET /api/health/ready

Deep health check with database.

### GET /api/health/live

Liveness probe.

---

## Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `UNAUTHORIZED` - Invalid or expired token
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error
