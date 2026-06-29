import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongodbUri:
    process.env.MONGODB_URI ||
    'mongodb://localhost:27017/customer-feedback-platform',
  jwtSecret:
    process.env.JWT_SECRET ||
    'customer-feedback-platform-development-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@acowale.test',
  adminPasswordHash: process.env.ADMIN_PASSWORD_HASH || '',
};