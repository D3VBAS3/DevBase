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

let authentication = sequelize.define('members', { //creates Model for user/pword table in postgres db
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING
})



app.use(express.static(__dirname + './../client/'));
app.use(bodyParser());   
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.post('/login', (req, res) => {
  let rando = Math.floor(Math.random()*1000);
  const token = createToken(rando);
  authentication.findOne({where: { username: req.body.username, password: req.body.password }}).then(function(result){
    if(result === null){
      res.status(401);
      res.send();
    }
    authentication.destroy({where: {username: req.body.username}}).then(function(){
      authentication.create({username: req.body.username, password: req.body.password, token: token}).then(function(data){
        res.json(data);
      })                        //when a login is attemped, check the table in the db for a name/password match.
    })                          //if it exists it creates a unique session JWT(token), deletes the row with the 
  });                           //user/password, and immediately creates a new row with the name, password, AND session token in the db.
});

app.post('/logout', (req, res) => {
  res.end();                          //sends user back to login page
});


app.get('/query', (req, res) => {     //this is fired from React on a regular interval, returns the
  let a = req.headers['username'];    //db table matching the logged in users username 
  sequelize.query("SELECT * FROM " + a + "s", { type: sequelize.QueryTypes.SELECT})
      .then(function(users) {
      res.json(users);
      })
});



app.post('/setdata', function(req, res) {
  let action = req.body.Command.toUpperCase();  // grab the type of command from the incoming request
  let user = req.body.User;                     // grab the username from the incoming request
  console.log('I POSTED TOO!');
  if (!user) {
    res.send('No User ERROR')                    //if there is no user something is fucked up
  }
  let userTable;                              
  switch(action){                                 //act according to the command that was given

    case 'WRITE':
      let data = parse(req.body.body);                //parse (defined below) returns a Sequelize Model Object with the same keys and sequelize dataType values (eg {name: 'mike'} => {name: Sequelize.STRING})
      userTable = sequelize.define(user, data)        //creates a table called the user's username using the Model created in the previous line of code
      // console.log(data);
      sequelize.sync({ force: false }).then(function () {   
        return userTable.create(JSON.parse(req.body.body));  //places table in db and then creates a new entry in the table with user submitted data
      });

      break;

    case 'READ':          
      sequelize.query("SELECT * FROM " + user + "s", { type: sequelize.QueryTypes.SELECT})
      .then(function(users) {
      res.send(users);                //returns the entire table matching the user's username
      })

      break;

    default: 

    res.send('Invalid Command');    //if command not found return error message

  }

})
/////////to manually add users to members table because we dont have create user functionality yet, comment out lines 35,36 and insert this block before 35, run program once, then revert///////////////
// authentication.sync({ force: true }).then(function () {
//     return authentication.create({username: 'grundle', password: 'bundle'}),
//     authentication.create({username: 'shermarcus', password: 'code'}),
//     authentication.create({username: 'mike', password: 'b'}),
//     authentication.create({username: 'chris', password: 'c'}),
//     authentication.create({username: 'morgan', password: 'p'});
//   })

app.get('*', (req, res) => {              //this is react router thing, idk what it does.
  res.status(200).sendFile(path.resolve(__dirname + './../client/static/index.html'));
});



app.listen(8080, () => {
  sequelize.sync();
  console.log('listening on port 8080...');
})

function parse(obj) {                 //recursivly parses Object to create Sequelize Model
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
    resObj[key] = sequelizeObj[typeof obj[key]];
  }
}
  return resObj;
}


/////////////DEVBASE///////////////////////////////////
// your demo project needs to npm install 'request' to work
// const request = require('request');
//
//
////formatted sample//////////
// function BASE(command){
//   return function(req, res, next){
//   request.post('http://localhost:8080/setdata',
//   {form: {body: JSON.stringify(req.body), Command: command, User: 'mike', Token: '234234234234'}},
//   function(err, response, body){
//     console.log(body);
//     res.send(body);
//   });
//
//   }
// }
//
//
//////////////////////////////////////////////////////////////
