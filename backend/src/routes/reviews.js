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
const { writeLimiter } = require('../middleware/rate-limiter');
const {
  handleValidationErrors,
  paginationRules,
  movieIdParam,
  createReviewRules,
  updateReviewRules,
  deleteReviewRules,
} = require('../middleware/validators');

// ── Public Routes ──

// GET /api/reviews/movie/:movieId — Fetch all reviews for a movie (paginated)
router.get(
  '/movie/:movieId',
  movieIdParam,
  paginationRules,
  handleValidationErrors,
  getMovieReviews
);

// ── Protected Routes ──

// GET /api/reviews/user — Fetch user's own reviews (paginated)
router.get(
  '/user',
  verifyToken,
  paginationRules,
  handleValidationErrors,
  getUserReviews
);

// POST /api/reviews — Submit a new review (rate limited)
router.post(
  '/',
  verifyToken,
  writeLimiter,
  createReviewRules,
  handleValidationErrors,
  createReview
);

// PUT /api/reviews/:id — Update a review
router.put(
  '/:id',
  verifyToken,
  updateReviewRules,
  handleValidationErrors,
  updateReview
);

// DELETE /api/reviews/:id — Delete a review
router.delete(
  '/:id',
  verifyToken,
  deleteReviewRules,
  handleValidationErrors,
  deleteReview
);

module.exports = router;
