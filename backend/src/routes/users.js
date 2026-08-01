const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/users-controller');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/me', getProfile);
router.put('/me', updateProfile);

module.exports = router;
