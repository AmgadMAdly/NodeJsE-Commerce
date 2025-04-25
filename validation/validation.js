const Joi = require('joi');

// 1. Register schema
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

// 2. Login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// 3. Forgot password schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// 4. Change password schema
const changePasswordSchema = Joi.object({
  token: Joi.string().hex().length(40).required(),
  newPassword: Joi.string().min(8).required(),
});

// Generic validator middleware
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

module.exports = {
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema),
  validateForgotPassword: validate(forgotPasswordSchema),
  validateChangePassword: validate(changePasswordSchema),
};
