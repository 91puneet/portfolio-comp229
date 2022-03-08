//File name:Authorization
//Name: puneet singh
//Student number: 301198520
//Date : 07-03-2022


//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//module for authentication
let session=require('express-session');
let passport=require('passport');

let passportLocal=require('passport-local');
let localStrategy=passportLocal.Strategy;
let flash=require('connect-flash');

//database  setup
let mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI);

let mongoDB= mongoose.connection;

mongoDB.on('error ',console.error.bind(console,"Connection error"));

mongoDB.once('open',()=>
{console.log('connection to mongoDB is established')});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter=require('../routes/contacts');

const exp = require('constants');

   app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname,'../../node_modules')));
app.use(express.static(path.join(__dirname,'../../public/Assets/images')));

//setup express session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

let userModel=require('../models/user');
const { serializeUser } = require('passport');

let User=userModel.User;

passport.use(User.createStrategy());


//serialization & deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list',contactsRouter);

// catch 404 and forward to error handler
app.use(function(eq, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title: 'HOME'});
});

module.exports = app;
