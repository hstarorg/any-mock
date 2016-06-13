'use strict';

let router = require('express').Router();

let apiBiz = require('./../bizs/apiBiz.js');

router.post('/new', apiBiz.createApi);

module.exports = router;