const express = require('express');
const mysql = require('mysql2');
const session = require('bcryptjs');
const bodyparser = require('body-parser');
const Mysqlstore = require('express-mysql-session')(session);
const flash = require('connect-flash');
// const patientsRoutes = require('./routes/patientsRoutes'); 
// const patientControllers = require('./controllers/patientController');
const dotenv = require('dotenv');
dotenv.config();

// Initialize app
const app = express();

// Initialize environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true })); // Capture form data


// MySQL Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Finance_Tracker_DB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Session setup
app.use(session({
    secret: 'Finance_Tracker_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true in production with HTTPS
}));

// Flash messages middleware
app.use(flash());

// Test MySQL Connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

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
    connection.query(createUsersTable, (err, results) =>{
        if (err) {
            console.error('Error creating Users table:', err);
            return;
        }
        console.log('Users table created successfully!');
    });

    // insert sample data

    // create Transactions table
    const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS Transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    connection.query(createTransactionsTable, (err, results) =>{
        if (err) {
            console.error('Error creating Transactions table:', err);
            return;
        }
        console.log('Transactions table created successfully!');
    });
})