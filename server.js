require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const Category = require('./backend/models/Category');
const errorHandler = require('./backend/middleware/errorHandler');

// Routes
const authRoutes = require('./backend/routes/authRoutes');
const walletRoutes = require('./backend/routes/walletRoutes');
const categoryRoutes = require('./backend/routes/categoryRoutes');
const transactionRoutes = require('./backend/routes/transactionRoutes');

const autoSeedCategories = async () => {
  try {
    const existingCategories = await Category.countDocuments();
    if (existingCategories === 0) {
      console.log('🌱 Seeding categories...');
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
      console.log('✓ Categories seeded!');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};
const app = express();

// Kết nối MongoDB
connectDB();

// Auto seed
autoSeedCategories();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (frontend)
app.use(express.static('frontend'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route không tồn tại' });
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server chạy trên port ${PORT}`);
  console.log(`✓ Truy cập: http://localhost:${PORT}`);
});
