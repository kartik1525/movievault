require('dotenv').config();
const validateEnv = require('./src/config/env');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const mongoose = require('mongoose');

// Validate environment variables before anything else
validateEnv();

const PORT = process.env.PORT || 5000;

// Initialize Database and Start HTTP Listener
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`[CineVault API] Server listening on port ${PORT}`);
    console.log(`[CineVault API] Environment: ${process.env.NODE_ENV}`);
  });

  // ── Graceful Shutdown ──
  const gracefulShutdown = (signal) => {
    console.log(`\n[CineVault API] ${signal} received. Starting graceful shutdown...`);

    server.close(async () => {
      console.log('[CineVault API] HTTP server closed.');

      try {
        await mongoose.connection.close();
        console.log('[MongoDB] Connection closed gracefully.');
      } catch (err) {
        console.error('[MongoDB] Error during disconnection:', err.message);
      }

      process.exit(0);
    });

    // Force shutdown after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error('[CineVault API] Forced shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('[Unhandled Rejection]:', reason);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('[Uncaught Exception]:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
  });
});
