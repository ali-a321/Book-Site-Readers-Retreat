const express = require('express');
const router = express.Router();
const {sendCode,getUserEmail,getUserProfile, getAccessToken} = require("../controllers/oauthController")

//Github
router.get('/callback/:code', sendCode);
router.get('/useremail', getUserEmail);
router.get('/userprofile', getUserProfile);
router.post('/exchange', getAccessToken);

// Google
// router.get('/googlecallback/:code', sendGoogleCode);
// router.get('/googleuserprofile', getGoogleUserProfile);
// router.post('/googleexchange', getGoogleAccessToken);



module.exports = router;
