'use strict';

var db = require('./db');

var apiCached = new Map();

var _get = (appId) => {
  return new Promise((resolve, reject) => {
    if(apiCached.has(appId)){
      return resolve(apiCached.get(appId));
    }
    //没有key的情况，先尝试去数据库那一次，然后返回。
    db.apis.find({appId: appId}, (err, apis) => {
      if(err){
        return reject(err);
      }
      if(apis.length > 0){
        apiCached.set(appId, apis);
      }
      return resolve(apis);
    });
  });
};

module.exports = {
  get: _get
};