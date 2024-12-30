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

// Your main controller actions
// Action for the registration page
exports.register = (req, res) => {
    console.log(req.body);

    // getting the data from the html form that was linked through form action
    const { first_name, last_name, email, password, confirmPassword } = req.body;
    console.log(last_name);

    // Making your database query
    // Checking if the user exists before registering
    db.query('SELECT email FROM Users WHERE email = ?', [email], async (error, results) => {
        // checking for errors
        if(error) {
            console.log(error);
        }

        // If there is a result , that means the email is in the database 
        if(results.length > 0 ) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password !== confirmPassword) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        // If not then hash the password to store in the database
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // Inserting the users data into the database

        db.query('INSERT INTO Users SET ?', {first_name: first_name, last_name: last_name, email: email, password_hash: hashedPassword}, (error, results) =>{
            if(error){
                console.log(error);
            }
            else {
                console.log(results);
                            // 'dashboard'
                return res.render('dashboard', {
                    message: 'User registered successfully!'
                })
            }
        })
    })
}

exports.login = (req, res) => {
    // Getting the data from the html form that was linked through form action
    console.log(req.body);

    // getting the data
    const {email, password} = req.body;

    // making the query to confirm the user exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (error, results) => {
        // checking for errors
        if(error) {
            console.log(error);
        }

        // if no error
        if(results.length === 0) {
            return res.render('login', {
                message: 'Email not found'
            });
        }

        // Chceking if the password matches
        const passwordMatch = await bcrypt.compare(password, results[0].password_hash);
    
        if(!passwordMatch) {
            return res.render('login', {
                message: 'Password is incorrect'
            });
        }

        // If all is well
        console.log('User logged in:', results[0]);
        return res.render('dashboard', {
            message: 'Login successful. Welcome back!'
        })
    })
}

// Logout
exports.logout = (req, res) => {
    return res.render('index');
}