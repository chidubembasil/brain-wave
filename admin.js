/**
 * BrainWave Admin Dashboard
 * Modern admin interface with BrainWave brand styling
 */

class AdminDashboard {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.userCurrentPage = 1;
        this.usersPerPage = 10;
        this.init();
    }

    init() {
        console.log('🚀 Initializing AdminDashboard...');
        
        try {
            console.log('  ✅ Binding events...');
            this.bindEvents();
        } catch (error) {
            console.error('  ❌ Error binding events:', error);
        }
        
        try {
            console.log('  ✅ Loading dashboard data...');
            this.loadDashboardData();
        } catch (error) {
            console.error('  ❌ Error loading dashboard data:', error);
        }
        
        try {
            console.log('  ✅ Setting up animations...');
            this.setupAnimations();
        } catch (error) {
            console.error('  ❌ Error setting up animations:', error);
        }
        
        try {
            console.log('  ✅ Initializing content management...');
            this.initializeContentManagement();
        } catch (error) {
            console.error('  ❌ Error initializing content management:', error);
        }
        
        try {
            console.log('  ✅ Initializing assessment management...');
            this.initializeAssessmentManagement();
        } catch (error) {
            console.error('  ❌ Error initializing assessment management:', error);
        }
        
        try {
            console.log('  ✅ Initializing live class management...');
            this.initializeLiveClassManagement();
        } catch (error) {
            console.error('  ❌ Error initializing live class management:', error);
        }
        
        try {
            console.log('  ✅ Initializing reports analytics...');
            this.initializeReportsAnalytics();
        } catch (error) {
            console.error('  ❌ Error initializing reports analytics:', error);
        }
        
        try {
            console.log('  ✅ Initializing plans management...');
            this.initializePlansManagement();
        } catch (error) {
            console.error('  ❌ Error initializing plans management:', error);
        }
        
        console.log('✅ AdminDashboard initialization complete!');
    }

    bindEvents() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile overlay click to close menu
        const mobileOverlay = document.getElementById('mobileOverlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
                // Close mobile menu when navigating on mobile
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const page = card.getAttribute('data-page');
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });

        // Notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => this.showNotifications());
        }

        // User avatar
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar) {
            userAvatar.addEventListener('click', () => this.showUserMenu());
        }

        // Responsive sidebar for mobile
        this.setupResponsiveSidebar();

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.innerWidth <= 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            this.sidebarCollapsed = !this.sidebarCollapsed;
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                icon.className = this.sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-bars';
            }
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        if (sidebar && overlay) {
            const isOpen = sidebar.classList.contains('mobile-open');
            
            if (isOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.add('mobile-open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    navigateToPage(page) {
        // Update active navigation
        this.updateActiveNavigation(page);
        
        // Show page content
        this.showPageContent(page);
        
        // Update page title
        this.updatePageTitle(page);
        
        // Update current page
        this.currentPage = page;
        
        // Load page-specific data
        this.loadPageData(page);
    }

    updateActiveNavigation(page) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current page link
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }

    showPageContent(page) {
        // Hide all page sections
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // Show current page section - try both naming conventions
        let currentSection = document.getElementById(`${page}-section`);
        if (!currentSection) {
            currentSection = document.getElementById(`${page}-page`);
        }
        
        if (currentSection) {
            currentSection.style.display = 'block';
            currentSection.classList.add('active');
            // Add fade-in animation
            currentSection.querySelector('.fade-in')?.classList.add('fade-in');
            
            // Initialize pagination for users page
            if (page === 'users') {
                this.updatePagination();
            }
        }
    }

    updatePageTitle(page) {
        const pageTitle = document.getElementById('pageTitle');
        const titles = {
            dashboard: 'Dashboard',
            users: 'User Management',
            content: 'Content Management',
            subjects: 'Subject Management',
            assessments: 'Assessment Management',
            'live-classes': 'Live Classes',
            community: 'Community & Announcements',
            analytics: 'Analytics & Reports',
            settings: 'Subscription Management'
        };
        
        if (pageTitle && titles[page]) {
            pageTitle.textContent = titles[page];
        }
    }

    loadPageData(page) {
        switch (page) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'users':
                this.loadUsersData();
                break;
            case 'content':
                this.loadContentData();
                break;
            case 'subjects':
                this.loadSubjectsData();
                break;
            case 'assessments':
                this.loadAssessmentsData();
                break;
            case 'live-classes':
                this.loadLiveClassesData();
                break;
            case 'community':
                this.loadCommunityData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'settings':
                this.initializePlansManagement();
                break;
        }
    }

    loadCommunityData() {
        console.log('Loading community data...');
        // Trigger the community script functions
        if (window.loadCommunityLinks) {
            window.loadCommunityLinks();
        }
        if (window.loadAnnouncements) {
            window.loadAnnouncements();
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard statistics
        this.animateCounters();
        this.loadRecentActivity();
    }

    animateCounters() {
        const counters = [
            { id: 'totalUsers', target: 1234 },
            { id: 'totalContent', target: 567 },
            { id: 'totalAssessments', target: 89 },
            { id: 'totalRevenue', target: 12345, prefix: '$' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
                this.animateCounter(element, counter.target, counter.prefix || '');
            }
        });
    }

    animateCounter(element, target, prefix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = prefix + Math.floor(current).toLocaleString();
        }, 30);
    }

    loadRecentActivity() {
        // Recent activity is already in HTML, could be enhanced with real data
        console.log('Recent activity loaded');
    }

    loadUsersData() {
        console.log('Loading users data...');
        // Implement user management functionality
    }

    loadContentData() {
        console.log('Loading content data...');
        // Implement content management functionality
    }

    loadSubjectsData() {
        console.log('Loading subjects data...');
        
        // Initialize subjects from storage
        this.subjects = this.loadFromStorage('subjects') || [];
        
        // Initialize subject filters functionality
        this.initializeSubjectFilters();
    }

    initializeSubjectFilters() {
        // Add event listeners for subject filters
        const searchInput = document.getElementById('searchSubjectInput');
        const classFilter = document.getElementById('classSubjectFilter');
        const streamFilter = document.getElementById('streamSubjectFilter');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterSubjects());
        }
        
        if (classFilter) {
            classFilter.addEventListener('change', () => this.filterSubjects());
        }
        
        if (streamFilter) {
            streamFilter.addEventListener('change', () => this.filterSubjects());
        }
        
        // Add Enter key support for search input
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterSubjects();
                }
            });
        }
    }

    filterSubjects() {
        const searchTerm = document.getElementById('searchSubjectInput')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('classSubjectFilter')?.value || '';
        const streamFilter = document.getElementById('streamSubjectFilter')?.value || '';
        
        const subjectCards = document.querySelectorAll('.subject-card');
        let visibleCount = 0;
        
        subjectCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            // Get data attributes for filtering
            const cardStream = card.getAttribute('data-stream') || '';
            const cardClasses = card.getAttribute('data-class') || '';
            
            // Check search match
            const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
            
            // Check class filter match
            // For JAMB subjects, they don't have SS1/SS2/SS3 classes
            const matchesClass = !classFilter || 
                                cardClasses.includes(classFilter) ||
                                (classFilter && cardStream === 'JAMB' && cardClasses === 'JAMB');
            
            // Check stream filter match
            // Handle multi-stream subjects (e.g., Biology, Economics)
            const cardStreams = cardStream.split(',').map(s => s.trim());
            const matchesStream = !streamFilter || 
                                 cardStreams.includes(streamFilter) ||
                                 cardStream === streamFilter;
            
            if (matchesSearch && matchesClass && matchesStream) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update count or show message if no results
        console.log(`Filtered subjects: ${visibleCount} visible`);
        
        // Show/hide JAMB section header based on filters
        const jambHeader = document.querySelector('.subjects-grid > div[style*="grid-column"]');
        if (jambHeader) {
            const hasVisibleJambSubjects = Array.from(subjectCards).some(card => 
                card.getAttribute('data-stream') === 'JAMB' && card.style.display !== 'none'
            );
            jambHeader.style.display = hasVisibleJambSubjects ? 'block' : 'none';
        }
    }

    // Global function for the filter button
    applySubjectFilters() {
        this.filterSubjects();
    }

    // Subject management action functions
    viewSubjectContent(subjectId) {
        console.log('Viewing content for subject:', subjectId);
        
        // Navigate to subject content page
        const subjectName = this.getSubjectNameById(subjectId);
        this.showToast(`Opening ${subjectName} content...`, 'info');
        
        // Redirect to subject.html with subject parameter
        setTimeout(() => {
            window.location.href = `subject.html?subject=${encodeURIComponent(subjectName)}`;
        }, 500);
    }

    editSubject(subjectId) {
        console.log('Editing subject:', subjectId);
        
        // Get subject data
        const subjectData = this.getSubjectData(subjectId);
        if (!subjectData) {
            this.showToast('Subject not found', 'error');
            return;
        }
        
        // Show edit modal
        this.showEditSubjectModal(subjectData);
    }

    deleteSubject(subjectId) {
        console.log('Deleting subject:', subjectId);
        
        const subjectName = this.getSubjectNameById(subjectId);
        
        // Custom confirmation dialog
        this.showConfirmDialog(
            'Delete Subject',
            `Are you sure you want to delete "${subjectName}"? This action cannot be undone.`,
            () => {
                // Find and remove the subject card
                const subjectCards = document.querySelectorAll('.subject-card');
                let deleted = false;
                
                subjectCards.forEach(card => {
                    const cardTitle = card.querySelector('h3')?.textContent.toLowerCase();
                    if (cardTitle && (cardTitle.includes(subjectId) || subjectId.includes(cardTitle.split(' ')[0]))) {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            card.remove();
                            this.showToast(`${subjectName} deleted successfully`, 'success');
                        }, 300);
                        
                        deleted = true;
                    }
                });
                
                if (!deleted) {
                    this.showToast('Subject not found', 'error');
                }
            }
        );
    }
    
    // Helper function to get subject name by ID
    getSubjectNameById(subjectId) {
        const subjectNames = {
            'mathematics': 'Mathematics',
            'english': 'English Language',
            'civic': 'Citizenship and Heritage Studies',
            'physics': 'Physics',
            'chemistry': 'Chemistry',
            'biology': 'Biology',
            'economics': 'Economics',
            'literature': 'Literature-in-English',
            'government': 'Government',
            'commerce': 'Commerce',
            'accounts': 'Accounts',
            'crs': 'Christian Religious Studies',
            'jamb-science': 'JAMB Science Combination',
            'jamb-arts': 'JAMB Humanities Combination',
            'jamb-commercial': 'JAMB Business Combination'
        };
        
        return subjectNames[subjectId] || subjectId;
    }
    
    // Get subject data for editing
    getSubjectData(subjectId) {
        const subjectCards = document.querySelectorAll('.subject-card');
        let subjectData = null;
        
        subjectCards.forEach(card => {
            const cardTitle = card.querySelector('h3')?.textContent.toLowerCase();
            if (cardTitle && (cardTitle.includes(subjectId) || subjectId.includes(cardTitle.split(' ')[0]))) {
                subjectData = {
                    id: subjectId,
                    name: card.querySelector('h3')?.textContent || '',
                    description: card.querySelector('p')?.textContent || '',
                    stream: card.getAttribute('data-stream') || '',
                    classes: card.getAttribute('data-class') || '',
                    department: card.getAttribute('data-department') || ''
                };
            }
        });
        
        return subjectData;
    }

    loadAssessmentsData() {
        console.log('Loading assessments data...');
        // Implement assessment management functionality
    }

    loadLiveClassesData() {
        console.log('Loading live classes data...');
        // Implement live classes functionality
    }

    loadAnalyticsData() {
        console.log('Loading analytics data...');
        // Implement analytics functionality
    }

    loadSettingsData() {
        console.log('Loading settings data...');
        // Implement settings functionality
    }

    showNotifications() {
        // Implement notifications dropdown
        console.log('Showing notifications...');
        // Could show a dropdown with recent notifications
    }

    showUserMenu() {
        // Implement user menu dropdown
        console.log('Showing user menu...');
        // Could show logout, profile settings, etc.
    }

    setupResponsiveSidebar() {
        // Handle mobile responsiveness
        const handleResize = () => {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            
            if (window.innerWidth <= 768) {
                sidebar?.classList.add('mobile');
                // Close mobile menu when resizing to mobile
                if (sidebar?.classList.contains('mobile-open')) {
                    this.closeMobileMenu();
                }
            } else {
                sidebar?.classList.remove('mobile', 'mobile-open');
                overlay?.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling when going to desktop
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    }

    setupAnimations() {
        // Setup intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all elements that should fade in
        const fadeElements = document.querySelectorAll('.stat-card, .action-card, .chart-card');
        fadeElements.forEach(el => observer.observe(el));
    }

    // Utility methods
    showLoading(element) {
        if (element) {
            element.innerHTML = '<div class="loading"></div>';
        }
    }

    hideLoading(element, content) {
        if (element) {
            element.innerHTML = content;
        }
    }

    showToast(message, type = 'info') {
        // Create and show toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        toast.style.background = colors[type] || colors.info;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // API methods (to be implemented with real backend)
    async fetchData(endpoint) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            return { success: true, data: [] };
        } catch (error) {
            console.error('API Error:', error);
            this.showToast('Failed to fetch data', 'error');
            return { success: false, error };
        }
    }

    async saveData(endpoint, data) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showToast('Data saved successfully', 'success');
            return { success: true };
        } catch (error) {
            console.error('API Error:', error);
            this.showToast('Failed to save data', 'error');
            return { success: false, error };
        }
    }
    
    // Show confirmation dialog
    showConfirmDialog(title, message, onConfirm) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; color: #1f2937; font-size: 1.25rem;">${title}</h3>
            <p style="margin: 0 0 1.5rem 0; color: #6b7280; line-height: 1.6;">${message}</p>
            <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                <button id="cancelBtn" style="
                    padding: 0.5rem 1rem;
                    border: 1px solid #d1d5db;
                    background: white;
                    color: #374151;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                ">Cancel</button>
                <button id="confirmBtn" style="
                    padding: 0.5rem 1rem;
                    border: none;
                    background: #ef4444;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                ">Delete</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add hover effects
        const confirmBtn = modal.querySelector('#confirmBtn');
        const cancelBtn = modal.querySelector('#cancelBtn');
        
        confirmBtn.addEventListener('mouseenter', () => {
            confirmBtn.style.background = '#dc2626';
        });
        confirmBtn.addEventListener('mouseleave', () => {
            confirmBtn.style.background = '#ef4444';
        });
        
        cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.style.background = '#f3f4f6';
        });
        cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.style.background = 'white';
        });
        
        // Handle buttons
        confirmBtn.addEventListener('click', () => {
            onConfirm();
            document.body.removeChild(overlay);
        });
        
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Show Edit Subject Modal
    showEditSubjectModal(subjectData) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'editSubjectModal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 1.5rem 0; color: #1f2937; font-size: 1.5rem;">
                <i class="fas fa-edit"></i> Edit Subject
            </h3>
            <form id="editSubjectForm">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Subject Name</label>
                    <input type="text" id="subjectName" value="${subjectData.name}" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Description</label>
                    <textarea id="subjectDescription" rows="3" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; resize: vertical;">${subjectData.description}</textarea>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Stream</label>
                    <select id="subjectStream" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                        <option value="General" ${subjectData.stream === 'General' ? 'selected' : ''}>General</option>
                        <option value="Science" ${subjectData.stream === 'Science' ? 'selected' : ''}>Science</option>
                        <option value="Humanities" ${subjectData.stream === 'Humanities' ? 'selected' : ''}>Humanities</option>
                        <option value="Business" ${subjectData.stream === 'Business' ? 'selected' : ''}>Business</option>
                        <option value="JAMB" ${subjectData.stream === 'JAMB' ? 'selected' : ''}>JAMB</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Class Levels</label>
                    <input type="text" id="subjectClasses" value="${subjectData.classes}" placeholder="e.g., SS1,SS2,SS3" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                    <small style="color: #6b7280; font-size: 0.875rem;">Separate multiple classes with commas</small>
                </div>
                
                <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                    <button type="button" id="cancelEditBtn" style="
                        padding: 0.75rem 1.5rem;
                        border: 1px solid #d1d5db;
                        background: white;
                        color: #374151;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s;
                    ">Cancel</button>
                    <button type="submit" style="
                        padding: 0.75rem 1.5rem;
                        border: none;
                        background: #3b82f6;
                        color: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s;
                    ">Save Changes</button>
                </div>
            </form>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Handle form submission
        const form = modal.querySelector('#editSubjectForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const updatedData = {
                id: subjectData.id,
                name: document.getElementById('subjectName').value,
                description: document.getElementById('subjectDescription').value,
                stream: document.getElementById('subjectStream').value,
                classes: document.getElementById('subjectClasses').value
            };
            
            this.updateSubject(updatedData);
            document.body.removeChild(overlay);
        });
        
        // Handle cancel
        modal.querySelector('#cancelEditBtn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Update subject with new data
    updateSubject(updatedData) {
        const subjectCards = document.querySelectorAll('.subject-card');
        let updated = false;
        
        subjectCards.forEach(card => {
            const cardTitle = card.querySelector('h3')?.textContent.toLowerCase();
            if (cardTitle && (cardTitle.includes(updatedData.id) || updatedData.id.includes(cardTitle.split(' ')[0]))) {
                // Update card content
                card.querySelector('h3').textContent = updatedData.name;
                card.querySelector('p').textContent = updatedData.description;
                card.setAttribute('data-stream', updatedData.stream);
                card.setAttribute('data-class', updatedData.classes);
                
                // Update stream badge
                const badges = card.querySelectorAll('span');
                if (badges[0]) {
                    badges[0].textContent = `${updatedData.stream} ${updatedData.stream === 'General' ? 'Subject' : 'Stream'}`;
                }
                if (badges[1]) {
                    badges[1].textContent = updatedData.classes;
                }
                
                updated = true;
                
                // Highlight the updated card
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.3)';
                
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.boxShadow = '';
                }, 500);
            }
        });
        
        if (updated) {
            this.showToast('Subject updated successfully', 'success');
        } else {
            this.showToast('Failed to update subject', 'error');
        }
    }
    
    // Show Add Subject Modal
    showAddSubjectModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.id = 'addSubjectModal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 1.5rem 0; color: #1f2937; font-size: 1.5rem;">
                <i class="fas fa-plus-circle"></i> Add New Subject
            </h3>
            <form id="addSubjectForm">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Subject Name *</label>
                    <input type="text" id="newSubjectName" required placeholder="e.g., Geography"
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Description *</label>
                    <textarea id="newSubjectDescription" rows="3" required placeholder="Brief description of the subject"
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; resize: vertical;"></textarea>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Stream *</label>
                    <select id="newSubjectStream" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                        <option value="">Select Stream</option>
                        <option value="General">General</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Business">Business</option>
                        <option value="JAMB">JAMB</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Class Levels *</label>
                    <input type="text" id="newSubjectClasses" placeholder="e.g., SS1,SS2,SS3" required
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                    <small style="color: #6b7280; font-size: 0.875rem;">Separate multiple classes with commas</small>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Icon (FontAwesome class)</label>
                    <input type="text" id="newSubjectIcon" placeholder="e.g., fa-globe" 
                        style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
                    <small style="color: #6b7280; font-size: 0.875rem;">Optional: FontAwesome icon class name</small>
                </div>
                
                <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                    <button type="button" id="cancelAddBtn" style="
                        padding: 0.75rem 1.5rem;
                        border: 1px solid #d1d5db;
                        background: white;
                        color: #374151;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s;
                    ">Cancel</button>
                    <button type="submit" style="
                        padding: 0.75rem 1.5rem;
                        border: none;
                        background: #10b981;
                        color: white;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: all 0.2s;
                    ">Add Subject</button>
                </div>
            </form>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Handle form submission
        const form = modal.querySelector('#addSubjectForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newSubjectData = {
                name: document.getElementById('newSubjectName').value,
                description: document.getElementById('newSubjectDescription').value,
                stream: document.getElementById('newSubjectStream').value,
                classes: document.getElementById('newSubjectClasses').value,
                icon: document.getElementById('newSubjectIcon').value || 'fa-book'
            };
            
            this.addNewSubject(newSubjectData);
            document.body.removeChild(overlay);
        });
        
        // Handle cancel
        modal.querySelector('#cancelAddBtn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Add new subject to the grid
    addNewSubject(subjectData) {
        const subjectsGrid = document.getElementById('subjectsGrid');
        if (!subjectsGrid) {
            this.showToast('Subjects grid not found', 'error');
            return;
        }
        
        // Generate random color for the subject
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #30cfd0, #330867)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Create subject card
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.setAttribute('data-stream', subjectData.stream);
        subjectCard.setAttribute('data-class', subjectData.classes);
        subjectCard.style.cssText = `
            background: var(--card-bg);
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
            opacity: 0;
            transform: scale(0.8);
        `;
        
        const subjectId = subjectData.name.toLowerCase().replace(/\s+/g, '-');
        
        subjectCard.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: ${randomColor}; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                    <i class="fas ${subjectData.icon}"></i>
                </div>
                <div style="flex: 1;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-size: 1.1rem;">${subjectData.name}</h3>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">${subjectData.description}</p>
                </div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">${subjectData.stream} ${subjectData.stream === 'General' ? 'Subject' : 'Stream'}</span>
                <span style="background: var(--success-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">${subjectData.classes}</span>
                <span style="background: var(--success-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem;">Active</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 0.85rem; color: var(--text-secondary);">
                <span><i class="fas fa-book"></i> 0 Books</span>
                <span><i class="fas fa-video"></i> 0 Videos</span>
                <span><i class="fas fa-users"></i> 0 Students</span>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn btn-sm" onclick="window.adminDashboard.viewSubjectContent('${subjectId}')" style="background: var(--primary-color); color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
                    <i class="fas fa-eye"></i> View Content
                </button>
                <button class="btn btn-sm" onclick="window.adminDashboard.editSubject('${subjectId}')" style="background: var(--warning-color); color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm" onclick="window.adminDashboard.deleteSubject('${subjectId}')" style="background: var(--danger-color); color: white; padding: 0.5rem 1rem; border: none; border-radius: 6px; font-size: 0.8rem; cursor: pointer;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        // Insert before JAMB section if it exists, otherwise append
        const jambHeader = subjectsGrid.querySelector('div[style*="grid-column"]');
        if (jambHeader && subjectData.stream !== 'JAMB') {
            subjectsGrid.insertBefore(subjectCard, jambHeader);
        } else {
            subjectsGrid.appendChild(subjectCard);
        }
        
        // Animate in
        setTimeout(() => {
            subjectCard.style.opacity = '1';
            subjectCard.style.transform = 'scale(1)';
        }, 100);
        
        // Save subject to storage
        this.saveSubjectToStorage(subjectData);
        
        this.showToast(`${subjectData.name} added successfully`, 'success');
    }

    saveSubjectToStorage(subjectData) {
        let subjects = this.loadFromStorage('subjects') || [];
        
        // Parse class levels - handle both single and multiple classes
        const classLevels = subjectData.classes.split(',').map(c => c.trim());
        
        // Create a subject entry for each class level for student dashboard compatibility
        classLevels.forEach(classLevel => {
            const subjectWithId = {
                id: Date.now() + Math.random(), // Ensure unique IDs
                name: subjectData.name,
                description: subjectData.description,
                stream: subjectData.stream,
                classLevel: classLevel, // Student dashboard expects 'classLevel' (singular)
                icon: subjectData.icon || 'fa-book',
                createdAt: new Date().toISOString()
            };
            subjects.push(subjectWithId);
        });
        
        this.saveToStorage('subjects', subjects);
        this.subjects = subjects;
        
        console.log('✅ Subjects saved to localStorage:', subjects);
        
        // Update content management subject dropdown if it exists
        this.updateContentSubjectDropdown();
    }

    // ========== CONTENT MANAGEMENT (Books & Videos) ==========
    
    initializeContentManagement() {
        console.log('Initializing content management...');
        
        this.books = this.loadFromStorage('books') || [];
        this.videos = this.loadFromStorage('videos') || [];
        this.subjects = this.loadFromStorage('subjects') || [];
        this.currentEditContentId = null;
        this.currentEditContentType = null;
        
        console.log('Loaded books from storage:', this.books);
        console.log('Loaded videos from storage:', this.videos);
        console.log('Loaded subjects from storage:', this.subjects);
        
        this.renderBooks();
        this.renderVideos();
        this.updateContentCounts();
        this.setupContentFilters();
        this.updateContentSubjectDropdown();
        
        console.log('Content management initialized');
    }

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(`brainwave_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from storage:', error);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(`brainwave_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    updateContentCounts() {
        document.getElementById('books-count').textContent = this.books.length;
        document.getElementById('videos-count').textContent = this.videos.length;
    }

    setupContentFilters() {
        // Book filters
        document.getElementById('book-search')?.addEventListener('input', () => this.filterBooks());
        document.getElementById('book-class-filter')?.addEventListener('change', () => this.filterBooks());
        document.getElementById('book-subject-filter')?.addEventListener('change', () => this.filterBooks());

        // Video filters
        document.getElementById('video-search')?.addEventListener('input', () => this.filterVideos());
        document.getElementById('video-class-filter')?.addEventListener('change', () => this.filterVideos());
        document.getElementById('video-subject-filter')?.addEventListener('change', () => this.filterVideos());
    }

    switchContentTab(tab) {
        console.log('Switching to tab:', tab);
        
        // Remove active class from all tabs
        document.querySelectorAll('.content-tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'none';
            btn.style.color = 'var(--text-secondary)';
            btn.style.boxShadow = 'none';
        });
        
        document.querySelectorAll('.content-tab-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Add active class to the clicked tab button
        const tabButtons = document.querySelectorAll('.content-tab-btn');
        tabButtons.forEach(btn => {
            const btnText = btn.textContent.trim().toLowerCase();
            if ((tab === 'books' && btnText.includes('books')) || (tab === 'videos' && btnText.includes('videos'))) {
                btn.classList.add('active');
                btn.style.background = 'var(--primary-gradient)';
                btn.style.color = 'var(--white)';
                btn.style.boxShadow = 'var(--shadow-sm)';
            }
        });
        
        // Show the selected tab content
        const tabContent = document.getElementById(`${tab}-content-tab`);
        if (tabContent) {
            tabContent.classList.add('active');
            tabContent.style.display = 'block';
        }
        
        console.log('Tab switched to:', tab);
    }

    openContentModal(type = 'book') {
        console.log('Opening content modal for type:', type);
        
        this.currentEditContentId = null;
        this.currentEditContentType = null;
        
        const modal = document.getElementById('content-modal');
        const modalTitle = document.getElementById('content-modal-title');
        const contentType = document.getElementById('content-type');
        const form = document.getElementById('content-form');
        
        if (!modal) {
            console.error('Content modal not found');
            this.showToast('Error: Modal not found', 'error');
            return;
        }
        
        modal.classList.add('active');
        
        if (modalTitle) {
            modalTitle.textContent = `Add ${type === 'book' ? 'Book' : 'Video'}`;
        }
        
        if (contentType) {
            contentType.value = type;
        }
        
        if (form) {
            form.reset();
        }
        
        this.updateContentFormFields();
        console.log('Content modal opened successfully');
    }

    closeContentModal() {
        console.log('Closing content modal');
        const modal = document.getElementById('content-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        const form = document.getElementById('content-form');
        if (form) {
            form.reset();
        }
        this.currentEditContentId = null;
        this.currentEditContentType = null;
    }

    updateContentFormFields() {
        const type = document.getElementById('content-type').value;
        const bookField = document.getElementById('book-link-field');
        const videoField = document.getElementById('video-link-field');
        const durationField = document.getElementById('video-duration-field');

        if (type === 'book') {
            bookField.style.display = 'block';
            videoField.style.display = 'none';
            durationField.style.display = 'none';
            document.getElementById('book-link').required = true;
            document.getElementById('video-link').required = false;
        } else {
            bookField.style.display = 'none';
            videoField.style.display = 'block';
            durationField.style.display = 'block';
            document.getElementById('book-link').required = false;
            document.getElementById('video-link').required = true;
        }
    }

    updateContentSubjectDropdown() {
        const subjectSelect = document.getElementById('content-subject');
        if (!subjectSelect) return;

        // Clear existing options except the first one
        const firstOption = subjectSelect.firstElementChild;
        subjectSelect.innerHTML = '';
        subjectSelect.appendChild(firstOption);

        // Add stored subjects
        const subjects = this.loadFromStorage('subjects') || [];
        const subjectGroups = {
            'General': [],
            'Science': [],
            'Humanities': [],
            'Business': [],
            'Multi-Stream': [],
            'JAMB': []
        };

        // Group subjects by stream
        subjects.forEach(subject => {
            const stream = subject.stream || 'General';
            if (subjectGroups[stream]) {
                subjectGroups[stream].push(subject);
            } else {
                subjectGroups['General'].push(subject);
            }
        });

        // Add default subjects if no custom subjects exist
        if (subjects.length === 0) {
            this.addDefaultSubjectsToDropdown(subjectSelect);
        } else {
            // Add grouped subjects
            Object.keys(subjectGroups).forEach(stream => {
                if (subjectGroups[stream].length > 0) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = `${stream} ${stream === 'General' ? 'Subjects' : 'Stream'}`;
                    
                    subjectGroups[stream].forEach(subject => {
                        const option = document.createElement('option');
                        option.value = subject.name;
                        option.textContent = subject.name;
                        optgroup.appendChild(option);
                    });
                    
                    subjectSelect.appendChild(optgroup);
                }
            });
        }
    }

    addDefaultSubjectsToDropdown(subjectSelect) {
        const defaultSubjects = [
            { group: 'General Subjects', subjects: ['Mathematics', 'English Language', 'Citizenship and Heritage Studies'] },
            { group: 'Science Stream', subjects: ['Physics', 'Chemistry'] },
            { group: 'Multi-Stream', subjects: ['Biology', 'Economics'] },
            { group: 'Humanities Stream', subjects: ['Literature-in-English', 'Government', 'CRS'] },
            { group: 'Business Stream', subjects: ['Commerce', 'Accounts'] }
        ];

        defaultSubjects.forEach(group => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.group;
            
            group.subjects.forEach(subjectName => {
                const option = document.createElement('option');
                option.value = subjectName;
                option.textContent = subjectName;
                optgroup.appendChild(option);
            });
            
            subjectSelect.appendChild(optgroup);
        });
    }

    openAddSubjectFromContent() {
        // Create a mini subject creation modal
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: var(--white);
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-xl);
        `;

        modal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid var(--border-color);">
                <h3 style="margin: 0; font-size: 1.25rem; color: var(--text-primary);">Add New Subject</h3>
                <button id="closeSubjectModal" style="background: none; border: none; font-size: 1.5rem; color: var(--text-secondary); cursor: pointer;">&times;</button>
            </div>
            <form id="quickSubjectForm">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Subject Name *</label>
                    <input type="text" id="quickSubjectName" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Description</label>
                    <textarea id="quickSubjectDescription" rows="2" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; resize: vertical;"></textarea>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Stream *</label>
                    <select id="quickSubjectStream" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; background: var(--white);">
                        <option value="">Select Stream</option>
                        <option value="General">General</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Business">Business</option>
                        <option value="Multi-Stream">Multi-Stream</option>
                        <option value="JAMB">JAMB</option>
                    </select>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Class Levels *</label>
                    <select id="quickSubjectClasses" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; background: var(--white);">
                        <option value="">Select Classes</option>
                        <option value="SS1, SS2, SS3">SS1, SS2, SS3</option>
                        <option value="SS1, SS2">SS1, SS2</option>
                        <option value="SS2, SS3">SS2, SS3</option>
                        <option value="SS3">SS3 Only</option>
                        <option value="JAMB">JAMB</option>
                    </select>
                </div>
                <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
                    <button type="button" id="cancelQuickSubject" class="btn btn-secondary">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Subject</button>
                </div>
            </form>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Event listeners
        document.getElementById('closeSubjectModal').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        document.getElementById('cancelQuickSubject').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });

        document.getElementById('quickSubjectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const subjectData = {
                name: document.getElementById('quickSubjectName').value,
                description: document.getElementById('quickSubjectDescription').value || `Learn ${document.getElementById('quickSubjectName').value} concepts and principles`,
                stream: document.getElementById('quickSubjectStream').value,
                classes: document.getElementById('quickSubjectClasses').value,
                icon: 'fa-book'
            };
            
            // Save to storage
            this.saveSubjectToStorage(subjectData);
            
            // Add to subjects grid if we're on the subjects page
            if (this.currentPage === 'subjects') {
                this.addNewSubject(subjectData);
            }
            
            // Update the content subject dropdown
            this.updateContentSubjectDropdown();
            
            // Set the newly created subject as selected
            const subjectSelect = document.getElementById('content-subject');
            if (subjectSelect) {
                subjectSelect.value = subjectData.name;
            }
            
            this.showToast(`${subjectData.name} added successfully!`, 'success');
            document.body.removeChild(overlay);
        });
    }

    saveContent(event) {
        event.preventDefault();
        console.log('saveContent called');

        // Check if all required form elements exist
        const requiredElements = [
            'content-type', 'content-title', 'content-description', 
            'content-class', 'content-subject'
        ];
        
        for (const elementId of requiredElements) {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error(`Required form element not found: ${elementId}`);
                this.showToast(`Form error: Missing ${elementId} field`, 'error');
                return;
            }
        }

        const type = document.getElementById('content-type').value;
        const title = document.getElementById('content-title').value;
        const description = document.getElementById('content-description').value;
        const classLevel = document.getElementById('content-class').value;
        const subject = document.getElementById('content-subject').value;

        console.log('Form data:', { type, title, description, classLevel, subject });

        if (type === 'book') {
            const linkElement = document.getElementById('book-link');
            if (!linkElement) {
                console.error('Book link element not found');
                this.showToast('Form error: Book link field not found', 'error');
                return;
            }
            
            const link = linkElement.value;
            const bookData = { title, description, classLevel, subject, link };
            
            console.log('Book data prepared:', bookData);

            if (this.currentEditContentId && this.currentEditContentType === 'book') {
                console.log('Updating existing book');
                this.updateBook(this.currentEditContentId, bookData);
            } else {
                console.log('Adding new book');
                try {
                    this.addBook(bookData);
                    console.log('Book addition completed successfully');
                    // Close modal only after successful addition
                    setTimeout(() => {
                        this.closeContentModal();
                    }, 200);
                    return; // Don't close modal immediately
                } catch (error) {
                    console.error('Error adding book:', error);
                    this.showToast('Error adding book: ' + error.message, 'error');
                    return; // Don't close modal on error
                }
            }
        } else {
            const linkElement = document.getElementById('video-link');
            if (!linkElement) {
                console.error('Video link element not found');
                this.showToast('Form error: Video link field not found', 'error');
                return;
            }
            
            const link = linkElement.value;
            const duration = document.getElementById('video-duration')?.value || '';
            const videoData = { title, description, classLevel, subject, link, duration };

            console.log('Video data prepared:', videoData);

            if (this.currentEditContentId && this.currentEditContentType === 'video') {
                console.log('Updating existing video');
                this.updateVideo(this.currentEditContentId, videoData);
            } else {
                console.log('Adding new video');
                try {
                    this.addVideo(videoData);
                    console.log('Video addition completed successfully');
                    // Close modal only after successful addition
                    setTimeout(() => {
                        this.closeContentModal();
                    }, 200);
                    return; // Don't close modal immediately
                } catch (error) {
                    console.error('Error adding video:', error);
                    this.showToast('Error adding video: ' + error.message, 'error');
                    return; // Don't close modal on error
                }
            }
        }

        this.closeContentModal();
    }

    addBook(bookData) {
        console.log('Adding book:', bookData);
        
        // Validate required fields with detailed error messages
        const missingFields = [];
        if (!bookData.title || bookData.title.trim() === '') missingFields.push('Title');
        if (!bookData.subject || bookData.subject.trim() === '') missingFields.push('Subject');
        if (!bookData.classLevel || bookData.classLevel.trim() === '') missingFields.push('Class Level');
        if (!bookData.link || bookData.link.trim() === '') missingFields.push('Google Drive Link');
        
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            this.showToast(`Please fill in: ${missingFields.join(', ')}`, 'error');
            return;
        }
        
        // Ensure books array is initialized
        if (!this.books) {
            console.log('Books array not initialized, creating new array');
            this.books = [];
        }
        
        const book = {
            id: Date.now(),
            ...bookData,
            createdAt: new Date().toISOString()
        };
        
        console.log('Book object created:', book);
        
        this.books.push(book);
        console.log('Book pushed to array, new length:', this.books.length);
        
        this.saveToStorage('books', this.books);
        console.log('Book saved to localStorage');
        
        console.log('Books array after adding:', this.books);
        console.log('Total books count:', this.books.length);
        
        // Force re-render with a small delay to ensure DOM is ready
        setTimeout(() => {
            console.log('Re-rendering books...');
            this.renderBooks();
            this.updateContentCounts();
            console.log('Books rendered and counts updated');
        }, 100);
        
        this.showToast('Book added successfully!', 'success');
    }

    addVideo(videoData) {
        const video = {
            id: Date.now(),
            ...videoData,
            createdAt: new Date().toISOString()
        };
        this.videos.push(video);
        this.saveToStorage('videos', this.videos);
        this.renderVideos();
        this.updateContentCounts();
        this.showToast('Video added successfully!', 'success');
    }

    updateBook(id, bookData) {
        const index = this.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...bookData, updatedAt: new Date().toISOString() };
            this.saveToStorage('books', this.books);
            this.renderBooks();
            this.showToast('Book updated successfully!', 'success');
        }
    }

    updateVideo(id, videoData) {
        const index = this.videos.findIndex(v => v.id === id);
        if (index !== -1) {
            this.videos[index] = { ...this.videos[index], ...videoData, updatedAt: new Date().toISOString() };
            this.saveToStorage('videos', this.videos);
            this.renderVideos();
            this.showToast('Video updated successfully!', 'success');
        }
    }

    deleteBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        this.showConfirmDialog(
            'Delete Book',
            `Are you sure you want to delete "${book.title}"? This action cannot be undone.`,
            () => {
                this.books = this.books.filter(b => b.id !== id);
                this.saveToStorage('books', this.books);
                this.renderBooks();
                this.updateContentCounts();
                this.showToast('Book deleted successfully!', 'success');
            }
        );
    }

    deleteVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (!video) return;

        this.showConfirmDialog(
            'Delete Video',
            `Are you sure you want to delete "${video.title}"? This action cannot be undone.`,
            () => {
                this.videos = this.videos.filter(v => v.id !== id);
                this.saveToStorage('videos', this.videos);
                this.renderVideos();
                this.updateContentCounts();
                this.showToast('Video deleted successfully!', 'success');
            }
        );
    }

    editBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        this.currentEditContentId = id;
        this.currentEditContentType = 'book';

        document.getElementById('content-modal').classList.add('active');
        document.getElementById('content-modal-title').textContent = 'Edit Book';
        document.getElementById('content-type').value = 'book';
        document.getElementById('content-title').value = book.title;
        document.getElementById('content-description').value = book.description;
        document.getElementById('content-class').value = book.classLevel;
        document.getElementById('content-subject').value = book.subject;
        document.getElementById('book-link').value = book.link;

        this.updateContentFormFields();
    }

    editVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (!video) return;

        this.currentEditContentId = id;
        this.currentEditContentType = 'video';

        document.getElementById('content-modal').classList.add('active');
        document.getElementById('content-modal-title').textContent = 'Edit Video';
        document.getElementById('content-type').value = 'video';
        document.getElementById('content-title').value = video.title;
        document.getElementById('content-description').value = video.description;
        document.getElementById('content-class').value = video.classLevel;
        document.getElementById('content-subject').value = video.subject;
        document.getElementById('video-link').value = video.link;
        document.getElementById('video-duration').value = video.duration || '';

        this.updateContentFormFields();
    }

    viewBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book && book.link) {
            window.open(book.link, '_blank');
        } else {
            this.showToast('Book link not available', 'error');
        }
    }

    viewVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (video && video.link) {
            window.open(video.link, '_blank');
        } else {
            this.showToast('Video link not available', 'error');
        }
    }

    renderBooks() {
        console.log('renderBooks called');
        console.log('this.books:', this.books);
        console.log('this.books type:', typeof this.books);
        console.log('this.books length:', this.books ? this.books.length : 'undefined');
        
        const grid = document.getElementById('books-grid');
        if (!grid) {
            console.error('books-grid element not found in DOM');
            return;
        }

        console.log('books-grid element found successfully');

        // Ensure books is an array
        if (!Array.isArray(this.books)) {
            console.warn('this.books is not an array, initializing as empty array');
            this.books = [];
        }

        if (this.books.length === 0) {
            console.log('No books to display, showing empty state');
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-book" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No books yet</h3>
                    <p style="margin: 0;">Click "Add Book" to get started</p>
                </div>
            `;
            return;
        }

        console.log('Rendering', this.books.length, 'books');
        try {
            const bookCards = this.books.map(book => {
                console.log('Creating card for book:', book);
                return this.createBookCard(book);
            });
            grid.innerHTML = bookCards.join('');
            console.log('Books rendered successfully');
        } catch (error) {
            console.error('Error rendering books:', error);
            this.showToast('Error displaying books', 'error');
        }
    }

    renderVideos() {
        const grid = document.getElementById('videos-grid');
        if (!grid) return;

        if (this.videos.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No videos yet</h3>
                    <p style="margin: 0;">Click "Add Video" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.videos.map(video => this.createVideoCard(video)).join('');
    }

    createBookCard(book) {
        return `
            <div class="content-card" data-id="${book.id}" data-book-id="${book.id}" data-class="${book.classLevel}" data-subject="${book.subject}" style="background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'; this.style.borderColor='var(--primary-color)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='var(--border-color)';">
                <div style="padding: 1rem; background: linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);">
                        <i class="fas fa-book"></i>
                    </div>
                    <div style="flex: 1; font-weight: 700; color: var(--text-primary); font-size: 1.1rem; line-height: 1.3;">${book.title}</div>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);">${book.classLevel}</span>
                        <span style="background: var(--gray-100); color: var(--gray-700); padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">${book.subject}</span>
                        <span style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">PDF</span>
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.75rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${book.description}</div>
                    <div style="display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                        <button onclick="viewBook(${book.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(16, 185, 129, 0.3)'">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button onclick="editBook(${book.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(245, 158, 11, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(245, 158, 11, 0.3)'">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteBook(${book.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(239, 68, 68, 0.3)'">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createVideoCard(video) {
        return `
            <div class="content-card" data-id="${video.id}" data-video-id="${video.id}" data-class="${video.classLevel}" data-subject="${video.subject}" style="background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'; this.style.borderColor='#ef4444';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='var(--border-color)';">
                <div style="padding: 1rem; background: linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #ef4444, #dc2626); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);">
                        <i class="fas fa-video"></i>
                    </div>
                    <div style="flex: 1; font-weight: 700; color: var(--text-primary); font-size: 1.1rem; line-height: 1.3;">${video.title}</div>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);">${video.classLevel}</span>
                        <span style="background: var(--gray-100); color: var(--gray-700); padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">${video.subject}</span>
                        ${video.duration ? `<span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-clock"></i> ${video.duration}</span>` : ''}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.75rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${video.description}</div>
                    <div style="display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                        <button onclick="viewVideo(${video.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(16, 185, 129, 0.3)'">
                            <i class="fas fa-play"></i> Watch
                        </button>
                        <button onclick="editVideo(${video.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(245, 158, 11, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(245, 158, 11, 0.3)'">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteVideo(${video.id})" class="action-btn" style="flex: 1; padding: 0.6rem 0.75rem; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.4rem; box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);" onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 6px rgba(239, 68, 68, 0.3)'">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    filterBooks() {
        const searchTerm = document.getElementById('book-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('book-class-filter')?.value || '';
        const subjectFilter = document.getElementById('book-subject-filter')?.value || '';

        const cards = document.querySelectorAll('#books-grid .content-card');

        cards.forEach(card => {
            const title = card.querySelector('[style*="font-weight: 700"]')?.textContent.toLowerCase() || '';
            const description = card.querySelector('[style*="color: var(--text-secondary)"]')?.textContent.toLowerCase() || '';
            const cardClass = card.dataset.class;
            const cardSubject = card.dataset.subject;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;

            card.style.display = (matchesSearch && matchesClass && matchesSubject) ? 'block' : 'none';
        });
    }

    filterVideos() {
        const searchTerm = document.getElementById('video-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('video-class-filter')?.value || '';
        const subjectFilter = document.getElementById('video-subject-filter')?.value || '';

        const cards = document.querySelectorAll('#videos-grid .content-card');

        cards.forEach(card => {
            const title = card.querySelector('[style*="font-weight: 700"]')?.textContent.toLowerCase() || '';
            const description = card.querySelector('[style*="color: var(--text-secondary)"]')?.textContent.toLowerCase() || '';
            const cardClass = card.dataset.class;
            const cardSubject = card.dataset.subject;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;

            card.style.display = (matchesSearch && matchesClass && matchesSubject) ? 'block' : 'none';
        });
    }

    // ========== ASSESSMENT MANAGEMENT (Quizzes, Assignments, Exams) ==========
    
    initializeAssessmentManagement() {
        this.quizzes = this.loadFromStorage('quizzes') || [];
        this.assignments = this.loadFromStorage('assignments') || [];
        this.exams = this.loadFromStorage('exams') || [];
        this.currentEditAssessmentId = null;
        this.currentEditAssessmentType = null;
        this.tempQuestions = [];
        
        this.renderQuizzes();
        this.renderAssignments();
        this.renderExams();
        this.updateAssessmentCounts();
        this.setupAssessmentFilters();
        this.populateAssessmentSubjectFilters();
    }

    updateAssessmentCounts() {
        document.getElementById('quizzes-count').textContent = this.quizzes.length;
        document.getElementById('assignments-count').textContent = this.assignments.length;
        document.getElementById('exams-count').textContent = this.exams.length;
        
        const totalQuestions = [...this.quizzes, ...this.assignments, ...this.exams]
            .reduce((sum, assessment) => sum + (assessment.questions?.length || 0), 0);
        document.getElementById('questions-count').textContent = totalQuestions;
    }

    setupAssessmentFilters() {
        // Quiz filters
        document.getElementById('quiz-search')?.addEventListener('input', () => this.filterQuizzes());
        document.getElementById('quiz-class-filter')?.addEventListener('change', () => this.filterQuizzes());
        document.getElementById('quiz-stream-filter')?.addEventListener('change', () => this.filterQuizzes());
        document.getElementById('quiz-subject-filter')?.addEventListener('change', () => this.filterQuizzes());

        // Assignment filters
        document.getElementById('assignment-search')?.addEventListener('input', () => this.filterAssignments());
        document.getElementById('assignment-class-filter')?.addEventListener('change', () => this.filterAssignments());
        document.getElementById('assignment-stream-filter')?.addEventListener('change', () => this.filterAssignments());
        document.getElementById('assignment-subject-filter')?.addEventListener('change', () => this.filterAssignments());

        // Exam filters
        document.getElementById('exam-search')?.addEventListener('input', () => this.filterExams());
        document.getElementById('exam-class-filter')?.addEventListener('change', () => this.filterExams());
        document.getElementById('exam-stream-filter')?.addEventListener('change', () => this.filterExams());
        document.getElementById('exam-subject-filter')?.addEventListener('change', () => this.filterExams());
    }

    populateAssessmentSubjectFilters() {
        // Get stored subjects from localStorage
        const storedSubjects = this.loadFromStorage('subjects') || [];
        
        // Extract unique subject names
        let subjects = [];
        if (storedSubjects.length > 0) {
            subjects = [...new Set(storedSubjects.map(s => s.name))].sort();
        } else {
            // Use default subjects if no stored subjects
            subjects = [
                'Mathematics', 'English Language', 'Citizenship and Heritage Studies',
                'Physics', 'Chemistry', 'Biology', 'Economics',
                'Literature-in-English', 'Government', 'CRS',
                'Commerce', 'Accounts'
            ];
        }

        const filterIds = ['quiz-subject-filter', 'assignment-subject-filter', 'exam-subject-filter'];
        filterIds.forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    select.appendChild(option);
                });
            }
        });
    }

    switchAssessmentTab(tab) {
        console.log('Switching to assessment tab:', tab);
        
        // Remove active class from all buttons
        document.querySelectorAll('.assessment-tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'none';
            btn.style.color = 'var(--text-secondary)';
            btn.style.boxShadow = 'none';
        });
        
        // Hide all content tabs
        document.querySelectorAll('.assessment-tab-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Add active class to clicked button and corresponding content
        const buttons = document.querySelectorAll('.assessment-tab-btn');
        const tabIndex = ['quizzes', 'assignments', 'exams'].indexOf(tab);
        if (tabIndex !== -1 && buttons[tabIndex]) {
            buttons[tabIndex].classList.add('active');
            buttons[tabIndex].style.background = 'var(--primary-gradient)';
            buttons[tabIndex].style.color = 'var(--white)';
            buttons[tabIndex].style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Show the selected tab
        const contentTab = document.getElementById(`${tab}-assessment-tab`);
        if (contentTab) {
            contentTab.classList.add('active');
            contentTab.style.display = 'block';
            console.log('✅ Activated tab:', tab);
        } else {
            console.error('❌ Tab not found:', `${tab}-assessment-tab`);
        }
    }

    openAssessmentModal(type = 'quiz') {
        console.log('🎯 Opening assessment modal for type:', type);
        this.currentEditAssessmentId = null;
        this.currentEditAssessmentType = null;
        this.tempQuestions = [];
        
        const titles = {
            quiz: 'Create Quiz',
            assignment: 'Create Assignment',
            exam: 'Create Mock Exam'
        };
        
        const modal = document.getElementById('assessment-modal');
        const modalTitle = document.getElementById('assessment-modal-title');
        const assessmentType = document.getElementById('assessment-type');
        const form = document.getElementById('assessment-form');
        const questionsContainer = document.getElementById('questions-container');
        
        console.log('📋 Modal elements check:');
        console.log('  - Modal:', modal ? '✅ Found' : '❌ Not found');
        console.log('  - Modal Title:', modalTitle ? '✅ Found' : '❌ Not found');
        console.log('  - Assessment Type:', assessmentType ? '✅ Found' : '❌ Not found');
        console.log('  - Form:', form ? '✅ Found' : '❌ Not found');
        console.log('  - Questions Container:', questionsContainer ? '✅ Found' : '❌ Not found');
        
        if (!modal || !modalTitle || !assessmentType || !form || !questionsContainer) {
            console.error('❌ Modal elements not found! Cannot open modal.');
            alert('Error: Modal elements not found. Please refresh the page.');
            return;
        }
        
        // Set modal properties
        modal.classList.add('active');
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        
        modalTitle.textContent = titles[type] || 'Create Assessment';
        assessmentType.value = type;
        form.reset();
        questionsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin: 0;">No questions added yet. Click "Add Question" to start.</p>';
        
        console.log('✅ Modal opened successfully for:', type);
        console.log('📊 Modal display:', modal.style.display);
        console.log('📊 Modal classes:', modal.className);
    }

    closeAssessmentModal() {
        const modal = document.getElementById('assessment-modal');
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.getElementById('assessment-form').reset();
        this.currentEditAssessmentId = null;
        this.currentEditAssessmentType = null;
        this.tempQuestions = [];
    }

    updateAssessmentSubjects() {
        const classLevel = document.getElementById('assessment-class').value;
        const subjectSelect = document.getElementById('assessment-subject');
        
        // Clear current options except the first one
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        
        if (!classLevel) return;
        
        // Get stored subjects from localStorage
        const storedSubjects = this.loadFromStorage('subjects') || [];
        
        // Filter subjects by class level
        const filteredSubjects = storedSubjects.filter(subject => {
            // Check if subject is available for the selected class
            if (Array.isArray(subject.classes)) {
                return subject.classes.includes(classLevel);
            }
            return false;
        });
        
        // If no stored subjects found, use default subjects
        if (filteredSubjects.length === 0) {
            const defaultSubjects = {
                'SS1': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
                'SS2': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
                'SS3': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
                'JAMB': ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce']
            };
            
            const subjects = defaultSubjects[classLevel] || [];
            subjects.forEach(subjectName => {
                const option = document.createElement('option');
                option.value = subjectName;
                option.textContent = subjectName;
                subjectSelect.appendChild(option);
            });
        } else {
            // Use stored subjects
            filteredSubjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.name;
                option.textContent = subject.name;
                subjectSelect.appendChild(option);
            });
        }
    }

    addQuestion() {
        const modal = document.getElementById('question-modal');
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.getElementById('question-form').reset();
    }

    closeQuestionModal() {
        const modal = document.getElementById('question-modal');
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.getElementById('question-form').reset();
    }

    saveQuestion(event) {
        event.preventDefault();

        const question = {
            id: Date.now(),
            text: document.getElementById('question-text').value,
            options: {
                A: document.getElementById('option-a').value,
                B: document.getElementById('option-b').value,
                C: document.getElementById('option-c').value,
                D: document.getElementById('option-d').value
            },
            correctAnswer: document.querySelector('input[name="correct-answer"]:checked').value,
            marks: parseInt(document.getElementById('question-marks').value)
        };

        this.tempQuestions.push(question);
        this.renderQuestionsPreview();
        this.closeQuestionModal();
        this.showToast('Question added successfully!', 'success');
    }

    renderQuestionsPreview() {
        const container = document.getElementById('questions-container');
        
        if (this.tempQuestions.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin: 0;">No questions added yet. Click "Add Question" to start.</p>';
            return;
        }

        container.innerHTML = this.tempQuestions.map((q, index) => `
            <div style="background: var(--gray-50); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <strong style="color: var(--text-primary);">Q${index + 1}:</strong>
                    <button type="button" onclick="window.adminDashboard.removeQuestion(${index})" style="background: var(--danger-color); color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p style="margin: 0 0 0.5rem 0; color: var(--text-primary);">${q.text}</p>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">
                    <div>A: ${q.options.A} ${q.correctAnswer === 'A' ? '✓' : ''}</div>
                    <div>B: ${q.options.B} ${q.correctAnswer === 'B' ? '✓' : ''}</div>
                    <div>C: ${q.options.C} ${q.correctAnswer === 'C' ? '✓' : ''}</div>
                    <div>D: ${q.options.D} ${q.correctAnswer === 'D' ? '✓' : ''}</div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-secondary);">
                    Marks: ${q.marks}
                </div>
            </div>
        `).join('');
    }

    removeQuestion(index) {
        this.tempQuestions.splice(index, 1);
        this.renderQuestionsPreview();
        this.showToast('Question removed', 'info');
    }

    saveAssessment(event) {
        event.preventDefault();
        console.log('Saving assessment...');

        if (this.tempQuestions.length === 0) {
            this.showToast('Please add at least one question', 'error');
            return;
        }

        const type = document.getElementById('assessment-type').value;
        console.log('Assessment type:', type);
        
        const assessmentData = {
            title: document.getElementById('assessment-title').value,
            description: document.getElementById('assessment-description').value,
            classLevel: document.getElementById('assessment-class').value,
            subject: document.getElementById('assessment-subject').value,
            duration: parseInt(document.getElementById('assessment-duration').value),
            totalMarks: parseInt(document.getElementById('assessment-marks').value),
            questions: [...this.tempQuestions]
        };

        console.log('Assessment data:', assessmentData);

        if (this.currentEditAssessmentId && this.currentEditAssessmentType === type) {
            this.updateAssessment(type, this.currentEditAssessmentId, assessmentData);
        } else {
            this.addAssessment(type, assessmentData);
        }

        this.closeAssessmentModal();
    }

    addAssessment(type, data) {
        console.log('Adding assessment of type:', type);
        const assessment = {
            id: Date.now(),
            ...data,
            createdAt: new Date().toISOString()
        };

        console.log('Created assessment object:', assessment);

        if (type === 'quiz') {
            this.quizzes.push(assessment);
            this.saveToStorage('quizzes', this.quizzes);
            this.renderQuizzes();
            console.log('Quiz added. Total quizzes:', this.quizzes.length);
        } else if (type === 'assignment') {
            this.assignments.push(assessment);
            this.saveToStorage('assignments', this.assignments);
            this.renderAssignments();
            console.log('Assignment added. Total assignments:', this.assignments.length);
        } else if (type === 'exam') {
            this.exams.push(assessment);
            this.saveToStorage('exams', this.exams);
            this.renderExams();
            console.log('Exam added. Total exams:', this.exams.length);
        } else {
            console.error('Unknown assessment type:', type);
        }

        this.updateAssessmentCounts();
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`, 'success');
    }

    updateAssessment(type, id, data) {
        let array, storageKey;
        
        if (type === 'quiz') {
            array = this.quizzes;
            storageKey = 'quizzes';
        } else if (type === 'assignment') {
            array = this.assignments;
            storageKey = 'assignments';
        } else {
            array = this.exams;
            storageKey = 'exams';
        }

        const index = array.findIndex(a => a.id === id);
        if (index !== -1) {
            array[index] = { ...array[index], ...data, updatedAt: new Date().toISOString() };
            this.saveToStorage(storageKey, array);
            
            if (type === 'quiz') this.renderQuizzes();
            else if (type === 'assignment') this.renderAssignments();
            else this.renderExams();
            
            this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`, 'success');
        }
    }

    deleteAssessment(type, id) {
        let assessment, array, storageKey, renderFunc;
        
        if (type === 'quiz') {
            assessment = this.quizzes.find(q => q.id === id);
            array = this.quizzes;
            storageKey = 'quizzes';
            renderFunc = () => this.renderQuizzes();
        } else if (type === 'assignment') {
            assessment = this.assignments.find(a => a.id === id);
            array = this.assignments;
            storageKey = 'assignments';
            renderFunc = () => this.renderAssignments();
        } else {
            assessment = this.exams.find(e => e.id === id);
            array = this.exams;
            storageKey = 'exams';
            renderFunc = () => this.renderExams();
        }

        if (!assessment) return;

        this.showConfirmDialog(
            `Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            `Are you sure you want to delete "${assessment.title}"? This action cannot be undone.`,
            () => {
                const filtered = array.filter(a => a.id !== id);
                if (type === 'quiz') this.quizzes = filtered;
                else if (type === 'assignment') this.assignments = filtered;
                else this.exams = filtered;
                
                this.saveToStorage(storageKey, filtered);
                renderFunc();
                this.updateAssessmentCounts();
                this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`, 'success');
            }
        );
    }

    viewAssessment(type, id) {
        let assessment;
        if (type === 'quiz') assessment = this.quizzes.find(q => q.id === id);
        else if (type === 'assignment') assessment = this.assignments.find(a => a.id === id);
        else assessment = this.exams.find(e => e.id === id);

        if (!assessment) {
            this.showToast('Assessment not found', 'error');
            return;
        }

        this.openViewAssessmentModal(assessment, type);
    }

    openViewAssessmentModal(assessment, type) {
        const modal = document.getElementById('view-assessment-modal');
        const title = document.getElementById('view-assessment-title');
        const content = document.getElementById('view-assessment-content');

        if (!modal || !title || !content) return;

        const typeNames = {
            quiz: 'Quiz',
            assignment: 'Assignment',
            exam: 'Mock Exam'
        };

        title.textContent = assessment.title;

        // Build the content HTML
        let html = `
            <div style="background: var(--gray-50); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Type</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;">${typeNames[type]}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Class Level</strong>
                        <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">${assessment.classLevel}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Stream</strong>
                        ${assessment.stream ? `<span style="background: var(--secondary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">${assessment.stream}</span>` : '<span style="color: var(--text-secondary); font-size: 0.875rem;">Not specified</span>'}
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Subject</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;">${assessment.subject}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Duration</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-clock"></i> ${assessment.duration} minutes</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Total Marks</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-star"></i> ${assessment.totalMarks} marks</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Questions</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-question-circle"></i> ${assessment.questions.length} questions</span>
                    </div>
                </div>
                ${this.renderDueDateInfoForModal(assessment)}
                ${assessment.description ? `
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Description</strong>
                        <p style="color: var(--text-primary); margin: 0; line-height: 1.5;">${assessment.description}</p>
                    </div>
                ` : ''}
            </div>

            <div>
                <h4 style="color: var(--text-primary); margin: 0 0 1rem 0; font-size: 1.125rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.5rem;">
                    <i class="fas fa-list"></i> Questions
                </h4>
                ${assessment.questions.map((q, index) => `
                    <div style="background: var(--white); border: 2px solid var(--border-color); border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                            <strong style="color: var(--primary-color); font-size: 1rem;">Question ${index + 1}</strong>
                            <span style="background: var(--success-color); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}
                            </span>
                        </div>
                        <p style="color: var(--text-primary); margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.6;">${q.text}</p>
                        <div style="display: grid; gap: 0.5rem;">
                            ${['A', 'B', 'C', 'D'].map(option => `
                                <div style="display: flex; align-items: center; padding: 0.75rem; border-radius: 6px; ${q.correctAnswer === option ? 'background: linear-gradient(135deg, #10b981, #059669); color: white;' : 'background: var(--gray-50); color: var(--text-primary);'}">
                                    <span style="font-weight: 600; margin-right: 0.75rem; ${q.correctAnswer === option ? 'color: white;' : 'color: var(--primary-color);'}">${option}.</span>
                                    <span style="flex: 1;">${q.options[option]}</span>
                                    ${q.correctAnswer === option ? '<i class="fas fa-check-circle" style="margin-left: 0.5rem;"></i>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        content.innerHTML = html;
        modal.classList.add('active');
        modal.style.display = 'flex';
    }

    closeViewAssessmentModal() {
        const modal = document.getElementById('view-assessment-modal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    editAssessment(type, id) {
        let assessment;
        if (type === 'quiz') assessment = this.quizzes.find(q => q.id === id);
        else if (type === 'assignment') assessment = this.assignments.find(a => a.id === id);
        else assessment = this.exams.find(e => e.id === id);

        if (!assessment) {
            this.showToast('Assessment not found', 'error');
            return;
        }

        // Set editing mode
        this.currentEditAssessmentId = id;
        this.currentEditAssessmentType = type;
        this.tempQuestions = [...assessment.questions];

        const titles = {
            quiz: 'Edit Quiz',
            assignment: 'Edit Assignment',
            exam: 'Edit Mock Exam'
        };

        // Open modal
        const modal = document.getElementById('assessment-modal');
        const modalTitle = document.getElementById('assessment-modal-title');
        const assessmentType = document.getElementById('assessment-type');
        
        if (!modal || !modalTitle || !assessmentType) {
            console.error('Modal elements not found');
            return;
        }

        modal.classList.add('active');
        modal.style.display = 'flex';
        modalTitle.textContent = titles[type] || 'Edit Assessment';
        assessmentType.value = type;

        // Populate form fields
        document.getElementById('assessment-title').value = assessment.title || '';
        document.getElementById('assessment-description').value = assessment.description || '';
        document.getElementById('assessment-class').value = assessment.classLevel || '';
        document.getElementById('assessment-subject').value = assessment.subject || '';
        document.getElementById('assessment-duration').value = assessment.duration || '';
        document.getElementById('assessment-marks').value = assessment.totalMarks || '';

        // Render questions
        this.renderQuestionsPreview();
    }

    renderQuizzes() {
        const grid = document.getElementById('quizzes-grid');
        if (!grid) return;

        if (this.quizzes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-clipboard-list" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No quizzes yet</h3>
                    <p style="margin: 0;">Click "Create Quiz" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.quizzes.map(quiz => this.createAssessmentCard(quiz, 'quiz')).join('');
    }

    renderAssignments() {
        const grid = document.getElementById('assignments-grid');
        if (!grid) return;

        if (this.assignments.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-tasks" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No assignments yet</h3>
                    <p style="margin: 0;">Click "Create Assignment" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.assignments.map(assignment => this.createAssessmentCard(assignment, 'assignment')).join('');
    }

    renderExams() {
        const grid = document.getElementById('exams-grid');
        if (!grid) return;

        if (this.exams.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-file-alt" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No mock exams yet</h3>
                    <p style="margin: 0;">Click "Create Mock Exam" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.exams.map(exam => this.createAssessmentCard(exam, 'exam')).join('');
    }

    createAssessmentCard(assessment, type) {
        const icons = {
            quiz: { icon: 'clipboard-list', color: '#3b82f6' },
            assignment: { icon: 'tasks', color: '#f59e0b' },
            exam: { icon: 'file-alt', color: '#8b5cf6' }
        };

        const { icon, color } = icons[type];

        return `
            <div class="assessment-card" data-id="${assessment.id}" data-class="${assessment.classLevel}" data-stream="${assessment.stream || ''}" data-subject="${assessment.subject}" style="background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.2s ease;">
                <div style="padding: 1rem; background: var(--gray-50); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, ${color}, ${color}dd); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div style="flex: 1; font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">${assessment.title}</div>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                        <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;">${assessment.classLevel}</span>
                        ${assessment.stream ? `<span style="background: var(--secondary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;">${assessment.stream}</span>` : ''}
                        <span style="background: var(--gray-100); color: var(--gray-700); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;">${assessment.subject}</span>
                        <span style="background: var(--gray-100); color: var(--gray-700); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;">${assessment.questions.length} Questions</span>
                    </div>
                    ${assessment.description ? `<div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.75rem; line-height: 1.5;">${assessment.description}</div>` : ''}
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem; font-size: 0.875rem; color: var(--text-secondary);">
                        <div><i class="fas fa-clock"></i> ${assessment.duration} min</div>
                        <div><i class="fas fa-star"></i> ${assessment.totalMarks} marks</div>
                    </div>
                    ${this.renderDueDateInfo(assessment)}
                    <div style="display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                        <button onclick="window.adminDashboard.viewAssessment('${type}', ${assessment.id})" style="flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--success-color); color: white; border: none; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button onclick="window.adminDashboard.editAssessment('${type}', ${assessment.id})" style="flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--warning-color); color: white; border: none; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="window.adminDashboard.deleteAssessment('${type}', ${assessment.id})" style="flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--danger-color); color: white; border: none; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderDueDateInfo(assessment) {
        // Handle assessments that might not have due date (backward compatibility)
        if (!assessment.dueDate || !assessment.dueTime) {
            return '<div style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.75rem;"><i class="fas fa-calendar-times"></i> No due date set</div>';
        }

        const dueDateTime = new Date(`${assessment.dueDate}T${assessment.dueTime}`);
        const currentDateTime = new Date();
        const isOverdue = dueDateTime < currentDateTime;
        const timeDiff = dueDateTime.getTime() - currentDateTime.getTime();
        
        // Format the due date and time
        const dueDateFormatted = new Date(assessment.dueDate).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const dueTimeFormatted = assessment.dueTime;
        
        // Calculate time remaining or overdue
        let timeStatus = '';
        let statusColor = 'var(--text-secondary)';
        
        if (isOverdue) {
            const overdueDays = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
            const overdueHours = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (overdueDays > 0) {
                timeStatus = `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
            } else if (overdueHours > 0) {
                timeStatus = `Overdue by ${overdueHours} hour${overdueHours > 1 ? 's' : ''}`;
            } else {
                timeStatus = 'Overdue';
            }
            statusColor = 'var(--danger-color)';
        } else {
            const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (remainingDays > 0) {
                timeStatus = `${remainingDays} day${remainingDays > 1 ? 's' : ''} remaining`;
                statusColor = remainingDays <= 1 ? 'var(--warning-color)' : 'var(--success-color)';
            } else if (remainingHours > 0) {
                timeStatus = `${remainingHours} hour${remainingHours > 1 ? 's' : ''} remaining`;
                statusColor = 'var(--warning-color)';
            } else {
                timeStatus = 'Due soon';
                statusColor = 'var(--danger-color)';
            }
        }

        return `
            <div style="background: var(--gray-50); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.75rem; border-left: 4px solid ${statusColor};">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <i class="fas fa-calendar-alt" style="color: ${statusColor};"></i>
                    <span style="font-weight: 600; color: var(--text-primary); font-size: 0.875rem;">Due: ${dueDateFormatted} at ${dueTimeFormatted}</span>
                </div>
                <div style="font-size: 0.75rem; color: ${statusColor}; font-weight: 600;">
                    <i class="fas fa-clock"></i> ${timeStatus}
                </div>
            </div>
        `;
    }

    renderDueDateInfoForModal(assessment) {
        // Handle assessments that might not have due date (backward compatibility)
        if (!assessment.dueDate || !assessment.dueTime) {
            return `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--gray-100); border-radius: 8px; border-left: 4px solid var(--gray-400);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-calendar-times" style="color: var(--gray-500);"></i>
                        <span style="font-weight: 600; color: var(--gray-700);">No due date set</span>
                    </div>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--gray-600);">This assessment has no submission deadline.</p>
                </div>
            `;
        }

        const dueDateTime = new Date(`${assessment.dueDate}T${assessment.dueTime}`);
        const currentDateTime = new Date();
        const isOverdue = dueDateTime < currentDateTime;
        const timeDiff = dueDateTime.getTime() - currentDateTime.getTime();
        
        // Format the due date and time
        const dueDateFormatted = new Date(assessment.dueDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const dueTimeFormatted = new Date(`${assessment.dueDate}T${assessment.dueTime}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        // Calculate time remaining or overdue
        let timeStatus = '';
        let statusColor = 'var(--text-secondary)';
        let statusIcon = 'fas fa-clock';
        
        if (isOverdue) {
            const overdueDays = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
            const overdueHours = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (overdueDays > 0) {
                timeStatus = `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
            } else if (overdueHours > 0) {
                timeStatus = `Overdue by ${overdueHours} hour${overdueHours > 1 ? 's' : ''}`;
            } else {
                timeStatus = 'Overdue';
            }
            statusColor = 'var(--danger-color)';
            statusIcon = 'fas fa-exclamation-triangle';
        } else {
            const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (remainingDays > 0) {
                timeStatus = `${remainingDays} day${remainingDays > 1 ? 's' : ''} remaining`;
                statusColor = remainingDays <= 1 ? 'var(--warning-color)' : 'var(--success-color)';
                statusIcon = remainingDays <= 1 ? 'fas fa-clock' : 'fas fa-check-circle';
            } else if (remainingHours > 0) {
                timeStatus = `${remainingHours} hour${remainingHours > 1 ? 's' : ''} remaining`;
                statusColor = 'var(--warning-color)';
                statusIcon = 'fas fa-clock';
            } else {
                timeStatus = 'Due very soon!';
                statusColor = 'var(--danger-color)';
                statusIcon = 'fas fa-exclamation-triangle';
            }
        }

        return `
            <div style="margin-top: 1rem; padding: 1.5rem; background: var(--white); border: 2px solid ${statusColor}; border-radius: 12px;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: ${statusColor}; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="${statusIcon}" style="font-size: 1.25rem;"></i>
                    </div>
                    <div>
                        <h4 style="margin: 0; color: var(--text-primary); font-size: 1.125rem;">Submission Deadline</h4>
                        <p style="margin: 0; color: ${statusColor}; font-weight: 600; font-size: 0.875rem;">${timeStatus}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Due Date</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-calendar-alt"></i> ${dueDateFormatted}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Due Time</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-clock"></i> ${dueTimeFormatted}</span>
                    </div>
                </div>
            </div>
        `;
    }

    filterQuizzes() {
        const searchTerm = document.getElementById('quiz-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('quiz-class-filter')?.value || '';
        const streamFilter = document.getElementById('quiz-stream-filter')?.value || '';
        const subjectFilter = document.getElementById('quiz-subject-filter')?.value || '';

        const cards = document.querySelectorAll('#quizzes-grid .assessment-card');
        this.applyAssessmentFilter(cards, searchTerm, classFilter, streamFilter, subjectFilter);
    }

    filterAssignments() {
        const searchTerm = document.getElementById('assignment-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('assignment-class-filter')?.value || '';
        const streamFilter = document.getElementById('assignment-stream-filter')?.value || '';
        const subjectFilter = document.getElementById('assignment-subject-filter')?.value || '';

        const cards = document.querySelectorAll('#assignments-grid .assessment-card');
        this.applyAssessmentFilter(cards, searchTerm, classFilter, streamFilter, subjectFilter);
    }

    filterExams() {
        const searchTerm = document.getElementById('exam-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('exam-class-filter')?.value || '';
        const streamFilter = document.getElementById('exam-stream-filter')?.value || '';
        const subjectFilter = document.getElementById('exam-subject-filter')?.value || '';

        const cards = document.querySelectorAll('#exams-grid .assessment-card');
        this.applyAssessmentFilter(cards, searchTerm, classFilter, streamFilter, subjectFilter);
    }

    applyAssessmentFilter(cards, searchTerm, classFilter, streamFilter, subjectFilter) {
        cards.forEach(card => {
            const title = card.querySelector('[style*="font-weight: 700"]')?.textContent.toLowerCase() || '';
            const cardClass = card.dataset.class;
            const cardStream = card.dataset.stream;
            const cardSubject = card.dataset.subject;

            const matchesSearch = title.includes(searchTerm);
            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesStream = !streamFilter || cardStream === streamFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;

            card.style.display = (matchesSearch && matchesClass && matchesStream && matchesSubject) ? 'block' : 'none';
        });
    }

    // ========== LIVE CLASS MANAGEMENT ==========
    
    initializeLiveClassManagement() {
        this.liveClasses = this.loadFromStorage('liveClasses') || [];
        this.currentEditLiveClassId = null;
        
        this.renderLiveClasses();
        this.updateLiveClassCounts();
        this.setupLiveClassFilters();
        this.populateLiveClassSubjectFilters();
    }

    updateLiveClassCounts() {
        const now = new Date();
        const upcoming = this.liveClasses.filter(lc => new Date(lc.dateTime) > now).length;
        const completed = this.liveClasses.filter(lc => new Date(lc.dateTime) <= now).length;
        
        document.getElementById('live-classes-count').textContent = this.liveClasses.length;
        document.getElementById('upcoming-classes-count').textContent = upcoming;
        document.getElementById('completed-classes-count').textContent = completed;
    }

    setupLiveClassFilters() {
        document.getElementById('liveclass-search')?.addEventListener('input', () => this.filterLiveClasses());
        document.getElementById('liveclass-class-filter')?.addEventListener('change', () => this.filterLiveClasses());
        document.getElementById('liveclass-subject-filter')?.addEventListener('change', () => this.filterLiveClasses());
        document.getElementById('liveclass-status-filter')?.addEventListener('change', () => this.filterLiveClasses());
    }

    populateLiveClassSubjectFilters() {
        const subjects = [
            'Mathematics', 'English Language', 'Citizenship and Heritage Studies',
            'Physics', 'Chemistry', 'Biology', 'Economics',
            'Literature-in-English', 'Government', 'CRS',
            'Commerce', 'Accounts'
        ];

        const select = document.getElementById('liveclass-subject-filter');
        if (select) {
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                select.appendChild(option);
            });
        }
    }

    openLiveClassModal() {
        this.currentEditLiveClassId = null;
        document.getElementById('liveclass-modal').classList.add('active');
        document.getElementById('liveclass-modal-title').textContent = 'Schedule Live Class';
        document.getElementById('liveclass-form').reset();
    }

    closeLiveClassModal() {
        document.getElementById('liveclass-modal').classList.remove('active');
        document.getElementById('liveclass-form').reset();
        this.currentEditLiveClassId = null;
    }

    updateLiveClassSubjects() {
        const classLevel = document.getElementById('liveclass-class').value;
        const subjectSelect = document.getElementById('liveclass-subject');
        
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        
        if (!classLevel) return;
        
        const allSubjects = {
            'SS1': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
            'SS2': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
            'SS3': ['Mathematics', 'English Language', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce', 'Accounts'],
            'JAMB': ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Literature-in-English', 'Government', 'CRS', 'Commerce']
        };
        
        const subjects = allSubjects[classLevel] || [];
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }

    saveLiveClass(event) {
        event.preventDefault();

        const classData = {
            title: document.getElementById('liveclass-title').value,
            description: document.getElementById('liveclass-description').value,
            classLevel: document.getElementById('liveclass-class').value,
            subject: document.getElementById('liveclass-subject').value,
            date: document.getElementById('liveclass-date').value,
            time: document.getElementById('liveclass-time').value,
            dateTime: `${document.getElementById('liveclass-date').value}T${document.getElementById('liveclass-time').value}`,
            duration: parseInt(document.getElementById('liveclass-duration').value),
            link: document.getElementById('liveclass-link').value
        };

        if (this.currentEditLiveClassId) {
            this.updateLiveClass(this.currentEditLiveClassId, classData);
        } else {
            this.addLiveClass(classData);
        }

        this.closeLiveClassModal();
    }

    addLiveClass(classData) {
        const liveClass = {
            id: Date.now(),
            ...classData,
            createdAt: new Date().toISOString()
        };

        this.liveClasses.push(liveClass);
        this.saveToStorage('liveClasses', this.liveClasses);
        this.renderLiveClasses();
        this.updateLiveClassCounts();
        this.showToast('Live class scheduled successfully!', 'success');
    }

    updateLiveClass(id, classData) {
        const index = this.liveClasses.findIndex(lc => lc.id === id);
        if (index !== -1) {
            this.liveClasses[index] = { ...this.liveClasses[index], ...classData, updatedAt: new Date().toISOString() };
            this.saveToStorage('liveClasses', this.liveClasses);
            this.renderLiveClasses();
            this.showToast('Live class updated successfully!', 'success');
        }
    }

    deleteLiveClass(id) {
        const liveClass = this.liveClasses.find(lc => lc.id === id);
        if (!liveClass) return;

        this.showConfirmDialog(
            'Delete Live Class',
            `Are you sure you want to delete \"${liveClass.title}\"?`,
            () => {
                this.liveClasses = this.liveClasses.filter(lc => lc.id !== id);
                this.saveToStorage('liveClasses', this.liveClasses);
                this.renderLiveClasses();
                this.updateLiveClassCounts();
                this.showToast('Live class deleted successfully!', 'success');
            }
        );
    }

    editLiveClass(id) {
        const liveClass = this.liveClasses.find(lc => lc.id === id);
        if (!liveClass) return;

        this.currentEditLiveClassId = id;
        document.getElementById('liveclass-modal').classList.add('active');
        document.getElementById('liveclass-modal-title').textContent = 'Edit Live Class';
        document.getElementById('liveclass-title').value = liveClass.title;
        document.getElementById('liveclass-description').value = liveClass.description || '';
        document.getElementById('liveclass-class').value = liveClass.classLevel;
        this.updateLiveClassSubjects();
        document.getElementById('liveclass-subject').value = liveClass.subject;
        document.getElementById('liveclass-date').value = liveClass.date;
        document.getElementById('liveclass-time').value = liveClass.time;
        document.getElementById('liveclass-duration').value = liveClass.duration;
        document.getElementById('liveclass-link').value = liveClass.link;
    }

    joinLiveClass(id) {
        const liveClass = this.liveClasses.find(lc => lc.id === id);
        if (liveClass && liveClass.link) {
            window.open(liveClass.link, '_blank');
        } else {
            this.showToast('Meeting link not available', 'error');
        }
    }

    renderLiveClasses() {
        const grid = document.getElementById('live-classes-grid');
        if (!grid) return;

        if (this.liveClasses.length === 0) {
            grid.innerHTML = `
                <div class=\"empty-state\" style=\"grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);\">
                    <i class=\"fas fa-video\" style=\"font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);\"></i>
                    <h3 style=\"margin: 0 0 0.5rem 0;\">No live classes scheduled</h3>
                    <p style=\"margin: 0;\">Click \"Schedule Live Class\" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.liveClasses.map(lc => this.createLiveClassCard(lc)).join('');
    }

    createLiveClassCard(liveClass) {
        const now = new Date();
        const classDateTime = new Date(liveClass.dateTime);
        const isUpcoming = classDateTime > now;
        const statusColor = isUpcoming ? '#10b981' : '#6b7280';
        const statusText = isUpcoming ? 'Upcoming' : 'Completed';

        const dateObj = new Date(liveClass.dateTime);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return `
            <div class=\"liveclass-card\" data-id=\"${liveClass.id}\" data-class=\"${liveClass.classLevel}\" data-subject=\"${liveClass.subject}\" data-status=\"${isUpcoming ? 'upcoming' : 'completed'}\" style=\"background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.2s ease;\">
                <div style=\"padding: 1rem; background: var(--gray-50); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;\">
                    <div style=\"width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, #ef4444, #dc2626); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;\">
                        <i class=\"fas fa-video\"></i>
                    </div>
                    <div style=\"flex: 1;\">
                        <div style=\"font-weight: 700; color: var(--text-primary); font-size: 1.1rem;\">${liveClass.title}</div>
                        <div style=\"font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;\">
                            <i class=\"fas fa-calendar\"></i> ${formattedDate} at ${formattedTime}
                        </div>
                    </div>
                    <span style=\"background: ${statusColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;\">${statusText}</span>
                </div>
                <div style=\"padding: 1rem;\">
                    <div style=\"display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;\">
                        <span style=\"background: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;\">${liveClass.classLevel}</span>
                        <span style=\"background: var(--gray-100); color: var(--gray-700); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;\">${liveClass.subject}</span>
                        <span style=\"background: var(--gray-100); color: var(--gray-700); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;\">${liveClass.duration} min</span>
                    </div>
                    ${liveClass.description ? `<div style=\"color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.75rem; line-height: 1.5;\">${liveClass.description}</div>` : ''}
                    <div style=\"display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);\">
                        ${isUpcoming ? `
                            <button onclick=\"window.adminDashboard.joinLiveClass(${liveClass.id})\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--success-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                                <i class=\"fas fa-play\"></i> Join
                            </button>
                        ` : ''}
                        <button onclick=\"window.adminDashboard.editLiveClass(${liveClass.id})\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--warning-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                            <i class=\"fas fa-edit\"></i> Edit
                        </button>
                        <button onclick=\"window.adminDashboard.deleteLiveClass(${liveClass.id})\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--danger-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                            <i class=\"fas fa-trash\"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    filterLiveClasses() {
        const searchTerm = document.getElementById('liveclass-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('liveclass-class-filter')?.value || '';
        const subjectFilter = document.getElementById('liveclass-subject-filter')?.value || '';
        const statusFilter = document.getElementById('liveclass-status-filter')?.value || '';

        const cards = document.querySelectorAll('#live-classes-grid .liveclass-card');

        cards.forEach(card => {
            const title = card.querySelector('[style*=\"font-weight: 700\"]')?.textContent.toLowerCase() || '';
            const cardClass = card.dataset.class;
            const cardSubject = card.dataset.subject;
            const cardStatus = card.dataset.status;

            const matchesSearch = title.includes(searchTerm);
            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;
            const matchesStatus = !statusFilter || cardStatus === statusFilter;

            card.style.display = (matchesSearch && matchesClass && matchesSubject && matchesStatus) ? 'block' : 'none';
        });
    }

    // ========== REPORTS & ANALYTICS ==========
    
    initializeReportsAnalytics() {
        this.reports = this.loadFromStorage('reports') || [];
        this.studentScores = this.loadFromStorage('studentScores') || [];
        
        this.initializeSpreadsheet();
        this.generateReports();
        this.setupReportFilters();
        this.populateReportSubjectFilters();
    }

    // ========== STUDENT SCORES SPREADSHEET ==========
    
    initializeSpreadsheet() {
        // Generate sample data if empty
        if (this.studentScores.length === 0) {
            this.generateSampleStudentData();
        }
        
        this.updateSpreadsheetHeaders();
        this.renderSpreadsheet();
        this.setupSpreadsheetFilters();
        this.populateSpreadsheetSubjectFilter();
        this.renderLeaderboard();
        this.renderBadges();
    }

    generateSampleStudentData() {
        // Mock data generation disabled - use real data from Firebase
        this.studentScores = [];
        this.saveToStorage('studentScores', this.studentScores);
    }

    setupSpreadsheetFilters() {
        document.getElementById('spreadsheet-search')?.addEventListener('input', () => this.filterSpreadsheet());
        document.getElementById('spreadsheet-class-filter')?.addEventListener('change', () => {
            this.updateSpreadsheetHeaders();
            this.renderSpreadsheet();
            this.filterSpreadsheet();
        });
        document.getElementById('spreadsheet-stream-filter')?.addEventListener('change', () => {
            this.updateSpreadsheetHeaders();
            this.renderSpreadsheet();
            this.filterSpreadsheet();
        });
        document.getElementById('spreadsheet-subject-filter')?.addEventListener('change', () => this.filterSpreadsheet());
    }

    getCurrentSubjects() {
        const classFilter = document.getElementById('spreadsheet-class-filter')?.value || '';
        const streamFilter = document.getElementById('spreadsheet-stream-filter')?.value || '';
        
        // If no filters, return default subjects
        if (!classFilter && !streamFilter) {
            return ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics'];
        }
        
        // Use the same function as reports
        return this.getSubjectsByStreamAndClass(streamFilter, classFilter);
    }

    updateSpreadsheetHeaders() {
        const headerRow = document.getElementById('spreadsheet-header-row');
        if (!headerRow) return;

        const subjects = this.getCurrentSubjects();
        
        // Clear existing headers and rebuild
        headerRow.innerHTML = `
            <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap;">Student Name</th>
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap;">Class</th>
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap;">Stream</th>
        `;
        
        // Add subject headers
        subjects.forEach(subject => {
            headerRow.innerHTML += `
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap;">${subject}</th>
            `;
        });
        
        // Add remaining headers
        headerRow.innerHTML += `
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap;">Attendance</th>
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap; background: var(--primary-color); color: white;">Average</th>
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap; background: var(--success-color); color: white;">Grade</th>
            <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid var(--border-color); font-weight: 600; white-space: nowrap; width: 100px;">Actions</th>
        `;
    }

    populateSpreadsheetSubjectFilter() {
        const subjects = this.getCurrentSubjects();

        const select = document.getElementById('spreadsheet-subject-filter');
        if (select) {
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                select.appendChild(option);
            });
        }
    }

    addStudentRow() {
        const name = prompt('Enter student name:');
        if (!name) return;

        const classLevel = prompt('Enter class level (SS1/SS2/SS3/JAMB):', 'SS1');
        if (!classLevel) return;

        const stream = prompt('Enter stream (Science/Humanities/Business):', 'Science');
        if (!stream) return;

        const student = {
            id: Date.now(),
            name: name,
            classLevel: classLevel,
            stream: stream,
            scores: {
                Mathematics: 0,
                'English Language': 0,
                Physics: 0,
                Chemistry: 0,
                Biology: 0,
                Economics: 0
            },
            attendance: 0,
            manualGrade: null,
            customBadge: '',
            performanceBadge: '',
            attendanceBadge: '',
            subjectBadge: '',
            totalBadges: 0
        };

        this.studentScores.push(student);
        this.saveToStorage('studentScores', this.studentScores);
        this.renderSpreadsheet();
        this.showToast('Student added successfully!', 'success');
    }

    deleteStudentRow(id) {
        const student = this.studentScores.find(s => s.id === id);
        if (!student) return;

        if (confirm(`Delete ${student.name}?`)) {
            this.studentScores = this.studentScores.filter(s => s.id !== id);
            this.saveToStorage('studentScores', this.studentScores);
            this.renderSpreadsheet();
            this.showToast('Student deleted successfully!', 'success');
        }
    }

    updateScore(studentId, subject, value) {
        const student = this.studentScores.find(s => s.id === studentId);
        if (!student) return;

        const score = parseInt(value);
        if (isNaN(score) || score < 0 || score > 100) {
            this.showToast('Invalid score. Enter 0-100', 'error');
            this.renderSpreadsheet();
            return;
        }

        student.scores[subject] = score;
        this.saveToStorage('studentScores', this.studentScores);
        this.renderSpreadsheet();
        this.renderLeaderboard();
        this.renderBadges();
    }

    updateGrade(id, value) {
        const student = this.studentScores.find(s => s.id === id);
        if (!student) return;

        // If 'Auto' is selected, set to null for auto-calculation
        student.manualGrade = value === 'Auto' ? null : value;
        this.saveToStorage('studentScores', this.studentScores);
        this.renderSpreadsheet();
        this.renderLeaderboard();
        this.renderBadges();
        this.showToast(`Grade updated to ${value === 'Auto' ? 'Auto-Calculate' : value}!`, 'success');
    }

    updateAttendance(studentId, value) {
        const student = this.studentScores.find(s => s.id === studentId);
        if (!student) return;

        const attendance = parseInt(value);
        if (isNaN(attendance) || attendance < 0 || attendance > 100) {
            this.showToast('Invalid attendance. Enter 0-100', 'error');
            this.renderSpreadsheet();
            return;
        }

        student.attendance = attendance;
        this.saveToStorage('studentScores', this.studentScores);
        this.renderSpreadsheet();
        this.renderLeaderboard();
        this.renderBadges();
    }

    updateStudentField(studentId, field, value) {
        const student = this.studentScores.find(s => s.id === studentId);
        if (!student) return;

        if (field === 'name' && !value.trim()) {
            this.showToast('Name cannot be empty', 'error');
            this.renderSpreadsheet();
            this.renderLeaderboard();
            this.renderBadges();
            return;
        }

        student[field] = value;
        this.saveToStorage('studentScores', this.studentScores);
        this.renderSpreadsheet();
        this.renderLeaderboard();
        this.renderBadges();
        this.showToast('Student updated successfully!', 'success');
    }

    calculateAverage(scores) {
        const values = Object.values(scores);
        const sum = values.reduce((a, b) => a + b, 0);
        return Math.round(sum / values.length);
    }

    calculateGrade(average) {
        if (average >= 90) return { grade: 'A', color: '#10b981' };
        if (average >= 80) return { grade: 'B', color: '#3b82f6' };
        if (average >= 70) return { grade: 'C', color: '#f59e0b' };
        if (average >= 60) return { grade: 'D', color: '#f97316' };
        return { grade: 'F', color: '#ef4444' };
    }

    getGradeColor(grade) {
        const gradeColors = {
            'A': { grade: 'A', color: '#10b981' },
            'B': { grade: 'B', color: '#3b82f6' },
            'C': { grade: 'C', color: '#f59e0b' },
            'D': { grade: 'D', color: '#f97316' },
            'F': { grade: 'F', color: '#ef4444' }
        };
        return gradeColors[grade] || { grade: grade, color: '#6b7280' };
    }

    renderSpreadsheet() {
        const tbody = document.getElementById('spreadsheet-body');
        if (!tbody) return;

        const currentSubjects = this.getCurrentSubjects();
        const colspanCount = 3 + currentSubjects.length + 4; // Name, Class, Stream + Subjects + Attendance, Average, Grade, Actions

        if (this.studentScores.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="${colspanCount}" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-table" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--border-color);"></i>
                        No student data yet. Click "Add Student" to get started.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.studentScores.map(student => {
            // Ensure student has scores for all current subjects
            currentSubjects.forEach(subject => {
                if (student.scores[subject] === undefined) {
                    student.scores[subject] = 0;
                }
            });

            const avg = this.calculateAverage(student.scores);
            const avgColor = avg >= 75 ? '#10b981' : avg >= 50 ? '#f59e0b' : '#ef4444';
            const autoGradeInfo = this.calculateGrade(avg);
            const currentGrade = student.manualGrade || autoGradeInfo.grade;
            const gradeInfo = student.manualGrade ? this.getGradeColor(student.manualGrade) : autoGradeInfo;

            return `
                <tr data-id="${student.id}" data-name="${student.name.toLowerCase()}" data-class="${student.classLevel}" data-stream="${student.stream}" style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.5rem;">
                        <input type="text" 
                            value="${student.name}" 
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'name', this.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-weight: 600;">
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <select onchange="window.adminDashboard.updateStudentField(${student.id}, 'classLevel', this.value)"
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: var(--primary-color); color: white; cursor: pointer;">
                            <option value="SS1" ${student.classLevel === 'SS1' ? 'selected' : ''}>SS1</option>
                            <option value="SS2" ${student.classLevel === 'SS2' ? 'selected' : ''}>SS2</option>
                            <option value="SS3" ${student.classLevel === 'SS3' ? 'selected' : ''}>SS3</option>
                            <option value="JAMB" ${student.classLevel === 'JAMB' ? 'selected' : ''}>JAMB</option>
                        </select>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <select onchange="window.adminDashboard.updateStudentField(${student.id}, 'stream', this.value)"
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: var(--gray-200); color: var(--gray-700); cursor: pointer;">
                            <option value="Science" ${student.stream === 'Science' ? 'selected' : ''}>Science</option>
                            <option value="Humanities" ${student.stream === 'Humanities' ? 'selected' : ''}>Humanities</option>
                            <option value="Business" ${student.stream === 'Business' ? 'selected' : ''}>Business</option>
                        </select>
                    </td>
                    ${currentSubjects.map(subject => {
                        const score = student.scores[subject] || 0;
                        return `
                        <td style="padding: 0.5rem; text-align: center;">
                            <input type="number" 
                                value="${score}" 
                                min="0" 
                                max="100"
                                onchange="window.adminDashboard.updateScore(${student.id}, '${subject}', this.value)"
                                style="width: 60px; padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-weight: 600; color: ${score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'};">
                        </td>
                    `}).join('')}
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="number" 
                            value="${student.attendance || 0}" 
                            min="0" 
                            max="100"
                            onchange="window.adminDashboard.updateAttendance(${student.id}, this.value)"
                            style="width: 60px; padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-weight: 600; color: ${student.attendance >= 90 ? '#10b981' : student.attendance >= 75 ? '#f59e0b' : '#ef4444'};">
                    </td>
                    <td style="padding: 0.75rem; text-align: center; background: ${avgColor}15;">
                        <span style="font-weight: 700; font-size: 1rem; color: ${avgColor};">${avg}%</span>
                    </td>
                    <td style="padding: 0.75rem; text-align: center; background: ${gradeInfo.color}15;">
                        <select onchange="window.adminDashboard.updateGrade(${student.id}, this.value)"
                            style="padding: 0.5rem 0.75rem; border: 2px solid ${gradeInfo.color}; border-radius: 8px; font-size: 1rem; font-weight: 700; background: ${gradeInfo.color}20; color: ${gradeInfo.color}; cursor: pointer; text-align: center;">
                            <option value="Auto" ${!student.manualGrade ? 'selected' : ''}>Auto (${autoGradeInfo.grade})</option>
                            <option value="A" ${student.manualGrade === 'A' ? 'selected' : ''}>A</option>
                            <option value="B" ${student.manualGrade === 'B' ? 'selected' : ''}>B</option>
                            <option value="C" ${student.manualGrade === 'C' ? 'selected' : ''}>C</option>
                            <option value="D" ${student.manualGrade === 'D' ? 'selected' : ''}>D</option>
                            <option value="F" ${student.manualGrade === 'F' ? 'selected' : ''}>F</option>
                        </select>
                    </td>
                    <td style="padding: 0.75rem; text-align: center;">
                        <button onclick="window.adminDashboard.deleteStudentRow(${student.id})" style="padding: 0.25rem 0.5rem; background: var(--danger-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    filterSpreadsheet() {
        const searchTerm = document.getElementById('spreadsheet-search')?.value.toLowerCase() || '';
        const classFilter = document.getElementById('spreadsheet-class-filter')?.value || '';
        const streamFilter = document.getElementById('spreadsheet-stream-filter')?.value || '';
        const subjectFilter = document.getElementById('spreadsheet-subject-filter')?.value || '';

        const rows = document.querySelectorAll('#spreadsheet-body tr[data-id]');

        rows.forEach(row => {
            const name = row.dataset.name || '';
            const rowClass = row.dataset.class || '';
            const rowStream = row.dataset.stream || '';

            const matchesSearch = name.includes(searchTerm);
            const matchesClass = !classFilter || rowClass === classFilter;
            const matchesStream = !streamFilter || rowStream === streamFilter;

            // Subject filter is handled differently - we just show/hide based on other filters
            // The subject filter could be used to highlight that column in the future

            row.style.display = (matchesSearch && matchesClass && matchesStream) ? '' : 'none';
        });
    }

    exportSpreadsheet() {
        // Create CSV content
        let csv = 'Student Name,Class,Stream,Mathematics,English Language,Physics,Chemistry,Biology,Economics,Attendance,Average,Grade\n';
        
        this.studentScores.forEach(student => {
            const avg = this.calculateAverage(student.scores);
            const autoGradeInfo = this.calculateGrade(avg);
            const finalGrade = student.manualGrade || autoGradeInfo.grade;
            csv += `${student.name},${student.classLevel},${student.stream},`;
            csv += Object.values(student.scores).join(',');
            csv += `,${student.attendance || 0},${avg},${finalGrade}\n`;
        });

        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `student_scores_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showToast('Spreadsheet exported successfully!', 'success');
    }

    renderLeaderboard() {
        const tbody = document.getElementById('leaderboard-body');
        if (!tbody) return;

        if (this.studentScores.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-trophy" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--border-color);"></i>
                        Leaderboard will be populated from student scores
                    </td>
                </tr>
            `;
            return;
        }

        // Get class filter
        const classFilter = document.getElementById('leaderboard-class-filter')?.value || '';

        // Filter and sort students by average score
        const sorted = [...this.studentScores]
            .filter(s => !classFilter || s.classLevel === classFilter)
            .map(s => ({ ...s, avg: this.calculateAverage(s.scores) }))
            .sort((a, b) => b.avg - a.avg)
            .slice(0, 10); // Top 10

        tbody.innerHTML = sorted.map((student, index) => {
            const rank = index + 1;
            const rankColor = rank === 1 ? '#f59e0b' : rank === 2 ? '#9ca3af' : rank === 3 ? '#cd7f32' : '#6b7280';
            const rankIcon = rank <= 3 ? '<i class="fas fa-trophy"></i>' : rank;
            const avgColor = student.avg >= 75 ? '#10b981' : student.avg >= 50 ? '#f59e0b' : '#ef4444';

            return `
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem; text-align: center;">
                        <div style="width: 40px; height: 40px; margin: 0 auto; border-radius: 50%; background: ${rankColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem;">
                            ${rankIcon}
                        </div>
                    </td>
                    <td style="padding: 0.5rem;">
                        <input type="text" 
                            value="${student.name}" 
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'name', this.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-weight: 600;">
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <select onchange="window.adminDashboard.updateStudentField(${student.id}, 'classLevel', this.value)"
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: var(--primary-color); color: white; cursor: pointer;">
                            <option value="SS1" ${student.classLevel === 'SS1' ? 'selected' : ''}>SS1</option>
                            <option value="SS2" ${student.classLevel === 'SS2' ? 'selected' : ''}>SS2</option>
                            <option value="SS3" ${student.classLevel === 'SS3' ? 'selected' : ''}>SS3</option>
                            <option value="JAMB" ${student.classLevel === 'JAMB' ? 'selected' : ''}>JAMB</option>
                        </select>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <select onchange="window.adminDashboard.updateStudentField(${student.id}, 'stream', this.value)"
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: var(--gray-200); color: var(--gray-700); cursor: pointer;">
                            <option value="Science" ${student.stream === 'Science' ? 'selected' : ''}>Science</option>
                            <option value="Humanities" ${student.stream === 'Humanities' ? 'selected' : ''}>Humanities</option>
                            <option value="Business" ${student.stream === 'Business' ? 'selected' : ''}>Business</option>
                        </select>
                    </td>
                    <td style="padding: 0.75rem; text-align: center;">
                        <span style="font-weight: 700; font-size: 1.125rem; color: ${avgColor};">${student.avg}%</span>
                        <div style="font-size: 0.625rem; color: var(--text-secondary); margin-top: 0.25rem;">Auto-calculated</div>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="number" 
                            value="${student.attendance || 0}" 
                            min="0" 
                            max="100"
                            onchange="window.adminDashboard.updateAttendance(${student.id}, this.value)"
                            style="width: 60px; padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-weight: 600; color: ${student.attendance >= 90 ? '#10b981' : student.attendance >= 75 ? '#f59e0b' : '#ef4444'};">
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="text" 
                            value="${student.customBadge || ''}" 
                            placeholder="Enter badge..."
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'customBadge', this.value)"
                            style="width: 120px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-size: 0.875rem;">
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <button onclick="window.adminDashboard.deleteStudentRow(${student.id})" style="padding: 0.5rem; background: var(--danger-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem; width: 100%;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    renderBadges() {
        const tbody = document.getElementById('badges-body');
        if (!tbody) return;

        if (this.studentScores.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-medal" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--border-color);"></i>
                        Badges will be awarded based on student performance
                    </td>
                </tr>
            `;
            return;
        }

        // Get class filter
        const classFilter = document.getElementById('badges-class-filter')?.value || '';

        // Filter students
        const filtered = this.studentScores.filter(s => !classFilter || s.classLevel === classFilter);

        tbody.innerHTML = filtered.map(student => {
            const avg = this.calculateAverage(student.scores);
            
            // Performance Badge
            let perfBadge = '';
            if (avg >= 90) perfBadge = '<span style="background: #f59e0b; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">🏆 Excellence</span>';
            else if (avg >= 80) perfBadge = '<span style="background: #10b981; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">🥇 Outstanding</span>';
            else if (avg >= 70) perfBadge = '<span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">🥈 Great</span>';
            else perfBadge = '<span style="color: var(--text-secondary); font-size: 0.75rem;">-</span>';

            // Attendance Badge
            let attBadge = '';
            const att = student.attendance || 0;
            if (att >= 95) attBadge = '<span style="background: #10b981; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">✓ Perfect</span>';
            else if (att >= 85) attBadge = '<span style="background: #3b82f6; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">✓ Excellent</span>';
            else if (att >= 75) attBadge = '<span style="background: #f59e0b; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">✓ Good</span>';
            else attBadge = '<span style="color: var(--text-secondary); font-size: 0.75rem;">-</span>';

            // Subject Excellence (highest score)
            const maxScore = Math.max(...Object.values(student.scores));
            const maxSubject = Object.entries(student.scores).find(([_, score]) => score === maxScore)?.[0] || '';
            let subjectBadge = '';
            if (maxScore >= 90) {
                subjectBadge = `<span style="background: #8b5cf6; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">⭐ ${maxSubject}</span>`;
            } else {
                subjectBadge = '<span style="color: var(--text-secondary); font-size: 0.75rem;">-</span>';
            }

            // Count total badges
            let totalBadges = 0;
            if (avg >= 70) totalBadges++;
            if (att >= 75) totalBadges++;
            if (maxScore >= 90) totalBadges++;

            return `
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.5rem;">
                        <input type="text" 
                            value="${student.name}" 
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'name', this.value)"
                            style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-weight: 600;">
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <select onchange="window.adminDashboard.updateStudentField(${student.id}, 'classLevel', this.value)"
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: var(--primary-color); color: white; cursor: pointer;">
                            <option value="SS1" ${student.classLevel === 'SS1' ? 'selected' : ''}>SS1</option>
                            <option value="SS2" ${student.classLevel === 'SS2' ? 'selected' : ''}>SS2</option>
                            <option value="SS3" ${student.classLevel === 'SS3' ? 'selected' : ''}>SS3</option>
                            <option value="JAMB" ${student.classLevel === 'JAMB' ? 'selected' : ''}>JAMB</option>
                        </select>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="text" 
                            value="${student.performanceBadge || ''}" 
                            placeholder="Performance badge..."
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'performanceBadge', this.value)"
                            style="width: 140px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-size: 0.875rem;">
                        <div style="font-size: 0.625rem; color: var(--text-secondary); margin-top: 0.25rem;">Auto: ${perfBadge.includes('Excellence') ? '🏆 Excellence' : perfBadge.includes('Outstanding') ? '🥇 Outstanding' : perfBadge.includes('Great') ? '🥈 Great' : '-'}</div>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="text" 
                            value="${student.attendanceBadge || ''}" 
                            placeholder="Attendance badge..."
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'attendanceBadge', this.value)"
                            style="width: 140px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-size: 0.875rem;">
                        <div style="font-size: 0.625rem; color: var(--text-secondary); margin-top: 0.25rem;">Auto: ${attBadge.includes('Perfect') ? '✓ Perfect' : attBadge.includes('Excellent') ? '✓ Excellent' : attBadge.includes('Good') ? '✓ Good' : '-'}</div>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="text" 
                            value="${student.subjectBadge || ''}" 
                            placeholder="Subject badge..."
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'subjectBadge', this.value)"
                            style="width: 140px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-size: 0.875rem;">
                        <div style="font-size: 0.625rem; color: var(--text-secondary); margin-top: 0.25rem;">Auto: ${maxScore >= 90 ? '⭐ ' + maxSubject : '-'}</div>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <input type="number" 
                            value="${student.totalBadges || totalBadges}" 
                            min="0" 
                            max="10"
                            onchange="window.adminDashboard.updateStudentField(${student.id}, 'totalBadges', parseInt(this.value))"
                            style="width: 60px; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-weight: 700; font-size: 1.125rem; color: ${(student.totalBadges || totalBadges) >= 3 ? '#10b981' : (student.totalBadges || totalBadges) >= 2 ? '#f59e0b' : '#6b7280'};">
                        <div style="font-size: 0.625rem; color: var(--text-secondary); margin-top: 0.25rem;">Auto: ${totalBadges}</div>
                    </td>
                    <td style="padding: 0.5rem; text-align: center;">
                        <button onclick="window.adminDashboard.deleteStudentRow(${student.id})" style="padding: 0.5rem; background: var(--danger-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem; width: 100%;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    setupReportFilters() {
        document.getElementById('report-class-filter')?.addEventListener('change', () => {
            this.updateReportSubjectDropdown();
            this.filterReports();
        });
        document.getElementById('report-stream-filter')?.addEventListener('change', () => {
            this.updateReportSubjectDropdown();
            this.filterReports();
        });
        document.getElementById('report-subject-filter')?.addEventListener('change', () => this.filterReports());
        document.getElementById('report-type-filter')?.addEventListener('change', () => this.filterReports());
    }

    populateReportSubjectFilters() {
        // Initial population - will be updated dynamically
        this.updateReportSubjectDropdown();
    }

    getSubjectsByStreamAndClass(stream, classLevel) {
        // Define subject combinations based on stream and class
        const subjectCombinations = {
            'Science': {
                'SS1': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics'],
                'SS2': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics'],
                'SS3': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Physics', 'Chemistry', 'Biology', 'Economics'],
                'JAMB': ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics']
            },
            'Humanities': {
                'SS1': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Literature-in-English', 'Government', 'Biology', 'Economics'],
                'SS2': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Literature-in-English', 'Government', 'Biology', 'Economics'],
                'SS3': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Literature-in-English', 'Government', 'Biology', 'Economics'],
                'JAMB': ['English Language', 'Mathematics', 'Literature-in-English', 'Government', 'Economics', 'CRS']
            },
            'Business': {
                'SS1': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Commerce', 'Accounts', 'Biology', 'Economics'],
                'SS2': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Commerce', 'Accounts', 'Biology', 'Economics'],
                'SS3': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies', 'Commerce', 'Accounts', 'Biology', 'Economics'],
                'JAMB': ['English Language', 'Mathematics', 'Economics', 'Commerce', 'Accounts']
            },
            'General': {
                'SS1': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies'],
                'SS2': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies'],
                'SS3': ['English Language', 'Mathematics', 'Citizenship and Heritage Studies'],
                'JAMB': ['English Language', 'Mathematics']
            }
        };

        // If no stream or class specified, return all subjects
        if (!stream && !classLevel) {
            const allSubjects = new Set();
            Object.values(subjectCombinations).forEach(streamData => {
                Object.values(streamData).forEach(subjects => {
                    subjects.forEach(subject => allSubjects.add(subject));
                });
            });
            return Array.from(allSubjects).sort();
        }

        // If only stream specified, return all subjects for that stream
        if (stream && !classLevel) {
            const allSubjects = new Set();
            if (subjectCombinations[stream]) {
                Object.values(subjectCombinations[stream]).forEach(subjects => {
                    subjects.forEach(subject => allSubjects.add(subject));
                });
            }
            return Array.from(allSubjects).sort();
        }

        // If only class specified, return subjects common across all streams for that class
        if (!stream && classLevel) {
            const allSubjects = new Set();
            Object.values(subjectCombinations).forEach(streamData => {
                if (streamData[classLevel]) {
                    streamData[classLevel].forEach(subject => allSubjects.add(subject));
                }
            });
            return Array.from(allSubjects).sort();
        }

        // Both stream and class specified
        if (subjectCombinations[stream] && subjectCombinations[stream][classLevel]) {
            return subjectCombinations[stream][classLevel];
        }

        return [];
    }

    updateReportSubjectDropdown() {
        const classFilter = document.getElementById('report-class-filter')?.value || '';
        const streamFilter = document.getElementById('report-stream-filter')?.value || '';
        const select = document.getElementById('report-subject-filter');
        
        if (!select) return;

        // Save current selection
        const currentValue = select.value;

        // Clear existing options except "All Subjects"
        select.innerHTML = '<option value="">All Subjects</option>';

        // Get subjects based on stream and class combination
        const subjects = this.getSubjectsByStreamAndClass(streamFilter, classFilter);

        // Add subjects to dropdown
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            select.appendChild(option);
        });

        // If no subjects match, show a helpful message
        if (subjects.length === 0 && (classFilter || streamFilter)) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No subjects found for this combination';
            option.disabled = true;
            select.appendChild(option);
        }

        // Restore selection if it still exists
        if (currentValue && Array.from(select.options).some(opt => opt.value === currentValue)) {
            select.value = currentValue;
        }
    }

    generateReports() {
        // Auto-generate reports from assessments and live classes
        const reports = [];

        // Generate quiz reports
        this.quizzes.forEach(quiz => {
            const avgScore = Math.floor(Math.random() * 40) + 60; // Simulated data 60-100%
            reports.push({
                id: `quiz-${quiz.id}`,
                type: 'quiz',
                title: `${quiz.title} - Results`,
                classLevel: quiz.classLevel,
                subject: quiz.subject,
                avgScore: avgScore,
                totalStudents: Math.floor(Math.random() * 30) + 10,
                completed: Math.floor(Math.random() * 25) + 8,
                createdAt: quiz.createdAt
            });
        });

        // Generate assignment reports
        this.assignments.forEach(assignment => {
            const avgScore = Math.floor(Math.random() * 35) + 65;
            reports.push({
                id: `assignment-${assignment.id}`,
                type: 'assignment',
                title: `${assignment.title} - Results`,
                classLevel: assignment.classLevel,
                subject: assignment.subject,
                avgScore: avgScore,
                totalStudents: Math.floor(Math.random() * 30) + 10,
                completed: Math.floor(Math.random() * 25) + 8,
                createdAt: assignment.createdAt
            });
        });

        // Generate exam reports
        this.exams.forEach(exam => {
            const avgScore = Math.floor(Math.random() * 35) + 55;
            reports.push({
                id: `exam-${exam.id}`,
                type: 'exam',
                title: `${exam.title} - Results`,
                classLevel: exam.classLevel,
                subject: exam.subject,
                avgScore: avgScore,
                totalStudents: Math.floor(Math.random() * 30) + 10,
                completed: Math.floor(Math.random() * 25) + 8,
                createdAt: exam.createdAt
            });
        });

        // Generate attendance reports
        const classLevels = ['SS1', 'SS2', 'SS3', 'JAMB'];
        const subjects = ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology'];
        
        classLevels.forEach(classLevel => {
            subjects.forEach(subject => {
                const avgAttendance = Math.floor(Math.random() * 25) + 75;
                reports.push({
                    id: `attendance-${classLevel}-${subject}-${Date.now()}`,
                    type: 'attendance',
                    title: `${classLevel} ${subject} - Attendance`,
                    classLevel: classLevel,
                    subject: subject,
                    avgScore: avgAttendance,
                    totalStudents: Math.floor(Math.random() * 30) + 10,
                    present: Math.floor(Math.random() * 25) + 8,
                    createdAt: new Date().toISOString()
                });
            });
        });

        this.reports = reports;
        this.saveToStorage('reports', this.reports);
        this.renderReports();
        this.updateReportStats();
    }

    updateReportStats() {
        const quizReports = this.reports.filter(r => r.type === 'quiz');
        const assignmentReports = this.reports.filter(r => r.type === 'assignment');
        const examReports = this.reports.filter(r => r.type === 'exam');
        const attendanceReports = this.reports.filter(r => r.type === 'attendance');

        const avgQuiz = quizReports.length > 0 
            ? Math.round(quizReports.reduce((sum, r) => sum + r.avgScore, 0) / quizReports.length) 
            : 0;
        const avgAssignment = assignmentReports.length > 0 
            ? Math.round(assignmentReports.reduce((sum, r) => sum + r.avgScore, 0) / assignmentReports.length) 
            : 0;
        const avgExam = examReports.length > 0 
            ? Math.round(examReports.reduce((sum, r) => sum + r.avgScore, 0) / examReports.length) 
            : 0;
        const avgAttendance = attendanceReports.length > 0 
            ? Math.round(attendanceReports.reduce((sum, r) => sum + r.avgScore, 0) / attendanceReports.length) 
            : 0;

        document.getElementById('avg-quiz-percent').textContent = `${avgQuiz}%`;
        document.getElementById('avg-assignment-percent').textContent = `${avgAssignment}%`;
        document.getElementById('avg-exam-percent').textContent = `${avgExam}%`;
        document.getElementById('avg-attendance-percent').textContent = `${avgAttendance}%`;
    }

    renderReports() {
        const grid = document.getElementById('reports-grid');
        if (!grid) return;

        if (this.reports.length === 0) {
            grid.innerHTML = `
                <div class=\"empty-state\" style=\"grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);\">
                    <i class=\"fas fa-chart-bar\" style=\"font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);\"></i>
                    <h3 style=\"margin: 0 0 0.5rem 0;\">No reports generated yet</h3>
                    <p style=\"margin: 0;\">Click \"Refresh Reports\" to generate from assessment data</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.reports.map(report => this.createReportCard(report)).join('');
    }

    createReportCard(report) {
        const icons = {
            quiz: { icon: 'clipboard-list', color: '#3b82f6' },
            assignment: { icon: 'tasks', color: '#f59e0b' },
            exam: { icon: 'file-alt', color: '#8b5cf6' },
            attendance: { icon: 'user-check', color: '#10b981' }
        };

        const { icon, color } = icons[report.type];
        const scoreColor = report.avgScore >= 75 ? '#10b981' : report.avgScore >= 50 ? '#f59e0b' : '#ef4444';

        return `
            <div class=\"report-card\" data-id=\"${report.id}\" data-class=\"${report.classLevel}\" data-subject=\"${report.subject}\" data-type=\"${report.type}\" style=\"background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.2s ease;\">
                <div style=\"padding: 1rem; background: var(--gray-50); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;\">
                    <div style=\"width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, ${color}, ${color}dd); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem;\">
                        <i class=\"fas fa-${icon}\"></i>
                    </div>
                    <div style=\"flex: 1; font-weight: 700; color: var(--text-primary); font-size: 1rem;\">${report.title}</div>
                </div>
                <div style=\"padding: 1rem;\">
                    <div style=\"display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;\">
                        <span style=\"background: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;\">${report.classLevel}</span>
                        <span style=\"background: var(--gray-100); color: var(--gray-700); padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: 600;\">${report.subject}</span>
                    </div>
                    <div style=\"background: var(--gray-50); border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem;\">
                        <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;\">
                            <span style=\"color: var(--text-secondary); font-size: 0.875rem;\">Average Score</span>
                            <div style=\"display: flex; align-items: center; gap: 0.5rem;\">
                                <input type=\"number\" 
                                    value=\"${report.avgScore}\" 
                                    min=\"0\" 
                                    max=\"100\"
                                    onchange=\"window.adminDashboard.updateReportScore('${report.id}', this.value)\"
                                    style=\"width: 70px; padding: 0.25rem 0.5rem; border: 2px solid ${scoreColor}; border-radius: 6px; text-align: center; font-size: 1.25rem; font-weight: 700; color: ${scoreColor}; background: white;\">
                                <span style=\"font-size: 1.25rem; font-weight: 700; color: ${scoreColor};\">%</span>
                            </div>
                        </div>
                        <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);\">
                            <div><i class=\"fas fa-users\"></i> ${report.totalStudents} students</div>
                            <div><i class=\"fas fa-check\"></i> ${report.completed || report.present || 0} ${report.type === 'attendance' ? 'present' : 'completed'}</div>
                        </div>
                    </div>
                    <div style=\"display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color);\">
                        <button onclick=\"window.adminDashboard.viewReport('${report.id}')\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--success-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                            <i class=\"fas fa-eye\"></i> View
                        </button>
                        <button onclick=\"window.adminDashboard.editReport('${report.id}')\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--warning-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                            <i class=\"fas fa-edit\"></i> Edit
                        </button>
                        <button onclick=\"window.adminDashboard.deleteReport('${report.id}')\" style=\"flex: 1; padding: 0.5rem 0.75rem; font-size: 0.75rem; border-radius: 0.5rem; background: var(--danger-color); color: white; border: none; cursor: pointer; font-weight: 600;\">
                            <i class=\"fas fa-trash\"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    filterReports() {
        const classFilter = document.getElementById('report-class-filter')?.value || '';
        const subjectFilter = document.getElementById('report-subject-filter')?.value || '';
        const typeFilter = document.getElementById('report-type-filter')?.value || '';

        const cards = document.querySelectorAll('#reports-grid .report-card');

        cards.forEach(card => {
            const cardClass = card.dataset.class;
            const cardSubject = card.dataset.subject;
            const cardType = card.dataset.type;

            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;
            const matchesType = !typeFilter || cardType === typeFilter;

            card.style.display = (matchesClass && matchesSubject && matchesType) ? 'block' : 'none';
        });
    }

    viewReport(id) {
        const report = this.reports.find(r => r.id === id);
        if (!report) {
            this.showToast('Report not found', 'error');
            return;
        }

        const typeNames = {
            quiz: 'Quiz Report',
            assignment: 'Assignment Report',
            exam: 'Mock Exam Report',
            attendance: 'Attendance Report'
        };

        const scoreColor = report.avgScore >= 75 ? '#10b981' : report.avgScore >= 50 ? '#f59e0b' : '#ef4444';

        const content = `
            <div style="background: var(--gray-50); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Report Type</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;">${typeNames[report.type]}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Class Level</strong>
                        <span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">${report.classLevel}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Subject</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;">${report.subject}</span>
                    </div>
                    <div>
                        <strong style="color: var(--text-secondary); font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">Total Students</strong>
                        <span style="color: var(--text-primary); font-size: 1rem;"><i class="fas fa-users"></i> ${report.totalStudents}</span>
                    </div>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, ${scoreColor}, ${scoreColor}dd); border-radius: 12px; padding: 2rem; text-align: center; color: white; margin-bottom: 1.5rem;">
                <div style="font-size: 0.875rem; margin-bottom: 0.5rem; opacity: 0.9;">Average Score</div>
                <div style="font-size: 3rem; font-weight: 700;">${report.avgScore}%</div>
                <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.9;">
                    ${report.completed || report.present || 0} out of ${report.totalStudents} ${report.type === 'attendance' ? 'present' : 'completed'}
                </div>
            </div>

            <div style="background: var(--gray-50); border-radius: 8px; padding: 1.5rem;">
                <h4 style="margin: 0 0 1rem 0; color: var(--text-primary);">Performance Breakdown</h4>
                <div style="margin-bottom: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.875rem;">
                        <span>Excellent (≥75%)</span>
                        <span style="font-weight: 600;">${Math.floor(report.totalStudents * 0.4)}</span>
                    </div>
                    <div style="background: var(--gray-200); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #10b981; height: 100%; width: 40%;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 0.75rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.875rem;">
                        <span>Good (50-74%)</span>
                        <span style="font-weight: 600;">${Math.floor(report.totalStudents * 0.35)}</span>
                    </div>
                    <div style="background: var(--gray-200); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #f59e0b; height: 100%; width: 35%;"></div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.875rem;">
                        <span>Needs Improvement (<50%)</span>
                        <span style="font-weight: 600;">${Math.floor(report.totalStudents * 0.25)}</span>
                    </div>
                    <div style="background: var(--gray-200); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: #ef4444; height: 100%; width: 25%;"></div>
                    </div>
                </div>
            </div>
        `;

        // Show in view modal
        const modal = document.getElementById('view-assessment-modal');
        const title = document.getElementById('view-assessment-title');
        const contentDiv = document.getElementById('view-assessment-content');

        if (modal && title && contentDiv) {
            title.textContent = report.title;
            contentDiv.innerHTML = content;
            modal.classList.add('active');
        }
    }

    editReport(id) {
        const report = this.reports.find(r => r.id === id);
        if (!report) {
            this.showToast('Report not found', 'error');
            return;
        }
        
        // Create edit form in a modal-like prompt
        const newScore = prompt(`Edit average score for "${report.title}"\n\nCurrent Score: ${report.avgScore}%\nEnter new score (0-100):`, report.avgScore);
        
        if (newScore === null) return; // User cancelled
        
        const score = parseInt(newScore);
        if (isNaN(score) || score < 0 || score > 100) {
            this.showToast('Invalid score. Please enter a number between 0 and 100', 'error');
            return;
        }

        const index = this.reports.findIndex(r => r.id === id);
        if (index !== -1) {
            this.reports[index].avgScore = score;
            this.saveToStorage('reports', this.reports);
            this.renderReports();
            this.updateReportStats();
            this.showToast('Report updated successfully!', 'success');
        }
    }

    updateReportScore(id, value) {
        const report = this.reports.find(r => r.id === id);
        if (!report) {
            this.showToast('Report not found', 'error');
            return;
        }

        const score = parseInt(value);
        if (isNaN(score) || score < 0 || score > 100) {
            this.showToast('Invalid score. Enter 0-100', 'error');
            this.renderReports();
            return;
        }

        const index = this.reports.findIndex(r => r.id === id);
        if (index !== -1) {
            this.reports[index].avgScore = score;
            this.saveToStorage('reports', this.reports);
            this.renderReports();
            this.updateReportStats();
            this.showToast(`Score updated to ${score}%`, 'success');
        }
    }

    deleteReport(id) {
        const report = this.reports.find(r => r.id === id);
        if (!report) {
            this.showToast('Report not found', 'error');
            return;
        }

        if (confirm(`Are you sure you want to delete "${report.title}"?\n\nThis action cannot be undone.`)) {
            this.reports = this.reports.filter(r => r.id !== id);
            this.saveToStorage('reports', this.reports);
            this.renderReports();
            this.updateReportStats();
            this.showToast('Report deleted successfully!', 'success');
        }
    }

    autoGenerateLeaderboardBadges() {
        this.studentScores.forEach(student => {
            const avg = this.calculateAverage(student.scores);
            
            // Auto-generate badge based on average
            if (avg >= 90) student.customBadge = '🏆 Excellence';
            else if (avg >= 80) student.customBadge = '🥇 Outstanding';
            else if (avg >= 70) student.customBadge = '🥈 Great';
            else student.customBadge = '🥉 Good';
        });

        this.saveToStorage('studentScores', this.studentScores);
        this.renderLeaderboard();
        this.showToast('Leaderboard badges auto-generated!', 'success');
    }

    autoGenerateBadges() {
        this.studentScores.forEach(student => {
            const avg = this.calculateAverage(student.scores);
            const att = student.attendance || 0;
            const maxScore = Math.max(...Object.values(student.scores));
            const maxSubject = Object.entries(student.scores).find(([_, score]) => score === maxScore)?.[0] || '';

            // Auto-generate performance badge
            if (avg >= 90) student.performanceBadge = '🏆 Excellence';
            else if (avg >= 80) student.performanceBadge = '🥇 Outstanding';
            else if (avg >= 70) student.performanceBadge = '🥈 Great';
            else student.performanceBadge = '';

            // Auto-generate attendance badge
            if (att >= 95) student.attendanceBadge = '✓ Perfect';
            else if (att >= 85) student.attendanceBadge = '✓ Excellent';
            else if (att >= 75) student.attendanceBadge = '✓ Good';
            else student.attendanceBadge = '';

            // Auto-generate subject badge
            if (maxScore >= 90) student.subjectBadge = `⭐ ${maxSubject}`;
            else student.subjectBadge = '';

            // Auto-calculate total badges
            let totalBadges = 0;
            if (avg >= 70) totalBadges++;
            if (att >= 75) totalBadges++;
            if (maxScore >= 90) totalBadges++;
            student.totalBadges = totalBadges;
        });

        this.saveToStorage('studentScores', this.studentScores);
        this.renderBadges();
        this.showToast('All badges auto-generated!', 'success');
    }

    deleteAllStudents() {
        if (this.studentScores.length === 0) {
            this.showToast('No students to delete', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete ALL ${this.studentScores.length} students?\n\nThis will permanently remove all student data including scores, attendance, and badges.\n\nThis action cannot be undone!`)) {
            this.studentScores = [];
            this.saveToStorage('studentScores', this.studentScores);
            this.renderSpreadsheet();
            this.renderLeaderboard();
            this.renderBadges();
            this.showToast('All students deleted successfully!', 'success');
        }
    }

    clearLeaderboard() {
        if (this.studentScores.length === 0) {
            this.showToast('No data to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear all leaderboard badges?\n\nThis will remove custom badges from all students.\n\nThis action cannot be undone!')) {
            this.studentScores.forEach(student => {
                student.customBadge = '';
            });
            this.saveToStorage('studentScores', this.studentScores);
            this.renderLeaderboard();
            this.showToast('Leaderboard badges cleared!', 'success');
        }
    }

    clearBadges() {
        if (this.studentScores.length === 0) {
            this.showToast('No data to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear all badges?\n\nThis will remove all custom badges (Performance, Attendance, Subject Excellence) from all students.\n\nThis action cannot be undone!')) {
            this.studentScores.forEach(student => {
                student.performanceBadge = '';
                student.attendanceBadge = '';
                student.subjectBadge = '';
                student.totalBadges = 0;
            });
            this.saveToStorage('studentScores', this.studentScores);
            this.renderBadges();
            this.showToast('All badges cleared!', 'success');
        }
    }

    // ========== PLANS MANAGEMENT ==========
    
    initializePlansManagement() {
        this.plans = this.loadFromStorage('subscriptionPlans') || [];
        
        // Migrate old plans to include planType if missing
        let needsUpdate = false;
        this.plans = this.plans.map(plan => {
            if (!plan.planType) {
                needsUpdate = true;
                return { ...plan, planType: 'individual' }; // Default to individual for old plans
            }
            return plan;
        });
        
        // Save updated plans if any were migrated
        if (needsUpdate) {
            this.saveToStorage('subscriptionPlans', this.plans);
            console.log('Migrated old plans to include planType');
        }
        
        this.syncUsers();
        this.currentEditPlanId = null;
        this.currentEditUserId = null;
        
        console.log('Plans management initialized with users:', this.users);
        
        this.renderPlans();
        this.updatePlanCounts();
        this.renderUsers();
    }
    
    syncUsers() {
        // Always load fresh user data from localStorage
        this.users = this.loadFromStorage('users') || [];
        console.log('Users synced from localStorage:', this.users.length, 'users');
        return this.users;
    }

    generateSampleUsers() {
        // Mock data generation disabled - use real data from Firebase
        const sampleUsers = [];
        this.saveToStorage('users', sampleUsers);
        return sampleUsers;
    }

    updatePlanCounts() {
        const plan30 = this.plans.filter(p => p.duration === 30).length;
        const plan60 = this.plans.filter(p => p.duration === 60).length;
        const plan90 = this.plans.filter(p => p.duration === 90).length;
        
        // Count active subscribers (bootcamp + active status, not locked)
        const activeSubscribers = this.users.filter(u => !u.locked && (u.status === 'bootcamp' || u.status === 'active')).length;
        
        document.getElementById('plan-30-count').textContent = plan30;
        document.getElementById('plan-60-count').textContent = plan60;
        document.getElementById('plan-90-count').textContent = plan90;
        document.getElementById('active-subscribers-count').textContent = activeSubscribers;
    }

    openPlanModal() {
        this.currentEditPlanId = null;
        document.getElementById('plan-modal').classList.add('active');
        document.getElementById('plan-modal-title').textContent = 'Create Subscription Plan';
        document.getElementById('plan-form').reset();
        // Set default plan type to individual
        document.getElementById('plan-type').value = 'individual';
    }

    closePlanModal() {
        document.getElementById('plan-modal').classList.remove('active');
        document.getElementById('plan-form').reset();
        this.currentEditPlanId = null;
    }

    savePlan(event) {
        event.preventDefault();

        const planData = {
            name: document.getElementById('plan-name').value,
            duration: parseInt(document.getElementById('plan-duration').value),
            planType: document.getElementById('plan-type').value,
            price: parseFloat(document.getElementById('plan-price').value),
            description: document.getElementById('plan-description').value,
            features: document.getElementById('plan-features').value.split('\n').filter(f => f.trim()),
            popular: document.getElementById('plan-popular').checked
        };

        if (this.currentEditPlanId) {
            this.updatePlan(this.currentEditPlanId, planData);
        } else {
            this.addPlan(planData);
        }

        this.closePlanModal();
    }

    addPlan(planData) {
        const plan = {
            id: Date.now(),
            ...planData,
            subscribers: 0,
            createdAt: new Date().toISOString()
        };

        this.plans.push(plan);
        this.saveToStorage('subscriptionPlans', this.plans);
        this.renderPlans();
        this.updatePlanCounts();
        this.showToast('Plan created successfully!', 'success');
    }

    updatePlan(id, planData) {
        const index = this.plans.findIndex(p => p.id === id);
        if (index !== -1) {
            this.plans[index] = { ...this.plans[index], ...planData, updatedAt: new Date().toISOString() };
            this.saveToStorage('subscriptionPlans', this.plans);
            this.renderPlans();
            this.showToast('Plan updated successfully!', 'success');
        }
    }

    deletePlan(id) {
        const plan = this.plans.find(p => p.id === id);
        if (!plan) return;

        if (confirm(`Are you sure you want to delete "${plan.name}"?\n\nThis action cannot be undone.`)) {
            this.plans = this.plans.filter(p => p.id !== id);
            this.saveToStorage('subscriptionPlans', this.plans);
            this.renderPlans();
            this.updatePlanCounts();
            this.showToast('Plan deleted successfully!', 'success');
        }
    }

    editPlan(id) {
        const plan = this.plans.find(p => p.id === id);
        if (!plan) return;

        this.currentEditPlanId = id;
        document.getElementById('plan-modal').classList.add('active');
        document.getElementById('plan-modal-title').textContent = 'Edit Subscription Plan';
        document.getElementById('plan-name').value = plan.name;
        document.getElementById('plan-duration').value = plan.duration;
        document.getElementById('plan-type').value = plan.planType || 'individual';
        document.getElementById('plan-price').value = plan.price;
        document.getElementById('plan-description').value = plan.description || '';
        document.getElementById('plan-features').value = plan.features.join('\n');
        document.getElementById('plan-popular').checked = plan.popular || false;
    }

    renderPlans() {
        const grid = document.getElementById('plans-grid');
        if (!grid) return;

        if (this.plans.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-box" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3 style="margin: 0 0 0.5rem 0;">No subscription plans yet</h3>
                    <p style="margin: 0;">Click "Create Plan" to add subscription plans</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.plans.map(plan => this.createPlanCard(plan)).join('');
    }

    createPlanCard(plan) {
        const durationColors = {
            30: { bg: '#3b82f6', light: '#dbeafe' },
            60: { bg: '#f59e0b', light: '#fef3c7' },
            90: { bg: '#8b5cf6', light: '#ede9fe' }
        };

        const colors = durationColors[plan.duration] || durationColors[30];
        const planType = plan.planType || 'individual';
        const popularBadge = plan.popular ? '<div style="position: absolute; top: -10px; right: -10px; background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">⭐ Popular</div>' : '';

        return `
            <div style="background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; transition: all 0.2s ease; position: relative; ${plan.popular ? 'border-color: #10b981;' : ''}">
                ${popularBadge}
                <div style="padding: 1.5rem; background: ${colors.light}; border-bottom: 1px solid var(--border-color);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <div style="width: 50px; height: 50px; border-radius: 12px; background: ${colors.bg}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 700;">
                            ${plan.duration}
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                                <div style="font-weight: 700; color: var(--text-primary); font-size: 1.25rem;">${plan.name}</div>
                                <span style="background: ${planType === 'family' ? '#fbbf24' : '#3b82f6'}; color: white; padding: 0.125rem 0.5rem; border-radius: 12px; font-size: 0.625rem; font-weight: 600; text-transform: uppercase;">
                                    ${planType === 'family' ? '👨‍👩‍👧‍👦 Family' : '👤 Individual'}
                                </span>
                            </div>
                            <div style="font-size: 0.875rem; color: var(--text-secondary);">${plan.duration} Days Access</div>
                        </div>
                    </div>
                    <div style="font-size: 2rem; font-weight: 700; color: ${colors.bg};">₦${plan.price.toLocaleString()}</div>
                </div>
                <div style="padding: 1.5rem;">
                    ${plan.description ? `<p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.6;">${plan.description}</p>` : ''}
                    
                    ${plan.features.length > 0 ? `
                        <div style="margin-bottom: 1rem;">
                            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.875rem;">Features:</div>
                            <ul style="margin: 0; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.875rem;">
                                ${plan.features.map(f => `<li style="margin-bottom: 0.25rem;">${f}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: var(--gray-50); border-radius: 8px; margin-bottom: 1rem;">
                        <i class="fas fa-users" style="color: ${colors.bg};"></i>
                        <span style="font-size: 0.875rem; color: var(--text-secondary);">${plan.subscribers || 0} Active Subscribers</span>
                    </div>

                    <div style="display: flex; gap: 0.5rem;">
                        <button onclick="window.adminDashboard.editPlan(${plan.id})" style="flex: 1; padding: 0.75rem; font-size: 0.875rem; border-radius: 8px; background: var(--warning-color); color: white; border: none; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="window.adminDashboard.deletePlan(${plan.id})" style="flex: 1; padding: 0.75rem; font-size: 0.875rem; border-radius: 8px; background: var(--danger-color); color: white; border: none; cursor: pointer; font-weight: 600;">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ========== USERS MANAGEMENT ==========

    openUserModal() {
        this.currentEditUserId = null;
        document.getElementById('user-modal').classList.add('active');
        document.getElementById('user-modal-title').textContent = 'Add User';
        document.getElementById('user-form').reset();
        this.populateParentDropdown();
        this.toggleUserTypeFields();
    }

    closeUserModal() {
        document.getElementById('user-modal').classList.remove('active');
        document.getElementById('user-form').reset();
        this.currentEditUserId = null;
    }

    toggleUserTypeFields() {
        const userType = document.getElementById('user-type').value;
        const parentFields = document.getElementById('parent-fields');
        const childFields = document.getElementById('child-fields');

        if (userType === 'parent') {
            parentFields.style.display = 'block';
            childFields.style.display = 'none';
        } else {
            parentFields.style.display = 'none';
            childFields.style.display = 'block';
        }
    }

    populateParentDropdown() {
        const parentSelect = document.getElementById('user-parent');
        const parents = this.users.filter(u => u.userType === 'parent');
        
        parentSelect.innerHTML = '<option value="">Select Parent (Optional)</option>';
        parents.forEach(parent => {
            parentSelect.innerHTML += `<option value="${parent.id}">${parent.name} (${parent.email})</option>`;
        });
    }

    saveUser(event) {
        event.preventDefault();

        const userType = document.getElementById('user-type').value;
        const planDuration = document.getElementById('user-plan').value;
        
        // Calculate days left based on plan
        let daysLeft = 7; // Default bootcamp
        let status = 'bootcamp';
        
        if (planDuration) {
            daysLeft = parseInt(planDuration);
            status = 'active';
        }

        const userData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            phone: document.getElementById('user-phone').value || '',
            userType: userType,
            planDuration: planDuration || null,
            status: status,
            daysLeft: daysLeft,
            locked: false,
            joinedDate: new Date().toISOString()
        };

        if (userType === 'parent') {
            userData.childrenCount = parseInt(document.getElementById('user-children-count').value) || 0;
            userData.children = [];
        } else {
            userData.parentId = document.getElementById('user-parent').value || null;
            userData.classLevel = document.getElementById('user-class').value || '';
        }

        if (this.currentEditUserId) {
            this.updateUser(this.currentEditUserId, userData);
        } else {
            this.addUser(userData);
        }

        this.closeUserModal();
    }

    addUser(userData) {
        const user = {
            id: Date.now(),
            ...userData
        };

        this.users.push(user);
        
        // If parent, update children count
        if (userData.parentId) {
            const parent = this.users.find(u => u.id === parseInt(userData.parentId));
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(user.id);
                parent.childrenCount = parent.children.length;
            }
        }

        this.saveToStorage('users', this.users);
        this.renderUsers();
        this.updatePlanCounts();
        this.showToast('User added successfully!', 'success');
    }

    updateUser(id, userData) {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData };
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast('User updated successfully!', 'success');
        }
    }

    deleteUser(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return;

        if (confirm(`Are you sure you want to delete "${user.name}"?\n\nThis action cannot be undone.`)) {
            // If parent, remove children references
            if (user.userType === 'parent' && user.children && user.children.length > 0) {
                if (!confirm(`This parent has ${user.children.length} children. Delete anyway?`)) {
                    return;
                }
            }

            this.users = this.users.filter(u => u.id !== id);
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast('User deleted successfully!', 'success');
        }
    }

    lockAccount(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return;

        user.locked = true;
        user.status = 'expired';
        this.saveToStorage('users', this.users);
        this.renderUsers();
        this.showToast(`Account locked: ${user.name}`, 'success');
    }

    unlockAccount(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return;

        user.locked = false;
        if (user.daysLeft > 0) {
            user.status = user.planDuration ? 'active' : 'bootcamp';
        }
        this.saveToStorage('users', this.users);
        this.renderUsers();
        this.showToast(`Account unlocked: ${user.name}`, 'success');
    }

    extendSubscription(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return;

        const days = prompt(`Extend subscription for "${user.name}"\n\nEnter number of days to add:`, '30');
        if (days === null) return;

        const additionalDays = parseInt(days);
        if (isNaN(additionalDays) || additionalDays <= 0) {
            this.showToast('Invalid number of days', 'error');
            return;
        }

        user.daysLeft += additionalDays;
        user.status = 'active';
        user.locked = false;
        this.saveToStorage('users', this.users);
        this.renderUsers();
        this.showToast(`Added ${additionalDays} days to ${user.name}'s subscription`, 'success');
    }

    viewUserDetails(id) {
        const user = this.users.find(u => u.id === id);
        if (!user) return;

        let childrenInfo = '';
        if (user.userType === 'parent' && user.children && user.children.length > 0) {
            const childrenNames = user.children.map(childId => {
                const child = this.users.find(u => u.id === childId);
                return child ? child.name : 'Unknown';
            }).join(', ');
            childrenInfo = `<div><strong>Children:</strong> ${childrenNames}</div>`;
        }

        let parentInfo = '';
        if (user.userType === 'child' && user.parentId) {
            const parent = this.users.find(u => u.id === parseInt(user.parentId));
            parentInfo = `<div><strong>Parent:</strong> ${parent ? parent.name : 'Unknown'}</div>`;
        }

        const content = `
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1rem;"><strong>Name:</strong> ${user.name}</div>
                <div style="margin-bottom: 1rem;"><strong>Email:</strong> ${user.email}</div>
                <div style="margin-bottom: 1rem;"><strong>Phone:</strong> ${user.phone || 'N/A'}</div>
                <div style="margin-bottom: 1rem;"><strong>User Type:</strong> ${user.userType === 'parent' ? 'Parent/Guardian' : 'Child/Student'}</div>
                ${user.classLevel ? `<div style="margin-bottom: 1rem;"><strong>Class:</strong> ${user.classLevel}</div>` : ''}
                <div style="margin-bottom: 1rem;"><strong>Plan:</strong> ${user.planDuration ? `${user.planDuration}-Day Plan` : 'Free Bootcamp'}</div>
                <div style="margin-bottom: 1rem;"><strong>Days Left:</strong> ${user.daysLeft} days</div>
                <div style="margin-bottom: 1rem;"><strong>Status:</strong> ${this.getStatusBadge(user)}</div>
                <div style="margin-bottom: 1rem;"><strong>Joined:</strong> ${new Date(user.joinedDate).toLocaleDateString()}</div>
                ${childrenInfo}
                ${parentInfo}
            </div>
        `;

        alert(content.replace(/<[^>]*>/g, '\n'));
    }

    filterUsers() {
        const searchTerm = document.getElementById('users-search').value.toLowerCase();
        const statusFilter = document.getElementById('users-status-filter').value;
        const planFilter = document.getElementById('users-plan-filter').value;

        const filtered = this.users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                                 user.email.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || user.status === statusFilter;
            const matchesPlan = !planFilter || 
                              (planFilter === 'none' && !user.planDuration) ||
                              (user.planDuration && user.planDuration.toString() === planFilter);

            return matchesSearch && matchesStatus && matchesPlan;
        });

        this.renderUsersTable(filtered);
    }

    renderUsers() {
        console.log('renderUsers called with users:', this.users);
        this.renderUsersTable(this.users);
    }

    renderUsersTable(users) {
        console.log('renderUsersTable called with users:', users);
        const tbody = document.getElementById('users-table-body');
        if (!tbody) {
            console.error('Table body not found!');
            return;
        }

        if (users.length === 0) {
            console.log('No users, showing empty state');
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="padding: 3rem; text-align: center; color: var(--text-secondary);">
                        <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--border-color);"></i>
                        No users found
                    </td>
                </tr>
            `;
            return;
        }

        console.log('Rendering', users.length, 'users');
        tbody.innerHTML = users.map(user => this.createUserRow(user)).join('');
        console.log('Table updated with user rows');
    }

    createUserRow(user) {
        const statusBadge = this.getStatusBadge(user);
        const planDisplay = user.plan === 'bootcamp' ? '7-Day Bootcamp' : `${user.plan}-Day Plan`;
        const expiryDisplay = user.expiry ? user.expiry : 'N/A';
        const bootcampInfo = this.getBootcampInfo(user);
        
        return `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-user"></i>
                        <span style="font-weight: 600;">${user.name}</span>
                    </div>
                </td>
                <td style="padding: 0.75rem; color: var(--text-secondary);">${user.email}</td>
                <td style="padding: 0.75rem; text-align: center;">${statusBadge}</td>
                <td style="padding: 0.75rem; text-align: center;">
                    <select onchange="window.adminDashboard.editUserPlan(${user.id}, this.value)" 
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.75rem; background: white;">
                        <option value="bootcamp" ${user.plan === 'bootcamp' ? 'selected' : ''}>7-Day Bootcamp</option>
                        <option value="30" ${user.plan === '30' ? 'selected' : ''}>30-Day Plan</option>
                        <option value="60" ${user.plan === '60' ? 'selected' : ''}>60-Day Plan</option>
                        <option value="90" ${user.plan === '90' ? 'selected' : ''}>90-Day Plan</option>
                    </select>
                    ${bootcampInfo}
                </td>
                <td style="padding: 0.75rem; text-align: center;">
                    <select onchange="window.adminDashboard.editUserPlanType(${user.id}, this.value)" 
                            style="padding: 0.25rem 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.75rem; background: white;">
                        <option value="individual" ${(user.planType === 'individual' || !user.planType) ? 'selected' : ''}>Individual</option>
                        <option value="family" ${user.planType === 'family' ? 'selected' : ''}>Family</option>
                    </select>
                </td>
                <td style="padding: 0.75rem; text-align: center;">
                    ${user.plan === 'bootcamp' ? 
                        '<span style="color: var(--text-secondary); font-size: 0.75rem;">N/A</span>' :
                        `<input type="date" value="${user.expiry || ''}" 
                                onchange="window.adminDashboard.editUserExpiry(${user.id}, this.value)"
                                style="padding: 0.25rem; border: 1px solid var(--border-color); border-radius: 4px; font-size: 0.75rem; width: 120px;">`
                    }
                </td>
                <td style="padding: 0.75rem; text-align: center;">
                    <label class="toggle-switch">
                        <input type="checkbox" ${user.locked ? 'checked' : ''} 
                               onchange="window.adminDashboard.toggleUserLock(${user.id})">
                        <span class="toggle-slider"></span>
                    </label>
                    <div style="font-size: 0.6rem; margin-top: 2px; color: var(--text-secondary);">
                        ${user.locked ? 'Locked' : 'Active'}
                    </div>
                </td>
                <td style="padding: 0.75rem; text-align: center;">
                    <div style="display: flex; gap: 0.25rem; justify-content: center;">
                        <button onclick="window.adminDashboard.viewPlanHistory(${user.id})" 
                                title="View Plan History" 
                                style="padding: 0.5rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">
                            <i class="fas fa-history"></i>
                        </button>
                        <button onclick="window.adminDashboard.deleteUser(${user.id})" 
                                title="Delete User" 
                                style="padding: 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.75rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    getStatusBadge(user) {
        if (user.locked) {
            return '<span style="background: #ef4444; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-lock"></i> Locked</span>';
        }
        
        if (user.status === 'bootcamp') {
            const bootcampDays = this.getBootcampRemainingDays(user);
            const bootcampColor = bootcampDays <= 2 ? '#f59e0b' : '#10b981'; // Warning color if 2 days or less
            return `<span style="background: ${bootcampColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-gift"></i> Bootcamp (${bootcampDays}d left)</span>`;
        }
        
        if (user.status === 'active') {
            return '<span style="background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-check-circle"></i> Active</span>';
        }
        
        return '<span style="background: #6b7280; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-times-circle"></i> Expired</span>';
    }

    getBootcampRemainingDays(user) {
        if (!user.bootcampStartDate) {
            return 7; // Default if no start date
        }
        
        const startDate = new Date(user.bootcampStartDate);
        const today = new Date();
        const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const remainingDays = Math.max(0, 7 - daysPassed);
        
        // Update user status if bootcamp expired
        if (remainingDays === 0 && user.status === 'bootcamp') {
            user.status = 'expired';
            this.saveToStorage('users', this.users);
        }
        
        return remainingDays;
    }

    getBootcampInfo(user) {
        if (user.plan !== 'bootcamp') {
            return '';
        }
        
        const remainingDays = this.getBootcampRemainingDays(user);
        const planChanges = user.planHistory ? user.planHistory.length - 1 : 0;
        
        let infoHtml = `<div style="font-size: 0.65rem; margin-top: 0.25rem; color: var(--text-secondary);">`;
        
        if (remainingDays > 0) {
            const color = remainingDays <= 2 ? '#f59e0b' : '#10b981';
            infoHtml += `<div style="color: ${color}; font-weight: 600;"><i class="fas fa-clock"></i> ${remainingDays} days left</div>`;
        } else {
            infoHtml += `<div style="color: #ef4444; font-weight: 600;"><i class="fas fa-exclamation-triangle"></i> Expired</div>`;
        }
        
        if (planChanges > 0) {
            infoHtml += `<div style="color: #6b7280; margin-top: 0.125rem;"><i class="fas fa-exchange-alt"></i> ${planChanges} plan change${planChanges > 1 ? 's' : ''}</div>`;
        }
        
        infoHtml += `</div>`;
        return infoHtml;
    }

    // ========== SUBSCRIPTION MANAGEMENT ==========
    
    openSubscriptionModal() {
        console.log('Opening subscription modal...');
        const modal = document.getElementById('subscription-modal');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            
            const form = document.getElementById('subscription-form');
            if (form) {
                form.reset();
            }
            
            const title = document.getElementById('subscription-modal-title');
            if (title) {
                title.textContent = 'Add New Subscription';
            }
            
            console.log('Modal opened successfully');
        } else {
            console.error('Subscription modal not found!');
        }
    }

    closeSubscriptionModal() {
        document.getElementById('subscription-modal').classList.remove('active');
        document.getElementById('subscription-modal').style.display = 'none';
        document.getElementById('subscription-form').reset();
    }

    saveSubscription(event) {
        event.preventDefault();
        
        console.log('Saving subscription...');
        
        const email = document.getElementById('subscription-email').value;
        const name = document.getElementById('subscription-name').value;
        const plan = document.getElementById('subscription-plan').value;
        const expiry = document.getElementById('subscription-expiry').value;
        const locked = document.getElementById('subscription-locked').checked;
        
        console.log('Form data:', { email, name, plan, expiry, locked });
        
        // Validate required fields
        if (!email || !name || !plan) {
            this.showToast('Please fill in all required fields!', 'error');
            return;
        }
        
        // Calculate expiry date if not provided
        let expiryDate = expiry;
        if (!expiry && plan !== 'bootcamp') {
            const days = parseInt(plan);
            const date = new Date();
            date.setDate(date.getDate() + days);
            expiryDate = date.toISOString().split('T')[0];
        }
        
        const subscription = {
            id: Date.now(),
            email: email,
            name: name,
            plan: plan,
            status: plan === 'bootcamp' ? 'bootcamp' : 'active',
            expiry: expiryDate,
            locked: locked,
            joinDate: new Date().toISOString().split('T')[0],
            bootcampStartDate: plan === 'bootcamp' ? new Date().toISOString().split('T')[0] : null,
            planHistory: [{
                from: null,
                to: plan,
                changedAt: new Date().toISOString(),
                changedBy: 'admin'
            }]
        };
        
        console.log('Created subscription object:', subscription);
        
        // Add to users array
        if (!this.users) {
            console.log('Initializing users array');
            this.users = [];
        }
        
        this.users.push(subscription);
        console.log('Users array after adding:', this.users);
        
        this.saveToStorage('users', this.users);
        
        this.renderUsers();
        this.closeSubscriptionModal();
        this.showToast('Subscription added successfully!', 'success');
        
        console.log('Subscription saved and table should be updated');
    }

    toggleUserLock(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.locked = !user.locked;
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast(`Account ${user.locked ? 'locked' : 'unlocked'} successfully!`, 'success');
        }
    }

    editUserPlan(userId, newPlan) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            const oldPlan = user.plan;
            
            // Track plan changes
            if (!user.planHistory) {
                user.planHistory = [];
            }
            
            user.planHistory.push({
                from: oldPlan,
                to: newPlan,
                changedAt: new Date().toISOString(),
                changedBy: 'admin'
            });
            
            user.plan = newPlan;
            
            // Update status and expiry based on plan
            if (newPlan === 'bootcamp') {
                user.status = 'bootcamp';
                user.expiry = null;
                // Set bootcamp start date if not already set
                if (!user.bootcampStartDate) {
                    user.bootcampStartDate = new Date().toISOString().split('T')[0];
                }
            } else {
                user.status = 'active';
                const days = parseInt(newPlan);
                const date = new Date();
                date.setDate(date.getDate() + days);
                user.expiry = date.toISOString().split('T')[0];
                // Clear bootcamp start date when switching to paid plan
                user.bootcampStartDate = null;
            }
            
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast(`Plan changed from ${oldPlan === 'bootcamp' ? '7-Day Bootcamp' : oldPlan + '-Day Plan'} to ${newPlan === 'bootcamp' ? '7-Day Bootcamp' : newPlan + '-Day Plan'}!`, 'success');
        }
    }

    editUserExpiry(userId, newExpiry) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.expiry = newExpiry;
            
            // Update status based on expiry
            const today = new Date().toISOString().split('T')[0];
            if (newExpiry && newExpiry < today) {
                user.status = 'expired';
            } else if (user.plan !== 'bootcamp') {
                user.status = 'active';
            }
            
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast('Expiry date updated successfully!', 'success');
        }
    }

    editUserPlanType(userId, newPlanType) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            user.planType = newPlanType;
            
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast(`Plan type updated to ${newPlanType}!`, 'success');
        }
    }

    viewPlanHistory(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const planHistory = user.planHistory || [];
        
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease;
        `;
        
        const historyHtml = planHistory.length > 0 ? 
            planHistory.map((change, index) => {
                const fromPlan = change.from === null ? 'New User' : 
                               change.from === 'bootcamp' ? '7-Day Bootcamp' : `${change.from}-Day Plan`;
                const toPlan = change.to === 'bootcamp' ? '7-Day Bootcamp' : `${change.to}-Day Plan`;
                const date = new Date(change.changedAt).toLocaleString();
                
                return `
                    <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 0.75rem; background: ${index === 0 ? '#f9fafb' : 'white'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <div style="font-weight: 600; color: #1f2937;">
                                ${fromPlan} → ${toPlan}
                            </div>
                            <div style="font-size: 0.75rem; color: #6b7280;">
                                ${index === 0 ? 'Current' : `Change ${planHistory.length - index}`}
                            </div>
                        </div>
                        <div style="font-size: 0.875rem; color: #6b7280;">
                            <i class="fas fa-clock"></i> ${date} • Changed by ${change.changedBy}
                        </div>
                    </div>
                `;
            }).join('') :
            '<div style="text-align: center; padding: 2rem; color: #6b7280;"><i class="fas fa-info-circle"></i> No plan changes recorded</div>';
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 1.5rem 0; color: #1f2937; font-size: 1.5rem;">
                <i class="fas fa-history"></i> Plan History - ${user.name}
            </h3>
            <div style="margin-bottom: 1.5rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Current Plan</div>
                        <div style="font-weight: 600; color: #1f2937;">
                            ${user.plan === 'bootcamp' ? '7-Day Bootcamp' : `${user.plan}-Day Plan`}
                        </div>
                    </div>
                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Total Changes</div>
                        <div style="font-weight: 600; color: #1f2937;">
                            ${planHistory.length - 1} changes
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin: 0 0 1rem 0; color: #374151; font-size: 1.125rem;">Change History</h4>
                ${historyHtml}
            </div>
            <div style="display: flex; justify-content: flex-end;">
                <button id="closeHistoryBtn" style="
                    padding: 0.75rem 1.5rem;
                    border: 1px solid #d1d5db;
                    background: white;
                    color: #374151;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                ">Close</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Handle close
        modal.querySelector('#closeHistoryBtn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.users = this.users.filter(u => u.id !== userId);
            this.saveToStorage('users', this.users);
            this.renderUsers();
            this.showToast('User deleted successfully!', 'success');
        }
    }

    // Test function to verify add book functionality
    testAddBook() {
        console.log('=== TESTING ADD BOOK FUNCTIONALITY ===');
        
        // Test 1: Check if books array exists
        console.log('Test 1 - Books array:', this.books);
        console.log('Test 1 - Is array?', Array.isArray(this.books));
        console.log('Test 1 - Current length:', this.books ? this.books.length : 'undefined');
        
        // Test 2: Check if required DOM elements exist
        const requiredElements = {
            'content-modal': document.getElementById('content-modal'),
            'content-form': document.getElementById('content-form'),
            'content-type': document.getElementById('content-type'),
            'content-title': document.getElementById('content-title'),
            'content-description': document.getElementById('content-description'),
            'content-class': document.getElementById('content-class'),
            'content-subject': document.getElementById('content-subject'),
            'book-link': document.getElementById('book-link'),
            'books-grid': document.getElementById('books-grid')
        };
        
        console.log('Test 2 - DOM Elements:');
        Object.keys(requiredElements).forEach(key => {
            console.log(`  ${key}:`, requiredElements[key] ? '✓ Found' : '✗ Missing');
        });
        
        // Test 3: Try adding a test book programmatically
        console.log('Test 3 - Adding test book...');
        const testBookData = {
            title: `Test Book ${Date.now()}`,
            description: 'This is a test book created by the debug function',
            classLevel: 'SS1',
            subject: 'Mathematics',
            link: 'https://drive.google.com/file/d/test123'
        };
        
        console.log('Test book data:', testBookData);
        
        try {
            this.addBook(testBookData);
            console.log('✓ Test book added successfully');
        } catch (error) {
            console.error('✗ Error adding test book:', error);
        }
        
        // Test 4: Check localStorage
        console.log('Test 4 - LocalStorage:');
        const storedBooks = localStorage.getItem('brainwave_books');
        console.log('  Stored books:', storedBooks);
        
        // Test 5: Check if books are being rendered
        console.log('Test 5 - Checking books grid:');
        const booksGrid = document.getElementById('books-grid');
        if (booksGrid) {
            console.log('  Books grid innerHTML length:', booksGrid.innerHTML.length);
            console.log('  Books grid children count:', booksGrid.children.length);
        }
        
        console.log('=== TEST COMPLETE ===');
        
        // Show results in a toast
        const totalBooks = this.books ? this.books.length : 0;
        this.showToast(`Test complete! Total books: ${totalBooks}. Check console for details.`, 'info');
        
        return {
            booksArray: this.books,
            domElements: requiredElements,
            localStorage: storedBooks
        };
    }

    // Helper function to clear all books (for testing)
    clearAllBooks() {
        if (confirm('Are you sure you want to delete ALL books? This cannot be undone.')) {
            this.books = [];
            this.saveToStorage('books', this.books);
            this.renderBooks();
            this.updateContentCounts();
            this.showToast('All books cleared!', 'success');
            console.log('All books cleared from storage and display');
        }
    }

    // ========== USER PAGINATION ==========
    
    previousPage() {
        if (this.userCurrentPage > 1) {
            this.userCurrentPage--;
            this.updatePagination();
        }
    }

    nextPage() {
        const totalUsers = this.getTotalUsers();
        const totalPages = Math.ceil(totalUsers / this.usersPerPage);
        if (this.userCurrentPage < totalPages) {
            this.userCurrentPage++;
            this.updatePagination();
        }
    }

    goToPage(page) {
        const totalUsers = this.getTotalUsers();
        const totalPages = Math.ceil(totalUsers / this.usersPerPage);
        if (page >= 1 && page <= totalPages) {
            this.userCurrentPage = page;
            this.updatePagination();
        }
    }

    getTotalUsers() {
        // Get total from localStorage or default
        const users = this.loadFromStorage('users') || [];
        return users.length || 1234; // Default to 1234 if no users
    }

    updatePagination() {
        const totalUsers = this.getTotalUsers();
        const totalPages = Math.ceil(totalUsers / this.usersPerPage);
        const startIndex = (this.userCurrentPage - 1) * this.usersPerPage + 1;
        const endIndex = Math.min(this.userCurrentPage * this.usersPerPage, totalUsers);

        // Update pagination info
        const paginationInfo = document.getElementById('pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalUsers.toLocaleString()} users`;
        }

        // Update previous button
        const prevBtn = document.getElementById('prev-page-btn');
        if (prevBtn) {
            prevBtn.disabled = this.userCurrentPage === 1;
        }

        // Update next button
        const nextBtn = document.getElementById('next-page-btn');
        if (nextBtn) {
            nextBtn.disabled = this.userCurrentPage === totalPages;
        }

        // Update page numbers
        const pageNumbersContainer = document.getElementById('page-numbers');
        if (pageNumbersContainer) {
            let pageNumbers = '';
            
            // Always show first page
            if (this.userCurrentPage > 3) {
                pageNumbers += `<button class="pagination-btn" onclick="window.adminDashboard.goToPage(1)">1</button>`;
                if (this.userCurrentPage > 4) {
                    pageNumbers += `<button class="pagination-btn" disabled>...</button>`;
                }
            }

            // Show pages around current page
            for (let i = Math.max(1, this.userCurrentPage - 2); i <= Math.min(totalPages, this.userCurrentPage + 2); i++) {
                const activeClass = i === this.userCurrentPage ? ' active' : '';
                pageNumbers += `<button class="pagination-btn${activeClass}" onclick="window.adminDashboard.goToPage(${i})">${i}</button>`;
            }

            // Always show last page
            if (this.userCurrentPage < totalPages - 2) {
                if (this.userCurrentPage < totalPages - 3) {
                    pageNumbers += `<button class="pagination-btn" disabled>...</button>`;
                }
                pageNumbers += `<button class="pagination-btn" onclick="window.adminDashboard.goToPage(${totalPages})">${totalPages}</button>`;
            }

            pageNumbersContainer.innerHTML = pageNumbers;
        }
    }
}

// Force initialization function
function forceInitializeDashboard() {
    console.log('🔄 Force initializing dashboard...');
    try {
        window.adminDashboard = new AdminDashboard();
        console.log('✅ BrainWave Admin Dashboard initialized successfully');
        console.log('📊 Dashboard object:', window.adminDashboard);
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize dashboard:', error);
        console.error('📋 Error stack:', error.stack);
        return false;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    forceInitializeDashboard();
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('⏳ Document still loading, waiting for DOMContentLoaded...');
} else {
    console.log('✅ Document already loaded, initializing immediately...');
    if (!window.adminDashboard) {
        forceInitializeDashboard();
    } else {
        console.log('ℹ️ Dashboard already initialized');
    }
}

// Additional fallback with timeout
setTimeout(() => {
    if (!window.adminDashboard) {
        console.warn('⚠️ Dashboard not initialized after timeout, attempting force init...');
        forceInitializeDashboard();
    }
}, 1000);

// Make force init available globally for manual initialization
window.forceInitializeDashboard = forceInitializeDashboard;

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminDashboard;
}

// ========================================
// GLOBAL WRAPPER FUNCTIONS FOR CONTENT MANAGEMENT
// ========================================
// These functions ensure buttons work reliably by calling AdminDashboard methods

// Content Modal Functions
function openContentModal(type = 'book') {
    console.log('Global openContentModal called for:', type);
    if (window.adminDashboard && window.adminDashboard.openContentModal) {
        window.adminDashboard.openContentModal(type);
    } else {
        console.error('AdminDashboard not initialized');
        setTimeout(() => openContentModal(type), 100); // Retry after 100ms
    }
}

function closeContentModal() {
    console.log('Global closeContentModal called');
    if (window.adminDashboard && window.adminDashboard.closeContentModal) {
        window.adminDashboard.closeContentModal();
    } else {
        const modal = document.getElementById('content-modal');
        if (modal) modal.classList.remove('active');
    }
}

function updateContentFormFields() {
    console.log('Global updateContentFormFields called');
    if (window.adminDashboard && window.adminDashboard.updateContentFormFields) {
        window.adminDashboard.updateContentFormFields();
    }
}

function saveContentForm(event) {
    console.log('Global saveContentForm called');
    if (event) event.preventDefault();
    if (window.adminDashboard && window.adminDashboard.saveContent) {
        window.adminDashboard.saveContent(event);
    }
}

// Book Action Functions
function viewBook(id) {
    console.log('Global viewBook called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.viewBook) {
        window.adminDashboard.viewBook(id);
    } else {
        // Fallback: Try to open from localStorage
        const books = JSON.parse(localStorage.getItem('brainwave_books') || '[]');
        const book = books.find(b => b.id === id);
        if (book && book.link) {
            window.open(book.link, '_blank');
        } else {
            alert('Book link not available');
        }
    }
}

function editBook(id) {
    console.log('Global editBook called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.editBook) {
        window.adminDashboard.editBook(id);
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function deleteBook(id) {
    console.log('Global deleteBook called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.deleteBook) {
        window.adminDashboard.deleteBook(id);
    } else {
        // Fallback: Delete from localStorage
        const books = JSON.parse(localStorage.getItem('brainwave_books') || '[]');
        const book = books.find(b => b.id === id);
        if (book && confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
            const filtered = books.filter(b => b.id !== id);
            localStorage.setItem('brainwave_books', JSON.stringify(filtered));
            location.reload(); // Reload to update display
        }
    }
}

// Video Action Functions
function viewVideo(id) {
    console.log('Global viewVideo called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.viewVideo) {
        window.adminDashboard.viewVideo(id);
    } else {
        // Fallback: Try to open from localStorage
        const videos = JSON.parse(localStorage.getItem('brainwave_videos') || '[]');
        const video = videos.find(v => v.id === id);
        if (video && video.link) {
            window.open(video.link, '_blank');
        } else {
            alert('Video link not available');
        }
    }
}

function editVideo(id) {
    console.log('Global editVideo called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.editVideo) {
        window.adminDashboard.editVideo(id);
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function deleteVideo(id) {
    console.log('Global deleteVideo called for ID:', id);
    if (window.adminDashboard && window.adminDashboard.deleteVideo) {
        window.adminDashboard.deleteVideo(id);
    } else {
        // Fallback: Delete from localStorage
        const videos = JSON.parse(localStorage.getItem('brainwave_videos') || '[]');
        const video = videos.find(v => v.id === id);
        if (video && confirm(`Are you sure you want to delete "${video.title}"? This action cannot be undone.`)) {
            const filtered = videos.filter(v => v.id !== id);
            localStorage.setItem('brainwave_videos', JSON.stringify(filtered));
            location.reload(); // Reload to update display
        }
    }
}

// Assessment Action Functions
function viewAssessment(type, id) {
    console.log('Global viewAssessment called for type:', type, 'ID:', id);
    if (window.adminDashboard && window.adminDashboard.viewAssessment) {
        window.adminDashboard.viewAssessment(type, id);
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function editAssessment(type, id) {
    console.log('Global editAssessment called for type:', type, 'ID:', id);
    if (window.adminDashboard && window.adminDashboard.editAssessment) {
        window.adminDashboard.editAssessment(type, id);
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function deleteAssessment(type, id) {
    console.log('Global deleteAssessment called for type:', type, 'ID:', id);
    if (window.adminDashboard && window.adminDashboard.deleteAssessment) {
        window.adminDashboard.deleteAssessment(type, id);
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function openAssessmentModal(type) {
    console.log('🌐 Global openAssessmentModal called for:', type);
    console.log('🔍 Checking window.adminDashboard:', typeof window.adminDashboard);
    
    if (window.adminDashboard && typeof window.adminDashboard.openAssessmentModal === 'function') {
        console.log('✅ AdminDashboard found, calling method...');
        window.adminDashboard.openAssessmentModal(type);
    } else {
        console.warn('⚠️ AdminDashboard not initialized yet, retrying in 100ms...');
        setTimeout(() => {
            if (window.adminDashboard && typeof window.adminDashboard.openAssessmentModal === 'function') {
                console.log('✅ AdminDashboard found on retry, calling method...');
                window.adminDashboard.openAssessmentModal(type);
            } else {
                console.error('❌ AdminDashboard still not available after retry!');
                alert('Error: Dashboard not initialized. Please refresh the page.');
            }
        }, 100);
    }
}

function closeAssessmentModal() {
    console.log('Global closeAssessmentModal called');
    if (window.adminDashboard && window.adminDashboard.closeAssessmentModal) {
        window.adminDashboard.closeAssessmentModal();
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function saveAssessmentForm(event) {
    console.log('Global saveAssessmentForm called');
    if (window.adminDashboard && window.adminDashboard.saveAssessment) {
        window.adminDashboard.saveAssessment(event);
        return false; // Prevent default form submission
    } else {
        console.error('AdminDashboard not initialized');
        return false;
    }
}

function addQuestion() {
    console.log('Global addQuestion called');
    if (window.adminDashboard && window.adminDashboard.addQuestion) {
        window.adminDashboard.addQuestion();
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function updateAssessmentSubjects() {
    console.log('Global updateAssessmentSubjects called');
    if (window.adminDashboard && window.adminDashboard.updateAssessmentSubjects) {
        window.adminDashboard.updateAssessmentSubjects();
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function closeViewAssessmentModal() {
    console.log('Global closeViewAssessmentModal called');
    if (window.adminDashboard && window.adminDashboard.closeViewAssessmentModal) {
        window.adminDashboard.closeViewAssessmentModal();
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function closeQuestionModal() {
    console.log('Global closeQuestionModal called');
    if (window.adminDashboard && window.adminDashboard.closeQuestionModal) {
        window.adminDashboard.closeQuestionModal();
    } else {
        console.error('AdminDashboard not initialized');
    }
}

function saveQuestionForm(event) {
    console.log('Global saveQuestionForm called');
    if (window.adminDashboard && window.adminDashboard.saveQuestion) {
        window.adminDashboard.saveQuestion(event);
        return false; // Prevent default form submission
    } else {
        console.error('AdminDashboard not initialized');
        return false;
    }
}

function switchAssessmentTab(tab) {
    console.log('Global switchAssessmentTab called for:', tab);
    if (window.adminDashboard && window.adminDashboard.switchAssessmentTab) {
        window.adminDashboard.switchAssessmentTab(tab);
    } else {
        console.error('AdminDashboard not initialized, retrying...');
        setTimeout(() => switchAssessmentTab(tab), 100);
    }
}

// Tab Switching Function
function switchContentTab(tab) {
    console.log('Global switchContentTab called for:', tab);
    if (window.adminDashboard && window.adminDashboard.switchContentTab) {
        window.adminDashboard.switchContentTab(tab);
    } else {
        console.error('AdminDashboard not initialized, retrying...');
        setTimeout(() => switchContentTab(tab), 100);
    }
}

// Make functions available globally
window.openContentModal = openContentModal;
window.closeContentModal = closeContentModal;
window.updateContentFormFields = updateContentFormFields;
window.saveContentForm = saveContentForm;
window.viewBook = viewBook;
window.editBook = editBook;
window.deleteBook = deleteBook;
window.viewVideo = viewVideo;
window.editVideo = editVideo;
window.deleteVideo = deleteVideo;
window.switchContentTab = switchContentTab;

// Assessment management functions
window.viewAssessment = viewAssessment;
window.editAssessment = editAssessment;
window.deleteAssessment = deleteAssessment;
window.openAssessmentModal = openAssessmentModal;
window.closeAssessmentModal = closeAssessmentModal;
window.closeViewAssessmentModal = closeViewAssessmentModal;
window.saveAssessmentForm = saveAssessmentForm;
window.addQuestion = addQuestion;
window.closeQuestionModal = closeQuestionModal;
window.saveQuestionForm = saveQuestionForm;
window.updateAssessmentSubjects = updateAssessmentSubjects;
window.switchAssessmentTab = switchAssessmentTab;

console.log('Global content and assessment management functions initialized');