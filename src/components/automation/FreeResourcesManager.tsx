/**
 * Free Resources Manager Component
 * 
 * Comprehensive free resources manager for APIs, services, AI, VPS, GPU/TPU accounts and cloud resources
 * Scans and manages all available free resources globally
 */

import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Server, Cpu, Zap, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Globe, Database, Wifi, HardDrive, Monitor, Key, Shield, Brain } from 'lucide-react';

interface FreeResource {
  id: string;
  name: string;
  type: 'api' | 'service' | 'ai' | 'vps' | 'gpu' | 'tpu' | 'storage' | 'domain' | 'vpn' | 'proxy' | 'email' | 'phone' | 'credit' | 'software' | 'tool';
  category: 'computing' | 'ai_ml' | 'storage' | 'networking' | 'communication' | 'development' | 'security' | 'analytics' | 'automation' | 'media';
  provider: string;
  url: string;
  description: string;
  tier: 'free' | 'freemium' | 'trial' | 'open_source' | 'educational' | 'developer';
  specifications: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
    gpu?: string;
    tpu?: string;
    cores?: number;
    threads?: number;
    clockSpeed?: string;
    memory?: string;
    diskSpace?: string;
    transferLimit?: string;
    speed?: string;
    uptime?: string;
    locations?: string[];
  };
  limits: {
    duration?: string; // days/months/unlimited
    requests?: number; // per hour/day/month
    bandwidth?: string;
    storage?: string;
    compute?: string;
    concurrentUsers?: number;
    projects?: number;
    apiCalls?: number;
    dataTransfer?: string;
  };
  features: {
    apiAccess: boolean;
    dashboard: boolean;
    cli: boolean;
    automation: boolean;
    scaling: boolean;
    monitoring: boolean;
    support: boolean;
    documentation: boolean;
    community: boolean;
    updates: boolean;
  };
  requirements: {
    registration: boolean;
    creditCard: boolean;
    phoneVerification: boolean;
    emailVerification: boolean;
    kyc: boolean;
    studentStatus: boolean;
    developerAccount: boolean;
    businessAccount: boolean;
    countryRestrictions: string[];
  };
  performance: {
    reliability: number; // 0-100
    speed: number; // 0-100
    support: number; // 0-100
    documentation: number; // 0-100
    community: number; // 0-100
  };
  integration: {
    status: 'available' | 'claimed' | 'configured' | 'active' | 'expired' | 'suspended';
    claimedAt?: string;
    expiresAt?: string;
    autoRenew: boolean;
    usage: {
      current?: number;
      limit?: number;
      percentage?: number;
      lastReset?: string;
    };
    credentials?: {
      apiKey?: string;
      username?: string;
      password?: string;
      endpoint?: string;
      config?: any;
    };
    notes?: string;
  };
  isActive: boolean;
  priority: number;
  discoveredAt: string;
  lastChecked: string;
}

interface ResourceProvider {
  id: string;
  name: string;
  type: 'cloud_provider' | 'ai_company' | 'api_service' | 'software_company' | 'hosting_company' | 'educational_platform';
  url: string;
  description: string;
  reputation: {
    rating: number; // 0-5
    reviews: number;
    trustScore: number; // 0-100
    yearsActive: number;
  };
  resources: string[]; // resource IDs
  specialOffers: Array<{
    title: string;
    description: string;
    discount: number;
    validUntil: string;
    requirements: string[];
  }>;
  partnerships: Array<{
    company: string;
    benefits: string[];
  }>;
}

interface ResourceConfig {
  scanningEnabled: boolean;
  scanningFrequency: number; // hours
  autoClaiming: boolean;
  autoRenewal: boolean;
  notifications: {
    newResources: boolean;
    expiringResources: boolean;
    usageAlerts: boolean;
    specialOffers: boolean;
    performanceIssues: boolean;
  };
  filters: {
    minReliability: number; // 0-100
    excludeCreditCard: boolean;
    excludeKYC: boolean;
    preferredCategories: FreeResource['category'][];
    maxDuration?: string;
    minFeatures?: number;
  };
  integration: {
    autoConfigure: boolean;
    testResources: boolean;
    monitorUsage: boolean;
    optimizeAllocation: boolean;
    backupCredentials: boolean;
  };
  security: {
    encryptCredentials: boolean;
    twoFactorAuth: boolean;
    auditLogging: boolean;
    accessControl: boolean;
    credentialRotation: boolean;
  };
}

const FreeResourcesManager: React.FC = () => {
  const [resources, setResources] = useState<FreeResource[]>([]);
  const [providers, setProviders] = useState<ResourceProvider[]>([]);
  const [config, setConfig] = useState<ResourceConfig>({
    scanningEnabled: true,
    scanningFrequency: 6,
    autoClaiming: true,
    autoRenewal: true,
    notifications: {
      newResources: true,
      expiringResources: true,
      usageAlerts: true,
      specialOffers: true,
      performanceIssues: true
    },
    filters: {
      minReliability: 80,
      excludeCreditCard: true,
      excludeKYC: false,
      preferredCategories: ['computing', 'ai_ml', 'storage', 'networking'],
      minFeatures: 5
    },
    integration: {
      autoConfigure: true,
      testResources: true,
      monitorUsage: true,
      optimizeAllocation: true,
      backupCredentials: true
    },
    security: {
      encryptCredentials: true,
      twoFactorAuth: true,
      auditLogging: true,
      accessControl: true,
      credentialRotation: true
    }
  });
  const [selectedResource, setSelectedResource] = useState<FreeResource | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ResourceProvider | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [stats, setStats] = useState({
    totalResources: 0,
    activeResources: 0,
    expiringResources: 0,
    totalValue: 0,
    savedCosts: 0,
    reliability: 0,
    bestProvider: '',
    categories: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock free resources initialization
  useEffect(() => {
    const mockResources: FreeResource[] = [
      // Cloud Computing Resources
      {
        id: 'resource-1',
        name: 'Google Colab Pro',
        type: 'gpu',
        category: 'ai_ml',
        provider: 'Google',
        url: 'https://colab.research.google.com',
        description: 'Free GPU/TPU access for machine learning and development',
        tier: 'free',
        specifications: {
          gpu: 'Tesla T4 / A100',
          tpu: 'v2-8/v3-8',
          ram: '12GB - 52GB',
          storage: '100GB',
          cores: 4,
          threads: 8,
          clockSpeed: '2.2GHz',
          memory: '12GB - 52GB',
          diskSpace: '100GB',
          locations: ['US', 'EU', 'Asia']
        },
        limits: {
          duration: '12 hours per session',
          bandwidth: 'Unlimited',
          compute: 'Limited',
          concurrentUsers: 1,
          projects: 5
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: true,
          monitoring: true,
          support: true,
          documentation: true,
          community: true,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: false,
          developerAccount: false,
          businessAccount: false,
          countryRestrictions: ['IR', 'CU', 'SD', 'SY']
        },
        performance: {
          reliability: 95.0,
          speed: 90.0,
          support: 85.0,
          documentation: 95.0,
          community: 90.0
        },
        integration: {
          status: 'active',
          claimedAt: '2024-01-15T00:00:00Z',
          expiresAt: '2024-12-31T23:59:59Z',
          autoRenew: true,
          usage: {
            current: 85,
            limit: 100,
            percentage: 85.0,
            lastReset: '2024-01-01T00:00:00Z'
          }
        },
        isActive: true,
        priority: 1,
        discoveredAt: '2024-01-01T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'resource-2',
        name: 'IBM Cloud Free Tier',
        type: 'vps',
        category: 'computing',
        provider: 'IBM',
        url: 'https://cloud.ibm.com',
        description: 'Free VPS with mainframe access and cloud resources',
        tier: 'free',
        specifications: {
          cpu: '2 vCPUs',
          ram: '4GB',
          storage: '100GB SSD',
          bandwidth: '100GB/month',
          cores: 2,
          threads: 4,
          clockSpeed: '2.8GHz',
          memory: '4GB',
          diskSpace: '100GB',
          transferLimit: '100GB/month',
          locations: ['US', 'EU', 'Asia', 'Australia']
        },
        limits: {
          duration: '30 days renewable',
          bandwidth: '100GB/month',
          storage: '100GB',
          compute: 'Limited',
          projects: 2
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: false,
          monitoring: true,
          support: true,
          documentation: true,
          community: true,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: false,
          developerAccount: false,
          businessAccount: false,
          countryRestrictions: []
        },
        performance: {
          reliability: 98.0,
          speed: 85.0,
          support: 90.0,
          documentation: 90.0,
          community: 85.0
        },
        integration: {
          status: 'configured',
          claimedAt: '2024-01-10T00:00:00Z',
          expiresAt: '2024-12-31T23:59:59Z',
          autoRenew: true,
          usage: {
            current: 45,
            limit: 100,
            percentage: 45.0,
            lastReset: '2024-01-01T00:00:00Z'
          }
        },
        isActive: true,
        priority: 2,
        discoveredAt: '2024-01-05T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'resource-3',
        name: 'Intel DevCloud',
        type: 'gpu',
        category: 'ai_ml',
        provider: 'Intel',
        url: 'https://devcloud.intel.com',
        description: 'Free access to Intel GPUs and development tools',
        tier: 'developer',
        specifications: {
          gpu: 'Intel Arc A770',
          ram: '16GB',
          storage: '50GB',
          cores: 8,
          threads: 16,
          clockSpeed: '2.1GHz',
          memory: '16GB',
          diskSpace: '50GB',
          locations: ['US', 'EU']
        },
        limits: {
          duration: '90 days',
          compute: 'Limited',
          projects: 5,
          concurrentUsers: 1
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: false,
          monitoring: true,
          support: true,
          documentation: true,
          community: true,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: false,
          developerAccount: true,
          businessAccount: false,
          countryRestrictions: ['RU', 'BY', 'UA']
        },
        performance: {
          reliability: 92.0,
          speed: 88.0,
          support: 80.0,
          documentation: 85.0,
          community: 75.0
        },
        integration: {
          status: 'available',
          autoRenew: true
        },
        isActive: true,
        priority: 3,
        discoveredAt: '2024-01-08T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'resource-4',
        name: 'NVIDIA GPU Cloud',
        type: 'gpu',
        category: 'ai_ml',
        provider: 'NVIDIA',
        url: 'https://www.nvidia.com/en-us/cloud-services',
        description: 'Free GPU access for AI development and research',
        tier: 'educational',
        specifications: {
          gpu: 'RTX A6000 / A40',
          ram: '48GB',
          storage: '200GB',
          cores: 16,
          threads: 32,
          clockSpeed: '2.4GHz',
          memory: '48GB',
          diskSpace: '200GB',
          locations: ['US', 'EU', 'Asia']
        },
        limits: {
          duration: '30 days',
          compute: 'Limited',
          projects: 3,
          concurrentUsers: 1
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: false,
          monitoring: true,
          support: true,
          documentation: true,
          community: true,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: true,
          developerAccount: true,
          businessAccount: false,
          countryRestrictions: ['IR', 'KP', 'CU']
        },
        performance: {
          reliability: 96.0,
          speed: 95.0,
          support: 85.0,
          documentation: 90.0,
          community: 80.0
        },
        integration: {
          status: 'available',
          autoRenew: true
        },
        isActive: true,
        priority: 4,
        discoveredAt: '2024-01-12T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      // AI Services
      {
        id: 'resource-5',
        name: 'OpenRouter AI',
        type: 'ai',
        category: 'ai_ml',
        provider: 'OpenRouter',
        url: 'https://openrouter.ai',
        description: 'Free AI model access with multiple LLM options',
        tier: 'freemium',
        specifications: {
          requests: '100 requests/day',
          models: 'GPT-3.5, Claude, Llama, Mistral',
          tokens: '100K tokens/day',
          speed: 'Real-time'
        },
        limits: {
          duration: 'Unlimited',
          requests: 100,
          apiCalls: 100,
          projects: 5
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: true,
          monitoring: true,
          support: true,
          documentation: true,
          community: true,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: false,
          developerAccount: true,
          businessAccount: false,
          countryRestrictions: []
        },
        performance: {
          reliability: 94.0,
          speed: 92.0,
          support: 88.0,
          documentation: 90.0,
          community: 85.0
        },
        integration: {
          status: 'active',
          claimedAt: '2024-01-20T00:00:00Z',
          autoRenew: true,
          usage: {
            current: 75,
            limit: 100,
            percentage: 75.0,
            lastReset: '2024-01-01T00:00:00Z'
          }
        },
        isActive: true,
        priority: 5,
        discoveredAt: '2024-01-18T00:00:00Z',
        lastChecked: new Date().toISOString()
      },
      // Storage Services
      {
        id: 'resource-6',
        name: 'TeraBox Free',
        type: 'storage',
        category: 'storage',
        provider: 'TeraBox',
        url: 'https://terabox.com',
        description: '1TB free cloud storage with file sharing capabilities',
        tier: 'free',
        specifications: {
          storage: '1TB',
          bandwidth: 'Unlimited',
          speed: 'High speed',
          locations: ['Global'],
          diskSpace: '1TB',
          transferLimit: 'Unlimited'
        },
        limits: {
          duration: 'Unlimited',
          storage: '1TB',
          bandwidth: 'Unlimited',
          dataTransfer: 'Unlimited'
        },
        features: {
          apiAccess: true,
          dashboard: true,
          cli: true,
          automation: true,
          scaling: false,
          monitoring: true,
          support: true,
          documentation: true,
          community: false,
          updates: true
        },
        requirements: {
          registration: true,
          creditCard: false,
          phoneVerification: false,
          emailVerification: true,
          kyc: false,
          studentStatus: false,
          developerAccount: false,
          businessAccount: false,
          countryRestrictions: []
        },
        performance: {
          reliability: 92.0,
          speed: 85.0,
          support: 80.0,
          documentation: 85.0,
          community: 70.0
        },
        integration: {
          status: 'configured',
          claimedAt: '2024-01-25T00:00:00Z',
          expiresAt: '2025-01-25T00:00:00Z',
          autoRenew: true,
          usage: {
            current: 350,
            limit: 1024,
            percentage: 34.2,
            lastReset: '2024-01-01T00:00:00Z'
          }
        },
        isActive: true,
        priority: 6,
        discoveredAt: '2024-01-22T00:00:00Z',
        lastChecked: new Date().toISOString()
      }
    ];

    setResources(mockResources);
  }, []);

  // Mock providers initialization
  useEffect(() => {
    const mockProviders: ResourceProvider[] = [
      {
        id: 'provider-1',
        name: 'Google',
        type: 'cloud_provider',
        url: 'https://cloud.google.com',
        description: 'Leading cloud provider with extensive free tier',
        reputation: {
          rating: 4.5,
          reviews: 125000,
          trustScore: 95.0,
          yearsActive: 15
        },
        resources: ['resource-1'],
        specialOffers: [
          {
            title: 'Extended GPU Access',
            description: 'Additional 6 hours of GPU time for developers',
            discount: 0,
            validUntil: '2024-12-31',
            requirements: ['Developer account', 'Active project']
          }
        ],
        partnerships: [
          {
            company: 'GitHub',
            benefits: ['Student pack', 'Free credits', 'Educational resources']
          }
        ]
      },
      {
        id: 'provider-2',
        name: 'IBM',
        type: 'cloud_provider',
        url: 'https://cloud.ibm.com',
        description: 'Enterprise cloud with mainframe access',
        reputation: {
          rating: 4.2,
          reviews: 85000,
          trustScore: 92.0,
          yearsActive: 20
        },
        resources: ['resource-2'],
        partnerships: [
          {
            company: 'Universities',
            benefits: ['Research grants', 'Free credits', 'Technical support']
          }
        ]
      }
    ];

    setProviders(mockProviders);
  }, []);

  // Auto scanning simulation
  useEffect(() => {
    if (!config.scanningEnabled || !isScanning) return;

    const interval = setInterval(() => {
      // Simulate discovering new resources
      if (Math.random() > 0.9) { // 10% chance per interval
        const types: FreeResource['type'][] = ['api', 'service', 'ai', 'vps', 'gpu', 'tpu', 'storage', 'domain', 'vpn', 'proxy'];
        const categories: FreeResource['category'][] = ['computing', 'ai_ml', 'storage', 'networking', 'communication', 'development'];
        const tiers: FreeResource['tier'][] = ['free', 'freemium', 'trial', 'open_source', 'educational'];
        const providers = ['AWS', 'Azure', 'DigitalOcean', 'Vultr', 'Linode', 'Hugging Face', 'Replicate', 'RunPod', 'Paperspace'];
        
        const newResource: FreeResource = {
          id: `resource-${Date.now()}`,
          name: `${providers[Math.floor(Math.random() * providers.length)]} Free ${types[Math.floor(Math.random() * types.length)]}`,
          type: types[Math.floor(Math.random() * types.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          provider: providers[Math.floor(Math.random() * providers.length)],
          url: `https://example.com/${Math.random().toString(36).substr(2, 8)}`,
          description: `Newly discovered ${types[Math.floor(Math.random() * types.length)]} resource with excellent features`,
          tier: tiers[Math.floor(Math.random() * tiers.length)],
          specifications: {
            cpu: `${Math.floor(Math.random() * 8) + 1} vCPUs`,
            ram: `${Math.floor(Math.random() * 16) + 1}GB`,
            storage: `${Math.floor(Math.random() * 500) + 10}GB`,
            bandwidth: `${Math.floor(Math.random() * 1000) + 100}GB/month`,
            cores: Math.floor(Math.random() * 8) + 1,
            threads: Math.floor(Math.random() * 16) + 2,
            clockSpeed: `${(Math.random() * 2 + 1).toFixed(1)}GHz`,
            memory: `${Math.floor(Math.random() * 16) + 1}GB`,
            diskSpace: `${Math.floor(Math.random() * 500) + 10}GB`,
            transferLimit: `${Math.floor(Math.random() * 1000) + 100}GB/month`,
            locations: ['US', 'EU', 'Asia']
          },
          limits: {
            duration: `${Math.floor(Math.random() * 30) + 1} days`,
            requests: Math.floor(Math.random() * 1000) + 100,
            bandwidth: `${Math.floor(Math.random() * 1000) + 100}GB/month`,
            storage: `${Math.floor(Math.random() * 100) + 10}GB`,
            compute: 'Limited',
            projects: Math.floor(Math.random() * 5) + 1
          },
          features: {
            apiAccess: Math.random() > 0.3,
            dashboard: Math.random() > 0.2,
            cli: Math.random() > 0.4,
            automation: Math.random() > 0.5,
            scaling: Math.random() > 0.6,
            monitoring: Math.random() > 0.3,
            support: Math.random() > 0.2,
            documentation: Math.random() > 0.1,
            community: Math.random() > 0.4,
            updates: Math.random() > 0.3
          },
          requirements: {
            registration: true,
            creditCard: Math.random() > 0.7,
            phoneVerification: Math.random() > 0.6,
            emailVerification: true,
            kyc: Math.random() > 0.8,
            studentStatus: Math.random() > 0.7,
            developerAccount: Math.random() > 0.6,
            businessAccount: Math.random() > 0.8,
            countryRestrictions: []
          },
          performance: {
            reliability: Math.random() * 20 + 80,
            speed: Math.random() * 20 + 80,
            support: Math.random() * 20 + 80,
            documentation: Math.random() * 20 + 80,
            community: Math.random() * 20 + 80
          },
          integration: {
            status: 'available',
            autoRenew: true
          },
          isActive: true,
          priority: Math.floor(Math.random() * 10) + 1,
          discoveredAt: new Date().toISOString(),
          lastChecked: new Date().toISOString()
        };

        setResources(prev => [...prev, newResource]);

        // Auto-claim if enabled
        if (config.autoClaiming && newResource.performance.reliability >= config.filters.minReliability) {
          setTimeout(() => {
            claimResource(newResource.id);
          }, Math.random() * 10000 + 5000); // 5-15 seconds delay
        }
      }
    }, config.scanningFrequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.scanningEnabled, config.scanningFrequency, config.autoClaiming, config.filters.minReliability, isScanning]);

  // Update stats
  useEffect(() => {
    const activeResources = resources.filter(r => r.integration.status === 'active').length;
    const expiringResources = resources.filter(r => {
      if (!r.integration.expiresAt) return false;
      const expiryDate = new Date(r.integration.expiresAt);
      const today = new Date();
      const daysUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilExpiry <= 7; // Expiring within 7 days
    }).length;
    const totalValue = resources.reduce((sum, r) => {
      // Estimate value based on market rates
      const value = r.type === 'gpu' ? 100 : 
                   r.type === 'vps' ? 50 : 
                   r.type === 'ai' ? 80 : 
                   r.type === 'storage' ? 20 : 10;
      return sum + (r.integration.status === 'active' ? value : 0);
    }, 0);
    const savedCosts = totalValue * 0.8; // Assume 80% savings compared to paid
    const reliability = resources.length > 0 
      ? resources.reduce((sum, r) => sum + r.performance.reliability, 0) / resources.length 
      : 0;
    
    const providerCounts = resources.reduce((acc, resource) => {
      acc[resource.provider] = (acc[resource.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestProvider = Object.entries(providerCounts).reduce((best, [provider, count]) => 
      count > (best?.count || 0) ? { provider, count } : best, null as { provider: string; count: number } | null);
    const categories = new Set(resources.map(r => r.category)).size;

    setStats({
      totalResources: resources.length,
      activeResources,
      expiringResources,
      totalValue,
      savedCosts,
      reliability,
      bestProvider: bestProvider?.provider || '',
      categories
    });
  }, [resources]);

  const claimResource = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? {
            ...resource,
            integration: {
              ...resource.integration,
              status: 'claimed',
              claimedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          }
        : resource
    ));

    // Simulate configuration
    setTimeout(() => {
      setResources(prev => prev.map(resource => 
        resource.id === resourceId 
          ? {
              ...resource,
              integration: {
                ...resource.integration,
                status: 'configured',
                usage: {
                  current: 0,
                  limit: 100,
                  percentage: 0,
                  lastReset: new Date().toISOString()
                }
              }
            }
          : resource
      ));
    }, 5000);
  };

  const activateResource = (resourceId: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? {
            ...resource,
            integration: {
              ...resource.integration,
              status: 'active',
              usage: {
                current: Math.floor(Math.random() * 50),
                limit: 100,
                percentage: Math.random() * 50,
                lastReset: new Date().toISOString()
              }
            }
          }
        : resource
    ));
  };

  const getResourceTypeColor = (type: FreeResource['type']) => {
    switch (type) {
      case 'api': return 'bg-blue-600';
      case 'service': return 'bg-green-600';
      case 'ai': return 'bg-purple-600';
      case 'vps': return 'bg-orange-600';
      case 'gpu': return 'bg-red-600';
      case 'tpu': return 'bg-pink-600';
      case 'storage': return 'bg-cyan-600';
      case 'domain': return 'bg-yellow-600';
      case 'vpn': return 'bg-indigo-600';
      case 'proxy': return 'bg-gray-600';
      case 'email': return 'bg-teal-600';
      case 'phone': return 'bg-lime-600';
      case 'credit': return 'bg-amber-600';
      case 'software': return 'bg-emerald-600';
      case 'tool': return 'bg-rose-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: FreeResource['integration']['status']) => {
    switch (status) {
      case 'available': return 'bg-blue-600';
      case 'claimed': return 'bg-yellow-600';
      case 'configured': return 'bg-purple-600';
      case 'active': return 'bg-green-600';
      case 'expired': return 'bg-red-600';
      case 'suspended': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTierColor = (tier: FreeResource['tier']) => {
    switch (tier) {
      case 'free': return 'bg-green-600';
      case 'freemium': return 'bg-blue-600';
      case 'trial': return 'bg-yellow-600';
      case 'open_source': return 'bg-purple-600';
      case 'educational': return 'bg-orange-600';
      case 'developer': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredResources = () => {
    return resources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || resource.type === filterType;
      const matchesStatus = filterStatus === 'all' || resource.integration.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Cloud className="w-8 h-8 text-purple-400" />
            Free Resources Manager
          </h1>
          <p className="text-gray-400">
            Comprehensive free resources manager for APIs, services, AI, VPS, GPU/TPU accounts and cloud resources
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Resources</div>
                <div className="text-2xl font-bold">{stats.totalResources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeResources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Value</div>
                <div className="text-2xl font-bold">${stats.totalValue}/mo</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Saved Costs</div>
                <div className="text-2xl font-bold">${stats.savedCosts}/mo</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Reliability</div>
                <div className="text-2xl font-bold">{stats.reliability.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Resource Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsScanning(!isScanning)}
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
                    <Search className="w-5 h-5" />
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
              Best Provider: {stats.bestProvider || 'None'} | 
              Categories: {stats.categories} | 
              Scanning: {config.scanningEnabled ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Free Resources</h3>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Types</option>
              <option value="api">API</option>
              <option value="ai">AI</option>
              <option value="vps">VPS</option>
              <option value="gpu">GPU</option>
              <option value="storage">Storage</option>
              <option value="vpn">VPN</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Categories</option>
              <option value="computing">Computing</option>
              <option value="ai_ml">AI/ML</option>
              <option value="storage">Storage</option>
              <option value="networking">Networking</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="claimed">Claimed</option>
              <option value="configured">Configured</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredResources().map((resource) => (
              <div
                key={resource.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedResource?.id === resource.id ? 'border-purple-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${resource.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <div>
                      <h4 className="font-semibold">{resource.name}</h4>
                      <div className="text-sm text-gray-400">{resource.provider}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getResourceTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getTierColor(resource.tier)}`}>
                      {resource.tier}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-3">
                  {resource.description}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">CPU:</span> {resource.specifications.cpu || 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">RAM:</span> {resource.specifications.ram || 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">Storage:</span> {resource.specifications.storage || 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-400">GPU:</span> {resource.specifications.gpu || 'N/A'}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(resource.integration.status)}`}>
                      {resource.integration.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {resource.performance.reliability.toFixed(1)}% reliable
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {resource.integration.usage && (
                      <span>{resource.integration.usage.percentage.toFixed(1)}% used</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {resource.features.apiAccess && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">API</span>
                    )}
                    {resource.features.dashboard && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">Dashboard</span>
                    )}
                    {resource.features.automation && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">Automation</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {resource.integration.status === 'available' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          claimResource(resource.id);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                      >
                        Claim
                      </button>
                    )}
                    {resource.integration.status === 'configured' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          activateResource(resource.id);
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {getFilteredResources().length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No resources found
            </div>
          )}
        </div>

        {/* Selected Resource Details */}
        {selectedResource && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Resource Details: {selectedResource.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU:</span>
                    <span className="font-medium">{selectedResource.specifications.cpu || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span className="font-medium">{selectedResource.specifications.ram || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage:</span>
                    <span className="font-medium">{selectedResource.specifications.storage || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">GPU:</span>
                    <span className="font-medium">{selectedResource.specifications.gpu || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bandwidth:</span>
                    <span className="font-medium">{selectedResource.specifications.bandwidth || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Limits & Features</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium">{selectedResource.limits.duration || 'Unlimited'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">API Access:</span>
                    <span className="font-medium">{selectedResource.features.apiAccess ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Automation:</span>
                    <span className="font-medium">{selectedResource.features.automation ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monitoring:</span>
                    <span className="font-medium">{selectedResource.features.monitoring ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reliability:</span>
                    <span className="font-medium">{selectedResource.performance.reliability.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speed:</span>
                    <span className="font-medium">{selectedResource.performance.speed.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Support:</span>
                    <span className="font-medium">{selectedResource.performance.support.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Documentation:</span>
                    <span className="font-medium">{selectedResource.performance.documentation.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Integration Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedResource.integration.status)}`}>
                      {selectedResource.integration.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Claimed At:</span>
                    <span className="font-medium">
                      {selectedResource.integration.claimedAt ? new Date(selectedResource.integration.claimedAt).toLocaleDateString() : 'Not claimed'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires At:</span>
                    <span className="font-medium">
                      {selectedResource.integration.expiresAt ? new Date(selectedResource.integration.expiresAt).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  {selectedResource.integration.usage && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Usage:</span>
                      <span className="font-medium">{selectedResource.integration.usage.percentage.toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Resources Manager Settings</h2>
              
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
                    <label className="block text-sm font-medium mb-2">Min Reliability (%)</label>
                    <input
                      type="number"
                      value={config.filters.minReliability}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        filters: { ...prev.filters, minReliability: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="100"
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
                        checked={config.autoClaiming}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoClaiming: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Claiming</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoRenewal}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoRenewal: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Renewal</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.filters.excludeCreditCard}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          filters: { ...prev.filters, excludeCreditCard: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Exclude Credit Card</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Integration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.integration.autoConfigure}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          integration: { ...prev.integration, autoConfigure: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Configure</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.integration.testResources}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          integration: { ...prev.integration, testResources: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Test Resources</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.integration.monitorUsage}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          integration: { ...prev.integration, monitorUsage: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Monitor Usage</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.integration.optimizeAllocation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          integration: { ...prev.integration, optimizeAllocation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Optimize Allocation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryptCredentials}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, encryptCredentials: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encrypt Credentials</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.twoFactorAuth}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, twoFactorAuth: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Two-Factor Auth</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.auditLogging}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, auditLogging: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Audit Logging</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.credentialRotation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, credentialRotation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Credential Rotation</span>
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

export default FreeResourcesManager;
