const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/users-controller');
const { verifyToken } = require('../middleware/auth');
const { handleValidationErrors, updateProfileRules } = require('../middleware/validators');

// All user routes require authentication
router.use(verifyToken);

// GET /api/users/me — Fetch current user profile
router.get('/me', getProfile);

// PUT /api/users/me — Update profile display name & preferences
router.put('/me', updateProfileRules, handleValidationErrors, updateProfile);

module.exports = router;
