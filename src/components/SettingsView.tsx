import { User, Shield, Lock, Key, Bell, Settings, LogOut, CheckCircle, ChevronRight } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'

interface SettingsViewProps {
  user: {
    username: string
    email: string
    memberSince: string
    avatar: string
  }
  t: TranslationTexts
  lang: 'es' | 'en'
  onLogout: () => void
}

export default function SettingsView({ user, t, lang, onLogout }: SettingsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-400" />
          Profile
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
            {user.avatar}
          </div>
          <div>
            <p className="text-white font-bold text-lg">{user.username}</p>
            <p className="text-purple-300 text-sm">{user.email}</p>
            <p className="text-purple-400 text-xs">Member since {user.memberSince}</p>
          </div>
        </div>
        <button className="w-full py-2 bg-slate-700 text-purple-300 rounded-lg font-medium hover:bg-slate-600 transition-all">
          Edit Profile
        </button>
      </div>

      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          {t.security}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-white text-sm">2FA Authentication</p>
                <p className="text-green-400 text-xs">Enabled</p>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Key className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-sm">Change Password</p>
                <p className="text-purple-400 text-xs">Last changed 30 days ago</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          {t.notifications}
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Email Notifications' },
            { label: 'Push Notifications' },
            { label: 'Claim Reminders' },
            { label: 'Referral Updates' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-white text-sm">{item.label}</span>
              <div className="w-12 h-6 bg-purple-500 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-400" />
          {t.preferences}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-purple-300 text-sm">{t.lang}</span>
            <span className="text-white font-medium">{lang === 'es' ? 'Español' : 'English'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300 text-sm">{t.currency}</span>
            <span className="text-white font-medium">BTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300 text-sm">{t.theme}</span>
            <span className="text-white font-medium">Dark</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <button 
          onClick={onLogout}
          className="w-full py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg font-bold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          {t.logout}
        </button>
      </div>
    </div>
  )
}
