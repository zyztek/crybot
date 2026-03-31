# Testing Guide

Comprehensive testing documentation for CryptoFaucet Hub.

## Test Stack

- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **React Testing Library** - Component testing

## Running Tests

```bash
# All tests
npm test

# Single run
npm test -- --run

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

## Test Structure

```
src/
├── components/
│   ├── Component.test.tsx
│   └── Component.tsx
├── store/
│   ├── slices/
│   │   └── store.test.ts
└── utils/
    └── util.test.ts
```

## Writing Tests

### Component Tests

```tsx
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

test('renders title', () => {
  render(<Component title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Store Tests

```tsx
import { create } from 'zustand';

test('store updates state', () => {
  const useStore = create(set => ({
    value: 0,
    setValue: v => set({ value: v }),
  }));

  useStore.getState().setValue(10);
  expect(useStore.getState().value).toBe(10);
});
```

## Coverage

Current test coverage: 95%+

Run coverage report:

```bash
npm test -- --coverage
```
