const mongoose = require('mongoose');
const config = require('../config/database');

// User Student
const Schema = mongoose.Schema({
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
        required: true
    }
});

module.exports = mongoose.model('Biology', Schema);

module.exports.add = function(newMeeting, callback){
            newMeeting.save(callback);
}