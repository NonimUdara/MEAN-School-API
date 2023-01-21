const mongoose = require('mongoose');
const config = require('../config/database');

// User Student
const Schema = mongoose.Schema({
    name: {
        type: String,
    },
    rname: {
        type: String,
    },
    subject: {
        type: String,
    },
    stream: {
        type: String,
    },
    author: {
        type: String,
    },
    link: {
        type: String,
    }
});

module.exports = mongoose.model('Resources', Schema);

module.exports.add = function(newResource, callback){
            newResource.save(callback);
}