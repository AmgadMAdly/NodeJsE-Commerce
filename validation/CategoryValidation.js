const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": `"name" must be a string`,
      "string.empty": `"name" is required`,
      "string.min": `"name" should be at least 2 characters`,
      "any.required": `"name" is a required field`,
    }),
});

module.exports = { createCategorySchema };
