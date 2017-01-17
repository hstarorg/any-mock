const path = require('path');
const Datastore = require('nedb');

const config = require('./../config');
const db = {};

db.users = new Datastore({ filename: path.join(config.dbFolder, 'users.db'), autoload: true });
db.apis = new Datastore({ filename: path.join(config.dbFolder, 'apis.db'), autoload: true });
db.projects = new Datastore({ filename: path.join(config.dbFolder, 'projects.db'), autoload: true });

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
 * 更新记录
 */
db.update = (collection, filterObj, updatedObj, options) => {
  return new Promise((resolve, reject) => {
    db[collection].update(filterObj, updatedObj, options || {}, (err, numReplaced) => {
      if (err) {
        return reject(err);
      }
      resolve(numReplaced);
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
db.findOne = (collection, filterObj, fieldsObj) => {
  return new Promise((resolve, reject) => {
    db[collection].findOne(filterObj, fieldsObj || {}, (err, doc) => {
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



module.exports = db;
