import { History, CheckCircle, Clock, BarChart3, Award, Rocket } from 'lucide-react'
import type { ClaimHistory, Achievement } from '@/types'
import type { TranslationTexts } from '@/i18n/translations'

interface DashboardViewProps {
  history: ClaimHistory[]
  achievements: Achievement[]
  t: TranslationTexts
  language: 'es' | 'en'
}

export default function DashboardView({ history, achievements, t, language }: DashboardViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            {t.history}
          </h3>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item: ClaimHistory) => (
                <div key={item.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{item.faucet}</p>
                      <p className="text-purple-300 text-xs">{item.date} • {item.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-sm">+{item.amount}</p>
                    <p className="text-purple-300 text-xs">{item.coin}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-purple-500/30 mx-auto mb-3" />
              <p className="text-purple-300 text-sm">No claims yet!</p>
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            {language === 'es' ? 'Estadísticas Semanales' : 'Weekly Stats'}
          </h3>
          <div className="space-y-3">
            {[
              { coin: 'Bitcoin', icon: '₿', amount: '0.00023456' },
              { coin: 'Ethereum', icon: 'Ξ', amount: '0.012345' },
              { coin: 'Dogecoin', icon: 'Ð', amount: '45.6789' },
              { coin: 'Solana', icon: '◎', amount: '2.4567' },
            ].map((item, i: number) => (
              <div key={item.coin} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-300 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center text-xs">{item.icon}</span>
                    {item.coin}
                  </span>
                  <span className="text-white">{item.amount}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${70 - i * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            {t.achievementsTitle}
          </h3>
          <div className="space-y-3">
            {achievements.slice(0, 4).map((achievement: Achievement) => (
              <div key={achievement.id} className={`flex items-center gap-3 p-2 rounded-lg ${achievement.unlocked ? 'bg-green-500/10' : 'bg-slate-900/50'}`}>
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{achievement.title}</p>
                  <p className="text-purple-300 text-xs">{achievement.progress}/{achievement.total}</p>
                </div>
                {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-purple-400" />
            💡 {language === 'es' ? 'Pro Tip' : 'Consejo Pro'}
          </h3>
          <p className="text-purple-200 text-sm">
            {language === 'es' 
              ? 'Establece una rutina diaria para reclamar de múltiples faucets y maximiza tus gananzas.'
              : 'Set up a daily routine to claim from multiple faucets and maximize your earnings.'}
          </p>
        </div>
      </div>
    </div>
  )
}
