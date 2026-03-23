import { vi } from 'vitest'

// Import store initial data directly from cryptoStore
import { INITIAL_WALLET_BALANCE, INITIAL_USER, INITIAL_ACHIEVEMENTS, LEADERBOARD, INITIAL_FAUCETS, INITIAL_HISTORY } from '../store/cryptoStore'

// Re-export store fixtures
export { INITIAL_WALLET_BALANCE, INITIAL_USER, INITIAL_ACHIEVEMENTS, LEADERBOARD, INITIAL_FAUCETS, INITIAL_HISTORY }

// Component-specific fixtures - use store initial data
export const mockUser = INITIAL_USER

export const mockWalletBalance = INITIAL_WALLET_BALANCE

export const mockHistory = INITIAL_HISTORY

export const mockFaucets = INITIAL_FAUCETS

// Game component props fixtures
export const gameMockProps = {
  userCoins: 1000,
  onWin: vi.fn(),
  onLoss: vi.fn(),
}

export const mockTranslations = {
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
  logout: 'Cerrar Sesión',
  profile: 'Perfil',
  changePassword: 'Cambiar Contraseña',
  twoFactor: 'Autenticación de Dos Factores',
  enable: 'Activar',
  disable: 'Desactivar',
  emailNotifications: 'Notificaciones por Email',
  pushNotifications: 'Notificaciones Push',
  language: 'Idioma',
  theme: 'Tema',
  darkMode: 'Modo Oscuro',
  lightMode: 'Modo Claro',
  save: 'Guardar',
  cancel: 'Cancelar',
  edit: 'Editar',
  delete: 'Eliminar',
}