import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    process.exit(1);
  });
}

startServer();