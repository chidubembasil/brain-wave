# 🚀 Quick Start - Testing Student Dashboard

## 3 Simple Steps

### Step 1: Generate Mock Data
Open `generate-mock-data.html` in your browser and click **"Generate Mock Data"**

### Step 2: Open Dashboard
Click **"Open Student Dashboard"** or manually open `student-dashboard.html`

### Step 3: Test Features
Navigate through all sections and test functionality

---

## Login Credentials (Mock Student)
- **Email:** john.doe@student.com
- **Name:** John Doe
- **Class:** SS2 Science
- **Student Code:** Auto-generated (visible in top bar)

---

## What You'll See

| Section | Items | What to Test |
|---------|-------|--------------|
| **Dashboard** | Overview | Stats cards, live class, announcements |
| **My Subjects** | 7 subjects | Mathematics, Physics, Chemistry, Biology, etc. |
| **Live Classes** | 2 classes | 1 LIVE NOW, 1 Scheduled |
| **Quizzes** | 3 items | Different types, due dates, marks |
| **Mock Exams** | 2 exams | WAEC & JAMB practice tests |
| **Study Materials** | 9 items | 4 eBooks + 5 Videos (with filters) |
| **Reports** | 4 reports | Completed assessments with scores |
| **Announcements** | 4 items | Recent platform updates |
| **Community** | 2 links | WhatsApp & Telegram groups |

---

## Quick Console Commands

Open browser console (F12) and run:

```javascript
// Generate all mock data
generateMockData();

// Clear all mock data
clearMockData();

// Check current student
console.log(currentStudent);

// View all subjects
console.log(JSON.parse(localStorage.getItem('brainwave_subjects')));

// View all study materials
console.log('Books:', JSON.parse(localStorage.getItem('brainwave_books')));
console.log('Videos:', JSON.parse(localStorage.getItem('brainwave_videos')));
```

---

## Testing Checklist

### ✅ Basic Navigation
- [ ] Sidebar navigation works
- [ ] Page titles update correctly
- [ ] Mobile menu (hamburger) works
- [ ] Sections switch properly

### ✅ Dashboard Stats
- [ ] Shows 7 subjects
- [ ] Shows 3 pending tasks
- [ ] Shows 9 study materials
- [ ] Numbers are accurate

### ✅ Live Features
- [ ] Live class shows pulsing indicator
- [ ] Join button opens link
- [ ] Scheduled classes show correctly
- [ ] Teacher names display

### ✅ Study Materials
- [ ] Filter tabs work (All/Books/Videos)
- [ ] YouTube thumbnails load
- [ ] Download/Watch buttons work
- [ ] Descriptions show correctly

### ✅ Reports
- [ ] Table displays all 4 reports
- [ ] Scores are color-coded
- [ ] Pass/Fail status correct
- [ ] Student code matches

### ✅ Profile
- [ ] Student name in dropdown
- [ ] Email displays
- [ ] Student code badge visible
- [ ] Edit profile works
- [ ] Logout works

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| No data showing | Refresh page (F5) |
| "No student logged in" | Generate mock data first |
| Old data persists | Clear data then regenerate |
| Thumbnails not loading | Check internet connection |
| Console errors | Clear browser cache |

---

## Files You Need

1. **generate-mock-data.html** - Data generator interface
2. **student-dashboard.html** - Main dashboard
3. **student-dashboard.js** - Dashboard logic
4. **MOCK_DATA_GUIDE.md** - Detailed documentation

---

## After Testing

**Don't forget to clear mock data:**
1. Open `generate-mock-data.html`
2. Click **"Clear All Data"**
3. Confirm deletion

Or use console: `clearMockData();`

---

## Need Help?

- 📖 Read **MOCK_DATA_GUIDE.md** for detailed info
- 🔍 Check browser console for errors
- 🧹 Try clearing and regenerating data
- 💾 Verify localStorage is enabled

---

**Happy Testing! 🎉**
