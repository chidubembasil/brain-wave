# BrainWave Student Dashboard - Complete Guide

## Overview
The Student Dashboard is the central interface for students to access all learning materials, assessments, live classes, and track their progress. Content is automatically filtered based on the student's **class level** and **stream**.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Dashboard Features](#dashboard-features)
3. [Navigation](#navigation)
4. [Content Filtering](#content-filtering)
5. [Testing Guide](#testing-guide)
6. [Integration with Admin Dashboard](#integration-with-admin-dashboard)

---

## Getting Started

### Student Login
**File:** `student-login.html`

Students can log in using their email and password:
- **URL:** Open `student-login.html` in your browser
- **Default Password:** Use the email prefix (before @) or "password"
- **Example:** Email: `john@student.com` → Password: `john` or `password`

### Student Registration
Students must first sign up through the signup page, which creates their account in the system.

### Unique Student Code
Each student is assigned a unique code by the admin (format: `BWXXXXXX`). This code is used for:
- Identifying students in reports
- Tracking progress
- Admin management

---

## Dashboard Features

### 1. Main Dashboard (Home)
**Location:** Dashboard section (default view)

**Features:**
- **Statistics Cards:**
  - My Subjects count
  - Pending Tasks (quizzes + assignments)
  - Study Materials count

- **Live Classes:** Shows currently active live classes
- **Recent Announcements:** Last 3 announcements

### 2. My Subjects
**Location:** My Subjects section

**Features:**
- Displays all subjects assigned to the student's class level and stream
- Color-coded by stream (Science, Arts, Commercial, etc.)
- Shows subject name, stream, and class level

**Filtering Logic:**
```javascript
// Subjects are filtered by:
- classLevel === student.classLevel OR classLevel === 'All Levels'
- stream === student.stream OR stream === 'General' OR stream === 'Multi-Stream'
```

### 3. Live Classes
**Location:** Live Classes section

**Features:**
- View all scheduled and active live classes
- **LIVE NOW indicator** for active classes
- Join button to instantly connect to ongoing classes
- Shows: Subject, Teacher, Date, Time, Class Level, Stream

**Filtering Logic:**
```javascript
// Live classes filtered by:
- classLevel === student.classLevel OR classLevel === 'All Levels'
- stream === student.stream OR stream === 'All Streams'
```

### 4. Quizzes & Assignments
**Location:** Quizzes & Assignments section

**Features:**
- View all available quizzes and assignments
- Color-coded badges (Quiz: Blue, Assignment: Orange)
- Shows: Title, Subject, Due Date, Duration, Total Marks
- Start button to begin assessment

**Filtering Logic:**
```javascript
// Assessments filtered by:
- classLevel === student.classLevel OR classLevel === 'All Levels'
- stream === student.stream OR stream === 'All Streams'
```

### 5. Mock Exams
**Location:** Mock Exams section

**Features:**
- View all available mock exams
- Red badge indicator
- Shows: Title, Subject, Due Date, Duration, Total Marks
- Start button to begin mock exam

**Filtering Logic:** Same as quizzes and assignments

### 6. Study Materials
**Location:** Study Materials section

**Features:**
- **Filter Tabs:** All Materials, eBooks, Videos
- **eBooks:**
  - Thumbnail image
  - Title and description
  - Subject badge
  - Download button (opens Google Drive link)
  
- **Videos:**
  - Auto-extracted YouTube thumbnail
  - Title and description
  - Subject badge
  - Watch button (opens YouTube link)

**Filtering Logic:**
```javascript
// Study materials filtered by:
- classLevel === student.classLevel OR classLevel === 'All Levels'
- stream === student.stream OR stream === 'All Streams'
```

### 7. Reports
**Location:** Reports section

**Features:**
- View all assessment results
- **Table Columns:**
  - Assessment name
  - Subject
  - Type (Quiz/Assignment/Mock)
  - Score (color-coded: Excellent/Good/Average/Poor)
  - Date
  - Status (Passed/Failed)

**Filtering Logic:**
```javascript
// Reports filtered by:
- studentCode === student.studentCode OR studentName === student.name
```

**Score Color Coding:**
- **Excellent (Green):** 80% and above
- **Good (Blue):** 60-79%
- **Average (Yellow):** 40-59%
- **Poor (Red):** Below 40%

### 8. Announcements
**Location:** Announcements section

**Features:**
- View all announcements from admin
- Shows: Title, Message, Date, Target Class Level
- Recent announcements appear on dashboard

**Filtering Logic:**
```javascript
// Announcements filtered by:
- classLevel === student.classLevel OR classLevel === 'All Levels' OR no classLevel specified
```

### 9. Community
**Location:** Community section

**Features:**
- Links to WhatsApp groups
- Links to Telegram channels
- Configured by admin in Broadcast & Community section

---

## Navigation

### Sidebar Menu (Desktop)
- Dashboard
- My Subjects
- Live Classes
- Quizzes & Assignments
- Mock Exams
- Study Materials
- Reports
- Announcements
- Community

### Hamburger Menu (Mobile)
- Click hamburger icon (☰) to open/close sidebar
- Sidebar slides in from left
- Click outside or close button (×) to close

### Profile Dropdown
**Location:** Top-right avatar

**Options:**
- **Edit Profile:** Update name, email, phone, class level, stream
- **Logout:** Sign out and return to login page

### Student Code Badge
**Location:** Top bar (desktop only)

Displays the student's unique code assigned by admin.

---

## Content Filtering

### How Filtering Works

All content (subjects, live classes, assessments, study materials) is automatically filtered based on:

1. **Class Level:**
   - SS1, SS2, SS3, Jambite
   - Content marked "All Levels" is shown to everyone

2. **Stream:**
   - Science, Arts, Commercial
   - Content marked "All Streams" is shown to everyone
   - "General" and "Multi-Stream" subjects are shown to all streams

3. **Student Code (Reports only):**
   - Reports are filtered by the student's unique code
   - Ensures students only see their own results

### Example Filtering Scenarios

**Scenario 1: SS2 Science Student**
- **Sees:** All SS2 content + "All Levels" content
- **Stream:** Science + General + Multi-Stream + All Streams
- **Doesn't See:** SS1, SS3, Jambite exclusive content; Arts/Commercial exclusive content

**Scenario 2: Jambite Arts Student**
- **Sees:** All Jambite content + "All Levels" content
- **Stream:** Arts + General + Multi-Stream + All Streams
- **Doesn't See:** SS1, SS2, SS3 exclusive content; Science/Commercial exclusive content

---

## Testing Guide

### Step 1: Create Test Student Account

**Option A: Through Signup Page**
1. Open `signup.html`
2. Fill in student details:
   - Name: Test Student
   - Email: test@student.com
   - Password: password
   - Class Level: SS2
   - Stream: Science
3. Submit form
4. Account is created automatically

**Option B: Through Admin Dashboard**
1. Open `admin-dashboard.html`
2. Go to Subscription Management
3. Add new user with role: "student"
4. Set class level and stream
5. Generate student code

### Step 2: Assign Student Code (Admin)
1. In Admin Dashboard → Subscription Management
2. Find the test student
3. Click "Generate Code" button
4. Note the generated code (e.g., BW123ABC)

### Step 3: Add Test Content (Admin)

**Add Subjects:**
1. Admin Dashboard → Subject Management
2. Create subjects for SS2 Science:
   - Mathematics (SS2, Science)
   - Physics (SS2, Science)
   - Chemistry (SS2, Science)

**Add Study Materials:**
1. Admin Dashboard → Content Management
2. Add eBook:
   - Title: Physics Textbook
   - Subject: Physics
   - Class Level: SS2
   - Stream: Science
   - Google Drive Link: [your link]
   
3. Add Video:
   - Title: Chemistry Basics
   - Subject: Chemistry
   - Class Level: SS2
   - Stream: Science
   - YouTube Link: [your link]

**Add Assessments:**
1. Admin Dashboard → Assessment Management
2. Create Quiz:
   - Title: Mathematics Quiz 1
   - Subject: Mathematics
   - Class Level: SS2
   - Stream: Science
   - Due Date: [future date]

**Add Live Class:**
1. Admin Dashboard → Live Classes
2. Schedule class:
   - Subject: Physics
   - Teacher: Mr. Smith
   - Class Level: SS2
   - Stream: Science
   - Status: Live (for testing)
   - Link: [meeting link]

**Add Announcement:**
1. Admin Dashboard → Broadcast & Community
2. Create announcement:
   - Title: Welcome Message
   - Message: Welcome to BrainWave!
   - Class Level: SS2 (or All Levels)

**Add Report:**
1. Admin Dashboard → Reports
2. Add student report:
   - Student Code: BW123ABC
   - Student Name: Test Student
   - Assessment: Mathematics Quiz 1
   - Subject: Mathematics
   - Type: Quiz
   - Score: 85
   - Total Marks: 100

### Step 4: Test Student Login
1. Open `student-login.html`
2. Login with:
   - Email: test@student.com
   - Password: test or password
3. Should redirect to `student-dashboard.html`

### Step 5: Verify Dashboard
1. **Check Statistics:**
   - My Subjects: Should show 3
   - Pending Tasks: Should show 1
   - Study Materials: Should show 2

2. **Check My Subjects:**
   - Should see: Mathematics, Physics, Chemistry
   - Should NOT see subjects from other levels/streams

3. **Check Live Classes:**
   - Should see Physics live class
   - Join button should be active

4. **Check Quizzes:**
   - Should see Mathematics Quiz 1
   - Start button should be visible

5. **Check Study Materials:**
   - Filter by "All": Shows 2 items
   - Filter by "eBooks": Shows 1 item (Physics Textbook)
   - Filter by "Videos": Shows 1 item (Chemistry Basics)

6. **Check Reports:**
   - Should see Mathematics Quiz 1 result
   - Score: 85/100 (Excellent - Green)
   - Status: Passed

7. **Check Announcements:**
   - Should see Welcome Message

### Step 6: Test Profile Management
1. Click avatar in top-right
2. Click "Edit Profile"
3. Change class level to SS3
4. Save changes
5. Verify content updates to show SS3 materials

### Step 7: Test Mobile Responsiveness
1. Resize browser to mobile width (< 768px)
2. Verify hamburger menu appears
3. Click hamburger to open sidebar
4. Verify sidebar slides in
5. Click outside to close
6. Verify all sections are accessible

---

## Integration with Admin Dashboard

### Data Flow

**Admin → Student:**
1. Admin creates content in admin dashboard
2. Content is saved to localStorage with class level and stream tags
3. Student dashboard reads from same localStorage
4. Content is filtered based on student's profile
5. Student sees only relevant content

### localStorage Keys Used

```javascript
// User Management
'brainwave_users' // All users (students + admin)
'brainwave_current_student_id' // Currently logged-in student ID

// Content
'brainwave_subjects' // All subjects
'brainwave_books' // All eBooks
'brainwave_videos' // All videos
'brainwave_quizs' // All quizzes (note: plural with 's')
'brainwave_assignments' // All assignments
'brainwave_mocks' // All mock exams
'brainwave_live_classes' // All live classes
'brainwave_announcements' // All announcements
'brainwave_reports' // All student reports
'brainwave_community_links' // WhatsApp/Telegram links
```

### Required Data Structure

**Student Object:**
```javascript
{
  id: 123456789,
  name: "John Doe",
  email: "john@student.com",
  phone: "+234 800 000 0000",
  role: "student",
  classLevel: "SS2", // Required for filtering
  stream: "Science", // Required for filtering
  studentCode: "BW123ABC", // Required for reports
  plan: "bootcamp",
  status: "active",
  locked: false,
  joinDate: "2025-01-01",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Subject Object:**
```javascript
{
  id: 123456789,
  name: "Mathematics",
  classLevel: "SS2", // or "All Levels"
  stream: "Science", // or "General", "Multi-Stream", "All Streams"
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Study Material Object (Book/Video):**
```javascript
{
  id: 123456789,
  title: "Physics Textbook",
  description: "Complete physics guide",
  subject: "Physics",
  classLevel: "SS2", // or "All Levels"
  stream: "Science", // or "All Streams"
  link: "https://drive.google.com/...", // or YouTube link
  thumbnail: "https://...", // Optional for books
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Assessment Object (Quiz/Assignment/Mock):**
```javascript
{
  id: 123456789,
  type: "quiz", // or "assignment", "mock"
  title: "Mathematics Quiz 1",
  subject: "Mathematics",
  classLevel: "SS2", // or "All Levels"
  stream: "Science", // or "All Streams"
  dueDate: "2025-12-31",
  duration: "30", // minutes
  totalMarks: 100,
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Live Class Object:**
```javascript
{
  id: 123456789,
  subject: "Physics",
  teacher: "Mr. Smith",
  classLevel: "SS2", // or "All Levels"
  stream: "Science", // or "All Streams"
  date: "2025-01-15",
  time: "10:00 AM",
  status: "live", // or "scheduled"
  link: "https://zoom.us/...",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Report Object:**
```javascript
{
  id: 123456789,
  studentCode: "BW123ABC", // Required for filtering
  studentName: "John Doe",
  assessmentTitle: "Mathematics Quiz 1",
  subject: "Mathematics",
  type: "quiz", // or "assignment", "mock"
  score: 85,
  totalMarks: 100,
  passed: true,
  date: "2025-01-15",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**Announcement Object:**
```javascript
{
  id: 123456789,
  title: "Welcome Message",
  message: "Welcome to BrainWave platform!",
  classLevel: "SS2", // or "All Levels" or null
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

---

## Troubleshooting

### Issue: Student can't log in
**Solution:**
1. Verify student account exists in `brainwave_users`
2. Check `role` is set to "student"
3. Verify account is not locked (`locked: false`)
4. Check subscription status is not "expired"

### Issue: No content showing
**Solution:**
1. Verify student has `classLevel` and `stream` set
2. Check admin has created content for that level/stream
3. Verify content has correct `classLevel` and `stream` tags
4. Check browser console for errors

### Issue: Reports not showing
**Solution:**
1. Verify student has `studentCode` assigned
2. Check reports have matching `studentCode` or `studentName`
3. Verify reports exist in `brainwave_reports`

### Issue: Live classes not appearing
**Solution:**
1. Check live classes exist in `brainwave_live_classes`
2. Verify `classLevel` and `stream` match student's profile
3. Check `status` field is set correctly

### Issue: YouTube thumbnails not loading
**Solution:**
1. Verify YouTube URL is valid
2. Check video is not private/restricted
3. URL format should be: `https://www.youtube.com/watch?v=VIDEO_ID`

---

## Security Notes

### Current Implementation
- Simple email/password authentication
- Password stored in plain text (for development)
- No session management
- Uses localStorage for state

### Production Recommendations
1. **Implement proper authentication:**
   - Hash passwords (bcrypt)
   - Use JWT tokens
   - Implement session management
   - Add password reset functionality

2. **Add authorization:**
   - Verify student access to content
   - Implement role-based access control
   - Add API rate limiting

3. **Secure data storage:**
   - Move from localStorage to backend database
   - Encrypt sensitive data
   - Implement proper backup system

4. **Add validation:**
   - Server-side input validation
   - XSS protection
   - CSRF protection

---

## Future Enhancements

### Planned Features
1. **Assessment Taking:**
   - Interactive quiz interface
   - Timer functionality
   - Auto-submit on timeout
   - Instant feedback

2. **Progress Tracking:**
   - Course completion percentage
   - Study streak tracking
   - Achievement badges
   - Performance analytics

3. **Interactive Features:**
   - Discussion forums
   - Live chat during classes
   - Peer-to-peer study groups
   - Bookmark favorite materials

4. **Notifications:**
   - Push notifications for live classes
   - Email reminders for due dates
   - New content alerts
   - Grade notifications

5. **Offline Support:**
   - Download materials for offline access
   - Offline quiz taking
   - Sync when back online

---

## Support

For issues or questions:
1. Check this documentation
2. Review browser console for errors
3. Verify data structure in localStorage
4. Test with sample data first

---

## Quick Reference

### File Structure
```
student-dashboard.html      # Main dashboard UI
student-dashboard.js        # Dashboard functionality
student-login.html          # Student login page
admin-dashboard.html        # Admin interface (for content creation)
```

### Key Functions (student-dashboard.js)
- `checkAuthentication()` - Verify student login
- `loadDashboardData()` - Load all content
- `getFilteredSubjects()` - Filter subjects by level/stream
- `getFilteredLiveClasses()` - Filter live classes
- `getFilteredAssessments()` - Filter quizzes/assignments/mocks
- `getFilteredBooks()` - Filter eBooks
- `getFilteredVideos()` - Filter videos
- `getStudentReports()` - Get student's reports
- `navigateToSection()` - Switch between sections

### Testing Checklist
- [ ] Student can log in
- [ ] Dashboard statistics are correct
- [ ] Subjects are filtered correctly
- [ ] Live classes appear for student's level/stream
- [ ] Quizzes and assignments are visible
- [ ] Mock exams are accessible
- [ ] Study materials (books & videos) load
- [ ] Reports show correct data
- [ ] Announcements are displayed
- [ ] Community links work
- [ ] Profile can be edited
- [ ] Mobile menu works
- [ ] Logout functions correctly

---

**Last Updated:** January 2025
**Version:** 1.0.0
