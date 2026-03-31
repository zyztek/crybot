# Deployment Guide

Comprehensive guide for deploying CryptoFaucet Hub to production.

## Deployment Options

### 1. GitHub Pages (Frontend Only)

The frontend is automatically deployed to GitHub Pages via the CD workflow.

```yaml
# .github/workflows/cd.yml
on:
  push:
    branches: [main]
```

**Manual Deploy:**

```bash
npm run build
npm run preview
```

### 2. Docker Deployment

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down
```

### 3. Vercel Deployment

```bash
npm i -g vercel
vercel
```

### 4. Manual Server Deployment

**Frontend:**

```bash
npm run build
npm run preview -- --port 5173 --host
```

**Backend:**

```bash
cd server
npm run build
node dist/index.js
```

## Environment Variables

See [Getting Started](../getting-started/index.md#environment-configuration)

## SSL/TLS Setup

Use Let's Encrypt or your cloud provider's certificates.

## Performance Optimization

- Enable gzip compression
- Set up CDN for static assets
- Configure caching headers
- Use Redis for sessions
