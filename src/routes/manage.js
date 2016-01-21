'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('manage');
});

module.exports = router;