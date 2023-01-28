const express = require('express');
const router = express.Router();
const Stream = require('../models/contactus');

// Add
router.post('/add', (req, res, next) => {
  let newMessage = new Stream({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  Stream.add(newMessage, (err, message) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to Add Message' });
    } else {
      res.json({ success: true, msg: 'Message Added' });
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

module.exports = router;