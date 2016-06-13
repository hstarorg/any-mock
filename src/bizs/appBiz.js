'use strict';

let util = require('./../common/util');
let db = require('./../common/db');

let _appExists = (appName, userId) => {
  return new Promise((resolve, reject) => {
    db.apps.count({ appName: appName, userId: userId }, (err, count) => {
      if (err) {
        return reject(err);
      }
      console.log(count);
      resolve(count > 0);
    });
  });
};

let _buildAppId = (userId) => {
  return util.buildId(userId).substring(0, 8);
};

let createApp = (req, res, next) => {
  if (!req.body.appName && !req.body.appDesc) {
    return next('AppName and appDesc required');
  }
  _appExists(req.body.appName, req.authUser.userId)
    .then((appExists) => {
      if (appExists) {
        return next('App exists.');
      }
      let appId = _buildAppId(req.authUser.userId);
      //todo 增加appId重复校验
      let app = {
        appId: appId,
        userId: req.authUser.userId,
        appName: req.body.appName,
        appDesc: req.body.appDesc,
        createDate: Date.now()
      };
      db.apps.insert(app, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201);
        res.json("Created");
      });
    }).catch(err => next(err));
};

let isAppOwner = (req, res, next) => {
  let appId = req.params.appId;
  db.apps.findOne({ appId: appId }, (err, app) => {
    if (err) {
      return next(err);
    }
    if (!app) {
      return next('App not exists.');
    }
    if (app.userId !== req.authUser.userId) {
      return next('Unauthorized, this app is not your\'s.');
    }
    req.currentApp = app;
    next();
  });
};

let updateApp = (req, res, next) => {
  db.apps.update({ _id: req.currentApp._id }, {
    $set: {
      appName: req.body.appName,
      appDesc: req.body.appDesc
    }
  }, {}, (err, numReplaced) => {
    if (err) {
      return next(err);
    }
    if (numReplaced === 0) {
      return next('更新APP失败，请联系管理员！');
    }
    res.json(true);
  });
};

let deleteApp = (req, res, next) => {
  db.apps.remove({ _id: req.currentApp._id }, {}, (err, numReplaced) => {
    if (err) {
      return next(err)
    }
    if (numReplaced === 0) {
      return next('删除APP失败，请联系管理员！');
    }
    res.json(true);
  });
};

let getApps = (req, res, next) => {
  db.apps.find({ userId: req.authUser.userId }, (err, apps) => {
    if (err) {
      return next(err);
    }
    res.json(apps);
  })
};

module.exports = {
  createApp: createApp,
  updateApp: updateApp,
  deleteApp: deleteApp,
  getApps: getApps,
  isAppOwner: isAppOwner
};