let pathToRegexp = require('path-to-regexp');
let db = require('./../common/db');

var matchUri = (req, res, next) => {
  let appId = req.params.appId;
  let path = req.url.replace(`\/${appId}`, '');
  db.apis.find({ appId: appId }, { _id: 0, apiId: 1, apiPath: 1, apiMethod: 1 }, (err, apis) => {
    if (err) return next(err);
    for (let api of apis) {
      if (api.apiMethod.toUpperCase() !== req.method) {
        continue;
      }
      let keys = [];
      let re = pathToRegexp(api.apiPath, keys);
      let matchResultArr = re.exec(path);
      if (matchResultArr && matchResultArr.length > 0) {
        req.reqData = req.reqData || {};
        req.reqData.api = {
          apiId: api.apiId,
          matchResultArr: matchResultArr
        };
        return next();
      }
    }
    res.status(404);
    res.end();
  });
};

var responseData = (req, res, next) => {
  let reqApi = req.reqData.api;
  db.apis.findOne({ apiId: reqApi.apiId }, (err, api) => {
    if (err) return next(err);
    console.log(api);
    if (api.responseHeaders && api.responseHeaders.length > 0) {
      api.responseHeaders.forEach(header => {
        res.header(header.name, header.value);
      });
    }
    res.header('Content-Type', api.responseContentType);
    res.status(api.responseStatus);
    res.send(api.responseData);
  });
};

module.exports = {
  matchUri: matchUri,
  responseData: responseData
};