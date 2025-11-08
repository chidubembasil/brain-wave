# 🔧 Fix: Subjects Not Showing in Student Dashboard

## Quick Diagnosis Tool

**Open this file to debug:** `debug-student-subjects.html`

This page will show you:
- ✅ Current student info (class level & stream)
- ✅ All subjects in localStorage
- ✅ Which subjects match the student
- ✅ Why subjects are/aren't visible
- 🔄 Auto-refreshes every 3 seconds

## Common Issues & Solutions

### Issue 1: Student has no class level or stream
**Symptoms:**
- Student dashboard shows "No subjects available"
- Debug page shows "NOT SET" for class level or stream

**Solution:**
1. Open student dashboard
2. Click avatar (top-right)
3. Click "Edit Profile"
4. Set Class Level (SS1/SS2/SS3/Jambite)
5. Set Stream (Science/Arts/Commercial)
6. Click "Save Changes"

### Issue 2: No subjects in localStorage
**Symptoms:**
- Debug page shows "No subjects in localStorage"
- Admin dashboard has subjects but they're not saved

**Solution:**
1. Open `admin-dashboard.html`
2. Go to Subject Management
3. Click "Add Subject" button
4. Fill in the form:
   - Subject Name: e.g., "Mathematics"
   - Description: Brief description
   - Stream: Select stream
   - Class Levels: e.g., "SS1,SS2,SS3" (comma-separated)
   - Icon: e.g., "fa-calculator" (optional)
5. Click "Add Subject"
6. Check `debug-student-subjects.html` - subject should appear

### Issue 3: Subject exists but doesn't match student
**Symptoms:**
- Debug page shows subjects but "Match?" column says "NO"
- Reason shows mismatch

**Solution A - Fix Subject:**
1. Subject has wrong class level or stream
2. Delete and recreate with correct values
3. OR add another entry for the student's level/stream

**Solution B - Fix Student:**
1. Student has wrong class level or stream
2. Edit student profile to match available subjects

### Issue 4: Data structure mismatch
**Symptoms:**
- Subjects have `classes` field instead of `classLevel`
- Debug shows subjects but filtering fails

**Solution:**
1. Clear old subjects: Open browser console (F12)
2. Run: `localStorage.removeItem('brainwave_subjects')`
3. Go to admin dashboard
4. Re-add subjects using the "Add Subject" button
5. New subjects will have correct structure

## Step-by-Step Testing

### Step 1: Check Student Profile
```
1. Open: debug-student-subjects.html
2. Look at "Current Student Info" section
3. Verify:
   ✅ Class Level is set (not "NOT SET")
   ✅ Stream is set (not "NOT SET")
```

### Step 2: Check Subjects Exist
```
1. Look at "Subjects in localStorage" section
2. Verify:
   ✅ At least one subject exists
   ✅ Subjects have "classLevel" field (not "classes")
   ✅ Subjects have "stream" field
```

### Step 3: Check Matching
```
1. Look at "Match?" column in subjects table
2. For each subject, check:
   ✅ Class Level matches student OR is "All Levels"
   ✅ Stream matches student OR is "General/All Streams/Multi-Stream"
```

### Step 4: Verify Filtered Results
```
1. Look at "Filtered Subjects" section
2. Verify:
   ✅ At least one subject appears
   ✅ "Why Visible?" column explains the match
```

## Manual Fix: Add Test Subject

If nothing works, manually add a test subject:

1. Open browser console (F12)
2. Paste this code:

```javascript
// Get current subjects
let subjects = JSON.parse(localStorage.getItem('brainwave_subjects') || '[]');

// Add test subject for SS2 Science
subjects.push({
    id: Date.now(),
    name: "Test Mathematics",
    description: "Test subject for debugging",
    classLevel: "SS2",
    stream: "Science",
    icon: "fa-calculator",
    createdAt: new Date().toISOString()
});

// Save back
localStorage.setItem('brainwave_subjects', JSON.stringify(subjects));

// Reload page
location.reload();
```

3. This adds a subject for SS2 Science students
4. Modify `classLevel` and `stream` to match your student

## Correct Data Structure

### ✅ CORRECT (What student dashboard expects):
```javascript
{
  id: 1234567890,
  name: "Mathematics",
  description: "Study of numbers",
  classLevel: "SS2",        // Singular, specific class
  stream: "Science",         // Specific stream
  icon: "fa-calculator",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### ❌ WRONG (Old format):
```javascript
{
  id: 1234567890,
  name: "Mathematics",
  classes: "SS1,SS2,SS3",   // ❌ Wrong field name
  stream: "Science",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

## Filtering Rules

### Class Level Matching:
```
Student: SS2
Will see subjects with:
✅ classLevel: "SS2"
✅ classLevel: "All Levels"
❌ classLevel: "SS1"
❌ classLevel: "SS3"
```

### Stream Matching:
```
Student: Science
Will see subjects with:
✅ stream: "Science"
✅ stream: "General"
✅ stream: "All Streams"
✅ stream: "Multi-Stream"
❌ stream: "Arts"
❌ stream: "Commercial"
```

## Quick Checklist

- [ ] Open `debug-student-subjects.html`
- [ ] Student has class level set
- [ ] Student has stream set
- [ ] At least one subject exists in localStorage
- [ ] Subject has `classLevel` field (not `classes`)
- [ ] Subject's classLevel matches student OR is "All Levels"
- [ ] Subject's stream matches student OR is universal
- [ ] Filtered subjects section shows at least one subject
- [ ] Refresh student dashboard - subjects should appear

## Still Not Working?

1. **Clear everything and start fresh:**
```javascript
// In browser console (F12)
localStorage.removeItem('brainwave_subjects');
localStorage.removeItem('brainwave_current_student_id');
```

2. **Sign up as new student:**
   - Go to `signup.html`
   - Create account with SS2 Science

3. **Add matching subject in admin:**
   - Go to admin dashboard
   - Add subject: SS2, Science

4. **Check debug page:**
   - Should show match

## Files to Use

1. **`debug-student-subjects.html`** - Main debugging tool
2. **`test-subject-sync.html`** - Test admin → student sync
3. **`student-dashboard.html`** - Actual student dashboard
4. **`admin-dashboard.html`** - Add subjects here

---

**Last Updated:** January 2025  
**Status:** Debugging tools ready
