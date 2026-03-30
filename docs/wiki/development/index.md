# Development Guide

Guide for contributing to CryptoFaucet Hub.

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 16+ (for backend)
- Docker (optional)

## Setup

```bash
# Clone and install
git clone https://github.com/zyztek/crybot.git
cd crybot
npm install

# Setup database
npm run setup:auto

# Start dev server
npm run dev
```

## Code Standards

### Frontend
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Zustand for state management
- Recharts for charts

### Backend
- Express.js with TypeScript
- Prisma ORM
- PostgreSQL database

## Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

## Git Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: add feature"`
3. Push and create PR

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactor
- `test:` Tests
