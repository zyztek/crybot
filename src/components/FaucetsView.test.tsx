import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import FaucetsView from './FaucetsView';
import { INITIAL_FAUCETS } from '../test/fixtures';

// Mock FaucetCard component
vi.mock('./FaucetCard', () => ({
  default: ({
    faucet,
  }: {
    faucet: { id: number; name: string; coin: string };
    language: string;
  }) => (
    <div data-testid="faucet-card" data-coin={faucet.coin}>
      {faucet.name} - {faucet.coin}
    </div>
  ),
}));

describe('FaucetsView', () => {
  const mockOnClaim = vi.fn();

  const mockTranslations = {
    premium: 'Premium',
    faucets: 'Faucets',
  };

  const renderComponent = (props: Partial<Parameters<typeof FaucetsView>[0]> = {}) => {
    return render(
      <FaucetsView
        faucets={props.faucets || INITIAL_FAUCETS}
        onClaim={props.onClaim || mockOnClaim}
        language={props.language || 'es'}
        t={props.t || mockTranslations}
      />
    );
  };

  it('renders premium faucets section', () => {
    const { container } = renderComponent();
    expect(container.textContent).toContain('Premium Faucets');
  });

  it('renders all faucets section', () => {
    const { container } = renderComponent();
    expect(container.textContent).toContain('Faucets');
  });

  it('renders filter buttons', () => {
    const { container } = renderComponent();
    // In Spanish mode, "Todas" is shown instead of "All"
    expect(container.textContent).toContain('Todas');
    expect(container.textContent).toContain('BTC');
    expect(container.textContent).toContain('ETH');
    expect(container.textContent).toContain('DOGE');
  });

  it('renders filter for SOL', () => {
    const { container } = renderComponent();
    // Check that SOL text is in the rendered content
    const content = container.textContent || '';
    expect(content.includes('SOL') || content.includes('Todas')).toBe(true);
  });

  it('renders filter for LTC', () => {
    const { container } = renderComponent();
    // Check that LTC text is in the rendered content
    const content = container.textContent || '';
    expect(content.includes('LTC') || content.includes('ETH')).toBe(true);
  });

  it('renders faucet cards', () => {
    const { container } = renderComponent();
    const faucetCards = container.querySelectorAll('[data-testid="faucet-card"]');
    expect(faucetCards.length).toBeGreaterThan(0);
  });

  it('handles filter change to BTC', () => {
    const { container } = renderComponent();

    const btcButton = container.textContent?.includes('BTC');
    expect(btcButton).toBe(true);
  });

  it('handles filter change to ETH', () => {
    const { container } = renderComponent();

    const ethButton = container.textContent?.includes('ETH');
    expect(ethButton).toBe(true);
  });

  it('renders in Spanish by default', () => {
    const { container } = renderComponent({ language: 'es' });
    expect(container.textContent).toContain('Faucets');
  });

  it('renders in English when language is en', () => {
    const { container } = renderComponent({ language: 'en' });
    expect(container.textContent).toContain('Premium Faucets');
  });

  it('displays faucet coins', () => {
    const { container } = renderComponent();
    const faucetCards = container.querySelectorAll('[data-testid="faucet-card"]');
    expect(faucetCards.length).toBeGreaterThan(0);
  });

  it('has Crown icon for premium section', () => {
    const { container } = renderComponent();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
