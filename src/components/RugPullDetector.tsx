import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, TrendingDown, Clock, Users } from 'lucide-react';

interface TokenAnalysis {
  address: string;
  name: string;
  symbol: string;
  score: number;
  risk: 'low' | 'medium' | 'high' | 'critical';
  issues: string[];
  holders: number;
  age: string;
  liquidity: string;
}

const RugPullDetector: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<TokenAnalysis | null>(null);

  const analyzeToken = async () => {
    if (!searchAddress) return;
    
    setAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: TokenAnalysis = {
      address: searchAddress,
      name: 'Sample Token',
      symbol: 'SAMPLE',
      score: Math.floor(Math.random() * 40) + 60,
      risk: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      issues: [
        'No audit detected',
        'Low holder concentration warning',
        'New contract (less than 30 days)',
      ],
      holders: Math.floor(Math.random() * 5000) + 100,
      age: '15 days',
      liquidity: '$125K',
    };
    
    setResult(mockResult);
    setAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            placeholder="Enter token contract address..."
            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg"
          />
          <button
            onClick={analyzeToken}
            disabled={analyzing || !searchAddress}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            {analyzing ? (
              <>Analyzing...</>
            ) : (
              <><Search className="w-4 h-4" /> Analyze</>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Score Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Trust Score</p>
              <p className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}/100
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <AlertTriangle className={`w-12 h-12 mx-auto mb-3 ${getRiskColor(result.risk)}`} />
              <p className="text-slate-400 text-sm">Risk Level</p>
              <p className={`text-2xl font-bold uppercase ${getRiskColor(result.risk)}`}>
                {result.risk}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Holders</p>
              <p className="text-2xl font-bold text-white">{result.holders.toLocaleString()}</p>
            </div>
          </div>

          {/* Token Info */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <h3 className="text-white font-semibold mb-4">Token Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Name</p>
                <p className="text-white">{result.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Symbol</p>
                <p className="text-white">{result.symbol}</p>
              </div>
              <div>
                <p className="text-slate-400">Age</p>
                <p className="text-white">{result.age}</p>
              </div>
              <div>
                <p className="text-slate-400">Liquidity</p>
                <p className="text-white">{result.liquidity}</p>
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Risk Factors
            </h3>
            <div className="space-y-2">
              {result.issues.map((issue, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                  <XCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !analyzing && (
        <div className="text-center py-12 text-slate-400">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter a token address to analyze for potential rug pull risks</p>
        </div>
      )}
    </div>
  );
};

export default RugPullDetector;