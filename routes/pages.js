const express = require('express');

const router = express.Router();

// Main Page
router.get('/', (req, res) => {
    res.render('index');
});

// Registeration Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Dashboard
// Add Transaction
router.get('/addTransact', (req, res) => {
    res.render('transactions');
});

// GET Transaction
router.get('/getTransact', (req, res) => {
    res.render('transactions');
});

router.get('/transactions', (req, res) => {
    res.render('transactions');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Budgets
router.get('/budget', (req, res) => {
    res.render('budget');
});

router.get('/setBudget', (req, res) => {
    res.render('budget');
});

router.get('/getBudget', (req, res) => {
    res.render('budget');
});



module.exports = router;