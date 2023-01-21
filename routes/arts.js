const express = require('express');
const router = express.Router();
const Stream = require('../models/art');

// Register
router.post('/add', (req, res, next) => {
  let newMeeting = new Stream({
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    duration: req.body.duration,
    link: req.body.link,
    id: req.body.id,
    passcode: req.body.passcode
  });

  Stream.add(newMeeting, (err, bio) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to Add Meeting' });
    } else {
      res.json({ success: true, msg: 'Meeting Added' });
    }
  });
});

router.route('/').get((req,res)=>{
    Stream.find((error,data)=>{
      if(error){
          return next (error)
      }else{
          res.json(data)
      }
  });
});

router.route('/read/:id').get((req,res)=>{
    Stream.findById(req.params.id,(error,data)=>{
      if(error){
          return next(error)
      }else{
          res.json(data)
      }
  });
});

router.route('/update/:id').put((req, res, next) => {
    Stream.findByIdAndUpdate(req.params.id, {
      $set: req.body
  }, (error, data) => {
      if (error) {
          return next(error);
          console.log(error)
      } else {
          res.json(data)
          console.log('Meeting updated successfully!')
      }
  })
})

router.route('/delete/:id').delete((req, res, next) => {
    Stream.findByIdAndRemove(req.params.id, (error, data) => {
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