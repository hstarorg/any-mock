'use strict';

var nedb = require('nedb');
var apiDb = new nedb({filename: 'apis.db', autoload: true});

apiDb.insert({appId: '123456', route: '/abc/13', segmentsNumber: 2});