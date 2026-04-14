const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./backend/models/Category');
const connectDB = require('./backend/config/db');

const seedCategories = async () => {
  try {
    await connectDB();

    // Xóa categories cũ (optional)
    await Category.deleteMany({});

    const categories = [
      // Chi tiêu sinh hoạt
      { name: 'Chợ / Siêu thị', type: 'expense', group: 'Chi tiêu sinh hoạt' },
      { name: 'Ăn uống', type: 'expense', group: 'Chi tiêu sinh hoạt' },
      { name: 'Di chuyển', type: 'expense', group: 'Chi tiêu sinh hoạt' },

      // Chi phí phát sinh
      { name: 'Mua sắm', type: 'expense', group: 'Chi phí phát sinh' },
      { name: 'Giải trí', type: 'expense', group: 'Chi phí phát sinh' },
      { name: 'Làm đẹp', type: 'expense', group: 'Chi phí phát sinh' },
      { name: 'Sức khỏe', type: 'expense', group: 'Chi phí phát sinh' },
      { name: 'Từ thiện', type: 'expense', group: 'Chi phí phát sinh' },

      // Chi phí cố định
      { name: 'Hóa đơn', type: 'expense', group: 'Chi phí cố định' },
      { name: 'Nhà cửa', type: 'expense', group: 'Chi phí cố định' },
      { name: 'Người thân', type: 'expense', group: 'Chi phí cố định' },

      // Thu nhập
      { name: 'Lương', type: 'income', group: 'Thu nhập' },
      { name: 'Thưởng', type: 'income', group: 'Thu nhập' },
      { name: 'Kiếm thêm', type: 'income', group: 'Thu nhập' },
      { name: 'Khác', type: 'income', group: 'Thu nhập' },
    ];

    await Category.insertMany(categories);
    console.log('✓ Khởi tạo danh mục mặc định thành công!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi khởi tạo danh mục:', error);
    process.exit(1);
  }
};

seedCategories();
