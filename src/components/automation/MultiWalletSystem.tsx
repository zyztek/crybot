/**
 * Multi-Wallet System Component
 * 
 * Advanced multi-wallet management system with central deposit coordination
 * Supports multiple blockchains, automated transfers, and revenue tracking
 */

import React, { useState, useEffect, useRef } from 'react';
import { Wallet, ArrowRight, DollarSign, TrendingUp, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Globe, CreditCard, Shield } from 'lucide-react';

interface WalletAccount {
  id: string;
  personaId: string;
  name: string;
  type: 'personal' | 'business' | 'trading' | 'savings' | 'central';
  blockchain: string;
  address: string;
  privateKey?: string;
  mnemonic?: string;
  balance: {
    native: number;
    tokens: Array<{
      symbol: string;
      name: string;
      balance: number;
      value: number;
      decimals: number;
    }>;
    totalValue: number;
    lastUpdated: string;
  };
  security: {
    encryption: boolean;
    twoFactor: boolean;
    hardwareWallet: boolean;
    multiSig: boolean;
    backup: boolean;
  };
  activity: {
    totalTransactions: number;
    totalReceived: number;
    totalSent: number;
    totalFees: number;
    lastTransaction?: string;
    averageTransactionValue: number;
  };
  metadata: {
    createdAt: string;
    lastAccessed: string;
    isActive: boolean;
    isPrimary: boolean;
    tags: string[];
    notes: string;
  };
}

interface CentralWallet {
  id: string;
  name: string;
  blockchain: string;
  address: string;
  connectedWallets: string[];
  autoConsolidation: boolean;
  consolidationThreshold: number; // minimum amount to consolidate
  consolidationFrequency: number; // hours
  distribution: {
    enabled: boolean;
    strategy: 'equal' | 'proportional' | 'performance_based' | 'custom';
    rules: Array<{
      walletId: string;
      percentage: number;
      minimumAmount: number;
      maximumAmount?: number;
    }>;
  };
  balance: {
    totalReceived: number;
    totalDistributed: number;
    pendingDistribution: number;
    fees: number;
    netBalance: number;
    lastUpdated: string;
  };
  performance: {
    totalRevenue: number;
    monthlyRevenue: number;
    weeklyRevenue: number;
    dailyRevenue: number;
    averageYield: number; // percentage
    bestPerformingWallet?: string;
  };
  createdAt: string;
  lastActivity: string;
}

interface Transaction {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'consolidation' | 'distribution';
  amount: number;
  symbol: string;
  blockchain: string;
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  hash?: string;
  fee: number;
  timestamp: string;
  confirmedAt?: string;
  metadata: {
    purpose: string;
    category: 'revenue' | 'expense' | 'transfer' | 'consolidation' | 'distribution';
    source?: string;
    destination?: string;
    notes?: string;
  };
}

interface WalletConfig {
  autoConsolidation: boolean;
  consolidationThreshold: number; // USD
  consolidationFrequency: number; // hours
  autoDistribution: boolean;
  distributionStrategy: 'equal' | 'proportional' | 'performance_based';
  security: {
    encryption: boolean;
    multiSig: boolean;
    hardwareWallet: boolean;
    backupFrequency: number; // days
  };
  notifications: {
    largeTransactions: boolean;
    lowBalance: boolean;
    consolidationEvents: boolean;
    distributionEvents: boolean;
    securityAlerts: boolean;
  };
  performance: {
    trackingEnabled: boolean;
    yieldOptimization: boolean;
    rebalancing: boolean;
    riskManagement: boolean;
  };
}

const MultiWalletSystem: React.FC = () => {
  const [wallets, setWallets] = useState<WalletAccount[]>([]);
  const [centralWallets, setCentralWallets] = useState<CentralWallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [config, setConfig] = useState<WalletConfig>({
    autoConsolidation: true,
    consolidationThreshold: 50.00,
    consolidationFrequency: 24,
    autoDistribution: true,
    distributionStrategy: 'proportional',
    security: {
      encryption: true,
      multiSig: false,
      hardwareWallet: false,
      backupFrequency: 7
    },
    notifications: {
      largeTransactions: true,
      lowBalance: true,
      consolidationEvents: true,
      distributionEvents: true,
      securityAlerts: true
    },
    performance: {
      trackingEnabled: true,
      yieldOptimization: true,
      rebalancing: true,
      riskManagement: true
    }
  });
  const [selectedWallet, setSelectedWallet] = useState<WalletAccount | null>(null);
  const [selectedCentralWallet, setSelectedCentralWallet] = useState<CentralWallet | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlockchain, setFilterBlockchain] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [stats, setStats] = useState({
    totalWallets: 0,
    totalBalance: 0,
    totalRevenue: 0,
    activeWallets: 0,
    centralWallets: 0,
    totalTransactions: 0,
    consolidationEvents: 0,
    distributionEvents: 0
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock wallets initialization
  useEffect(() => {
    const mockWallets: WalletAccount[] = [
      {
        id: 'wallet-1',
        personaId: 'persona-1',
        name: 'Primary Trading Wallet',
        type: 'trading',
        blockchain: 'Ethereum',
        address: '0x1234567890abcdef1234567890abcdef12345678',
        privateKey: 'encrypted_private_key_1',
        balance: {
          native: 2.456,
          tokens: [
            { symbol: 'USDT', name: 'Tether', balance: 1250.50, value: 1250.50, decimals: 6 },
            { symbol: 'USDC', name: 'USD Coin', balance: 890.25, value: 890.25, decimals: 6 },
            { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: 0.025, value: 1125.00, decimals: 8 }
          ],
          totalValue: 3265.75,
          lastUpdated: new Date().toISOString()
        },
        security: {
          encryption: true,
          twoFactor: true,
          hardwareWallet: false,
          multiSig: false,
          backup: true
        },
        activity: {
          totalTransactions: 156,
          totalReceived: 15450.75,
          totalSent: 12185.00,
          totalFees: 125.50,
          lastTransaction: '0xabcdef1234567890abcdef1234567890abcdef12345678',
          averageTransactionValue: 78.25
        },
        metadata: {
          createdAt: '2024-01-15T00:00:00Z',
          lastAccessed: new Date().toISOString(),
          isActive: true,
          isPrimary: true,
          tags: ['trading', 'high-volume', 'active'],
          notes: 'Primary wallet for daily trading activities'
        }
      },
      {
        id: 'wallet-2',
        personaId: 'persona-2',
        name: 'Savings Wallet',
        type: 'savings',
        blockchain: 'Bitcoin',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        balance: {
          native: 0.125,
          tokens: [],
          totalValue: 5250.00,
          lastUpdated: new Date().toISOString()
        },
        security: {
          encryption: true,
          twoFactor: true,
          hardwareWallet: true,
          multiSig: true,
          backup: true
        },
        activity: {
          totalTransactions: 45,
          totalReceived: 6800.00,
          totalSent: 1550.00,
          totalFees: 45.50,
          averageTransactionValue: 118.89
        },
        metadata: {
          createdAt: '2024-02-01T00:00:00Z',
          lastAccessed: new Date(Date.now() - 86400000).toISOString(),
          isActive: true,
          isPrimary: false,
          tags: ['savings', 'hardware', 'multi-sig'],
          notes: 'Long-term savings with hardware security'
        }
      },
      {
        id: 'wallet-3',
        personaId: 'persona-3',
        name: 'Faucet Collection Wallet',
        type: 'personal',
        blockchain: 'Polygon',
        address: '0x9876543210fedcba9876543210fedcba987654321',
        balance: {
          native: 125.50,
          tokens: [
            { symbol: 'MATIC', name: 'Polygon', balance: 125.50, value: 87.85, decimals: 18 },
            { symbol: 'USDC', name: 'USD Coin', balance: 250.00, value: 250.00, decimals: 6 }
          ],
          totalValue: 337.85,
          lastUpdated: new Date().toISOString()
        },
        security: {
          encryption: true,
          twoFactor: false,
          hardwareWallet: false,
          multiSig: false,
          backup: true
        },
        activity: {
          totalTransactions: 289,
          totalReceived: 1250.75,
          totalSent: 912.90,
          totalFees: 15.25,
          averageTransactionValue: 4.33
        },
        metadata: {
          createdAt: '2024-03-01T00:00:00Z',
          lastAccessed: new Date().toISOString(),
          isActive: true,
          isPrimary: false,
          tags: ['faucet', 'collection', 'high-frequency'],
          notes: 'Wallet for collecting faucet rewards'
        }
      }
    ];

    setWallets(mockWallets);
  }, []);

  // Mock central wallets initialization
  useEffect(() => {
    const mockCentralWallets: CentralWallet[] = [
      {
        id: 'central-1',
        name: 'Main Revenue Hub',
        blockchain: 'Ethereum',
        address: '0xabcdef1234567890abcdef1234567890abcdef12345678',
        connectedWallets: ['wallet-1', 'wallet-3'],
        autoConsolidation: true,
        consolidationThreshold: 100.00,
        consolidationFrequency: 24,
        distribution: {
          enabled: true,
          strategy: 'proportional',
          rules: [
            { walletId: 'wallet-1', percentage: 60, minimumAmount: 50 },
            { walletId: 'wallet-3', percentage: 40, minimumAmount: 25 }
          ]
        },
        balance: {
          totalReceived: 15450.75,
          totalDistributed: 8925.50,
          pendingDistribution: 0,
          fees: 125.75,
          netBalance: 6399.50,
          lastUpdated: new Date().toISOString()
        },
        performance: {
          totalRevenue: 15450.75,
          monthlyRevenue: 3250.15,
          weeklyRevenue: 812.54,
          dailyRevenue: 116.08,
          averageYield: 12.5,
          bestPerformingWallet: 'wallet-1'
        },
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString()
      }
    ];

    setCentralWallets(mockCentralWallets);
  }, []);

  // Mock transactions initialization
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'tx-1',
        fromWalletId: 'wallet-3',
        toWalletId: 'central-1',
        type: 'consolidation',
        amount: 250.00,
        symbol: 'USDC',
        blockchain: 'Polygon',
        status: 'confirmed',
        hash: '0x1234567890abcdef1234567890abcdef12345678',
        fee: 2.50,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        confirmedAt: new Date(Date.now() - 3000000).toISOString(),
        metadata: {
          purpose: 'Consolidate faucet earnings',
          category: 'consolidation',
          source: 'Faucet Collection',
          destination: 'Main Revenue Hub'
        }
      },
      {
        id: 'tx-2',
        fromWalletId: 'central-1',
        toWalletId: 'wallet-1',
        type: 'distribution',
        amount: 150.00,
        symbol: 'USDT',
        blockchain: 'Ethereum',
        status: 'confirmed',
        hash: '0xabcdef1234567890abcdef1234567890abcdef12345678',
        fee: 5.00,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        confirmedAt: new Date(Date.now() - 6000000).toISOString(),
        metadata: {
          purpose: 'Distribute trading funds',
          category: 'distribution',
          source: 'Main Revenue Hub',
          destination: 'Primary Trading Wallet'
        }
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  // Auto consolidation simulation
  useEffect(() => {
    if (!config.autoConsolidation) return;

    const interval = setInterval(() => {
      // Check for wallets that need consolidation
      wallets.forEach(wallet => {
        if (wallet.type === 'central') return;
        
        const shouldConsolidate = wallet.balance.totalValue >= config.consolidationThreshold;
        
        if (shouldConsolidate && Math.random() > 0.7) { // 30% chance
          const centralWallet = centralWallets.find(cw => cw.blockchain === wallet.blockchain);
          if (!centralWallet) return;

          const newTransaction: Transaction = {
            id: `tx-${Date.now()}`,
            fromWalletId: wallet.id,
            toWalletId: centralWallet.id,
            type: 'consolidation',
            amount: wallet.balance.totalValue * 0.8, // Consolidate 80%
            symbol: 'USD',
            blockchain: wallet.blockchain,
            status: 'pending',
            fee: wallet.balance.totalValue * 0.01, // 1% fee
            timestamp: new Date().toISOString(),
            metadata: {
              purpose: 'Auto consolidation',
              category: 'consolidation',
              source: wallet.name,
              destination: centralWallet.name
            }
          };

          setTransactions(prev => [...prev, newTransaction]);

          // Simulate confirmation
          setTimeout(() => {
            setTransactions(prev => prev.map(tx => 
              tx.id === newTransaction.id 
                ? {
                    ...tx,
                    status: 'confirmed',
                    hash: `0x${Math.random().toString(36).substr(2, 64)}`,
                    confirmedAt: new Date().toISOString()
                  }
                : tx
            ));

            // Update wallet balances
            setWallets(prev => prev.map(w => 
              w.id === wallet.id 
                ? {
                    ...w,
                    balance: {
                      ...w.balance,
                      totalValue: w.balance.totalValue * 0.2,
                      lastUpdated: new Date().toISOString()
                    }
                  }
                : w
            ));

            setCentralWallets(prev => prev.map(cw => 
              cw.id === centralWallet.id 
                ? {
                    ...cw,
                    balance: {
                      ...cw.balance,
                      totalReceived: cw.balance.totalReceived + newTransaction.amount,
                      netBalance: cw.balance.netBalance + newTransaction.amount - newTransaction.fee,
                      lastUpdated: new Date().toISOString()
                    },
                    lastActivity: new Date().toISOString()
                  }
                : cw
            ));
          }, 15000);
        }
      });
    }, config.consolidationFrequency * 60 * 60 * 1000); // Convert hours to milliseconds

    return () => clearInterval(interval);
  }, [config.autoConsolidation, config.consolidationFrequency, wallets, centralWallets]);

  // Auto distribution simulation
  useEffect(() => {
    if (!config.autoDistribution) return;

    const interval = setInterval(() => {
      centralWallets.forEach(centralWallet => {
        if (!centralWallet.distribution.enabled) return;
        
        if (Math.random() > 0.8) { // 20% chance
          const distributionAmount = centralWallet.balance.netBalance * 0.3; // Distribute 30%
          
          centralWallet.distribution.rules.forEach(rule => {
            const targetWallet = wallets.find(w => w.id === rule.walletId);
            if (!targetWallet) return;

            const amount = distributionAmount * (rule.percentage / 100);
            
            const newTransaction: Transaction = {
              id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              fromWalletId: centralWallet.id,
              toWalletId: rule.walletId,
              type: 'distribution',
              amount,
              symbol: 'USD',
              blockchain: centralWallet.blockchain,
              status: 'pending',
              fee: amount * 0.005, // 0.5% fee
              timestamp: new Date().toISOString(),
              metadata: {
                purpose: 'Auto distribution',
                category: 'distribution',
                source: centralWallet.name,
                destination: targetWallet.name
              }
            };

            setTransactions(prev => [...prev, newTransaction]);

            // Simulate confirmation
            setTimeout(() => {
              setTransactions(prev => prev.map(tx => 
                tx.id === newTransaction.id 
                  ? {
                      ...tx,
                      status: 'confirmed',
                      hash: `0x${Math.random().toString(36).substr(2, 64)}`,
                      confirmedAt: new Date().toISOString()
                    }
                  : tx
              ));

              // Update wallet balances
              setWallets(prev => prev.map(w => 
                w.id === rule.walletId 
                  ? {
                      ...w,
                      balance: {
                        ...w.balance,
                        totalValue: w.balance.totalValue + amount,
                        lastUpdated: new Date().toISOString()
                      }
                    }
                  : w
              ));

              setCentralWallets(prev => prev.map(cw => 
                cw.id === centralWallet.id 
                  ? {
                      ...cw,
                      balance: {
                        ...cw.balance,
                        totalDistributed: cw.balance.totalDistributed + amount,
                        netBalance: cw.balance.netBalance - amount - newTransaction.fee,
                        lastUpdated: new Date().toISOString()
                      },
                      lastActivity: new Date().toISOString()
                    }
                  : cw
              ));
            }, 10000);
          });
        }
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [config.autoDistribution, centralWallets, wallets]);

  // Update stats
  useEffect(() => {
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance.totalValue, 0);
    const activeWallets = wallets.filter(w => w.metadata.isActive).length;
    const totalRevenue = centralWallets.reduce((sum, cw) => sum + cw.performance.totalRevenue, 0);
    const totalTransactions = transactions.length;
    const consolidationEvents = transactions.filter(t => t.type === 'consolidation').length;
    const distributionEvents = transactions.filter(t => t.type === 'distribution').length;

    setStats({
      totalWallets: wallets.length,
      totalBalance,
      totalRevenue,
      activeWallets,
      centralWallets: centralWallets.length,
      totalTransactions,
      consolidationEvents,
      distributionEvents
    });
  }, [wallets, centralWallets, transactions]);

  const createWallet = () => {
    const blockchains = ['Ethereum', 'Bitcoin', 'Polygon', 'Binance Smart Chain', 'Arbitrum'];
    const types: WalletAccount['type'][] = ['personal', 'business', 'trading', 'savings'];
    
    const newWallet: WalletAccount = {
      id: `wallet-${Date.now()}`,
      personaId: 'persona-1',
      name: `New ${types[Math.floor(Math.random() * types.length)]} Wallet`,
      type: types[Math.floor(Math.random() * types.length)],
      blockchain: blockchains[Math.floor(Math.random() * blockchains.length)],
      address: `0x${Math.random().toString(36).substr(2, 40)}`,
      balance: {
        native: 0,
        tokens: [],
        totalValue: 0,
        lastUpdated: new Date().toISOString()
      },
      security: {
        encryption: config.security.encryption,
        twoFactor: false,
        hardwareWallet: false,
        multiSig: false,
        backup: true
      },
      activity: {
        totalTransactions: 0,
        totalReceived: 0,
        totalSent: 0,
        totalFees: 0,
        averageTransactionValue: 0
      },
      metadata: {
        createdAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
        isActive: true,
        isPrimary: false,
        tags: [],
        notes: ''
      }
    };

    setWallets(prev => [...prev, newWallet]);
    setShowCreateForm(false);
  };

  const createCentralWallet = () => {
    const blockchains = ['Ethereum', 'Bitcoin', 'Polygon'];
    
    const newCentralWallet: CentralWallet = {
      id: `central-${Date.now()}`,
      name: `Central Hub ${centralWallets.length + 1}`,
      blockchain: blockchains[Math.floor(Math.random() * blockchains.length)],
      address: `0x${Math.random().toString(36).substr(2, 40)}`,
      connectedWallets: [],
      autoConsolidation: config.autoConsolidation,
      consolidationThreshold: config.consolidationThreshold,
      consolidationFrequency: config.consolidationFrequency,
      distribution: {
        enabled: config.autoDistribution,
        strategy: config.distributionStrategy,
        rules: []
      },
      balance: {
        totalReceived: 0,
        totalDistributed: 0,
        pendingDistribution: 0,
        fees: 0,
        netBalance: 0,
        lastUpdated: new Date().toISOString()
      },
      performance: {
        totalRevenue: 0,
        monthlyRevenue: 0,
        weeklyRevenue: 0,
        dailyRevenue: 0,
        averageYield: 0
      },
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    setCentralWallets(prev => [...prev, newCentralWallet]);
  };

  const deleteWallet = (walletId: string) => {
    setWallets(prev => prev.filter(w => w.id !== walletId));
    if (selectedWallet?.id === walletId) {
      setSelectedWallet(null);
    }
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const exportWallets = () => {
    const exportData = {
      wallets,
      centralWallets,
      transactions,
      config,
      stats,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallet-system-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getWalletTypeColor = (type: WalletAccount['type']) => {
    switch (type) {
      case 'personal': return 'bg-blue-600';
      case 'business': return 'bg-purple-600';
      case 'trading': return 'bg-green-600';
      case 'savings': return 'bg-orange-600';
      case 'central': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTransactionTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'bg-green-600';
      case 'withdrawal': return 'bg-red-600';
      case 'transfer': return 'bg-blue-600';
      case 'consolidation': return 'bg-purple-600';
      case 'distribution': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredWallets = () => {
    return wallets.filter(wallet => {
      const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wallet.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBlockchain = filterBlockchain === 'all' || wallet.blockchain === filterBlockchain;
      const matchesType = filterType === 'all' || wallet.type === filterType;
      return matchesSearch && matchesBlockchain && matchesType;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-purple-400" />
            Multi-Wallet System
          </h1>
          <p className="text-gray-400">
            Advanced multi-wallet management with central deposit coordination
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Wallets</div>
                <div className="text-2xl font-bold">{stats.totalWallets}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Total Balance</div>
                <div className="text-2xl font-bold">${stats.totalBalance.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">Central Wallets</div>
                <div className="text-2xl font-bold">{stats.centralWallets}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Total Transactions</div>
                <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Wallet Management</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={createWallet}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Wallet className="w-4 h-4" />
                Create Wallet
              </button>
              <button
                onClick={createCentralWallet}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                Create Central
              </button>
              <button
                onClick={exportWallets}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
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
              Active: {stats.activeWallets} | 
              Consolidations: {stats.consolidationEvents} | 
              Distributions: {stats.distributionEvents} | 
              Auto: {config.autoConsolidation ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Wallets</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search wallets..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterBlockchain}
                onChange={(e) => setFilterBlockchain(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Blockchains</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Polygon">Polygon</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="trading">Trading</option>
                <option value="savings">Savings</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredWallets().map((wallet) => (
                <div
                  key={wallet.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWallet?.id === wallet.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${wallet.metadata.isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <h4 className="font-semibold">{wallet.name}</h4>
                        <div className="text-sm text-gray-400">{wallet.blockchain}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getWalletTypeColor(wallet.type)}`}>
                        {wallet.type}
                      </span>
                      {wallet.metadata.isPrimary && (
                        <span className="px-2 py-1 bg-yellow-600 rounded text-xs">Primary</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyAddress(wallet.address);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy Address"
                      >
                        <Copy className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWallet(wallet.id);
                        }}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Balance:</span> ${wallet.balance.totalValue.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-400">Transactions:</span> {wallet.activity.totalTransactions}
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Transaction:</span> ${wallet.activity.averageTransactionValue.toFixed(2)}
                    </div>
                    <div>
                      <span className="text-gray-400">Created:</span> {new Date(wallet.metadata.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 mb-3 font-mono">
                    {wallet.address.substring(0, 20)}...{wallet.address.substring(wallet.address.length - 8)}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {wallet.security.encryption && (
                        <span className="px-2 py-1 bg-green-600 rounded text-xs">Encrypted</span>
                      )}
                      {wallet.security.hardwareWallet && (
                        <span className="px-2 py-1 bg-blue-600 rounded text-xs">Hardware</span>
                      )}
                      {wallet.security.multiSig && (
                        <span className="px-2 py-1 bg-purple-600 rounded text-xs">Multi-Sig</span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {wallet.balance.tokens.length} tokens
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Wallet Details */}
          {selectedWallet && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Wallet Details: {selectedWallet.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Balance Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Native Balance:</span> {selectedWallet.balance.native} {selectedWallet.blockchain === 'Bitcoin' ? 'BTC' : 'ETH'}</div>
                      <div><span className="text-gray-400">Total Value:</span> ${selectedWallet.balance.totalValue.toFixed(2)}</div>
                      <div><span className="text-gray-400">Last Updated:</span> {new Date(selectedWallet.balance.lastUpdated).toLocaleString()}</div>
                      <div><span className="text-gray-400">Tokens:</span> {selectedWallet.balance.tokens.length}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Activity Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Total Transactions:</span> {selectedWallet.activity.totalTransactions}</div>
                      <div><span className="text-gray-400">Total Received:</span> ${selectedWallet.activity.totalReceived.toFixed(2)}</div>
                      <div><span className="text-gray-400">Total Sent:</span> ${selectedWallet.activity.totalSent.toFixed(2)}</div>
                      <div><span className="text-gray-400">Total Fees:</span> ${selectedWallet.activity.totalFees.toFixed(2)}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Security Features</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Encryption:</span> {selectedWallet.security.encryption ? 'Yes' : 'No'}</div>
                      <div><span className="text-gray-400">2FA:</span> {selectedWallet.security.twoFactor ? 'Yes' : 'No'}</div>
                      <div><span className="text-gray-400">Hardware Wallet:</span> {selectedWallet.security.hardwareWallet ? 'Yes' : 'No'}</div>
                      <div><span className="text-gray-400">Multi-Sig:</span> {selectedWallet.security.multiSig ? 'Yes' : 'No'}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Token Balances</h4>
                    <div className="space-y-2">
                      {selectedWallet.balance.tokens.map((token, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                          <div>
                            <div className="font-medium">{token.symbol}</div>
                            <div className="text-sm text-gray-400">{token.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{token.balance.toFixed(token.decimals)}</div>
                            <div className="text-sm text-gray-400">${token.value.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Central Wallets */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Central Wallets</h3>
          <div className="space-y-3">
            {centralWallets.map((centralWallet) => (
              <div
                key={centralWallet.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCentralWallet?.id === centralWallet.id ? 'border-purple-500' : 'border-gray-700'
                }`}
                onClick={() => setSelectedCentralWallet(centralWallet)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                    <div>
                      <h4 className="font-semibold">{centralWallet.name}</h4>
                      <div className="text-sm text-gray-400">{centralWallet.blockchain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-600 rounded text-xs">Central</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyAddress(centralWallet.address);
                      }}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                      title="Copy Address"
                    >
                      <Copy className="w-4 h-4 text-blue-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Net Balance:</span> ${centralWallet.balance.netBalance.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Total Revenue:</span> ${centralWallet.performance.totalRevenue.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Connected Wallets:</span> {centralWallet.connectedWallets.length}
                  </div>
                  <div>
                    <span className="text-gray-400">Average Yield:</span> {centralWallet.performance.averageYield.toFixed(1)}%
                  </div>
                </div>

                <div className="text-xs text-gray-400 mb-3 font-mono">
                  {centralWallet.address.substring(0, 20)}...{centralWallet.address.substring(centralWallet.address.length - 8)}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {centralWallet.autoConsolidation && (
                      <span className="px-2 py-1 bg-purple-600 rounded text-xs">Auto-Consolidate</span>
                    )}
                    {centralWallet.distribution.enabled && (
                      <span className="px-2 py-1 bg-orange-600 rounded text-xs">Auto-Distribute</span>
                    )}
                  </div>
                  <div className="text-gray-400">
                    {new Date(centralWallet.lastActivity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">From</th>
                  <th className="text-left py-2 px-3">To</th>
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
                        {transaction.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs">
                        {wallets.find(w => w.id === transaction.fromWalletId)?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-xs">
                        {transaction.toWalletId === 'central-1' ? 'Central Hub' : 
                         wallets.find(w => w.id === transaction.toWalletId)?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                      <span className="text-xs text-gray-400 ml-1">{transaction.symbol}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'confirmed' ? 'bg-green-600' :
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
              <h2 className="text-2xl font-bold mb-6">Wallet System Settings</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Consolidation Threshold ($)</label>
                    <input
                      type="number"
                      value={config.consolidationThreshold}
                      onChange={(e) => setConfig(prev => ({ ...prev, consolidationThreshold: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      min="1"
                      max="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Consolidation Frequency (hours)</label>
                    <input
                      type="number"
                      value={config.consolidationFrequency}
                      onChange={(e) => setConfig(prev => ({ ...prev, consolidationFrequency: parseInt(e.target.value) }))}
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
                        checked={config.autoConsolidation}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoConsolidation: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Consolidation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoDistribution}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoDistribution: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Distribution</span>
                    </label>
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
                        checked={config.security.multiSig}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          security: { ...prev.security, multiSig: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Multi-Sig</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Distribution Strategy</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="distributionStrategy"
                        value="equal"
                        checked={config.distributionStrategy === 'equal'}
                        onChange={(e) => setConfig(prev => ({ ...prev, distributionStrategy: e.target.value as any }))}
                        className="w-3 h-3 text-purple-600"
                      />
                      <span className="text-sm">Equal</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="distributionStrategy"
                        value="proportional"
                        checked={config.distributionStrategy === 'proportional'}
                        onChange={(e) => setConfig(prev => ({ ...prev, distributionStrategy: e.target.value as any }))}
                        className="w-3 h-3 text-purple-600"
                      />
                      <span className="text-sm">Proportional</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="distributionStrategy"
                        value="performance_based"
                        checked={config.distributionStrategy === 'performance_based'}
                        onChange={(e) => setConfig(prev => ({ ...prev, distributionStrategy: e.target.value as any }))}
                        className="w-3 h-3 text-purple-600"
                      />
                      <span className="text-sm">Performance Based</span>
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

export default MultiWalletSystem;
