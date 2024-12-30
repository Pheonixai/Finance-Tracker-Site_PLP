// Importing packages 
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Making your database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });

// To add transactions
exports.addTransact = (req, res) => {
    console.log(req.body);

    const {id, Amount, Transaction_type, Category } = req.body;

    db.query(
        'INSERT INTO Transactions SET ?', {id: id, Amount : Amount, Transaction_type: Transaction_type,   Category: Category }, (error, results) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                return res.render('transactions', {
                    message: 'Transaction Added!'
                })
            }
        }
    )
}

// To see all your transactions 
exports.getTransact = (req, res) => {
    console.log(req.body);

    // const {id, Amount, Transaction_Type, Category } = req.body;

    db.query('SELECT * FROM Transactions', (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0) {
            console.log(results);
            // If transactions are found, render the dashboard and pass the data
            res.render('transactions', { transactions: results });
        } else if (results.length === 0) {
            res.render('transactions', { transactions: [], message: 'No transactions found' });
            console.log("Fetched Transactions:", results);
        }
    })
}