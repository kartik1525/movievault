const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      default: '',
    },
    photoURL: {
      type: String,
      default: '',
    },
    preferences: {
      reducedMotion: { type: Boolean, default: false },
      favoriteGenres: [{ type: Number }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
