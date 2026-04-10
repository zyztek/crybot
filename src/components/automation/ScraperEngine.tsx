/**
 * Scraper Engine Component
 * 
 * Advanced web scraping and crawling system for faucet discovery and data extraction
 * Supports multiple scraping methods, proxy rotation, and anti-bot detection bypass
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Activity, Play, Pause, Settings, Download, Filter, RefreshCw, Database, Link, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ScrapingTarget {
  id: string;
  name: string;
  url: string;
  type: 'faucet' | 'exchange' | 'airdrop' | 'mining' | 'staking' | 'defi';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'scraping' | 'completed' | 'failed' | 'blocked';
  lastScraped?: string;
  dataExtracted: number;
  errors: number;
  config: {
    depth: number;
    followLinks: boolean;
    extractForms: boolean;
    extractApis: boolean;
    delay: number; // milliseconds
    retries: number;
  };
}

interface ScrapedData {
  id: string;
  targetId: string;
  type: 'faucet' | 'form' | 'api' | 'link' | 'wallet' | 'contact';
  url: string;
  title: string;
  content: string;
  metadata: {
    captcha?: string;
    minReward?: number;
    maxReward?: number;
    currency?: string;
    cooldown?: number;
    requirements?: string[];
    socials?: Record<string, string>;
  };
  extractedAt: string;
  confidence: number; // 0-100
}

interface ScraperConfig {
  enabled: boolean;
  maxConcurrent: number;
  userAgentRotation: boolean;
  proxyRotation: boolean;
  delayRange: { min: number; max: number };
  timeout: number; // seconds
  retryAttempts: number;
  headers: Record<string, string>;
  javascript: boolean;
  cookies: boolean;
  screenshots: boolean;
  dataExtraction: {
    forms: boolean;
    links: boolean;
    images: boolean;
    apis: boolean;
    wallets: boolean;
    socials: boolean;
  };
  antiDetection: {
    randomDelays: boolean;
    mouseMovement: boolean;
    scrollSimulation: boolean;
    viewportRotation: boolean;
    canvasRandomization: boolean;
  };
}

const ScraperEngine: React.FC = () => {
  const [targets, setTargets] = useState<ScrapingTarget[]>([]);
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
  const [config, setConfig] = useState<ScraperConfig>({
    enabled: false,
    maxConcurrent: 3,
    userAgentRotation: true,
    proxyRotation: true,
    delayRange: { min: 1000, max: 5000 },
    timeout: 30,
    retryAttempts: 3,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    },
    javascript: true,
    cookies: true,
    screenshots: true,
    dataExtraction: {
      forms: true,
      links: true,
      images: false,
      apis: true,
      wallets: true,
      socials: true
    },
    antiDetection: {
      randomDelays: true,
      mouseMovement: true,
      scrollSimulation: true,
      viewportRotation: true,
      canvasRandomization: true
    }
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<ScrapingTarget | null>(null);
  const [stats, setStats] = useState({
    totalTargets: 0,
    completedTargets: 0,
    failedTargets: 0,
    totalDataExtracted: 0,
    averageConfidence: 0,
    scrapingRate: 0, // targets per hour
    dataPoints: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock targets initialization
  useEffect(() => {
    const mockTargets: ScrapingTarget[] = [
      {
        id: '1',
        name: 'FreeBitcoin Faucet',
        url: 'https://freebitco.in',
        type: 'faucet',
        category: 'Bitcoin',
        priority: 'high',
        status: 'pending',
        dataExtracted: 0,
        errors: 0,
        config: {
          depth: 2,
          followLinks: true,
          extractForms: true,
          extractApis: true,
          delay: 2000,
          retries: 3
        }
      },
      {
        id: '2',
        name: 'Cointiply Platform',
        url: 'https://cointiply.com',
        type: 'faucet',
        category: 'Multi-Coin',
        priority: 'high',
        status: 'pending',
        dataExtracted: 0,
        errors: 0,
        config: {
          depth: 3,
          followLinks: true,
          extractForms: true,
          extractApis: true,
          delay: 1500,
          retries: 2
        }
      },
      {
        id: '3',
        name: 'FireFaucet Network',
        url: 'https://firefaucet.win',
        type: 'faucet',
        category: 'Multi-Coin',
        priority: 'medium',
        status: 'pending',
        dataExtracted: 0,
        errors: 0,
        config: {
          depth: 2,
          followLinks: true,
          extractForms: true,
          extractApis: false,
          delay: 3000,
          retries: 3
        }
      }
    ];

    setTargets(mockTargets);
  }, []);

  // Scraping simulation
  useEffect(() => {
    if (!isRunning) return;

    const scrapeTarget = async (target: ScrapingTarget) => {
      // Update target status to scraping
      setTargets(prev => prev.map(t => 
        t.id === target.id ? { ...t, status: 'scraping' } : t
      ));

      // Simulate scraping process
      const scrapingTime = Math.random() * 30000 + 10000; // 10-40 seconds
      const success = Math.random() > 0.15; // 85% success rate
      const dataPointsCount = Math.floor(Math.random() * 15) + 5; // 5-20 data points

      await new Promise(resolve => setTimeout(resolve, scrapingTime));

      if (success) {
        // Generate mock scraped data
        const newData: ScrapedData[] = [];
        
        for (let i = 0; i < dataPointsCount; i++) {
          const types: ScrapedData['type'][] = ['faucet', 'form', 'api', 'link', 'wallet', 'contact'];
          const type = types[Math.floor(Math.random() * types.length)];
          
          newData.push({
            id: `data-${Date.now()}-${i}`,
            targetId: target.id,
            type,
            url: `${target.url}/${type}/${i}`,
            title: `Extracted ${type} ${i + 1}`,
            content: `Extracted content for ${type} from ${target.name}`,
            metadata: {
              captcha: ['none', 'recaptcha', 'hcaptcha', 'image'][Math.floor(Math.random() * 4)],
              minReward: type === 'faucet' ? Math.random() * 0.001 : undefined,
              maxReward: type === 'faucet' ? Math.random() * 0.01 : undefined,
              currency: type === 'faucet' ? ['BTC', 'ETH', 'LTC', 'DOGE'][Math.floor(Math.random() * 4)] : undefined,
              cooldown: type === 'faucet' ? Math.floor(Math.random() * 1440) + 1 : undefined,
              requirements: type === 'faucet' ? ['email', 'wallet', 'captcha'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,
              socials: type === 'contact' ? {
                twitter: `@${target.name.toLowerCase().replace(/\s+/g, '')}`,
                telegram: `@${target.name.toLowerCase().replace(/\s+/g, '')}bot`
              } : undefined
            },
            extractedAt: new Date().toISOString(),
            confidence: Math.random() * 30 + 70 // 70-100%
          });
        }

        setScrapedData(prev => [...prev, ...newData]);
        
        // Update target status
        setTargets(prev => prev.map(t => 
          t.id === target.id 
            ? { 
                ...t, 
                status: 'completed', 
                lastScraped: new Date().toISOString(),
                dataExtracted: t.dataExtracted + dataPointsCount
              }
            : t
        ));
      } else {
        // Handle scraping failure
        setTargets(prev => prev.map(t => 
          t.id === target.id 
            ? { 
                ...t, 
                status: Math.random() > 0.5 ? 'failed' : 'blocked',
                errors: t.errors + 1
              }
            : t
        ));
      }
    };

    const interval = setInterval(() => {
      const pendingTargets = targets.filter(t => t.status === 'pending');
      const scrapingTargets = targets.filter(t => t.status === 'scraping');
      
      if (pendingTargets.length > 0 && scrapingTargets.length < config.maxConcurrent) {
        const nextTarget = pendingTargets.sort((a, b) => {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        })[0];
        
        scrapeTarget(nextTarget);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning, targets, config.maxConcurrent]);

  // Update stats
  useEffect(() => {
    const completedTargets = targets.filter(t => t.status === 'completed').length;
    const failedTargets = targets.filter(t => t.status === 'failed' || t.status === 'blocked').length;
    const totalDataPoints = scrapedData.length;
    const avgConfidence = scrapedData.length > 0 
      ? scrapedData.reduce((sum, d) => sum + d.confidence, 0) / scrapedData.length 
      : 0;

    setStats({
      totalTargets: targets.length,
      completedTargets,
      failedTargets,
      totalDataExtracted: totalDataPoints,
      averageConfidence: avgConfidence,
      scrapingRate: completedTargets > 0 ? (completedTargets / (targets.reduce((sum, t) => sum + (t.dataExtracted || 0), 0) / 60)) : 0,
      dataPoints: totalDataPoints
    });
  }, [targets, scrapedData]);

  const toggleScraping = () => {
    setIsRunning(!isRunning);
  };

  const addTarget = () => {
    const newTarget: ScrapingTarget = {
      id: Date.now().toString(),
      name: `New Target ${targets.length + 1}`,
      url: 'https://example.com',
      type: 'faucet',
      category: 'Unknown',
      priority: 'medium',
      status: 'pending',
      dataExtracted: 0,
      errors: 0,
      config: {
        depth: 2,
        followLinks: true,
        extractForms: true,
        extractApis: true,
        delay: 2000,
        retries: 3
      }
    };

    setTargets(prev => [...prev, newTarget]);
  };

  const removeTarget = (targetId: string) => {
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setScrapedData(prev => prev.filter(d => d.targetId !== targetId));
  };

  const retryTarget = (targetId: string) => {
    setTargets(prev => prev.map(t => 
      t.id === targetId 
        ? { ...t, status: 'pending', errors: 0 }
        : t
    ));
  };

  const exportData = () => {
    const exportData = {
      targets,
      scrapedData,
      config,
      stats,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scraped-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTargetStatusIcon = (status: ScrapingTarget['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'scraping':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'blocked':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getDataIcon = (type: ScrapedData['type']) => {
    switch (type) {
      case 'faucet':
        return <Database className="w-4 h-4 text-blue-400" />;
      case 'form':
        return <Filter className="w-4 h-4 text-green-400" />;
      case 'api':
        return <Link className="w-4 h-4 text-purple-400" />;
      case 'link':
        return <Globe className="w-4 h-4 text-gray-400" />;
      case 'wallet':
        return <Database className="w-4 h-4 text-yellow-400" />;
      case 'contact':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Search className="w-8 h-8 text-purple-400" />
            Scraper Engine
          </h1>
          <p className="text-gray-400">
            Advanced web scraping and crawling system for faucet discovery and data extraction
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Targets</div>
                <div className="text-2xl font-bold">
                  {targets.filter(t => t.status === 'scraping').length}/{config.maxConcurrent}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="text-2xl font-bold">{stats.completedTargets}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Data Points</div>
                <div className="text-2xl font-bold">{stats.dataPoints}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Confidence</div>
                <div className="text-2xl font-bold">{stats.averageConfidence.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Scraping Rate</div>
                <div className="text-2xl font-bold">{stats.scrapingRate.toFixed(1)}/h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Scraping Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleScraping}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Scraping
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Scraping
                  </>
                )}
              </button>
              <button
                onClick={addTarget}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Target
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Data
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
              Targets: {targets.length} | 
              Completed: {stats.completedTargets} | 
              Failed: {stats.failedTargets} | 
              Data Points: {stats.dataPoints}
            </span>
          </div>
        </div>

        {/* Targets List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Scraping Targets</h3>
            <div className="space-y-3">
              {targets.map((target) => (
                <div
                  key={target.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTarget?.id === target.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedTarget(target)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTargetStatusIcon(target.status)}
                      <h4 className="font-semibold">{target.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        target.priority === 'critical' ? 'bg-red-600' :
                        target.priority === 'high' ? 'bg-orange-600' :
                        target.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {target.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          retryTarget(target.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Retry"
                      >
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTarget(target.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Remove"
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Type:</span> {target.type}
                    </div>
                    <div>
                      <span className="text-gray-400">Category:</span> {target.category}
                    </div>
                    <div>
                      <span className="text-gray-400">URL:</span> 
                      <span className="font-mono text-xs">{target.url}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Data Extracted:</span> {target.dataExtracted}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Errors:</span> {target.errors}
                      {target.lastScraped && (
                        <span className="ml-3 text-gray-400">
                          Last: {new Date(target.lastScraped).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        Depth: {target.config.depth}
                      </span>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {target.config.followLinks ? 'Links' : 'No Links'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Target Details */}
          {selectedTarget && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Target Details: {selectedTarget.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Scraping Depth:</span>
                        <span>{selectedTarget.config.depth} levels</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Follow Links:</span>
                        <span>{selectedTarget.config.followLinks ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extract Forms:</span>
                        <span>{selectedTarget.config.extractForms ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extract APIs:</span>
                        <span>{selectedTarget.config.extractApis ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delay:</span>
                        <span>{selectedTarget.config.delay}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retries:</span>
                        <span>{selectedTarget.config.retries}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="capitalize">{selectedTarget.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Data Extracted:</span>
                        <span>{selectedTarget.dataExtracted} points</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Errors:</span>
                        <span>{selectedTarget.errors}</span>
                      </div>
                      {selectedTarget.lastScraped && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Scraped:</span>
                          <span>{new Date(selectedTarget.lastScraped).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scraped Data */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Extracted Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Title</th>
                  <th className="text-left py-2 px-3">URL</th>
                  <th className="text-left py-2 px-3">Confidence</th>
                  <th className="text-left py-2 px-3">Metadata</th>
                  <th className="text-left py-2 px-3">Extracted</th>
                </tr>
              </thead>
              <tbody>
                {scrapedData.slice(0, 10).map((data) => (
                  <tr key={data.id} className="border-b border-gray-700">
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {getDataIcon(data.type)}
                        <span className="capitalize">{data.type}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">{data.title}</td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs">{data.url}</span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-700 rounded-full h-2 max-w-[50px]">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${data.confidence}%` }}
                          ></div>
                        </div>
                        <span>{data.confidence.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="space-y-1">
                        {data.metadata.captcha && (
                          <div className="text-xs">
                            <span className="text-gray-400">Captcha:</span> {data.metadata.captcha}
                          </div>
                        )}
                        {data.metadata.currency && (
                          <div className="text-xs">
                            <span className="text-gray-400">Currency:</span> {data.metadata.currency}
                          </div>
                        )}
                        {data.metadata.minReward && (
                          <div className="text-xs">
                            <span className="text-gray-400">Reward:</span> {data.metadata.minReward.toFixed(6)}-{data.metadata.maxReward?.toFixed(6)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      {new Date(data.extractedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {scrapedData.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No data extracted yet
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Scraper Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Concurrent</label>
                    <input
                      type="number"
                      value={config.maxConcurrent}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxConcurrent: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeout (seconds)</label>
                    <input
                      type="number"
                      value={config.timeout}
                      onChange={(e) => setConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="10"
                      max="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Delay (ms)</label>
                    <input
                      type="number"
                      value={config.delayRange.min}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        delayRange: { ...prev.delayRange, min: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="100"
                      max="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Delay (ms)</label>
                    <input
                      type="number"
                      value={config.delayRange.max}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        delayRange: { ...prev.delayRange, max: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="100"
                      max="30000"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Data Extraction</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.dataExtraction.forms}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          dataExtraction: { ...prev.dataExtraction, forms: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Forms</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.dataExtraction.links}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          dataExtraction: { ...prev.dataExtraction, links: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Links</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.dataExtraction.apis}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          dataExtraction: { ...prev.dataExtraction, apis: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">APIs</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.dataExtraction.wallets}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          dataExtraction: { ...prev.dataExtraction, wallets: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Wallets</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.dataExtraction.socials}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          dataExtraction: { ...prev.dataExtraction, socials: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Socials</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Anti-Detection</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.antiDetection.randomDelays}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          antiDetection: { ...prev.antiDetection, randomDelays: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Random Delays</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.antiDetection.mouseMovement}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          antiDetection: { ...prev.antiDetection, mouseMovement: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Mouse Movement</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.antiDetection.scrollSimulation}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          antiDetection: { ...prev.antiDetection, scrollSimulation: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Scroll Simulation</span>
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

export default ScraperEngine;
