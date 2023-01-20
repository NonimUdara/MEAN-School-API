const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Student
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
    },
    index: {
        type: String,
    },
    stream: {
        type: String,
    },
    year: {
        type: String,
    },
    email: {
        type: String,
    },
    nic: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String
    }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);


module.exports.getStudentById = function(id, callback){
    Student.findById(id, callback);
}

module.exports.getStudentByIndex = function(index, callback){
    const query = {index: index}
    Student.findOne(query, callback);
}

module.exports.addStudent = function(newStudent, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if(err) throw err;
            newStudent.password = hash;
            newStudent.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}