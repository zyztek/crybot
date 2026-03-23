import React from 'react';
import { Shield, Zap, Lock, Activity } from 'lucide-react';

interface ProtectionConfig {
  flashbots: boolean;
  privateMempool: boolean;
  slippageProtection: boolean;
  maxSlippage: number;
}

interface MEVEvent {
  id: number;
  type: 'blocked' | 'protected' | 'saved';
  amount: string;
  timestamp: string;
}

export default function MEVProtection() {
  const [protectionActive, setProtectionActive] = React.useState(true);
  const [config, setConfig] = React.useState<ProtectionConfig>({
    flashbots: true,
    privateMempool: true,
    slippageProtection: true,
    maxSlippage: 0.5,
  });

  const [events, setEvents] = React.useState<MEVEvent[]>([
    { id: 1, type: 'blocked', amount: '$234.56 USDT', timestamp: '2 min ago' },
    { id: 2, type: 'protected', amount: '$12.34 ETH', timestamp: '15 min ago' },
    { id: 3, type: 'saved', amount: '$45.67 DAI', timestamp: '1 hour ago' },
    { id: 4, type: 'blocked', amount: '$123.45 WBTC', timestamp: '2 hours ago' },
    { id: 5, type: 'saved', amount: '$89.90 USDC', timestamp: '3 hours ago' },
  ]);

  const [isSpanish, setIsSpanish] = React.useState(true);

  const text = {
    title: isSpanish ? 'Protección MEV' : 'MEV Protection',
    protection: isSpanish ? 'Protección Activada' : 'Protection Active',
    protected: isSpanish ? 'Protegido' : 'Protected',
    vulnerable: isSpanish ? 'Vulnerable' : 'Vulnerable',
    config: isSpanish ? 'Configuración' : 'Configuration',
    flashbots: isSpanish ? 'Flashbots Bundle' : 'Flashbots Bundle',
    privateMempool: isSpanish ? 'Private Mempool' : 'Private Mempool',
    slippage: isSpanish ? 'Protección de Slippage' : 'Slippage Protection',
    maxSlippage: isSpanish ? 'Slippage Máximo' : 'Max Slippage',
    recentEvents: isSpanish ? 'Eventos Recientes' : 'Recent Events',
    totalSaved: isSpanish ? 'Total Ahorrado' : 'Total Saved',
    threatsBlocked: isSpanish ? 'Amenazas Bloqueadas' : 'Threats Blocked',
    transactionsProtected: isSpanish ? 'Transacciones Protegidas' : 'Transactions Protected',
    save: isSpanish ? 'Guardar Configuración' : 'Save Configuration',
    scan: {
      title: isSpanish ? 'Escáner de Vulnerabilidad' : 'Vulnerability Scanner',
      scan: isSpanish ? 'Iniciar Escaneo' : 'Start Scan',
      scanning: isSpanish ? 'Escaneando...' : 'Scanning...',
      result: isSpanish ? 'Resultado del Escaneo' : 'Scan Result',
    },
    risk: isSpanish ? 'Nivel de Riesgo' : 'Risk Level',
    low: isSpanish ? 'Bajo' : 'Low',
    medium: isSpanish ? 'Medio' : 'Medium',
    high: isSpanish ? 'Alto' : 'High',
    critical: isSpanish ? 'Crítico' : 'Critical',
  };

  const [isScanning, setIsScanning] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<{risk: string; issues: string[]} | null>(null);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        risk: 'medium',
        issues: [
          isSpanish ? 'Detected pending transaction with high MEV risk' : 'Transacción pendiente con alto riesgo MEV detectada',
          isSpanish ? 'Liquidity pool has high sandwich attack probability' : 'Pool de liquidez con alta probabilidad de ataque sandwich',
          isSpanish ? 'Consider using Flashbots for your next transaction' : 'Considera usar Flashbots para tu próxima transacción',
        ],
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8" />
          {text.title}
        </h1>
        <p className="text-gray-400">
          {isSpanish ? 'Protege tus transacciones de ataques MEV (Maximal Extractable Value)' : 'Protect your transactions from MEV (Maximal Extractable Value) attacks'}
        </p>
      </div>

      {/* Protection Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className={`bg-gradient-to-br ${
          protectionActive ? 'from-green-600/20 to-emerald-600/20 border-green-500/30' : 'from-red-600/20 to-rose-600/20 border-red-500/30'
        } border backdrop-blur-lg rounded-xl p-5`}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className={`w-6 h-6 ${protectionActive ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-gray-400 text-sm">{text.protection}</span>
          </div>
          <div className={`text-2xl font-bold ${protectionActive ? 'text-green-400' : 'text-red-400'}`}>
            {protectionActive ? text.protected : text.vulnerable}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-400 text-sm">{text.totalSaved}</span>
          </div>
          <div className="text-2xl font-bold text-white">$2,456.78</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400 text-sm">{text.threatsBlocked}</span>
          </div>
          <div className="text-2xl font-bold text-white">1,234</div>
        </div>

        <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30 backdrop-blur-lg rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-6 h-6 text-pink-400" />
            <span className="text-gray-400 text-sm">{text.transactionsProtected}</span>
          </div>
          <div className="text-2xl font-bold text-white">5,678</div>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          {text.config}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="flex items-center gap-3 bg-slate-700/50 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={config.flashbots}
              onChange={(e) => setConfig({ ...config, flashbots: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <div>
              <div className="text-white font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                {text.flashbots}
              </div>
              <div className="text-gray-400 text-xs">Flashbots bundles</div>
            </div>
          </label>

          <label className="flex items-center gap-3 bg-slate-700/50 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={config.privateMempool}
              onChange={(e) => setConfig({ ...config, privateMempool: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <div>
              <div className="text-white font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                {text.privateMempool}
              </div>
              <div className="text-gray-400 text-xs">Private transaction pool</div>
            </div>
          </label>

          <label className="flex items-center gap-3 bg-slate-700/50 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={config.slippageProtection}
              onChange={(e) => setConfig({ ...config, slippageProtection: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <div>
              <div className="text-white font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                {text.slippage}
              </div>
              <div className="text-gray-400 text-xs">Auto-adjust slippage</div>
            </div>
          </label>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <div className="text-white font-medium mb-2">{text.maxSlippage}</div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={config.maxSlippage}
                onChange={(e) => setConfig({ ...config, maxSlippage: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-yellow-400 font-mono">{config.maxSlippage}%</span>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 transition-all">
          {text.save}
        </button>
      </div>

      {/* Vulnerability Scanner */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          {text.scan.title}
        </h2>

        {!isScanning && !scanResult && (
          <button
            onClick={runScan}
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-500 hover:to-violet-500 transition-all"
          >
            {text.scan.scan}
          </button>
        )}

        {isScanning && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin text-purple-400 mb-4">
              <Activity className="w-12 h-12" />
            </div>
            <div className="text-xl text-white">{text.scan.scanning}</div>
          </div>
        )}

        {scanResult && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gray-400">{text.risk}:</span>
              <span className={`px-4 py-1 rounded-full font-medium ${
                scanResult.risk === 'low' ? 'bg-green-600/20 text-green-400' :
                scanResult.risk === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                scanResult.risk === 'high' ? 'bg-red-600/20 text-red-400' :
                'bg-red-600/20 text-red-400'
              }`}>
                {scanResult.risk === 'low' ? text.low :
                 scanResult.risk === 'medium' ? text.medium :
                 scanResult.risk === 'high' ? text.high : text.critical}
              </span>
            </div>

            <div className="space-y-3">
              {scanResult.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-700/50 p-4 rounded-lg">
                  <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <span className="text-gray-300">{issue}</span>
                </div>
              ))}
            </div>

            <button
              onClick={runScan}
              className="mt-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-500 hover:to-violet-500 transition-all"
            >
              {text.scan.scan}
            </button>
          </div>
        )}
      </div>

      {/* Recent Events */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          {text.recentEvents}
        </h2>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                {event.type === 'blocked' && <Lock className="w-5 h-5 text-red-400" />}
                {event.type === 'protected' && <Shield className="w-5 h-5 text-green-400" />}
                {event.type === 'saved' && <Zap className="w-5 h-5 text-yellow-400" />}
                <span className={`font-medium ${
                  event.type === 'blocked' ? 'text-red-400' :
                  event.type === 'protected' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {event.type === 'blocked' ? 'Blocked' :
                   event.type === 'protected' ? 'Protected' : 'Saved'}
                </span>
                <span className="text-gray-300">{event.amount}</span>
              </div>
              <span className="text-gray-500 text-sm">{event.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}