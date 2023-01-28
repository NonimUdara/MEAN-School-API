const mongoose = require('mongoose');
const config = require('../config/database');

// User Student
const Schema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    }
});

module.exports = mongoose.model('Contactus', Schema);

module.exports.add = function (newMessage, callback) {
    newMessage.save(callback);
}