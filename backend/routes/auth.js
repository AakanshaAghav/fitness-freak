const express = require('express');
const axios = require('axios');
const qs = require('querystring');  // <-- import querystring for URL encoding
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/oauth2callback';

router.get('/google-auth', (req, res) => {
  const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.heart_rate.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.oxygen_saturation.read' // Add this
];

const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(' ')}&access_type=offline&prompt=consent`;

  res.redirect(oauthUrl);
});

router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = response.data;
    console.log('Access Token:', access_token);

    res.redirect(`http://localhost:3000/dashboard?token=${access_token}`);
  } catch (err) {
    console.error('OAuth Token Exchange Error:', err.response?.data || err.message);
    res.status(500).send('OAuth Failed');
  }
});

module.exports = router;
