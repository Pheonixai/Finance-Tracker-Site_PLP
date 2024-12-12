"use strict";
const express = require("express");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const { isAuthenticated } = require("./middlewares/authMiddleware");
const router = express.Router();

// Route to add a transaction
router.post("/add", isAuthenticated, addTransaction);

// Route to get all transactions
router.get("/", isAuthenticated, getTransactions);

module.exports = router;
