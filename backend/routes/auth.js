const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const router = express.Router();
const { signup, login } = require('../controllers/AuthControllers');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/auth/oauth2callback';

// 🌐 Route to start Google OAuth flow
router.get('/google-auth', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.heart_rate.read',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.oxygen_saturation.read'
  ];

  const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(' ')}&access_type=offline&prompt=consent`;

  res.redirect(oauthUrl);
});

// ✅ OAuth callback route
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, refresh_token, expires_in } = response.data;
    console.log('✅ Access Token:', access_token);
    console.log('✅ Refresh Token:', refresh_token);

    // TODO: Save refresh_token in DB associated with your user for future use

    // Redirect to frontend with access token
    res.redirect(`http://localhost:3000/homedash?token=${access_token}`);
  } catch (err) {
    const errData = err.response?.data || err.message;
    console.error('❌ OAuth Token Exchange Error:', JSON.stringify(errData, null, 2));
    res.status(500).send(`OAuth Failed: ${JSON.stringify(errData)}`);
  }
});

// 🔄 Route to refresh access token using stored refresh token
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body; // Get refresh token from frontend or DB

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, expires_in } = response.data;
    res.json({ access_token, expires_in });
  } catch (err) {
    console.error('❌ Refresh Token Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to refresh access token' });
  }
});

// 🔐 Local auth routes
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;
