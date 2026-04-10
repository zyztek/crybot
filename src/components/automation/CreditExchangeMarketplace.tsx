/**
 * Credit Exchange Marketplace Component
 * 
 * Build credit exchange marketplace for trading captcha credits and digital assets
 * Comprehensive trading platform for credits, tokens, and digital assets with automated matching
 */

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Settings, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Target, Activity, Shield, Users, Zap, ArrowUpDown, BarChart3, Coins, Exchange } from 'lucide-react';

interface Credit {
  id: string;
  name: string;
  symbol: string;
  type: 'captcha' | 'api' | 'service' | 'utility' | 'governance' | 'reward';
  provider: string;
  description: string;
  totalSupply: number;
  circulatingSupply: number;
  price: {
    current: number;
    currency: string;
    change24h: number;
    change7d: number;
    volume24h: number;
    marketCap: number;
  };
  features: {
    transferable: boolean;
    tradable: boolean;
    stakable: boolean;
    burnable: boolean;
    convertible: boolean;
  };
  utility: {
    services: string[];
    platforms: string[];
    useCases: string[];
  };
  rewards: {
    earnRate: number; // per hour
    stakingAPY: number; // annual percentage yield
    bonusMultiplier: number;
  };
  liquidity: {
    totalLiquidity: number;
    depth: number;
    spread: number;
    providers: number;
  };
  trading: {
    enabled: boolean;
    restrictions: string[];
    fees: {
      maker: number; // percentage
      taker: number; // percentage
      withdrawal: number; // fixed amount
    };
  };
  status: 'active' | 'inactive' | 'delisted' | 'suspended';
  createdAt: string;
  lastUpdated: string;
}

interface Order {
  id: string;
  type: 'buy' | 'sell';
  creditId: string;
  creditName: string;
  creditSymbol: string;
  amount: number;
  price: number;
  total: number;
  currency: string;
  userId: string;
  userName: string;
  status: 'open' | 'partially_filled' | 'filled' | 'cancelled' | 'expired';
  filled: number;
  remaining: number;
  averagePrice: number;
  timeInForce: 'GTC' | 'IOC' | 'FOK'; // Good Till Cancelled, Immediate Or Cancel, Fill Or Kill
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

interface Trade {
  id: string;
  orderId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  creditId: string;
  creditName: string;
  creditSymbol: string;
  amount: number;
  price: number;
  total: number;
  currency: string;
  fee: number;
  feeAmount: number;
  timestamp: string;
  type: 'market' | 'limit';
}

interface ExchangeAccount {
  id: string;
  userId: string;
  userName: string;
  balance: Array<{
    creditId: string;
    creditSymbol: string;
    available: number;
    frozen: number;
    total: number;
    valueUSD: number;
  }>;
  trading: {
    totalTrades: number;
    totalVolume: number;
    totalFees: number;
    profitLoss: number;
    winRate: number;
  };
  staking: {
    totalStaked: number;
    totalRewards: number;
    averageAPY: number;
    positions: Array<{
      creditId: string;
      amount: number;
      apy: number;
      rewards: number;
      startedAt: string;
    }>;
  };
  createdAt: string;
  lastActivity: string;
  isActive: boolean;
}

interface CreditExchangeConfig {
  autoMode: boolean;
  marketMaking: boolean;
  arbitrage: boolean;
  liquidityProvision: boolean;
  trading: {
    autoTrading: boolean;
    riskManagement: boolean;
    portfolioRebalancing: boolean;
    stopLoss: boolean;
    takeProfit: boolean;
  };
  fees: {
    makerFee: number; // percentage
    takerFee: number; // percentage
    withdrawalFee: number; // fixed amount
    listingFee: number; // fixed amount
  };
  limits: {
    maxOrderSize: number;
    maxDailyVolume: number;
    maxPositions: number;
    minOrderSize: number;
  };
  security: {
    twoFactorAuth: boolean;
    withdrawalWhitelist: boolean;
    ipWhitelist: boolean;
    auditLogging: boolean;
  };
  notifications: {
    priceAlerts: boolean;
    orderUpdates: boolean;
    tradeExecutions: boolean;
    accountActivity: boolean;
  };
}

const CreditExchangeMarketplace: React.FC = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [accounts, setAccounts] = useState<ExchangeAccount[]>([]);
  const [config, setConfig] = useState<CreditExchangeConfig>({
    autoMode: true,
    marketMaking: true,
    arbitrage: true,
    liquidityProvision: true,
    trading: {
      autoTrading: true,
      riskManagement: true,
      portfolioRebalancing: true,
      stopLoss: true,
      takeProfit: true
    },
    fees: {
      makerFee: 0.1,
      takerFee: 0.2,
      withdrawalFee: 1.0,
      listingFee: 100.0
    },
    limits: {
      maxOrderSize: 100000,
      maxDailyVolume: 1000000,
      maxPositions: 50,
      minOrderSize: 10
    },
    security: {
      twoFactorAuth: true,
      withdrawalWhitelist: true,
      ipWhitelist: true,
      auditLogging: true
    },
    notifications: {
      priceAlerts: true,
      orderUpdates: true,
      tradeExecutions: true,
      accountActivity: true
    }
  });
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<ExchangeAccount | null>(null);
  const [isOperating, setIsOperating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({
    totalCredits: 0,
    activeCredits: 0,
    totalVolume: 0,
    totalTrades: 0,
    totalLiquidity: 0,
    marketCap: 0,
    bestPerformer: '',
    worstPerformer: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock credits initialization
  useEffect(() => {
    const mockCredits: Credit[] = [
      {
        id: 'credit-1',
        name: 'CaptchaSolver Pro',
        symbol: 'CAP',
        type: 'captcha',
        provider: '2Captcha',
        description: 'Premium captcha solving credits for automated verification',
        totalSupply: 10000000,
        circulatingSupply: 7500000,
        price: {
          current: 0.015,
          currency: 'USD',
          change24h: 2.5,
          change7d: 8.2,
          volume24h: 150000,
          marketCap: 112500
        },
        features: {
          transferable: true,
          tradable: true,
          stakable: true,
          burnable: true,
          convertible: true
        },
        utility: {
          services: ['2Captcha', 'Anti-Captcha', 'CapMonster'],
          platforms: ['Web automation', 'Bot development', 'Testing'],
          useCases: ['Account creation', 'Form submission', 'Data scraping']
        },
        rewards: {
          earnRate: 0.5,
          stakingAPY: 12.5,
          bonusMultiplier: 1.2
        },
        liquidity: {
          totalLiquidity: 25000,
          depth: 15000,
          spread: 0.002,
          providers: 12
        },
        trading: {
          enabled: true,
          restrictions: ['No wash trading', 'Max 10% daily volume'],
          fees: {
            maker: 0.1,
            taker: 0.2,
            withdrawal: 1.0
          }
        },
        status: 'active',
        createdAt: '2024-01-15T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'credit-2',
        name: 'API Access Token',
        symbol: 'API',
        type: 'api',
        provider: 'Various',
        description: 'Universal API access credits for multiple services',
        totalSupply: 5000000,
        circulatingSupply: 3200000,
        price: {
          current: 0.025,
          currency: 'USD',
          change24h: -1.2,
          change7d: 5.8,
          volume24h: 80000,
          marketCap: 80000
        },
        features: {
          transferable: true,
          tradable: true,
          stakable: false,
          burnable: true,
          convertible: true
        },
        utility: {
          services: ['OpenAI', 'Google Cloud', 'AWS', 'Azure'],
          platforms: ['AI services', 'Cloud computing', 'Data processing'],
          useCases: ['API calls', 'Service access', 'Resource utilization']
        },
        rewards: {
          earnRate: 0.3,
          stakingAPY: 0,
          bonusMultiplier: 1.0
        },
        liquidity: {
          totalLiquidity: 15000,
          depth: 8000,
          spread: 0.003,
          providers: 8
        },
        trading: {
          enabled: true,
          restrictions: ['KYC required', 'Max 5% daily volume'],
          fees: {
            maker: 0.15,
            taker: 0.25,
            withdrawal: 2.0
          }
        },
        status: 'active',
        createdAt: '2024-01-10T00:00:00Z',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'credit-3',
        name: 'Service Credits',
        symbol: 'SVC',
        type: 'service',
        provider: 'ServiceHub',
        description: 'Multi-platform service credits for premium features',
        totalSupply: 20000000,
        circulatingSupply: 15000000,
        price: {
          current: 0.008,
          currency: 'USD',
          change24h: 5.8,
          change7d: 12.3,
          volume24h: 200000,
          marketCap: 120000
        },
        features: {
          transferable: true,
          tradable: true,
          stakable: true,
          burnable: false,
          convertible: true
        },
        utility: {
          services: ['Premium features', 'Advanced tools', 'Priority support'],
          platforms: ['SaaS platforms', 'Mobile apps', 'Web services'],
          useCases: ['Feature unlocks', 'Service upgrades', 'Support tickets']
        },
        rewards: {
          earnRate: 0.8,
          stakingAPY: 15.2,
          bonusMultiplier: 1.5
        },
        liquidity: {
          totalLiquidity: 30000,
          depth: 20000,
          spread: 0.0015,
          providers: 15
        },
        trading: {
          enabled: true,
          restrictions: ['No restrictions'],
          fees: {
            maker: 0.05,
            taker: 0.15,
            withdrawal: 0.5
          }
        },
        status: 'active',
        createdAt: '2024-01-05T00:00:00Z',
        lastUpdated: new Date().toISOString()
      }
    ];

    setCredits(mockCredits);
  }, []);

  // Mock orders initialization
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'order-1',
        type: 'buy',
        creditId: 'credit-1',
        creditName: 'CaptchaSolver Pro',
        creditSymbol: 'CAP',
        amount: 10000,
        price: 0.014,
        total: 140,
        currency: 'USD',
        userId: 'user-1',
        userName: 'TraderPro',
        status: 'open',
        filled: 0,
        remaining: 10000,
        averagePrice: 0,
        timeInForce: 'GTC',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'order-2',
        type: 'sell',
        creditId: 'credit-1',
        creditName: 'CaptchaSolver Pro',
        creditSymbol: 'CAP',
        amount: 5000,
        price: 0.016,
        total: 80,
        currency: 'USD',
        userId: 'user-2',
        userName: 'CreditSeller',
        status: 'partially_filled',
        filled: 2000,
        remaining: 3000,
        averagePrice: 0.015,
        timeInForce: 'GTC',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString()
      }
    ];

    setOrders(mockOrders);
  }, []);

  // Mock trades initialization
  useEffect(() => {
    const mockTrades: Trade[] = [
      {
        id: 'trade-1',
        orderId: 'order-2',
        buyerId: 'user-1',
        buyerName: 'TraderPro',
        sellerId: 'user-2',
        sellerName: 'CreditSeller',
        creditId: 'credit-1',
        creditName: 'CaptchaSolver Pro',
        creditSymbol: 'CAP',
        amount: 2000,
        price: 0.015,
        total: 30,
        currency: 'USD',
        fee: 0.2,
        feeAmount: 0.06,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'limit'
      },
      {
        id: 'trade-2',
        orderId: 'order-3',
        buyerId: 'user-3',
        buyerName: 'QuickBuyer',
        sellerId: 'user-4',
        sellerName: 'MarketMaker',
        creditId: 'credit-2',
        creditName: 'API Access Token',
        creditSymbol: 'API',
        amount: 3000,
        price: 0.024,
        total: 72,
        currency: 'USD',
        fee: 0.25,
        feeAmount: 0.18,
        timestamp: new Date(Date.now() - 900000).toISOString(),
        type: 'market'
      }
    ];

    setTrades(mockTrades);
  }, []);

  // Mock accounts initialization
  useEffect(() => {
    const mockAccounts: ExchangeAccount[] = [
      {
        id: 'account-1',
        userId: 'user-1',
        userName: 'TraderPro',
        balance: [
          {
            creditId: 'credit-1',
            creditSymbol: 'CAP',
            available: 50000,
            frozen: 10000,
            total: 60000,
            valueUSD: 900
          },
          {
            creditId: 'credit-2',
            creditSymbol: 'API',
            available: 20000,
            frozen: 5000,
            total: 25000,
            valueUSD: 625
          },
          {
            creditId: 'credit-3',
            creditSymbol: 'SVC',
            available: 100000,
            frozen: 0,
            total: 100000,
            valueUSD: 800
          }
        ],
        trading: {
          totalTrades: 156,
          totalVolume: 45600,
          totalFees: 91.2,
          profitLoss: 2340,
          winRate: 68.5
        },
        staking: {
          totalStaked: 30000,
          totalRewards: 450,
          averageAPY: 14.2,
          positions: [
            {
              creditId: 'credit-1',
              amount: 20000,
              apy: 12.5,
              rewards: 250,
              startedAt: '2024-01-15T00:00:00Z'
            },
            {
              creditId: 'credit-3',
              amount: 10000,
              apy: 15.2,
              rewards: 200,
              startedAt: '2024-01-20T00:00:00Z'
            }
          ]
        },
        createdAt: '2024-01-01T00:00:00Z',
        lastActivity: new Date().toISOString(),
        isActive: true
      }
    ];

    setAccounts(mockAccounts);
  }, []);

  // Auto operations simulation
  useEffect(() => {
    if (!config.autoMode || !isOperating) return;

    const interval = setInterval(() => {
      // Update credit prices
      setCredits(prev => prev.map(credit => {
        const priceChange = (Math.random() - 0.5) * 0.002; // ±0.2% change
        const newPrice = Math.max(0.001, credit.price.current + priceChange);
        const change24h = ((newPrice - credit.price.current) / credit.price.current) * 100;
        
        return {
          ...credit,
          price: {
            ...credit.price,
            current: newPrice,
            change24h,
            marketCap: newPrice * credit.circulatingSupply
          },
          lastUpdated: new Date().toISOString()
        };
      }));

      // Process order matching
      const buyOrders = orders.filter(o => o.type === 'buy' && o.status === 'open');
      const sellOrders = orders.filter(o => o.type === 'sell' && o.status === 'open');
      
      buyOrders.forEach(buyOrder => {
        const matchingSells = sellOrders.filter(sellOrder => 
          sellOrder.creditId === buyOrder.creditId && 
          sellOrder.price <= buyOrder.price
        ).sort((a, b) => a.price - b.price);

        matchingSells.forEach(sellOrder => {
          const tradeAmount = Math.min(buyOrder.remaining, sellOrder.remaining);
          if (tradeAmount > 0) {
            const tradePrice = sellOrder.price;
            const tradeTotal = tradeAmount * tradePrice;
            const fee = config.fees.takerFee;
            const feeAmount = tradeTotal * (fee / 100);

            const newTrade: Trade = {
              id: `trade-${Date.now()}-${Math.random()}`,
              orderId: buyOrder.id,
              buyerId: buyOrder.userId,
              buyerName: buyOrder.userName,
              sellerId: sellOrder.userId,
              sellerName: sellOrder.userName,
              creditId: buyOrder.creditId,
              creditName: buyOrder.creditName,
              creditSymbol: buyOrder.creditSymbol,
              amount: tradeAmount,
              price: tradePrice,
              total: tradeTotal,
              currency: buyOrder.currency,
              fee,
              feeAmount,
              timestamp: new Date().toISOString(),
              type: 'limit'
            };

            setTrades(prev => [...prev, newTrade]);

            // Update orders
            setOrders(prev => prev.map(order => {
              if (order.id === buyOrder.id) {
                const newFilled = order.filled + tradeAmount;
                const newRemaining = order.remaining - tradeAmount;
                return {
                  ...order,
                  filled: newFilled,
                  remaining: newRemaining,
                  status: newRemaining === 0 ? 'filled' : 'partially_filled',
                  averagePrice: ((order.averagePrice * order.filled) + (tradePrice * tradeAmount)) / newFilled,
                  updatedAt: new Date().toISOString()
                };
              }
              if (order.id === sellOrder.id) {
                const newFilled = order.filled + tradeAmount;
                const newRemaining = order.remaining - tradeAmount;
                return {
                  ...order,
                  filled: newFilled,
                  remaining: newRemaining,
                  status: newRemaining === 0 ? 'filled' : 'partially_filled',
                  averagePrice: ((order.averagePrice * order.filled) + (tradePrice * tradeAmount)) / newFilled,
                  updatedAt: new Date().toISOString()
                };
              }
              return order;
            }));
          }
        });
      });

      // Auto order placement (market making)
      if (config.marketMaking && Math.random() > 0.7) { // 30% chance
        const activeCredits = credits.filter(c => c.trading.enabled);
        if (activeCredits.length > 0) {
          const credit = activeCredits[Math.floor(Math.random() * activeCredits.length)];
          const isBuy = Math.random() > 0.5;
          const spread = credit.liquidity.spread;
          const currentPrice = credit.price.current;
          const orderPrice = isBuy ? currentPrice - spread : currentPrice + spread;
          const orderAmount = Math.floor(Math.random() * 10000) + 1000;
          
          const newOrder: Order = {
            id: `order-${Date.now()}-${Math.random()}`,
            type: isBuy ? 'buy' : 'sell',
            creditId: credit.id,
            creditName: credit.name,
            creditSymbol: credit.symbol,
            amount: orderAmount,
            price: orderPrice,
            total: orderAmount * orderPrice,
            currency: 'USD',
            userId: 'market-maker',
            userName: 'MarketMaker',
            status: 'open',
            filled: 0,
            remaining: orderAmount,
            averagePrice: 0,
            timeInForce: 'GTC',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          setOrders(prev => [...prev, newOrder]);
        }
      }

      // Update staking rewards
      setAccounts(prev => prev.map(account => ({
        ...account,
        staking: {
          ...account.staking,
          positions: account.staking.positions.map(position => ({
            ...position,
            rewards: position.rewards + (position.amount * (position.apy / 100) / 365 / 24) // hourly rewards
          })),
          totalRewards: account.staking.positions.reduce((sum, pos) => sum + pos.rewards, 0)
        }
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [config.autoMode, isOperating, config.marketMaking]);

  // Update stats
  useEffect(() => {
    const activeCredits = credits.filter(c => c.status === 'active').length;
    const totalVolume = trades.reduce((sum, trade) => sum + trade.total, 0);
    const totalLiquidity = credits.reduce((sum, credit) => sum + credit.liquidity.totalLiquidity, 0);
    const marketCap = credits.reduce((sum, credit) => sum + credit.price.marketCap, 0);
    
    const creditPerformances = credits.map(credit => ({
      symbol: credit.symbol,
      change24h: credit.price.change24h
    }));
    const bestPerformer = creditPerformances.reduce((best, current) => 
      current.change24h > (best?.change24h || -Infinity) ? current : best, null as any
    );
    const worstPerformer = creditPerformances.reduce((worst, current) => 
      current.change24h < (worst?.change24h || Infinity) ? current : worst, null as any
    );

    setStats({
      totalCredits: credits.length,
      activeCredits,
      totalVolume,
      totalTrades: trades.length,
      totalLiquidity,
      marketCap,
      bestPerformer: bestPerformer?.symbol || '',
      worstPerformer: worstPerformer?.symbol || ''
    });
  }, [credits, trades]);

  const toggleOperation = () => {
    setIsOperating(!isOperating);
  };

  const placeOrder = (creditId: string, type: 'buy' | 'sell', amount: number, price: number) => {
    const credit = credits.find(c => c.id === creditId);
    if (!credit) return;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      type,
      creditId,
      creditName: credit.name,
      creditSymbol: credit.symbol,
      amount,
      price,
      total: amount * price,
      currency: 'USD',
      userId: 'user-1',
      userName: 'CurrentUser',
      status: 'open',
      filled: 0,
      remaining: amount,
      averagePrice: 0,
      timeInForce: 'GTC',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [...prev, newOrder]);
  };

  const getTypeColor = (type: Credit['type']) => {
    switch (type) {
      case 'captcha': return 'bg-blue-600';
      case 'api': return 'bg-green-600';
      case 'service': return 'bg-purple-600';
      case 'utility': return 'bg-orange-600';
      case 'governance': return 'bg-red-600';
      case 'reward': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: Credit['status'] | Order['status']) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-gray-600';
      case 'delisted': return 'bg-red-600';
      case 'suspended': return 'bg-yellow-600';
      case 'open': return 'bg-blue-600';
      case 'partially_filled': return 'bg-purple-600';
      case 'filled': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      case 'expired': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getFilteredCredits = () => {
    return credits.filter(credit => {
      const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           credit.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           credit.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || credit.type === filterType;
      const matchesStatus = filterStatus === 'all' || credit.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Exchange className="w-8 h-8 text-purple-400" />
            Credit Exchange Marketplace
          </h1>
          <p className="text-gray-400">
            Build credit exchange marketplace for trading captcha credits and digital assets
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm text-gray-400">Total Credits</div>
                <div className="text-2xl font-bold">{stats.totalCredits}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm text-gray-400">Active Credits</div>
                <div className="text-2xl font-bold">{stats.activeCredits}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm text-gray-400">24h Volume</div>
                <div className="text-2xl font-bold">${stats.totalVolume.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-sm text-gray-400">Market Cap</div>
                <div className="text-2xl font-bold">${(stats.marketCap / 1000).toFixed(1)}K</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm text-gray-400">Liquidity</div>
                <div className="text-2xl font-bold">${stats.totalLiquidity.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Exchange Operations</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleOperation}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isOperating
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isOperating ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Exchange
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Exchange
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

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              Best: {stats.bestPerformer || 'None'} | 
              Worst: {stats.worstPerformer || 'None'} | 
              Trades: {stats.totalTrades} | 
              Exchange: {isOperating ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Credits</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search credits..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Types</option>
                <option value="captcha">Captcha</option>
                <option value="api">API</option>
                <option value="service">Service</option>
                <option value="utility">Utility</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getFilteredCredits().map((credit) => (
                <div
                  key={credit.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCredit?.id === credit.id ? 'border-purple-500' : 'border-gray-700'
                  }`}
                  onClick={() => setSelectedCredit(credit)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(credit.status)}`}></div>
                      <div>
                        <h4 className="font-semibold">{credit.name}</h4>
                        <div className="text-sm text-gray-400">{credit.provider}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(credit.type)}`}>
                        {credit.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(credit.status)}`}>
                        {credit.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Price:</span> ${credit.price.current.toFixed(4)}
                    </div>
                    <div>
                      <span className="text-gray-400">24h:</span> 
                      <span className={credit.price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {credit.price.change24h >= 0 ? '+' : ''}{credit.price.change24h.toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Volume:</span> ${credit.price.volume24h.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-gray-400">Market Cap:</span> ${(credit.price.marketCap / 1000).toFixed(1)}K
                    </div>
                  </div>

                  <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full ${credit.price.change24h >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(100, Math.abs(credit.price.change24h) * 10)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Supply: {(credit.circulatingSupply / 1000000).toFixed(1)}M | 
                        Liquidity: ${credit.liquidity.totalLiquidity.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          placeOrder(credit.id, 'buy', 1000, credit.price.current);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                      >
                        Buy
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          placeOrder(credit.id, 'sell', 1000, credit.price.current);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {getFilteredCredits().length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No credits found
              </div>
            )}
          </div>

          {/* Selected Credit Details */}
          {selectedCredit && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Credit Details: {selectedCredit.name}</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Credit Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Symbol:</span>
                        <span className="font-medium">{selectedCredit.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="font-medium">{selectedCredit.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Provider:</span>
                        <span className="font-medium">{selectedCredit.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedCredit.status)}`}>
                          {selectedCredit.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Market Data</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Price:</span>
                        <span className="font-medium">${selectedCredit.price.current.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">24h Change:</span>
                        <span className={`font-medium ${selectedCredit.price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedCredit.price.change24h >= 0 ? '+' : ''}{selectedCredit.price.change24h.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">7d Change:</span>
                        <span className={`font-medium ${selectedCredit.price.change7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedCredit.price.change7d >= 0 ? '+' : ''}{selectedCredit.price.change7d.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Market Cap:</span>
                        <span className="font-medium">${(selectedCredit.price.marketCap / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Supply</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Supply:</span>
                        <span className="font-medium">{(selectedCredit.totalSupply / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Circulating:</span>
                        <span className="font-medium">{(selectedCredit.circulatingSupply / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Volume 24h:</span>
                        <span className="font-medium">${selectedCredit.price.volume24h.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Liquidity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Liquidity:</span>
                        <span className="font-medium">${selectedCredit.liquidity.totalLiquidity.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Depth:</span>
                        <span className="font-medium">${selectedCredit.liquidity.depth.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Spread:</span>
                        <span className="font-medium">{(selectedCredit.liquidity.spread * 100).toFixed(3)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Providers:</span>
                        <span className="font-medium">{selectedCredit.liquidity.providers}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{selectedCredit.description}</p>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h4 className="font-medium text-purple-400 mb-2">Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedCredit.features.transferable ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Transferable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedCredit.features.tradable ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Tradable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedCredit.features.stakable ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Stakable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedCredit.features.burnable ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="text-gray-300">Burnable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Orders */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Open Orders</h3>
          <div className="space-y-4">
            {orders.filter(o => o.status === 'open' || o.status === 'partially_filled').map((order) => (
              <div key={order.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{order.creditName} ({order.creditSymbol})</h4>
                    <div className="text-sm text-gray-400">
                      {order.userName} - {order.type.toUpperCase()} - {order.status.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {order.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Amount:</span> {order.amount.toLocaleString()} {order.creditSymbol}
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span> ${order.price.toFixed(4)}
                  </div>
                  <div>
                    <span className="text-gray-400">Total:</span> ${order.total.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-400">Filled:</span> {order.filled.toLocaleString()} / {order.amount.toLocaleString()}
                  </div>
                </div>

                <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(order.filled / order.amount) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Time in Force: {order.timeInForce} | 
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.updatedAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {orders.filter(o => o.status === 'open' || o.status === 'partially_filled').length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No open orders found
            </div>
          )}
        </div>

        {/* Recent Trades */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
          <div className="space-y-4">
            {trades.slice(-10).map((trade) => (
              <div key={trade.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{trade.creditName} ({trade.creditSymbol})</h4>
                    <div className="text-sm text-gray-400">
                      {trade.buyerName} bought from {trade.sellerName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-green-600">
                      {trade.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-400">
                      ${trade.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">Amount:</span> {trade.amount.toLocaleString()} {trade.creditSymbol}
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span> ${trade.price.toFixed(4)}
                  </div>
                  <div>
                    <span className="text-gray-400">Fee:</span> ${trade.feeAmount.toFixed(4)} ({trade.fee}%)
                  </div>
                  <div>
                    <span className="text-gray-400">Net Total:</span> ${(trade.total - trade.feeAmount).toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      Order ID: {trade.orderId}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(trade.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {trades.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No trades found
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Exchange Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Exchange Mode</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoMode}
                        onChange={(e) => setConfig(prev => ({ ...prev, autoMode: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Mode</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.marketMaking}
                        onChange={(e) => setConfig(prev => ({ ...prev, marketMaking: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Market Making</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.arbitrage}
                        onChange={(e) => setConfig(prev => ({ ...prev, arbitrage: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Arbitrage</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.liquidityProvision}
                        onChange={(e) => setConfig(prev => ({ ...prev, liquidityProvision: e.target.checked }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Liquidity Provision</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Trading Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.trading.autoTrading}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          trading: { ...prev.trading, autoTrading: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Auto Trading</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.trading.riskManagement}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          trading: { ...prev.trading, riskManagement: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Risk Management</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.trading.stopLoss}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          trading: { ...prev.trading, stopLoss: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Stop Loss</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.trading.takeProfit}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          trading: { ...prev.trading, takeProfit: e.target.checked }
                        }))}
                        className="w-3 h-3 text-purple-600 rounded"
                      />
                      <span className="text-sm">Take Profit</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Fees</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Maker Fee (%)</label>
                      <input
                        type="number"
                        value={config.fees.makerFee}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          fees: { ...prev.fees, makerFee: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="1"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Taker Fee (%)</label>
                      <input
                        type="number"
                        value={config.fees.takerFee}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          fees: { ...prev.fees, takerFee: parseFloat(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="1"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Limits</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Order Size</label>
                      <input
                        type="number"
                        value={config.limits.maxOrderSize}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, maxOrderSize: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="1000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Daily Volume</label>
                      <input
                        type="number"
                        value={config.limits.maxDailyVolume}
                        onChange={(e) => setConfig(prev => ({ 
                          ...prev, 
                          limits: { ...prev.limits, maxDailyVolume: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        min="0"
                        max="10000000"
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

export default CreditExchangeMarketplace;
