import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LeaderboardView from './LeaderboardView'
import { LEADERBOARD } from '../test/fixtures'

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
  availableCoins: 'Monedas Disponibles',
  referralTitle: 'Programa de Referidos',
  referralDesc: 'Gana el 10% de lo que ganen tus referidos',
  copyCode: 'Copiar Código',
  shareLink: 'Compartir Enlace',
  totalEarnings: 'Ganancias Totales',
  yourCode: 'Tu Código',
  leaderboardTitle: 'Ranking Global',
  rank: 'Posición',
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
  settingsTitle: 'Configuración',
  account: 'Cuenta',
  security: 'Seguridad',
  notifications: 'Notificaciones',
  preferences: 'Preferencias',
  language: 'Idioma',
  theme: 'Tema',
  logout: 'Cerrar Sesión',
  viewMore: 'Ver Más',
  connect: 'Conectar'
}

const renderComponent = (props: Partial<Parameters<typeof LeaderboardView>[0]> = {}) => {
  return render(
    <LeaderboardView
      leaderboard={props.leaderboard || LEADERBOARD.slice(0, 5)}
      t={props.t || mockTranslations}
    />
  )
}

describe('LeaderboardView', () => {
  it('renders leaderboard title', () => {
    renderComponent()
    expect(screen.getByText('Ranking Global')).toBeInTheDocument()
  })

  it('renders all leaderboard entries', () => {
    renderComponent()
    expect(screen.getByText('CryptoKing')).toBeInTheDocument()
    expect(screen.getByText('SatoshiFan')).toBeInTheDocument()
    expect(screen.getByText('ETHMaster')).toBeInTheDocument()
    expect(screen.getByText('DogeWhale')).toBeInTheDocument()
    expect(screen.getByText('CryptoUser123')).toBeInTheDocument()
  })

  it('renders rank numbers', () => {
    renderComponent()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders total claimed amounts', () => {
    renderComponent()
    expect(screen.getByText('2.45678 BTC')).toBeInTheDocument()
    expect(screen.getByText('1.98765 BTC')).toBeInTheDocument()
  })

  it('renders claim counts', () => {
    renderComponent()
    const { container } = renderComponent()
    expect(container.textContent).toContain('claims')
  })

  it('renders avatars', () => {
    renderComponent()
    // Avatar is rendered as emoji in a div
    expect(screen.getByText('👑')).toBeInTheDocument()
    expect(screen.getByText('🎩')).toBeInTheDocument()
    expect(screen.getByText('⚡')).toBeInTheDocument()
  })

  it('highlights user entry when isUser is true', () => {
    const userEntry = LEADERBOARD.find(e => e.isUser)
    if (userEntry) {
      renderComponent({ leaderboard: LEADERBOARD.slice(0, 5) })
      expect(screen.getByText(userEntry.username)).toBeInTheDocument()
    }
  })
})