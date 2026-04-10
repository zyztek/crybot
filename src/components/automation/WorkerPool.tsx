/**
 * Worker Pool Component
 * 
 * Complete worker pool system for parallel faucet claiming and task distribution
 * Manages multiple workers, load balancing, and resource allocation
 */

import React, { useState, useEffect, useRef } from 'react';
import { Users, Activity, Play, Pause, Settings, Plus, Trash2, RefreshCw, Zap, Clock, CheckCircle, XCircle, AlertTriangle, Cpu, HardDrive, MemoryStick } from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  status: 'idle' | 'busy' | 'offline' | 'error';
  currentTask?: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageTime: number; // seconds
  efficiency: number; // percentage
  resourceUsage: {
    cpu: number; // percentage
    memory: number; // percentage
    network: number; // percentage
  };
  capabilities: {
    captchaSolving: boolean;
    stealthMode: boolean;
    multiPersona: boolean;
    concurrentTasks: number;
  };
  config: {
    maxConcurrent: number;
    timeout: number; // seconds
    retryAttempts: number;
    priority: number;
  };
  lastActivity: string;
  uptime: number; // minutes
}

interface Task {
  id: string;
  type: 'faucet_claim' | 'captcha_solve' | 'proxy_rotation' | 'persona_switch';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'queued' | 'assigned' | 'processing' | 'completed' | 'failed';
  assignedWorker?: string;
  startTime?: number;
  endTime?: number;
  result?: {
    success: boolean;
    data?: any;
    error?: string;
  };
  retryCount: number;
  maxRetries: number;
  estimatedTime: number; // seconds
}

interface PoolConfig {
  maxWorkers: number;
  loadBalancing: 'round_robin' | 'least_loaded' | 'priority_based' | 'random';
  autoScaling: boolean;
  minWorkers: number;
  maxConcurrentTasks: number;
  taskTimeout: number; // seconds
  healthCheckInterval: number; // seconds
  resourceThresholds: {
    cpu: number;
    memory: number;
    network: number;
  };
}

const WorkerPool: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [config, setConfig] = useState<PoolConfig>({
    maxWorkers: 10,
    loadBalancing: 'least_loaded',
    autoScaling: true,
    minWorkers: 2,
    maxConcurrentTasks: 50,
    taskTimeout: 300,
    healthCheckInterval: 30,
    resourceThresholds: {
      cpu: 80,
      memory: 85,
      network: 90
    }
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeWorkers: 0,
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    averageEfficiency: 0,
    totalThroughput: 0, // tasks per hour
    resourceUsage: {
      cpu: 0,
      memory: 0,
      network: 0
    }
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock workers initialization
  useEffect(() => {
    const mockWorkers: Worker[] = [
      {
        id: 'worker-1',
        name: 'Worker Alpha',
        status: 'idle',
        totalTasks: 145,
        completedTasks: 138,
        failedTasks: 7,
        averageTime: 32,
        efficiency: 95.2,
        resourceUsage: {
          cpu: 25,
          memory: 40,
          network: 15
        },
        capabilities: {
          captchaSolving: true,
          stealthMode: true,
          multiPersona: true,
          concurrentTasks: 3
        },
        config: {
          maxConcurrent: 3,
          timeout: 120,
          retryAttempts: 3,
          priority: 1
        },
        lastActivity: new Date().toISOString(),
        uptime: 240
      },
      {
        id: 'worker-2',
        name: 'Worker Beta',
        status: 'busy',
        currentTask: 'task-123',
        totalTasks: 98,
        completedTasks: 92,
        failedTasks: 6,
        averageTime: 28,
        efficiency: 93.9,
        resourceUsage: {
          cpu: 65,
          memory: 55,
          network: 45
        },
        capabilities: {
          captchaSolving: true,
          stealthMode: false,
          multiPersona: true,
          concurrentTasks: 2
        },
        config: {
          maxConcurrent: 2,
          timeout: 150,
          retryAttempts: 2,
          priority: 2
        },
        lastActivity: new Date(Date.now() - 30000).toISOString(),
        uptime: 180
      },
      {
        id: 'worker-3',
        name: 'Worker Gamma',
        status: 'idle',
        totalTasks: 76,
        completedTasks: 70,
        failedTasks: 6,
        averageTime: 35,
        efficiency: 92.1,
        resourceUsage: {
          cpu: 15,
          memory: 30,
          network: 10
        },
        capabilities: {
          captchaSolving: false,
          stealthMode: true,
          multiPersona: false,
          concurrentTasks: 1
        },
        config: {
          maxConcurrent: 1,
          timeout: 180,
          retryAttempts: 4,
          priority: 3
        },
        lastActivity: new Date(Date.now() - 120000).toISOString(),
        uptime: 120
      }
    ];

    setWorkers(mockWorkers);
  }, []);

  // Generate mock tasks
  useEffect(() => {
    if (!isRunning) return;

    const generateTask = (): Task => {
      const types: Task['type'][] = ['faucet_claim', 'captcha_solve', 'proxy_rotation', 'persona_switch'];
      const priorities: Task['priority'][] = ['low', 'medium', 'high', 'critical'];
      
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        status: 'queued',
        retryCount: 0,
        maxRetries: 3,
        estimatedTime: Math.random() * 60 + 20 // 20-80 seconds
      };
    };

    const interval = setInterval(() => {
      const newTask = generateTask();
      setTasks(prev => [...prev, newTask]);
    }, Math.random() * 8000 + 3000); // Random interval 3-11 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  // Task assignment and processing
  useEffect(() => {
    if (!isRunning) return;

    const assignTask = (task: Task) => {
      const availableWorkers = workers.filter(w => 
        w.status === 'idle' && 
        Object.keys(w).filter(k => k.startsWith('currentTask')).length === 0
      );

      if (availableWorkers.length === 0) return;

      let selectedWorker: Worker;

      switch (config.loadBalancing) {
        case 'least_loaded':
          selectedWorker = availableWorkers.reduce((min, worker) => 
            worker.resourceUsage.cpu < min.resourceUsage.cpu ? worker : min
          );
          break;
        case 'priority_based':
          selectedWorker = availableWorkers.reduce((max, worker) => 
            worker.config.priority < max.config.priority ? worker : max
          );
          break;
        case 'random':
          selectedWorker = availableWorkers[Math.floor(Math.random() * availableWorkers.length)];
          break;
        default: // round_robin
          selectedWorker = availableWorkers[0];
      }

      // Assign task to worker
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'assigned', assignedWorker: selectedWorker.id }
          : t
      ));

      setWorkers(prev => prev.map(w => 
        w.id === selectedWorker.id 
          ? { 
              ...w, 
              status: 'busy', 
              currentTask: task.id,
              totalTasks: w.totalTasks + 1
            }
          : w
      ));

      // Process task
      setTimeout(() => {
        processTask(task, selectedWorker);
      }, 1000);
    };

    const processTask = async (task: Task, worker: Worker) => {
      // Update task status to processing
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'processing', startTime: Date.now() }
          : t
      ));

      // Simulate task processing
      const processingTime = Math.random() * 45000 + 15000; // 15-60 seconds
      const success = Math.random() > 0.1; // 90% success rate

      await new Promise(resolve => setTimeout(resolve, processingTime));

      // Update task result
      const result = {
        success,
        data: success ? { amount: Math.random() * 0.001, txHash: `0x${Math.random().toString(36).substr(2, 9)}` } : undefined,
        error: success ? undefined : 'Connection timeout'
      };

      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? {
              ...t,
              status: success ? 'completed' : 'failed',
              endTime: Date.now(),
              result,
              retryCount: success ? 0 : t.retryCount + 1
            }
          : t
      ));

      // Update worker stats
      setWorkers(prev => prev.map(w => 
        w.id === worker.id 
          ? {
              ...w,
              status: 'idle',
              currentTask: undefined,
              completedTasks: w.completedTasks + (success ? 1 : 0),
              failedTasks: w.failedTasks + (success ? 0 : 1),
              averageTime: (w.averageTime * w.totalTasks + processingTime / 1000) / (w.totalTasks + 1),
              efficiency: ((w.completedTasks + (success ? 1 : 0)) / (w.totalTasks + 1)) * 100,
              lastActivity: new Date().toISOString()
            }
          : w
      ));
    };

    const interval = setInterval(() => {
      const queuedTasks = tasks.filter(t => t.status === 'queued');
      if (queuedTasks.length === 0) return;

      // Process tasks by priority
      const prioritizedTasks = queuedTasks.sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      // Assign next available task
      const nextTask = prioritizedTasks[0];
      assignTask(nextTask);
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, tasks, workers, config.loadBalancing]);

  // Update stats
  useEffect(() => {
    const activeWorkers = workers.filter(w => w.status === 'busy').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const failedTasks = tasks.filter(t => t.status === 'failed').length;
    const avgEfficiency = workers.length > 0 
      ? workers.reduce((sum, w) => sum + w.efficiency, 0) / workers.length 
      : 0;

    const totalCpu = workers.reduce((sum, w) => sum + w.resourceUsage.cpu, 0);
    const totalMemory = workers.reduce((sum, w) => sum + w.resourceUsage.memory, 0);
    const totalNetwork = workers.reduce((sum, w) => sum + w.resourceUsage.network, 0);

    setStats({
      totalWorkers: workers.length,
      activeWorkers,
      totalTasks: tasks.length,
      completedTasks,
      failedTasks,
      averageEfficiency: avgEfficiency,
      totalThroughput: completedTasks > 0 ? (completedTasks / (workers.reduce((sum, w) => sum + w.uptime, 0) / 60)) : 0,
      resourceUsage: {
        cpu: workers.length > 0 ? totalCpu / workers.length : 0,
        memory: workers.length > 0 ? totalMemory / workers.length : 0,
        network: workers.length > 0 ? totalNetwork / workers.length : 0
      }
    });
  }, [workers, tasks]);

  // Health checks
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setWorkers(prev => prev.map(worker => {
        // Simulate health check
        const isHealthy = Math.random() > 0.05; // 95% healthy
        
        // Update resource usage with random variations
        const cpu = Math.max(0, Math.min(100, worker.resourceUsage.cpu + (Math.random() - 0.5) * 20));
        const memory = Math.max(0, Math.min(100, worker.resourceUsage.memory + (Math.random() - 0.5) * 15));
        const network = Math.max(0, Math.min(100, worker.resourceUsage.network + (Math.random() - 0.5) * 25));

        return {
          ...worker,
          status: !isHealthy && worker.status !== 'busy' ? 'error' : worker.status,
          resourceUsage: { cpu, memory, network },
          uptime: worker.uptime + (config.healthCheckInterval / 60)
        };
      }));
    }, config.healthCheckInterval * 1000);

    return () => clearInterval(interval);
  }, [isRunning, config.healthCheckInterval]);

  const togglePool = () => {
    setIsRunning(!isRunning);
  };

  const addWorker = () => {
    const newWorker: Worker = {
      id: `worker-${Date.now()}`,
      name: `Worker ${String.fromCharCode(65 + workers.length)}`,
      status: 'idle',
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      averageTime: 0,
      efficiency: 100,
      resourceUsage: {
        cpu: 10,
        memory: 20,
        network: 5
      },
      capabilities: {
        captchaSolving: Math.random() > 0.5,
        stealthMode: Math.random() > 0.5,
        multiPersona: Math.random() > 0.5,
        concurrentTasks: Math.floor(Math.random() * 3) + 1
      },
      config: {
        maxConcurrent: Math.floor(Math.random() * 3) + 1,
        timeout: Math.floor(Math.random() * 120) + 60,
        retryAttempts: Math.floor(Math.random() * 3) + 1,
        priority: workers.length + 1
      },
      lastActivity: new Date().toISOString(),
      uptime: 0
    };

    setWorkers(prev => [...prev, newWorker]);
  };

  const removeWorker = (workerId: string) => {
    setWorkers(prev => prev.filter(w => w.id !== workerId));
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(t => t.status === 'queued' || t.status === 'assigned' || t.status === 'processing'));
  };

  const getWorkerStatusIcon = (status: Worker['status']) => {
    switch (status) {
      case 'idle':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'busy':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'assigned':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-purple-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getResourceColor = (usage: number, threshold: number) => {
    if (usage < threshold * 0.7) return 'text-green-500';
    if (usage < threshold) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Worker Pool
          </h1>
          <p className="text-gray-400">
            Distributed task processing system with load balancing and resource management
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Active Workers</div>
                <div className="text-2xl font-bold">{stats.activeWorkers}/{stats.totalWorkers}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Completed Tasks</div>
                <div className="text-2xl font-bold">{stats.completedTasks}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Avg Efficiency</div>
                <div className="text-2xl font-bold">{stats.averageEfficiency.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Throughput</div>
                <div className="text-2xl font-bold">{stats.totalThroughput.toFixed(1)}/h</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Avg CPU Usage</div>
                <div className="text-2xl font-bold">{stats.resourceUsage.cpu.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Pool Control</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={togglePool}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Pool
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Pool
                  </>
                )}
              </button>
              <button
                onClick={addWorker}
                disabled={workers.length >= config.maxWorkers}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Worker
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
            <div className="text-sm text-gray-400">
              Load Balancing: {config.loadBalancing.replace('_', ' ')} | 
              Max Workers: {workers.length}/{config.maxWorkers} | 
              Queue: {tasks.filter(t => t.status === 'queued').length}
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Workers</h3>
            <div className="space-y-3">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWorker?.id === worker.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedWorker(worker)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getWorkerStatusIcon(worker.status)}
                      <h4 className="font-semibold">{worker.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        worker.status === 'idle' ? 'bg-yellow-600' :
                        worker.status === 'busy' ? 'bg-blue-600' :
                        worker.status === 'error' ? 'bg-red-600' : 'bg-gray-600'
                      }`}>
                        {worker.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeWorker(worker.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Remove Worker"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Resource Usage */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Cpu className={`w-3 h-3 ${getResourceColor(worker.resourceUsage.cpu, config.resourceThresholds.cpu)}`} />
                        <span className={`text-xs ${getResourceColor(worker.resourceUsage.cpu, config.resourceThresholds.cpu)}`}>
                          {worker.resourceUsage.cpu.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <MemoryStick className={`w-3 h-3 ${getResourceColor(worker.resourceUsage.memory, config.resourceThresholds.memory)}`} />
                        <span className={`text-xs ${getResourceColor(worker.resourceUsage.memory, config.resourceThresholds.memory)}`}>
                          {worker.resourceUsage.memory.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <HardDrive className={`w-3 h-3 ${getResourceColor(worker.resourceUsage.network, config.resourceThresholds.network)}`} />
                        <span className={`text-xs ${getResourceColor(worker.resourceUsage.network, config.resourceThresholds.network)}`}>
                          {worker.resourceUsage.network.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Tasks:</span> {worker.completedTasks}/{worker.totalTasks}
                    </div>
                    <div>
                      <span className="text-gray-400">Efficiency:</span> {worker.efficiency.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Time:</span> {worker.averageTime.toFixed(1)}s
                    </div>
                    <div>
                      <span className="text-gray-400">Uptime:</span> {worker.uptime.toFixed(1)}m
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="flex items-center gap-2">
                    {worker.capabilities.captchaSolving && <span className="px-2 py-1 bg-blue-600 rounded text-xs">Captcha</span>}
                    {worker.capabilities.stealthMode && <span className="px-2 py-1 bg-purple-600 rounded text-xs">Stealth</span>}
                    {worker.capabilities.multiPersona && <span className="px-2 py-1 bg-green-600 rounded text-xs">Multi-Persona</span>}
                    <div className="flex-1"></div>
                    <span className="text-xs text-gray-400">Priority: {worker.config.priority}</span>
                  </div>

                  {/* Current Task */}
                  {worker.currentTask && (
                    <div className="mt-3 p-2 bg-gray-700 rounded text-sm">
                      <div className="text-gray-400">Current Task:</div>
                      <div className="font-mono text-xs">{worker.currentTask}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Worker Details */}
          {selectedWorker && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Worker Details: {selectedWorker.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Concurrent:</span>
                        <span>{selectedWorker.config.maxConcurrent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeout:</span>
                        <span>{selectedWorker.config.timeout}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Retry Attempts:</span>
                        <span>{selectedWorker.config.retryAttempts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority:</span>
                        <span>{selectedWorker.config.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span>{selectedWorker.efficiency.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Response:</span>
                        <span>{selectedWorker.averageTime.toFixed(1)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tasks per Hour:</span>
                        <span>{(selectedWorker.completedTasks / (selectedWorker.uptime / 60)).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Resource Usage</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU</span>
                          <span>{selectedWorker.resourceUsage.cpu.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedWorker.resourceUsage.cpu < config.resourceThresholds.cpu * 0.7 ? 'bg-green-500' :
                              selectedWorker.resourceUsage.cpu < config.resourceThresholds.cpu ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, selectedWorker.resourceUsage.cpu)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory</span>
                          <span>{selectedWorker.resourceUsage.memory.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedWorker.resourceUsage.memory < config.resourceThresholds.memory * 0.7 ? 'bg-green-500' :
                              selectedWorker.resourceUsage.memory < config.resourceThresholds.memory ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, selectedWorker.resourceUsage.memory)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Network</span>
                          <span>{selectedWorker.resourceUsage.network.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedWorker.resourceUsage.network < config.resourceThresholds.network * 0.7 ? 'bg-green-500' :
                              selectedWorker.resourceUsage.network < config.resourceThresholds.network ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, selectedWorker.resourceUsage.network)}%` }}
                          ></div>
                        </div>
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
                  <th className="text-left py-2 px-3">Worker</th>
                  <th className="text-left py-2 px-3">Duration</th>
                  <th className="text-left py-2 px-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 10).map((task) => {
                  const worker = workers.find(w => w.id === task.assignedWorker);
                  return (
                    <tr key={task.id} className="border-b border-gray-700">
                      <td className="py-2 px-3 font-mono text-xs">{task.id.substring(0, 8)}...</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {task.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.priority === 'critical' ? 'bg-red-600' :
                          task.priority === 'high' ? 'bg-orange-600' :
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
                      <td className="py-2 px-3">{worker?.name || '-'}</td>
                      <td className="py-2 px-3">
                        {task.endTime 
                          ? `${((task.endTime - (task.startTime || 0)) / 1000).toFixed(1)}s`
                          : task.status === 'processing'
                            ? `${((Date.now() - (task.startTime || 0)) / 1000).toFixed(1)}s`
                            : '-'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {task.result ? (
                          <div className={task.result.success ? 'text-green-400' : 'text-red-400'}>
                            {task.result.success ? 'Success' : task.result.error}
                          </div>
                        ) : '-'}
                      </td>
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
              <h2 className="text-2xl font-bold mb-6">Pool Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Workers</label>
                    <input
                      type="number"
                      value={config.maxWorkers}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxWorkers: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Load Balancing</label>
                    <select
                      value={config.loadBalancing}
                      onChange={(e) => setConfig(prev => ({ ...prev, loadBalancing: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="round_robin">Round Robin</option>
                      <option value="least_loaded">Least Loaded</option>
                      <option value="priority_based">Priority Based</option>
                      <option value="random">Random</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Concurrent Tasks</label>
                    <input
                      type="number"
                      value={config.maxConcurrentTasks}
                      onChange={(e) => setConfig(prev => ({ ...prev, maxConcurrentTasks: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Task Timeout (seconds)</label>
                    <input
                      type="number"
                      value={config.taskTimeout}
                      onChange={(e) => setConfig(prev => ({ ...prev, taskTimeout: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="30"
                      max="600"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.autoScaling}
                      onChange={(e) => setConfig(prev => ({ ...prev, autoScaling: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span>Auto-scaling enabled</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">CPU Threshold (%)</label>
                      <input
                        type="number"
                        value={config.resourceThresholds.cpu}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          resourceThresholds: { ...prev.resourceThresholds, cpu: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="50"
                        max="95"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Memory Threshold (%)</label>
                      <input
                        type="number"
                        value={config.resourceThresholds.memory}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          resourceThresholds: { ...prev.resourceThresholds, memory: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="50"
                        max="95"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Network Threshold (%)</label>
                      <input
                        type="number"
                        value={config.resourceThresholds.network}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          resourceThresholds: { ...prev.resourceThresholds, network: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="50"
                        max="95"
                      />
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

export default WorkerPool;
