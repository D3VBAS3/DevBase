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
  password: Sequelize.STRING,
  token: Sequelize.STRING
})



app.use(express.static(__dirname + './../client/'));
app.use(bodyParser());   //front-end had bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use((req,res,next) => {console.log(req.url, req.method); next()})


app.post('/login', (req, res) => {
  //console.log('RESPONSE IN SERVER:', res);
  //console.log('req.body:', req.body);
  //res.cookie('user_id_cookie', req.body.username + '1', { httpOnly: true });

  let rando = Math.floor(Math.random()*1000);
  const token = createToken(rando);
  //console.log('server:', token);
  authentication.findOne({where: { username: req.body.username, password: req.body.password }}).then(function(result){
    if(result === null){
      res.status(401);
      res.send();
    }
    authentication.destroy({where: {username: req.body.username}}).then(function(){
      authentication.create({username: req.body.username, password: req.body.password, token: token}).then(function(data){
        res.json(data);
      })
    })
  });
});

app.post('/logout', (req, res) => {
  res.end();
});


app.get('/query', (req, res) => {
  let a = req.headers['username'];
//
  sequelize.query("SELECT * FROM " + a + "s", { type: sequelize.QueryTypes.SELECT})
      .then(function(users) {
      res.json(users);
      })
console.log(a);
//res.json('hello');
});



app.post('/setdata', function(req, res) {
  let action = req.body.Command.toUpperCase();
  //let user = req.headers.User;
  let user = 'mike';   //SWITCH FOR REAL USER
  console.log('I POSTED TOO!')
  if (!user) {
    res.send('ERROR')
  }
  let userTable;
  switch(action){

    case 'WRITE':
      let data = parse(req.body.body);
      userTable = sequelize.define(user, data)
      // console.log(data);
      sequelize.sync({ force: false }).then(function () {
        return userTable.create(JSON.parse(req.body.body));
      });

      break;

    case 'READ':
      sequelize.query("SELECT * FROM " + user + "s", { type: sequelize.QueryTypes.SELECT})
      .then(function(users) {
      res.send(users);
      })

      break;

    default: 

    res.send('Invalid Command');

  }

})
/////////to manually add users to members table//////////////
// authentication.sync({ force: true }).then(function () {
//     return authentication.create({username: 'grundle', password: 'bundle'}),
//     authentication.create({username: 'shermarcus', password: 'code'}),
//     authentication.create({username: 'mike', password: 'b'}),
//     authentication.create({username: 'chris', password: 'c'}),
//     authentication.create({username: 'morgan', password: 'p'});
//   })

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + './../client/static/index.html'));
});



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
// function BASE(command){
//   return function(req, res, next){
//   request.post('http://localhost:8080/setdata',
//   {form: {body: JSON.stringify(req.body), Command: command, User: 'mike', Token: '234234234234'}},
//   function(err, response, body){
//     console.log(body);
//     res.send(body);
//   });

//   }
// }
//////////////////////////////////////////////////////////////
