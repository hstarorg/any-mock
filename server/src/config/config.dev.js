const path = require('path');

module.exports = {
  port: 8601,
  debug: true,
  dbFolder: path.join(__dirname, '../database'),
  staticFolder: path.join(__dirname, '../../../dist')
};
