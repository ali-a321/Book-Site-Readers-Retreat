const axios = require('axios');

//GITHUB
// Step 1: Exchange the authorization code for an access token
// POST /exchange
const getAccessToken = async (code) => {
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code
      },
      headers: {
        Accept: 'application/json'
      }
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to exchange authorization code for access token');
  }
};

// Step 2: Fetch the user's profile using the access token
// GET /userprofile
const getUserProfile = async (accessToken) => {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

// Step 3: Fetch the user's email using the access token
// GET /useremail
const getUserEmail = async (accessToken) => {
  try {
    const response = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    const userEmails = response.data;
    console.log(userEmails)
    const primaryEmail = userEmails.find(email => email.primary);

    return primaryEmail.email;
  } catch (error) {
    throw new Error('Failed to fetch user email');
  }
};

// GET /callback/:code
const sendCode = async (req, res) => {
  const { code } = req.params;

  try {
    const accessToken = await getAccessToken(code);
    const userProfile = await getUserProfile(accessToken);
    // const userEmail = await getUserEmail(accessToken)
    // // Send the userProfile data in the response
    // const userData = {
    //   profile: userProfile,
    //   email: userEmail
    // };

    // Send the userData object in the response
    res.json(userProfile);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send('Authentication failed!');
  }
};


//GOOGLE

// Step 1: Exchange the authorization code for an access token
// POST /googleexchange
const getGoogleAccessToken = async (code) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        client_id: process.env.GOOGLE_CLIENTID,
        client_secret: process.env.GOOGLE_CLIENTSECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to exchange authorization code for access token');
  }
};

// Step 2: Fetch the user's profile using the access token
// GET /googleuserprofile
const getGoogleUserProfile = async (accessToken) => {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

// GET /googlecallback/:code
const sendGoogleCode = async (req, res) => {
  const { code } = req.params;
  
  try {
    const accessToken = await getGoogleAccessToken(code);
    const userProfile = await getGoogleUserProfile(accessToken);
    console.log(userProfile)
    // Send the userProfile data in the response
    res.json(userProfile);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send('Authentication failed!');
  }
};



module.exports = {sendCode,getUserEmail,getUserProfile, getAccessToken,
                 sendGoogleCode,getGoogleAccessToken,getGoogleUserProfile };
