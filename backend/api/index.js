import app from '../src/app.js';
import { connectDatabase } from '../src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDatabase();

    return app(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Database connection failed.',
    });
  }
}