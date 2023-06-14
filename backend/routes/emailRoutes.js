const express = require('express')
const router = express.Router()
const sendEmail = require("../controllers/emailController")
const db = require('../db');

//Middleware to attach db object to req object
const attachDb = (req, res, next) => {
    req.db = db;
    next();
  };
router.use(attachDb); 

router.post('/sendemail', sendEmail)

module.exports = router