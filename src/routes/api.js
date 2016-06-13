'use strict';

let router = require('express').Router();

let accountBiz = require('./../bizs/accountBiz');
let apiBiz = require('./../bizs/apiBiz');

router.post('/new', accountBiz.setUserInfo, apiBiz.createApi);

router.put('/:apiId', accountBiz.setUserInfo, apiBiz.isApiOwner, apiBiz.updateApi);

router.delete('/:apiId', accountBiz.setUserInfo, apiBiz.isApiOwner, apiBiz.deleteApi);

router.get('/:appId', accountBiz.setUserInfo, apiBiz.getApi)

module.exports = router;