import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import analyticsRoutes from './routes/analytics.routes.js';
import authRoutes from './routes/auth.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

const allowedOrigins = [
  env.clientUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Welcome to Customer Feedback Platform API.',
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;