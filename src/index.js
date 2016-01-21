'use strict';

var http = require('http');

var app = require('./common/app');
var config = require('./config/config');

var server = http.createServer(app);
server.listen(config.port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind ='Port ' + config.port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});
