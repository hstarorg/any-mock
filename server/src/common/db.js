let path = require('path');
let Datastore = require('nedb');

let config = require('./../config/config');
let db = {};

db.apis = new Datastore({filename: path.join(config.dbFolder, 'apis.db'), autoload: true});
db.apps = new Datastore({filename: path.join(config.dbFolder, 'apps.db'), autoload: true});
db.users = new Datastore({filename: path.join(config.dbFolder, 'users.db'), autoload: true});

module.exports = db;