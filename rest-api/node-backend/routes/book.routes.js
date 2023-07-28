const express = require('express');
const app = express();
var bookRoute = express.Router(); //important module
let Book = require('../model/Book');


//Get All Books
bookRoute.get("/", (req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next(error)
    }
    else {
      res.json(data)
    }
  })
})
//Get Book bt id for update and delete
bookRoute.get("/:id", (req, res, next) => {
  Book.findById(req.params.id, (error, data)=>{
    if(error) {
      return next(error)
    }else{
      res.json(data)
    }
  })
})
//get featured books
bookRoute.get('/featured', (req, res) => {
  Book.find({ featured: {$ne: null}}).select('_id').then((Book)=> {
    res.json(Book)
  }).catch((error) => {
    res.status(500).json({error: "An error occured while fetching featured book"})
  })
})
//Add book
bookRoute.route('/').post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
});

// Update 
bookRoute.route('/:id').put((req, res, next) => {
  Book.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Book updated successfully!');
    }
  });
});

// Delete book
bookRoute.route('/:id').delete((req, res, next) => {
  Book.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({msg: data})
      console.log("Book deleted successfully")
    }
  })
})

module.exports = bookRoute;
