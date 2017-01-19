const router = new Router();
const projectBiz = require('./../bizs/projectBiz');
const auth = require('./../common/auth');

router.use(auth.authenticate); // 验证User

// Project
router.post('/new', projectBiz.createProject); // Create

router.get('/', projectBiz.getProjectList); // Get List

router.get('/:id', projectBiz.getProjectDetail); // Get Single

router.put('/:id', projectBiz.updateProject); // Update

router.delete('/:id', projectBiz.deleteProject); // Delete

router.post('/:id/member', projectBiz.addMember); // Add Member

module.exports = {
  priority: 1000,
  router,
  prefix: '/project'
};
