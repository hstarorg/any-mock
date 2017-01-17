const Joi = require('joi');

const validate = (data, schema) => {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, { abortEarly: false, allowUnknown: true }, (err, value) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
};

const PROJECT_CREATE_SCHEMA = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
});

module.exports = {
  validate,
  PROJECT_CREATE_SCHEMA
};
