# API Reference

Complete backend API documentation for CryptoFaucet Hub.

## Overview

The backend is built with Express.js and provides RESTful APIs for all frontend features.

## Base URL

```
Development: http://localhost:3000/api
Production:  https://api.crybot.com/api
```

## Authentication

### POST /api/auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "cryptouser",
  "referralCode": "OPTIONAL"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "user_123", "email": "user@example.com", "username": "cryptouser" },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here"
  }
}
```

### POST /api/auth/login

Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### POST /api/auth/refresh

Refresh expired access token.

**Headers:** `Authorization: Bearer <refresh_token>`

## User Endpoints

### GET /api/user/profile

Get current user profile.

### PUT /api/user/profile

Update user profile.

### GET /api/user/stats

Get user statistics (claims, referrals, achievements).

## Wallet Endpoints

### GET /api/wallet

List all connected wallets.

### POST /api/wallet

Connect a new wallet.

### DELETE /api/wallet/:id

Disconnect a wallet.

## Faucet Endpoints

### GET /api/faucet

List available faucets.

### POST /api/faucet/claim

Claim faucet tokens.

### GET /api/faucet/history

Get claim history.

## Achievement Endpoints

### GET /api/achievement

List all achievements and progress.

### POST /api/achievement/:id/claim

Claim achievement reward.

## Leaderboard

### GET /api/leaderboard

Get top users by points.
