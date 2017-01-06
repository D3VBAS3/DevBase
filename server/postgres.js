'use strict';
const pg = require('pg');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://tester:ilovetesting@localhost:5432/devbase');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const express = require('express');
const fs = require('fs');
const path = require('path');
const createToken = require('./util/createToken');

const app = express();

let authentication = sequelize.define('members', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})



app.use(express.static(__dirname + './../client/'));
app.use(bodyParser());   //front-end had bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + './../client/static/index.html'));
});

app.post('/login', (req, res) => {
  //console.log('RESPONSE IN SERVER:', res);
  //console.log('req.body:', req.body);
  //res.cookie('user_id_cookie', req.body.username + '1', { httpOnly: true });
  const token = createToken(1);
  console.log('server:', token);
  res.json({ token: token, username: req.body.username});
});

app.post('/logout', (req, res) => {
  res.end();
});
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



app.post('/setdata', function(req, res) {
  //let user = req.cookies.username
  let user = 'mike';
  console.log('I POSTED TOO!')
  if (!user) {
    res.send('ERROR')
  }
  let data = parse(req.body.body);

  let userTable = sequelize.define(user, data)

console.log(data);

  sequelize.sync({ force: true }).then(function () {
    return userTable.create(JSON.parse(req.body.body));
  })
})






app.listen(8080, () => {
  sequelize.sync();
  console.log('listening on port 8080...');
})

function parse(obj) {
  obj = JSON.parse(obj);
  let resObj = {};
  let sequelizeObj = {
    'string': Sequelize.STRING,
    'number': Sequelize.INTEGER,
    'boolean': Sequelize.BOOLEAN
  }


  for(let key in obj) {

    if(Array.isArray(obj[key])) {
      let ans = sequelizeObj[typeof obj[key][0]]
      resObj[key] = Sequelize.ARRAY(ans);
    }

  else if(typeof obj[key] === 'object') {
    resObj[key] = parse(obj[key])
  }
  else {

    resObj[key] = sequelizeObj[typeof obj[key]]

  }
}
//console.log(resObj);
  return resObj;
}


/////////////DEVBASE///////////////////////////////////////////
// function devBaseRequest(command) {
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Command', command);
//   res.setHeader('Source', 'localhost:3000');
//   res.setHeader('Cookie', 'ourCookie');
//   res.redirect('http://localhost:9999/loggedin');
// }
//////////////////////////////////////////////////////////////
