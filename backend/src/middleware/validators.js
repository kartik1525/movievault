const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware that checks for validation errors and returns 400 if any found.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
}

// ── Pagination query params (reusable) ──
const paginationRules = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
];

// ── Movie ID param validation (reusable) ──
const movieIdParam = [
  param('movieId')
    .isInt({ min: 1 })
    .withMessage('Movie ID must be a positive integer')
    .toInt(),
];

// ── Favorites validation ──
const addFavoriteRules = [
  body('movieId')
    .isInt({ min: 1 })
    .withMessage('movieId is required and must be a positive integer'),
  body('movieTitle')
    .trim()
    .notEmpty()
    .withMessage('movieTitle is required')
    .isLength({ max: 500 })
    .withMessage('movieTitle must be at most 500 characters'),
  body('posterPath')
    .optional({ nullable: true })
    .isString()
    .withMessage('posterPath must be a string'),
];

// ── Watchlist validation ──
const addWatchlistRules = [
  body('movieId')
    .isInt({ min: 1 })
    .withMessage('movieId is required and must be a positive integer'),
  body('movieTitle')
    .trim()
    .notEmpty()
    .withMessage('movieTitle is required')
    .isLength({ max: 500 })
    .withMessage('movieTitle must be at most 500 characters'),
  body('posterPath')
    .optional({ nullable: true })
    .isString()
    .withMessage('posterPath must be a string'),
];

const updateWatchlistRules = [
  ...movieIdParam,
  body('watched')
    .isBoolean()
    .withMessage('watched must be a boolean value'),
];

// ── Reviews validation ──
const createReviewRules = [
  body('movieId')
    .isInt({ min: 1 })
    .withMessage('movieId is required and must be a positive integer'),
  body('movieTitle')
    .trim()
    .notEmpty()
    .withMessage('movieTitle is required')
    .isLength({ max: 500 })
    .withMessage('movieTitle must be at most 500 characters'),
  body('moviePosterPath')
    .optional({ nullable: true })
    .isString()
    .withMessage('moviePosterPath must be a string'),
  body('rating')
    .isFloat({ min: 0.5, max: 5 })
    .withMessage('Rating must be between 0.5 and 5')
    .custom((value) => {
      if (value % 0.5 !== 0) {
        throw new Error('Rating must be in increments of 0.5');
      }
      return true;
    }),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Review content is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Review content must be between 10 and 2000 characters'),
  body('spoiler')
    .optional()
    .isBoolean()
    .withMessage('spoiler must be a boolean value'),
];

const updateReviewRules = [
  param('id')
    .isMongoId()
    .withMessage('Invalid review ID'),
  body('rating')
    .optional()
    .isFloat({ min: 0.5, max: 5 })
    .withMessage('Rating must be between 0.5 and 5')
    .custom((value) => {
      if (value % 0.5 !== 0) {
        throw new Error('Rating must be in increments of 0.5');
      }
      return true;
    }),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Review content must be between 10 and 2000 characters'),
  body('spoiler')
    .optional()
    .isBoolean()
    .withMessage('spoiler must be a boolean value'),
];

const deleteReviewRules = [
  param('id')
    .isMongoId()
    .withMessage('Invalid review ID'),
];

// ── Users validation ──
const updateProfileRules = [
  body('displayName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Display name must be between 1 and 50 characters'),
  body('preferences')
    .optional()
    .isObject()
    .withMessage('Preferences must be an object'),
  body('preferences.reducedMotion')
    .optional()
    .isBoolean()
    .withMessage('reducedMotion must be a boolean'),
  body('preferences.favoriteGenres')
    .optional()
    .isArray()
    .withMessage('favoriteGenres must be an array'),
  body('preferences.favoriteGenres.*')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Each genre ID must be a positive integer'),
];

module.exports = {
  handleValidationErrors,
  paginationRules,
  movieIdParam,
  addFavoriteRules,
  addWatchlistRules,
  updateWatchlistRules,
  createReviewRules,
  updateReviewRules,
  deleteReviewRules,
  updateProfileRules,
};
