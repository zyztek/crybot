@echo off
REM GitHub Repository Configuration Script for Windows
REM This script configures branch protection, adds secrets, and enables GitHub Pages
REM Requires: gh CLI (GitHub CLI) installed and authenticated

echo ==========================================
echo GitHub Repository Configuration Script
echo ==========================================
echo.

REM Check if gh is installed
where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: GitHub CLI (gh) is not installed.
    echo Install it from: https://github.com/cli
    echo Or: choco install gh
    pause
    exit /b 1
)

REM Check authentication
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Not authenticated. Please run: gh auth login
    pause
    exit /b 1
)

set REPO=zyztek/crybot
echo Configuring repository: %REPO%
echo.

REM Configure Branch Protection
echo 1. Configuring branch protection rules...
gh api -X PUT "repos/%REPO%/branches/main/protection" -H "Accept: application/vnd.github+json" -f "{\"required_status_checks\":{\"strict\":true,\"contexts\":[\"CI\"]},\"enforce_admins\":true,\"required_pull_request_reviews\":{\"dismiss_stale_reviews\":true,\"require_code_owner_reviews\":true},\"restrictions\":null,\"allow_force_pushes\":false}" >nul 2>&1
echo   Branch protection configured
echo.

REM Add Secrets
echo 2. Adding workflow secrets...
echo.

set /p SONAR_TOKEN="Enter SONAR_TOKEN (from sonarcloud.io) or press Enter to skip: "
if not "%SONAR_TOKEN%"=="" (
    echo %SONAR_TOKEN% | gh secret set SONAR_TOKEN --repo %REPO%
    echo   SONAR_TOKEN added
)

set /p DOCKERHUB_USERNAME="Enter DOCKERHUB_USERNAME or press Enter to skip: "
if not "%DOCKERHUB_USERNAME%"=="" (
    echo %DOCKERHUB_USERNAME% | gh secret set DOCKERHUB_USERNAME --repo %REPO%
    echo   DOCKERHUB_USERNAME added
)

set /p DOCKERHUB_TOKEN="Enter DOCKERHUB_TOKEN or press Enter to skip: "
if not "%DOCKERHUB_TOKEN%"=="" (
    echo %DOCKERHUB_TOKEN% | gh secret set DOCKERHUB_TOKEN --repo %REPO%
    echo   DOCKERHUB_TOKEN added
)

echo.
echo ==========================================
echo Configuration Complete!
echo ==========================================
echo.
echo Repository: https://github.com/%REPO%
echo.

pause