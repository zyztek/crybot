import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MultisigTransactionBuilder from './MultisigTransactionBuilder';

// Mock useMultisig hook to avoid async state updates during testing
vi.mock('@/hooks/useGraphQL', () => ({
  useMultisig: () => ({
    fetchWallets: { 
      execute: vi.fn().mockResolvedValue({ 
        multisigWallets: [{
          id: '1',
          name: 'Test Wallet',
          address: '0x123...',
          threshold: 2,
          signers: [
            { address: '0x1', name: 'Alice', status: 'signed' },
            { address: '0x2', name: 'Bob', status: 'pending' },
          ],
          createdAt: '2024-01-01'
        }]
      }), 
      loading: false 
    },
    fetchTransactions: { 
      execute: vi.fn().mockResolvedValue({ 
        multisigTransactions: [] 
      }), 
      loading: false 
    },
    createTransaction: { 
      execute: vi.fn().mockResolvedValue({ 
        createMultisigTransaction: {
          id: 'tx-1',
          amount: '1.0',
          token: 'ETH',
          requiredSignatures: 2,
          expiresAt: '24 hours'
        }
      }) 
    },
    signTransaction: { execute: vi.fn() },
    executeTransaction: { execute: vi.fn() },
  }),
}));

describe('MultisigTransactionBuilder', () => {
  it('renders component', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Multi-sig');
  });

  it('renders summary cards', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Total Signers');
    expect(container.textContent).toContain('Threshold');
    expect(container.textContent).toContain('Pending Txs');
    expect(container.textContent).toContain('Executed');
  });

  it('renders signers section', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Multi-sig Signers');
  });

  it('renders transaction builder section', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Create New Transaction');
    expect(container.textContent).toContain('Recipient Address');
    expect(container.textContent).toContain('Amount');
    expect(container.textContent).toContain('Token');
  });

  it('renders transaction history section', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Transaction History');
    expect(container.textContent).toContain('Tx ID');
    expect(container.textContent).toContain('Recipient');
  });

  it('renders transactions', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('5.5');
    expect(container.textContent).toContain('ETH');
  });

  it('displays transaction status', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('pending');
    expect(container.textContent).toContain('executed');
  });

  it('shows threshold selector', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Threshold');
  });

  it('renders add signer button', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Add Signer');
  });

  it('renders create button', () => {
    const { container } = render(<MultisigTransactionBuilder />);
    expect(container.textContent).toContain('Create');
  });
});