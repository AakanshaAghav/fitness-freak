const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();

// ✅ Connect to MongoDB
require('./models/db.js'); // Ensure this connects using mongoose

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Parses JSON request body
app.use(bodyParser.json()); // Optional

// ✅ Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const fitnessRoutes = require('./routes/fitness'); // Contains /save-fitness-data and /generate-diet-plan

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api/fitness', fitnessRoutes); // All fitness-related APIs

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
