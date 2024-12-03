// Inside db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Create a pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'opeyemi*220206',
    database: 'FINANCE_TRACKER_DB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Database connection is working:', results[0].solution); // Should log '2'
});

// Export the pool
module.exports = pool.promise();