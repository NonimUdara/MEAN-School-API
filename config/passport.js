const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const config = require('./database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if (jwt_payload.data.userType == "teacher") {
            Teacher.getTeacherById(jwt_payload.data._id, (err, teacher) => {
                if (err) {
                    return done(err, false);
                }
                if (teacher) {
                    return done(null, teacher);
                } else {
                    return done(null, false);
                }
            });
        } 
            passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
                Student.getStudentById(jwt_payload.data._id, (err, student) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (student) {
                        return done(null, student);
                    } else {
                        return done(null, false);
                    }
                });
            }));
        
    }));
}