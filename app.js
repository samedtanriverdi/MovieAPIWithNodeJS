const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

//Middleware
const verifyToken = require('./middleware/verify-token');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const directorsRouter = require('./routes/directors');

//db connection

const DB = require('./helpers/db')();

const app = express();

app.set('api_secret_key', config.api_secret_key);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/movie', moviesRouter);
app.use('/api/director', directorsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.json({ message: err.message });
  console.log('geld');
  res.render('error');
});

module.exports = app;
