# CI/CD Pipeline Documentation

## Overview

Crybot uses a comprehensive CI/CD pipeline with GitHub Actions to ensure code quality, security, and reliable deployments.

## Workflow Structure

### 1. **CI Pipeline** (`.github/workflows/ci.yml`)
- **Trigger**: Push to `main`/`develop`, Pull Requests
- **Jobs**: Frontend & Backend validation
- **Steps**:
  - Type checking (optimized TypeScript system)
  - Linting (ESLint)
  - Testing (Jest)
  - Building (Vite)

### 2. **CD Pipeline** (`.github/workflows/cd.yml`)
- **Trigger**: Push to `main` branch
- **Jobs**: Quality check + Deploy
- **Steps**:
  - Full quality validation
  - Build optimization
  - Deploy to GitHub Pages
  - Performance monitoring

### 3. **Performance Check** (`.github/workflows/performance.yml`)
- **Trigger**: Weekly, PRs to `main`
- **Jobs**: Lighthouse CI, Bundle analysis
- **Metrics**:
  - Performance score (>80)
  - Accessibility (>90)
  - Bundle size monitoring

### 4. **Security Scan** (`.github/workflows/security.yml`)
- **Trigger**: Push, PRs, Weekly
- **Jobs**: Dependency review, CodeQL, Snyk scan
- **Features**:
  - Automated vulnerability detection
  - License compliance checking
  - Code security analysis

### 5. **Release Workflow** (`.github/workflows/release.yml`)
- **Trigger**: Git tags (`v*`)
- **Jobs**: Automated releases
- **Features**:
  - Full quality validation
  - Changelog generation
  - GitHub release creation

## Quality Gates

### Type System Validation
```bash
npm run typecheck
```
- Validates optimized modular tab system
- Ensures TypeScript strict compliance
- Checks BaseTabType usage

### Code Quality
```bash
npm run lint
npm test
```
- ESLint configuration enforcement
- Jest test suite execution
- Coverage requirements

### Build Performance
```bash
npm run build
```
- Vite optimization
- Bundle size limits
- Asset optimization

## Deployment Process

### Automatic Deployment
1. **Code pushed** to `main` branch
2. **CI pipeline** validates changes
3. **Quality checks** ensure standards
4. **Build process** creates optimized assets
5. **Deploy to GitHub Pages** with automatic URL
6. **Performance monitoring** validates deployment

### Manual Deployment
```bash
# Local testing
npm run build
npm run preview

# Manual trigger via GitHub Actions UI
# Select "Deploy to Production" workflow
# Click "Run workflow"
```

## Environment Variables

### Required for CI/CD
```yaml
# GitHub Actions (auto-provided)
GITHUB_TOKEN

# Optional integrations
SLACK_WEBHOOK_URL          # For notifications
SNYK_TOKEN                 # For security scanning
SONAR_TOKEN                # For code quality analysis
```

### Production Variables
```env
# Application
VITE_API_URL=https://api.crybot.dev
VITE_ENABLE_ANALYTICS=true
VITE_DEFAULT_NETWORK=ethereum

# Build optimization
NODE_OPTIONS=--max-old-space-size=4096
```

## Monitoring & Alerts

### Performance Monitoring
- **Lighthouse CI**: Automated performance scores
- **Bundle Analysis**: Size tracking and optimization
- **Build Metrics**: Performance regression detection

### Security Monitoring
- **Dependency Scanning**: Automated vulnerability detection
- **CodeQL Analysis**: Static code security analysis
- **License Compliance**: Open source license checking

### Notifications
- **Slack Integration**: Deployments and failures
- **GitHub Issues**: Automated issue creation for failures
- **Pull Request Comments**: Status updates

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run typecheck

# Verify build locally
npm run build
```

#### Deployment Failures
- Check GitHub Pages permissions
- Verify build output in `dist/`
- Review workflow logs for specific errors

#### Performance Regression
- Check bundle size changes
- Review Lighthouse scores
- Analyze build performance metrics

### Debugging Workflows

#### Local Testing
```bash
# Install act for local GitHub Actions testing
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run workflow locally
act -j build
```

#### Workflow Logs
1. Go to **Actions** tab in GitHub
2. Select the failed workflow
3. Review job logs for error details
4. Check artifact uploads

## Best Practices

### Code Quality
- Always run `npm run typecheck` before commits
- Ensure tests pass locally
- Follow ESLint configuration

### Performance
- Monitor bundle size changes
- Optimize images and assets
- Use lazy loading where appropriate

### Security
- Keep dependencies updated
- Review security scan results
- Follow secure coding practices

### Deployment
- Test changes in `develop` branch
- Use semantic versioning for releases
- Monitor deployment performance

## Configuration Files

### Key Files
- `.github/workflows/` - CI/CD pipeline definitions
- `.lighthouserc.json` - Performance monitoring config
- `dependabot.yml` - Dependency update automation
- `package.json` - Build scripts and dependencies

### Scripts Reference
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Future Enhancements

### Planned Improvements
- [ ] Container-based deployments
- [ ] Multi-environment support (staging/prod)
- [ ] Advanced performance monitoring
- [ ] Automated rollback capabilities
- [ ] Integration testing pipeline

### Monitoring Expansion
- [ ] Real user monitoring (RUM)
- [ ] Error tracking integration
- [ ] Performance budget enforcement
- [ ] A/B testing framework

---

This documentation is updated automatically with each deployment. For the latest version, visit the [GitHub repository](https://github.com/zyztek/crybot).
