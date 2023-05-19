const express = require('express');
const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql2');

const secretKey = 'UVNMNHLG99Z7ICZKTJ1F'; // Replace with your own secret key
const port = 3000; // Choose the appropriate port for your server

const app = express();

const connection = mysql.createConnection({
  host: 'colt-hammond-host',
  user: 'colt-hammond',
  password: 'Bigfishy7',
  database: 'Colt',
});

app.use(express.json());

// Simulated user data
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and perform authentication (replace with your own logic)
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // Authentication successful, generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    // Authentication failed
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken (replace with your own logic)
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    // Username already exists
    res.status(409).json({ error: 'Username already taken' });
  } else {
    // Create a new user (replace with your own logic)
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    // Generate JWT token for the new user
    const token = jwt.sign({ userId: newUser.id, username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  }
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

// 2. Implement your own logic for user authentication and user creation.
// 3. Customize the GraphQL schema and implement resolver functions according to your application's needs.
// 4. Test the login, signup, and protected routes.
// 5. Extend the API with additional endpoints and functionality as required.
