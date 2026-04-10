import React, { useState, useEffect } from 'react';
import { Watch, Heart, TrendingUp, Bell, Settings, Activity, DollarSign, Shield, Smartphone, Battery, Wifi, CheckCircle, AlertCircle } from 'lucide-react';

interface WatchFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'portfolio' | 'alerts' | 'health' | 'utility';
  batteryImpact: 'low' | 'medium' | 'high';
}

interface WatchComplication {
  id: string;
  name: string;
  type: 'circular' | 'corner' | 'modular' | 'extra-large';
  data: string;
  enabled: boolean;
}

interface WatchNotification {
  id: string;
  title: string;
  message: string;
  type: 'price' | 'health' | 'system' | 'portfolio';
  timestamp: string;
  hapticFeedback: boolean;
}

export const AppleWatchApp: React.FC = () => {
  const [features, setFeatures] = useState<WatchFeature[]>([]);
  const [complications, setComplications] = useState<WatchComplication[]>([]);
  const [notifications, setNotifications] = useState<WatchNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'complications' | 'notifications'>('features');
  const [batteryLevel, setBatteryLevel] = useState(85);

  useEffect(() => {
    const fetchWatchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockFeatures: WatchFeature[] = [
          {
            id: 'portfolio-overview',
            name: 'Portfolio Overview',
            description: 'Quick glance at your portfolio performance',
            icon: <TrendingUp className="w-5 h-5" />,
            enabled: true,
            category: 'portfolio',
            batteryImpact: 'low'
          },
          {
            id: 'price-alerts',
            name: 'Price Alerts',
            description: 'Real-time price notifications with haptic feedback',
            icon: <Bell className="w-5 h-5" />,
            enabled: true,
            category: 'alerts',
            batteryImpact: 'medium'
          },
          {
            id: 'heart-rate',
            name: 'Heart Rate Monitor',
            description: 'Track heart rate during trading sessions',
            icon: <Heart className="w-5 h-5" />,
            enabled: false,
            category: 'health',
            batteryImpact: 'high'
          },
          {
            id: 'quick-trade',
            name: 'Quick Trade',
            description: 'Execute trades directly from your watch',
            icon: <DollarSign className="w-5 h-5" />,
            enabled: true,
            category: 'portfolio',
            batteryImpact: 'medium'
          },
          {
            id: 'security-alerts',
            name: 'Security Alerts',
            description: 'Instant security notifications',
            icon: <Shield className="w-5 h-5" />,
            enabled: true,
            category: 'alerts',
            batteryImpact: 'low'
          },
          {
            id: 'activity-tracker',
            name: 'Activity Tracker',
            description: 'Track your trading activity patterns',
            icon: <Activity className="w-5 h-5" />,
            enabled: false,
            category: 'health',
            batteryImpact: 'medium'
          },
          {
            id: 'watch-settings',
            name: 'Watch Settings',
            description: 'Configure app preferences on your watch',
            icon: <Settings className="w-5 h-5" />,
            enabled: true,
            category: 'utility',
            batteryImpact: 'low'
          }
        ];

        const mockComplications: WatchComplication[] = [
          {
            id: 'btc-price',
            name: 'Bitcoin Price',
            type: 'corner',
            data: '$45,234',
            enabled: true
          },
          {
            id: 'portfolio-change',
            name: 'Portfolio Change',
            type: 'circular',
            data: '+2.4%',
            enabled: true
          },
          {
            id: 'gas-fee',
            name: 'ETH Gas Fee',
            type: 'modular',
            data: '25 Gwei',
            enabled: false
          },
          {
            id: 'heart-rate',
            name: 'Heart Rate',
            type: 'extra-large',
            data: '72 BPM',
            enabled: false
          }
        ];

        const mockNotifications: WatchNotification[] = [
          {
            id: 'notif-1',
            title: 'BTC Alert',
            message: 'Bitcoin reached $45,000',
            type: 'price',
            timestamp: '2024-01-15T10:30:00Z',
            hapticFeedback: true
          },
          {
            id: 'notif-2',
            title: 'Portfolio Update',
            message: 'Your portfolio is up 2.4%',
            type: 'portfolio',
            timestamp: '2024-01-15T09:45:00Z',
            hapticFeedback: false
          },
          {
            id: 'notif-3',
            title: 'Heart Rate',
            message: 'Elevated heart rate detected',
            type: 'health',
            timestamp: '2024-01-15T08:20:00Z',
            hapticFeedback: true
          },
          {
            id: 'notif-4',
            title: 'Security Alert',
            message: 'New login detected',
            type: 'system',
            timestamp: '2024-01-15T07:30:00Z',
            hapticFeedback: true
          }
        ];

        setFeatures(mockFeatures);
        setComplications(mockComplications);
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching watch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchData();
  }, []);

  const handleToggleFeature = async (featureId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFeatures(prev => prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled }
          : feature
      ));
    } catch (error) {
      console.error('Error toggling feature:', error);
    }
  };

  const handleToggleComplication = async (complicationId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setComplications(prev => prev.map(complication => 
        complication.id === complicationId 
          ? { ...complication, enabled: !complication.enabled }
          : complication
      ));
    } catch (error) {
      console.error('Error toggling complication:', error);
    }
  };

  const getBatteryColor = (impact: WatchFeature['batteryImpact']) => {
    switch (impact) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: WatchFeature['category']) => {
    switch (category) {
      case 'portfolio': return 'text-blue-600 bg-blue-100';
      case 'alerts': return 'text-orange-600 bg-orange-100';
      case 'health': return 'text-red-600 bg-red-100';
      case 'utility': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplicationIcon = (type: WatchComplication['type']) => {
    switch (type) {
      case 'circular': return 'circle';
      case 'corner': return 'corner';
      case 'modular': return 'square';
      case 'extra-large': return 'large-square';
      default: return 'square';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Watch className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Apple Watch App</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Battery className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">{batteryLevel}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Connected</span>
          </div>
        </div>
      </div>

      {/* Watch Preview */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 text-white">
        <div className="max-w-sm mx-auto">
          <div className="bg-black rounded-3xl p-4 shadow-2xl">
            {/* Watch Screen */}
            <div className="bg-white rounded-2xl p-4 aspect-square flex flex-col">
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3 h-3" />
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">$45,234</div>
                  <div className="text-sm text-green-600">+2.4%</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-gray-600">BTC</div>
                    <div className="font-semibold">$45.2K</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-gray-600">ETH</div>
                    <div className="font-semibold">$2,845</div>
                  </div>
                </div>
              </div>
              
              {/* Digital Crown */}
              <div className="flex justify-center mt-2">
                <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Features</p>
              <p className="text-2xl font-bold">{features.filter(f => f.enabled).length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Complications</p>
              <p className="text-2xl font-bold">{complications.filter(c => c.enabled).length}</p>
            </div>
            <Watch className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Notifications</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Battery Life</p>
              <p className="text-2xl font-bold">{batteryLevel}%</p>
            </div>
            <Battery className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['features', 'complications', 'notifications'] as const).map(tab => (
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
            </button>
          ))}
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map(feature => (
                <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        feature.enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(feature.category)}`}>
                      {feature.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getBatteryColor(feature.batteryImpact)}`}>
                      {feature.batteryImpact} battery
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleToggleFeature(feature.id)}
                    className={`w-full px-3 py-2 rounded-lg transition-colors ${
                      feature.enabled
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {feature.enabled ? 'Enabled' : 'Enable'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complications Tab */}
        {activeTab === 'complications' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complications.map(complication => (
                <div key={complication.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{complication.name}</h4>
                      <p className="text-sm text-gray-600">Type: {complication.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${
                        complication.type === 'circular' ? 'rounded-full' :
                        complication.type === 'corner' ? 'rounded-tl' :
                        complication.type === 'modular' ? 'rounded' :
                        'rounded-lg'
                      } bg-blue-500`}></div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Current Data:</p>
                    <p className="text-lg font-semibold">{complication.data}</p>
                  </div>
                  
                  <button
                    onClick={() => handleToggleComplication(complication.id)}
                    className={`w-full px-3 py-2 rounded-lg transition-colors ${
                      complication.enabled
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {complication.enabled ? 'Enabled' : 'Enable'}
                  </button>
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
                <div key={notification.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {notification.hapticFeedback && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Haptic
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="capitalize">{notification.type}</span>
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {notification.type === 'price' && <TrendingUp className="w-4 h-4 text-blue-500" />}
                      {notification.type === 'health' && <Heart className="w-4 h-4 text-red-500" />}
                      {notification.type === 'system' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                      {notification.type === 'portfolio' && <DollarSign className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Installation Instructions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Installation Instructions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Apple Watch Series 3 or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>watchOS 8.0 or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>iPhone with iOS 15.0 or later</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Active Crybot account</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Setup Steps</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Install Crybot app on your iPhone</li>
                <li>2. Open Apple Watch app on iPhone</li>
                <li>3. Scroll down and find Crybot</li>
                <li>4. Toggle "Show App on Apple Watch"</li>
                <li>5. Wait for automatic installation</li>
                <li>6. Open app on watch and sign in</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
