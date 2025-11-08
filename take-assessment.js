// BrainWave Assessment Simulator

// Global variables
let assessment = null;
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeRemaining = 0;
let startTime = null;

// Initialize assessment on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Assessment Simulator Loading...');
    loadAssessment();
});

// Load assessment from URL parameters
function loadAssessment() {
    const urlParams = new URLSearchParams(window.location.search);
    const assessmentId = urlParams.get('id');
    const assessmentType = urlParams.get('type');
    
    console.log('Loading assessment:', { id: assessmentId, type: assessmentType });
    
    if (!assessmentId || !assessmentType) {
        alert('Invalid assessment link. Redirecting to dashboard...');
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    // Load assessment from localStorage
    let storageKey = '';
    let assessments = [];
    
    // Determine storage key based on type
    if (assessmentType === 'quiz' || assessmentType === 'assignment') {
        storageKey = 'brainwave_quizs';
        assessments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } else if (assessmentType === 'mock') {
        storageKey = 'brainwave_mocks';
        assessments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    }
    
    console.log(`📦 Loading from ${storageKey}:`, assessments);
    
    assessment = assessments.find(a => a.id == assessmentId);
    
    if (!assessment) {
        console.error('❌ Assessment not found. ID:', assessmentId, 'Type:', assessmentType);
        console.log('Available assessments:', assessments);
        alert('Assessment not found. Redirecting to dashboard...');
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    console.log('✅ Assessment loaded:', assessment);
    
    // Generate questions for this assessment
    generateQuestions();
    
    // Initialize UI
    initializeUI();
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion(0);
    
    console.log('✅ Assessment loaded successfully');
}

// Generate sample questions based on assessment
function generateQuestions() {
    const questionCount = assessment.type === 'mock' ? 40 : 
                         assessment.type === 'assignment' ? 10 : 20;
    
    const marksPerQuestion = Math.floor(assessment.totalMarks / questionCount);
    
    questions = [];
    
    for (let i = 0; i < questionCount; i++) {
        questions.push({
            id: i + 1,
            text: generateQuestionText(i + 1),
            options: generateOptions(),
            correctAnswer: Math.floor(Math.random() * 4), // Random correct answer (0-3)
            marks: marksPerQuestion
        });
        
        userAnswers.push(null); // Initialize user answers
    }
    
    console.log(`Generated ${questions.length} questions`);
}

// Generate question text based on subject
function generateQuestionText(num) {
    const subject = assessment.subject;
    const templates = {
        'Mathematics': [
            `Solve for x: ${num}x + ${num * 2} = ${num * 5}`,
            `What is the value of ${num}² + ${num}?`,
            `If f(x) = ${num}x + ${num}, what is f(${num})?`,
            `Calculate: ${num} × ${num + 1} - ${num}`,
            `Find the square root of ${num * num}`
        ],
        'Physics': [
            `A body moves with velocity ${num} m/s. What is its kinetic energy if mass is ${num}kg?`,
            `Calculate the force when mass is ${num}kg and acceleration is ${num}m/s²`,
            `What is the power if work done is ${num * 10}J in ${num}s?`,
            `Find the momentum when mass is ${num}kg and velocity is ${num}m/s`,
            `Calculate pressure when force is ${num * 10}N on area ${num}m²`
        ],
        'Chemistry': [
            `How many moles are in ${num * 10}g of substance with molar mass ${num}g/mol?`,
            `Balance the equation: H₂ + O₂ → H₂O`,
            `What is the pH of a solution with [H⁺] = ${num}×10⁻⁷ M?`,
            `Calculate the number of atoms in ${num} moles of carbon`,
            `What is the oxidation state of element X in compound X₂O${num}?`
        ],
        'Biology': [
            `How many chromosomes are in a human ${num % 2 === 0 ? 'somatic' : 'gamete'} cell?`,
            `What is the function of ${['mitochondria', 'ribosomes', 'chloroplasts', 'nucleus'][num % 4]}?`,
            `In photosynthesis, what is produced along with glucose?`,
            `Which organelle is responsible for protein synthesis?`,
            `What type of cell division produces ${num % 2 === 0 ? 'identical' : 'different'} daughter cells?`
        ]
    };
    
    const subjectTemplates = templates[subject] || [
        `Question ${num}: What is the correct answer to this ${subject} problem?`,
        `Solve the following ${subject} problem (Question ${num})`,
        `Based on ${subject} principles, which statement is correct?`
    ];
    
    return subjectTemplates[num % subjectTemplates.length];
}

// Generate answer options
function generateOptions() {
    const optionSets = [
        ['25', '30', '35', '40'],
        ['True', 'False', 'Sometimes True', 'Cannot be determined'],
        ['Option A: Increases', 'Option B: Decreases', 'Option C: Remains constant', 'Option D: Fluctuates'],
        ['10 units', '15 units', '20 units', '25 units'],
        ['All of the above', 'None of the above', 'A and B only', 'B and C only']
    ];
    
    return optionSets[Math.floor(Math.random() * optionSets.length)];
}

// Initialize UI elements
function initializeUI() {
    document.getElementById('assessmentTitle').textContent = assessment.title;
    document.getElementById('assessmentSubject').textContent = `${assessment.subject} • ${assessment.type.toUpperCase()}`;
    
    // Initialize progress
    document.getElementById('progressText').textContent = `0/${questions.length}`;
    document.getElementById('answeredCount').textContent = '0';
    
    // Create question navigator
    createQuestionNavigator();
}

// Create question navigator grid
function createQuestionNavigator() {
    const grid = document.getElementById('questionGrid');
    grid.innerHTML = '';
    
    questions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'question-nav-btn';
        btn.textContent = index + 1;
        btn.onclick = () => goToQuestion(index);
        grid.appendChild(btn);
    });
}

// Start countdown timer
function startTimer() {
    const duration = parseInt(assessment.duration) || 30;
    timeRemaining = duration * 60; // Convert to seconds
    startTime = new Date();
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            autoSubmitAssessment();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('timerValue').textContent = display;
    
    const timerEl = document.getElementById('timerDisplay');
    
    // Warning at 5 minutes
    if (timeRemaining <= 300 && timeRemaining > 60) {
        timerEl.classList.add('timer-warning');
        timerEl.classList.remove('timer-danger');
    }
    // Danger at 1 minute
    else if (timeRemaining <= 60) {
        timerEl.classList.add('timer-danger');
        timerEl.classList.remove('timer-warning');
    }
}

// Display question
function displayQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Update question content
    document.getElementById('questionNumber').textContent = `Question ${index + 1} of ${questions.length}`;
    document.getElementById('questionMarks').textContent = `${question.marks} marks`;
    document.getElementById('questionText').textContent = question.text;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[index] === optIndex) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + optIndex)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.onclick = () => selectOption(optIndex);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    
    if (index === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'flex';
    } else {
        document.getElementById('nextBtn').style.display = 'flex';
        document.getElementById('submitBtn').style.display = 'none';
    }
    
    // Update navigator
    updateNavigator();
    
    // Update progress
    updateProgress();
}

// Select an option
function selectOption(optIndex) {
    userAnswers[currentQuestionIndex] = optIndex;
    displayQuestion(currentQuestionIndex);
}

// Update question navigator
function updateNavigator() {
    const buttons = document.querySelectorAll('.question-nav-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered');
        
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        } else if (userAnswers[index] !== null) {
            btn.classList.add('answered');
        }
    });
}

// Update progress bar
function updateProgress() {
    const answered = userAnswers.filter(a => a !== null).length;
    const percentage = (answered / questions.length) * 100;
    
    document.getElementById('progressBar').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('answeredCount').textContent = answered;
}

// Navigation functions
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        displayQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    }
}

function goToQuestion(index) {
    displayQuestion(index);
}

// Submit assessment
function submitAssessment() {
    const unanswered = userAnswers.filter(a => a === null).length;
    
    if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Do you want to submit anyway?`)) {
            return;
        }
    }
    
    clearInterval(timerInterval);
    calculateResults();
}

// Auto-submit when time runs out
function autoSubmitAssessment() {
    alert('Time is up! Your assessment will be submitted automatically.');
    calculateResults();
}

// Calculate results
function calculateResults() {
    let correctCount = 0;
    let totalMarks = 0;
    let earnedMarks = 0;
    
    questions.forEach((question, index) => {
        totalMarks += question.marks;
        
        if (userAnswers[index] === question.correctAnswer) {
            correctCount++;
            earnedMarks += question.marks;
        }
    });
    
    const percentage = Math.round((earnedMarks / totalMarks) * 100);
    const passed = percentage >= 40;
    
    // Calculate time taken
    const endTime = new Date();
    const timeTakenMs = endTime - startTime;
    const timeTakenMinutes = Math.floor(timeTakenMs / 60000);
    const timeTakenSeconds = Math.floor((timeTakenMs % 60000) / 1000);
    const timeTakenDisplay = `${timeTakenMinutes}:${String(timeTakenSeconds).padStart(2, '0')}`;
    
    // Save result to localStorage
    saveResult({
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        subject: assessment.subject,
        type: assessment.type,
        score: earnedMarks,
        totalMarks: totalMarks,
        percentage: percentage,
        correctCount: correctCount,
        totalQuestions: questions.length,
        passed: passed,
        timeTaken: timeTakenDisplay,
        date: new Date().toISOString()
    });
    
    // Display results
    displayResults({
        score: `${earnedMarks}/${totalMarks}`,
        percentage: `${percentage}%`,
        correctCount: correctCount,
        timeTaken: timeTakenDisplay,
        passed: passed
    });
}

// Save result to localStorage
function saveResult(result) {
    const currentStudent = getCurrentStudent();
    if (!currentStudent) return;
    
    const reports = JSON.parse(localStorage.getItem('brainwave_reports') || '[]');
    
    reports.push({
        id: Date.now(),
        studentId: currentStudent.id,
        studentCode: currentStudent.studentCode,
        studentName: currentStudent.name,
        assessmentTitle: result.assessmentTitle,
        subject: result.subject,
        type: result.type,
        score: result.score,
        totalMarks: result.totalMarks,
        date: result.date,
        passed: result.passed
    });
    
    localStorage.setItem('brainwave_reports', JSON.stringify(reports));
    console.log('✅ Result saved to reports');
}

// Get current student
function getCurrentStudent() {
    const studentId = localStorage.getItem('brainwave_current_student_id');
    if (!studentId) return null;
    
    const users = JSON.parse(localStorage.getItem('brainwave_users') || '[]');
    return users.find(u => u.id == studentId);
}

// Display results modal
function displayResults(results) {
    document.getElementById('scorePercentage').textContent = results.percentage;
    document.getElementById('finalScore').textContent = results.score;
    document.getElementById('timeTaken').textContent = results.timeTaken;
    document.getElementById('correctCount').textContent = results.correctCount;
    document.getElementById('passStatus').textContent = results.passed ? '✅ Passed' : '❌ Failed';
    document.getElementById('passStatus').style.color = results.passed ? '#10b981' : '#ef4444';
    
    // Update score circle color based on performance
    const scoreCircle = document.querySelector('.score-circle');
    const percentage = parseInt(results.percentage);
    
    if (percentage >= 80) {
        scoreCircle.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (percentage >= 60) {
        scoreCircle.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    } else if (percentage >= 40) {
        scoreCircle.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    document.getElementById('resultsModal').classList.add('show');
}

// Review answers
function reviewAnswers() {
    document.getElementById('resultsModal').classList.remove('show');
    displayQuestion(0);
    
    // Disable option selection in review mode
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Show correct/incorrect indicators
    highlightAnswers();
}

// Highlight correct and incorrect answers
function highlightAnswers() {
    const options = document.querySelectorAll('.option');
    const question = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    options.forEach((opt, index) => {
        if (index === question.correctAnswer) {
            opt.style.background = '#dcfce7';
            opt.style.borderColor = '#10b981';
        }
        
        if (index === userAnswer && userAnswer !== question.correctAnswer) {
            opt.style.background = '#fee2e2';
            opt.style.borderColor = '#ef4444';
        }
    });
}

// Return to dashboard
function returnToDashboard() {
    window.location.href = 'student-dashboard.html';
}
