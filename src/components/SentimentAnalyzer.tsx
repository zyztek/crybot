import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Brain, Zap, Activity, Heart, MessageSquare, BarChart3 } from 'lucide-react';

interface SentimentData {
  asset: string;
  overall: number;
  twitter: number;
  reddit: number;
  news: number;
  technical: number;
  onChain: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  change24h: number;
}

const sentimentData: SentimentData[] = [
  { asset: 'BTC', overall: 75, twitter: 72, reddit: 78, news: 80, technical: 70, onChain: 76, trend: 'bullish', change24h: 5 },
  { asset: 'ETH', overall: 68, twitter: 65, reddit: 70, news: 68, technical: 72, onChain: 65, trend: 'bullish', change24h: 3 },
  { asset: 'SOL', overall: 82, twitter: 85, reddit: 80, news: 78, technical: 85, onChain: 80, trend: 'bullish', change24h: 8 },
  { asset: 'DOGE', overall: 45, twitter: 55, reddit: 40, news: 35, technical: 42, onChain: 48, trend: 'neutral', change24h: -2 },
  { asset: 'XRP', overall: 52, twitter: 48, reddit: 55, news: 50, technical: 56, onChain: 50, trend: 'neutral', change24h: 1 },
  { asset: 'ADA', overall: 38, twitter: 35, reddit: 40, news: 38, technical: 35, onChain: 42, trend: 'bearish', change24h: -4 }
];

const recentPosts = [
  { platform: 'twitter', user: '@cryptoanalyst', content: 'Bitcoin breaking resistance! 🚀 Target: $75K next week.', sentiment: 'positive', time: '2h ago', likes: 1234 },
  { platform: 'twitter', user: '@trademaster', content: 'Altseason is finally here. SOL leading the pack!', sentiment: 'positive', time: '1h ago', likes: 892 },
  { platform: 'reddit', user: 'u/DiamondHands', content: 'Bearish divergence forming on 4H chart. Be careful out there.', sentiment: 'negative', time: '3h ago', likes: 456 },
  { platform: 'reddit', user: 'u/CryptoDaily', content: 'Institutional inflows at record highs. Bull run confirmed.', sentiment: 'positive', time: '4h ago', likes: 2341 },
  { platform: 'news', user: 'CoinDesk', content: 'ETF approval imminent according to SEC sources.', sentiment: 'positive', time: '5h ago', likes: 0 },
  { platform: 'news', user: 'Bloomberg', content: 'Crypto regulations tighten in major markets.', sentiment: 'negative', time: '6h ago', likes: 0 }
];

export const SentimentAnalyzer: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<SentimentData>(sentimentData[0]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const filteredPosts = filter === 'all' 
    ? recentPosts 
    : recentPosts.filter(post => post.sentiment === filter);

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-400 bg-green-500/20';
      case 'bearish': return 'text-red-400 bg-red-500/20';
      case 'neutral': return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
      case 'reddit': return <MessageSquare className="w-4 h-4" />;
      case 'news': return <Zap className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500/20 text-blue-400';
      case 'reddit': return 'bg-orange-500/20 text-orange-400';
      case 'news': return 'bg-purple-500/20 text-purple-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sentiment Analyzer
            </h1>
          </div>
          <p className="text-slate-400">Analiza el sentimiento del mercado en tiempo real usando AI</p>
        </div>

        {/* Asset Selector */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Seleccionar Activo</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {sentimentData.map((asset) => (
              <button
                key={asset.asset}
                onClick={() => setSelectedAsset(asset)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedAsset.asset === asset.asset
                    ? 'bg-purple-600/30 border-purple-500'
                    : 'bg-slate-700/50 border-slate-600/50 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">{asset.asset}</span>
                  <span className="text-sm text-slate-400">{asset.overall}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getSentimentColor(asset.overall)}`}
                    style={{ width: `${asset.overall}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sentiment Score */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Sentimiento {selectedAsset.asset}
              </h2>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTrendColor(selectedAsset.trend)}`}>
                {selectedAsset.trend.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Twitter', value: selectedAsset.twitter, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'Reddit', value: selectedAsset.reddit, icon: <MessageSquare className="w-5 h-5 text-orange-400" /> },
                { label: 'News', value: selectedAsset.news, icon: <Zap className="w-5 h-5 text-purple-400" /> },
                { label: 'Technical', value: selectedAsset.technical, icon: <BarChart3 className="w-5 h-5 text-green-400" /> },
                { label: 'On-Chain', value: selectedAsset.onChain, icon: <Activity className="w-5 h-5 text-cyan-400" /> },
                { label: 'Overall', value: selectedAsset.overall, icon: <Brain className="w-5 h-5 text-purple-400" /> }
              ].map((item) => (
                <div key={item.label} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {item.icon}
                    <span className="text-slate-400 text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-white">{item.value}</span>
                    {item.label === 'Overall' && (
                      <span className={`text-sm flex items-center gap-1 ${selectedAsset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedAsset.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(selectedAsset.change24h)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSentimentColor(item.value)}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-5 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Basado en el análisis de {selectedAsset.overall > 60 ? 'múltiples indicadores positivos,' : 'indicadores mixtos,'} 
                el sentimiento del mercado para {selectedAsset.asset} es {selectedAsset.trend}. 
                La actividad en redes sociales muestra {selectedAsset.twitter > 60 ? 'alto engagement' : 'engagement moderado'}, 
                mientras que el análisis técnico indica {selectedAsset.technical > 60 ? 'momentum alcista' : 'consolidación'}. 
                {selectedAsset.onChain > 60 ? 'Los datos on-chain respaldan la tendencia positiva' : 'Los datos on-chain muestran precaución'}.
              </p>
            </div>
          </div>

          {/* Fear & Greed */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Fear & Greed Index</h3>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeDasharray={`${selectedAsset.overall * 2.83} 283`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{selectedAsset.overall}</span>
                <span className="text-sm text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-green-400 mb-2">Greed</p>
              <p className="text-sm text-slate-400">
                {selectedAsset.overall > 75 ? 'Extremadamente optimista' : 
                 selectedAsset.overall > 60 ? 'Optimista' : 
                 selectedAsset.overall > 40 ? 'Neutral' : 
                 selectedAsset.overall > 25 ? 'Miedo' : 'Miedo extremo'}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Extreme Greed</span>
                <span className="text-red-400">Extreme Fear</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
            </div>

            {/* Key Metrics */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-400">Volume Spike</span>
                </div>
                <span className="text-green-400 font-semibold">+156%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-slate-400">Social Volume</span>
                </div>
                <span className="text-green-400 font-semibold">+89%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-400">Price Trend</span>
                </div>
                <span className={selectedAsset.change24h >= 0 ? 'text-green-400' : 'text-red-400'} font-semibold>
                  {selectedAsset.change24h >= 0 ? '+' : ''}{selectedAsset.change24h}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Feed */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Social Feed</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filter === 'all' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('positive')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filter === 'positive' ? 'bg-green-600/30 text-green-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Positivo
                </button>
                <button
                  onClick={() => setFilter('negative')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filter === 'negative' ? 'bg-red-600/30 text-red-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 inline mr-1" />
                  Negativo
                </button>
                <button
                  onClick={() => setFilter('neutral')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    filter === 'neutral' ? 'bg-yellow-600/30 text-yellow-400' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Neutral
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto">
            {filteredPosts.map((post, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPlatformColor(post.platform)}`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{post.user}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        post.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                        post.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.sentiment}
                      </span>
                      <span className="text-xs text-slate-500">{post.time}</span>
                    </div>
                    <p className="text-slate-300 text-sm">"{post.content}"</p>
                    <div className="flex items-center gap-4 mt-2">
                      {post.likes > 0 && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {post.likes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};