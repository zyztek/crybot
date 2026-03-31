/**
 * Push Notifications Hook
 * 
 * React hook for managing push notifications
 */

import { useCallback, useEffect, useState } from 'react';
import { pushNotifications, type PushSubscription } from '@/services/pushNotifications';
import { useNotificationsStore } from '@/store/slices/notificationsStore';

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    pushEnabled, 
    pushPermission, 
    setPushEnabled, 
    setPushPermission,
    addNotification 
  } = useNotificationsStore();

  // Check support on mount
  useEffect(() => {
    const checkSupport = async () => {
      const permission = await pushNotifications.checkPermission();
      setIsSupported(permission !== 'denied');
      setPushPermission(permission);
      
      const subscribed = await pushNotifications.isSubscribed();
      setIsSubscribed(subscribed);
    };
    
    checkSupport();
  }, [setPushPermission]);

  // Initialize service worker
  useEffect(() => {
    pushNotifications.init();
  }, []);

  // Request permission and subscribe
  const enablePush = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const granted = await pushNotifications.requestPermission();
      if (!granted) {
        setPushPermission('denied');
        addNotification({
          type: 'error',
          title: 'Notifications Blocked',
          message: 'Please enable notifications in your browser settings.',
        });
        return false;
      }

      setPushPermission('granted');
      const subscription = await pushNotifications.subscribe();
      
      if (subscription) {
        setPushEnabled(true);
        setIsSubscribed(true);
        addNotification({
          type: 'success',
          title: 'Notifications Enabled',
          message: 'You will receive push notifications for important updates.',
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to enable push:', error);
      addNotification({
        type: 'error',
        title: 'Setup Failed',
        message: 'Failed to enable push notifications.',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setPushEnabled, setPushPermission, addNotification]);

  // Unsubscribe from push
  const disablePush = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await pushNotifications.unsubscribe();
      setPushEnabled(false);
      setIsSubscribed(false);
      addNotification({
        type: 'info',
        title: 'Notifications Disabled',
        message: 'Push notifications have been turned off.',
      });
    } catch (error) {
      console.error('Failed to disable push:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setPushEnabled, addNotification]);

  // Show local notification (for testing or in-app events)
  const showNotification = useCallback((
    title: string, 
    body: string, 
    options?: {
      icon?: string;
      tag?: string;
      data?: Record<string, unknown>;
    }
  ) => {
    pushNotifications.showNotification({
      id: `notif_${Date.now()}`,
      title,
      body,
      ...options,
    });
  }, []);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    pushEnabled,
    pushPermission,
    enablePush,
    disablePush,
    showNotification,
  };
}

export default usePushNotifications;