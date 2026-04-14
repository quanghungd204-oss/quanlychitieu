const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Lấy danh sách danh mục (không yêu cầu auth)
router.get('/', categoryController.getCategories);

// Lấy danh mục theo type
router.get('/type/:type', categoryController.getCategoriesByType);

// Routes phía dưới yêu cầu authentication
router.use(auth);

// Tạo danh mục
router.post('/', categoryController.createCategory);

// Cập nhật danh mục
router.put('/:id', categoryController.updateCategory);

// Xóa danh mục
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
