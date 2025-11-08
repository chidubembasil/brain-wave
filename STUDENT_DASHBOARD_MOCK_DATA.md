# Student Dashboard Mock Data Guide

## Overview
The student dashboard now includes comprehensive mock data generation to test all functionality. Mock data is automatically generated on first load and can be regenerated at any time.

## How to Generate Mock Data

### Method 1: Automatic Generation (First Load)
- Mock data is automatically generated when you first open the student dashboard
- The system checks if subjects exist and regenerates if missing

### Method 2: Manual Generation (Quick Access)
1. Open the student dashboard
2. Click on your profile avatar (top right)
3. Click **"Generate Mock Data"** in the dropdown menu
4. The page will reload with fresh mock data

### Method 3: Console Command
Open browser console (F12) and run:
```javascript
quickGenerate()
```

## Mock Data Included

### 1. **Sample Student Account**
- **Name**: John Doe (or Demo Student)
- **Email**: john.doe@student.com
- **Class**: SS2
- **Stream**: Science
- **Student Code**: Auto-generated (e.g., BWXYZ123)
- **Status**: Active Premium Account

### 2. **Subjects (6-7 subjects)**
- Mathematics
- Physics
- Chemistry
- Biology
- English Language
- Further Mathematics
- Computer Science

### 3. **Live Classes (2-3 classes)**
- **Live Now**: Mathematics with Dr. Sarah Johnson
- **Scheduled**: Physics with Prof. Michael Chen
- **Scheduled**: Chemistry with Dr. Amara Okafor
- All include Google Meet links for joining

### 4. **Quizzes & Assignments (3-4 items)**
- Quadratic Equations Quiz (Mathematics)
- Newton's Laws Assignment (Physics)
- Chemical Bonding Quiz (Chemistry)
- Cell Biology Project (Biology)
- All with due dates, duration, and marks

### 5. **Mock Exams (2-3 exams)**
- WAEC Mathematics Mock Exam (120 mins)
- JAMB Physics Practice Test (90 mins)
- WAEC Chemistry Mock (120 mins)

### 6. **eBooks (4 books)**
- Advanced Mathematics for SS2
- Physics Fundamentals
- Chemistry Made Easy
- Biology Essentials
- All with thumbnails and download links

### 7. **Video Tutorials (5 videos)**
- Introduction to Calculus
- Understanding Newton's Laws
- Chemical Reactions Explained
- Cell Structure and Function
- Trigonometry Basics
- All with real YouTube links and thumbnails

### 8. **Academic Reports (5-7 reports)**
- First Term Exam results for all subjects
- Mid-Term Assignment scores
- Mock Exam results
- Includes scores, percentages, and grades
- Average score: ~82%

### 9. **Announcements (4 announcements)**
- Welcome message
- New mock exams notification
- Live class schedule update
- Study tips
- All with timestamps

### 10. **Achievements (5 unlocked)**
- 🌟 First Steps - Completed first quiz
- 🏆 Perfect Score - Scored 100%
- 🔥 Study Streak - 7-day streak
- 📹 Video Master - Watched 10 videos
- 👑 Top Performer - Top 10 ranking

### 11. **Badges (6 badges)**
- ✅ Math Genius (100% - Unlocked)
- ✅ Science Explorer (100% - Unlocked)
- ✅ Quick Learner (100% - Unlocked)
- 📚 Bookworm (73% - In Progress)
- 📝 Assignment Pro (56% - In Progress)
- 🎓 Mock Master (40% - In Progress)

### 12. **Leaderboard (10 students)**
1. Sarah Williams - 2680 points (88%)
2. Michael Chen - 2520 points (85%)
3. Demo Student (You) - 2450 points (82%)
4. Amara Okafor - 2390 points (81%)
5. David Johnson - 2310 points (79%)
6. Fatima Ahmed - 2180 points (77%)
7. James Brown - 2050 points (75%)
8. Chioma Nwosu - 1920 points (72%)
9. Emmanuel Adeyemi - 1850 points (70%)
10. Grace Okoro - 1780 points (68%)

### 13. **Community Links**
- WhatsApp Group (enabled)
- Telegram Channel (enabled)

## Testing Functionality

### Dashboard Section
- ✅ View subject count
- ✅ View pending tasks count
- ✅ View study materials count
- ✅ See live classes (with LIVE indicator)
- ✅ View recent announcements

### My Subjects Section
- ✅ View all subjects for SS2 Science
- ✅ Subjects filtered by class level and stream
- ✅ Subject cards with icons and info

### Live Classes Section
- ✅ View live and scheduled classes
- ✅ Join button for live classes
- ✅ Disabled button for scheduled classes

### Quizzes & Assignments Section
- ✅ View all quizzes and assignments
- ✅ See due dates, duration, and marks
- ✅ Start assessment buttons

### Mock Exams Section
- ✅ View WAEC and JAMB mock exams
- ✅ See exam details and duration
- ✅ Start exam buttons

### Study Materials Section
- ✅ Filter by All/eBooks/Videos
- ✅ View book thumbnails and descriptions
- ✅ YouTube video thumbnails
- ✅ Download/Watch buttons

### Reports Section
- ✅ View academic performance table
- ✅ See scores by subject
- ✅ View average and grade
- ✅ Color-coded score badges
- ✅ View achievements table
- ✅ View badges with progress bars
- ✅ View class leaderboard with rankings

### Announcements Section
- ✅ View all announcements
- ✅ See announcement dates
- ✅ Filter by class level

### Community Section
- ✅ View WhatsApp group link
- ✅ View Telegram channel link
- ✅ Click to join communities

## Data Storage

All mock data is stored in `localStorage` with the following keys:
- `brainwave_users` - User accounts
- `brainwave_subjects` - Subjects
- `brainwave_live_classes` - Live classes
- `brainwave_quizs` - Quizzes and assignments
- `brainwave_mocks` - Mock exams
- `brainwave_books` - eBooks
- `brainwave_videos` - Video tutorials
- `brainwave_reports` - Academic reports
- `brainwave_announcements` - Announcements
- `brainwave_achievements` - Achievements
- `brainwave_badges` - Badges
- `brainwave_leaderboard` - Leaderboard data
- `brainwave_community_links` - Community links
- `brainwave_mock_data_generated` - Generation flag
- `brainwave_current_student_id` - Current logged-in student

## Clearing Mock Data

To clear all mock data and start fresh:

### Method 1: Browser Console
```javascript
localStorage.clear()
location.reload()
```

### Method 2: Browser DevTools
1. Open DevTools (F12)
2. Go to Application tab
3. Select Local Storage
4. Right-click and "Clear"
5. Refresh the page

## Notes

- Mock data is designed for **SS2 Science** stream by default
- All dates are dynamically generated relative to current date
- Student codes are randomly generated
- YouTube video links are real educational content
- Google Meet links are sample placeholders
- All data is for testing purposes only

## Troubleshooting

### No Data Showing
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try manual generation via dropdown menu
4. Clear localStorage and reload

### Authentication Issues
1. Ensure a student account exists in localStorage
2. Check `brainwave_current_student_id` is set
3. Regenerate mock data to create sample student

### Filtering Not Working
1. Verify student has classLevel and stream set
2. Check subjects have matching classLevel/stream
3. Regenerate mock data for consistency

## Summary

The student dashboard now has **complete mock data** covering all sections:
- ✅ 6-7 Subjects
- ✅ 2-3 Live Classes
- ✅ 3-4 Quizzes/Assignments
- ✅ 2-3 Mock Exams
- ✅ 4 eBooks
- ✅ 5 Video Tutorials
- ✅ 5-7 Academic Reports
- ✅ 4 Announcements
- ✅ 5 Achievements
- ✅ 6 Badges
- ✅ 10 Leaderboard Students
- ✅ Community Links

**All functionality can now be tested without requiring real data!**
