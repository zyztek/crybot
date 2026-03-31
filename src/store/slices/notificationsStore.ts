/**
 * Notifications Store
 * 
 * Manages in-app notifications and push notification preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationsState {
  // In-app notifications
  notifications: AppNotification[];
  unreadCount: number;
  
  // Push notification settings
  pushEnabled: boolean;
  pushPermission: NotificationPermission | 'unsupported';
  
  // Actions
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  
  // Push notification actions
  setPushEnabled: (enabled: boolean) => void;
  setPushPermission: (permission: NotificationPermission | 'unsupported') => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      pushEnabled: false,
      pushPermission: 'default',

      addNotification: (notification) => {
        const newNotification: AppNotification = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
          read: false,
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep max 50
          unreadCount: state.unreadCount + 1,
        }));
      },

      markAsRead: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.read) return state;

          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },

      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      setPushEnabled: (enabled) => {
        set({ pushEnabled: enabled });
      },

      setPushPermission: (permission) => {
        set({ pushPermission: permission });
      },
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({
        pushEnabled: state.pushEnabled,
      }),
    }
  )
);

export default useNotificationsStore;