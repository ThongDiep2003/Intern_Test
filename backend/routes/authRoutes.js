const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const config = require('../config/config');
const verifyToken = require('./authMiddleware');

const router = express.Router();



// Register
router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (email, password, name, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, hashedPassword, name, phone], (err) => {
    if (err) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login successful' });
  });
});

router.get('/check', verifyToken, (req, res) => {
    res.status(200).json({ message: 'User is logged in', user: req.user });
  });

module.exports = router;
