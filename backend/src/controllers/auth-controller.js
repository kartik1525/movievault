const User = require('../models/User');

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
    } else {
      user.email = email || user.email;
      if (displayName) user.displayName = displayName;
      if (photoURL) user.photoURL = photoURL;
      await user.save();
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { syncUser };
