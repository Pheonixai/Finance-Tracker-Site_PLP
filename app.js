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
    connectionLimit: 10,
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
const PORT = 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
