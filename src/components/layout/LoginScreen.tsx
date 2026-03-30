import { useState } from 'react'
import { Coins, LogOut, Loader2, Mail, Lock, ArrowLeft, KeyRound, CheckCircle, Globe } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'
import { useApi } from '@/hooks/useApi'

interface LoginScreenProps {
  t: TranslationTexts
  onLogin: () => void
}

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password'

export default function LoginScreen({ t, onLogin }: LoginScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [localError, setLocalError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  
  const { login, register, forgotPassword, resetPassword, isLoading } = useApi()

  const isRegister = mode === 'register'
  const isForgotPassword = mode === 'forgot-password'
  const isResetPassword = mode === 'reset-password'
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    setEmailError('')
    setPasswordError('')
    
    if (isForgotPassword) {
      // Handle forgot password request
      if (!email) {
        setEmailError('Email is required')
        return
      }
      const success = await forgotPassword(email)
      if (success) {
        setResetSent(true)
      } else {
        setLocalError(t.lang === 'es' ? 'Error al enviar el email de recuperación' : 'Failed to send reset email')
      }
      return
    }
    
    if (isResetPassword) {
      // Handle password reset
      if (!resetToken) {
        setLocalError('Reset token is required')
        return
      }
      if (!password) {
        setPasswordError('New password is required')
        return
      }
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters')
        return
      }
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match')
        return
      }
      const success = await resetPassword(resetToken, password)
      if (success) {
        setPasswordReset(true)
        setTimeout(() => setMode('login'), 3000)
      } else {
        setLocalError(t.lang === 'es' ? 'Token inválido o expirado' : 'Invalid or expired token')
      }
      return
    }
    
    // Normal login/register
    let hasError = false
    
    if (!email) {
      setEmailError('Email is required')
      hasError = true
    }
    
    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    }
    
    if (hasError) return
    
    if (isRegister && password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }
    
    let success: boolean
    if (isRegister) {
      success = await register(email, password, username || undefined, referralCode || undefined)
    } else {
      success = await login(email, password)
    }
    
    if (success) {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
            <Coins className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CryptoFaucet Hub</h1>
          <p className="text-purple-300">Full Stack Faucet Automation Platform</p>
        </div>

        <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isRegister ? t.register : isForgotPassword ? (t.lang === 'es' ? 'Recuperar Contraseña' : 'Reset Password') : isResetPassword ? (t.lang === 'es' ? 'Nueva Contraseña' : 'New Password') : t.login}
          </h2>
          
          {passwordReset && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm">
                {t.lang === 'es' ? '¡Contraseña restablecida! Redirigiendo...' : 'Password reset! Redirecting...'}
              </p>
            </div>
          )}

          {resetSent && !isResetPassword && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <p className="text-green-300 font-medium">
                  {t.lang === 'es' ? 'Email enviado!' : 'Email sent!'}
                </p>
              </div>
              <p className="text-green-300/70 text-sm">
                {t.lang === 'es' 
                  ? 'Hemos enviado un enlace de recuperación a tu email.' 
                  : 'We sent a password reset link to your email.'}
              </p>
              <button
                type="button"
                onClick={() => { setResetSent(false); setMode('login') }}
                className="mt-3 text-purple-300 hover:text-white text-sm underline"
              >
                {t.lang === 'es' ? 'Volver al inicio de sesión' : 'Back to login'}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label htmlFor="username" className="text-purple-300 text-sm mb-2 block">Username</label>
                <input 
                  id="username"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  placeholder="tu_usuario" 
                  aria-describedby={username ? undefined : 'username-hint'}
                />
                <span id="username-hint" className="sr-only">Enter your desired username</span>
              </div>
            )}
            <div>
              <label htmlFor="email" className="text-purple-300 text-sm mb-2 block">
                {isForgotPassword ? (t.lang === 'es' ? 'Tu email' : 'Your email') : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 ${emailError ? 'border-red-500' : 'border-purple-500/20'}`}
                  placeholder="tu@email.com" 
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  required
                />
              </div>
              {emailError && (
                <span id="email-error" className="text-red-400 text-xs mt-1 block" role="alert">
                  {emailError}
                </span>
              )}
            </div>
            {isResetPassword && (
              <div>
                <label htmlFor="reset-token" className="text-purple-300 text-sm mb-2 block">
                  {t.lang === 'es' ? 'Token de recuperación' : 'Reset Token'}
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input 
                    id="reset-token"
                    type="text" 
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder={t.lang === 'es' ? 'Ingresa el token de tu email' : 'Enter token from your email'}
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="text-purple-300 text-sm mb-2 block">
                  {isResetPassword ? (t.lang === 'es' ? 'Nueva contraseña' : 'New password') : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input 
                    id="password"
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 ${passwordError ? 'border-red-500' : 'border-purple-500/20'}`}
                    placeholder="••••••••" 
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? 'password-error' : undefined}
                    required={!isForgotPassword}
                    minLength={6}
                  />
                </div>
                {passwordError && (
                  <span id="password-error" className="text-red-400 text-xs mt-1 block" role="alert">
                    {passwordError}
                  </span>
                )}
              </div>
            )}

            {isRegister && (
              <div>
                <label htmlFor="confirm-password" className="text-purple-300 text-sm mb-2 block">
                  {t.lang === 'es' ? 'Confirmar contraseña' : 'Confirm password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input 
                    id="confirm-password"
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            )}

            {isResetPassword && (
              <div>
                <label htmlFor="confirm-password" className="text-purple-300 text-sm mb-2 block">
                  {t.lang === 'es' ? 'Confirmar nueva contraseña' : 'Confirm new password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input 
                    id="confirm-password"
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            )}
            {isRegister && (
              <div>
                <label className="text-purple-300 text-sm mb-2 block">Referral Code (optional)</label>
                <input 
                  type="text" 
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none" 
                  placeholder="Código de referido" 
                />
              </div>
            )}
            
            {localError && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm" role="alert">
                {localError}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isForgotPassword ? <Mail className="w-5 h-5" /> : <LogOut className="w-5 h-5 rotate-180" />}
                  {isForgotPassword ? (t.lang === 'es' ? 'Enviar enlace de recuperación' : 'Send Reset Link') : isResetPassword ? (t.lang === 'es' ? 'Restablecer contraseña' : 'Reset Password') : isRegister ? t.register : t.login}
                </>
              )}
            </button>
            
            {!isForgotPassword && !isResetPassword && (
              <button 
                type="button"
                onClick={() => setMode(isRegister ? 'login' : 'register')}
                className="w-full py-3 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all"
              >
                {isRegister ? t.login : t.register}
              </button>
            )}
            
            {isForgotPassword && (
              <button 
                type="button"
                onClick={() => { setResetSent(false); setMode('login') }}
                className="w-full py-3 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.lang === 'es' ? 'Volver al inicio de sesión' : 'Back to login'}
              </button>
            )}

            {isResetPassword && (
              <button 
                type="button"
                onClick={() => { setPasswordReset(false); setMode('forgot-password') }}
                className="w-full py-3 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.lang === 'es' ? 'Solicitar nuevo token' : 'Request new token'}
              </button>
            )}
          </form>

          {/* Forgot Password Link */}
          {!isRegister && !isForgotPassword && !isResetPassword && !passwordReset && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setMode('forgot-password')}
                className="text-purple-300 hover:text-white text-sm transition-colors"
              >
                {t.lang === 'es' ? '¿Olvidaste tu contraseña?' : 'Forgot your password?'}
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-purple-500/20"></div>
            <span className="text-purple-400 text-sm">o</span>
            <div className="flex-1 h-px bg-purple-500/20"></div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800 transition-all">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <span className="text-purple-300 text-xs">Google</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800 transition-all">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">🐦</div>
              <span className="text-purple-300 text-xs">Twitter</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800 transition-all">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-xl">📱</div>
              <span className="text-purple-300 text-xs">MetaMask</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}