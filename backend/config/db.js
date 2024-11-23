const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
