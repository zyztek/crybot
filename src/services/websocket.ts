/**
 * WebSocket Client Service
 *
 * WebSocket client with auto-reconnection and event handling
 * Connects to the backend WebSocket endpoint
 */

import { getToken } from './api';

const WS_ENDPOINT = '/ws';
const RECONNECT_INTERVAL = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;

export interface WSMessage {
  type: string;
  data?: unknown;
  timestamp?: number;
}

export type MessageHandler = (message: WSMessage) => void;

// Event types from backend
export const WS_EVENTS = {
  FAUCET_CLAIMED: 'faucet:claimed',
  FAUCET_CLAIM_FAILED: 'faucet:claim_failed',
  FAUCET_STATUS_CHANGED: 'faucet:status_changed',
  TRANSACTION_NEW: 'transaction:new',
  TRANSACTION_CONFIRMED: 'transaction:confirmed',
  TRANSACTION_FAILED: 'transaction:failed',
  ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
  ACHIEVEMENT_PROGRESS: 'achievement:progress',
  ACHIEVEMENT_CLAIMED: 'achievement:claimed',
  USER_LEVEL_UP: 'user:level_up',
  USER_BALANCE_CHANGED: 'user:balance_changed',
  USER_REFERRAL_BONUS: 'user:referral_bonus',
  LEADERBOARD_UPDATED: 'leaderboard:updated',
  SYSTEM_NOTIFICATION: 'system:notification',
  PING: 'ping',
  PONG: 'pong',
} as const;

type WSConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string = '';
  private handlers: Map<string, Set<MessageHandler>> = new Map();
  private reconnectAttempts: number = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private state: WSConnectionState = 'disconnected';
  private stateListeners: Set<(state: WSConnectionState) => void> = new Set();
  private messageQueue: WSMessage[] = [];

  /**
   * Connect to WebSocket server
   */
  connect(baseUrl?: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    // Build WebSocket URL
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = baseUrl || `${protocol}//${window.location.host}`;
    const token = getToken();
    const wsUrl = token ? `${host}${WS_ENDPOINT}?token=${token}` : `${host}${WS_ENDPOINT}`;

    this.url = wsUrl;
    this.setState('connecting');

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.setState('disconnected');
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.reconnectAttempts = 0;

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.setState('disconnected');
  }

  /**
   * Send a message through WebSocket
   */
  send(message: WSMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for when connection is established
      this.messageQueue.push(message);
    }
  }

  /**
   * Subscribe to specific event type
   */
  subscribe(eventType: string, handler: MessageHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);

    // Send subscription to server if connected
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'subscribe', data: eventType }));
    }

    // Return unsubscribe function
    return () => {
      this.handlers.get(eventType)?.delete(handler);
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'unsubscribe', data: eventType }));
      }
    };
  }

  /**
   * Subscribe to all events (wildcard)
   */
  onAny(handler: MessageHandler): () => void {
    return this.subscribe('*', handler);
  }

  /**
   * Listen to connection state changes
   */
  onStateChange(listener: (state: WSConnectionState) => void): () => void {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }

  /**
   * Get current connection state
   */
  getState(): WSConnectionState {
    return this.state;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.state === 'connected';
  }

  private setState(state: WSConnectionState): void {
    this.state = state;
    this.stateListeners.forEach(listener => listener(state));
  }

  private handleOpen(): void {
    console.log('WebSocket connected');
    this.reconnectAttempts = 0;
    this.setState('connected');

    // Send queued messages
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }

  private handleClose(): void {
    console.log('WebSocket closed');
    this.setState('disconnected');
    this.scheduleReconnect();
  }

  private handleError(error: Event): void {
    console.error('WebSocket error:', error);
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: WSMessage = JSON.parse(event.data);

      // Notify specific handlers
      const handlers = this.handlers.get(message.type);
      if (handlers) {
        handlers.forEach(handler => handler(message));
      }

      // Notify wildcard handlers
      const wildcardHandlers = this.handlers.get('*');
      if (wildcardHandlers) {
        wildcardHandlers.forEach(handler => handler(message));
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.log('Max reconnection attempts reached');
      this.setState('disconnected');
      return;
    }

    this.reconnectAttempts++;
    this.setState('reconnecting');

    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);

    this.reconnectTimer = setTimeout(() => {
      this.connect(this.url);
    }, RECONNECT_INTERVAL);
  }
}

// Singleton instance
export const wsClient = new WebSocketClient();

export default wsClient;