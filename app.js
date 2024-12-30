const path = require('path');
const mysql = require("mysql2");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: './.env'});
const hbs = require('hbs');

// Initialize app
const app = express();

// Making the connection 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

// setting the path to be able to use your html and css
const publicDirectory = path.join(__dirname, './public')
console.log(__dirname);

// to check if its working
app.use(express.static(publicDirectory));

// making sure you can grab data from any form
app.use(express.urlencoded({extended: false }));

// to make sure the data you are grabbing is in json format
app.use(express.json());

// To set what type you'll use to view your html
app.set('view engine', 'hbs');

// Testing 
console.log('Public Directory:', publicDirectory);
console.log('Views Directory:', path.join(__dirname, 'views'));
console.log('View Engine:', app.get('view engine'));

// connecting the database 
db.connect((error) => {
    if(error){
        console.log("Error connecting to database", error)
    }
    else {
        console.log("Connected successfully to database")
    }

      // Create Users Table
  const createUsersTable = `
                CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
    db.query(createUsersTable, (err, results) =>{
    if (err) {
    console.error('Error creating Users table:', err);
    return;
    }
    console.log('Users table created successfully!');
    // console.log(results);
    });


        // create Transactions table
        const createTransactionsTable = `
        CREATE TABLE IF NOT EXISTS Transactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Amount DECIMAL(50, 2) NOT NULL,  -- Change Amount to DECIMAL for monetary values
            Category VARCHAR(255) NOT NULL,
            Transaction_Type VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        // FOREIGN KEY (USER_ID) REFERENCES Users(id)  -- Corrected foreign key reference
    
    db.query(createTransactionsTable, (err, results) =>{
        if (err) {
            console.error('Error creating Transactions table:', err);
            return;
        }
        console.log('Transactions table created successfully!');
    });

    // create budget table 
        // create Transactions table
        const createBudgetTable = `
        CREATE TABLE IF NOT EXISTS Budget (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Amount DECIMAL(50, 2) NOT NULL,  -- Change Amount to DECIMAL for monetary values
            Category VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    
    db.query(createBudgetTable, (err, results) =>{
        if (err) {
            console.error('Error creating Budget table:', err);
            return;
        }
        console.log('Budget table created successfully!');
    });


})

// Define Routes - Main Page , dashboard , Profile - Registeration and Login
// Main Page
app.use('/', require('./routes/pages'));

// Authentication - registration and sign up
app.use('/auth', require('./routes/auth'));

// Dashboard
app.use('/dashboard', require('./routes/dashboard'));

// Transactions
app.use('/transaction', require('./routes/transaction'));

// budget route
app.use('/budget', require('./routes/budget'));

// chart route
app.use('/chart', require('./routes/chart'));

// Start server
const PORT = 3500
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
