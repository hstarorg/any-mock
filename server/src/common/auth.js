const tokenStore = require('./tokenStore');

module.exports = {
  init() {
    return (req, res, next) => {
      let token = req.headers['x-token'];
      if (token) {
        req.user = tokenStore.get(token);
      } else {
        req.user = null;
      }
      req.user = { id: 'xxx', username: 'admin' };
      next();
    };
  },
  authenticate(req, res, next) {
    if (!req.user) {
      return res.status(401).end();
    }
    next();
  }
};
