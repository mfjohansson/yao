// Require
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// Database
var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/yao', function(err, db) {
  if(err) throw err;
  global.dbConn = db;
})

// Settings
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Load some stuff
global.TYPES = require('./lib/type-loader');

// Routes
require('./lib/routes')(app);

// Static
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});