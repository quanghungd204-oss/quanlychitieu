const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { validateRegister, validateLogin, handleValidationErrors } = require('../utils/validators');

// Đăng ký
router.post('/register', validateRegister, handleValidationErrors, authController.register);

// Đăng nhập
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Lấy thông tin user hiện tại (requires auth)
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
