'use strict';

let crypto = require('crypto');
let fs = require('fs');

const ALGORITHM = ['md5', 'sha', 'sha1', 'sha256', 'sha512', 'RSA-SHA', 'RSA-SHA1', 'RSA-SHA256', 'RSA-SHA512'];

let _doAlgorithm = (options) => {
  if (!options.algorithm) {
    options.algorithm = 'md5';
  } else {
    if (ALGORITHM.indexOf(options.algorithm) < 0) {
      throw new Error('Invalid algorithm.');
    }
  }
  let shasum = null;
  switch (options.type) {
    case 'hash':
      shasum = crypto.createHash(options.algorithm);
      break;
    case 'hmac':
      crypto.createHmac(options.algorithm, options.key || '');
      break;
  }
  shasum.update(options.source);
  let result = shasum.digest('hex');
  return result;
};

let hashAlgorithm = (source, algorithm) => {
  return _doAlgorithm({
    type: 'hash',
    source: source,
    algorithm: algorithm
  });
};

let hmacAlgorithm = (source, key, algorithm) => {
  return _doAlgorithm({
    type: 'hash',
    source: source,
    key: key,
    algorithm: algorithm
  });
};

module.exports = {
  hashAlgorithm: hashAlgorithm,
  hmacAlgorithm: hmacAlgorithm
};