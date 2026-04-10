# Crybot Deployment Guide

## Overview

This comprehensive guide covers all deployment methods for Crybot across various platforms and environments.

## Quick Deployments (One-Liners)

### Local Development
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run setup:auto && npm run dev
```

### Docker Production
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && cp .env.compose.production.example .env.compose.production && docker compose --env-file .env.compose.production -f docker-compose.prod.yml up -d --build
```

### GitHub Pages
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && npm run deploy
```

### Vercel
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && npx vercel --prod
```

### Netlify
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && npx netlify deploy --prod --dir=dist
```

### Railway
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && railway up
```

### Render
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && render deploy
```

### DigitalOcean App Platform
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && doctl apps create --spec .do/app.yaml
```

### AWS S3 + CloudFront
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && aws s3 sync dist/ s3://your-bucket --delete && aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Google Cloud Platform
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && gcloud app deploy
```

### Azure Static Web Apps
```bash
git clone https://github.com/zyztek/crybot.git && cd crybot && npm install && npm run build && az webapp up --resource-group crybot-rg --name crybot-app --location eastus --html
```

## Platform-Specific Guides

### Local Development

#### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Git >= 2.x

#### Steps
1. **Clone Repository**
   ```bash
   git clone https://github.com/zyztek/crybot.git
   cd crybot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment**
   ```bash
   npm run setup:auto
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - URL: `http://localhost:5173`
   - Hot reload enabled

### Docker Deployment

#### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

#### Production
```bash
# Copy environment template
cp .env.compose.production.example .env.compose.production

# Edit environment variables
nano .env.compose.production

# Deploy
docker compose --env-file .env.compose.production -f docker-compose.prod.yml up -d --build
```

#### Environment Variables
```yaml
# .env.compose.production
COMPOSE_PROJECT_NAME=crybot
NODE_ENV=production
PORT=3000
VITE_API_URL=https://api.crybot.com
VITE_ENABLE_ANALYTICS=true
```

### GitHub Pages

#### Automatic Deployment
1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions will:**
   - Build the application
   - Deploy to `gh-pages` branch
   - Make available at `https://zyztek.github.io/crybot/`

#### Manual Deployment
```bash
npm run build
npm run deploy
```

### Vercel Deployment

#### Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Using Vercel Dashboard
1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify Deployment

#### Using Netlify CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Using Netlify Dashboard
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables as needed

### Railway Deployment

#### Using Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

#### Configuration
Create `railway.toml`:
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run preview"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Render Deployment

#### Using Render CLI
```bash
# Install Render CLI
npm i -g render

# Deploy
render deploy
```

#### Using Render Dashboard
1. Connect GitHub repository
2. Create Web Service
3. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm run preview`
   - Publish Directory: `dist`

### AWS Deployment

#### S3 + CloudFront
```bash
# Create S3 bucket
aws s3 mb s3://your-crybot-bucket

# Sync files
aws s3 sync dist/ s3://your-crybot-bucket --delete

# Configure static website
aws s3 website s3://your-crybot-bucket --index-document index.html

# Create CloudFront distribution
aws cloudfront create-distribution --origin-domain-name your-crybot-bucket.s3.amazonaws.com --default-root-object index.html
```

#### AWS Amplify
```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Google Cloud Platform

#### App Engine
```bash
# Create app.yaml
cat > app.yaml << EOF
runtime: nodejs20
handlers:
- url: /.*
  static_files: dist/index.html
  upload: dist/index.html
EOF

# Deploy
gcloud app deploy
```

#### Firebase Hosting
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### Azure Deployment

#### Static Web Apps
```bash
# Install Azure CLI
npm i -g @azure/cli

# Login
az login

# Create resource group
az group create --name crybot-rg --location eastus

# Create and deploy
az webapp up --resource-group crybot-rg --name crybot-app --location eastus --html
```

## Environment Configuration

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/crybot

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=production

# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Optional Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REFERRAL=true
VITE_DEFAULT_NETWORK=sepolia
```

### Platform-Specific Variables

#### Vercel
```env
VERCEL_URL=your-app.vercel.app
VERCEL_ENV=production
```

#### Netlify
```env
NETLIFY_URL=your-app.netlify.app
NETLIFY_ENV=production
```

#### Railway
```env
RAILWAY_ENVIRONMENT=production
RAILWAY_SERVICE_NAME=crybot
```

## CI/CD Integration

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Platform
        run: # Platform-specific deploy command
```

### Automatic Deployment Triggers
- **GitHub Pages**: On push to main
- **Vercel**: On push to main
- **Netlify**: On push to main
- **Railway**: On push to main
- **Render**: On push to main

## Monitoring and Health Checks

### Health Check Endpoints
```typescript
// Health check response
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "uptime": "2h 30m 15s",
  "memory": {
    "used": "45.2MB",
    "total": "512MB"
  },
  "services": {
    "database": "connected",
    "api": "operational",
    "cache": "connected"
  }
}
```

### Monitoring Services
- **Uptime Robot**: External monitoring
- **Pingdom**: Performance monitoring
- **New Relic**: Application monitoring
- **DataDog**: Infrastructure monitoring

## Security Considerations

### Production Security
1. **Environment Variables**: Never commit secrets
2. **HTTPS**: Always use SSL/TLS
3. **CORS**: Configure properly
4. **Rate Limiting**: Implement API limits
5. **Authentication**: Secure JWT secrets
6. **Dependencies**: Keep updated

### Security Headers
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
```

### Caching Strategy
- **Static Assets**: 1 year cache
- **HTML**: No cache
- **API Responses**: 5 minutes cache
- **Images**: 30 days cache

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check types
npm run typecheck
```

#### Deployment Failures
```bash
# Check environment variables
npm run env:check

# Verify build
npm run build

# Test locally
npm run preview
```

#### Runtime Errors
```bash
# Check logs
docker logs crybot

# Verify database
npm run db:check

# Test API
curl http://localhost:3000/api/health
```

### Support Resources
- **Documentation**: [docs/](./)
- **Issues**: [GitHub Issues](https://github.com/zyztek/crybot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zyztek/crybot/discussions)
- **Community**: [Discord Server](https://discord.gg/crybot)

## Advanced Configurations

### Custom Domains
```bash
# Configure DNS
A record: @ -> 192.0.2.1
CNAME record: www -> your-domain.com

# SSL Certificate
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Load Balancing
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    image: crybot:latest
    deploy:
      replicas: 3
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.crybot.rule=Host(`your-domain.com`)"
```

### Database Scaling
```sql
-- Connection pooling
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
```

This deployment guide covers all major platforms and provides comprehensive instructions for deploying Crybot in any environment.
