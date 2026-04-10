import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Wifi, WifiOff, Bell, Settings, RefreshCw, CheckCircle, AlertCircle, Battery, Signal } from 'lucide-react';

interface PWAStatus {
  isInstalled: boolean;
  isOnline: boolean;
  serviceWorkerActive: boolean;
  cacheSize: number;
  lastSync: string;
  notificationsEnabled: boolean;
  backgroundSyncActive: boolean;
}

interface OfflineContent {
  id: string;
  name: string;
  size: string;
  lastAccessed: string;
  cached: boolean;
}

export const PWAImplementation: React.FC = () => {
  const [pwaStatus, setPwaStatus] = useState<PWAStatus | null>(null);
  const [offlineContent, setOfflineContent] = useState<OfflineContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const checkPWAStatus = async () => {
      setLoading(true);
      try {
        // Simulate PWA status check
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStatus: PWAStatus = {
          isInstalled: window.matchMedia('(display-mode: standalone)').matches,
          isOnline: navigator.onLine,
          serviceWorkerActive: 'serviceWorker' in navigator,
          cacheSize: 15.6, // MB
          lastSync: new Date().toISOString(),
          notificationsEnabled: 'Notification' in window && Notification.permission === 'granted',
          backgroundSyncActive: 'serviceWorker' in navigator
        };

        const mockOfflineContent: OfflineContent[] = [
          {
            id: 'portfolio',
            name: 'Portfolio Data',
            size: '2.3 MB',
            lastAccessed: new Date().toISOString(),
            cached: true
          },
          {
            id: 'market-data',
            name: 'Market Data',
            size: '8.7 MB',
            lastAccessed: new Date(Date.now() - 3600000).toISOString(),
            cached: true
          },
          {
            id: 'charts',
            name: 'Chart Data',
            size: '4.6 MB',
            lastAccessed: new Date(Date.now() - 7200000).toISOString(),
            cached: true
          }
        ];

        setPwaStatus(mockStatus);
        setOfflineContent(mockOfflineContent);

        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          setInstallPrompt(e);
          setShowInstallBanner(true);
        });

        // Listen for online/offline
        window.addEventListener('online', () => {
          setPwaStatus(prev => prev ? { ...prev, isOnline: true } : null);
        });

        window.addEventListener('offline', () => {
          setPwaStatus(prev => prev ? { ...prev, isOnline: false } : null);
        });

      } catch (error) {
        console.error('Error checking PWA status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkPWAStatus();
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    try {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallPrompt(null);
        setShowInstallBanner(false);
        setPwaStatus(prev => prev ? { ...prev, isInstalled: true } : null);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  };

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPwaStatus(prev => prev ? { 
        ...prev, 
        notificationsEnabled: permission === 'granted' 
      } : null);
    } catch (error) {
      console.error('Error enabling notifications:', error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      // Simulate background sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPwaStatus(prev => prev ? { 
        ...prev, 
        lastSync: new Date().toISOString() 
      } : null);
    } catch (error) {
      console.error('Error syncing:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handleClearCache = async () => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        setOfflineContent([]);
        setPwaStatus(prev => prev ? { ...prev, cacheSize: 0 } : null);
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Install Banner */}
      {showInstallBanner && !pwaStatus?.isInstalled && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Install Crybot App</p>
                <p className="text-sm text-blue-700">Get the full desktop experience with offline access</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Install</span>
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">PWA Implementation</h2>
        </div>
        <div className="flex items-center space-x-2">
          {pwaStatus?.isOnline ? (
            <Wifi className="w-5 h-5 text-green-500" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm text-gray-600">
            {pwaStatus?.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Status Cards */}
      {pwaStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Installation Status</span>
              <Smartphone className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-center space-x-2">
              {pwaStatus.isInstalled ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Installed</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Not Installed</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Service Worker</span>
              <Settings className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-center space-x-2">
              {pwaStatus.serviceWorkerActive ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Active</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">Inactive</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Cache Size</span>
              <Battery className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-xl font-bold">{pwaStatus.cacheSize} MB</p>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Notifications</span>
              <Bell className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex items-center space-x-2">
              {pwaStatus.notificationsEnabled ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">Enabled</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Disabled</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">PWA Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!pwaStatus?.isInstalled && (
            <button
              onClick={handleInstall}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Install App</span>
            </button>
          )}

          {!pwaStatus?.notificationsEnabled && (
            <button
              onClick={handleEnableNotifications}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span>Enable Notifications</span>
            </button>
          )}

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>

          <button
            onClick={handleClearCache}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>

      {/* Offline Content */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Offline Content</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Signal className="w-4 h-4" />
              <span>Available offline</span>
            </div>
          </div>
        </div>
        <div className="divide-y">
          {offlineContent.map(content => (
            <div key={content.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    content.cached ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{content.name}</h4>
                    <p className="text-sm text-gray-600">
                      Size: {content.size} • Last accessed: {new Date(content.lastAccessed).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {content.cached && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Cached
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PWA Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">PWA Features</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Offline Access</p>
                <p className="text-sm text-gray-600">Access key features without internet</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">Real-time alerts and updates</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Background Sync</p>
                <p className="text-sm text-gray-600">Auto-sync when connection restored</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">App-like Experience</p>
                <p className="text-sm text-gray-600">Native app feel in browser</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Load Performance</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>PWA Compliance</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Offline Capability</span>
                <span>87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Caching Efficiency</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Sync Info */}
      {pwaStatus && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                Last synchronized: {new Date(pwaStatus.lastSync).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Background Sync: {pwaStatus.backgroundSyncActive ? 'Active' : 'Inactive'}
              </span>
              <span className="text-gray-600">
                Cache: {pwaStatus.cacheSize} MB used
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
