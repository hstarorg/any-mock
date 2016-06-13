'use strict';

let util = require('./../common/util');
let db = require('./../common/db');

const EXPIRE_LONG_TIME = 1000 * 60 * 60 * 24 * 7; //登录一周过期

let _userExists = (username) => {
  return new Promise((resolve, reject) => {
    db.users.count({ username: username }, (err, count) => {
      if (err) {
        return reject(err);
      }
      resolve(count > 0);
    });
  });
};

let doLogin = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return next('Username or password required.');
  };
  db.users.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        hasResult: true,
        message: 'Username or password invalid.'
      })
    }
    //验证用户密码成功！
    let token = util.buildId(username);
    db.users.update({ _id: user._id }, {
      $set: {
        token: token,
        expireDate: Date.now() + EXPIRE_LONG_TIME
      }
    }, {}, (err, numReplaced) => {
      if (err) {
        return next(err);
      }
      if (numReplaced === 0) {
        return next('更新登录token失败，请联系管理员！');
      }
      res.json({
        username: username,
        token: token
      });
    });
  });
};

let doLogout = (req, res, next) => {
  db.users.update({ _id: req.authUser._id }, { $set: { token: '' } }, {}, (err, numReplaced) => {
    if (err) {
      return next(err);
    }
    if (numReplaced === 0) {
      return next('登出失败，请联系管理员！');
    }
    res.json(true);
  });
};

let setUserInfo = (req, res, next) => {
  let token = req.headers['x-token'];
  if (!token) {
    return next('User unauthorized. Token required.');
  }
  db.users.findOne({ token: token, expireDate: { $gt: Date.now() } }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next('User unauthorized. Invalid token.');
    }
    req.authUser = user;
    next();
  });
};

let doRegister = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return next('Username or password required.');
  };
  _userExists(username)
    .then((userExists) => {
      if (userExists) {
        return next('User exists.');
      }
      let userId = util.buildId(username);
      db.users.insert({
        userId: userId,
        username: username,
        password: password,
        registerDate: Date.now(),
        lastUpdateDate: Date.now()
      }, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201);
        res.json('Created');
      });
    }).catch((err) => {
      return next(err);
    });
};

module.exports = {
  doLogin: doLogin,
  doLogout: doLogout,
  setUserInfo: setUserInfo,
  doRegister: doRegister
};