# Contributing to CryptoFaucet Hub

Thank you for your interest in contributing to CryptoFaucet Hub!

## 🤝 How to Contribute

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Use bug report template
3. Include steps to reproduce, expected vs actual behavior

### Suggesting Features
1. Check feature request discussions
2. Provide clear use cases
3. Explain why this feature would help

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our code style
4. Write tests for new functionality
5. Ensure all tests pass
6. Commit with descriptive messages
7. Push to your fork and create PR

## 📋 Coding Standards

- **Frontend:** React 19, TypeScript, Tailwind CSS 4
- **Backend:** Express.js, TypeScript, Prisma ORM
- **Testing:** Vitest, React Testing Library
- **Formatting:** Use existing code patterns
- **Types:** Avoid `any`, use proper TypeScript types

## 🧪 Testing Requirements

- All new features must include tests
- Run tests before submitting PR:
  ```bash
  # Frontend tests
  npm test
  
  # Backend tests
  cd server && npm test
  ```

## 📝 Commit Messages

Use conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring
- `chore:` Build/tooling changes

## 🔧 Development Setup

```bash
# Clone and setup
git clone https://github.com/zyztek/crybot.git
cd crybot
npm run setup

# Run in development
npm run dev          # Frontend
cd server && npm run dev  # Backend
```

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

For questions, open an issue or join our community discussions!