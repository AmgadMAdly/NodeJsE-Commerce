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

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ message: 'Validation error', details });
    }
    next();
  };
}

module.exports = { validateCreatCategory: validate(createCategorySchema) };
