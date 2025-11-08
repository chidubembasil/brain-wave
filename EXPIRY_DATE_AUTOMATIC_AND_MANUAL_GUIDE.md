# Automatic & Manual Expiry Date Management - Complete Guide

## Overview
This system implements **automatic expiry date calculation** for both students and parents during signup and admin management, while also allowing **manual override** by admins through the subscription management interface.

---

## Features Implemented

### ✅ 1. Automatic Expiry Date on Signup
- **Bootcamp users**: Automatically get 7-day expiry from signup date
- **Both fields set**: `expiry` and `expiryDate` for compatibility
- **Applies to**: Students and Parents

### ✅ 2. Automatic Expiry Date via Admin
- **Payment Status changes**: Auto-calculates expiry when admin changes payment status
- **Plan changes**: Auto-calculates expiry when admin changes subscription plan
- **Smart calculation**: Different logic for bootcamp, paid, and time-based plans

### ✅ 3. Manual Expiry Date Override
- **Subscription modal**: Admins can manually set custom expiry dates
- **Inline editing**: Admins can edit expiry dates directly in the table
- **Override capability**: Manual dates override automatic calculations

### ✅ 4. Dual Storage Sync
- **Both locations updated**: `brainwave_users` and `users` localStorage
- **Consistent data**: All changes reflect in both student and parent dashboards
- **Real-time updates**: Tables refresh immediately after changes

---

## How It Works

### A. Automatic Expiry Calculation During Signup

#### File: `signup.html`

```javascript
// Calculate expiry date for bootcamp (7 days from now)
const bootcampExpiryDate = new Date();
bootcampExpiryDate.setDate(bootcampExpiryDate.getDate() + 7);
const expiryDateString = bootcampExpiryDate.toISOString().split('T')[0];

const userData = {
    // ... other fields
    plan: 'bootcamp',
    status: 'bootcamp',
    paymentStatus: 'bootcamp',
    expiry: expiryDateString,           // Set automatically
    expiryDate: expiryDateString,       // Duplicate for compatibility
    bootcampStartDate: new Date().toISOString().split('T')[0],
    // ... other fields
};
```

**Result**: Every new signup automatically gets an expiry date 7 days in the future.

---

### B. Automatic Expiry via Admin Payment Status Change

#### File: `admin-dashboard.html` - Function: `editUserPaymentStatus()`

```javascript
function editUserPaymentStatus(userId, newPaymentStatus) {
    // ... find user
    
    if (newPaymentStatus === 'paid') {
        // Paid members: No expiry
        user.expiry = null;
        user.expiryDate = null;
        user.status = 'active';
        user.plan = user.plan === 'bootcamp' ? '365' : user.plan;
    } else if (newPaymentStatus === 'bootcamp') {
        // Bootcamp: 7 days from now
        const bootcampExpiry = new Date();
        bootcampExpiry.setDate(bootcampExpiry.getDate() + 7);
        user.expiry = bootcampExpiry.toISOString().split('T')[0];
        user.expiryDate = bootcampExpiry.toISOString().split('T')[0];
        user.status = 'bootcamp';
        user.plan = 'bootcamp';
        user.bootcampStartDate = new Date().toISOString().split('T')[0];
    }
    
    // Update both storage locations
    localStorage.setItem('brainwave_users', JSON.stringify(users));
    localStorage.setItem('users', JSON.stringify(users));
}
```

**Automatic Behavior**:
- **Bootcamp → Paid**: Expiry removed (null), user gets unlimited access
- **Paid → Bootcamp**: Expiry set to 7 days from today

---

### C. Automatic Expiry via Admin Plan Change

#### File: `admin-dashboard.html` - Function: `editUserPlan()`

```javascript
function editUserPlan(userId, newPlan) {
    // ... find user
    
    if (newPlan === 'bootcamp') {
        user.status = 'bootcamp';
        user.paymentStatus = 'bootcamp';
        user.isPaid = false;
        // Set bootcamp expiry to 7 days from now
        const bootcampExpiry = new Date();
        bootcampExpiry.setDate(bootcampExpiry.getDate() + 7);
        user.expiry = bootcampExpiry.toISOString().split('T')[0];
        user.expiryDate = bootcampExpiry.toISOString().split('T')[0];
    } else {
        user.status = 'active';
        const days = parseInt(newPlan);  // e.g., 30, 60, 90
        const date = new Date();
        date.setDate(date.getDate() + days);
        user.expiry = date.toISOString().split('T')[0];
        user.expiryDate = date.toISOString().split('T')[0];
    }
}
```

**Automatic Behavior**:
- **Bootcamp plan**: 7 days from today
- **30-day plan**: 30 days from today
- **60-day plan**: 60 days from today
- **90-day plan**: 90 days from today

---

### D. Manual Expiry Override via Subscription Modal

#### File: `admin-dashboard.html` - Function: `saveSubscription()`

```javascript
function saveSubscription(event) {
    const expiry = document.getElementById('subscription-expiry').value;
    const plan = document.getElementById('subscription-plan').value;
    const paymentStatus = document.getElementById('subscription-payment-status').value;
    
    let expiryDate = expiry;  // Use manual value if provided
    
    if (!expiry) {  // Only auto-calculate if empty
        if (isPaid) {
            expiryDate = null;  // Paid: No expiry
        } else if (plan === 'bootcamp') {
            const date = new Date();
            date.setDate(date.getDate() + 7);
            expiryDate = date.toISOString().split('T')[0];
        } else {
            const days = parseInt(plan);
            const date = new Date();
            date.setDate(date.getDate() + days);
            expiryDate = date.toISOString().split('T')[0];
        }
    }
    
    // Use expiryDate (manual or auto-calculated)
}
```

**Manual Override**:
- Admin selects a date in the "Expiry Date" field
- System uses that date instead of auto-calculating
- If field is empty, system auto-calculates based on plan/payment status

---

### E. Manual Expiry via Inline Table Editing

#### File: `admin-dashboard.html` - Function: `editUserExpiry()`

```javascript
function editUserExpiry(userId, newExpiry) {
    let users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    const userIndex = users.findIndex(u => u.id == userId);
    
    if (userIndex !== -1) {
        const user = users[userIndex];
        user.expiry = newExpiry;
        user.expiryDate = newExpiry;
        
        // Update status based on expiry
        const today = new Date().toISOString().split('T')[0];
        if (newExpiry && newExpiry < today) {
            user.status = 'expired';
        } else if (user.plan !== 'bootcamp') {
            user.status = 'active';
        }
        
        // Update both storage locations
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('brainwave_users', JSON.stringify(users));
        updateUsersTable(users);
        updateSubscriptionTable(users);
    }
}
```

**Manual Editing**:
- Admin clicks on expiry date field in table
- Selects new date
- System updates immediately and reflects in parent dashboard

---

## Parent Dashboard Integration

### How Parents See Expiry Status

#### File: `parent-dashboard.html` - Function: `getChildStatus()`

```javascript
function getChildStatus(child) {
    if (child.accountLocked) {
        return { text: 'LOCKED', class: 'status-locked' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check payment status first
    if (child.paymentStatus === 'paid' || child.isPaid === true) {
        return { text: 'ACTIVE - PAID', class: 'status-active' };
    }
    
    // Check if on bootcamp
    if (child.paymentStatus === 'bootcamp' || child.status === 'bootcamp') {
        if (child.bootcampStartDate) {
            const startDate = new Date(child.bootcampStartDate);
            startDate.setHours(0, 0, 0, 0);
            const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
            
            if (daysPassed >= 7) {
                return { text: 'EXPIRED', class: 'status-expired' };
            }
            return { text: 'ACTIVE - BOOTCAMP', class: 'status-active' };
        }
    }
    
    // Check expiry date
    if (child.expiryDate || child.expiry) {
        const expiryDate = new Date(child.expiryDate || child.expiry);
        expiryDate.setHours(0, 0, 0, 0);
        
        if (expiryDate < today) {
            return { text: 'EXPIRED', class: 'status-expired' };
        }
        return { text: 'ACTIVE', class: 'status-active' };
    }
    
    return { text: 'ACTIVE', class: 'status-active' };
}
```

**Parent View**:
- **ACTIVE - PAID**: No expiry, full access
- **ACTIVE - BOOTCAMP**: Within 7-day trial
- **EXPIRED**: Trial or subscription ended
- **LOCKED**: Account locked by admin

---

## Admin Workflow Examples

### Example 1: Create New Bootcamp User

1. Admin clicks "Manage Subscription"
2. Fills in user details
3. Selects "7-Day Free Bootcamp" plan
4. Selects "Bootcamp" payment status
5. **Leaves expiry date empty**
6. Clicks "Save"

**Result**: System automatically sets expiry to 7 days from today

---

### Example 2: Upgrade User to Paid

1. Admin finds bootcamp user in table
2. Changes "Payment Status" dropdown to "Paid"
3. System automatically:
   - Sets `paymentStatus = 'paid'`
   - Sets `isPaid = true`
   - Sets `expiry = null` (no expiry)
   - Sets `status = 'active'`
   - Upgrades plan to 365 days

**Result**: User becomes paid member with unlimited access

---

### Example 3: Set Custom Expiry Date

1. Admin clicks "Manage Subscription"
2. Fills in user details
3. Selects "30-Day Plan"
4. **Manually selects expiry date** (e.g., 2025-12-31)
5. Clicks "Save"

**Result**: System uses the manual date (2025-12-31) instead of auto-calculating 30 days

---

### Example 4: Edit Expiry Date Inline

1. Admin finds user in Subscription Management table
2. Clicks on the expiry date field
3. Selects new date (e.g., 2025-11-15)
4. System saves immediately

**Result**: Expiry updated to 2025-11-15, reflects in parent dashboard

---

## Data Fields Reference

### User Object Structure

```javascript
{
    id: Number,
    name: String,
    email: String,
    role: 'student' | 'parent' | 'admin',
    
    // Plan & Status
    plan: 'bootcamp' | '30' | '60' | '90' | '365',
    status: 'bootcamp' | 'active' | 'expired',
    planType: 'Individual' | 'Family',
    
    // Payment Status (NEW)
    paymentStatus: 'bootcamp' | 'paid',
    isPaid: Boolean,
    paidDate: String | null,
    
    // Expiry Dates (AUTOMATIC & MANUAL)
    expiry: String | null,              // Format: 'YYYY-MM-DD'
    expiryDate: String | null,          // Duplicate for compatibility
    bootcampStartDate: String | null,   // For bootcamp users
    
    // Account Control
    locked: Boolean,
    accountLocked: Boolean,
    
    // Metadata
    joinDate: String,
    planHistory: Array
}
```

---

## Storage Locations

### Dual Storage System

All user data is stored in **two locations** for compatibility:

1. **`brainwave_users`** - Primary storage
2. **`users`** - Legacy compatibility

**All admin functions update BOTH locations** to ensure consistency.

---

## Testing Checklist

### Test Scenario 1: Automatic Expiry on Signup
- [ ] Student signs up
- [ ] Check localStorage: `expiry` field is set to 7 days from today
- [ ] Parent links to student
- [ ] Parent sees "ACTIVE - BOOTCAMP" status
- [ ] After 7 days, status changes to "EXPIRED"

### Test Scenario 2: Admin Changes Payment Status
- [ ] Admin opens Subscription Management
- [ ] Finds bootcamp user
- [ ] Changes Payment Status to "Paid"
- [ ] Check: `expiry` is now `null`
- [ ] Parent refreshes dashboard
- [ ] Parent sees "ACTIVE - PAID" status

### Test Scenario 3: Admin Changes Plan
- [ ] Admin finds user in table
- [ ] Changes plan from "Bootcamp" to "30-Day Plan"
- [ ] Check: `expiry` is set to 30 days from today
- [ ] Parent sees updated expiry date

### Test Scenario 4: Manual Expiry Override
- [ ] Admin opens "Manage Subscription" modal
- [ ] Fills in user details
- [ ] Manually selects expiry date (e.g., 2025-12-31)
- [ ] Saves subscription
- [ ] Check: `expiry` is '2025-12-31' (not auto-calculated)

### Test Scenario 5: Inline Expiry Edit
- [ ] Admin finds user in table
- [ ] Clicks expiry date field
- [ ] Selects new date
- [ ] Check: Date updates immediately
- [ ] Parent refreshes dashboard
- [ ] Parent sees updated status

---

## Files Modified

### 1. `signup.html`
- **Added**: Automatic 7-day expiry calculation for bootcamp signups
- **Added**: Both `expiry` and `expiryDate` fields
- **Added**: `accountLocked` field

### 2. `admin-dashboard.html`
- **Updated**: `editUserPaymentStatus()` - Auto-calculates expiry based on payment status
- **Updated**: `editUserPlan()` - Auto-calculates expiry based on plan selection
- **Updated**: `editUserExpiry()` - Syncs both storage locations
- **Updated**: `editUserPlanType()` - Uses correct storage and updates both tables
- **Updated**: `toggleUserLock()` - Syncs both storage locations
- **Updated**: `deleteUser()` - Deletes from both storage locations
- **Updated**: `saveSubscription()` - Smart expiry calculation with manual override
- **Updated**: Subscription modal help text to explain auto-calculation

### 3. `parent-dashboard.html`
- **Updated**: `getChildStatus()` - Checks `paymentStatus` and `isPaid` fields
- **Updated**: `calculateParentDaysRemaining()` - Shows "Paid Member - No Expiry"

### 4. `parent-dashboard-modern.html`
- **Updated**: `getChildStatus()` - Same as parent-dashboard.html

### 5. `parent-dashboard-preview.html`
- **Updated**: `getChildStatus()` - Same as parent-dashboard.html

---

## Benefits

### ✅ For Admins
1. **Less manual work**: Expiry dates calculate automatically
2. **Flexibility**: Can override with custom dates when needed
3. **Consistency**: All changes sync across system
4. **Real-time updates**: Tables refresh immediately
5. **Clear feedback**: Alerts show what was changed

### ✅ For Parents
1. **Accurate status**: Always see current subscription status
2. **Clear indicators**: Visual badges show payment type
3. **Real-time reflection**: Changes from admin appear immediately
4. **Multiple children**: Each child's status tracked separately

### ✅ For Students
1. **Automatic access control**: Content filtering based on payment status
2. **Clear expiry**: Know when trial or subscription ends
3. **Seamless upgrades**: Instant access when upgraded to paid

---

## Troubleshooting

### Issue: Expiry date not auto-calculating
**Solution**: 
- Ensure expiry field is left empty in modal
- Check browser console for errors
- Verify plan and payment status are selected

### Issue: Changes not reflecting in parent dashboard
**Solution**:
- Parent should refresh the page
- Check if both `brainwave_users` and `users` are updated
- Verify user ID matches between parent and child

### Issue: Manual date being overridden
**Solution**:
- Ensure you're entering the date BEFORE saving
- Check that the date field has a value when form submits
- Verify the date is in correct format (YYYY-MM-DD)

### Issue: Table not updating after edit
**Solution**:
- Check browser console for errors
- Verify `updateUsersTable()` and `updateSubscriptionTable()` are called
- Try refreshing the page manually

---

## Summary

This implementation provides a **dual-mode expiry date system**:

1. **Automatic Mode** (Default)
   - Bootcamp: 7 days from action date
   - Paid: No expiry (null)
   - Time-based plans: Plan duration from action date

2. **Manual Mode** (Override)
   - Admin can set custom expiry dates
   - Manual dates override automatic calculation
   - Inline editing for quick changes

**Key Features**:
- ✅ Works for both students and parents
- ✅ Automatic calculation on signup
- ✅ Automatic calculation on admin changes
- ✅ Manual override capability
- ✅ Dual storage sync
- ✅ Real-time parent dashboard reflection
- ✅ Backward compatible with existing data

The system ensures that expiry dates are always set correctly, whether automatically or manually, and that all changes reflect immediately across the entire platform.
