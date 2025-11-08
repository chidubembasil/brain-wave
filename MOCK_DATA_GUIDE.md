# 🎲 Mock Data Generator Guide

## Overview
The Mock Data Generator is a testing tool that populates the Student Dashboard with realistic sample data, allowing you to test all features without manually creating content.

## Quick Start

### Method 1: Using the Web Interface (Recommended)
1. Open `generate-mock-data.html` in your browser
2. Click **"Generate Mock Data"** button
3. Open the Student Dashboard to see the populated data
4. Use **"Clear All Data"** to remove mock data when done

### Method 2: Using Browser Console
1. Open `student-dashboard.html` in your browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run: `generateMockData()`
5. Refresh the page to see the data

### Method 3: Auto-generate on Load
1. Open `student-dashboard.js`
2. Find line 1368: `// generateMockData();`
3. Uncomment it: `generateMockData();`
4. Save and reload the dashboard
5. **Remember to comment it back after testing!**

## What Gets Generated?

### 📚 Student Account
- **Name:** John Doe
- **Email:** john.doe@student.com
- **Class:** SS2
- **Stream:** Science
- **Student Code:** Randomly generated (e.g., BWXYZ123)
- **Plan:** Premium
- **Status:** Active

### 📖 Subjects (7 items)
- Mathematics
- Physics
- Chemistry
- Biology
- English Language
- Further Mathematics
- Computer Science

### 🎥 Live Classes (2 items)
1. **Mathematics** - Dr. Sarah Johnson (LIVE NOW)
2. **Physics** - Prof. Michael Chen (Scheduled for tomorrow)

### 📝 Quizzes & Assignments (3 items)
1. Quadratic Equations Quiz (30 mins, 50 marks)
2. Newton's Laws Assignment (45 mins, 100 marks)
3. Chemical Bonding Quiz (25 mins, 40 marks)

### 📄 Mock Exams (2 items)
1. WAEC Mathematics Mock Exam (120 mins, 100 marks)
2. JAMB Physics Practice Test (90 mins, 100 marks)

### 📚 eBooks (4 items)
1. Advanced Mathematics for SS2
2. Physics Fundamentals
3. Chemistry Made Easy
4. Biology Essentials

### 🎬 Video Tutorials (5 items)
1. Introduction to Calculus
2. Understanding Newton's Laws
3. Chemical Reactions Explained
4. Cell Structure and Function
5. Trigonometry Basics

### 📊 Student Reports (4 items)
- Algebra Quiz: 42/50 (Passed)
- Motion and Forces Test: 35/40 (Passed)
- Organic Chemistry Assignment: 75/100 (Passed)
- WAEC Mock Exam: 68/100 (Passed)

### 📢 Announcements (4 items)
1. Welcome to BrainWave!
2. New Mock Exams Available
3. Live Class Schedule Update
4. Study Tips for Success

### 👥 Community Links
- WhatsApp Group (Enabled)
- Telegram Channel (Enabled)

## Testing Workflow

### Complete Feature Testing
```
1. Generate Mock Data
   ↓
2. Open Student Dashboard
   ↓
3. Test Each Section:
   - Dashboard (stats, live classes, announcements)
   - My Subjects (7 subjects displayed)
   - Live Classes (1 live, 1 scheduled)
   - Quizzes & Assignments (3 items)
   - Mock Exams (2 items)
   - Study Materials (9 items - filter by All/Books/Videos)
   - Reports (4 completed assessments)
   - Announcements (4 items)
   - Community (2 links)
   ↓
4. Test Profile Features:
   - Edit Profile
   - View Student Code
   - Logout
   ↓
5. Clear Mock Data (when done)
```

## Dashboard Features to Test

### ✅ Dashboard Section
- [ ] Stats cards show correct counts
- [ ] Live class card appears (green, pulsing)
- [ ] Recent announcements display (3 items)
- [ ] Navigation works smoothly

### ✅ My Subjects Section
- [ ] 7 subjects display with correct icons
- [ ] Stream and class level shown
- [ ] Cards are clickable and hover effects work

### ✅ Live Classes Section
- [ ] Live class shows "LIVE NOW" indicator
- [ ] Scheduled class shows "SCHEDULED" status
- [ ] Join button works for live classes
- [ ] Scheduled classes have disabled button

### ✅ Quizzes & Assignments
- [ ] 3 items display with different types
- [ ] Due dates, duration, and marks shown
- [ ] Color-coded by type (quiz/assignment)
- [ ] Start buttons are functional

### ✅ Mock Exams
- [ ] 2 mock exams display
- [ ] Longer duration shown (90-120 mins)
- [ ] Red border color for mock type
- [ ] Start buttons work

### ✅ Study Materials
- [ ] All tab shows 9 items (4 books + 5 videos)
- [ ] eBooks tab shows 4 items
- [ ] Videos tab shows 5 items
- [ ] YouTube thumbnails load correctly
- [ ] Download/Watch buttons work

### ✅ Reports Section
- [ ] Table displays 4 completed assessments
- [ ] Scores are color-coded (excellent/good/average/poor)
- [ ] Pass/Fail status shown
- [ ] Dates formatted correctly

### ✅ Announcements
- [ ] 4 announcements display
- [ ] Sorted by date (newest first)
- [ ] Class level filtering works
- [ ] Icons and styling correct

### ✅ Community Section
- [ ] WhatsApp link displays
- [ ] Telegram link displays
- [ ] Icons and colors correct
- [ ] Links open in new tab

### ✅ Profile Features
- [ ] Student name displays in dropdown
- [ ] Email shows correctly
- [ ] Student code badge visible
- [ ] Avatar shows initials
- [ ] Edit profile modal works
- [ ] Profile updates save correctly

## Data Structure Reference

### Student Object
```javascript
{
    id: 1234567890,
    name: 'John Doe',
    email: 'john.doe@student.com',
    phone: '+234 800 000 0000',
    role: 'student',
    classLevel: 'SS2',
    stream: 'Science',
    studentCode: 'BWXYZ123',
    plan: 'premium',
    status: 'active',
    locked: false,
    joinDate: '2025-10-05',
    bootcampStartDate: '2025-10-05T19:30:14.000Z',
    planHistory: [],
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Subject Object
```javascript
{
    id: 1,
    name: 'Mathematics',
    stream: 'Science',
    classLevel: 'SS2',
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Live Class Object
```javascript
{
    id: 1,
    subject: 'Mathematics',
    teacher: 'Dr. Sarah Johnson',
    classLevel: 'SS2',
    stream: 'Science',
    date: '2025-10-05T19:30:14.000Z',
    time: '10:00 AM',
    status: 'live', // or 'scheduled'
    link: 'https://meet.google.com/sample-link-1',
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Assessment Object (Quiz/Assignment/Mock)
```javascript
{
    id: 1,
    type: 'quiz', // or 'assignment', 'mock'
    title: 'Quadratic Equations Quiz',
    subject: 'Mathematics',
    classLevel: 'SS2',
    stream: 'Science',
    dueDate: '2025-10-12T19:30:14.000Z',
    duration: '30',
    totalMarks: 50,
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Book Object
```javascript
{
    id: 1,
    title: 'Advanced Mathematics for SS2',
    subject: 'Mathematics',
    classLevel: 'SS2',
    stream: 'Science',
    description: 'Comprehensive mathematics textbook...',
    link: 'https://drive.google.com/file/sample-math-book',
    thumbnail: 'https://via.placeholder.com/300x400/...',
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Video Object
```javascript
{
    id: 1,
    title: 'Introduction to Calculus',
    subject: 'Mathematics',
    classLevel: 'SS2',
    stream: 'Science',
    description: 'Learn the basics of differentiation...',
    link: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
    createdAt: '2025-10-05T19:30:14.000Z'
}
```

### Report Object
```javascript
{
    id: 1,
    studentCode: 'BWXYZ123',
    studentName: 'John Doe',
    assessmentTitle: 'Algebra Quiz',
    subject: 'Mathematics',
    type: 'quiz',
    score: 42,
    totalMarks: 50,
    date: '2025-09-28T19:30:14.000Z',
    passed: true
}
```

### Announcement Object
```javascript
{
    id: 1,
    title: 'Welcome to BrainWave!',
    message: 'We are excited to have you join...',
    classLevel: 'All Levels', // or 'SS2', 'SS1', etc.
    createdAt: '2025-09-25T19:30:14.000Z'
}
```

## LocalStorage Keys

The mock data is stored in these localStorage keys:
- `brainwave_users` - User accounts
- `brainwave_current_student_id` - Currently logged in student
- `brainwave_subjects` - Subject list
- `brainwave_live_classes` - Live classes
- `brainwave_quizs` - Quizzes and assignments
- `brainwave_mocks` - Mock exams
- `brainwave_books` - eBooks
- `brainwave_videos` - Video tutorials
- `brainwave_reports` - Student reports
- `brainwave_announcements` - Announcements
- `brainwave_community_links` - Community links

## Clearing Data

### Clear All Mock Data
```javascript
// In browser console
clearMockData();
```

### Clear Specific Data
```javascript
// Clear only subjects
localStorage.removeItem('brainwave_subjects');

// Clear only study materials
localStorage.removeItem('brainwave_books');
localStorage.removeItem('brainwave_videos');

// Clear student account
localStorage.removeItem('brainwave_current_student_id');
```

## Troubleshooting

### Issue: Dashboard shows "No student logged in"
**Solution:** Make sure you generated the mock data first. The student account is created automatically.

### Issue: Data doesn't appear after generation
**Solution:** Refresh the page (F5) or hard refresh (Ctrl+F5).

### Issue: Old data still showing after clearing
**Solution:** 
1. Clear browser cache
2. Open Developer Tools > Application > Local Storage
3. Manually delete all `brainwave_*` keys
4. Refresh the page

### Issue: Student code not showing
**Solution:** The student code is randomly generated. Check the profile dropdown to see it.

### Issue: YouTube thumbnails not loading
**Solution:** This is normal - the video links are real YouTube videos, so thumbnails should load. If not, check your internet connection.

## Best Practices

1. **Always clear mock data** before testing with real data
2. **Don't use mock data in production** - it's for testing only
3. **Regenerate data** if you need fresh timestamps
4. **Test one section at a time** for thorough validation
5. **Use the web interface** for easier data management
6. **Check console logs** for generation confirmation

## Integration with Admin Dashboard

The mock student account is compatible with the admin dashboard:
- Student appears in subscription management
- Can be assigned to parent accounts
- Reports are linked by student code
- All admin features work with mock student

## Notes

- Mock data uses **SS2 Science** as the default class/stream
- All dates are relative to generation time
- Links are sample URLs (won't actually download/play)
- Student code is randomly generated each time
- Data persists until manually cleared

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try clearing all data and regenerating
4. Check that JavaScript is enabled
5. Use a modern browser (Chrome, Firefox, Edge)

---

**Last Updated:** October 5, 2025  
**Version:** 1.0.0  
**Author:** BrainWave Development Team
