'use strict';

let path = require('path');
let Datastore = require('nedb');

let config = require('./../config/config');
const db = {};

let initCollection = (collectionName, autoload) => {
  return new Datastore({ filename: path.join(config.dbFolderPath, `${collectionName}.db`), autoload: autoload === true });
};

db.users = initCollection('users', true);

db.apps = initCollection('apps', true);

db.apis = initCollection('apis', true);


module.exports = db;