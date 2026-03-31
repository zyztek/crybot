import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StatsBar from './StatsBar';
import type { WalletBalance, ClaimHistory, Faucet } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

const mockWalletBalance: WalletBalance = {
  btc: '0.00023045',
  eth: '0.012340',
  doge: '45.6789',
  sol: '2.4567',
  ltc: '0.5678',
  bnb: '0.1234',
};

const mockHistory: ClaimHistory[] = [
  {
    id: 1,
    faucet: 'FreeBitco.in',
    faucetId: 1,
    coin: 'BTC',
    amount: '0.00001000',
    time: '14:32',
    date: 'Hoy',
  },
  {
    id: 2,
    faucet: 'FireFaucet',
    faucetId: 2,
    coin: 'ETH',
    amount: '0.0005',
    time: '14:25',
    date: 'Hoy',
  },
];

const mockFaucets: Faucet[] = [
  {
    id: 1,
    name: 'FreeBitco.in',
    coin: 'BTC',
    icon: '₿',
    reward: '0.00001000',
    timer: 60,
    status: 'available',
    category: 'premium',
    difficulty: 'easy',
    translations: { es: 'Bitcoin Gratis', en: 'Free Bitcoin' },
  },
  {
    id: 2,
    name: 'FireFaucet',
    coin: 'ETH',
    icon: 'Ξ',
    reward: '0.0005',
    timer: 30,
    status: 'available',
    category: 'hot',
    difficulty: 'medium',
    translations: { es: 'Faucet de Fuego', en: 'Fire Faucet' },
  },
  {
    id: 3,
    name: 'Cointiply',
    coin: 'DOGE',
    icon: 'Ð',
    reward: '5.50',
    timer: 45,
    status: 'wait',
    category: 'stable',
    difficulty: 'easy',
    translations: { es: 'Moneda Gratis', en: 'Free Coins' },
  },
];

const mockTranslations: TranslationTexts = {
  login: 'Iniciar Sesión',
  register: 'Registrarse',
  dashboard: 'Panel',
  faucets: 'Faucets',
  wallet: 'Billetera',
  referral: 'Referidos',
  leaderboard: 'Ranking',
  achievements: 'Logros',
  settings: 'Configuración',
  premium: 'Premium',
  hot: '🔥 Hot',
  stable: 'Estable',
  new: 'Nuevo',
  claimNow: 'Claim Ahora',
  remaining: 'restantes',
  claim: 'Reclamar',
  welcome: '¡Bienvenido!',
  totalClaimed: 'Total Reclamado',
  todayClaims: 'Claims Hoy',
  activeFaucets: 'Faucets Activos',
  availableCoins: 'Monedas',
  referralTitle: 'Programa de Referidos',
  referralDesc: 'Gana 10% de lo que ganen tus referidos',
  copyCode: 'Copiar Código',
  shareLink: 'Compartir Enlace',
  totalEarnings: 'Ganancias Totales',
  yourCode: 'Tu Código',
  leaderboardTitle: 'Ranking Global',
  rank: 'Rango',
  user: 'Usuario',
  claimed: 'Reclamado',
  claims: 'Claims',
  withdraw: 'Retirar',
  deposit: 'Depositar',
  balance: 'Balance',
  address: 'Dirección',
  history: 'Historial',
  recentWithdrawals: 'Retiros Recientes',
  achievementsTitle: 'Tus Logros',
  unlocked: 'Desbloqueado',
  locked: 'Bloqueado',
  progress: 'Progreso',
  complete: '¡Completado!',
  settingsTitle: 'Ajustes',
  account: 'Cuenta',
  security: 'Seguridad',
  notifications: 'Notificaciones',
  preferences: 'Preferencias',
  lang: 'Idioma',
  currency: 'Moneda',
  theme: 'Tema',
  logout: 'Cerrar Sesión',
  viewMore: 'Ver Más',
  connect: 'Conectar',
};

describe('StatsBar Snapshot Tests', () => {
  it('matches snapshot with all data (Spanish)', () => {
    const { container } = render(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with empty history', () => {
    const { container } = render(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={[]}
        faucets={mockFaucets}
        t={mockTranslations}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with all faucets available', () => {
    const availableFaucets = mockFaucets.map(f => ({ ...f, status: 'available' as const }));
    const { container } = render(
      <StatsBar
        walletBalance={mockWalletBalance}
        history={mockHistory}
        faucets={availableFaucets}
        t={mockTranslations}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
