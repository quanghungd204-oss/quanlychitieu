const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const auth = require('../middleware/auth');

// Tất cả routes yêu cầu authentication
router.use(auth);

// Lấy danh sách ví
router.get('/', walletController.getWallets);

// Tạo ví mới
router.post('/', walletController.createWallet);

// Cập nhật ví
router.put('/:id', walletController.updateWallet);

// Xóa ví
router.delete('/:id', walletController.deleteWallet);

module.exports = router;
