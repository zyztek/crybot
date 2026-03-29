import { useState } from 'react'
import { Droplet, Clock, Star, ExternalLink, Check, Gift, Sparkles, Image, Lock, Unlock } from 'lucide-react'

/**
 * Props for the NFTFaucetCard component
 * @interface NFTFaucetProps
 */
interface NFTFaucetProps {
  /** Unique identifier for the NFT */
  id: string
  /** Name of the NFT */
  name: string
  /** Name of the collection the NFT belongs to */
  collection: string
  /** Emoji or image representing the NFT */
  image: string
  /** Description of the NFT */
  description: string
  /** Rarity level of the NFT */
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  /** Blockchain network where the NFT is hosted */
  chain: string
  /** Estimated value in cryptocurrency */
  price: number
  /** Cryptocurrency symbol for the price */
  currency: string
  /** Time until next claim is available */
  nextClaim: string
  /** Difficulty level to claim */
  difficulty: string
  /** Current availability status */
  status: 'available' | 'cooldown' | 'locked'
  /** Whether the NFT has been claimed */
  claimed: boolean
  /** Total number of times claimed */
  totalClaimed: number
  /** Language for internationalization */
  language: 'es' | 'en'
}

/**
 * NFTFaucetCard - A card component displaying NFT faucet information
 * @component
 * @param props - NFTFaucetProps
 * @returns React component with NFT display and claim functionality
 */
export default function NFTFaucetCard({ 
  id, name, collection, image, description, rarity, chain, price, currency, 
  nextClaim, difficulty, status, claimed, totalClaimed, language 
}: NFTFaucetProps) {
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)

  const handleClaim = async () => {
    if (status !== 'available') return
    
    setIsClaiming(true)
    // Simulate claim process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsClaiming(false)
    setClaimSuccess(true)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-500/20 text-slate-400 border-slate-400/30'
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-400/30'
      case 'epic': return 'bg-purple-500/20 text-purple-400 border-purple-400/30'
      case 'legendary': return 'bg-amber-500/20 text-amber-400 border-amber-400/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-400/30'
      case 'cooldown': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
      case 'locked': return 'bg-red-500/20 text-red-400 border-red-400/30'
    }
  }

  const text = language === 'es' ? {
    claim: 'Reclamar NFT',
    claiming: 'Reclamando...',
    claimed: 'Reclamado!',
    nextClaim: 'Próximo:', cooldown: 'Espera:', locked: 'Bloqueado',
    rarity: 'Rareza', chain: 'Cadena', price: 'Valor', totalClaimed: 'Total reclamados',
    description: 'Descripción',
    viewCollection: 'Ver colección',
    lockedMessage: 'Completa otras tareas para desbloquear',
    hours: 'horas',
    minutes: 'minutos',
  } : {
    claim: 'Claim NFT',
    claiming: 'Claiming...',
    claimed: 'Claimed!',
    nextClaim: 'Next:', cooldown: 'Cooldown:', locked: 'Locked',
    rarity: 'Rarity', chain: 'Chain', price: 'Value', totalClaimed: 'Total claimed',
    description: 'Description',
    viewCollection: 'View collection',
    lockedMessage: 'Complete other tasks to unlock',
    hours: 'hours',
    minutes: 'minutes',
  }

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
      rarity === 'legendary' 
        ? 'border-amber-500/50 hover:border-amber-400' 
        : rarity === 'epic'
        ? 'border-purple-500/50 hover:border-purple-400'
        : 'border-slate-700/50 hover:border-purple-500/50'
    }`}>
      {/* NFT Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
        {image ? (
          <span className="text-7xl">{image}</span>
        ) : (
          <Image className="w-16 h-16 text-slate-600" />
        )}
        
        {/* Rarity Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRarityColor(rarity)}`}>
            {rarity === 'legendary' ? '★' : rarity === 'epic' ? '⬡' : rarity === 'rare' ? '◆' : '●'} {rarity.toUpperCase()}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {claimed ? (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> {text.claimed}
            </span>
          ) : status === 'available' ? (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
              <Unlock className="w-3 h-3" /> Available
            </span>
          ) : status === 'cooldown' ? (
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> {nextClaim}
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> {text.locked}
            </span>
          )}
        </div>

        {/* Sparkle effect for legendary */}
        {rarity === 'legendary' && (
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-white text-lg">{name}</h3>
          <p className="text-sm text-purple-400">{collection}</p>
        </div>

        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-slate-900/50 rounded-lg p-2">
            <p className="text-slate-400">{text.chain}</p>
            <p className="text-white font-medium">{chain}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-2">
            <p className="text-slate-400">{text.price}</p>
            <p className="text-white font-medium">{price} {currency}</p>
          </div>
        </div>

        {/* Total Claimed */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <Gift className="w-4 h-4 text-purple-400" />
          <span>{totalClaimed.toLocaleString()} {text.totalClaimed}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClaim}
          disabled={status !== 'available' || isClaiming || claimed}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
            claimSuccess 
              ? 'bg-green-500 text-white'
              : status === 'available' && !claimed
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              : status === 'cooldown'
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-red-500/20 text-red-400 cursor-not-allowed'
          }`}
        >
          {isClaiming ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              {text.claiming}
            </>
          ) : claimSuccess ? (
            <>
              <Check className="w-4 h-4" />
              {text.claimed}
            </>
          ) : status === 'cooldown' ? (
            <>
              <Clock className="w-4 h-4" />
              {text.cooldown} {nextClaim}
            </>
          ) : status === 'locked' ? (
            <>
              <Lock className="w-4 h-4" />
              {text.locked}
            </>
          ) : (
            <>
              <Droplet className="w-4 h-4" />
              {text.claim}
            </>
          )}
        </button>
      </div>
    </div>
  )
}