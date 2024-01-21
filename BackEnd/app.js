// Import the Express module
const one = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this line
const jwtSecret = 'changeMe'; // Add this line
const nodemailer = require('nodemailer');

var cors = require('cors');
const e = require('express');
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
  host: '13.201.187.47',
  user: 'dave',
  password: process.env.dbpassword,
  database: 'horner_books_db',
  connectionLimit: 10,
});
const getConnection = async () => pool.getConnection();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.epass,
  },
});
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
  const [rows] = await connection.execute(`
      SELECT * FROM book
      WHERE id NOT IN (SELECT book_id FROM user_book)
    `);
  connection.release();
  console.log(rows);
  return res.status(201).json(rows);
});

app.get('/account_info', async (req, res) => {
  try{const connection = await getConnection();
    const user_id = req.query.user_id;
    const [user_book] = await connection.execute('SELECT * FROM user_book WHERE user_id = ?', [user_id]);
    console.log("intermidiate",user_book)
    const [book] = await connection.execute('SELECT * FROM book WHERE id = ?', [user_book[0].book_id]);
    console.log("book data",book)
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [user_book[0].user_id]);
    console.log("user",user)
    data={
      user_name:user[0].first_name,
      book_name:book[0].name,
      issued_date:user_book[0].issued_date,
      return_date:user_book[0].return_date
    }
    connection.release();
    console.log(data);
    return res.status(201).json(data);}
  catch (error) {
    const connection = await getConnection();
    const user_id = req.query.user_id;
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [user_id]);
    data={
      user_name:user[0].first_name,
      book_name:'Null',
      issued_date:'Null',
      return_date:'Null'
    }
    connection.release();
   return res.status(200).json(data);
  }

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

    data={
      token:token,
      user_id:user.id
    }
    // Send the token in the response
    const updateTokenQuery = 'UPDATE user SET session_token = ? WHERE id = ?';
    connection.execute(updateTokenQuery, [token, user.id]);
    setTimeout(() => {
      connection.release();
    }, 1000);
    return res.status(200).json({ message: 'Sign-in successful', data });


  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/issue_book', async (req, res) => {
  const connection = await getConnection();
  var { book_id, user_id } = req.body;
  console.log(req.body);
  // Check if the user exists in the database
  if (!book_id || !user_id) {
    return res.status(400).json({ error: 'Book Isbn and user id are required' });
  }
  try {
    // Check if the user exists
    const [userRows] = await connection.execute('SELECT * FROM user WHERE id = ?', [user_id]);
    console.log(userRows);
    if (userRows.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid user id' });
    }

    const user = userRows[0];

    // Check if the book exists
    const [bookRows] = await connection.execute('SELECT * FROM book WHERE isbn = ?', [book_id]);
    console.log("running",bookRows);
    console.log("check",bookRows[0].id)
    if (bookRows.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid Book Isbn' });
    }

    const book = bookRows[0];

    // Check if the book is already issued
    const [issuedBookRows] = await connection.execute('SELECT * FROM user_book WHERE book_id = ?', [book_id]);
    console.log(issuedBookRows);
    if (issuedBookRows.length > 0) {
      connection.release();
      return res.status(401).json({ message: 'Book is already issued' });
    }

    //check if the user has already issued a book
    const [issuedBookRowsUser] = await connection.execute('SELECT * FROM user_book WHERE user_id = ?', [user_id]);
    if (issuedBookRowsUser.length > 0) {
      connection.release();
      return res.status(401).json({ message: 'User has already issued a book' });
    }

    // Issue the book
    const issueBookQuery = 'INSERT INTO user_book (book_id, user_id,issued_date,return_date) VALUES (?, ?, ?, ?)';
    const currentDate = new Date().toISOString().split('T')[0];
    const returnDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];

    connection.execute(issueBookQuery, [bookRows[0].id, user_id,currentDate,returnDate]);

    // Send the token in the response
    setTimeout(() => {
      connection.release();
    }, 1000);
    return res.status(200).json({ message: 'Book issued successfully' });
  }
  catch (error) {
    console.error('Error during issuing book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// for returning book
app.post('/return_book', async (req, res) => {
  const connection = await getConnection();
  var { user_id } = req.body;
  // Check if the user exists in the database
  try {

    //check if the user has already issued a book
    const [issuedBookRowsUser] = await connection.execute('SELECT * FROM user_book WHERE user_id = ?', [user_id]);
    if (issuedBookRowsUser.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'User has not issued a book' });
    }

    // return the book
    const issueBookQuery = 'DELETE FROM user_book WHERE user_id = ?';
    connection.execute(issueBookQuery, [user_id]);

    // user
    const [user] = await connection.execute('SELECT * FROM user WHERE id = ?', [user_id]);
    const [book] = await connection.execute('SELECT * FROM book WHERE id = ?', [issuedBookRowsUser[0].book_id]);
    // Send the token in the response
    setTimeout(() => {
      connection.release();
    }, 1000);

    const mailOptions = {
      from:process.env.email,
      to:process.env.email,
      subject: 'Check Book Shelf',
      text:  `${user[0].first_name} has Return the Book ${book[0].name}} , issued date ${issuedBookRowsUser[0].issued_date}}`,
      html: '<p>HTML content of the email</p>',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    return res.status(200).json({ message: 'Book returned successfully' });
  }
  catch (error) {
    console.error('Error during returning book:', error);
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
