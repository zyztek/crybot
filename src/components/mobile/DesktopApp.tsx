import React, { useState, useEffect } from 'react';
import { Monitor, Download, Settings, Bell, TrendingUp, Shield, Globe, Zap, Code, CheckCircle, AlertCircle, Cpu, HardDrive, Wifi, Battery } from 'lucide-react';

interface DesktopFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  category: 'trading' | 'analytics' | 'security' | 'utility';
  platform: ('windows' | 'mac' | 'linux')[];
  resourceUsage: 'low' | 'medium' | 'high';
}

interface Platform {
  name: string;
  icon: string;
  version: string;
  downloads: number;
  rating: number;
  size: string;
  requirements: string[];
  downloadUrl: string;
}

interface SystemResource {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export const DesktopApp: React.FC = () => {
  const [features, setFeatures] = useState<DesktopFeature[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [systemResources, setSystemResources] = useState<SystemResource>({
    cpu: 25,
    memory: 40,
    disk: 60,
    network: 15
  });
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('windows');
  const [activeTab, setActiveTab] = useState<'features' | 'platforms' | 'performance'>('features');

  useEffect(() => {
    const fetchDesktopData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockFeatures: DesktopFeature[] = [
          {
            id: 'advanced-charting',
            name: 'Advanced Charting',
            description: 'Professional-grade charting with 100+ indicators',
            icon: <TrendingUp className="w-5 h-5" />,
            enabled: true,
            category: 'analytics',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'medium'
          },
          {
            id: 'multi-screen',
            name: 'Multi-Screen Support',
            description: 'Trade across multiple monitors simultaneously',
            icon: <Monitor className="w-5 h-5" />,
            enabled: true,
            category: 'trading',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'low'
          },
          {
            id: 'hotkeys',
            name: 'Custom Hotkeys',
            description: 'Configure keyboard shortcuts for quick actions',
            icon: <Code className="w-5 h-5" />,
            enabled: true,
            category: 'utility',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'low'
          },
          {
            id: 'local-storage',
            name: 'Local Data Storage',
            description: 'Store historical data locally for faster access',
            icon: <HardDrive className="w-5 h-5" />,
            enabled: false,
            category: 'utility',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'high'
          },
          {
            id: 'api-terminal',
            name: 'API Terminal',
            description: 'Built-in terminal for API testing and scripting',
            icon: <Code className="w-5 h-5" />,
            enabled: true,
            category: 'analytics',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'medium'
          },
          {
            id: 'hardware-wallet',
            name: 'Hardware Wallet Integration',
            description: 'Direct integration with Ledger and Trezor devices',
            icon: <Shield className="w-5 h-5" />,
            enabled: true,
            category: 'security',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'low'
          },
          {
            id: 'real-time-alerts',
            name: 'Real-time Alerts',
            description: 'Desktop notifications for price movements and trades',
            icon: <Bell className="w-5 h-5" />,
            enabled: true,
            category: 'utility',
            platform: ['windows', 'mac', 'linux'],
            resourceUsage: 'low'
          },
          {
            id: 'market-scanner',
            name: 'Market Scanner',
            description: 'Advanced market scanning with custom filters',
            icon: <Zap className="w-5 h-5" />,
            enabled: false,
            category: 'analytics',
            platform: ['windows', 'mac'],
            resourceUsage: 'high'
          }
        ];

        const mockPlatforms: Platform[] = [
          {
            name: 'Windows',
            icon: 'windows',
            version: '4.2.1',
            downloads: 85420,
            rating: 4.8,
            size: '125 MB',
            requirements: [
              'Windows 10/11 (64-bit)',
              '4 GB RAM minimum',
              '500 MB disk space',
              'DirectX 11 or later'
            ],
            downloadUrl: 'https://download.crybot.com/windows'
          },
          {
            name: 'macOS',
            icon: 'mac',
            version: '4.2.0',
            downloads: 52350,
            rating: 4.7,
            size: '118 MB',
            requirements: [
              'macOS 11.0 or later',
              '4 GB RAM minimum',
              '500 MB disk space',
              'Apple Silicon or Intel processor'
            ],
            downloadUrl: 'https://download.crybot.com/mac'
          },
          {
            name: 'Linux',
            icon: 'linux',
            version: '4.2.1',
            downloads: 28450,
            rating: 4.6,
            size: '142 MB',
            requirements: [
              'Ubuntu 20.04+ / CentOS 8+',
              '4 GB RAM minimum',
              '600 MB disk space',
              'GTK 3.0 or later'
            ],
            downloadUrl: 'https://download.crybot.com/linux'
          }
        ];

        setFeatures(mockFeatures);
        setPlatforms(mockPlatforms);
      } catch (error) {
        console.error('Error fetching desktop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesktopData();
  }, []);

  useEffect(() => {
    // Simulate real-time resource monitoring
    const interval = setInterval(() => {
      setSystemResources(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(10, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(20, Math.min(85, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
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

  const getCategoryColor = (category: DesktopFeature['category']) => {
    switch (category) {
      case 'trading': return 'bg-blue-100 text-blue-800';
      case 'analytics': return 'bg-purple-100 text-purple-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'utility': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (usage: DesktopFeature['resourceUsage']) => {
    switch (usage) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceBarColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Monitor className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Desktop App</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {features.filter(f => f.enabled).length} features enabled
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download App</span>
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
                {platforms.reduce((sum, platform) => sum + platform.downloads, 0).toLocaleString()}
              </p>
            </div>
            <Download className="w-8 h-8 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Users</p>
              <p className="text-3xl font-bold">245,890</p>
            </div>
            <Monitor className="w-8 h-8 opacity-50" />
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
              <p className="text-sm opacity-90">Platforms</p>
              <p className="text-3xl font-bold">{platforms.length}</p>
            </div>
            <Globe className="w-8 h-8 opacity-50" />
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">System Resources</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className="text-sm font-bold">{Math.round(systemResources.cpu)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getResourceBarColor(systemResources.cpu)}`}
                  style={{ width: `${systemResources.cpu}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Memory</span>
                </div>
                <span className="text-sm font-bold">{Math.round(systemResources.memory)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getResourceBarColor(systemResources.memory)}`}
                  style={{ width: `${systemResources.memory}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Disk I/O</span>
                </div>
                <span className="text-sm font-bold">{Math.round(systemResources.disk)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getResourceBarColor(systemResources.disk)}`}
                  style={{ width: `${systemResources.disk}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Network</span>
                </div>
                <span className="text-sm font-bold">{Math.round(systemResources.network)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getResourceBarColor(systemResources.network)}`}
                  style={{ width: `${systemResources.network}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Select Platform:</span>
        <div className="flex space-x-2">
          {platforms.map(platform => (
            <button
              key={platform.name}
              onClick={() => setSelectedPlatform(platform.name.toLowerCase())}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedPlatform === platform.name.toLowerCase()
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
          {(['features', 'platforms', 'performance'] as const).map(tab => (
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
              {features
                .filter(feature => feature.platform.includes(selectedPlatform as any))
                .map(feature => (
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
                    <span className={`px-2 py-1 text-xs rounded-full ${getResourceColor(feature.resourceUsage)}`}>
                      {feature.resourceUsage} resources
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Platform:</p>
                    <div className="flex flex-wrap gap-1">
                      {feature.platform.map(platform => (
                        <span key={platform} className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                          {platform}
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

        {/* Platforms Tab */}
        {activeTab === 'platforms' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map(platform => (
                <div key={platform.name} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{platform.name}</h4>
                        <p className="text-sm text-gray-600">Version {platform.version}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <div
                                key={star}
                                className={`w-3 h-3 rounded-full ${
                                  star <= Math.floor(platform.rating) ? 'bg-yellow-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">{platform.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{platform.downloads.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">downloads</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Size: {platform.size}</p>
                    <p className="text-xs text-gray-500">Requirements:</p>
                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                      {platform.requirements.slice(0, 2).map((req, index) => (
                        <li key={index}>- {req}</li>
                      ))}
                      {platform.requirements.length > 2 && (
                        <li className="text-gray-400">+{platform.requirements.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={platform.downloadUrl}
                      className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center text-sm"
                    >
                      Download
                    </a>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Resource Usage History</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{Math.round(systemResources.cpu)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getResourceBarColor(systemResources.cpu)}`}
                        style={{ width: `${systemResources.cpu}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{Math.round(systemResources.memory)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getResourceBarColor(systemResources.memory)}`}
                        style={{ width: `${systemResources.memory}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk I/O</span>
                      <span>{Math.round(systemResources.disk)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getResourceBarColor(systemResources.disk)}`}
                        style={{ width: `${systemResources.disk}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Usage</span>
                      <span>{Math.round(systemResources.network)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getResourceBarColor(systemResources.network)}`}
                        style={{ width: `${systemResources.network}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Performance Tips</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Close unused features</p>
                      <p className="text-xs text-gray-600">Disable features you don't use to reduce resource consumption</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Adjust data refresh rate</p>
                      <p className="text-xs text-gray-600">Lower refresh rates can significantly reduce CPU usage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Monitor memory usage</p>
                      <p className="text-xs text-gray-600">High memory usage may indicate a memory leak</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Check disk space</p>
                      <p className="text-xs text-gray-600">Ensure sufficient disk space for local data storage</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <h4 className="font-medium mb-3">System Requirements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Windows 10/11, macOS 11.0+, or Linux</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>4 GB RAM minimum (8 GB recommended)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>500 MB disk space minimum</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Stable internet connection</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Installation Steps</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Download the installer for your platform</li>
                <li>2. Run the installer with administrator privileges</li>
                <li>3. Follow the installation wizard steps</li>
                <li>4. Launch the application after installation</li>
                <li>5. Sign in with your Crybot account</li>
                <li>6. Configure your preferences and features</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
