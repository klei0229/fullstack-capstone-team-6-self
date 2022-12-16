const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const querystring = require('querystring');

dotenv.config();
app.use(express.json({ limit: '50mb' }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../static/index.html'))
);

app.use('/api/auth', require('./api/auth'));
app.use('/api/restaurants', require('./api/restaurants'));
app.use('/api/admin-restaurants', require('./api/admin-restaurants'));
app.use('/api/menus', require('./api/menus'));
app.use('/api/items', require('./api/items'));
app.use('/api/menu', require('./api/menu'));

// google login and authorization

app.get('/google/login', async (req, res) => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  const response_type = 'token';
  const redirect_uri = 'localhost:3000/a_redirect_uri';

  const loginToGoogle =
    url +
    querystring.stringify({
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
      ].join(' '),
      include_granted_scopes: true,
      response_type,
      redirect_uri,
      client_id: GOOGLE_CLIENT_ID,
    });

  res.redirect(loginToGoogle);
});

//google user access token

app.get('/a_redirect_uri', async (req, res, next) => {
  const url = 'https://www.googleapis.com/auth/userinfo.profile?';
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

  const response = await axios.post(url, {
    headers: {
      Authorization: `Bearer`,
    },
  });

  res.redirect('/');
});

module.exports = app;
