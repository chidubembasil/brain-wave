# Mobile Preview Guide - Student Dashboard

## Server Status
✅ **Server is running on port 8000**

## How to Preview on Your Mobile Device

### Step 1: Ensure Both Devices Are on the Same Network
- Your computer and mobile device must be connected to the same Wi-Fi network
- Current Network: **Wi-Fi**
- Computer IP Address: **10.130.255.121**

### Step 2: Access the Student Dashboard on Mobile

Open your mobile browser and navigate to one of these URLs:

#### **Student Dashboard (Direct Access)**
```
http://10.130.255.121:8000/student-dashboard.html
```

#### **Student Login Page**
```
http://10.130.255.121:8000/student-login.html
```

#### **Homepage**
```
http://10.130.255.121:8000/
```

### Step 3: Test Login (If Needed)

If you need to log in to view the dashboard:
- Use any test credentials you've created during signup
- Or create a new account through the signup page

### Available Pages to Test on Mobile

1. **Homepage**: `http://10.130.255.121:8000/`
2. **Student Dashboard**: `http://10.130.255.121:8000/student-dashboard.html`
3. **Student Login**: `http://10.130.255.121:8000/student-login.html`
4. **Signup**: `http://10.130.255.121:8000/signup.html`
5. **Pricing**: `http://10.130.255.121:8000/pricing.html`
6. **Features**: `http://10.130.255.121:8000/features.html`

### Mobile Responsive Features to Test

The student dashboard includes:
- ✅ Responsive sidebar (collapses on mobile)
- ✅ Mobile-friendly navigation
- ✅ Touch-optimized buttons and cards
- ✅ Adaptive grid layouts
- ✅ Mobile menu toggle

### Troubleshooting

**If the page doesn't load:**
1. Verify both devices are on the same Wi-Fi network
2. Check if Windows Firewall is blocking port 8000
3. Try accessing `http://localhost:8000/student-dashboard.html` on your computer first
4. Restart the server if needed

**To restart the server:**
- Press `Ctrl+C` in the terminal running the server
- Run: `node server.js` again

### Testing Tips

1. **Test in Portrait and Landscape modes**
2. **Check touch interactions** (buttons, dropdowns, modals)
3. **Test navigation** (sidebar toggle, menu items)
4. **Verify readability** (font sizes, spacing)
5. **Check scrolling** (smooth scrolling, no horizontal overflow)

### Browser Compatibility

Test on multiple mobile browsers:
- Chrome (Android/iOS)
- Safari (iOS)
- Firefox (Android)
- Edge (Android)

---

## Quick Access QR Code

You can also generate a QR code for easy access:
- Visit: https://www.qr-code-generator.com/
- Enter: `http://10.130.255.121:8000/student-dashboard.html`
- Scan with your mobile device

---

**Server Command**: `node server.js`
**Server Port**: 8000
**Local IP**: 10.130.255.121
