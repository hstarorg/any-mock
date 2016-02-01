'use strict';

var express = require('express');

var mockapiBiz = require('./../bizs/mockapiBiz');
var router = express.Router();

router.all('/:appId/*',
  mockapiBiz.matchUri,
  mockapiBiz.responseData
);

module.exports = router;