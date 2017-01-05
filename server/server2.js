const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const createToken = require('./util/createToken');

// sessions and redis 
// const redis = require('redis');
// const session = require('express-session');
// const redisStore = require('connect-redis')(session);
// const redisClient = redis.createClient();

// const bcrypt = require('bcryptjs');

// app.use(session({
//   secret: 'secret',
//   store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 260 }),
//   saveUninitialized: false,
//   resave: false
// }));

app.use(express.static(__dirname + './../client/'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + './../client/static/index.html'));
});

app.post('/login', (req, res) => {
  //console.log('RESPONSE IN SERVER:', res);
  //console.log('req.body:', req.body);
  //res.cookie('user_id_cookie', req.body.username + '1', { httpOnly: true });
  const token = createToken(1);
  console.log('server:', token);
  res.json({ token });
});

app.post('/logout', (req, res) => {
  res.end();
});

app.listen(8080, () => {
  console.log('Listening on PORT: 8080!');
});