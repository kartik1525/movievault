const Watchlist = require('../models/Watchlist');

async function getWatchlist(req, res, next) {
  try {
    const items = await Watchlist.find({ userId: req.user.uid }).sort({ addedAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
}

async function addToWatchlist(req, res, next) {
  try {
    const { movieId, movieTitle, posterPath } = req.body;
    const userId = req.user.uid;

    const item = await Watchlist.findOneAndUpdate(
      { userId, movieId },
      { userId, movieId, movieTitle, posterPath },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

async function updateWatchlistItem(req, res, next) {
  try {
    const { movieId } = req.params;
    const { watched } = req.body;

    const item = await Watchlist.findOneAndUpdate(
      { userId: req.user.uid, movieId: Number(movieId) },
      { watched },
      { new: true }
    );

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

async function removeFromWatchlist(req, res, next) {
  try {
    const { movieId } = req.params;
    await Watchlist.deleteOne({ userId: req.user.uid, movieId: Number(movieId) });
    res.json({ success: true, message: 'Removed from watchlist' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
};
