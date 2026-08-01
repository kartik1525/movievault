const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/error-handler');

// Route imports
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');
const watchlistRoutes = require('./routes/watchlist');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');

const app = express();

// Security and middleware setup
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'CineVault API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
