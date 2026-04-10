/**
 * Revenue Discovery Engine Component
 * 
 * Automated revenue discovery engine that finds and adapts to new income opportunities
 * Scans platforms, analyzes trends, and automatically integrates new revenue sources
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, DollarSign, Zap, Settings, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Globe, Target, Activity, Brain, Eye, Rocket, Shield } from 'lucide-react';

interface RevenueSource {
  id: string;
  name: string;
  type: 'faucet' | 'ptc' | 'survey' | 'trading' | 'staking' | 'airdrop' | 'social' | 'gaming' | 'content' | 'service' | 'affiliate' | 'mining' | 'lending' | 'yield' | 'arbitrage';
  category: 'crypto' | 'social' | 'gaming' | 'content' | 'finance' | 'service' | 'investment';
  platform: string;
  url: string;
  description: string;
  potential: {
    estimatedDaily: number; // USD
    estimatedMonthly: number; // USD
    riskLevel: 'low' | 'medium' | 'high' | 'very_high';
    timeCommitment: number; // hours per day
    skillRequirement: 'none' | 'basic' | 'intermediate' | 'advanced' | 'expert';
    equipment: string[];
  };
  requirements: {
    minInvestment?: number;
    verification: boolean;
    kyc: boolean;
    location: string[];
    age: number;
    skills: string[];
    tools: string[];
  };
  performance: {
    discoveredAt: string;
    firstTested?: string;
    integrationStatus: 'discovered' | 'testing' | 'integrating' | 'integrated' | 'failed' | 'deprecated';
    successRate: number; // 0-100
    actualEarnings?: number;
    lastEarning?: string;
    totalEarned: number;
    adaptabilityScore: number; // 0-100
  };
  automation: {
    automatable: boolean;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    apiAvailable: boolean;
    rateLimit: number; // requests per hour
    maintenance: 'low' | 'medium' | 'high';
    reliability: number; // 0-100
  };
  isActive: boolean;
  priority: number;
}

interface DiscoveryRule {
  id: string;
  name: string;
  type: 'keyword' | 'pattern' | 'trend' | 'competitor' | 'api' | 'social' | 'market' | 'technical';
  description: string;
  conditions: {
    keywords: string[];
    platforms: string[];
    categories: RevenueSource['category'][];
    minPotential: number;
    maxRisk: RevenueSource['potential']['riskLevel'];
    automatableOnly: boolean;
  };
  actions: {
    priority: number;
    autoTest: boolean;
    autoIntegrate: boolean;
    notify: boolean;
    allocateResources: boolean;
  };
  isActive: boolean;
  successRate: number;
  lastTriggered?: string;
}

interface AdaptationStrategy {
  id: string;
  sourceId: string;
  name: string;
  type: 'api_integration' | 'web_scraping' | 'browser_automation' | 'mobile_automation' | 'social_integration' | 'custom_script';
  description: string;
  implementation: {
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    estimatedTime: number; // hours
    requiredSkills: string[];
    dependencies: string[];
    maintenanceLevel: 'low' | 'medium' | 'high';
  };
  performance: {
    successRate: number;
    averageEarnings: number;
    reliability: number;
    lastUpdated: string;
  };
  status: 'planned' | 'developing' | 'testing' | 'deployed' | 'failed' | 'deprecated';
  isActive: boolean;
  createdAt: string;
}

interface DiscoveryConfig {
  scanningEnabled: boolean;
  scanningFrequency: number; // hours
  autoTesting: boolean;
  autoIntegration: boolean;
  riskTolerance: 'low' | 'medium' | 'high';
  minPotential: number; // USD per day
  maxRiskLevel: RevenueSource['potential']['riskLevel'];
  sources: {
    cryptoForums: boolean;
    socialMedia: boolean;
    newsSites: boolean;
    competitorAnalysis: boolean;
    apiMarketplaces: boolean;
    trendAnalysis: boolean;
    jobBoards: boolean;
    appStores: boolean;
  };
  filters: {
    excludeHighRisk: boolean;
    requireAutomation: boolean;
    minSuccessRate: number;
    maxTimeCommitment: number;
    locationFilter: string[];
  };
  notifications: {
    newSources: boolean;
    integrationSuccess: boolean;
    failureAlerts: boolean;
    performanceReports: boolean;
    opportunityAlerts: boolean;
  };
}

const RevenueDiscoveryEngine: React.FC = () => {
  const [revenueSources, setRevenueSources] = useState<RevenueSource[]>([]);
  const [discoveryRules, setDiscoveryRules] = useState<DiscoveryRule[]>([]);
  const [adaptationStrategies, setAdaptationStrategies] = useState<AdaptationStrategy[]>([]);
  const [config, setConfig] = useState<DiscoveryConfig>({
    scanningEnabled: true,
    scanningFrequency: 6,
    autoTesting: true,
    autoIntegration: true,
    riskTolerance: 'medium',
    minPotential: 5.00,
    maxRiskLevel: 'high',
    sources: {
      cryptoForums: true,
      socialMedia: true,
      newsSites: true,
      competitorAnalysis: true,
      apiMarketplaces: true,
      trendAnalysis: true,
      jobBoards: true,
      appStores: true
    },
    filters: {
      excludeHighRisk: false,
      requireAutomation: true,
      minSuccessRate: 70,
      maxTimeCommitment: 8,
      locationFilter: ['US', 'UK', 'CA', 'AU', 'EU']
    },
    notifications: {
      newSources: true,
      integrationSuccess: true,
      failureAlerts: true,
      performanceReports: true,
      opportunityAlerts: true
    }
  });
  const [selectedSource, setSelectedSource] = useState<RevenueSource | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalSources: 0,
    integratedSources: 0,
    testingSources: 0,
    totalPotential: 0,
    actualEarnings: 0,
    successRate: 0,
    averagePotential: 0,
    bestCategory: '',
    discoveryRate: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock revenue sources initialization
  useEffect(() => {
    const mockSources: RevenueSource[] = [
      {
        id: 'source-1',
        name: 'CryptoEarn Plus',
        type: 'faucet',
        category: 'crypto',
        platform: 'CryptoEarn Plus',
        url: 'https://cryptoearnplus.com',
        description: 'High-yield crypto faucet with multiple earning methods',
        potential: {
          estimatedDaily: 15.50,
          estimatedMonthly: 465.00,
          riskLevel: 'low',
          timeCommitment: 2,
          skillRequirement: 'basic',
          equipment: ['Computer', 'Internet']
        },
        requirements: {
          verification: true,
          kyc: false,
          location: ['US', 'UK', 'CA', 'AU'],
          age: 18,
          skills: ['Basic crypto knowledge'],
          tools: ['Web browser']
        },
        performance: {
          discoveredAt: '2024-01-15T00:00:00Z',
          firstTested: '2024-01-16T00:00:00Z',
          integrationStatus: 'integrated',
          successRate: 92.5,
          actualEarnings: 12.75,
          lastEarning: new Date().toISOString(),
          totalEarned: 1250.50,
          adaptabilityScore: 88.0
        },
        automation: {
          automatable: true,
          difficulty: 'easy',
          apiAvailable: true,
          rateLimit: 100,
          maintenance: 'low',
          reliability: 95.0
        },
        isActive: true,
        priority: 1
      },
      {
        id: 'source-2',
        name: 'SurveyMax Pro',
        type: 'survey',
        category: 'content',
        platform: 'SurveyMax Pro',
        url: 'https://surveymaxpro.com',
        description: 'Premium survey platform with high-paying surveys',
        potential: {
          estimatedDaily: 25.00,
          estimatedMonthly: 750.00,
          riskLevel: 'medium',
          timeCommitment: 4,
          skillRequirement: 'basic',
          equipment: ['Computer', 'Microphone']
        },
        requirements: {
          verification: true,
          kyc: true,
          location: ['US', 'UK', 'CA'],
          age: 18,
          skills: ['Survey completion', 'English proficiency'],
          tools: ['Web browser', 'Microphone']
        },
        performance: {
          discoveredAt: '2024-01-20T00:00:00Z',
          firstTested: '2024-01-21T00:00:00Z',
          integrationStatus: 'testing',
          successRate: 78.5,
          actualEarnings: 18.25,
          lastEarning: new Date(Date.now() - 86400000).toISOString(),
          totalEarned: 365.00,
          adaptabilityScore: 75.0
        },
        automation: {
          automatable: true,
          difficulty: 'medium',
          apiAvailable: false,
          rateLimit: 50,
          maintenance: 'medium',
          reliability: 85.0
        },
        isActive: true,
        priority: 2
      },
      {
        id: 'source-3',
        name: 'SocialBoost Agency',
        type: 'social',
        category: 'social',
        platform: 'SocialBoost Agency',
        url: 'https://socialboostagency.com',
        description: 'Get paid to grow social media accounts and engagement',
        potential: {
          estimatedDaily: 35.00,
          estimatedMonthly: 1050.00,
          riskLevel: 'medium',
          timeCommitment: 3,
          skillRequirement: 'intermediate',
          equipment: ['Computer', 'Smartphone']
        },
        requirements: {
          verification: true,
          kyc: true,
          location: ['US', 'UK', 'CA', 'AU', 'EU'],
          age: 21,
          skills: ['Social media management', 'Content creation'],
          tools: ['Multiple social accounts', 'Content tools']
        },
        performance: {
          discoveredAt: '2024-02-01T00:00:00Z',
          integrationStatus: 'discovered',
          successRate: 0,
          adaptabilityScore: 65.0
        },
        automation: {
          automatable: true,
          difficulty: 'hard',
          apiAvailable: false,
          rateLimit: 30,
          maintenance: 'high',
          reliability: 70.0
        },
        isActive: true,
        priority: 3
      }
    ];

    setRevenueSources(mockSources);
  }, []);

  // Mock discovery rules initialization
  useEffect(() => {
    const mockRules: DiscoveryRule[] = [
      {
        id: 'rule-1',
        name: 'Crypto Forum Scanner',
        type: 'keyword',
        description: 'Scans crypto forums for new earning opportunities',
        conditions: {
          keywords: ['faucet', 'earn crypto', 'free bitcoin', 'crypto earning', 'get paid', 'rewards'],
          platforms: ['bitcointalk.org', 'reddit.com/r/cryptocurrency', 'crypto.com/forum'],
          categories: ['crypto'],
          minPotential: 5.00,
          maxRiskLevel: 'high',
          automatableOnly: true
        },
        actions: {
          priority: 1,
          autoTest: true,
          autoIntegrate: false,
          notify: true,
          allocateResources: true
        },
        isActive: true,
        successRate: 85.0,
        lastTriggered: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'rule-2',
        name: 'Social Media Trend Monitor',
        type: 'trend',
        description: 'Monitors social media for trending earning methods',
        conditions: {
          keywords: ['#earnmoney', '#sidehustle', '#passiveincome', '#crypto', '#freelance'],
          platforms: ['twitter.com', 'tiktok.com', 'instagram.com'],
          categories: ['social', 'content', 'service'],
          minPotential: 10.00,
          maxRiskLevel: 'medium',
          automatableOnly: false
        },
        actions: {
          priority: 2,
          autoTest: true,
          autoIntegrate: false,
          notify: true,
          allocateResources: false
        },
        isActive: true,
        successRate: 72.5,
        lastTriggered: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    setDiscoveryRules(mockRules);
  }, []);

  // Auto discovery simulation
  useEffect(() => {
    if (!config.scanningEnabled || !isScanning) return;

    const interval = setInterval(() => {
      // Simulate discovering new revenue sources
      if (Math.random() > 0.8) { // 20% chance per interval
        const types: RevenueSource['type'][] = ['faucet', 'ptc', 'survey', 'trading', 'staking', 'airdrop', 'social', 'gaming'];
        const categories: RevenueSource['category'][] = ['crypto', 'social', 'gaming', 'content', 'finance', 'service'];
        const platforms = ['NewPlatform', 'EarnZone', 'CryptoHub', 'SurveyMaster', 'SocialBoost'];
        
        const newSource: RevenueSource = {
          id: `source-${Date.now()}`,
          name: `${platforms[Math.floor(Math.random() * platforms.length)]} ${Math.floor(Math.random() * 100)}`,
          type: types[Math.floor(Math.random() * types.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          url: `https://example.com/${Math.random().toString(36).substr(2, 8)}`,
          description: `Newly discovered ${types[Math.floor(Math.random() * types.length)]} platform with promising potential`,
          potential: {
            estimatedDaily: Math.random() * 50 + 5,
            estimatedMonthly: 0,
            riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
            timeCommitment: Math.floor(Math.random() * 8) + 1,
            skillRequirement: ['none', 'basic', 'intermediate', 'advanced'][Math.floor(Math.random() * 4)] as any,
            equipment: ['Computer', 'Smartphone', 'Internet']
          },
          requirements: {
            verification: Math.random() > 0.5,
            kyc: Math.random() > 0.7,
            location: ['US', 'UK', 'CA', 'AU'],
            age: 18,
            skills: [],
            tools: []
          },
          performance: {
            discoveredAt: new Date().toISOString(),
            integrationStatus: 'discovered',
            successRate: 0,
            adaptabilityScore: Math.random() * 40 + 60
          },
          automation: {
            automatable: Math.random() > 0.3,
            difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
            apiAvailable: Math.random() > 0.6,
            rateLimit: Math.floor(Math.random() * 100) + 10,
            maintenance: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
            reliability: Math.random() * 30 + 70
          },
          isActive: true,
          priority: Math.floor(Math.random() * 10) + 1
        };

        newSource.potential.estimatedMonthly = newSource.potential.estimatedDaily * 30;

        setRevenueSources(prev => [...prev, newSource]);

        // Auto test if enabled
        if (config.autoTesting) {
          setTimeout(() => {
            setRevenueSources(prev => prev.map(source => 
              source.id === newSource.id 
                ? {
                    ...source,
                    performance: {
                      ...source.performance,
                      firstTested: new Date().toISOString(),
                      integrationStatus: 'testing',
                      successRate: Math.random() * 40 + 60
                    }
                  }
                : source
            ));

            // Complete testing after delay
            setTimeout(() => {
              const success = Math.random() > 0.3; // 70% success rate
              setRevenueSources(prev => prev.map(source => 
                source.id === newSource.id 
                  ? {
                      ...source,
                      performance: {
                        ...source.performance,
                        integrationStatus: success ? 'integrating' : 'failed',
                        successRate: success ? Math.random() * 30 + 70 : Math.random() * 30 + 20,
                        actualEarnings: success ? Math.random() * source.potential.estimatedDaily : 0,
                        lastEarning: success ? new Date().toISOString() : undefined,
                        totalEarned: success ? Math.random() * source.potential.estimatedDaily : 0
                      }
                    }
                  : source
              ));

              // Auto integrate if successful and enabled
              if (success && config.autoIntegration && source.automation.automatable) {
                setTimeout(() => {
                  setRevenueSources(prev => prev.map(s => 
                    s.id === newSource.id 
                      ? {
                          ...s,
                          performance: {
                            ...s.performance,
                            integrationStatus: 'integrated'
                          }
                        }
                      : s
                  ));
                }, 30000);
              }
            }, 60000); // 1 minute testing
          }, 5000); // 5 seconds to start testing
        }
      }
    }, config.scanningFrequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.scanningEnabled, config.scanningFrequency, config.autoTesting, config.autoIntegration, isScanning]);

  // Update stats
  useEffect(() => {
    const integratedSources = revenueSources.filter(s => s.performance.integrationStatus === 'integrated').length;
    const testingSources = revenueSources.filter(s => s.performance.integrationStatus === 'testing').length;
    const totalPotential = revenueSources.reduce((sum, s) => sum + s.potential.estimatedDaily, 0);
    const actualEarnings = revenueSources.reduce((sum, s) => sum + (s.performance.actualEarnings || 0), 0);
    const successRate = revenueSources.filter(s => s.performance.successRate > 0).length > 0
      ? revenueSources.reduce((sum, s) => sum + s.performance.successRate, 0) / revenueSources.filter(s => s.performance.successRate > 0).length
      : 0;
    const averagePotential = revenueSources.length > 0 ? totalPotential / revenueSources.length : 0;
    
    const categoryCounts = revenueSources.reduce((acc, source) => {
      acc[source.category] = (acc[source.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestCategory = Object.entries(categoryCounts).reduce((best, [category, count]) => 
      count > (best?.count || 0) ? { category, count } : best, null as { category: string; count: number } | null);
    const discoveryRate = revenueSources.filter(s => 
      new Date(s.performance.discoveredAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    setStats({
      totalSources: revenueSources.length,
      integratedSources,
      testingSources,
      totalPotential,
      actualEarnings,
      successRate,
      averagePotential,
      bestCategory: bestCategory?.category || '',
      discoveryRate
    });
  }, [revenueSources]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const testSource = (sourceId: string) => {
    setRevenueSources(prev => prev.map(source => 
      source.id === sourceId 
        ? {
            ...source,
            performance: {
              ...source.performance,
              firstTested: new Date().toISOString(),
              integrationStatus: 'testing',
              successRate: Math.random() * 40 + 60
            }
          }
        : source
    ));

    // Simulate testing completion
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      setRevenueSources(prev => prev.map(source => 
        source.id === sourceId 
          ? {
              ...source,
              performance: {
                ...source.performance,
                integrationStatus: success ? 'integrating' : 'failed',
                successRate: success ? Math.random() * 30 + 70 : Math.random() * 30 + 20,
                actualEarnings: success ? Math.random() * source.potential.estimatedDaily : 0,
                lastEarning: success ? new Date().toISOString() : undefined,
                totalEarned: success ? Math.random() * source.potential.estimatedDaily : 0
              }
            }
          : source
      ));
    }, 30000);
  };

  const integrateSource = (sourceId: string) => {
    setRevenueSources(prev => prev.map(source => 
      source.id === sourceId 
        ? {
            ...source,
            performance: {
              ...source.performance,
              integrationStatus: 'integrated'
            }
          }
        : source
    ));
  };

  const getSourceTypeColor = (type: RevenueSource['type']) => {
    switch (type) {
      case 'faucet': return 'bg-blue-600';
      case 'ptc': return 'bg-green-600';
      case 'survey': return 'bg-purple-600';
      case 'trading': return 'bg-red-600';
      case 'staking': return 'bg-orange-600';
      case 'airdrop': return 'bg-yellow-600';
      case 'social': return 'bg-pink-600';
      case 'gaming': return 'bg-indigo-600';
      case 'content': return 'bg-cyan-600';
      case 'service': return 'bg-gray-600';
      case 'affiliate': return 'bg-teal-600';
      case 'mining': return 'bg-lime-600';
      case 'lending': return 'bg-amber-600';
      case 'yield': return 'bg-emerald-600';
      case 'arbitrage': return 'bg-rose-600';
      default: return 'bg-gray-600';
    }
  };

  const getRiskLevelColor = (risk: RevenueSource['potential']['riskLevel']) => {
    switch (risk) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'very_high': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: RevenueSource['performance']['integrationStatus']) => {
    switch (status) {
      case 'discovered': return 'bg-blue-600';
      case 'testing': return 'bg-yellow-600';
      case 'integrating': return 'bg-purple-600';
      case 'integrated': return 'bg-green-600';
      case 'failed': return 'bg-red-600';
      case 'deprecated': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredSources = () => {
    return revenueSources.filter(source => {
      const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           source.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || source.type === filterType;
      const matchesStatus = filterStatus === 'all' || source.performance.integrationStatus === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            Revenue Discovery Engine
          </h1>
          <p className="text-gray-400">
            Automated revenue discovery engine that finds and adapts to new income opportunities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Sources</div>
                <div className="text-2xl font-bold">{stats.totalSources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Integrated</div>
                <div className="text-2xl font-bold">{stats.integratedSources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Potential</div>
                <div className="text-2xl font-bold">${stats.totalPotential.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Discovery Rate</div>
                <div className="text-2xl font-bold">{stats.discoveryRate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Discovery Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleScanning}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isScanning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isScanning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Scanning
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Scanning
                  </>
                )}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              Best Category: {stats.bestCategory || 'None'} | 
              Avg Potential: ${stats.averagePotential.toFixed(2)} | 
              Scanning: {config.scanningEnabled ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Sources</h3>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sources..."
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="faucet">Faucet</option>
              <option value="survey">Survey</option>
              <option value="social">Social</option>
              <option value="trading">Trading</option>
              <option value="staking">Staking</option>
              <option value="airdrop">Airdrop</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="discovered">Discovered</option>
              <option value="testing">Testing</option>
              <option value="integrating">Integrating</option>
              <option value="integrated">Integrated</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="space-y-3">
            {getFilteredSources().map((source) => (
              <div
                key={source.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSource?.id === source.id ? 'border-purple-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedSource(source)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${source.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <div>
                      <h4 className="font-semibold">{source.name}</h4>
                      <div className="text-sm text-gray-400">{source.platform}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getSourceTypeColor(source.type)}`}>
                      {source.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(source.performance.integrationStatus)}`}>
                      {source.performance.integrationStatus.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getRiskLevelColor(source.potential.riskLevel)}`}>
                      {source.potential.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-3">
                  {source.description}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Daily Potential:</span> ${source.potential.estimatedDaily.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Monthly Potential:</span> ${source.potential.estimatedMonthly.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Time Commitment:</span> {source.potential.timeCommitment}h/day
                  </div>
                  <div>
                    <span className="text-gray-400">Success Rate:</span> {source.performance.successRate.toFixed(1)}%
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {source.automation.automatable && (
                      <span className="px-2 py-1 bg-green-600 rounded text-xs">Automatable</span>
                    )}
                    {source.automation.apiAvailable && (
                      <span className="px-2 py-1 bg-blue-600 rounded text-xs">API</span>
                    )}
                    {source.performance.actualEarnings && (
                      <span className="px-2 py-1 bg-purple-600 rounded text-xs">
                        Earned: ${source.performance.actualEarnings.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {source.performance.integrationStatus === 'discovered' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          testSource(source.id);
                        }}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
                      >
                        Test
                      </button>
                    )}
                    {source.performance.integrationStatus === 'testing' && (
                      <span className="px-2 py-1 bg-yellow-600 rounded text-xs">Testing...</span>
                    )}
                    {source.performance.integrationStatus === 'integrating' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          integrateSource(source.id);
                        }}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                      >
                        Integrate
                      </button>
                    )}
                    {source.performance.integrationStatus === 'integrated' && (
                      <span className="px-2 py-1 bg-green-600 rounded text-xs">Integrated</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {getFilteredSources().length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No revenue sources found
            </div>
          )}
        </div>

        {/* Selected Source Details */}
        {selectedSource && (
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Source Details: {selectedSource.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Potential Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Potential:</span>
                    <span className="font-medium">${selectedSource.potential.estimatedDaily.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Potential:</span>
                    <span className="font-medium">${selectedSource.potential.estimatedMonthly.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getRiskLevelColor(selectedSource.potential.riskLevel)}`}>
                      {selectedSource.potential.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time Commitment:</span>
                    <span className="font-medium">{selectedSource.potential.timeCommitment} hours/day</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Verification:</span>
                    <span className="font-medium">{selectedSource.requirements.verification ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">KYC:</span>
                    <span className="font-medium">{selectedSource.requirements.kyc ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Age:</span>
                    <span className="font-medium">{selectedSource.requirements.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Locations:</span>
                    <span className="font-medium">{selectedSource.requirements.location.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Automation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Automatable:</span>
                    <span className="font-medium">{selectedSource.automation.automatable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="font-medium">{selectedSource.automation.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">API Available:</span>
                    <span className="font-medium">{selectedSource.automation.apiAvailable ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reliability:</span>
                    <span className="font-medium">{selectedSource.automation.reliability.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="font-medium">{selectedSource.performance.successRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Actual Earnings:</span>
                    <span className="font-medium">${(selectedSource.performance.actualEarnings || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Earned:</span>
                    <span className="font-medium">${selectedSource.performance.totalEarned.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Adaptability:</span>
                    <span className="font-medium">{selectedSource.performance.adaptabilityScore.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Discovery Engine Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Scanning Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.scanningFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, scanningFrequency: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Potential ($/day)</label>
                    <input
                      type="number"
                      value={config.minPotential}
                      onChange={(e) => setConfig(prev => ({ ...prev, minPotential: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="1000"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.scanningEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, scanningEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Scanning Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoTesting}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoTesting: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Testing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoIntegration}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoIntegration: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Integration</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.filters.requireAutomation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          filters: { ...prev.filters, requireAutomation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Require Automation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Data Sources</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sources.cryptoForums}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          sources: { ...prev.sources, cryptoForums: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Crypto Forums</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sources.socialMedia}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          sources: { ...prev.sources, socialMedia: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Social Media</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sources.competitorAnalysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          sources: { ...prev.sources, competitorAnalysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Competitor Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sources.trendAnalysis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          sources: { ...prev.sources, trendAnalysis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Trend Analysis</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueDiscoveryEngine;
