const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Teacher
const TeacherSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    age: {
        type: String,
        required:true
    },
    worked: {
        type: String,
        required:true
    },
    subject: {
        type: String,
        required:true
    },
    nic: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    username: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required:true
    }
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);


module.exports.getTeacherById = function(id, callback){
    Teacher.findById(id, callback);
}

module.exports.getTeacherByIndex = function(username, callback){
    const query = {username: username}
    Teacher.findOne(query, callback);
}

module.exports.addTeacher = function(newTeacher, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTeacher.password, salt, (err, hash) => {
            if(err) throw err;
            newTeacher.password = hash;
            newTeacher.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}