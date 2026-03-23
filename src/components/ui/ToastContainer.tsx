import { useToastStore, type ToastType } from '@/hooks/useToast'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />
}

const bgMap: Record<ToastType, string> = {
  success: 'bg-green-500/20 border-green-500/30',
  error: 'bg-red-500/20 border-red-500/30',
  warning: 'bg-yellow-500/20 border-yellow-500/30',
  info: 'bg-blue-500/20 border-blue-500/30'
}

const textMap: Record<ToastType, string> = {
  success: 'text-green-300',
  error: 'text-red-300',
  warning: 'text-yellow-300',
  info: 'text-blue-300'
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()
  
  if (toasts.length === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg animate-in slide-in-from-right duration-300 ${bgMap[toast.type]}`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {iconMap[toast.type]}
          </div>
          <p className={`flex-1 text-sm ${textMap[toast.type]}`}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-purple-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}