var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var session = require('express-session');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Users = require("./models/User");

mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true })
  .catch(function(err){
    console.log("mongoose connection error")
    console.log(JSON.stringify(err))
    console.log("Connection error")
    // console.log(err)
  });


var database = mongoose.connection;

database.once("open", function(){
  console.log("Connection success")
})

// console.log(database)
database.on("error", function(error){
  console.log("Database connection error")
  console.log(error)
  console.log("Connection error")
});

database.on("open", function(){
  "connected successfully"
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var graphQLRouter = require("./routes/graphql");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/graphql", graphQLRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render("error",{
		message: "Page you are looking is not available",
    error:{
      stack:"Not Found.."
    }
  })
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
