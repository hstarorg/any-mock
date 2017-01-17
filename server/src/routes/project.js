const router = new Router();
const projectBiz = require('./../bizs/projectBiz');
const auth = require('./../common/auth');

router.use(auth.authenticate); // 验证User

// Project
router.post('/new', projectBiz.createProject); // Create

router.get('/', projectBiz.getProjectList); // Get List

router.get('/:id', projectBiz.getProjectDetail) // Get Single

router.put('/:id', projectBiz.updateProject) // Update

router.delete('/:id', projectBiz.deleteProject) // Delete

//每个路由文件需要如下方式导出：
module.exports = {
  priority: 1000, // 可选参数，默认0，优先级，越大越先加载
  router: router, // 必须参数，router对象。
  prefix: '/project' // 可选参数，默认/，router前缀，会拼接在options.apiPrefix之后。
};
