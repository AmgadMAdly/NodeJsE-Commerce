const express = require('express');
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateChangePassword,
} = require('../validation/User.Validation.js');
const {
  registerUser,
  loginUser,
  forgotPassword,
  changePassword,
  getAllUsers,
} = require('../controllers/UserController.js');
const { asyncWarpper } = require('../utils/errHandler.js');
const authMiddleware = require('../middleware/Auth.Middleware.js');
const authorizeRoles = require('../middleware/RoleAuth.Middleware.js');

// router.post('/register', asyncWarpper(registerUser));
// router.post('/login', validateLogin, asyncWarpper(loginUser));
// router.post('/forgot-password', validateForgotPassword, asyncWarpper(forgotPassword));
// router.post('/change-password', validateChangePassword, asyncWarpper(changePassword));
// 
router.post('/register', registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/change-password', validateChangePassword, changePassword);
router.get('/getAllUsers',authMiddleware,authorizeRoles(['admin']), getAllUsers);

module.exports = router;