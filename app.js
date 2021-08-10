var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var minifyHTML = require('express-minify-html');
var minify = require('express-minify');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var studentRouter = require('./routes/student');
var studentsRouter = require('./routes/students');
var formRouter = require('./routes/form');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();
var store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'frst'
});

store.on('error', function(error) {
  console.log(error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "2a012d7e474f1bf7704e205168884aafae96528e8481b4e79597079fd5010cd7",
  resave: true,
  store: store,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60* 60
  }
}));

app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', studentRouter);
app.use('/', studentsRouter);
app.use('/', formRouter);
app.use('/', indexRouter);
app.use('/', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
