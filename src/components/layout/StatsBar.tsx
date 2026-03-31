import { Wallet, Activity, Zap, TrendingUp } from 'lucide-react';
import StatCard from '../ui/StatCard';
import type { WalletBalance, ClaimHistory, Faucet } from '@/types';
import type { TranslationTexts } from '@/i18n/translations';

interface StatsBarProps {
  walletBalance: WalletBalance;
  history: ClaimHistory[];
  faucets: Faucet[];
  t: TranslationTexts;
}

export default function StatsBar({ walletBalance, history, faucets, t }: StatsBarProps) {
  const btcValue = walletBalance.btc || '0';
  const historyLength = history?.length ?? 0;
  const faucetsCount = faucets?.filter(f => f.status === 'available').length ?? 0;
  const coinsCount = Object.values(walletBalance).filter(b => parseFloat(String(b)) > 0).length;

  // Ensure all values are strings - use fallback for undefined
  const safeBtcValue = (btcValue ?? '0') + ' BTC';
  const safeHistoryLength = historyLength > 0 ? String(historyLength) : '0';
  const safeFaucetsCount = faucetsCount > 0 ? String(faucetsCount) : '0';
  const safeCoinsCount = coinsCount > 0 ? String(coinsCount) : '0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <StatCard
        icon={<Wallet className="w-5 h-5" />}
        title={t.totalClaimed}
        value={safeBtcValue + ' BTC'}
        color="from-yellow-500/20 to-orange-500/20"
        borderColor="border-yellow-500/30"
        iconColor="text-yellow-400"
        iconBg="bg-yellow-500/20"
      />
      <StatCard
        icon={<Activity className="w-5 h-5" />}
        title={t.todayClaims}
        value={safeHistoryLength}
        color="from-green-500/20 to-emerald-500/20"
        borderColor="border-green-500/30"
        iconColor="text-green-400"
        iconBg="bg-green-500/20"
      />
      <StatCard
        icon={<Zap className="w-5 h-5" />}
        title={t.activeFaucets}
        value={safeFaucetsCount}
        color="from-purple-500/20 to-pink-500/20"
        borderColor="border-purple-500/30"
        iconColor="text-purple-400"
        iconBg="bg-purple-500/20"
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        title={t.availableCoins}
        value={safeCoinsCount}
        color="from-blue-500/20 to-cyan-500/20"
        borderColor="border-blue-500/30"
        iconColor="text-blue-400"
        iconBg="bg-blue-500/20"
      />
    </div>
  );
}
