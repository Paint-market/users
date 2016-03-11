var express = require('express');
var bodyParser = require('body-parser')
var sqlite = require('sqlite3');

var app = express();

var port = process.env.PORT || 3000

// ----- set up DB ----- //

var knex = require('knex') ({
  client: 'sqlite3',
  connection: {
    filename: './data/users_db.sqlite'
  },
  useNullAsDefault: true
})

var db = require('./db.js')(knex)

// ----- set up middleware ----- //

app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded
app.use(bodyParser.json())  // parse application/json

// ----- routes ------ //

app.get('/', function (req, res) {
  console.log("GET received on /")
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  // check if it has a query string, if so then...
  if (Object.keys(req.query).length !== 0) {
    console.log("GET received on /users with parameters")
    console.log("req.query is: ", req.query)
    // use knex to do 'SELECT * FROM users WHERE fieldY = paramX' to sqlite DB
    db.findOne('users', { userEmail: req.query.email }, function (err, user) {
        console.log("user is: ", user)
        res.json({ "users": [ user ]})
    })
  }
  else {
    console.log("GET received on /users")
    console.log(req.query)
    // use knex to do 'SELECT * FROM users' to sqlite DB
    db.getAll('users', function (err, users) {
      console.log('user', users)
      res.json({ "users": users })
      })
  }
});

app.get('/users/:id', function (req, res) {
  console.log("GET received on /users/:id")
  // use knex to do 'SELECT * FROM users WHERE userID=3' to sqlite DB
  db.findOne('users', { userID: req.params.id }, function (err, user) {
      console.log(user)
      res.json({ "users": [ user ]})
  })
});

app.post('/users', function (req, res) {
  console.log("POST received on /users")
  // create new user in DB
  console.log("req.body is: ", req.body)
  //use knex to insert specific user to DB and assign own unique user ID
   db.add('users', req.body, function (err, user) {
     console.log("err is: ", err)
     console.log("user added to DB: ", user)
     res.json({ "users": [ user ]})
  })
});

// ----- setup of ports ----- //

app.listen(port, function () {
  console.log('Paint-market Users app listening on port 3000!');
});
