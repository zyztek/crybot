/**
 * Resource Unification Engine Component
 *
 * Resource unification engine for VPS cores, RAM, internet, and remote resource management via Proxmox
 * Unifies and manages all available computing resources from multiple providers
 */

import { CheckCircle, Cpu, HardDrive, Link, Search, Server, Settings, Wifi } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ResourceNode {
  id: string;
  name: string;
  type: 'vps' | 'gpu' | 'tpu' | 'mainframe' | 'dedicated' | 'container' | 'function' | 'storage' | 'network';
  provider: string;
  location: string;
  specifications: {
    cpu?: {
      cores: number;
      threads: number;
      architecture: string;
      clockSpeed: string;
      cache: string;
      virtualization: boolean;
    };
    memory?: {
      total: string;
      type: string;
      speed: string;
      channels: number;
      ecc: boolean;
    };
    storage?: {
      type: string;
      capacity: string;
      speed: string;
      interface: string;
      raid?: string;
    };
    gpu?: {
      model: string;
      memory: string;
      cores: number;
      tensorCores?: number;
      architecture: string;
      clockSpeed: string;
    };
    tpu?: {
      version: string;
      cores: number;
      memory: string;
      interconnect: string;
      clockSpeed: string;
    };
    network?: {
      bandwidth: string;
      latency: string;
      ipType: string;
      ports: number[];
      ddosProtection: boolean;
    };
    mainframe?: {
      model: string;
      mips: number;
      memory: string;
      storage: string;
      channels: number;
      partitioning: string;
    };
  };
  availability: {
    status: 'online' | 'offline' | 'maintenance' | 'error';
    uptime: number; // percentage
    lastSeen: string;
    responseTime: number; // milliseconds
    reliability: number; // 0-100
    loadAverage: number; // 0-100
    temperature: number; // celsius
  };
  access: {
    type: 'ssh' | 'rdp' | 'web' | 'api' | 'proxmox' | 'kubernetes' | 'docker';
    endpoint: string;
    credentials: {
      username?: string;
      password?: string;
      key?: string;
      token?: string;
      certificate?: string;
    };
    authentication: {
      method: 'password' | 'key' | 'token' | 'certificate' | 'mfa';
      twoFactor: boolean;
      encrypted: boolean;
    };
    permissions: string[];
    restrictions: string[];
  };
  performance: {
    benchmarks: {
      cpu?: number;
      memory?: number;
      storage?: number;
      network?: number;
      gpu?: number;
    };
    metrics: {
      cpuUsage: number;
      memoryUsage: number;
      storageUsage: number;
      networkUsage: number;
      temperature: number;
      powerConsumption: number;
    };
    history: Array<{
      timestamp: string;
      metric: string;
      value: number;
      status: 'normal' | 'warning' | 'critical';
    }>;
  };
  cost: {
    type: 'free' | 'trial' | 'educational' | 'developer' | 'paid' | 'credit';
    amount: number;
    currency: string;
    billingCycle: string;
    renewalDate?: string;
    credits?: number;
  };
  integration: {
    proxmox: {
      nodeId: string;
      vmId?: string;
      containerId?: string;
      storagePool?: string;
      networkBridge?: string;
    };
    orchestration: {
      platform: 'proxmox' | 'kubernetes' | 'docker' | 'nomad' | 'swarm';
      version: string;
      features: string[];
    };
    monitoring: {
      enabled: boolean;
      metrics: string[];
      alerts: boolean;
      logging: boolean;
    };
  };
  isActive: boolean;
  priority: number;
  tags: string[];
  discoveredAt: string;
  lastUpdated: string;
}

interface ResourcePool {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'network' | 'hybrid';
  nodes: string[]; // node IDs
  configuration: {
    loadBalancing: 'round_robin' | 'least_connections' | 'weighted' | 'ip_hash';
    failover: boolean;
    healthCheck: {
      enabled: boolean;
      interval: number; // seconds
      timeout: number; // seconds
      retries: number;
    };
    autoScaling: {
      enabled: boolean;
      minNodes: number;
      maxNodes: number;
      targetCpuUsage: number;
      scaleUpCooldown: number; // seconds
      scaleDownCooldown: number; // seconds
    };
  };
  performance: {
    totalCores: number;
    totalMemory: string;
    totalStorage: string;
    totalBandwidth: string;
    averageLoad: number;
    averageUptime: number;
    totalCost: number;
  };
  isActive: boolean;
  createdAt: string;
  lastActivity: string;
}

interface UnificationConfig {
  autoDiscovery: boolean;
  discoveryFrequency: number; // hours
  autoIntegration: boolean;
  loadBalancing: boolean;
  failoverEnabled: boolean;
  healthMonitoring: boolean;
  resourceOptimization: boolean;
  costOptimization: boolean;
  security: {
    encryptCredentials: boolean;
    auditLogging: boolean;
    accessControl: boolean;
    networkIsolation: boolean;
  };
  proxmox: {
    enabled: boolean;
    endpoint: string;
    username: string;
    password?: string;
    token?: string;
    clusterMode: boolean;
    haMode: boolean;
    storageIntegration: boolean;
    networkIntegration: boolean;
  };
  notifications: {
    nodeStatus: boolean;
    performanceAlerts: boolean;
    costAlerts: boolean;
    securityAlerts: boolean;
    integrationStatus: boolean;
  };
}

const ResourceUnificationEngine: React.FC = () => {
  const [nodes, setNodes] = useState<ResourceNode[]>([]);
  const [pools, setPools] = useState<ResourcePool[]>([]);
  const [config, setConfig] = useState<UnificationConfig>({
    autoDiscovery: true,
    discoveryFrequency: 6,
    autoIntegration: true,
    loadBalancing: true,
    failoverEnabled: true,
    healthMonitoring: true,
    resourceOptimization: true,
    costOptimization: true,
    security: {
      encryptCredentials: true,
      auditLogging: true,
      accessControl: true,
      networkIsolation: true
    },
    proxmox: {
      enabled: true,
      endpoint: 'https://proxmox.example.com:8006',
      username: 'crybot_admin',
      password: 'encrypted_password',
      clusterMode: true,
      haMode: true,
      storageIntegration: true,
      networkIntegration: true
    },
    notifications: {
      nodeStatus: true,
      performanceAlerts: true,
      costAlerts: true,
      securityAlerts: true,
      integrationStatus: true
    }
  });
  const [selectedNode, setSelectedNode] = useState<ResourceNode | null>(null);
  const [selectedPool, setSelectedPool] = useState<ResourcePool | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalNodes: 0,
    activeNodes: 0,
    totalCores: 0,
    totalMemory: 0,
    totalStorage: 0,
    totalBandwidth: 0,
    averageUptime: 0,
    totalCost: 0,
    bestProvider: '',
    resourceTypes: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock resource nodes initialization
  useEffect(() => {
    const mockNodes: ResourceNode[] = [
      // Google Colab GPU Nodes
      {
        id: 'node-1',
        name: 'Google Colab T4',
        type: 'gpu',
        provider: 'Google',
        location: 'US-Central',
        specifications: {
          gpu: {
            model: 'Tesla T4',
            memory: '16GB',
            cores: 1,
            architecture: 'Turing',
            clockSpeed: '1.59GHz'
          },
          cpu: {
            cores: 4,
            threads: 8,
            architecture: 'x86_64',
            clockSpeed: '2.2GHz',
            cache: '8MB L3',
            virtualization: true
          },
          memory: {
            total: '16GB',
            type: 'GDDR6',
            speed: '16Gbps',
            channels: 2,
            ecc: false
          },
          network: {
            bandwidth: 'Unlimited',
            latency: '50ms',
            ipType: 'Dynamic',
            ports: [80, 443, 22],
            ddosProtection: true
          }
        },
        availability: {
          status: 'online',
          uptime: 95.5,
          lastSeen: new Date().toISOString(),
          responseTime: 150,
          reliability: 92.0,
          loadAverage: 65.0,
          temperature: 72.0
        },
        access: {
          type: 'web',
          endpoint: 'https://colab.research.google.com',
          credentials: {
            token: 'encrypted_google_token_123'
          },
          authentication: {
            method: 'token',
            twoFactor: false,
            encrypted: true
          },
          permissions: ['gpu_access', 'storage_access', 'network_access'],
          restrictions: ['12 hours max session', 'no background processing']
        },
        performance: {
          benchmarks: {
            cpu: 8500,
            memory: 7500,
            gpu: 12500,
            network: 8000
          },
          metrics: {
            cpuUsage: 45.0,
            memoryUsage: 78.5,
            storageUsage: 25.0,
            networkUsage: 15.0,
            temperature: 72.0,
            powerConsumption: 250
          },
          history: [
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              metric: 'gpu_usage',
              value: 85.0,
              status: 'normal'
            },
            {
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              metric: 'temperature',
              value: 78.0,
              status: 'warning'
            }
          ]
        },
        cost: {
          type: 'free',
          amount: 0,
          currency: 'USD',
          billingCycle: 'unlimited',
          credits: 100
        },
        integration: {
          proxmox: {
            nodeId: 'google-colab-1',
            vmId: 'vm-101'
          },
          orchestration: {
            platform: 'docker',
            version: '24.0.0',
            features: ['gpu_passthrough', 'containerization']
          },
          monitoring: {
            enabled: true,
            metrics: ['cpu', 'memory', 'gpu', 'network'],
            alerts: true,
            logging: true
          }
        },
        isActive: true,
        priority: 1,
        tags: ['gpu', 'ai', 'machine_learning', 'google', 'free'],
        discoveredAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      // IBM Mainframe Node
      {
        id: 'node-2',
        name: 'IBM z16 Mainframe',
        type: 'mainframe',
        provider: 'IBM',
        location: 'US-East',
        specifications: {
          mainframe: {
            model: 'z16',
            mips: 15000,
            memory: '256GB',
            storage: '10TB',
            channels: 64,
            partitioning: 'LPAR'
          },
          cpu: {
            cores: 32,
            threads: 64,
            architecture: 's390x',
            clockSpeed: '5.2GHz',
            cache: '256MB L2',
            virtualization: true
          },
          memory: {
            total: '256GB',
            type: 'DDR4',
            speed: '25.6GB/s',
            channels: 8,
            ecc: true
          },
          storage: {
            type: 'SSD',
            capacity: '10TB',
            speed: '12GB/s',
            interface: 'FICON',
            raid: 'RAID-10'
          },
          network: {
            bandwidth: '100Gbps',
            latency: '5ms',
            ipType: 'Static',
            ports: [22, 80, 443, 9100],
            ddosProtection: true
          }
        },
        availability: {
          status: 'online',
          uptime: 99.9,
          lastSeen: new Date().toISOString(),
          responseTime: 25,
          reliability: 98.5,
          loadAverage: 35.0,
          temperature: 45.0
        },
        access: {
          type: 'ssh',
          endpoint: 'mainframe.ibm.com',
          credentials: {
            username: 'crybot_mainframe',
            key: 'encrypted_ssh_key_456'
          },
          authentication: {
            method: 'key',
            twoFactor: true,
            encrypted: true
          },
          permissions: ['root_access', 'lpar_management', 'storage_management'],
          restrictions: ['educational_use_only', 'no_commercial_use']
        },
        performance: {
          benchmarks: {
            cpu: 15000,
            memory: 12000,
            storage: 9500,
            network: 9800
          },
          metrics: {
            cpuUsage: 25.0,
            memoryUsage: 45.0,
            storageUsage: 60.0,
            networkUsage: 20.0,
            temperature: 45.0,
            powerConsumption: 5000
          },
          history: [
            {
              timestamp: new Date(Date.now() - 1800000).toISOString(),
              metric: 'cpu_usage',
              value: 25.0,
              status: 'normal'
            }
          ]
        },
        cost: {
          type: 'educational',
          amount: 0,
          currency: 'USD',
          billingCycle: 'academic_year',
          credits: 500
        },
        integration: {
          proxmox: {
            nodeId: 'ibm-mainframe-1',
            vmId: 'vm-201'
          },
          orchestration: {
            platform: 'kubernetes',
            version: '1.28.0',
            features: ['mainframe_integration', 'containerization', 'auto_scaling']
          },
          monitoring: {
            enabled: true,
            metrics: ['cpu', 'memory', 'storage', 'network', 'mainframe'],
            alerts: true,
            logging: true
          }
        },
        isActive: true,
        priority: 2,
        tags: ['mainframe', 'ibm', 'enterprise', 'high_performance', 'educational'],
        discoveredAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      // Intel DevCloud GPU Node
      {
        id: 'node-3',
        name: 'Intel Arc A770',
        type: 'gpu',
        provider: 'Intel',
        location: 'US-West',
        specifications: {
          gpu: {
            model: 'Arc A770',
            memory: '16GB',
            cores: 32,
            architecture: 'Xe-HPG',
            clockSpeed: '2.1GHz'
          },
          cpu: {
            cores: 8,
            threads: 16,
            architecture: 'x86_64',
            clockSpeed: '2.1GHz',
            cache: '16MB L3',
            virtualization: true
          },
          memory: {
            total: '16GB',
            type: 'GDDR6',
            speed: '16Gbps',
            channels: 2,
            ecc: false
          },
          network: {
            bandwidth: '10Gbps',
            latency: '25ms',
            ipType: 'Dynamic',
            ports: [22, 80, 443],
            ddosProtection: true
          }
        },
        availability: {
          status: 'online',
          uptime: 97.5,
          lastSeen: new Date().toISOString(),
          responseTime: 75,
          reliability: 90.0,
          loadAverage: 55.0,
          temperature: 68.0
        },
        access: {
          type: 'ssh',
          endpoint: 'devcloud.intel.com',
          credentials: {
            username: 'crybot_intel',
            key: 'encrypted_ssh_key_789'
          },
          authentication: {
            method: 'key',
            twoFactor: true,
            encrypted: true
          },
          permissions: ['gpu_access', 'development_tools', 'api_access'],
          restrictions: ['90 days max', 'non_commercial_use']
        },
        performance: {
          benchmarks: {
            cpu: 9500,
            memory: 8500,
            gpu: 11000,
            network: 7500
          },
          metrics: {
            cpuUsage: 60.0,
            memoryUsage: 75.0,
            storageUsage: 30.0,
            networkUsage: 25.0,
            temperature: 68.0,
            powerConsumption: 350
          },
          history: [
            {
              timestamp: new Date(Date.now() - 900000).toISOString(),
              metric: 'gpu_usage',
              value: 90.0,
              status: 'normal'
            }
          ]
        },
        cost: {
          type: 'developer',
          amount: 0,
          currency: 'USD',
          billingCycle: '90 days',
          credits: 200
        },
        integration: {
          proxmox: {
            nodeId: 'intel-gpu-1',
            vmId: 'vm-301'
          },
          orchestration: {
            platform: 'docker',
            version: '24.0.0',
            features: ['gpu_passthrough', 'development_tools']
          },
          monitoring: {
            enabled: true,
            metrics: ['cpu', 'memory', 'gpu', 'network'],
            alerts: true,
            logging: true
          }
        },
        isActive: true,
        priority: 3,
        tags: ['gpu', 'intel', 'arc', 'developer', 'free'],
        discoveredAt: '2024-01-08T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      // NVIDIA GPU Cloud Node
      {
        id: 'node-4',
        name: 'NVIDIA RTX A6000',
        type: 'gpu',
        provider: 'NVIDIA',
        location: 'EU-West',
        specifications: {
          gpu: {
            model: 'RTX A6000',
            memory: '48GB',
            cores: 10752,
            architecture: 'Ampere',
            clockSpeed: '1.78GHz'
          },
          cpu: {
            cores: 16,
            threads: 32,
            architecture: 'x86_64',
            clockSpeed: '2.4GHz',
            cache: '32MB L3',
            virtualization: true
          },
          memory: {
            total: '48GB',
            type: 'GDDR6',
            speed: '48GB/s',
            channels: 6,
            ecc: false
          },
          network: {
            bandwidth: '25Gbps',
            latency: '15ms',
            ipType: 'Static',
            ports: [22, 80, 443, 3389],
            ddosProtection: true
          }
        },
        availability: {
          status: 'online',
          uptime: 98.5,
          lastSeen: new Date().toISOString(),
          responseTime: 45,
          reliability: 95.0,
          loadAverage: 40.0,
          temperature: 65.0
        },
        access: {
          type: 'ssh',
          endpoint: 'cloud.nvidia.com',
          credentials: {
            username: 'crybot_nvidia',
            key: 'encrypted_ssh_key_012'
          },
          authentication: {
            method: 'key',
            twoFactor: true,
            encrypted: true
          },
          permissions: ['gpu_access', 'cuda_access', 'api_access'],
          restrictions: ['student_research', 'educational_use']
        },
        performance: {
          benchmarks: {
            cpu: 12000,
            memory: 11000,
            gpu: 15000,
            network: 9000
          },
          metrics: {
            cpuUsage: 35.0,
            memoryUsage: 60.0,
            storageUsage: 20.0,
            networkUsage: 15.0,
            temperature: 65.0,
            powerConsumption: 450
          },
          history: [
            {
              timestamp: new Date(Date.now() - 600000).toISOString(),
              metric: 'gpu_usage',
              value: 95.0,
              status: 'normal'
            }
          ]
        },
        cost: {
          type: 'educational',
          amount: 0,
          currency: 'USD',
          billingCycle: 'academic_year',
          credits: 300
        },
        integration: {
          proxmox: {
            nodeId: 'nvidia-gpu-1',
            vmId: 'vm-401'
          },
          orchestration: {
            platform: 'kubernetes',
            version: '1.28.0',
            features: ['gpu_passthrough', 'cuda_support', 'auto_scaling']
          },
          monitoring: {
            enabled: true,
            metrics: ['cpu', 'memory', 'gpu', 'network', 'cuda'],
            alerts: true,
            logging: true
          }
        },
        isActive: true,
        priority: 4,
        tags: ['gpu', 'nvidia', 'rtx', 'a6000', 'educational', 'high_performance'],
        discoveredAt: '2024-01-12T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setNodes(mockNodes);
  }, []);

  // Mock resource pools initialization
  useEffect(() => {
    const mockPools: ResourcePool[] = [
      {
        id: 'pool-1',
        name: 'AI Training Pool',
        type: 'compute',
        nodes: ['node-1', 'node-3', 'node-4'],
        configuration: {
          loadBalancing: 'least_connections',
          failover: true,
          healthCheck: {
            enabled: true,
            interval: 30,
            timeout: 10,
            retries: 3
          },
          autoScaling: {
            enabled: true,
            minNodes: 1,
            maxNodes: 4,
            targetCpuUsage: 75.0,
            scaleUpCooldown: 300,
            scaleDownCooldown: 600
          }
        },
        performance: {
          totalCores: 60,
          totalMemory: '80GB',
          totalStorage: '2TB',
          totalBandwidth: '100Gbps',
          averageLoad: 45.0,
          averageUptime: 97.5,
          totalCost: 0
        },
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      },
      {
        id: 'pool-2',
        name: 'Enterprise Computing Pool',
        type: 'hybrid',
        nodes: ['node-2'],
        configuration: {
          loadBalancing: 'weighted',
          failover: true,
          healthCheck: {
            enabled: true,
            interval: 15,
            timeout: 5,
            retries: 5
          },
          autoScaling: {
            enabled: false,
            minNodes: 1,
            maxNodes: 1,
            targetCpuUsage: 80.0,
            scaleUpCooldown: 0,
            scaleDownCooldown: 0
          }
        },
        performance: {
          totalCores: 32,
          totalMemory: '256GB',
          totalStorage: '10TB',
          totalBandwidth: '100Gbps',
          averageLoad: 35.0,
          averageUptime: 99.9,
          totalCost: 0
        },
        isActive: true,
        createdAt: '2024-01-05T00:00:00Z',
        lastActivity: new Date().toISOString()
      }
    ];

    setPools(mockPools);
  }, []);

  // Auto discovery simulation
  useEffect(() => {
    if (!config.autoDiscovery || !isScanning) return;

    const interval = setInterval(() => {
      // Simulate discovering new resources
      if (Math.random() > 0.9) { // 10% chance per interval
        const providers = ['AWS', 'Azure', 'DigitalOcean', 'Vultr', 'Linode', 'Hetzner', 'Oracle', 'Alibaba'];
        const types: ResourceNode['type'][] = ['vps', 'gpu', 'tpu', 'dedicated', 'container', 'function'];
        const locations = ['US-East', 'US-West', 'EU-West', 'EU-East', 'Asia-Pacific', 'South America'];

        const newNode: ResourceNode = {
          id: `node-${Date.now()}`,
          name: `${providers[Math.floor(Math.random() * providers.length)]} ${types[Math.floor(Math.random() * types.length)]}`,
          type: types[Math.floor(Math.random() * types.length)],
          provider: providers[Math.floor(Math.random() * providers.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          specifications: {
            cpu: {
              cores: Math.floor(Math.random() * 16) + 1,
              threads: Math.floor(Math.random() * 32) + 2,
              architecture: 'x86_64',
              clockSpeed: `${(Math.random() * 3 + 1).toFixed(1)}GHz`,
              cache: `${Math.floor(Math.random() * 32) + 8}MB L3`,
              virtualization: Math.random() > 0.3
            },
            memory: {
              total: `${Math.floor(Math.random() * 64) + 1}GB`,
              type: Math.random() > 0.5 ? 'DDR4' : 'DDR5',
              speed: `${(Math.random() * 40 + 20).toFixed(0)}GB/s`,
              channels: Math.floor(Math.random() * 4) + 2,
              ecc: Math.random() > 0.7
            },
            network: {
              bandwidth: `${Math.floor(Math.random() * 100) + 10}Gbps`,
              latency: `${(Math.random() * 50 + 5).toFixed(0)}ms`,
              ipType: Math.random() > 0.5 ? 'Static' : 'Dynamic',
              ports: [22, 80, 443],
              ddosProtection: Math.random() > 0.3
            }
          },
          availability: {
            status: 'online',
            uptime: Math.random() * 10 + 90,
            lastSeen: new Date().toISOString(),
            responseTime: Math.random() * 100 + 20,
            reliability: Math.random() * 20 + 80,
            loadAverage: Math.random() * 60 + 20,
            temperature: Math.random() * 30 + 40
          },
          access: {
            type: 'ssh',
            endpoint: `${providers[Math.floor(Math.random() * providers.length)].toLowerCase()}.example.com`,
            credentials: {
              username: `crybot_${Date.now()}`,
              key: `encrypted_key_${Date.now()}`
            },
            authentication: {
              method: 'key',
              twoFactor: Math.random() > 0.5,
              encrypted: true
            },
            permissions: ['full_access'],
            restrictions: []
          },
          performance: {
            benchmarks: {
              cpu: Math.random() * 5000 + 5000,
              memory: Math.random() * 5000 + 5000,
              network: Math.random() * 5000 + 5000
            },
            metrics: {
              cpuUsage: Math.random() * 60 + 20,
              memoryUsage: Math.random() * 60 + 20,
              storageUsage: Math.random() * 40 + 10,
              networkUsage: Math.random() * 30 + 10,
              temperature: Math.random() * 30 + 40,
              powerConsumption: Math.random() * 200 + 100
            },
            history: []
          },
          cost: {
            type: 'free',
            amount: 0,
            currency: 'USD',
            billingCycle: 'monthly',
            credits: Math.floor(Math.random() * 500) + 100
          },
          integration: {
            proxmox: {
              nodeId: `node-${Date.now()}`,
              vmId: `vm-${Date.now()}`
            },
            orchestration: {
              platform: 'proxmox',
              version: '8.0.0',
              features: ['virtualization', 'containerization']
            },
            monitoring: {
              enabled: true,
              metrics: ['cpu', 'memory', 'network'],
              alerts: true,
              logging: true
            }
          },
          isActive: true,
          priority: Math.floor(Math.random() * 10) + 1,
          tags: ['auto_discovered', 'new', 'free'],
          discoveredAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };

        setNodes(prev => [...prev, newNode]);

        // Auto-integrate if enabled
        if (config.autoIntegration) {
          setTimeout(() => {
            setNodes(prev => prev.map(node =>
              node.id === newNode.id
                ? {
                    ...node,
                    availability: {
                      ...node.availability,
                      status: 'online'
                    }
                  }
                : node
            ));
          }, Math.random() * 10000 + 5000);
        }
      }
    }, config.discoveryFrequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.autoDiscovery, config.discoveryFrequency, config.autoIntegration, isScanning]);

  // Health monitoring simulation
  useEffect(() => {
    if (!config.healthMonitoring) return;

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        // Simulate health check
        const isHealthy = Math.random() > 0.1; // 90% chance healthy
        const newLoad = Math.random() * 80 + 10;
        const newTemp = Math.random() * 30 + 40;

        return {
          ...node,
          availability: {
            ...node.availability,
            status: isHealthy ? 'online' : 'error',
            loadAverage: newLoad,
            temperature: newTemp,
            lastSeen: new Date().toISOString()
          },
          performance: {
            ...node.performance,
            metrics: {
              ...node.performance.metrics,
              cpuUsage: newLoad,
              temperature: newTemp
            },
            history: [
              ...node.performance.history,
              {
                timestamp: new Date().toISOString(),
                metric: 'health_check',
                value: isHealthy ? 100 : 0,
                status: isHealthy ? 'normal' : 'critical'
              }
            ].slice(-20) // Keep last 20 entries
          }
        };
      }));
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.healthMonitoring]);

  // Update stats
  useEffect(() => {
    const activeNodes = nodes.filter(n => n.isActive).length;
    const totalCores = nodes.reduce((sum, n) => sum + (n.specifications.cpu?.cores || 0), 0);
    const totalMemoryGB = nodes.reduce((sum, n) => {
      const memory = n.specifications.memory?.total || '0GB';
      const value = parseFloat(memory.replace(/[^\d.]/g, ''));
      return sum + (memory.includes('TB') ? value * 1024 : value);
    }, 0);
    const totalStorageGB = nodes.reduce((sum, n) => {
      const storage = n.specifications.storage?.capacity || '0GB';
      const value = parseFloat(storage.replace(/[^\d.]/g, ''));
      return sum + (storage.includes('TB') ? value * 1024 : value);
    }, 0);
    const averageUptime = nodes.length > 0
      ? nodes.reduce((sum, n) => sum + n.availability.uptime, 0) / nodes.length
      : 0;
    const totalCost = nodes.reduce((sum, n) => sum + n.cost.amount, 0);

    const providerCounts = nodes.reduce((acc, node) => {
      acc[node.provider] = (acc[node.provider] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const bestProvider = Object.entries(providerCounts).reduce((best, [provider, count]) =>
      count > (best?.count || 0) ? { provider, count } : best, null as { provider: string; count: number } | null);
    const resourceTypes = new Set(nodes.map(n => n.type)).size;

    setStats({
      totalNodes: nodes.length,
      activeNodes,
      totalCores,
      totalMemory: totalMemoryGB,
      totalStorage: totalStorageGB,
      totalBandwidth: 0, // Would need to calculate from network specs
      averageUptime,
      totalCost,
      bestProvider: bestProvider?.provider || '',
      resourceTypes
    });
  }, [nodes]);

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  const integrateNode = (nodeId: string) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? {
            ...node,
            availability: {
              ...node.availability,
              status: 'online'
            }
          }
        : node
    ));
  };

  const createPool = () => {
    const availableNodes = nodes.filter(n => n.isActive);
    if (availableNodes.length < 2) return;

    const newPool: ResourcePool = {
      id: `pool-${Date.now()}`,
      name: `Resource Pool ${pools.length + 1}`,
      type: 'compute',
      nodes: availableNodes.slice(0, 3).map(n => n.id),
      configuration: {
        loadBalancing: 'least_connections',
        failover: true,
        healthCheck: {
          enabled: true,
          interval: 30,
          timeout: 10,
          retries: 3
        },
        autoScaling: {
          enabled: true,
          minNodes: 1,
          maxNodes: availableNodes.length,
          targetCpuUsage: 75.0,
          scaleUpCooldown: 300,
          scaleDownCooldown: 600
        }
      },
      performance: {
        totalCores: availableNodes.slice(0, 3).reduce((sum, n) => sum + (n.specifications.cpu?.cores || 0), 0),
        totalMemory: availableNodes.slice(0, 3).reduce((sum, n) => {
          const memory = n.specifications.memory?.total || '0GB';
          const value = parseFloat(memory.replace(/[^\d.]/g, ''));
          return sum + (memory.includes('TB') ? value * 1024 : value);
        }, 0).toString() + 'GB',
        totalStorage: '1TB',
        totalBandwidth: '50Gbps',
        averageLoad: 45.0,
        averageUptime: 95.0,
        totalCost: 0
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setPools(prev => [...prev, newPool]);
  };

  const getNodeTypeColor = (type: ResourceNode['type']) => {
    switch (type) {
      case 'vps': return 'bg-blue-600';
      case 'gpu': return 'bg-green-600';
      case 'tpu': return 'bg-purple-600';
      case 'mainframe': return 'bg-orange-600';
      case 'dedicated': return 'bg-red-600';
      case 'container': return 'bg-cyan-600';
      case 'function': return 'bg-yellow-600';
      case 'storage': return 'bg-pink-600';
      case 'network': return 'bg-indigo-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: ResourceNode['availability']['status']) => {
    switch (status) {
      case 'online': return 'bg-green-600';
      case 'offline': return 'bg-red-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'error': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredNodes = () => {
    return nodes.filter(node => {
      const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           node.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           node.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || node.type === filterType;
      const matchesProvider = filterProvider === 'all' || node.provider === filterProvider;
      const matchesStatus = filterStatus === 'all' || node.availability.status === filterStatus;
      return matchesSearch && matchesType && matchesProvider && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Server className="w-8 h-8 text-purple-400" />
            Resource Unification Engine
          </h1>
          <p className="text-gray-400">
            Resource unification engine for VPS cores, RAM, internet, and remote resource management via Proxmox
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Nodes</div>
                <div className="text-2xl font-bold">{stats.totalNodes}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active</div>
                <div className="text-2xl font-bold">{stats.activeNodes}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Cores</div>
                <div className="text-2xl font-bold">{stats.totalCores}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Memory</div>
                <div className="text-2xl font-bold">{stats.totalMemory.toFixed(0)}GB</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Wifi className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Uptime</div>
                <div className="text-2xl font-bold">{stats.averageUptime.toFixed(1)}%</div>
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
                    <Search className="w-5 h-5" />
                    Start Scanning
                  </>
                )}
              </button>
              <button
                onClick={createPool}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Link className="w-4 h-4" />
                Create Pool
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
              Resource Types: {stats.resourceTypes} |
              Auto Discovery: {config.autoDiscovery ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Resource Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Resource Nodes</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search nodes..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="vps">VPS</option>
                <option value="gpu">GPU</option>
                <option value="tpu">TPU</option>
                <option value="mainframe">Mainframe</option>
                <option value="dedicated">Dedicated</option>
              </select>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Providers</option>
                <option value="Google">Google</option>
                <option value="IBM">IBM</option>
                <option value="Intel">Intel</option>
                <option value="NVIDIA">NVIDIA</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredNodes().map((node) => (
                <div
                  key={node.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedNode?.id === node.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${node.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{node.name}</h4>
                        <div className="text-sm text-gray-400">{node.provider} - {node.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getNodeTypeColor(node.type)}`}>
                        {node.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(node.availability.status)}`}>
                        {node.availability.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">CPU:</span> {node.specifications.cpu?.cores || 0} cores @ {node.specifications.cpu?.clockSpeed || 'N/A'}
                    </div>
                    <div>
                      <span className="text-gray-400">Memory:</span> {node.specifications.memory?.total || 'N/A'}
                    </div>
                    <div>
                      <span className="text-gray-400">GPU:</span> {node.specifications.gpu?.model || 'N/A'}
                    </div>
                    <div>
                      <span className="text-gray-400">Network:</span> {node.specifications.network?.bandwidth || 'N/A'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Uptime: {node.availability.uptime.toFixed(1)}% |
                        Load: {node.availability.loadAverage.toFixed(1)}% |
                        Temp: {node.availability.temperature.toFixed(0)}°C
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {node.cost.type === 'free' ? 'FREE' : `${node.cost.amount} ${node.cost.currency}`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {node.integration.proxmox.enabled && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Proxmox</span>
                      )}
                      {node.integration.orchestration.platform && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">{node.integration.orchestration.platform}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {node.availability.status === 'offline' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            integrateNode(node.id);
                          }}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                        >
                          Integrate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredNodes().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No resource nodes found
              </div>
            )}
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Node Details: {selectedNode.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedNode.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Provider:</span>
                        <span className="font-medium">{selectedNode.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="font-medium">{selectedNode.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">CPU Cores:</span>
                        <span className="font-medium">{selectedNode.specifications.cpu?.cores || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memory:</span>
                        <span className="font-medium">{selectedNode.specifications.memory?.total || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedNode.availability.status)}`}>
                          {selectedNode.availability.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="font-medium">{selectedNode.availability.uptime.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Load:</span>
                        <span className="font-medium">{selectedNode.availability.loadAverage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="font-medium">{selectedNode.availability.temperature.toFixed(0)}°C</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Integration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Proxmox:</span>
                        <span className="font-medium">{selectedNode.integration.proxmox.enabled ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orchestration:</span>
                        <span className="font-medium">{selectedNode.integration.orchestration.platform || 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monitoring:</span>
                        <span className="font-medium">{selectedNode.integration.monitoring.enabled ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resource Pools */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Resource Pools</h3>
          <div className="space-y-4">
            {pools.map((pool) => (
              <div key={pool.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{pool.name}</h4>
                    <div className="text-sm text-gray-400">{pool.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${pool.isActive ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {pool.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-400">
                      {pool.nodes.length} nodes
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Total Cores:</span> {pool.performance.totalCores}
                  </div>
                  <div>
                    <span className="text-gray-400">Total Memory:</span> {pool.performance.totalMemory}
                  </div>
                  <div>
                    <span className="text-gray-400">Load Balancing:</span> {pool.configuration.loadBalancing.replace('_', ' ')}
                  </div>
                  <div>
                    <span className="text-gray-400">Failover:</span> {pool.configuration.failover ? 'Yes' : 'No'}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${pool.performance.averageLoad}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {pool.configuration.autoScaling.enabled ? 'Auto-Scaling' : 'Fixed'}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                      Health Check: {pool.configuration.healthCheck.interval}s
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Created: {new Date(pool.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pools.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No resource pools found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Resource Unification Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Discovery Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.discoveryFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, discoveryFrequency: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="24"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoDiscovery}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoDiscovery: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Discovery</span>
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
                        checked={config.loadBalancing}
                        onChange={(e) => setConfig(prev => ({ ...prev, loadBalancing: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Load Balancing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.failoverEnabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, failoverEnabled: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Failover</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Proxmox Integration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Endpoint</label>
                      <input
                        type="text"
                        value={config.proxmox.endpoint}
                        onChange={(e) => setConfig(prev => ({ ...prev, proxmox: { ...prev.proxmox, endpoint: e.target.value } }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Username</label>
                      <input
                        type="text"
                        value={config.proxmox.username}
                        onChange={(e) => setConfig(prev => ({ ...prev, proxmox: { ...prev.proxmox, username: e.target.value } }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.proxmox.enabled}
                        onChange={(e) => setConfig(prev => ({ ...prev, proxmox: { ...prev.proxmox, enabled: e.target.checked } }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Enabled</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.proxmox.clusterMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, proxmox: { ...prev.proxmox, clusterMode: e.target.checked } }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Cluster Mode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.proxmox.haMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, proxmox: { ...prev.proxmox, haMode: e.target.checked } }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">HA Mode</span>
                    </label>
                  </div>
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

export default ResourceUnificationEngine;
