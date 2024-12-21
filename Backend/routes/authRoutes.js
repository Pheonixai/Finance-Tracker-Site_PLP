"use strict";
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // Adjust to match your database connection
const router = express.Router();

// Signup Route
router.post("/signup", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const password_hash = bcrypt.hashSync(password, 10);

  pool.query(
    "INSERT INTO Users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
    [first_name, last_name, email, password_hash],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error signing up.");
      }
      res.status(201).send("Signup successful!");
    }
  );
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  pool.query("SELECT * FROM Users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error logging in.");
    }

    if (results.length === 0) return res.status(404).send("User not found!");

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password_hash);

    if (!isMatch) return res.status(401).send("Invalid credentials.");

    req.session.userId = user.id;
    res.status(200).send("Login successful!");
  });
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error logging out.");
    res.status(200).send("Logged out successfully!");
  });
});

module.exports = router;
