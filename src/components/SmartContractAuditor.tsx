import { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, Search, RefreshCw, Bug, Lock, Eye, ExternalLink } from 'lucide-react';

interface AuditResult {
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  finding: string;
  description: string;
  recommendation: string;
}

interface ContractAudit {
  contractName: string;
  address: string;
  auditDate: string;
  auditor: string;
  status: 'completed' | 'in_progress' | 'failed';
  score: number;
  findings: AuditResult[];
}

const AUDIT_RESULTS: AuditResult[] = [
  {
    category: 'Security',
    severity: 'critical',
    finding: 'Reentrancy Vulnerability',
    description: 'External calls made before state changes in withdraw() function',
    recommendation: 'Implement checks-effects-interactions pattern'
  },
  {
    category: 'Gas Optimization',
    severity: 'medium',
    finding: 'Unnecessary Storage Operations',
    description: 'Multiple storage reads can be combined into a single reading',
    recommendation: 'Use memory variables for caching'
  },
  {
    category: 'Access Control',
    severity: 'high',
    finding: 'Inconsistent Admin Privileges',
    description: 'Some admin functions lack proper access control checks',
    recommendation: 'Add onlyOwner modifiers to all privileged functions'
  },
];

const CONTRACTS: ContractAudit[] = [
  {
    contractName: 'DeFiVault v2',
    address: '0x8F7a2B1c...3D4e5F6a',
    auditDate: '2024-01-15',
    auditor: 'Certik',
    status: 'completed',
    score: 92,
    findings: AUDIT_RESULTS
  },
];

export default function SmartContractAuditor() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [contractAddress, setContractAddress] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const texts = {
    es: {
      title: 'Auditor de Smart Contracts',
      subtitle: 'Analiza contratos inteligentes en busca de vulnerabilidades de seguridad',
      scanContract: 'Escanear Contrato',
      enterAddress: 'Ingresar dirección del contrato',
      auditReport: 'Reporte de Auditoría',
      contractAddress: 'Dirección del Contrato',
      auditDate: 'Fecha de Auditoría',
      auditor: 'Auditor',
      score: 'Puntuación',
      findings: 'Hallazgos',
      critical: 'Crítico',
      high: 'Alto',
      medium: 'Medio',
      low: 'Bajo',
      info: 'Info',
      severity: 'Severidad',
      category: 'Categoría',
      description: 'Descripción',
      recommendation: 'Recomendación',
      scan: 'Escanear',
      startAudit: 'Iniciar Auditoría',
      securityCheck: 'Verificación de Seguridad',
      gasOptimization: 'Optimización de Gas',
      accessControl: 'Control de Acceso',
      bestPractices: 'Mejores Prácticas',
      overallScore: 'Puntuación General',
    },
    en: {
      title: 'Smart Contract Auditor',
      subtitle: 'Analyze smart contracts for security vulnerabilities',
      scanContract: 'Scan Contract',
      enterAddress: 'Enter contract address',
      auditReport: 'Audit Report',
      contractAddress: 'Contract Address',
      auditDate: 'Audit Date',
      auditor: 'Auditor',
      score: 'Score',
      findings: 'Findings',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      info: 'Info',
      severity: 'Severity',
      category: 'Category',
      description: 'Description',
      recommendation: 'Recommendation',
      scan: 'Scan',
      startAudit: 'Start Audit',
      securityCheck: 'Security Check',
      gasOptimization: 'Gas Optimization',
      accessControl: 'Access Control',
      bestPractices: 'Best Practices',
      overallScore: 'Overall Score',
    },
  };

  const t = texts[language];

  const handleScan = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'medium': return <Eye className="w-5 h-5" />;
      case 'low': return <Eye className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-400 to-purple-500 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        {/* Language */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition"
          >
            {language === 'es' ? '🇺🇸 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Scanner */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder={t.enterAddress}
                className="w-full bg-slate-700/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white font-mono focus:outline-none focus:border-red-500 transition"
              />
            </div>
            <button
              onClick={handleScan}
              disabled={analyzing || !contractAddress}
              className="px-8 py-4 bg-gradient-to-r from-red-400 to-purple-500 text-white font-bold rounded-xl hover:scale-[1.02] transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {analyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
              {analyzing ? 'Scanning...' : t.scan}
            </button>
          </div>
        </div>

        {/* Audit Results */}
        {CONTRACTS.map((contract, idx) => (
          <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6">
            {/* Contract Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{contract.contractName}</h3>
                <p className="text-gray-400 font-mono">{contract.address}</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{t.auditDate}</p>
                  <p className="text-white font-bold">{contract.auditDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{t.auditor}</p>
                  <p className="text-white font-bold">{contract.auditor}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">{t.score}</p>
                  <div className={`flex items-center gap-2 ${contract.score >= 90 ? 'text-green-400' : contract.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-2xl font-bold">{contract.score}/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Visual */}
            <div className="bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-red-500/20 rounded-2xl p-4 mb-6 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 w-1 bg-white" style={{ left: `${contract.score}%` }} />
              <div className="flex justify-between text-sm text-gray-300">
                <span>0</span>
                <span className="font-bold">{t.overallScore}: {contract.score}</span>
                <span>100</span>
              </div>
            </div>

            {/* Findings */}
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-400" />
              {t.findings} ({contract.findings.length})
            </h3>

            <div className="space-y-4">
              {contract.findings.map((finding, fidx) => (
                <div
                  key={fidx}
                  className={`bg-gradient-to-br ${getSeverityColor(finding.severity)}/20 backdrop-blur-lg rounded-2xl p-6 border ${getSeverityColor(finding.severity)}/30`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-br ${getSeverityColor(finding.severity)} rounded-lg`}>
                        {getSeverityIcon(finding.severity)}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{finding.finding}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${getSeverityColor(finding.severity)} text-white`}>
                          {t[finding.severity as keyof typeof t]}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-gray-300 text-sm">{finding.category}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{t.description}</p>
                      <p className="text-white">{finding.description}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{t.recommendation}</p>
                      <p className="text-green-400">{finding.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Security Tips */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-bold text-white">{t.securityCheck}</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-1" />
                <span>Reentrancy vulnerabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-1" />
                <span>Integer overflow/underflow</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-1" />
                <span>Access control issues</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">{t.gasOptimization}</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-1" />
                <span>Storage vs memory usage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-1" />
                <span>Loop optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-1" />
                <span>Unused variables</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-white">{t.bestPractices}</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <span>Naming conventions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <span>Code documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                <span>Event emission</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}