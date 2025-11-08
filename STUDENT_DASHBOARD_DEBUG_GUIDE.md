# Student Dashboard Debug Guide

## Problem: Empty Reports, Badges, Achievements, and Leaderboard

### Quick Fix Options:

#### **Option 1: Generate Fresh Data (Recommended)**
1. Open http://localhost:8000/student-dashboard.html
2. Press **F12** to open Developer Console
3. Type: `quickGenerate()` and press Enter
4. Page will reload with fresh data
5. Check the Reports section - all tables should now have data

#### **Option 2: Check Console for Errors**
1. Open http://localhost:8000/student-dashboard.html
2. Press **F12** → Go to **Console** tab
3. Look for these debug messages:
   ```
   🔧 Checking reports for studentId field...
   📚 Total reports in storage: X
   📚 Student reports found: X for student ID: XXXXX
   📊 Total reports in storage: X
   📊 Student reports found: X
   📈 Total reports in storage: X
   📈 Student reports found: X
   ```

### What Each Message Means:

✅ **Good Signs:**
- `Total reports in storage: 7` (or more)
- `Student reports found: 7 for student ID: XXXXX`
- `✅ Updated X reports with studentId`

❌ **Problem Signs:**
- `Total reports in storage: 0` → No data generated
- `Student reports found: 0` → studentId mismatch
- `⚠️ Could not find student for code: XXXX` → Data corruption

### Solutions Based on Console Output:

#### If you see "Total reports: 0"
**Problem:** No data has been generated
**Solution:** Run `quickGenerate()` in console

#### If you see "Student reports found: 0" but "Total reports: 7"
**Problem:** Reports exist but don't match your student ID
**Solutions:**
1. Run `fixOldReports()` in console, then reload
2. Or run `quickGenerate()` to start fresh

#### If sections show "Generate Demo Data" buttons
**Solution:** Click the button or run `quickGenerate()` in console

### Manual Data Check:

Open Console and run these commands to inspect data:

```javascript
// Check current student
JSON.parse(localStorage.getItem('brainwave_current_student_id'))

// Check if student exists
JSON.parse(localStorage.getItem('brainwave_users'))

// Check reports
JSON.parse(localStorage.getItem('brainwave_reports'))

// Check first report's studentId
JSON.parse(localStorage.getItem('brainwave_reports'))[0]?.studentId

// Compare with current student ID
const currentId = localStorage.getItem('brainwave_current_student_id');
const reports = JSON.parse(localStorage.getItem('brainwave_reports'));
const studentReports = reports.filter(r => r.studentId == currentId);
console.log('Matching reports:', studentReports.length);
```

### Complete Reset:

If nothing works, reset everything:

```javascript
localStorage.clear()
location.reload()
```

Then log in again and data will be auto-generated.

### Expected Result After Fix:

When you go to **Reports** section, you should see:

1. **Detailed Academic Report**
   - Table with subjects: Mathematics, Physics, Chemistry, Biology, English
   - Average score and grade

2. **Achievements**
   - Table showing Performance Badge, Attendance Badge, Subject Excellence
   - Total Badges count

3. **Badges**
   - Same as Achievements (uses same data)

4. **Leaderboard Position**
   - Your rank (e.g., #5)
   - Your average score
   - Medal badge based on rank

All data is calculated from your reports - no static mock data!



