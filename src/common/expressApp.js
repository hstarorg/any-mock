'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');

let config = require('./../config/config');
let apiRouter = require('./../routes/api');
let accountRouter = require('./../routes/account');
let appRouter = require('./../routes/app');
let mockApiRouter = require('./../routes/mockapi');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Load router
app.use('/api/v1/account', accountRouter);
app.use('/api/v1/app', appRouter);
app.use('/api/v1/api', apiRouter);
app.use('/', mockApiRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//调试模式，直接输出异常
if (config.isDebug) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else { //非调试模式，记录日志，不输出详细异常信息
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    //todo 记录日志
    res.json({
      message: err.message
    });
  });
}



module.exports = app;