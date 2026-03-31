import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
} from 'lucide-react';

interface AuditIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  recommendation: string;
  affectedAddresses: string[];
}

interface Permission {
  dapp: string;
  allowance: string;
  spender: string;
  lastUsed: string;
}

export default function WalletAudit() {
  const [walletAddress, setWalletAddress] = useState('0x7a2...f4e9');
  const [isAuditing, setIsAuditing] = useState(false);
  const [showFullAudit, setShowFullAudit] = useState(false);

  const [auditResults, setAuditResults] = useState({
    overallScore: 72,
    riskLevel: 'medium' as 'critical' | 'high' | 'medium' | 'low' | 'safe',
    issues: [
      {
        severity: 'high' as const,
        category: 'Permissions',
        title: 'Large Unlimited Allowance',
        description:
          'Your wallet has an unlimited allowance to Uniswap V3 Router. Consider limiting the amount.',
        recommendation: 'Revoke excessive allowances on sites like Revoke.cash',
        affectedAddresses: ['0x68b3...C1a6'],
      },
      {
        severity: 'medium' as const,
        category: 'Smart Contract',
        title: 'Old Smart Contract Balance',
        description: 'You have funds locked in a smart contract that may be compromised.',
        recommendation: 'Review and withdraw funds from old contract addresses',
        affectedAddresses: ['0x3d1...Bc2e'],
      },
      {
        severity: 'low' as const,
        category: 'Gas Optimization',
        title: 'Multiple Small Transactions',
        description: 'Multiple small transactions could be batched for better gas efficiency.',
        recommendation: 'Use batch transactions when possible',
        affectedAddresses: [],
      },
    ] as AuditIssue[],
    permissions: [
      {
        dapp: 'Uniswap V3',
        allowance: 'Unlimited',
        spender: '0x68b3...C1a6',
        lastUsed: '2 days ago',
      },
      { dapp: 'Aave V3', allowance: '1,000 USDC', spender: '0x3a2...D4f1', lastUsed: '1 week ago' },
      { dapp: 'OpenSea', allowance: 'Limited', spender: '0x7b1...A8e3', lastUsed: '3 days ago' },
    ] as Permission[],
  });

  const scanWallet = () => {
    setIsAuditing(true);
    setTimeout(() => setIsAuditing(false), 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-400" />
              Wallet Security Audit
            </h1>
            <p className="text-gray-400">
              Analyze your wallet for security risks and vulnerabilities
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-2 text-red-400 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {
                auditResults.issues.filter(i => i.severity === 'critical' || i.severity === 'high')
                  .length
              }{' '}
              High Risk
            </div>
            <div className="bg-orange-500/20 border border-orange-500/50 rounded-xl px-4 py-2 text-orange-400 font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Score: {auditResults.overallScore}/100
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Input */}
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={walletAddress}
              onChange={e => setWalletAddress(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white font-semibold outline-none focus:border-red-500"
              placeholder="Enter wallet address"
            />
          </div>
          <button
            onClick={scanWallet}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-6 py-4 rounded-xl transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isAuditing ? 'animate-spin' : ''}`} />
            {isAuditing ? 'Scanning...' : 'Audit Wallet'}
          </button>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className={`bg-gradient-to-br ${auditResults.riskLevel === 'critical' ? 'from-red-600/20 to-red-900/20 border-red-500/30' : auditResults.riskLevel === 'high' ? 'from-orange-600/20 to-red-600/20 border-orange-500/30' : auditResults.riskLevel === 'medium' ? 'from-yellow-600/20 to-orange-600/20 border-yellow-500/30' : 'from-green-600/20 to-teal-600/20 border-green-500/30'} backdrop-blur-xl rounded-2xl border p-6`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Security Score</span>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="text-4xl font-bold text-white">{auditResults.overallScore}</div>
          <div
            className={`text-lg mt-2 capitalize ${auditResults.riskLevel === 'critical' || auditResults.riskLevel === 'high' ? 'text-red-400' : auditResults.riskLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}
          >
            {auditResults.riskLevel} Risk
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Critical Issues</span>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {auditResults.issues.filter(i => i.severity === 'critical').length}
          </div>
          <div className="text-red-400 text-sm mt-2">Needs immediate attention</div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Warnings</span>
            <AlertTriangle className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {
              auditResults.issues.filter(i => i.severity === 'high' || i.severity === 'medium')
                .length
            }
          </div>
          <div className="text-orange-400 text-sm mt-2">Should review</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 font-medium">Active Permissions</span>
            <Eye className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{auditResults.permissions.length}</div>
          <div className="text-blue-400 text-sm mt-2">Dapp approvals</div>
        </div>
      </div>

      {/* Issues */}
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Security Issues Found</h2>
          <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
            {showFullAudit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showFullAudit ? 'Hide' : 'Show All'}
          </button>
        </div>

        <div className="space-y-4">
          {auditResults.issues.map((issue, idx) => (
            <div key={idx} className={`rounded-xl p-5 border ${getSeverityColor(issue.severity)}`}>
              <div className="flex items-start gap-4">
                <div className="mt-1">{getSeverityIcon(issue.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}
                    >
                      {issue.severity.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">{issue.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{issue.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{issue.description}</p>
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-gray-400 text-xs mb-1">Recommendation</div>
                    <div className="text-white text-sm">{issue.recommendation}</div>
                  </div>
                  {issue.affectedAddresses.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {issue.affectedAddresses.map((addr, i) => (
                        <span
                          key={i}
                          className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-400 font-mono"
                        >
                          {addr}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Active DApp Permissions</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-700">
                <th className="pb-4 pr-4">DApp</th>
                <th className="pb-4 pr-4">Allowance</th>
                <th className="pb-4 pr-4">Spender Address</th>
                <th className="pb-4 pr-4">Last Used</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {auditResults.permissions.map((perm, idx) => (
                <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                  <td className="py-4 pr-4">
                    <div className="font-semibold">{perm.dapp}</div>
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={
                        perm.allowance === 'Unlimited' ? 'text-red-400 font-semibold' : 'text-white'
                      }
                    >
                      {perm.allowance}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="font-mono text-sm text-gray-400">{perm.spender}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-white">{perm.lastUsed}</span>
                  </td>
                  <td className="py-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Security Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Use Hardware Wallet
            </div>
            <p className="text-gray-400 text-sm">
              Store large amounts in hardware wallets like Ledger or Trezor for maximum security.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Regularly Revoke Permissions
            </div>
            <p className="text-gray-400 text-sm">
              Review and revoke unnecessary dapp permissions periodically.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Verify URLs
            </div>
            <p className="text-gray-400 text-sm">
              Always double-check URLs before connecting your wallet. Use official links.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Enable 2FA
            </div>
            <p className="text-gray-400 text-sm">
              Enable two-factor authentication wherever possible for added protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
