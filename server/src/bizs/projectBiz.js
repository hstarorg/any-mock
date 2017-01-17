const Joi = require('joi');
const db = require('./../common/db');
const util = require('./../common/util');
const schemaStore = require('./schemaStore');

const PROJECT_COLLECTION = 'projects';

const createProject = (req, res, next) => {
  schemaStore.validate(req.body, schemaStore.PROJECT_CREATE_SCHEMA)
    .then(() => {
      return db.findOne(PROJECT_COLLECTION, { name: req.body.name });
    })
    .then(data => {
      if (data) {
        return Promise.reject('project name exist.');
      }
      return '';
    })
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
      return project;
    })
    .then(project => {
      return db.insert(PROJECT_COLLECTION, project);
    })
    .then(newDoc => {
      return res.json(newDoc);
    })
    .catch(next);
};

const updateProject = (req, res, next) => {
  let projId = req.params.id;
  schemaStore.validate(req.body, schemaStore.PROJECT_CREATE_SCHEMA)
    .then(() => {
      return db.findOne(PROJECT_COLLECTION, { id: projId })
    })
    .then(project => {
      if (!project) {
        return Promise.reject({ status: 404, message: 'Project not found' });
      }
      return project;
    })
    .then(project => {
      if (project.createBy !== req.user.id) {
        return Promise.reject({ status: 401 });
      }
      console.log(req.body);
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
  db.findOne(PROJECT_COLLECTION, { id: projId })
    .then(project => {
      if (!project) {
        return Promise.reject({ status: 404, message: 'Project not found' });
      }
      return project;
    })
    .then(project => {
      if (project.createBy !== req.user.id) {
        return Promise.reject({ status: 401 });
      }
      return db.remove(PROJECT_COLLECTION, { id: projId });
    })
    .then(() => {
      res.end();
    })
    .catch(next);
};

const getProjectList = (req, res, next) => {
  db.query(PROJECT_COLLECTION, { createBy: req.user.id }, { _id: 0, users: 0 }, {}, { pageIndex: 1, pageSize: Number.MAX_SAFE_INTEGER })
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(next);
};

const getProjectDetail = (req, res, next) => {
  let projId = req.params.id;
  db.findOne(PROJECT_COLLECTION, { id: projId }, { _id: 0, users: 0 })
    .then(project => {
      if (!project) {
        return Promise.reject('Project not exist.');
      }
      res.send(project);
    })
    .catch(next);
};

module.exports = {
  createProject,
  getProjectDetail,
  updateProject,
  deleteProject,
  getProjectList
};
