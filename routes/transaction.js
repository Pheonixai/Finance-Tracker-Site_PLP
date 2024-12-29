const express = require('express');

const dashController = require('../controllers/dashController')

const router = express.Router();

//To add transactions
router.post('/addTransact', dashController.addTransact)

// For login
router.get('/getTransact', dashController.getTransact)

module.exports = router;