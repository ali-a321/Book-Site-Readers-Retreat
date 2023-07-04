const express = require('express')
const router = express.Router()
const {sendEmail,sendEmailSocial} = require("../controllers/emailController")
const db = require('../db');

//Middleware to attach db object to req object
const attachDb = (req, res, next) => {
    req.db = db;
    next();
  };
router.use(attachDb); 

router.post('/sendemail', sendEmail)
router.post('/sendemailsocial', sendEmailSocial)


module.exports = router