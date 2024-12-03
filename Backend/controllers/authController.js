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
