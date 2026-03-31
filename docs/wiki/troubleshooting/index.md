# Troubleshooting Guide

Solutions for common issues in CryptoFaucet Hub.

## Common Issues

### Port Already in Use

```bash
lsof -i :5173
kill -9 <PID>
```

### Node Version Mismatch

```bash
node --version  # Should be 20+
nvm use 20
```

### Database Connection Failed

```bash
pg_isready -h localhost -p 5432
```

### Missing Dependencies

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors

```bash
npm run typecheck
```

### ESLint Errors

```bash
npm run lint
npm run lint:fix
```

### Tests Failing

```bash
npm test -- --run
npm run test:watch
```

## Getting Help

- GitHub Issues
- GitHub Discussions
- Wiki Documentation
