const Review = require('../models/Review');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * GET /api/reviews/movie/:movieId
 * Fetch all public reviews for a movie with pagination.
 * Public route — no auth required.
 */
async function getMovieReviews(req, res, next) {
  try {
    const { movieId } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [reviews, totalDocs] = await Promise.all([
      Review.find({ movieId: Number(movieId) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Review.countDocuments({ movieId: Number(movieId) }),
    ]);

    return sendPaginated(res, reviews, page, limit, totalDocs);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/reviews/user
 * Fetch all reviews authored by the logged-in user with pagination.
 */
async function getUserReviews(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [reviews, totalDocs] = await Promise.all([
      Review.find({ userId: req.user.uid })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Review.countDocuments({ userId: req.user.uid }),
    ]);

    return sendPaginated(res, reviews, page, limit, totalDocs);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/reviews
 * Submit a new movie review.
 * Prevents duplicate reviews — one review per user per movie.
 */
async function createReview(req, res, next) {
  try {
    const { movieId, movieTitle, moviePosterPath, rating, content, spoiler } = req.body;
    const { uid, displayName, photoURL } = req.user;

    // Check for existing review by same user for same movie
    const existingReview = await Review.findOne({ userId: uid, movieId }).lean();
    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this movie. You can edit your existing review instead.',
        data: existingReview,
      });
    }

    const review = await Review.create({
      userId: uid,
      movieId,
      movieTitle,
      moviePosterPath,
      rating,
      content,
      spoiler: Boolean(spoiler),
      authorName: displayName || 'Anonymous User',
      authorPhotoURL: photoURL || null,
    });

    return sendSuccess(res, 201, review);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/reviews/:id
 * Update an existing review (only the author can edit).
 */
async function updateReview(req, res, next) {
  try {
    const { id } = req.params;
    const { rating, content, spoiler } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (content !== undefined) updateData.content = content;
    if (spoiler !== undefined) updateData.spoiler = Boolean(spoiler);

    const review = await Review.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      updateData,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you do not have permission to edit it.',
      });
    }

    return sendSuccess(res, 200, review);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/reviews/:id
 * Delete a review (only the author can delete).
 */
async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Review.deleteOne({ _id: id, userId: req.user.uid });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you do not have permission to delete it.',
      });
    }

    return sendSuccess(res, 200, null, 'Review deleted');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovieReviews,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
};
