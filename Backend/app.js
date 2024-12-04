const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const dotenv = require("dotenv");
const { isAuthenticated } = require("./middlewares/authmiddleware");

dotenv.config();

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Capture form data

// MySQL Connection Pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "opeyemi*220206",
  database: "Finance_Tracker_DB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Session store initialization
const sessionStore = new MySQLStore({}, pool);

// Session setup
app.use(
  session({
    secret: "Finance_Tracker_secret_key",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

// Flash messages middleware
app.use(flash());

// Test MySQL Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Create Users Table
  const createUsersTable = `
            CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(15),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
  connection.query(createUsersTable, (err, results) => {
    if (err) {
      console.error("Error creating Users table:", err);
      return;
    }
    console.log("Users table created successfully!");
  });

  // Create Transactions table
  const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS Transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        type ENUM('income', 'expense') NOT NULL,
        category VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    );
    `;
  connection.query(createTransactionsTable, (err, results) => {
    if (err) {
      console.error("Error creating Transactions table:", err);
      return;
    }
    console.log("Transactions table created successfully!");
  });
});

// Route (protected)
app.get("/profile", isAuthenticated, (req, res) => {
  res.send("Welcome to your dashboard 😍");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
