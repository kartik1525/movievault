const express = require('express');
const router = express.Router();
const { syncUser } = require('../controllers/auth-controller');
const { verifyToken } = require('../middleware/auth');

router.post('/sync', verifyToken, syncUser);

module.exports = router;
