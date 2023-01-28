const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Student = require('../models/student');

// Register
router.post('/register', (req, res, next) => {
  let newStudent = new Student({
    name: req.body.name,
    index: req.body.index,
    stream: req.body.stream,
    phone: req.body.phone,
    email: req.body.email,
    nic: req.body.nic,
    password: req.body.password,
    userType: "student"
  });

  Student.addStudent(newStudent, (error, student) => {
    if (error) {
      // res.json({ success: false, msg: 'Failed to register student' });
      // console.log('err');
      res.status(500).send(error)
    } else {
      res.send(student)
      // res.json({ success: true, msg: 'Student registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const index = req.body.index;
  const password = req.body.password;

  Student.getStudentByIndex(index, (err, student) => {
    if (err) throw err;
    if (!student) {
      return res.json({ success: false, msg: "Student not found" });
    }

    Student.comparePassword(password, student.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: student }, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          student: {
            id: student._id,
            name: student.name,
            index: student.index,
            stream: student.stream,
            phone: student.phone,
            email: student.email,
            nic: student.nic
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong Password' });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false, name: "khgduaydg" }), (req, res, next) => {
  res.json({
    student: {
      _id: req.user._id,
      name: req.user.name,
      index: req.user.index,
      stream: req.user.stream,
      phone: req.user.phone,
      email: req.user.email,
      nic: req.user.nic
    }  
  });
});

router.route('/').get((req,res)=>{
  Student.find((error,data)=>{
      if(error){
          return next (error)
      }else{
          res.json(data)
      }
  });
});

router.route('/read-student/:id').get((req,res)=>{
  Student.findById(req.params.id,(error,data)=>{
      if(error){
          return next(error)
      }else{
          res.json(data)
      }
  });
});

router.route('/update-student/:id').put((req, res, next) => {
  Student.findByIdAndUpdate(req.params.id, {
      $set: req.body
  }, (error, data) => {
      if (error) {
          return next(error);
          console.log(error)
      } else {
          res.json(data)
          console.log('Student updated successfully!')
      }
  })
})

router.route('/delete-student/:id').delete((req, res, next) => {
  Student.findByIdAndRemove(req.params.id, (error, data) => {
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