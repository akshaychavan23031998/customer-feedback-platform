import mongoose from 'mongoose';

import { env } from './env.js';

let cachedConnection = null;
let cachedConnectionPromise = null;

export async function connectDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  if (!cachedConnectionPromise) {
    cachedConnectionPromise = mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
    });
  }

  try {
    cachedConnection = await cachedConnectionPromise;

    console.log(`MongoDB connected: ${cachedConnection.connection.host}`);

    return cachedConnection;
  } catch (error) {
    cachedConnectionPromise = null;
    cachedConnection = null;

    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}