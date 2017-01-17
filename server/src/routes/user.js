const router = new Router();
const userBiz = require('./../bizs/userBiz');

// Other
// router.post('/login', userBiz.validateUserInfo, userBiz.doLogin);
// router.post('/logout', userBiz.auth, userBiz.doLogout);
// router.post('/register', userBiz.validateUserInfo, userBiz.createUser);
// router.post('/autoLogin', userBiz.doAutoLogin);

//每个路由文件需要如下方式导出：
module.exports = {
  priority: 1000, // 可选参数，默认0，优先级，越大越先加载
  router: router, // 必须参数，router对象。
  prefix: '/user' // 可选参数，默认/，router前缀，会拼接在options.apiPrefix之后。
};
