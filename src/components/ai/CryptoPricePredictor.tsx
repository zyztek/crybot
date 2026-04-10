import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

interface PredictionData {
  date: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface PredictionResult {
  symbol: string;
  currentPrice: number;
  predictions: PredictionData[];
  accuracy: number;
  model: string;
  lastUpdated: string;
}

export const CryptoPricePredictor: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [timeframe, setTimeframe] = useState('7d');

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', color: '#627eea' },
    { symbol: 'SOL', name: 'Solana', color: '#00d4aa' },
    { symbol: 'ADA', name: 'Cardano', color: '#0033ad' },
    { symbol: 'DOT', name: 'Polkadot', color: '#e6007a' }
  ];

  const timeframes = [
    { value: '1d', label: '1 Day' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        // Simulate ML API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData: PredictionResult = {
          symbol: selectedCrypto,
          currentPrice: 45000 + Math.random() * 10000,
          predictions: generateMockPredictions(timeframe),
          accuracy: 0.85 + Math.random() * 0.1,
          model: 'LSTM-Transformer-v2',
          lastUpdated: new Date().toISOString()
        };
        
        setPredictions([mockData]);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [selectedCrypto, timeframe]);

  const generateMockPredictions = (tf: string): PredictionData[] => {
    const days = tf === '1d' ? 24 : tf === '7d' ? 7 : 30;
    const data: PredictionData[] = [];
    const basePrice = 45000;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const trend = Math.sin(i * 0.5) * 0.1 + Math.random() * 0.05;
      const actual = basePrice * (1 + trend);
      const predicted = actual * (1 + (Math.random() - 0.5) * 0.02);
      const confidence = 0.8 + Math.random() * 0.15;
      
      data.push({
        date: date.toLocaleDateString(),
        actual: Math.round(actual),
        predicted: Math.round(predicted),
        confidence: Math.round(confidence * 100)
      });
    }
    
    return data;
  };

  const selectedCryptoData = cryptos.find(c => c.symbol === selectedCrypto);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
          <p className="text-gray-600">AI Model Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-bold">AI Price Predictor</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <AlertCircle className="w-4 h-4" />
          <span>Model Accuracy: {predictions[0]?.accuracy ? (predictions[0].accuracy * 100).toFixed(1) : 0}%</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Crypto:</label>
          <select
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cryptos.map(crypto => (
              <option key={crypto.symbol} value={crypto.symbol}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Timeframe:</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>
                {tf.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Price */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Current Price</p>
            <p className="text-3xl font-bold">
              ${predictions[0]?.currentPrice?.toLocaleString() || '0'}
            </p>
            <p className="text-sm opacity-90 mt-1">
              {selectedCryptoData?.name} ({selectedCrypto})
            </p>
          </div>
          <TrendingUp className="w-12 h-12 opacity-50" />
        </div>
      </div>

      {/* Prediction Chart */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Price Prediction</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions[0]?.predictions || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke={selectedCryptoData?.color}
              strokeWidth={2}
              name="Actual Price"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="AI Prediction"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Model Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Model</h4>
          <p className="text-sm text-blue-700">{predictions[0]?.model || 'Loading...'}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Confidence</h4>
          <p className="text-sm text-green-700">
            {predictions[0]?.predictions?.[0]?.confidence || 0}%
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">Last Updated</h4>
          <p className="text-sm text-purple-700">
            {predictions[0]?.lastUpdated ? 
              new Date(predictions[0].lastUpdated).toLocaleString() : 
              'Loading...'
            }
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">AI Prediction Disclaimer</p>
            <p>
              These predictions are generated by machine learning models and should not be considered financial advice. 
              Always do your own research and consult with financial professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
