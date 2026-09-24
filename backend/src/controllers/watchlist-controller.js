const Watchlist = require('../models/Watchlist');
const { sendSuccess, sendPaginated } = require('../utils/response');

/**
 * GET /api/watchlist
 * Fetch user's watchlist with pagination.
 */
async function getWatchlist(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [items, totalDocs] = await Promise.all([
      Watchlist.find({ userId: req.user.uid })
        .sort({ addedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Watchlist.countDocuments({ userId: req.user.uid }),
    ]);

    return sendPaginated(res, items, page, limit, totalDocs);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/watchlist
 * Add a movie to user's watchlist (upsert — idempotent).
 */
async function addToWatchlist(req, res, next) {
  try {
    const { movieId, movieTitle, posterPath } = req.body;
    const userId = req.user.uid;

    const item = await Watchlist.findOneAndUpdate(
      { userId, movieId },
      { userId, movieId, movieTitle, posterPath },
      { upsert: true, new: true }
    );

    return sendSuccess(res, 201, item);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/watchlist/:movieId
 * Update watched status for a watchlist item.
 */
async function updateWatchlistItem(req, res, next) {
  try {
    const { movieId } = req.params;
    const { watched } = req.body;

    const item = await Watchlist.findOneAndUpdate(
      { userId: req.user.uid, movieId: Number(movieId) },
      { watched },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found in watchlist',
      });
    }

    return sendSuccess(res, 200, item);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/watchlist/:movieId
 * Remove a movie from user's watchlist.
 */
async function removeFromWatchlist(req, res, next) {
  try {
    const { movieId } = req.params;
    const result = await Watchlist.deleteOne({ userId: req.user.uid, movieId: Number(movieId) });

    if (result.deletedCount === 0) {
      return sendSuccess(res, 200, null, 'Movie was not in watchlist');
    }

    return sendSuccess(res, 200, null, 'Removed from watchlist');
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/watchlist/check/:movieId
 * Check if a movie is in user's watchlist.
 */
async function checkWatchlist(req, res, next) {
  try {
    const { movieId } = req.params;
    const item = await Watchlist.findOne({
      userId: req.user.uid,
      movieId: Number(movieId),
    }).lean();

    return sendSuccess(res, 200, {
      isInWatchlist: Boolean(item),
      watched: item ? item.watched : false,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/watchlist/count
 * Get total count of user's watchlist items.
 */
async function getWatchlistCount(req, res, next) {
  try {
    const [total, watched, unwatched] = await Promise.all([
      Watchlist.countDocuments({ userId: req.user.uid }),
      Watchlist.countDocuments({ userId: req.user.uid, watched: true }),
      Watchlist.countDocuments({ userId: req.user.uid, watched: false }),
    ]);

    return sendSuccess(res, 200, { total, watched, unwatched });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
  checkWatchlist,
  getWatchlistCount,
};
