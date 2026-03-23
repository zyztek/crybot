# Security Policy

## 🔒 Security Considerations

This project deals with cryptocurrency testnet faucets. While it operates on testnet (not real funds), we take security seriously.

## Reporting Security Issues

If you discover a security vulnerability, please send an email to the maintainers. We will respond within 24 hours.

## Security Best Practices

### For Users
- Never share your private keys or seed phrases
- Use testnet faucets only for testing purposes
- Verify all transactions on block explorers before confirming

### For Developers
- Keep dependencies updated
- Review code for vulnerabilities before deploying
- Use environment variables for sensitive data
- Never commit secrets to version control

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Active          |
| < 1.0   | ❌ End of Life     |

## Environment Security

Ensure these are configured in `.env`:
- JWT_SECRET (minimum 32 characters)
- DATABASE_URL
- CORS_ORIGIN

Never expose these in client-side code.