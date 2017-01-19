const router = new Router();
const userBiz = require('./../bizs/userBiz');

// Other
router.post('/login', userBiz.validateUserInfo, userBiz.doLogin);
// router.post('/logout', userBiz.auth, userBiz.doLogout);
// router.post('/register', userBiz.validateUserInfo, userBiz.createUser);
router.post('/autologin', userBiz.doAutoLogin);

//每个路由文件需要如下方式导出：
module.exports = {
  priority: 1000,
  router,
  prefix: '/user'
};
