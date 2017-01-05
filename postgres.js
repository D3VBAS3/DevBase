'use strict';
const pg = require('pg');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://morganpierson:mlp3330207@localhost:5432/devbase');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

let authentication = sequelize.define('members', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})




app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/loggedin', function(req, res) {
  let userName = req.header.username;

  //verify user against database username/password
  //if valid:

  res.cookie('username', userName);

})

app.post('/', function(req, res) {
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






app.listen(9999, () => {
  sequelize.sync();
  console.log('listening on port 9999...');
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
