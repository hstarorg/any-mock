let router = new Router();

let userBiz = require('./../bizs/userBiz');
let appBiz = require('./../bizs/appBiz');
let apiBiz = require('./../bizs/apiBiz');

// App
router.post('/app', userBiz.auth, appBiz.createApp);
router.get('/app', userBiz.auth, appBiz.getApps);
router.get('/app/:appId', userBiz.auth, appBiz.getApp);

// API
router.post('/app/:appId/api', userBiz.auth, apiBiz.validateApi, apiBiz.createApi);
router.get('/app/:appId/api', userBiz.auth, appBiz.getAppApis);
router.put('/app/:appId/api/:apiId', userBiz.auth, apiBiz.validateApi, apiBiz.findApi, apiBiz.updateApi);
router.get('/app/:appId/api/:apiId', userBiz.auth, apiBiz.getApi);
router.delete('/app/:appId/api/:apiId', userBiz.auth, apiBiz.findApi, apiBiz.deleteApi);

// Other
router.post('/login', userBiz.validateUserInfo, userBiz.doLogin);
router.post('/logout', userBiz.auth, userBiz.doLogout);
router.post('/register', userBiz.validateUserInfo, userBiz.createUser);

//每个路由文件需要如下方式导出： 
module.exports = {
  priority: 1000, // 可选参数，默认0，优先级，越大越先加载 
  router: router, // 必须参数，router对象。 
  prefix: '/api/v1/manage' // 可选参数，默认/，router前缀，会拼接在options.apiPrefix之后。 
};