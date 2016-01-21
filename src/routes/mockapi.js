'use strict';

var express = require('express');
var router = express.Router();

router.all('/:appId/*', (req, res, next) => {
  console.log(req.method, req.params.appId, req.params);
  res.send('good222454545454545');
});

module.exports = router;