// Import the Express module
const one = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

console.log("one",one)
// Create an Express application
const app = express();

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.dbpassword,
  database: 'hornerlibrary'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
  connection.end();
});

// Data to be inserted
const userData = {
  id:'3',
  firstname: 'john_doe',
  lastname: 'xyz',
  email: 'john.doe@example.com',
  user_password:'divya'
};

// Perform the INSERT INTO query
connection.query('INSERT INTO user SET ?', userData, (error, results, fields) => {
  if (error) throw error;
  console.log('Inserted a new record with ID: ' + results.insertId);
});

// Define a route
app.get('/', (req, res) => {
    console.log(req);
  res.send('Hello, this is your Node.js server!');
});

// Set up the server to listen on a specific port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
