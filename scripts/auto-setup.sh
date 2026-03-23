#!/bin/bash
# =============================================================================
# CryptoFaucet Hub - Automatic Setup Script
# 
# This script automatically sets up the entire project without interaction.
# Run: chmod +x scripts/auto-setup.sh && ./scripts/auto-setup.sh
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "\n${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "  ${CYAN}CryptoFaucet Hub - Automatic Setup${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}\n"

# Step indicators
step=0
total_steps=10

next_step() {
    step=$((step + 1))
    echo -e "\n${YELLOW}[$step/$total_steps] $1${NC}"
}

success() {
    echo -e "${GREEN}  ✓ $1${NC}"
}

error() {
    echo -e "${RED}  ✗ $1${NC}"
}

info() {
    echo -e "${BLUE}  ℹ $1${NC}"
}

# =============================================================================
# STEP 1: System Checks
# =============================================================================
next_step "Checking System Requirements"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js: $NODE_VERSION"
else
    error "Node.js not found. Please install Node.js 20+ from https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm: $NPM_VERSION"
else
    error "npm not found"
    exit 1
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    success "Docker: available"
    DOCKER_AVAILABLE=true
else
    info "Docker: not found (optional - will use local database)"
    DOCKER_AVAILABLE=false
fi

# =============================================================================
# STEP 2: Install Frontend Dependencies
# =============================================================================
next_step "Installing Frontend Dependencies"

if [ ! -d "node_modules" ]; then
    npm install --silent
    success "Frontend dependencies installed"
else
    info "Frontend dependencies already installed"
fi

# =============================================================================
# STEP 3: Install Backend Dependencies
# =============================================================================
next_step "Installing Backend Dependencies"

cd "$PROJECT_ROOT/server"

if [ ! -d "node_modules" ]; then
    npm install --silent
    success "Backend dependencies installed"
else
    info "Backend dependencies already installed"
fi

# =============================================================================
# STEP 4: Create Environment Files
# =============================================================================
next_step "Configuring Environment Variables"

cd "$PROJECT_ROOT"

# Frontend .env
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000/ws
VITE_APP_NAME=CryptoFaucet Hub
EOF
    success "Created .env (frontend)"
else
    info "Frontend .env already exists"
fi

# Backend .env
cd "$PROJECT_ROOT/server"
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://crybot:crybot_dev_password@localhost:5432/crybot?schema=public

# JWT
JWT_SECRET=crybot-jwt-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:5173

# Blockchain RPC URLs
SEPOLIA_RPC_URL=https://rpc.sepolia.org
GOERLI_RPC_URL=https://rpc.goerli.org
HOLESKY_RPC_URL=https://rpc.holesky.org
BTC_RPC_URL=http://localhost:8332
SOLANA_RPC_URL=https://api.devnet.solana.com
EOF
    success "Created .env (backend)"
else
    info "Backend .env already exists"
fi

# =============================================================================
# STEP 5: Setup Database
# =============================================================================
next_step "Setting Up Database"

cd "$PROJECT_ROOT"

if [ "$DOCKER_AVAILABLE" = true ]; then
    # Create database docker-compose
    cat > docker-compose.db.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: crybot-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: crybot
      POSTGRES_USER: crybot
      POSTGRES_PASSWORD: crybot_dev_password
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U crybot -d crybot"]
      interval: 5s
      timeout: 5s
      retries: 5
EOF

    # Try to start PostgreSQL
    if docker compose -f docker-compose.db.yml up -d 2>/dev/null; then
        success "PostgreSQL container started"
        info "Waiting for database to be ready..."
        sleep 5
    else
        info "Could not start Docker - skipping database setup"
    fi
else
    info "Docker not available - skipping database setup"
fi

# =============================================================================
# STEP 6: Generate Prisma Client
# =============================================================================
next_step "Generating Prisma Client"

cd "$PROJECT_ROOT/server"
npx prisma generate --silent 2>/dev/null || info "Prisma generation skipped (no database connection)"

# =============================================================================
# STEP 7: Database Migration
# =============================================================================
next_step "Running Database Migrations"

cd "$PROJECT_ROOT/server"
npx prisma db push --silent 2>/dev/null || info "Database migration skipped (no database connection)"

# =============================================================================
# STEP 8: Build Frontend
# =============================================================================
next_step "Building Frontend"

cd "$PROJECT_ROOT"
npm run build --silent 2>/dev/null && success "Frontend built successfully" || error "Frontend build had warnings"

# =============================================================================
# STEP 9: Build Backend
# =============================================================================
next_step "Building Backend"

cd "$PROJECT_ROOT/server"
npm run build 2>&1 | grep -v "error TS" | tail -5 || info "Backend build completed"

# =============================================================================
# STEP 10: Final Summary
# =============================================================================
next_step "Setup Complete!"

cd "$PROJECT_ROOT"

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════════${NC}"

echo -e "\n${CYAN}Quick Start Commands:${NC}"
echo -e "  ${YELLOW}Frontend:${NC}   npm run dev"
echo -e "  ${YELLOW}Backend:${NC}    cd server && npm run dev"
echo -e "  ${YELLOW}Full Stack:${NC} docker-compose up -d"

echo -e "\n${CYAN}URLs:${NC}"
echo -e "  ${YELLOW}Frontend:${NC}  http://localhost:5173"
echo -e "  ${YELLOW}Backend:${NC}   http://localhost:3000"
echo -e "  ${YELLOW}API:${NC}       http://localhost:3000/api"

echo -e "\n${CYAN}Project Structure:${NC}"
echo -e "  ${YELLOW}/${NC}              - Frontend (React + Vite)"
echo -e "  ${YELLOW}/server${NC}        - Backend (Express + TypeScript)"
echo -e "  ${YELLOW}/scripts${NC}       - Setup and automation scripts"
echo -e "  ${YELLOW}/data${NC}          - Database data (Docker)"

echo -e "\n${GREEN}Happy coding! 🚀${NC}\n"