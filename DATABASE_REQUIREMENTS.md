# BrainWave Firebase Database Requirements

## Overview
This document outlines all database requirements for the BrainWave educational platform using Firebase Firestore.

## Collections Structure

### 1. **users** (Main User Collection)
**Purpose**: Store all user accounts (students, parents, admins)

**Fields**:
- `uid` (string) - Firebase Auth UID (document ID)
- `name` (string) - Full name
- `firstName` (string)
- `lastName` (string)
- `email` (string) - User email
- `role` (string) - 'student', 'parent', or 'admin'
- `plan` (string) - 'bootcamp', 'monthly', 'termly', 'family'
- `status` (string) - 'bootcamp', 'active', 'expired'
- `isPaid` (boolean)
- `paymentStatus` (string)
- `expiryDate` (timestamp/string)
- `locked` (boolean)
- `accountLocked` (boolean)
- `lockedReason` (string)
- `lockedAt` (timestamp)
- `joinDate` (timestamp)
- `bootcampStartDate` (timestamp)
- `paidDate` (timestamp)
- `planHistory` (array of objects)
- `emailVerified` (boolean)
- `verifiedAt` (timestamp)
- `userType` (string) - 'child' or 'parent'
- `classLevel` (string) - 'SS1', 'SS2', 'SS3', 'Jambite'
- `stream` (string) - 'Science', 'Humanities', 'Business'
- `phone` (string)
- `studentCode` (string) - For students only
- `parentId` (string) - Reference to parent (for students)
- `childrenCount` (number) - For parents only
- `children` (array) - Array of child UIDs (for parents)
- `needsChildLinking` (boolean) - For parents
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes Needed**:
- email
- role
- studentCode
- status
- expiryDate

---

### 2. **subjects** (Subject Catalog)
**Purpose**: Store available subjects for each class level and stream

**Fields**:
- `id` (string) - Auto-generated
- `name` (string) - Subject name
- `classLevel` (string) - 'SS1', 'SS2', 'SS3', 'Jambite'
- `stream` (string) - 'Science', 'Humanities', 'Business', 'All'
- `description` (string)
- `icon` (string) - Icon class or emoji
- `color` (string) - Hex color code
- `isActive` (boolean)
- `createdAt` (timestamp)

**Indexes Needed**:
- classLevel
- stream

---

### 3. **study_materials** (Books & Videos)
**Purpose**: Store all study materials (textbooks, videos, notes)

**Fields**:
- `id` (string) - Auto-generated
- `title` (string)
- `subject` (string)
- `classLevel` (string)
- `stream` (string)
- `type` (string) - 'book', 'video', 'note'
- `format` (string) - 'PDF', 'Video', 'Document'
- `description` (string)
- `thumbnail` (string) - URL
- `fileUrl` (string) - Storage URL
- `videoUrl` (string) - For videos
- `duration` (string) - For videos
- `pages` (number) - For books
- `size` (string) - File size
- `views` (number)
- `downloads` (number)
- `accessLevel` (string) - 'bootcamp', 'paid', 'all'
- `isActive` (boolean)
- `createdBy` (string) - Admin UID
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes Needed**:
- subject
- classLevel
- stream
- type
- accessLevel

---

### 4. **assessments** (Quizzes, Assignments, Mock Exams)
**Purpose**: Store all types of assessments

**Fields**:
- `id` (string) - Auto-generated
- `type` (string) - 'quiz', 'assignment', 'mock'
- `title` (string)
- `subject` (string)
- `classLevel` (string)
- `stream` (string)
- `description` (string)
- `instructions` (string)
- `dueDate` (timestamp)
- `duration` (number) - In minutes
- `totalMarks` (number)
- `passingMarks` (number)
- `questions` (array or subcollection reference)
- `questionCount` (number)
- `status` (string) - 'draft', 'available', 'archived'
- `examType` (string) - 'WAEC', 'NECO', 'JAMB' (for mocks)
- `accessLevel` (string) - 'bootcamp', 'paid'
- `isActive` (boolean)
- `createdBy` (string) - Admin UID
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes Needed**:
- type
- subject
- classLevel
- stream
- status
- dueDate

---

### 5. **assessment_submissions** (Student Submissions)
**Purpose**: Track student assessment attempts and scores

**Fields**:
- `id` (string) - Auto-generated
- `assessmentId` (string) - Reference to assessment
- `studentId` (string) - Student UID
- `studentName` (string)
- `studentCode` (string)
- `answers` (array) - Student answers
- `score` (number)
- `totalMarks` (number)
- `percentage` (number)
- `passed` (boolean)
- `timeSpent` (number) - In minutes
- `startedAt` (timestamp)
- `submittedAt` (timestamp)
- `status` (string) - 'in_progress', 'submitted', 'graded'
- `feedback` (string)
- `gradedBy` (string) - Admin UID
- `gradedAt` (timestamp)

**Indexes Needed**:
- assessmentId
- studentId
- status
- submittedAt

---

### 6. **live_classes** (Live Class Sessions)
**Purpose**: Schedule and manage live classes

**Fields**:
- `id` (string) - Auto-generated
- `subject` (string)
- `teacher` (string) - Teacher name
- `classLevel` (string)
- `stream` (string)
- `topic` (string)
- `description` (string)
- `date` (timestamp)
- `time` (string)
- `duration` (string) - e.g., "60 minutes"
- `meetingLink` (string) - Google Meet/Zoom link
- `status` (string) - 'scheduled', 'live', 'completed', 'cancelled'
- `attendees` (array) - Array of student UIDs
- `attendeeCount` (number)
- `maxAttendees` (number)
- `recordingUrl` (string)
- `accessLevel` (string) - 'bootcamp', 'paid'
- `isActive` (boolean)
- `createdBy` (string) - Admin UID
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes Needed**:
- subject
- classLevel
- status
- date

---

### 7. **student_progress** (Student Learning Progress)
**Purpose**: Track individual student progress and performance

**Fields**:
- `id` (string) - Auto-generated (studentId)
- `studentId` (string) - Student UID
- `totalQuizzesTaken` (number)
- `totalAssignmentsCompleted` (number)
- `totalMockExamsTaken` (number)
- `averageScore` (number)
- `totalStudyHours` (number)
- `streakDays` (number)
- `lastActiveDate` (timestamp)
- `badges` (array) - Earned badges
- `subjectScores` (map) - Subject-wise performance
- `weeklyActivity` (array) - Last 7 days activity
- `monthlyActivity` (array) - Last 30 days activity
- `updatedAt` (timestamp)

**Indexes Needed**:
- studentId
- lastActiveDate

---

### 8. **parent_children** (Parent-Child Relationships)
**Purpose**: Link parents to their children

**Fields**:
- `id` (string) - Auto-generated
- `parentId` (string) - Parent UID
- `childId` (string) - Student UID
- `childName` (string)
- `childEmail` (string)
- `childCode` (string)
- `classLevel` (string)
- `stream` (string)
- `linkedAt` (timestamp)
- `isActive` (boolean)

**Indexes Needed**:
- parentId
- childId
- childCode

---

### 9. **announcements** (System Announcements)
**Purpose**: Store platform-wide announcements

**Fields**:
- `id` (string) - Auto-generated
- `title` (string)
- `message` (string)
- `type` (string) - 'info', 'warning', 'success', 'urgent'
- `targetAudience` (array) - ['student', 'parent', 'all']
- `classLevels` (array) - Specific class levels
- `isActive` (boolean)
- `expiresAt` (timestamp)
- `createdBy` (string) - Admin UID
- `createdAt` (timestamp)

**Indexes Needed**:
- isActive
- createdAt
- expiresAt

---

### 10. **payments** (Payment Records)
**Purpose**: Track all payment transactions

**Fields**:
- `id` (string) - Auto-generated
- `userId` (string) - User UID
- `userName` (string)
- `userEmail` (string)
- `plan` (string) - 'monthly', 'termly', 'family'
- `amount` (number)
- `currency` (string) - 'NGN'
- `paymentMethod` (string)
- `transactionId` (string)
- `status` (string) - 'pending', 'completed', 'failed', 'refunded'
- `paymentDate` (timestamp)
- `expiryDate` (timestamp)
- `reference` (string)
- `metadata` (map)
- `createdAt` (timestamp)

**Indexes Needed**:
- userId
- status
- paymentDate

---

### 11. **reports** (Generated Reports)
**Purpose**: Store generated student/parent reports

**Fields**:
- `id` (string) - Auto-generated
- `studentId` (string)
- `studentName` (string)
- `reportType` (string) - 'weekly', 'monthly', 'termly'
- `period` (string) - e.g., "January 2025"
- `data` (map) - Report data
- `pdfUrl` (string) - Generated PDF URL
- `generatedAt` (timestamp)
- `generatedBy` (string) - 'system' or admin UID

**Indexes Needed**:
- studentId
- reportType
- generatedAt

---

## Realtime Database Requirements

For features requiring real-time updates, use Firebase Realtime Database:

### 1. **online_users** (Currently Online Users)
**Purpose**: Track who's currently online

**Structure**:
```
online_users/
  {userId}/
    status: "online"
    lastSeen: timestamp
    currentPage: "student-dashboard"
```

### 2. **live_class_participants** (Real-time Class Attendance)
**Purpose**: Track live class participants in real-time

**Structure**:
```
live_class_participants/
  {classId}/
    {userId}/
      joinedAt: timestamp
      status: "active"
```

---

## Security Rules Recommendations

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students can read their submissions
    match /assessment_submissions/{submissionId} {
      allow read: if request.auth != null && resource.data.studentId == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    // Everyone can read study materials (with access level check in app)
    match /study_materials/{materialId} {
      allow read: if request.auth != null;
    }
    
    // Admin-only collections
    match /payments/{paymentId} {
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Migration Strategy

1. **Phase 1**: Migrate user authentication (completed)
2. **Phase 2**: Migrate study materials and assessments
3. **Phase 3**: Migrate student progress and submissions
4. **Phase 4**: Implement real-time features
5. **Phase 5**: Set up automated backups and monitoring
