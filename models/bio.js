const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Student
const BioSchema = mongoose.Schema({
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

module.exports = mongoose.model('Biology', BioSchema);


// module.exports.getStudentById = function(id, callback){
//     Student.findById(id, callback);
// }

// module.exports.getStudentByIndex = function(index, callback){
//     const query = {index: index}
//     Student.findOne(query, callback);
//}

module.exports.addBio = function(newBio, callback){
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newStudent.password, salt, (err, hash) => {
            // if(err) throw err;
            // newStudent.password = hash;
            newBio.save(callback);
    //     });
    // });
}

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }