/**
 * WebSocket Event Emitter
 *
 * Central event bus for real-time WebSocket notifications
 * Used to broadcast events from routes to connected WebSocket clients
 */

import type { WebSocketServer } from 'ws';

interface WSEvent {
  type: string;
  data: unknown;
  timestamp: number;
}

// Global event emitter for WebSocket events
type EventCallback = (event: WSEvent) => void;

class WebSocketEventEmitter {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private wss: WebSocketServer | null = null;

  setServer(wss: WebSocketServer) {
    this.wss = wss;
  }

  // Subscribe to specific event type
  on(eventType: string, callback: EventCallback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);
  }

  // Unsubscribe from event type
  off(eventType: string, callback: EventCallback) {
    this.listeners.get(eventType)?.delete(callback);
  }

  // Emit event to all subscribers and broadcast via WebSocket
  emit(eventType: string, data: unknown) {
    const event: WSEvent = {
      type: eventType,
      data,
      timestamp: Date.now(),
    };

    // Notify local listeners
    this.listeners.get(eventType)?.forEach(callback => callback(event));
    this.listeners.get('*')?.forEach(callback => callback(event));

    // Broadcast to all connected WebSocket clients
    if (this.wss) {
      this.wss.clients.forEach(client => {
        if (client.readyState === 1) { // WebSocket.OPEN
          client.send(JSON.stringify(event));
        }
      });
    }
  }

  // Broadcast to all clients (including unauthenticated)
  broadcast(eventType: string, data: unknown) {
    this.emit(eventType, data);
  }

  // Send to specific user
  sendToUser(wss: WebSocketServer, userId: string, eventType: string, data: unknown) {
    const event: WSEvent = {
      type: eventType,
      data,
      timestamp: Date.now(),
    };

    wss.clients.forEach(client => {
      const authWs = client as unknown as { userId?: string };
      if (authWs.userId === userId && client.readyState === 1) {
        client.send(JSON.stringify(event));
      }
    });
  }
}

// Singleton instance
export const wsEvents = new WebSocketEventEmitter();

// Predefined event types for type safety
export const WS_EVENTS = {
  // Faucet events
  FAUCET_CLAIMED: 'faucet:claimed',
  FAUCET_CLAIM_FAILED: 'faucet:claim_failed',
  FAUCET_STATUS_CHANGED: 'faucet:status_changed',

  // Transaction events
  TRANSACTION_NEW: 'transaction:new',
  TRANSACTION_CONFIRMED: 'transaction:confirmed',
  TRANSACTION_FAILED: 'transaction:failed',

  // Achievement events
  ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
  ACHIEVEMENT_PROGRESS: 'achievement:progress',
  ACHIEVEMENT_CLAIMED: 'achievement:claimed',

  // User events
  USER_LEVEL_UP: 'user:level_up',
  USER_BALANCE_CHANGED: 'user:balance_changed',
  USER_REFERral_BONUS: 'user:referral_bonus',

  // Leaderboard events
  LEADERBOARD_UPDATED: 'leaderboard:updated',

  // System events
  SYSTEM_NOTIFICATION: 'system:notification',
  PING: 'ping',
  PONG: 'pong',
} as const;

export type WSEventType = typeof WS_EVENTS[keyof typeof WS_EVENTS];

export default wsEvents;