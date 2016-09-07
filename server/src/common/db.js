let path = require('path');
let Datastore = require('nedb');

let config = require('./../config/config');
let db = {};

db.apis = new Datastore({ filename: path.join(config.dbFolder, 'apis.db'), autoload: true });
db.apps = new Datastore({ filename: path.join(config.dbFolder, 'apps.db'), autoload: true });
db.users = new Datastore({ filename: path.join(config.dbFolder, 'users.db'), autoload: true });

/**
 * 查询数据列表
 */
db.query = (collection, filterObj, fieldsObj, sortObj, pageObj) => {
  return new Promise((resolve, reject) => {
    db[collection]
      .find(filterObj, fieldsObj || {})
      .sort(sortObj || {})
      .skip(pageObj.pageSize * (pageObj.pageIndex - 1))
      .limit(pageObj.pageSize)
      .exec((err, docs) => {
        if (err) return reject(err);
        resolve(docs);
      });
  });
};

/**
 * 查询数量
 */
db.count = (collection, filterObj) => {
  return new Promise((resolve, reject) => {
    db[collection].count(filterObj, (err, count) => {
      if (err) return reject(err);
      resolve(count);
    });
  });
};

/**
 * 查询单个元素
 */
db.findOne = (collection, filterObj) => {
  return new Promise((resolve, reject) => {
    db[collection].findOne(filterObj, (err, doc) => {
      if (err) return reject(err);
      resolve(doc);
    });
  });
};

/**
 * 移除元素
 */
db.remove = (collection, filterObj, allowMulti = false) => {
  return new Promise((resolve, reject) => {
    db[collection].remove(filterObj, { multi: allowMulti }, (err, numRemoved) => {
      if (err) return reject(err);
      resolve(numRemoved);
    });
  });
};

/**
 * 添加元素
 */
db.insert = (collection, doc) => {
  return new Promise((resolve, reject) => {
    db[collection].insert(doc, (err, newDocs) => {
      if (err) return reject(err);
      resolve(newDocs);
    })
  });
};

module.exports = db;