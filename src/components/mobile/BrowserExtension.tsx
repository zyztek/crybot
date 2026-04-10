import React, { useState, useEffect } from 'react';
import { Globe, Download, Shield, Bell, DollarSign, TrendingUp, Settings, Lock, Eye, Code, CheckCircle, AlertCircle, Zap } from 'lucide-react';

interface ExtensionFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'trading' | 'security' | 'utility' | 'analytics';
  permissions: string[];
}

interface Browser {
  name: string;
  icon: string;
  version: string;
  downloads: number;
  rating: number;
  installUrl: string;
}

interface ExtensionPermission {
  id: string;
  name: string;
  description: string;
  required: boolean;
  granted: boolean;
  risk: 'low' | 'medium' | 'high';
}

export const BrowserExtension: React.FC = () => {
  const [features, setFeatures] = useState<ExtensionFeature[]>([]);
  const [browsers, setBrowsers] = useState<Browser[]>([]);
  const [permissions, setPermissions] = useState<ExtensionPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrowser, setSelectedBrowser] = useState<string>('chrome');
  const [activeTab, setActiveTab] = useState<'features' | 'browsers' | 'permissions'>('features');

  useEffect(() => {
    const fetchExtensionData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockFeatures: ExtensionFeature[] = [
          {
            id: 'price-ticker',
            name: 'Price Ticker',
            description: 'Real-time cryptocurrency prices in your browser toolbar',
            icon: <DollarSign className="w-5 h-5" />,
            enabled: true,
            category: 'trading',
            permissions: ['storage', 'activeTab']
          },
          {
            id: 'quick-trade',
            name: 'Quick Trade',
            description: 'Execute trades without leaving your current tab',
            icon: <TrendingUp className="w-5 h-5" />,
            enabled: true,
            category: 'trading',
            permissions: ['storage', 'activeTab', 'scripting']
          },
          {
            id: 'portfolio-widget',
            name: 'Portfolio Widget',
            description: 'View your portfolio performance from any website',
            icon: <Eye className="w-5 h-5" />,
            enabled: false,
            category: 'analytics',
            permissions: ['storage', 'activeTab']
          },
          {
            id: 'security-scanner',
            name: 'Security Scanner',
            description: 'Scan websites for crypto scams and phishing attempts',
            icon: <Shield className="w-5 h-5" />,
            enabled: true,
            category: 'security',
            permissions: ['activeTab', 'scripting']
          },
          {
            id: 'price-alerts',
            name: 'Price Alerts',
            description: 'Browser notifications for price movements',
            icon: <Bell className="w-5 h-5" />,
            enabled: true,
            category: 'utility',
            permissions: ['notifications', 'storage']
          },
          {
            id: 'auto-fill',
            name: 'Auto-fill Wallet',
            description: 'Auto-fill wallet addresses on crypto websites',
            icon: <Lock className="w-5 h-5" />,
            enabled: false,
            category: 'security',
            permissions: ['storage', 'activeTab']
          },
          {
            id: 'defi-detector',
            name: 'DeFi Protocol Detector',
            description: 'Automatically detect and analyze DeFi protocols',
            icon: <Code className="w-5 h-5" />,
            enabled: true,
            category: 'analytics',
            permissions: ['activeTab', 'scripting']
          },
          {
            id: 'gas-tracker',
            name: 'Gas Fee Tracker',
            description: 'Real-time gas fee monitoring and optimization',
            icon: <Zap className="w-5 h-5" />,
            enabled: true,
            category: 'utility',
            permissions: ['storage', 'activeTab']
          }
        ];

        const mockBrowsers: Browser[] = [
          {
            name: 'Chrome',
            icon: 'chrome',
            version: '3.2.1',
            downloads: 45230,
            rating: 4.8,
            installUrl: 'https://chrome.google.com/webstore'
          },
          {
            name: 'Firefox',
            icon: 'firefox',
            version: '3.2.0',
            downloads: 28450,
            rating: 4.7,
            installUrl: 'https://addons.mozilla.org'
          },
          {
            name: 'Safari',
            icon: 'safari',
            version: '3.1.5',
            downloads: 15650,
            rating: 4.6,
            installUrl: 'https://apps.apple.com'
          },
          {
            name: 'Edge',
            icon: 'edge',
            version: '3.2.1',
            downloads: 12450,
            rating: 4.5,
            installUrl: 'https://microsoftedge.microsoft.com'
          }
        ];

        const mockPermissions: ExtensionPermission[] = [
          {
            id: 'storage',
            name: 'Storage',
            description: 'Store user preferences and portfolio data locally',
            required: true,
            granted: true,
            risk: 'low'
          },
          {
            id: 'activeTab',
            name: 'Active Tab Access',
            description: 'Read content of the current tab for price detection',
            required: true,
            granted: true,
            risk: 'medium'
          },
          {
            id: 'notifications',
            name: 'Notifications',
            description: 'Send browser notifications for price alerts',
            required: false,
            granted: false,
            risk: 'low'
          },
          {
            id: 'scripting',
            name: 'Script Execution',
            description: 'Execute scripts on web pages for enhanced functionality',
            required: false,
            granted: false,
            risk: 'high'
          },
          {
            id: 'background',
            name: 'Background Service',
            description: 'Run background processes for real-time updates',
            required: true,
            granted: true,
            risk: 'medium'
          },
          {
            id: 'webNavigation',
            name: 'Web Navigation',
            description: 'Monitor navigation for security scanning',
            required: false,
            granted: false,
            risk: 'medium'
          }
        ];

        setFeatures(mockFeatures);
        setBrowsers(mockBrowsers);
        setPermissions(mockPermissions);
      } catch (error) {
        console.error('Error fetching extension data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExtensionData();
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

  const handleTogglePermission = async (permissionId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPermissions(prev => prev.map(permission => 
        permission.id === permissionId 
          ? { ...permission, granted: !permission.granted }
          : permission
      ));
    } catch (error) {
      console.error('Error toggling permission:', error);
    }
  };

  const getCategoryColor = (category: ExtensionFeature['category']) => {
    switch (category) {
      case 'trading': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'utility': return 'bg-green-100 text-green-800';
      case 'analytics': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: ExtensionPermission['risk']) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'chrome': return 'chrome';
      case 'firefox': return 'firefox';
      case 'safari': return 'safari';
      case 'edge': return 'edge';
      default: return 'globe';
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
          <Globe className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Browser Extension</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {features.filter(f => f.enabled).length} features enabled
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Install Extension</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Downloads</p>
              <p className="text-3xl font-bold">
                {browsers.reduce((sum, browser) => sum + browser.downloads, 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-3xl font-bold">125,450</p>
            </div>
            <Globe className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg Rating</p>
              <p className="text-3xl font-bold">4.7</p>
            </div>
            <CheckCircle className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Browsers</p>
              <p className="text-3xl font-bold">{browsers.length}</p>
            </div>
            <Code className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* Browser Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Select Browser:</span>
        <div className="flex space-x-2">
          {browsers.map(browser => (
            <button
              key={browser.name}
              onClick={() => setSelectedBrowser(browser.name.toLowerCase())}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedBrowser === browser.name.toLowerCase()
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {browser.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['features', 'browsers', 'permissions'] as const).map(tab => (
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
                  
                  <div className="mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(feature.category)}`}>
                      {feature.category}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {feature.permissions.map(permission => (
                        <span key={permission} className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
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

        {/* Browsers Tab */}
        {activeTab === 'browsers' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {browsers.map(browser => (
                <div key={browser.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{browser.name}</h4>
                        <p className="text-sm text-gray-600">Version {browser.version}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <div
                                key={star}
                                className={`w-3 h-3 rounded-full ${
                                  star <= Math.floor(browser.rating) ? 'bg-yellow-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">{browser.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{browser.downloads.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">downloads</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <a
                      href={browser.installUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center text-sm"
                    >
                      Install
                    </a>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="p-6">
            <div className="space-y-4">
              {permissions.map(permission => (
                <div key={permission.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{permission.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(permission.risk)}`}>
                          {permission.risk} risk
                        </span>
                        {permission.required && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{permission.description}</p>
                    </div>
                    
                    <button
                      onClick={() => handleTogglePermission(permission.id)}
                      disabled={permission.required}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        permission.granted
                          ? 'bg-green-500 text-white'
                          : permission.required
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {permission.granted ? 'Granted' : permission.required ? 'Required' : 'Grant'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Installation Guide */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Installation Guide</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Step-by-Step Installation</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Select your browser from the options above</li>
                <li>2. Click "Install Extension" button</li>
                <li>3. You'll be redirected to the browser's extension store</li>
                <li>4. Click "Add to Browser" or "Install"</li>
                <li>5. Review and accept permissions</li>
                <li>6. Extension will be installed and ready to use</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">First Time Setup</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Click the extension icon in your browser toolbar</li>
                <li>2. Sign in with your Crybot account</li>
                <li>3. Configure your preferred features</li>
                <li>4. Set up price alerts and notifications</li>
                <li>5. Customize the display settings</li>
                <li>6. Start using the extension features</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
