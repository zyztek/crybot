import { useState } from 'react'
import { Gift, Copy, Share2, TrendingUp, Users, Crown, Star, Award, Zap, ChevronRight, ChevronDown, MessageCircle, Send, Link2, CheckCircle, X } from 'lucide-react'
import type { TranslationTexts } from '@/i18n/translations'

interface Referral {
  id: string
  username: string
  createdAt: string
  earnings?: string
}

interface ReferralViewProps {
  user: {
    referralCode: string
    totalReferrals: number
    referralEarnings: string
    level?: number
  }
  referrals?: Referral[]
  onCopy: () => void
  t: TranslationTexts
}

// Referral tier system
const referralTiers = [
  { 
    id: 1, 
    name: 'Bronze', 
    nameES: 'Bronce',
    minReferrals: 0, 
    commission: 5,
    color: 'from-amber-600 to-amber-800',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    benefits: ['5% commission', 'Basic support']
  },
  { 
    id: 2, 
    name: 'Silver', 
    nameES: 'Plata',
    minReferrals: 10, 
    commission: 10,
    color: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-400/30',
    iconColor: 'text-gray-300',
    benefits: ['10% commission', 'Priority support', 'Early access features']
  },
  { 
    id: 3, 
    name: 'Gold', 
    nameES: 'Oro',
    minReferrals: 50, 
    commission: 15,
    color: 'from-yellow-400 to-yellow-600',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
    benefits: ['15% commission', 'Priority support', 'Early access', 'Exclusive rewards']
  },
  { 
    id: 4, 
    name: 'Platinum', 
    nameES: 'Platino',
    minReferrals: 100, 
    commission: 20,
    color: 'from-purple-400 to-purple-700',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    benefits: ['20% commission', 'VIP support', 'Beta features', 'Monthly bonuses']
  },
  { 
    id: 5, 
    name: 'Diamond', 
    nameES: 'Diamante',
    minReferrals: 500, 
    commission: 30,
    color: 'from-cyan-400 to-blue-600',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    benefits: ['30% commission', 'Dedicated manager', 'Custom rewards', 'VIP events']
  },
]

const getCurrentTier = (referralCount: number) => {
  const tier = [...referralTiers].reverse().find(t => referralCount >= t.minReferrals)
  return tier || referralTiers[0]
}

const getNextTier = (referralCount: number) => {
  const currentIndex = referralTiers.findIndex(t => referralCount >= t.minReferrals)
  return currentIndex < referralTiers.length - 1 ? referralTiers[currentIndex + 1] : null
}

export default function ReferralView({ user, referrals, onCopy, t }: ReferralViewProps) {
  const [showTiers, setShowTiers] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const currentTier = getCurrentTier(user.totalReferrals)
  const nextTier = getNextTier(user.totalReferrals)
  const progressToNext = nextTier ? ((user.totalReferrals - currentTier.minReferrals) / (nextTier.minReferrals - currentTier.minReferrals)) * 100 : 100
  const isSpanish = t.lang === 'es'
  
  // Referral link and messages
  const referralLink = `https://cryptofaucet.com/register?ref=${user.referralCode}`
  const shareMessages = {
    en: `🚀 Join me on CryptoFaucet Hub and earn free crypto every day! Use my referral code: ${user.referralCode} to get started. Let's earn together! 🌟`,
    es: `🚀 Únete a CryptoFaucetHub y gana cripto gratis todos los días! Usa mi código de referido: ${user.referralCode} para comenzar. ¡Gananemos juntos! 🌟`
  }

  const shareToSocial = (platform: string) => {
    const message = isSpanish ? shareMessages.es : shareMessages.en
    const url = encodeURIComponent(referralLink)
    const text = encodeURIComponent(message)
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`
        break
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`
        break
      default:
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopiedPlatform('link')
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyMessage = async () => {
    try {
      const message = isSpanish ? shareMessages.es : shareMessages.en
      await navigator.clipboard.writeText(`${message} ${referralLink}`)
      setCopiedPlatform('message')
      setTimeout(() => setCopiedPlatform(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Use real referrals from API or fallback to mock
  const displayReferrals = referrals && referrals.length > 0 
    ? referrals 
    : [
        { id: '1', username: 'User123', createdAt: '2024-01-10', earnings: '0.00001' },
        { id: '2', username: 'CryptoFan', createdAt: '2024-01-08', earnings: '0.00002' },
        { id: '3', username: 'BTClover', createdAt: '2024-01-05', earnings: '0.00001' },
        { id: '4', username: 'EthHodler', createdAt: '2024-01-02', earnings: '0.00003' },
        { id: '5', username: 'SOLMoon', createdAt: '2023-12-28', earnings: '0.00001' },
      ]

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
          {/* Current tier badge */}
          <div className={`mb-4 p-4 rounded-xl bg-gradient-to-r ${currentTier.color} border ${currentTier.borderColor}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className={`w-8 h-8 ${currentTier.iconColor}`} />
                <div>
                  <p className="text-white font-bold text-lg">{isSpanish ? currentTier.nameES : currentTier.name}</p>
                  <p className="text-white/80 text-sm">{user.totalReferrals} referidos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-2xl">{currentTier.commission}%</p>
                <p className="text-white/70 text-xs">comisión</p>
              </div>
            </div>
            
            {nextTier && (
              <div className="mt-4">
                <div className="flex justify-between text-white/70 text-xs mb-1">
                  <span>{nextTier.minReferrals - user.totalReferrals} más para {isSpanish ? nextTier.nameES : nextTier.name}</span>
                  <span>{Math.round(progressToNext)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{t.referralTitle}</h2>
              <p className="text-purple-300">{t.referralDesc}</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
            <p className="text-purple-300 text-sm mb-2">{t.yourCode}</p>
            <div className="flex items-center gap-2">
              <span className="flex-1 text-white font-mono text-lg bg-slate-800/50 px-4 py-2 rounded-lg">
                {user.referralCode}
              </span>
              <button 
                onClick={onCopy}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {t.copyCode}
              </button>
            </div>
          </div>

          <button 
            onClick={() => setShowShareModal(true)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {t.shareLink}
          </button>

          {/* Tier comparison toggle */}
          <button
            onClick={() => setShowTiers(!showTiers)}
            className="w-full mt-4 py-2 bg-slate-800/50 text-purple-300 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-slate-700/50 transition-all"
          >
            <Award className="w-4 h-4" />
            {isSpanish ? 'Ver todos los niveles' : 'View all tiers'}
            {showTiers ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {/* Tier comparison table */}
          {showTiers && (
            <div className="mt-4 space-y-2">
              {referralTiers.map((tier) => {
                const isCurrentTier = tier.id === currentTier.id
                const isLocked = user.totalReferrals < tier.minReferrals
                return (
                  <div 
                    key={tier.id}
                    className={`p-3 rounded-lg border ${isCurrentTier ? `${tier.borderColor} bg-gradient-to-r ${tier.color}/20` : 'border-purple-500/10 bg-slate-900/30'} ${isLocked ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className={`w-5 h-5 ${tier.iconColor}`} />
                        <span className="text-white font-medium">{isSpanish ? tier.nameES : tier.name}</span>
                        {isCurrentTier && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">{isSpanish ? 'Actual' : 'Current'}</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold">{tier.commission}%</span>
                        <span className="text-purple-300 text-xs ml-1">{isSpanish ? 'comisión' : 'commission'}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tier.benefits.map((benefit, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800/50 text-purple-300 text-xs rounded">
                          {benefit}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 bg-slate-800/50 text-purple-300 text-xs rounded">
                        {tier.minReferrals}+ {isSpanish ? 'referidos' : 'referrals'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            {t.totalEarnings}
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-purple-300 text-sm">Referidos</p>
              <p className="text-3xl font-bold text-white">{user.totalReferrals}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-purple-300 text-sm">Ganado</p>
              <p className="text-3xl font-bold text-green-400">{user.referralEarnings}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              {isSpanish ? 'Últimos Referidos' : 'Recent Referrals'}
            </h4>
            {displayReferrals.slice(0, 5).map((referral) => (
              <div key={referral.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-sm">
                    {referral.username[0]}
                  </div>
                  <span className="text-white text-sm">{referral.username}</span>
                </div>
                <span className="text-green-400 text-sm">+{referral.earnings || '0.00001'} BTC</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          <div className="bg-slate-800 border border-purple-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 id="share-modal-title" className="text-xl font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                {isSpanish ? 'Compartir referidos' : 'Share Referral'}
              </h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={isSpanish ? 'Cerrar' : 'Close'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Social Media Buttons */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              <button
                onClick={() => shareToSocial('twitter')}
                className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-all group"
                aria-label="Share on Twitter"
              >
                <div className="w-10 h-10 bg-[#1DA1F2]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DA1F2]/30 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white">Twitter</span>
              </button>

              <button
                onClick={() => shareToSocial('facebook')}
                className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-all group"
                aria-label="Share on Facebook"
              >
                <div className="w-10 h-10 bg-[#1877F2]/20 rounded-full flex items-center justify-center group-hover:bg-[#1877F2]/30 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white">Facebook</span>
              </button>

              <button
                onClick={() => shareToSocial('whatsapp')}
                className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-all group"
                aria-label="Share on WhatsApp"
              >
                <div className="w-10 h-10 bg-[#25D366]/20 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/30 transition-all">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white">WhatsApp</span>
              </button>

              <button
                onClick={() => shareToSocial('telegram')}
                className="flex flex-col items-center gap-2 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-700/50 transition-all group"
                aria-label="Share on Telegram"
              >
                <div className="w-10 h-10 bg-[#0088CC]/20 rounded-full flex items-center justify-center group-hover:bg-[#0088CC]/30 transition-all">
                  <Send className="w-5 h-5 text-[#0088CC]" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white">Telegram</span>
              </button>
            </div>

            {/* Copy Options */}
            <div className="space-y-3">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-purple-300 text-sm mb-2">{isSpanish ? 'Enlace de referido' : 'Referral Link'}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-white text-sm bg-slate-800 px-3 py-2 rounded-lg truncate">
                    {referralLink}
                  </code>
                  <button 
                    onClick={copyReferralLink}
                    className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      copiedPlatform === 'link' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    {copiedPlatform === 'link' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Link2 className="w-4 h-4" />
                    )}
                    {copiedPlatform === 'link' ? (isSpanish ? 'Copiado!' : 'Copied!') : (isSpanish ? 'Copiar' : 'Copy')}
                  </button>
                </div>
              </div>

              <button
                onClick={copyMessage}
                className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  copiedPlatform === 'message'
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {copiedPlatform === 'message' ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    {isSpanish ? 'Mensaje copiado!' : 'Message copied!'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {isSpanish ? 'Copiar mensaje de invitación' : 'Copy invitation message'}
                  </>
                )}
              </button>
            </div>

            {/* Preview Message */}
            <div className="mt-4 p-3 bg-slate-900/30 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">{isSpanish ? 'Vista previa del mensaje' : 'Message preview'}</p>
              <p className="text-sm text-slate-300 italic">
                {isSpanish ? shareMessages.es : shareMessages.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}