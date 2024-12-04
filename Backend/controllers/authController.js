"use strict";
const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).send(err);

      // Start session
      req.session.userId = result.insertId;
      res.status(201).send("User created and logged in!");
    }
  );
};

// Login API
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("User not found!");

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(401).send("Invalid credentials!");

    // Start session
    req.session.userId = user.id;
    res.status(200).send("Logged in successfully!");
  });
};

// Logout API
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send("Logged out successfully!");
  });
};
