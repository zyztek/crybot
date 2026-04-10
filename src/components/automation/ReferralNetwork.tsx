/**
 * Referral Network Component
 * 
 * Advanced referral network system with multiple schemas and tracking
 * Supports multi-level referrals, automated sharing, and revenue tracking
 */

import React, { useState, useEffect, useRef } from 'react';
import { Users, Link, TrendingUp, DollarSign, Share2, Copy, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Globe, Target } from 'lucide-react';

interface ReferralSchema {
  id: string;
  name: string;
  type: 'single_tier' | 'multi_tier' | 'binary' | 'matrix' | 'hybrid';
  levels: number;
  commissionType: 'percentage' | 'fixed' | 'tiered' | 'performance';
  commissionStructure: {
    level1: number;
    level2?: number;
    level3?: number;
    level4?: number;
    level5?: number;
  };
  bonusStructure: {
    signupBonus: number;
    firstDepositBonus: number;
    performanceBonus: number;
    volumeBonus: number;
  };
  tracking: {
    cookieDuration: number; // days
    ipTracking: boolean;
    deviceTracking: boolean;
    fingerprintTracking: boolean;
  };
  requirements: {
    minimumDeposit?: number;
    minimumActivity?: number;
    verificationRequired: boolean;
    kycRequired: boolean;
  };
  isActive: boolean;
  priority: number;
}

interface ReferralLink {
  id: string;
  personaId: string;
  schemaId: string;
  platform: string;
  url: string;
  shortUrl?: string;
  customAlias?: string;
  campaign: string;
  source: string;
  medium: string;
  isActive: boolean;
  tracking: {
    clicks: number;
    uniqueClicks: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
    averageRevenue: number;
  };
  performance: {
    bestDay: string;
    bestHour: number;
    peakTraffic: number;
    engagementRate: number;
    bounceRate: number;
  };
  createdAt: string;
  lastClick?: string;
  expiresAt?: string;
}

interface ReferralNetwork {
  id: string;
  personaId: string;
  schemaId: string;
  level: number;
  parentId?: string;
  children: string[];
  referrals: ReferralLink[];
  stats: {
    totalReferrals: number;
    activeReferrals: number;
    totalRevenue: number;
    monthlyRevenue: number;
    averageRevenuePerReferral: number;
    bestPerformingReferral?: string;
  };
  performance: {
    growthRate: number;
    retentionRate: number;
    churnRate: number;
    lifetimeValue: number;
    acquisitionCost: number;
  };
  createdAt: string;
  lastActivity: string;
}

interface ReferralConfig {
  autoGeneration: boolean;
  linkRotation: boolean;
  campaignManagement: boolean;
  performanceTracking: boolean;
  revenueOptimization: boolean;
  socialSharing: {
    enabled: boolean;
    platforms: Array<'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'reddit' | 'telegram' | 'discord'>;
    frequency: number; // hours
    automation: boolean;
  };
  contentGeneration: {
    enabled: boolean;
    templates: boolean;
    personalization: boolean;
    aBTesting: boolean;
  };
  analytics: {
    realTimeTracking: boolean;
    conversionTracking: boolean;
    revenueAttribution: boolean;
    cohortAnalysis: boolean;
  };
}

const ReferralNetwork: React.FC = () => {
  const [schemas, setSchemas] = useState<ReferralSchema[]>([]);
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([]);
  const [networks, setNetworks] = useState<ReferralNetwork[]>([]);
  const [config, setConfig] = useState<ReferralConfig>({
    autoGeneration: true,
    linkRotation: true,
    campaignManagement: true,
    performanceTracking: true,
    revenueOptimization: true,
    socialSharing: {
      enabled: true,
      platforms: ['facebook', 'twitter', 'instagram', 'reddit', 'telegram'],
      frequency: 6,
      automation: true
    },
    contentGeneration: {
      enabled: true,
      templates: true,
      personalization: true,
      aBTesting: true
    },
    analytics: {
      realTimeTracking: true,
      conversionTracking: true,
      revenueAttribution: true,
      cohortAnalysis: true
    }
  });
  const [selectedNetwork, setSelectedNetwork] = useState<ReferralNetwork | null>(null);
  const [selectedSchema, setSelectedSchema] = useState<ReferralSchema | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalLinks: 0,
    activeLinks: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    conversionRate: 0,
    averageRevenue: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock referral schemas initialization
  useEffect(() => {
    const mockSchemas: ReferralSchema[] = [
      {
        id: '1',
        name: 'Standard Multi-Tier',
        type: 'multi_tier',
        levels: 5,
        commissionType: 'percentage',
        commissionStructure: {
          level1: 25,
          level2: 15,
          level3: 10,
          level4: 5,
          level5: 2
        },
        bonusStructure: {
          signupBonus: 5.00,
          firstDepositBonus: 10.00,
          performanceBonus: 25.00,
          volumeBonus: 50.00
        },
        tracking: {
          cookieDuration: 30,
          ipTracking: true,
          deviceTracking: true,
          fingerprintTracking: true
        },
        requirements: {
          minimumDeposit: 10.00,
          verificationRequired: true,
          kycRequired: false
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Binary Matrix',
        type: 'binary',
        levels: 3,
        commissionType: 'fixed',
        commissionStructure: {
          level1: 20.00,
          level2: 10.00,
          level3: 5.00
        },
        bonusStructure: {
          signupBonus: 15.00,
          firstDepositBonus: 25.00,
          performanceBonus: 100.00,
          volumeBonus: 200.00
        },
        tracking: {
          cookieDuration: 60,
          ipTracking: true,
          deviceTracking: true,
          fingerprintTracking: true
        },
        requirements: {
          minimumDeposit: 25.00,
          verificationRequired: true,
          kycRequired: true
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'Performance Hybrid',
        type: 'hybrid',
        levels: 4,
        commissionType: 'tiered',
        commissionStructure: {
          level1: 30,
          level2: 20,
          level3: 15,
          level4: 10
        },
        bonusStructure: {
          signupBonus: 10.00,
          firstDepositBonus: 20.00,
          performanceBonus: 50.00,
          volumeBonus: 150.00
        },
        tracking: {
          cookieDuration: 45,
          ipTracking: true,
          deviceTracking: true,
          fingerprintTracking: true
        },
        requirements: {
          minimumDeposit: 50.00,
          verificationRequired: true,
          kycRequired: true
        },
        isActive: true,
        priority: 3
      }
    ];

    setSchemas(mockSchemas);
  }, []);

  // Mock referral links initialization
  useEffect(() => {
    const mockLinks: ReferralLink[] = [
      {
        id: 'link-1',
        personaId: 'persona-1',
        schemaId: '1',
        platform: 'FreeBitcoin',
        url: 'https://freebitco.in/?r=12345678',
        shortUrl: 'https://bit.ly/3abc123',
        customAlias: 'freebtc-john',
        campaign: 'crypto-faucet-2024',
        source: 'social',
        medium: 'organic',
        isActive: true,
        tracking: {
          clicks: 1250,
          uniqueClicks: 890,
          conversions: 156,
          revenue: 3120.50,
          conversionRate: 17.5,
          averageRevenue: 20.00
        },
        performance: {
          bestDay: '2024-01-15',
          bestHour: 14,
          peakTraffic: 125,
          engagementRate: 65.2,
          bounceRate: 35.8
        },
        createdAt: '2024-01-01T00:00:00Z',
        lastClick: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'link-2',
        personaId: 'persona-2',
        schemaId: '2',
        platform: 'Cointiply',
        url: 'https://cointiply.com/r/87654321',
        campaign: 'earn-crypto-2024',
        source: 'forum',
        medium: 'referral',
        isActive: true,
        tracking: {
          clicks: 890,
          uniqueClicks: 650,
          conversions: 98,
          revenue: 1960.00,
          conversionRate: 15.1,
          averageRevenue: 20.00
        },
        performance: {
          bestDay: '2024-01-20',
          bestHour: 16,
          peakTraffic: 89,
          engagementRate: 58.7,
          bounceRate: 41.3
        },
        createdAt: '2024-01-05T00:00:00Z',
        lastClick: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    setReferralLinks(mockLinks);
  }, []);

  // Mock networks initialization
  useEffect(() => {
    const mockNetworks: ReferralNetwork[] = [
      {
        id: 'network-1',
        personaId: 'persona-1',
        schemaId: '1',
        level: 1,
        children: ['network-2', 'network-3'],
        referrals: [mockLinks[0]],
        stats: {
          totalReferrals: 156,
          activeReferrals: 142,
          totalRevenue: 3120.50,
          monthlyRevenue: 520.08,
          averageRevenuePerReferral: 20.00,
          bestPerformingReferral: 'link-1'
        },
        performance: {
          growthRate: 15.2,
          retentionRate: 91.0,
          churnRate: 9.0,
          lifetimeValue: 156.25,
          acquisitionCost: 8.50
        },
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'network-2',
        personaId: 'persona-2',
        schemaId: '1',
        level: 2,
        parentId: 'network-1',
        children: [],
        referrals: [mockLinks[1]],
        stats: {
          totalReferrals: 98,
          activeReferrals: 89,
          totalRevenue: 1960.00,
          monthlyRevenue: 326.67,
          averageRevenuePerReferral: 20.00
        },
        performance: {
          growthRate: 12.8,
          retentionRate: 90.8,
          churnRate: 9.2,
          lifetimeValue: 142.86,
          acquisitionCost: 7.25
        },
        createdAt: '2024-01-05T00:00:00Z',
        lastActivity: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    setNetworks(mockNetworks);
  }, []);

  // Auto link generation simulation
  useEffect(() => {
    if (!config.autoGeneration) return;

    const interval = setInterval(() => {
      // Simulate new link generation
      const platforms = ['FreeBitcoin', 'Cointiply', 'FireFaucet', 'CoinEarn', 'CryptoBrowser'];
      const campaigns = ['crypto-faucet-2024', 'earn-crypto-2024', 'passive-income-2024'];
      const sources = ['social', 'forum', 'blog', 'email', 'paid'];
      
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      const randomPersona = `persona-${Math.floor(Math.random() * 3) + 1}`;
      const randomSchema = schemas[Math.floor(Math.random() * schemas.length)];

      if (Math.random() > 0.8) { // 20% chance per interval
        const newLink: ReferralLink = {
          id: `link-${Date.now()}`,
          personaId: randomPersona,
          schemaId: randomSchema.id,
          platform: randomPlatform,
          url: `https://${randomPlatform.toLowerCase().replace(/\s+/g, '')}.com/r/${Math.random().toString(36).substr(2, 8)}`,
          campaign: randomCampaign,
          source: randomSource,
          medium: 'organic',
          isActive: true,
          tracking: {
            clicks: 0,
            uniqueClicks: 0,
            conversions: 0,
            revenue: 0,
            conversionRate: 0,
            averageRevenue: 0
          },
          performance: {
            bestDay: '',
            bestHour: 0,
            peakTraffic: 0,
            engagementRate: 0,
            bounceRate: 0
          },
          createdAt: new Date().toISOString()
        };

        setReferralLinks(prev => [...prev, newLink]);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.autoGeneration, schemas]);

  // Performance tracking simulation
  useEffect(() => {
    if (!config.performanceTracking) return;

    const interval = setInterval(() => {
      // Simulate tracking updates
      setReferralLinks(prev => prev.map(link => ({
        ...link,
        tracking: {
          ...link.tracking,
          clicks: link.tracking.clicks + Math.floor(Math.random() * 5),
          uniqueClicks: link.tracking.uniqueClicks + Math.floor(Math.random() * 3),
          conversions: Math.random() > 0.9 ? link.tracking.conversions + 1 : link.tracking.conversions,
          revenue: link.tracking.revenue + (Math.random() > 0.95 ? Math.random() * 50 : 0)
        },
        lastClick: new Date().toISOString()
      })));
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [config.performanceTracking]);

  // Update stats
  useEffect(() => {
    const activeLinks = referralLinks.filter(l => l.isActive).length;
    const totalClicks = referralLinks.reduce((sum, l) => sum + l.tracking.clicks, 0);
    const totalConversions = referralLinks.reduce((sum, l) => sum + l.tracking.conversions, 0);
    const totalRevenue = referralLinks.reduce((sum, l) => sum + l.tracking.revenue, 0);
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    const averageRevenue = totalConversions > 0 ? totalRevenue / totalConversions : 0;

    setStats({
      totalLinks: referralLinks.length,
      activeLinks,
      totalClicks,
      totalConversions,
      totalRevenue,
      conversionRate,
      averageRevenue
    });
  }, [referralLinks]);

  const createReferralLink = () => {
    const activeSchemas = schemas.filter(s => s.isActive);
    if (activeSchemas.length === 0) return;

    const selectedSchema = activeSchemas[Math.floor(Math.random() * activeSchemas.length)];
    const platforms = ['FreeBitcoin', 'Cointiply', 'FireFaucet', 'CoinEarn', 'CryptoBrowser'];
    const campaigns = ['crypto-faucet-2024', 'earn-crypto-2024', 'passive-income-2024'];
    
    const newLink: ReferralLink = {
      id: `link-${Date.now()}`,
      personaId: 'persona-1',
      schemaId: selectedSchema.id,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      url: `https://example.com/r/${Math.random().toString(36).substr(2, 8)}`,
      campaign: campaigns[Math.floor(Math.random() * campaigns.length)],
      source: 'manual',
      medium: 'referral',
      isActive: true,
      tracking: {
        clicks: 0,
        uniqueClicks: 0,
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        averageRevenue: 0
      },
      performance: {
        bestDay: '',
        bestHour: 0,
        peakTraffic: 0,
        engagementRate: 0,
        bounceRate: 0
      },
      createdAt: new Date().toISOString()
    };

    setReferralLinks(prev => [...prev, newLink]);
    setShowCreateForm(false);
  };

  const deleteLink = (linkId: string) => {
    setReferralLinks(prev => prev.filter(l => l.id !== linkId));
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const exportLinks = () => {
    const exportData = {
      referralLinks,
      networks,
      schemas,
      config,
      stats,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referral-network-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSchemaTypeColor = (type: ReferralSchema['type']) => {
    switch (type) {
      case 'single_tier': return 'bg-blue-600';
      case 'multi_tier': return 'bg-green-600';
      case 'binary': return 'bg-purple-600';
      case 'matrix': return 'bg-orange-600';
      case 'hybrid': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredLinks = () => {
    return referralLinks.filter(link => {
      const matchesSearch = link.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           link.campaign.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = filterPlatform === 'all' || link.platform === filterPlatform;
      const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' ? link.isActive : !link.isActive);
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Referral Network
          </h1>
          <p className="text-gray-400">
            Advanced referral network system with multiple schemas and automated tracking
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Link className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Links</div>
                <div className="text-2xl font-bold">{stats.activeLinks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Clicks</div>
                <div className="text-2xl font-bold">{stats.totalClicks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Conversions</div>
                <div className="text-2xl font-bold">{stats.totalConversions}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
                <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Referral Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={createReferralLink}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Link className="w-4 h-4" />
                Create Link
              </button>
              <button
                onClick={exportLinks}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                Export
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
              Total: {stats.totalLinks} | 
              Revenue: ${stats.totalRevenue.toFixed(2)} | 
              Auto Generation: {config.autoGeneration ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Referral Schemas */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Referral Schemas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemas.map((schema) => (
              <div
                key={schema.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSchema?.id === schema.id ? 'border-purple-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedSchema(schema)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${schema.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <h4 className="font-semibold">{schema.name}</h4>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getSchemaTypeColor(schema.type)}`}>
                    {schema.type.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Levels:</span> {schema.levels}
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span> {schema.commissionType}
                  </div>
                  <div>
                    <span className="text-gray-400">L1:</span> {schema.commissionStructure.level1}%
                  </div>
                  <div>
                    <span className="text-gray-400">L2:</span> {schema.commissionStructure.level2}%
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      ${schema.bonusStructure.signupBonus} signup
                    </span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {schema.tracking.cookieDuration} days
                    </span>
                  </div>
                  <div className="text-gray-400">
                    Priority: {schema.priority}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Referral Links</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search links..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Platforms</option>
                <option value="FreeBitcoin">FreeBitcoin</option>
                <option value="Cointiply">Cointiply</option>
                <option value="FireFaucet">FireFaucet</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredLinks().map((link) => (
                <div
                  key={link.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedNetwork?.id === link.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedNetwork(networks.find(n => n.referrals.some(r => r.id === link.id)) || null)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${link.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{link.platform}</h4>
                        <div className="text-sm text-gray-400">{link.campaign}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyLink(link.url);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy Link"
                      >
                        <Copy className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLink(link.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Clicks:</span> {link.tracking.clicks}
                    </div>
                    <div>
                      <span className="text-gray-400">Conversions:</span> {link.tracking.conversions}
                    </div>
                    <div>
                      <span className="text-gray-400">Revenue:</span> ${link.tracking.revenue.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-400">CR:</span> {link.tracking.conversionRate.toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {link.source}
                      </span>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {link.medium}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Network Details */}
          {selectedNetwork && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Network Details</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Network Statistics</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Total Referrals:</span> {selectedNetwork.stats.totalReferrals}</div>
                      <div><span className="text-gray-400">Active Referrals:</span> {selectedNetwork.stats.activeReferrals}</div>
                      <div><span className="text-gray-400">Total Revenue:</span> ${selectedNetwork.stats.totalRevenue.toFixed(2)}</div>
                      <div><span className="text-gray-400">Monthly Revenue:</span> ${selectedNetwork.stats.monthlyRevenue.toFixed(2)}</div>
                      <div><span className="text-gray-400">Avg Revenue:</span> ${selectedNetwork.stats.averageRevenuePerReferral.toFixed(2)}</div>
                      <div><span className="text-gray-400">Network Level:</span> {selectedNetwork.level}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Growth Rate:</span> {selectedNetwork.performance.growthRate.toFixed(1)}%</div>
                      <div><span className="text-gray-400">Retention Rate:</span> {selectedNetwork.performance.retentionRate.toFixed(1)}%</div>
                      <div><span className="text-gray-400">Churn Rate:</span> {selectedNetwork.performance.churnRate.toFixed(1)}%</div>
                      <div><span className="text-gray-400">Lifetime Value:</span> ${selectedNetwork.performance.lifetimeValue.toFixed(2)}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Referral Links</h4>
                    <div className="space-y-2">
                      {selectedNetwork.referrals.map((referral, index) => (
                        <div key={index} className="p-2 bg-gray-700 rounded">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{referral.platform}</div>
                              <div className="text-xs text-gray-400">{referral.campaign}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-green-400">${referral.tracking.revenue.toFixed(2)}</span>
                              <span className="text-gray-400 ml-2">{referral.tracking.conversions} conv</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Referral Network Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoGeneration}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoGeneration: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Generation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.linkRotation}
                        onChange={(e) => setConfig(prev => ({ ...prev, linkRotation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Link Rotation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.campaignManagement}
                        onChange={(e) => setConfig(prev => ({ ...prev, campaignManagement: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Campaign Management</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.revenueOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, revenueOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Revenue Optimization</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Social Sharing</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.socialSharing.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          socialSharing: { ...prev.socialSharing, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.socialSharing.automation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          socialSharing: { ...prev.socialSharing, automation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Automation</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.socialSharing.frequency}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        socialSharing: { ...prev.socialSharing, frequency: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="24"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Content Generation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentGeneration.enabled}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          contentGeneration: { ...prev.contentGeneration, enabled: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentGeneration.templates}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          contentGeneration: { ...prev.contentGeneration, templates: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Templates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentGeneration.personalization}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          contentGeneration: { ...prev.contentGeneration, personalization: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Personalization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.contentGeneration.aBTesting}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          contentGeneration: { ...prev.contentGeneration, aBTesting: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">A/B Testing</span>
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

export default ReferralNetwork;
