# Admin to Student Dashboard - Complete Integration Guide

## 📋 Overview
This document explains how content created by the admin is automatically extracted and displayed in the student dashboard based on their **class level** and **stream**.

---

## 🔄 Data Flow Architecture

```
Admin Dashboard → localStorage → Student Dashboard (Filtered by Class Level & Stream)
```

### localStorage Keys Used:
- `brainwave_subjects` - All subjects
- `brainwave_books` - All eBooks
- `brainwave_videos` - All videos
- `brainwave_quizs` - All quizzes
- `brainwave_assignments` - All assignments
- `brainwave_mocks` - All mock exams
- `brainwave_live_classes` - All live classes
- `brainwave_reports` - All student reports
- `brainwave_announcements` - All announcements
- `brainwave_community_links` - Community links (WhatsApp/Telegram)
- `brainwave_users` - All users (students & admin)

---

## 1️⃣ SUBJECTS

### Admin Side (Subject Management)
**Location:** Admin Dashboard → Subject Management

**How to Create:**
1. Click "Add New Subject" button
2. Fill in:
   - Subject Name (e.g., "Mathematics")
   - Class Level (SS1, SS2, SS3, Jambite, or "All Levels")
   - Stream (Science, Arts, Commercial, General, Multi-Stream)
3. Click "Add Subject"

**Data Structure:**
```javascript
{
  id: 1234567890,
  name: "Mathematics",
  classLevel: "SS2",        // or "All Levels"
  stream: "Science",         // or "General", "Multi-Stream", "All Streams"
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (My Subjects)
**Location:** Student Dashboard → My Subjects

**Filtering Logic:**
```javascript
// Shows subjects where:
(subject.classLevel === student.classLevel OR subject.classLevel === "All Levels")
AND
(subject.stream === student.stream OR subject.stream === "General" OR subject.stream === "Multi-Stream")
```

**Example:**
- **SS2 Science student** sees:
  - ✅ Mathematics (SS2, Science)
  - ✅ English Language (All Levels, General)
  - ❌ Literature (SS3, Arts)

---

## 2️⃣ QUIZZES

### Admin Side (Assessment Management)
**Location:** Admin Dashboard → Assessment Management → Create Quiz

**How to Create:**
1. Click "Create Quiz" button
2. Fill in:
   - Quiz Title
   - Subject (from dropdown)
   - Class Level
   - Stream
   - Due Date
   - Duration (minutes)
   - Total Marks
3. Click "Create Quiz"

**Data Structure:**
```javascript
{
  id: 1234567890,
  type: "quiz",
  title: "Mathematics Quiz - Algebra",
  subject: "Mathematics",
  classLevel: "SS2",
  stream: "Science",
  dueDate: "2025-12-31",
  duration: "30",
  totalMarks: 50,
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Quizzes & Assignments)
**Location:** Student Dashboard → Quizzes & Assignments

**Filtering Logic:**
```javascript
// Shows quizzes where:
(quiz.classLevel === student.classLevel OR quiz.classLevel === "All Levels")
AND
(quiz.stream === student.stream OR quiz.stream === "All Streams")
```

**Display:**
- Quiz title, subject, due date, duration, marks
- "Start Quiz" button
- Color-coded badge (Blue for Quiz)

---

## 3️⃣ ASSIGNMENTS

### Admin Side (Assessment Management)
**Location:** Admin Dashboard → Assessment Management → Create Assignment

**How to Create:**
1. Click "Create Assignment" button
2. Fill in same fields as Quiz
3. Type is automatically set to "assignment"

**Data Structure:**
```javascript
{
  id: 1234567890,
  type: "assignment",
  title: "Chemistry Assignment - Periodic Table",
  subject: "Chemistry",
  classLevel: "SS2",
  stream: "Science",
  dueDate: "2025-12-31",
  duration: "60",
  totalMarks: 100,
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Quizzes & Assignments)
**Same section as quizzes, filtered the same way**

**Display:**
- Assignment title, subject, due date, duration, marks
- "Start Assignment" button
- Color-coded badge (Orange for Assignment)

---

## 4️⃣ MOCK EXAMS

### Admin Side (Assessment Management)
**Location:** Admin Dashboard → Assessment Management → Create Mock Exam

**How to Create:**
1. Click "Create Mock Exam" button
2. Fill in exam details
3. Type is automatically set to "mock"

**Data Structure:**
```javascript
{
  id: 1234567890,
  type: "mock",
  title: "JAMB Mock Exam - Physics",
  subject: "Physics (JAMB)",
  classLevel: "Jambite",
  stream: "Science",
  dueDate: "2025-12-31",
  duration: "120",
  totalMarks: 100,
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Mock Exams)
**Location:** Student Dashboard → Mock Exams

**Filtering Logic:** Same as quizzes/assignments

**Display:**
- Mock exam title, subject, due date, duration, marks
- "Start Mock Exam" button
- Color-coded badge (Red for Mock)

---

## 5️⃣ LIVE CLASSES

### Admin Side (Live Classes & Reports)
**Location:** Admin Dashboard → Live Classes & Reports → Schedule Live Class

**How to Create:**
1. Click "Schedule Live Class" button
2. Fill in:
   - Subject
   - Teacher Name
   - Class Level
   - Stream
   - Date
   - Time
   - Meeting Link (Zoom/Google Meet)
   - Status (Live or Scheduled)
3. Click "Schedule Class"

**Data Structure:**
```javascript
{
  id: 1234567890,
  subject: "Physics",
  teacher: "Mr. Adeyemi",
  classLevel: "SS2",
  stream: "Science",
  date: "2025-01-15",
  time: "10:00 AM",
  status: "live",           // or "scheduled"
  link: "https://zoom.us/j/123456789",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Live Classes)
**Location:** Student Dashboard → Live Classes

**Filtering Logic:**
```javascript
// Shows live classes where:
(liveClass.classLevel === student.classLevel OR liveClass.classLevel === "All Levels")
AND
(liveClass.stream === student.stream OR liveClass.stream === "All Streams")
```

**Display:**
- **If status = "live":**
  - Green card with "LIVE NOW" indicator
  - Pulsing dot animation
  - Active "Join Class Now" button
  - Opens meeting link in new tab
  
- **If status = "scheduled":**
  - Gray card with "SCHEDULED" indicator
  - Disabled "Not Started Yet" button
  - Shows scheduled date and time

---

## 6️⃣ STUDY MATERIALS (eBooks & Videos)

### Admin Side (Content Management)
**Location:** Admin Dashboard → Content Management

**How to Create eBook:**
1. Click "Add Content" button
2. Select "Book" tab
3. Fill in:
   - Book Title
   - Description
   - Subject
   - Class Level
   - Stream
   - Google Drive Link
   - Thumbnail URL (optional)
4. Click "Add Book"

**eBook Data Structure:**
```javascript
{
  id: 1234567890,
  title: "Advanced Mathematics Textbook",
  description: "Complete guide to SS2 Mathematics",
  subject: "Mathematics",
  classLevel: "SS2",
  stream: "Science",
  link: "https://drive.google.com/file/d/...",
  thumbnail: "https://...",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**How to Create Video:**
1. Click "Add Content" button
2. Select "Video" tab
3. Fill in:
   - Video Title
   - Description
   - Subject
   - Class Level
   - Stream
   - YouTube Link
4. Click "Add Video"

**Video Data Structure:**
```javascript
{
  id: 1234567890,
  title: "Introduction to Calculus",
  description: "Learn calculus basics",
  subject: "Mathematics",
  classLevel: "SS2",
  stream: "Science",
  link: "https://www.youtube.com/watch?v=...",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Study Materials)
**Location:** Student Dashboard → Study Materials

**Filtering Logic:** Same as other content

**Display:**
- **eBooks:**
  - Thumbnail image
  - Title and description
  - Subject badge (Blue)
  - "Download eBook" button → Opens Google Drive link
  
- **Videos:**
  - Auto-extracted YouTube thumbnail
  - Title and description
  - Subject badge (Red)
  - "Watch Video" button → Opens YouTube link

**Filter Tabs:**
- All Materials (shows both)
- eBooks (books only)
- Videos (videos only)

---

## 7️⃣ REPORTS

### Admin Side (Live Classes & Reports)
**Location:** Admin Dashboard → Live Classes & Reports → Add Student Report

**How to Create:**
1. Click "Add Student Report" button
2. Fill in:
   - Student Code (unique identifier)
   - Student Name
   - Assessment Title
   - Subject
   - Type (Quiz/Assignment/Mock)
   - Score
   - Total Marks
   - Date
3. System calculates if passed (score ≥ 40%)
4. Click "Add Report"

**Data Structure:**
```javascript
{
  id: 1234567890,
  studentCode: "BW123ABC",      // IMPORTANT: Used for filtering
  studentName: "John Doe",
  assessmentTitle: "Mathematics Quiz - Algebra",
  subject: "Mathematics",
  type: "quiz",
  score: 42,
  totalMarks: 50,
  passed: true,                  // Auto-calculated
  date: "2025-01-15",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Reports)
**Location:** Student Dashboard → Reports

**Filtering Logic:**
```javascript
// Shows reports where:
report.studentCode === student.studentCode
OR
report.studentName === student.name
```

**Display:**
- Table with columns:
  - Assessment name
  - Subject
  - Type (Quiz/Assignment/Mock)
  - Score with color coding:
    - **Green (Excellent):** 80%+
    - **Blue (Good):** 60-79%
    - **Yellow (Average):** 40-59%
    - **Red (Poor):** Below 40%
  - Date
  - Status (Passed/Failed)

---

## 8️⃣ ANNOUNCEMENTS

### Admin Side (Broadcast & Community)
**Location:** Admin Dashboard → Broadcast & Community → Send Announcement

**How to Create:**
1. Click "Send Announcement" button
2. Fill in:
   - Announcement Title
   - Message
   - Target Class Level (optional - leave blank for "All Levels")
3. Click "Send Announcement"

**Data Structure:**
```javascript
{
  id: 1234567890,
  title: "Welcome to BrainWave!",
  message: "We are excited to have you on our platform...",
  classLevel: "SS2",            // or null for all students
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Announcements)
**Location:** Student Dashboard → Announcements

**Filtering Logic:**
```javascript
// Shows announcements where:
announcement.classLevel === student.classLevel
OR
announcement.classLevel === "All Levels"
OR
announcement.classLevel === null
```

**Display:**
- **Dashboard (Recent):** Shows last 3 announcements
- **Announcements Page:** Shows all announcements
- Each shows:
  - Title with icon
  - Message
  - Date
  - Target class level (if specified)

---

## 9️⃣ COMMUNITY LINKS

### Admin Side (Broadcast & Community)
**Location:** Admin Dashboard → Broadcast & Community → Community Links

**How to Setup:**
1. Enable WhatsApp toggle
2. Enter WhatsApp group link
3. Enable Telegram toggle
4. Enter Telegram channel link
5. Click "Save Community Links"

**Data Structure:**
```javascript
{
  whatsappEnabled: true,
  whatsappLink: "https://chat.whatsapp.com/...",
  telegramEnabled: true,
  telegramLink: "https://t.me/...",
  updatedAt: "2025-01-01T00:00:00.000Z"
}
```

### Student Side (Community)
**Location:** Student Dashboard → Community

**Display:**
- **WhatsApp Card** (if enabled):
  - WhatsApp icon (green)
  - "Join our WhatsApp community"
  - Clickable link
  
- **Telegram Card** (if enabled):
  - Telegram icon (blue)
  - "Join our Telegram channel"
  - Clickable link

**No Filtering:** Community links are the same for all students

---

## 🔧 How Filtering Works

### Filter Function (Used for All Content):
```javascript
function getFilteredContent(items, student) {
  return items.filter(item => {
    // Check class level match
    const classMatch = 
      item.classLevel === student.classLevel || 
      item.classLevel === 'All Levels';
    
    // Check stream match
    const streamMatch = 
      item.stream === student.stream || 
      item.stream === 'All Streams' || 
      item.stream === 'General' || 
      item.stream === 'Multi-Stream';
    
    return classMatch && streamMatch;
  });
}
```

### Example Scenarios:

**Scenario 1: SS2 Science Student**
```javascript
student = {
  classLevel: "SS2",
  stream: "Science"
}

// WILL SEE:
✅ Mathematics (SS2, Science)
✅ English Language (All Levels, General)
✅ Physics Quiz (SS2, Science)
✅ Math Video (SS2, All Streams)

// WON'T SEE:
❌ Literature (SS3, Arts)
❌ Government Quiz (SS3, Arts)
❌ JAMB Physics (Jambite, Science)
```

**Scenario 2: SS3 Arts Student**
```javascript
student = {
  classLevel: "SS3",
  stream: "Arts"
}

// WILL SEE:
✅ Literature (SS3, Arts)
✅ English Language (All Levels, General)
✅ Government Quiz (SS3, Arts)
✅ History Assignment (SS3, All Streams)

// WON'T SEE:
❌ Mathematics (SS2, Science)
❌ Physics Quiz (SS2, Science)
❌ Chemistry (SS2, Science)
```

---

## 🧪 Testing the Integration

### Step 1: Admin Creates Content
1. Open `admin-dashboard.html`
2. Create subjects for different levels:
   - Mathematics (SS2, Science)
   - Literature (SS3, Arts)
   - Use of English (Jambite, Science)
   - English Language (All Levels, General)

3. Create study materials for each subject
4. Create quizzes/assignments for each level
5. Schedule live classes
6. Add student reports (use student codes)
7. Send announcements
8. Setup community links

### Step 2: Student Signs Up
1. Open `signup.html`
2. Sign up as:
   - Class Level: SS2
   - Stream: Science
3. Note the student code
4. You'll be auto-redirected to dashboard

### Step 3: Verify Filtering
In the student dashboard, verify:
- ✅ Only SS2 Science subjects appear
- ✅ Only SS2 Science study materials appear
- ✅ Only SS2 Science quizzes/assignments appear
- ✅ Only SS2 Science live classes appear
- ✅ Only your reports appear (by student code)
- ✅ Relevant announcements appear
- ✅ Community links appear

### Step 4: Test Profile Change
1. Click avatar → Edit Profile
2. Change to SS3 Arts
3. Save changes
4. Verify content updates to SS3 Arts materials

---

## 📊 Quick Reference Table

| Content Type | Admin Creates In | Student Sees In | Filtered By |
|--------------|------------------|-----------------|-------------|
| Subjects | Subject Management | My Subjects | Class Level + Stream |
| eBooks | Content Management | Study Materials | Class Level + Stream |
| Videos | Content Management | Study Materials | Class Level + Stream |
| Quizzes | Assessment Management | Quizzes & Assignments | Class Level + Stream |
| Assignments | Assessment Management | Quizzes & Assignments | Class Level + Stream |
| Mock Exams | Assessment Management | Mock Exams | Class Level + Stream |
| Live Classes | Live Classes & Reports | Live Classes | Class Level + Stream |
| Reports | Live Classes & Reports | Reports | Student Code |
| Announcements | Broadcast & Community | Announcements | Class Level (optional) |
| Community Links | Broadcast & Community | Community | No Filter (All Students) |

---

## 🎯 Key Points

1. **All content is filtered automatically** - Students only see content for their class level and stream
2. **"All Levels" and "General/Multi-Stream"** content is visible to everyone
3. **Reports are filtered by student code** - Each student only sees their own reports
4. **Community links are global** - Same for all students
5. **Real-time updates** - Changes in admin dashboard immediately reflect in student dashboard (after page refresh)
6. **No manual assignment needed** - Filtering happens automatically based on student profile

---

## 🔗 File References

- **Admin Dashboard:** `admin-dashboard.html`
- **Student Dashboard:** `student-dashboard.html`
- **Student Dashboard JS:** `student-dashboard.js`
- **Signup Page:** `signup.html`
- **Student Login:** `student-login.html`
- **Test Filtering:** `test-filtering.html`
- **Setup Test Data:** `setup-test-data.html`

---

## ✅ Success Checklist

- [ ] Admin can create subjects with class level and stream
- [ ] Admin can add eBooks and videos with filtering tags
- [ ] Admin can create quizzes, assignments, and mock exams
- [ ] Admin can schedule live classes with status (live/scheduled)
- [ ] Admin can add student reports using student codes
- [ ] Admin can send announcements (targeted or all)
- [ ] Admin can setup community links
- [ ] Students see only content for their class level and stream
- [ ] Students see only their own reports
- [ ] Students can join live classes when status is "live"
- [ ] Students can access study materials via external links
- [ ] Profile changes update visible content immediately

---

**Last Updated:** January 2025  
**Version:** 1.0.0
