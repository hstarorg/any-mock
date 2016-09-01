let uuid = require('node-uuid');

let buildRandomString = () => {
  let result = uuid.v4();
  return result.substring(result.lastIndexOf('-') + 1);
};

let buildToken = () => {
  return uuid.v4();
};

module.exports = {
  buildRandomString: buildRandomString,
  buildToken: buildToken
};