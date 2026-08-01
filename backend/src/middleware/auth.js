const admin = require('../config/firebase-admin');

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access. No token provided.',
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      displayName: decodedToken.name || '',
      photoURL: decodedToken.picture || '',
    };
    next();
  } catch (error) {
    // Development fallback mock decoded token if invalid format during offline dev
    if (process.env.NODE_ENV === 'development') {
      req.user = {
        uid: 'dev_user_123',
        email: 'dev@cinevault.local',
        displayName: 'Dev User',
        photoURL: '',
      };
      return next();
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
    });
  }
}

module.exports = { verifyToken };
