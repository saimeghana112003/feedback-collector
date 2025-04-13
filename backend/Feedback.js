// Feedback.js
const mongoose = require('mongoose');

// Define the structure of each feedback entry
const feedbackSchema = new mongoose.Schema({
    name: String,
    message: String,
}, { timestamps: true }); // Auto adds createdAt & updatedAt fields

// Create the model (table)
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Export it so we can use it in server.js
module.exports = Feedback;
