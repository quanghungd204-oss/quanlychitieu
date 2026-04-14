const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri;
    
    // Nếu là production (Railway), dùng MONGODB_URI từ Railway
    if (process.env.NODE_ENV === 'production') {
      uri = process.env.MONGODB_URI;
    } else {
      // Local development, dùng MongoDB local
      uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quanlychitieu';
    }
    
    if (!uri) {
      throw new Error('MONGODB_URI not configured');
    }
    
    console.log(`🔗 Connecting to: ${uri.split('://')[0]}://...`);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB kết nối thành công');
  } catch (error) {
    console.error('✗ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;