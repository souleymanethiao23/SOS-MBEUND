const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour les autorites (uniquement login)
router.post('/login', authController.login);

module.exports = router;
