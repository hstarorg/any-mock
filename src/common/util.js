'use strict';

let cryptoHelper = require('./cryptoHelper');

let buildId = (source) => {
  let key = `${source}_${Date.now()}_${Math.random()}`;
  return cryptoHelper.hashAlgorithm(key, 'RSA-SHA256');
};

module.exports = {
  buildId: buildId
};