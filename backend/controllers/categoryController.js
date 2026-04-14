const Category = require('../models/Category');

// Lấy danh sách danh mục
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// Lấy danh mục theo type
const getCategoriesByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type phải là income hoặc expense' });
    }

    const categories = await Category.find({ type });
    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

// Tạo danh mục (Admin only - có thể mở rộng)
const createCategory = async (req, res, next) => {
  try {
    const { name, type, group } = req.body;

    if (!name || !type || !group) {
      return res.status(400).json({ 
        message: 'Vui lòng nhập đủ thông tin: name, type, group' 
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type phải là income hoặc expense' });
    }

    const category = new Category({ name, type, group });
    await category.save();

    res.status(201).json({ message: 'Tạo danh mục thành công', category });
  } catch (error) {
    next(error);
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res, next) => {
  try {
    const { name, type, group } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    if (name) category.name = name;
    if (type) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type phải là income hoặc expense' });
      }
      category.type = type;
    }
    if (group) category.group = group;

    await category.save();
    res.json({ message: 'Cập nhật danh mục thành công', category });
  } catch (error) {
    next(error);
  }
};

// Xóa danh mục
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa danh mục thành công' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
};
