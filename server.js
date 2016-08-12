//Base server setup for REST API 
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');

//Server setup
var mongoose = require('mongoose');
var mongodb = require('mongodb');

//Initial app setup, express and port
var app = express();
var port = 3003; 

//Connectionstring to our MongoDB - Change connectionstring to live URL, when ready for production
mongoose.connect('mongodb://localhost/');

//Models - Schemas for REST-API(Express)

//REST URLS aka. Routes
var router = express.Router();


//App middleware - enable logger, session, body and cookie-parser

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: 'true',
  saveUninitialized: 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Use a API tester, EG Postman - make a get request to localhost:3003/ to get a response
router.get('/', function(req, res) {
	res.json({ message: 'Hello, our API is running'});
});


//A message to our console whenever you manipulate with data in the API
router.use(function(res, req, next) {
	console.log('You have manipulated with some data!')
	next();
});


//Consolmessage when we start our server
app.listen(port);
console.log('We are live and hot on port ' + port);

module.exports = app; 