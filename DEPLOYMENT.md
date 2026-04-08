# Deployment Guide

## Production Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Clone and setup
git clone https://github.com/zyztek/crybot.git
cd crybot

# Prepare production environment files
cp .env.compose.production.example .env.compose.production
# Update backend values in server/.env.production
# Update frontend values in .env.production
# Update compose build values in .env.compose.production

# Build and start
docker compose --env-file .env.compose.production -f docker-compose.prod.yml up -d --build

# Check status
docker compose ps
```

### Option 2: Manual Deployment

#### Backend

```bash
cd server

# Build
npm run build

# Update .env for production
# Set NODE_ENV=production

# Start
npm start
```

#### Frontend

```bash
# Build for production
npm run build:production

# The output is in dist/index.html
# Serve with Nginx or any static file server
```

## Environment-Specific Configuration

### Development

```bash
npm run dev          # Frontend (port 5173)
cd server && npm run dev  # Backend (port 3000)
```

### Staging

```bash
npm run dev:staging
cd server && npm run dev:staging
```

### Production

```bash
npm run build:production
cd server && npm run build:production && npm start
```

## Docker Services

### PostgreSQL

```yaml
postgres:
  image: postgres:16-alpine
  environment:
    POSTGRES_DB: crybot
    POSTGRES_USER: crybot
    POSTGRES_PASSWORD: <secure-password>
```

### Backend

```yaml
backend:
  build: ./server
  ports:
    - '3000:3000'
  environment:
    - NODE_ENV=production
    - DATABASE_URL=postgresql://user:pass@postgres:5432/crybot
```

### Frontend

```yaml
frontend:
  build: .
  ports:
    - '80:80'
```

## Health Checks

- **Backend:** http://localhost:3000/health/ready
- **Frontend:** http://localhost/health

## Monitoring

Check logs:

```bash
docker-compose logs -f backend
```

## Backup Database

```bash
docker exec crybot-postgres pg_dump -U crybot crybot > backup.sql
```
