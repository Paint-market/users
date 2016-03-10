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

// ----- routes ------ //

app.get('/', function (req, res) {
  console.log("GET received on /")
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  console.log("GET received on /users")
  res.send('Hello Users');
});

app.get('/users/:id', function (req, res) {
  console.log("GET received on /users/:id")
  res.send('Hello Users with id');
});

app.post('/users', function (req, res) {
  console.log("POST received on /users")
  res.send('Hello Users with POST');
  console.log(req.body)
});

// ----- setup of ports ----- //

app.listen(3000, function () {
  console.log('Paint-market Users app listening on port 3000!');
});
