'use strict';

let router = require('express').Router();

let accountBiz = require('./../bizs/accountBiz');
let appBiz = require('./../bizs/appBiz');

router.post('/new', accountBiz.setUserInfo, appBiz.createApp);

router.put('/:appId', accountBiz.setUserInfo, appBiz.isAppOwner, appBiz.updateApp);

router.delete('/:appId', accountBiz.setUserInfo, appBiz.isAppOwner, appBiz.deleteApp);

router.get('/', accountBiz.setUserInfo, appBiz.getApps);

module.exports = router;