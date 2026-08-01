const Favorite = require('../models/Favorite');

async function getFavorites(req, res, next) {
  try {
    const favorites = await Favorite.find({ userId: req.user.uid }).sort({ addedAt: -1 });
    res.json({ success: true, data: favorites });
  } catch (error) {
    next(error);
  }
}

async function addFavorite(req, res, next) {
  try {
    const { movieId, movieTitle, posterPath } = req.body;
    const userId = req.user.uid;

    const favorite = await Favorite.findOneAndUpdate(
      { userId, movieId },
      { userId, movieId, movieTitle, posterPath },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: favorite });
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const { movieId } = req.params;
    await Favorite.deleteOne({ userId: req.user.uid, movieId: Number(movieId) });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    next(error);
  }
}

async function checkFavorite(req, res, next) {
  try {
    const { movieId } = req.params;
    const favorite = await Favorite.findOne({ userId: req.user.uid, movieId: Number(movieId) });
    res.json({ success: true, data: { isFavorite: Boolean(favorite) } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
};
