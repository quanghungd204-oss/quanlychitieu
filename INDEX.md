# 📚 Hướng Dẫn Điều Hướng Tài Liệu

## 🚀 Bắt Đầu (New Users)

Hãy bắt đầu từ **đây**:

### 1️⃣ **[QUICK_START.md](QUICK_START.md)** ⭐ (Đọc trước!)
**5 phút setup** - Làm những gì cần làm để chạy app ngay.
```
npm install
npm run seed
npm run dev
```

### 2️⃣ **[MONGODB_SETUP.md](MONGODB_SETUP.md)** (Nếu chưa có MongoDB)
Hướng dẫn cài MongoDB local hoặc Atlas (cloud).

### 3️⃣ **[README.md](README.md)** (Tài liệu chính)
Tài liệu hoàn chỉnh - ngôn ngữ, công nghệ, APIs, tính năng.

---

## 📖 Tài Liệu Chi Tiết

| File | Dùng Cho | Để Lâu |
|------|----------|--------|
| [QUICK_START.md](QUICK_START.md) | Setup nhanh 5 phút | ⭐ Bắt đầu ở đây |
| [README.md](README.md) | Tài liệu hoàn chỉnh | 📚 Reference chính |
| [MONGODB_SETUP.md](MONGODB_SETUP.md) | Cài MongoDB | 💾 Database setup |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Tóm tắt dự án | 📋 Thống kê project |
| [PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md) | Danh sách kiểm tra | ✅ Verification |
| [API Documentation](#api-documentation) | Tất cả APIs | 🔌 Development |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Giải quyết lỗi | 🐛 Debug |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy lên production | 🚀 Publish |
| [Postman_Collection.json](Postman_Collection.json) | Test API | 🧪 Testing |

---

## 🎯 Use Cases - Đọc Gì?

### 👨‍💻 "Tôi muốn setup server ngay bây giờ"
→ **[QUICK_START.md](QUICK_START.md)**

### 📚 "Tôi cần hiểu project này hoàn toàn"
→ **[README.md](README.md)** + **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**

### 💾 "Tôi cần cài MongoDB"
→ **[MONGODB_SETUP.md](MONGODB_SETUP.md)**

### 🔌 "Tôi muốn test API endpoints"
→ **[API Documentation](#api-documentation)** + **[Postman_Collection.json](Postman_Collection.json)**

### 🐛 "Server bị lỗi / không chạy"
→ **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

### 🚀 "Tôi muốn deploy lên production"
→ **[DEPLOYMENT.md](DEPLOYMENT.md)**

### ✅ "Tôi kiểm tra xem đã hoàn thành chưa"
→ **[PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)**

---

## 📁 File Structure

```
QuanLyChiTieu/
│
├─ 📄 server.js                  Main server file
├─ 📄 seed.js                    Initialize categories
│
├─ 📁 backend/
│  ├─ config/ db.js              MongoDB connection
│  ├─ models/                    Schemas (User, Wallet, ...)
│  ├─ controllers/               Business logic
│  ├─ routes/                    API endpoints
│  ├─ middleware/                Auth, error handling
│  └─ utils/                     Validators, helpers
│
├─ 📁 frontend/
│  ├─ index.html                 Login/Register page
│  ├─ dashboard.html             Main dashboard
│  ├─ css/ style.css             Styling
│  └─ js/ (api.js, auth.js, dashboard.js)
│
└─ 📄 Documentation Files (below)
```

---

## 📄 Documentation Files

### Setup & Quick Start
- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide ⭐
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Database installation
- **[.env.example](.env.example)** - Environment template

### Main Documentation  
- **[README.md](README.md)** - Complete project documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview & statistics
- **[PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)** - Feature checklist

### Development & Debugging
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues & solutions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[Postman_Collection.json](Postman_Collection.json)** - API test collection
- **[INDEX.md](INDEX.md)** - This file (Navigation guide)

---

## 🔌 API Documentation

### Quick Reference

```
BASE_URL: http://localhost:5000/api
```

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Đăng ký người dùng mới |
| POST | `/auth/login` | Đăng nhập |
| GET | `/auth/me` | Lấy thông tin hiện tại |

### Wallets
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/wallets` | Danh sách ví |
| POST | `/wallets` | Tạo ví mới |
| PUT | `/wallets/:id` | Cập nhật ví |
| DELETE | `/wallets/:id` | Xóa ví |

### Transactions
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/transactions` | Danh sách giao dịch (có filter) |
| POST | `/transactions` | Tạo giao dịch mới |
| PUT | `/transactions/:id` | Cập nhật giao dịch |
| DELETE | `/transactions/:id` | Xóa giao dịch |

### Categories
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/categories` | Danh sách danh mục |
| GET | `/categories/type/:type` | Danh mục theo loại |
| POST | `/categories` | Tạo danh mục |
| PUT | `/categories/:id` | Cập nhật danh mục |
| DELETE | `/categories/:id` | Xóa danh mục |

→ **Chi tiết xem [README.md#api-endpoints](README.md)**

---

## 🛠️ Common Commands

```bash
# Setup
npm install              # Cài dependencies
npm run seed            # Khởi tạo danh mục
npm run dev             # Chạy development mode
npm start               # Chạy production mode

# Debugging
npm run seed            # Re-initialize categories
node -c server.js       # Check syntax
```

---

## 💡 Tips & Tricks

### Rename localhost to actual IP
```bash
# Nếu cần access từ device khác:
http://YOUR_PC_IP:5000
# Example: http://192.168.1.100:5000
```

### Change port
```bash
# Edit .env
PORT=5001
```

### Test API with cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"hung","email":"hung@example.com","password":"123456","confirmPassword":"123456"}'
```

### View MongoDB data
```bash
mongosh
use quanlychitieu
db.users.find()
db.transactions.find()
```

---

## 🎓 Learning Path

**Beginner:**
1. [QUICK_START.md](QUICK_START.md) - Run the app
2. Use web UI - Create account, add transactions
3. Check browser DevTools - See requests

**Intermediate:**
4. [API Documentation](#api-documentation) - Understand endpoints
5. Test APIs with Postman
6. Check backend code - models, controllers

**Advanced:**
7. [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy online
8. Add features (edit transactions, monthly stats, etc.)
9. Optimize performance

---

## 🆘 Quick Help

**Server won't start?**  
→ [TROUBLESHOOTING.md](TROUBLESHOOTING.md#error-mongodb-connection-failed)

**MongoDB not connecting?**  
→ [MONGODB_SETUP.md](MONGODB_SETUP.md) or [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**API test failing?**  
→ [TROUBLESHOOTING.md](TROUBLESHOOTING.md#error-cannot-post-apiauth-register)

**Want to deploy?**  
→ [DEPLOYMENT.md](DEPLOYMENT.md)

**Need API reference?**  
→ [README.md#6-api-restful](README.md) or use [Postman_Collection.json](Postman_Collection.json)

---

## 📊 Project Statistics

- **Total Files**: 25+
- **Backend Files**: 16
- **Frontend Files**: 7
- **Documentation Files**: 9
- **API Endpoints**: 20+
- **Database Models**: 4
- **Lines of Code**: 3000+
- **Features**: 30+

**See more**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## ✅ Before Submission

- [ ] Read [README.md](README.md)
- [ ] Check [PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)
- [ ] Test all features
- [ ] Verify databases work
- [ ] Test APIs with Postman
- [ ] Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🎉 Ready?

### Start Here: [QUICK_START.md](QUICK_START.md)

```bash
npm install
npm run seed
npm run dev
```

Then open: `http://localhost:5000`

---

**Happy coding! 🚀**

*Last updated: 2026-04-14*
