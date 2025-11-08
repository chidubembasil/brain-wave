# Testing Guide: Paid/Bootcamp Content Filtering System

## Quick Test Scenarios

### Scenario 1: New Student Registration (Bootcamp)
**Steps:**
1. Open `signup.html`
2. Fill in registration form as a student
3. Complete signup
4. Navigate to student dashboard

**Expected Results:**
- ✅ Student profile shows "Bootcamp" badge (orange/amber color)
- ✅ "Upgrade Plan" button is visible in profile dropdown
- ✅ Student can only see content marked as "bootcamp"
- ✅ Paid content is filtered out and not visible

**Verification:**
```javascript
// Check in browser console
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log('Payment Status:', user.paymentStatus); // Should be 'bootcamp'
console.log('Is Paid:', user.isPaid); // Should be false
```

---

### Scenario 2: Student Upgrades to Paid
**Steps:**
1. Login as bootcamp student
2. Click profile avatar (top right)
3. Click "Upgrade Plan" button
4. Confirm upgrade in dialog
5. Wait for success message

**Expected Results:**
- ✅ Badge changes to "Paid Member" (green color)
- ✅ "Upgrade Plan" button disappears
- ✅ Success toast notification appears
- ✅ All content (bootcamp + paid) becomes visible
- ✅ Content list refreshes automatically

**Verification:**
```javascript
// Check in browser console
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log('Payment Status:', user.paymentStatus); // Should be 'paid'
console.log('Is Paid:', user.isPaid); // Should be true
console.log('Paid Date:', user.paidDate); // Should have today's date
```

---

### Scenario 3: Admin Creates Bootcamp Content
**Steps:**
1. Login to admin dashboard
2. Navigate to "Assessments" or "Content" section
3. Click "Create Quiz" (or Add Book/Video)
4. Fill in all required fields
5. Set "Access Level" to "Bootcamp (Free 7-day trial)"
6. Save content

**Expected Results:**
- ✅ Content is created with `accessLevel: 'bootcamp'`
- ✅ Content appears in admin list
- ✅ Bootcamp students can see this content
- ✅ Paid students can also see this content

**Verification:**
```javascript
// Check in browser console
const quizzes = JSON.parse(localStorage.getItem('brainwave_quizs'));
console.log('Latest quiz:', quizzes[quizzes.length - 1]);
// Should have accessLevel: 'bootcamp'
```

---

### Scenario 4: Admin Creates Paid Content
**Steps:**
1. Login to admin dashboard
2. Navigate to "Assessments" or "Content" section
3. Click "Create Assignment" (or Add Book/Video)
4. Fill in all required fields
5. Set "Access Level" to "Paid Members Only"
6. Save content

**Expected Results:**
- ✅ Content is created with `accessLevel: 'paid'`
- ✅ Content appears in admin list
- ✅ Bootcamp students CANNOT see this content
- ✅ Paid students CAN see this content

**Verification:**
```javascript
// Check in browser console
const quizzes = JSON.parse(localStorage.getItem('brainwave_quizs'));
console.log('Latest assignment:', quizzes[quizzes.length - 1]);
// Should have accessLevel: 'paid'
```

---

### Scenario 5: Content Filtering Verification
**Steps:**
1. Create 2 quizzes: one bootcamp, one paid
2. Login as bootcamp student
3. Navigate to Quizzes section
4. Count visible quizzes
5. Upgrade to paid
6. Count visible quizzes again

**Expected Results:**
- ✅ Before upgrade: Only bootcamp quiz visible (1 quiz)
- ✅ After upgrade: Both quizzes visible (2 quizzes)
- ✅ Console logs show filtering logic working

**Verification:**
```javascript
// Check filtering in browser console (as bootcamp student)
const student = JSON.parse(localStorage.getItem('currentUser'));
const quizzes = JSON.parse(localStorage.getItem('brainwave_quizs'));

const filtered = quizzes.filter(q => {
    const isPaid = student.isPaid || student.paymentStatus === 'paid';
    const accessLevel = q.accessLevel || 'bootcamp';
    return isPaid || accessLevel === 'bootcamp';
});

console.log('Total quizzes:', quizzes.length);
console.log('Visible quizzes:', filtered.length);
```

---

## Content Types to Test

### ✅ Quizzes
- Location: Student Dashboard → Quizzes & Assignments
- Admin: Assessments → Quizzes tab
- Access level dropdown: ✓

### ✅ Assignments
- Location: Student Dashboard → Quizzes & Assignments
- Admin: Assessments → Assignments tab
- Access level dropdown: ✓

### ✅ Mock Exams
- Location: Student Dashboard → Mock Exams
- Admin: Assessments → Mock Exams tab
- Access level dropdown: ✓

### ✅ eBooks
- Location: Student Dashboard → Study Materials → Books
- Admin: Content → Books tab
- Access level dropdown: ✓

### ✅ Videos
- Location: Student Dashboard → Study Materials → Videos
- Admin: Content → Videos tab
- Access level dropdown: ✓

### ✅ Live Classes
- Location: Student Dashboard → Live Classes
- Admin: Live Classes section
- Access level dropdown: ✓

---

## Edge Cases to Test

### Edge Case 1: Existing Users (No Payment Status)
**Issue:** Users created before this implementation won't have payment fields

**Solution:** The code handles this with defaults:
```javascript
const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
// If both are undefined, isPaid = false (treated as bootcamp)
```

**Test:**
1. Clear localStorage
2. Manually create old user format (without isPaid/paymentStatus)
3. Login and verify they're treated as bootcamp

---

### Edge Case 2: Content Without Access Level
**Issue:** Existing content won't have `accessLevel` field

**Solution:** Defaults to 'bootcamp':
```javascript
const accessLevel = content.accessLevel || 'bootcamp';
```

**Test:**
1. Manually create content without accessLevel
2. Verify bootcamp students can see it
3. Verify paid students can also see it

---

### Edge Case 3: Multiple Upgrades
**Issue:** Student tries to upgrade multiple times

**Solution:** Upgrade button is hidden after first upgrade

**Test:**
1. Upgrade once
2. Verify button disappears
3. Check planHistory has upgrade record

---

## Browser Console Commands for Testing

### Check Current User Status
```javascript
const user = JSON.parse(localStorage.getItem('currentUser'));
console.table({
    Name: user.name,
    Status: user.paymentStatus,
    IsPaid: user.isPaid,
    Plan: user.plan,
    PaidDate: user.paidDate
});
```

### List All Content with Access Levels
```javascript
const quizzes = JSON.parse(localStorage.getItem('brainwave_quizs') || '[]');
const books = JSON.parse(localStorage.getItem('brainwave_books') || '[]');
const videos = JSON.parse(localStorage.getItem('brainwave_videos') || '[]');
const liveClasses = JSON.parse(localStorage.getItem('brainwave_live_classes') || '[]');

console.log('Quizzes:', quizzes.map(q => ({ title: q.title, access: q.accessLevel })));
console.log('Books:', books.map(b => ({ title: b.title, access: b.accessLevel })));
console.log('Videos:', videos.map(v => ({ title: v.title, access: v.accessLevel })));
console.log('Live Classes:', liveClasses.map(l => ({ title: l.topic, access: l.accessLevel })));
```

### Manually Upgrade User (Quick Test)
```javascript
const users = JSON.parse(localStorage.getItem('brainwave_users'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

currentUser.isPaid = true;
currentUser.paymentStatus = 'paid';
currentUser.paidDate = new Date().toISOString().split('T')[0];

// Update in users array
const index = users.findIndex(u => u.id === currentUser.id);
users[index] = currentUser;

localStorage.setItem('brainwave_users', JSON.stringify(users));
localStorage.setItem('currentUser', JSON.stringify(currentUser));

console.log('✅ User upgraded! Refresh page to see changes.');
```

### Reset User to Bootcamp (Quick Test)
```javascript
const users = JSON.parse(localStorage.getItem('brainwave_users'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

currentUser.isPaid = false;
currentUser.paymentStatus = 'bootcamp';
currentUser.paidDate = null;

// Update in users array
const index = users.findIndex(u => u.id === currentUser.id);
users[index] = currentUser;

localStorage.setItem('brainwave_users', JSON.stringify(users));
localStorage.setItem('currentUser', JSON.stringify(currentUser));

console.log('✅ User reset to bootcamp! Refresh page to see changes.');
```

---

## Visual Indicators to Check

### Student Dashboard
- **Profile Dropdown:**
  - [ ] Payment badge visible
  - [ ] Badge color correct (orange for bootcamp, green for paid)
  - [ ] Badge text correct ("Bootcamp" or "Paid Member")
  - [ ] Upgrade button shows/hides correctly

### Admin Dashboard
- **Content Forms:**
  - [ ] Access Level dropdown present in quiz form
  - [ ] Access Level dropdown present in assignment form
  - [ ] Access Level dropdown present in mock exam form
  - [ ] Access Level dropdown present in book form
  - [ ] Access Level dropdown present in video form
  - [ ] Access Level dropdown present in live class form
  - [ ] Info text explaining access levels is visible

---

## Success Criteria

✅ **All tests pass when:**
1. New students are automatically bootcamp members
2. Bootcamp students only see bootcamp content
3. Paid students see all content
4. Upgrade process works smoothly
5. Admin can set access levels for all content types
6. Access levels persist in localStorage
7. Filtering works across all content sections
8. UI updates correctly after upgrade
9. No console errors during any operation
10. Documentation is clear and complete

---

## Troubleshooting

### Issue: Content not filtering
**Check:**
- Is `accessLevel` field present in content?
- Is student's `isPaid` or `paymentStatus` set correctly?
- Are you checking the right localStorage keys?

### Issue: Upgrade button not working
**Check:**
- Is `upgradeToPayment()` function defined?
- Check browser console for errors
- Verify event listener is attached

### Issue: Badge not showing
**Check:**
- Is `dropdownPaymentBadge` element present in HTML?
- Is `updateStudentInfo()` being called?
- Check CSS classes are defined

---

## Next Steps After Testing

1. ✅ Verify all scenarios pass
2. ✅ Test with multiple users
3. ✅ Test across different browsers
4. ✅ Document any issues found
5. ✅ Consider adding payment gateway integration
6. ✅ Add analytics tracking for upgrades
7. ✅ Consider email notifications for upgrades
8. ✅ Add admin reports for paid vs bootcamp users
