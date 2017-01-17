'use strict';

var mockapiBiz = require('./../bizs/mockBiz');
let router = Router();

router.all('/:appId([0-9a-z]{12})/*',
  mockapiBiz.matchUri,
  mockapiBiz.responseData
);

module.exports = {
  priority: 0,
  router: router,
  prefix: '/'
};
