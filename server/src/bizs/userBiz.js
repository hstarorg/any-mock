const db = require('./../common/db');
const util = require('./../common/util');

const USER_TOKEN_TIMESPAN = 1000 * 60 * 60 * 24 * 7; // 7天

const USER_COLLECTION = 'users';

const getUser = username => {
  return db.findOne(USER_COLLECTION, { username });
};

let _getUser = (username) => {
  return new Promise((resolve, reject) => {
    db.users.findOne({ username: username }, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

let createUser = (req, res, next) => {
  let body = req.body;
  _getUser(body.username)
    .then(user => {
      if (user) return next(new Error('user exists.'));
      let userEntity = {
        userId: util.buildRandomString(),
        username: body.username,
        password: body.password,
        createDate: Date.now(),
        accessToken: '',
        expiredTime: Date.now()
      };
      db.users.insert(userEntity, (err, newUser) => {
        if (err) return next(err);
        res.status(201);
        res.json('Created');
      });
    })
    .catch(reason => next(reason));
};

let validateUserInfo = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next(new Error('username and password required.'));
  }
  next();
};

let auth = (req, res, next) => {
  let token = req.headers['x-token'];
  if (!token) return next('x-token required.');
  let whereObj = { accessToken: token, expiredTime: { $gte: Date.now() } };
  db.users.findOne(whereObj, { password: 0 }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.status(401);
      return res.end();
    }
    req.reqData = req.reqData || {};
    req.reqData.user = user;
    next();
  });
};

let doLogin = (req, res, next) => {
  db.users.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (err) return next(err);
    if (!user) return next('login failed, check your username or password.');
    let accessToken = util.buildToken();
    // 7天
    db.users.update({ _id: user._id }, { $set: { accessToken: accessToken, expiredTime: Date.now() + USER_TOKEN_TIMESPAN } }, {}, (err, numReplaced) => {
      if (err) return next(err);
      if (numReplaced === 0) return next('login failed, please retry.');
      res.json({ token: accessToken });
    });
  });
};

let doLogout = (req, res, next) => {
  db.users.update({ _id: req.reqData.user._id }, { $set: { accessToken: '' } }, {}, (err, numReplaced) => {
    if (err) return next(err);
    if (numReplaced === 0) {
      return next('logout failed, please contact administrator.');
    }
    res.json(true);
  });
};

let doAutoLogin = (req, res, next) => {
  db.findOne('users', { accessToken: req.body.token, expiredTime: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        res.status(401);
        return res.end();
      }
      res.json({
        username: user.username,
        userId: user.userId
      })
    }).catch(reason => next(reason));
};

module.exports = {
  validateUserInfo: validateUserInfo,
  createUser: createUser,
  doLogin: doLogin,
  doLogout: doLogout,
  auth: auth,
  doAutoLogin: doAutoLogin,
  getUser
};
