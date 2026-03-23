# Testing Guide

## Test Suite Overview

This project includes comprehensive testing for both frontend and backend.

## Running Tests

### Frontend Tests
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Specific file
npm test -- App.test.tsx

# With coverage
npm test -- --coverage
```

### Backend Tests
```bash
cd server

# All tests
npm test

# Watch mode
npm run test:watch

# Specific file
npm test -- auth.test.ts

# Integration tests (requires database)
npm run test:integration
```

## Test Coverage

| Category | Tests | Coverage |
|----------|-------|----------|
| Frontend Components | 40+ | UI, Integration |
| Backend Services | 30+ | Unit, Integration |
| API Routes | 20+ | E2E |
| Utils | 5+ | Unit |

## Writing Tests

### Frontend Component Test
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Backend Service Test
```ts
import { describe, it, expect } from 'vitest';
import { serviceFunction } from './service';

describe('serviceFunction', () => {
  it('returns expected result', async () => {
    const result = await serviceFunction();
    expect(result).toBeDefined();
  });
});
```

## Testing Best Practices

- Write tests before fixing bugs
- Keep tests focused and isolated
- Use meaningful test names
- Aim for 100% coverage on critical paths