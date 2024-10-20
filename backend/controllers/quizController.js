
const User = require('../models/User');

// Correct answers for the quiz
const correctAnswers = [
    'C', // Answer 1
    'A', // Answer 2
    'A', // Answer 3
    'A', // Answer 4
    'B'  // Answer 5
];

// Controller to handle quiz submission
const submitQuiz = async (req, res) => {
    const { fullName, email, userAnswers } = req.body; // Use userAnswers

    // Validate the input
    if (!fullName || !email || !Array.isArray(userAnswers) || userAnswers.length !== 5) {
        return res.status(400).json({ message: 'Please provide full name, email, and all answers.' });
    }


        // Check if the user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User with email ${email} already exists.`);
            return res.status(400).json({ message: 'You have already given the test.' });
        }
    } catch (error) {
        console.error('Error checking for existing user:', error);
        return res.status(500).json({ message: 'Error checking user', error: error.message });
    }


    // Calculate the score
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score++;
        }
    });

    // Create a new user in the database
    const user = new User({
        fullName,
        email,
        answers: userAnswers, // Save the user's answers
        score
    });

    try {
        await user.save();
        const resultMessage = score >= 3 ? 'You have passed the test!' : 'You have failed the test.';
        res.status(201).json({ message: resultMessage, score });
    } catch (error) {
        console.error('Error saving user data:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error saving user data', error: error.message });
    }
};

module.exports = {
    submitQuiz,
};





