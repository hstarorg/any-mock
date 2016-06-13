'use strict';

let router = require('express').Router();

let accountBiz = require('./../bizs/accountBiz');

router.post('/login', accountBiz.doLogin);

router.post('/logout', accountBiz.setUserInfo, accountBiz.doLogout);

router.post('/register', accountBiz.doRegister);

module.exports = router;