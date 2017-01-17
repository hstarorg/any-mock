let config;

if (process.env.NODE_ENV !== 'development') {
  config = require('./config.prod');
} else {
  config = require('./config.dev');
}

module.exports = config;
