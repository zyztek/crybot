import { ReactNode } from 'react'

interface NavTabProps {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}

export default function NavTab({ active, onClick, icon, children }: NavTabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 text-sm ${
        active 
          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' 
          : 'text-purple-300 hover:bg-purple-500/20'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}
