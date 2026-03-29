import { useState } from 'react'
import { Network, Zap, ExternalLink, CheckCircle, Copy, Wallet } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'

/**
 * Props for TestnetView component
 * @interface TestnetViewProps
 */
interface TestnetViewProps {
  t: TranslationTexts
  language: 'es' | 'en'
}

// Testnet configurations
const testnets = [
  {
    id: 'polygon-mumbai',
    name: 'Polygon Mumbai',
    nameES: 'Polygon Mumbai',
    chain: 'MATIC',
    network: 'mumbai',
    color: 'from-purple-500 to-purple-700',
    borderColor: 'border-purple-500/30',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    explorer: 'https://mumbai.polygonscan.com',
    faucetUrl: 'https://faucet.polygon.technology/',
    faucetUrlES: 'https://faucet.polygon.technology/',
    description: 'Polygon testnet for development',
    descriptionES: 'Testnet de Polygon para desarrollo',
  },
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia',
    nameES: 'Arbitrum Sepolia',
    chain: 'ETH',
    network: 'sepolia',
    color: 'from-blue-500 to-blue-700',
    borderColor: 'border-blue-500/30',
    rpcUrl: 'https://sepolia.arbitrum.io/rpc',
    explorer: 'https://sepolia.arbiscan.io',
    faucetUrl: 'https://faucet.arbitrum.io/',
    faucetUrlES: 'https://faucet.arbitrum.io/',
    description: 'Arbitrum L2 testnet',
    descriptionES: 'Testnet L2 de Arbitrum',
  },
  {
    id: 'optimism-sepolia',
    name: 'Optimism Sepolia',
    nameES: 'Optimism Sepolia',
    chain: 'ETH',
    network: 'sepolia',
    color: 'from-red-500 to-red-700',
    borderColor: 'border-red-500/30',
    rpcUrl: 'https://sepolia.optimism.io',
    explorer: 'https://sepolia-optimism.etherscan.io',
    faucetUrl: 'https://faucet.optimism.io/',
    faucetUrlES: 'https://faucet.optimism.io/',
    description: 'Optimism L2 testnet',
    descriptionES: 'Testnet L2 de Optimism',
  },
  {
    id: 'avalanche-fuji',
    name: 'Avalanche Fuji',
    nameES: 'Avalanche Fuji',
    chain: 'AVAX',
    network: 'fuji',
    color: 'from-orange-500 to-orange-700',
    borderColor: 'border-orange-500/30',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorer: 'https://testnet.snowtrace.io',
    faucetUrl: 'https://faucet.avax.network/',
    faucetUrlES: 'https://faucet.avax.network/',
    description: 'Avalanche C-Chain testnet',
    descriptionES: 'Testnet C-Chain de Avalanche',
  },
  {
    id: 'bsc-testnet',
    name: 'BNB Chain Testnet',
    nameES: 'BNB Chain Testnet',
    chain: 'BNB',
    network: 'testnet',
    color: 'from-yellow-500 to-yellow-700',
    borderColor: 'border-yellow-500/30',
    rpcUrl: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    explorer: 'https://testnet.bscscan.com',
    faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
    faucetUrlES: 'https://testnet.bnbchain.org/faucet-smart',
    description: 'BNB Smart Chain testnet',
    descriptionES: 'Testnet de BNB Smart Chain',
  },
]

/**
 * TestnetView - Component displaying available testnet networks
 * @component
 * @param props - TestnetViewProps with language and translations
 * @returns Cards showing testnet info, RPC URLs, faucets, and setup guide
 */
export default function TestnetView({ t, language }: TestnetViewProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const isSpanish = language === 'es'

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isSpanish ? 'Testnets Disponibles' : 'Available Testnets'}
            </h2>
            <p className="text-purple-300">
              {isSpanish 
                ? 'Redes de prueba para desarrollo y pruebas' 
                : 'Test networks for development and testing'}
            </p>
          </div>
        </div>
      </div>

      {/* Testnet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testnets.map((testnet) => (
          <div
            key={testnet.id}
            className={`bg-slate-800/50 border ${testnet.borderColor} rounded-xl p-5 backdrop-blur-sm hover:border-purple-500/50 transition-all`}
          >
            {/* Testnet Header */}
            <div className={`w-full h-1 ${testnet.color} rounded-full mb-4`} />
            
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-lg">
                {isSpanish ? testnet.nameES : testnet.name}
              </h3>
              <span className={`px-2 py-1 bg-slate-700 rounded text-xs text-purple-300`}>
                {testnet.chain}
              </span>
            </div>
            
            <p className="text-purple-300 text-sm mb-4">
              {isSpanish ? testnet.descriptionES : testnet.description}
            </p>

            {/* RPC URL */}
            <div className="mb-3">
              <label className="text-purple-400 text-xs block mb-1">RPC</label>
              <div className="flex items-center gap-2 bg-slate-900/50 rounded p-2">
                <code className="text-white text-xs flex-1 truncate">{testnet.rpcUrl}</code>
                <button
                  onClick={() => copyToClipboard(testnet.rpcUrl, `rpc-${testnet.id}`)}
                  className="p-1 text-purple-400 hover:text-white transition-colors"
                  aria-label={isSpanish ? 'Copiar RPC' : 'Copy RPC'}
                >
                  {copiedField === `rpc-${testnet.id}` ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <a
                href={isSpanish ? testnet.faucetUrlES : testnet.faucetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-2 ${testnet.color} text-white rounded-lg font-medium text-sm text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                <Zap className="w-4 h-4" />
                {isSpanish ? 'Faucet' : 'Faucet'}
              </a>
              <a
                href={testnet.explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-700 text-purple-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Setup Guide */}
      <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-purple-400" />
          {isSpanish ? 'Guía de Configuración Rápida' : 'Quick Setup Guide'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="text-white font-medium">
                {isSpanish ? 'Añadir Red a MetaMask' : 'Add Network to MetaMask'}
              </h4>
              <p className="text-purple-300 text-sm">
                {isSpanish 
                  ? 'Copia el RPC URL y añádelo manualmente en MetaMask' 
                  : 'Copy the RPC URL and add it manually in MetaMask'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="text-white font-medium">
                {isSpanish ? 'Obtener Tokens de Prueba' : 'Get Test Tokens'}
              </h4>
              <p className="text-purple-300 text-sm">
                {isSpanish 
                  ? 'Usa el botón Faucet para obtener tokens de prueba' 
                  : 'Use the Faucet button to get test tokens'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-300 font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="text-white font-medium">
                {isSpanish ? 'Conectar a la DApp' : 'Connect to DApp'}
              </h4>
              <p className="text-purple-300 text-sm">
                {isSpanish 
                  ? 'Cambia a la red de prueba en tu wallet' 
                  : 'Switch to the test network in your wallet'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}