require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/db');
const errorHandler = require('./backend/middleware/errorHandler');

// Routes
const authRoutes = require('./backend/routes/authRoutes');
const walletRoutes = require('./backend/routes/walletRoutes');
const categoryRoutes = require('./backend/routes/categoryRoutes');
const transactionRoutes = require('./backend/routes/transactionRoutes');

const app = express();

// Kết nối MongoDB
connectDB();

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
