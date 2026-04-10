/**
 * Automation Engine Component
 * 
 * Complete automated faucet claiming engine with scheduling, retry logic,
 * and integration with persona management, stealth mode, and captcha worker
 */

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Play, Pause, Settings, Activity, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Globe, Shield, RefreshCw, Calendar, TrendingUp } from 'lucide-react';

interface FaucetConfig {
  id: string;
  name: string;
  url: string;
  type: 'standard' | 'roll' | 'timer' | 'claim';
  reward: {
    min: number;
    max: number;
    currency: string;
    average: number;
  };
  cooldown: number; // minutes
  captcha: {
    type: 'none' | 'image' | 'recaptcha' | 'hcaptcha';
    difficulty: 'easy' | 'medium' | 'hard';
  };
  requirements: {
    minBalance?: number;
    maxClaims?: number;
    verification?: boolean;
  };
  stats: {
    totalClaims: number;
    successfulClaims: number;
    failedClaims: number;
    totalEarnings: number;
    averageTime: number; // seconds
    successRate: number;
    lastClaim: string;
  };
  isActive: boolean;
  priority: number;
}

interface AutomationTask {
  id: string;
  faucetId: string;
  personaId: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'retrying';
  startTime: number;
  endTime?: number;
  result?: {
    success: boolean;
    amount: number;
    currency: string;
    txHash?: string;
    error?: string;
  };
  retryCount: number;
  maxRetries: number;
  nextRetry?: number;
}

interface AutomationConfig {
  enabled: boolean;
  maxConcurrent: number;
  retryDelay: number; // minutes
  maxRetries: number;
  schedule: {
    enabled: boolean;
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    breakTimes: Array<{
      start: string;
      end: string;
    }>;
  };
  performance: {
    randomDelay: boolean;
    delayRange: { min: number; max: number }; // seconds
    humanBehavior: boolean;
    stealthRotation: boolean;
  };
  notifications: {
    onSuccess: boolean;
    onFailure: boolean;
    onThreshold: boolean;
    threshold: number; // percentage
  };
}

const AutomationEngine: React.FC = () => {
  const [faucets, setFaucets] = useState<FaucetConfig[]>([]);
  const [tasks, setTasks] = useState<AutomationTask[]>([]);
  const [config, setConfig] = useState<AutomationConfig>({
    enabled: false,
    maxConcurrent: 3,
    retryDelay: 5,
    maxRetries: 3,
    schedule: {
      enabled: true,
      timezone: 'UTC',
      workingHours: { start: '00:00', end: '23:59' },
      breakTimes: []
    },
    performance: {
      randomDelay: true,
      delayRange: { min: 30, max: 300 },
      humanBehavior: true,
      stealthRotation: true
    },
    notifications: {
      onSuccess: false,
      onFailure: true,
      onThreshold: true,
      threshold: 85
    }
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFaucet, setSelectedFaucet] = useState<FaucetConfig | null>(null);
  const [stats, setStats] = useState({
    totalTasks: 0,
    successfulTasks: 0,
    failedTasks: 0,
    totalEarnings: 0,
    averageTime: 0,
    tasksPerHour: 0,
    earningsPerHour: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock faucets data
  useEffect(() => {
    const mockFaucets: FaucetConfig[] = [
      {
        id: '1',
        name: 'FreeBitcoin',
        url: 'https://freebitco.in',
        type: 'roll',
        reward: {
          min: 0.00000001,
          max: 0.025,
          currency: 'BTC',
          average: 0.000012
        },
        cooldown: 60,
        captcha: {
          type: 'recaptcha',
          difficulty: 'medium'
        },
        requirements: {
          verification: true
        },
        stats: {
          totalClaims: 1250,
          successfulClaims: 1180,
          failedClaims: 70,
          totalEarnings: 0.01456,
          averageTime: 45,
          successRate: 94.4,
          lastClaim: new Date(Date.now() - 3600000).toISOString()
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Cointiply',
        url: 'https://cointiply.com',
        type: 'claim',
        reward: {
          min: 10,
          max: 100000,
          currency: 'coins',
          average: 2500
        },
        cooldown: 10,
        captcha: {
          type: 'image',
          difficulty: 'easy'
        },
        requirements: {
          minBalance: 50000
        },
        stats: {
          totalClaims: 3420,
          successfulClaims: 3250,
          failedClaims: 170,
          totalEarnings: 8.55,
          averageTime: 35,
          successRate: 95.0,
          lastClaim: new Date(Date.now() - 1800000).toISOString()
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'FireFaucet',
        url: 'https://firefaucet.win',
        type: 'claim',
        reward: {
          min: 1,
          max: 1000,
          currency: 'satoshi',
          average: 150
        },
        cooldown: 5,
        captcha: {
          type: 'hcaptcha',
          difficulty: 'medium'
        },
        requirements: {
          maxClaims: 50
        },
        stats: {
          totalClaims: 890,
          successfulClaims: 820,
          failedClaims: 70,
          totalEarnings: 133500,
          averageTime: 25,
          successRate: 92.1,
          lastClaim: new Date(Date.now() - 900000).toISOString()
        },
        isActive: true,
        priority: 3
      }
    ];

    setFaucets(mockFaucets);
  }, []);

  // Generate tasks based on schedule
  useEffect(() => {
    if (!isRunning || !config.schedule.enabled) return;

    const generateTask = () => {
      const activeFaucets = faucets.filter(f => f.isActive);
      if (activeFaucets.length === 0) return;

      const faucet = activeFaucets[Math.floor(Math.random() * activeFaucets.length)];
      const personaId = `persona_${Math.floor(Math.random() * 3) + 1}`; // Mock persona IDs

      const newTask: AutomationTask = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        faucetId: faucet.id,
        personaId,
        status: 'pending',
        startTime: Date.now(),
        retryCount: 0,
        maxRetries: config.maxRetries
      };

      setTasks(prev => [...prev, newTask]);
    };

    const interval = setInterval(() => {
      const runningTasks = tasks.filter(t => t.status === 'running');
      if (runningTasks.length < config.maxConcurrent) {
        generateTask();
      }
    }, Math.random() * 30000 + 15000); // Random interval 15-45 seconds

    return () => clearInterval(interval);
  }, [isRunning, config.schedule.enabled, config.maxConcurrent, faucets, tasks]);

  // Process tasks
  useEffect(() => {
    if (!isRunning) return;

    const processTask = async (task: AutomationTask) => {
      const faucet = faucets.find(f => f.id === task.faucetId);
      if (!faucet) return;

      // Update task status to running
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, status: 'running' } : t
      ));

      // Simulate processing time
      const processingTime = Math.random() * 60000 + 30000; // 30-90 seconds
      const success = Math.random() > 0.15; // 85% success rate
      const amount = success ? 
        (Math.random() * (faucet.reward.max - faucet.reward.min) + faucet.reward.min) : 0;

      await new Promise(resolve => setTimeout(resolve, processingTime));

      // Update task result
      const result = {
        success,
        amount,
        currency: faucet.reward.currency,
        error: success ? undefined : 'Connection timeout'
      };

      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? {
              ...t,
              status: success ? 'success' : 'failed',
              endTime: Date.now(),
              result,
              nextRetry: !success && task.retryCount < config.maxRetries 
                ? Date.now() + (config.retryDelay * 60000)
                : undefined
            }
          : t
      ));

      // Update faucet stats
      setFaucets(prev => prev.map(f => 
        f.id === faucet.id 
          ? {
              ...f,
              stats: {
                ...f.stats,
                totalClaims: f.stats.totalClaims + 1,
                successfulClaims: f.stats.successfulClaims + (success ? 1 : 0),
                failedClaims: f.stats.failedClaims + (success ? 0 : 1),
                totalEarnings: f.stats.totalEarnings + (success ? amount : 0),
                averageTime: (f.stats.averageTime * f.stats.totalClaims + processingTime / 1000) / (f.stats.totalClaims + 1),
                successRate: ((f.stats.successfulClaims + (success ? 1 : 0)) / (f.stats.totalClaims + 1)) * 100,
                lastClaim: new Date().toISOString()
              }
            }
          : f
      ));
    };

    const interval = setInterval(() => {
      const pendingTasks = tasks.filter(t => t.status === 'pending');
      if (pendingTasks.length === 0) return;

      const runningTasks = tasks.filter(t => t.status === 'running');
      if (runningTasks.length >= config.maxConcurrent) return;

      const nextTask = pendingTasks[0];
      processTask(nextTask);
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning, tasks, config.maxConcurrent, config.retryDelay, faucets]);

  // Handle retries
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const retryableTasks = tasks.filter(t => 
        t.status === 'failed' && 
        t.retryCount < t.maxRetries && 
        t.nextRetry && 
        t.nextRetry <= now
      );

      retryableTasks.forEach(task => {
        setTasks(prev => prev.map(t => 
          t.id === task.id 
            ? { ...t, status: 'retrying', retryCount: t.retryCount + 1 }
            : t
        ));
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  // Update overall stats
  useEffect(() => {
    const completedTasks = tasks.filter(t => t.status === 'success' || t.status === 'failed');
    const successfulTasks = tasks.filter(t => t.status === 'success');
    const totalEarnings = successfulTasks.reduce((sum, t) => sum + (t.result?.amount || 0), 0);
    const totalTime = completedTasks.reduce((sum, t) => 
      sum + ((t.endTime || 0) - t.startTime) / 1000, 0
    );

    setStats({
      totalTasks: completedTasks.length,
      successfulTasks: successfulTasks.length,
      failedTasks: tasks.filter(t => t.status === 'failed').length,
      totalEarnings,
      averageTime: completedTasks.length > 0 ? totalTime / completedTasks.length : 0,
      tasksPerHour: completedTasks.length > 0 ? (completedTasks.length / (totalTime / 3600)) : 0,
      earningsPerHour: totalTime > 0 ? (totalEarnings / (totalTime / 3600)) : 0
    });
  }, [tasks]);

  const toggleAutomation = () => {
    setIsRunning(!isRunning);
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(t => t.status === 'pending' || t.status === 'running' || t.status === 'retrying'));
  };

  const retryFailedTasks = () => {
    setTasks(prev => prev.map(t => 
      (t.status === 'failed' || t.status === 'retrying') && t.retryCount < config.maxRetries
        ? { ...t, status: 'pending', nextRetry: undefined }
        : t
    ));
  };

  const toggleFaucet = (faucetId: string) => {
    setFaucets(prev => prev.map(f => 
      f.id === faucetId ? { ...f, isActive: !f.isActive } : f
    ));
  };

  const getTaskStatusIcon = (status: AutomationTask['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'retrying':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getFaucetTypeColor = (type: FaucetConfig['type']) => {
    switch (type) {
      case 'roll': return 'bg-purple-600';
      case 'claim': return 'bg-blue-600';
      case 'timer': return 'bg-green-600';
      case 'standard': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bot className="w-8 h-8 text-purple-400" />
            Automation Engine
          </h1>
          <p className="text-gray-400">
            Automated faucet claiming system with scheduling, retry logic, and multi-persona support
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Tasks</div>
                <div className="text-2xl font-bold">
                  {tasks.filter(t => t.status === 'running').length}/{config.maxConcurrent}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Success Rate</div>
                <div className="text-2xl font-bold">
                  {stats.totalTasks > 0 ? ((stats.successfulTasks / stats.totalTasks) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Earnings</div>
                <div className="text-2xl font-bold">{stats.totalEarnings.toFixed(6)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Tasks/Hour</div>
                <div className="text-2xl font-bold">{stats.tasksPerHour.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Control Panel</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleAutomation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Automation
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Automation
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

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={clearCompletedTasks}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
            >
              Clear Completed
            </button>
            <button
              onClick={retryFailedTasks}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors text-sm"
            >
              Retry Failed
            </button>
            <div className="text-sm text-gray-400">
              Queue: {tasks.filter(t => t.status === 'pending').length} | 
              Running: {tasks.filter(t => t.status === 'running').length} | 
              Retrying: {tasks.filter(t => t.status === 'retrying').length} | 
              Success: {tasks.filter(t => t.status === 'success').length} | 
              Failed: {tasks.filter(t => t.status === 'failed').length}
            </div>
          </div>
        </div>

        {/* Faucets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Faucet List</h3>
            <div className="space-y-3">
              {faucets.map((faucet) => (
                <div
                  key={faucet.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFaucet?.id === faucet.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedFaucet(faucet)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${faucet.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <h4 className="font-semibold">{faucet.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${getFaucetTypeColor(faucet.type)}`}>
                        {faucet.type.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFaucet(faucet.id);
                      }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        faucet.isActive
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {faucet.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Reward:</span> {faucet.reward.min}-{faucet.reward.max} {faucet.reward.currency}
                    </div>
                    <div>
                      <span className="text-gray-400">Cooldown:</span> {faucet.cooldown} min
                    </div>
                    <div>
                      <span className="text-gray-400">Captcha:</span> {faucet.captcha.type}
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {faucet.stats.successRate.toFixed(1)}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Total Claims:</span> {faucet.stats.totalClaims} | 
                      <span className="text-gray-400"> Earnings:</span> {faucet.stats.totalEarnings.toFixed(6)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>Priority {faucet.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Faucet Details */}
          {selectedFaucet && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Faucet Details: {selectedFaucet.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">URL:</span> {selectedFaucet.url}
                      </div>
                      <div>
                        <span className="text-gray-400">Type:</span> {selectedFaucet.type}
                      </div>
                      <div>
                        <span className="text-gray-400">Cooldown:</span> {selectedFaucet.cooldown} minutes
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Reward Structure</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>{selectedFaucet.reward.min} {selectedFaucet.reward.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum:</span>
                        <span>{selectedFaucet.reward.max} {selectedFaucet.reward.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span>{selectedFaucet.reward.average} {selectedFaucet.reward.currency}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{selectedFaucet.stats.successRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Time:</span>
                        <span>{selectedFaucet.stats.averageTime.toFixed(1)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Earnings:</span>
                        <span>{selectedFaucet.stats.totalEarnings.toFixed(6)} {selectedFaucet.reward.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Claim:</span>
                        <span>{new Date(selectedFaucet.stats.lastClaim).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task Queue */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Task Queue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3">ID</th>
                  <th className="text-left py-2 px-3">Faucet</th>
                  <th className="text-left py-2 px-3">Persona</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Duration</th>
                  <th className="text-left py-2 px-3">Result</th>
                  <th className="text-left py-2 px-3">Retries</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 10).map((task) => {
                  const faucet = faucets.find(f => f.id === task.faucetId);
                  return (
                    <tr key={task.id} className="border-b border-gray-700">
                      <td className="py-2 px-3 font-mono text-xs">{task.id.substring(0, 8)}...</td>
                      <td className="py-2 px-3">{faucet?.name || 'Unknown'}</td>
                      <td className="py-2 px-3">{task.personaId}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          {getTaskStatusIcon(task.status)}
                          <span className="capitalize">{task.status}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        {task.endTime 
                          ? `${((task.endTime - task.startTime) / 1000).toFixed(1)}s`
                          : task.status === 'running'
                            ? `${((Date.now() - task.startTime) / 1000).toFixed(1)}s`
                            : '-'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {task.result ? (
                          <div>
                            <div className={task.result.success ? 'text-green-400' : 'text-red-400'}>
                              {task.result.success ? 
                                `${task.result.amount.toFixed(6)} ${task.result.currency}` : 
                                task.result.error
                              }
                            </div>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="py-2 px-3">{task.retryCount}/{task.maxRetries}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No tasks in queue
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Automation Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Concurrent Tasks</label>
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
                    <label className="block text-sm font-medium mb-2">Max Retries</label>
                    <input
                      type="number"
                      value={config.maxRetries}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Retry Delay (minutes)</label>
                    <input
                      type="number"
                      value={config.retryDelay}
                      onChange={(e) => setConfig(prev => ({ ...prev, retryDelay: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Success Threshold (%)</label>
                    <input
                      type="number"
                      value={config.notifications.threshold}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, threshold: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="50"
                      max="100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.performance.randomDelay}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        performance: { ...prev.performance, randomDelay: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Random delay between tasks</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.performance.humanBehavior}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        performance: { ...prev.performance, humanBehavior: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Human-like behavior simulation</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.performance.stealthRotation}
                      onChange={(e) => setConfig(prev => ({ 
                        ...prev, 
                        performance: { ...prev.performance, stealthRotation: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Automatic stealth rotation</span>
                  </label>
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

export default AutomationEngine;
