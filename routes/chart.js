const express = require('express');

const chartController = require('../controllers/chartController')

const router = express.Router();

// Displaying budget chart
router.get('/dispBudget', chartController.dispBudget)

// Displaying transaction chart
router.get('/dispTransact', chartController.dispTransact)


module.exports = router;