const express = require('express');
const router = express.Router();
const {
  getMovieReviews,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews-controller');
const { verifyToken } = require('../middleware/auth');

// Public route to view movie reviews
router.get('/movie/:movieId', getMovieReviews);

// Protected routes
router.get('/user', verifyToken, getUserReviews);
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, updateReview);
router.delete('/:id', verifyToken, deleteReview);

module.exports = router;
