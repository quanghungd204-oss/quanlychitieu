const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// Tất cả routes yêu cầu authentication
router.use(auth);

// Lấy danh sách giao dịch
router.get('/', transactionController.getTransactions);

// Tạo giao dịch
router.post('/', transactionController.createTransaction);

// Cập nhật giao dịch
router.put('/:id', transactionController.updateTransaction);

// Xóa giao dịch
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
