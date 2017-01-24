const Joi = require('joi');

const validate = (data, schema, options = { abortEarly: false, allowUnknown: true }) => {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, options, (err, value) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
};

const PROJECT_CREATE_SCHEMA = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
});

const API_SCHEMA = Joi.object().keys({
  groupId: Joi.string().required(),
  name: Joi.string().required(),
  path: Joi.string().required(),
  method: Joi.any().allow('GET', 'POST', 'PUT', 'DELETE'),
  res: Joi.object().keys({
    headers: Joi.array().items(Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.string().required()
    })),
    contentType: Joi.string().required(),
    status: Joi.number().required(),
    body: Joi.any()
  }),
  filters: Joi.array(),
  isEnable: Joi.boolean(),
  enableProxy: Joi.boolean(),
  proxyUrl: Joi.any()
});

const PROJECT_MEMBER_SCHEMA = Joi.object().keys({
  memberName: Joi.string().required()
});

const PROJECT_GROUP_SCHEMA = Joi.object().keys({
  groupName: Joi.string().required()
});

module.exports = {
  validate,
  PROJECT_CREATE_SCHEMA,
  API_SCHEMA,
  PROJECT_MEMBER_SCHEMA,
  PROJECT_GROUP_SCHEMA
};
