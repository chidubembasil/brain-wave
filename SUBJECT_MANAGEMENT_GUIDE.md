# Subject Management Guide - BrainWave Admin Dashboard

## Overview
The Subject Management system allows administrators to manage subjects across different class levels (SS1-SS3) and streams (General, Science, Arts, Commerce), including JAMB preparation subjects.

## Subject Categories

### 1. General Subjects (Core for All Streams)
**Class Levels:** SS1, SS2, SS3
- **Mathematics** - Algebra, geometry, calculus, and statistics
- **English Language** - Grammar, literature, composition, oral communication
- **Civic Education** - Citizenship, rights, responsibilities, civic duties

### 2. Science Stream Subjects
**Class Levels:** SS1, SS2, SS3
- **Physics** - Mechanics, thermodynamics, waves, modern physics
- **Chemistry** - Matter properties, composition, chemical reactions

### 3. Arts Stream Subjects
**Class Levels:** SS1, SS2, SS3
- **Literature-in-English** - Poetry, prose, drama from various periods
- **Government** - Political systems, governance, public administration
- **Christian Religious Studies (CRS)** - Christian teachings, Bible studies

### 4. Commerce Stream Subjects
**Class Levels:** SS1, SS2, SS3
- **Commerce** - Trade, business activities, marketing
- **Accounts** - Financial accounting, bookkeeping, financial statements

### 5. Multi-Stream Subjects
**Class Levels:** SS1, SS2, SS3
**Available in:** Science, Arts, Commerce
- **Biology** - Living organisms, structure, function, evolution
- **Economics** - Production, distribution, consumption of goods/services

### 6. JAMB Subjects

#### JAMB - Science Combination
**Required Subjects:**
- English Language (Compulsory)
- Choose 3 from: Mathematics, Physics, Chemistry, Biology, Economics

#### JAMB - Arts Combination
**Required Subjects:**
- English Language (Compulsory)
- Mathematics (Compulsory)
- Choose 2 from: Literature-in-English, Government, Economics, CRS

#### JAMB - Commercial Combination
**Required Subjects:**
- English Language (Compulsory)
- Choose 3 from: Mathematics, Economics, Commerce, Accounts

## Filtering System

### Available Filters

1. **Search by Subject Name**
   - Type in the search box to filter subjects by name or description
   - Real-time filtering as you type
   - Press Enter to apply filter

2. **Class Level Filter**
   - All Classes
   - SS1
   - SS2
   - SS3
   - Note: JAMB subjects don't have SS1/SS2/SS3 classification

3. **Stream Filter**
   - All Streams
   - General (Core subjects for all students)
   - Science
   - Arts
   - Commerce
   - JAMB

### Filter Button
Click the "Filter" button to apply all selected filters simultaneously.

## Subject Actions

Each subject card has three action buttons:

### 1. View Content (Blue Button)
- Opens the subject's content management page
- View books, videos, and study materials
- Monitor student enrollment

### 2. Edit (Orange Button)
- Modify subject details
- Update descriptions
- Change subject metadata

### 3. Delete (Red Button)
- Remove subject from the system
- Requires confirmation
- Shows success/error toast notification

## Data Attributes

Each subject card uses the following data attributes for filtering:

```html
data-stream="[Stream]"        <!-- General, Science, Arts, Commerce, JAMB -->
data-class="[Classes]"         <!-- SS1,SS2,SS3 or JAMB -->
data-department="[Dept]"       <!-- For JAMB: Science, Arts, Commerce -->
```

## Adding New Subjects

To add a new subject, use the "Add Subject" button in the top-right corner of the Subject Management section.

### Required Information:
1. Subject Name
2. Description
3. Stream/Department
4. Class Levels
5. Icon (FontAwesome icon class)
6. Color scheme (gradient colors)

## Subject Card Structure

Each subject displays:
- **Icon** - Visual identifier with gradient background
- **Title** - Subject name
- **Description** - Brief overview
- **Tags** - Stream type, class levels, status
- **Statistics** - Books, videos, enrolled students
- **Action Buttons** - View, Edit, Delete

## JAMB Subject Features

JAMB subjects have enhanced visual design:
- Gradient background (light gray)
- Colored border matching department
- Detailed subject requirements list
- Higher student enrollment numbers
- Specialized content for university entrance prep

## Best Practices

1. **Tagging Subjects**
   - Always tag general subjects as "General"
   - Multi-stream subjects should list all applicable streams
   - Use consistent naming conventions

2. **Content Management**
   - Keep subject descriptions concise and informative
   - Update statistics regularly
   - Maintain active status for current subjects

3. **Filtering**
   - Use multiple filters for precise results
   - Clear filters to see all subjects
   - Search is case-insensitive

4. **JAMB Subjects**
   - Clearly indicate compulsory subjects
   - List all elective options
   - Keep requirements updated per JAMB guidelines

## Technical Implementation

### Filter Function
The filter system uses JavaScript to:
- Match search terms against subject titles and descriptions
- Check class level compatibility
- Handle multi-stream subjects
- Show/hide JAMB section header dynamically

### Button Handlers
All buttons use `window.adminDashboard` methods:
- `viewSubjectContent(subjectId)`
- `editSubject(subjectId)`
- `deleteSubject(subjectId)`

### Styling
- Consistent card design with hover effects
- Color-coded stream badges
- Responsive grid layout
- Cursor pointer on all interactive elements

## Future Enhancements

Potential improvements:
1. Bulk subject operations
2. Subject import/export
3. Advanced analytics per subject
4. Student performance tracking
5. Subject prerequisite management
6. Automated JAMB combination validation

---

**Last Updated:** October 2, 2025
**Version:** 1.0
