import { useState } from 'react'
import { Coins, LogOut, Chrome, Loader2 } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'
import { useApi } from '@/hooks/useApi'

interface LoginScreenProps {
  t: TranslationTexts
  onLogin: () => void
}

export default function LoginScreen({ t, onLogin }: LoginScreenProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [localError, setLocalError] = useState('')
  
  const { login, register, isLoading } = useApi()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    
    if (!email || !password) {
      setLocalError('Please fill in all required fields')
      return
    }
    
    if (isRegister && password.length < 6) {
      setLocalError('Password must be at least 6 characters')
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
            {isRegister ? t.register : t.login}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-purple-300 text-sm mb-2 block">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none" 
                  placeholder="tu_usuario" 
                />
              </div>
            )}
            <div>
              <label className="text-purple-300 text-sm mb-2 block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none" 
                placeholder="tu@email.com" 
              />
            </div>
            <div>
              <label className="text-purple-300 text-sm mb-2 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-purple-400 focus:border-purple-500 focus:outline-none" 
                placeholder="••••••••" 
              />
            </div>
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
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
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
                  <LogOut className="w-5 h-5 rotate-180" />
                  {isRegister ? t.register : t.login}
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="w-full py-3 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all"
            >
              {isRegister ? t.login : t.register}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-purple-500/20"></div>
            <span className="text-purple-400 text-sm">o</span>
            <div className="flex-1 h-px bg-purple-500/20"></div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 p-3 bg-slate-900/50 rounded-lg hover:bg-slate-800 transition-all">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Chrome className="w-5 h-5 text-orange-400" />
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