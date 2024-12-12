const pool = require("../config/db");

// Set Budget
exports.setBudget = (req, res) => {
  const { amount, category } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  pool.query(
    "INSERT INTO Budgets (user_id, amount, category) VALUES (?, ?, ?)",
    [userId, amount, category],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error setting budget.");
      }
      res.status(201).send("Budget set successfully!");
    }
  );
};

// Get Budgets
exports.getBudgets = (req, res) => {
  const userId = req.session.userId;

  if (!userId) return res.status(401).send("Unauthorized");

  pool.query(
    "SELECT * FROM Budgets WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error retrieving budgets.");
      }
      res.status(200).json(results);
    }
  );
};
