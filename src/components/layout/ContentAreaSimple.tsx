import { BaseTabType } from '@/types';
import { Fragment } from 'react';

interface ContentAreaProps {
  activeTab: BaseTabType;
  faucets: any;
  walletBalance: any;
  history: any;
  achievements: any;
  leaderboard: any;
  withdrawalHistory: any[];
  user: any;
  showWalletAddress: boolean;
  language: 'es' | 'en';
  theme: 'dark' | 'light';
  searchTerm: string;
  t: any;
  onClaimFaucet: (faucet: any) => void;
  onToggleWalletAddress: () => void;
  onToggleTheme: () => void;
  onCopyReferralCode: () => void;
  onLogout: () => void;
  onClearSearch: () => void;
  referrals: any;
}

export default function ContentAreaSimple({
  activeTab,
  faucets,
  walletBalance,
  history,
  achievements,
  leaderboard,
  withdrawalHistory,
  user,
  showWalletAddress,
  language,
  theme,
  searchTerm,
  t,
  onClaimFaucet,
  onToggleWalletAddress,
  onToggleTheme,
  onCopyReferralCode,
  onLogout,
  onClearSearch,
  referrals,
}: ContentAreaProps) {
  const renderContent = () => {
    switch (activeTab) {
      case 'faucets':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.faucets || 'Faucets'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faucets?.map((faucet: any) => (
                <div
                  key={faucet.id}
                  className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-all duration-200"
                >
                  <div className="text-3xl mb-2">{faucet.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{faucet.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {faucet.reward} every {faucet.timer} minutes
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        faucet.status === 'available'
                          ? 'bg-green-600 text-white'
                          : faucet.status === 'claimed'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                      }`}
                    >
                      {faucet.status}
                    </span>
                    <button
                      onClick={() => onClaimFaucet(faucet)}
                      disabled={faucet.status !== 'available'}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {faucet.status === 'available'
                        ? 'Claim'
                        : faucet.status === 'claimed'
                          ? 'Claimed'
                          : 'Wait'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.dashboard || 'Dashboard'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t?.totalBalance || 'Total Balance'}
                </h3>
                <div className="text-3xl font-bold text-purple-400">
                  {walletBalance?.btc || '0.00000000'} BTC
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t?.totalClaims || 'Total Claims'}
                </h3>
                <div className="text-3xl font-bold text-blue-400">{history?.length || 0}</div>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.wallet || 'Wallet'}</h2>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {t?.walletAddress || 'Wallet Address'}
                </h3>
                <button
                  onClick={onToggleWalletAddress}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                >
                  {showWalletAddress ? 'Hide' : 'Show'}
                </button>
              </div>
              {showWalletAddress && (
                <div className="bg-slate-900 rounded p-3 font-mono text-sm text-slate-300">
                  {user?.walletAddress || '1A1zP1eP5QGefi2DMptfT5T1JnR5Z'}
                </div>
              )}
            </div>
          </div>
        );

      case 'referral':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.referral || 'Referral'}</h2>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t?.yourReferralCode || 'Your Referral Code'}
                </h3>
                <div className="flex items-center gap-4">
                  <code className="bg-slate-900 rounded px-3 py-2 text-purple-400 font-mono">
                    {user?.referralCode || 'CRYBOT2024'}
                  </code>
                  <button
                    onClick={onCopyReferralCode}
                    className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                  >
                    {t?.copy || 'Copy'}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">
                    {t?.totalReferrals || 'Total Referrals'}
                  </h4>
                  <div className="text-2xl font-bold text-green-400">
                    {user?.totalReferrals || 0}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">
                    {t?.referralEarnings || 'Referral Earnings'}
                  </h4>
                  <div className="text-2xl font-bold text-blue-400">
                    {user?.referralEarnings || '0.00000000'} BTC
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t?.leaderboard || 'Leaderboard'}
            </h2>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      {t?.rank || 'Rank'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      {t?.username || 'Username'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      {t?.totalClaimed || 'Total Claimed'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      {t?.claims || 'Claims'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard?.map((entry: any) => (
                    <tr
                      key={entry.rank}
                      className={`border-b border-slate-700 ${
                        entry.isUser ? 'bg-purple-900 bg-opacity-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-300">
                        {entry.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {entry.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">
                        {entry.totalClaimed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">
                        {entry.claims}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t?.achievements || 'Achievements'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements?.map((achievement: any) => {
                return (
                  <div
                    key={achievement.id}
                    className={`bg-slate-800 rounded-lg p-4 border-2 ${
                      achievement.unlocked ? 'border-green-600' : 'border-slate-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{achievement.description}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-400">{t?.progress || 'Progress'}</span>
                        <span className="text-sm text-white">
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-purple-400">{achievement.reward}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.settings || 'Settings'}</h2>
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t?.language || 'Language'}
                </h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200">
                    English
                  </button>
                  <button className="w-full px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors duration-200">
                    Español
                  </button>
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t?.theme || 'Theme'}</h3>
                <div className="space-y-2">
                  <button
                    onClick={onToggleTheme}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
                  >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t?.comingSoon || 'Coming Soon'}</h2>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-slate-400">This feature is coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Fragment>{renderContent()}</Fragment>
    </div>
  );
}
