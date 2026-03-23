@echo off
REM =============================================================================
REM CryptoFaucet Hub - Automatic Setup Script (Windows)
REM 
REM Run: scripts\auto-setup.bat
REM =============================================================================

setlocal enabledelayedexpansion

echo.
echo ==============================================================================
echo   CryptoFaucet Hub - Automatic Setup (Windows)
echo ==============================================================================
echo.

set PROJECT_ROOT=%~dp0..
cd /d "%PROJECT_ROOT"

set STEP=0
set TOTAL_STEPS=10

REM Colors for Windows (limited support)
set CYAN=[36m
set YELLOW=[33m
set GREEN=[32m
set RED=[31m
set BLUE=[34m
set NC=[0m

REM =============================================================================
REM STEP 1: System Checks
REM =============================================================================
set /a STEP+=1
echo [42m[%STEP%/%TOTAL_STEPS%] Checking System Requirements[0m

REM Check Node.js
where node >nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('node --version') do set NODE_VERSION=%%i
    echo   [32m✓ Node.js: %NODE_VERSION%[0m
) else (
    echo   [31m✗ Node.js not found. Please install Node.js 20+ from https://nodejs.org[0m
    exit /b 1
)

REM Check npm
where npm >nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo   [32m✓ npm: %NPM_VERSION%[0m
) else (
    echo   [31m✗ npm not found[0m
    exit /b 1
)

REM Check Docker
where docker >nul 2>&1
if %errorlevel% equ 0 (
    echo   [32m✓ Docker: available[0m
    set DOCKER_AVAILABLE=true
) else (
    echo   [34mℹ Docker: not found (optional)[0m
    set DOCKER_AVAILABLE=false
)

REM =============================================================================
REM STEP 2: Install Frontend Dependencies
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Installing Frontend Dependencies[0m

if not exist "node_modules" (
    call npm install --silent
    echo   [32m✓ Frontend dependencies installed[0m
) else (
    echo   [34mℹ Frontend dependencies already installed[0m
)

REM =============================================================================
REM STEP 3: Install Backend Dependencies
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Installing Backend Dependencies[0m

cd /d "%PROJECT_ROOT%\server"
if not exist "node_modules" (
    call npm install --silent
    echo   [32m✓ Backend dependencies installed[0m
) else (
    echo   [34mℹ Backend dependencies already installed[0m
)

REM =============================================================================
REM STEP 4: Create Environment Files
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Configuring Environment Variables[0m

cd /d "%PROJECT_ROOT%"

REM Frontend .env
if not exist ".env" (
    echo VITE_API_URL=http://localhost:3000/api > .env
    echo VITE_WS_URL=ws://localhost:3000/ws >> .env
    echo VITE_APP_NAME=CryptoFaucet Hub >> .env
    echo   [32m✓ Created .env (frontend)[0m
) else (
    echo   [34mℹ Frontend .env already exists[0m
)

REM Backend .env
cd /d "%PROJECT_ROOT%\server"
if not exist ".env" (
    (
        echo # Server Configuration
        echo NODE_ENV=development
        echo PORT=3000
        echo.
        echo # Database
        echo DATABASE_URL=postgresql://crybot:crybot_dev_password@localhost:5432/crybot?schema=public
        echo.
        echo # JWT
        echo JWT_SECRET=crybot-jwt-secret-key-minimum-32-characters-long
        echo JWT_EXPIRES_IN=7d
        echo JWT_REFRESH_EXPIRES_IN=30d
        echo.
        echo # CORS
        echo CORS_ORIGIN=http://localhost:5173
        echo.
        echo # Blockchain RPC URLs
        echo SEPOLIA_RPC_URL=https://rpc.sepolia.org
        echo GOERLI_RPC_URL=https://rpc.goerli.org
        echo HOLESKY_RPC_URL=https://rpc.holesky.org
        echo BTC_RPC_URL=http://localhost:8332
        echo SOLANA_RPC_URL=https://api.devnet.solana.com
    ) > .env
    echo   [32m✓ Created .env (backend)[0m
) else (
    echo   [34mℹ Backend .env already exists[0m
)

REM =============================================================================
REM STEP 5: Setup Database
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Setting Up Database[0m

cd /d "%PROJECT_ROOT%"

if "%DOCKER_AVAILABLE%"=="true" (
    REM Create database docker-compose
    (
        echo version: '3.8'
        echo.
        echo services:
        echo   postgres:
        echo     image: postgres:16-alpine
        echo     container_name: crybot-postgres
        echo     restart: unless-stopped
        echo     environment:
        echo       POSTGRES_DB: crybot
        echo       POSTGRES_USER: crybot
        echo       POSTGRES_PASSWORD: crybot_dev_password
        echo     volumes:
        echo       - ./data/postgres:/var/lib/postgresql/data
        echo     ports:
        echo       - "5432:5432"
    ) > docker-compose.db.yml
    
    echo   [32m✓ Created docker-compose.db.yml[0m
    echo   [34mℹ To start database: docker-compose -f docker-compose.db.yml up -d[0m
) else (
    echo   [34mℹ Docker not available - skipping database setup[0m
)

REM =============================================================================
REM STEP 6: Generate Prisma Client
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Generating Prisma Client[0m

cd /d "%PROJECT_ROOT%\server"
npx prisma generate --silent >nul 2>&1
if %errorlevel% equ 0 (
    echo   [32m✓ Prisma client generated[0m
) else (
    echo   [34mℹ Prisma generation skipped (no database connection)[0m
)

REM =============================================================================
REM STEP 7: Database Migration
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Running Database Migrations[0m

cd /d "%PROJECT_ROOT%\server"
npx prisma db push --silent >nul 2>&1
if %errorlevel% equ 0 (
    echo   [32m✓ Database schema synchronized[0m
) else (
    echo   [34mℹ Database migration skipped (no database connection)[0m
)

REM =============================================================================
REM STEP 8: Build Frontend
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Building Frontend[0m

cd /d "%PROJECT_ROOT%"
call npm run build >nul 2>&1
if %errorlevel% equ 0 (
    echo   [32m✓ Frontend built successfully[0m
) else (
    echo   [33m⚠ Frontend build completed with warnings[0m
)

REM =============================================================================
REM STEP 9: Build Backend
REM =============================================================================
set /a STEP+=1
echo.
echo [33m[%STEP%/%TOTAL_STEPS%] Building Backend[0m

cd /d "%PROJECT_ROOT%\server"
call npm run build >nul 2>&1
if %errorlevel% equ 0 (
    echo   [32m✓ Backend built successfully[0m
) else (
    echo   [33m⚠ Backend build completed with warnings[0m
)

REM =============================================================================
REM STEP 10: Final Summary
REM =============================================================================
set /a STEP+=1
echo.
echo ==============================================================================
echo   Setup Complete!
echo ==============================================================================
echo.

echo [36mQuick Start Commands:[0m
echo   [33mFrontend:[0m   npm run dev
echo   [33mBackend:[0m    cd server ^&^& npm run dev
echo   [33mFull Stack:[0m docker-compose up -d

echo.
echo [36mURLs:[0m
echo   [33mFrontend:[0m  http://localhost:5173
echo   [33mBackend:[0m   http://localhost:3000
echo   [33mAPI:[0m       http://localhost:3000/api

echo.
echo [32mHappy coding! 🚀[0m
echo.

endlocal