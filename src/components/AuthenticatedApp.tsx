import { useAppContext } from './AppProvider';
import ContentAreaSimple from './layout/ContentAreaSimple';
import Footer from './layout/Footer';
import Header from './layout/Header';
import NavigationTabs from './layout/NavigationTabs';
import StatsBar from './layout/StatsBar';

export default function AuthenticatedApp() {
  const {
    user,
    language,
    theme,
    searchTerm,
    setSearchTerm,
    walletBalance,
    history,
    faucets,
    activeTab,
    setActiveTab,
    achievements,
    leaderboard,
    withdrawalHistory,
    showWalletAddress,
    handleClaimFaucet,
    toggleLanguage,
    toggleTheme,
    toggleWalletAddress,
    copyReferralCode,
    handleLogout,
    onClearSearch,
    referrals,
    t,
  } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header
        user={user}
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <main id="main-content" className="container mx-auto px-4 py-6" tabIndex={-1}>
        <StatsBar walletBalance={walletBalance} history={history} faucets={faucets} t={t} />

        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          faucets={faucets}
          achievements={achievements}
          language={language}
          t={t}
        />

        <ContentAreaSimple
          activeTab={activeTab}
          faucets={faucets}
          walletBalance={walletBalance}
          history={history}
          achievements={achievements}
          leaderboard={leaderboard}
          withdrawalHistory={withdrawalHistory}
          user={user}
          showWalletAddress={showWalletAddress}
          language={language}
          theme={theme}
          searchTerm={searchTerm}
          t={t}
          onClaimFaucet={handleClaimFaucet}
          onToggleWalletAddress={toggleWalletAddress}
          onToggleTheme={toggleTheme}
          onCopyReferralCode={copyReferralCode}
          onLogout={handleLogout}
          onClearSearch={() => setSearchTerm('')}
          referrals={referrals}
        />
      </main>

      <Footer />
    </div>
  );
}
