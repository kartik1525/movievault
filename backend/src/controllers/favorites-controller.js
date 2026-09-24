const Favorite = require('../models/Favorite');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * GET /api/favorites
 * Fetch user's favorite movies with pagination.
 */
async function getFavorites(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [favorites, totalDocs] = await Promise.all([
      Favorite.find({ userId: req.user.uid })
        .sort({ addedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Favorite.countDocuments({ userId: req.user.uid }),
    ]);

    return sendPaginated(res, favorites, page, limit, totalDocs);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/favorites
 * Add a movie to user favorites (upsert — idempotent).
 */
async function addFavorite(req, res, next) {
  try {
    const { movieId, movieTitle, posterPath } = req.body;
    const userId = req.user.uid;

    const favorite = await Favorite.findOneAndUpdate(
      { userId, movieId },
      { userId, movieId, movieTitle, posterPath },
      { upsert: true, new: true }
    );

    return sendSuccess(res, 201, favorite);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/favorites/:movieId
 * Remove a movie from user favorites.
 */
async function removeFavorite(req, res, next) {
  try {
    const { movieId } = req.params;
    const result = await Favorite.deleteOne({ userId: req.user.uid, movieId: Number(movieId) });

    if (result.deletedCount === 0) {
      return sendSuccess(res, 200, null, 'Movie was not in favorites');
    }

    return sendSuccess(res, 200, null, 'Removed from favorites');
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/favorites/check/:movieId
 * Check if a movie is in user's favorites.
 */
async function checkFavorite(req, res, next) {
  try {
    const { movieId } = req.params;
    const favorite = await Favorite.findOne({
      userId: req.user.uid,
      movieId: Number(movieId),
    }).lean();

    return sendSuccess(res, 200, { isFavorite: Boolean(favorite) });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/favorites/count
 * Get total count of user's favorites.
 */
async function getFavoritesCount(req, res, next) {
  try {
    const count = await Favorite.countDocuments({ userId: req.user.uid });
    return sendSuccess(res, 200, { count });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
  getFavoritesCount,
};
