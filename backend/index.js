// index.js
const express = require('express');
const mongoose = require('mongoose');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
// Connect to MongoDB
mongoose.connect('mongodb://localhost/quiz_app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Middleware
app.use(express.json());

// Routes
app.use('/api/quiz', quizRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
