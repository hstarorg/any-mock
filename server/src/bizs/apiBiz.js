const db = require('./../common/db');
const util = require('./../common/util');
const schemaStore = require('./schemaStore');

const PROJECT_COLLECTION = 'projects';
const API_COLLECTION = 'apis';

const hasProjectPremission = (req, res, next) => {
  console.log(req.params);
  let projId = req.params.projId;
  let userId = req.user.id;
  db.findOne(PROJECT_COLLECTION, { id: projId })
    .then(project => {
      if (!project) {
        return next({ status: 404, message: 'Project not found.' });
      }
      if (project.createBy !== userId && !project.users.find(x => x.userId === userId)) {
        return next({ status: 401, message: 'No project premission.' });
      }
      next();
    });
}

const createApi = (req, res, next) => {
  let projId = req.params.projId;
  let userId = req.user.id;
  let now = Date.now();
  schemaStore.validate(req.body, schemaStore.API_SCHEMA)
    .then(() => {
      let api = Object.assign({}, req.body, {
        id: util.generateId(),
        projectId: projId,
        createDate: now,
        createBy: userId,
        lastUpdateDate: now,
        lastUpdateBy: userId
      });
      return db.insert(API_COLLECTION, api);
    })
    .then(newApi => {
      res.status(201).end();
    })
    .catch(next);
};

const getApiList = (req, res, next) => {
  let projId = req.params.projId;
  db.find(API_COLLECTION, { projectId: projId }, {}, {
    groupId: 1,
    createDate: 1
  })
    .then(result => {
      res.send(result);
    })
    .catch(next);
};

const getApiDetail = (req, res, next) => {
  let projId = req.params.projId;
  let apiId = req.params.id;
  db.findOne(API_COLLECTION, { id: apiId, projectId: projId })
    .then(api => {
      if (!api) {
        return Promise.reject({ status: 404, message: 'Api not found.' });
      }
      res.send(api);
    })
    .catch(next);
};

const updateApi = (req, res, next) => {
  let projId = req.params.projId;
  let apiId = req.params.id;
  let userId = req.user.id;
  let now = Date.now();
  schemaStore.validate(req.body, schemaStore.API_SCHEMA, { allowUnknown: false })
    .then(() => {
      let api = Object.assign({}, req.body, {
        lastUpdateDate: now,
        lastUpdateBy: userId
      });
      return db.update(API_COLLECTION, { projectId: projId, id: apiId }, api);
    })
    .then(numReplaced => {
      res.end();
    })
    .catch(next);
};

const deleteApi = (req, res, next) => {
  let projId = req.params.projId;
  let apiId = req.params.id;
  db.remove(API_COLLECTION, { projectId: projId, id: apiId })
    .then(numRemoved => {
      if (numRemoved === 0) {
        return Promise.reject({ status: 500, message: 'Delete api failed, please retry.' });
      }
      res.end();
    })
    .catch(next);
};

module.exports = {
  hasProjectPremission,
  createApi,
  getApiList,
  getApiDetail,
  updateApi,
  deleteApi
};
