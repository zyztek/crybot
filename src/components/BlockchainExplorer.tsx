import { useState } from 'react';
import {
  Search,
  Blocks,
  Activity,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Hash,
  RefreshCw,
  FileText,
} from 'lucide-react';

interface BlockData {
  number: number;
  hash: string;
  timestamp: number;
  txCount: number;
  miner: string;
  gasUsed: string;
  gasLimit: string;
  size: string;
}

interface TransactionData {
  hash: string;
  block: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: number;
}

const BLOCKS: BlockData[] = [
  {
    number: 19234567,
    hash: '0x8f7a2b1c3d4e5f6...9a0b1c2d3e4f5a6b',
    timestamp: Date.now() - 12000,
    txCount: 156,
    miner: '0x7a8b...3c4d',
    gasUsed: '15.2M',
    gasLimit: '30M',
    size: '95KB',
  },
  {
    number: 19234566,
    hash: '0x3d2e5f1a4b6c7d8...0f1e2a3b4c5d6e7f',
    timestamp: Date.now() - 24000,
    txCount: 142,
    miner: '0x9c1d...2e3f',
    gasUsed: '14.8M',
    gasLimit: '30M',
    size: '87KB',
  },
  {
    number: 19234565,
    hash: '0x6a7c8d9e0f1a2b3...4c5d6e7f8a9b0c1',
    timestamp: Date.now() - 36000,
    txCount: 189,
    miner: '0x4b5c...6d7e',
    gasUsed: '18.5M',
    gasLimit: '30M',
    size: '102KB',
  },
  {
    number: 19234564,
    hash: '0x1e2f3a4b5c6d7e8...9f0a1b2c3d4e5f6',
    timestamp: Date.now() - 48000,
    txCount: 168,
    miner: '0x8d9e...0f1a',
    gasUsed: '16.3M',
    gasLimit: '30M',
    size: '91KB',
  },
];

const TRANSACTIONS: TransactionData[] = [
  {
    hash: '0x7a8b9c0d1e2f3a4...5b6c7d8e9f0a1b2',
    block: 19234567,
    from: '0x1a2b...3c4d',
    to: '0x5e6f...7a8b',
    value: '2.45 ETH',
    gasPrice: '25 gwei',
    status: 'success',
    timestamp: Date.now() - 5000,
  },
  {
    hash: '0x9c0d1e2f3a4b5c6...7d8e9f0a1b2c3d4',
    block: 19234567,
    from: '0x2c3d...4e5f',
    to: '0x6a7b...8c9d',
    value: '0.87 ETH',
    gasPrice: '22 gwei',
    status: 'success',
    timestamp: Date.now() - 8000,
  },
  {
    hash: '0x3a4b5c6d7e8f9a0...1b2c3d4e5f6a7b8',
    block: 19234567,
    from: '0x3d4e...5f6a',
    to: '0x7b8c...9d0e',
    value: '15.2 ETH',
    gasPrice: '28 gwei',
    status: 'pending',
    timestamp: Date.now() - 10000,
  },
];

export default function BlockchainExplorer() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'blocks' | 'txs'>('blocks');
  const [refreshing, setRefreshing] = useState(false);

  const texts = {
    es: {
      title: 'Explorador Blockchain',
      subtitle: 'Explora bloques y transacciones en tiempo real',
      searchTx: 'Buscar transacción, bloque, dirección',
      blocks: 'Bloques',
      transactions: 'Transacciones',
      blockNumber: '# Bloque',
      blockHash: 'Hash del bloque',
      timestamp: 'Timestamp',
      txCount: 'Tx Count',
      miner: 'Miner',
      gasUsed: 'Gas Usado',
      size: 'Tamaño',
      txHash: 'Hash Tx',
      from: 'De',
      to: 'Para',
      value: 'Valor',
      gasPrice: 'Precio Gas',
      status: 'Estado',
      success: 'Exitoso',
      pending: 'Pendiente',
      failed: 'Fallido',
      networkStats: 'Estadísticas de la red',
      latestBlock: 'Último bloque',
      avgGas: 'Gas Promedio',
      tps: 'TPS',
      difficulty: 'Dificultad',
      refresh: 'Actualizar',
      viewBlock: 'Ver bloque',
      viewTx: 'Ver tx',
    },
    en: {
      title: 'Blockchain Explorer',
      subtitle: 'Explore blocks and transactions in real-time',
      searchTx: 'Search transaction, block, address',
      blocks: 'Blocks',
      transactions: 'Transactions',
      blockNumber: 'Block #',
      blockHash: 'Block Hash',
      timestamp: 'Timestamp',
      txCount: 'Tx Count',
      miner: 'Miner',
      gasUsed: 'Gas Used',
      size: 'Size',
      txHash: 'Tx Hash',
      from: 'From',
      to: 'To',
      value: 'Value',
      gasPrice: 'Gas Price',
      status: 'Status',
      success: 'Success',
      pending: 'Pending',
      failed: 'Failed',
      networkStats: 'Network Stats',
      latestBlock: 'Latest Block',
      avgGas: 'Avg Gas',
      tps: 'TPS',
      difficulty: 'Difficulty',
      refresh: 'Refresh',
      viewBlock: 'View block',
      viewTx: 'View tx',
    },
  };

  const t = texts[language];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  const formatTimestamp = (timestamp: number) => {
    // eslint-disable-next-line react-hooks/purity
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl">
              <Blocks className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language & Refresh */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {t.refresh}
          </button>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Search */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.searchTx}
                className="w-full bg-slate-700/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-xl hover:scale-[1.02] transition transform"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <Blocks className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.latestBlock}</p>
                <p className="text-xl font-bold text-white">#{BLOCKS[0].number.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-5 border border-green-500/30">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.txCount}</p>
                <p className="text-xl font-bold text-white">{BLOCKS[0].txCount} / 12s</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-5 border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.avgGas}</p>
                <p className="text-xl font-bold text-white">25 gwei</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-2xl p-5 border border-pink-500/30">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-pink-400" />
              <div>
                <p className="text-gray-400 text-sm">{t.tps}</p>
                <p className="text-xl font-bold text-white">15.2</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('blocks')}
              className={`px-6 py-2 rounded-lg transition ${
                viewMode === 'blocks'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  : 'text-gray-400'
              }`}
            >
              {t.blocks}
            </button>
            <button
              onClick={() => setViewMode('txs')}
              className={`px-6 py-2 rounded-lg transition ${
                viewMode === 'txs'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  : 'text-gray-400'
              }`}
            >
              {t.transactions}
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'blocks' ? (
          <div className="space-y-4">
            {BLOCKS.map((block, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {block.number.toString().slice(-2)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">
                        {t.blockNumber} {block.number.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Hash className="w-4 h-4" />
                        <span className="font-mono">{block.hash}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimestamp(block.timestamp)}</span>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.txCount}</p>
                    <p className="text-white font-bold">{block.txCount}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.gasUsed}</p>
                    <p className="text-white font-bold">{block.gasUsed}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{t.miner}</p>
                    <p className="text-white font-bold font-mono text-sm">{block.miner}</p>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
                    <ExternalLink className="w-4 h-4" />
                    {t.viewBlock}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="text-left py-4 px-4">{t.txHash}</th>
                  <th className="text-left py-4 px-4">{t.blockNumber}</th>
                  <th className="text-left py-4 px-4">{t.from}</th>
                  <th className="text-left py-4 px-4">→</th>
                  <th className="text-left py-4 px-4">{t.to}</th>
                  <th className="text-right py-4 px-4">{t.value}</th>
                  <th className="text-right py-4 px-4">{t.gasPrice}</th>
                  <th className="text-center py-4 px-4">{t.status}</th>
                  <th className="text-center py-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-white font-mono text-sm">
                        <Hash className="w-4 h-4 text-gray-400" />
                        {tx.hash}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white font-bold">#{tx.block}</td>
                    <td className="py-4 px-4">
                      <span className="text-white font-mono text-sm">{tx.from}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <ArrowUpRight className="w-4 h-4 text-blue-400 mx-auto" />
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white font-mono text-sm">{tx.to}</span>
                    </td>
                    <td className="text-right py-4 px-4 text-white font-bold">{tx.value}</td>
                    <td className="text-right py-4 px-4 text-gray-400">{tx.gasPrice}</td>
                    <td className="text-center py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'success'
                            ? 'bg-green-500/20 text-green-400'
                            : tx.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {t[tx.status]}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
