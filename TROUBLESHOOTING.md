# 🐛 Troubleshooting Guide

Nếu gặp lỗi, hãy kiểm tra các vấn đề phổ biến dưới đây.

---

## ❌ Lỗi: "MongoDB connection failed"

### Nguyên nhân
- MongoDB chưa chạy
- Connection string sai
- IP không được whitelist (nếu dùng Atlas)

### Giải pháp

**Nếu dùng MongoDB local:**
```bash
# Windows - Start MongoDB
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

**Kiểm tra:**
```bash
# Verify MongoDB running
mongosh
# Nếu kết nối được, gõ: exit để thoát
```

**Nếu dùng MongoDB Atlas:**
1. Kiểm tra MONGODB_URI trong `.env`
2. Đảm bảo format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
3. Whitelist IP: Security → Network Access → Add IP Address
4. Thêm IP của máy bạn hoặc `0.0.0.0/0` (cho development)

---

## ❌ Lỗi: "Port 5000 already in use"

### Windows
```bash
# Tìm process dùng port 5000
netstat -ano | findstr :5000

# Kill process (example: PID 1234)
taskkill /PID 1234 /F

# Vagy change port in .env
# PORT=5001
```

### macOS/Linux
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

---

## ❌ Lỗi: "Cannot find module 'express'"

### Nguyên nhân
Dependencies chưa cài đặt

### Giải pháp
```bash
cd d:\DuongQuangHung (2025-2026)\HKII\QuanLyChiTieu
npm install
```

---

## ❌ Lỗi: "Cannot POST /api/auth/register"

### Nguyên nhân
- Server không chạy
- API endpoint có lỗi
- Frontend gửi sai data

### Giải pháp
```bash
# 1. Kiểm tra server chạy
npm run dev

# 2. Kiểm tra request từ Postman
# - URL phải đúng: http://localhost:5000/api/auth/register
# - Method: POST
# - Headers: Content-Type: application/json
# - Body: {"username":"...", "email":"...", "password":"..."}

# 3. Check console logs
# Terminal sẽ hiển thị error details
```

---

## ❌ Lỗi: "Invalid token" hoặc "Unauthorized"

### Nguyên nhân
- Token không gửi kèm request
- Token hết hạn
- Token sai format

### Giải pháp
```javascript
// Header phải đúng format:
Authorization: Bearer YOUR_TOKEN_HERE

// Không phải:
Authorization: YOUR_TOKEN_HERE  ❌
Token: YOUR_TOKEN_HERE          ❌
```

Lấy token mới:
1. Login tại http://localhost:5000
2. Token được lưu trong localStorage
3. Check browser DevTools → Application → LocalStorage → token

---

## ❌ Lỗi: "Insufficient balance"

### Nguyên nhân
Ví không đủ tiền để chi tiêu

### Giải pháp
1. Thêm giao dịch "Thu nhập" trước
2. Hoặc chọn loại "expense" với số tiền nhỏ hơn balance

---

## ❌ Lỗi: "Cannot delete wallet with transactions"

### Nguyên nhân
Ví có giao dịch liên quan

### Giải pháp
```
1. Xóa hết giao dịch của ví trước
2. Sau đó xóa ví
```

---

## ❌ Lỗi: Browser hiển thị "Cannot GET /"

### Nguyên nhân
- Server không serve static files
- Frontend files không ở đúng vị trí

### Giải pháp
```
Kiểm tra:
1. File index.html ở: frontend/index.html ✓
2. File dashboard.html ở: frontend/dashboard.html ✓
3. CSS files ở: frontend/css/ ✓
4. JS files ở: frontend/js/ ✓
```

```bash
# Restart server
npm run dev
```

---

## ❌ Lỗi: "CORS error" trong browser

### Message
```
Access to XMLHttpRequest has been blocked by CORS policy
```

### Giải pháp
CORS đã được enable trong server.js:
```javascript
const cors = require('cors');
app.use(cors());
```

Nếu vẫn lỗi, kiểm tra:
1. Server.js có `app.use(cors())`? ✓
2. API call URL đúng không? ✓
3. Request method đúng (GET/POST/PUT/DELETE)? ✓

---

## ❌ Lỗi: "ReferenceError: getToken is not defined"

### Nguyên nhân
JS file không load đúng thứ tự

### Giải pháp
Kiểm tra trong HTML:
```html
<!-- dashboard.html -->
<script src="/js/api.js"></script>          <!-- Phải trước -->
<script src="/js/dashboard.js"></script>    <!-- Phải sau -->
```

Thứ tự phải: api.js → auth.js → dashboard.js

---

## ❌ Lỗi: Seed script fails

### Lệnh
```bash
npm run seed
```

### Troubleshooting
```bash
# Nếu lỗi, kiểm tra:
# 1. MongoDB running?
# 2. MONGODB_URI đúng trong .env?
# 3. Đã cài dependencies? npm install
# 4. Syntax lỗi? node seed.js (xem message lỗi)
```

---

## 📋 Debug Checklist

### Server Issues
- [ ] Node.js installed? `node -v`
- [ ] npm installed? `npm -v`
- [ ] Dependencies? `npm install`
- [ ] .env file exists?
- [ ] MongoDB running?
- [ ] Port 5000 free?
- [ ] Syntax error? `node -c server.js`

### Database Issues
- [ ] MongoDB connection string is correct?
- [ ] IP whitelisted? (for Atlas)
- [ ] Database exists?
- [ ] Collections created?
- [ ] Seed ran? `npm run seed`

### Frontend Issues
- [ ] HTML files exist? index.html, dashboard.html
- [ ] CSS file exists? frontend/css/style.css
- [ ] JS files exist? api.js, auth.js, dashboard.js
- [ ] Scripts loaded in correct order?
- [ ] No console errors? (F12 → Console)

### API Issues
- [ ] Server running on http://localhost:5000?
- [ ] Headers correct? (Content-Type, Authorization)
- [ ] Request body valid? (valid JSON)
- [ ] Endpoint exists?
- [ ] Authentication token valid?

---

## 🔍 Debug Tools

### Browser DevTools
```
F12 → Console tab
- JavaScript errors
- Network requests
- LocalStorage (token)
```

### Server Console
```bash
npm run dev
# Connection logs
# Request logs
# Error messages
```

### MongoDB GUI
```
MongoDB Compass
- View collections
- View documents
- Test queries
```

### Postman
```
Test API endpoints
- Configure headers
- Set authentication
- See response
```

---

## 💬 Common Patterns

### "It works on my machine but not on server"
- Check .env configuration
- Check MongoDB connection
- Check file paths
- Check port opened on firewall

### "I updated code but changes don't show"
- Restart server: `npm run dev`
- Hard refresh browser: Ctrl+Shift+R
- Clear localStorage: F12 → Application → Clear
- Check for console errors

### "Form validation not working"
- Check express-validator installed
- Check validators.js imported in routes
- Check middleware order in server.js
- Check browser console for JS errors

---

## 📞 Need Help?

1. **Check this guide** first
2. **Search console logs** for errors
3. **Check MongoDB status** - running?
4. **Try test with Postman** - isolate issue
5. **Restart everything**:
```bash
# Kill all nodes
taskkill /F /IM node.exe

# Restart server
npm run dev
```

---

**Still stuck? Good! That's how we debug. Keep trying! 💪**
