// Import the Express module
const one = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this line
const jwtSecret = 'changeMe'; // Add this line


var cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const saltRounds = 10; // Number of salt rounds for bcrypt


console.log("one",one)
// Create an Express application
const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors(corsOptions))
// Create a connection to the MySQL server
const pool = mysql.createPool({
  host: '13.201.133.126',
  user: 'dave',
  password: process.env.dbpassword,
  database: 'horner_books_db',
  connectionLimit: 10,
});
const getConnection = async () => pool.getConnection();

// Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as id ' + connection.threadId);
// });

// Signup route
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const connection = await getConnection();

  var { first_name, last_name, email, password} = req.body;

  // Create a new user object

  password = await bcrypt.hash(password, saltRounds);
  const newUser = { first_name, last_name, email, password };
  console.log(newUser);
  // Save the user to the MySQL database
  connection.query('INSERT INTO user SET ?', newUser, (err, result) => {

    if (err) {
      console.error('Error inserting user into database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    connection.release()

    console.log('User inserted into database with ID:', result.insertId);
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  });
});

app.get('/books', async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.execute('SELECT * FROM book');
  connection.release();
  console.log(rows);
  return res.status(201).json(rows);
});

// sign-in api
app.post('/signin', async (req, res) => {
  var { email, password } = req.body;
  const connection = await getConnection();

  console.log(req.body);
  // Check if the user exists in the database
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {

    // Check if the user exists
    const [userRows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
    console.log(userRows);
    if (userRows.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = userRows[0];

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '30d' });
    console.log(token);

    // Send the token in the response
    const updateTokenQuery = 'UPDATE user SET session_token = ? WHERE id = ?';
    connection.execute(updateTokenQuery, [token, user.id]);
    setTimeout(() => {
      connection.release();
    }, 1000);
    return res.status(200).json({ message: 'Sign-in successful', token });


  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
