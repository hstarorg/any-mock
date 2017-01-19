const db = require('./../common/db');
const util = require('./../common/util');
const schemaStore = require('./schemaStore');
const userBiz = require('./userBiz');

const PROJECT_COLLECTION = 'projects';

const _getProjectById = (id, userId, fieldsObj = {}) => {
  return db.findOne(PROJECT_COLLECTION, { id }, fieldsObj)
    .then(project => {
      if (!project) {
        return Promise.reject({ status: 404, message: 'Project not found.' });
      }
      return project;
    })
    .then(project => {

      if (userId && project.createBy !== userId) {
        return Promise.reject({ status: 401 });
      }
      return project;
    });
};

const createProject = (req, res, next) => {
  schemaStore.validate(req.body, schemaStore.PROJECT_CREATE_SCHEMA)
    .then(() => {
      let project = {
        id: util.generateId(),
        name: req.body.name,
        description: req.body.description || '',
        createDate: Date.now(),
        createBy: req.user.id,
        groups: [{ groupId: util.generateId(), name: '默认分组' }],
        users: []
      };
      return db.insert(PROJECT_COLLECTION, project);
    })
    .then(newDoc => {
      return res.send(newDoc);
    })
    .catch(next);
};

const updateProject = (req, res, next) => {
  let projId = req.params.id;
  schemaStore.validate(req.body, schemaStore.PROJECT_CREATE_SCHEMA)
    .then(() => {
      return _getProjectById(projId, req.user.id);
    })
    .then(project => {
      return db.update(PROJECT_COLLECTION, { id: projId }, { $set: req.body });
    })
    .then(numReplaced => {
      if (numReplaced === 0) {
        return Promise.reject({ status: 500, message: 'Update project failed, please retry.' });
      }
      res.end();
    })
    .catch(next);
};

const deleteProject = (req, res, next) => {
  let projId = req.params.id;
  _getProjectById(projId, req.user.id)
    .then(project => {
      return db.remove(PROJECT_COLLECTION, { id: projId });
    })
    .then(() => {
      res.end();
    })
    .catch(next);
};

const getProjectList = (req, res, next) => {
  db.find(PROJECT_COLLECTION, { createBy: req.user.id }, { _id: 0 })
    .then(result => {
      res.send(result);
    })
    .catch(next);
};

const getProjectDetail = (req, res, next) => {
  let projId = req.params.id;
  _getProjectById(projId, null, { _id: 0 })
    .then(project => {
      res.send(project);
    })
    .catch(next);
};

const addMember = (req, res, next) => {
  let projId = req.params.id;
  let pushMember;
  schemaStore.validate(req.body, schemaStore.PROJECT_MEMBER_SCHEMA)
    .then(() => {
      return Promise.all([
        _getProjectById(projId, req.user.id),
        userBiz.getUser(req.body.memberName)
      ]);
    })
    .then(results => {
      if (!results[1]) {
        return Promise.reject({ status: 404, message: 'Member not found.' });
      }
      pushMember = {
        userId: results[1].id, role: 'admin', username: results[1].username
      };
      return db.update(PROJECT_COLLECTION, { id: projId }, { $push: { users: pushMember } });
    })
    .then(numReplaced => {
      if (numReplaced === 0) {
        return Promise.reject({ status: 500, message: 'Faild, please retry.' });
      }
      res.send(pushMember);
    })
    .catch(next);
};

module.exports = {
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
  getProjectList,
  addMember
};
