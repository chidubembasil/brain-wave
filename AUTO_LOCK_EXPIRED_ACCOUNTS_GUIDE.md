# Automatic Account Lockout on Expiry - Complete Guide

## Overview
The system now automatically locks out users (both students and parents) when their subscription expiry date passes. This ensures that expired accounts cannot access the platform until their subscription is renewed or extended by an admin.

---

## How It Works

### Automatic Lockout Triggers

The system checks expiry dates and automatically locks accounts at **three key points**:

1. **During Login** (`login.html`)
2. **On Student Dashboard Load** (`student-dashboard.js`)
3. **On Parent Dashboard Load** (`parent-dashboard.html`)

---

## Implementation Details

### 1. Login Page Auto-Lock

**File**: `login.html`

When a user attempts to log in, the system:
1. Checks if the user has an expiry date (`expiry` or `expiryDate`)
2. Compares expiry date with today's date
3. If expiry date has passed:
   - Sets `locked = true`
   - Sets `accountLocked = true`
   - Sets `status = 'expired'`
   - Sets `lockedReason = 'Subscription expired'`
   - Records `lockedAt` timestamp
   - Updates both storage locations
   - Prevents login and shows error message

```javascript
// Check and auto-lock expired accounts
const today = new Date();
today.setHours(0, 0, 0, 0);

if (user.expiry || user.expiryDate) {
    const expiryDate = new Date(user.expiry || user.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);
    
    // If expiry date has passed, automatically lock the account
    if (expiryDate < today && !user.locked) {
        user.locked = true;
        user.accountLocked = true;
        user.status = 'expired';
        user.lockedReason = 'Subscription expired';
        user.lockedAt = new Date().toISOString();
        
        // Update in storage
        users[userIndex] = user;
        localStorage.setItem('brainwave_users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Check if account is locked
if (user.locked || user.accountLocked) {
    const reason = user.lockedReason || 'Your account has been locked';
    alert(`${reason}. Please contact the administrator or renew your subscription.`);
    return;
}
```

---

### 2. Student Dashboard Auto-Lock

**File**: `student-dashboard.js` - Function: `checkAuthentication()`

When a student accesses their dashboard, the system:
1. Loads student data from localStorage
2. Checks expiry date against today's date
3. If expired:
   - Locks the account automatically
   - Updates storage
   - Logs the student out immediately
   - Shows expiry message

```javascript
// Check and auto-lock expired accounts
const today = new Date();
today.setHours(0, 0, 0, 0);

if (currentStudent.expiry || currentStudent.expiryDate) {
    const expiryDate = new Date(currentStudent.expiry || currentStudent.expiryDate);
    expiryDate.setHours(0, 0, 0, 0);
    
    // If expiry date has passed, automatically lock the account
    if (expiryDate < today && !currentStudent.locked) {
        currentStudent.locked = true;
        currentStudent.accountLocked = true;
        currentStudent.status = 'expired';
        currentStudent.lockedReason = 'Subscription expired';
        currentStudent.lockedAt = new Date().toISOString();
        
        // Update in storage
        users[userIndex] = currentStudent;
        localStorage.setItem('brainwave_users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Your subscription has expired and your account has been locked. Please contact the administrator or renew your subscription.');
        logout();
        return;
    }
}
```

---

### 3. Parent Dashboard Auto-Lock

**File**: `parent-dashboard.html` - Function: `loadParentData()`

When a parent accesses their dashboard, the system:
1. Loads parent data from localStorage
2. Checks expiry date against today's date
3. If expired:
   - Locks the parent account automatically
   - Updates storage
   - Logs the parent out immediately
   - Shows expiry message

```javascript
// Check and auto-lock expired parent accounts
let users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
const parentIndex = users.findIndex(u => u.email === currentParent.email && u.role === 'parent');

if (parentIndex !== -1) {
    const parentUser = users[parentIndex];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (parentUser.expiry || parentUser.expiryDate) {
        const expiryDate = new Date(parentUser.expiry || parentUser.expiryDate);
        expiryDate.setHours(0, 0, 0, 0);
        
        // If expiry date has passed, automatically lock the account
        if (expiryDate < today && !parentUser.locked) {
            parentUser.locked = true;
            parentUser.accountLocked = true;
            parentUser.status = 'expired';
            parentUser.lockedReason = 'Subscription expired';
            parentUser.lockedAt = new Date().toISOString();
            
            // Update in storage
            users[parentIndex] = parentUser;
            localStorage.setItem('brainwave_users', JSON.stringify(users));
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Your subscription has expired and your account has been locked. Please contact the administrator or renew your subscription.');
            logout();
            return;
        }
    }
}
```

---

## Expiry Date Examples

### 7-Day Bootcamp Plan
- **Signup Date**: 2025-10-10
- **Expiry Date**: 2025-10-17 (7 days later)
- **Auto-Lock Date**: 2025-10-18 (day after expiry)

### 30-Day Plan
- **Activation Date**: 2025-10-10
- **Expiry Date**: 2025-11-09 (30 days later)
- **Auto-Lock Date**: 2025-11-10 (day after expiry)

### 60-Day Plan
- **Activation Date**: 2025-10-10
- **Expiry Date**: 2025-12-09 (60 days later)
- **Auto-Lock Date**: 2025-12-10 (day after expiry)

### 90-Day Plan
- **Activation Date**: 2025-10-10
- **Expiry Date**: 2026-01-08 (90 days later)
- **Auto-Lock Date**: 2026-01-09 (day after expiry)

### Paid Members
- **Expiry Date**: `null` (no expiry)
- **Auto-Lock**: Never (unless manually locked by admin)

---

## User Experience Flow

### Scenario 1: Bootcamp User (7-Day Trial)

**Day 1-7**: User has full access
- Status: "ACTIVE - BOOTCAMP"
- Can login and use platform

**Day 8+**: Subscription expired
- **Login Attempt**: Account auto-locked, cannot login
- **Already Logged In**: Kicked out on dashboard load
- **Message**: "Your subscription has expired and your account has been locked. Please contact the administrator or renew your subscription."

---

### Scenario 2: 30-Day Plan User

**Day 1-30**: User has full access
- Status: "ACTIVE"
- Can login and use platform

**Day 31+**: Subscription expired
- **Login Attempt**: Account auto-locked, cannot login
- **Already Logged In**: Kicked out on dashboard load
- **Message**: "Your subscription has expired and your account has been locked."

---

### Scenario 3: Paid Member

**Anytime**: Unlimited access
- Status: "ACTIVE - PAID"
- Expiry: `null`
- **Never auto-locked** (only manual lock by admin)

---

## Admin Unlocking Process

### How Admins Can Unlock Expired Accounts

1. **Option 1: Change Payment Status to Paid**
   - Go to Subscription Management
   - Find the locked user
   - Change "Payment Status" to "Paid"
   - System automatically:
     - Sets `locked = false`
     - Sets `accountLocked = false`
     - Sets `expiry = null`
     - Sets `status = 'active'`
     - User can now login

2. **Option 2: Extend Expiry Date**
   - Go to Subscription Management
   - Find the locked user
   - Click on expiry date field
   - Set new future date
   - Manually uncheck "Lock Account" toggle
   - User can now login

3. **Option 3: Change Plan**
   - Go to Subscription Management
   - Find the locked user
   - Change plan (e.g., 30-day, 60-day, 90-day)
   - System automatically extends expiry
   - Manually uncheck "Lock Account" toggle
   - User can now login

---

## Data Fields Added

### New Lock-Related Fields

```javascript
{
    // Existing fields
    expiry: String | null,              // Expiry date (YYYY-MM-DD)
    expiryDate: String | null,          // Duplicate for compatibility
    
    // Lock fields
    locked: Boolean,                    // Account lock status
    accountLocked: Boolean,             // Duplicate for compatibility
    lockedReason: String,               // Why account was locked
    lockedAt: String,                   // ISO timestamp of when locked
    
    // Status
    status: 'bootcamp' | 'active' | 'expired'
}
```

---

## Testing Checklist

### Test Scenario 1: Bootcamp Expiry
- [ ] Create bootcamp user with expiry 7 days from today
- [ ] User can login and access dashboard
- [ ] Manually change expiry date to yesterday in localStorage
- [ ] Try to login → Should be auto-locked
- [ ] Check localStorage: `locked = true`, `lockedReason = 'Subscription expired'`

### Test Scenario 2: Already Logged In User
- [ ] Login as bootcamp user
- [ ] Access dashboard successfully
- [ ] Manually change expiry date to yesterday in localStorage
- [ ] Refresh dashboard → Should be kicked out
- [ ] Try to login again → Should show locked message

### Test Scenario 3: Parent Account Expiry
- [ ] Create parent with expiry date in past
- [ ] Try to login → Should be auto-locked
- [ ] Check parent dashboard → Should redirect to login

### Test Scenario 4: Admin Unlocking
- [ ] Find locked user in admin dashboard
- [ ] Change payment status to "Paid"
- [ ] User should be able to login again
- [ ] Check: `locked = false`, `expiry = null`

### Test Scenario 5: Paid Member Never Locks
- [ ] Create paid member (`paymentStatus = 'paid'`, `expiry = null`)
- [ ] User can login anytime
- [ ] Never gets auto-locked

---

## Benefits

### ✅ For Platform Security
1. **Automatic enforcement**: No manual intervention needed
2. **Consistent policy**: All expired accounts are locked
3. **Fair access control**: Only active subscribers can access

### ✅ For Admins
1. **Less manual work**: System handles expiry automatically
2. **Clear audit trail**: `lockedAt` and `lockedReason` fields
3. **Easy unlocking**: Multiple options to restore access

### ✅ For Users
1. **Clear messaging**: Know exactly why account is locked
2. **Fair warning**: Can see expiry date before it happens
3. **Easy renewal**: Contact admin or renew subscription

---

## Important Notes

### 1. Expiry Date Comparison
- Uses **midnight (00:00:00)** for date comparison
- Account expires at **end of expiry date**
- Auto-lock happens **day after expiry**

### 2. Paid Members Exception
- Paid members have `expiry = null`
- They are **never auto-locked**
- Only manual admin lock can restrict them

### 3. Storage Sync
- All locks update **both** storage locations:
  - `brainwave_users`
  - `users`
- Ensures consistency across system

### 4. Lock Reason Tracking
- `lockedReason` field explains why account was locked
- `lockedAt` timestamp records when it happened
- Helps admins understand lock history

---

## Files Modified

1. **`login.html`**
   - Added expiry check before login
   - Auto-locks expired accounts
   - Shows appropriate error messages

2. **`student-dashboard.js`**
   - Added expiry check in `checkAuthentication()`
   - Auto-locks and logs out expired students
   - Updates storage on lock

3. **`parent-dashboard.html`**
   - Added expiry check in `loadParentData()`
   - Auto-locks and logs out expired parents
   - Updates storage on lock

---

## Summary

The automatic account lockout system ensures that:

✅ **7-day bootcamp users** are locked out after 7 days
✅ **30/60/90-day plan users** are locked out after their plan expires
✅ **Paid members** never get auto-locked (expiry = null)
✅ **Both students and parents** are subject to auto-lock
✅ **Locks happen automatically** at login or dashboard load
✅ **Admins can easily unlock** by extending expiry or upgrading to paid
✅ **Clear messaging** tells users why they're locked out
✅ **Audit trail** tracks when and why accounts were locked

This creates a **fair, automatic, and enforceable** subscription system that protects platform access while giving admins full control to manage exceptions.
