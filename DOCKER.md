# Docker Setup - CryptoFaucet Hub

Quickly spin up the PostgreSQL database and backend API using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## Quick Start

### 1. Start the services

```bash
docker-compose up -d
```

This will:
- Start PostgreSQL on port 5432
- Start the backend API on port 3000
- Run database migrations automatically
- Seed initial faucet data

### 2. Verify services are running

```bash
# Check container status
docker-compose ps

# Check backend logs
docker-compose logs backend

# Check database logs
docker-compose logs postgres
```

### 3. Test the API

```bash
# Health check
curl http://localhost:3000/api/health

# Register a test user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","username":"tester"}'
```

### 4. Connect the frontend

Update your frontend `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

Then start the frontend:
```bash
npm run dev
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 5432 | Database |
| Backend API | 3000 | REST API |

## Configuration

### Environment Variables

The Docker Compose sets these defaults:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing key
- `CORS_ORIGIN`: Frontend URL for CORS

To customize, edit the `environment` section in `docker-compose.yml`.

### Database Connection

The backend connects to PostgreSQL using the Docker internal network:
- Hostname: `postgres` (the service name)
- Port: `5432`
- Database: `crybot`
- User: `crybot`
- Password: `crybot_dev_password`

## Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache

# View logs
docker-compose logs -f

# Run commands in container
docker-compose exec backend sh
docker-compose exec postgres psql -U crybot -d crybot
```

## Troubleshooting

### "Database connection refused"
Wait a few seconds for PostgreSQL to initialize, or check logs:
```bash
docker-compose logs postgres
```

### "Prisma migration failed"
The entrypoint should run migrations automatically. If it fails:
```bash
docker-compose exec backend npx prisma db push
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d
```

## Production Notes

For production deployment:
1. Change the JWT_SECRET to a secure random value
2. Use strong database passwords
3. Enable SSL for PostgreSQL
4. Add proper health checks
5. Consider using environment files instead of inline values