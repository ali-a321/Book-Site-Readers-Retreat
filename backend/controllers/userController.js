const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db');

//REGISTER, POST, /users
const createUser = async (req, res) => {
    try {
      const { username, email ,password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user into the database
      const query = 'INSERT INTO users (username,email, password) VALUES (?, ?, ?)';
      db.query(query, [username, email, hashedPassword], (error, result) => {
        if (error) {
          console.error('Error registering user:', error);
          return res.status(500).json({ message: 'Failed to register user' });
        }
  
        return res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  };

//LOGIN, POST, /users/login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (error, results) => {
      if (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Failed to log in' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Username does not exist' });
      }

      // Verify the password
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to log in' });
  }
};

  //GET, /user
  const getUser = (req, res) => {
    const { username, email, id } = req;
    console.log(username);
    console.log(id);
    res.json({ username, id, email });
  };

module.exports = { createUser, loginUser, getUser}