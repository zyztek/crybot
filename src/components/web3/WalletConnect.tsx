import React, { useState, useEffect } from 'react';
import { Wallet, Link, QrCode, Shield, AlertCircle, CheckCircle, Copy, ExternalLink, Smartphone, Monitor } from 'lucide-react';

interface WalletConnection {
  id: string;
  name: string;
  type: 'browser' | 'mobile' | 'hardware';
  connected: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
  icon: string;
  supportedChains: string[];
  lastConnected?: string;
}

interface DApp {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: 'defi' | 'gaming' | 'nft' | 'exchange' | 'tools';
  connected: boolean;
  lastUsed?: string;
}

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  dapp?: string;
}

export const WalletConnect: React.FC = () => {
  const [wallets, setWallets] = useState<WalletConnection[]>([]);
  const [dapps, setDapps] = useState<DApp[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wallets' | 'dapps' | 'transactions'>('wallets');

  useEffect(() => {
    const fetchWalletConnectData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockWallets: WalletConnection[] = [
          {
            id: 'metamask',
            name: 'MetaMask',
            type: 'browser',
            connected: true,
            address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
            chainId: 1,
            balance: '2.456 ETH',
            icon: '🦊',
            supportedChains: ['Ethereum', 'Polygon', 'BSC', 'Arbitrum'],
            lastConnected: '2024-01-15T10:30:00Z'
          },
          {
            id: 'walletconnect',
            name: 'WalletConnect',
            type: 'mobile',
            connected: false,
            icon: '🔗',
            supportedChains: ['Ethereum', 'Polygon', 'BSC', 'Avalanche', 'Arbitrum']
          },
          {
            id: 'ledger',
            name: 'Ledger',
            type: 'hardware',
            connected: false,
            icon: '🔐',
            supportedChains: ['Ethereum', 'Polygon', 'BSC', 'Arbitrum']
          },
          {
            id: 'coinbase',
            name: 'Coinbase Wallet',
            type: 'browser',
            connected: false,
            icon: '🔵',
            supportedChains: ['Ethereum', 'Polygon', 'BSC']
          },
          {
            id: 'trustwallet',
            name: 'Trust Wallet',
            type: 'mobile',
            connected: false,
            icon: '📱',
            supportedChains: ['Ethereum', 'Polygon', 'BSC', 'Avalanche']
          }
        ];

        const mockDApps: DApp[] = [
          {
            id: 'uniswap',
            name: 'Uniswap',
            url: 'https://app.uniswap.org',
            icon: '🦄',
            category: 'defi',
            connected: true,
            lastUsed: '2024-01-15T09:20:00Z'
          },
          {
            id: 'opensea',
            name: 'OpenSea',
            url: 'https://opensea.io',
            icon: '🛍️',
            category: 'nft',
            connected: false
          },
          {
            id: 'axieinfinity',
            name: 'Axie Infinity',
            url: 'https://axieinfinity.com',
            icon: '🎮',
            category: 'gaming',
            connected: false
          },
          {
            id: 'aave',
            name: 'Aave',
            url: 'https://app.aave.com',
            icon: '👻',
            category: 'defi',
            connected: true,
            lastUsed: '2024-01-14T15:45:00Z'
          },
          {
            id: 'compound',
            name: 'Compound',
            url: 'https://app.compound.finance',
            icon: '⚗️',
            category: 'defi',
            connected: false
          }
        ];

        const mockTransactions: Transaction[] = [
          {
            id: 'tx-1',
            hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
            to: '0x1234567890123456789012345678901234567890',
            value: '0.5 ETH',
            gas: '0.0021 ETH',
            status: 'confirmed',
            timestamp: '2024-01-15T10:30:00Z',
            dapp: 'Uniswap'
          },
          {
            id: 'tx-2',
            hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
            to: '0x2345678901234567890123456789012345678901',
            value: '100 USDC',
            gas: '0.0015 ETH',
            status: 'pending',
            timestamp: '2024-01-15T11:45:00Z',
            dapp: 'Aave'
          },
          {
            id: 'tx-3',
            hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
            from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
            to: '0x3456789012345678901234567890123456789012',
            value: '0.1 ETH',
            gas: '0.0018 ETH',
            status: 'failed',
            timestamp: '2024-01-15T09:15:00Z'
          }
        ];

        setWallets(mockWallets);
        setDapps(mockDApps);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching WalletConnect data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletConnectData();
  }, []);

  const handleConnectWallet = async (walletId: string) => {
    setConnectingWallet(walletId);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (walletId === 'walletconnect') {
        setShowQRCode(walletId);
      } else {
        setWallets(prev => prev.map(wallet => 
          wallet.id === walletId 
            ? { 
                ...wallet, 
                connected: true,
                address: '0x' + Math.random().toString(16).substr(2, 40),
                balance: (Math.random() * 10).toFixed(3) + ' ETH',
                chainId: 1,
                lastConnected: new Date().toISOString()
              }
            : wallet
        ));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setConnectingWallet(null);
    }
  };

  const handleDisconnectWallet = async (walletId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWallets(prev => prev.map(wallet => 
        wallet.id === walletId 
          ? { 
              ...wallet, 
              connected: false,
              address: undefined,
              balance: undefined,
              chainId: undefined
            }
          : wallet
      ));
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleConnectDApp = async (dappId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDapps(prev => prev.map(dapp => 
        dapp.id === dappId 
          ? { ...dapp, connected: true, lastUsed: new Date().toISOString() }
          : dapp
      ));
    } catch (error) {
      console.error('Error connecting DApp:', error);
    }
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWalletIcon = (type: WalletConnection['type']) => {
    switch (type) {
      case 'browser': return <Monitor className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'hardware': return <Shield className="w-5 h-5" />;
      default: return <Wallet className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">WalletConnect</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {wallets.filter(w => w.connected).length} connected wallets
          </div>
          <div className="text-sm text-gray-600">
            {dapps.filter(d => d.connected).length} connected DApps
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connected Wallets</p>
              <p className="text-2xl font-bold">{wallets.filter(w => w.connected).length}</p>
            </div>
            <Wallet className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold">
                {wallets
                  .filter(w => w.connected && w.balance)
                  .reduce((sum, wallet) => {
                    const ethAmount = parseFloat(wallet.balance?.split(' ')[0] || '0');
                    return sum + ethAmount;
                  }, 0)
                  .toFixed(3)} ETH
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
            <Link className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active DApps</p>
              <p className="text-2xl font-bold">{dapps.filter(d => d.connected).length}</p>
            </div>
            <ExternalLink className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['wallets', 'dapps', 'transactions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Wallets Tab */}
        {activeTab === 'wallets' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wallets.map(wallet => (
                <div key={wallet.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div>
                        <h4 className="font-semibold">{wallet.name}</h4>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          {getWalletIcon(wallet.type)}
                          <span className="capitalize">{wallet.type}</span>
                        </div>
                      </div>
                    </div>
                    {wallet.connected && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  {wallet.connected && wallet.address ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Address</p>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </code>
                          <button
                            onClick={() => handleCopyAddress(wallet.address!)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-600">Balance</p>
                          <p className="font-medium">{wallet.balance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Chain</p>
                          <p className="font-medium">Ethereum</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDisconnectWallet(wallet.id)}
                        className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Supported Chains</p>
                        <div className="flex flex-wrap gap-1">
                          {wallet.supportedChains.map(chain => (
                            <span key={chain} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {chain}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleConnectWallet(wallet.id)}
                        disabled={connectingWallet === wallet.id}
                        className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50"
                      >
                        {connectingWallet === wallet.id ? 'Connecting...' : 'Connect'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DApps Tab */}
        {activeTab === 'dapps' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dapps.map(dapp => (
                <div key={dapp.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{dapp.icon}</span>
                      <div>
                        <h4 className="font-semibold">{dapp.name}</h4>
                        <span className="text-xs text-gray-600 capitalize">{dapp.category}</span>
                      </div>
                    </div>
                    {dapp.connected && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">URL</p>
                      <a 
                        href={dapp.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <span className="truncate">{dapp.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    {dapp.lastUsed && (
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Last Used</p>
                        <p className="text-xs">{new Date(dapp.lastUsed).toLocaleDateString()}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleConnectDApp(dapp.id)}
                      disabled={dapp.connected}
                      className={`w-full px-3 py-2 rounded-lg transition-colors text-sm ${
                        dapp.connected
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {dapp.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="p-6">
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                        {transaction.dapp && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {transaction.dapp}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">From</p>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {transaction.from.slice(0, 6)}...{transaction.from.slice(-4)}
                          </code>
                        </div>
                        <div>
                          <p className="text-gray-600">To</p>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {transaction.to.slice(0, 6)}...{transaction.to.slice(-4)}
                          </code>
                        </div>
                        <div>
                          <p className="text-gray-600">Value</p>
                          <p className="font-medium">{transaction.value}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-600">
                        <span>Gas: {transaction.gas}</span>
                        <span>Hash: {transaction.hash.slice(0, 10)}...</span>
                        <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank')}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">Connect with WalletConnect</h3>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code with your mobile wallet
              </p>
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                Make sure your wallet supports WalletConnect v2
              </p>
            </div>
            <button
              onClick={() => setShowQRCode(null)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
