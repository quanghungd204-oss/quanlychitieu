# 📊 Hệ Thống Quản Lý Chi Tiêu Cá Nhân

Ứng dụng web quản lý chi tiêu cá nhân cho phép người dùng quản lý tài chính với đa ví, giao dịch, và thống kê chi tiêu.

## 🚀 Tính Năng

- ✅ **Xác thực người dùng**: Đăng ký, đăng nhập với JWT
- ✅ **Quản lý ví tiền**: Tạo, sửa, xóa ví tiền
- ✅ **Quản lý giao dịch**: Thu nhập, chi tiêu, tự động cập nhật số dư
- ✅ **Phân loại danh mục**: Chi tiêu sinh hoạt, chi phí phát sinh, chi phí cố định
- ✅ **Dashboard trực quan**: Biểu đồ chi tiêu, thống kê thu vs chi
- ✅ **Filter & tìm kiếm**: Lọc giao dịch theo ví, danh mục, khoảng thời gian
- ✅ **Đa người dùng**: Dữ liệu riêng biệt cho mỗi user

## 🛠️ Công Nghệ

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Authentication**: JWT
- **Charts**: Chart.js
- **UI**: Bootstrap Icons

## 📋 Yêu Cầu

- Node.js v14+
- MongoDB (local hoặc Atlas)
- npm hoặc yarn

## 🔧 Cài Đặt

### 1. Clone và cài đặt dependencies

```bash
cd d:\DuongQuangHung (2025-2026)\HKII\QuanLyChiTieu
npm install
```

### 2. Cấu hình Environment

Tạo file `.env` ở thư mục gốc (đã có sẵn):

```env
MONGODB_URI=mongodb://localhost:27017/quanlychitieu
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Thay đổi chỉnh sửa**:
- Nếu dùng MongoDB Atlas, cập nhật `MONGODB_URI`
- Thay `JWT_SECRET` bằng key bảo mật của bạn

### 3. Chạy seed (khởi tạo danh mục)

```bash
npm run seed
```

### 4. Chạy server

#### Development (với auto reload):
```bash
npm run dev
```

#### Production:
```bash
npm start
```

Server sẽ chạy trên `http://localhost:5000`

## 📱 Sử Dụng

### 1. Đăng ký tài khoản
- Mở `http://localhost:5000`
- Nhấp "Đăng ký ngay"
- Nhập thông tin (username, email, password)
- Tự động được tạo **1 ví chính**

### 2. Quản lý ví tiền
- Tab "Ví Tiền" - xem tất cả ví
- Tạo ví mới (ví tiết kiệm, ví chi tiêu, ...)
- Xem số dư từng ví

### 3. Thêm giao dịch
- Tab "Giao Dịch" - ghi lại thu chi
- Chọn loại (Thu nhập / Chi tiêu)
- Chọn danh mục + ví + số tiền
- Số dư ví tự động cập nhật

### 4. Xem thống kê
- Dashboard hiển thị:
  - Tổng số dư tất cả ví
  - Tổng thu nhập, tổng chi tiêu
  - Biểu đồ chi tiêu theo danh mục
  - Biểu đồ thu vs chi

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin người dùng (cần token)

### Wallets
- `GET /api/wallets` - Lấy danh sách ví
- `POST /api/wallets` - Tạo ví mới
- `PUT /api/wallets/:id` - Cập nhật ví
- `DELETE /api/wallets/:id` - Xóa ví

### Categories
- `GET /api/categories` - Lấy danh sách danh mục
- `GET /api/categories/type/:type` - Lấy danh mục theo loại
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

### Transactions
- `GET /api/transactions` - Lấy danh sách giao dịch
- `POST /api/transactions` - Tạo giao dịch mới
- `PUT /api/transactions/:id` - Cập nhật giao dịch
- `DELETE /api/transactions/:id` - Xóa giao dịch

## 📂 Cấu Trúc Project

```
QuanLyChiTieu/
├── backend/
│   ├── config/
│   │   └── db.js              # Kết nối MongoDB
│   ├── models/
│   │   ├── User.js
│   │   ├── Wallet.js
│   │   ├── Category.js
│   │   └── Transaction.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── walletController.js
│   │   ├── categoryController.js
│   │   └── transactionController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── walletRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── transactionRoutes.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   └── errorHandler.js    # Error handling
│   └── utils/
│       └── validators.js      # Form validation
├── frontend/
│   ├── index.html             # Login/Register page
│   ├── dashboard.html         # Main dashboard
│   ├── css/
│   │   └── style.css          # Stylesheet
│   └── js/
│       ├── api.js             # API calls
│       ├── auth.js            # Auth logic
│       └── dashboard.js       # Dashboard logic
├── server.js                  # Express server
├── seed.js                    # Initialize categories
├── .env                       # Environment variables
├── package.json
└── README.md
```

## 🔐 Bảo Mật

- ✅ Password hashing với bcrypt
- ✅ JWT authentication
- ✅ Authorization middleware
- ✅ Form validation
- ✅ Error handling

## 🎯 Danh Mục Mặc Định

### Chi tiêu sinh hoạt
- Chợ / Siêu thị
- Ăn uống
- Di chuyển

### Chi phí phát sinh
- Mua sắm
- Giải trí
- Làm đẹp
- Sức khỏe
- Từ thiện

### Chi phí cố định
- Hóa đơn
- Nhà cửa
- Người thân

### Thu nhập
- Lương
- Thưởng
- Kiếm thêm

## 🚀 Nâng Cấp (Future)

- [ ] Xuất báo cáo PDF
- [ ] Thống kê theo tháng/năm
- [ ] Budget planning
- [ ] Notifications
- [ ] Mobile app
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Data backup/export

## 📝 License

MIT

## 👨‍💻 Author

Dương Quang Hùng

---

**Ghi chú**: Đây là một dự án học tập. Vui lòng không sử dụng trong production nếu không có kiểm tra bảo mật đầy đủ.
