import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardView from './DashboardView';
import { mockHistory, mockAchievements } from '@/test/fixtures';
import type { TranslationTexts } from '@/i18n/translations';

const mockTranslations: TranslationTexts = {
  history: 'Historial',
  achievementsTitle: 'Tus Logros',
};

describe('DashboardView', () => {
  it('renders history section title', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Historial')).toBeInTheDocument();
  });

  it('renders achievements section title', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Tus Logros')).toBeInTheDocument();
  });

  it('renders weekly stats section in Spanish', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Estadísticas Semanales')).toBeInTheDocument();
  });

  it('renders weekly stats section in English', () => {
    const tEn: TranslationTexts = {
      ...mockTranslations,
      history: 'History',
      achievementsTitle: 'Your Achievements',
    };
    render(
      <DashboardView history={mockHistory} achievements={mockAchievements} t={tEn} language="en" />
    );
    expect(screen.getByText('Weekly Stats')).toBeInTheDocument();
  });

  it('renders claim history items when history exists', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    // Check that at least one history item is rendered
    const historyItems = screen.getAllByText(/FreeBitco\.in/i);
    expect(historyItems.length).toBeGreaterThan(0);
  });

  it('renders achievements with icons', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    // Check for achievement elements (icons are rendered as emojis in test)
    expect(screen.getByText(/First Claim/i)).toBeInTheDocument();
  });

  it('renders pro tip section', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText(/Pro Tip|Consejo Pro/)).toBeInTheDocument();
  });

  it('renders Bitcoin in weekly stats', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });

  it('renders Ethereum in weekly stats', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
  });

  it('renders Dogecoin in weekly stats', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Dogecoin')).toBeInTheDocument();
  });

  it('renders Solana in weekly stats', () => {
    render(
      <DashboardView
        history={mockHistory}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('Solana')).toBeInTheDocument();
  });

  it('renders empty state when history is empty', () => {
    render(
      <DashboardView
        history={[]}
        achievements={mockAchievements}
        t={mockTranslations}
        language="es"
      />
    );
    expect(screen.getByText('No claims yet!')).toBeInTheDocument();
  });
});
