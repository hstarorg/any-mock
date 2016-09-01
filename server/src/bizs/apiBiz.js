let db = require('./../common/db');
let util = require('./../common/util');

let hasAuth = (userId, appId, apiId) => {
  return new Promise((resolve, reject) => {
    let whereObj = { userId: userId, appId: appId };
    if (apiId) {
      whereObj.apiId = apiId;
      db.apis.findOne(whereObj, (err, api) => {
        if (err) return reject(err);
        resolve(!!api);
      });
    } else {
      db.apps.findOne(whereObj, (err, app) => {
        if (err) return reject(err);
        resolve(!!app);
      });
    }
  });
};

let validateApi = (req, res, next) => {
  let properties = ['appName', 'apiPath', 'apiMethod', 'responseHeaders', 'responseStatus', 'responseContentType'];
  properties.forEach(p => {
    if (!req.body[p]) {
      return next(`${p} required`);
    }
  });
  next();
};

let createApi = (req, res, next) => {
  let appId = req.params.appId;
  let userId = req.reqData.user.userId;
  let body = req.body;
  hasAuth(userId, appId)
    .then(isAuthorized => {
      if (!isAuthorized) return next('unauthorized.');
      let apiEntity = {
        appId: appId,
        userId: userId,
        createDate: Date.now(),
        apiId: util.buildRandomString(),
        apiName: body.appName,
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
    });
};

let updateApi = (req, res, next) => {

};

let getApi = (req, res, next) => {

};

let deleteApi = (req, res, next) => {

};

module.exports = {
  createApi: createApi,
  updateApi: updateApi,
  getApi: getApi,
  deleteApi: deleteApi,
  validateApi: validateApi
};