/**
 * Request Logger Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config/index.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const safePath = req.path.replace(/[\r\n]/g, '');

  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${safePath}`);

  // Capture response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const reset = '\x1b[0m';

    if (serverConfig.isDevelopment) {
      console.log(
        `${statusColor}[${res.statusCode}]${reset} ${req.method} ${safePath} - ${duration}ms`
      );
    }
  });

  next();
};
