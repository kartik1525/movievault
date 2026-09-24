const User = require('../models/User');
const { sendSuccess } = require('../utils/response');

/**
 * POST /api/auth/sync
 * Synchronize Firebase user session with MongoDB.
 * Creates user if not found, updates if already exists.
 */
async function syncUser(req, res, next) {
  try {
    const { uid, email, displayName, photoURL } = req.user;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL,
      });
      return sendSuccess(res, 201, user, 'User profile created');
    }

    // Update existing user with latest Firebase data
    user.email = email || user.email;
    if (displayName) user.displayName = displayName;
    if (photoURL) user.photoURL = photoURL;
    await user.save();

    return sendSuccess(res, 200, user, 'User profile synced');
  } catch (error) {
    next(error);
  }
}

module.exports = { syncUser };
