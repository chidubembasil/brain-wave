# Quick Fix Guide - Student Dashboard Mock Data

## Issue
Mock data (including badges, achievements, leaderboard) is not showing in the student dashboard.

## Solution - Follow These Steps:

### **Step 1: Clear All Old Data**
Open browser console (F12) and run:
```javascript
localStorage.clear()
```

### **Step 2: Use Test Page to Generate Fresh Data**
1. Open `test-student-dashboard.html` in your browser
2. Click the **"🚀 Generate Data & Login"** button
3. Wait for the success message
4. You'll be automatically redirected to the dashboard

### **Step 3: Verify Data in Dashboard**
Navigate through all sections:
- ✅ Dashboard (stats should show numbers)
- ✅ My Subjects (7 subjects)
- ✅ Live Classes (2 classes)
- ✅ Quizzes & Assignments (3 items)
- ✅ Mock Exams (2 exams)
- ✅ Study Materials (9 items: 4 books + 5 videos)
- ✅ Reports (spreadsheet with scores)
- ✅ Announcements (4 announcements)
- ✅ **Achievements** (5 unlocked achievements) 🆕
- ✅ **Badges** (6 badges: 3 unlocked, 3 in progress) 🆕
- ✅ **Leaderboard** (10 students ranked) 🆕
- ✅ Community (WhatsApp & Telegram links)

## Alternative Method - Direct Dashboard

If you want to open the dashboard directly:

1. **Clear localStorage:**
   ```javascript
   localStorage.clear()
   ```

2. **Open** `student-dashboard.html`

3. **Mock data will auto-generate** on first load

4. **Check console** for generation logs:
   ```
   🎲 First time load - generating mock data...
   ✅ Created 7 subjects
   ✅ Created 2 live classes
   ...
   ✅ Created 5 achievements
   ✅ Created 6 badges
   ✅ Created leaderboard with 10 students
   ```

## Debug Tool

Use `test-reports-debug.html` to check data status:
1. Open the file
2. Click **"🔍 Check All Data"**
3. View the status and data summary
4. If issues found, click **"🔄 Regenerate Mock Data"**

## Expected Console Output

When everything works correctly, you should see:
```
🎓 BrainWave Student Dashboard Loading...
🎲 First time load - generating mock data...
✅ Sample student created: John Doe
✅ Created 7 subjects
✅ Created 2 live classes
✅ Created 3 quizzes/assignments
✅ Created 2 mock exams
✅ Created 4 eBooks
✅ Created 5 video tutorials
✅ Created 7 reports
✅ Created 4 announcements
✅ Created 5 achievements
✅ Created 6 badges
✅ Created leaderboard with 10 students
✅ Created community links
🎉 Mock data generation complete!
✅ Mock data generated for: John Doe Code: BWXXXXXX
🔐 Checking authentication...
✅ Student authenticated: {name: "John Doe", ...}
✅ Dashboard initialized successfully
```

## Common Issues & Solutions

### Issue: "No data showing"
**Solution:** Clear localStorage and regenerate
```javascript
localStorage.clear()
```
Then reload the page.

### Issue: "Some sections empty"
**Solution:** Check if mock_data_generated flag is set
```javascript
console.log(localStorage.getItem('brainwave_mock_data_generated'))
```
If it returns `null`, data wasn't generated. Clear and reload.

### Issue: "Student not authenticated"
**Solution:** Ensure student ID is set
```javascript
console.log(localStorage.getItem('brainwave_current_student_id'))
```
If `null`, use test page to generate fresh data.

## Data Storage Keys

All mock data is stored in localStorage with these keys:
- `brainwave_users` - Student account
- `brainwave_current_student_id` - Active student ID
- `brainwave_subjects` - 7 subjects
- `brainwave_live_classes` - 2 live classes
- `brainwave_quizs` - 3 quizzes/assignments
- `brainwave_mocks` - 2 mock exams
- `brainwave_books` - 4 eBooks
- `brainwave_videos` - 5 video tutorials
- `brainwave_reports` - 7 student reports
- `brainwave_announcements` - 4 announcements
- `brainwave_achievements` - 5 achievements 🆕
- `brainwave_badges` - 6 badges 🆕
- `brainwave_leaderboard` - 10 students 🆕
- `brainwave_community_links` - Community links
- `brainwave_mock_data_generated` - Generation flag

## Quick Test Commands

Run these in browser console to verify data:

```javascript
// Check if data generated
console.log('Generated:', localStorage.getItem('brainwave_mock_data_generated'))

// Check student
const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]')
console.log('Users:', users.length, users)

// Check achievements
const achievements = JSON.parse(localStorage.getItem('brainwave_achievements') || '[]')
console.log('Achievements:', achievements.length)

// Check badges
const badges = JSON.parse(localStorage.getItem('brainwave_badges') || '[]')
console.log('Badges:', badges.length)

// Check leaderboard
const leaderboard = JSON.parse(localStorage.getItem('brainwave_leaderboard') || '[]')
console.log('Leaderboard:', leaderboard.length)
```

## Success Criteria

✅ All sections load without errors
✅ Dashboard stats show correct numbers
✅ 5 achievements displayed
✅ 6 badges displayed (3 unlocked, 3 locked)
✅ Leaderboard shows 10 students with current user highlighted
✅ No console errors
✅ Navigation works smoothly

If all criteria met, the dashboard is working perfectly! 🎉
