import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ArrowLeftRight,
  RefreshCw,
  Bitcoin,
  DollarSign,
  TrendingUp,
  Calculator,
} from 'lucide-react';

interface ConversionData {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
}

const CRYPTO_CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin', icon: Bitcoin, price: 67500 },
  { symbol: 'ETH', name: 'Ethereum', icon: Bitcoin, price: 3520 },
  { symbol: 'DOGE', name: 'Dogecoin', icon: Bitcoin, price: 0.15 },
  { symbol: 'SOL', name: 'Solana', icon: Bitcoin, price: 175 },
  { symbol: 'LTC', name: 'Litecoin', icon: Bitcoin, price: 85 },
  { symbol: 'BNB', name: 'BNB', icon: Bitcoin, price: 590 },
  { symbol: 'XRP', name: 'Ripple', icon: Bitcoin, price: 0.62 },
  { symbol: 'ADA', name: 'Cardano', icon: Bitcoin, price: 0.58 },
];

const FIAT_CURRENCIES = [
  { symbol: 'USD', name: 'US Dollar', icon: DollarSign },
  { symbol: 'EUR', name: 'Euro', icon: DollarSign },
  { symbol: 'GBP', name: 'British Pound', icon: DollarSign },
  { symbol: 'JPY', name: 'Japanese Yen', icon: DollarSign },
  { symbol: 'CNY', name: 'Chinese Yuan', icon: DollarSign },
  { symbol: 'INR', name: 'Indian Rupee', icon: DollarSign },
  { symbol: 'BRL', name: 'Brazilian Real', icon: DollarSign },
  { symbol: 'MXN', name: 'Mexican Peso', icon: DollarSign },
];

export default function CryptoConverter() {
  const [isCrypto, setIsCrypto] = useState(true);
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [rate, setRate] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<ConversionData[]>([]);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const texts = {
    es: {
      title: 'Conversor de Criptomonedas',
      subtitle: 'Convierte criptomonedas y monedas fiat en tiempo real',
      from: 'De',
      to: 'A',
      amount: 'Cantidad',
      calculate: 'Calcular',
      rate: 'Tasa de cambio',
      convert: 'Convertir',
      crypto: 'Cripto',
      fiat: 'Fiat',
      result: 'Resultado',
      history: 'Historial de conversiones',
      exchange: 'Tasas de cambio en vivo',
      cryptoToFiat: 'Cripto → Fiat',
      fiatToCrypto: 'Fiat → Cripto',
    },
    en: {
      title: 'Crypto Converter',
      subtitle: 'Convert cryptocurrencies and fiat currencies in real-time',
      from: 'From',
      to: 'To',
      amount: 'Amount',
      calculate: 'Calculate',
      rate: 'Exchange rate',
      convert: 'Convert',
      crypto: 'Crypto',
      fiat: 'Fiat',
      result: 'Result',
      history: 'Conversion history',
      exchange: 'Live exchange rates',
      cryptoToFiat: 'Crypto → Fiat',
      fiatToCrypto: 'Fiat → Crypto',
    },
  };

  const t = texts[language];

  const calculateConversion = useCallback(() => {
    setIsCalculating(true);

    setTimeout(() => {
      const crypto1 = CRYPTO_CURRENCIES.find(c => c.symbol === fromCurrency);
      const crypto2 = CRYPTO_CURRENCIES.find(c => c.symbol === toCurrency);

      let calculatedRate = 0;
      let calculatedResult = 0;

      if (isCrypto) {
        // Crypto to Crypto or Crypto to Fiat
        const cryptoUSD = crypto1 ? crypto1.price : 0;
        if (crypto2) {
          // Crypto to Crypto
          calculatedRate = cryptoUSD / crypto2.price;
          calculatedResult = amount * calculatedRate;
        } else {
          // Crypto to Fiat
          const fiatRates: Record<string, number> = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 149.5,
            CNY: 7.24,
            INR: 83.3,
            BRL: 5.0,
            MXN: 17.1,
          };
          const usdToFiat = fiatRates[toCurrency] || 1;
          calculatedRate = cryptoUSD * usdToFiat;
          calculatedResult = amount * calculatedRate;
        }
      } else {
        // Fiat to Crypto
        const fiatRates: Record<string, number> = {
          USD: 1,
          EUR: 0.92,
          GBP: 0.79,
          JPY: 149.5,
          CNY: 7.24,
          INR: 83.3,
          BRL: 5.0,
          MXN: 17.1,
        };
        const usdToFiat = fiatRates[fromCurrency] || 1;
        const fiatUSD = amount / usdToFiat;
        if (crypto2) {
          calculatedRate = 1 / crypto2.price;
          calculatedResult = fiatUSD * calculatedRate * usdToFiat;
        }
      }

      setRate(calculatedRate);
      setResult(calculatedResult);

      setConversionHistory(prev =>
        [
          {
            from: fromCurrency,
            to: toCurrency,
            amount,
            result: calculatedResult,
            rate: calculatedRate,
          },
          ...prev,
        ].slice(0, 10)
      );

      setIsCalculating(false);
    }, 300);
  }, [fromCurrency, toCurrency, amount, isCrypto]);

  // eslint-disable-next-line react-hooks/purity
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const allCurrencies = isCrypto ? CRYPTO_CURRENCIES : FIAT_CURRENCIES;
  const toCurrencies = isCrypto ? [...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES] : CRYPTO_CURRENCIES;
  
  // Static percentages for demo - no need for dynamic random values
  const cryptoChanges = ['+2.45%', '+1.82%', '+3.21%', '+0.95%', '+1.56%', '+2.10%'];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
              <Calculator className="w-8 h-8 text-white" />
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
          {/* Converter */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCrypto(true)}
                  className={`px-4 py-2 rounded-lg transition ${
                    isCrypto
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {t.cryptoToFiat}
                </button>
                <button
                  onClick={() => setIsCrypto(false)}
                  className={`px-4 py-2 rounded-lg transition ${
                    !isCrypto
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {t.fiatToCrypto}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* From */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.from}</label>
                <div className="flex gap-4">
                  <select
                    value={fromCurrency}
                    onChange={e => setFromCurrency(e.target.value)}
                    className="flex-1 bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
                  >
                    {allCurrencies.map(curr => (
                      <option key={curr.symbol} value={curr.symbol}>
                        {curr.symbol} - {curr.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value) || 0)}
                    className="w-48 bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
                    placeholder={t.amount}
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full hover:scale-110 transition transform"
                >
                  <ArrowLeftRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* To */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.to}</label>
                <div className="bg-slate-700/50 border border-white/10 rounded-xl px-4 py-3">
                  <select
                    value={toCurrency}
                    onChange={e => setToCurrency(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none"
                  >
                    {toCurrencies.map(curr => (
                      <option key={curr.symbol} value={curr.symbol}>
                        {curr.symbol} - {curr.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate Display */}
              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t.rate}:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    1 {fromCurrency} = {rate?.toFixed(6)} {toCurrency}
                  </span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-2xl p-6">
                <div className="text-center">
                  <span className="text-gray-300 mb-2 block">{t.result}</span>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      {result?.toFixed(6)}
                    </span>
                    <span className="text-2xl text-gray-400">{toCurrency}</span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateConversion}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:scale-[1.02] transition transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCalculating ? <RefreshCw className="w-5 h-5 animate-spin" /> : null}
                {isCalculating ? 'Calculating...' : t.calculate}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Exchange Rates */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-400" />
                {t.exchange}
              </h3>
              <div className="space-y-3">
                {CRYPTO_CURRENCIES.slice(0, 6).map((crypto, idx) => (
                  <div
                    key={crypto.symbol}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {crypto.symbol.slice(0, 2)}
                      </div>
                      <span className="text-white font-medium">{crypto.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">${crypto.price.toLocaleString()}</div>
                      <div className="text-green-400 text-sm">
                        {cryptoChanges[idx]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion History */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-400" />
                {t.history}
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {conversionHistory.map((conv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-sm"
                  >
                    <span className="text-gray-300">
                      {conv.amount} {conv.from}
                    </span>
                    <span className="text-white font-medium">
                      → {conv.result?.toFixed(4)} {conv.to}
                    </span>
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
