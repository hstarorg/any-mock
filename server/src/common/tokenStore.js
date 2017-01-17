const LRU = require('lru-cache');
const options = {
  maxAge: 10 // 1000 * 60 * 60 * 24 * 1 // 1天
};
const tokenStore = LRU(options);

module.exports = {
  get(token) {
    return tokenStore.get(token) || null;
  },

  set(token, user) {
    tokenStore.set(token, user);
  },

  delete(token) {
    tokenStore.del(token);
  }
};
