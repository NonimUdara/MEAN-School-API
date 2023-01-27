const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

// Register
router.post('/add', (req, res, next) => {
  let newResource = new Resource({
    name: req.body.name,
    rname: req.body.rname,
    subject: req.body.subject,
    stream: req.body.stream,
    author: req.body.author,
    link: req.body.link
  });

  Resource.add(newResource, (err, resource) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to Add Meeting' });
    } else {
      res.json({ success: true, msg: 'Meeting Added' });
    }
  });
});

router.route('/').get((req,res)=>{
    Resource.find((error,data)=>{
      if(error){
          return next (error)
      }else{
          res.json(data)
      }
  });
});

router.route('/read/:id').get((req,res)=>{
    Resource.findById(req.params.id,(error,data)=>{
      if(error){
          return next(error)
      }else{
          res.json(data)
      }
  });
});

router.route('/update/:id').put((req, res, next) => {
    Resource.findByIdAndUpdate(req.params.id, {
      $set: req.body
  }, (error, data) => {
      if (error) {
          return next(error);
          console.log(error)
      } else {
          res.json(data)
          console.log('Resource updated successfully!')
      }
  })
})

router.route('/delete/:id').delete((req, res, next) => {
    Resource.findByIdAndRemove(req.params.id, (error, data) => {
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