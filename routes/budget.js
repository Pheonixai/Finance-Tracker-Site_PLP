const express = require('express');

const budgController = require('../controllers/budgController')

const router = express.Router();

// setting budget
router.post('/setBudget', budgController.setBudget)

// getting budget
router.get('/getBudget', budgController.getBudget)


module.exports = router;