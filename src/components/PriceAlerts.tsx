import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Filter,
} from 'lucide-react';
import { useCryptoStore } from '../store/cryptoStore';

interface PriceAlert {
  id: string;
  coin: string;
  targetPrice: number;
  condition: 'above' | 'below';
  currentPrice: number;
  createdAt: number;
  triggered: boolean;
}

const COIN_OPTIONS = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43500 },
  { symbol: 'ETH', name: 'Ethereum', price: 2650 },
  { symbol: 'SOL', name: 'Solana', price: 98 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.082 },
  { symbol: 'XRP', name: 'Ripple', price: 0.62 },
  { symbol: 'ADA', name: 'Cardano', price: 0.58 },
  { symbol: 'AVAX', name: 'Avalanche', price: 35 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.5 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.85 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.5 },
  { symbol: 'ATOM', name: 'Cosmos', price: 10.2 },
  { symbol: 'UNI', name: 'Uniswap', price: 7.8 },
];

const PriceAlerts: React.FC = () => {
  const { language } = useCryptoStore();
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      coin: 'BTC',
      targetPrice: 45000,
      condition: 'above',
      currentPrice: 43500,
      createdAt: Date.now() - 86400000,
      triggered: false,
    },
    {
      id: '2',
      coin: 'ETH',
      targetPrice: 2800,
      condition: 'above',
      currentPrice: 2650,
      createdAt: Date.now() - 172800000,
      triggered: false,
    },
    {
      id: '3',
      coin: 'SOL',
      targetPrice: 85,
      condition: 'below',
      currentPrice: 98,
      createdAt: Date.now() - 3600000,
      triggered: false,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'triggered'>('all');
  const [selectedCoin, setSelectedCoin] = useState(COIN_OPTIONS[0]);
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const t = {
    es: {
      title: 'Alertas de Precio',
      createAlert: 'Crear Alerta',
      active: 'Activas',
      triggered: 'Disparadas',
      all: 'Todas',
      above: 'Por encima de',
      below: 'Por debajo de',
      currentPrice: 'Precio Actual',
      targetPrice: 'Precio Objetivo',
      noAlerts: 'No hay alertas',
      createNew: 'Crear Nueva Alerta',
      selectCoin: 'Seleccionar Moneda',
      enterPrice: 'Ingrese precio',
      condition: 'Condición',
      create: 'Crear',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      triggered: 'Disparada',
      activeAlert: 'Alerta Activa',
      priceReached: '¡Precio alcanzado!',
      daysAgo: 'días atrás',
      hoursAgo: 'horas atrás',
      minutesAgo: 'minutos atrás',
      justNow: 'ahora',
    },
    en: {
      title: 'Price Alerts',
      createAlert: 'Create Alert',
      active: 'Active',
      triggered: 'Triggered',
      all: 'All',
      above: 'Above',
      below: 'Below',
      currentPrice: 'Current Price',
      targetPrice: 'Target Price',
      noAlerts: 'No alerts',
      createNew: 'Create New Alert',
      selectCoin: 'Select Coin',
      enterPrice: 'Enter price',
      condition: 'Condition',
      create: 'Create',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      triggered: 'Triggered',
      activeAlert: 'Active Alert',
      priceReached: 'Price reached!',
      daysAgo: 'days ago',
      hoursAgo: 'hours ago',
      minutesAgo: 'minutes ago',
      justNow: 'just now',
    },
  };

  const texts = t[language as keyof typeof t];

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (days > 0) return `${days} ${texts.daysAgo}`;
    if (hours > 0) return `${hours} ${texts.hoursAgo}`;
    if (minutes > 0) return `${minutes} ${texts.minutesAgo}`;
    return texts.justNow;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString()}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'active') return !alert.triggered;
    if (filter === 'triggered') return alert.triggered;
    return true;
  });

  const handleCreateAlert = () => {
    if (!targetPrice) return;
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      coin: selectedCoin.symbol,
      targetPrice: parseFloat(targetPrice),
      condition,
      currentPrice: selectedCoin.price,
      createdAt: Date.now(),
      triggered: false,
    };
    setAlerts([newAlert, ...alerts]);
    setShowCreateModal(false);
    setTargetPrice('');
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const getCoinPrice = (symbol: string) => {
    const coin = COIN_OPTIONS.find(c => c.symbol === symbol);
    return coin?.price || 0;
  };

  const activeAlerts = alerts.filter(a => !a.triggered).length;
  const triggeredAlerts = alerts.filter(a => a.triggered).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bell className="w-8 h-8 text-yellow-400" />
            {texts.title}
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            {texts.createAlert}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{texts.active}</p>
                <p className="text-3xl font-bold text-white mt-1">{activeAlerts}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Bell className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{texts.triggered}</p>
                <p className="text-3xl font-bold text-yellow-400 mt-1">{triggeredAlerts}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{texts.all}</p>
                <p className="text-3xl font-bold text-purple-400 mt-1">{alerts.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-400" />
            {(['all', 'active', 'triggered'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {texts[f as keyof typeof texts]}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
              <Bell className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">{texts.noAlerts}</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
              >
                {texts.createNew}
              </button>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border ${
                  alert.triggered
                    ? 'border-yellow-500/50 bg-yellow-500/5'
                    : 'border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Coin Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        alert.triggered
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}
                    >
                      {alert.coin[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{alert.coin}</h3>
                        {alert.triggered && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                            {texts.triggered}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(alert.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-slate-400 text-sm">{texts.currentPrice}</p>
                      <p className="text-xl font-bold text-white">{formatPrice(getCoinPrice(alert.coin))}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-sm">{texts.targetPrice}</p>
                      <div className="flex items-center gap-1">
                        {alert.condition === 'above' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <p className={`text-xl font-bold ${alert.triggered ? 'text-yellow-400' : 'text-white'}`}>
                          {formatPrice(alert.targetPrice)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-sm">{texts.condition}</p>
                      <p className="text-white font-medium">
                        {alert.condition === 'above' ? texts.above : texts.below}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {alert.triggered && (
                  <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2 text-yellow-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{texts.priceReached}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{texts.createNew}</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Coin Selection */}
              <div>
                <label className="text-slate-400 text-sm mb-2 block">{texts.selectCoin}</label>
                <select
                  value={selectedCoin.symbol}
                  onChange={e => setSelectedCoin(COIN_OPTIONS.find(c => c.symbol === e.target.value) || COIN_OPTIONS[0])}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  {COIN_OPTIONS.map(coin => (
                    <option key={coin.symbol} value={coin.symbol}>
                      {coin.symbol} - {coin.name} ({formatPrice(coin.price)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Selection */}
              <div>
                <label className="text-slate-400 text-sm mb-2 block">{texts.condition}</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCondition('above')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                      condition === 'above'
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-slate-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {texts.above}
                  </button>
                  <button
                    onClick={() => setCondition('below')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                      condition === 'below'
                        ? 'border-red-500 bg-red-500/10 text-red-400'
                        : 'border-slate-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    {texts.below}
                  </button>
                </div>
              </div>

              {/* Target Price */}
              <div>
                <label className="text-slate-400 text-sm mb-2 block">{texts.targetPrice}</label>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={e => setTargetPrice(e.target.value)}
                  placeholder={texts.enterPrice}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
                <p className="text-slate-500 text-sm mt-2">
                  {texts.currentPrice}: {formatPrice(selectedCoin.price)}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                >
                  {texts.cancel}
                </button>
                <button
                  onClick={handleCreateAlert}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all font-medium"
                >
                  {texts.create}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;