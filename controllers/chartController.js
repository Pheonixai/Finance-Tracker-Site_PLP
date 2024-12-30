// controller for the actions and database of the chart

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

exports.dispBudget = (req, res) => {
    console.log(req.body);

    db.query('SELECT * FROM budget', (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if(results.length > 0) {
            console.log(results);
            res.status(200).json(results); // Send the results as JSON
            // If transactions are found, render the dashboard and pass the data
            // res.render('budget', { budget: results });
        } else if (results.length === 0) {
            // res.render('budget', { budget: [], message: 'No budget found' });
            res.status(200).json({ budget: [], message: 'No budget found' }); // Return an empty array if no budgets
            console.log("Fetched Budgets:", results);
        }
    })

}

// Transaction Chart
exports.dispTransact = (req, res) => {
    console.log(req.body);
    db.query('SELECT * FROM Transactions', (error, results) => {
        if(error){
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if(results.length > 0) {
            console.log(results);
            res.status(200).json(results); // Send the results as JSON
            // If transactions are found, render the dashboard and pass the data
            // res.render('budget', { budget: results });
        } else if (results.length === 0) {
            // res.render('budget', { budget: [], message: 'No budget found' });
            res.status(200).json({ Transactions: [], message: 'No transactions found' }); // Return an empty array if no transaction
            console.log("Fetched Transactions:", results);
        }
    })

}
