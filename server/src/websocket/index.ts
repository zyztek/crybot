/**
 * WebSocket Handler
 *
 * Real-time updates for wallet balance, transactions, and notifications
 */

import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { jwtConfig } from '../config/index.js';
import { wsEvents, WS_EVENTS } from './events.js';

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  isAlive?: boolean;
  subscriptions?: Set<string>;
}

interface WSMessage {
  type: string;
  data?: unknown;
}

export function setupWebSocket(wss: WebSocketServer) {
  // Register WebSocket server with event emitter
  wsEvents.setServer(wss);

  // Heartbeat interval
  const heartbeatInterval = setInterval(() => {
    wss.clients.forEach(ws => {
      const authWs = ws as AuthenticatedWebSocket;
      if (authWs.isAlive === false) {
        return authWs.terminate();
      }
      authWs.isAlive = false;
      authWs.ping();
    });
  }, 30000);

  wss.on('connection', async (ws: AuthenticatedWebSocket, req) => {
    ws.isAlive = true;
    ws.subscriptions = new Set();

    // Authenticate WebSocket connection
    const token = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('token');

    if (token) {
      try {
        const payload = jwt.verify(token, jwtConfig.secret) as { userId: string };

        ws.userId = payload.userId;
        console.log(`WebSocket connected: User ${ws.userId}`);
      } catch {
        console.log('WebSocket authentication failed');
      }
    }

    // Handle pong response
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Handle incoming messages
    ws.on('message', async message => {
      try {
        const parsed: WSMessage = JSON.parse(message.toString());

        switch (parsed.type) {
          case 'ping':
            ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
            break;

          case 'subscribe':
            // Handle subscription to specific events
            const eventType = parsed.data as string;
            ws.subscriptions?.add(eventType);
            ws.send(JSON.stringify({ 
              type: 'subscribed', 
              data: { eventType } 
            }));
            break;

          case 'unsubscribe':
            const unsubEventType = parsed.data as string;
            ws.subscriptions?.delete(unsubEventType);
            ws.send(JSON.stringify({ 
              type: 'unsubscribed', 
              data: { eventType: unsubEventType } 
            }));
            break;

          default:
            console.log(`Unknown message type: ${parsed.type}`);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    // Handle close
    ws.on('close', () => {
      console.log(`WebSocket disconnected: User ${ws.userId || 'anonymous'}`);
    });

    // Send welcome message with available events
    ws.send(
      JSON.stringify({
        type: 'connected',
        data: {
          timestamp: Date.now(),
          userId: ws.userId || null,
          availableEvents: Object.values(WS_EVENTS),
        },
      })
    );
  });

  wss.on('close', () => {
    clearInterval(heartbeatInterval);
  });
}

// Broadcast to all connected clients
export function broadcast(wss: WebSocketServer, message: WSMessage) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// Send to specific user
export function sendToUser(wss: WebSocketServer, userId: string, message: WSMessage) {
  wss.clients.forEach(client => {
    const authWs = client as AuthenticatedWebSocket;
    if (authWs.userId === userId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export { wsEvents, WS_EVENTS };
export default { setupWebSocket, broadcast, sendToUser };
