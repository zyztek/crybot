# Troubleshooting Guide

## Quick Diagnostics

### Check System Status

```bash
# Check if frontend is running
curl http://localhost:5173

# Check if backend is running
curl http://localhost:3000/health

# Check if database is running
docker ps | grep postgres
```

---

## Common Issues

### Frontend Issues

#### Issue: "Module not found" errors

**Solution:**

```bash
npm install
# or
rm -rf node_modules && npm install
```

#### Issue: "Port 5173 already in use"

**Solution:**

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5173
kill -9 <PID>
```

#### Issue: Tailwind CSS not loading

**Solution:**

```bash
# Ensure tailwind is installed
npm install -D tailwindcss@latest @tailwindcss/vite

# Rebuild
npm run build
```

#### Issue: TypeScript errors

**Solution:**

```bash
# Clear TypeScript cache
rm -rf node_modules/.vite
rm -rf tsconfig.tsbuildinfo

# Rebuild
npm run build
```

---

### Backend Issues

#### Issue: Database connection failed

**Solution:**

```bash
# Check if PostgreSQL is running
docker ps

# Start database
docker-compose -f docker-compose.db.yml up -d

# Verify connection
cd server && npx prisma db push
```

#### Issue: "JWT_SECRET not defined"

**Solution:**
Create or update `server/.env`:

```env
JWT_SECRET=your-secret-key-minimum-32-characters-long
```

#### Issue: CORS errors

**Solution:**
Update CORS origin in `server/.env`:

```env
CORS_ORIGIN=http://localhost:5173
```

#### Issue: Port 3000 already in use

**Solution:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

---

### Docker Issues

#### Issue: Docker not starting

**Solution:**

```bash
# Restart Docker Desktop
# or
docker system prune
docker-compose down
docker-compose up -d
```

#### Issue: "Container already exists"

**Solution:**

```bash
docker-compose down
docker-compose up -d --force-recreate
```

#### Issue: Volume mount issues

**Solution:**

```bash
# Remove old volumes
docker volume rm crybot_postgres_data
docker-compose up -d
```

---

### Database Issues

#### Issue: Prisma migration failed

**Solution:**

```bash
cd server
npx prisma migrate reset
npx prisma db push
```

#### Issue: "Database does not exist"

**Solution:**

```bash
# Create database manually
docker exec -it crybot-postgres psql -U crybot -c "CREATE DATABASE crybot;"
```

---

## Performance Issues

### Slow build times

**Solutions:**

1. Clear cache: `rm -rf node_modules/.vite`
2. Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`

### High memory usage

**Solutions:**

1. Restart dev servers
2. Clear Docker containers and rebuild
3. Check for memory leaks in code

---

## Getting Help

If you're still experiencing issues:

1. Check [FAQ](FAQ.md)
2. Check existing GitHub Issues
3. Create a new Issue with:
   - Your environment (OS, Node version)
   - Steps to reproduce
   - Error messages
   - What you've tried
