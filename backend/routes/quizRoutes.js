
const express = require('express');
const { submitQuiz } = require('../controllers/quizController');

const router = express.Router();

// Route to submit the quiz
router.post('/submit', submitQuiz);

module.exports = router;
