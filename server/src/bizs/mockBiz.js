'use strict';

// var apiCached = require('./../common/apiCached');

var matchUri = (req, res, next) => {
  var params = req.params;
  //noinspection JSUnresolvedVariable
  var appId = params.appId;
  var other = params['0'].replace(/\/*$/g, '');
  var parts = other.split('/');
  apiCached.get(appId)
    .then((apis) => {
      var matchedAPIs = [];
      var sameAPI = null;
      var route = `/${other}`;
      for(let api of apis){
        if(api.route === route){
          sameAPI = api;
          break;
        }
        if(api.segmentsNumber === parts.length){
          matchedAPIs.push(api);
        }
      }
      if(sameAPI){
        req.apiObj = {};
        req.apiObj.body = sameAPI;
      }
      next();
    })
    .catch((error) => {
      next(error);
    });
};

var responseData = (req, res) => {
  if(req.apiObj){
    return res.send(req.apiObj.body);
  }
  res.send('xxx');
};

module.exports = {
  matchUri: matchUri,
  responseData: responseData
};