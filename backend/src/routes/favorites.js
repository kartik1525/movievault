const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
  getFavoritesCount,
} = require('../controllers/favorites-controller');
const { verifyToken } = require('../middleware/auth');
const {
  handleValidationErrors,
  paginationRules,
  movieIdParam,
  addFavoriteRules,
} = require('../middleware/validators');

// All favorites routes require authentication
router.use(verifyToken);

// GET /api/favorites — List user favorites (paginated)
router.get('/', paginationRules, handleValidationErrors, getFavorites);

// GET /api/favorites/count — Get total favorites count
router.get('/count', getFavoritesCount);

// GET /api/favorites/check/:movieId — Check if movie is favorited
router.get('/check/:movieId', movieIdParam, handleValidationErrors, checkFavorite);

// POST /api/favorites — Add movie to favorites
router.post('/', addFavoriteRules, handleValidationErrors, addFavorite);

// DELETE /api/favorites/:movieId — Remove movie from favorites
router.delete('/:movieId', movieIdParam, handleValidationErrors, removeFavorite);

module.exports = router;
