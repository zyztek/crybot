import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Wallet } from 'lucide-react';

interface HealthCheck {
  name: string;
  status: 'good' | 'warning' | 'bad';
  message: string;
}

const WalletHealthScore: React.FC = () => {
  const [address, setAddress] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<HealthCheck[] | null>(null);

  const analyzeWallet = async () => {
    if (!address) return;
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: HealthCheck[] = [
      { name: 'Contract Interaction', status: 'good', message: 'No malicious contracts detected' },
      { name: 'Token Approval', status: 'warning', message: '3 unlimited approvals found' },
      { name: 'Nonce Gap', status: 'good', message: 'No nonce gaps detected' },
      { name: 'Multiple Sig', status: 'good', message: 'Standard wallet detected' },
      { name: 'Old Tokens', status: 'warning', message: '12 tokens not touched in 1+ year' },
    ];
    setResults(mockResults);
    setAnalyzing(false);
  };

  const score = results 
    ? (results.filter(r => r.status === 'good').length / results.length) * 100 
    : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'bad': return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address..."
            className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg"
          />
          <button
            onClick={analyzeWallet}
            disabled={analyzing || !address}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Score */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-white font-semibold">Health Score</h3>
                  <p className="text-slate-400 text-sm">Based on security checks</p>
                </div>
              </div>
              <div className={`text-4xl font-bold ${
                score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {score.toFixed(0)}/100
              </div>
            </div>
          </div>

          {/* Checks */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-white font-semibold mb-4">Security Checks</h3>
            <div className="space-y-3">
              {results.map((check, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <p className="text-white font-medium">{check.name}</p>
                      <p className="text-slate-400 text-sm">{check.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { XCircle } from 'lucide-react';
export default WalletHealthScore;