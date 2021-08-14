let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let minifyHTML = require('express-minify-html');
let minify = require('express-minify');
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
let { randomBytes } = require('crypto');

let loginRouter = require('./routes/login');
let indexRouter = require('./routes/index');
let attendanceRouter = require('./routes/attendance');
let formRouter = require('./routes/form');

let app = express();
let store = new MongoDBStore({
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
  secret: randomBytes(64).toString('hex'),
  resave: true,
  store: store,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

app.use(minify());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/', indexRouter);
app.use('/', attendanceRouter);
app.use('/', formRouter);

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
