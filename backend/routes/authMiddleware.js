const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Đường dẫn tới file config.js của bạn

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token. Please log in again.' });
    }
    req.user = user; // Lưu thông tin user vào request
    next();
  });
};

module.exports = verifyToken;
