import { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string | undefined
  color: string
  borderColor: string
  iconColor: string
  iconBg: string
}

export default function StatCard({ icon, title, value, color, borderColor, iconColor, iconBg }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-r ${color} border ${borderColor} rounded-xl p-4 backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div>
          <p className="text-purple-300 text-xs">{title}</p>
          <p className="text-lg font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}
