let path = require('path');

module.exports = {
  port: 3000,
  debug: true,
  dbFolder: path.join(__dirname, '../database'),
  staticFolder: path.join(__dirname, '../../../dist')
};