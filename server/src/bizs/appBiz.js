let db = require('./../common/db');
let util = require('./../common/util');

let _appExists = (userId, appName) => {
  return new Promise((resolve, reject) => {
    db.apps.findOne({ userId: userId, appName: appName }, (err, app) => {
      if (err) return reject(err);
      resolve(app);
    });
  });
};

let createApp = (req, res, next) => {
  let appName = req.body.appName;
  if (!appName) return next('appName required');
  let userId = req.reqData.user.userId;
  _appExists(userId, appName)
    .then(app => {
      if (app) return next('app exists.');
      let appEntity = {
        userId: userId,
        appId: util.buildRandomString(),
        appName: appName,
        createDate: Date.now()
      };
      db.apps.insert(appEntity, (err, newApp) => {
        if (err) return next(err);
        res.status(201);
        res.json(newApp);
      });
    })
    .catch(reason => next(reason));
};

let getApps = (req, res, next) => {
  db.apps.find({ userId: req.reqData.user.userId }, (err, apps) => {
    if (err) return next(err);
    res.json(apps);
  });
};

let getApp = (req, res, next) => {
  let appId = req.params.appId;
  db.apps.findOne({
    appId: appId,
    userId: req.reqData.user.userId
  }, (err, app) => {
    if (err) return next(err);
    res.json(app);
  });
};

let getAppApis = (req, res, next) => {
  let appId = req.params.appId;
  db.apis.find({
    appId: appId,
    userId: req.reqData.user.userId
  }, (err, app) => {
    if (err) return next(err);
    res.json(app);
  });
};

module.exports = {
  createApp: createApp,
  getApps: getApps,
  getApp: getApp,
  getAppApis: getAppApis
};