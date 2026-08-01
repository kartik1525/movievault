const User = require('../models/User');

async function getProfile(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { displayName, preferences } = req.body;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { displayName, preferences },
      { new: true }
    );

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
