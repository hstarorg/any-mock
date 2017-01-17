const fs = require('fs');
const crypto = require('crypto');
const uuid = require('uuid');
const shortid = require('shortid');

const ALGORITHM = ['md5', 'sha', 'sha1', 'sha256', 'sha512', 'RSA-SHA', 'RSA-SHA1', 'RSA-SHA256', 'RSA-SHA512'];

const generateId = () => shortid.generate();

const generateGUID = () => uuid.v4();

const _doAlgorithm = options => {
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
      shasum = crypto.createHmac(options.algorithm, options.key || '');
      break;
  }
  shasum.update(options.source);
  return shasum.digest('hex');
};

const hashAlgorithm = (source, algorithm) => {
  return _doAlgorithm({
    type: 'hash',
    source: source,
    algorithm: algorithm
  });
};

const hmacAlgorithm = (source, key, algorithm) => {
  return _doAlgorithm({
    type: 'hash',
    source: source,
    key: key,
    algorithm: algorithm
  });
};

module.exports = {
  generateId,
  generateGUID,
  hashAlgorithm,
  hmacAlgorithm
};
