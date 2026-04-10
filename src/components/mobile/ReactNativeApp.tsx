import {
  AlertCircle,
  Bell,
  CheckCircle,
  Code,
  Download,
  Globe,
  Package,
  Settings,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface MobileFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'in-development' | 'planned';
  platform: ('ios' | 'android' | 'both')[];
  category: 'trading' | 'security' | 'analytics' | 'social' | 'utility';
  downloads?: number;
  rating?: number;
}

interface AppVersion {
  version: string;
  buildNumber: string;
  releaseDate: string;
  platform: 'ios' | 'android';
  features: string[];
  downloads: number;
  size: string;
}

interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: 'price' | 'trade' | 'security' | 'social' | 'system';
  timestamp: string;
  read: boolean;
  action?: string;
}

export const ReactNativeApp: React.FC = () => {
  const [features, setFeatures] = useState<MobileFeature[]>([]);
  const [versions, setVersions] = useState<AppVersion[]>([]);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'both'>('both');
  const [activeTab, setActiveTab] = useState<'features' | 'versions' | 'notifications'>('features');

  useEffect(() => {
    const fetchMobileData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockFeatures: MobileFeature[] = [
          {
            id: 'mobile-trading',
            name: 'Mobile Trading Interface',
            description: 'Full-featured trading interface optimized for mobile devices',
            icon: <TrendingUp className="w-6 h-6" />,
            status: 'available',
            platform: ['both'],
            category: 'trading',
            downloads: 45230,
            rating: 4.8,
          },
          {
            id: 'biometric-auth',
            name: 'Biometric Authentication',
            description: 'Secure login with fingerprint and face recognition',
            icon: <Shield className="w-6 h-6" />,
            status: 'available',
            platform: ['both'],
            category: 'security',
            downloads: 45230,
            rating: 4.9,
          },
          {
            id: 'push-alerts',
            name: 'Push Notifications',
            description: 'Real-time price alerts and trading notifications',
            icon: <Bell className="w-6 h-6" />,
            status: 'available',
            platform: ['both'],
            category: 'utility',
            downloads: 45230,
            rating: 4.7,
          },
          {
            id: 'mobile-wallet',
            name: 'Mobile Wallet Integration',
            description: 'Connect and manage crypto wallets on mobile',
            icon: <Wallet className="w-6 h-6" />,
            status: 'available',
            platform: ['both'],
            category: 'security',
            downloads: 45230,
            rating: 4.8,
          },
          {
            id: 'offline-mode',
            name: 'Offline Mode',
            description: 'Access portfolio data and basic features offline',
            icon: <Globe className="w-6 h-6" />,
            status: 'in-development',
            platform: ['both'],
            category: 'utility',
          },
          {
            id: 'apple-watch',
            name: 'Apple Watch App',
            description: 'Quick portfolio overview and alerts on Apple Watch',
            icon: <Smartphone className="w-6 h-6" />,
            status: 'in-development',
            platform: ['ios'],
            category: 'utility',
          },
          {
            id: 'dark-mode',
            name: 'Dark Mode',
            description: 'System-wide dark theme support',
            icon: <Settings className="w-6 h-6" />,
            status: 'available',
            platform: ['both'],
            category: 'utility',
            downloads: 45230,
            rating: 4.6,
          },
          {
            id: 'voice-commands',
            name: 'Voice Commands',
            description: 'Control the app with voice commands',
            icon: <AlertCircle className="w-6 h-6" />,
            status: 'planned',
            platform: ['both'],
            category: 'utility',
          },
        ];

        const mockVersions: AppVersion[] = [
          {
            version: '3.2.1',
            buildNumber: '321',
            releaseDate: '2024-01-15T10:30:00Z',
            platform: 'ios',
            features: [
              'Enhanced trading interface',
              'Biometric authentication improvements',
              'Bug fixes and performance optimizations',
            ],
            downloads: 15230,
            size: '45.2 MB',
          },
          {
            version: '3.2.0',
            buildNumber: '320',
            releaseDate: '2024-01-10T14:20:00Z',
            platform: 'android',
            features: [
              'New dashboard layout',
              'Push notification system',
              'Multi-language support',
            ],
            downloads: 28450,
            size: '42.8 MB',
          },
          {
            version: '3.1.5',
            buildNumber: '315',
            releaseDate: '2023-12-28T09:15:00Z',
            platform: 'ios',
            features: ['Security updates', 'Performance improvements', 'New chart indicators'],
            downloads: 15650,
            size: '44.1 MB',
          },
        ];

        const mockNotifications: PushNotification[] = [
          {
            id: 'notif-1',
            title: 'Bitcoin Price Alert',
            message: 'BTC has reached $45,000 - your target price!',
            type: 'price',
            timestamp: '2024-01-15T10:30:00Z',
            read: false,
            action: 'view-chart',
          },
          {
            id: 'notif-2',
            title: 'Trade Executed',
            message: 'Your ETH buy order for 0.5 ETH has been filled',
            type: 'trade',
            timestamp: '2024-01-15T09:45:00Z',
            read: true,
            action: 'view-trade',
          },
          {
            id: 'notif-3',
            title: 'Security Alert',
            message: 'New login detected on your account from iPhone',
            type: 'security',
            timestamp: '2024-01-15T08:20:00Z',
            read: true,
            action: 'view-security',
          },
          {
            id: 'notif-4',
            title: 'Portfolio Update',
            message: 'Your portfolio is up 5.2% today',
            type: 'social',
            timestamp: '2024-01-15T07:30:00Z',
            read: false,
            action: 'view-portfolio',
          },
        ];

        setFeatures(mockFeatures);
        setVersions(mockVersions);
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching mobile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileData();
  }, []);

  const getStatusColor = (status: MobileFeature['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-development':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: MobileFeature['category']) => {
    switch (category) {
      case 'trading':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'analytics':
        return 'bg-purple-100 text-purple-800';
      case 'social':
        return 'bg-green-100 text-green-800';
      case 'utility':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeatures = features.filter(
    feature => selectedPlatform === 'both' || feature.platform.includes(selectedPlatform)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">React Native App</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {features.filter(f => f.status === 'available').length} features available
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download iOS</span>
            </button>
            <button className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Android</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Downloads</p>
              <p className="text-3xl font-bold">
                {features.reduce((sum, f) => sum + (f.downloads || 0), 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-3xl font-bold">28,450</p>
            </div>
            <Smartphone className="w-8 h-8 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">App Rating</p>
              <p className="text-3xl font-bold">4.8</p>
            </div>
            <Star className="w-8 h-8 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Features</p>
              <p className="text-3xl font-bold">{features.length}</p>
            </div>
            <Package className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Platform:</span>
        <div className="flex space-x-2">
          {[
            { id: 'both', name: 'All Platforms' },
            { id: 'ios', name: 'iOS' },
            { id: 'android', name: 'Android' },
          ].map(platform => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id as any)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedPlatform === platform.id
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['features', 'versions', 'notifications'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'notifications' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map(feature => (
                <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feature.status)}`}
                    >
                      {feature.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(feature.category)}`}
                    >
                      {feature.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Platform: {feature.platform.join(', ')}</span>
                  </div>

                  {feature.downloads && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span>{feature.downloads.toLocaleString()} downloads</span>
                        {feature.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{feature.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Versions Tab */}
        {activeTab === 'versions' && (
          <div className="p-6">
            <div className="space-y-4">
              {versions.map(version => (
                <div
                  key={`${version.platform}-${version.version}`}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold">Version {version.version}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Build {version.buildNumber}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full capitalize">
                          {version.platform}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>Released: {new Date(version.releaseDate).toLocaleDateString()}</span>
                        <span>Size: {version.size}</span>
                        <span>{version.downloads.toLocaleString()} downloads</span>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Features:</h5>
                        <ul className="space-y-1">
                          {version.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <div className="space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 ${
                    !notification.read ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {!notification.read && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="capitalize">{notification.type}</span>
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {notification.action && (
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        {notification.action.replace('-', ' ')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Development Status */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Development Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">Available Features</h4>
              <div className="space-y-2">
                {features
                  .filter(f => f.status === 'available')
                  .map(feature => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-yellow-600">In Development</h4>
              <div className="space-y-2">
                {features
                  .filter(f => f.status === 'in-development')
                  .map(feature => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-gray-600">Planned Features</h4>
              <div className="space-y-2">
                {features
                  .filter(f => f.status === 'planned')
                  .map(feature => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
