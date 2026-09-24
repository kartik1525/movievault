const express = require('express');
const router = express.Router();
const {
  getWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
  checkWatchlist,
  getWatchlistCount,
} = require('../controllers/watchlist-controller');
const { verifyToken } = require('../middleware/auth');
const {
  handleValidationErrors,
  paginationRules,
  movieIdParam,
  addWatchlistRules,
  updateWatchlistRules,
} = require('../middleware/validators');

// All watchlist routes require authentication
router.use(verifyToken);

// GET /api/watchlist — List user watchlist (paginated)
router.get('/', paginationRules, handleValidationErrors, getWatchlist);

// GET /api/watchlist/count — Get watchlist count (total/watched/unwatched)
router.get('/count', getWatchlistCount);

// GET /api/watchlist/check/:movieId — Check if movie is in watchlist
router.get('/check/:movieId', movieIdParam, handleValidationErrors, checkWatchlist);

// POST /api/watchlist — Add movie to watchlist
router.post('/', addWatchlistRules, handleValidationErrors, addToWatchlist);

// PUT /api/watchlist/:movieId — Update watched status
router.put('/:movieId', updateWatchlistRules, handleValidationErrors, updateWatchlistItem);

// DELETE /api/watchlist/:movieId — Remove movie from watchlist
router.delete('/:movieId', movieIdParam, handleValidationErrors, removeFromWatchlist);

module.exports = router;
