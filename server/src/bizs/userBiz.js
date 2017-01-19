const db = require('./../common/db');
const util = require('./../common/util');
const tokenStore = require('./../common/tokenStore');

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
  req.user = tokenStore.get(token);
  if (!req.user) {
    return res.status(401).end();
  }
  next();

};

let doLogin = (req, res, next) => {
  db.findOne('users', { username: req.body.username, password: req.body.password })
    .then(user => {
      if (!user) {
        return Promise.reject('login failed, check your username or password.');
      }
      let accessToken = util.generateGUID();
      tokenStore.set(accessToken, user);
      let result = Object.assign({}, user, { token: accessToken });
      res.json(result);
    })
    .catch(next);
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

const doAutoLogin = (req, res, next) => {
  let token = req.headers['x-token'];
  let user;
  if (token && (user = tokenStore.get(token))) {
    let result = Object.assign({}, user, { token });
    res.json(result);
  } else {
    res.status(401).end();
  }
};

module.exports = {
  validateUserInfo: validateUserInfo,
  createUser: createUser,
  doLogin: doLogin,
  doLogout: doLogout,
  auth: auth,
  doAutoLogin,
  getUser
};
