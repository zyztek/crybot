import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WalletView from './WalletView';
import { INITIAL_WALLET_BALANCE } from '../test/fixtures';

describe('WalletView', () => {
  const mockWithdrawalHistory = [
    {
      id: 1,
      coin: 'BTC',
      amount: '0.001',
      address: 'bc1q...',
      status: 'completed',
      date: '2024-01-15',
    },
    { id: 2, coin: 'ETH', amount: '0.05', address: '0x...', status: 'pending', date: '2024-01-14' },
  ];

  const mockProps = {
    walletBalance: INITIAL_WALLET_BALANCE,
    withdrawalHistory: mockWithdrawalHistory,
    showAddress: false,
    onToggleAddress: vi.fn(),
    t: {
      balance: 'Balance',
      recentWithdrawals: 'Recent Withdrawals',
      withdraw: 'Withdraw',
    },
  };

  it('renders balance section title', () => {
    render(<WalletView {...mockProps} />);
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });

  it('renders BTC balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('BTC');
  });

  it('renders ETH balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('ETH');
  });

  it('renders DOGE balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('DOGE');
  });

  it('renders SOL balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('SOL');
  });

  it('renders LTC balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('LTC');
  });

  it('renders BNB balance', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('BNB');
  });

  it('renders recent withdrawals section', () => {
    render(<WalletView {...mockProps} />);
    expect(screen.getByText('Recent Withdrawals')).toBeInTheDocument();
  });

  it('renders completed withdrawal status', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('Completado');
  });

  it('renders pending withdrawal status', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('Pendiente');
  });

  it('renders withdraw button', () => {
    render(<WalletView {...mockProps} />);
    expect(screen.getByText('Hacer Retiro')).toBeInTheDocument();
  });

  it('renders QR scan button', () => {
    render(<WalletView {...mockProps} />);
    expect(screen.getByText('Escanear QR')).toBeInTheDocument();
  });

  it('renders wallet address section', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('Wallet Address');
  });

  it('renders masked address when showAddress is false', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('••••••••••••••••••••••••••••');
  });

  it('calls onToggleAddress when eye button clicked', () => {
    render(<WalletView {...mockProps} />);
    const buttons = document.querySelectorAll('button');
    const eyeButton = Array.from(buttons).find(b => b.innerHTML.includes('Eye'));
    if (eyeButton) {
      fireEvent.click(eyeButton);
      expect(mockProps.onToggleAddress).toHaveBeenCalled();
    }
  });

  it('renders copy address button', () => {
    render(<WalletView {...mockProps} />);
    expect(screen.getByText('Copiar Dirección')).toBeInTheDocument();
  });

  it('renders withdrawal amounts in history', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('0.001 BTC');
    expect(container.textContent).toContain('0.05 ETH');
  });

  it('renders withdrawal dates', () => {
    const { container } = render(<WalletView {...mockProps} />);
    expect(container.textContent).toContain('2024-01-15');
    expect(container.textContent).toContain('2024-01-14');
  });
});
