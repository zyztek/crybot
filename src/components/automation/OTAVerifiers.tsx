/**
 * OTA (One-Time-Access) Verifiers Component
 * 
 * Advanced OTA verification system for multiple platforms
 * Supports automated verification, code extraction, and platform integration
 */

import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, XCircle, RefreshCw, Settings, Search, Filter, Clock, Zap, Globe, Key, Eye, EyeOff, AlertTriangle, Copy } from 'lucide-react';

interface VerificationPlatform {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'whatsapp' | 'telegram' | 'push' | 'authenticator';
  category: 'faucet' | 'exchange' | 'defi' | 'gaming' | 'social' | 'banking' | 'shopping';
  supportedMethods: Array<'email' | 'sms' | 'call' | 'whatsapp' | 'telegram' | 'push' | 'authenticator' | 'totp' | 'backup_codes'>;
  features: {
    autoDetect: boolean;
    autoVerify: boolean;
    codeExtraction: boolean;
    linkFollowing: boolean;
    screenshotSupport: boolean;
  };
  security: {
    encryption: boolean;
    rateLimiting: boolean;
    ipRotation: boolean;
    userAgents: boolean;
  };
  stats: {
    totalVerifications: number;
    successRate: number;
    averageTime: number; // seconds
    lastUsed: string;
  };
  isActive: boolean;
  priority: number;
}

interface VerificationRequest {
  id: string;
  platformId: string;
  personaId: string;
  type: VerificationPlatform['supportedMethods'][number];
  status: 'pending' | 'detected' | 'extracting' | 'verifying' | 'completed' | 'failed' | 'expired';
  source: {
    url?: string;
    email?: string;
    phoneNumber?: string;
    appName?: string;
  };
  code?: string;
  link?: string;
  qrCode?: string;
  backupCodes: string[];
  metadata: {
    purpose: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    expiresAt?: string;
    maxAttempts: number;
    currentAttempt: number;
  };
  createdAt: string;
  detectedAt?: string;
  completedAt?: string;
  result?: {
    success: boolean;
    message?: string;
    error?: string;
    responseTime?: number;
  };
}

interface OTAConfig {
  autoDetection: boolean;
  autoVerification: boolean;
  detectionInterval: number; // seconds
  verificationTimeout: number; // seconds
  maxRetries: number;
  retryDelay: number; // seconds
  platforms: {
    enabled: string[];
    priority: string[];
  };
  security: {
    encryption: boolean;
    proxyRotation: boolean;
    userAgents: boolean;
    screenshotPrivacy: boolean;
  };
  notifications: {
    onDetection: boolean;
    onExtraction: boolean;
    onVerification: boolean;
    onFailure: boolean;
  };
}

const OTAVerifiers: React.FC = () => {
  const [platforms, setPlatforms] = useState<VerificationPlatform[]>([]);
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [config, setConfig] = useState<OTAConfig>({
    autoDetection: true,
    autoVerification: false,
    detectionInterval: 5,
    verificationTimeout: 300,
    maxRetries: 3,
    retryDelay: 10,
    platforms: {
      enabled: ['freebitco.in', 'cointiply.com', 'firefaucet.win'],
      priority: ['freebitco.in', 'cointiply.com', 'firefaucet.win']
    },
    security: {
      encryption: true,
      proxyRotation: true,
      userAgents: true,
      screenshotPrivacy: true
    },
    notifications: {
      onDetection: true,
      onExtraction: true,
      onVerification: true,
      onFailure: true
    }
  });
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<VerificationPlatform | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({
    totalRequests: 0,
    completedRequests: 0,
    failedRequests: 0,
    successRate: 0,
    averageTime: 0,
    activePlatforms: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock verification platforms initialization
  useEffect(() => {
    const mockPlatforms: VerificationPlatform[] = [
      {
        id: '1',
        name: 'FreeBitcoin',
        type: 'email',
        category: 'faucet',
        supportedMethods: ['email', 'sms', 'totp'],
        features: {
          autoDetect: true,
          autoVerify: true,
          codeExtraction: true,
          linkFollowing: true,
          screenshotSupport: true
        },
        security: {
          encryption: true,
          rateLimiting: true,
          ipRotation: true,
          userAgents: true
        },
        stats: {
          totalVerifications: 1250,
          successRate: 96.8,
          averageTime: 12.5,
          lastUsed: new Date(Date.now() - 3600000).toISOString()
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Cointiply',
        type: 'email',
        category: 'faucet',
        supportedMethods: ['email', 'sms', 'whatsapp'],
        features: {
          autoDetect: true,
          autoVerify: true,
          codeExtraction: true,
          linkFollowing: true,
          screenshotSupport: false
        },
        security: {
          encryption: true,
          rateLimiting: false,
          ipRotation: true,
          userAgents: true
        },
        stats: {
          totalVerifications: 890,
          successRate: 95.2,
          averageTime: 15.3,
          lastUsed: new Date(Date.now() - 7200000).toISOString()
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'FireFaucet',
        type: 'sms',
        category: 'faucet',
        supportedMethods: ['sms', 'email', 'call'],
        features: {
          autoDetect: true,
          autoVerify: false,
          codeExtraction: true,
          linkFollowing: false,
          screenshotSupport: true
        },
        security: {
          encryption: false,
          rateLimiting: true,
          ipRotation: true,
          userAgents: false
        },
        stats: {
          totalVerifications: 650,
          successRate: 94.1,
          averageTime: 18.7,
          lastUsed: new Date(Date.now() - 10800000).toISOString()
        },
        isActive: true,
        priority: 3
      }
    ];

    setPlatforms(mockPlatforms);
  }, []);

  // Mock verification requests initialization
  useEffect(() => {
    const mockRequests: VerificationRequest[] = [
      {
        id: 'req-1',
        platformId: '1',
        personaId: 'persona-1',
        type: 'email',
        status: 'completed',
        source: {
          email: 'john.doe.12345@tempmail.plus',
          url: 'https://freebitco.in'
        },
        code: '123456',
        link: 'https://freebitco.in/verify?token=abc123',
        backupCodes: ['654321', '789012'],
        metadata: {
          purpose: 'Account verification',
          priority: 'high',
          expiresAt: new Date(Date.now() + 300000).toISOString(),
          maxAttempts: 3,
          currentAttempt: 1
        },
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        detectedAt: new Date(Date.now() - 1750000).toISOString(),
        completedAt: new Date(Date.now() - 1700000).toISOString(),
        result: {
          success: true,
          message: 'Verification completed successfully',
          responseTime: 8.5
        }
      },
      {
        id: 'req-2',
        platformId: '2',
        personaId: 'persona-2',
        type: 'sms',
        status: 'extracting',
        source: {
          phoneNumber: '+1-555-0123-4567',
          url: 'https://cointiply.com'
        },
        metadata: {
          purpose: 'Phone verification',
          priority: 'medium',
          expiresAt: new Date(Date.now() + 600000).toISOString(),
          maxAttempts: 3,
          currentAttempt: 1
        },
        createdAt: new Date(Date.now() - 900000).toISOString(),
        detectedAt: new Date(Date.now() - 850000).toISOString()
      },
      {
        id: 'req-3',
        platformId: '3',
        personaId: 'persona-1',
        type: 'sms',
        status: 'pending',
        source: {
          url: 'https://firefaucet.win'
        },
        metadata: {
          purpose: 'Faucet claim verification',
          priority: 'low',
          maxAttempts: 3,
          currentAttempt: 0
        },
        createdAt: new Date().toISOString()
      }
    ];

    setRequests(mockRequests);
  }, []);

  // Auto detection simulation
  useEffect(() => {
    if (!config.autoDetection) return;

    const interval = setInterval(() => {
      // Simulate detection of new verification requests
      const platformsToCheck = platforms.filter(p => 
        p.isActive && config.platforms.enabled.includes(p.name)
      );

      platformsToCheck.forEach(platform => {
        // Simulate random detection
        if (Math.random() > 0.9) { // 10% chance per interval
          const newRequest: VerificationRequest = {
            id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            platformId: platform.id,
            personaId: `persona-${Math.floor(Math.random() * 3) + 1}`,
            type: platform.supportedMethods[Math.floor(Math.random() * platform.supportedMethods.length)],
            status: 'detected',
            source: {
              url: `https://${platform.name.toLowerCase().replace(/\s+/g, '')}.com`,
              email: Math.random() > 0.5 ? `user.${Math.random().toString(36).substr(2, 8)}@tempmail.plus` : undefined,
              phoneNumber: Math.random() > 0.5 ? `+1-555-${Math.floor(Math.random() * 9000) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : undefined
            },
            metadata: {
              purpose: 'Auto-detected verification',
              priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
              maxAttempts: config.maxRetries,
              currentAttempt: 0
            },
            createdAt: new Date().toISOString(),
            detectedAt: new Date().toISOString()
          };

          setRequests(prev => [...prev, newRequest]);

          // Simulate extraction
          setTimeout(() => {
            setRequests(prev => prev.map(req => 
              req.id === newRequest.id 
                ? {
                    ...req,
                    status: 'extracting',
                    code: Math.random() > 0.2 ? Math.floor(Math.random() * 900000 + 100000).toString() : undefined,
                    link: Math.random() > 0.3 ? `https://example.com/verify?token=${Math.random().toString(36).substr(2, 16)}` : undefined
                  }
                : req
            ));
          }, 3000);

          // Simulate verification
          setTimeout(() => {
            const success = Math.random() > 0.15; // 85% success rate
            setRequests(prev => prev.map(req => 
              req.id === newRequest.id 
                ? {
                    ...req,
                    status: success ? 'completed' : 'failed',
                    completedAt: new Date().toISOString(),
                    result: {
                      success,
                      message: success ? 'Verification completed successfully' : 'Verification failed',
                      responseTime: Math.random() * 20 + 5,
                      error: success ? undefined : 'Invalid code or expired'
                    }
                  }
                : req
            ));
          }, 8000);
        }
      });
    }, config.detectionInterval * 1000);

    return () => clearInterval(interval);
  }, [config.autoDetection, config.detectionInterval, platforms, config.platforms.enabled]);

  // Auto verification simulation
  useEffect(() => {
    if (!config.autoVerification) return;

    const interval = setInterval(() => {
      setRequests(prev => prev.map(req => {
        if (req.status === 'extracting' && req.code && config.autoVerification) {
          // Auto-verify with extracted code
          return {
            ...req,
            status: 'verifying',
            metadata: {
              ...req.metadata,
              currentAttempt: req.metadata.currentAttempt + 1
            }
          };
        }
        return req;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [config.autoVerification]);

  // Update stats
  useEffect(() => {
    const completedRequests = requests.filter(r => r.status === 'completed').length;
    const failedRequests = requests.filter(r => r.status === 'failed').length;
    const successRate = requests.length > 0 ? (completedRequests / requests.length) * 100 : 0;
    const averageTime = requests.filter(r => r.result?.responseTime).length > 0
      ? requests.reduce((sum, r) => sum + (r.result?.responseTime || 0), 0) / requests.filter(r => r.result?.responseTime).length
      : 0;
    const activePlatforms = platforms.filter(p => p.isActive).length;

    setStats({
      totalRequests: requests.length,
      completedRequests,
      failedRequests,
      successRate,
      averageTime,
      activePlatforms
    });
  }, [requests, platforms]);

  const createManualRequest = (platformId: string, type: VerificationPlatform['supportedMethods'][number]) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return;

    const newRequest: VerificationRequest = {
      id: `req-${Date.now()}`,
      platformId,
      personaId: 'persona-1',
      type,
      status: 'pending',
      source: {
        url: `https://${platform.name.toLowerCase().replace(/\s+/g, '')}.com`
      },
      metadata: {
        purpose: 'Manual verification request',
        priority: 'medium',
        maxAttempts: config.maxRetries,
        currentAttempt: 0
      },
      createdAt: new Date().toISOString()
    };

    setRequests(prev => [...prev, newRequest]);
  };

  const retryRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? {
            ...req,
            status: 'pending',
            metadata: {
              ...req.metadata,
              currentAttempt: req.metadata.currentAttempt + 1
            }
          }
        : req
    ));
  };

  const deleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    if (selectedRequest?.id === requestId) {
      setSelectedRequest(null);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const exportRequests = () => {
    const exportData = {
      requests,
      platforms,
      config,
      stats,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ota-requests-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: VerificationRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-600';
      case 'detected': return 'bg-yellow-600';
      case 'extracting': return 'bg-blue-600';
      case 'verifying': return 'bg-purple-600';
      case 'completed': return 'bg-green-600';
      case 'failed': return 'bg-red-600';
      case 'expired': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: VerificationRequest['metadata']['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getFilteredRequests = () => {
    return requests.filter(request => {
      const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.source?.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.source?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.source?.phoneNumber?.includes(searchTerm);
      const matchesPlatform = filterPlatform === 'all' || platforms.find(p => p.id === request.platformId)?.name === filterPlatform;
      const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
      return matchesSearch && matchesPlatform && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            OTA Verifiers
          </h1>
          <p className="text-gray-400">
            Advanced OTA verification system for multiple platforms with automated detection
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Platforms</div>
                <div className="text-2xl font-bold">{stats.activePlatforms}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-2xl font-bold">{stats.completedRequests}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Failed</div>
                <div className="text-2xl font-bold">{stats.failedRequests}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Time</div>
                <div className="text-2xl font-bold">{stats.averageTime.toFixed(1)}s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Verification Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={exportRequests}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
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
              Total: {stats.totalRequests} | 
              Success Rate: {stats.successRate.toFixed(1)}% | 
              Auto Detection: {config.autoDetection ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Platforms and Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Verification Platforms</h3>
            <div className="space-y-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlatform?.id === platform.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${platform.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{platform.name}</h4>
                        <div className="text-sm text-gray-400">{platform.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${platform.type === 'email' ? 'bg-blue-600' : platform.type === 'sms' ? 'bg-green-600' : 'bg-purple-600'}`}>
                        {platform.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">Priority: {platform.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Total Verifications:</span> {platform.stats.totalVerifications}
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {platform.stats.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Average Time:</span> {platform.stats.averageTime.toFixed(1)}s
                    </div>
                    <div>
                      <span className="text-gray-400">Last Used:</span> {new Date(platform.stats.lastUsed).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {platform.features.autoDetect && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Auto-Detect</span>
                      )}
                      {platform.features.autoVerify && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">Auto-Verify</span>
                      )}
                      {platform.features.codeExtraction && (
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">Extraction</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      Methods: {platform.supportedMethods.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Verification Requests</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Platforms</option>
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.name}>{platform.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="detected">Detected</option>
                <option value="extracting">Extracting</option>
                <option value="verifying">Verifying</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {getFilteredRequests().map((request) => {
                const platform = platforms.find(p => p.id === request.platformId);
                return (
                  <div
                    key={request.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedRequest?.id === request.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(request.status)}`}>
                          {request.status.toUpperCase()}
                        </span>
                        <div>
                          <h4 className="font-semibold">{platform?.name || 'Unknown Platform'}</h4>
                          <div className="text-sm text-gray-400">{request.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(request.metadata.priority)}`}>
                          {request.metadata.priority.toUpperCase()}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRequest(request.id);
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
                        <span className="text-gray-400">Source:</span> 
                        <div>
                          {request.source.url && <div className="text-blue-400">{request.source.url}</div>}
                          {request.source.email && <div className="text-green-400">{request.source.email}</div>}
                          {request.source.phoneNumber && <div className="text-purple-400">{request.source.phoneNumber}</div>}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Purpose:</span> {request.metadata.purpose}
                      </div>
                      <div>
                        <span className="text-gray-400">Created:</span> {new Date(request.createdAt).toLocaleString()}
                      </div>
                      <div>
                        <span className="text-gray-400">Attempts:</span> {request.metadata.currentAttempt}/{request.metadata.maxAttempts}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {request.code && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyCode(request.code);
                            }}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                            title="Copy Code"
                          >
                            <Copy className="w-3 h-3 text-gray-400" />
                            <span className="font-mono">{request.code}</span>
                          </button>
                        )}
                        {request.link && (
                          <a
                            href={request.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white no-underline"
                            title="Open Link"
                          >
                            <Globe className="w-3 h-3" />
                            Open Link
                          </a>
                        )}
                        {request.backupCodes && request.backupCodes.length > 0 && (
                          <span className="px-2 py-1 bg-orange-600 rounded text-xs">
                            +{request.backupCodes.length} Backup
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400">
                        {request.detectedAt && `Detected: ${new Date(request.detectedAt).toLocaleString()}`}
                        {request.completedAt && `Completed: ${new Date(request.completedAt).toLocaleString()}`}
                      </div>
                    </div>

                    {request.result && (
                      <div className="p-2 bg-gray-800 rounded text-sm">
                        <div className={`font-medium ${request.result.success ? 'text-green-400' : 'text-red-400'}`}>
                          {request.result.success ? '✓ Success' : '✗ Failed'}
                        </div>
                        <div className="text-gray-400">{request.result.message}</div>
                        {request.result.responseTime && (
                          <div className="text-gray-400">Response Time: {request.result.responseTime.toFixed(1)}s</div>
                        )}
                        {request.result.error && (
                          <div className="text-red-400">Error: {request.result.error}</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {getFilteredRequests().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No verification requests found
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">OTA Verifier Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Detection Interval (seconds)</label>
                    <input
                      type="number"
                      value={config.detectionInterval}
                      onChange={(e) => setConfig(prev => ({ ...prev, detectionInterval: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Verification Timeout (seconds)</label>
                    <input
                      type="number"
                      value={config.verificationTimeout}
                      onChange={(e) => setConfig(prev => ({ ...prev, verificationTimeout: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="60"
                      max="1800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Retries</label>
                    <input
                      type="number"
                      value={config.maxRetries}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Retry Delay (seconds)</label>
                    <input
                      type="number"
                      value={config.retryDelay}
                      onChange={(e) => setConfig(prev => ({ ...prev, retryDelay: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400 mb-2">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoDetection}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoDetection: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Detection</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoVerification}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoVerification: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Verification</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryption}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, encryption: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encryption</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.proxyRotation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, proxyRotation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Proxy Rotation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400 mb-2">Enabled Platforms</h4>
                  <div className="space-y-2">
                    {platforms.map(platform => (
                      <label key={platform.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={config.platforms.enabled.includes(platform.name)}
                          onChange={(e) => setConfig(prev => ({ 
                            ...prev, 
                            platforms: { 
                              ...prev.platforms, 
                              enabled: e.target.checked 
                                ? [...prev.platforms.enabled, platform.name]
                                : prev.platforms.enabled.filter(p => p !== platform.name)
                            }
                          }))}
                          className="w-3 h-3 text-purple-600 rounded"
                        />
                        <span className="text-sm">{platform.name}</span>
                      </label>
                    ))}
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

export default OTAVerifiers;
