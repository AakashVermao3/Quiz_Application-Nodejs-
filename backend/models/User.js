const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    answers: {
        type: [String], // Store answers as an array of strings
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
