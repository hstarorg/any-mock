const path = require('path');
const express = require('express');
const restExpress = require('rest-express');

const config = require('./config');
const auth = require('./common/auth');

const options = {
  port: config.port,
  enableCors: true,
  enableGzip: true,
  apiPrefix: '/',
  routesPath: path.join(__dirname, 'routes'),
  onRoutesLoading: app => {
    app.use(auth.init());
  },
  onRoutesLoaded: app => {
    app.use((req, res, next) => {
      var err = new Error('API not found.');
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      let errResult = {
        message: (err instanceof Error) ? err.message : err,
        error: config.debug ? err : null
      };
      res.json(errResult);
    });
  }
};
// 如果是调试模式
if (config.debug) {
  options.enableResponseTime = true;
  options.enableLog = true;
}

restExpress.startServer(options)
  .then(server => {
    let address = server.address();
    console.log('Server started', address);
  }, err => {
    console.error(err);
  });
