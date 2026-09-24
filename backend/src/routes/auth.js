const express = require('express');
const router = express.Router();
const { syncUser } = require('../controllers/auth-controller');
const { verifyToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rate-limiter');

// POST /api/auth/sync — Sync Firebase user with MongoDB
router.post('/sync', authLimiter, verifyToken, syncUser);

module.exports = router;
