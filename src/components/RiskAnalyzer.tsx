import { useState } from 'react'
import { Shield, AlertTriangle, Info, CheckCircle, XCircle, Activity, DollarSign, Clock, TrendingUp } from 'lucide-react'

export default function RiskAnalyzer() {
  const [isSpanish, setIsSpanish] = useState(true)
  
  const riskScore = 42
  const riskLevel = 'Medium'

  const riskCategories = [
    { name: 'Market Risk', score: 65, severity: 'medium', description: 'Exposure to market volatility' },
    { name: 'Liquidity Risk', score: 38, severity: 'low', description: 'Ability to sell without price impact' },
    { name: 'Smart Contract Risk', score: 25, severity: 'low', description: 'Risk of protocol vulnerabilities' },
    { name: 'Counterparty Risk', score: 55, severity: 'medium', description: 'Risk of default by counterparty' },
    { name: 'Regulatory Risk', score: 45, severity: 'medium', description: 'Risk of regulatory changes' },
  ]

  const recommendations = [
    { type: 'action', text: 'Diversify holdings across different chains to reduce smart contract risk' },
    { type: 'warning', text: 'Limit exposure to high-volatility assets to 15% of portfolio' },
    { type: 'info', text: 'Consider hedging strategies for market exposure' },
    { type: 'success', text: 'Your liquidity positions are well-balanced' },
  ]

  const text = isSpanish ? {
    title: 'Analizador de Riesgo',
    overallScore: 'Puntaje de Riesgo General',
    riskLevel: 'Nivel de Riesgo',
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
    critical: 'Crítico',
    categories: 'Categorías de Riesgo',
    recommendations: 'Recomendaciones',
    analysis: 'Análisis Detallado',
  } : {
    title: 'Risk Analyzer',
    overallScore: 'Overall Risk Score',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
    categories: 'Risk Categories',
    recommendations: 'Recommendations',
    analysis: 'Detailed Analysis',
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'green'
      case 'medium': return 'yellow'
      case 'high': return 'orange'
      case 'critical': return 'red'
      default: return 'gray'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />
      case 'medium': return <AlertTriangle className="w-4 h-4" />
      case 'high': return <XCircle className="w-4 h-4" />
      case 'critical': return <XCircle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch(type) {
      case 'action': return <Activity className="w-5 h-5 text-blue-400" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info': return <Info className="w-5 h-5 text-purple-400" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              {text.title}
            </h1>
          </div>
          <button
            onClick={() => setIsSpanish(!isSpanish)}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-all"
          >
            {isSpanish ? 'EN' : 'ES'}
          </button>
        </div>

        {/* Overall Risk Score */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{text.overallScore}</h3>
              <p className="text-slate-400">{riskLevel} {text.riskLevel}</p>
            </div>
            <div className="text-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${
                riskScore < 25 ? 'border-green-500' :
                riskScore < 50 ? 'border-yellow-500' :
                riskScore < 75 ? 'border-orange-500' : 'border-red-500'
              }`}>
                <span className="text-4xl font-bold text-white">{riskScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Categories */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            {text.categories}
          </h3>
          <div className="space-y-4">
            {riskCategories.map((category, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-semibold">{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded bg-${getSeverityColor(category.severity)}-500/20 text-${getSeverityColor(category.severity)}-400 flex items-center gap-1`}>
                    {getSeverityIcon(category.severity)}
                    {category.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3">{category.description}</p>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      category.score < 25 ? 'bg-green-500' :
                      category.score < 50 ? 'bg-yellow-500' :
                      category.score < 75 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-1">{category.score}/100</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            {text.recommendations}
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 flex gap-3 items-start">
                {getRecommendationIcon(rec.type)}
                <p className="text-slate-300">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}