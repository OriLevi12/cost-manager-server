/**
 * @fileoverview Main application file for the Cost Manager API
 * @requires express
 * @requires mongoose
 * @requires dotenv
 */

// Import required dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import route handlers
const usersRouter = require('./routes/users');
const addRouter = require('./routes/add');
const reportRouter = require('./routes/report');
const aboutRouter = require('./routes/about');

/**
 * Express application instance
 * @type {express.Application}
 */
var app = express();

// Load environment variables and connect to MongoDB
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_ORI_NOAM);

// Configure view engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up middleware
app.use(logger('dev'));  // HTTP request logger
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded request bodies
app.use(cookieParser());  // Parse cookies
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

// API Routes
app.use('/api/add', addRouter);  // Handle cost addition
app.use('/api/report', reportRouter);  // Handle cost reports
app.use('/api/users', usersRouter);  // Handle user operations
app.use('/api/about', aboutRouter);  // Handle about/team information

/**
 * 404 error handler
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * Global error handler
 * @param {Error} err - Error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
