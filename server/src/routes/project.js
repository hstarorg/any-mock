const router = new Router();
const projectBiz = require('./../bizs/projectBiz');

router.use()

// Project
router.post('/new'); // Create

router.get('/'); // Get List

router.get('/:id') // Get Single

router.put('/:id') // Update

router.delete('/:id') // Delete

// router.post('/app', userBiz.auth, appBiz.createApp);
// router.get('/app', userBiz.auth, appBiz.getApps);
// router.get('/app/:appId', userBiz.auth, appBiz.getApp);
// router.put('/app/:appId', userBiz.auth, appBiz.hasAppAuth, appBiz.updateApp);
// router.delete('/app/:appId', userBiz.auth, appBiz.hasAppAuth, appBiz.deleteApp);

//每个路由文件需要如下方式导出：
module.exports = {
  priority: 1000, // 可选参数，默认0，优先级，越大越先加载
  router: router, // 必须参数，router对象。
  prefix: '/project' // 可选参数，默认/，router前缀，会拼接在options.apiPrefix之后。
};
