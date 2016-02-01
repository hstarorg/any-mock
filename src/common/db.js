'use strict';

var path = require('path');

var Datastore = require('nedb');

var config = require('./../config/config');

var db = {};
db.apis = new Datastore({filename: path.join(config.dbFolderPath, 'apis.db'), autoload: true});

module.exports = db;


