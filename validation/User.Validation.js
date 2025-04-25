const Joi = require('joi');

// Register schema
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'First Name must be a string',
    'string.min': 'First Name should be at least 2 characters long',
    'any.required': 'First Name is required'
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Last Name must be a string',
    'string.min': 'Last Name should be at least 2 characters long',
    'any.required': 'Last Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password should be at least 8 characters long',
    'any.required': 'Password is required'
  }),
  role: Joi.string().valid('customer', 'admin').default('customer').messages({
    'any.only': 'Role must be either customer or admin'
  })
});

// Login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  }),
});

// Forgot password schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
});

// Change password schema
const changePasswordSchema = Joi.object({
  token: Joi.string().hex().length(40).required().messages({
    'string.length': 'Token must be exactly 40 characters long',
    'any.required': 'Token is required'
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.min': 'New Password should be at least 8 characters long',
    'any.required': 'New Password is required'
  }),
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