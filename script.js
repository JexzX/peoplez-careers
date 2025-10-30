// ===== CONFIGURATION =====
const CONFIG = {
    jobsPerPage: 3,
    animationDuration: 300,
    sortOptions: {
        newest: 'newest',
        oldest: 'oldest', 
        salaryHigh: 'salary_high',
        salaryLow: 'salary_low'
    }
};

// ===== STATE MANAGEMENT =====
let currentState = {
    activeFilter: 'all',
    currentSort: 'newest',
    currentPage: 1,
    totalPages: 1,
    allJobs: [],
    filteredJobs: [],
    displayedJobs: []
};

// ===== DOM ELEMENTS =====
const elements = {
    jobsGrid: document.getElementById('jobsGrid'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    jobModal: document.getElementById('jobModal'),
    modalJobDetails: document.getElementById('modalJobDetails'),
    themeToggle: document.getElementById('themeToggle'),
    sortSelect: document.getElementById('sort-select'),
    searchForm: document.getElementById('searchForm')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeEventListeners();
    initializeTheme();
    initializeJobData();
    showLoadingState(false);
}

function initializeEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });

    // Sort functionality
    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', handleSortChange);
    }

    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // Search form
    if (elements.searchForm) {
        elements.searchForm.addEventListener('submit', handleSearchSubmit);
    }

    // Modal close
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', handleOutsideModalClick);
    document.addEventListener('keydown', handleEscapeKey);

    // Job card clicks (delegated)
    if (elements.jobsGrid) {
        elements.jobsGrid.addEventListener('click', handleJobCardClick);
    }
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button
    if (elements.themeToggle) {
        elements.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ===== JOB DATA MANAGEMENT =====
function initializeJobData() {
    // Extract job data from existing PHP-rendered cards
    const jobCards = document.querySelectorAll('.job-card');
    currentState.allJobs = Array.from(jobCards).map(card => ({
        id: card.getAttribute('data-job-id'),
        element: card,
        type: card.getAttribute('data-job-type')
    }));
    
    currentState.filteredJobs = [...currentState.allJobs];
    updateJobCount();
}

// ===== FILTER FUNCTIONALITY =====
function handleFilterClick(event) {
    const filterValue = event.currentTarget.getAttribute('data-filter');
    
    // Update active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Apply filter
    applyFilter(filterValue);
}

function applyFilter(filterValue) {
    showLoadingState(true);
    
    setTimeout(() => {
        currentState.activeFilter = filterValue;
        
        if (filterValue === 'all') {
            currentState.filteredJobs = [...currentState.allJobs];
        } else {
            currentState.filteredJobs = currentState.allJobs.filter(job => 
                job.type === filterValue
            );
        }
        
        applySorting();
        updateJobCount();
        showLoadingState(false);
    }, CONFIG.animationDuration);
}

// ===== SORT FUNCTIONALITY =====
function handleSortChange(event) {
    currentState.currentSort = event.target.value;
    applySorting();
}

function applySorting() {
    const jobs = [...currentState.filteredJobs];
    
    jobs.sort((a, b) => {
        const cardA = a.element;
        const cardB = b.element;
        
        const aDate = cardA.querySelector('.new-badge') ? 1 : 0;
        const bDate = cardB.querySelector('.new-badge') ? 1 : 0;
        const aSalary = extractSalaryValue(cardA.querySelector('.salary').textContent);
        const bSalary = extractSalaryValue(cardB.querySelector('.salary').textContent);
        
        switch(currentState.currentSort) {
            case CONFIG.sortOptions.newest:
                return bDate - aDate;
            case CONFIG.sortOptions.oldest:
                return aDate - bDate;
            case CONFIG.sortOptions.salaryHigh:
                return bSalary - aSalary;
            case CONFIG.sortOptions.salaryLow:
                return aSalary - bSalary;
            default:
                return 0;
        }
    });
    
    displayJobs(jobs);
}

function extractSalaryValue(salaryText) {
    const match = salaryText.match(/₩([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
}

// ===== JOB DISPLAY =====
function displayJobs(jobs) {
    if (!elements.jobsGrid) return;
    
    // Hide all jobs first
    currentState.allJobs.forEach(job => {
        job.element.style.display = 'none';
        job.element.style.opacity = '0';
        job.element.style.transform = 'translateY(20px)';
    });
    
    // Show filtered jobs with animation
    jobs.forEach((job, index) => {
        job.element.style.display = 'block';
        
        setTimeout(() => {
            job.element.style.opacity = '1';
            job.element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    currentState.displayedJobs = jobs;
}

function updateJobCount() {
    const countElement = document.querySelector('.job-count');
    if (countElement) {
        countElement.textContent = `(${currentState.filteredJobs.length} jobs found)`;
    }
}

// ===== MODAL FUNCTIONALITY =====
function handleJobCardClick(event) {
    const jobCard = event.target.closest('.job-card');
    const viewDetailsBtn = event.target.closest('.view-details-btn');
    
    if (jobCard && !viewDetailsBtn) {
        const jobId = jobCard.getAttribute('data-job-id');
        openJobModal(jobId);
    } else if (viewDetailsBtn) {
        const jobCard = viewDetailsBtn.closest('.job-card');
        const jobId = jobCard.getAttribute('data-job-id');
        openJobModal(jobId);
    }
}

function openJobModal(jobId) {
    const jobData = getJobData(jobId);
    if (!jobData) return;
    
    displayJobDetails(jobData);
    elements.jobModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    const modalContent = elements.jobModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 50);
}

function closeModal() {
    const modalContent = elements.jobModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        elements.jobModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function handleOutsideModalClick(event) {
    if (event.target === elements.jobModal) {
        closeModal();
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape' && elements.jobModal.style.display === 'block') {
        closeModal();
    }
}

// ===== JOB DATA =====
function getJobData(jobId) {
    const jobDetailsData = {
        '1': {
            title: "Frontend Developer",
            company: "Naver Corporation",
            location: "Seoul, South Korea",
            type: "Full-time",
            salary: "₩50,000,000 - ₩70,000,000",
            description: "We are looking for a skilled Frontend Developer to join our web development team. You will be responsible for building responsive web applications using modern technologies and frameworks.",
            requirements: [
                "3+ years of experience in frontend development",
                "Proficiency in React, JavaScript, and CSS",
                "Experience with version control (Git)",
                "Strong understanding of web performance optimization",
                "Knowledge of modern build tools and workflows"
            ],
            benefits: [
                "Competitive salary and stock options",
                "Flexible working hours",
                "Health insurance and wellness programs",
                "Professional development budget",
                "Modern office in Gangnam district"
            ],
            tags: ["React", "JavaScript", "CSS", "Vue", "TypeScript"],
            application_url: "#apply"
        },
        '2': {
            title: "UX/UI Designer",
            company: "Kakao Entertainment",
            location: "Busan, South Korea", 
            type: "Full-time",
            salary: "₩45,000,000 - ₩60,000,000",
            description: "Join our design team to create amazing user experiences for millions of users. You will work on both mobile and web platforms, collaborating with product managers and developers.",
            requirements: [
                "Bachelor's degree in Design or related field",
                "Proficiency in Figma and Adobe Creative Suite",
                "Experience with user research and testing methodologies",
                "Portfolio demonstrating UI/UX design skills",
                "Understanding of design systems and component libraries"
            ],
            benefits: [
                "Creative and collaborative work environment",
                "Latest design tools and equipment",
                "Conference and workshop opportunities",
                "Comprehensive health coverage",
                "Remote work flexibility"
            ],
            tags: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"],
            application_url: "#apply"
        },
        '3': {
            title: "Backend Engineer",
            company: "Coupang",
            location: "Seoul, South Korea",
            type: "Remote", 
            salary: "₩60,000,000 - ₩80,000,000",
            description: "Looking for backend engineers to build scalable e-commerce solutions. You will work on high-traffic systems serving millions of customers across Korea.",
            requirements: [
                "5+ years of backend development experience",
                "Strong knowledge of Node.js or Python",
                "Experience with AWS cloud services and microservices",
                "Understanding of database design and optimization",
                "Knowledge of containerization and orchestration tools"
            ],
            benefits: [
                "Fully remote work options",
                "Competitive compensation package",
                "Stock ownership program",
                "Learning and development stipend",
                "Flexible paid time off"
            ],
            tags: ["Node.js", "Python", "AWS", "MySQL", "Redis", "Docker"],
            application_url: "#apply"
        },
        '4': {
            title: "Data Scientist",
            company: "Samsung Research",
            location: "Suwon, South Korea",
            type: "Full-time",
            salary: "₩65,000,000 - ₩85,000,000", 
            description: "Join our AI research team to work on cutting-edge machine learning projects. You will develop algorithms for various Samsung products and services.",
            requirements: [
                "PhD or Master's in Computer Science or related field",
                "Experience with machine learning frameworks (TensorFlow, PyTorch)",
                "Strong programming skills in Python and SQL",
                "Knowledge of statistical analysis and data visualization",
                "Experience with big data technologies"
            ],
            benefits: [
                "State-of-the-art research facilities",
                "Collaboration with top researchers",
                "Patent and publication support",
                "Comprehensive benefits package",
                "Relocation assistance for international hires"
            ],
            tags: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL", "Big Data"],
            application_url: "#apply"
        },
        '5': {
            title: "Product Manager", 
            company: "LG Electronics",
            location: "Seoul, South Korea",
            type: "Full-time",
            salary: "₩70,000,000 - ₩90,000,000",
            description: "Lead product development for innovative consumer electronics. You will define product strategy and work with cross-functional teams to deliver amazing products.",
            requirements: [
                "7+ years of product management experience",
                "Experience in consumer electronics industry",
                "Strong leadership and communication skills",
                "MBA or related advanced degree preferred",
                "Proven track record of successful product launches"
            ],
            benefits: [
                "Leadership development programs",
                "Executive benefits package",
                "Global career opportunities",
                "Performance bonuses",
                "Company vehicle allowance"
            ],
            tags: ["Product Strategy", "Agile", "Market Research", "Team Leadership", "Roadmapping"],
            application_url: "#apply"
        },
        '6': {
            title: "Mobile Developer",
            company: "Line Corporation",
            location: "Seoul, South Korea",
            type: "Contract",
            salary: "₩55,000,000 - ₩75,000,000",
            description: "Develop innovative mobile applications for one of Asia's most popular messaging platforms. Work on features used by millions of daily active users.",
            requirements: [
                "4+ years of mobile development experience",
                "Proficiency in React Native or Flutter",
                "Experience with iOS/Android native development",
                "Knowledge of mobile app architecture patterns",
                "Understanding of mobile performance optimization"
            ],
            benefits: [
                "Contract-to-hire opportunities",
                "Project completion bonuses",
                "Flexible schedule",
                "Tech conference attendance",
                "Modern development equipment"
            ],
            tags: ["React Native", "Flutter", "iOS", "Android", "Mobile"],
            application_url: "#apply"
        }
    };
    
    return jobDetailsData[jobId];
}

function displayJobDetails(jobData) {
    if (!elements.modalJobDetails) return;
    
    elements.modalJobDetails.innerHTML = `
        <h2 class="modal-job-title">${jobData.title}</h2>
        <p class="modal-company">${jobData.company}</p>
        
        <div class="modal-details-grid">
            <div class="modal-detail">
                <strong>📍 Location</strong>
                <span>${jobData.location}</span>
            </div>
            <div class="modal-detail">
                <strong>💼 Job Type</strong>
                <span>${jobData.type}</span>
            </div>
            <div class="modal-detail">
                <strong>💰 Salary</strong>
                <span>${jobData.salary}</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>Job Description</h3>
            <p>${jobData.description}</p>
        </div>
        
        <div class="modal-section">
            <h3>Requirements</h3>
            <ul class="modal-list">
                ${jobData.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Benefits</h3>
            <ul class="modal-list">
                ${jobData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Skills & Technologies</h3>
            <div class="modal-tags">
                ${jobData.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-actions">
            <a href="${jobData.application_url}" class="apply-btn">Apply Now</a>
            <button class="save-btn" onclick="saveJob('${jobData.title}')">Save Job</button>
        </div>
    `;
}

// ===== UTILITY FUNCTIONS =====
function showLoadingState(show) {
    if (!elements.loadingIndicator || !elements.jobsGrid) return;
    
    if (show) {
        elements.loadingIndicator.style.display = 'block';
        elements.jobsGrid.style.opacity = '0.5';
    } else {
        elements.loadingIndicator.style.display = 'none';
        elements.jobsGrid.style.opacity = '1';
    }
}

function handleSearchSubmit(event) {
    const searchInput = event.target.querySelector('input[name="search"]');
    if (searchInput && searchInput.value.trim() === '') {
        event.preventDefault();
        // Add shake animation to input
        searchInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            searchInput.style.animation = '';
        }, 500);
        searchInput.focus();
    }
}

function saveJob(jobTitle) {
    // In a real app, this would save to localStorage or send to a backend
    alert(`Job "${jobTitle}" saved to your favorites!`);
    
    // Add visual feedback
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✓ Saved!';
    saveBtn.style.background = '#10b981';
    saveBtn.style.color = 'white';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
        saveBtn.style.color = '';
    }, 2000);
}

// ===== ANIMATION UTILITIES =====
// Add shake animation for form validation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Export for global access (if needed)
window.JobBoard = {
    applyFilter,
    applySorting,
    openJobModal,
    closeModal,
    toggleTheme
};