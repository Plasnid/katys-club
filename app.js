const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
//const errorHandlers = require('./handlers/errorHandlers');

//create our express app
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));//pug files here
app.set('view engine', 'pug');  //using pug in this instance

//static files are in the public folder
app.use(express.static(path.join(__dirname, 'public')));

//takes requests and makes them available as properties in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//exposes methods for validating data
app.use(expressValidator());

// populates req.cookies with any cookies used in requests
app.use(cookieParser());

//sessions to store data on visitors, keep user logged in, and send flashes
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//passport to handle logins
app.use(passport.initialize());
app.use(passport.session());

//middleware to give flash messages
app.use(flash());

app.use((req, res, next) => {
  //res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify for converting callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

//set up the linking to the routes
app.use('/', routes);

//set up a link to the 404
//app.use(errorHandlers.notFound);

//check to see if an error is a validation errorHandlers
//app.use(errorHandlers.flashValidationErrors);

//if it was a terribly eggregious error in development
/*if(app.get('env') === 'development'){
  app.use(errorHandlers.development);
}*/

//for production errors
//app.use(errorHandlers.productionErrors);

//now export the app for use
module.exports = app;
