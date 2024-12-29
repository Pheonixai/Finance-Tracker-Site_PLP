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
    connectionLimit: 10,
    queueLimit: 0
  });

exports.setBudget = (req, res) => {
    console.log(req.body);
    
    const {category, amount} = req.body;
    
    db.query('INSERT INTO budget SET ?', {category: category, amount: amount}, (error, results) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            return res.render('budget', {
                message: 'Budget set!'
            })
        }
    });
}

exports.getBudget = (req, res) => {
    console.log(req.body);

    db.query('SELECT * FROM budget', (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0) {
            console.log(results);
            // If transactions are found, render the dashboard and pass the data
            res.render('budget', { budget: results });
        } else if (results.length === 0) {
            res.render('budget', { budget: [], message: 'No budget found' });
            console.log("Fetched Budgets:", results);
        }
    })

}