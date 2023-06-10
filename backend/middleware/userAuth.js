const jwt = require('jsonwebtoken')
const db = require('../db');

const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        console.log(decoded);
        const id = decoded.userId;
        console.log(id)
        const sql = 'SELECT username FROM users WHERE id = ?';
        db.query(sql, [id], (err, results) => {
          if (err) {
            console.error('Error retrieving user from the database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
  
          if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
  
          const user = results[0];
          const username = user.username;
  
          req.username = username;
          req.id = id
          next();
        });
      } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Not authorized bucko' });
        return;
      }
    }
  
    if (!token) {
      res.status(401).json({ error: 'Not authorized, no token' });
      return;
    }
  };
  
  module.exports = verifyToken;
  