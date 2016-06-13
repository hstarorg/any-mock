'use strict';

let util = require('./../common/util');
let db = require('./../common/db');

let isApiOwner = (req, res, next) => {
  let apiId = req.params.appId;
  db.apis.findOne({ apiId: apiId }, (err, api) => {
    if (err) {
      return next(err);
    }
    if (!api) {
      return next('Api not found.');
    }
    if (api.userId !== req.authUser.userId) {
      return next('Unauthorized, this api is not your\'s.');
    }
    this.currentApi = api;
    next();
  });
};

let createApi = (req, res, next) => {
  if (!req.body.appId) {
    return next('AppId required');
  }
  //todo 判断app是否是该用户拥有
  let apiId = util.buildId(req.body.appId);
  let api = {
    apiId: apiId,
    appId: req.body.appId,
    userId: req.authUser.userId,
    method: req.body.method,
    path: req.body.path,
    createDate: Date.now(),
    response: req.body.response
  };
  db.apis.insert(api, (err) => {
    if (err) {
      return next(err);
    }
    res.status(201);
    res.json('Created');
  });
};

let updateApi = (req, res, next) => {
  let postData = {
    $set: {
      method: req.body.method,
      desc: req.body.desc,
      path: req.body.path,
      lastUpdateDate: Date.now(),
      reqCount: (req.currentApi.reqCount || 0) + 1,
      response: req.body.response
    }
  };
  db.apis.update({ _id: req.currentApi._id }, postData, {}, (err, numReplaced) => {
    if (err) {
      return next(err);
    }
    if (numReplaced === 0) {
      return next('更新API失败，请联系管理员！');
    }
    res.json(true);
  });
};

let deleteApi = (req, res, next) => {
  db.apis.remove({ _id: req.currentApi._id }, {}, (err, numReplaced) => {
    if (err) {
      return next(err)
    }
    if (numReplaced === 0) {
      return next('删除API失败，请联系管理员！');
    }
    res.json(true);
  });
};

let getApi = (req, res, next) => {
  let apiId = req.params.appId;
  db.apis.findOne({ apiId: apiId }, (err, api) => {
    if (err) {
      return next(err);
    }
    res.json(api);
  });
};

module.exports = {
  isApiOwner: isApiOwner,
  createApi: createApi,
  updateApi: updateApi,
  deleteApi: deleteApi,
  getApi: getApi
};