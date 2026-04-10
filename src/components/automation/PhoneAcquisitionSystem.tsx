/**
 * Phone Number Acquisition System Component
 * 
 * Advanced phone number acquisition system with VoIP and SMS verification
 * Supports multiple providers, virtual numbers, and automated verification
 */

import React, { useState, useEffect, useRef } from 'react';
import { Phone, RefreshCw, Download, Upload, Plus, Trash2, Copy, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Shield, Zap, Globe, MessageSquare } from 'lucide-react';

interface PhoneProvider {
  id: string;
  name: string;
  type: 'voip' | 'virtual' | 'sim' | 'toll_free';
  countries: string[];
  features: {
    sms: boolean;
    voice: boolean;
    mms: boolean;
    whatsapp: boolean;
    telegram: boolean;
    verification: boolean;
  };
  pricing: {
    setup: number; // USD
    monthly: number; // USD
    sms: number; // per message
    voice: number; // per minute
  };
  api: {
    endpoint: string;
    apiKey: string;
    rateLimit: number; // requests per minute
  };
  stats: {
    totalNumbers: number;
    activeNumbers: number;
    successRate: number;
    averageResponseTime: number; // seconds
  };
  isActive: boolean;
  priority: number;
}

interface PhoneNumber {
  id: string;
  number: string;
  countryCode: string;
  country: string;
  providerId: string;
  personaId?: string;
  type: 'mobile' | 'landline' | 'voip' | 'toll_free';
  status: 'active' | 'inactive' | 'expired' | 'banned' | 'pending';
  capabilities: {
    sms: boolean;
    voice: boolean;
    mms: boolean;
    whatsapp: boolean;
    telegram: boolean;
    verification: boolean;
  };
  usage: {
    totalSms: number;
    totalVoice: number;
    totalMms: number;
    lastUsed: string;
    monthlyUsage: number;
    cost: number;
  };
  verification: {
    isVerified: boolean;
    verifiedAt?: string;
    verificationMethod?: 'sms' | 'call' | 'whatsapp' | 'telegram';
    verificationCode?: string;
  };
  settings: {
    autoRenew: boolean;
    forwarding: {
      enabled: boolean;
      targetNumber?: string;
    };
    voicemail: {
      enabled: boolean;
      greeting?: string;
    };
    doNotDisturb: boolean;
  };
  createdAt: string;
  expiresAt?: string;
  lastModified: string;
}

interface VerificationRequest {
  id: string;
  phoneNumberId: string;
  service: string;
  type: 'sms' | 'call' | 'whatsapp' | 'telegram';
  status: 'pending' | 'sent' | 'received' | 'verified' | 'failed' | 'expired';
  code?: string;
  sentAt?: string;
  receivedAt?: string;
  expiresAt?: string;
  attempts: number;
  maxAttempts: number;
  metadata: {
    serviceName: string;
    purpose: string;
    priority: 'low' | 'medium' | 'high';
  };
}

interface PhoneConfig {
  autoAcquisition: boolean;
  preferredCountries: string[];
  maxNumbersPerPersona: number;
  autoVerification: boolean;
  verificationTimeout: number; // seconds
  retryAttempts: number;
  providers: {
    loadBalancing: boolean;
    failover: boolean;
    autoSelect: boolean;
  };
  security: {
    encryption: boolean;
    proxyUsage: boolean;
    anonymization: boolean;
    callRecording: boolean;
  };
  notifications: {
    smsReceived: boolean;
    lowBalance: boolean;
    expiringSoon: boolean;
    verificationReceived: boolean;
  };
}

const PhoneAcquisitionSystem: React.FC = () => {
  const [providers, setProviders] = useState<PhoneProvider[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [config, setConfig] = useState<PhoneConfig>({
    autoAcquisition: true,
    preferredCountries: ['US', 'UK', 'CA', 'AU'],
    maxNumbersPerPersona: 3,
    autoVerification: true,
    verificationTimeout: 300,
    retryAttempts: 3,
    providers: {
      loadBalancing: true,
      failover: true,
      autoSelect: true
    },
    security: {
      encryption: true,
      proxyUsage: true,
      anonymization: true,
      callRecording: false
    },
    notifications: {
      smsReceived: true,
      lowBalance: true,
      expiringSoon: true,
      verificationReceived: true
    }
  });
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<PhoneProvider | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalNumbers: 0,
    activeNumbers: 0,
    totalSms: 0,
    totalVoice: 0,
    averageCost: 0,
    verificationSuccess: 0,
    verificationFailed: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock phone providers initialization
  useEffect(() => {
    const mockProviders: PhoneProvider[] = [
      {
        id: '1',
        name: 'Twilio Virtual',
        type: 'voip',
        countries: ['US', 'UK', 'CA', 'AU', 'DE', 'FR'],
        features: {
          sms: true,
          voice: true,
          mms: true,
          whatsapp: false,
          telegram: false,
          verification: true
        },
        pricing: {
          setup: 1.00,
          monthly: 15.00,
          sms: 0.0079,
          voice: 0.013
        },
        api: {
          endpoint: 'https://api.twilio.com',
          apiKey: 'demo_twilio_key',
          rateLimit: 100
        },
        stats: {
          totalNumbers: 450,
          activeNumbers: 89,
          successRate: 98.7,
          averageResponseTime: 1.2
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Nexmo VOIP',
        type: 'voip',
        countries: ['US', 'UK', 'CA', 'AU', 'ES', 'IT'],
        features: {
          sms: true,
          voice: true,
          mms: false,
          whatsapp: true,
          telegram: false,
          verification: true
        },
        pricing: {
          setup: 0.50,
          monthly: 12.00,
          sms: 0.0065,
          voice: 0.010
        },
        api: {
          endpoint: 'https://rest.nexmo.com',
          apiKey: 'demo_nexmo_key',
          rateLimit: 80
        },
        stats: {
          totalNumbers: 320,
          activeNumbers: 67,
          successRate: 97.2,
          averageResponseTime: 1.5
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'VirtualSIM Pro',
        type: 'virtual',
        countries: ['US', 'UK', 'CA', 'AU'],
        features: {
          sms: true,
          voice: true,
          mms: true,
          whatsapp: true,
          telegram: true,
          verification: true
        },
        pricing: {
          setup: 0.00,
          monthly: 8.00,
          sms: 0.0055,
          voice: 0.008
        },
        api: {
          endpoint: 'https://api.virtualsimpro.com',
          apiKey: 'demo_virtualsim_key',
          rateLimit: 60
        },
        stats: {
          totalNumbers: 180,
          activeNumbers: 45,
          successRate: 95.8,
          averageResponseTime: 2.1
        },
        isActive: true,
        priority: 3
      }
    ];

    setProviders(mockProviders);
  }, []);

  // Mock phone numbers initialization
  useEffect(() => {
    const mockPhoneNumbers: PhoneNumber[] = [
      {
        id: 'phone-1',
        number: '+1-555-0123-4567',
        countryCode: '+1',
        country: 'US',
        providerId: '1',
        personaId: 'persona-1',
        type: 'voip',
        status: 'active',
        capabilities: {
          sms: true,
          voice: true,
          mms: true,
          whatsapp: false,
          telegram: false,
          verification: true
        },
        usage: {
          totalSms: 156,
          totalVoice: 45,
          totalMms: 12,
          lastUsed: new Date(Date.now() - 3600000).toISOString(),
          monthlyUsage: 23,
          cost: 18.45
        },
        verification: {
          isVerified: true,
          verifiedAt: new Date(Date.now() - 86400000).toISOString(),
          verificationMethod: 'sms'
        },
        settings: {
          autoRenew: true,
          forwarding: {
            enabled: true,
            targetNumber: '+1-555-999-8888'
          },
          voicemail: {
            enabled: true,
            greeting: 'Hello, this is the voicemail of John Anderson. Please leave a message.'
          },
          doNotDisturb: false
        },
        createdAt: '2024-01-15T00:00:00Z',
        expiresAt: '2025-01-15T00:00:00Z',
        lastModified: new Date().toISOString()
      },
      {
        id: 'phone-2',
        number: '+44-20-7123-4567',
        countryCode: '+44',
        country: 'UK',
        providerId: '2',
        personaId: 'persona-2',
        type: 'voip',
        status: 'active',
        capabilities: {
          sms: true,
          voice: true,
          mms: false,
          whatsapp: true,
          telegram: false,
          verification: true
        },
        usage: {
          totalSms: 89,
          totalVoice: 23,
          totalMms: 0,
          lastUsed: new Date(Date.now() - 7200000).toISOString(),
          monthlyUsage: 15,
          cost: 12.30
        },
        verification: {
          isVerified: true,
          verifiedAt: new Date(Date.now() - 43200000).toISOString(),
          verificationMethod: 'sms'
        },
        settings: {
          autoRenew: false,
          forwarding: {
            enabled: false
          },
          voicemail: {
            enabled: true,
            greeting: 'You have reached the voicemail of Sarah Johnson.'
          },
          doNotDisturb: true
        },
        createdAt: '2024-02-20T00:00:00Z',
        expiresAt: '2025-02-20T00:00:00Z',
        lastModified: new Date().toISOString()
      }
    ];

    setPhoneNumbers(mockPhoneNumbers);
  }, []);

  // Mock verification requests
  useEffect(() => {
    const mockRequests: VerificationRequest[] = [
      {
        id: 'req-1',
        phoneNumberId: 'phone-1',
        service: 'FreeBitcoin',
        type: 'sms',
        status: 'verified',
        code: '123456',
        sentAt: new Date(Date.now() - 1800000).toISOString(),
        receivedAt: new Date(Date.now() - 1750000).toISOString(),
        expiresAt: new Date(Date.now() + 300000).toISOString(),
        attempts: 1,
        maxAttempts: 3,
        metadata: {
          serviceName: 'FreeBitcoin',
          purpose: 'Account verification',
          priority: 'high'
        }
      },
      {
        id: 'req-2',
        phoneNumberId: 'phone-2',
        service: 'Cointiply',
        type: 'sms',
        status: 'pending',
        sentAt: new Date(Date.now() - 300000).toISOString(),
        expiresAt: new Date(Date.now() + 2700000).toISOString(),
        attempts: 1,
        maxAttempts: 3,
        metadata: {
          serviceName: 'Cointiply',
          purpose: 'Phone verification',
          priority: 'medium'
        }
      }
    ];

    setVerificationRequests(mockRequests);
  }, []);

  // Auto acquisition simulation
  useEffect(() => {
    if (!config.autoAcquisition) return;

    const interval = setInterval(() => {
      // Simulate checking for new verification requests
      setVerificationRequests(prev => prev.map(req => {
        if (req.status === 'sent' && Date.now() > new Date(req.expiresAt || '').getTime()) {
          return { ...req, status: 'expired' };
        }
        return req;
      }));
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [config.autoAcquisition]);

  // Update stats
  useEffect(() => {
    const activeNumbers = phoneNumbers.filter(n => n.status === 'active').length;
    const totalSms = phoneNumbers.reduce((sum, n) => sum + n.usage.totalSms, 0);
    const totalVoice = phoneNumbers.reduce((sum, n) => sum + n.usage.totalVoice, 0);
    const averageCost = phoneNumbers.length > 0 
      ? phoneNumbers.reduce((sum, n) => sum + n.usage.cost, 0) / phoneNumbers.length 
      : 0;
    const verificationSuccess = verificationRequests.filter(r => r.status === 'verified').length;
    const verificationFailed = verificationRequests.filter(r => r.status === 'failed' || r.status === 'expired').length;

    setStats({
      totalNumbers: phoneNumbers.length,
      activeNumbers,
      totalSms,
      totalVoice,
      averageCost,
      verificationSuccess,
      verificationFailed
    });
  }, [phoneNumbers, verificationRequests]);

  const acquireNumber = () => {
    const activeProviders = providers.filter(p => p.isActive);
    if (activeProviders.length === 0) return;

    let selectedProvider: PhoneProvider;
    
    if (config.providers.autoSelect) {
      selectedProvider = activeProviders.reduce((min, provider) => 
        provider.pricing.monthly < min.pricing.monthly ? provider : min
      );
    } else {
      selectedProvider = activeProviders[Math.floor(Math.random() * activeProviders.length)];
    }

    const availableCountries = config.preferredCountries.filter(country => 
      selectedProvider.countries.includes(country)
    );

    const selectedCountry = availableCountries.length > 0 
      ? availableCountries[Math.floor(Math.random() * availableCountries.length)]
      : selectedProvider.countries[Math.floor(Math.random() * selectedProvider.countries.length)];

    const countryCode = getCountryCode(selectedCountry);
    const randomNumber = generateRandomNumber(countryCode);

    const newNumber: PhoneNumber = {
      id: `phone-${Date.now()}`,
      number: randomNumber,
      countryCode,
      country: selectedCountry,
      providerId: selectedProvider.id,
      type: 'voip',
      status: 'pending',
      capabilities: selectedProvider.features,
      usage: {
        totalSms: 0,
        totalVoice: 0,
        totalMms: 0,
        lastUsed: new Date().toISOString(),
        monthlyUsage: 0,
        cost: selectedProvider.pricing.setup
      },
      verification: {
        isVerified: false
      },
      settings: {
        autoRenew: true,
        forwarding: {
          enabled: false
        },
        voicemail: {
          enabled: true
        },
        doNotDisturb: false
      },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setPhoneNumbers(prev => [...prev, newNumber]);
    setShowCreateForm(false);
  };

  const getCountryCode = (country: string): string => {
    const countryCodes: Record<string, string> = {
      'US': '+1',
      'UK': '+44',
      'CA': '+1',
      'AU': '+61',
      'DE': '+49',
      'FR': '+33',
      'ES': '+34',
      'IT': '+39'
    };
    return countryCodes[country] || '+1';
  };

  const generateRandomNumber = (countryCode: string): string => {
    const formats: Record<string, () => string> = {
      '+1': () => `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      '+44': () => `+44-20-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 900) + 100}`,
      '+61': () => `+61-${Math.floor(Math.random() * 400) + 200}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 100}`,
      '+49': () => `+49-${Math.floor(Math.random() * 100) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      '+33': () => `+33-${Math.floor(Math.random() * 100) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      '+34': () => `+34-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 100}`,
      '+39': () => `+39-${Math.floor(Math.random() * 300) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
    };
    return formats[countryCode]?.() || '+1-555-0123-4567';
  };

  const deleteNumber = (numberId: string) => {
    setPhoneNumbers(prev => prev.filter(n => n.id !== numberId));
    if (selectedNumber?.id === numberId) {
      setSelectedNumber(null);
    }
  };

  const requestVerification = (numberId: string, service: string, type: VerificationRequest['type']) => {
    const newRequest: VerificationRequest = {
      id: `req-${Date.now()}`,
      phoneNumberId: numberId,
      service,
      type,
      status: 'pending',
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + config.verificationTimeout * 1000).toISOString(),
      attempts: 1,
      maxAttempts: config.retryAttempts,
      metadata: {
        serviceName: service,
        purpose: 'Account verification',
        priority: 'high'
      }
    };

    setVerificationRequests(prev => [...prev, newRequest]);

    // Simulate sending verification
    setTimeout(() => {
      setVerificationRequests(prev => prev.map(req => 
        req.id === newRequest.id 
          ? { ...req, status: 'sent', sentAt: new Date().toISOString() }
          : req
      ));
    }, 2000);

    // Simulate receiving verification
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      const code = success ? Math.floor(Math.random() * 900000 + 100000).toString() : undefined;

      setVerificationRequests(prev => prev.map(req => 
        req.id === newRequest.id 
          ? { 
              ...req, 
              status: success ? 'received' : 'failed',
              receivedAt: new Date().toISOString(),
              code,
              attempts: req.attempts + 1
            }
          : req
      ));

      if (success) {
        // Update phone number verification status
        setPhoneNumbers(prev => prev.map(phone => 
          phone.id === numberId 
            ? {
                ...phone,
                verification: {
                  isVerified: true,
                  verifiedAt: new Date().toISOString(),
                  verificationMethod: type,
                  verificationCode: code
                }
              }
            : phone
        ));
      }
    }, 8000);
  };

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
  };

  const exportNumbers = () => {
    const exportData = {
      phoneNumbers,
      verificationRequests,
      config,
      stats,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phone-numbers-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: PhoneNumber['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-gray-600';
      case 'expired': return 'bg-red-600';
      case 'banned': return 'bg-orange-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getVerificationStatusColor = (status: VerificationRequest['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-600';
      case 'received': return 'bg-blue-600';
      case 'sent': return 'bg-purple-600';
      case 'pending': return 'bg-yellow-600';
      case 'failed': return 'bg-red-600';
      case 'expired': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredNumbers = () => {
    return phoneNumbers.filter(number => {
      const matchesSearch = number.number.includes(searchTerm) ||
                           number.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = filterCountry === 'all' || number.country === filterCountry;
      const matchesStatus = filterStatus === 'all' || number.status === filterStatus;
      return matchesSearch && matchesCountry && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Phone className="w-8 h-8 text-purple-400" />
            Phone Number Acquisition System
          </h1>
          <p className="text-gray-400">
            Advanced phone number acquisition system with VoIP and SMS verification
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Numbers</div>
                <div className="text-2xl font-bold">{stats.activeNumbers}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total SMS</div>
                <div className="text-2xl font-bold">{stats.totalSms}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Total Voice</div>
                <div className="text-2xl font-bold">{stats.totalVoice}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Verification Success</div>
                <div className="text-2xl font-bold">{stats.verificationSuccess}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Cost</div>
                <div className="text-2xl font-bold">${stats.averageCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Phone Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={acquireNumber}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Acquire Number
              </button>
              <button
                onClick={exportNumbers}
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
              Total: {stats.totalNumbers} | 
              Success Rate: {stats.totalNumbers > 0 ? ((stats.verificationSuccess / (stats.verificationSuccess + stats.verificationFailed)) * 100).toFixed(1) : 0}% | 
              Auto Acquisition: {config.autoAcquisition ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Phone Numbers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Phone Numbers</h3>
            <div className="space-y-3">
              {getFilteredNumbers().map((number) => (
                <div
                  key={number.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedNumber?.id === number.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedNumber(number)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(number.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{number.number}</h4>
                        <div className="text-sm text-gray-400">{number.country} ({number.type})</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {number.verification.isVerified && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Verified</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyNumber(number.number);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy Number"
                      >
                        <Copy className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNumber(number.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Provider:</span> {providers.find(p => p.id === number.providerId)?.name}
                    </div>
                    <div>
                      <span className="text-gray-400">Usage:</span> {number.usage.monthlyUsage} SMS/{number.usage.totalVoice} Voice
                    </div>
                    <div>
                      <span className="text-gray-400">Cost:</span> ${number.usage.cost.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-400">Created:</span> {new Date(number.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {number.capabilities.sms && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">SMS</span>
                      )}
                      {number.capabilities.voice && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Voice</span>
                      )}
                      {number.capabilities.whatsapp && (
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">WhatsApp</span>
                      )}
                      {number.capabilities.verification && (
                        <span className="px-2 py-1 bg-yellow-600 rounded text-xs">Verification</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      Modified: {new Date(number.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Number Details */}
          {selectedNumber && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Number Details: {selectedNumber.number}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  {/* Number Info */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Number Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Country:</span> {selectedNumber.country}</div>
                      <div><span className="text-gray-400">Type:</span> {selectedNumber.type}</div>
                      <div><span className="text-gray-400">Provider:</span> {providers.find(p => p.id === selectedNumber.providerId)?.name}</div>
                      <div><span className="text-gray-400">Status:</span> 
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedNumber.status)}`}>
                          {selectedNumber.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Usage Statistics</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Total SMS:</span> {selectedNumber.usage.totalSms}</div>
                      <div><span className="text-gray-400">Total Voice:</span> {selectedNumber.usage.totalVoice}</div>
                      <div><span className="text-gray-400">Monthly Usage:</span> {selectedNumber.usage.monthlyUsage}</div>
                      <div><span className="text-gray-400">Total Cost:</span> ${selectedNumber.usage.cost.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Verification Status</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Verified:</span> {selectedNumber.verification.isVerified ? 'Yes' : 'No'}</div>
                      <div><span className="text-gray-400">Method:</span> {selectedNumber.verification.verificationMethod || 'N/A'}</div>
                      {selectedNumber.verification.verifiedAt && (
                        <div><span className="text-gray-400">Verified At:</span> {new Date(selectedNumber.verification.verifiedAt).toLocaleString()}</div>
                      )}
                      {selectedNumber.verification.verificationCode && (
                        <div><span className="text-gray-400">Last Code:</span> {selectedNumber.verification.verificationCode}</div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => requestVerification(selectedNumber.id, 'Test Service', 'sms')}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      <MessageSquare className="w-3 h-3" />
                      SMS Verification
                    </button>
                    <button
                      onClick={() => requestVerification(selectedNumber.id, 'Test Service', 'call')}
                      className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                    >
                      <Phone className="w-3 h-3" />
                      Call Verification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Requests */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Verification Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3">Phone Number</th>
                  <th className="text-left py-2 px-3">Service</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Code</th>
                  <th className="text-left py-2 px-3">Sent</th>
                  <th className="text-left py-2 px-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests.map((request) => {
                  const phoneNumber = phoneNumbers.find(n => n.id === request.phoneNumberId);
                  return (
                    <tr key={request.id} className="border-b border-gray-700">
                      <td className="py-2 px-3">{phoneNumber?.number || 'Unknown'}</td>
                      <td className="py-2 px-3">{request.metadata.serviceName}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs capitalize">
                          {request.type}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs ${getVerificationStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">{request.code || '-'}</td>
                      <td className="py-2 px-3">
                        {request.sentAt ? new Date(request.sentAt).toLocaleString() : '-'}
                      </td>
                      <td className="py-2 px-3">
                        {request.receivedAt ? new Date(request.receivedAt).toLocaleString() : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {verificationRequests.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No verification requests
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Phone System Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Numbers per Persona</label>
                    <input
                      type="number"
                      value={config.maxNumbersPerPersona}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxNumbersPerPersona: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10"
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
                    <label className="block text-sm font-medium mb-2">Retry Attempts</label>
                    <input
                      type="number"
                      value={config.retryAttempts}
                      onChange={(e) => setConfig(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
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
                        checked={config.autoAcquisition}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoAcquisition: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Acquisition</span>
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
                        checked={config.providers.loadBalancing}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, loadBalancing: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Load Balancing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.providers.failover}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          providers: { ...prev.providers, failover: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Failover</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
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
                        checked={config.security.proxyUsage}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, proxyUsage: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Proxy Usage</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.anonymization}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, anonymization: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Anonymization</span>
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

export default PhoneAcquisitionSystem;
