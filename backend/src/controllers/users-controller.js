const User = require('../models/User');
const { sendSuccess } = require('../utils/response');

/**
 * GET /api/users/me
 * Fetch the current authenticated user's profile.
 */
async function getProfile(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found. Please sync your account first.',
      });
    }

    return sendSuccess(res, 200, user);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/users/me
 * Update the current user's display name and preferences.
 */
async function updateProfile(req, res, next) {
  try {
    const { displayName, preferences } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (preferences !== undefined) updateData.preferences = preferences;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found. Please sync your account first.',
      });
    }

    return sendSuccess(res, 200, user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
