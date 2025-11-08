# Plan Type and Days Plan Display Update

## Summary
Successfully added plan type and days plan display to both student and parent dashboards, providing real-time subscription status information.

## Changes Made

### 1. Student Dashboard (`student-dashboard.html` & `student-dashboard.js`)

#### HTML Changes:
- **Added CSS for Days Display**: Created `.dropdown-days` class with styling for the subscription days indicator
- **Added Days Display Element**: Added `<div class="dropdown-days" id="dropdownDays"></div>` in the profile dropdown header

#### JavaScript Changes:
- **Enhanced `updateStudentInfo()` function**: 
  - Now calls `calculateDaysRemaining()` to get subscription status
  - Displays days remaining with color-coded badges (green for safe, orange for warning, red for urgent)
  - Automatically hides the display if no expiry information is available

- **Added `calculateDaysRemaining()` function**:
  - Calculates remaining days for bootcamp users (7-day trial)
  - Calculates remaining days for subscribed users based on expiry date
  - Returns color-coded information:
    - **Green**: More than 7 days remaining / More than 2 days in trial
    - **Orange**: 7 days or less remaining / 2 days or less in trial
    - **Red**: Expired or expiring today
  - Displays appropriate messages:
    - "X day(s) left in trial" for bootcamp users
    - "X day(s) remaining" for subscribed users
    - "Trial expired" / "Subscription expired" for expired accounts
    - "Expires today" for accounts expiring on current day

### 2. Parent Dashboard (`parent-dashboard.html`)

#### HTML Changes:
- **Added Plan Type Display**: 
  - Shows parent's subscription plan (Individual/Family)
  - Styled with crown icon and semi-transparent white background
  - Located in the welcome section below parent name

- **Added Days Plan Display**:
  - Shows remaining days in subscription
  - Styled with calendar icon and color-coded background
  - Dynamically shows/hides based on subscription status
  - Color-coded backgrounds:
    - Green (rgba(16, 185, 129, 0.3)): Safe period
    - Orange (rgba(245, 158, 11, 0.3)): Warning period (≤7 days)
    - Red (rgba(239, 68, 68, 0.3)): Urgent/Expired

#### JavaScript Changes:
- **Added `updateParentPlanInfo()` function**:
  - Fetches parent user data from `brainwave_users` localStorage
  - Updates plan type display (Individual/Family)
  - Calls `calculateParentDaysRemaining()` for subscription status
  - Applies color-coded backgrounds based on urgency

- **Added `calculateParentDaysRemaining()` function**:
  - Same logic as student dashboard
  - Calculates bootcamp trial days (7-day period)
  - Calculates subscription expiry days
  - Returns urgency flags (urgent/warning) for color coding

- **Enhanced `updateWelcomeSection()` function**:
  - Now calls `updateParentPlanInfo()` to display plan and days information

## Features

### Student Dashboard Features:
1. **Plan Type Display**: Shows subscription plan type in profile dropdown
2. **Days Remaining Badge**: Color-coded badge showing subscription status
3. **Automatic Updates**: Updates in real-time based on user data
4. **Smart Hiding**: Only shows when subscription has expiry information

### Parent Dashboard Features:
1. **Plan Type Badge**: Displays parent's subscription plan with crown icon
2. **Days Remaining Badge**: Shows subscription status with calendar icon
3. **Color-Coded Alerts**: Visual indicators for subscription urgency
4. **Responsive Design**: Badges adapt to different screen sizes

## Data Structure Requirements

Both dashboards expect user objects with the following fields:
- `planType`: 'individual' or 'family'
- `status`: 'bootcamp', 'active', 'expired', or 'locked'
- `plan`: 'bootcamp' or subscription plan name
- `bootcampStartDate`: ISO date string for trial start
- `expiry`: ISO date string for subscription expiration

## Integration with Existing Systems

This update integrates seamlessly with:
- **Subscription Management System**: Uses same data structure from admin dashboard
- **Bootcamp Trial System**: Displays 7-day trial countdown
- **Plan Change Tracking**: Reflects current plan type from subscription management
- **User Authentication**: Pulls data from `brainwave_users` localStorage

## Visual Indicators

### Color Coding:
- **Green (#10b981)**: Safe period (>7 days remaining or >2 days in trial)
- **Orange (#f59e0b)**: Warning period (≤7 days remaining or ≤2 days in trial)
- **Red (#ef4444)**: Urgent/Expired (0 days or negative)

### Display Messages:
- "X day(s) left in trial" - Bootcamp users
- "X day(s) remaining" - Subscribed users
- "Expires today" - Last day of subscription
- "Trial expired" - Bootcamp period ended
- "Subscription expired" - Subscription has lapsed

## Testing Recommendations

1. **Test with bootcamp users**: Verify 7-day countdown works correctly
2. **Test with subscribed users**: Verify expiry date calculations
3. **Test with expired users**: Verify expired status displays correctly
4. **Test with no expiry**: Verify display is hidden appropriately
5. **Test plan type display**: Verify Individual/Family plans show correctly
6. **Test color coding**: Verify colors change at appropriate thresholds

## Files Modified

1. `student-dashboard.html` - Added days display HTML and CSS
2. `student-dashboard.js` - Added calculation and display logic
3. `parent-dashboard.html` - Added plan type and days display HTML and JavaScript

## Compatibility

- Works with existing subscription management system
- Compatible with bootcamp trial system
- Integrates with user authentication flow
- No breaking changes to existing functionality
