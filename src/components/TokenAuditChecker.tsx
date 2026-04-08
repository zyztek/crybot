import { useState } from 'react';
import { FileCheck, Search, Shield, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AuditResult {
  token: string;
  audits: Array<{ name: string; status: 'verified' | 'failed' | 'pending' }>;
  score: number;
  issues: string[];
  verified: boolean;
  lastAudit: string;
}

const TokenAuditChecker: React.FC = () => {
  const [searchToken, setSearchToken] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const auditFirms = ['CertiK', 'Hacken', 'PeckShield', 'SlowMist', 'Trail of Bits'];

  const analyzeToken = async () => {
    if (!searchToken) return;
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResult: AuditResult = {
      token: searchToken,
      audits: auditFirms.map(firm => ({
        name: firm,
        status: Math.random() > 0.3 ? 'verified' : Math.random() > 0.5 ? 'pending' : 'failed'
      })),
      score: Math.floor(Math.random() * 30) + 70,
      issues: Math.random() > 0.5 ? ['Minor optimization suggestions'] : [],
      verified: Math.random() > 0.3,
      lastAudit: '2024-01-15',
    };
    setResult(mockResult);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchToken}
            onChange={(e) => setSearchToken(e.target.value)}
            placeholder="Enter token name or contract address..."
            className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg"
          />
          <button
            onClick={analyzeToken}
            disabled={analyzing}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            {analyzing ? 'Checking...' : <><FileCheck className="w-4 h-4" /> Check</>}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Security Score</p>
              <p className={`text-4xl font-bold ${result.score >= 80 ? 'text-green-400' : result.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.score}
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              {result.verified ? (
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              ) : (
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              )}
              <p className="text-slate-400 text-sm">Verified</p>
              <p className={`text-2xl font-bold ${result.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                {result.verified ? 'Yes' : 'Partial'}
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Last Audit</p>
              <p className="text-2xl font-bold text-white">{result.lastAudit}</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
            <h3 className="text-white font-semibold mb-4">Audit Reports</h3>
            <div className="space-y-2">
              {result.audits.map((audit, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <span className="text-white">{audit.name}</span>
                  {audit.status === 'verified' && <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="w-4 h-4" /> Verified</span>}
                  {audit.status === 'pending' && <span className="flex items-center gap-1 text-yellow-400 text-sm"><Clock className="w-4 h-4" /> Pending</span>}
                  {audit.status === 'failed' && <span className="flex items-center gap-1 text-red-400 text-sm"><XCircle className="w-4 h-4" /> Failed</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !analyzing && (
        <div className="text-center py-12 text-slate-400">
          <FileCheck className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Enter a token to check audit status across multiple security firms</p>
        </div>
      )}
    </div>
  );
};

export default TokenAuditChecker;