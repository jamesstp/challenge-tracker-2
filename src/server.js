const express = require('express');
const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2');

const secretKey = 'UVNMNHLG99Z7ICZKTJ1F'; // Replace with your own secret key
const port = 3000; // Choose the appropriate port for your server

const app = express();

const connection = mysql.createConnection({
  host: 'colt-hammond',
  user: 'group-8',
  password: 'Bigfishy8',
  database: 'group-8-database',
});

app.use(express.json());

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Implement your own logic for user authentication using the database connection
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error retrieving user from database:', error);
      return res.status(500).json({ error: 'Server error' });
    }

    const user = results[0];

    if (user) {
      // Authentication successful, generate JWT token
      const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Implement your own logic for user creation using the database connection
  connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {
    if (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Server error' });
    }

    const userId = results.insertId;

    // Generate JWT token for the new user
    const token = jwt.sign({ userId, username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Example protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
}

// GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Resolver functions
const root = {
  hello: () => 'Hello, world!',
};

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables the GraphiQL interface for testing and exploration
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Things you need to change:
// 5. Implement your own logic for user authentication and user creation in the '/login' and '/signup' endpoints using the database connection.
// 6. Customize the GraphQL schema and implement resolver functions according to your application's needs.
// 7. Test the login, signup, and protected routes.
// 8. Extend the API with additional endpoints and functionality as required.
