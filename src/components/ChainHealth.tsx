import { useState } from 'react';
import { HeartPulse, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ChainHealth() {
  const [isSpanish, setIsSpanish] = useState(true);

  const chains = [
    { name: 'Ethereum', health: 95, tps: 15, blocks: 19234567, status: 'healthy' },
    { name: 'Polygon', health: 98, tps: 7000, blocks: 45678901, status: 'healthy' },
    { name: 'Arbitrum', health: 97, tps: 40, blocks: 23456789, status: 'healthy' },
    { name: 'Optimism', health: 96, tps: 25, blocks: 21345678, status: 'healthy' },
    { name: 'BNB Chain', health: 94, tps: 160, blocks: 34567890, status: 'healthy' },
  ];

  const text = isSpanish
    ? {
        title: 'Salud de la Cadena',
        health: 'Salud',
        tps: 'TPS',
        blocks: 'Bloques',
        status: 'Estado',
      }
    : {
        title: 'Chain Health',
        health: 'Health',
        tps: 'TPS',
        blocks: 'Blocks',
        status: 'Status',
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-purple-400" />
            {text.title}
          </h1>
          <button
            onClick={() => setIsSpanish(!isSpanish)}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg"
          >
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {chains.map(chain => (
            <div
              key={chain.name}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20"
            >
              <h3 className="text-white font-bold mb-4">{chain.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{text.health}</span>
                  <span
                    className={`text-2xl font-bold ${chain.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}
                  >
                    {chain.health}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{text.tps}</span>
                  <span className="text-white">{chain.tps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{text.blocks}</span>
                  <span className="text-white">{chain.blocks.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {chain.status === 'healthy' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className="text-white capitalize">{chain.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
