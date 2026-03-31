import React, { useState } from 'react';
import {
  Calculator,
  FileText,
  Download,
  Plus,
  Trash2,
  PieChart,
  ArrowRight,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  type: 'buy' | 'sell' | 'transfer' | 'staking';
  coin: string;
  amount: number;
  priceUsd: number;
  feeUsd: number;
}

export const CryptoTaxCalculator: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2024-01-15',
      type: 'buy',
      coin: 'BTC',
      amount: 0.1,
      priceUsd: 42000,
      feeUsd: 10,
    },
    {
      id: 2,
      date: '2024-01-20',
      type: 'sell',
      coin: 'BTC',
      amount: 0.05,
      priceUsd: 43000,
      feeUsd: 5,
    },
    { id: 3, date: '2024-02-01', type: 'buy', coin: 'ETH', amount: 2, priceUsd: 2300, feeUsd: 8 },
    {
      id: 4,
      date: '2024-02-10',
      type: 'staking',
      coin: 'ETH',
      amount: 0.1,
      priceUsd: 2400,
      feeUsd: 2,
    },
    { id: 5, date: '2024-02-15', type: 'sell', coin: 'ETH', amount: 1, priceUsd: 2500, feeUsd: 6 },
  ]);

  const [taxRate, setTaxRate] = useState(23);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'buy' as const,
    coin: 'BTC',
    amount: 0,
    priceUsd: 0,
    feeUsd: 0,
  });

  const calculateTax = () => {
    let totalRealizedGains = 0;
    let totalRealizedLosses = 0;

    transactions.forEach(tx => {
      if (tx.type === 'sell') {
        const proceeds = tx.amount * tx.priceUsd - tx.feeUsd;
        const costBasis = tx.amount * tx.priceUsd * 0.95; // Simplified
        const gain = proceeds - costBasis;
        if (gain > 0) totalRealizedGains += gain;
        else totalRealizedLosses += Math.abs(gain);
      }
      if (tx.type === 'staking') {
        totalRealizedGains += tx.amount * tx.priceUsd;
      }
    });

    const netGain = totalRealizedGains - totalRealizedLosses;
    const taxLiability = netGain > 0 ? netGain * (taxRate / 100) : 0;

    return {
      totalRealizedGains,
      totalRealizedLosses,
      netGain,
      taxLiability,
      totalVolume: transactions.reduce((sum, tx) => sum + tx.amount * tx.priceUsd, 0),
      totalFees: transactions.reduce((sum, tx) => sum + tx.feeUsd, 0),
    };
  };

  const taxData = calculateTax();

  const addTransaction = () => {
    if (newTransaction.amount > 0 && newTransaction.priceUsd > 0) {
      setTransactions([
        ...transactions,
        {
          id: Date.now(),
          ...newTransaction,
        },
      ]);
      setNewTransaction({
        date: new Date().toISOString().split('T')[0],
        type: 'buy',
        coin: 'BTC',
        amount: 0,
        priceUsd: 0,
        feeUsd: 0,
      });
    }
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'bg-green-500/20 text-green-400';
      case 'sell':
        return 'bg-red-500/20 text-red-400';
      case 'transfer':
        return 'bg-blue-500/20 text-blue-400';
      case 'staking':
        return 'bg-purple-500/20 text-purple-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calculator className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crypto Tax Calculator
            </h1>
          </div>
          <p className="text-slate-400">
            Calcula tus impuestos sobre criptomonedas automáticamente
          </p>
        </div>

        {/* Tax Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-xl p-5 border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm">Ganancias Realizadas</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${taxData.totalRealizedGains.toFixed(2)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm rounded-xl p-5 border border-red-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-sm">Pérdidas Realizadas</span>
              <TrendingUp className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              ${taxData.totalRealizedLosses.toFixed(2)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm">Pasivo Fiscal</span>
              <PieChart className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">${taxData.taxLiability.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">Ganancia Neta</span>
              <ArrowRight className="w-5 h-5 text-blue-400" />
            </div>
            <p
              className={`text-2xl font-bold ${taxData.netGain >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              ${taxData.netGain.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tax Settings */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración Fiscal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Tasa de Impuesto (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={taxRate}
                  onChange={e => setTaxRate(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-lg font-bold text-white w-12">{taxRate}%</span>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-1">Volumen Total</p>
              <p className="text-lg font-semibold text-white">${taxData.totalVolume.toFixed(2)}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-1">Total de Fees</p>
              <p className="text-lg font-semibold text-white">${taxData.totalFees.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Agregar Transacción</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Fecha</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Tipo</label>
              <select
                value={newTransaction.type}
                onChange={e =>
                  setNewTransaction({ ...newTransaction, type: e.target.value as any })
                }
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="buy">Compra</option>
                <option value="sell">Venta</option>
                <option value="transfer">Transferencia</option>
                <option value="staking">Staking</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Moneda</label>
              <select
                value={newTransaction.coin}
                onChange={e => setNewTransaction({ ...newTransaction, coin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="DOGE">DOGE</option>
                <option value="SOL">SOL</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Cantidad</label>
              <input
                type="number"
                step="any"
                value={newTransaction.amount}
                onChange={e =>
                  setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })
                }
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Precio (USD)</label>
              <input
                type="number"
                step="any"
                value={newTransaction.priceUsd}
                onChange={e =>
                  setNewTransaction({ ...newTransaction, priceUsd: Number(e.target.value) })
                }
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Fee (USD)</label>
              <input
                type="number"
                step="any"
                value={newTransaction.feeUsd}
                onChange={e =>
                  setNewTransaction({ ...newTransaction, feeUsd: Number(e.target.value) })
                }
                placeholder="0.00"
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addTransaction}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar Transacción
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Historial de Transacciones</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generar Reporte
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Moneda
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(tx.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(tx.type)}`}
                      >
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                      {tx.coin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-white">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-white">
                      ${tx.priceUsd.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-400">
                      ${tx.feeUsd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-white">
                      ${(tx.amount * tx.priceUsd).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-300 font-semibold mb-1">Aviso Importante</p>
              <p className="text-xs text-amber-200/80">
                Este calculador proporciona estimaciones basadas en la información ingresada. No
                sustituye asesoramiento fiscal profesional. Consulta con un especialista en
                impuestos cripto para garantizar el cumplimiento de las regulaciones locales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
