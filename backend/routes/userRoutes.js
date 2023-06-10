const express = require('express')
const router = express.Router()
const {loginUser, createUser, getUser  } = require("../controllers/userController")
const db = require('../db');
const verifyToken  = require("../middleware/userAuth")


//Middleware to attach db object to req object
const attachDb = (req, res, next) => {
    req.db = db;
    next();
  };
router.use(attachDb); 

router.post('/users',  createUser)
router.post('/users/login',  loginUser)
router.get('/user', verifyToken, getUser);

module.exports = router