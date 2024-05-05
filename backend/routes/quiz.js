// routes/quiz.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quiz questions
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new quiz question
router.post('/', async (req, res) => {
  const quiz = new Quiz({
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer
  });
  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
