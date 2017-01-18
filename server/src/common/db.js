const path = require('path');
const Datastore = require('nedb');
const config = require('./../config');

class DB {
  constructor() {
    this.users = new Datastore({ filename: path.join(config.dbFolder, 'users.db'), autoload: true });
    this.apis = new Datastore({ filename: path.join(config.dbFolder, 'apis.db'), autoload: true });
    this.projects = new Datastore({ filename: path.join(config.dbFolder, 'projects.db'), autoload: true });
  }

  /**
   * 添加文档
   * @param collection 集合名称
   * @param doc 要添加的文档
   */
  insert(collection, doc) {
    return new Promise((resolve, reject) => {
      this[collection].insert(doc, (err, newDocs) => {
        if (err) return reject(err);
        resolve(newDocs);
      });
    });
  }

  /**
   * 查询数据列表,带分页
   * @param collection 集合名称
   * @param filterObj 查询条件对象
   * @param fieldsObj 查询结果字段，默认全部
   * @param sortObj 排序对象
   * @param pageObj 分页对象（pageSize, pageIndex)
   */
  find(collection, filterObj, fieldsObj, sortObj = {}, pageObj = { pageIndex: 1, pageSize: Number.MAX_SAFE_INTEGER }) {
    return new Promise((resolve, reject) => {
      this[collection]
        .find(filterObj, fieldsObj || {})
        .sort(sortObj || {})
        .skip(pageObj.pageSize * (pageObj.pageIndex - 1))
        .limit(pageObj.pageSize)
        .exec((err, docs) => {
          if (err) return reject(err);
          resolve(docs);
        });
    });
  }

  /**
   * 查询单个文档
   * @param collection 集合名称
   * @param filterObj 查询条件
   * @param fieldsObj 查询字段
   */
  findOne(collection, filterObj, fieldsObj = {}) {
    return new Promise((resolve, reject) => {
      this[collection].findOne(filterObj, fieldsObj, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  }

  /**
   * 更新文档
   * @param collection 集合名称
   * @param filterObj 查询条件对象
   * @param updatedObj 要更新的内容
   * @param options 更新配置（multi:false, upsert: false, returnUpdatedDocs:false）
   */
  update(collection, filterObj, updatedObj, options) {
    return new Promise((resolve, reject) => {
      this[collection].update(filterObj, updatedObj, options || {}, (err, numReplaced) => {
        if (err) {
          return reject(err);
        }
        resolve(numReplaced);
      });
    });
  }

  /**
   * 删除指定文档
   * @param collection 集合名称
   * @param filterObj 查询条件
   * @param allowMulti 是否允许删除多个，默认false
   */
  remove(collection, filterObj, allowMulti = false) {
    return new Promise((resolve, reject) => {
      this[collection].remove(filterObj, { multi: allowMulti }, (err, numRemoved) => {
        if (err) return reject(err);
        resolve(numRemoved);
      });
    });
  }

  /**
   * 查询文档数量
   * @param  collection 集合名称
   * @param filterObj 查询条件
   */
  count(collection, filterObj) {
    return new Promise((resolve, reject) => {
      this[collection].count(filterObj, (err, count) => {
        if (err) return reject(err);
        resolve(count);
      });
    });
  }
}

module.exports = new DB();
