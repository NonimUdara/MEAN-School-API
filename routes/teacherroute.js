const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Teacher = require('../models/teacher');

// Register
router.post('/register', (req, res, next) => {
  let newTeacher = new Teacher({
    name: req.body.name,
    gender: req.body.gender,
    phone: req.body.phone,
    worked: req.body.worked,
    subject: req.body.subject,
    nic: req.body.nic,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType: "teacher"
  });

   Teacher.addTeacher(newTeacher, (error, teacher) => {

  if (error) {
    res.status(500).send(error)
  } else {
    res.send(teacher)
  }
   });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  Teacher.getTeacherByIndex(username, (err, teacher) => {
    if (err) throw err;
    if (!teacher) {
      return res.json({ success: false, msg: "Teacher not found" });
    }

    Teacher.comparePassword(password, teacher.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: teacher }, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          teacher: {
            id: teacher._id,
            name: teacher.name,
            gender: teacher.gender,
            phone: teacher.phone,
            worked: teacher.worked,
            subject: teacher.subject,
            nic: teacher.nic,
            email: teacher.email,
            username: teacher.username,
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong Password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false, nameqqqq: "teacher" }), (req, res, next) => {
  res.json({
    teacher: {
      _id: req.user._id,
      name: req.user.name,
      gender: req.user.gender,
      phone: req.user.phone,
      worked: req.user.worked,
      subject: req.user.subject,
      nic: req.user.nic,
      email: req.user.email,
      username: req.user.username,
      password: req.user.password,
      userType: "teacher"
    }  
  });
});

router.route('/').get((req,res)=>{
  Teacher.find((error,data)=>{
      if(error){
          return next (error)
      }else{
          res.json(data)
      }
  });
});

router.route('/read-teacher/:id').get((req,res)=>{
  Teacher.findById(req.params.id,(error,data)=>{
      if(error){
          return next(error)
      }else{
          res.json(data)
      }
  });
});

router.route('/update-teacher/:id').put((req, res, next) => {
  Teacher.findByIdAndUpdate(req.params.id, {
      $set: req.body
  }, (error, data) => {
      if (error) {
          return next(error);
          console.log(error)
      } else {
          res.json(data)
          console.log('Teacher updated successfully!')
      }
  })
})

router.route('/delete-teacher/:id').delete((req, res, next) => {
  Teacher.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
          return next(error);
      } else {
          res.status(200).json({
              msg: data
          })
      }
  })
})

module.exports = router;