let path = require('path');
let restExpress = require('rest-express');

let config = require('./config/config');

let options = {
  port: config.port,
  enableCors: true,
  enableGzip: true,
  routesPath: path.join(__dirname, 'routes'),
  onRoutesLoading: app => {
    // console.log('static');
  },
  onRoutesLoaded: app => {
    app.use((req, res, next) => {
      var err = new Error('API not found.');
      err.status = 404;
      next(err);
    });

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: config.debug ? err : null
      });
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