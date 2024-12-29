const express = require('express');

const authController = require('../controllers/authController')

const router = express.Router();

// For register
router.post('/register', authController.register)

// For login
router.post('/login', authController.login)

// For logout
router.post('/logout', authController.logout)

module.exports = router;