# Frequently Asked Questions

## General

### What is CryptoFaucet Hub?
CryptoFaucet Hub is a comprehensive cryptocurrency faucet automation platform that allows users to claim testnet cryptocurrency from multiple blockchain networks including Ethereum (Sepolia, Goerli, Holesky), Bitcoin (Testnet), and Solana (Devnet).

### Is this free to use?
Yes, the platform is free to use. Testnet faucets provide free test cryptocurrency for development and testing purposes only.

### Does this work with real cryptocurrency?
No. This platform works exclusively with testnet cryptocurrencies which have no real monetary value.

---

## Account & Authentication

### How do I create an account?
1. Click "Registrarse" (Register) on the login screen
2. Enter your email, username, and password
3. Optionally add a referral code
4. Click the register button

### I forgot my password, what should I do?
Currently, password reset functionality is under development. Please contact support for assistance.

### Can I have multiple accounts?
No, multiple accounts are not allowed. Each user should maintain only one account.

---

## Faucets

### How often can I claim faucets?
Each faucet has a cooldown period (typically 24 hours). You must wait for the cooldown to expire before claiming again.

### Which blockchains are supported?
- Ethereum: Sepolia, Goerli, Holesky
- Bitcoin: Testnet
- Solana: Devnet

### Why isn't my claim working?
Check the following:
1. Are you within the cooldown period?
2. Is your wallet address valid for the specific network?
3. Is the faucet currently active?

---

## Technical

### What are the system requirements?
- Node.js 20+
- PostgreSQL 16+ (or Docker)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Can I run this locally?
Yes, follow the [Environment Setup Guide](ENVIRONMENT.md) for local development.

### How do I contribute?
See our [Contributing Guide](CONTRIBUTING.md) for details on how to contribute to the project.

---

## Security

### Is my data safe?
We implement industry-standard security practices including:
- Password hashing with bcrypt
- JWT authentication with refresh tokens
- HTTPS in production
- Rate limiting

### What should I do if I find a security issue?
Please see our [Security Policy](SECURITY.md) for reporting security vulnerabilities.

---

## Troubleshooting

### Frontend won't build
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database connection failed
```bash
# Check PostgreSQL is running
docker-compose ps

# Or check database connection
cd server && npx prisma db push
```

### Port already in use
```bash
# Find and kill process on port 3000 (backend) or 5173 (frontend)
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

---

## Contact

For additional questions, please open an issue on GitHub or join our community discussions.