// BrainWave Platform JavaScript
// Main functionality for frontend interactions and dynamic content

// Global variables
let currentUser = null;
let platformData = {
    subjects: [],
    quizzes: [],
    mockExams: [],
    liveClasses: [],
    students: [],
    progress: []
};

// Initialize platform data (in real app, this would come from database)
function initializePlatformData() {
    // Sample subjects data
    platformData.subjects = [
        { id: 1, name: 'Mathematics', classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] },
        { id: 2, name: 'Science', classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] },
        { id: 3, name: 'English', classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] },
        { id: 4, name: 'History', classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] },
        { id: 5, name: 'Geography', classLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'] }
    ];

    // Sample quiz data
    platformData.quizzes = [
        {
            id: 1,
            subjectId: 1,
            title: 'Algebra Basics',
            questions: [
                {
                    question: 'What is 2x + 3 = 7?',
                    options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
                    correct: 1
                },
                {
                    question: 'Solve for y: 3y - 6 = 9',
                    options: ['y = 3', 'y = 4', 'y = 5', 'y = 6'],
                    correct: 2
                }
            ],
            duration: 10,
            classLevel: 'Class 10'
        }
    ];

    // Store in localStorage for persistence
    localStorage.setItem('brainwave_data', JSON.stringify(platformData));
}

// Load platform data from localStorage
function loadPlatformData() {
    const stored = localStorage.getItem('brainwave_data');
    if (stored) {
        platformData = JSON.parse(stored);
    } else {
        initializePlatformData();
    }
}

// Save platform data to localStorage
function savePlatformData() {
    localStorage.setItem('brainwave_data', JSON.stringify(platformData));
}

// Authentication Functions
function authenticateUser(userType, credentials) {
    // In a real application, this would make an API call
    // For demo purposes, we'll simulate authentication
    
    if (userType === 'student') {
        return {
            success: true,
            user: {
                id: credentials.studentId,
                name: 'John Doe',
                userType: 'student',
                class: 'Class 10',
                familyCode: 'FAM001'
            }
        };
    } else if (userType === 'parent') {
        return {
            success: true,
            user: {
                id: credentials.familyCode,
                name: 'Jane Doe',
                userType: 'parent',
                familyCode: credentials.familyCode,
                childName: 'John Doe'
            }
        };
    } else if (userType === 'admin') {
        return {
            success: true,
            user: {
                id: credentials.username,
                name: 'Admin User',
                userType: 'admin',
                username: credentials.username
            }
        };
    }
    
    return { success: false, message: 'Invalid credentials' };
}

// User Session Management
function setUserSession(userData) {
    currentUser = userData;
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

function getUserSession() {
    const stored = sessionStorage.getItem('userData');
    if (stored) {
        currentUser = JSON.parse(stored);
        return currentUser;
    }
    return null;
}

function clearUserSession() {
    currentUser = null;
    sessionStorage.removeItem('userData');
}

// Subject Management Functions
function getSubjectsByClass(classLevel) {
    return platformData.subjects.filter(subject => 
        subject.classLevels.includes(classLevel)
    );
}

function addSubject(name, classLevels) {
    const newSubject = {
        id: Date.now(),
        name: name,
        classLevels: classLevels
    };
    platformData.subjects.push(newSubject);
    savePlatformData();
    return newSubject;
}

function updateSubject(id, name, classLevels) {
    const index = platformData.subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        platformData.subjects[index].name = name;
        platformData.subjects[index].classLevels = classLevels;
        savePlatformData();
        return true;
    }
    return false;
}

function deleteSubject(id) {
    const index = platformData.subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        platformData.subjects.splice(index, 1);
        savePlatformData();
        return true;
    }
    return false;
}

// Quiz Management Functions
function getQuizzesBySubject(subjectId, classLevel) {
    return platformData.quizzes.filter(quiz => 
        quiz.subjectId === subjectId && quiz.classLevel === classLevel
    );
}

function addQuiz(subjectId, title, questions, duration, classLevel) {
    const newQuiz = {
        id: Date.now(),
        subjectId: subjectId,
        title: title,
        questions: questions,
        duration: duration,
        classLevel: classLevel,
        createdAt: new Date().toISOString()
    };
    platformData.quizzes.push(newQuiz);
    savePlatformData();
    return newQuiz;
}

function getQuizById(id) {
    return platformData.quizzes.find(quiz => quiz.id === id);
}

// Progress Tracking Functions
function saveQuizResult(studentId, quizId, score, answers) {
    const result = {
        id: Date.now(),
        studentId: studentId,
        quizId: quizId,
        score: score,
        answers: answers,
        completedAt: new Date().toISOString()
    };
    
    if (!platformData.progress) {
        platformData.progress = [];
    }
    
    platformData.progress.push(result);
    savePlatformData();
    return result;
}

function getStudentProgress(studentId) {
    if (!platformData.progress) return [];
    return platformData.progress.filter(p => p.studentId === studentId);
}

function getStudentStats(studentId) {
    const progress = getStudentProgress(studentId);
    
    if (progress.length === 0) {
        return {
            totalQuizzes: 0,
            averageScore: 0,
            badges: 0,
            lastActivity: null
        };
    }
    
    const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
    const averageScore = Math.round(totalScore / progress.length);
    
    // Calculate badges based on performance
    let badges = 0;
    if (averageScore >= 90) badges += 3;
    else if (averageScore >= 80) badges += 2;
    else if (averageScore >= 70) badges += 1;
    
    if (progress.length >= 10) badges += 1;
    if (progress.length >= 20) badges += 1;
    
    const lastActivity = progress.length > 0 ? 
        new Date(progress[progress.length - 1].completedAt) : null;
    
    return {
        totalQuizzes: progress.length,
        averageScore: averageScore,
        badges: badges,
        lastActivity: lastActivity
    };
}

// Family Code Functions (for parent access)
function getChildProgressByFamilyCode(familyCode) {
    // In a real app, this would look up the student ID associated with the family code
    // For demo, we'll use a simple mapping
    const familyMappings = {
        'FAM001': 'STU001',
        'FAM002': 'STU002'
    };
    
    const studentId = familyMappings[familyCode];
    if (studentId) {
        return getStudentStats(studentId);
    }
    
    return null;
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
        return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hours ago`;
    } else {
        return `${diffDays} days ago`;
    }
}

function generateFamilyCode() {
    return 'FAM' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function generateStudentId() {
    return 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateStudentId(studentId) {
    return studentId.length >= 3;
}

function validateFamilyCode(familyCode) {
    return familyCode.length >= 6;
}

// UI Helper Functions
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.textContent = 'Loading...';
    }
}

function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.textContent = originalText;
    }
}

function showMessage(message, type = 'info') {
    // Create a simple message display
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        z-index: 9999;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Quiz Engine Functions
class QuizEngine {
    constructor(quizData) {
        this.quiz = quizData;
        this.currentQuestion = 0;
        this.answers = [];
        this.startTime = new Date();
        this.timeRemaining = quizData.duration * 60; // Convert to seconds
    }
    
    getCurrentQuestion() {
        return this.quiz.questions[this.currentQuestion];
    }
    
    answerQuestion(answerIndex) {
        this.answers[this.currentQuestion] = answerIndex;
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.quiz.questions.length - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            return true;
        }
        return false;
    }
    
    calculateScore() {
        let correct = 0;
        this.quiz.questions.forEach((question, index) => {
            if (this.answers[index] === question.correct) {
                correct++;
            }
        });
        return Math.round((correct / this.quiz.questions.length) * 100);
    }
    
    getResults() {
        const score = this.calculateScore();
        const endTime = new Date();
        const timeTaken = Math.round((endTime - this.startTime) / 1000 / 60); // Minutes
        
        return {
            score: score,
            timeTaken: timeTaken,
            answers: this.answers,
            totalQuestions: this.quiz.questions.length,
            correctAnswers: this.quiz.questions.filter((q, i) => this.answers[i] === q.correct).length
        };
    }
}

// Mock Exam Engine (similar to quiz but with more features)
class MockExamEngine extends QuizEngine {
    constructor(examData) {
        super(examData);
        this.bookmarkedQuestions = [];
        this.reviewMode = false;
    }
    
    bookmarkQuestion(questionIndex) {
        if (!this.bookmarkedQuestions.includes(questionIndex)) {
            this.bookmarkedQuestions.push(questionIndex);
        }
    }
    
    removeBookmark(questionIndex) {
        const index = this.bookmarkedQuestions.indexOf(questionIndex);
        if (index > -1) {
            this.bookmarkedQuestions.splice(index, 1);
        }
    }
    
    getBookmarkedQuestions() {
        return this.bookmarkedQuestions;
    }
    
    enterReviewMode() {
        this.reviewMode = true;
    }
    
    getDetailedResults() {
        const basicResults = this.getResults();
        return {
            ...basicResults,
            bookmarkedQuestions: this.bookmarkedQuestions,
            questionAnalysis: this.quiz.questions.map((question, index) => ({
                questionNumber: index + 1,
                question: question.question,
                correctAnswer: question.options[question.correct],
                studentAnswer: this.answers[index] !== undefined ? 
                    question.options[this.answers[index]] : 'Not answered',
                isCorrect: this.answers[index] === question.correct,
                wasBookmarked: this.bookmarkedQuestions.includes(index)
            }))
        };
    }
}

// Initialize platform when script loads
document.addEventListener('DOMContentLoaded', function() {
    loadPlatformData();
});

// Export functions for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        authenticateUser,
        setUserSession,
        getUserSession,
        clearUserSession,
        getSubjectsByClass,
        addSubject,
        updateSubject,
        deleteSubject,
        getQuizzesBySubject,
        addQuiz,
        getQuizById,
        saveQuizResult,
        getStudentProgress,
        getStudentStats,
        getChildProgressByFamilyCode,
        QuizEngine,
        MockExamEngine
    };
}