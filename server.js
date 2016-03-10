var express = require('express');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
var knex = require('knex');
var sqlite = require('sqlite3');

var app = express();

// ----- set up DB ----- //


// ----- set up middleware ----- //

app.use(bodyParser.urlencoded({ extended: false }))  // parse application/x-www-form-urlencoded
app.use(bodyParser.json())  // parse application/json

// ----- dummy data ----- //
var dummyJSONempty = { "users": [] }

var dummyJSONone = { "users": [
  {
    "userID": 19,
    "userName": "James Brown",
    "userEmail": "jbrown@motown.com",
    "money": 1000,
    "password_hash": "afdslj2342342"
  }
] }


var dummyJSONseveral = { "users": [
  {
    "userID": 19,
    "userName": "James Brown",
    "userEmail": "jbrown@motown.com",
    "money": 1000,
    "password_hash": "afdslj2342342"
  },
  {
    "userID": 30,
    "userName": "Michael Jackson",
    "userEmail": "mj@gmail.com",
    "money": 1000,
    "password_hash": "asflkwenoi893"
  },
  {
    "userID": 10,
    "userName": "John Denver",
    "userEmail": "johnd@gmail.com",
    "money": 1000,
    "password_hash": "alkjlsfjoiwna353324"
  }
] }

// ----- routes ------ //

app.get('/', function (req, res) {
  console.log("GET received on /")
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  // check if req.query has parameters, if so then
  if (Object.keys(req.query).length !== 0) {
    console.log("GET received on /users with parameters")
    console.log(req.query)
    // query DB and put result in queryResult, result will one record or no records
    var queryResult = dummyJSONone // || dummyJSONempty
    res.send("Query string received")
    // res.json(queryResult)
  }
  else {
    console.log("GET received on /users")
    console.log(req.query)
    res.json(dummyJSONseveral);
  }
});

app.get('/users/:id', function (req, res) {
  console.log("GET received on /users/:id")
  // res.send('Hello Users with id');
  res.json(dummyJSONone);
});

app.post('/users', function (req, res) {
  console.log("POST received on /users")
  // expecting req.body to equal a json object w/ one user but userid = null
  // create new user in DB
  // if successful, return json object with one user but userid = real id value
  // if Unsuccessful....
  res.json(dummyJSONone);
  console.log(req.body)

});

// ----- setup of ports ----- //

app.listen(3000, function () {
  console.log('Paint-market Users app listening on port 3000!');
});
