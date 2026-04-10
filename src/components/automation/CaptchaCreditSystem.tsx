/**
 * Captcha Credit System Component
 *
 * Advanced captcha credit earning system with automated solving and credit management
 * Integrates with multiple captcha platforms for credit accumulation and trading
 */

import { Coins, CreditCard, Exchange, Settings, Target, TrendingUp, XCircle, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface CaptchaPlatform {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'audio' | 'puzzle' | 'recaptcha' | 'hcaptcha' | 'funcaptcha' | 'text' | 'math';
  creditRate: {
    perSolve: number;
    currency: string;
    bonusThreshold: number;
    bonusMultiplier: number;
  };
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  averageTime: number; // seconds
  successRate: number; // percentage
  features: {
    bulkSolving: boolean;
    priorityQueue: boolean;
    statsTracking: boolean;
    apiAccess: boolean;
    referralBonus: boolean;
  };
  limits: {
    dailyLimit: number;
    hourlyLimit: number;
    concurrentSolves: number;
    minimumWithdrawal: number;
  };
  isActive: boolean;
  priority: number;
}

interface CreditAccount {
  id: string;
  personaId: string;
  platformId: string;
  username: string;
  apiKey?: string;
  balance: {
    credits: number;
    pending: number;
    withdrawn: number;
    earned: number;
    spent: number;
    lastUpdated: string;
  };
  stats: {
    totalSolved: number;
    successfulSolves: number;
    failedSolves: number;
    averageTime: number;
    totalEarnings: number;
    todayEarnings: number;
    weeklyEarnings: number;
    monthlyEarnings: number;
    bestHour: number;
    bestDay: string;
  };
  settings: {
    autoSolve: boolean;
    autoWithdraw: boolean;
    withdrawalThreshold: number;
    preferredDifficulty: CaptchaPlatform['difficulty'];
    solvingHours: Array<number>;
    maxConcurrent: number;
  };
  createdAt: string;
  lastActivity: string;
}

interface CreditTransaction {
  id: string;
  accountId: string;
  type: 'earned' | 'spent' | 'withdrawn' | 'deposited' | 'bonus' | 'referral';
  amount: number;
  currency: string;
  platform: string;
  source?: string;
  destination?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp: string;
  completedAt?: string;
  metadata: {
    captchaType?: string;
    difficulty?: string;
    timeSpent?: number;
    bonusReason?: string;
    referralId?: string;
    notes?: string;
  };
}

interface CreditExchange {
  id: string;
  type: 'platform_swap' | 'marketplace' | 'internal' | 'external';
  from: {
    platform: string;
    amount: number;
    currency: string;
  };
  to: {
    platform: string;
    amount: number;
    currency: string;
  };
  rate: number; // exchange rate
  fee: number; // exchange fee
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  metadata: {
    reason: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    autoExecute: boolean;
  };
}

interface CreditConfig {
  autoSolving: boolean;
  creditOptimization: boolean;
  platformRotation: boolean;
  bonusHunting: boolean;
  referralProgram: boolean;
  exchangeTrading: boolean;
  autoWithdrawal: boolean;
  withdrawalThreshold: number;
  solving: {
    maxConcurrent: number;
    preferredDifficulty: CaptchaPlatform['difficulty'];
    workingHours: Array<number>;
    breakFrequency: number; // minutes
    breakDuration: number; // minutes
  };
  optimization: {
    highValuePlatforms: boolean;
    bonusThreshold: number;
    rateComparison: boolean;
    autoSwitching: boolean;
  };
  exchange: {
    autoTrading: boolean;
    targetRate: number;
    maxSlippage: number;
    tradingPairs: Array<string>;
  };
}

const CaptchaCreditSystem: React.FC = () => {
  const [platforms, setPlatforms] = useState<CaptchaPlatform[]>([]);
  const [accounts, setAccounts] = useState<CreditAccount[]>([]);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [exchanges, setExchanges] = useState<CreditExchange[]>([]);
  const [config, setConfig] = useState<CreditConfig>({
    autoSolving: true,
    creditOptimization: true,
    platformRotation: true,
    bonusHunting: true,
    referralProgram: true,
    exchangeTrading: true,
    autoWithdrawal: true,
    withdrawalThreshold: 1000,
    solving: {
      maxConcurrent: 5,
      preferredDifficulty: 'medium',
      workingHours: [8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21],
      breakFrequency: 60,
      breakDuration: 10
    },
    optimization: {
      highValuePlatforms: true,
      bonusThreshold: 100,
      rateComparison: true,
      autoSwitching: true
    },
    exchange: {
      autoTrading: true,
      targetRate: 1.05,
      maxSlippage: 0.02,
      tradingPairs: ['BTC-USD', 'ETH-USD', 'USDT-USD']
    }
  });
  const [selectedAccount, setSelectedAccount] = useState<CreditAccount | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<CaptchaPlatform | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [stats, setStats] = useState({
    totalCredits: 0,
    totalEarned: 0,
    totalSpent: 0,
    totalWithdrawn: 0,
    activeAccounts: 0,
    solvingRate: 0,
    averageEarnings: 0,
    bestPlatform: '',
    exchangeRate: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock captcha platforms initialization
  useEffect(() => {
    const mockPlatforms: CaptchaPlatform[] = [
      {
        id: '1',
        name: '2Captcha',
        url: 'https://2captcha.com',
        type: 'image',
        creditRate: {
          perSolve: 0.005,
          currency: 'USD',
          bonusThreshold: 1000,
          bonusMultiplier: 1.2
        },
        difficulty: 'easy',
        averageTime: 15,
        successRate: 98.5,
        features: {
          bulkSolving: true,
          priorityQueue: true,
          statsTracking: true,
          apiAccess: true,
          referralBonus: true
        },
        limits: {
          dailyLimit: 5000,
          hourlyLimit: 500,
          concurrentSolves: 10,
          minimumWithdrawal: 0.5
        },
        isActive: true,
        priority: 1
      },
      {
        id: '2',
        name: 'Anti-Captcha',
        url: 'https://anti-captcha.com',
        type: 'recaptcha',
        creditRate: {
          perSolve: 0.008,
          currency: 'USD',
          bonusThreshold: 800,
          bonusMultiplier: 1.15
        },
        difficulty: 'medium',
        averageTime: 20,
        successRate: 97.2,
        features: {
          bulkSolving: true,
          priorityQueue: true,
          statsTracking: true,
          apiAccess: true,
          referralBonus: true
        },
        limits: {
          dailyLimit: 3000,
          hourlyLimit: 300,
          concurrentSolves: 8,
          minimumWithdrawal: 1.0
        },
        isActive: true,
        priority: 2
      },
      {
        id: '3',
        name: 'CapMonster',
        url: 'https://capmonster.cloud',
        type: 'recaptcha',
        creditRate: {
          perSolve: 0.007,
          currency: 'USD',
          bonusThreshold: 1200,
          bonusMultiplier: 1.25
        },
        difficulty: 'medium',
        averageTime: 18,
        successRate: 96.8,
        features: {
          bulkSolving: true,
          priorityQueue: false,
          statsTracking: true,
          apiAccess: true,
          referralBonus: true
        },
        limits: {
          dailyLimit: 4000,
          hourlyLimit: 400,
          concurrentSolves: 12,
          minimumWithdrawal: 0.8
        },
        isActive: true,
        priority: 3
      },
      {
        id: '4',
        name: 'CaptchaSolver AI',
        url: 'https://captchasolver.ai',
        type: 'hcaptcha',
        creditRate: {
          perSolve: 0.010,
          currency: 'USD',
          bonusThreshold: 600,
          bonusMultiplier: 1.3
        },
        difficulty: 'hard',
        averageTime: 25,
        successRate: 95.5,
        features: {
          bulkSolving: false,
          priorityQueue: true,
          statsTracking: true,
          apiAccess: true,
          referralBonus: false
        },
        limits: {
          dailyLimit: 2000,
          hourlyLimit: 200,
          concurrentSolves: 6,
          minimumWithdrawal: 2.0
        },
        isActive: true,
        priority: 4
      }
    ];

    setPlatforms(mockPlatforms);
  }, []);

  // Mock accounts initialization
  useEffect(() => {
    const mockAccounts: CreditAccount[] = [
      {
        id: 'account-1',
        personaId: 'persona-1',
        platformId: '1',
        username: 'captcha_solver_001',
        apiKey: 'demo_key_2captcha',
        balance: {
          credits: 1250.75,
          pending: 45.50,
          withdrawn: 500.00,
          earned: 1796.25,
          spent: 295.50,
          lastUpdated: new Date().toISOString()
        },
        stats: {
          totalSolved: 35925,
          successfulSolves: 35412,
          failedSolves: 513,
          averageTime: 14.8,
          totalEarnings: 1796.25,
          todayEarnings: 45.75,
          weeklyEarnings: 312.50,
          monthlyEarnings: 1250.75,
          bestHour: 15,
          bestDay: '2024-01-15'
        },
        settings: {
          autoSolve: true,
          autoWithdraw: true,
          withdrawalThreshold: 1000,
          preferredDifficulty: 'easy',
          solvingHours: [8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21],
          maxConcurrent: 8
        },
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      },
      {
        id: 'account-2',
        personaId: 'persona-2',
        platformId: '2',
        username: 'anti_captcha_002',
        apiKey: 'demo_key_anticaptcha',
        balance: {
          credits: 890.25,
          pending: 25.00,
          withdrawn: 300.00,
          earned: 1215.25,
          spent: 189.75,
          lastUpdated: new Date().toISOString()
        },
        stats: {
          totalSolved: 15190,
          successfulSolves: 14765,
          failedSolves: 425,
          averageTime: 19.5,
          totalEarnings: 1215.25,
          todayEarnings: 32.50,
          weeklyEarnings: 225.00,
          monthlyEarnings: 890.25,
          bestHour: 16,
          bestDay: '2024-01-20'
        },
        settings: {
          autoSolve: true,
          autoWithdraw: true,
          withdrawalThreshold: 800,
          preferredDifficulty: 'medium',
          solvingHours: [9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21],
          maxConcurrent: 6
        },
        createdAt: '2024-01-05T00:00:00Z',
        lastActivity: new Date(Date.now() - 3600000).toISOString()
      }
    ];

    setAccounts(mockAccounts);
  }, []);

  // Mock transactions initialization
  useEffect(() => {
    const mockTransactions: CreditTransaction[] = [
      {
        id: 'tx-1',
        accountId: 'account-1',
        type: 'earned',
        amount: 0.005,
        currency: 'USD',
        platform: '2Captcha',
        status: 'completed',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date(Date.now() - 3550000).toISOString(),
        metadata: {
          captchaType: 'image',
          difficulty: 'easy',
          timeSpent: 15,
          notes: 'Standard image captcha'
        }
      },
      {
        id: 'tx-2',
        accountId: 'account-1',
        type: 'bonus',
        amount: 0.001,
        currency: 'USD',
        platform: '2Captcha',
        status: 'completed',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        completedAt: new Date(Date.now() - 7150000).toISOString(),
        metadata: {
          bonusReason: '1000 solves milestone',
          notes: 'Bonus for reaching 1000 solves'
        }
      },
      {
        id: 'tx-3',
        accountId: 'account-2',
        type: 'withdrawn',
        amount: 0.50,
        currency: 'USD',
        platform: 'Anti-Captcha',
        status: 'completed',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        completedAt: new Date(Date.now() - 86350000).toISOString(),
        metadata: {
          notes: 'Weekly withdrawal'
        }
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  // Auto solving simulation
  useEffect(() => {
    if (!config.autoSolving || !isRunning) return;

    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      const isWorkingHour = config.solving.workingHours.includes(currentHour);

      if (!isWorkingHour) return;

      accounts.forEach(account => {
        if (!account.settings.autoSolve) return;

        const platform = platforms.find(p => p.id === account.platformId);
        if (!platform || !platform.isActive) return;

        // Check if account can solve more captchas
        const hourlySolves = transactions.filter(t =>
          t.accountId === account.id &&
          t.type === 'earned' &&
          new Date(t.timestamp).getHours() === currentHour
        ).length;

        if (hourlySolves >= platform.limits.hourlyLimit) return;

        // Simulate captcha solving
        const solvingTime = platform.averageTime + (Math.random() - 0.5) * 10;
        const success = Math.random() > (1 - platform.successRate / 100);

        setTimeout(() => {
          if (success) {
            const credits = platform.creditRate.perSolve;

            // Create earning transaction
            const newTransaction: CreditTransaction = {
              id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              accountId: account.id,
              type: 'earned',
              amount: credits,
              currency: platform.creditRate.currency,
              platform: platform.name,
              status: 'completed',
              timestamp: new Date().toISOString(),
              completedAt: new Date().toISOString(),
              metadata: {
                captchaType: platform.type,
                difficulty: platform.difficulty,
                timeSpent: solvingTime,
                notes: 'Auto-solved captcha'
              }
            };

            setTransactions(prev => [newTransaction, ...prev]);

            // Update account balance
            setAccounts(prev => prev.map(acc =>
              acc.id === account.id
                ? {
                    ...acc,
                    balance: {
                      ...acc.balance,
                      credits: acc.balance.credits + credits,
                      earned: acc.balance.earned + credits,
                      lastUpdated: new Date().toISOString()
                    },
                    stats: {
                      ...acc.stats,
                      totalSolved: acc.stats.totalSolved + 1,
                      successfulSolves: acc.stats.successfulSolves + 1,
                      averageTime: (acc.stats.averageTime * acc.stats.totalSolved + solvingTime) / (acc.stats.totalSolved + 1),
                      totalEarnings: acc.stats.totalEarnings + credits,
                      todayEarnings: acc.stats.todayEarnings + credits
                    },
                    lastActivity: new Date().toISOString()
                  }
                } : acc
            ));

            // Check for bonus
            if ((account.stats.successfulSolves + 1) % platform.creditRate.bonusThreshold === 0) {
              const bonusCredits = credits * platform.creditRate.bonusMultiplier;

              const bonusTransaction: CreditTransaction = {
                id: `bonus-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                accountId: account.id,
                type: 'bonus',
                amount: bonusCredits,
                currency: platform.creditRate.currency,
                platform: platform.name,
                status: 'completed',
                timestamp: new Date().toISOString(),
                completedAt: new Date().toISOString(),
                metadata: {
                  bonusReason: `${platform.creditRate.bonusThreshold} solves milestone`,
                  notes: 'Auto-generated bonus'
                }
              };

              setTransactions(prev => [bonusTransaction, ...prev]);

              setAccounts(prev => prev.map(acc =>
                acc.id === account.id
                  ? {
                      ...acc,
                      balance: {
                        ...acc.balance,
                        credits: acc.balance.credits + bonusCredits,
                        earned: acc.balance.earned + bonusCredits,
                        lastUpdated: new Date().toISOString()
                      },
                      stats: {
                        ...acc.stats,
                        totalEarnings: acc.stats.totalEarnings + bonusCredits,
                        todayEarnings: acc.stats.todayEarnings + bonusCredits
                      }
                    }
                  : acc
              ));
            }
          } else {
            // Failed solve
            setAccounts(prev => prev.map(acc =>
              acc.id === account.id
                ? {
                    ...acc.stats,
                    totalSolved: acc.stats.totalSolved + 1,
                    failedSolves: acc.stats.failedSolves + 1,
                    lastActivity: new Date().toISOString()
                  }
                : acc
            ));
          }
        }, solvingTime * 1000);
      });
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [config.autoSolving, isRunning, accounts, platforms, config.solving.workingHours]);

  // Auto withdrawal simulation
  useEffect(() => {
    if (!config.autoWithdrawal) return;

    const interval = setInterval(() => {
      accounts.forEach(account => {
        if (!account.settings.autoWithdraw) return;

        const platform = platforms.find(p => p.id === account.platformId);
        if (!platform) return;

        if (account.balance.credits >= account.settings.withdrawalThreshold) {
          const withdrawalAmount = account.balance.credits;

          // Create withdrawal transaction
          const newTransaction: CreditTransaction = {
            id: `withdraw-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            accountId: account.id,
            type: 'withdrawn',
            amount: withdrawalAmount,
            currency: platform.creditRate.currency,
            platform: platform.name,
            status: 'pending',
            timestamp: new Date().toISOString(),
            metadata: {
              notes: 'Auto-withdrawal threshold reached'
            }
          };

          setTransactions(prev => [newTransaction, ...prev]);

          // Simulate withdrawal completion
          setTimeout(() => {
            setTransactions(prev => prev.map(tx =>
              tx.id === newTransaction.id
                ? {
                    ...tx,
                    status: 'completed',
                    completedAt: new Date().toISOString()
                  }
                : tx
            ));

            setAccounts(prev => prev.map(acc =>
              acc.id === account.id
                ? {
                    ...acc,
                    balance: {
                      ...acc.balance,
                      credits: 0,
                      withdrawn: acc.balance.withdrawn + withdrawalAmount,
                      lastUpdated: new Date().toISOString()
                    },
                    lastActivity: new Date().toISOString()
                  }
                : acc
            ));
          }, 30000); // 30 seconds processing time
        }
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.autoWithdrawal, accounts, platforms]);

  // Update stats
  useEffect(() => {
    const totalCredits = accounts.reduce((sum, acc) => sum + acc.balance.credits, 0);
    const totalEarned = accounts.reduce((sum, acc) => sum + acc.stats.totalEarnings, 0);
    const totalSpent = accounts.reduce((sum, acc) => sum + acc.stats.spent, 0);
    const totalWithdrawn = accounts.reduce((sum, acc) => sum + acc.balance.withdrawn, 0);
    const activeAccounts = accounts.filter(acc => acc.settings.autoSolve).length;
    const totalSolves = accounts.reduce((sum, acc) => sum + acc.stats.totalSolved, 0);
    const successfulSolves = accounts.reduce((sum, acc) => sum + acc.stats.successfulSolves, 0);
    const solvingRate = totalSolves > 0 ? (successfulSolves / totalSolves) * 100 : 0;
    const averageEarnings = accounts.length > 0 ? totalEarned / accounts.length : 0;

    const bestPlatform = accounts.reduce((best, acc) => {
      const platform = platforms.find(p => p.id === acc.platformId);
      if (!platform) return best;
      if (!best || acc.stats.totalEarnings > best.earnings) {
        return { platform: platform.name, earnings: acc.stats.totalEarnings };
      }
      return best;
    }, null as { platform: string; earnings: number } | null);

    setStats({
      totalCredits,
      totalEarned,
      totalSpent,
      totalWithdrawn,
      activeAccounts,
      solvingRate,
      averageEarnings,
      bestPlatform: bestPlatform?.platform || '',
      exchangeRate: 1.05 // Mock exchange rate
    });
  }, [accounts, platforms]);

  const toggleSolving = () => {
    setIsRunning(!isRunning);
  };

  const createAccount = () => {
    const activePlatforms = platforms.filter(p => p.isActive);
    if (activePlatforms.length === 0) return;

    const selectedPlatform = activePlatforms[Math.floor(Math.random() * activePlatforms.length)];

    const newAccount: CreditAccount = {
      id: `account-${Date.now()}`,
      personaId: 'persona-1',
      platformId: selectedPlatform.id,
      username: `captcha_solver_${Date.now()}`,
      balance: {
        credits: 0,
        pending: 0,
        withdrawn: 0,
        earned: 0,
        spent: 0,
        lastUpdated: new Date().toISOString()
      },
      stats: {
        totalSolved: 0,
        successfulSolves: 0,
        failedSolves: 0,
        averageTime: 0,
        totalEarnings: 0,
        todayEarnings: 0,
        weeklyEarnings: 0,
        monthlyEarnings: 0,
        bestHour: 12,
        bestDay: new Date().toISOString().split('T')[0]
      },
      settings: {
        autoSolve: config.autoSolving,
        autoWithdraw: config.autoWithdrawal,
        withdrawalThreshold: config.withdrawalThreshold,
        preferredDifficulty: config.solving.preferredDifficulty,
        solvingHours: config.solving.workingHours,
        maxConcurrent: config.solving.maxConcurrent
      },
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setAccounts(prev => [...prev, newAccount]);
  };

  const deleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(a => a.id !== accountId));
    if (selectedAccount?.id === accountId) {
      setSelectedAccount(null);
    }
  };

  const withdrawCredits = (accountId: string, amount: number) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account || account.balance.credits < amount) return;

    const platform = platforms.find(p => p.id === account.platformId);
    if (!platform) return;

    const newTransaction: CreditTransaction = {
      id: `withdraw-${Date.now()}`,
      accountId,
      type: 'withdrawn',
      amount,
      currency: platform.creditRate.currency,
      platform: platform.name,
      status: 'pending',
      timestamp: new Date().toISOString(),
      metadata: {
        notes: 'Manual withdrawal'
      }
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Simulate withdrawal completion
    setTimeout(() => {
      setTransactions(prev => prev.map(tx =>
        tx.id === newTransaction.id
          ? {
              ...tx,
              status: 'completed',
              completedAt: new Date().toISOString()
            }
          : tx
      ));

      setAccounts(prev => prev.map(acc =>
        acc.id === accountId
          ? {
              ...acc,
              balance: {
                ...acc.balance,
                credits: acc.balance.credits - amount,
                withdrawn: acc.balance.withdrawn + amount,
                lastUpdated: new Date().toISOString()
              },
              lastActivity: new Date().toISOString()
            }
          : acc
      ));
    }, 30000);
  };

  const getPlatformTypeColor = (type: CaptchaPlatform['type']) => {
    switch (type) {
      case 'image': return 'bg-blue-600';
      case 'recaptcha': return 'bg-red-600';
      case 'hcaptcha': return 'bg-purple-600';
      case 'funcaptcha': return 'bg-orange-600';
      case 'audio': return 'bg-green-600';
      case 'puzzle': return 'bg-yellow-600';
      case 'text': return 'bg-gray-600';
      case 'math': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: CaptchaPlatform['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-orange-600';
      case 'expert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTransactionTypeColor = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'earned': return 'bg-green-600';
      case 'spent': return 'bg-red-600';
      case 'withdrawn': return 'bg-blue-600';
      case 'deposited': return 'bg-purple-600';
      case 'bonus': return 'bg-yellow-600';
      case 'referral': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-purple-400" />
            Captcha Credit System
          </h1>
          <p className="text-gray-400">
            Advanced captcha credit earning system with automated solving and credit management
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Credits</div>
                <div className="text-2xl font-bold">${stats.totalCredits.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Earned</div>
                <div className="text-2xl font-bold">${stats.totalEarned.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Solving Rate</div>
                <div className="text-2xl font-bold">{stats.solvingRate.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Active Accounts</div>
                <div className="text-2xl font-bold">{stats.activeAccounts}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Exchange className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Exchange Rate</div>
                <div className="text-2xl font-bold">{stats.exchangeRate.toFixed(3)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Credit Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSolving}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Solving
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Solving
                  </>
                )}
              </button>
              <button
                onClick={createAccount}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Create Account
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
              Best Platform: {stats.bestPlatform || 'None'} |
              Average Earnings: ${stats.averageEarnings.toFixed(2)} |
              Auto Solving: {config.autoSolving ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Platforms and Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Captcha Platforms</h3>
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
                      <h4 className="font-semibold">{platform.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPlatformTypeColor(platform.type)}`}>
                        {platform.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(platform.difficulty)}`}>
                        {platform.difficulty}
                      </span>
                      <span className="text-xs text-gray-400">Priority: {platform.priority}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Rate:</span> ${platform.creditRate.perSolve.toFixed(4)}/solve
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span> {platform.successRate.toFixed(1)}%
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Time:</span> {platform.averageTime}s
                    </div>
                    <div>
                      <span className="text-gray-400">Daily Limit:</span> {platform.limits.dailyLimit}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {platform.features.bulkSolving && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Bulk</span>
                      )}
                      {platform.features.priorityQueue && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Priority</span>
                      )}
                      {platform.features.referralBonus && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">Referral</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {platform.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Credit Accounts</h3>
            <div className="space-y-3">
              {accounts.map((account) => {
                const platform = platforms.find(p => p.id === account.platformId);
                return (
                  <div
                    key={account.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAccount?.id === account.id ? 'border-purple-500' : 'border-gray-700'
                    }`}
                    onClick={() => setSelectedAccount(account)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${account.settings.autoSolve ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <div>
                          <h4 className="font-semibold">{account.username}</h4>
                          <div className="text-sm text-gray-400">{platform?.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">
                          ${account.balance.credits.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAccount(account.id);
                          }}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Delete Account"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Total Solved:</span> {account.stats.totalSolved}
                      </div>
                      <div>
                        <span className="text-gray-400">Success Rate:</span> {account.stats.totalSolved > 0 ? (account.stats.successfulSolves / account.stats.totalSolved * 100).toFixed(1) : 0}%
                      </div>
                      <div>
                        <span className="text-gray-400">Total Earned:</span> ${account.stats.totalEarnings.toFixed(2)}
                      </div>
                      <div>
                        <span className="text-gray-400">Today:</span> ${account.stats.todayEarnings.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {account.settings.autoSolve && (
                          <span className="px-2 py-1 bg-blue-600 rounded text-xs">Auto-Solve</span>
                        )}
                        {account.settings.autoWithdraw && (
                          <span className="px-2 py-1 bg-purple-600 rounded text-xs">Auto-Withdraw</span>
                        )}
                      </div>
                      <div className="text-gray-400">
                        Created: {new Date(account.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Account Details */}
        {selectedAccount && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Account Details: {selectedAccount.username}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Balance Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Available Credits:</span>
                    <span className="font-medium">${selectedAccount.balance.credits.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pending:</span>
                    <span className="font-medium">${selectedAccount.balance.pending.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Earned:</span>
                    <span className="font-medium">${selectedAccount.balance.earned.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Withdrawn:</span>
                    <span className="font-medium">${selectedAccount.balance.withdrawn.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Performance Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Solved:</span>
                    <span className="font-medium">{selectedAccount.stats.totalSolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="font-medium">{(selectedAccount.stats.successfulSolves / selectedAccount.stats.totalSolved * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Time:</span>
                    <span className="font-medium">{selectedAccount.stats.averageTime.toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best Hour:</span>
                    <span className="font-medium">{selectedAccount.stats.bestHour}:00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-purple-400 mb-2">Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto Solve:</span>
                    <span className="font-medium">{selectedAccount.settings.autoSolve ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto Withdraw:</span>
                    <span className="font-medium">{selectedAccount.settings.autoWithdraw ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Withdrawal Threshold:</span>
                    <span className="font-medium">${selectedAccount.settings.withdrawalThreshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Concurrent:</span>
                    <span className="font-medium">{selectedAccount.settings.maxConcurrent}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => withdrawCredits(selectedAccount.id, selectedAccount.balance.credits)}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Withdraw All Credits (${selectedAccount.balance.credits.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Platform</th>
                  <th className="text-left py-2 px-3">Amount</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-700">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-2 px-3">{transaction.platform}</td>
                    <td className="py-2 px-3">
                      <span className="font-medium">${transaction.amount.toFixed(4)}</span>
                      <span className="text-xs text-gray-400 ml-1">{transaction.currency}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'completed' ? 'bg-green-600' :
                        transaction.status === 'pending' ? 'bg-yellow-600' :
                        transaction.status === 'failed' ? 'bg-red-600' : 'bg-gray-600'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No transactions found
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Credit System Settings</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Withdrawal Threshold ($)</label>
                    <input
                      type="number"
                      value={config.withdrawalThreshold}
                      onChange={(e) => setConfig(prev => ({ ...prev, withdrawalThreshold: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Concurrent Solves</label>
                    <input
                      type="number"
                      value={config.solving.maxConcurrent}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        solving: { ...prev.solving, maxConcurrent: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoSolving}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoSolving: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Solving</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.creditOptimization}
                        onChange={(e) => setConfig(prev => ({ ...prev, creditOptimization: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Credit Optimization</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.platformRotation}
                        onChange={(e) => setConfig(prev => ({ ...prev, platformRotation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Platform Rotation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.bonusHunting}
                        onChange={(e) => setConfig(prev => ({ ...prev, bonusHunting: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Bonus Hunting</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.referralProgram}
                        onChange={(e) => setConfig(prev => ({ ...prev, referralProgram: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Referral Program</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.exchangeTrading}
                        onChange={(e) => setConfig(prev => ({ ...prev, exchangeTrading: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Exchange Trading</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Solving Configuration</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Difficulty</label>
                      <select
                        value={config.solving.preferredDifficulty}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          solving: { ...prev.solving, preferredDifficulty: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Break Frequency (min)</label>
                      <input
                        type="number"
                        value={config.solving.breakFrequency}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          solving: { ...prev.solving, breakFrequency: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="5"
                        max="120"
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

export default CaptchaCreditSystem;
