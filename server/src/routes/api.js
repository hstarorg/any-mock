const router = new Router();
const apiBiz = require('./../bizs/apiBiz');
const auth = require('./../common/auth');

// 必须是登录用户
router.use(auth.authenticate);

router.post('/:projId/api/new', apiBiz.hasProjectPremission, apiBiz.createApi); // Create

router.get('/:projId/api/', apiBiz.hasProjectPremission, apiBiz.getApiList); // Get List

router.get('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.getApiDetail); // Get Api Detail

router.put('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.updateApi); // Update API

router.delete('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.deleteApi); // Delete API

module.exports = {
  priority: 900,
  router,
  prefix: '/project'
};
