const db = require('./../../common/db');
const util = require('./../../common/util');
const schemaStore = require('./../schemaStore');

const PROJECT_COLLECTION = 'projects';
const API_COLLECTION = 'apis';

const getGroupList = (req, res, next) => {
  let projId = req.params.projId;
  db.find(API_COLLECTION, { projectId: projId }, { groupId: 1 })
    .then(apis => { // 查询API和Group进行汇总，计算数量，返回
      let groups = req.project.groups;
      groups.forEach(group => {
        group.apiCount = apis.filter(x => x.groupId === group.groupId).length;
      });
      res.send(groups);
    })
    .catch(next);
};

const createGroup = (req, res, next) => {
  let projId = req.params.projId;
  schemaStore.validate(req.body, schemaStore.PROJECT_GROUP_SCHEMA)
    .then(() => {
      let group = {
        groupId: util.generateId(),
        name: req.body.groupName
      };
      let updateObj = {
        $push: {
          groups: group
        }
      };
      return db.update(PROJECT_COLLECTION, { id: projId }, updateObj);
    })
    .then(() => {
      res.end();
    })
    .catch(next);
};

const updateGroup = (req, res, next) => {
  let projId = req.params.projId;
  let groupId = req.params.groupId;
  schemaStore.validate(req.body, schemaStore.PROJECT_GROUP_SCHEMA)
    .then(() => {
      let groups = req.project.groups;
      groups.filter(x => x.groupId === groupId)
        .forEach(group => {
          group.name = req.body.groupName;
        });
      let updateObj = {
        $set: {
          groups
        }
      };
      return db.update(PROJECT_COLLECTION, { id: projId }, updateObj);
    })
    .then(() => {
      res.end();
    })
    .catch(next);
};

const deleteGroup = (req, res, next) => {
  let projId = req.params.projId;
  let groupId = req.params.groupId;
  if (req.project.createBy !== req.user.id) {
    return next({ status: 401 });
  }
  let groups = req.project.groups;
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i].groupId === groupId) {
      groups.splice(i, 1);
      if (i === 0) {
        return next({ status: 500, message: 'Can\'t delete the first group' });
      }
      break;
    }
  }
  let updateObj = {
    $set: {
      groups
    }
  };
  Promise.all([
    db.remove(API_COLLECTION, { projectId: projId, groupId }, true),
    db.update(PROJECT_COLLECTION, { id: projId }, updateObj)
  ])
    .then(result => {
      res.end();
    }).catch(next);
};

module.exports = {
  getGroupList,
  createGroup,
  updateGroup,
  deleteGroup
};
