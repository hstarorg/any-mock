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
        authorizedUser: req.body.authorizedUser,
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
  let user = req.reqData.user;
  let filterObj = {
    $or: [
      { userId: user.userId },
      { authorizedUser: { $elemMatch: user.username } }
    ]
  };
  db.query('apps', filterObj, null, { createDate: -1 }, { pageIndex: 1, pageSize: 10 })
    .then(apps => {
      apps.forEach(app => app.isOwner = app.userId === user.userId);
      res.json(apps)
    })
    .catch(reason => next(reason));
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
  }).sort({ createDate: 1 }).exec((err, app) => {
    if (err) return next(err);
    res.json(app);
  });
};

let hasAppAuth = (req, res, next) => {
  let appId = req.params.appId;
  let user = req.reqData.user;
  db.findOne('apps', { appId: appId })
    .then(app => {
      if (!app) return next(new Error('app not exists.'));
      if (app.userId !== user.userId && app.authorizedUser.indexOf(user.username) < 0) {
        return next(new Error('Permission denied'));
      }
      req.reqData.app = app;
      next();
    }).catch(reason => next(reason));
};

let deleteApp = (req, res, next) => {
  let appId = req.reqData.app.appId;
  db.apps.remove({ appId: appId }, (err, numRemoved) => {
    if (err) return next(err);
    if (numRemoved === 0) return next(new Error('Delete failed, please retry.'));
    db.apis.remove({ appId: appId });
    res.status(204);
    res.end();
  });
};

let updateApp = (req, res, next) => {
  let appId = req.reqData.app.appId;
  let appName = req.body.appName;
  let updateObj = {
    $set: {
      appName: appName,
      authorizedUser: req.body.authorizedUser
    }
  };
  db.apps.update({ appId: appId }, updateObj, {}, (err, numReplaced) => {
    if (err) return next(err);
    if (numReplaced === 0) return next(new Error('update failed, please retry.'));
    res.status(202);
    res.end();
  });
};

module.exports = {
  createApp: createApp,
  getApps: getApps,
  getApp: getApp,
  getAppApis: getAppApis,
  hasAppAuth: hasAppAuth,
  deleteApp: deleteApp,
  updateApp: updateApp
};