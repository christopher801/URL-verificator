const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');

// URL verification endpoint
router.post('/verify', verifyController.verifyUrl);

module.exports = router;