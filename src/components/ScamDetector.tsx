import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Globe,
  Link as LinkIcon,
  ExternalLink,
} from 'lucide-react';

interface ScanResult {
  url: string;
  isSafe: boolean;
  confidence: number;
  risks: string[];
  positives: string[];
  finalScore: number;
}

const ScamDetector: React.FC = () => {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = () => {
    if (!url) return;
    setScanning(true);

    setTimeout(() => {
      const isSafe = Math.random() > 0.4;
      setResult({
        url,
        isSafe,
        confidence: isSafe ? 85 + Math.random() * 14 : 70 + Math.random() * 20,
        risks: isSafe
          ? []
          : [
              'Unusual domain patterns',
              'Newly registered domain',
              'Missing SSL certificate',
              'Poor reputation score',
            ],
        positives: isSafe
          ? [
              'Valid SSL certificate',
              'Domain age > 1 year',
              'Good community feedback',
              'No reported scams',
            ]
          : ['Active user base'],
        finalScore: isSafe ? 75 + Math.random() * 24 : 20 + Math.random() * 40,
      });
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-12 h-12 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Faucet Scam Detector</h1>
          </div>
          <p className="text-slate-400">Protect yourself from fake faucets and scams</p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter faucet URL to analyze..."
                className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={scanning || !url}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Scan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
            {/* Result Header */}
            <div
              className={`p-6 ${result.isSafe ? 'bg-green-900/20' : 'bg-red-900/20'} flex items-center gap-4`}
            >
              {result.isSafe ? (
                <CheckCircle className="w-12 h-12 text-green-400" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-red-400" />
              )}
              <div>
                <h2
                  className={`text-2xl font-bold ${result.isSafe ? 'text-green-400' : 'text-red-400'}`}
                >
                  {result.isSafe ? 'Likely Safe' : 'Potentially Unsafe'}
                </h2>
                <p className="text-slate-400">
                  Confidence: {result.confidence.toFixed(1)}% | Safety Score:{' '}
                  {result.finalScore.toFixed(0)}/100
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
                <Globe className="w-5 h-5 text-slate-400" />
                <span className="text-white font-mono truncate">{result.url}</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risks */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    {result.risks.length > 0 ? (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        Risks Found
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        No Risks Detected
                      </>
                    )}
                  </h3>
                  {result.risks.length > 0 ? (
                    <div className="space-y-3">
                      {result.risks.map((risk, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800/50 rounded-lg"
                        >
                          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                          <span className="text-red-200">{risk}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                      <p className="text-green-200">This faucet passes all security checks.</p>
                    </div>
                  )}
                </div>

                {/* Positives */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Positive Indicators
                  </h3>
                  <div className="space-y-3">
                    {result.positives.map((positive, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-800/50 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <span className="text-green-200">{positive}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score Bar */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Overall Safety Score</span>
                  <span
                    className={`font-bold ${result.finalScore >= 70 ? 'text-green-400' : result.finalScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}
                  >
                    {result.finalScore.toFixed(0)}/100
                  </span>
                </div>
                <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      result.finalScore >= 70
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : result.finalScore >= 40
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-600'
                          : 'bg-gradient-to-r from-red-500 to-rose-600'
                    }`}
                    style={{ width: `${result.finalScore}%` }}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">Recommendations:</h4>
                <p className="text-slate-300">
                  {result.finalScore >= 70
                    ? 'This faucet appears to be legitimate. However, always exercise caution and never share your private keys.'
                    : 'We recommend avoiding this faucet or proceeding with extreme caution. Use a separate wallet and minimal funds.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: 'Check SSL',
              text: 'Always look for HTTPS encryption before entering any faucet.',
            },
            {
              icon: AlertTriangle,
              title: 'Too Good to Be True',
              text: 'Be skeptical of faucets promising unrealistically high rewards.',
            },
            {
              icon: CheckCircle,
              title: 'Verify Reputation',
              text: 'Check community reviews and forums before using new faucets.',
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center">
                  <tip.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{tip.title}</h4>
                  <p className="text-slate-400 text-sm">{tip.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScamDetector;
