# CryptoFaucet Backend - Production Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for build
COPY package*.json ./
RUN npm ci

# Copy source code and generate Prisma client
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL:-postgresql://crybot:crybot_dev_password@postgres:5432/crybot?schema=public}
RUN npx prisma generate

# Build the application
RUN npm run build

# Runtime image only contains production application files
FROM node:20-alpine AS runtime
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Remove dev dependencies in runtime image
RUN npm prune --production

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start:production"]
