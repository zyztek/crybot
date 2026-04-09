import { AppProvider, useAppContext } from './components/AppProvider';
import AuthenticatedApp from './components/AuthenticatedApp';
import LoginScreen from './components/layout/LoginScreen';
import SkipLink from './components/ui/SkipLink';
import ToastContainer from './components/ui/ToastContainer';

function AppContent() {
  const { isLoggedIn, isInitialized, t } = useAppContext();

  return (
    <>
      <ToastContainer />
      <SkipLink targetId="main-content">{t?.skipToMain || 'Skip to main content'}</SkipLink>
      {!isLoggedIn || !isInitialized ? (
        <LoginScreen t={t} onLogin={() => {}} />
      ) : (
        <AuthenticatedApp />
      )}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
