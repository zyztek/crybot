/**
 * useWebSocket Hook
 *
 * React hook for WebSocket connections with event subscriptions
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { wsClient, WSMessage, WS_EVENTS, MessageHandler } from '../services/websocket';

type WSConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

interface UseWebSocketOptions {
  autoConnect?: boolean;
  baseUrl?: string;
  events?: string[];
}

interface UseWebSocketReturn {
  isConnected: boolean;
  state: WSConnectionState;
  lastMessage: WSMessage | null;
  messages: WSMessage[];
  connect: () => void;
  disconnect: () => void;
  subscribe: (eventType: string, handler: MessageHandler) => () => void;
  send: (message: WSMessage) => void;
}

/**
 * Hook for WebSocket connection and event handling
 */
export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const { autoConnect = true, baseUrl, events = [] } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [state, setState] = useState<WSConnectionState>('disconnected');
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const [messages, setMessages] = useState<WSMessage[]>([]);
  const subscriptionsRef = useRef<Map<string, () => void>>(new Map());

  // Handle connection state changes
  useEffect(() => {
    const unsubscribe = wsClient.onStateChange((newState) => {
      setState(newState);
      setIsConnected(newState === 'connected');
    });

    return unsubscribe;
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      wsClient.connect(baseUrl);
    }

    return () => {
      // Cleanup subscriptions
      subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
      subscriptionsRef.current.clear();
    };
  }, [autoConnect, baseUrl]);

  // Subscribe to specified events
  useEffect(() => {
    if (!isConnected || events.length === 0) return;

    const unsubscribers: Array<() => void> = [];

    events.forEach(eventType => {
      const unsubscribe = wsClient.subscribe(eventType, (message) => {
        setLastMessage(message);
        setMessages(prev => [...prev.slice(-99), message]); // Keep last 100 messages
      });
      unsubscribers.push(unsubscribe);
      subscriptionsRef.current.set(eventType, unsubscribe);
    });

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [isConnected, events]);

  const connect = useCallback(() => {
    wsClient.connect(baseUrl);
  }, [baseUrl]);

  const disconnect = useCallback(() => {
    wsClient.disconnect();
  }, []);

  const subscribe = useCallback((eventType: string, handler: MessageHandler) => {
    const unsubscribe = wsClient.subscribe(eventType, handler);
    subscriptionsRef.current.set(eventType, unsubscribe);
    return unsubscribe;
  }, []);

  const send = useCallback((message: WSMessage) => {
    wsClient.send(message);
  }, []);

  return {
    isConnected,
    state,
    lastMessage,
    messages,
    connect,
    disconnect,
    subscribe,
    send,
  };
}

/**
 * Hook for subscribing to specific WebSocket events
 */
export function useWebSocketEvent(
  eventType: string,
  handler: MessageHandler,
  deps: React.DependencyList = []
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const unsubscribe = wsClient.subscribe(eventType, handlerRef.current);
    return unsubscribe;
  }, [eventType, ...deps]);
}

/**
 * Hook for real-time faucet claim notifications
 */
export function useFaucetEvents(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.FAUCET_CLAIMED, handler, []);
  useWebSocketEvent(WS_EVENTS.FAUCET_CLAIM_FAILED, handler, []);
  useWebSocketEvent(WS_EVENTS.FAUCET_STATUS_CHANGED, handler, []);
}

/**
 * Hook for real-time transaction notifications
 */
export function useTransactionEvents(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.TRANSACTION_NEW, handler, []);
  useWebSocketEvent(WS_EVENTS.TRANSACTION_CONFIRMED, handler, []);
  useWebSocketEvent(WS_EVENTS.TRANSACTION_FAILED, handler, []);
}

/**
 * Hook for real-time achievement notifications
 */
export function useAchievementEvents(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.ACHIEVEMENT_UNLOCKED, handler, []);
  useWebSocketEvent(WS_EVENTS.ACHIEVEMENT_PROGRESS, handler, []);
  useWebSocketEvent(WS_EVENTS.ACHIEVEMENT_CLAIMED, handler, []);
}

/**
 * Hook for real-time user notifications
 */
export function useUserEvents(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.USER_LEVEL_UP, handler, []);
  useWebSocketEvent(WS_EVENTS.USER_BALANCE_CHANGED, handler, []);
  useWebSocketEvent(WS_EVENTS.USER_REFERRAL_BONUS, handler, []);
}

/**
 * Hook for real-time leaderboard updates
 */
export function useLeaderboardEvents(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.LEADERBOARD_UPDATED, handler, []);
}

/**
 * Hook for real-time system notifications
 */
export function useSystemNotifications(handler: MessageHandler): void {
  useWebSocketEvent(WS_EVENTS.SYSTEM_NOTIFICATION, handler, []);
}

export default {
  useWebSocket,
  useWebSocketEvent,
  useFaucetEvents,
  useTransactionEvents,
  useAchievementEvents,
  useUserEvents,
  useLeaderboardEvents,
  useSystemNotifications,
};