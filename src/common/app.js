'use strict';

var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');

var manageRouter = require('./../routes/manage');
var mockApiRouter = require('./../routes/mockapi');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

//Load router
app.use('/manage', manageRouter);
app.use('/', mockApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;