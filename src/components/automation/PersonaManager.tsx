/**
 * Persona Management System
 * 
 * Complete persona management for multiple identities, profiles, and switching capabilities
 * Supports stealth operations, proxy integration, and anonymity protection
 */

import React, { useState, useEffect } from 'react';
import { User, Shield, Eye, EyeOff, Plus, Edit2, Trash2, Copy, RefreshCw, Globe, Clock, Zap } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  avatar?: string;
  fingerprint: {
    userAgent: string;
    screenResolution: string;
    timezone: string;
    language: string;
    platform: string;
    webglVendor?: string;
    canvasFingerprint?: string;
  };
  proxy?: {
    type: 'http' | 'socks5' | 'socks4';
    host: string;
    port: number;
    username?: string;
    password?: string;
    country?: string;
    city?: string;
  };
  crypto: {
    wallets: Array<{
      chain: string;
      address: string;
      label: string;
    }>;
    preferredChains: string[];
  };
  behavior: {
    clickDelay: { min: number; max: number };
    scrollSpeed: number;
    typingSpeed: number;
    mouseMovement: 'human' | 'robotic' | 'mixed';
    breakFrequency: number; // minutes between breaks
    breakDuration: number; // minutes
  };
  schedule: {
    active: boolean;
    timezone: string;
    workingHours: { start: string; end: string };
    breakTimes: Array<{ start: string; end: string }>;
  };
  security: {
    vpnEnabled: boolean;
    dnsProtection: boolean;
    cookieClearing: boolean;
    historyClearing: boolean;
    fingerprintRandomization: boolean;
  };
  stats: {
    claimsCompleted: number;
    successRate: number;
    averageTime: number; // seconds
    lastActive: string;
    totalEarnings: number;
  };
  createdAt: string;
  lastModified: string;
  isActive: boolean;
}

interface PersonaFormData {
  name: string;
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  proxyType: 'http' | 'socks5' | 'socks4' | 'none';
  proxyHost: string;
  proxyPort: string;
  proxyUsername: string;
  proxyPassword: string;
  clickDelayMin: string;
  clickDelayMax: string;
  scrollSpeed: string;
  typingSpeed: string;
  mouseMovement: 'human' | 'robotic' | 'mixed';
}

const PersonaManager: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<PersonaFormData>({
    name: '',
    userAgent: '',
    screenResolution: '1920x1080',
    timezone: 'UTC',
    language: 'en-US',
    platform: 'Win32',
    proxyType: 'none',
    proxyHost: '',
    proxyPort: '',
    proxyUsername: '',
    proxyPassword: '',
    clickDelayMin: '100',
    clickDelayMax: '300',
    scrollSpeed: '5',
    typingSpeed: '120',
    mouseMovement: 'human'
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockPersonas: Persona[] = [
      {
        id: '1',
        name: 'Crypto Enthusiast',
        fingerprint: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          screenResolution: '1920x1080',
          timezone: 'America/New_York',
          language: 'en-US',
          platform: 'Win32',
          webglVendor: 'Google Inc.',
          canvasFingerprint: 'canvas_12345'
        },
        proxy: {
          type: 'socks5',
          host: 'proxy.example.com',
          port: 1080,
          username: 'user1',
          password: 'pass1',
          country: 'United States',
          city: 'New York'
        },
        crypto: {
          wallets: [
            { chain: 'ethereum', address: '0x1234...5678', label: 'Main Wallet' },
            { chain: 'bitcoin', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'BTC Wallet' }
          ],
          preferredChains: ['ethereum', 'polygon', 'arbitrum']
        },
        behavior: {
          clickDelay: { min: 100, max: 300 },
          scrollSpeed: 5,
          typingSpeed: 120,
          mouseMovement: 'human',
          breakFrequency: 30,
          breakDuration: 5
        },
        schedule: {
          active: true,
          timezone: 'America/New_York',
          workingHours: { start: '09:00', end: '17:00' },
          breakTimes: [
            { start: '12:00', end: '13:00' },
            { start: '15:00', end: '15:15' }
          ]
        },
        security: {
          vpnEnabled: true,
          dnsProtection: true,
          cookieClearing: true,
          historyClearing: false,
          fingerprintRandomization: true
        },
        stats: {
          claimsCompleted: 1250,
          successRate: 94.5,
          averageTime: 45,
          lastActive: new Date().toISOString(),
          totalEarnings: 0.0234
        },
        createdAt: '2024-01-15T10:00:00Z',
        lastModified: '2024-04-10T14:30:00Z',
        isActive: true
      },
      {
        id: '2',
        name: 'Stealth Operator',
        fingerprint: {
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          screenResolution: '2560x1440',
          timezone: 'Europe/London',
          language: 'en-GB',
          platform: 'MacIntel',
          webglVendor: 'WebKit',
          canvasFingerprint: 'canvas_67890'
        },
        crypto: {
          wallets: [
            { chain: 'ethereum', address: '0x9876...5432', label: 'Privacy Wallet' },
            { chain: 'solana', address: 'Sol1...Address', label: 'SOL Wallet' }
          ],
          preferredChains: ['ethereum', 'solana', 'optimism']
        },
        behavior: {
          clickDelay: { min: 200, max: 500 },
          scrollSpeed: 3,
          typingSpeed: 80,
          mouseMovement: 'mixed',
          breakFrequency: 20,
          breakDuration: 10
        },
        schedule: {
          active: true,
          timezone: 'Europe/London',
          workingHours: { start: '08:00', end: '20:00' },
          breakTimes: [
            { start: '13:00', end: '14:00' }
          ]
        },
        security: {
          vpnEnabled: true,
          dnsProtection: true,
          cookieClearing: true,
          historyClearing: true,
          fingerprintRandomization: true
        },
        stats: {
          claimsCompleted: 890,
          successRate: 96.2,
          averageTime: 52,
          lastActive: new Date().toISOString(),
          totalEarnings: 0.0187
        },
        createdAt: '2024-02-20T15:30:00Z',
        lastModified: '2024-04-09T11:15:00Z',
        isActive: false
      }
    ];
    setPersonas(mockPersonas);
  }, []);

  const generateFingerprint = () => {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    ];
    const resolutions = ['1920x1080', '2560x1440', '1366x768', '1440x900'];
    const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
    const languages = ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE'];
    const platforms = ['Win32', 'MacIntel', 'Linux x86_64'];

    return {
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      screenResolution: resolutions[Math.floor(Math.random() * resolutions.length)],
      timezone: timezones[Math.floor(Math.random() * timezones.length)],
      language: languages[Math.floor(Math.random() * languages.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)]
    };
  };

  const createPersona = async () => {
    setIsCreating(true);
    
    const fingerprint = generateFingerprint();
    
    const newPersona: Persona = {
      id: Date.now().toString(),
      name: formData.name,
      fingerprint: {
        userAgent: formData.userAgent || fingerprint.userAgent,
        screenResolution: formData.screenResolution,
        timezone: formData.timezone,
        language: formData.language,
        platform: formData.platform
      },
      proxy: formData.proxyType !== 'none' ? {
        type: formData.proxyType,
        host: formData.proxyHost,
        port: parseInt(formData.proxyPort),
        username: formData.proxyUsername || undefined,
        password: formData.proxyPassword || undefined
      } : undefined,
      crypto: {
        wallets: [],
        preferredChains: ['ethereum', 'polygon']
      },
      behavior: {
        clickDelay: {
          min: parseInt(formData.clickDelayMin),
          max: parseInt(formData.clickDelayMax)
        },
        scrollSpeed: parseInt(formData.scrollSpeed),
        typingSpeed: parseInt(formData.typingSpeed),
        mouseMovement: formData.mouseMovement,
        breakFrequency: 30,
        breakDuration: 5
      },
      schedule: {
        active: false,
        timezone: formData.timezone,
        workingHours: { start: '09:00', end: '17:00' },
        breakTimes: []
      },
      security: {
        vpnEnabled: false,
        dnsProtection: false,
        cookieClearing: false,
        historyClearing: false,
        fingerprintRandomization: false
      },
      stats: {
        claimsCompleted: 0,
        successRate: 0,
        averageTime: 0,
        lastActive: new Date().toISOString(),
        totalEarnings: 0
      },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isActive: false
    };

    setPersonas([...personas, newPersona]);
    setShowCreateForm(false);
    setIsCreating(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      userAgent: '',
      screenResolution: '1920x1080',
      timezone: 'UTC',
      language: 'en-US',
      platform: 'Win32',
      proxyType: 'none',
      proxyHost: '',
      proxyPort: '',
      proxyUsername: '',
      proxyPassword: '',
      clickDelayMin: '100',
      clickDelayMax: '300',
      scrollSpeed: '5',
      typingSpeed: '120',
      mouseMovement: 'human'
    });
  };

  const deletePersona = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id));
    if (selectedPersona?.id === id) {
      setSelectedPersona(null);
    }
  };

  const duplicatePersona = (persona: Persona) => {
    const duplicated: Persona = {
      ...persona,
      id: Date.now().toString(),
      name: `${persona.name} (Copy)`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isActive: false,
      stats: {
        claimsCompleted: 0,
        successRate: 0,
        averageTime: 0,
        lastActive: new Date().toISOString(),
        totalEarnings: 0
      }
    };
    setPersonas([...personas, duplicated]);
  };

  const activatePersona = (id: string) => {
    setPersonas(personas.map(p => ({
      ...p,
      isActive: p.id === id
    })));
    const persona = personas.find(p => p.id === id);
    if (persona) {
      setSelectedPersona(persona);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-purple-400" />
            Persona Manager
          </h1>
          <p className="text-gray-400">
            Manage multiple identities for automated faucet operations with stealth capabilities
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Persona
            </button>
            <button
              onClick={() => {
                const fingerprint = generateFingerprint();
                setFormData({
                  ...formData,
                  userAgent: fingerprint.userAgent,
                  screenResolution: fingerprint.screenResolution,
                  timezone: fingerprint.timezone,
                  language: fingerprint.language,
                  platform: fingerprint.platform
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Random Fingerprint
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {personas.length} personas loaded
          </div>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className={`bg-gray-800 rounded-lg p-6 border-2 transition-all ${
                persona.isActive ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    persona.isActive ? 'bg-purple-600' : 'bg-gray-700'
                  }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{persona.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {persona.isActive ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Active
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          Inactive
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => duplicatePersona(persona)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => setEditingPersona(persona)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => deletePersona(persona.id)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Persona Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Location:</span>
                  <span>{persona.fingerprint.timezone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Proxy:</span>
                  <span>{persona.proxy ? `${persona.proxy.type}://${persona.proxy.host}:${persona.proxy.port}` : 'None'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Claims:</span>
                  <span>{persona.stats.claimsCompleted} ({persona.stats.successRate}% success)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Earnings:</span>
                  <span>{persona.stats.totalEarnings.toFixed(6)} ETH</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs">
                  {persona.security.vpnEnabled && <span className="px-2 py-1 bg-green-600 rounded">VPN</span>}
                  {persona.security.dnsProtection && <span className="px-2 py-1 bg-blue-600 rounded">DNS</span>}
                  {persona.security.fingerprintRandomization && <span className="px-2 py-1 bg-purple-600 rounded">FP-Rand</span>}
                  {persona.proxy && <span className="px-2 py-1 bg-orange-600 rounded">Proxy</span>}
                </div>
              </div>

              {/* Activate Button */}
              <div className="mt-4">
                <button
                  onClick={() => activatePersona(persona.id)}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    persona.isActive
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {persona.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Persona Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Create New Persona</h2>
              
              <div className="space-y-4">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium mb-2">Persona Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Enter persona name"
                  />
                </div>

                {/* Fingerprint */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">User Agent</label>
                    <input
                      type="text"
                      value={formData.userAgent}
                      onChange={(e) => setFormData({ ...formData, userAgent: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Screen Resolution</label>
                    <select
                      value={formData.screenResolution}
                      onChange={(e) => setFormData({ ...formData, screenResolution: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="1920x1080">1920x1080</option>
                      <option value="2560x1440">2560x1440</option>
                      <option value="1366x768">1366x768</option>
                      <option value="1440x900">1440x900</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="America/New_York">America/New_York</option>
                      <option value="Europe/London">Europe/London</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                      <option value="Australia/Sydney">Australia/Sydney</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="en-US">en-US</option>
                      <option value="en-GB">en-GB</option>
                      <option value="es-ES">es-ES</option>
                      <option value="fr-FR">fr-FR</option>
                    </select>
                  </div>
                </div>

                {/* Proxy Settings */}
                <div>
                  <label className="block text-sm font-medium mb-2">Proxy Type</label>
                  <select
                    value={formData.proxyType}
                    onChange={(e) => setFormData({ ...formData, proxyType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="none">No Proxy</option>
                    <option value="http">HTTP</option>
                    <option value="socks5">SOCKS5</option>
                    <option value="socks4">SOCKS4</option>
                  </select>
                </div>

                {formData.proxyType !== 'none' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Proxy Host</label>
                      <input
                        type="text"
                        value={formData.proxyHost}
                        onChange={(e) => setFormData({ ...formData, proxyHost: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="proxy.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Port</label>
                      <input
                        type="number"
                        value={formData.proxyPort}
                        onChange={(e) => setFormData({ ...formData, proxyPort: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="1080"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Username (optional)</label>
                      <input
                        type="text"
                        value={formData.proxyUsername}
                        onChange={(e) => setFormData({ ...formData, proxyUsername: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password (optional)</label>
                      <div className="relative">
                        <input
                          type={showPasswords['create'] ? 'text' : 'password'}
                          value={formData.proxyPassword}
                          onChange={(e) => setFormData({ ...formData, proxyPassword: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none pr-10"
                          placeholder="password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, create: !showPasswords.create })}
                          className="absolute right-2 top-2 text-gray-400 hover:text-white"
                        >
                          {showPasswords['create'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Behavior Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Click Delay (ms)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.clickDelayMin}
                        onChange={(e) => setFormData({ ...formData, clickDelayMin: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={formData.clickDelayMax}
                        onChange={(e) => setFormData({ ...formData, clickDelayMax: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mouse Movement</label>
                    <select
                      value={formData.mouseMovement}
                      onChange={(e) => setFormData({ ...formData, mouseMovement: e.target.value as any })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="human">Human</option>
                      <option value="robotic">Robotic</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createPersona}
                  disabled={!formData.name || isCreating}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {isCreating ? 'Creating...' : 'Create Persona'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Selected Persona Details */}
        {selectedPersona && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Active Persona: {selectedPersona.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-purple-400">Fingerprint</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-gray-400">User Agent:</span> {selectedPersona.fingerprint.userAgent}</div>
                  <div><span className="text-gray-400">Resolution:</span> {selectedPersona.fingerprint.screenResolution}</div>
                  <div><span className="text-gray-400">Timezone:</span> {selectedPersona.fingerprint.timezone}</div>
                  <div><span className="text-gray-400">Language:</span> {selectedPersona.fingerprint.language}</div>
                  <div><span className="text-gray-400">Platform:</span> {selectedPersona.fingerprint.platform}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-purple-400">Security</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-gray-400">VPN:</span> {selectedPersona.security.vpnEnabled ? 'Enabled' : 'Disabled'}</div>
                  <div><span className="text-gray-400">DNS Protection:</span> {selectedPersona.security.dnsProtection ? 'Enabled' : 'Disabled'}</div>
                  <div><span className="text-gray-400">Cookie Clearing:</span> {selectedPersona.security.cookieClearing ? 'Enabled' : 'Disabled'}</div>
                  <div><span className="text-gray-400">History Clearing:</span> {selectedPersona.security.historyClearing ? 'Enabled' : 'Disabled'}</div>
                  <div><span className="text-gray-400">FP Randomization:</span> {selectedPersona.security.fingerprintRandomization ? 'Enabled' : 'Disabled'}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-purple-400">Statistics</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-gray-400">Claims Completed:</span> {selectedPersona.stats.claimsCompleted}</div>
                  <div><span className="text-gray-400">Success Rate:</span> {selectedPersona.stats.successRate}%</div>
                  <div><span className="text-gray-400">Average Time:</span> {selectedPersona.stats.averageTime}s</div>
                  <div><span className="text-gray-400">Total Earnings:</span> {selectedPersona.stats.totalEarnings.toFixed(6)} ETH</div>
                  <div><span className="text-gray-400">Last Active:</span> {new Date(selectedPersona.stats.lastActive).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonaManager;
