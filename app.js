var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//route
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inventoryRouter = require('./routes/inventory')

var app = express();

const authUser = require('./middleware/authUser');

var url = 'mongodb+srv://agi:pB6OQmIrER3vsKw1@cluster0.xepmz.mongodb.net/?retryWrites=true&w=majority';
var connect = mongoose.connect(url, {

});
connect.then(
    (db) => {
        console.log("Connection to Data Base Successfull")
    },
    (err) => {
        console.log("Connection to data Base Error: ",err)
    }
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventory', authUser, inventoryRouter);
app.use('/user', usersRouter)

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
