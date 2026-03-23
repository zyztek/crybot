# Branch Protection Guidelines

## Recommended Settings for main Branch

In your GitHub repository settings, configure the following:

### Require Pull Request Reviews
- [x] Require pull request reviews before merging
- [x] Dismiss stale reviews when new commits are pushed
- [x] Require review from code owners
- Number of required reviewers: 1

### Require Status Checks
- [x] Require branches to be up to date before merging
- [x] Require passing CI workflow
- [x] Require code quality checks to pass

### Require Conversation Resolution
- [x] Require all conversations to be resolved before merging

### Include Administrators
- [x] Include administrators in protection rules

### Additional Protections
- [x] Require signed commits (optional, for production)
- [x] Require linear history (optional)
- [x] Allow force pushes (disable for main)

---

## Branch Naming Convention

| Branch | Pattern | Example |
|--------|---------|---------|
| Main | `main` | main |
| Feature | `feature/*` | feature/add-analytics |
| Bug Fix | `fix/*` | fix/login-error |
| Hotfix | `hotfix/*` | hotfix/security-patch |
| Release | `release/*` | release/v1.0.0 |

---

## Workflow

1. Create feature branch from `main`
2. Make changes and commit
3. Push and create Pull Request
4. Request review from code owners
5. Ensure all CI checks pass
6. Squash and merge to `main`