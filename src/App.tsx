import { useState } from 'react';
import { useCryptoStore, texts } from './store/cryptoStore';
import LoginScreen from './components/layout/LoginScreen';
import Header from './components/layout/Header';
import StatsBar from './components/layout/StatsBar';
import NavigationTabs from './components/layout/NavigationTabs';
import ContentArea from './components/layout/ContentArea';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/ToastContainer';
import SkipLink from './components/ui/SkipLink';
import useAuthSession from './hooks/useAuthSession';
import useFaucetClaim from './hooks/useFaucetClaim';

function App() {
  const {
    isLoggedIn,
    activeTab,
    language,
    theme,
    notifications,
    showWalletAddress,
    user,
    walletBalance,
    faucets,
    history,
    achievements,
    leaderboard,
    setActiveTab,
    toggleLanguage,
    toggleTheme,
    toggleWalletAddress,
    copyReferralCode,
  } = useCryptoStore();

  // Custom hooks for auth and faucet claims
  const { isInitialized, handleLogin, handleLogout, referrals } = useAuthSession();
  const { handleClaimFaucet } = useFaucetClaim();

  // Local state for search
  const [searchTerm, setSearchTerm] = useState('');

  // Theme handling is done in Header component via toggleTheme

  // Mock withdrawal history for wallet view
  const withdrawalHistory = [
    {
      id: 1,
      coin: 'BTC',
      amount: '0.0001',
      address: 'bc1q...',
      status: 'completed',
      date: '2024-01-10',
    },
  ];

  // Get translations for current language
  const t = texts[language];

  return (
    <>
      <ToastContainer />
      <SkipLink targetId="main-content">
        {language === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </SkipLink>
      {!isLoggedIn || !isInitialized ? (
        <LoginScreen t={t} onLogin={handleLogin} />
      ) : (
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

            <ContentArea
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
      )}
    </>
  );
}

export default App;
