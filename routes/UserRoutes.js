const express = require('express');
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateChangePassword,
} = require('../validation/validation.js');
const {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword,
} = require('../controllers/UserController');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/change-password', validateChangePassword, changePassword);

module.exports = router;
