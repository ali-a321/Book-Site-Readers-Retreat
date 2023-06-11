const express = require('express')
const router = express.Router()
const {getAllBooks, updateBook, deleteBook, addBook, getBooksDesc, getBooksAsc,
    getBestBooks, getSingleBook, getUserCart, addBooksToCart} = require("../controllers/bookController")
const db = require('../db');
     
//Middleware to attach db object to req object
const attachDb = (req, res, next) => {
    req.db = db;
    next();
  };
router.use(attachDb);  
router.get('/books',  getAllBooks)

//Get singular book
router.get('/books/:id', getSingleBook)

// GET books above 19 points as best performers
router.get('/booksbest', getBestBooks)

//FILTER
router.get('/booksascending', getBooksAsc)
router.get('/booksdescending', getBooksDesc)

router.post('/books', addBook)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

// User Cart
router.post('/cartuser/:id/add', addBooksToCart);
router.get('/cartuser/:id', getUserCart);

module.exports = router