'use strict';

var mockapiBiz = require('./../bizs/mockBiz');
let router = Router();

router.all('/:id([0-9a-zA-Z\-_]{9})/*',
  mockapiBiz.matchUri,
  mockapiBiz.responseData
);

module.exports = {
  priority: 0,
  router: router,
  prefix: '/'
};
