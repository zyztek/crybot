import { ReactNode } from 'react'

interface NavTabProps {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
  ariaLabel?: string
}

export default function NavTab({ active, onClick, icon, children, ariaLabel }: NavTabProps) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-label={ariaLabel}
      tabIndex={active ? 0 : -1}
      className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2 text-sm ${
        active 
          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' 
          : 'text-purple-300 hover:bg-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </button>
  )
}
