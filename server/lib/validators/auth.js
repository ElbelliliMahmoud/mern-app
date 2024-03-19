const Joi = require("joi");

const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");

module.exports.registerSchema = registerSchema;
