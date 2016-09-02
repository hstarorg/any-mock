let db = require('./../common/db');
let util = require('./../common/util');

let _hasAuth = (userId, appId) => {
  return new Promise((resolve, reject) => {
    let whereObj = { userId: userId, appId: appId };
    db.apps.findOne(whereObj, (err, app) => {
      if (err) return reject(err);
      resolve(!!app);
    });
  });
};

let validateApi = (req, res, next) => {
  let properties = ['apiName', 'apiPath', 'apiMethod', 'responseHeaders', 'responseStatus', 'responseContentType'];
  for (let p of properties) {
    if (!req.body[p]) {
      return next(`${p} required`);
    }
  }
  next();
};

let findApi = (req, res, next) => {
  let appId = req.params.appId;
  let apiId = req.params.apiId;
  let userId = req.reqData.user.userId;
  let whereObj = { userId: userId, appId: appId, apiId: apiId };
  db.apis.findOne(whereObj, (err, api) => {
    if (err) return next(err);
    if (!api) {
      res.status(404);
      return res.end();
    }
    next();
  });
};

let createApi = (req, res, next) => {
  let appId = req.params.appId;
  let userId = req.reqData.user.userId;
  let body = req.body;
  _hasAuth(userId, appId)
    .then(isAuthorized => {
      if (!isAuthorized) return next('unauthorized.');
      let apiEntity = {
        appId: appId,
        userId: userId,
        createDate: Date.now(),
        apiId: util.buildRandomString(),
        apiName: body.apiName,
        apiPath: body.apiPath,
        apiMethod: body.apiMethod,
        responseHeaders: body.responseHeaders,
        responseStatus: body.responseStatus,
        responseContentType: body.responseContentType,
        responseData: body.responseData,
        isEnable: true
      };
      db.apis.insert(apiEntity, (err, newApi) => {
        if (err) return next(err);
        res.status(201);
        res.json(newApi);
      });
    }).catch(reason => next(reason));
};

let updateApi = (req, res, next) => {
  let appId = req.params.appId;
  let userId = req.reqData.user.userId;
  let apiId = req.params.apiId;
  let body = req.body;

  let updateEntity = {
    $set: {
      apiName: body.apiName,
      apiPath: body.apiPath,
      apiMethod: body.apiMethod,
      responseHeaders: body.responseHeaders,
      responseStatus: body.responseStatus,
      responseContentType: body.responseContentType,
      responseData: body.responseData,
      isEnable: !!body.isEnable
    }
  };
  console.log(updateEntity);
  db.apis.update({ appId: appId, apiId: apiId }, updateEntity, {}, (err, numReplaced) => {
    if (err) return next(err);
    if (numReplaced === 0) return next('update failed, please retry');
    res.status(202);
    res.json(true);
  });
};

let getApi = (req, res, next) => {
  let appId = req.params.appId;
  let apiId = req.params.apiId;
  let userId = req.reqData.user.userId;
  db.apis.findOne({ userId: userId, appId: appId, apiId: apiId }, (err, api) => {
    if (err) return next(err);
    res.json(api);
  });
};

let deleteApi = (req, res, next) => {
  let appId = req.params.appId;
  let apiId = req.params.apiId;
  let userId = req.reqData.user.userId;
  _hasAuth(userId, appId, apiId)
    .then(isFound => {
      if (!isFound) return next('api not found.');
      db.apis.remove({ userId: userId, appId: appId, apiId: apiId }, (err, numRemoved) => {
        if (err) return next(err);
        if (numRemoved === 0) return next('Delete failed, please retry.');
        res.json(true);
      }).catch(reason => next(reason));
    });
};

module.exports = {
  createApi: createApi,
  updateApi: updateApi,
  getApi: getApi,
  deleteApi: deleteApi,
  validateApi: validateApi,
  findApi: findApi
};