/**
 * Global Resource Scanner Component
 *
 * Global scanner for free resources from IBM mainframes, Google Colab, Intel, NVIDIA and all available sources
 * Continuously scans the internet for new free resources and opportunities
 */

import {
  Activity,
  Brain,
  CheckCircle,
  Database,
  Globe,
  Radar,
  Search,
  Settings,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ResourceSource {
  id: string;
  name: string;
  category:
    | 'cloud'
    | 'ai_ml'
    | 'mainframe'
    | 'gpu'
    | 'storage'
    | 'network'
    | 'education'
    | 'developer'
    | 'research'
    | 'startup';
  type:
    | 'api'
    | 'service'
    | 'computing'
    | 'storage'
    | 'network'
    | 'software'
    | 'credit'
    | 'trial'
    | 'educational';
  provider: string;
  url: string;
  description: string;
  region: string;
  availability: {
    global: boolean;
    countries: string[];
    restrictions: string[];
    verification: boolean;
    queue: boolean;
  };
  specifications: {
    resource: string;
    quantity: string;
    duration: string;
    value: number; // estimated USD value
    features: string[];
    limitations: string[];
  };
  requirements: {
    registration: boolean;
    email: boolean;
    phone: boolean;
    creditCard: boolean;
    student: boolean;
    developer: boolean;
    business: boolean;
    research: boolean;
    kyc: boolean;
    documentation: string[];
  };
  discovery: {
    method:
      | 'web_scraping'
      | 'api_scan'
      | 'social_monitoring'
      | 'forum_analysis'
      | 'competitor_analysis'
      | 'partner_intelligence';
    source: string;
    confidence: number; // 0-100
    discoveredAt: string;
    verifiedAt?: string;
    lastChecked: string;
  };
  status: 'discovered' | 'verified' | 'available' | 'claimed' | 'expired' | 'invalid';
  priority: number;
  tags: string[];
  metadata: {
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    timeToClaim: number; // minutes
    successRate: number; // 0-100
    competition: 'low' | 'medium' | 'high' | 'extreme';
    renewal: boolean;
    scalability: boolean;
  };
}

interface ScanRule {
  id: string;
  name: string;
  type: 'keyword' | 'pattern' | 'api' | 'social' | 'forum' | 'competitor' | 'partner';
  description: string;
  configuration: {
    keywords: string[];
    patterns: string[];
    sources: string[];
    frequency: number; // hours
    depth: number; // search depth
    filters: string[];
  };
  performance: {
    successRate: number;
    lastRun: string;
    discoveries: number;
    falsePositives: number;
  };
  isActive: boolean;
  priority: number;
}

interface ScanConfig {
  scanningEnabled: boolean;
  scanFrequency: number; // hours
  scanDepth: number; // 1-10
  maxConcurrentScans: number;
  regions: string[];
  categories: ResourceSource['category'][];
  autoVerification: boolean;
  autoClaiming: boolean;
  intelligence: {
    machineLearning: boolean;
    patternRecognition: boolean;
    competitorAnalysis: boolean;
    socialMonitoring: boolean;
    partnerIntelligence: boolean;
  };
  filters: {
    minConfidence: number; // 0-100
    minValue: number; // USD
    excludeCreditCard: boolean;
    excludeKYC: boolean;
    preferredRegions: string[];
    blacklist: string[];
  };
  notifications: {
    newResources: boolean;
    verifiedResources: boolean;
    claimedResources: boolean;
    expiredResources: boolean;
    scanComplete: boolean;
    errors: boolean;
  };
  security: {
    proxyRotation: boolean;
    userAgents: boolean;
    rateLimiting: boolean;
    stealthMode: boolean;
    encryption: boolean;
  };
}

const GlobalResourceScanner: React.FC = () => {
  const [sources, setSources] = useState<ResourceSource[]>([]);
  const [rules, setRules] = useState<ScanRule[]>([]);
  const [config, setConfig] = useState<ScanConfig>({
    scanningEnabled: true,
    scanFrequency: 4,
    scanDepth: 7,
    maxConcurrentScans: 10,
    regions: ['US', 'EU', 'Asia', 'Global'],
    categories: ['cloud', 'ai_ml', 'gpu', 'education', 'developer'],
    autoVerification: true,
    autoClaiming: true,
    intelligence: {
      machineLearning: true,
      patternRecognition: true,
      competitorAnalysis: true,
      socialMonitoring: true,
      partnerIntelligence: true,
    },
    filters: {
      minConfidence: 75,
      minValue: 10.0,
      excludeCreditCard: true,
      excludeKYC: false,
      preferredRegions: ['US', 'EU', 'Asia'],
      blacklist: ['spam', 'scam', 'fake'],
    },
    notifications: {
      newResources: true,
      verifiedResources: true,
      claimedResources: true,
      expiredResources: true,
      scanComplete: true,
      errors: true,
    },
    security: {
      proxyRotation: true,
      userAgents: true,
      rateLimiting: true,
      stealthMode: true,
      encryption: true,
    },
  });
  const [selectedSource, setSelectedSource] = useState<ResourceSource | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [stats, setStats] = useState({
    totalSources: 0,
    verifiedSources: 0,
    claimedSources: 0,
    totalValue: 0,
    averageConfidence: 0,
    bestCategory: '',
    regions: 0,
    activeRules: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock resource sources initialization
  useEffect(() => {
    const mockSources: ResourceSource[] = [
      {
        id: 'source-1',
        name: 'Google Colab Pro GPU',
        category: 'ai_ml',
        type: 'computing',
        provider: 'Google',
        url: 'https://colab.research.google.com/signup',
        description: 'Free GPU and TPU access for machine learning research and development',
        region: 'Global',
        availability: {
          global: true,
          countries: ['US', 'UK', 'CA', 'AU', 'EU', 'Asia'],
          restrictions: ['12 hours max session', 'no background processing'],
          verification: true,
          queue: false,
        },
        specifications: {
          resource: 'Tesla T4 / A100 GPU',
          quantity: '12 hours per session',
          duration: 'Unlimited',
          value: 150.0,
          features: ['GPU access', 'TPU access', 'Pre-installed libraries', 'Colab Pro features'],
          limitations: ['Session timeout', 'No persistent storage', 'Rate limits'],
        },
        requirements: {
          registration: true,
          email: true,
          phone: false,
          creditCard: false,
          student: false,
          developer: true,
          business: false,
          research: false,
          kyc: false,
          documentation: ['Google Account'],
        },
        discovery: {
          method: 'web_scraping',
          source: 'Google Colab Website',
          confidence: 95.0,
          discoveredAt: '2024-01-15T00:00:00Z',
          verifiedAt: '2024-01-15T01:00:00Z',
          lastChecked: new Date().toISOString(),
        },
        status: 'verified',
        priority: 1,
        tags: ['gpu', 'ai', 'machine_learning', 'google', 'free', 'research'],
        metadata: {
          difficulty: 'easy',
          timeToClaim: 5,
          successRate: 95.0,
          competition: 'medium',
          renewal: true,
          scalability: true,
        },
      },
      {
        id: 'source-2',
        name: 'IBM Cloud Free Tier Mainframe',
        category: 'mainframe',
        type: 'computing',
        provider: 'IBM',
        url: 'https://cloud.ibm.com/register',
        description: 'Free access to IBM mainframe systems for educational and research purposes',
        region: 'Global',
        availability: {
          global: true,
          countries: ['US', 'EU', 'Canada', 'Australia'],
          restrictions: ['Educational use only', '30 days trial'],
          verification: true,
          queue: false,
        },
        specifications: {
          resource: 'IBM z16 Mainframe',
          quantity: '1 partition',
          duration: '30 days',
          value: 500.0,
          features: ['Mainframe access', 'z/OS', 'COBOL', 'JCL', 'DB2'],
          limitations: ['Educational use only', 'Time limited', 'Resource quotas'],
        },
        requirements: {
          registration: true,
          email: true,
          phone: true,
          creditCard: false,
          student: true,
          developer: false,
          business: false,
          research: true,
          kyc: false,
          documentation: ['Student ID', 'Educational institution'],
        },
        discovery: {
          method: 'partner_intelligence',
          source: 'IBM Academic Initiative',
          confidence: 92.0,
          discoveredAt: '2024-01-10T00:00:00Z',
          verifiedAt: '2024-01-10T02:00:00Z',
          lastChecked: new Date().toISOString(),
        },
        status: 'verified',
        priority: 2,
        tags: ['mainframe', 'ibm', 'enterprise', 'educational', 'z_os', 'cobol'],
        metadata: {
          difficulty: 'medium',
          timeToClaim: 15,
          successRate: 85.0,
          competition: 'low',
          renewal: false,
          scalability: false,
        },
      },
      {
        id: 'source-3',
        name: 'Intel DevCloud GPU Access',
        category: 'gpu',
        type: 'computing',
        provider: 'Intel',
        url: 'https://devcloud.intel.com/oneapi',
        description: 'Free access to Intel Arc GPUs and development tools for AI/ML workloads',
        region: 'Global',
        availability: {
          global: true,
          countries: ['US', 'EU', 'Asia', 'Canada'],
          restrictions: ['90 days max', 'Developer account required'],
          verification: true,
          queue: false,
        },
        specifications: {
          resource: 'Intel Arc A770 GPU',
          quantity: 'Unlimited jobs',
          duration: '90 days',
          value: 200.0,
          features: [
            'Arc GPU access',
            'OneAPI tools',
            'Development environment',
            'Technical support',
          ],
          limitations: ['Developer use only', 'Time limited', 'Resource quotas'],
        },
        requirements: {
          registration: true,
          email: true,
          phone: false,
          creditCard: false,
          student: false,
          developer: true,
          business: false,
          research: false,
          kyc: false,
          documentation: ['Developer account'],
        },
        discovery: {
          method: 'api_scan',
          source: 'Intel Developer Portal',
          confidence: 88.0,
          discoveredAt: '2024-01-08T00:00:00Z',
          verifiedAt: '2024-01-08T01:30:00Z',
          lastChecked: new Date().toISOString(),
        },
        status: 'verified',
        priority: 3,
        tags: ['gpu', 'intel', 'arc', 'development', 'oneapi', 'ai'],
        metadata: {
          difficulty: 'medium',
          timeToClaim: 10,
          successRate: 90.0,
          competition: 'medium',
          renewal: false,
          scalability: true,
        },
      },
      {
        id: 'source-4',
        name: 'NVIDIA GPU Cloud Research',
        category: 'ai_ml',
        type: 'computing',
        provider: 'NVIDIA',
        url: 'https://www.nvidia.com/en-us/research/programs',
        description: 'Free GPU access for academic research and AI development projects',
        region: 'Global',
        availability: {
          global: true,
          countries: ['US', 'EU', 'Canada', 'Asia'],
          restrictions: ['Research proposal required', 'Academic institution'],
          verification: true,
          queue: true,
        },
        specifications: {
          resource: 'RTX A6000 / A40',
          quantity: 'Variable allocation',
          duration: '6 months',
          value: 1000.0,
          features: ['High-end GPUs', 'CUDA access', 'Technical support', 'Research collaboration'],
          limitations: ['Research only', 'Proposal required', 'Limited availability'],
        },
        requirements: {
          registration: true,
          email: true,
          phone: true,
          creditCard: false,
          student: true,
          developer: false,
          business: false,
          research: true,
          kyc: true,
          documentation: ['Research proposal', 'Academic affiliation', 'CV'],
        },
        discovery: {
          method: 'forum_analysis',
          source: 'NVIDIA Research Forums',
          confidence: 85.0,
          discoveredAt: '2024-01-12T00:00:00Z',
          verifiedAt: '2024-01-12T03:00:00Z',
          lastChecked: new Date().toISOString(),
        },
        status: 'verified',
        priority: 4,
        tags: ['gpu', 'nvidia', 'rtx', 'research', 'academic', 'cuda'],
        metadata: {
          difficulty: 'hard',
          timeToClaim: 30,
          successRate: 60.0,
          competition: 'high',
          renewal: false,
          scalability: false,
        },
      },
      {
        id: 'source-5',
        name: 'AWS Free Tier Extended',
        category: 'cloud',
        type: 'computing',
        provider: 'Amazon',
        url: 'https://aws.amazon.com/free/',
        description: 'Extended AWS free tier with additional services and longer duration',
        region: 'Global',
        availability: {
          global: true,
          countries: ['US', 'EU', 'Asia', 'Canada', 'Australia'],
          restrictions: ['New accounts only', '12 months'],
          verification: true,
          queue: false,
        },
        specifications: {
          resource: 'EC2 t2.micro, S3, Lambda',
          quantity: '750 hours/month',
          duration: '12 months',
          value: 300.0,
          features: ['EC2 instances', 'S3 storage', 'Lambda functions', 'DynamoDB'],
          limitations: ['New customers only', 'Usage limits', 'Service restrictions'],
        },
        requirements: {
          registration: true,
          email: true,
          phone: true,
          creditCard: true,
          student: false,
          developer: false,
          business: false,
          research: false,
          kyc: false,
          documentation: ['Phone verification', 'Credit card'],
        },
        discovery: {
          method: 'competitor_analysis',
          source: 'AWS Documentation',
          confidence: 98.0,
          discoveredAt: '2024-01-01T00:00:00Z',
          verifiedAt: '2024-01-01T00:30:00Z',
          lastChecked: new Date().toISOString(),
        },
        status: 'verified',
        priority: 5,
        tags: ['aws', 'cloud', 'ec2', 's3', 'lambda', 'free_tier'],
        metadata: {
          difficulty: 'easy',
          timeToClaim: 20,
          successRate: 98.0,
          competition: 'high',
          renewal: false,
          scalability: true,
        },
      },
    ];

    setSources(mockSources);
  }, []);

  // Mock scan rules initialization
  useEffect(() => {
    const mockRules: ScanRule[] = [
      {
        id: 'rule-1',
        name: 'AI/ML GPU Scanner',
        type: 'keyword',
        description: 'Scans for free GPU and AI/ML resources from major providers',
        configuration: {
          keywords: [
            'free gpu',
            'ai research',
            'machine learning credits',
            'colab pro',
            'gpu access',
          ],
          patterns: ['free.*gpu', 'research.*grant', 'academic.*ai', 'developer.*gpu'],
          sources: ['google.com', 'nvidia.com', 'intel.com', 'amd.com', 'openai.com'],
          frequency: 4,
          depth: 8,
          filters: ['spam', 'scam', 'advertisement'],
        },
        performance: {
          successRate: 85.0,
          lastRun: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          discoveries: 12,
          falsePositives: 2,
        },
        isActive: true,
        priority: 1,
      },
      {
        id: 'rule-2',
        name: 'Cloud Provider Monitor',
        type: 'api',
        description: 'Monitors cloud provider APIs for new free tier offerings',
        configuration: {
          keywords: ['free tier', 'extended trial', 'developer credits', 'startup program'],
          patterns: ['free.*tier', 'developer.*program', 'startup.*credits'],
          sources: [
            'aws.amazon.com',
            'cloud.google.com',
            'azure.microsoft.com',
            'digitalocean.com',
          ],
          frequency: 6,
          depth: 5,
          filters: ['expired', 'deprecated'],
        },
        performance: {
          successRate: 92.0,
          lastRun: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
          discoveries: 8,
          falsePositives: 1,
        },
        isActive: true,
        priority: 2,
      },
      {
        id: 'rule-3',
        name: 'Educational Resource Scanner',
        type: 'forum',
        description: 'Scans educational forums and communities for free academic resources',
        configuration: {
          keywords: [
            'student free',
            'academic research',
            'university credits',
            'educational grant',
          ],
          patterns: ['student.*free', 'academic.*access', 'research.*credits'],
          sources: ['reddit.com', 'stackoverflow.com', 'github.com', 'academic.oup.com'],
          frequency: 8,
          depth: 6,
          filters: ['expired', 'regional_restriction'],
        },
        performance: {
          successRate: 78.0,
          lastRun: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
          discoveries: 15,
          falsePositives: 3,
        },
        isActive: true,
        priority: 3,
      },
    ];

    setRules(mockRules);
  }, []);

  // Auto scanning simulation
  useEffect(() => {
    if (!config.scanningEnabled || !isScanning) return;

    const interval = setInterval(
      () => {
        // Simulate discovering new resources
        rules.forEach(rule => {
          if (!rule.isActive) return;

          if (Math.random() > 0.8) {
            // 20% chance per rule
            const providers = [
              'Microsoft',
              'Oracle',
              'Alibaba',
              'Hetzner',
              'Vultr',
              'Linode',
              'Scaleway',
              'OVH',
            ];
            const categories: ResourceSource['category'][] = [
              'cloud',
              'ai_ml',
              'gpu',
              'storage',
              'network',
            ];
            const types: ResourceSource['type'][] = [
              'computing',
              'storage',
              'api',
              'service',
              'trial',
            ];
            const regions = ['US', 'EU', 'Asia', 'Canada', 'Australia', 'South America'];

            const newSource: ResourceSource = {
              id: `source-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
              name: `${providers[Math.floor(Math.random() * providers.length)]} Free ${categories[Math.floor(Math.random() * categories.length)]}`,
              category: categories[Math.floor(Math.random() * categories.length)],
              type: types[Math.floor(Math.random() * types.length)],
              provider: providers[Math.floor(Math.random() * providers.length)],
              url: `https://example.com/${Math.random().toString(36).substr(2, 8)}`,
              description: `Newly discovered free ${categories[Math.floor(Math.random() * categories.length)]} resource with excellent features`,
              region: regions[Math.floor(Math.random() * regions.length)],
              availability: {
                global: Math.random() > 0.3,
                countries: regions.slice(0, Math.floor(Math.random() * 3) + 1),
                restrictions: Math.random() > 0.5 ? ['Time limited'] : [],
                verification: Math.random() > 0.2,
                queue: Math.random() > 0.7,
              },
              specifications: {
                resource: `${categories[Math.floor(Math.random() * categories.length)]} access`,
                quantity: `${Math.floor(Math.random() * 100) + 10} units`,
                duration: `${Math.floor(Math.random() * 90) + 1} days`,
                value: Math.random() * 500 + 50,
                features: ['API access', 'Documentation', 'Support', 'Scalability'],
                limitations: ['Usage limits', 'Regional restrictions'],
              },
              requirements: {
                registration: true,
                email: true,
                phone: Math.random() > 0.5,
                creditCard: Math.random() > 0.6,
                student: Math.random() > 0.7,
                developer: Math.random() > 0.5,
                business: Math.random() > 0.8,
                research: Math.random() > 0.7,
                kyc: Math.random() > 0.9,
                documentation: ['Email verification'],
              },
              discovery: {
                method: rule.type,
                source:
                  rule.configuration.sources[
                    Math.floor(Math.random() * rule.configuration.sources.length)
                  ],
                confidence: Math.random() * 30 + 70,
                discoveredAt: new Date().toISOString(),
                lastChecked: new Date().toISOString(),
              },
              status: 'discovered',
              priority: Math.floor(Math.random() * 10) + 1,
              tags: ['auto_discovered', 'new', 'free', 'scanned'],
              metadata: {
                difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
                timeToClaim: Math.floor(Math.random() * 30) + 5,
                successRate: Math.random() * 40 + 60,
                competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
                renewal: Math.random() > 0.5,
                scalability: Math.random() > 0.4,
              },
            };

            setSources(prev => [...prev, newSource]);

            // Auto-verify if enabled
            if (
              config.autoVerification &&
              newSource.discovery.confidence >= config.filters.minConfidence
            ) {
              setTimeout(
                () => {
                  // Will be handled by verifySource function defined below
                },
                Math.random() * 10000 + 5000
              );
            }

            // Update rule performance
            setRules(prev =>
              prev.map(r =>
                r.id === rule.id
                  ? {
                      ...r,
                      performance: {
                        ...r.performance,
                        lastRun: new Date().toISOString(),
                        discoveries: r.performance.discoveries + 1,
                      },
                    }
                  : r
              )
            );
          }
        });
      },
      config.scanFrequency * 60 * 60 * 1000
    ); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [
    config.scanningEnabled,
    config.scanFrequency,
    config.autoVerification,
    config.filters.minConfidence,
    rules,
    isScanning,
  ]);

  // Auto verification simulation
  const verifySource = (sourceId: string) => {
    setSources(prev =>
      prev.map(source =>
        source.id === sourceId
          ? {
              ...source,
              status: 'verified',
              discovery: {
                ...source.discovery,
                verifiedAt: new Date().toISOString(),
              },
            }
          : source
      )
    );

    // Auto-claim if enabled and meets criteria
    const source = sources.find(s => s.id === sourceId);
    if (source && config.autoClaiming && source.specifications.value >= config.filters.minValue) {
      setTimeout(
        () => {
          claimSource(sourceId);
        },
        Math.random() * 5000 + 2000
      );
    }
  };

  const claimSource = (sourceId: string) => {
    setSources(prev =>
      prev.map(source =>
        source.id === sourceId
          ? {
              ...source,
              status: 'claimed',
            }
          : source
      )
    );
  };

  // Update stats
  useEffect(() => {
    const verifiedSources = sources.filter(s => s.status === 'verified').length;
    const claimedSources = sources.filter(s => s.status === 'claimed').length;
    const totalValue = sources.reduce((sum, s) => sum + s.specifications.value, 0);
    const averageConfidence =
      sources.length > 0
        ? sources.reduce((sum, s) => sum + s.discovery.confidence, 0) / sources.length
        : 0;

    const categoryCounts = sources.reduce(
      (acc, source) => {
        acc[source.category] = (acc[source.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const bestCategory = Object.entries(categoryCounts).reduce(
      (best, [category, count]) => (count > (best?.count || 0) ? { category, count } : best),
      null as { category: string; count: number } | null
    );
    const regions = new Set(sources.map(s => s.region)).size;
    const activeRules = rules.filter(r => r.isActive).length;

    setStats({
      totalSources: sources.length,
      verifiedSources,
      claimedSources,
      totalValue,
      averageConfidence,
      bestCategory: bestCategory?.category || '',
      regions,
      activeRules,
    });
  }, [sources, rules]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const getCategoryColor = (category: ResourceSource['category']) => {
    switch (category) {
      case 'cloud':
        return 'bg-blue-600';
      case 'ai_ml':
        return 'bg-purple-600';
      case 'mainframe':
        return 'bg-orange-600';
      case 'gpu':
        return 'bg-green-600';
      case 'storage':
        return 'bg-cyan-600';
      case 'network':
        return 'bg-indigo-600';
      case 'education':
        return 'bg-yellow-600';
      case 'developer':
        return 'bg-pink-600';
      case 'research':
        return 'bg-red-600';
      case 'startup':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: ResourceSource['status']) => {
    switch (status) {
      case 'discovered':
        return 'bg-blue-600';
      case 'verified':
        return 'bg-green-600';
      case 'available':
        return 'bg-cyan-600';
      case 'claimed':
        return 'bg-purple-600';
      case 'expired':
        return 'bg-red-600';
      case 'invalid':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: ResourceSource['metadata']['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-600';
      case 'medium':
        return 'bg-yellow-600';
      case 'hard':
        return 'bg-orange-600';
      case 'expert':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getFilteredSources = () => {
    return sources.filter(source => {
      const matchesSearch =
        source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || source.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || source.status === filterStatus;
      const matchesRegion = filterRegion === 'all' || source.region === filterRegion;
      return matchesSearch && matchesCategory && matchesStatus && matchesRegion;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-purple-400" />
            Global Resource Scanner
          </h1>
          <p className="text-gray-400">
            Global scanner for free resources from IBM mainframes, Google Colab, Intel, NVIDIA and
            all available sources
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
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
                <div className="text-sm text-gray-400">Verified</div>
                <div className="text-2xl font-bold">{stats.verifiedSources}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Value</div>
                <div className="text-2xl font-bold">${stats.totalValue.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Confidence</div>
                <div className="text-2xl font-bold">{stats.averageConfidence.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Active Rules</div>
                <div className="text-2xl font-bold">{stats.activeRules}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Scanning Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleScanning}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isScanning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Scanning
                  </>
                ) : (
                  <>
                    <Radar className="w-5 h-5" />
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
              Best Category: {stats.bestCategory || 'None'} | Regions: {stats.regions} | Scanning:{' '}
              {config.scanningEnabled ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Resource Sources */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Discovered Resources</h3>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Categories</option>
              <option value="cloud">Cloud</option>
              <option value="ai_ml">AI/ML</option>
              <option value="gpu">GPU</option>
              <option value="mainframe">Mainframe</option>
              <option value="education">Education</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="discovered">Discovered</option>
              <option value="verified">Verified</option>
              <option value="available">Available</option>
              <option value="claimed">Claimed</option>
            </select>
            <select
              value={filterRegion}
              onChange={e => setFilterRegion(e.target.value)}
              className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Regions</option>
              <option value="US">US</option>
              <option value="EU">EU</option>
              <option value="Asia">Asia</option>
              <option value="Global">Global</option>
            </select>
          </div>

          <div className="space-y-3">
            {getFilteredSources().map(source => (
              <div
                key={source.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSource?.id === source.id ? 'border-purple-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedSource(source)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        source.status === 'verified'
                          ? 'bg-green-500'
                          : source.status === 'claimed'
                            ? 'bg-purple-500'
                            : source.status === 'expired'
                              ? 'bg-red-500'
                              : 'bg-blue-500'
                      }`}
                    ></div>
                    <div>
                      <h4 className="font-semibold">{source.name}</h4>
                      <div className="text-sm text-gray-400">
                        {source.provider} - {source.region}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${getCategoryColor(source.category)}`}
                    >
                      {source.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(source.status)}`}>
                      {source.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getDifficultyColor(source.metadata.difficulty)}`}
                    >
                      {source.metadata.difficulty}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-3">{source.description}</div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Resource:</span>{' '}
                    {source.specifications.resource}
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>{' '}
                    {source.specifications.duration}
                  </div>
                  <div>
                    <span className="text-gray-400">Value:</span> $
                    {source.specifications.value.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence:</span>{' '}
                    {source.discovery.confidence.toFixed(1)}%
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Success Rate: {source.metadata.successRate.toFixed(0)}% | Competition:{' '}
                      {source.metadata.competition} | Time to Claim: {source.metadata.timeToClaim}
                      min
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Discovered: {new Date(source.discovery.discoveredAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {source.requirements.registration && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">Registration</span>
                    )}
                    {source.requirements.creditCard && (
                      <span className="px-2 py-1 bg-red-700 rounded text-xs">Credit Card</span>
                    )}
                    {source.requirements.student && (
                      <span className="px-2 py-1 bg-blue-700 rounded text-xs">Student</span>
                    )}
                    {source.requirements.developer && (
                      <span className="px-2 py-1 bg-purple-700 rounded text-xs">Developer</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {source.status === 'discovered' && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          verifySource(source.id);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                      >
                        Verify
                      </button>
                    )}
                    {source.status === 'verified' && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          claimSource(source.id);
                        }}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {getFilteredSources().length === 0 && (
            <div className="text-center py-8 text-gray-400">No resources found</div>
          )}
        </div>

        {/* Scan Rules */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Active Scan Rules</h3>
          <div className="space-y-3">
            {rules
              .filter(r => r.isActive)
              .map(rule => (
                <div key={rule.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{rule.name}</h4>
                      <div className="text-sm text-gray-400">
                        {rule.type} - {rule.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-600 rounded text-xs">Active</span>
                      <span className="text-sm text-gray-400">Priority: {rule.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Success Rate:</span>{' '}
                      {rule.performance.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Discoveries:</span>{' '}
                      {rule.performance.discoveries}
                    </div>
                    <div>
                      <span className="text-gray-400">Last Run:</span>{' '}
                      {new Date(rule.performance.lastRun).toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Frequency:</span>{' '}
                      {rule.configuration.frequency} hours
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Keywords:</span>
                    <div className="flex items-center gap-1">
                      {rule.configuration.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-600 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                      {rule.configuration.keywords.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{rule.configuration.keywords.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Source Details */}
        {selectedSource && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Resource Details: {selectedSource.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Resource Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Provider:</span>
                    <span className="font-medium">{selectedSource.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="font-medium">{selectedSource.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-medium">{selectedSource.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Region:</span>
                    <span className="font-medium">{selectedSource.region}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resource:</span>
                    <span className="font-medium">{selectedSource.specifications.resource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="font-medium">{selectedSource.specifications.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium">{selectedSource.specifications.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Value:</span>
                    <span className="font-medium">
                      ${selectedSource.specifications.value.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registration:</span>
                    <span className="font-medium">
                      {selectedSource.requirements.registration ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credit Card:</span>
                    <span className="font-medium">
                      {selectedSource.requirements.creditCard ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Student:</span>
                    <span className="font-medium">
                      {selectedSource.requirements.student ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Developer:</span>
                    <span className="font-medium">
                      {selectedSource.requirements.developer ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Discovery Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="font-medium">{selectedSource.discovery.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Source:</span>
                    <span className="font-medium">{selectedSource.discovery.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="font-medium">
                      {selectedSource.discovery.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Discovered:</span>
                    <span className="font-medium">
                      {new Date(selectedSource.discovery.discoveredAt).toLocaleDateString()}
                    </span>
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
              <h2 className="text-2xl font-bold mb-6">Scanner Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Scan Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.scanFrequency}
                      onChange={e =>
                        setConfig(prev => ({ ...prev, scanFrequency: parseInt(e.target.value) }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Scan Depth (1-10)</label>
                    <input
                      type="number"
                      value={config.scanDepth}
                      onChange={e =>
                        setConfig(prev => ({ ...prev, scanDepth: parseInt(e.target.value) }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10"
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
                        onChange={e =>
                          setConfig(prev => ({ ...prev, scanningEnabled: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Scanning Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoVerification}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, autoVerification: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Verification</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoClaiming}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, autoClaiming: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Claiming</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.filters.excludeCreditCard}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            filters: { ...prev.filters, excludeCreditCard: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Exclude Credit Card</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Intelligence</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.machineLearning}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            intelligence: {
                              ...prev.intelligence,
                              machineLearning: e.target.checked,
                            },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Machine Learning</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.patternRecognition}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            intelligence: {
                              ...prev.intelligence,
                              patternRecognition: e.target.checked,
                            },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Pattern Recognition</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.competitorAnalysis}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            intelligence: {
                              ...prev.intelligence,
                              competitorAnalysis: e.target.checked,
                            },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Competitor Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.intelligence.socialMonitoring}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            intelligence: {
                              ...prev.intelligence,
                              socialMonitoring: e.target.checked,
                            },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Social Monitoring</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.proxyRotation}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, proxyRotation: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Proxy Rotation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.stealthMode}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, stealthMode: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Stealth Mode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.rateLimiting}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, rateLimiting: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Rate Limiting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryption}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, encryption: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encryption</span>
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

export default GlobalResourceScanner;
