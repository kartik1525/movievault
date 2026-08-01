const express = require('express');
const router = express.Router();
const {
  getWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
} = require('../controllers/watchlist-controller');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.put('/:movieId', updateWatchlistItem);
router.delete('/:movieId', removeFromWatchlist);

module.exports = router;
