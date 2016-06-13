'use strict';

let util = require('./../common/util');
let db = require('./../common/db');

let isApiOwner = (req, res, next) => {

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

};

let deleteApi = (req, res, next) => {

};

let getApi = (req, res, next) => {

};

module.exports = {
  isApiOwner: isApiOwner,
  createApi: createApi,
  updateApi: updateApi,
  deleteApi: deleteApi,
  getApi: getApi
};