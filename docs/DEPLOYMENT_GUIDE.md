# Crybot Deployment Guide

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Monitoring and Logging](#monitoring-and-logging)
- [Security Configuration](#security-configuration)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## Overview

This guide covers the complete deployment process for the Crybot platform, including local development setup, production deployment, and ongoing maintenance procedures.

## Prerequisites

### System Requirements
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (or yarn 1.22.0+)
- **Git**: 2.30.0 or higher
- **Docker**: 20.10.0 or higher (optional)
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: Minimum 10GB free space

### Development Tools
- **VS Code**: Recommended IDE with extensions
- **Chrome/Brave**: Modern web browser
- **Postman**: API testing (optional)
- **Docker Desktop**: Container management (optional)

### Required Accounts
- **GitHub**: For source code management
- **Vercel/Netlify**: For frontend hosting (optional)
- **AWS/GCP/Azure**: For cloud services (optional)
- **Domain Name**: For custom domain (optional)

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/zyztek/crybot.git
cd crybot
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 4. Environment Variables
```bash
# .env file
VITE_API_BASE_URL=https://api.crybot.com/v1
VITE_WS_URL=wss://api.crybot.com/v1/ws
VITE_AI_SERVICE_URL=http://localhost:8080
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=info
VITE_SENTRY_DSN=your_sentry_dsn
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_GOOGLE_ANALYTICS_ID=GA-...
```

### 5. Validate Setup
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Verify installation
npm run validate
```

## Local Development

### Start Development Server
```bash
# Start development server
npm run dev

# Start with specific port
npm run dev -- --port 3001

# Start with host binding
npm run dev -- --host 0.0.0.0
```

### Development Features
- **Hot Module Replacement**: Instant code updates
- **Source Maps**: Easy debugging
- **Error Overlay**: Development error display
- **Auto-refresh**: Browser reload on changes

### Testing Setup
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## Production Deployment

### Build for Production
```bash
# Build optimized version
npm run build

# Build with analysis
npm run build -- --analyze

# Build for specific environment
npm run build:prod
```

### Preview Build
```bash
# Preview production build locally
npm run preview

# Preview with custom port
npm run preview -- --port 4173
```

### Build Output
```
dist/
  assets/           # Static assets (CSS, JS, images)
  index.html        # Main HTML file
  favicon.ico       # Favicon
  manifest.json     # PWA manifest
```

### Static Hosting Deployment

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Configure project
vercel link
```

#### Netlify Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Configure site
netlify link
```

#### AWS S3 Deployment
```bash
# Install AWS CLI
aws configure

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Docker Deployment

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### Build and Run Docker
```bash
# Build Docker image
docker build -t crybot .

# Run container
docker run -p 80:80 crybot

# Run with environment variables
docker run -p 80:80 \
  -e VITE_API_BASE_URL=https://api.crybot.com/v1 \
  crybot

# Run in background
docker run -d -p 80:80 --name crybot crybot
```

### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:8080
    depends_on:
      - backend

  backend:
    image: crybot-backend:latest
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/crybot
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=crybot
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build -d
```

## Cloud Deployment

### AWS Deployment

#### AWS Amplify
```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

#### AWS ECS
```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name crybot

# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service --cluster crybot --service-name crybot-frontend --task-definition crybot-task
```

### Google Cloud Platform

#### Google App Engine
```yaml
# app.yaml
runtime: nodejs18
instance_class: F1
automatic_scaling:
  min_instances: 1
  max_instances: 10
  cpu_utilization:
    target_utilization: 0.65

env_variables:
  NODE_ENV: production
  VITE_API_BASE_URL: https://api.crybot.com/v1
```

```bash
# Deploy to App Engine
gcloud app deploy

# View logs
gcloud app logs tail -s default
```

### Microsoft Azure

#### Azure Static Web Apps
```bash
# Install Azure CLI
npm i -g @azure/cli

# Login to Azure
az login

# Deploy to Azure
az staticwebapp deploy --name crybot --source .
```

## Monitoring and Logging

### Application Monitoring

#### Sentry Integration
```javascript
// src/main.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

#### Analytics Setup
```javascript
// src/analytics.ts
import { init } from '@amplitude/analytics-browser';

init(import.meta.env.VITE_AMPLITUDE_API_KEY);

// Track events
import { track } from '@amplitude/analytics-browser';
track('Page View', { page: 'dashboard' });
```

### Performance Monitoring

#### Web Vitals
```javascript
// src/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### Custom Metrics
```javascript
// src/metrics.ts
export const trackMetric = (name: string, value: number) => {
  if (window.gtag) {
    window.gtag('event', name, { value });
  }
};
```

### Logging Configuration

#### Development Logging
```javascript
// src/logger.ts
const isDevelopment = import.meta.env.DEV;

export const logger = {
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: Error) => {
    if (isDevelopment) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      // Send to error tracking service
      Sentry.captureException(error);
    }
  }
};
```

#### Production Logging
```javascript
// Configure production logging
if (!import.meta.env.DEV) {
  // Configure external logging service
  const loggingService = new LoggingService({
    endpoint: 'https://logs.crybot.com/v1/logs',
    apiKey: import.meta.env.VITE_LOGGING_KEY
  });
}
```

## Security Configuration

### HTTPS Setup
```nginx
# nginx.conf for HTTPS
server {
    listen 443 ssl http2;
    server_name crybot.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name crybot.com;
    return 301 https://$server_name$request_uri;
}
```

### Security Headers
```javascript
// src/security.ts
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};
```

### Environment Variable Security
```bash
# .env.production (never commit to version control)
VITE_API_BASE_URL=https://api.crybot.com/v1
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_SENTRY_DSN=https://...@sentry.io/...
```

## Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts', 'd3'],
          utils: ['lodash', 'date-fns']
        }
      }
    },
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
});
```

### Caching Strategy
```javascript
// src/cache.ts
export const cacheConfig = {
  // Static assets - 1 year
  static: {
    maxAge: 31536000,
    immutable: true
  },
  // HTML files - no cache
  html: {
    maxAge: 0,
    mustRevalidate: true
  },
  // API responses - 5 minutes
  api: {
    maxAge: 300,
    mustRevalidate: true
  }
};
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze

# Check bundle size
npm run build
npm run size-check
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache
npm run clean

# Delete node_modules
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls
```

#### Runtime Errors
```bash
# Check browser console
# Look for network errors
# Verify API endpoints
# Check CORS configuration
```

#### Performance Issues
```bash
# Check bundle size
# Analyze network requests
# Monitor memory usage
# Profile JavaScript execution
```

### Debugging Tools

#### Chrome DevTools
- **Elements**: Inspect DOM and CSS
- **Console**: View logs and errors
- **Network**: Monitor API calls
- **Performance**: Analyze runtime performance
- **Memory**: Check memory usage

#### React DevTools
```bash
# Install React DevTools browser extension
# Use for component inspection
# Debug state and props
```

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Error Tracking

#### Sentry Configuration
```javascript
// src/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: process.env.npm_package_version,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1
});
```

## Maintenance

### Regular Updates
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions
npm install package@latest

# Audit for security vulnerabilities
npm audit
npm audit fix
```

### Backup Procedures
```bash
# Backup database
pg_dump crybot_db > backup.sql

# Backup configuration files
tar -czf config-backup.tar.gz .env nginx.conf

# Backup deployment scripts
tar -czf scripts-backup.tar.gz scripts/
```

### Health Checks
```bash
# Application health check
curl https://crybot.com/health

# API health check
curl https://api.crybot.com/v1/health

# Database health check
curl https://api.crybot.com/v1/db/health
```

### Monitoring Setup
```bash
# Set up uptime monitoring
# Configure alert thresholds
# Create dashboards
# Set up log aggregation
```

### Deployment Checklist

#### Pre-deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Security scan completed
- [ ] Performance tests passed
- [ ] Documentation updated
- [ ] Backup created
- [ ] Rollback plan prepared

#### Post-deployment
- [ ] Health checks passing
- [ ] Monitoring active
- [ ] Alerts configured
- [ ] Log collection working
- [ ] Performance metrics normal
- [ ] User feedback collected

### Rollback Procedures

#### Quick Rollback
```bash
# Git rollback
git revert HEAD
git push origin main

# Deploy previous version
vercel --prod --prebuilt
```

#### Database Rollback
```bash
# Restore database
psql crybot_db < backup.sql

# Verify data integrity
npm run db:verify
```

---

## Support and Resources

### Documentation
- **API Documentation**: https://docs.crybot.com/api
- **Component Library**: https://docs.crybot.com/components
- **Architecture Guide**: https://docs.crybot.com/architecture

### Community
- **Discord**: https://discord.gg/crybot
- **GitHub Discussions**: https://github.com/zyztek/crybot/discussions
- **Stack Overflow**: Use tag `crybot-deployment`

### Support Channels
- **Email**: support@crybot.com
- **Status Page**: https://status.crybot.com
- **Emergency**: emergency@crybot.com

---

**Last Updated**: 2026-04-10  
**Version**: 2.0.0  
**Maintainers**: Crybot Development Team  
**License**: MIT
