const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Stream = require('../models/bio');

// Register
router.post('/add', (req, res, next) => {
  let newBio = new Stream({
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    duration: req.body.duration,
    link: req.body.link,
    id: req.body.id,
    passcode: req.body.passcode
  });

  Stream.addBio(newBio, (err, bio) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register student' });
    } else {
      res.json({ success: true, msg: 'Student registered' });
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

router.route('/read/:id').get((req,res)=>{
  Student.findById(req.params.id,(error,data)=>{
      if(error){
          return next(error)
      }else{
          res.json(data)
      }
  });
});

router.route('/update/:id').put((req, res, next) => {
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

router.route('/delete/:id').delete((req, res, next) => {
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