# Parent Dashboard - Complete Guide

## Overview
The Parent Dashboard is a simplified, status-focused interface that allows parents to monitor their children's academic progress, attendance, and subscription status. It eliminates complex live syncing in favor of official report snapshots.

---

## Key Features

### 1. **Access Status Header (Top Section)**
The top header provides immediate confirmation of the child's access and subscription status.

#### Components:
- **Tracking Header**: Shows "Tracking: [Child's Name] ([Class Level])"
  - Example: `Tracking: Sarah Adekunle (SS2)`
  
- **Account Status Badge**: Color-coded tag showing current access status
  - **ACTIVE** (Green) - Child has active access
  - **EXPIRED** (Red) - Subscription has expired
  - **LOCKED** (Yellow/Orange) - Account is locked by admin

- **Hamburger Menu Button**: Opens the navigation menu

---

### 2. **Hamburger Menu Navigation**
A slide-in menu that opens from the left side of the screen.

#### Menu Items:
- **Dashboard Overview** - Main dashboard view
- **Academic Reports** - View detailed academic reports
- **Attendance** - Check attendance records
- **Assessments** - View assessment results
- **Subjects** - See enrolled subjects
- **Subscription** - Manage subscription details
- **Link New Child** - Add another child to the account
- **Settings** - Account settings
- **Logout** - Sign out of the dashboard

#### Features:
- Click hamburger icon (☰) to open
- Click X or overlay to close
- Smooth slide-in/out animation
- Menu overlay darkens background when open

---

### 3. **Child Switcher Section**
Allows parents to switch between multiple children's accounts.

#### Features:
- **Grid Layout**: Shows all linked children in card format
- **Child Cards Display**:
  - Avatar with initials
  - Full name
  - Class level
  - Mini status badge (Active/Expired/Locked)
  
- **Active Child Highlighting**: 
  - Selected child card has blue gradient background
  - White text for better contrast
  
- **Add Child Button**: 
  - Green button to link additional children
  - Redirects to `parent-link-children.html`

#### How to Switch:
1. Click on any child card
2. Dashboard automatically updates to show selected child's data
3. Header updates with new child's name and status

---

### 4. **Academic Overview Section**
Displays snapshot reports of the child's academic performance.

#### Report Cards Include:
1. **Overall Performance**
   - Average score percentage
   - Class rank
   
2. **Attendance**
   - Days present this month
   - Days absent this month
   
3. **Assessments**
   - Completed assessments (last 30 days)
   - Pending assessments

#### Features:
- Grid layout (responsive)
- Color-coded stats
- Date/period indicators
- Easy-to-read metrics

---

### 5. **Quick Actions**
Four primary action buttons for common tasks:

1. **View Full Report** - Opens detailed academic report
2. **Download Report** - Downloads PDF report (coming soon)
3. **Contact Teacher** - Message teacher directly (coming soon)
4. **View Schedule** - See child's class schedule (coming soon)

---

### 6. **Recent Activity Section**
Shows the child's latest activities on the platform.

#### Activity Types:
- Completed quizzes/assessments
- Started assignments
- Attended live classes
- Submitted homework

#### Display Format:
- Icon with color coding
- Activity description
- Time stamp (e.g., "2 hours ago")

---

## Data Flow & Integration

### Parent-Child Linking
1. Parent signs up with role: `parent`
2. Parent links children using unique student codes
3. System stores relationship:
   ```javascript
   {
     parentId: parent.id,
     children: [
       {
         studentId: student.id,
         studentName: student.name,
         studentCode: student.studentCode,
         classLevel: student.classLevel,
         stream: student.stream
       }
     ]
   }
   ```

### Status Calculation
The dashboard calculates child status based on:

1. **Account Lock Status** (`accountLocked`)
   - If true → LOCKED status
   
2. **Bootcamp Status** (`status === 'bootcamp'`)
   - Checks days since `bootcampStartDate`
   - If ≥ 7 days → EXPIRED
   - If < 7 days → ACTIVE
   
3. **Expiry Date** (`expiryDate`)
   - Compares with current date
   - If past → EXPIRED
   - If future → ACTIVE

### Data Sources
- **User Data**: `localStorage.getItem('users')`
- **Current Parent**: `localStorage.getItem('currentUser')`
- **Children**: Filtered from users where `parentId === currentParent.id`

---

## User Flow

### First Time Access
1. Parent logs in
2. If no children linked → Shows empty state
3. Parent clicks "Add Child" button
4. Redirects to `parent-link-children.html`
5. Parent enters child's student code
6. System validates and links child
7. Returns to dashboard with child data

### Regular Access
1. Parent logs in
2. Dashboard loads with first child selected
3. Parent can switch between children
4. View reports and status
5. Use quick actions as needed

---

## Responsive Design

### Desktop (>768px)
- Full sidebar menu
- Multi-column grid layouts
- All features visible

### Mobile (<768px)
- Hamburger menu collapses
- Single column layouts
- Stacked child cards
- Touch-friendly buttons

---

## Color Coding System

### Status Colors
- **Green (#10b981)**: Active/Success
- **Red (#ef4444)**: Expired/Danger
- **Yellow (#fbbf24)**: Locked/Warning
- **Blue (#1e3a8a)**: Primary/Info

### Visual Hierarchy
- Primary gradient: Blue gradient background
- Accent color: Yellow (#fbbf24)
- Neutral grays: For text and borders

---

## Security & Access Control

### Authentication Check
```javascript
if (!currentParent.email || currentParent.role !== 'parent') {
    alert('Please login as a parent to access this dashboard');
    window.location.href = 'login.html';
}
```

### Data Privacy
- Parents only see their linked children
- No access to other students' data
- Secure localStorage implementation

---

## Future Enhancements (Placeholders)

The following features show alerts indicating "coming soon":
1. Download PDF reports
2. Contact teacher messaging
3. View class schedule
4. Detailed section navigation (Reports, Attendance, etc.)

These can be implemented by:
- Creating dedicated section pages
- Implementing PDF generation
- Adding messaging system
- Integrating calendar/schedule view

---

## File Structure

```
parent-dashboard.html          # Main dashboard file
parent-link-children.html      # Child linking page
login.html                     # Parent login page
signup.html                    # Parent signup page
```

---

## Key Functions Reference

### Core Functions
- `loadParentData()` - Loads current parent from localStorage
- `loadChildren()` - Fetches all linked children
- `switchToChild(child)` - Switches active child view
- `getChildStatus(child)` - Calculates child's status
- `loadChildData(child)` - Loads child's academic data

### Menu Functions
- `toggleMenu()` - Opens/closes hamburger menu
- `closeMenu()` - Closes menu
- `showSection(section)` - Navigation handler

### Action Functions
- `viewFullReport()` - View detailed report
- `downloadReport()` - Download PDF
- `contactTeacher()` - Message teacher
- `viewSchedule()` - View schedule
- `logout()` - Sign out

---

## Styling Variables

```css
--primary-gradient: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
--primary-color: #1e3a8a;
--accent-color: #fbbf24;
--success-color: #10b981;
--danger-color: #ef4444;
--warning-color: #f59e0b;
```

---

## Testing Checklist

- [ ] Parent login redirects to dashboard
- [ ] Empty state shows when no children linked
- [ ] Child cards display correctly
- [ ] Switching between children updates header
- [ ] Status badges show correct colors
- [ ] Hamburger menu opens/closes smoothly
- [ ] Menu overlay closes menu when clicked
- [ ] Quick actions show appropriate alerts
- [ ] Responsive design works on mobile
- [ ] Logout functionality works

---

## Common Issues & Solutions

### Issue: No children showing
**Solution**: Ensure children are properly linked with `parentId` matching parent's `id`

### Issue: Status showing incorrectly
**Solution**: Check `bootcampStartDate`, `expiryDate`, and `accountLocked` fields

### Issue: Menu not opening
**Solution**: Verify hamburger button onclick handler and menu element IDs

### Issue: Child data not loading
**Solution**: Ensure student data exists in localStorage users array

---

## Integration with Existing System

The Parent Dashboard integrates with:
1. **Signup System** - Parents sign up with role: 'parent'
2. **Child Linking** - Uses `parent-link-children.html`
3. **Subscription Management** - Reads subscription status from admin dashboard data
4. **Student Data** - Accesses student records for reports

Follows the same data structure established in memories:
- User object format from signup integration
- Subscription status from admin dashboard
- Subject management from content system

---

## Summary

The Parent Dashboard provides a clean, simple interface for parents to:
✅ Monitor child's subscription status at a glance
✅ Switch between multiple children easily
✅ View academic performance snapshots
✅ Access quick actions for common tasks
✅ Navigate through hamburger menu
✅ Link additional children as needed

The design prioritizes simplicity and clarity over complex real-time features, making it ideal for busy parents who need quick status updates.
