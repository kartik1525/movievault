const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const mongoose = require('mongoose');
const { globalLimiter } = require('./middleware/rate-limiter');
const errorHandler = require('./middleware/error-handler');

// Route imports
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');
const watchlistRoutes = require('./routes/watchlist');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');

const app = express();

// ── Security Middleware ──
app.use(helmet());

// CORS — support multiple origins via comma-separated env var
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);

// ── Request Parsing ──
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Sanitization & Protection ──
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(hpp());           // Prevent HTTP parameter pollution

// ── Performance ──
app.use(compression());   // Gzip compression

// ── Logging ──
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Rate Limiting ──
app.use('/api', globalLimiter);

// ── Health Check Endpoint ──
app.get('/api/health', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'online',
    app: 'CineVault API',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: dbState[mongoose.connection.readyState] || 'unknown',
    memory: {
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
    },
  });
});

// ── API Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

// ── 404 Handler ──
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Error Handling Middleware ──
app.use(errorHandler);

module.exports = app;
