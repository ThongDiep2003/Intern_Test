const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start server
const PORT = 8080; // Cố định cổng
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
