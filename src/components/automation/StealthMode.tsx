/**
 * Stealth Mode Component
 * 
 * Comprehensive stealth functionality including proxy rotation, user agent spoofing,
 * fingerprint randomization, and anonymity protection
 */

import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, RefreshCw, Globe, Lock, Unlock, Activity, AlertTriangle, CheckCircle, Settings, Wifi, WifiOff } from 'lucide-react';

interface StealthConfig {
  enabled: boolean;
  proxyRotation: {
    enabled: boolean;
    interval: number; // minutes
    proxies: ProxyConfig[];
    currentProxy: number;
  };
  fingerprintSpoofing: {
    enabled: boolean;
    randomizationInterval: number; // minutes
    canvasRandomization: boolean;
    webglRandomization: boolean;
    audioContextRandomization: boolean;
    fontRandomization: boolean;
  };
  networkProtection: {
    vpnEnabled: boolean;
    dnsProtection: boolean;
    webrtcProtection: boolean;
    geolocationSpoofing: boolean;
    timezoneSpoofing: boolean;
  };
  behaviorMimicry: {
    enabled: boolean;
    humanTyping: boolean;
    mouseMovement: boolean;
    scrollBehavior: boolean;
    clickPatterns: boolean;
    timingRandomization: boolean;
  };
  dataProtection: {
    cookieClearing: boolean;
    localStorageClearing: boolean;
    sessionStorageClearing: boolean;
    indexedDbClearing: boolean;
    cacheClearing: boolean;
    historyClearing: boolean;
  };
}

interface ProxyConfig {
  id: string;
  type: 'http' | 'socks5' | 'socks4' | 'https';
  host: string;
  port: number;
  username?: string;
  password?: string;
  country: string;
  city: string;
  anonymity: 'low' | 'medium' | 'high';
  speed: number; // ms
  lastUsed: string;
  successRate: number;
}

interface StealthStatus {
  isActive: boolean;
  currentProxy?: ProxyConfig;
  fingerprintHash: string;
  lastRotation: string;
  protectionLevel: 'basic' | 'standard' | 'maximum';
  detectedRisks: string[];
  uptime: number; // minutes
}

const StealthMode: React.FC = () => {
  const [config, setConfig] = useState<StealthConfig>({
    enabled: false,
    proxyRotation: {
      enabled: false,
      interval: 30,
      proxies: [],
      currentProxy: 0
    },
    fingerprintSpoofing: {
      enabled: false,
      randomizationInterval: 60,
      canvasRandomization: true,
      webglRandomization: true,
      audioContextRandomization: true,
      fontRandomization: true
    },
    networkProtection: {
      vpnEnabled: false,
      dnsProtection: false,
      webrtcProtection: false,
      geolocationSpoofing: false,
      timezoneSpoofing: false
    },
    behaviorMimicry: {
      enabled: false,
      humanTyping: true,
      mouseMovement: true,
      scrollBehavior: true,
      clickPatterns: true,
      timingRandomization: true
    },
    dataProtection: {
      cookieClearing: false,
      localStorageClearing: false,
      sessionStorageClearing: false,
      indexedDbClearing: false,
      cacheClearing: false,
      historyClearing: false
    }
  });

  const [status, setStatus] = useState<StealthStatus>({
    isActive: false,
    fingerprintHash: '',
    lastRotation: new Date().toISOString(),
    protectionLevel: 'basic',
    detectedRisks: [],
    uptime: 0
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  // Mock proxy data
  useEffect(() => {
    const mockProxies: ProxyConfig[] = [
      {
        id: '1',
        type: 'socks5',
        host: 'proxy1.example.com',
        port: 1080,
        username: 'user1',
        password: 'pass1',
        country: 'United States',
        city: 'New York',
        anonymity: 'high',
        speed: 45,
        lastUsed: new Date(Date.now() - 3600000).toISOString(),
        successRate: 98.5
      },
      {
        id: '2',
        type: 'http',
        host: 'proxy2.example.com',
        port: 8080,
        country: 'Germany',
        city: 'Frankfurt',
        anonymity: 'medium',
        speed: 32,
        lastUsed: new Date(Date.now() - 7200000).toISOString(),
        successRate: 95.2
      },
      {
        id: '3',
        type: 'socks5',
        host: 'proxy3.example.com',
        port: 1080,
        username: 'user3',
        password: 'pass3',
        country: 'Netherlands',
        city: 'Amsterdam',
        anonymity: 'high',
        speed: 28,
        lastUsed: new Date(Date.now() - 1800000).toISOString(),
        successRate: 97.8
      }
    ];

    setConfig(prev => ({
      ...prev,
      proxyRotation: {
        ...prev.proxyRotation,
        proxies: mockProxies
      }
    }));
  }, []);

  const generateFingerprintHash = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
  };

  const toggleStealthMode = () => {
    const newEnabled = !config.enabled;
    setConfig(prev => ({ ...prev, enabled: newEnabled }));
    setStatus(prev => ({
      ...prev,
      isActive: newEnabled,
      fingerprintHash: newEnabled ? generateFingerprintHash() : '',
      lastRotation: new Date().toISOString(),
      uptime: newEnabled ? 0 : prev.uptime
    }));

    if (newEnabled) {
      // Initialize stealth features
      initializeStealthFeatures();
    } else {
      // Disable stealth features
      disableStealthFeatures();
    }
  };

  const initializeStealthFeatures = () => {
    // Initialize fingerprint spoofing
    if (config.fingerprintSpoofing.enabled) {
      spoofFingerprint();
    }

    // Initialize proxy rotation
    if (config.proxyRotation.enabled && config.proxyRotation.proxies.length > 0) {
      rotateProxy();
    }

    // Initialize network protection
    if (config.networkProtection.vpnEnabled) {
      enableVPN();
    }

    // Initialize data protection
    if (config.dataProtection.cookieClearing) {
      clearCookies();
    }
  };

  const disableStealthFeatures = () => {
    // Reset all stealth features
    console.log('Disabling all stealth features');
  };

  const spoofFingerprint = () => {
    const hash = generateFingerprintHash();
    setStatus(prev => ({ ...prev, fingerprintHash: hash }));
    
    // In a real implementation, this would:
    // - Modify canvas fingerprint
    // - Randomize WebGL parameters
    // - Spoof audio context
    // - Randomize available fonts
    // - Modify navigator properties
  };

  const rotateProxy = async () => {
    if (!config.proxyRotation.enabled || config.proxyRotation.proxies.length === 0) return;
    
    setIsRotating(true);
    
    // Simulate proxy rotation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const nextIndex = (config.proxyRotation.currentProxy + 1) % config.proxyRotation.proxies.length;
    const nextProxy = config.proxyRotation.proxies[nextIndex];
    
    setConfig(prev => ({
      ...prev,
      proxyRotation: {
        ...prev.proxyRotation,
        currentProxy: nextIndex
      }
    }));
    
    setStatus(prev => ({
      ...prev,
      currentProxy: nextProxy,
      lastRotation: new Date().toISOString()
    }));
    
    setIsRotating(false);
  };

  const enableVPN = () => {
    // Simulate VPN connection
    console.log('Enabling VPN protection');
  };

  const clearCookies = () => {
    // In a real implementation, this would clear all cookies
    console.log('Clearing cookies');
  };

  const runStealthTest = async () => {
    setTestResults(null);
    
    // Simulate stealth testing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = {
      fingerprint: {
        canvas: Math.random() > 0.3 ? 'passed' : 'failed',
        webgl: Math.random() > 0.2 ? 'passed' : 'failed',
        audio: Math.random() > 0.1 ? 'passed' : 'failed',
        fonts: Math.random() > 0.25 ? 'passed' : 'failed'
      },
      network: {
        proxy: config.proxyRotation.enabled ? 'connected' : 'disabled',
        vpn: config.networkProtection.vpnEnabled ? 'connected' : 'disabled',
        dns: config.networkProtection.dnsProtection ? 'protected' : 'vulnerable',
        webrtc: config.networkProtection.webrtcProtection ? 'blocked' : 'leaking'
      },
      behavior: {
        typing: config.behaviorMimicry.humanTyping ? 'human-like' : 'robotic',
        mouse: config.behaviorMimicry.mouseMovement ? 'natural' : 'unnatural',
        scroll: config.behaviorMimicry.scrollBehavior ? 'smooth' : 'jerky',
        timing: config.behaviorMimicry.timingRandomization ? 'randomized' : 'predictable'
      },
      anonymity: {
        ip: status.currentProxy ? status.currentProxy.country : 'Direct',
        location: config.networkProtection.geolocationSpoofing ? 'Spoofed' : 'Real',
        timezone: config.networkProtection.timezoneSpoofing ? 'Spoofed' : 'Real',
        language: 'en-US' // Would be based on current persona
      },
      overall: Math.random() > 0.4 ? 'excellent' : Math.random() > 0.7 ? 'good' : 'needs_improvement'
    };
    
    setTestResults(results);
  };

  const getProtectionLevel = () => {
    let score = 0;
    
    if (config.proxyRotation.enabled) score += 20;
    if (config.fingerprintSpoofing.enabled) score += 20;
    if (config.networkProtection.vpnEnabled) score += 15;
    if (config.networkProtection.dnsProtection) score += 10;
    if (config.networkProtection.webrtcProtection) score += 10;
    if (config.behaviorMimicry.enabled) score += 15;
    if (config.dataProtection.cookieClearing) score += 10;
    
    if (score >= 80) return 'maximum';
    if (score >= 50) return 'standard';
    return 'basic';
  };

  const protectionLevel = getProtectionLevel();

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            Stealth Mode
          </h1>
          <p className="text-gray-400">
            Advanced anonymity protection with proxy rotation, fingerprint spoofing, and behavior mimicry
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-lg border-2 ${
            status.isActive ? 'border-green-500 bg-green-500/10' : 'border-gray-700 bg-gray-800'
          }`}>
            <div className="flex items-center gap-3">
              {status.isActive ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              )}
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-semibold">{status.isActive ? 'Active' : 'Inactive'}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Protection Level</div>
                <div className="font-semibold capitalize">{protectionLevel}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Current Location</div>
                <div className="font-semibold">
                  {status.currentProxy ? `${status.currentProxy.city}, ${status.currentProxy.country}` : 'Direct'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Uptime</div>
                <div className="font-semibold">{status.uptime} min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Stealth Controls</h2>
            <button
              onClick={toggleStealthMode}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                config.enabled
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {config.enabled ? (
                <>
                  <Unlock className="w-5 h-5" />
                  Disable Stealth
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Enable Stealth
                </>
              )}
            </button>
          </div>

          {/* Feature Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proxy Rotation */}
            <div className="space-y-3">
              <h3 className="font-semibold text-purple-400">Proxy Rotation</h3>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.proxyRotation.enabled}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    proxyRotation: { ...prev.proxyRotation, enabled: e.target.checked }
                  }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span>Enable Proxy Rotation</span>
              </label>
              {config.proxyRotation.enabled && (
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-400">Rotation Interval (minutes)</label>
                    <input
                      type="number"
                      value={config.proxyRotation.interval}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        proxyRotation: { ...prev.proxyRotation, interval: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-1 bg-gray-700 rounded text-sm"
                      min="1"
                      max="1440"
                    />
                  </div>
                  <button
                    onClick={rotateProxy}
                    disabled={isRotating}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
                    {isRotating ? 'Rotating...' : 'Rotate Now'}
                  </button>
                </div>
              )}
            </div>

            {/* Fingerprint Spoofing */}
            <div className="space-y-3">
              <h3 className="font-semibold text-purple-400">Fingerprint Spoofing</h3>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.fingerprintSpoofing.enabled}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    fingerprintSpoofing: { ...prev.fingerprintSpoofing, enabled: e.target.checked }
                  }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span>Enable Fingerprint Spoofing</span>
              </label>
              {config.fingerprintSpoofing.enabled && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.fingerprintSpoofing.canvasRandomization}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        fingerprintSpoofing: { ...prev.fingerprintSpoofing, canvasRandomization: e.target.checked }
                      }))}
                      className="w-3 h-3 text-purple-600 rounded"
                    />
                    <span className="text-sm">Canvas Randomization</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.fingerprintSpoofing.webglRandomization}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        fingerprintSpoofing: { ...prev.fingerprintSpoofing, webglRandomization: e.target.checked }
                      }))}
                      className="w-3 h-3 text-purple-600 rounded"
                    />
                    <span className="text-sm">WebGL Randomization</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.fingerprintSpoofing.audioContextRandomization}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        fingerprintSpoofing: { ...prev.fingerprintSpoofing, audioContextRandomization: e.target.checked }
                      }))}
                      className="w-3 h-3 text-purple-600 rounded"
                    />
                    <span className="text-sm">Audio Context Randomization</span>
                  </label>
                </div>
              )}
            </div>

            {/* Network Protection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-purple-400">Network Protection</h3>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.networkProtection.vpnEnabled}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    networkProtection: { ...prev.networkProtection, vpnEnabled: e.target.checked }
                  }))}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span>VPN Protection</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.networkProtection.dnsProtection}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    networkProtection: { ...prev.networkProtection, dnsProtection: e.target.checked }
                  }))}
                  className="w-3 h-3 text-purple-600 rounded"
                />
                <span className="text-sm">DNS Protection</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.networkProtection.webrtcProtection}
                  onChange={(e) => setConfig(prev => ({
                    ...prev,
                    networkProtection: { ...prev.networkProtection, webrtcProtection: e.target.checked }
                  }))}
                  className="w-3 h-3 text-purple-600 rounded"
                />
                <span className="text-sm">WebRTC Protection</span>
              </label>
            </div>
          </div>
        </div>

        {/* Proxy List */}
        {config.proxyRotation.enabled && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Proxy Pool</h3>
            <div className="space-y-3">
              {config.proxyRotation.proxies.map((proxy, index) => (
                <div
                  key={proxy.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    index === config.proxyRotation.currentProxy
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      index === config.proxyRotation.currentProxy ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{proxy.city}, {proxy.country}</div>
                      <div className="text-sm text-gray-400">
                        {proxy.type.toUpperCase()} - {proxy.host}:{proxy.port} - {proxy.speed}ms
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Success Rate:</span> {proxy.successRate}%
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      proxy.anonymity === 'high' ? 'bg-green-600' :
                      proxy.anonymity === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      {proxy.anonymity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResults && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Stealth Test Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-400 mb-3">Fingerprint Tests</h4>
                <div className="space-y-2">
                  {Object.entries(testResults.fingerprint).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        value === 'passed' ? 'bg-green-600' : 'bg-red-600'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-400 mb-3">Network Tests</h4>
                <div className="space-y-2">
                  {Object.entries(testResults.network).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        value === 'connected' || value === 'protected' || value === 'blocked' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-400 mb-3">Behavior Tests</h4>
                <div className="space-y-2">
                  {Object.entries(testResults.behavior).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        value === 'human-like' || value === 'natural' || value === 'smooth' || value === 'randomized' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-purple-400 mb-3">Anonymity Tests</h4>
                <div className="space-y-2">
                  {Object.entries(testResults.anonymity).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        value === 'Spoofed' ? 'bg-green-600' : value === 'Direct' || value === 'Real' ? 'bg-red-600' : 'bg-yellow-600'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Stealth Rating</span>
                <span className={`px-3 py-1 rounded-lg font-semibold ${
                  testResults.overall === 'excellent' ? 'bg-green-600' :
                  testResults.overall === 'good' ? 'bg-blue-600' : 'bg-orange-600'
                }`}>
                  {testResults.overall.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={runStealthTest}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Activity className="w-4 h-4" />
            Run Stealth Test
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
            
            {/* Behavior Mimicry */}
            <div className="mb-6">
              <h4 className="font-medium text-purple-400 mb-3">Behavior Mimicry</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.behaviorMimicry.humanTyping}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      behaviorMimicry: { ...prev.behaviorMimicry, humanTyping: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">Human Typing</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.behaviorMimicry.mouseMovement}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      behaviorMimicry: { ...prev.behaviorMimicry, mouseMovement: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">Mouse Movement</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.behaviorMimicry.timingRandomization}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      behaviorMimicry: { ...prev.behaviorMimicry, timingRandomization: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">Timing Randomization</span>
                </label>
              </div>
            </div>

            {/* Data Protection */}
            <div>
              <h4 className="font-medium text-purple-400 mb-3">Data Protection</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.dataProtection.cookieClearing}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      dataProtection: { ...prev.dataProtection, cookieClearing: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">Cookie Clearing</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.dataProtection.localStorageClearing}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      dataProtection: { ...prev.dataProtection, localStorageClearing: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">Local Storage Clearing</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={config.dataProtection.historyClearing}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      dataProtection: { ...prev.dataProtection, historyClearing: e.target.checked }
                    }))}
                    className="w-3 h-3 text-purple-600 rounded"
                  />
                  <span className="text-sm">History Clearing</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StealthMode;
