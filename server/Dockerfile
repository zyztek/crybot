# CryptoFaucet Backend - Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client (requires DATABASE_URL at build time)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL:-postgresql://crybot:crybot_dev_password@postgres:5432/crybot?schema=public}
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start with entrypoint script that runs migrations
COPY prisma/seed.ts prisma/seed.ts
ENTRYPOINT ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts && exec npm run dev"]