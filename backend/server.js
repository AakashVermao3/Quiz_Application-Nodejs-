const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const path = require('path'); // Import path module
const connectDB = require('./config/db'); // Import the connectDB function
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/public'))); // Serve static files

// Connect to MongoDB
connectDB(); // Use the connectDB function to establish the connection

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/index.html')); // Send index.html
});

// Quiz routes
app.use('/api/quiz', quizRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
