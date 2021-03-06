var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var categories = require('./routes/categories');
var productgroups = require('./routes/productgroups');
var products = require('./routes/products');
var offers = require('./routes/offers');
var demo = require('./routes/demo');

var app = express();

mongoose.connect('mongodb://localhost/calculator')
	.then(function() {
		console.log('Connection Successful');
	})
	.catch(function(err) {
		console.error(err);
	});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/categories', categories);
app.use('/productgroups', productgroups);
app.use('/products', products);
app.use('/offers', offers);
app.use('/demo', demo);

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
