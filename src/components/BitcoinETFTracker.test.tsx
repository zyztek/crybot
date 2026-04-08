import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import BitcoinETFTracker from './BitcoinETFTracker';

// Mock useBTCEtf hook to avoid async state updates during testing
vi.mock('@/hooks/useGraphQL', () => ({
  useBTCEtf: () => ({
    fetchFlows: { execute: vi.fn().mockResolvedValue({ btcEtfFlows: null }), loading: false },
    fetchSummary: { execute: vi.fn().mockResolvedValue({ btcEtfSummary: null }), loading: false },
  }),
}));

describe('BitcoinETFTracker', () => {
  it('renders title', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('ETF Flows');
  });

  it('renders summary cards', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('Total Inflow');
    expect(container.textContent).toContain('Total Outflow');
    expect(container.textContent).toContain('Net Flow');
    expect(container.textContent).toContain('BTC Price Impact');
  });

  it('renders period selector', () => {
    render(<BitcoinETFTracker />);
    expect(screen.getByText('24H')).toBeInTheDocument();
    expect(screen.getByText('7D')).toBeInTheDocument();
    expect(screen.getByText('30D')).toBeInTheDocument();
    expect(screen.getByText('90D')).toBeInTheDocument();
  });

  it('renders ETF table headers', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('ETF');
    expect(container.textContent).toContain('Price');
    expect(container.textContent).toContain('Flow');
    expect(container.textContent).toContain('Holdings');
  });

  it('renders ETF data', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('IBIT');
    expect(container.textContent).toContain('FBTC');
    expect(container.textContent).toContain('GBTC');
    expect(container.textContent).toContain('ARKB');
    expect(container.textContent).toContain('BTCO');
  });

  it('renders inflow trend chart', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('Inflow Trend');
  });

  it('renders net flow chart', () => {
    const { container } = render(<BitcoinETFTracker />);
    expect(container.textContent).toContain('Net Flow vs BTC Price');
  });

  it('renders refresh button', async () => {
    render(<BitcoinETFTracker />);
    await waitFor(() => {
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
  });
});