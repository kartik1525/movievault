const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require('../controllers/favorites-controller');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:movieId', removeFavorite);
router.get('/check/:movieId', checkFavorite);

module.exports = router;
