/**
 * Captcha Worker Component
 * 
 * Comprehensive captcha solving system with multiple service integrations
 * Supports 2Captcha, Anti-Captcha, CapMonster, and custom solvers
 */

import React, { useState, useEffect, useRef } from 'react';
import { Bot, CheckCircle, XCircle, RefreshCw, Settings, Play, Pause, Activity, Zap, AlertTriangle, Clock, DollarSign } from 'lucide-react';

interface CaptchaService {
  id: string;
  name: string;
  type: 'image' | 'recaptcha' | 'hcaptcha' | 'funcaptcha' | 'geetest' | 'turnstile';
  apiKey: string;
  endpoint: string;
  pricing: {
    image: number; // per 1000 solves
    recaptcha: number;
    hcaptcha: number;
    funcaptcha: number;
  };
  stats: {
    totalSolves: number;
    successRate: number;
    averageTime: number; // seconds
    cost: number; // total cost
  };
  isActive: boolean;
  priority: number; // 1 = highest priority
}

interface CaptchaTask {
  id: string;
  type: 'image' | 'recaptcha' | 'hcaptcha' | 'funcaptcha' | 'geetest' | 'turnstile';
  siteKey?: string;
  url?: string;
  imageData?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'processing' | 'solved' | 'failed';
  solution?: string;
  service?: string;
  startTime: number;
  endTime?: number;
  cost?: number;
  retries: number;
}

interface WorkerConfig {
  maxConcurrent: number;
  timeout: number; // seconds
  retryAttempts: number;
  retryDelay: number; // seconds
  autoRotate: boolean;
  rotationInterval: number; // minutes
  fallbackServices: string[];
}

const CaptchaWorker: React.FC = () => {
  const [services, setServices] = useState<CaptchaService[]>([]);
  const [tasks, setTasks] = useState<CaptchaTask[]>([]);
  const [config, setConfig] = useState<WorkerConfig>({
    maxConcurrent: 5,
    timeout: 120,
    retryAttempts: 3,
    retryDelay: 5,
    autoRotate: true,
    rotationInterval: 30,
    fallbackServices: []
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedService, setSelectedService] = useState<CaptchaService | null>(null);
  const [stats, setStats] = useState({
    totalSolves: 0,
    successRate: 0,
    averageTime: 0,
    totalCost: 0,
    activeWorkers: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock services data
  useEffect(() => {
    const mockServices: CaptchaService[] = [
      {
        id: '1',
        name: '2Captcha',
        type: 'recaptcha',
        apiKey: 'demo_api_key_2captcha',
        endpoint: 'https://2captcha.com',
        pricing: {
          image: 0.5,
          recaptcha: 2.0,
          hcaptcha: 2.5,
          funcaptcha: 2.0
        },
        stats: {
          totalSolves: 15420,
          successRate: 96.8,
          averageTime: 12,
          cost: 28.45
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Anti-Captcha',
        type: 'recaptcha',
        apiKey: 'demo_api_key_anticaptcha',
        endpoint: 'https://anti-captcha.com',
        pricing: {
          image: 0.4,
          recaptcha: 1.8,
          hcaptcha: 2.2,
          funcaptcha: 1.9
        },
        stats: {
          totalSolves: 12350,
          successRate: 95.2,
          averageTime: 15,
          cost: 22.18
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'CapMonster',
        type: 'recaptcha',
        apiKey: 'demo_api_key_capmonster',
        endpoint: 'https://api.capmonster.cloud',
        pricing: {
          image: 0.6,
          recaptcha: 2.2,
          hcaptcha: 2.8,
          funcaptcha: 2.1
        },
        stats: {
          totalSolves: 8920,
          successRate: 97.5,
          averageTime: 10,
          cost: 19.62
        },
        isActive: false,
        priority: 3
      }
    ];

    setServices(mockServices);
    setConfig(prev => ({
      ...prev,
      fallbackServices: mockServices.map(s => s.id)
    }));
  }, []);

  // Mock tasks generation
  useEffect(() => {
    const generateMockTask = (): CaptchaTask => {
      const types: CaptchaTask['type'][] = ['image', 'recaptcha', 'hcaptcha', 'funcaptcha'];
      const priorities: CaptchaTask['priority'][] = ['low', 'medium', 'high'];
      
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEbUjQ',
        url: 'https://example.com',
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: 'pending',
        startTime: Date.now(),
        retries: 0
      };
    };

    if (isRunning) {
      const interval = setInterval(() => {
        const newTask = generateMockTask();
        setTasks(prev => [...prev, newTask]);
      }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Process tasks
  useEffect(() => {
    if (!isRunning) return;

    const processTasks = async () => {
      const pendingTasks = tasks.filter(t => t.status === 'pending');
      const processingTasks = tasks.filter(t => t.status === 'processing');
      
      // Don't exceed max concurrent
      if (processingTasks.length >= config.maxConcurrent) return;

      // Get next task to process
      const nextTask = pendingTasks.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })[0];

      if (!nextTask) return;

      // Select best service
      const activeServices = services.filter(s => s.isActive).sort((a, b) => a.priority - b.priority);
      if (activeServices.length === 0) return;

      const service = activeServices[0];

      // Update task status
      setTasks(prev => prev.map(t => 
        t.id === nextTask.id 
          ? { ...t, status: 'processing', service: service.name }
          : t
      ));

      // Simulate captcha solving
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        const solveTime = Math.random() * 20 + 5; // 5-25 seconds
        const cost = service.pricing[nextTask.type] / 1000;

        setTasks(prev => prev.map(t => 
          t.id === nextTask.id 
            ? {
                ...t,
                status: success ? 'solved' : 'failed',
                endTime: Date.now(),
                solution: success ? `solution_${Math.random().toString(36).substr(2, 9)}` : undefined,
                cost,
                retries: success ? 0 : t.retries + 1
              }
            : t
        ));

        // Update service stats
        if (success) {
          setServices(prev => prev.map(s => 
            s.id === service.id 
              ? {
                  ...s,
                  stats: {
                    ...s.stats,
                    totalSolves: s.stats.totalSolves + 1,
                    successRate: (s.stats.totalSolves * s.stats.successRate + 100) / (s.stats.totalSolves + 1),
                    averageTime: (s.stats.averageTime * s.stats.totalSolves + solveTime) / (s.stats.totalSolves + 1),
                    cost: s.stats.cost + cost
                  }
                }
              : s
          ));
        }
      }, Math.random() * 15000 + 5000); // Random solve time 5-20 seconds
    };

    const interval = setInterval(processTasks, 2000);
    return () => clearInterval(interval);
  }, [isRunning, tasks, services, config.maxConcurrent]);

  // Update overall stats
  useEffect(() => {
    const solvedTasks = tasks.filter(t => t.status === 'solved');
    const failedTasks = tasks.filter(t => t.status === 'failed');
    const totalTasks = solvedTasks.length + failedTasks.length;

    setStats({
      totalSolves: solvedTasks.length,
      successRate: totalTasks > 0 ? (solvedTasks.length / totalTasks) * 100 : 0,
      averageTime: solvedTasks.length > 0 
        ? solvedTasks.reduce((sum, t) => sum + ((t.endTime || 0) - t.startTime) / 1000, 0) / solvedTasks.length 
        : 0,
      totalCost: solvedTasks.reduce((sum, t) => sum + (t.cost || 0), 0),
      activeWorkers: tasks.filter(t => t.status === 'processing').length
    });
  }, [tasks]);

  const toggleWorker = () => {
    setIsRunning(!isRunning);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(t => t.status === 'pending' || t.status === 'processing'));
  };

  const retryFailedTasks = () => {
    setTasks(prev => prev.map(t => 
      t.status === 'failed' && t.retries < config.retryAttempts
        ? { ...t, status: 'pending', retries: t.retries + 1 }
        : t
    ));
  };

  const updateServiceStatus = (serviceId: string, active: boolean) => {
    setServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, isActive: active } : s
    ));
  };

  const getServiceColor = (service: CaptchaService) => {
    if (!service.isActive) return 'bg-gray-600';
    if (service.stats.successRate >= 95) return 'bg-green-600';
    if (service.stats.successRate >= 90) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getTaskStatusIcon = (status: CaptchaTask['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'solved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
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
            <Bot className="w-8 h-8 text-purple-400" />
            Captcha Worker
          </h1>
          <p className="text-gray-400">
            Automated captcha solving system with multiple service integrations and load balancing
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Workers</div>
                <div className="text-2xl font-bold">{stats.activeWorkers}/{config.maxConcurrent}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Solved</div>
                <div className="text-2xl font-bold">{stats.totalSolves}</div>
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

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Cost</div>
                <div className="text-2xl font-bold">${stats.totalCost.toFixed(4)}</div>
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
                onClick={toggleWorker}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Worker
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Worker
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
            <button
              onClick={clearTasks}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
            >
              Clear All
            </button>
            <div className="text-sm text-gray-400">
              Queue: {tasks.filter(t => t.status === 'pending').length} | 
              Processing: {tasks.filter(t => t.status === 'processing').length} | 
              Completed: {tasks.filter(t => t.status === 'solved').length} | 
              Failed: {tasks.filter(t => t.status === 'failed').length}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Captcha Services</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedService?.id === service.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getServiceColor(service)}`}></div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        service.isActive ? 'bg-green-600' : 'bg-gray-600'
                      }`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateServiceStatus(service.id, !service.isActive);
                      }}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        service.isActive
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {service.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Total Solves:</span> {service.stats.totalSolves.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {service.stats.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Time:</span> {service.stats.averageTime}s
                    </div>
                    <div>
                      <span className="text-gray-400">Total Cost:</span> ${service.stats.cost.toFixed(4)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Priority:</span>
                    <span className="text-xs font-semibold">{service.priority}</span>
                    <div className="flex-1"></div>
                    <span className="text-xs text-gray-400">Pricing:</span>
                    <span className="text-xs">${service.pricing.recaptcha}/1k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Service Details */}
          {selectedService && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Details: {selectedService.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">API Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Endpoint:</span> {selectedService.endpoint}
                      </div>
                      <div>
                        <span className="text-gray-400">API Key:</span> {selectedService.apiKey.substring(0, 8)}...
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Pricing Table</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Image Captcha:</span>
                        <span>${selectedService.pricing.image}/1k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>reCAPTCHA:</span>
                        <span>${selectedService.pricing.recaptcha}/1k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>hCaptcha:</span>
                        <span>${selectedService.pricing.hcaptcha}/1k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FunCaptcha:</span>
                        <span>${selectedService.pricing.funcaptcha}/1k</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{selectedService.stats.successRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Response:</span>
                        <span>{selectedService.stats.averageTime.toFixed(1)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cost per Solve:</span>
                        <span>${(selectedService.stats.cost / selectedService.stats.totalSolves).toFixed(6)}</span>
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
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Priority</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Service</th>
                  <th className="text-left py-2 px-3">Time</th>
                  <th className="text-left py-2 px-3">Retries</th>
                  <th className="text-left py-2 px-3">Cost</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 10).map((task) => (
                  <tr key={task.id} className="border-b border-gray-700">
                    <td className="py-2 px-3 font-mono text-xs">{task.id.substring(0, 8)}...</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {task.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.priority === 'high' ? 'bg-red-600' :
                        task.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        {getTaskStatusIcon(task.status)}
                        <span className="capitalize">{task.status}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">{task.service || '-'}</td>
                    <td className="py-2 px-3">
                      {task.endTime 
                        ? `${((task.endTime - task.startTime) / 1000).toFixed(1)}s`
                        : task.status === 'processing'
                          ? `${((Date.now() - task.startTime) / 1000).toFixed(1)}s`
                          : '-'
                      }
                    </td>
                    <td className="py-2 px-3">{task.retries}</td>
                    <td className="py-2 px-3">${task.cost?.toFixed(6) || '-'}</td>
                  </tr>
                ))}
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
              <h2 className="text-2xl font-bold mb-6">Worker Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Concurrent Workers</label>
                    <input
                      type="number"
                      value={config.maxConcurrent}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxConcurrent: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeout (seconds)</label>
                    <input
                      type="number"
                      value={config.timeout}
                      onChange={(e) => setConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="30"
                      max="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Retry Attempts</label>
                    <input
                      type="number"
                      value={config.retryAttempts}
                      onChange={(e) => setConfig(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="0"
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
                      max="60"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.autoRotate}
                      onChange={(e) => setConfig(prev => ({ ...prev, autoRotate: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Auto-rotate services on failure</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rotation Interval (minutes)</label>
                    <input
                      type="number"
                      value={config.rotationInterval}
                      onChange={(e) => setConfig(prev => ({ ...prev, rotationInterval: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="5"
                      max="120"
                    />
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

export default CaptchaWorker;
