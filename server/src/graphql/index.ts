/**
 * GraphQL Server Setup
 *
 * Creates the GraphQL endpoint using graphql-yoga
 */

import { createYoga } from 'graphql-yoga';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { schema } from './schema.js';
import { jwtConfig } from '../config/index.js';

interface GraphQLContext {
  userId?: string;
  request: Request;
  response: Response;
}

function getAuthToken(request: Request): string | null {
  const authHeader = request.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export const yoga = createYoga<GraphQLContext>({
  schema,
  graphqlEndpoint: '/graphql',
  cors: {
    origin: '*',
    credentials: true,
  },
  context: async ({ request, response }): Promise<GraphQLContext> => {
    const context: GraphQLContext = { request, response };

    // Try to authenticate from token
    const token = getAuthToken(request);
    if (token) {
      try {
        const payload = jwt.verify(token, jwtConfig.secret) as { userId: string };
        context.userId = payload.userId;
      } catch {
        // Invalid token, continue without auth
      }
    }

    return context;
  },
});

// Export the fetch handler for Express
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const graphqlHandler = yoga as any;

export default yoga;