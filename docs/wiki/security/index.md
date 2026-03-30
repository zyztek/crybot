# Security Guide

Security best practices for CryptoFaucet Hub.

## Authentication

- JWT tokens with short expiry (15 min)
- Refresh tokens (7 days)
- Argon2id password hashing
- Rate limiting on auth endpoints

## API Security

- Input validation with Zod
- CORS whitelist
- Rate limiting (100 req/15min)
- SQL injection prevention (Prisma)

## Data Protection

- Environment variables for secrets
- HTTPS only in production
- Secure cookie settings
- CSRF protection

## Reporting Security Issues

Please report vulnerabilities via GitHub Security or email security@crybot.com
