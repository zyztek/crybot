import { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, Globe } from 'lucide-react';

interface ScanResult {
  url: string;
  risk: 'safe' | 'suspicious' | 'dangerous';
  issues: string[];
  domainAge: string;
  reputation: number;
}

const PhishingLinkScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const scanUrl = async () => {
    if (!url) return;
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResult: ScanResult = {
      url,
      risk: url.includes('login') || url.includes('wallet') ? 'suspicious' : 'safe',
      issues: url.includes('login') ? ['Domain mimics legitimate service', 'URL contains login keyword'] : [],
      domainAge: '2 years',
      reputation: url.includes('login') ? 45 : 92,
    };
    setResult(mockResult);
    setScanning(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'text-green-400';
      case 'suspicious': return 'text-yellow-400';
      case 'dangerous': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'dangerous': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Shield className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scan..."
              className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg"
            />
          </div>
          <button
            onClick={scanUrl}
            disabled={scanning || !url}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {scanning ? <Search className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
            {scanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            {getRiskIcon(result.risk)}
            <div>
              <h3 className={`text-xl font-bold ${getRiskColor(result.risk)}`}>
                {result.risk.toUpperCase()}
              </h3>
              <p className="text-slate-400 text-sm">{result.url}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <span className="text-slate-400">Domain Age</span>
              <p className="text-white font-medium">{result.domainAge}</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <span className="text-slate-400">Reputation Score</span>
              <p className={`font-medium ${result.reputation >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                {result.reputation}/100
              </p>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2">Issues Detected</h4>
              <ul className="space-y-1">
                {result.issues.map((issue, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhishingLinkScanner;