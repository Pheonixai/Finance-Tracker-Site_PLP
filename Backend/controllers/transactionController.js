const pool = require("../config/db");

// Add Transaction
exports.addTransaction = (req, res) => {
  const { amount, type, category } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  pool.query(
    "INSERT INTO Transactions (user_id, amount, type, category) VALUES (?, ?, ?, ?)",
    [userId, amount, type, category],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error adding transaction.");
      }
      res.status(201).send("Transaction added successfully!");
    }
  );
};

// Get Transactions
exports.getTransactions = (req, res) => {
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  pool.query(
    "SELECT * FROM Transactions WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error retrieving transactions.");
      }
      res.status(200).json(results);
    }
  );
};
