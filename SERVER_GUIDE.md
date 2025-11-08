# 🚀 Server Setup Guide

## Quick Start Options

### Option 1: Using the Batch File (Recommended)
```bash
# Double-click or run:
start-server.bat
```
This will automatically:
- Start the http-server on port 8000
- Open the admin dashboard in your browser
- Display server information

### Option 2: Using npx directly
```bash
npx http-server -p 8000 -o admin-dashboard.html
```

### Option 3: Using Node.js http-server (if installed globally)
```bash
http-server -p 8000 -o
```

### Option 4: Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 5: Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click on `admin-dashboard.html`
3. Select "Open with Live Server"

### Option 6: Direct File Access (No Server)
```bash
# Open directly in browser
start chrome "file:///c:/Users/PC/Documents/Brainwave  trae/admin-dashboard.html"
```
**Note**: Some features may not work without a server due to CORS restrictions.

---

## 🌐 Server URLs

Once the server is running, access these URLs:

| Page | URL |
|------|-----|
| **Admin Dashboard** | http://localhost:8000/admin-dashboard.html |
| **Test Page** | http://localhost:8000/test-assessment-buttons.html |
| **Home Page** | http://localhost:8000/index.html |
| **Login** | http://localhost:8000/login.html |
| **Signup** | http://localhost:8000/signup.html |

---

## ✅ Verify Server is Running

1. Open browser and go to: http://localhost:8000
2. You should see a directory listing or the index page
3. Click on `admin-dashboard.html` to access the dashboard

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 🔧 Troubleshooting

### Port Already in Use
If port 8000 is already in use, try a different port:
```bash
npx http-server -p 8080
```

### npx Not Found
Install Node.js from: https://nodejs.org/

### Permission Denied
Run terminal as Administrator

### Browser Not Opening
Manually navigate to: http://localhost:8000/admin-dashboard.html

---

## 📝 Current Status

✅ **Server batch file created**: `start-server.bat`  
✅ **Admin dashboard ready**: `admin-dashboard.html`  
✅ **Test page ready**: `test-assessment-buttons.html`  
✅ **All assessment buttons functional**  

---

## 🎯 Quick Test

1. Start server using any method above
2. Open http://localhost:8000/admin-dashboard.html
3. Navigate to "Assessment Management"
4. Click "Create Quiz", "Create Assignment", or "Create Mock Exam"
5. Test the functionality!

---

## 💡 Pro Tip

For the best experience, use **Option 1** (start-server.bat) or **Option 5** (VS Code Live Server).
