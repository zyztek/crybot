import { useState } from 'react';
import { ArrowRight, Zap, ShieldCheck, Wallet, CheckCircle, RefreshCw, Clock, AlertTriangle } from 'lucide-react';

interface BridgeRoute {
  fromChain: string;
  toChain: string;
  symbol: string;
  fee: string;
  estimatedTime: string;
  liquidity: string;
  available: boolean;
}

interface SwapHistory {
  id: string;
  fromChain: string;
  toChain: string;
  amount: string;
  symbol: string;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  timestamp: number;
}

const CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: 'ETH', color: '#627EEA' },
  { id: 'bsc', name: 'BNB Chain', icon: 'BNB', color: '#F0B90B' },
  { id: 'polygon', name: 'Polygon', icon: 'POL', color: '#8247E5' },
  { id: 'arbitrum', name: 'Arbitrum', icon: 'ARB', color: '#28A0F0' },
  { id: 'optimism', name: 'Optimism', icon: 'OP', color: '#FF0420' },
  { id: 'avalanche', name: 'Avalanche', icon: 'AVAX', color: '#E84142' },
  { id: 'solana', name: 'Solana', icon: 'SOL', color: '#9945FF' },
  { id: 'base', name: 'Base', icon: 'BASE', color: '#0052FF' },
];

const TOKENS = [
  { symbol: 'USDC', name: 'USD Coin', icon: '🪙', balance: 1500.50 },
  { symbol: 'USDT', name: 'Tether', icon: '💲', balance: 2300.75 },
  { symbol: 'ETH', name: 'Ethereum', icon: '💎', balance: 2.5 },
  { symbol: 'USDB', name: 'Bridge USD', icon: '💵', balance: 890.25 },
];

const BRIDGE_ROUTES: BridgeRoute[] = [
  { fromChain: 'Ethereum', toChain: 'Arbitrum', symbol: 'USDC', fee: '$0.50', estimatedTime: '10-15 min', liquidity: '$250M', available: true },
  { fromChain: 'Ethereum', toChain: 'Optimism', symbol: 'USDC', fee: '$0.45', estimatedTime: '8-12 min', liquidity: '$180M', available: true },
  { fromChain: 'BNB Chain', toChain: 'Ethereum', symbol: 'USDT', fee: '$0.30', estimatedTime: '15-20 min', liquidity: '$120M', available: true },
  { fromChain: 'Polygon', toChain: 'Ethereum', symbol: 'USDC', fee: '$0.15', estimatedTime: '5-10 min', liquidity: '$95M', available: true },
  { fromChain: 'Arbitrum', toChain: 'Optimism', symbol: 'USDC', fee: '$0.20', estimatedTime: '3-5 min', liquidity: '$45M', available: true },
  { fromChain: 'Ethereum', toChain: 'Base', symbol: 'USDC', fee: '$0.35', estimatedTime: '8-12 min', liquidity: '$85M', available: true },
];

const SWAP_HISTORY: SwapHistory[] = [
  { id: '1', fromChain: 'Ethereum', toChain: 'Arbitrum', amount: '500', symbol: 'USDC', status: 'completed', txHash: '0x8f7...a3c2', timestamp: Date.now() - 3600000 },
  { id: '2', fromChain: 'BNB Chain', toChain: 'Ethereum', amount: '1000', symbol: 'USDT', status: 'completed', txHash: '0x3d2...b7e1', timestamp: Date.now() - 86400000 },
  { id: '3', fromChain: 'Polygon', toChain: 'Ethereum', amount: '250', symbol: 'USDC', status: 'pending', txHash: '0x9c1...f4d5', timestamp: Date.now() - 1800000 },
];

export default function CrossChainBridge() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('arbitrum');
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [isBridging, setIsBridging] = useState(false);

  const texts = {
    es: {
      title: 'Bridge Multi-Cadena',
      subtitle: 'Transfiere activos entre blockchains de forma segura',
      from: 'Desde',
      to: 'Hasta',
      selectToken: 'Seleccionar token',
      enterAmount: 'Ingresar cantidad',
      bridgeFee: 'Fee de bridge',
      estimatedTime: 'Tiempo estimado',
      bridge: 'Enviar Bridge',
      routes: 'Rutas disponibles',
      recentTransactions: 'Transacciones recientes',
      status: 'Estado',
      completed: 'Completado',
      pending: 'Pendiente',
      failed: 'Fallido',
      balance: 'Balance',
      available: 'Disponible',
      swapChains: 'Intercambiar cadenas',
      yourBalance: 'Tu balance',
      receiving: 'Recibirás',
      warning: 'El proceso puede tomar hasta 30 minutos',
      success: 'Bridge iniciado con éxito',
      liquidity: 'Liquidez',
    },
    en: {
      title: 'Cross-Chain Bridge',
      subtitle: 'Transfer assets across blockchains securely',
      from: 'From',
      to: 'To',
      selectToken: 'Select token',
      enterAmount: 'Enter amount',
      bridgeFee: 'Bridge fee',
      estimatedTime: 'Est. time',
      bridge: 'Bridge',
      routes: 'Available routes',
      recentTransactions: 'Recent transactions',
      status: 'Status',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      balance: 'Balance',
      available: 'Available',
      swapChains: 'Swap chains',
      yourBalance: 'Your balance',
      receiving: 'You will receive',
      warning: 'Process may take up to 30 minutes',
      success: 'Bridge initiated successfully',
      liquidity: 'Liquidity',
    },
  };

  const t = texts[language];

  const selectedFromChain = CHAINS.find(c => c.id === fromChain);
  const selectedToChain = CHAINS.find(c => c.id === toChain);
  const selectedTokenData = TOKENS.find(t => t.symbol === selectedToken);

  const findRoute = () => {
    return BRIDGE_ROUTES.find(
      r => r.fromChain === selectedFromChain?.name && r.toChain === selectedToChain?.name && r.symbol === selectedToken
    );
  };

  const route = findRoute();

  const handleBridge = () => {
    setIsBridging(true);
    setTimeout(() => {
      setIsBridging(false);
      alert(t.success);
    }, 2000);
  };

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bridge Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Bridge Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              {/* From Chain */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-3 font-medium">{t.from}</label>
                <select
                  value={fromChain}
                  onChange={(e) => setFromChain(e.target.value)}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
                >
                  {CHAINS.map(chain => (
                    <option key={chain.id} value={chain.id}>
                      {chain.icon} {chain.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleSwapChains}
                  className="p-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full hover:scale-110 transition transform"
                >
                  <RefreshCw className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* To Chain */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-3 font-medium">{t.to}</label>
                <select
                  value={toChain}
                  onChange={(e) => setToChain(e.target.value)}
                  className="w-full bg-slate-700/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition"
                >
                  {CHAINS.filter(c => c.id !== fromChain).map(chain => (
                    <option key={chain.id} value={chain.id}>
                      {chain.icon} {chain.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Token Selection */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-3 font-medium">{t.selectToken}</label>
                <div className="grid grid-cols-2 gap-3">
                  {TOKENS.map((token, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedToken(token.symbol)}
                      className={`p-4 rounded-xl border-2 transition ${
                        selectedToken === token.symbol
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 bg-white/5 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{token.icon}</span>
                        <div className="text-right">
                          <span className="text-white font-bold block">{token.symbol}</span>
                          <span className="text-gray-400 text-sm">{t.balance}: {token.balance}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-gray-400 mb-3 font-medium">{t.enterAmount}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-700/50 border border-white/10 rounded-xl p-4 pr-16 text-white text-2xl focus:outline-none focus:border-purple-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    {selectedToken}
                  </span>
                </div>
              </div>

              {/* Route Info */}
              {route && (
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">{t.estimatedTime}: {route.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">{t.bridgeFee}: {route.fee}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{t.liquidity}: {route.liquidity}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Warning */}
              {(parseFloat(amount) || 0) > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{t.warning}</p>
                </div>
              )}

              {/* Bridge Button */}
              <button
                onClick={handleBridge}
                disabled={!amount || isBridging}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:scale-[1.02] transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isBridging ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                {isBridging ? 'Bridging...' : t.bridge}
              </button>
            </div>

            {/* Available Routes */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                {t.routes}
              </h3>
              <div className="space-y-3">
                {BRIDGE_ROUTES.map((r, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      r.available ? 'border-green-500/30 bg-green-500/10' : 'border-gray-500/30 bg-gray-500/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle className={`w-5 h-5 ${r.available ? 'text-green-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-white font-medium">
                          {r.fromChain} → {r.toChain}
                        </p>
                        <p className="text-gray-400 text-sm">{r.symbol} • {r.liquidity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{r.fee}</p>
                      <p className="text-gray-400 text-sm">{r.estimatedTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t.yourBalance}</span>
                  <span className="text-white font-bold">$6,541.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t.completed}</span>
                  <span className="text-green-400 font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">{t.pending}</span>
                  <span className="text-yellow-400 font-bold">3</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                {t.recentTransactions}
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {SWAP_HISTORY.map((tx) => (
                  <div key={tx.id} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{tx.amount} {tx.symbol}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {t[tx.status]}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {tx.fromChain} → {tx.toChain}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{tx.txHash}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}