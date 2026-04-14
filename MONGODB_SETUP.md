# 📦 Hướng Dẫn Cài Đặt MongoDB

## 2 Cách Cài Đặt MongoDB

---

## Option 1: MongoDB Local (Trên máy của bạn)

### Windows

#### Bước 1: Download MongoDB
- Truy cập: https://www.mongodb.com/try/download/community
- Chọn phiên bản Windows
- Download MSI installer

#### Bước 2: Cài đặt
- Double-click file `.msi`
- Click "Next" → "I agree" → "Next"
- Chọn tất cả components
- Click "Install"
- Đợi hoàn thành

#### Bước 3: Verify Installation
```bash
mongod --version
mongosh --version
```

#### Bước 4: Start MongoDB
```bash
# Automatic (installed as service)
net start MongoDB

# Or manual
mongod
```

**Kiểm tra:**
```bash
mongosh
# Bạn cần nhìn thấy prompt ">"
# Type: exit để thoát
```

### macOS

#### Bước 1: Install via Homebrew
```bash
brew tap mongodb/brew
brew install mongodb-community
```

#### Bước 2: Start MongoDB
```bash
brew services start mongodb-community
```

**Kiểm tra:**
```bash
mongosh
```

### Linux (Ubuntu/Debian)

```bash
# Import GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add repository
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod

# Verify
mongosh
```

---

## Option 2: MongoDB Atlas (Cloud - Recommended)

### Bước 1: Tạo Account
1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up Free"
3. Nhập email, password
4. Verify email

### Bước 2: Tạo Project
1. Click "New Project"
2. Nhập tên project: `QuanLyChiTieu`
3. Click "Create Project"

### Bước 3: Tạo Cluster
1. Click "Build a Database"
2. Chọn "FREE" tier (M0)
3. Chọn provider: AWS
4. Chọn region: gần bạn nhất
5. Click "Create Cluster"
6. Đợi 5-10 phút

### Bước 4: Tạo Database User
1. Click "Security" → "Database Access"
2. Click "Add New Database User"
3. Nhập username: `admin`
4. Nhập password: (copy để lưu lại)
5. Click "Add User"

### Bước 5: Whitelist IP
1. Click "Security" → "Network Access"
2. Click "Add IP Address"
3. Nhập IP của bạn hoặc `0.0.0.0/0` (cho development)
4. Click "Confirm"

### Bước 6: Lấy Connection String
1. Click "Clusters" → "Connect"
2. Chọn "MongoShell"
3. Copy connection string
4. Format: `mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/quanlychitieu`

### Bước 7: Cập nhật .env
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/quanlychitieu
```

**Replace:**
- `YOUR_PASSWORD` - mật khẩu user
- `cluster0.xxxxx` - cluster name

---

## Kiểm Tra Connection

### Cách 1: Via MongoDB Shell
```bash
mongosh "mongodb://localhost:27017/quanlychitieu"

# Hoặc với Atlas:
mongosh "mongodb+srv://admin:password@cluster.mongodb.net/quanlychitieu"
```

### Cách 2: Via Node.js
```bash
node
```

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quanlychitieu')
  .then(() => console.log('✓ Connected!'))
  .catch(err => console.log('✗ Failed:', err.message));
```

### Cách 3: Via MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/try/download/compass
2. Install & open
3. Click "New Connection"
4. Nhập URI
5. Click "Connect"

---

## Basics Commands

```bash
# Start MongoDB
mongosh

# List databases
show databases

# Use database
use quanlychitieu

# List collections
show collections

# View documents
db.users.find()
db.wallets.find()
db.transactions.find()

# Count documents
db.users.countDocuments()

# Exit
exit
```

---

## Troubleshooting MongoDB

### "mongod: command not found"
```bash
# Add to PATH or reinstall
# macOS: brew install mongodb-community
# Windows: Reinstall with MongoDB setup

# Or use full path
/usr/local/bin/mongod
```

### "Connection refused" on localhost:27017
```bash
# MongoDB not running, start it:

# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### "Connection failed" on Atlas
```
Kiểm tra:
1. Connection string đúng?
2. Username & password đúng?
3. IP Whitelisted?
4. Network access cho phép?
```

### "Cannot create database"
```bash
# MongoDB sẽ tự tạo database khi bạn:
# 1. Insert document
# 2. Create collection
# Không cần CREATE DATABASE
```

---

## Backup & Restore

### Backup Local Database
```bash
mongodump --db quanlychitieu --out ./backup

# Result: ./backup/quanlychitieu/
```

### Restore
```bash
mongorestore --db quanlychitieu ./backup/quanlychitieu/
```

### Backup Atlas
1. Go to Atlas Dashboard
2. Click "Backup" tab
3. Click "Backup Now"
4. Download backup file

---

## Best Practices

✅ **Do:**
- Start MongoDB before running app
- Use MongoDB Atlas for production
- Backup regularly
- Set strong passwords
- Whitelist only necessary IPs

❌ **Don't:**
- Use default/simple passwords
- Expose MongoDB to internet
- Store credentials in code
- Run outdated MongoDB versions
- Skip backups

---

## Resources

- Official: https://docs.mongodb.com/
- Atlas Docs: https://docs.atlas.mongodb.com/
- Mongosh: https://www.mongodb.com/docs/mongodb-shell/
- Compass: https://www.mongodb.com/products/compass

---

**Bây giờ bạn sẵn sàng để chạy ứng dụng! 🚀**
