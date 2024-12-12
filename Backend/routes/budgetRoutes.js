"use strict";
const express = require("express");
const { setBudget, getBudgets } = require("../controllers/budgetController");
const { isAuthenticated } = require("./middlewares/authMiddleware");
const router = express.Router();

router.post("/set", isAuthenticated, setBudget);
router.get("/", isAuthenticated, getBudgets);

module.exports = router;
