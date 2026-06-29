import { env } from '../config/env.js';

export function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  const response = {
    success: false,
    message: error.message || 'Internal server error.',
  };

  if (env.nodeEnv === 'development') {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
}