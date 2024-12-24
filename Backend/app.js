const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);
const dotenv = require("dotenv");
const { isAuthenticated } = require("./middlewares/authmiddleware");
const authRoutes = require("./routes/authRoutes");
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
  password: "SoftwareDev#1",
  database: "finance_tracker",
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

app.use("/", authRoutes);

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
            name VARCHAR(255) NOT NULL,
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
    // console.log(results);
  });

  // insert sample data
  const insertSampleUsers = `
    INSERT INTO Users (name, email, password_hash, phone)
    VALUES
            ('John Doe', 'weitfdgadaftg@gmail.com', '${bcrypt.hashSync(
              "password1",
              10
            )}', '1234567890'),
            ('Jane Doe', 'wimachiuchisauke@gmail.com', '${bcrypt.hashSync(
              "password2",
              10
            )}', '0987654321')
       ON DUPLICATE KEY UPDATE id=id;  -- Prevent duplicate entry errors 
    `;
  connection.query(insertSampleUsers, (err, results) => {
    if (err) {
      console.error("Error inserting into users table:", err.stack);
      return;
    }
    console.log("Successfully inserted data into users table");
  });

  // create Transactions table
  const createTransactionsTable = `
        CREATE TABLE IF NOT EXISTS Transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            USER_ID INT,
            Amount DECIMAL(10, 2) NOT NULL,  -- Change Amount to DECIMAL for monetary values
            Transaction_Type VARCHAR(10) NOT NULL,
            Date DATE NOT NULL,
            Time VARCHAR(255) NOT NULL,
            phone VARCHAR(15),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (USER_ID) REFERENCES Users(id)  -- Corrected foreign key reference
        )
        `;

  connection.query(createTransactionsTable, (err, results) => {
    if (err) {
      console.error("Error creating Transactions table:", err);
      return;
    }
    console.log("Transactions table created successfully!");
  });

  // const insertSampleTransactions = `
  //     INSERT INTO Transactions (first_name, last)
  // `
});

// Route (protected)
app.get("/", isAuthenticated, (req, res) => {
  res.send("Welcome to your dashboard 😍");
});

// Start server
const PORT = 3303;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
