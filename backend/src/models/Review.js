const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    movieId: {
      type: Number,
      required: true,
      index: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    moviePosterPath: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      min: 0.5,
      max: 5,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    spoiler: {
      type: Boolean,
      default: false,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorPhotoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
