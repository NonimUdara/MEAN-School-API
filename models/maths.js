const mongoose = require('mongoose');

// Maths
const MathsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: String,
    },
    title: {
        type: String,
    },
    duration: {
        type: String,
    },
    link: {
        type: String,
    },
    id: {
        type: String,
    },
    passcode: {
        type: String,
    }
});

module.exports = mongoose.model('Maths', MathsSchema);