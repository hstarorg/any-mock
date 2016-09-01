'use strict';

var mockapiBiz = require('./../bizs/mockBiz');
let router = Router();

router.all('/:appId([0-9a-z]{12})/*',
  mockapiBiz.matchUri,
  mockapiBiz.responseData
);

module.exports = {
  priority: 1000,
  router: router,
  prefix: '/'
};