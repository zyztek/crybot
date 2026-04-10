/**
 * Temporary Email System Component
 * 
 * Advanced temporary email system with multiple providers and auto-verification
 * Supports email generation, inbox management, and automated verification
 */

import React, { useState, useEffect, useRef } from 'react';
import { Mail, RefreshCw, Download, Upload, Trash2, Copy, Eye, EyeOff, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Shield, Zap, Globe } from 'lucide-react';

interface EmailProvider {
  id: string;
  name: string;
  domain: string;
  apiEndpoint: string;
  apiKey: string;
  features: {
    customAlias: boolean;
    autoDelete: boolean;
    attachmentSupport: boolean;
    forwarding: boolean;
    encryption: boolean;
  };
  pricing: {
    freeEmails: number;
    freeDuration: number; // hours
    paidPlans: Array<{
      name: string;
      emails: number;
      duration: number; // hours
      price: number; // USD
    }>;
  };
  stats: {
    totalEmails: number;
    activeEmails: number;
    successRate: number;
    averageResponseTime: number; // seconds
  };
  isActive: boolean;
  priority: number;
}

interface TempEmail {
  id: string;
  email: string;
  alias?: string;
  providerId: string;
  personaId?: string;
  status: 'active' | 'expired' | 'deleted' | 'banned';
  createdAt: string;
  expiresAt: string;
  lastChecked: string;
  autoDelete: boolean;
  isEncrypted: boolean;
  forwarding: {
    enabled: boolean;
    targetEmail?: string;
  };
  inbox: EmailMessage[];
  settings: {
    notifications: boolean;
    autoVerify: boolean;
    spamFilter: boolean;
    whitelist: string[];
  };
}

interface EmailMessage {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  htmlBody?: string;
  attachments: Array<{
    filename: string;
    size: number;
    type: string;
    data: string; // base64
  }>;
  receivedAt: string;
  read: boolean;
  category: 'primary' | 'social' | 'promotions' | 'updates' | 'spam' | 'verification';
  isVerification: boolean;
  verificationCode?: string;
  verificationLink?: string;
  actionRequired: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  spamScore: number; // 0-100
}

interface MailConfig {
  autoRefresh: boolean;
  refreshInterval: number; // seconds
  defaultDuration: number; // hours
  autoDelete: boolean;
  notificationSound: boolean;
  desktopNotifications: boolean;
  emailNotifications: boolean;
  providers: {
    autoSelect: boolean;
    loadBalancing: boolean;
    failover: boolean;
  };
  security: {
    encryption: boolean;
    twoFactor: boolean;
    proxyUsage: boolean;
    anonymity: boolean;
  };
  verification: {
    autoDetect: boolean;
    autoClick: boolean;
    patternMatching: boolean;
    customPatterns: string[];
  };
}

const TempMailSystem: React.FC = () => {
  const [providers, setProviders] = useState<EmailProvider[]>([]);
  const [emails, setEmails] = useState<TempEmail[]>([]);
  const [config, setConfig] = useState<MailConfig>({
    autoRefresh: true,
    refreshInterval: 30,
    defaultDuration: 24,
    autoDelete: true,
    notificationSound: true,
    desktopNotifications: true,
    emailNotifications: false,
    providers: {
      autoSelect: true,
      loadBalancing: true,
      failover: true
    },
    security: {
      encryption: true,
      twoFactor: false,
      proxyUsage: true,
      anonymity: true
    },
    verification: {
      autoDetect: true,
      autoClick: false,
      patternMatching: true,
      customPatterns: [
        'verification code',
        'confirm your email',
        'verify your account',
        'activation code',
        'otp',
        'one-time password'
      ]
    }
  });
  const [selectedEmail, setSelectedEmail] = useState<TempEmail | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({
    totalEmails: 0,
    activeEmails: 0,
    totalMessages: 0,
    unreadMessages: 0,
    verificationCodes: 0,
    averageLifetime: 0, // hours
    successRate: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock email providers initialization
  useEffect(() => {
    const mockProviders: EmailProvider[] = [
      {
        id: '1',
        name: 'TempMail Plus',
        domain: 'tempmail.plus',
        apiEndpoint: 'https://api.tempmail.plus',
        apiKey: 'demo_key_tempmail_plus',
        features: {
          customAlias: true,
          autoDelete: true,
          attachmentSupport: true,
          forwarding: true,
          encryption: true
        },
        pricing: {
          freeEmails: 5,
          freeDuration: 24,
          paidPlans: [
            { name: 'Basic', emails: 10, duration: 48, price: 2.99 },
            { name: 'Pro', emails: 25, duration: 72, price: 7.99 },
            { name: 'Enterprise', emails: 100, duration: 168, price: 19.99 }
          ]
        },
        stats: {
          totalEmails: 1250,
          activeEmails: 15,
          successRate: 98.5,
          averageResponseTime: 2.3
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: '10MinuteMail',
        domain: '10minutemail.com',
        apiEndpoint: 'https://api.10minutemail.com',
        apiKey: 'demo_key_10min',
        features: {
          customAlias: false,
          autoDelete: true,
          attachmentSupport: false,
          forwarding: false,
          encryption: false
        },
        pricing: {
          freeEmails: 3,
          freeDuration: 10,
          paidPlans: [
            { name: 'Extended', emails: 5, duration: 60, price: 1.99 }
          ]
        },
        stats: {
          totalEmails: 890,
          activeEmails: 8,
          successRate: 96.2,
          averageResponseTime: 3.1
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'Guerrilla Mail',
        domain: 'guerrillamail.com',
        apiEndpoint: 'https://api.guerrillamail.com',
        apiKey: 'demo_key_guerrilla',
        features: {
          customAlias: true,
          autoDelete: true,
          attachmentSupport: true,
          forwarding: true,
          encryption: false
        },
        pricing: {
          freeEmails: 2,
          freeDuration: 60,
          paidPlans: [
            { name: 'Premium', emails: 10, duration: 120, price: 4.99 }
          ]
        },
        stats: {
          totalEmails: 650,
          activeEmails: 5,
          successRate: 94.8,
          averageResponseTime: 2.8
        },
        isActive: true,
        priority: 3
      }
    ];

    setProviders(mockProviders);
  }, []);

  // Mock emails initialization
  useEffect(() => {
    const mockEmails: TempEmail[] = [
      {
        id: 'email-1',
        email: 'john.doe.12345@tempmail.plus',
        alias: 'johndoe.crypto',
        providerId: '1',
        personaId: 'persona-1',
        status: 'active',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        expiresAt: new Date(Date.now() + 82800000).toISOString(), // 23 hours
        lastChecked: new Date().toISOString(),
        autoDelete: true,
        isEncrypted: true,
        forwarding: {
          enabled: true,
          targetEmail: 'real.email@example.com'
        },
        inbox: [
          {
            id: 'msg-1',
            from: 'noreply@freebitco.in',
            to: 'john.doe.12345@tempmail.plus',
            subject: 'Verify your email address',
            body: 'Please click the link below to verify your email address: https://freebitco.in/verify?token=abc123',
            receivedAt: new Date(Date.now() - 1800000).toISOString(),
            read: false,
            category: 'verification',
            isVerification: true,
            verificationCode: '123456',
            verificationLink: 'https://freebitco.in/verify?token=abc123',
            actionRequired: true,
            priority: 'high',
            spamScore: 5
          },
          {
            id: 'msg-2',
            from: 'support@cointiply.com',
            to: 'john.doe.12345@tempmail.plus',
            subject: 'Welcome to Cointiply!',
            body: 'Thank you for joining Cointiply! Here are some tips to get started...',
            htmlBody: '<h1>Welcome to Cointiply!</h1><p>Thank you for joining...</p>',
            receivedAt: new Date(Date.now() - 3600000).toISOString(),
            read: true,
            category: 'primary',
            isVerification: false,
            actionRequired: false,
            priority: 'normal',
            spamScore: 10
          }
        ],
        settings: {
          notifications: true,
          autoVerify: true,
          spamFilter: true,
          whitelist: ['noreply@freebitco.in', 'support@cointiply.com']
        }
      },
      {
        id: 'email-2',
        email: 'temp.67890@10minutemail.com',
        providerId: '2',
        personaId: 'persona-2',
        status: 'active',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        expiresAt: new Date(Date.now() + 540000).toISOString(), // 8 minutes
        lastChecked: new Date().toISOString(),
        autoDelete: true,
        isEncrypted: false,
        forwarding: {
          enabled: false
        },
        inbox: [],
        settings: {
          notifications: true,
          autoVerify: false,
          spamFilter: true,
          whitelist: []
        }
      }
    ];

    setEmails(mockEmails);
  }, []);

  // Auto refresh simulation
  useEffect(() => {
    if (!config.autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate email checking
      setEmails(prev => prev.map(email => ({
        ...email,
        lastChecked: new Date().toISOString(),
        // Randomly add new messages
        inbox: Math.random() > 0.8 ? [
          ...email.inbox,
          {
            id: `msg-${Date.now()}`,
            from: 'new.sender@example.com',
            to: email.email,
            subject: 'New message from faucet',
            body: 'You have a new message from the faucet service.',
            receivedAt: new Date().toISOString(),
            read: false,
            category: 'primary',
            isVerification: Math.random() > 0.5,
            verificationCode: Math.random() > 0.5 ? Math.floor(Math.random() * 900000 + 100000).toString() : undefined,
            actionRequired: false,
            priority: 'normal',
            spamScore: Math.random() * 20
          }
        ] : email.inbox
      })));
    }, config.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [config.autoRefresh, config.refreshInterval]);

  // Update stats
  useEffect(() => {
    const activeEmails = emails.filter(e => e.status === 'active').length;
    const totalMessages = emails.reduce((sum, e) => sum + e.inbox.length, 0);
    const unreadMessages = emails.reduce((sum, e) => sum + e.inbox.filter(m => !m.read).length, 0);
    const verificationCodes = emails.reduce((sum, e) => 
      sum + e.inbox.filter(m => m.isVerification).length, 0
    );
    const averageLifetime = emails.length > 0 
      ? emails.reduce((sum, e) => {
          const lifetime = (new Date(e.expiresAt).getTime() - new Date(e.createdAt).getTime()) / (1000 * 60 * 60);
          return sum + lifetime;
        }, 0) / emails.length
      : 0;

    setStats({
      totalEmails: emails.length,
      activeEmails,
      totalMessages,
      unreadMessages,
      verificationCodes,
      averageLifetime,
      successRate: 95.5 // Mock success rate
    });
  }, [emails]);

  const createEmail = () => {
    const activeProviders = providers.filter(p => p.isActive);
    if (activeProviders.length === 0) return;

    let selectedProvider: EmailProvider;
    
    if (config.providers.autoSelect) {
      selectedProvider = activeProviders.reduce((min, provider) => 
        provider.stats.averageResponseTime < min.stats.averageResponseTime ? provider : min
      );
    } else {
      selectedProvider = activeProviders[Math.floor(Math.random() * activeProviders.length)];
    }

    const randomString = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now().toString().substring(-4);
    
    const newEmail: TempEmail = {
      id: `email-${Date.now()}`,
      email: `user.${randomString}${timestamp}@${selectedProvider.domain}`,
      providerId: selectedProvider.id,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (config.defaultDuration * 60 * 60 * 1000)).toISOString(),
      lastChecked: new Date().toISOString(),
      autoDelete: config.autoDelete,
      isEncrypted: config.security.encryption,
      forwarding: {
        enabled: false
      },
      inbox: [],
      settings: {
        notifications: true,
        autoVerify: config.verification.autoDetect,
        spamFilter: true,
        whitelist: []
      }
    };

    setEmails(prev => [...prev, newEmail]);
    setShowCreateForm(false);
  };

  const deleteEmail = (emailId: string) => {
    setEmails(prev => prev.filter(e => e.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const extendEmail = (emailId: string, hours: number) => {
    setEmails(prev => prev.map(e => 
      e.id === emailId 
        ? { ...e, expiresAt: new Date(Date.now() + (hours * 60 * 60 * 1000)).toISOString() }
        : e
    ));
  };

  const markAsRead = (emailId: string, messageId: string) => {
    setEmails(prev => prev.map(e => 
      e.id === emailId 
        ? { 
            ...e, 
            inbox: e.inbox.map(m => 
              m.id === messageId ? { ...m, read: true } : m
            )
          }
        : e
    ));
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const exportEmails = () => {
    const exportData = {
      emails,
      config,
      stats,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `temp-emails-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredMessages = (email: TempEmail) => {
    return email.inbox.filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.body.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getCategoryColor = (category: EmailMessage['category']) => {
    switch (category) {
      case 'primary': return 'bg-blue-600';
      case 'social': return 'bg-purple-600';
      case 'promotions': return 'bg-orange-600';
      case 'updates': return 'bg-green-600';
      case 'verification': return 'bg-red-600';
      case 'spam': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: EmailMessage['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'normal': return 'text-blue-400';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: TempEmail['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'expired': return 'bg-red-600';
      case 'deleted': return 'bg-gray-600';
      case 'banned': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Mail className="w-8 h-8 text-purple-400" />
            Temporary Email System
          </h1>
          <p className="text-gray-400">
            Advanced temporary email system with multiple providers and auto-verification
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Emails</div>
                <div className="text-2xl font-bold">{stats.activeEmails}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Messages</div>
                <div className="text-2xl font-bold">{stats.totalMessages}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Unread</div>
                <div className="text-2xl font-bold">{stats.unreadMessages}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Verification Codes</div>
                <div className="text-2xl font-bold">{stats.verificationCodes}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Lifetime</div>
                <div className="text-2xl font-bold">{stats.averageLifetime.toFixed(1)}h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Email Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={createEmail}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Create Email
              </button>
              <button
                onClick={exportEmails}
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
              Total: {stats.totalEmails} | 
              Success Rate: {stats.successRate.toFixed(1)}% | 
              Auto Refresh: {config.autoRefresh ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Email List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Temporary Emails</h3>
            <div className="space-y-3">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedEmail?.id === email.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(email.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{email.email}</h4>
                        {email.alias && (
                          <div className="text-sm text-gray-400">Alias: {email.alias}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyEmail(email.email);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy Email"
                      >
                        <Copy className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEmail(email.id);
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
                      <span className="text-gray-400">Provider:</span> {providers.find(p => p.id === email.providerId)?.name}
                    </div>
                    <div>
                      <span className="text-gray-400">Created:</span> {new Date(email.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Expires:</span> {new Date(email.expiresAt).toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Messages:</span> {email.inbox.length} ({email.inbox.filter(m => !m.read).length} unread)
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {email.isEncrypted && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Encrypted</span>
                      )}
                      {email.forwarding.enabled && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">Forwarding</span>
                      )}
                      {email.settings.autoVerify && (
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">Auto-Verify</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      Time left: {Math.max(0, Math.floor((new Date(email.expiresAt).getTime() - Date.now()) / (1000 * 60)))}min
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Email Details */}
          {selectedEmail && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Email Details: {selectedEmail.email}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                {/* Email Actions */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => copyEmail(selectedEmail.email)}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={() => extendEmail(selectedEmail.id, 24)}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                  >
                    <Clock className="w-3 h-3" />
                    Extend 24h
                  </button>
                  <button
                    onClick={() => deleteEmail(selectedEmail.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>

                {/* Email Info */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Provider:</span> {providers.find(p => p.id === selectedEmail.providerId)?.name}
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span> 
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedEmail.status)}`}>
                      {selectedEmail.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Created:</span> {new Date(selectedEmail.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-400">Expires:</span> {new Date(selectedEmail.expiresAt).toLocaleString()}
                  </div>
                </div>

                {/* Message Search and Filter */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="primary">Primary</option>
                    <option value="social">Social</option>
                    <option value="promotions">Promotions</option>
                    <option value="verification">Verification</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                {/* Message List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {getFilteredMessages(selectedEmail).map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        message.read ? 'bg-gray-700' : 'bg-gray-600'
                      }`}
                      onClick={() => markAsRead(selectedEmail.id, message.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(message.category)}`}>
                            {message.category}
                          </span>
                          {message.isVerification && (
                            <span className="px-2 py-1 bg-red-600 rounded text-xs">Verification</span>
                          )}
                          <span className={`text-sm ${getPriorityColor(message.priority)}`}>
                            {message.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(message.receivedAt).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="text-sm mb-2">
                        <div className="font-medium">{message.subject}</div>
                        <div className="text-gray-400">From: {message.from}</div>
                      </div>

                      {message.isVerification && (
                        <div className="p-2 bg-gray-800 rounded text-sm">
                          <div className="text-yellow-400">
                            <strong>Verification Code:</strong> {message.verificationCode}
                          </div>
                          {message.verificationLink && (
                            <div className="mt-1">
                              <strong>Link:</strong> 
                              <a href={message.verificationLink} className="text-blue-400 hover:underline ml-1">
                                {message.verificationLink}
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-400 mt-2">
                        {message.body.substring(0, 100)}{message.body.length > 100 ? '...' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Email System Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Refresh Interval (seconds)</label>
                    <input
                      type="number"
                      value={config.refreshInterval}
                      onChange={(e) => setConfig(prev => ({ ...prev, refreshInterval: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="10"
                      max="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Duration (hours)</label>
                    <input
                      type="number"
                      value={config.defaultDuration}
                      onChange={(e) => setConfig(prev => ({ ...prev, defaultDuration: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="168"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoRefresh}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoRefresh: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Refresh</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoDelete}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoDelete: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Delete</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.desktopNotifications}
                        onChange={(e) => setConfig(prev => ({ ...prev, desktopNotifications: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Desktop Notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.emailNotifications}
                        onChange={(e) => setConfig(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Email Notifications</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Verification</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.verification.autoDetect}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, autoDetect: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Detect</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.verification.autoClick}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          verification: { ...prev.verification, autoClick: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Click</span>
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
                        checked={config.security.anonymity}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, anonymity: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Anonymity</span>
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

export default TempMailSystem;
