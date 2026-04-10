/**
 * Cookie Manager Component
 *
 * Advanced cookie management system with session persistence, isolation, and automation
 * Supports multiple personas, cookie sharing, and advanced security features
 */

import {
  Cookie,
  Copy,
  Database,
  Download,
  Eye,
  EyeOff,
  Lock,
  Search,
  Settings,
  Shield,
  Trash2,
  Unlock,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface CookieProfile {
  id: string;
  name: string;
  personaId: string;
  domain: string;
  cookies: CookieEntry[];
  isActive: boolean;
  isShared: boolean;
  lastUpdated: string;
  expiresAt?: string;
  security: {
    encrypted: boolean;
    passwordProtected: boolean;
    autoDelete: boolean;
    shareWithPersona: string[];
  };
  stats: {
    totalCookies: number;
    sessionCookies: number;
    persistentCookies: number;
    thirdPartyCookies: number;
    size: number; // bytes
  };
}

interface CookieEntry {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  session: boolean;
  thirdParty: boolean;
  category: 'essential' | 'functional' | 'analytics' | 'advertising' | 'social';
  created: string;
  lastAccessed: string;
}

interface CookieRule {
  id: string;
  name: string;
  type: 'allow' | 'block' | 'prompt';
  domain: string;
  path?: string;
  cookieName?: string;
  category?: CookieEntry['category'];
  personaId?: string;
  isActive: boolean;
  priority: number;
  action: 'delete' | 'keep' | 'modify';
  modifyValue?: string;
  expiresAt?: string;
}

interface CookieConfig {
  autoCleanup: boolean;
  cleanupInterval: number; // hours
  maxAge: number; // days
  maxCookiesPerDomain: number;
  encryptionEnabled: boolean;
  backupEnabled: boolean;
  syncEnabled: boolean;
  sharingEnabled: boolean;
  defaultPolicy: 'allow' | 'block' | 'prompt';
  sessionIsolation: boolean;
  crossPersonaSharing: boolean;
  security: {
    encryptSensitive: boolean;
    blockThirdParty: boolean;
    requireSecure: boolean;
    sanitizeOnExit: boolean;
  };
}

const CookieManager: React.FC = () => {
  const [profiles, setProfiles] = useState<CookieProfile[]>([]);
  const [rules, setRules] = useState<CookieRule[]>([]);
  const [config, setConfig] = useState<CookieConfig>({
    autoCleanup: true,
    cleanupInterval: 24,
    maxAge: 30,
    maxCookiesPerDomain: 100,
    encryptionEnabled: true,
    backupEnabled: true,
    syncEnabled: false,
    sharingEnabled: true,
    defaultPolicy: 'allow',
    sessionIsolation: true,
    crossPersonaSharing: false,
    security: {
      encryptSensitive: true,
      blockThirdParty: false,
      requireSecure: false,
      sanitizeOnExit: true,
    },
  });
  const [selectedProfile, setSelectedProfile] = useState<CookieProfile | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCookieDetails, setShowCookieDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({
    totalProfiles: 0,
    totalCookies: 0,
    activeProfiles: 0,
    sharedProfiles: 0,
    totalSize: 0, // MB
    expiredCookies: 0,
    thirdPartyCookies: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock cookie profiles initialization
  useEffect(() => {
    const mockProfiles: CookieProfile[] = [
      {
        id: 'profile-1',
        name: 'FreeBitcoin Session',
        personaId: 'persona-1',
        domain: 'freebitco.in',
        cookies: [
          {
            name: 'session_id',
            value: 'abc123def456ghi789',
            domain: 'freebitco.in',
            path: '/',
            expires: new Date(Date.now() + 86400000).toISOString(),
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            session: false,
            thirdParty: false,
            category: 'essential',
            created: new Date(Date.now() - 3600000).toISOString(),
            lastAccessed: new Date().toISOString(),
          },
          {
            name: 'user_preferences',
            value: '{"theme":"dark","lang":"en","notifications":true}',
            domain: 'freebitco.in',
            path: '/',
            expires: new Date(Date.now() + 2592000000).toISOString(),
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
            session: false,
            thirdParty: false,
            category: 'functional',
            created: new Date(Date.now() - 7200000).toISOString(),
            lastAccessed: new Date(Date.now() - 1800000).toISOString(),
          },
          {
            name: 'analytics_id',
            value: 'GA-XYZ-123',
            domain: 'freebitco.in',
            path: '/',
            expires: new Date(Date.now() + 7776000000).toISOString(),
            httpOnly: false,
            secure: true,
            sameSite: 'None',
            session: false,
            thirdParty: true,
            category: 'analytics',
            created: new Date(Date.now() - 10800000).toISOString(),
            lastAccessed: new Date(Date.now() - 900000).toISOString(),
          },
        ],
        isActive: true,
        isShared: false,
        lastUpdated: new Date().toISOString(),
        security: {
          encrypted: true,
          passwordProtected: false,
          autoDelete: true,
          shareWithPersona: [],
        },
        stats: {
          totalCookies: 3,
          sessionCookies: 0,
          persistentCookies: 3,
          thirdPartyCookies: 1,
          size: 512,
        },
      },
      {
        id: 'profile-2',
        name: 'Cointiply Multi-Session',
        personaId: 'persona-2',
        domain: 'cointiply.com',
        cookies: [
          {
            name: 'auth_token',
            value: 'jwt_token_abc123',
            domain: 'cointiply.com',
            path: '/',
            expires: new Date(Date.now() + 3600000).toISOString(),
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            session: false,
            thirdParty: false,
            category: 'essential',
            created: new Date(Date.now() - 1800000).toISOString(),
            lastAccessed: new Date().toISOString(),
          },
          {
            name: 'temp_session',
            value: 'temp_xyz789',
            domain: 'cointiply.com',
            path: '/api',
            session: true,
            httpOnly: false,
            secure: true,
            sameSite: 'Lax',
            thirdParty: false,
            category: 'functional',
            created: new Date(Date.now() - 300000).toISOString(),
            lastAccessed: new Date().toISOString(),
          },
        ],
        isActive: true,
        isShared: true,
        lastUpdated: new Date().toISOString(),
        security: {
          encrypted: true,
          passwordProtected: true,
          autoDelete: false,
          shareWithPersona: ['persona-3'],
        },
        stats: {
          totalCookies: 2,
          sessionCookies: 1,
          persistentCookies: 1,
          thirdPartyCookies: 0,
          size: 256,
        },
      },
    ];

    setProfiles(mockProfiles);
  }, []);

  // Mock cookie rules initialization
  useEffect(() => {
    const mockRules: CookieRule[] = [
      {
        id: 'rule-1',
        name: 'Block Analytics Cookies',
        type: 'block',
        domain: '*',
        category: 'analytics',
        isActive: true,
        priority: 1,
        action: 'delete',
      },
      {
        id: 'rule-2',
        name: 'Allow Essential Cookies',
        type: 'allow',
        domain: '*',
        category: 'essential',
        isActive: true,
        priority: 2,
        action: 'keep',
      },
      {
        id: 'rule-3',
        name: 'Auto-delete Session Cookies',
        type: 'block',
        domain: '*',
        cookieName: 'session_*',
        isActive: true,
        priority: 3,
        action: 'delete',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
    ];

    setRules(mockRules);
  }, []);

  // Auto cleanup simulation
  useEffect(() => {
    if (!config.autoCleanup) return;

    const interval = setInterval(
      () => {
        // Simulate cleanup process
        const now = new Date();
        const maxAge = config.maxAge * 24 * 60 * 60 * 1000; // Convert days to milliseconds

        setProfiles(prev =>
          prev.map(profile => ({
            ...profile,
            cookies: profile.cookies.filter(cookie => {
              if (cookie.session) return true; // Keep session cookies
              if (cookie.expires) {
                const expires = new Date(cookie.expires);
                return expires > now && expires.getTime() - now.getTime() < maxAge;
              }
              return false;
            }),
            stats: {
              ...profile.stats,
              totalCookies: profile.cookies.filter(cookie => {
                if (cookie.session) return true;
                if (cookie.expires) {
                  const expires = new Date(cookie.expires);
                  return expires > now && expires.getTime() - now.getTime() < maxAge;
                }
                return false;
              }).length,
            },
          }))
        );
      },
      config.cleanupInterval * 60 * 60 * 1000
    ); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.autoCleanup, config.cleanupInterval, config.maxAge]);

  // Update stats
  useEffect(() => {
    const totalCookies = profiles.reduce((sum, p) => sum + p.stats.totalCookies, 0);
    const activeProfiles = profiles.filter(p => p.isActive).length;
    const sharedProfiles = profiles.filter(p => p.isShared).length;
    const totalSize = profiles.reduce((sum, p) => sum + p.stats.size, 0) / (1024 * 1024); // Convert to MB
    const expiredCookies = profiles.reduce(
      (sum, p) => sum + p.cookies.filter(c => c.expires && new Date(c.expires) < new Date()).length,
      0
    );
    const thirdPartyCookies = profiles.reduce((sum, p) => sum + p.stats.thirdPartyCookies, 0);

    setStats({
      totalProfiles: profiles.length,
      totalCookies,
      activeProfiles,
      sharedProfiles,
      totalSize,
      expiredCookies,
      thirdPartyCookies,
    });
  }, [profiles]);

  const createProfile = () => {
    const newProfile: CookieProfile = {
      id: `profile-${Date.now()}`,
      name: `New Profile ${profiles.length + 1}`,
      personaId: 'persona-1',
      domain: 'example.com',
      cookies: [],
      isActive: false,
      isShared: false,
      lastUpdated: new Date().toISOString(),
      security: {
        encrypted: config.encryptionEnabled,
        passwordProtected: false,
        autoDelete: config.autoCleanup,
        shareWithPersona: [],
      },
      stats: {
        totalCookies: 0,
        sessionCookies: 0,
        persistentCookies: 0,
        thirdPartyCookies: 0,
        size: 0,
      },
    };

    setProfiles(prev => [...prev, newProfile]);
  };

  const deleteProfile = (profileId: string) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const toggleProfile = (profileId: string) => {
    setProfiles(prev => prev.map(p => (p.id === profileId ? { ...p, isActive: !p.isActive } : p)));
  };

  const toggleSharing = (profileId: string) => {
    setProfiles(prev => prev.map(p => (p.id === profileId ? { ...p, isShared: !p.isShared } : p)));
  };

  const clearCookies = (profileId: string) => {
    setProfiles(prev =>
      prev.map(p =>
        p.id === profileId
          ? {
              ...p,
              cookies: [],
              lastUpdated: new Date().toISOString(),
              stats: {
                totalCookies: 0,
                sessionCookies: 0,
                persistentCookies: 0,
                thirdPartyCookies: 0,
                size: 0,
              },
            }
          : p
      )
    );
  };

  const exportProfile = (profile: CookieProfile) => {
    const exportData = {
      profile,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookie-profile-${profile.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.profile) {
          setProfiles(prev => [...prev, { ...data.profile, id: `profile-${Date.now()}` }]);
        }
      } catch (error) {
        console.error('Invalid profile file:', error);
      }
    };
    reader.readAsText(file);
  };

  const getFilteredCookies = (profile: CookieProfile) => {
    return profile.cookies.filter(cookie => {
      const matchesSearch =
        cookie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cookie.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cookie.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || cookie.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getCategoryColor = (category: CookieEntry['category']) => {
    switch (category) {
      case 'essential':
        return 'bg-green-600';
      case 'functional':
        return 'bg-blue-600';
      case 'analytics':
        return 'bg-yellow-600';
      case 'advertising':
        return 'bg-red-600';
      case 'social':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getRuleTypeColor = (type: CookieRule['type']) => {
    switch (type) {
      case 'allow':
        return 'bg-green-600';
      case 'block':
        return 'bg-red-600';
      case 'prompt':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Cookie className="w-8 h-8 text-purple-400" />
            Cookie Manager
          </h1>
          <p className="text-gray-400">
            Advanced cookie management system with session persistence, isolation, and automation
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Profiles</div>
                <div className="text-2xl font-bold">{stats.totalProfiles}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Cookies</div>
                <div className="text-2xl font-bold">{stats.totalCookies}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Profiles</div>
                <div className="text-2xl font-bold">{stats.activeProfiles}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Size</div>
                <div className="text-2xl font-bold">{stats.totalSize.toFixed(2)}MB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Cookie Profiles</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={createProfile}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Database className="w-4 h-4" />
                New Profile
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
              Shared: {stats.sharedProfiles} | Expired: {stats.expiredCookies} | Third-Party:{' '}
              {stats.thirdPartyCookies}
            </span>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cookie Profiles</h3>
            <div className="space-y-3">
              {profiles.map(profile => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedProfile?.id === profile.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${profile.isActive ? 'bg-green-500' : 'bg-gray-500'}`}
                      ></div>
                      <h4 className="font-semibold">{profile.name}</h4>
                      {profile.isShared && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">Shared</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          exportProfile(profile);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Export"
                      >
                        <Download className="w-4 h-4 text-green-400" />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleProfile(profile.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Toggle Active"
                      >
                        {profile.isActive ? (
                          <Unlock className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-blue-400" />
                        )}
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          deleteProfile(profile.id);
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
                      <span className="text-gray-400">Domain:</span> {profile.domain}
                    </div>
                    <div>
                      <span className="text-gray-400">Persona:</span> {profile.personaId}
                    </div>
                    <div>
                      <span className="text-gray-400">Cookies:</span> {profile.stats.totalCookies}
                    </div>
                    <div>
                      <span className="text-gray-400">Size:</span>{' '}
                      {(profile.stats.size / 1024).toFixed(1)}KB
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {profile.security.encrypted && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Encrypted</span>
                      )}
                      {profile.security.passwordProtected && (
                        <span className="px-2 py-1 bg-orange-600 rounded text-xs">Password</span>
                      )}
                      {profile.security.autoDelete && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">Auto-Delete</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      Updated: {new Date(profile.lastUpdated).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Profile Details */}
          {selectedProfile && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Profile Details: {selectedProfile.name}
              </h3>
              <div className="bg-gray-800 rounded-lg p-4">
                {/* Cookie Search and Filter */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Search cookies..."
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="essential">Essential</option>
                    <option value="functional">Functional</option>
                    <option value="analytics">Analytics</option>
                    <option value="advertising">Advertising</option>
                    <option value="social">Social</option>
                  </select>
                </div>

                {/* Cookie List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getFilteredCookies(selectedProfile).map((cookie, index) => (
                    <div key={index} className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{cookie.name}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${getCategoryColor(cookie.category)}`}
                          >
                            {cookie.category}
                          </span>
                          {cookie.session && (
                            <span className="px-2 py-1 bg-yellow-600 rounded text-xs">Session</span>
                          )}
                          {cookie.thirdParty && (
                            <span className="px-2 py-1 bg-red-600 rounded text-xs">3rd Party</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(cookie.value)}
                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                            title="Copy Value"
                          >
                            <Copy className="w-3 h-3 text-gray-400" />
                          </button>
                          <button
                            onClick={() =>
                              setShowPasswords({ ...showPasswords, [index]: !showPasswords[index] })
                            }
                            className="p-1 hover:bg-gray-600 rounded transition-colors"
                            title="Toggle Value"
                          >
                            {showPasswords[index] ? (
                              <EyeOff className="w-3 h-3 text-gray-400" />
                            ) : (
                              <Eye className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 space-y-1">
                        <div>
                          Domain: {cookie.domain} | Path: {cookie.path}
                        </div>
                        <div>
                          Secure: {cookie.secure ? 'Yes' : 'No'} | HttpOnly:{' '}
                          {cookie.httpOnly ? 'Yes' : 'No'}
                        </div>
                        <div>SameSite: {cookie.sameSite}</div>
                        {showPasswords[index] && (
                          <div className="text-white break-all">Value: {cookie.value}</div>
                        )}
                        <div>
                          Created: {new Date(cookie.created).toLocaleString()} | Accessed:{' '}
                          {new Date(cookie.lastAccessed).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Profile Actions */}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => clearCookies(selectedProfile.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
                  >
                    Clear All Cookies
                  </button>
                  <button
                    onClick={() => toggleSharing(selectedProfile.id)}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                      selectedProfile.isShared
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {selectedProfile.isShared ? 'Stop Sharing' : 'Share Profile'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cookie Rules */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Cookie Rules</h3>
          <div className="space-y-3">
            {rules.map(rule => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs ${getRuleTypeColor(rule.type)}`}>
                    {rule.type.toUpperCase()}
                  </span>
                  <span className="font-medium">{rule.name}</span>
                  <span className="text-sm text-gray-400">
                    {rule.domain} {rule.category && `(${rule.category})`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Priority: {rule.priority}</span>
                  <button
                    onClick={() =>
                      setRules(prev =>
                        prev.map(r => (r.id === rule.id ? { ...r, isActive: !r.isActive } : r))
                      )
                    }
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      rule.isActive
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Cookie Manager Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cleanup Interval (hours)
                    </label>
                    <input
                      type="number"
                      value={config.cleanupInterval}
                      onChange={e =>
                        setConfig(prev => ({ ...prev, cleanupInterval: parseInt(e.target.value) }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="168"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Age (days)</label>
                    <input
                      type="number"
                      value={config.maxAge}
                      onChange={e =>
                        setConfig(prev => ({ ...prev, maxAge: parseInt(e.target.value) }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="365"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Cookies per Domain</label>
                    <input
                      type="number"
                      value={config.maxCookiesPerDomain}
                      onChange={e =>
                        setConfig(prev => ({
                          ...prev,
                          maxCookiesPerDomain: parseInt(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Policy</label>
                    <select
                      value={config.defaultPolicy}
                      onChange={e =>
                        setConfig(prev => ({ ...prev, defaultPolicy: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="allow">Allow</option>
                      <option value="block">Block</option>
                      <option value="prompt">Prompt</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoCleanup}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, autoCleanup: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Cleanup</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.encryptionEnabled}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, encryptionEnabled: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encryption</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.backupEnabled}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, backupEnabled: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Backup</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sharingEnabled}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, sharingEnabled: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Sharing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.sessionIsolation}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, sessionIsolation: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Session Isolation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.crossPersonaSharing}
                        onChange={e =>
                          setConfig(prev => ({ ...prev, crossPersonaSharing: e.target.checked }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Cross-Persona Sharing</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Security</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.encryptSensitive}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, encryptSensitive: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Encrypt Sensitive</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.blockThirdParty}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, blockThirdParty: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Block Third-Party</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.requireSecure}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, requireSecure: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Require Secure</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.security.sanitizeOnExit}
                        onChange={e =>
                          setConfig(prev => ({
                            ...prev,
                            security: { ...prev.security, sanitizeOnExit: e.target.checked },
                          }))
                        }
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Sanitize on Exit</span>
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

export default CookieManager;
