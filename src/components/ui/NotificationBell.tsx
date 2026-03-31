import { useState, useRef, useEffect } from 'react';
import { useNotificationsStore, type AppNotification } from '@/store/slices/notificationsStore';
import { Bell, BellOff, Check, X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { clsx } from 'clsx';

const typeConfig = {
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
  error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/20' },
};

function NotificationItem({ 
  notification, 
  onMarkRead, 
  onRemove 
}: { 
  notification: AppNotification; 
  onMarkRead: () => void;
  onRemove: () => void;
}) {
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <div 
      className={clsx(
        'flex items-start gap-3 p-3 rounded-lg border transition-all',
        notification.read 
          ? 'bg-white/5 border-white/10 opacity-60' 
          : 'bg-white/10 border-white/20',
        config.bg
      )}
    >
      <Icon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', config.color)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{notification.title}</p>
        <p className="text-xs text-gray-400 line-clamp-2">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(notification.timestamp).toLocaleTimeString()}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {!notification.read && (
          <button
            onClick={onMarkRead}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Mark as read"
          >
            <Check className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button
          onClick={onRemove}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Remove"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    clearAll 
  } = useNotificationsStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <Bell className="w-5 h-5 text-white" />
        ) : (
          <BellOff className="w-5 h-5 text-gray-400" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <h3 className="font-semibold text-white">Notifications</h3>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Mark all read
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-400 hover:text-gray-300"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {notifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkRead={() => markAsRead(notification.id)}
                    onRemove={() => removeNotification(notification.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}