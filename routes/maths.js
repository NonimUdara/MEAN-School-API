const express = require("express");
const app = express();
const bookRoute = express.Router();
let Book = require("../models/maths");

bookRoute.route('/addmaths').post((req, res, next)=>{
    Book.create(req.body,(error, data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

bookRoute.route('/').get((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next (error)
        }else{
            res.json(data)
        }
    });
});

bookRoute.route('/readmaths/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});

bookRoute.route('/updatemaths/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Book updated successfully!')
        }
    })
})

bookRoute.route('/deletemaths/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = bookRoute;