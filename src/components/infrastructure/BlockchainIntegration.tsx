import React, { useState, useEffect } from 'react';
import { Link, Shield, Zap, Database, Activity, Globe, CheckCircle, AlertTriangle, Clock, Network, Wallet, Hash } from 'lucide-react';

interface BlockchainNetwork {
  id: string;
  name: string;
  type: 'mainnet' | 'testnet' | 'l2';
  status: 'active' | 'inactive' | 'maintenance';
  version: string;
  blockHeight: number;
  tps: number;
  gasPrice: string;
  nodes: number;
  latency: number;
  lastBlock: string;
  supportedCoins: string[];
}

interface SmartContract {
  id: string;
  name: string;
  address: string;
  network: string;
  status: 'deployed' | 'pending' | 'error';
  version: string;
  transactions: number;
  gasUsed: string;
  lastInteraction: string;
  abi: string;
  functions: string[];
}

interface DAppConnection {
  id: string;
  name: string;
  type: 'defi' | 'nft' | 'gaming' | 'dao';
  network: string;
  status: 'connected' | 'disconnected' | 'error';
  protocol: string;
  interactions: number;
  volume: string;
  lastUsed: string;
}

interface NodeOperation {
  id: string;
  name: string;
  type: 'validator' | 'rpc' | 'archive';
  network: string;
  status: 'running' | 'stopped' | 'syncing';
  version: string;
  peers: number;
  syncProgress: number;
  cpu: number;
  memory: number;
  storage: string;
  uptime: string;
}

export const BlockchainIntegration: React.FC = () => {
  const [networks, setNetworks] = useState<BlockchainNetwork[]>([]);
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [dapps, setDapps] = useState<DAppConnection[]>([]);
  const [nodes, setNodes] = useState<NodeOperation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'networks' | 'contracts' | 'dapps' | 'nodes'>('networks');

  useEffect(() => {
    const fetchBlockchainData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockNetworks: BlockchainNetwork[] = [
          {
            id: 'ethereum',
            name: 'Ethereum Mainnet',
            type: 'mainnet',
            status: 'active',
            version: 'Paris',
            blockHeight: 18456789,
            tps: 15.2,
            gasPrice: '45 Gwei',
            nodes: 12500,
            latency: 125,
            lastBlock: '2024-01-15T10:30:00Z',
            supportedCoins: ['ETH', 'WBTC', 'USDC', 'USDT', 'DAI']
          },
          {
            id: 'polygon',
            name: 'Polygon',
            type: 'l2',
            status: 'active',
            version: '0.3.1',
            blockHeight: 45678901,
            tps: 185.5,
            gasPrice: '30 Gwei',
            nodes: 3500,
            latency: 45,
            lastBlock: '2024-01-15T10:30:00Z',
            supportedCoins: ['MATIC', 'WMATIC', 'USDC', 'USDT', 'DAI']
          },
          {
            id: 'arbitrum',
            name: 'Arbitrum One',
            type: 'l2',
            status: 'active',
            version: 'Nitro',
            blockHeight: 12345678,
            tps: 245.8,
            gasPrice: '0.1 Gwei',
            nodes: 1200,
            latency: 35,
            lastBlock: '2024-01-15T10:30:00Z',
            supportedCoins: ['ETH', 'ARB', 'USDC', 'USDT']
          },
          {
            id: 'optimism',
            name: 'Optimism',
            type: 'l2',
            status: 'active',
            version: 'Bedrock',
            blockHeight: 98765432,
            tps: 195.3,
            gasPrice: '0.05 Gwei',
            nodes: 980,
            latency: 28,
            lastBlock: '2024-01-15T10:30:00Z',
            supportedCoins: ['ETH', 'OP', 'USDC', 'USDT']
          },
          {
            id: 'bsc',
            name: 'BSC Mainnet',
            type: 'mainnet',
            status: 'maintenance',
            version: '0.1.0',
            blockHeight: 34567890,
            tps: 0,
            gasPrice: '5 Gwei',
            nodes: 450,
            latency: 0,
            lastBlock: '2024-01-15T08:00:00Z',
            supportedCoins: ['BNB', 'BUSD', 'USDC', 'USDT', 'DAI']
          },
          {
            id: 'avalanche',
            name: 'Avalanche C-Chain',
            type: 'mainnet',
            status: 'active',
            version: '1.10.12',
            blockHeight: 37890123,
            tps: 125.7,
            gasPrice: '25 nAVAX',
            nodes: 2100,
            latency: 52,
            lastBlock: '2024-01-15T10:30:00Z',
            supportedCoins: ['AVAX', 'USDC', 'USDT', 'DAI']
          }
        ];

        const mockContracts: SmartContract[] = [
          {
            id: 'contract-1',
            name: 'Crybot Treasury',
            address: '0x1234567890123456789012345678901234567890',
            network: 'ethereum',
            status: 'deployed',
            version: '1.2.0',
            transactions: 12500,
            gasUsed: '45.5M',
            lastInteraction: '2024-01-15T10:28:00Z',
            abi: 'ERC20, Treasury',
            functions: ['deposit', 'withdraw', 'balanceOf', 'transfer']
          },
          {
            id: 'contract-2',
            name: 'Trading Router',
            address: '0x2345678901234567890123456789012345678901',
            network: 'polygon',
            status: 'deployed',
            version: '2.1.3',
            transactions: 45800,
            gasUsed: '125.8M',
            lastInteraction: '2024-01-15T10:29:00Z',
            abi: 'Router, Liquidity',
            functions: ['swap', 'addLiquidity', 'removeLiquidity', 'getAmountsOut']
          },
          {
            id: 'contract-3',
            name: 'Staking Pool',
            address: '0x3456789012345678901234567890123456789012',
            network: 'arbitrum',
            status: 'deployed',
            version: '1.5.2',
            transactions: 23400,
            gasUsed: '78.2M',
            lastInteraction: '2024-01-15T10:27:00Z',
            abi: 'Staking, Rewards',
            functions: ['stake', 'unstake', 'claimRewards', 'getRewards']
          },
          {
            id: 'contract-4',
            name: 'Governance Contract',
            address: '0x4567890123456789012345678901234567890123',
            network: 'ethereum',
            status: 'pending',
            version: '3.0.0',
            transactions: 0,
            gasUsed: '0',
            lastInteraction: '2024-01-15T09:00:00Z',
            abi: 'Governance, Voting',
            functions: ['propose', 'vote', 'execute', 'delegate']
          }
        ];

        const mockDApps: DAppConnection[] = [
          {
            id: 'dapp-1',
            name: 'Uniswap V3',
            type: 'defi',
            network: 'ethereum',
            status: 'connected',
            protocol: '0.8.3',
            interactions: 125000,
            volume: '$45.2M',
            lastUsed: '2024-01-15T10:25:00Z'
          },
          {
            id: 'dapp-2',
            name: 'Aave V3',
            type: 'defi',
            network: 'polygon',
            status: 'connected',
            protocol: '3.0.0',
            interactions: 89000,
            volume: '$28.7M',
            lastUsed: '2024-01-15T10:22:00Z'
          },
          {
            id: 'dapp-3',
            name: 'OpenSea',
            type: 'nft',
            network: 'ethereum',
            status: 'connected',
            protocol: '2.0.0',
            interactions: 45000,
            volume: '$12.3M',
            lastUsed: '2024-01-15T10:20:00Z'
          },
          {
            id: 'dapp-4',
            name: 'Curve Finance',
            type: 'defi',
            network: 'optimism',
            status: 'error',
            protocol: '1.2.1',
            interactions: 0,
            volume: '$0',
            lastUsed: '2024-01-15T08:45:00Z'
          }
        ];

        const mockNodes: NodeOperation[] = [
          {
            id: 'node-1',
            name: 'Ethereum RPC Node',
            type: 'rpc',
            network: 'ethereum',
            status: 'running',
            version: '1.12.0',
            peers: 125,
            syncProgress: 100,
            cpu: 45,
            memory: 65,
            storage: '2.5 TB',
            uptime: '45d 12h 30m'
          },
          {
            id: 'node-2',
            name: 'Polygon Validator',
            type: 'validator',
            network: 'polygon',
            status: 'running',
            version: '0.3.1',
            peers: 85,
            syncProgress: 100,
            cpu: 78,
            memory: 82,
            storage: '1.8 TB',
            uptime: '30d 8h 15m'
          },
          {
            id: 'node-3',
            name: 'Arbitrum Archive Node',
            type: 'archive',
            network: 'arbitrum',
            status: 'syncing',
            version: 'nitro-v1.0.0',
            peers: 45,
            syncProgress: 78,
            cpu: 92,
            memory: 95,
            storage: '8.5 TB',
            uptime: '5d 15h 45m'
          },
          {
            id: 'node-4',
            name: 'Optimism RPC Node',
            type: 'rpc',
            network: 'optimism',
            status: 'running',
            version: 'bedrock-v1.0.0',
            peers: 68,
            syncProgress: 100,
            cpu: 35,
            memory: 48,
            storage: '1.2 TB',
            uptime: '22d 16h 20m'
          }
        ];

        setNetworks(mockNetworks);
        setContracts(mockContracts);
        setDapps(mockDApps);
        setNodes(mockNodes);
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlockchainData();
  }, []);

  const getStatusColor = (status: BlockchainNetwork['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: BlockchainNetwork['type']) => {
    switch (type) {
      case 'mainnet': return 'bg-blue-100 text-blue-800';
      case 'testnet': return 'bg-purple-100 text-purple-800';
      case 'l2': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractStatusColor = (status: SmartContract['status']) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDAppTypeColor = (type: DAppConnection['type']) => {
    switch (type) {
      case 'defi': return 'bg-blue-100 text-blue-800';
      case 'nft': return 'bg-purple-100 text-purple-800';
      case 'gaming': return 'bg-green-100 text-green-800';
      case 'dao': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNodeStatusColor = (status: NodeOperation['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <Link className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Blockchain Integration</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {networks.filter(n => n.status === 'active').length} networks active
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Zap className="w-4 h-4" />
            <span>Deploy Contract</span>
          </button>
        </div>
      </div>

      {/* Blockchain Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Multi-Chain Infrastructure</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-90">Active Networks</p>
                <p className="font-medium">{networks.filter(n => n.status === 'active').length}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Total TPS</p>
                <p className="font-medium">
                  {networks.reduce((sum, n) => sum + n.tps, 0).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Contracts Deployed</p>
                <p className="font-medium">{contracts.filter(c => c.status === 'deployed').length}</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Connected dApps</p>
                <p className="font-medium">{dapps.filter(d => d.status === 'connected').length}</p>
              </div>
            </div>
          </div>
          <Network className="w-16 h-16 opacity-50" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Blockchain Networks</p>
              <p className="text-2xl font-bold">{networks.length}</p>
            </div>
            <Globe className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Smart Contracts</p>
              <p className="text-2xl font-bold">{contracts.length}</p>
            </div>
            <Hash className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">dApp Integrations</p>
              <p className="text-2xl font-bold">{dapps.length}</p>
            </div>
            <Zap className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Running Nodes</p>
              <p className="text-2xl font-bold">{nodes.filter(n => n.status === 'running').length}</p>
            </div>
            <Database className="w-8 h-8 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border">
        <div className="flex border-b">
          {(['networks', 'contracts', 'dapps', 'nodes'] as const).map(tab => (
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
              {tab === 'networks' && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {networks.filter(n => n.status === 'maintenance').length}
                </span>
              )}
              {tab === 'contracts' && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {contracts.filter(c => c.status === 'pending').length}
                </span>
              )}
              {tab === 'dapps' && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {dapps.filter(d => d.status === 'error').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Networks Tab */}
        {activeTab === 'networks' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {networks.map(network => (
                <div key={network.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        network.status === 'active' ? 'bg-blue-100 text-blue-600' : 
                        network.status === 'maintenance' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{network.name}</h4>
                        <p className="text-sm text-gray-600">Version {network.version}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(network.type)}`}>
                        {network.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(network.status)}`}>
                        {network.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Supported Coins:</p>
                    <div className="flex flex-wrap gap-1">
                      {network.supportedCoins.map(coin => (
                        <span key={coin} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {coin}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Block Height</p>
                      <p className="text-sm font-medium">{network.blockHeight.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">TPS</p>
                      <p className="text-sm font-medium">{network.tps.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Gas Price</p>
                      <p className="text-sm font-medium">{network.gasPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Nodes</p>
                      <p className="text-sm font-medium">{network.nodes.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Latency: {network.latency}ms</span>
                    <span>Last block: {new Date(network.lastBlock).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {contracts.map(contract => (
                <div key={contract.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        contract.status === 'deployed' ? 'bg-purple-100 text-purple-600' : 
                        contract.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-red-100 text-red-600'
                      }`}>
                        <Hash className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{contract.name}</h4>
                        <p className="text-sm text-gray-600 font-mono">{contract.address.slice(0, 10)}...{contract.address.slice(-8)}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getContractStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs text-gray-600">Network: {contract.network}</span>
                    <span className="text-xs text-gray-600">Version: {contract.version}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Transactions</p>
                      <p className="text-sm font-medium">{contract.transactions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Gas Used</p>
                      <p className="text-sm font-medium">{contract.gasUsed}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Functions:</p>
                    <div className="flex flex-wrap gap-1">
                      {contract.functions.map(func => (
                        <span key={func} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {func}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>ABI: {contract.abi}</span>
                    <span>Last interaction: {new Date(contract.lastInteraction).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* dApps Tab */}
        {activeTab === 'dapps' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dapps.map(dapp => (
                <div key={dapp.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        dapp.status === 'connected' ? 'bg-green-100 text-green-600' : 
                        dapp.status === 'error' ? 'bg-red-100 text-red-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{dapp.name}</h4>
                        <p className="text-sm text-gray-600">{dapp.protocol}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getDAppTypeColor(dapp.type)}`}>
                        {dapp.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        dapp.status === 'connected' ? 'bg-green-100 text-green-800' : 
                        dapp.status === 'error' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {dapp.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Interactions</p>
                      <p className="text-sm font-medium">{dapp.interactions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Volume</p>
                      <p className="text-sm font-medium">{dapp.volume}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Network: {dapp.network}</span>
                    <span>Last used: {new Date(dapp.lastUsed).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nodes Tab */}
        {activeTab === 'nodes' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {nodes.map(node => (
                <div key={node.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        node.status === 'running' ? 'bg-green-100 text-green-600' : 
                        node.status === 'syncing' ? 'bg-blue-100 text-blue-600' : 
                        'bg-gray-100 text-gray-400'
                      }`}>
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{node.name}</h4>
                        <p className="text-sm text-gray-600">{node.network} - {node.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getNodeStatusColor(node.status)}`}>
                      {node.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Peers</p>
                      <p className="text-sm font-medium">{node.peers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Sync Progress</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${node.syncProgress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${node.syncProgress}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.syncProgress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">CPU</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.cpu)}`}
                            style={{ width: `${node.cpu}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Memory</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getResourceColor(node.memory)}`}
                            style={{ width: `${node.memory}%` }}
                          />
                        </div>
                        <span className="text-xs">{node.memory}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Storage: {node.storage}</span>
                    <span>Uptime: {node.uptime}</span>
                    <span>Version: {node.version}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Blockchain Metrics */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Blockchain Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Network Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg TPS</span>
                  <span className="font-medium">
                    {(networks.reduce((sum, n) => sum + n.tps, 0) / networks.length).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Latency</span>
                  <span className="font-medium">
                    {Math.round(networks.reduce((sum, n) => sum + n.latency, 0) / networks.length)}ms
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Contract Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Transactions</span>
                  <span className="font-medium">
                    {contracts.reduce((sum, c) => sum + c.transactions, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Gas Used</span>
                  <span className="font-medium">
                    {contracts.reduce((sum, c) => sum + parseFloat(c.gasUsed), 0).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">dApp Usage</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Interactions</span>
                  <span className="font-medium">
                    {dapps.reduce((sum, d) => sum + d.interactions, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Volume</span>
                  <span className="font-medium">$86.2M</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Node Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Running Nodes</span>
                  <span className="font-medium">{nodes.filter(n => n.status === 'running').length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg CPU Usage</span>
                  <span className="font-medium">
                    {Math.round(nodes.reduce((sum, n) => sum + n.cpu, 0) / nodes.length)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
