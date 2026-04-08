import { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Lock,
  Key,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import type { TranslationTexts } from '@/i18n/translations';
import usePushNotifications from '@/hooks/usePushNotifications';

interface SettingsViewProps {
  user: {
    username: string;
    email: string;
    memberSince: string;
    avatar: string;
  };
  t: TranslationTexts;
  lang: 'es' | 'en';
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout: () => void;
}

export default function SettingsView({
  user,
  t,
  lang,
  theme,
  onToggleTheme,
  onLogout,
}: SettingsViewProps) {
  const { isSupported, isSubscribed, isLoading, pushPermission, enablePush, disablePush } =
    usePushNotifications();

  // Load notification settings from localStorage on mount
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Invalid JSON, use defaults
      }
    }
    return {
      email: true,
      claimReminders: true,
      referralUpdates: true,
    };
  });

  // Save notification settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const handlePushToggle = async () => {
    if (isSubscribed) {
      await disablePush();
    } else {
      await enablePush();
    }
  };

  const toggleSetting = (key: keyof typeof notificationSettings) => {
    if (key === 'push') {
      handlePushToggle();
    } else {
      setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

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
          {/* Push Notifications Status */}
          {!isSupported && (
            <div className="flex items-center gap-2 p-2 bg-amber-500/20 border border-amber-500/30 rounded-lg mb-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-xs">Push notifications not supported in this browser</span>
            </div>
          )}
          {pushPermission === 'denied' && (
            <div className="flex items-center gap-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-xs">Notifications blocked. Please enable in browser settings.</span>
            </div>
          )}
          {[
            { key: 'email' as const, label: 'Email Notifications' },
            { key: 'push' as const, label: 'Push Notifications', requiresSupport: true },
            { key: 'claimReminders' as const, label: 'Claim Reminders' },
            { key: 'referralUpdates' as const, label: 'Referral Updates' },
          ].map(item => {
            const isDisabled = item.requiresSupport && !isSupported;
            const isOn = item.key === 'push' ? isSubscribed : notificationSettings[item.key];
            return (
              <div key={item.key} className="flex items-center justify-between">
                <span className={`text-sm ${isDisabled ? 'text-slate-500' : 'text-white'}`}>
                  {item.label}
                  {isLoading && item.key === 'push' && (
                    <span className="ml-2 text-purple-400 text-xs">...</span>
                  )}
                </span>
                <button
                  onClick={() => toggleSetting(item.key)}
                  disabled={isDisabled || (item.key === 'push' && isLoading)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all ${
                    isOn
                      ? 'bg-green-500'
                      : isDisabled
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${
                      isOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
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
          <div className="flex items-center justify-between">
            <span className="text-purple-300 text-sm">{t.theme}</span>
            <button
              onClick={onToggleTheme}
              className={`w-14 h-7 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-purple-600' : 'bg-yellow-500'}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${theme === 'dark' ? 'translate-x-0' : 'translate-x-7'}`}
              />
            </button>
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
  );
}
