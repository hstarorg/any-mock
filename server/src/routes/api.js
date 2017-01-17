const router = new Router();
const apiBiz = require('./../bizs/apiBiz');
const auth = require('./../common/auth');

router.use(auth.authenticate);

// API
// router.post('/app/:appId/api', userBiz.auth, apiBiz.validateApi, apiBiz.createApi);
// router.get('/app/:appId/api', userBiz.auth, appBiz.getAppApis);
// router.put('/app/:appId/api/:apiId', userBiz.auth, apiBiz.validateApi, apiBiz.findApi, apiBiz.updateApi);
// router.get('/app/:appId/api/:apiId', userBiz.auth, apiBiz.findApi, apiBiz.getApi);
// router.delete('/app/:appId/api/:apiId', userBiz.auth, apiBiz.findApi, apiBiz.deleteApi);

//每个路由文件需要如下方式导出：
module.exports = {
  priority: 1000, // 可选参数，默认0，优先级，越大越先加载
  router: router, // 必须参数，router对象。
  prefix: '/api' // 可选参数，默认/，router前缀，会拼接在options.apiPrefix之后。
};
