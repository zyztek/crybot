import { useState, useEffect } from 'react'
import { useCryptoStore, texts } from './store/cryptoStore'
import type { Faucet } from './types'
import LoginScreen from './components/layout/LoginScreen'
import Header from './components/layout/Header'
import StatsBar from './components/layout/StatsBar'
import NavigationTabs from './components/layout/NavigationTabs'
import ContentArea from './components/layout/ContentArea'
import Footer from './components/layout/Footer'
import ToastContainer from './components/ui/ToastContainer'
import { useApi } from './hooks/useApi'

function App() {
  const {
    isLoggedIn,
    activeTab,
    language,
    notifications,
    showWalletAddress,
    user,
    walletBalance,
    faucets,
    history,
    achievements,
    leaderboard,
    login: storeLogin,
    logout: storeLogout,
    setActiveTab,
    toggleLanguage,
    toggleWalletAddress,
    claimFaucet,
    copyReferralCode,
  } = useCryptoStore()
  
  // Use API hook for real backend integration
  const { 
    logout: apiLogout, 
    fetchFaucets, 
    claimFaucet: apiClaimFaucet, 
    fetchWallets,
    fetchAchievements,
    fetchLeaderboard,
    fetchUserStats,
    syncAuth, 
  } = useApi()
  
  // Local state for API-based operations
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Initialize on mount - check for existing session
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const success = await syncAuth()
        if (success) {
          storeLogin()
          // Fetch all real data from API in parallel
          await Promise.all([
            fetchFaucets(),
            fetchWallets(),
            fetchAchievements(),
            fetchLeaderboard('all_time'),
            fetchUserStats(),
          ]).catch(err => console.error('Failed to fetch initial data:', err))
        }
      }
      setIsInitialized(true)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // Handle login from LoginScreen
  const handleLogin = () => {
    storeLogin()
  }
  
  // Handle logout with API call
  const handleLogout = async () => {
    try {
      await apiLogout()
    } finally {
      storeLogout()
    }
  }
  
  // Handle faucet claim - convert to match ContentArea's expected signature
  const handleClaimFaucet = (faucet: Faucet) => {
    apiClaimFaucet(faucet.coin).then((result) => {
      if (result.success) {
        // Update local state
        claimFaucet(faucet)
      }
    })
  }

  // Mock withdrawal history for wallet view
  const withdrawalHistory = [
    { id: 1, coin: 'BTC', amount: '0.0001', address: 'bc1q...', status: 'completed', date: '2024-01-10' },
  ]

  // Get translations for current language
  const t = texts[language]

  return (
    <>
      <ToastContainer />
      {(!isLoggedIn || !isInitialized) ? (
        <LoginScreen t={t} onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header
        user={user}
        language={language}
        notifications={notifications}
        onToggleLanguage={toggleLanguage}
      />

      <main className="container mx-auto px-4 py-6">
        <StatsBar
          walletBalance={walletBalance}
          history={history}
          faucets={faucets}
          t={t}
        />

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
          t={t}
          onClaimFaucet={handleClaimFaucet}
          onToggleWalletAddress={toggleWalletAddress}
          onCopyReferralCode={copyReferralCode}
          onLogout={handleLogout}
        />
      </main>

      <Footer />
        </div>
      )}
    </>
  )
}

export default App