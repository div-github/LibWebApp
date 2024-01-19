// Import the Express module
const one = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

console.log("one",one)
// Create an Express application
const app = express();

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: '65.2.150.60',
  user: 'dave',
  password: process.env.dbpassword,
  database: 'horner_books_db'
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

// Signup route
app.post('/signup', (req, res) => {
  const { first_name, last_name, email, password} = req.body;

  // Create a new user object
  const newUser = { first_name, last_name, email, password };

  // Save the user to the MySQL database
  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('User inserted into database with ID:', result.insertId);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  });
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
