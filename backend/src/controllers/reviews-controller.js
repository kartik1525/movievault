const Review = require('../models/Review');

async function getMovieReviews(req, res, next) {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId: Number(movieId) }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
}

async function getUserReviews(req, res, next) {
  try {
    const reviews = await Review.find({ userId: req.user.uid }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const { movieId, movieTitle, moviePosterPath, rating, content, spoiler } = req.body;
    const { uid, displayName, photoURL } = req.user;

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

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const { id } = req.params;
    const { rating, content, spoiler } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      { rating, content, spoiler },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;
    await Review.deleteOne({ _id: id, userId: req.user.uid });
    res.json({ success: true, message: 'Review deleted' });
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
