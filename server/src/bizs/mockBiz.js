const pathToRegexp = require('path-to-regexp');
const db = require('./../common/db');

const API_COLLECTION = 'apis';

const matchUri = (req, res, next) => {
  let projectId = req.params.id;
  let path = req.url.replace(`\/${projectId}`, '');
  console.log(path);
  db.find(API_COLLECTION, { projectId, method: req.method.toUpperCase() }, { _id: 0, id: 1, path: 1 })
    .then(apis => {
      for (let api of apis) {
        let keys = [];
        let re = pathToRegexp(api.path, keys);
        let matchResultArr = re.exec(path);
        if (matchResultArr && matchResultArr.length > 0) {
          req.reqData = req.reqData || {};
          req.reqData.api = {
            apiId: api.id,
            matchResultArr: matchResultArr,
            keys: keys
          };
          return next();
        }
      }
      return res.status(404).end();
    })
    .catch(next);
};

const responseData = (req, res, next) => {
  let reqApi = req.reqData.api;
  // console.log(reqApi.matchResultArr, reqApi.keys);
  db.findOne(API_COLLECTION, { id: reqApi.apiId })
    .then(api => {
      api.res.headers.forEach(h => {
        res.header(h.key, h.value);
      });
      res.header('Content-Type', api.res.contentType);
      res.status(api.res.status).send(api.res.body);
    })
    .catch(next);
  // db.apis.findOne({ apiId: reqApi.apiId }, (err, api) => {
  //   if (err) return next(err);
  //   if (api.responseHeaders && api.responseHeaders.length > 0) {
  //     api.responseHeaders.forEach(header => {
  //       res.header(header.name, header.value);
  //     });
  //   }
  //   res.header('Content-Type', api.responseContentType);
  //   res.status(api.responseStatus);
  //   res.send(api.responseData);
  // });
};

module.exports = {
  matchUri,
  responseData
};
