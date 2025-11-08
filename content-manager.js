// Content Management System for Books & Videos
class ContentManager {
    constructor() {
        this.books = this.loadFromStorage('books') || [];
        this.videos = this.loadFromStorage('videos') || [];
        this.currentEditId = null;
        this.currentEditType = null;
        this.init();
    }

    init() {
        this.renderBooks();
        this.renderVideos();
        this.setupEventListeners();
    }

    // Local Storage Management
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

    // Event Listeners
    setupEventListeners() {
        // Form submission
        document.getElementById('content-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContent();
        });

        // Search filters
        document.getElementById('book-search').addEventListener('input', (e) => {
            this.filterContent('books', e.target.value);
        });

        document.getElementById('video-search').addEventListener('input', (e) => {
            this.filterContent('videos', e.target.value);
        });

        // Class filters
        document.getElementById('book-class-filter').addEventListener('change', () => {
            this.applyFilters('books');
        });

        document.getElementById('video-class-filter').addEventListener('change', () => {
            this.applyFilters('videos');
        });

        // Subject filters
        document.getElementById('book-subject-filter').addEventListener('change', () => {
            this.applyFilters('books');
        });

        document.getElementById('video-subject-filter').addEventListener('change', () => {
            this.applyFilters('videos');
        });

        // Modal close on outside click
        document.getElementById('content-modal').addEventListener('click', (e) => {
            if (e.target.id === 'content-modal') {
                this.closeModal();
            }
        });
    }

    // CRUD Operations
    addBook(bookData) {
        const book = {
            id: Date.now(),
            ...bookData,
            createdAt: new Date().toISOString()
        };
        this.books.push(book);
        this.saveToStorage('books', this.books);
        this.renderBooks();
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
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            this.books = this.books.filter(b => b.id !== id);
            this.saveToStorage('books', this.books);
            this.renderBooks();
            this.showToast('Book deleted successfully!', 'success');
        }
    }

    deleteVideo(id) {
        if (confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
            this.videos = this.videos.filter(v => v.id !== id);
            this.saveToStorage('videos', this.videos);
            this.renderVideos();
            this.showToast('Video deleted successfully!', 'success');
        }
    }

    // Rendering Functions
    renderBooks() {
        const grid = document.getElementById('books-grid');
        
        if (this.books.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-book"></i>
                    <h3>No books yet</h3>
                    <p>Click "Add Book" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.books.map(book => this.createBookCard(book)).join('');
    }

    renderVideos() {
        const grid = document.getElementById('videos-grid');
        
        if (this.videos.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-video"></i>
                    <h3>No videos yet</h3>
                    <p>Click "Add Video" to get started</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.videos.map(video => this.createVideoCard(video)).join('');
    }

    createBookCard(book) {
        return `
            <div class="content-card" data-id="${book.id}" data-class="${book.classLevel}" data-subject="${book.subject}">
                <div class="card-header">
                    <div class="card-icon book-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="card-title">${book.title}</div>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span class="meta-tag class-level">${book.classLevel}</span>
                        <span class="meta-tag">${book.subject}</span>
                        <span class="meta-tag">PDF</span>
                    </div>
                    <div class="card-description">
                        ${book.description}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-view btn-sm" onclick="contentManager.viewBook(${book.id})">
                            <i class="fas fa-eye"></i>
                            View
                        </button>
                        <button class="btn btn-edit btn-sm" onclick="contentManager.editBook(${book.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn btn-delete btn-sm" onclick="contentManager.deleteBook(${book.id})">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createVideoCard(video) {
        return `
            <div class="content-card" data-id="${video.id}" data-class="${video.classLevel}" data-subject="${video.subject}">
                <div class="card-header">
                    <div class="card-icon video-icon">
                        <i class="fas fa-video"></i>
                    </div>
                    <div class="card-title">${video.title}</div>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span class="meta-tag class-level">${video.classLevel}</span>
                        <span class="meta-tag">${video.subject}</span>
                        <span class="meta-tag">${video.duration || 'N/A'}</span>
                    </div>
                    <div class="card-description">
                        ${video.description}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-view btn-sm" onclick="contentManager.viewVideo(${video.id})">
                            <i class="fas fa-play"></i>
                            Watch
                        </button>
                        <button class="btn btn-edit btn-sm" onclick="contentManager.editVideo(${video.id})">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn btn-delete btn-sm" onclick="contentManager.deleteVideo(${video.id})">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Modal Functions
    openAddModal(type = 'book') {
        this.currentEditId = null;
        this.currentEditType = null;
        document.getElementById('content-modal').classList.add('active');
        document.getElementById('modal-title').textContent = `Add ${type === 'book' ? 'Book' : 'Video'}`;
        document.getElementById('content-type').value = type;
        document.getElementById('content-form').reset();
        this.updateFormFields();
    }

    closeModal() {
        document.getElementById('content-modal').classList.remove('active');
        document.getElementById('content-form').reset();
        this.currentEditId = null;
        this.currentEditType = null;
    }

    updateFormFields() {
        const type = document.getElementById('content-type').value;
        const bookFields = document.getElementById('book-fields');
        const videoFields = document.getElementById('video-fields');
        const videoDurationField = document.getElementById('video-duration-field');
        
        if (type === 'book') {
            bookFields.style.display = 'block';
            videoFields.style.display = 'none';
            if (videoDurationField) videoDurationField.style.display = 'none';
            document.getElementById('book-link').required = true;
            document.getElementById('video-link').required = false;
        } else {
            bookFields.style.display = 'none';
            videoFields.style.display = 'block';
            if (videoDurationField) videoDurationField.style.display = 'block';
            document.getElementById('book-link').required = false;
            document.getElementById('video-link').required = true;
        }
    }

    saveContent() {
        const type = document.getElementById('content-type').value;
        const title = document.getElementById('content-title').value;
        const description = document.getElementById('content-description').value;
        const classLevel = document.getElementById('content-class').value;
        const subject = document.getElementById('content-subject').value;

        if (type === 'book') {
            const link = document.getElementById('book-link').value;
            const bookData = { title, description, classLevel, subject, link };
            
            if (this.currentEditId && this.currentEditType === 'book') {
                this.updateBook(this.currentEditId, bookData);
            } else {
                this.addBook(bookData);
            }
        } else {
            const link = document.getElementById('video-link').value;
            const duration = document.getElementById('video-duration')?.value || '';
            const videoData = { title, description, classLevel, subject, link, duration };
            
            if (this.currentEditId && this.currentEditType === 'video') {
                this.updateVideo(this.currentEditId, videoData);
            } else {
                this.addVideo(videoData);
            }
        }

        this.closeModal();
    }

    // Edit Functions
    editBook(id) {
        const book = this.books.find(b => b.id === id);
        if (!book) return;

        this.currentEditId = id;
        this.currentEditType = 'book';
        
        document.getElementById('content-modal').classList.add('active');
        document.getElementById('modal-title').textContent = 'Edit Book';
        document.getElementById('content-type').value = 'book';
        document.getElementById('content-title').value = book.title;
        document.getElementById('content-description').value = book.description;
        document.getElementById('content-class').value = book.classLevel;
        document.getElementById('content-subject').value = book.subject;
        document.getElementById('book-link').value = book.link;
        
        this.updateFormFields();
    }

    editVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (!video) return;

        this.currentEditId = id;
        this.currentEditType = 'video';
        
        document.getElementById('content-modal').classList.add('active');
        document.getElementById('modal-title').textContent = 'Edit Video';
        document.getElementById('content-type').value = 'video';
        document.getElementById('content-title').value = video.title;
        document.getElementById('content-description').value = video.description;
        document.getElementById('content-class').value = video.classLevel;
        document.getElementById('content-subject').value = video.subject;
        document.getElementById('video-link').value = video.link;
        
        this.updateFormFields();
    }

    // View Functions
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

    // Filter Functions
    filterContent(type, searchTerm) {
        this.applyFilters(type);
    }

    applyFilters(type) {
        const searchTerm = document.getElementById(`${type === 'books' ? 'book' : 'video'}-search`).value.toLowerCase();
        const classFilter = document.getElementById(`${type === 'books' ? 'book' : 'video'}-class-filter`).value;
        const subjectFilter = document.getElementById(`${type === 'books' ? 'book' : 'video'}-subject-filter`).value;

        const cards = document.querySelectorAll(`#${type}-grid .content-card`);
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            const cardClass = card.dataset.class;
            const cardSubject = card.dataset.subject;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesClass = !classFilter || cardClass === classFilter;
            const matchesSubject = !subjectFilter || cardSubject === subjectFilter;

            if (matchesSearch && matchesClass && matchesSubject) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Toast Notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Initialize
let contentManager;
document.addEventListener('DOMContentLoaded', () => {
    contentManager = new ContentManager();
    console.log('Content Management System initialized');
});

// Global functions for HTML onclick handlers
function openAddModal(type) {
    contentManager.openAddModal(type);
}

function closeModal() {
    contentManager.closeModal();
}

function updateFormFields() {
    contentManager.updateFormFields();
}
