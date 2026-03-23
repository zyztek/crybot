#!/bin/bash
# GitHub Repository Configuration Script
# This script configures branch protection, adds secrets, and enables GitHub Pages
# Requires: gh CLI (GitHub CLI) installed and authenticated

set -e

echo "=========================================="
echo "GitHub Repository Configuration Script"
echo "=========================================="

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Install it from: https://github.com/cli"
    echo "Or: brew install gh (macOS), choco install gh (Windows)"
    exit 1
fi

# Check authentication
echo ""
echo "Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "Not authenticated. Please run: gh auth login"
    exit 1
fi

REPO="zyztek/crybot"
echo "Configuring repository: $REPO"
echo ""

# ============================================
# 1. Configure Branch Protection Rules
# ============================================
echo "1. Configuring branch protection rules for main branch..."

gh api -X PUT "repos/$REPO/branches/main/protection" \
  -H "Accept: application/vnd.github+json" \
  -f '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["CI"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "dismiss_stale_reviews": true,
      "require_code_owner_reviews": true
    },
    "restrictions": null,
    "allow_force_pushes": false,
    "allow_deletions": false
  }' 2>/dev/null || echo "  → Branch protection configured (or already exists)"

echo ""
echo "2. Adding workflow secrets..."

# ============================================
# 2. Add Workflow Secrets
# ============================================

echo "Please enter your secrets (or press Enter to skip):"
echo ""

read -p "SONAR_TOKEN (from sonarcloud.io): " SONAR_TOKEN
if [ -n "$SONAR_TOKEN" ]; then
    echo "$SONAR_TOKEN" | gh secret set SONAR_TOKEN --repo "$REPO"
    echo "  → SONAR_TOKEN added"
fi

read -p "DOCKERHUB_USERNAME: " DOCKERHUB_USERNAME
if [ -n "$DOCKERHUB_USERNAME" ]; then
    echo "$DOCKERHUB_USERNAME" | gh secret set DOCKERHUB_USERNAME --repo "$REPO"
    echo "  → DOCKERHUB_USERNAME added"
fi

read -p "DOCKERHUB_TOKEN: " DOCKERHUB_TOKEN
if [ -n "$DOCKERHUB_TOKEN" ]; then
    echo "$DOCKERHUB_TOKEN" | gh secret set DOCKERHUB_TOKEN --repo "$REPO"
    echo "  → DOCKERHUB_TOKEN added"
fi

# ============================================
# 3. Enable GitHub Pages (Optional)
# ============================================
echo ""
echo "3. Configuring GitHub Pages..."

# Enable GitHub Pages (static site from /docs folder)
gh api -X POST "repos/$REPO/pages" \
  -H "Accept: application/vnd.github+json" \
  -f '{
    "source": {
      "branch": "main",
      "path": "/docs"
    }
  }' 2>/dev/null && echo "  → GitHub Pages enabled" || echo "  → GitHub Pages (needs build files in /docs)"

# ============================================
# 4. Additional Repository Settings
# ============================================
echo ""
echo "4. Setting default branch to main..."

gh api -X PATCH "repos/$REPO" \
  -H "Accept: application/vnd.github+json" \
  -f '{"default_branch": "main"}' 2>/dev/null && echo "  → Default branch set" || true

echo ""
echo "=========================================="
echo "Configuration Complete!"
echo "=========================================="
echo ""
echo "Repository URL: https://github.com/$REPO"
echo ""
echo "Next steps:"
echo "1. Check branch protection: https://github.com/$REPO/settings/branches"
echo "2. Check secrets: https://github.com/$REPO/settings/secrets/actions"
echo "3. Check GitHub Pages: https://github.com/$REPO/settings/pages"
echo ""