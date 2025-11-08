// BrainWave Student Dashboard JavaScript

// ==================== FIREBASE AUTHENTICATION & DATA ====================

// Import Firebase modules
import { checkAuth, logout } from './auth-guard.js';
import { 
    getUserById,
    updateUser,
    getStudentProgress, 
    getAssessments, 
    getStudyMaterials, 
    getLiveClasses,
    getActiveAnnouncements,
    getStudentSubmissions 
} from './database-operations.js';

// Global user data
let currentUser = null;
let isFirebaseDataLoaded = false;

// Check authentication in background (non-blocking)
setTimeout(() => {
    checkAuth('student').then(userData => {
        currentUser = userData;
        console.log('✅ Authenticated as:', currentUser.name);
        console.log('Student Code:', currentUser.studentCode);
        console.log('Class Level:', currentUser.classLevel);
        console.log('Stream:', currentUser.stream);
        
        // Update UI with user info
        updateUserProfile(currentUser);
        
        // Load Firebase data in background
        loadFirebaseData().then(() => {
            isFirebaseDataLoaded = true;
            console.log('✅ Firebase data loaded');
        }).catch(error => {
            console.warn('⚠️ Firebase data load failed, using mock data');
        });
    }).catch(error => {
        console.error('❌ Authentication failed:', error);
        // User will be redirected by checkAuth
    });
}, 100); // Small delay to let dashboard load first

// Update user profile in UI
function updateUserProfile(userData) {
    console.log('🔄 Updating UI with user data:', userData);
    
    // Update welcome message with student name
    const welcomeNameEl = document.getElementById('welcomeStudentName');
    if (welcomeNameEl) {
        welcomeNameEl.textContent = userData.name;
        console.log('✅ Updated welcome name:', userData.name);
    }
    
    // Update dropdown name
    const dropdownNameEl = document.getElementById('dropdownName');
    if (dropdownNameEl) {
        dropdownNameEl.textContent = userData.name;
        console.log('✅ Updated dropdown name:', userData.name);
    }
    
    // Update dropdown email
    const dropdownEmailEl = document.getElementById('dropdownEmail');
    if (dropdownEmailEl) {
        dropdownEmailEl.textContent = userData.email;
        console.log('✅ Updated dropdown email:', userData.email);
    }
    
    // Update student code in top bar
    const studentCodeDisplayEl = document.getElementById('studentCodeDisplay');
    if (studentCodeDisplayEl) {
        studentCodeDisplayEl.textContent = userData.studentCode || 'N/A';
        console.log('✅ Updated student code display:', userData.studentCode);
    }
    
    // Update student code in dropdown
    const dropdownCodeTextEl = document.getElementById('dropdownCodeText');
    if (dropdownCodeTextEl) {
        dropdownCodeTextEl.textContent = userData.studentCode || 'N/A';
        console.log('✅ Updated dropdown code:', userData.studentCode);
    }
    
    // Update avatar initials
    const avatarInitialsEl = document.getElementById('avatarInitials');
    if (avatarInitialsEl && userData.name) {
        const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        avatarInitialsEl.textContent = initials;
        console.log('✅ Updated avatar initials:', initials);
    }
    
    // Update payment/subscription status in dropdown
    const dropdownPaymentTextEl = document.getElementById('dropdownPaymentText');
    if (dropdownPaymentTextEl) {
        dropdownPaymentTextEl.textContent = userData.status === 'bootcamp' ? 'Bootcamp (7 Days Free)' : 'Active';
    }
    
    // Update plan in dropdown
    const dropdownPlanEl = document.getElementById('dropdownPlan');
    if (dropdownPlanEl) {
        dropdownPlanEl.textContent = userData.plan === 'bootcamp' ? 'Bootcamp Trial' : `${userData.plan} Plan`;
    }
    
    // Update days remaining if bootcamp
    const dropdownDaysEl = document.getElementById('dropdownDays');
    if (dropdownDaysEl && userData.expiryDate) {
        const expiryDate = new Date(userData.expiryDate);
        const today = new Date();
        const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        if (daysLeft > 0) {
            dropdownDaysEl.textContent = `${daysLeft} days remaining`;
            dropdownDaysEl.style.display = 'block';
        }
    }
    
    // Update all other student name elements
    const nameElements = document.querySelectorAll('.student-name, #studentName, .user-name');
    nameElements.forEach(el => {
        if (el) el.textContent = userData.name;
    });
    
    // Update all other student code elements
    const codeElements = document.querySelectorAll('.student-code, #studentCode');
    codeElements.forEach(el => {
        if (el) el.textContent = userData.studentCode || 'N/A';
    });
    
    // Update class level
    const levelElements = document.querySelectorAll('.class-level, #classLevel');
    levelElements.forEach(el => {
        if (el) el.textContent = userData.classLevel || 'N/A';
    });
    
    // Update stream
    const streamElements = document.querySelectorAll('.stream, #stream');
    streamElements.forEach(el => {
        if (el) el.textContent = userData.stream || 'N/A';
    });
    
    console.log('✅ User profile UI fully updated');
}

// Load all Firebase data
async function loadFirebaseData() {
    try {
        console.log('📊 Loading Firebase data...');
        
        // Load student progress
        const progress = await getStudentProgress(currentUser.uid);
        console.log('Progress:', progress);
        
        // Load assessments for this student's class
        const assessments = await getAssessments({
            classLevel: currentUser.classLevel,
            stream: currentUser.stream,
            status: 'available'
        });
        console.log('Assessments:', assessments.length);
        
        // Load study materials
        const materials = await getStudyMaterials({
            classLevel: currentUser.classLevel,
            stream: currentUser.stream
        });
        console.log('Study materials:', materials.length);
        
        // Load live classes
        const liveClasses = await getLiveClasses({
            classLevel: currentUser.classLevel,
            status: 'scheduled'
        });
        console.log('Live classes:', liveClasses.length);
        
        // Load announcements
        const announcements = await getActiveAnnouncements('student');
        console.log('Announcements:', announcements.length);
        
        // Load student submissions
        const submissions = await getStudentSubmissions(currentUser.uid);
        console.log('Submissions:', submissions.length);
        
        // Note: Since there's no data in Firebase yet, we'll fall back to mock data
        // The existing mock data code below will still work
        
        console.log('✅ Firebase data loaded (using mock data as fallback)');
        
    } catch (error) {
        console.error('⚠️ Error loading Firebase data:', error);
        console.log('📦 Falling back to mock data');
    }
}

// Make logout available globally
window.handleLogout = logout;

// ==================== MOBILE DETECTION & COMPATIBILITY ====================

// Detect if running on mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

console.log('📱 Device Detection:', { isMobile, isTouchDevice, userAgent: navigator.userAgent });

// Mobile-specific console logging (fallback for devices without console)
function mobileLog(message, data = null) {
    if (isMobile) {
        // On mobile, try to show logs in UI if console is not available
        const logElement = document.getElementById('mobile-log') || createMobileLogElement();
        if (logElement) {
            const timestamp = new Date().toLocaleTimeString();
            logElement.innerHTML += `<div>[${timestamp}] ${message}</div>`;
            if (data) {
                logElement.innerHTML += `<div style="margin-left: 20px; color: #666;">${JSON.stringify(data)}</div>`;
            }
            logElement.scrollTop = logElement.scrollHeight;
        }
    }
    console.log(message, data);
}

function createMobileLogElement() {
    const logElement = document.createElement('div');
    logElement.id = 'mobile-log';
    logElement.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 300px;
        height: 200px;
        background: rgba(0,0,0,0.8);
        color: white;
        font-size: 12px;
        padding: 10px;
        border-radius: 5px;
        overflow-y: auto;
        z-index: 10000;
        display: none;
    `;
    document.body.appendChild(logElement);
    return logElement;
}

// Mobile-specific localStorage handling
function mobileSafeLocalStorage() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return localStorage;
    } catch (e) {
        console.warn('localStorage not available, using memory storage');
        return {
            data: {},
            setItem: function(key, value) { this.data[key] = value; },
            getItem: function(key) { return this.data[key] || null; },
            removeItem: function(key) { delete this.data[key]; }
        };
    }
}

// ==================== INITIALIZATION ====================

// Current student data
let currentStudent = null;
const storage = mobileSafeLocalStorage();

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    mobileLog('🎓 BrainWave Student Dashboard Loading...', { isMobile, isTouchDevice });
    
    // Mobile-specific initialization delay
    if (isMobile) {
        setTimeout(initializeDashboard, 100);
    } else {
        initializeDashboard();
    }
});

function initializeDashboard() {
    mobileLog('🚀 Initializing dashboard...');
    
    // Generate mock data if needed (for testing)
    if (!storage.getItem('brainwave_mock_data_generated')) {
        mobileLog('🎲 First time load - generating mock data...');
        const student = generateMockData();
        storage.setItem('brainwave_mock_data_generated', 'true');
        mobileLog('✅ Mock data generated for:', { name: student.name, code: student.studentCode });
    }
    
    // Ensure static data is always available - force reload every time
    ensureStaticData();
    
    // Ensure student has proper data for filtering
    ensureStudentData();
    
    // Force generate mock data for current student if none exists
    forceGenerateMockDataIfNeeded();
    
    // Check if mock data exists, if not regenerate
    const subjects = JSON.parse(storage.getItem('brainwave_subjects') || '[]');
    if (subjects.length === 0) {
        mobileLog('⚠️ No subjects found - regenerating mock data...');
        generateMockData();
    }
    
    // Fix old reports without studentId
    fixOldReports();
    
    // Check authentication
    checkAuthentication();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load dashboard data
    loadDashboardData();
    
    mobileLog('✅ Dashboard initialized successfully');
    
    // Mobile-specific: Show debug info if needed
    if (isMobile) {
        showMobileDebugInfo();
    }
}

// Mobile debug function
function showMobileDebugInfo() {
    const debugInfo = {
        isMobile: isMobile,
        isTouchDevice: isTouchDevice,
        localStorage: typeof localStorage !== 'undefined',
        currentStudent: currentStudent ? currentStudent.name : 'Not loaded',
        quizzes: JSON.parse(storage.getItem('brainwave_quizs') || '[]').length,
        mocks: JSON.parse(storage.getItem('brainwave_mocks') || '[]').length
    };
    
    mobileLog('📱 Mobile Debug Info:', debugInfo);
    
    // Create mobile debug panel
    const debugPanel = document.createElement('div');
    debugPanel.id = 'mobile-debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
        max-width: 200px;
    `;
    
    debugPanel.innerHTML = `
        <div><strong>Mobile Debug</strong></div>
        <div>Student: ${debugInfo.currentStudent}</div>
        <div>Quizzes: ${debugInfo.quizzes}</div>
        <div>Mocks: ${debugInfo.mocks}</div>
        <button onclick="toggleMobileLog()" style="margin-top: 5px; padding: 2px 5px;">Toggle Log</button>
    `;
    
    document.body.appendChild(debugPanel);
}

function toggleMobileLog() {
    const logElement = document.getElementById('mobile-log');
    if (logElement) {
        logElement.style.display = logElement.style.display === 'none' ? 'block' : 'none';
    }
}

// ==================== FIX OLD DATA ====================

function fixOldReports() {
    // Fix reports that don't have studentId field
    const reports = JSON.parse(storage.getItem('brainwave_reports') || '[]');
    const users = JSON.parse(storage.getItem('brainwave_users') || '[]');
    
    console.log('🔧 Checking reports for studentId field...');
    console.log('   Total reports:', reports.length);
    console.log('   Total users:', users.length);
    
    let updated = false;
    let fixedCount = 0;
    
    reports.forEach(report => {
        if (!report.studentId && report.studentCode) {
            // Try to find student by code
            const student = users.find(u => u.studentCode === report.studentCode);
            if (student) {
                report.studentId = student.id;
                updated = true;
                fixedCount++;
            } else {
                console.warn('⚠️ Could not find student for code:', report.studentCode);
            }
        }
    });
    
    if (updated) {
        localStorage.setItem('brainwave_reports', JSON.stringify(reports));
        console.log('✅ Updated', fixedCount, 'reports with studentId');
    } else {
        console.log('✅ All reports already have studentId or no reports to fix');
    }
}

// ==================== STATIC DATA MANAGEMENT ====================

function ensureStaticData() {
    console.log('📚 Ensuring static data is available...');
    
    // Get current student data to match their class level and stream
    const studentId = localStorage.getItem('brainwave_current_student_id');
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    const student = users.find(u => u.id === studentId);
    const classLevel = (student && student.classLevel) || 'SS1';
    const stream = (student && student.stream) || 'Science';
    
    console.log('🎯 Creating static data for:', { classLevel, stream, studentId, studentName: student?.name });
    
    // Always clear existing data to ensure fresh data for current student
    localStorage.removeItem('brainwave_quizs');
    localStorage.removeItem('brainwave_mocks');
    console.log('🗑️ Cleared existing assessment data');
    
    // Force load quizzes and assignments - always load fresh data
    console.log('🔄 Force loading static quiz/assignment data...');
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 7);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const twoWeeks = new Date(now);
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    
    const staticQuizzes = [
        {
            id: 'quiz_1',
            type: 'quiz',
            title: 'Quadratic Equations Quiz',
            subject: 'Mathematics',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '30',
            totalMarks: 50,
            questions: 15,
            status: 'available',
            description: 'Test your understanding of quadratic equations and their solutions',
            createdAt: now.toISOString()
        },
        {
            id: 'quiz_2',
            type: 'quiz',
            title: 'Chemical Reactions Quiz',
            subject: 'Chemistry',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '25',
            totalMarks: 40,
            questions: 12,
            status: 'available',
            description: 'Identify different types of chemical reactions and balance equations',
            createdAt: now.toISOString()
        },
        {
            id: 'quiz_3',
            type: 'quiz',
            title: 'Physics Mechanics Quiz',
            subject: 'Physics',
            classLevel: classLevel,
            stream: stream,
            dueDate: nextWeek.toISOString(),
            duration: '35',
            totalMarks: 60,
            questions: 18,
            status: 'available',
            description: 'Newton\'s laws, motion, and forces in physics',
            createdAt: now.toISOString()
        },
        {
            id: 'assignment_1',
            type: 'assignment',
            title: 'Newton\'s Laws Assignment',
            subject: 'Physics',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '45',
            totalMarks: 100,
            status: 'available',
            description: 'Solve problems involving Newton\'s three laws of motion',
            instructions: 'Complete all 5 problems and show your work clearly',
            createdAt: now.toISOString()
        },
        {
            id: 'assignment_2',
            type: 'assignment',
            title: 'Cell Biology Assignment',
            subject: 'Biology',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '40',
            totalMarks: 80,
            status: 'available',
            description: 'Research and explain cellular processes',
            instructions: 'Write a 1000-word essay on cell division',
            createdAt: now.toISOString()
        }
    ];
    
    localStorage.setItem('brainwave_quizs', JSON.stringify(staticQuizzes));
    console.log('✅ Force loaded', staticQuizzes.length, 'quizzes and assignments');
    
    // Force load mock exams
    console.log('🔄 Force loading static mock exam data...');
    const staticMocks = [
        {
            id: 'mock_1',
            type: 'mock',
            title: 'WAEC Mathematics Mock Exam',
            subject: 'Mathematics',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '120',
            totalMarks: 100,
            questions: 50,
            status: 'available',
            description: 'Comprehensive WAEC Mathematics practice test',
            examType: 'WAEC',
            createdAt: now.toISOString()
        },
        {
            id: 'mock_2',
            type: 'mock',
            title: 'JAMB Physics Practice Test',
            subject: 'Physics',
            classLevel: classLevel,
            stream: stream,
            dueDate: futureDate.toISOString(),
            duration: '90',
            totalMarks: 100,
            questions: 40,
            status: 'available',
            description: 'JAMB Physics mock examination',
            examType: 'JAMB',
            createdAt: now.toISOString()
        }
    ];
    
    localStorage.setItem('brainwave_mocks', JSON.stringify(staticMocks));
    console.log('✅ Force loaded', staticMocks.length, 'mock exams');
}

function ensureStudentData() {
    console.log('👤 Ensuring student has proper data for filtering...');
    
    const studentId = localStorage.getItem('brainwave_current_student_id');
    if (!studentId) {
        console.log('⚠️ No current student ID found');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    const student = users.find(u => u.id === studentId);
    
    if (student) {
        let updated = false;
        
        if (!student.classLevel) {
            student.classLevel = 'SS3';
            updated = true;
        }
        
        if (!student.stream) {
            student.stream = 'Science';
            updated = true;
        }
        
        if (updated) {
            const index = users.findIndex(u => u.id === studentId);
            if (index !== -1) {
                users[index] = student;
                localStorage.setItem('brainwave_users', JSON.stringify(users));
                console.log('✅ Updated student data:', { classLevel: student.classLevel, stream: student.stream });
            }
        }
    }
}

// Function to force reload static data (for testing)
function forceReloadStaticData() {
    console.log('🔄 Force reloading static data...');
    
    // Clear existing data
    localStorage.removeItem('brainwave_quizs');
    localStorage.removeItem('brainwave_mocks');
    localStorage.removeItem('brainwave_books');
    localStorage.removeItem('brainwave_videos');
    localStorage.removeItem('brainwave_live_classes');
    
    // Reload static data
    ensureStaticData();
    
    // Reload the page sections
    loadQuizzes();
    loadMockExams();
    loadStudyMaterials();
    loadLiveClasses();
    
    console.log('✅ Static data force reloaded');
}

// Make functions globally accessible for testing
window.forceReloadStaticData = forceReloadStaticData;
window.testLoadQuizzes = function() {
    console.log('🧪 Testing loadQuizzes function...');
    ensureStaticData();
    loadQuizzes();
};
window.debugQuizzes = function() {
    console.log('🔍 Debugging quizzes data...');
    console.log('localStorage brainwave_quizs:', JSON.parse(localStorage.getItem('brainwave_quizs') || '[]'));
    console.log('Current student:', currentStudent);
    console.log('getFilteredAssessments("quiz"):', getFilteredAssessments('quiz'));
    console.log('getFilteredAssessments("assignment"):', getFilteredAssessments('assignment'));
};
window.generateMockDataNow = function() {
    console.log('🎲 Force generating mock data for current student...');
    if (currentStudent) {
        // Use the same function from signup.html
        generateStudentMockDataForCurrentStudent();
    } else {
        console.log('❌ No current student found');
    }
};
window.resetAllData = function() {
    console.log('🔄 Resetting all data and regenerating...');
    
    // Clear all existing data
    localStorage.removeItem('brainwave_quizs');
    localStorage.removeItem('brainwave_mocks');
    localStorage.removeItem('brainwave_live_classes');
    localStorage.removeItem('brainwave_books');
    localStorage.removeItem('brainwave_videos');
    
    console.log('🗑️ All data cleared');
    
    // Regenerate data
    ensureStaticData();
    forceGenerateMockDataIfNeeded();
    
    // Reload all sections
    loadQuizzes();
    loadMockExams();
    loadLiveClasses();
    loadStudyMaterials();
    
    console.log('✅ All data regenerated and sections reloaded');
};
window.showAllData = function() {
    console.log('🔍 Showing all data without filtering...');
    
    const quizzes = JSON.parse(storage.getItem('brainwave_quizs') || '[]');
    const mocks = JSON.parse(storage.getItem('brainwave_mocks') || '[]');
    
    console.log('📊 All Quizzes:', quizzes);
    console.log('📊 All Mock Exams:', mocks);
    console.log('👤 Current Student:', currentStudent);
    
    // Show raw data in quizzes section
    const container = document.getElementById('quizzesContainer');
    if (container) {
        const allItems = [...quizzes, ...mocks];
        container.innerHTML = allItems.map(item => createAssessmentCard(item)).join('');
        console.log('✅ Displayed all', allItems.length, 'items without filtering');
    }
};

// Function to generate mock data for current student (similar to signup)
function generateStudentMockDataForCurrentStudent() {
    console.log('📚 Creating comprehensive mock data for:', currentStudent.name);
    
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 7);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const twoWeeks = new Date(now);
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    
    // Generate quizzes and assignments
    const quizzes = [
        {
            id: 'quiz_' + currentStudent.id + '_1',
            type: 'quiz',
            title: 'Quadratic Equations Quiz',
            subject: 'Mathematics',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '30',
            totalMarks: 50,
            questions: 15,
            status: 'available',
            description: 'Test your understanding of quadratic equations and their solutions',
            createdAt: now.toISOString()
        },
        {
            id: 'quiz_' + currentStudent.id + '_2',
            type: 'quiz',
            title: 'Chemical Reactions Quiz',
            subject: 'Chemistry',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '25',
            totalMarks: 40,
            questions: 12,
            status: 'available',
            description: 'Identify different types of chemical reactions and balance equations',
            createdAt: now.toISOString()
        },
        {
            id: 'quiz_' + currentStudent.id + '_3',
            type: 'quiz',
            title: 'Physics Mechanics Quiz',
            subject: 'Physics',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: nextWeek.toISOString(),
            duration: '35',
            totalMarks: 60,
            questions: 18,
            status: 'available',
            description: 'Newton\'s laws, motion, and forces in physics',
            createdAt: now.toISOString()
        },
        {
            id: 'assignment_' + currentStudent.id + '_1',
            type: 'assignment',
            title: 'Newton\'s Laws Assignment',
            subject: 'Physics',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '45',
            totalMarks: 100,
            status: 'available',
            description: 'Solve problems involving Newton\'s three laws of motion',
            instructions: 'Complete all 5 problems and show your work clearly',
            createdAt: now.toISOString()
        },
        {
            id: 'assignment_' + currentStudent.id + '_2',
            type: 'assignment',
            title: 'Cell Biology Assignment',
            subject: 'Biology',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '40',
            totalMarks: 80,
            status: 'available',
            description: 'Research and explain cellular processes',
            instructions: 'Write a 1000-word essay on cell division',
            createdAt: now.toISOString()
        }
    ];
    
    // Generate mock exams
    const mockExams = [
        {
            id: 'mock_' + currentStudent.id + '_1',
            type: 'mock',
            title: 'WAEC Mathematics Mock Exam',
            subject: 'Mathematics',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '120',
            totalMarks: 100,
            questions: 50,
            status: 'available',
            description: 'Comprehensive WAEC Mathematics practice test',
            examType: 'WAEC',
            createdAt: now.toISOString()
        },
        {
            id: 'mock_' + currentStudent.id + '_2',
            type: 'mock',
            title: 'JAMB Physics Practice Test',
            subject: 'Physics',
            classLevel: currentStudent.classLevel,
            stream: currentStudent.stream,
            dueDate: futureDate.toISOString(),
            duration: '90',
            totalMarks: 100,
            questions: 40,
            status: 'available',
            description: 'JAMB Physics mock examination',
            examType: 'JAMB',
            createdAt: now.toISOString()
        }
    ];
    
    // Save all mock data to localStorage
    localStorage.setItem('brainwave_quizs', JSON.stringify(quizzes));
    localStorage.setItem('brainwave_mocks', JSON.stringify(mockExams));
    
    console.log('✅ Mock data generated successfully:');
    console.log('- Quizzes & Assignments:', quizzes.length);
    console.log('- Mock Exams:', mockExams.length);
    
    // Reload the sections
    loadQuizzes();
    loadMockExams();
    
    console.log('🔄 Dashboard sections reloaded');
}

function forceGenerateMockDataIfNeeded() {
    console.log('🔍 Checking if mock data needs to be generated...');
    
    // Check if we have a current student
    const studentId = localStorage.getItem('brainwave_current_student_id');
    if (!studentId) {
        console.log('⚠️ No current student ID found');
        return;
    }
    
    // Get current student data
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    const student = users.find(u => u.id == studentId);
    
    if (!student) {
        console.log('⚠️ Current student not found in users');
        return;
    }
    
    // Check if we have any quizzes/assignments data
    const existingQuizzes = JSON.parse(localStorage.getItem('brainwave_quizs') || '[]');
    const existingMocks = JSON.parse(localStorage.getItem('brainwave_mocks') || '[]');
    
    console.log('📊 Current data status:', {
        quizzes: existingQuizzes.length,
        mocks: existingMocks.length,
        student: student.name,
        classLevel: student.classLevel,
        stream: student.stream
    });
    
    // If no data exists, generate it
    if (existingQuizzes.length === 0 && existingMocks.length === 0) {
        console.log('🎲 No mock data found, generating now...');
        generateStudentMockDataForCurrentStudent();
    } else {
        console.log('✅ Mock data already exists');
    }
}

// ==================== AUTHENTICATION ====================

function checkAuthentication() {
    // Get current student from localStorage
    const studentId = localStorage.getItem('brainwave_current_student_id');
    
    console.log('🔐 Checking authentication...', { studentId });
    
    if (!studentId) {
        console.warn('⚠️ No student logged in, redirecting to login...');
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }
    
    // Load student data
    let users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    console.log('👥 Users in storage:', users.length);
    
    const userIndex = users.findIndex(u => u.id == studentId);
    
    if (userIndex === -1) {
        console.error('❌ Student not found with ID:', studentId);
        console.log('Available user IDs:', users.map(u => u.id));
        localStorage.removeItem('brainwave_current_student_id');
        window.location.href = 'login.html';
        return;
    }
    
    currentStudent = users[userIndex];
    
    console.log('✅ Student authenticated:', {
        name: currentStudent.name,
        email: currentStudent.email,
        studentCode: currentStudent.studentCode,
        classLevel: currentStudent.classLevel,
        stream: currentStudent.stream,
        gender: currentStudent.gender,
        expiry: currentStudent.expiry || currentStudent.expiryDate
    });
    
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
            
            console.log(`🔒 Account auto-locked: ${currentStudent.email} (Expired: ${currentStudent.expiry || currentStudent.expiryDate})`);
            
            alert('Your subscription has expired and your account has been locked. Please contact the administrator or renew your subscription.');
            logout();
            return;
        }
    }
    
    // Check if account is locked
    if (currentStudent.locked || currentStudent.accountLocked) {
        const reason = currentStudent.lockedReason || 'Your account has been locked';
        alert(`${reason}. Please contact the administrator.`);
        logout();
        return;
    }
    
    // Check subscription status
    if (currentStudent.status === 'expired') {
        showToast('Your subscription has expired. Please renew to continue.', 'warning');
    }
    
    // Update UI with student info
    updateStudentInfo();
}

function updateStudentInfo() {
    // Update avatar
    const initials = getInitials(currentStudent.name);
    document.getElementById('avatarInitials').textContent = initials;
    
    // Update dropdown
    document.getElementById('dropdownName').textContent = currentStudent.name;
    document.getElementById('dropdownEmail').textContent = currentStudent.email;
    
    // Update plan display
    const planDisplay = document.getElementById('dropdownPlan');
    const planType = currentStudent.planType || 'individual';
    planDisplay.textContent = planType.charAt(0).toUpperCase() + planType.slice(1) + ' Plan';
    
    // Color code based on plan type
    if (planType === 'family') {
        planDisplay.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    } else if (planType === 'individual') {
        planDisplay.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    } else {
        planDisplay.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
    
    // Update days plan display
    const daysDisplay = document.getElementById('dropdownDays');
    const daysInfo = calculateDaysRemaining(currentStudent);
    if (daysInfo) {
        daysDisplay.textContent = daysInfo.text;
        daysDisplay.style.background = daysInfo.color;
        daysDisplay.style.color = daysInfo.textColor;
        daysDisplay.style.display = 'inline-block';
    } else {
        daysDisplay.style.display = 'none';
    }
    
    // Update student code (top bar)
    const codeDisplay = document.getElementById('studentCodeDisplay');
    if (currentStudent.studentCode) {
        codeDisplay.textContent = currentStudent.studentCode;
    } else {
        codeDisplay.textContent = 'No Code';
        codeDisplay.style.background = 'var(--gray-300)';
        codeDisplay.style.color = 'var(--gray-600)';
    }
    
    // Update student code in dropdown (for mobile)
    const dropdownCodeElement = document.getElementById('dropdownCode');
    const dropdownCodeText = document.getElementById('dropdownCodeText');
    if (dropdownCodeElement && dropdownCodeText && currentStudent.studentCode) {
        dropdownCodeText.textContent = currentStudent.studentCode;
        dropdownCodeElement.style.display = 'flex';
    }
    
    // Update welcome message
    const welcomeNameElement = document.getElementById('welcomeStudentName');
    if (welcomeNameElement) {
        welcomeNameElement.textContent = currentStudent.name.split(' ')[0]; // Use first name
    }
    
    // Update payment badge
    const paymentBadge = document.getElementById('dropdownPaymentBadge');
    const paymentText = document.getElementById('dropdownPaymentText');
    const paymentIcon = paymentBadge?.querySelector('.paid-badge-icon');
    
    if (paymentBadge && paymentText) {
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        
        if (isPaid) {
            paymentBadge.className = 'dropdown-payment-badge paid';
            paymentText.textContent = 'Paid Member';
            if (paymentIcon) {
                paymentIcon.className = 'fas fa-check-circle paid-badge-icon';
            }
        } else {
            paymentBadge.className = 'dropdown-payment-badge bootcamp';
            paymentText.textContent = 'Bootcamp';
            if (paymentIcon) {
                paymentIcon.className = 'fas fa-graduation-cap paid-badge-icon';
            }
        }
    }
    
    // Update upgrade button visibility
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        if (isPaid) {
            upgradeBtn.style.display = 'none';
        } else {
            upgradeBtn.style.display = 'flex';
        }
    }
}

function calculateDaysRemaining(student) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if user is on bootcamp (7-day trial)
    if (student.status === 'bootcamp' || student.plan === 'bootcamp') {
        if (student.bootcampStartDate) {
            const startDate = new Date(student.bootcampStartDate);
            startDate.setHours(0, 0, 0, 0);
            const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
            const daysRemaining = 7 - daysPassed;
            
            if (daysRemaining > 0) {
                const color = daysRemaining <= 2 ? '#f59e0b' : '#10b981';
                const textColor = '#ffffff';
                return {
                    text: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left in bootcamp`,
                    color: color,
                    textColor: textColor
                };
            } else {
                return {
                    text: 'Bootcamp expired',
                    color: '#ef4444',
                    textColor: '#ffffff'
                };
            }
        }
    }
    
    // Check if user has an expiry date
    if (student.expiry) {
        const expiryDate = new Date(student.expiry);
        expiryDate.setHours(0, 0, 0, 0);
        const daysRemaining = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining > 0) {
            const color = daysRemaining <= 7 ? '#f59e0b' : '#10b981';
            const textColor = '#ffffff';
            return {
                text: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`,
                color: color,
                textColor: textColor
            };
        } else if (daysRemaining === 0) {
            return {
                text: 'Expires today',
                color: '#ef4444',
                textColor: '#ffffff'
            };
        } else {
            return {
                text: 'Subscription expired',
                color: '#ef4444',
                textColor: '#ffffff'
            };
        }
    }
    
    return null;
}

function getInitials(name) {
    if (!name || name.trim() === '') return 'ST';
    
    const parts = name.trim().split(' ').filter(part => part.length > 0);
    
    if (parts.length >= 2) {
        // Get first letter of first name and first letter of last name
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1) {
        // Single name: take first 2 letters
        return parts[0].substring(0, 2).toUpperCase();
    }
    
    return 'ST';
}

// Logout function is now imported from auth-guard.js
// Old logout function removed to avoid duplicate declaration

// ==================== EVENT LISTENERS ====================

function initializeEventListeners() {
    // Sidebar navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Section action buttons
    const sectionActions = document.querySelectorAll('.section-action');
    sectionActions.forEach(action => {
        action.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                navigateToSection(section);
            }
        });
    });
    
    // Hamburger menu
    document.getElementById('hamburgerMenu').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarClose').addEventListener('click', toggleSidebar);
    
    // Profile dropdown
    document.getElementById('profileAvatar').addEventListener('click', toggleProfileDropdown);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('dropdownMenu');
        const avatar = document.getElementById('profileAvatar');
        if (!dropdown.contains(e.target) && !avatar.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Edit profile
    document.getElementById('editProfileBtn').addEventListener('click', openEditProfile);
    document.getElementById('closeProfileModal').addEventListener('click', closeEditProfile);
    document.getElementById('editProfileForm').addEventListener('submit', saveProfile);
    
    // Upgrade plan
    document.getElementById('upgradeBtn').addEventListener('click', openUpgradeModal);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Material filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.style.color = 'var(--gray-500)';
                t.style.borderBottomColor = 'transparent';
            });
            this.classList.add('active');
            this.style.color = 'var(--primary-color)';
            this.style.borderBottomColor = 'var(--primary-color)';
            
            const filter = this.getAttribute('data-filter');
            filterStudyMaterials(filter);
        });
    });
    
    // Close modal when clicking outside
    document.getElementById('editProfileModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeEditProfile();
        }
    });
}

// ==================== NAVIGATION ====================

function navigateToSection(sectionName) {
    console.log('Navigating to section:', sectionName);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'subjects': 'My Subjects',
        'live-classes': 'Live Classes',
        'quizzes': 'Quizzes & Assignments',
        'mock-exams': 'Mock Exams',
        'study-materials': 'Study Materials',
        'reports': 'Reports',
        'announcements': 'Announcements',
        'community': 'Community'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';
    
    // Show/hide sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        if (section.id === `section-${sectionName}`) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    // Load data based on section
    if (sectionName === 'reports') {
        console.log('Loading Reports section data...');
        loadReports();
        loadAchievements();
        loadBadges();
        loadLeaderboard();
    } else if (sectionName === 'live-classes') {
        console.log('Loading Live Classes section...');
        loadLiveClasses();
    } else if (sectionName === 'quizzes') {
        console.log('Loading Quizzes section...');
        loadQuizzes();
    } else if (sectionName === 'mock-exams') {
        console.log('Loading Mock Exams section...');
        loadMockExams();
    } else if (sectionName === 'study-materials') {
        console.log('Loading Study Materials section...');
        loadStudyMaterials();
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('show');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// ==================== PROFILE MANAGEMENT ====================

function openEditProfile() {
    // Close dropdown
    document.getElementById('dropdownMenu').classList.remove('show');
    
    // Check if user data is loaded
    if (!currentUser) {
        alert('Please wait for profile data to load...');
        return;
    }
    
    // Populate form with current Firebase data
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profilePhone').value = currentUser.phone || '';
    document.getElementById('profileClass').value = currentUser.classLevel || '';
    document.getElementById('profileStream').value = currentUser.stream || '';
    
    console.log('📝 Opening edit profile with data:', currentUser);
    
    // Show modal
    document.getElementById('editProfileModal').classList.add('show');
}

function closeEditProfile() {
    document.getElementById('editProfileModal').classList.remove('show');
}

function openUpgradeModal() {
    // Close dropdown
    document.getElementById('dropdownMenu').classList.remove('show');
    
    // Show confirmation dialog
    const confirmed = confirm(
        '🎓 Upgrade to Paid Membership\n\n' +
        'By upgrading, you will get:\n' +
        '✓ Access to all premium content\n' +
        '✓ Unlimited quizzes and exams\n' +
        '✓ Exclusive live classes\n' +
        '✓ Premium ebooks and materials\n\n' +
        'Click OK to simulate payment and upgrade your account.'
    );
    
    if (confirmed) {
        // Simulate payment success
        upgradeToPayment();
    }
}

function upgradeToPayment() {
    // Update student payment status
    currentStudent.isPaid = true;
    currentStudent.paymentStatus = 'paid';
    currentStudent.paidDate = new Date().toISOString().split('T')[0];
    currentStudent.status = 'active';
    currentStudent.plan = 'paid';
    
    // Add to plan history
    if (!currentStudent.planHistory) {
        currentStudent.planHistory = [];
    }
    currentStudent.planHistory.push({
        from: 'bootcamp',
        to: 'paid',
        changedAt: new Date().toISOString(),
        changedBy: 'student_upgrade'
    });
    
    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    const index = users.findIndex(u => u.id === currentStudent.id);
    if (index !== -1) {
        users[index] = currentStudent;
        localStorage.setItem('brainwave_users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentStudent));
        
        console.log('✅ Student upgraded to paid:', currentStudent);
        
        // Update UI
        updateStudentInfo();
        
        // Show success message
        showToast('🎉 Congratulations! You are now a paid member!', 'success');
        
        // Reload content to show paid materials
        setTimeout(() => {
            loadDashboardData();
        }, 1000);
    }
}

async function saveProfile(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('profileName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const classLevel = document.getElementById('profileClass').value;
    const stream = document.getElementById('profileStream').value;
    
    // Validate
    if (!name || !email || !classLevel || !stream) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Check if user is loaded
    if (!currentUser || !currentUser.uid) {
        showToast('User data not loaded. Please try again.', 'error');
        return;
    }
    
    try {
        console.log('💾 Saving profile to Firebase...');
        
        // Prepare update data
        const updateData = {
            name: name,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || name.split(' ')[0],
            phone: phone,
            classLevel: classLevel,
            stream: stream
        };
        
        // Update in Firebase
        await updateUser(currentUser.uid, updateData);
        
        // Update local currentUser object
        currentUser.name = name;
        currentUser.firstName = updateData.firstName;
        currentUser.lastName = updateData.lastName;
        currentUser.phone = phone;
        currentUser.classLevel = classLevel;
        currentUser.stream = stream;
        
        console.log('✅ Profile updated in Firebase');
        
        // Update UI with new data
        updateUserProfile(currentUser);
        
        // Close modal
        closeEditProfile();
        
        // Show success message
        showToast('Profile updated successfully!', 'success');
        
    } catch (error) {
        console.error('❌ Error saving profile:', error);
        showToast('Failed to update profile: ' + error.message, 'error');
    }
}

// ==================== DATA LOADING ====================

function loadDashboardData() {
    console.log('📊 Loading dashboard data...');
    
    // Load all data
    loadSubjects();
    loadLiveClasses();
    loadQuizzes();
    loadMockExams();
    loadStudyMaterials();
    loadAnnouncements();
    loadCommunity();
    
    // Update stats
    updateStats();
}

function updateStats() {
    // Count subjects
    const subjects = getFilteredSubjects();
    document.getElementById('stat-subjects').textContent = subjects.length;
    
    // Count pending tasks (quizzes + assignments)
    const quizzes = getFilteredAssessments('quiz');
    const assignments = getFilteredAssessments('assignment');
    document.getElementById('stat-tasks').textContent = quizzes.length + assignments.length;
    
    // Count study materials
    const books = getFilteredBooks();
    const videos = getFilteredVideos();
    document.getElementById('stat-materials').textContent = books.length + videos.length;
}

// ==================== SUBJECTS ====================

function loadSubjects() {
    const container = document.getElementById('subjectsContainer');
    const subjects = getFilteredSubjects();
    
    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-book"></i></div>
                <div class="empty-state-text">No subjects available for your class level and stream</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = subjects.map(subject => `
        <div class="subject-card">
            <div class="subject-icon" style="background: ${getSubjectColor(subject.stream)};">
                <i class="fas fa-book-open"></i>
            </div>
            <div class="subject-name">${subject.name}</div>
            <div class="subject-info">
                <div style="margin-bottom: 0.25rem;">
                    <i class="fas fa-layer-group"></i> ${subject.stream}
                </div>
                <div>
                    <i class="fas fa-graduation-cap"></i> ${subject.classLevel}
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredSubjects() {
    if (!currentStudent || !currentStudent.classLevel || !currentStudent.stream) {
        return [];
    }
    
    const subjects = JSON.parse(localStorage.getItem('brainwave_subjects') || '[]');
    
    return subjects.filter(subject => {
        // Check class level match
        const classMatch = subject.classLevel === currentStudent.classLevel || 
                          subject.classLevel === 'All Levels';
        
        // Check stream match
        const streamMatch = subject.stream === currentStudent.stream || 
                           subject.stream === 'All Streams' ||
                           subject.stream === 'General' || 
                           subject.stream === 'Multi-Stream';
        
        return classMatch && streamMatch;
    });
}

function getSubjectColor(stream) {
    const colors = {
        'Science': '#dbeafe',
        'Humanities': '#fce7f3',
        'Business': '#fef3c7',
        'General': '#e0e7ff',
        'Multi-Stream': '#ddd6fe'
    };
    return colors[stream] || '#f3f4f6';
}

// ==================== LIVE CLASSES ====================

function loadLiveClasses() {
    const dashboardContainer = document.getElementById('liveClassesContainer');
    const allContainer = document.getElementById('allLiveClassesContainer');
    
    const liveClasses = getFilteredLiveClasses();
    
    // Show on dashboard (only active ones)
    const activeLiveClasses = liveClasses.filter(lc => lc.status === 'live');
    
    if (activeLiveClasses.length > 0) {
        dashboardContainer.innerHTML = activeLiveClasses.map(liveClass => createLiveClassCard(liveClass)).join('');
    } else {
        dashboardContainer.innerHTML = '';
    }
    
    // Show all in dedicated section
    if (liveClasses.length === 0) {
        allContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-video"></i></div>
                <div class="empty-state-text">No live classes scheduled for your class level</div>
            </div>
        `;
    } else {
        allContainer.innerHTML = liveClasses.map(liveClass => createLiveClassCard(liveClass)).join('');
    }
}

function getFilteredLiveClasses() {
    // Use default values if currentStudent is not available
    const classLevel = (currentStudent && currentStudent.classLevel) || 'SS3';
    const stream = (currentStudent && currentStudent.stream) || 'Science';
    
    let liveClasses = JSON.parse(localStorage.getItem('brainwave_live_classes') || '[]');
    
    // If no data exists, use static fallback data
    if (liveClasses.length === 0) {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dayAfterTomorrow = new Date(now);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        liveClasses = [
            {
                id: 1,
                subject: 'Mathematics',
                teacher: 'Dr. Sarah Johnson',
                classLevel: classLevel,
                stream: stream,
                date: now.toISOString(),
                time: '10:00 AM',
                status: 'live',
                link: 'https://meet.google.com/sample-math-class',
                topic: 'Calculus Integration Techniques',
                duration: '60 minutes',
                attendees: 45,
                createdAt: now.toISOString()
            },
            {
                id: 2,
                subject: 'Physics',
                teacher: 'Prof. Michael Chen',
                classLevel: classLevel,
                stream: stream,
                date: tomorrow.toISOString(),
                time: '2:00 PM',
                status: 'scheduled',
                link: 'https://meet.google.com/sample-physics-class',
                topic: 'Quantum Mechanics Fundamentals',
                duration: '90 minutes',
                attendees: 0,
                createdAt: now.toISOString()
            },
            {
                id: 3,
                subject: 'Chemistry',
                teacher: 'Dr. Amara Okonkwo',
                classLevel: classLevel,
                stream: stream,
                date: tomorrow.toISOString(),
                time: '4:00 PM',
                status: 'scheduled',
                link: 'https://meet.google.com/sample-chemistry-class',
                topic: 'Organic Chemistry Reactions',
                duration: '75 minutes',
                attendees: 0,
                createdAt: now.toISOString()
            },
            {
                id: 4,
                subject: 'English Language',
                teacher: 'Ms. Jennifer Williams',
                classLevel: classLevel,
                stream: 'All',
                date: dayAfterTomorrow.toISOString(),
                time: '11:00 AM',
                status: 'scheduled',
                link: 'https://meet.google.com/sample-english-class',
                topic: 'Essay Writing Techniques',
                duration: '60 minutes',
                attendees: 0,
                createdAt: now.toISOString()
            },
            {
                id: 5,
                subject: 'Biology',
                teacher: 'Dr. David Thompson',
                classLevel: classLevel,
                stream: stream,
                date: dayAfterTomorrow.toISOString(),
                time: '3:00 PM',
                status: 'scheduled',
                link: 'https://meet.google.com/sample-biology-class',
                topic: 'Cell Division and Genetics',
                duration: '80 minutes',
                attendees: 0,
                createdAt: now.toISOString()
            },
            {
                id: 6,
                subject: 'Economics',
                teacher: 'Prof. Grace Adebayo',
                classLevel: classLevel,
                stream: 'Business',
                date: nextWeek.toISOString(),
                time: '1:00 PM',
                status: 'scheduled',
                link: 'https://meet.google.com/sample-economics-class',
                topic: 'Market Structures and Pricing',
                duration: '70 minutes',
                attendees: 0,
                createdAt: now.toISOString()
            }
        ];
    }
    
    // If we have currentStudent, filter; otherwise return all static data
    if (!currentStudent || !currentStudent.classLevel || !currentStudent.stream) {
        return liveClasses;
    }
    
    return liveClasses.filter(liveClass => {
        const classMatch = liveClass.classLevel === currentStudent.classLevel || 
                          liveClass.classLevel === 'All Levels';
        
        const streamMatch = liveClass.stream === currentStudent.stream || 
                           liveClass.stream === 'All Streams';
        
        // Payment-based filtering
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        const accessLevel = liveClass.accessLevel || 'bootcamp';
        const accessMatch = isPaid || accessLevel === 'bootcamp';
        
        return classMatch && streamMatch && accessMatch;
    });
}

function createLiveClassCard(liveClass) {
    const isLive = liveClass.status === 'live';
    
    return `
        <div class="live-class-card" style="${!isLive ? 'background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);' : ''}">
            ${isLive ? `
                <div class="live-indicator">
                    <div class="live-dot"></div>
                    LIVE NOW
                </div>
            ` : `
                <div class="live-indicator">
                    <i class="fas fa-clock"></i>
                    SCHEDULED
                </div>
            `}
            <div class="live-class-title">${liveClass.subject || 'Live Class'}</div>
            <div class="live-class-info">
                <div><i class="fas fa-user"></i> ${liveClass.teacher || 'Teacher'}</div>
                <div><i class="fas fa-calendar"></i> ${formatDate(liveClass.date)} at ${liveClass.time}</div>
                <div><i class="fas fa-layer-group"></i> ${liveClass.classLevel} - ${liveClass.stream}</div>
            </div>
            ${isLive && liveClass.link ? `
                <button class="join-button" onclick="joinLiveClass('${liveClass.link}')">
                    <i class="fas fa-video"></i>
                    Join Class Now
                </button>
            ` : `
                <button class="join-button" style="background: var(--gray-300); color: var(--gray-700); cursor: not-allowed;" disabled>
                    <i class="fas fa-clock"></i>
                    Not Started Yet
                </button>
            `}
        </div>
    `;
}

function joinLiveClass(link) {
    if (link) {
        window.open(link, '_blank');
        showToast('Opening live class...', 'success');
    } else {
        showToast('Live class link not available', 'error');
    }
}

// ==================== ASSESSMENTS (QUIZZES, ASSIGNMENTS, MOCKS) ====================

function loadQuizzes() {
    const container = document.getElementById('quizzesContainer');
    
    // Debug: Check what data we have
    console.log('🔍 Debugging loadQuizzes...');
    console.log('Current student:', currentStudent);
    
    const quizzes = getFilteredAssessments('quiz');
    const assignments = getFilteredAssessments('assignment');
    const allItems = [...quizzes, ...assignments];
    
    console.log('Quizzes found:', quizzes.length);
    console.log('Assignments found:', assignments.length);
    console.log('Total items:', allItems.length);
    console.log('All items:', allItems);
    
    if (allItems.length === 0) {
        console.log('⚠️ No items found, showing empty state');
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-clipboard-question"></i></div>
                <div class="empty-state-text">No quizzes or assignments available</div>
            </div>
        `;
        return;
    }
    
    console.log('✅ Rendering', allItems.length, 'items');
    container.innerHTML = allItems.map(item => createAssessmentCard(item)).join('');
}

function loadMockExams() {
    const container = document.getElementById('mockExamsContainer');
    const mocks = getFilteredAssessments('mock');
    
    if (mocks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-file-alt"></i></div>
                <div class="empty-state-text">No mock exams available</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = mocks.map(mock => createAssessmentCard(mock)).join('');
}

function getFilteredAssessments(type) {
    // Use default values if currentStudent is not available
    const classLevel = (currentStudent && currentStudent.classLevel) || 'SS3';
    const stream = (currentStudent && currentStudent.stream) || 'Science';
    
    console.log(`🔍 getFilteredAssessments(${type}):`, { classLevel, stream, currentStudent });
    
    // Both quizzes and assignments are stored in 'brainwave_quizs'
    const storageKey = (type === 'quiz' || type === 'assignment') ? 'brainwave_quizs' : 'brainwave_mocks';
    let assessments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    console.log(`📊 Raw assessments from ${storageKey}:`, assessments.length, assessments);
    
    // Always ensure we have static data for testing - force load if empty
    if (assessments.length === 0) {
        console.log('🔄 No assessments found, creating fallback data for:', { classLevel, stream });
        const now = new Date();
        const futureDate = new Date(now);
        futureDate.setDate(futureDate.getDate() + 7);
        
        if (type === 'quiz') {
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            const twoWeeks = new Date(now);
            twoWeeks.setDate(twoWeeks.getDate() + 14);
            
            assessments = [
                {
                    id: 'quiz_1',
                    type: 'quiz',
                    title: 'Quadratic Equations Quiz',
                    subject: 'Mathematics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '30',
                    totalMarks: 50,
                    questions: 15,
                    status: 'available',
                    description: 'Test your understanding of quadratic equations and their solutions',
                    createdAt: now.toISOString()
                },
                {
                    id: 'quiz_2',
                    type: 'quiz',
                    title: 'Chemical Reactions Quiz',
                    subject: 'Chemistry',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '25',
                    totalMarks: 40,
                    questions: 12,
                    status: 'available',
                    description: 'Identify different types of chemical reactions and balance equations',
                    createdAt: now.toISOString()
                },
                {
                    id: 'quiz_3',
                    type: 'quiz',
                    title: 'Physics Mechanics Quiz',
                    subject: 'Physics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: nextWeek.toISOString(),
                    duration: '35',
                    totalMarks: 60,
                    questions: 18,
                    status: 'available',
                    description: 'Newton\'s laws, motion, and forces in physics',
                    createdAt: now.toISOString()
                },
                {
                    id: 'quiz_4',
                    type: 'quiz',
                    title: 'English Grammar Quiz',
                    subject: 'English Language',
                    classLevel: classLevel,
                    stream: 'All',
                    dueDate: nextWeek.toISOString(),
                    duration: '20',
                    totalMarks: 30,
                    questions: 10,
                    status: 'available',
                    description: 'Parts of speech, tenses, and sentence structure',
                    createdAt: now.toISOString()
                },
                {
                    id: 'quiz_5',
                    type: 'quiz',
                    title: 'Biology Cell Structure Quiz',
                    subject: 'Biology',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: twoWeeks.toISOString(),
                    duration: '28',
                    totalMarks: 45,
                    questions: 14,
                    status: 'available',
                    description: 'Cell organelles, functions, and cellular processes',
                    createdAt: now.toISOString()
                }
            ];
        } else if (type === 'assignment') {
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            const twoWeeks = new Date(now);
            twoWeeks.setDate(twoWeeks.getDate() + 14);
            
            assessments = [
                {
                    id: 'assignment_1',
                    type: 'assignment',
                    title: 'Newton\'s Laws Assignment',
                    subject: 'Physics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '45',
                    totalMarks: 100,
                    status: 'available',
                    description: 'Solve problems involving Newton\'s three laws of motion',
                    instructions: 'Complete all 5 problems and show your work clearly',
                    createdAt: now.toISOString()
                },
                {
                    id: 'assignment_2',
                    type: 'assignment',
                    title: 'Cell Biology Assignment',
                    subject: 'Biology',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '40',
                    totalMarks: 80,
                    status: 'available',
                    description: 'Research and explain cellular processes',
                    instructions: 'Write a 1000-word essay on cell division',
                    createdAt: now.toISOString()
                },
                {
                    id: 'assignment_3',
                    type: 'assignment',
                    title: 'Mathematics Problem Set',
                    subject: 'Mathematics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: nextWeek.toISOString(),
                    duration: '60',
                    totalMarks: 120,
                    status: 'available',
                    description: 'Advanced calculus problems and applications',
                    instructions: 'Solve 8 problems showing complete solutions',
                    createdAt: now.toISOString()
                },
                {
                    id: 'assignment_4',
                    type: 'assignment',
                    title: 'Chemistry Lab Report',
                    subject: 'Chemistry',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: nextWeek.toISOString(),
                    duration: '50',
                    totalMarks: 90,
                    status: 'available',
                    description: 'Write a comprehensive lab report on titration',
                    instructions: 'Include hypothesis, procedure, results, and conclusion',
                    createdAt: now.toISOString()
                },
                {
                    id: 'assignment_5',
                    type: 'assignment',
                    title: 'English Essay Assignment',
                    subject: 'English Language',
                    classLevel: classLevel,
                    stream: 'All',
                    dueDate: twoWeeks.toISOString(),
                    duration: '90',
                    totalMarks: 100,
                    status: 'available',
                    description: 'Write a persuasive essay on environmental conservation',
                    instructions: '1500 words minimum with proper citations',
                    createdAt: now.toISOString()
                }
            ];
        } else if (type === 'mock') {
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            const twoWeeks = new Date(now);
            twoWeeks.setDate(twoWeeks.getDate() + 14);
            const nextMonth = new Date(now);
            nextMonth.setDate(nextMonth.getDate() + 30);
            
            assessments = [
                {
                    id: 'mock_1',
                    type: 'mock',
                    title: 'WAEC Mathematics Mock Exam',
                    subject: 'Mathematics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '120',
                    totalMarks: 100,
                    questions: 50,
                    status: 'available',
                    description: 'Comprehensive WAEC Mathematics practice test',
                    examType: 'WAEC',
                    createdAt: now.toISOString()
                },
                {
                    id: 'mock_2',
                    type: 'mock',
                    title: 'JAMB Physics Practice Test',
                    subject: 'Physics',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: futureDate.toISOString(),
                    duration: '90',
                    totalMarks: 100,
                    questions: 40,
                    status: 'available',
                    description: 'JAMB Physics mock examination',
                    examType: 'JAMB',
                    createdAt: now.toISOString()
                },
                {
                    id: 'mock_3',
                    type: 'mock',
                    title: 'NECO Chemistry Mock Exam',
                    subject: 'Chemistry',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: nextWeek.toISOString(),
                    duration: '100',
                    totalMarks: 100,
                    questions: 45,
                    status: 'available',
                    description: 'NECO Chemistry comprehensive test',
                    examType: 'NECO',
                    createdAt: now.toISOString()
                },
                {
                    id: 'mock_4',
                    type: 'mock',
                    title: 'JAMB English Language Test',
                    subject: 'English Language',
                    classLevel: classLevel,
                    stream: 'All',
                    dueDate: nextWeek.toISOString(),
                    duration: '75',
                    totalMarks: 100,
                    questions: 35,
                    status: 'available',
                    description: 'JAMB English Language practice test',
                    examType: 'JAMB',
                    createdAt: now.toISOString()
                },
                {
                    id: 'mock_5',
                    type: 'mock',
                    title: 'WAEC Biology Mock Exam',
                    subject: 'Biology',
                    classLevel: classLevel,
                    stream: stream,
                    dueDate: twoWeeks.toISOString(),
                    duration: '110',
                    totalMarks: 100,
                    questions: 48,
                    status: 'available',
                    description: 'WAEC Biology comprehensive examination',
                    examType: 'WAEC',
                    createdAt: now.toISOString()
                },
                {
                    id: 'mock_6',
                    type: 'mock',
                    title: 'JAMB Economics Practice Test',
                    subject: 'Economics',
                    classLevel: classLevel,
                    stream: 'Business',
                    dueDate: nextMonth.toISOString(),
                    duration: '85',
                    totalMarks: 100,
                    questions: 38,
                    status: 'available',
                    description: 'JAMB Economics mock examination',
                    examType: 'JAMB',
                    createdAt: now.toISOString()
                }
            ];
        }
    }
    
    // If we have currentStudent, filter; otherwise return all matching type
    if (!currentStudent || !currentStudent.classLevel || !currentStudent.stream) {
        console.log(`⚠️ No currentStudent data, returning all ${type} assessments:`, assessments.filter(assessment => assessment.type === type).length);
        return assessments.filter(assessment => assessment.type === type);
    }
    
    const filtered = assessments.filter(assessment => {
        const typeMatch = assessment.type === type;
        
        // More lenient filtering - show items if they match type and either class or stream
        const classMatch = assessment.classLevel === currentStudent.classLevel || 
                          assessment.classLevel === 'All Levels' ||
                          !assessment.classLevel; // Show if no class level specified
        
        const streamMatch = assessment.stream === currentStudent.stream || 
                           assessment.stream === 'All Streams' ||
                           !assessment.stream; // Show if no stream specified
        
        // Payment-based filtering
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        const accessLevel = assessment.accessLevel || 'bootcamp'; // Default to bootcamp if not specified
        
        // If student is paid, they can access everything
        // If student is bootcamp, they can only access bootcamp content
        const accessMatch = isPaid || accessLevel === 'bootcamp';
        
        const result = typeMatch && (classMatch || streamMatch) && accessMatch;
        
        if (!result) {
            console.log(`❌ Filtered out:`, {
                title: assessment.title,
                type: assessment.type,
                classLevel: assessment.classLevel,
                stream: assessment.stream,
                accessLevel: accessLevel,
                studentClass: currentStudent.classLevel,
                studentStream: currentStudent.stream,
                studentPaid: isPaid,
                typeMatch,
                classMatch,
                streamMatch,
                accessMatch
            });
        } else {
            console.log(`✅ Included:`, {
                title: assessment.title,
                type: assessment.type,
                classLevel: assessment.classLevel,
                stream: assessment.stream,
                accessLevel: accessLevel
            });
        }
        
        return result;
    });
    
    console.log(`✅ Filtered ${type} assessments:`, filtered.length, 'out of', assessments.length);
    return filtered;
}

function createAssessmentCard(assessment) {
    const typeColors = {
        'quiz': '#3b82f6',
        'assignment': '#f59e0b',
        'mock': '#ef4444'
    };
    
    const typeIcons = {
        'quiz': 'clipboard-question',
        'assignment': 'file-lines',
        'mock': 'file-alt'
    };
    
    const type = assessment.type || 'quiz';
    const color = typeColors[type] || '#3b82f6';
    
    return `
        <div class="assessment-card" style="border-left-color: ${color};">
            <div class="assessment-header">
                <div>
                    <div class="assessment-title">${assessment.title}</div>
                    <div class="assessment-subject">
                        <i class="fas fa-book"></i> ${assessment.subject}
                    </div>
                </div>
                <div class="material-badge" style="background: ${color}20; color: ${color};">
                    <i class="fas fa-${typeIcons[type]}"></i> ${type.toUpperCase()}
                </div>
            </div>
            <div class="assessment-meta">
                <div><i class="fas fa-calendar"></i> Due: ${formatDate(assessment.dueDate)}</div>
                <div><i class="fas fa-clock"></i> ${assessment.duration || '30'} mins</div>
                ${assessment.totalMarks ? `<div><i class="fas fa-star"></i> ${assessment.totalMarks} marks</div>` : ''}
            </div>
            <div class="assessment-footer">
                <div style="font-size: 0.875rem; color: var(--gray-600);">
                    <i class="fas fa-layer-group"></i> ${assessment.classLevel} - ${assessment.stream}
                </div>
                <button class="assessment-button" onclick="startAssessment('${assessment.id || ''}', '${type}')">
                    Start ${type === 'quiz' ? 'Quiz' : type === 'assignment' ? 'Assignment' : 'Mock Exam'}
                </button>
            </div>
        </div>
    `;
}

// Make function globally accessible
window.startAssessment = function(id, type) {
    console.log('🎯 startAssessment called with:', { id, type });
    
    if (!id || id === '' || id === 'undefined') {
        console.error('❌ Invalid assessment ID:', id);
        alert('Assessment ID not found. Please try again.');
        return;
    }
    
    console.log(`✅ Starting ${type} with ID:`, id);
    
    // Navigate to assessment page with parameters
    const url = `take-assessment.html?id=${id}&type=${type}`;
    console.log('🔗 Navigating to:', url);
    window.location.href = url;
};

// ==================== STUDY MATERIALS ====================

function loadStudyMaterials() {
    filterStudyMaterials('all');
}

function filterStudyMaterials(filter) {
    const container = document.getElementById('studyMaterialsContainer');
    
    let materials = [];
    
    if (filter === 'all' || filter === 'books') {
        const books = getFilteredBooks();
        materials = materials.concat(books.map(book => ({...book, type: 'book'})));
    }
    
    if (filter === 'all' || filter === 'videos') {
        const videos = getFilteredVideos();
        materials = materials.concat(videos.map(video => ({...video, type: 'video'})));
    }
    
    if (materials.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-graduation-cap"></i></div>
                <div class="empty-state-text">No study materials available</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = materials.map(material => createMaterialCard(material)).join('');
    
    // Add event listeners for material buttons
    attachMaterialEventListeners();
    // Apply copy protection
    applyCopyProtection();
}

function getFilteredBooks() {
    // Use default values if currentStudent is not available
    const classLevel = (currentStudent && currentStudent.classLevel) || 'SS3';
    const stream = (currentStudent && currentStudent.stream) || 'Science';
    
    let books = JSON.parse(localStorage.getItem('brainwave_books') || '[]');
    
    // If no data exists, use static fallback data
    if (books.length === 0) {
        const now = new Date();
        books = [
            {
                id: 1,
                title: 'Advanced Mathematics for ' + classLevel,
                subject: 'Mathematics',
                classLevel: classLevel,
                stream: stream,
                description: 'Comprehensive mathematics textbook covering calculus, algebra, and geometry.',
                link: 'https://drive.google.com/file/sample-math-book',
                thumbnail: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Math+Book',
                pages: 450,
                author: 'Dr. Sarah Johnson',
                publisher: 'Educational Press',
                createdAt: now.toISOString()
            },
            {
                id: 2,
                title: 'Physics Fundamentals',
                subject: 'Physics',
                classLevel: classLevel,
                stream: stream,
                description: 'Essential physics concepts with practical examples and experiments.',
                link: 'https://drive.google.com/file/sample-physics-book',
                thumbnail: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Physics+Book',
                pages: 380,
                author: 'Prof. Michael Chen',
                publisher: 'Science Publications',
                createdAt: now.toISOString()
            },
            {
                id: 3,
                title: 'Chemistry Made Easy',
                subject: 'Chemistry',
                classLevel: classLevel,
                stream: stream,
                description: 'Simplified chemistry textbook with diagrams and laboratory procedures.',
                link: 'https://drive.google.com/file/sample-chemistry-book',
                thumbnail: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Chemistry+Book',
                pages: 320,
                author: 'Dr. Amara Okonkwo',
                publisher: 'Chemistry World',
                createdAt: now.toISOString()
            },
            {
                id: 4,
                title: 'Biology Essentials',
                subject: 'Biology',
                classLevel: classLevel,
                stream: stream,
                description: 'Complete biology guide covering cell biology, genetics, and evolution.',
                link: 'https://drive.google.com/file/sample-biology-book',
                thumbnail: 'https://via.placeholder.com/300x400/16a34a/ffffff?text=Biology+Book',
                pages: 420,
                author: 'Dr. David Thompson',
                publisher: 'Life Sciences Press',
                createdAt: now.toISOString()
            },
            {
                id: 5,
                title: 'English Language Mastery',
                subject: 'English Language',
                classLevel: classLevel,
                stream: 'All',
                description: 'Comprehensive guide to English grammar, literature, and composition.',
                link: 'https://drive.google.com/file/sample-english-book',
                thumbnail: 'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=English+Book',
                pages: 350,
                author: 'Ms. Jennifer Williams',
                publisher: 'Language Humanities Press',
                createdAt: now.toISOString()
            },
            {
                id: 6,
                title: 'Economics Principles',
                subject: 'Economics',
                classLevel: classLevel,
                stream: 'Business',
                description: 'Introduction to microeconomics and macroeconomics concepts.',
                link: 'https://drive.google.com/file/sample-economics-book',
                thumbnail: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=Economics+Book',
                pages: 280,
                author: 'Prof. Grace Adebayo',
                publisher: 'Business Publications',
                createdAt: now.toISOString()
            },
            {
                id: 7,
                title: 'WAEC Past Questions - Mathematics',
                subject: 'Mathematics',
                classLevel: classLevel,
                stream: stream,
                description: 'Collection of WAEC Mathematics past questions with detailed solutions.',
                link: 'https://drive.google.com/file/sample-waec-math',
                thumbnail: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=WAEC+Math',
                pages: 200,
                author: 'WAEC Board',
                publisher: 'WAEC Publications',
                createdAt: now.toISOString()
            },
            {
                id: 8,
                title: 'JAMB Physics Questions Bank',
                subject: 'Physics',
                classLevel: classLevel,
                stream: stream,
                description: 'Comprehensive JAMB Physics practice questions with answers.',
                link: 'https://drive.google.com/file/sample-jamb-physics',
                thumbnail: 'https://via.placeholder.com/300x400/10b981/ffffff?text=JAMB+Physics',
                pages: 180,
                author: 'JAMB Board',
                publisher: 'JAMB Publications',
                createdAt: now.toISOString()
            }
        ];
    }
    
    // If we have currentStudent, filter; otherwise return all static data
    if (!currentStudent || !currentStudent.classLevel || !currentStudent.stream) {
        return books;
    }
    
    return books.filter(book => {
        const classMatch = book.classLevel === currentStudent.classLevel || 
                          book.classLevel === 'All Levels';
        
        const streamMatch = book.stream === currentStudent.stream || 
                           book.stream === 'All Streams';
        
        // Payment-based filtering
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        const accessLevel = book.accessLevel || 'bootcamp';
        const accessMatch = isPaid || accessLevel === 'bootcamp';
        
        return classMatch && streamMatch && accessMatch;
    });
}

function getFilteredVideos() {
    // Use default values if currentStudent is not available
    const classLevel = (currentStudent && currentStudent.classLevel) || 'SS3';
    const stream = (currentStudent && currentStudent.stream) || 'Science';
    
    let videos = JSON.parse(localStorage.getItem('brainwave_videos') || '[]');
    
    // If no data exists, use static fallback data
    if (videos.length === 0) {
        const now = new Date();
        videos = [
            {
                id: 1,
                title: 'Introduction to Calculus',
                subject: 'Mathematics',
                classLevel: classLevel,
                stream: stream,
                description: 'Learn the basics of differentiation and integration with step-by-step examples.',
                link: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
                duration: '45:30',
                views: 12500,
                instructor: 'Dr. Sarah Johnson',
                createdAt: now.toISOString()
            },
            {
                id: 2,
                title: 'Understanding Newton\'s Laws',
                subject: 'Physics',
                classLevel: classLevel,
                stream: stream,
                description: 'Comprehensive explanation of Newton\'s three laws with real-world applications.',
                link: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
                duration: '38:15',
                views: 8900,
                instructor: 'Prof. Michael Chen',
                createdAt: now.toISOString()
            },
            {
                id: 3,
                title: 'Chemical Reactions Explained',
                subject: 'Chemistry',
                classLevel: classLevel,
                stream: stream,
                description: 'Visual guide to different types of chemical reactions and balancing equations.',
                link: 'https://www.youtube.com/watch?v=7ERzPFCE7B0',
                duration: '42:20',
                views: 15600,
                instructor: 'Dr. Amara Okonkwo',
                createdAt: now.toISOString()
            },
            {
                id: 4,
                title: 'Cell Structure and Function',
                subject: 'Biology',
                classLevel: classLevel,
                stream: stream,
                description: 'Detailed exploration of cell organelles and their functions.',
                link: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
                duration: '35:45',
                views: 11200,
                instructor: 'Dr. David Thompson',
                createdAt: now.toISOString()
            },
            {
                id: 5,
                title: 'Trigonometry Basics',
                subject: 'Mathematics',
                classLevel: classLevel,
                stream: stream,
                description: 'Master sine, cosine, and tangent with practical examples.',
                link: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
                duration: '28:10',
                views: 9800,
                instructor: 'Dr. Sarah Johnson',
                createdAt: now.toISOString()
            },
            {
                id: 6,
                title: 'English Grammar Masterclass',
                subject: 'English Language',
                classLevel: classLevel,
                stream: 'All',
                description: 'Complete guide to English grammar rules and usage.',
                link: 'https://www.youtube.com/watch?v=example-english',
                duration: '52:30',
                views: 18700,
                instructor: 'Ms. Jennifer Williams',
                createdAt: now.toISOString()
            },
            {
                id: 7,
                title: 'Economics Fundamentals',
                subject: 'Economics',
                classLevel: classLevel,
                stream: 'Business',
                description: 'Introduction to microeconomics and macroeconomics concepts.',
                link: 'https://www.youtube.com/watch?v=example-economics',
                duration: '41:25',
                views: 7600,
                instructor: 'Prof. Grace Adebayo',
                createdAt: now.toISOString()
            },
            {
                id: 8,
                title: 'WAEC Mathematics Past Questions Review',
                subject: 'Mathematics',
                classLevel: classLevel,
                stream: stream,
                description: 'Detailed solutions to WAEC Mathematics past questions.',
                link: 'https://www.youtube.com/watch?v=example-waec-math',
                duration: '65:15',
                views: 22300,
                instructor: 'Dr. Sarah Johnson',
                createdAt: now.toISOString()
            },
            {
                id: 9,
                title: 'JAMB Physics Problem Solving',
                subject: 'Physics',
                classLevel: classLevel,
                stream: stream,
                description: 'Step-by-step solutions to JAMB Physics problems.',
                link: 'https://www.youtube.com/watch?v=example-jamb-physics',
                duration: '48:40',
                views: 15400,
                instructor: 'Prof. Michael Chen',
                createdAt: now.toISOString()
            },
            {
                id: 10,
                title: 'Chemistry Laboratory Techniques',
                subject: 'Chemistry',
                classLevel: classLevel,
                stream: stream,
                description: 'Essential laboratory techniques and safety procedures.',
                link: 'https://www.youtube.com/watch?v=example-chem-lab',
                duration: '33:55',
                views: 9200,
                instructor: 'Dr. Amara Okonkwo',
                createdAt: now.toISOString()
            }
        ];
    }
    
    // If we have currentStudent, filter; otherwise return all static data
    if (!currentStudent || !currentStudent.classLevel || !currentStudent.stream) {
        return videos;
    }
    
    return videos.filter(video => {
        const classMatch = video.classLevel === currentStudent.classLevel || 
                          video.classLevel === 'All Levels';
        
        const streamMatch = video.stream === currentStudent.stream || 
                           video.stream === 'All Streams';
        
        // Payment-based filtering
        const isPaid = currentStudent.isPaid || currentStudent.paymentStatus === 'paid';
        const accessLevel = video.accessLevel || 'bootcamp';
        const accessMatch = isPaid || accessLevel === 'bootcamp';
        
        return classMatch && streamMatch && accessMatch;
    });
}

function createMaterialCard(material) {
    const isVideo = material.type === 'video';
    const thumbnail = isVideo ? getYouTubeThumbnail(material.link) : (material.thumbnail || 'https://via.placeholder.com/300x160?text=eBook');
    // Generate unique ID for secure link handling
    const materialId = 'mat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    // Store link securely
    window.secureLinks = window.secureLinks || {};
    window.secureLinks[materialId] = material.link;
    
    return `
        <div class="material-card no-copy-zone" data-material-id="${materialId}" data-material-type="${isVideo ? 'video' : 'book'}">
            <div class="material-content">
                <div class="material-title">${material.title}</div>
                <div class="material-description">${material.description || 'No description available'}</div>
                <div class="material-meta">
                    <span><i class="fas fa-book"></i> ${material.subject}</span>
                    <span class="material-badge ${isVideo ? 'badge-video' : 'badge-book'}">
                        <i class="fas fa-${isVideo ? 'video' : 'book'}"></i> ${isVideo ? 'Video' : 'eBook'}
                    </span>
                </div>
                <button class="material-button" data-action="open-material">
                    <i class="fas fa-${isVideo ? 'play' : 'download'}"></i>
                    ${isVideo ? 'Watch Video' : 'Download eBook'}
                </button>
            </div>
        </div>
    `;
}

function getYouTubeThumbnail(url) {
    // Extract video ID from YouTube URL
    const videoId = extractYouTubeVideoId(url);
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return 'https://via.placeholder.com/300x160?text=Video';
}

function extractYouTubeVideoId(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

function openMaterial(materialId, type) {
    // Retrieve link from secure storage
    const link = window.secureLinks && window.secureLinks[materialId];
    if (link) {
        // Open in embedded viewer to hide URL from address bar
        openEmbeddedViewer(link, type);
        showToast(`Opening ${type}...`, 'success');
    } else {
        showToast('Link not available', 'error');
    }
}

// Open material in embedded viewer (hides URL from address bar)
function openEmbeddedViewer(link, type) {
    let embedCode = '';
    
    if (type === 'video') {
        // Extract YouTube video ID and create embed
        const videoId = extractYouTubeVideoId(link);
        if (videoId) {
            embedCode = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="border: none;">
                </iframe>
            `;
        }
    } else if (type === 'book') {
        // Extract Google Drive file ID and create embed
        const fileId = extractGoogleDriveFileId(link);
        if (fileId) {
            embedCode = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://drive.google.com/file/d/${fileId}/preview" 
                    frameborder="0"
                    style="border: none;">
                </iframe>
            `;
        }
    }
    
    if (embedCode) {
        // Show modal with embedded content
        showMaterialModal(embedCode, type);
    } else {
        // Fallback: open in new tab if embedding fails
        window.open(link, '_blank');
    }
}

// Extract Google Drive file ID from URL
function extractGoogleDriveFileId(url) {
    if (!url) return null;
    
    const patterns = [
        /\/file\/d\/([^\/\?]+)/,
        /id=([^&\?]+)/,
        /\/open\?id=([^&\?]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Show material in modal viewer
function showMaterialModal(embedCode, type) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('materialViewerModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'materialViewerModal';
        modal.className = 'material-viewer-modal';
        modal.innerHTML = `
            <div class="material-viewer-overlay"></div>
            <div class="material-viewer-content">
                <button class="material-viewer-close" onclick="closeMaterialModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="material-viewer-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close on overlay click
        modal.querySelector('.material-viewer-overlay').addEventListener('click', closeMaterialModal);
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMaterialModal();
            }
        });
    }
    
    // Set content
    modal.querySelector('.material-viewer-body').innerHTML = embedCode;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close material viewer modal
function closeMaterialModal() {
    const modal = document.getElementById('materialViewerModal');
    if (modal) {
        modal.style.display = 'none';
        modal.querySelector('.material-viewer-body').innerHTML = '';
        document.body.style.overflow = '';
    }
}

// Make globally accessible
window.closeMaterialModal = closeMaterialModal;

// Attach event listeners to material buttons
function attachMaterialEventListeners() {
    const materialButtons = document.querySelectorAll('[data-action="open-material"]');
    materialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.material-card');
            if (card) {
                const materialId = card.getAttribute('data-material-id');
                const materialType = card.getAttribute('data-material-type');
                openMaterial(materialId, materialType);
            }
        });
    });
}

// Apply comprehensive copy protection to study materials
function applyCopyProtection() {
    const noCopyZones = document.querySelectorAll('.no-copy-zone');
    
    noCopyZones.forEach(zone => {
        // Prevent right-click context menu
        zone.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showToast('Copying links is not allowed', 'error');
            return false;
        });
        
        // Prevent text selection
        zone.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent copy action
        zone.addEventListener('copy', function(e) {
            e.preventDefault();
            showToast('Copying is disabled for security', 'error');
            return false;
        });
        
        // Prevent drag
        zone.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent keyboard shortcuts (Ctrl+C, Ctrl+A, etc.)
        zone.addEventListener('keydown', function(e) {
            // Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+U (view source)
            if ((e.ctrlKey || e.metaKey) && (
                e.key === 'c' || e.key === 'C' ||
                e.key === 'a' || e.key === 'A' ||
                e.key === 'x' || e.key === 'X' ||
                e.key === 'u' || e.key === 'U'
            )) {
                e.preventDefault();
                showToast('This action is not allowed', 'error');
                return false;
            }
        });
    });
    
    // Additional protection: prevent inspect element on material cards
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
        ) {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.closest('.no-copy-zone')) {
                e.preventDefault();
                showToast('Developer tools are restricted for this content', 'error');
                return false;
            }
        }
    });
}

// ==================== REPORTS ====================

function loadReports() {
    const container = document.getElementById('reportsContainer');
    if (!container) return;
    
    // Get student reports from localStorage
    const reports = JSON.parse(localStorage.getItem('brainwave_reports') || '[]');
    console.log('📚 Total reports in storage:', reports.length);
    const studentReports = currentStudent ? reports.filter(r => r.studentId === currentStudent.id) : reports;
    console.log('📚 Student reports found:', studentReports.length, 'for student ID:', currentStudent?.id);
    
    if (studentReports.length === 0) {
        // Show static default report data
        container.innerHTML = `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Student Name</th>
                            <th style="text-align: center;">Class</th>
                            <th style="text-align: center;">Stream</th>
                            <th style="text-align: center;">Mathematics</th>
                            <th style="text-align: center;">Physics</th>
                            <th style="text-align: center;">Chemistry</th>
                            <th style="text-align: center;">Biology</th>
                            <th style="text-align: center;">English</th>
                            <th style="text-align: center;">Average</th>
                            <th style="text-align: center;">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
                                        ${getInitials(currentStudent.name)}
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: var(--gray-900);">${currentStudent.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--gray-500);">${currentStudent.studentCode || 'N/A'}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center; font-weight: 600;">${currentStudent.classLevel}</td>
                            <td style="text-align: center;">
                                <span style="background: var(--gray-100); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: var(--gray-700);">
                                    ${currentStudent.stream}
                                </span>
                            </td>
                            <td style="text-align: center;"><span class="score-badge excellent">85%</span></td>
                            <td style="text-align: center;"><span class="score-badge good">78%</span></td>
                            <td style="text-align: center;"><span class="score-badge excellent">82%</span></td>
                            <td style="text-align: center;"><span class="score-badge excellent">88%</span></td>
                            <td style="text-align: center;"><span class="score-badge good">76%</span></td>
                            <td style="text-align: center;"><span class="score-badge excellent" style="font-weight: 700; font-size: 1rem;">82%</span></td>
                            <td style="text-align: center;">
                                <span style="background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 12px; font-weight: 700; font-size: 1rem;">
                                    A
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        return;
    }
    
    const avgScore = calculateAverage(studentReports);
    const grade = getGrade(avgScore);
    
    container.innerHTML = `
        <table class="reports-table">
            <thead>
                <tr>
                    <th style="text-align: left;">Student Name</th>
                    <th style="text-align: center;">Class</th>
                    <th style="text-align: center;">Stream</th>
                    ${studentReports.map(report => `<th style="text-align: center;">${report.subject}</th>`).join('')}
                    <th style="text-align: center;">Average</th>
                    <th style="text-align: center;">Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight: 600;">${currentStudent ? currentStudent.name : 'Student'}</td>
                    <td style="text-align: center;">${currentStudent ? currentStudent.classLevel : 'N/A'}</td>
                    <td style="text-align: center;">${currentStudent ? currentStudent.stream : 'N/A'}</td>
                    ${studentReports.map(report => {
                        const percentage = report.percentage || Math.round((report.score / report.totalMarks) * 100);
                        return `<td style="text-align: center;">
                            <span class="score-badge ${getScoreClass(percentage)}">
                                ${percentage}%
                            </span>
                        </td>`;
                    }).join('')}
                    <td style="text-align: center;">
                        <span class="score-badge ${getScoreClass(avgScore)}">
                            ${avgScore}%
                        </span>
                    </td>
                    <td style="text-align: center; font-weight: 600; color: ${getGradeColor(avgScore)}">
                        ${grade}
                    </td>
                </tr>
            </tbody>
        </table>
    `;
}

// Helper functions
function calculateAverage(reports) {
    if (reports.length === 0) return 0;
    const total = reports.reduce((sum, report) => {
        const percentage = report.percentage || ((report.score / report.totalMarks) * 100);
        return sum + percentage;
    }, 0);
    return Math.round(total / reports.length);
}

function getScoreClass(percentage) {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-average';
    return 'score-poor';
}

function getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    if (percentage >= 40) return 'E';
    return 'F';
}

function getGradeColor(percentage) {
    if (percentage >= 80) return '#16a34a';
    if (percentage >= 60) return '#2563eb';
    if (percentage >= 40) return '#d97706';
    return '#dc2626';
}

function getTypeColor(type) {
    const colors = {
        'quiz': '#3b82f6',
        'assignment': '#f59e0b',
        'mock': '#ef4444'
    };
    return colors[type] || '#3b82f6';
}

// ==================== ANNOUNCEMENTS ====================

function loadAnnouncements() {
    const recentContainer = document.getElementById('recentAnnouncementsContainer');
    const allContainer = document.getElementById('allAnnouncementsContainer');
    
    const announcements = getFilteredAnnouncements();
    
    if (announcements.length === 0) {
        const emptyState = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-bullhorn"></i></div>
                <div class="empty-state-text">No announcements available</div>
            </div>
        `;
        recentContainer.innerHTML = emptyState;
        allContainer.innerHTML = emptyState;
        return;
    }
    
    // Show recent (last 3) on dashboard
    const recent = announcements.slice(0, 3);
    recentContainer.innerHTML = recent.map(announcement => createAnnouncementCard(announcement)).join('');
    
    // Show all in dedicated section
    allContainer.innerHTML = announcements.map(announcement => createAnnouncementCard(announcement)).join('');
}

function getFilteredAnnouncements() {
    if (!currentStudent || !currentStudent.classLevel) {
        return [];
    }
    
    const announcements = JSON.parse(localStorage.getItem('brainwave_announcements') || '[]');
    
    return announcements
        .filter(announcement => {
            // Filter by class level if specified
            if (announcement.classLevel && announcement.classLevel !== 'All Levels') {
                return announcement.classLevel === currentStudent.classLevel;
            }
            return true;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createAnnouncementCard(announcement) {
    return `
        <div class="announcement-card">
            <div class="announcement-header">
                <div class="announcement-title">
                    <i class="fas fa-bullhorn"></i> ${announcement.title}
                </div>
                <div class="announcement-date">${formatDate(announcement.createdAt)}</div>
            </div>
            <div class="announcement-message">${announcement.message}</div>
            ${announcement.classLevel ? `
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--gray-500);">
                    <i class="fas fa-graduation-cap"></i> ${announcement.classLevel}
                </div>
            ` : ''}
        </div>
    `;
}

// ==================== ACHIEVEMENTS ====================

function loadAchievements() {
    const container = document.getElementById('achievementsTableContainer');
    if (!container) return;
    
    if (!currentStudent) {
        container.innerHTML = '<div class="empty-state"><p>Please log in to view achievements</p></div>';
        return;
    }
    
    const reports = JSON.parse(localStorage.getItem('brainwave_reports') || '[]');
    console.log('📊 Total reports in storage:', reports.length);
    const studentReports = reports.filter(r => r.studentId === currentStudent.id);
    console.log('📊 Student reports found:', studentReports.length, 'for student ID:', currentStudent.id);
    
    if (studentReports.length === 0) {
        // Show default static achievements data
        const totalBadges = 5;
        
        container.innerHTML = `
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="text-align: left;">Student Name</th>
                            <th style="text-align: center;">Class</th>
                            <th style="text-align: center;">Performance Badge</th>
                            <th style="text-align: center;">Attendance Badge</th>
                            <th style="text-align: center;">Subject Excellence</th>
                            <th style="text-align: center;">Total Badges</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
                                        ${getInitials(currentStudent.name)}
                                    </div>
                                    <div>
                                        <div style="font-weight: 600; color: var(--gray-900);">${currentStudent.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--gray-500);">${currentStudent.classLevel} ${currentStudent.stream}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center; font-weight: 600; color: var(--gray-700);">${currentStudent.classLevel}</td>
                            <td style="text-align: center;">
                                <span style="background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                    <i class="fas fa-thumbs-up"></i> Very Good
                                </span>
                            </td>
                            <td style="text-align: center;">
                                <span style="background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                    <i class="fas fa-user-check"></i> Very Good
                                </span>
                            </td>
                            <td style="text-align: center;">
                                <span style="background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                    <i class="fas fa-flask"></i> Science Star
                                </span>
                            </td>
                            <td style="text-align: center;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 0.25rem;">
                                    <i class="fas fa-award" style="color: #fbbf24; font-size: 1.125rem;"></i>
                                    <span style="font-weight: 700; color: var(--gray-900); font-size: 1.125rem;">${totalBadges}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        return;
    }
    
    const avgScore = calculateAverage(studentReports);
    
    // Mock attendance data
    const attendancePercent = 90;
    
    const performanceBadge = avgScore >= 90 ? 
        { text: 'Excellent', icon: 'star', color: '#10b981' } :
        avgScore >= 80 ? 
        { text: 'Very Good', icon: 'thumbs-up', color: '#3b82f6' } :
        avgScore >= 70 ? 
        { text: 'Good', icon: 'check', color: '#3b82f6' } :
        { text: 'Fair', icon: 'minus', color: '#f59e0b' };
    
    const attendanceBadge = attendancePercent >= 95 ? 
        { text: 'Excellent', icon: 'user-check', color: '#10b981' } :
        attendancePercent >= 85 ? 
        { text: 'Very Good', icon: 'user-check', color: '#3b82f6' } :
        { text: 'Good', icon: 'user-check', color: '#3b82f6' };
    
    let bestSubject = 'N/A';
    let bestScore = 0;
    studentReports.forEach(report => {
        const percentage = report.percentage || (report.score / report.totalMarks) * 100;
        if (percentage > bestScore) {
            bestScore = percentage;
            bestSubject = report.subject;
        }
    });
    
    const subjectExcellence = {
        text: `${bestSubject} Star`,
        icon: 'flask',
        color: '#10b981'
    };
    
    const totalBadges = 5;
    
    container.innerHTML = `
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="text-align: left;">Student Name</th>
                        <th style="text-align: center;">Class</th>
                        <th style="text-align: center;">Performance Badge</th>
                        <th style="text-align: center;">Attendance Badge</th>
                        <th style="text-align: center;">Subject Excellence</th>
                        <th style="text-align: center;">Total Badges</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
                                    ${getInitials(currentStudent.name)}
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--gray-900);">${currentStudent.name}</div>
                                    <div style="font-size: 0.75rem; color: var(--gray-500);">${currentStudent.classLevel} ${currentStudent.stream}</div>
                                </div>
                            </div>
                        </td>
                        <td style="text-align: center; font-weight: 600; color: var(--gray-700);">${currentStudent.classLevel}</td>
                        <td style="text-align: center;">
                            <span style="background: ${performanceBadge.color}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                <i class="fas fa-${performanceBadge.icon}"></i> ${performanceBadge.text}
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <span style="background: ${attendanceBadge.color}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                <i class="fas fa-${attendanceBadge.icon}"></i> ${attendanceBadge.text}
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <span style="background: ${subjectExcellence.color}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                <i class="fas fa-${subjectExcellence.icon}"></i> ${subjectExcellence.text}
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 0.25rem;">
                                <i class="fas fa-award" style="color: #fbbf24; font-size: 1.125rem;"></i>
                                <span style="font-weight: 700; color: var(--gray-900); font-size: 1.125rem;">${totalBadges}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// ==================== BADGES ====================

function loadBadges() {
    const container = document.getElementById('badgesTableContainer');
    if (!container) return;
    
    // Reuse achievements function logic (same as parent dashboard)
    loadAchievements();
    const achievementsHTML = document.getElementById('achievementsTableContainer').innerHTML;
    container.innerHTML = achievementsHTML;
}

// ==================== LEADERBOARD ====================

function loadLeaderboard() {
    const container = document.getElementById('leaderboardTableContainer');
    if (!container) return;
    
    if (!currentStudent) {
        container.innerHTML = '<div class="empty-state"><p>Please log in to view leaderboard</p></div>';
        return;
    }
    
    // Simple static leaderboard (same style as parent dashboard)
    const avgScore = 82; // Static score
    const attendancePercent = 90;
    const rank = 5; // Static rank
    
    let badgeText, badgeIcon, badgeColor;
    if (rank === 1) {
        badgeText = 'Gold Medal';
        badgeIcon = 'medal';
        badgeColor = '#fbbf24';
    } else if (rank <= 3) {
        badgeText = 'Silver Medal';
        badgeIcon = 'medal';
        badgeColor = '#9ca3af';
    } else if (rank <= 5) {
        badgeText = 'Bronze Medal';
        badgeIcon = 'medal';
        badgeColor = '#d97706';
    } else {
        badgeText = 'Participant';
        badgeIcon = 'award';
        badgeColor = '#6b7280';
    }
    
    container.innerHTML = `
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="text-align: center; width: 60px;">Rank</th>
                        <th style="text-align: left;">Student Name</th>
                        <th style="text-align: center;">Class</th>
                        <th style="text-align: center;">Stream</th>
                        <th style="text-align: center;">Average Score</th>
                        <th style="text-align: center;">Attendance</th>
                        <th style="text-align: center;">Badge</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <span style="font-weight: 700; font-size: 1.125rem; color: var(--gray-700);">
                                    #${rank}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;">
                                    ${getInitials(currentStudent.name)}
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: var(--gray-900);">
                                        ${currentStudent.name}
                                    </div>
                                    <div style="font-size: 0.75rem; color: var(--gray-500);">
                                        ${currentStudent.classLevel} ${currentStudent.stream}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td style="text-align: center; font-weight: 600; color: var(--gray-700);">${currentStudent.classLevel}</td>
                        <td style="text-align: center;">
                            <span style="background: var(--gray-100); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; color: var(--gray-700);">
                                ${currentStudent.stream}
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <span class="score-badge ${getScoreClass(avgScore)}">
                                ${avgScore}%
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <span style="background: ${attendancePercent >= 90 ? '#dcfce7' : '#dbeafe'}; color: ${attendancePercent >= 90 ? '#16a34a' : '#2563eb'}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                ${attendancePercent}%
                            </span>
                        </td>
                        <td style="text-align: center;">
                            <span style="background: ${badgeColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">
                                <i class="fas fa-${badgeIcon}"></i> ${badgeText}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// ==================== COMMUNITY ====================

function loadCommunity() {
    const container = document.getElementById('communityLinksContainer');
    
    const links = JSON.parse(localStorage.getItem('brainwave_community_links') || '{}');
    
    let html = '';
    
    if (links.whatsappEnabled && links.whatsappLink) {
        html += `
            <a href="${links.whatsappLink}" target="_blank" class="community-link">
                <div class="community-icon whatsapp-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <div class="community-text">
                    <h3>WhatsApp Group</h3>
                    <p>Join our WhatsApp community</p>
                </div>
            </a>
        `;
    }
    
    if (links.telegramEnabled && links.telegramLink) {
        html += `
            <a href="${links.telegramLink}" target="_blank" class="community-link">
                <div class="community-icon telegram-icon">
                    <i class="fab fa-telegram"></i>
                </div>
                <div class="community-text">
                    <h3>Telegram Channel</h3>
                    <p>Join our Telegram channel</p>
                </div>
            </a>
        `;
    }
    
    if (html === '') {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fas fa-users"></i></div>
                <div class="empty-state-text">No community links available</div>
            </div>
        `;
    } else {
        container.innerHTML = html;
    }
}

// ==================== UTILITY FUNCTIONS ====================

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icon = toast.querySelector('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                     type === 'error' ? 'fas fa-exclamation-circle' : 
                     type === 'warning' ? 'fas fa-exclamation-triangle' : 
                     'fas fa-info-circle';
    
    // Update color based on type
    toast.style.background = type === 'success' ? 'var(--success-color)' : 
                             type === 'error' ? 'var(--danger-color)' : 
                             type === 'warning' ? 'var(--warning-color)' : 
                             'var(--info-color)';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== SAMPLE DATA GENERATION (FOR TESTING) ====================

// Function to generate comprehensive mock data for testing
function generateMockData() {
    console.log('🎲 Generating mock data for testing...');
    
    // 1. Get the current logged-in student (don't create a new one!)
    const studentId = localStorage.getItem('brainwave_current_student_id');
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    let sampleStudent = users.find(u => u.id == studentId);
    
    // Only create a fallback student if there's NO student at all
    if (!sampleStudent && users.length === 0) {
        console.log('⚠️ No students exist - creating fallback student');
        sampleStudent = {
            id: Date.now(),
            name: 'Sample Student',
            email: 'student@brainwave.com',
            phone: '+234 800 000 0000',
            role: 'student',
            gender: 'Male',
            classLevel: 'SS2',
            stream: 'Science',
            studentCode: 'BW' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            plan: 'premium',
            status: 'active',
            locked: false,
            joinDate: new Date().toISOString().split('T')[0],
            bootcampStartDate: new Date().toISOString(),
            planHistory: [],
            createdAt: new Date().toISOString()
        };
        
        users.push(sampleStudent);
        localStorage.setItem('brainwave_users', JSON.stringify(users));
        localStorage.setItem('brainwave_current_student_id', sampleStudent.id);
        console.log('✅ Fallback student created:', sampleStudent.name);
    } else if (sampleStudent) {
        console.log('✅ Using existing student:', sampleStudent.name);
    }
    
    // 2. Create subjects - Use actual student's class level and stream
    const studentClassLevel = sampleStudent ? sampleStudent.classLevel : 'SS2';
    const studentStream = sampleStudent ? sampleStudent.stream : 'Science';
    
    const subjects = [
        { id: 1, name: 'Mathematics', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() },
        { id: 2, name: 'Physics', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() },
        { id: 3, name: 'Chemistry', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() },
        { id: 4, name: 'Biology', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() },
        { id: 5, name: 'English Language', stream: 'General', classLevel: 'All Levels', createdAt: new Date().toISOString() },
        { id: 6, name: 'Further Mathematics', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() },
        { id: 7, name: 'Computer Science', stream: studentStream, classLevel: studentClassLevel, createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('brainwave_subjects', JSON.stringify(subjects));
    console.log('✅ Created', subjects.length, 'subjects');
    
    // 3. Create live classes
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const liveClasses = [
        {
            id: 1,
            subject: 'Mathematics',
            teacher: 'Dr. Sarah Johnson',
            classLevel: studentClassLevel,
            stream: studentStream,
            date: now.toISOString(),
            time: '10:00 AM',
            status: 'live',
            link: 'https://meet.google.com/sample-link-1',
            createdAt: now.toISOString()
        },
        {
            id: 2,
            subject: 'Physics',
            teacher: 'Prof. Michael Chen',
            classLevel: studentClassLevel,
            stream: studentStream,
            date: tomorrow.toISOString(),
            time: '2:00 PM',
            status: 'scheduled',
            link: 'https://meet.google.com/sample-link-2',
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_live_classes', JSON.stringify(liveClasses));
    console.log('✅ Created', liveClasses.length, 'live classes');
    
    // 4. Create quizzes
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 7);
    
    const quizzes = [
        {
            id: 1,
            type: 'quiz',
            title: 'Quadratic Equations Quiz',
            subject: 'Mathematics',
            classLevel: studentClassLevel,
            stream: studentStream,
            dueDate: futureDate.toISOString(),
            duration: '30',
            totalMarks: 50,
            createdAt: now.toISOString()
        },
        {
            id: 2,
            type: 'assignment',
            title: 'Newton\'s Laws Assignment',
            subject: 'Physics',
            classLevel: studentClassLevel,
            stream: studentStream,
            dueDate: futureDate.toISOString(),
            duration: '45',
            totalMarks: 100,
            createdAt: now.toISOString()
        },
        {
            id: 3,
            type: 'quiz',
            title: 'Chemical Bonding Quiz',
            subject: 'Chemistry',
            classLevel: studentClassLevel,
            stream: studentStream,
            dueDate: futureDate.toISOString(),
            duration: '25',
            totalMarks: 40,
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_quizs', JSON.stringify(quizzes));
    console.log('✅ Created', quizzes.length, 'quizzes/assignments');
    
    // 5. Create mock exams
    const mockExams = [
        {
            id: 1,
            type: 'mock',
            title: 'WAEC Mathematics Mock Exam',
            subject: 'Mathematics',
            classLevel: studentClassLevel,
            stream: studentStream,
            dueDate: futureDate.toISOString(),
            duration: '120',
            totalMarks: 100,
            createdAt: now.toISOString()
        },
        {
            id: 2,
            type: 'mock',
            title: 'JAMB Physics Practice Test',
            subject: 'Physics',
            classLevel: studentClassLevel,
            stream: studentStream,
            dueDate: futureDate.toISOString(),
            duration: '90',
            totalMarks: 100,
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_mocks', JSON.stringify(mockExams));
    console.log('✅ Created', mockExams.length, 'mock exams');
    
    // 6. Create books (eBooks)
    const books = [
        {
            id: 1,
            title: `Advanced Mathematics for ${studentClassLevel}`,
            subject: 'Mathematics',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: `Comprehensive mathematics textbook covering all ${studentClassLevel} topics including algebra, geometry, and trigonometry.`,
            link: 'https://drive.google.com/file/sample-math-book',
            thumbnail: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Math+Book',
            createdAt: now.toISOString()
        },
        {
            id: 2,
            title: 'Physics Fundamentals',
            subject: 'Physics',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: `Essential physics concepts with practical examples and experiments for ${studentClassLevel} students.`,
            link: 'https://drive.google.com/file/sample-physics-book',
            thumbnail: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Physics+Book',
            createdAt: now.toISOString()
        },
        {
            id: 3,
            title: 'Chemistry Made Easy',
            subject: 'Chemistry',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Simplified chemistry textbook with diagrams and real-world applications.',
            link: 'https://drive.google.com/file/sample-chemistry-book',
            thumbnail: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Chemistry+Book',
            createdAt: now.toISOString()
        },
        {
            id: 4,
            title: 'Biology Essentials',
            subject: 'Biology',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Complete biology guide covering cell biology, genetics, and human anatomy.',
            link: 'https://drive.google.com/file/sample-biology-book',
            thumbnail: 'https://via.placeholder.com/300x400/16a34a/ffffff?text=Biology+Book',
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_books', JSON.stringify(books));
    console.log('✅ Created', books.length, 'eBooks');
    
    // 7. Create videos
    const videos = [
        {
            id: 1,
            title: 'Introduction to Calculus',
            subject: 'Mathematics',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Learn the basics of differentiation and integration with step-by-step examples.',
            link: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
            createdAt: now.toISOString()
        },
        {
            id: 2,
            title: 'Understanding Newton\'s Laws',
            subject: 'Physics',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Comprehensive explanation of Newton\'s three laws of motion with real-world examples.',
            link: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
            createdAt: now.toISOString()
        },
        {
            id: 3,
            title: 'Chemical Reactions Explained',
            subject: 'Chemistry',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Visual guide to different types of chemical reactions and how to balance equations.',
            link: 'https://www.youtube.com/watch?v=7ERzPFCE7B0',
            createdAt: now.toISOString()
        },
        {
            id: 4,
            title: 'Cell Structure and Function',
            subject: 'Biology',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Detailed exploration of cell organelles and their functions in living organisms.',
            link: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
            createdAt: now.toISOString()
        },
        {
            id: 5,
            title: 'Trigonometry Basics',
            subject: 'Mathematics',
            classLevel: studentClassLevel,
            stream: studentStream,
            description: 'Master sine, cosine, and tangent with practical problem-solving techniques.',
            link: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_videos', JSON.stringify(videos));
    console.log('✅ Created', videos.length, 'video tutorials');
    
    // 8. Create reports (matching admin spreadsheet format)
    const reports = [
        {
            id: 1,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'First Term Exam',
            subject: 'Mathematics',
            type: 'quiz',
            score: 85,
            totalMarks: 100,
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 2,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'First Term Exam',
            subject: 'Physics',
            type: 'quiz',
            score: 78,
            totalMarks: 100,
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 3,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'First Term Exam',
            subject: 'Chemistry',
            type: 'quiz',
            score: 82,
            totalMarks: 100,
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 4,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'First Term Exam',
            subject: 'Biology',
            type: 'quiz',
            score: 88,
            totalMarks: 100,
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 5,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'First Term Exam',
            subject: 'English Language',
            type: 'quiz',
            score: 76,
            totalMarks: 100,
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 6,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'Mid-Term Assignment',
            subject: 'Mathematics',
            type: 'assignment',
            score: 42,
            totalMarks: 50,
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        },
        {
            id: 7,
            studentId: sampleStudent.id,
            studentCode: sampleStudent.studentCode,
            studentName: sampleStudent.name,
            assessmentTitle: 'WAEC Mock Exam',
            subject: 'Mathematics',
            type: 'mock',
            score: 68,
            totalMarks: 100,
            date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            passed: true
        }
    ];
    localStorage.setItem('brainwave_reports', JSON.stringify(reports));
    console.log('✅ Created', reports.length, 'student reports');
    
    // 9. Create announcements
    const announcements = [
        {
            id: 1,
            title: 'Welcome to BrainWave!',
            message: 'We are excited to have you join our learning platform. Explore all the features and start your journey to academic excellence!',
            classLevel: 'All Levels',
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            title: 'New Mock Exams Available',
            message: 'Practice makes perfect! New WAEC and JAMB mock exams have been added to help you prepare for your upcoming exams.',
            classLevel: 'SS2',
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            title: 'Live Class Schedule Update',
            message: 'Check out the updated live class schedule. Don\'t miss our interactive sessions with experienced teachers!',
            classLevel: 'SS2',
            createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            title: 'Study Tips for Success',
            message: 'Remember to review your notes daily, practice past questions, and join study groups. Consistency is key to success!',
            classLevel: 'All Levels',
            createdAt: now.toISOString()
        }
    ];
    localStorage.setItem('brainwave_announcements', JSON.stringify(announcements));
    console.log('✅ Created', announcements.length, 'announcements');
    
    // 10. Create community links
    const communityLinks = {
        whatsappEnabled: true,
        whatsappLink: 'https://chat.whatsapp.com/sample-group-link',
        telegramEnabled: true,
        telegramLink: 'https://t.me/brainwave_students'
    };
    localStorage.setItem('brainwave_community_links', JSON.stringify(communityLinks));
    console.log('✅ Created community links');
    
    // 11. Create achievements
    const achievements = [
        {
            id: 1,
            title: 'First Steps',
            description: 'Completed your first quiz successfully!',
            icon: 'fas fa-star',
            color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            unlockedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            title: 'Perfect Score',
            description: 'Scored 100% on a quiz',
            icon: 'fas fa-trophy',
            color: 'linear-gradient(135deg, #10b981, #059669)',
            unlockedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            title: 'Study Streak',
            description: 'Maintained a 7-day study streak',
            icon: 'fas fa-fire',
            color: 'linear-gradient(135deg, #ef4444, #dc2626)',
            unlockedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            title: 'Video Master',
            description: 'Watched 10 educational videos',
            icon: 'fas fa-video',
            color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            unlockedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 5,
            title: 'Top Performer',
            description: 'Ranked in top 10 of your class',
            icon: 'fas fa-crown',
            color: 'linear-gradient(135deg, #fbbf24, #d97706)',
            unlockedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];
    localStorage.setItem('brainwave_achievements', JSON.stringify(achievements));
    console.log('✅ Created', achievements.length, 'achievements');
    
    // Note: Badges and Leaderboard are calculated dynamically from reports (like parent dashboard)
    // No static data needed - they're computed on-the-fly based on student performance
    
    console.log('🎉 Mock data generation complete!');
    console.log('📊 Summary:');
    console.log('   - 1 Student');
    console.log('   - 7 Subjects');
    console.log('   - 2 Live Classes');
    console.log('   - 3 Quizzes/Assignments');
    console.log('   - 2 Mock Exams');
    console.log('   - 4 eBooks');
    console.log('   - 5 Video Tutorials');
    console.log('   - 7 Reports');
    console.log('   - 4 Announcements');
    console.log('   - 5 Achievements');
    console.log('   - Badges (calculated from reports)');
    console.log('   - Leaderboard (calculated from reports)');
    console.log('   - Community Links');
    
    return sampleStudent;
}

// Function to clear all mock data
function clearMockData() {
    console.log('🗑️ Clearing all mock data...');
    
    localStorage.removeItem('brainwave_subjects');
    localStorage.removeItem('brainwave_live_classes');
    localStorage.removeItem('brainwave_quizs');
    localStorage.removeItem('brainwave_mocks');
    localStorage.removeItem('brainwave_books');
    localStorage.removeItem('brainwave_videos');
    localStorage.removeItem('brainwave_reports');
    localStorage.removeItem('brainwave_announcements');
    localStorage.removeItem('brainwave_community_links');
    localStorage.removeItem('brainwave_achievements');
    // Note: No need to remove badges/leaderboard as they're calculated dynamically
    
    console.log('✅ Mock data cleared successfully');
}

// Call this function to generate mock data for testing
// Mock data is now automatically generated on first load
// To regenerate, clear localStorage or call generateMockData() from console

// Quick generate function - Comprehensive mock data for ALL sections
function quickGenerate() {
    console.log('🔄 Clearing all data and generating comprehensive mock data...');
    
    // Save current student ID before clearing
    const currentStudentId = localStorage.getItem('brainwave_current_student_id');
    
    localStorage.clear();
    
    const now = new Date();
    
    // 0. CREATE DEMO STUDENT FIRST
    const demoStudent = {
        id: currentStudentId || Date.now(),
        name: 'Demo Student',
        email: 'demo@student.com',
        phone: '+234 800 123 4567',
        role: 'student',
        gender: 'Male',
        classLevel: 'SS2',
        stream: 'Science',
        studentCode: 'BW' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        plan: 'premium',
        status: 'active',
        locked: false,
        joinDate: new Date().toISOString().split('T')[0],
        bootcampStartDate: new Date().toISOString(),
        planHistory: [],
        createdAt: new Date().toISOString()
    };
    
    // Save student and set as current
    localStorage.setItem('brainwave_users', JSON.stringify([demoStudent]));
    localStorage.setItem('brainwave_current_student_id', demoStudent.id);
    console.log('✅ Demo student created:', demoStudent.name, 'Code:', demoStudent.studentCode);
    
    // 1. SUBJECTS
    const subjects = [
        {id: 1, name: 'Mathematics', stream: 'Science', classLevel: 'SS2', createdAt: now.toISOString()},
        {id: 2, name: 'Physics', stream: 'Science', classLevel: 'SS2', createdAt: now.toISOString()},
        {id: 3, name: 'Chemistry', stream: 'Science', classLevel: 'SS2', createdAt: now.toISOString()},
        {id: 4, name: 'Biology', stream: 'Science', classLevel: 'SS2', createdAt: now.toISOString()},
        {id: 5, name: 'English Language', stream: 'General', classLevel: 'All Levels', createdAt: now.toISOString()},
        {id: 6, name: 'Further Mathematics', stream: 'Science', classLevel: 'SS2', createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_subjects', JSON.stringify(subjects));
    
    // 2. LIVE CLASSES
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const liveClasses = [
        {id: 1, subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', classLevel: 'SS2', stream: 'Science', date: now.toISOString(), time: '10:00 AM', status: 'live', link: 'https://meet.google.com/abc-defg-hij', createdAt: now.toISOString()},
        {id: 2, subject: 'Physics', teacher: 'Prof. Michael Chen', classLevel: 'SS2', stream: 'Science', date: tomorrow.toISOString(), time: '2:00 PM', status: 'scheduled', link: 'https://meet.google.com/xyz-uvwx-rst', createdAt: now.toISOString()},
        {id: 3, subject: 'Chemistry', teacher: 'Dr. Amara Okafor', classLevel: 'SS2', stream: 'Science', date: tomorrow.toISOString(), time: '4:00 PM', status: 'scheduled', link: 'https://meet.google.com/lmn-opqr-stu', createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_live_classes', JSON.stringify(liveClasses));
    
    // 3. QUIZZES & ASSIGNMENTS
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 7);
    const quizzes = [
        {id: 1, type: 'quiz', title: 'Quadratic Equations Quiz', subject: 'Mathematics', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '30', totalMarks: 50, createdAt: now.toISOString()},
        {id: 2, type: 'assignment', title: 'Newton\'s Laws Assignment', subject: 'Physics', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '45', totalMarks: 100, createdAt: now.toISOString()},
        {id: 3, type: 'quiz', title: 'Chemical Bonding Quiz', subject: 'Chemistry', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '25', totalMarks: 40, createdAt: now.toISOString()},
        {id: 4, type: 'assignment', title: 'Cell Biology Project', subject: 'Biology', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '60', totalMarks: 100, createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_quizs', JSON.stringify(quizzes));
    
    // 4. MOCK EXAMS
    const mockExams = [
        {id: 1, type: 'mock', title: 'WAEC Mathematics Mock Exam', subject: 'Mathematics', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '120', totalMarks: 100, createdAt: now.toISOString()},
        {id: 2, type: 'mock', title: 'JAMB Physics Practice Test', subject: 'Physics', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '90', totalMarks: 100, createdAt: now.toISOString()},
        {id: 3, type: 'mock', title: 'WAEC Chemistry Mock', subject: 'Chemistry', classLevel: 'SS2', stream: 'Science', dueDate: futureDate.toISOString(), duration: '120', totalMarks: 100, createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_mocks', JSON.stringify(mockExams));
    
    // 5. EBOOKS
    const books = [
        {id: 1, title: 'Advanced Mathematics for SS2', subject: 'Mathematics', classLevel: 'SS2', stream: 'Science', description: 'Comprehensive mathematics textbook', link: 'https://drive.google.com/file/sample-math', thumbnail: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=Math+Book', createdAt: now.toISOString()},
        {id: 2, title: 'Physics Fundamentals', subject: 'Physics', classLevel: 'SS2', stream: 'Science', description: 'Essential physics concepts', link: 'https://drive.google.com/file/sample-physics', thumbnail: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Physics', createdAt: now.toISOString()},
        {id: 3, title: 'Chemistry Made Easy', subject: 'Chemistry', classLevel: 'SS2', stream: 'Science', description: 'Simplified chemistry guide', link: 'https://drive.google.com/file/sample-chemistry', thumbnail: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Chemistry', createdAt: now.toISOString()},
        {id: 4, title: 'Biology Essentials', subject: 'Biology', classLevel: 'SS2', stream: 'Science', description: 'Complete biology guide', link: 'https://drive.google.com/file/sample-biology', thumbnail: 'https://via.placeholder.com/300x400/16a34a/ffffff?text=Biology', createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_books', JSON.stringify(books));
    
    // 6. VIDEOS
    const videos = [
        {id: 1, title: 'Introduction to Calculus', subject: 'Mathematics', classLevel: 'SS2', stream: 'Science', description: 'Learn differentiation basics', link: 'https://www.youtube.com/watch?v=WUvTyaaNkzM', createdAt: now.toISOString()},
        {id: 2, title: 'Understanding Newton\'s Laws', subject: 'Physics', classLevel: 'SS2', stream: 'Science', description: 'Newton\'s three laws explained', link: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds', createdAt: now.toISOString()},
        {id: 3, title: 'Chemical Reactions Explained', subject: 'Chemistry', classLevel: 'SS2', stream: 'Science', description: 'Types of chemical reactions', link: 'https://www.youtube.com/watch?v=7ERzPFCE7B0', createdAt: now.toISOString()},
        {id: 4, title: 'Cell Structure and Function', subject: 'Biology', classLevel: 'SS2', stream: 'Science', description: 'Explore cell organelles', link: 'https://www.youtube.com/watch?v=URUJD5NEXC8', createdAt: now.toISOString()},
        {id: 5, title: 'Trigonometry Basics', subject: 'Mathematics', classLevel: 'SS2', stream: 'Science', description: 'Master sine, cosine, tangent', link: 'https://www.youtube.com/watch?v=PUB0TaZ7bhA', createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_videos', JSON.stringify(videos));
    
    // 7. REPORTS
    const reports = [
        {id: 1, studentId: demoStudent.id, studentCode: demoStudent.studentCode, studentName: demoStudent.name, subject: 'Mathematics', assessmentTitle: 'First Term Exam', type: 'quiz', score: 85, totalMarks: 100, date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), passed: true},
        {id: 2, studentId: demoStudent.id, studentCode: demoStudent.studentCode, studentName: demoStudent.name, subject: 'Physics', assessmentTitle: 'First Term Exam', type: 'quiz', score: 78, totalMarks: 100, date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), passed: true},
        {id: 3, studentId: demoStudent.id, studentCode: demoStudent.studentCode, studentName: demoStudent.name, subject: 'Chemistry', assessmentTitle: 'First Term Exam', type: 'quiz', score: 82, totalMarks: 100, date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), passed: true},
        {id: 4, studentId: demoStudent.id, studentCode: demoStudent.studentCode, studentName: demoStudent.name, subject: 'Biology', assessmentTitle: 'First Term Exam', type: 'quiz', score: 88, totalMarks: 100, date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), passed: true},
        {id: 5, studentId: demoStudent.id, studentCode: demoStudent.studentCode, studentName: demoStudent.name, subject: 'English Language', assessmentTitle: 'First Term Exam', type: 'quiz', score: 76, totalMarks: 100, date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), passed: true}
    ];
    localStorage.setItem('brainwave_reports', JSON.stringify(reports));
    
    // 8. ANNOUNCEMENTS
    const announcements = [
        {id: 1, title: 'Welcome to BrainWave!', message: 'We are excited to have you join our learning platform. Explore all features!', classLevel: 'All Levels', createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 2, title: 'New Mock Exams Available', message: 'Practice makes perfect! New WAEC and JAMB mock exams have been added.', classLevel: 'SS2', createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 3, title: 'Live Class Schedule Update', message: 'Check out the updated live class schedule. Don\'t miss our interactive sessions!', classLevel: 'SS2', createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 4, title: 'Study Tips for Success', message: 'Remember to review your notes daily, practice past questions, and join study groups!', classLevel: 'All Levels', createdAt: now.toISOString()}
    ];
    localStorage.setItem('brainwave_announcements', JSON.stringify(announcements));
    
    // 9. ACHIEVEMENTS
    const achievements = [
        {id: 1, title: 'First Steps', description: 'Completed your first quiz successfully!', icon: 'fas fa-star', color: 'linear-gradient(135deg, #fbbf24, #f59e0b)', unlockedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 2, title: 'Perfect Score', description: 'Scored 100% on a quiz', icon: 'fas fa-trophy', color: 'linear-gradient(135deg, #10b981, #059669)', unlockedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 3, title: 'Study Streak', description: 'Maintained a 7-day study streak', icon: 'fas fa-fire', color: 'linear-gradient(135deg, #ef4444, #dc2626)', unlockedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 4, title: 'Video Master', description: 'Watched 10 educational videos', icon: 'fas fa-video', color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', unlockedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()},
        {id: 5, title: 'Top Performer', description: 'Ranked in top 10 of your class', icon: 'fas fa-crown', color: 'linear-gradient(135deg, #fbbf24, #d97706)', unlockedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()}
    ];
    localStorage.setItem('brainwave_achievements', JSON.stringify(achievements));
    
    // Note: Badges and Leaderboard are calculated dynamically from reports (same as parent dashboard)
    // No static data generation needed
    
    // 10. COMMUNITY LINKS
    const communityLinks = {
        whatsappEnabled: true,
        whatsappLink: 'https://chat.whatsapp.com/sample-group-link',
        telegramEnabled: true,
        telegramLink: 'https://t.me/brainwave_students'
    };
    localStorage.setItem('brainwave_community_links', JSON.stringify(communityLinks));
    
    // Mark as generated
    localStorage.setItem('brainwave_mock_data_generated', 'true');
    
    console.log('✅ COMPLETE! Generated:');
    console.log('  - 6 Subjects');
    console.log('  - 3 Live Classes');
    console.log('  - 4 Quizzes/Assignments');
    console.log('  - 3 Mock Exams');
    console.log('  - 4 eBooks');
    console.log('  - 5 Videos');
    console.log('  - 5 Reports');
    console.log('  - 4 Announcements');
    console.log('  - 5 Achievements');
    console.log('  - Badges (calculated dynamically)');
    console.log('  - Leaderboard (calculated dynamically)');
    console.log('  - Community Links');
    
    alert('✅ Complete mock data generated for ALL sections!\n\n' +
          '• 6 Subjects\n' +
          '• 3 Live Classes\n' +
          '• 4 Quizzes/Assignments\n' +
          '• 3 Mock Exams\n' +
          '• 4 eBooks + 5 Videos\n' +
          '• 5 Reports\n' +
          '• 4 Announcements\n' +
          '• 5 Achievements\n' +
          '• Badges (from reports)\n' +
          '• Leaderboard (from reports)\n\n' +
          'Page will reload now.');
    
    location.reload();
}

// ==================== DOWNLOAD REPORT ====================

function downloadReport() {
    if (!currentStudent) {
        alert('Please log in first');
        return;
    }
    
    const reports = JSON.parse(localStorage.getItem('brainwave_reports') || '[]');
    const studentReports = reports.filter(r => r.studentId === currentStudent.id);
    const avgScore = studentReports.length > 0 
        ? Math.round(studentReports.reduce((sum, r) => sum + r.score, 0) / studentReports.length)
        : 0;
    const grade = getGrade(avgScore);
    
    alert(`📥 Downloading Report for ${currentStudent.name}\n\n` +
          `📊 Academic Performance:\n` +
          `   • Average Score: ${avgScore}%\n` +
          `   • Grade: ${grade}\n` +
          `   • Class: ${currentStudent.classLevel}\n` +
          `   • Stream: ${currentStudent.stream}\n\n` +
          `📚 Subjects: ${studentReports.length}\n` +
          `📄 Report generated on: ${new Date().toLocaleDateString()}\n\n` +
          `This would download a PDF with complete academic details.`);
}

// ==================== MOBILE-SPECIFIC FUNCTIONS ====================

// Mobile-friendly functions that work without console access
window.mobileShowQuizzes = function() {
    mobileLog('📱 Mobile: Showing all quizzes...');
    showAllData();
};

window.mobileResetData = function() {
    mobileLog('📱 Mobile: Resetting all data...');
    resetAllData();
};

window.mobileDebugInfo = function() {
    mobileLog('📱 Mobile Debug Info:', {
        isMobile: isMobile,
        isTouchDevice: isTouchDevice,
        currentStudent: currentStudent ? currentStudent.name : 'Not loaded',
        quizzes: JSON.parse(storage.getItem('brainwave_quizs') || '[]').length,
        mocks: JSON.parse(storage.getItem('brainwave_mocks') || '[]').length,
        localStorage: typeof localStorage !== 'undefined'
    });
};

// Make mobile functions globally accessible
window.toggleMobileLog = toggleMobileLog;

