import { 
  Home, 
  Wallet, 
  Trophy, 
  Users, 
  Target, 
  Settings, 
  TrendingUp,
  Gamepad2,
  BarChart3,
  MessageCircle,
  Star,
  ShoppingBag,
  Crown,
  Newspaper,
  PiggyBank,
  Shield,
  Search
} from 'lucide-react';
import { BaseTabType, isBaseTab } from '@/types';
import { useCryptoStore, texts } from '@/store/cryptoStore';
import { cn } from '@/utils/cn';

interface NavTabProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavTab({ active, onClick, icon, children }: NavTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200',
        active
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{children}</span>
    </button>
  );
}

interface NavigationTabsProps {
  activeTab: BaseTabType;
  onTabChange: (tab: BaseTabType) => void;
  faucets: any;
  achievements: any;
  language: 'es' | 'en';
  t: any;
}

export default function NavigationTabsSimple({ 
  activeTab, 
  onTabChange, 
  faucets, 
  achievements, 
  language, 
  t 
}: NavigationTabsProps) {
  const availableFaucets = faucets?.filter((f: any) => f.status === 'available') || [];
  const unlockedAchievements = achievements?.filter((a: any) => a.unlocked) || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <NavTab
        active={activeTab === 'faucets'}
        onClick={() => onTabChange('faucets')}
        icon={<Home className="w-4 h-4" />}
      >
        {t?.faucets || 'Faucets'}
        {availableFaucets.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {availableFaucets.length}
          </span>
        )}
      </NavTab>

      <NavTab
        active={activeTab === 'dashboard'}
        onClick={() => onTabChange('dashboard')}
        icon={<BarChart3 className="w-4 h-4" />}
      >
        {t?.dashboard || 'Dashboard'}
      </NavTab>

      <NavTab
        active={activeTab === 'wallet'}
        onClick={() => onTabChange('wallet')}
        icon={<Wallet className="w-4 h-4" />}
      >
        {t?.wallet || 'Wallet'}
      </NavTab>

      <NavTab
        active={activeTab === 'referral'}
        onClick={() => onTabChange('referral')}
        icon={<Users className="w-4 h-4" />}
      >
        {t?.referral || 'Referral'}
      </NavTab>

      <NavTab
        active={activeTab === 'leaderboard'}
        onClick={() => onTabChange('leaderboard')}
        icon={<Trophy className="w-4 h-4" />}
      >
        {t?.leaderboard || 'Leaderboard'}
      </NavTab>

      <NavTab
        active={activeTab === 'achievements'}
        onClick={() => onTabChange('achievements')}
        icon={<Star className="w-4 h-4" />}
      >
        {t?.achievements || 'Achievements'}
        {unlockedAchievements.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unlockedAchievements.length}
          </span>
        )}
      </NavTab>

      <NavTab
        active={activeTab === 'settings'}
        onClick={() => onTabChange('settings')}
        icon={<Settings className="w-4 h-4" />}
      >
        {t?.settings || 'Settings'}
      </NavTab>
    </div>
  );
}
