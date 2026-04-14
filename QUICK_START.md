# 🚀 Hướng Dẫn Nhanh - Bắt Đầu Trong 5 Phút

## ✅ Điều kiện Tiên Quyết

1. **MongoDB** chạy trên máy hoặc trên MongoDB Atlas
2. **Node.js** v14+
3. **npm** hoặc **yarn**

## 📋 Các Bước

### 1️⃣ Cài đặt Dependencies (2 phút)

```bash
cd d:\DuongQuangHung (2025-2026)\HKII\QuanLyChiTieu
npm install
```

### 2️⃣ Cập nhật .env (30 giây)

**File `.env` đã có sẵn, kiểm tra:**

```env
MONGODB_URI=mongodb://localhost:27017/quanlychitieu
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Nếu dùng MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quanlychitieu?retryWrites=true&w=majority
```

### 3️⃣ Khởi Tạo Danh Mục (30 giây)

```bash
npm run seed
```

Output sẽ hiển thị:
```
✓ Khởi tạo danh mục mặc định thành công!
```

### 4️⃣ Chạy Server (30 giây)

**Development** (auto reload khi lưu file):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

Output sẽ hiển thị:
```
✓ MongoDB kết nối thành công
✓ Server chạy trên port 5000
✓ Truy cập: http://localhost:5000
```

## 🎉 Thế là xong!

### Truy cập ứng dụng:
```
http://localhost:5000
```

### Đăng ký tài khoản mới:
1. Nhấp "Đăng ký ngay"
2. Nhập username, email, password
3. Pal hệ thống tự tạo **1 ví chính** cho bạn

### Thử nghiệm ngay:
1. **Tab Tổng Quan** - Xem dashboard
2. **Tab Ví Tiền** - Tạo ví mới
3. **Tab Giao Dịch** - Ghi lại thu chi
4. **Xem biểu đồ** - Thống kê chi tiêu

---

## 🔧 Giải Quyết Vấn Đề

### MongoDB không kết nối?

**Kiểm tra:**
```bash
# Windows
net start MongoDB  # Hoặc dùng MongoDB Compass GUI

# Linux/Mac
brew services start mongodb-community
```

**Hoặc dùng MongoDB Atlas** (cloud):
1. Tạo account: https://www.mongodb.com/cloud/atlas
2. Cập nhật `MONGODB_URI` trong `.env`

### Port 5000 đã được sử dụng?

**Cách 1:**
```bash
# Thay đổi PORT trong .env
PORT=5001
```

**Cách 2:**
```bash
# Windows - Dừng process đang dùng port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Token hết hạn?

- Token tự động hết hạn sau 7 ngày
- Khi đó, vui lòng đăng nhập lại

---

## 📱 API Test với Postman

1. Mở **Postman**
2. Import file: `Postman_Collection.json`
3. Chọn request, nhấp **Send**

**Lưu ý**: Thay `YOUR_TOKEN_HERE` bằng token từ API `/api/auth/login`

---

## 💡 Mẹo Nhanh

| Tác vụ | Lệnh |
|--------|------|
| Chạy dev | `npm run dev` |
| Chạy production | `npm start` |
| Seed danh mục | `npm run seed` |
| Cài thêm package | `npm install package-name` |
| Xem log | Check console terminal |

---

## 🆘 Cần Giúp?

**Kiểm tra:**
1. ✅ Node.js cài được? `node -v`
2. ✅ MongoDB chạy? Check MongoDB Compass
3. ✅ .env đúng? MONGODB_URI hợp lệ?
4. ✅ Port 5000 trống?
5. ✅ npm install thành công?

---

**Chúc bạn sử dụng vui vẻ! 🎉**
