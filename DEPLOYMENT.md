# 🚀 Deployment Guide

## Nếu muốn deploy ứng dụng lên production, hãy làm theo hướng dẫn này.

---

## Option 1: Deploy lên Heroku (Miễn phí)

### 1. Cài đặt Heroku CLI
```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2. Login Heroku
```bash
heroku login
```

### 3. Tạo ứng dụng Heroku
```bash
heroku create app-name-quanlychitieu
```

### 4. Cấu hình Environment Variables
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_url"
heroku config:set JWT_SECRET="change_this_to_secure_key"
heroku config:set NODE_ENV="production"
```

### 5. Deploy
```bash
git push heroku main
```

### 6. Check logs
```bash
heroku logs --tail
```

---

## Option 2: Deploy lên Railway (Dễ + Miễn phí)

### 1. Tạo project trên Railway
- Go to: https://railway.app
- Click "New Project"
- Select "Deploy from GitHub"

### 2. Connect GitHub
- Authorize Railway
- Select your repository

### 3. Cấu hình Environment
- Add variables từ `.env`

### 4. Deploy
- Railway tự động deploy khi push code

---

## Option 3: Deploy lên VPS (DigitalOcean, Linode, AWS EC2)

### 1. SSH vào VPS
```bash
ssh root@your_vps_ip
```

### 2. Install Node.js & MongoDB
```bash
# Update system
apt update && apt upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install MongoDB
apt install -y mongodb
systemctl start mongodb
```

### 3. Clone repository
```bash
git clone https://github.com/your-repo/quanlychitieu.git
cd quanlychitieu
npm install
```

### 4. Setup Environment
```bash
cp .env.example .env
# Edit .env with production values
nano .env
```

### 5. Setup PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name "quanlychitieu"
pm2 startup
pm2 save
```

### 6. Setup Nginx (Reverse Proxy)
```bash
apt install -y nginx

# Create nginx config
nano /etc/nginx/sites-available/quanlychitieu

# Add:
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/quanlychitieu /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 7. Setup SSL (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot certonly --nginx -d your_domain.com
```

---

## Production Checklist

Before going live:

```
[ ] Update JWT_SECRET to random string
[ ] Use MongoDB Atlas (not local)
[ ] Set NODE_ENV=production
[ ] Enable HTTPS/SSL
[ ] Setup database backups
[ ] Add error logging service (Sentry)
[ ] Setup monitoring (New Relic, PM2 Plus)
[ ] Enable rate limiting
[ ] Add request logging
[ ] Minify frontend code
[ ] Add CDN for static files
[ ] Test all features one more time
[ ] Setup uptime monitoring
[ ] Create admin user for production
[ ] Document deployment steps
```

---

## Monitoring & Logs

### With PM2
```bash
pm2 logs quanlychitieu
pm2 monit
pm2 dashboard
```

### With Heroku
```bash
heroku logs --tail
```

### With Railway
- Dashboard: https://railway.app/dashboard

---

## Backup & Recovery

### MongoDB Backup
```bash
mongodump --uri="mongodb+srv://..." --out=./backup

# Restore
mongorestore --uri="mongodb+srv://..." ./backup
```

### Application Backup
```bash
# Create backup script
tar -czf backup-$(date +%Y%m%d).tar.gz /path/to/app

# Upload to cloud storage (S3, Google Cloud)
```

---

## Performance Tips

1. **Enable gzip compression**
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add caching headers**
```javascript
app.use(express.static('frontend', {
  maxAge: '1d'
}));
```

3. **Use database indexes**
```javascript
// Add to models if not automated
db.collection.createIndex({ user: 1, date: -1 });
```

4. **Implement pagination**
- Already done in transactions API

5. **Use CDN for static assets**
- CloudFlare, AWS CloudFront

---

## Troubleshooting

### App crashes on startup
```bash
pm2 logs quanlychitieu --err
```

### Port already in use
```bash
lsof -i :5000
kill -9 <PID>
```

### MongoDB connection failed
```bash
# Check connection string
# Verify IP whitelist in MongoDB Atlas
# Test: mongosh "mongodb+srv://..."
```

### CORS issues
```bash
# Already enabled in server.js:
const cors = require('cors');
app.use(cors());

# For specific domain:
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

**Good luck with deployment! 🚀**
