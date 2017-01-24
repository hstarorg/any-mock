const router = new Router();
const auth = require('./../common/auth');
const projectBiz = require('./../bizs/project/projectBiz');
const apiBiz = require('./../bizs/project/apiBiz');
const groupBiz = require('./../bizs/project/groupBiz');

router.use(auth.authenticate); // 验证User

// Project 相关
router.post('/new', projectBiz.createProject); // Create
router.get('/', projectBiz.getProjectList); // Get List
router.get('/:id', projectBiz.getProjectDetail); // Get Single
router.put('/:id', projectBiz.updateProject); // Update
router.delete('/:id', projectBiz.deleteProject); // Delete
router.post('/:id/member', projectBiz.addMember); // Add Member

// API 相关
router.post('/:projId/api/new', apiBiz.hasProjectPremission, apiBiz.createApi); // Create
router.get('/:projId/api/', apiBiz.hasProjectPremission, apiBiz.getApiList); // Get List
router.get('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.getApiDetail); // Get Api Detail
router.put('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.updateApi); // Update API
router.delete('/:projId/api/:id', apiBiz.hasProjectPremission, apiBiz.deleteApi); // Delete API

// Group 相关
router.get('/:projId/group', projectBiz.isProjectManager, groupBiz.getGroupList); // Get List
router.post('/:projId/group/new', projectBiz.isProjectManager, groupBiz.createGroup); // Create Group
router.put('/:projId/group/:groupId', projectBiz.isProjectManager, groupBiz.updateGroup); // Update Group
router.delete('/:projId/group/:groupId', projectBiz.isProjectManager, groupBiz.deleteGroup); // Update Group

module.exports = {
  priority: 1000,
  router,
  prefix: '/api/v1/project'
};
