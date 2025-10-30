// Job Filter Functionality
function initializeJobFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    const jobCountElement = document.querySelector('.job-count');
    
    function updateJobCount(visibleCount) {
        if (jobCountElement) {
            jobCountElement.textContent = `(${visibleCount} jobs)`;
        }
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            // Filter job cards
            jobCards.forEach(card => {
                const jobType = card.querySelector('.job-type').textContent;
                
                if (filterValue === 'all' || jobType === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update job counter
            updateJobCount(visibleCount);
        });
    });
    
    // Initialize with total count
    updateJobCount(jobCards.length);
}

// Sort Functionality
function initializeSortFunctionality() {
    const sortSelect = document.getElementById('sort-select');
    const jobCardsContainer = document.querySelector('.jobs-grid');
    
    if (sortSelect && jobCardsContainer) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const jobCards = Array.from(document.querySelectorAll('.job-card'));
            
            // Add fade out animation
            jobCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            // Sort after animation
            setTimeout(() => {
                jobCards.sort((a, b) => {
                    const aTitle = a.querySelector('.job-title').textContent;
                    const bTitle = b.querySelector('.job-title').textContent;
                    const aDate = a.querySelector('.new-badge') ? 1 : 0;
                    const bDate = b.querySelector('.new-badge') ? 1 : 0;
                    const aSalary = extractSalaryValue(a.querySelector('.salary').textContent);
                    const bSalary = extractSalaryValue(b.querySelector('.salary').textContent);
                    
                    switch(sortValue) {
                        case 'newest':
                            return bDate - aDate;
                        case 'oldest':
                            return aDate - bDate;
                        case 'salary_high':
                            return bSalary - aSalary;
                        case 'salary_low':
                            return aSalary - bSalary;
                        default:
                            return 0;
                    }
                });
                
                // Clear container and append sorted cards with animation
                jobCardsContainer.innerHTML = '';
                jobCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    jobCardsContainer.appendChild(card);
                    
                    // Staggered fade in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 300);
        });
    }
}

// Helper function to extract salary value
function extractSalaryValue(salaryText) {
    // Extract first number from salary string (e.g., "₩50,000,000 - ₩70,000,000" -> 50000000)
    const match = salaryText.match(/₩([\d,]+)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
}

// Modal Functionality
function initializeModalFunctionality() {
    const modal = document.getElementById('jobModal');
    const closeModal = document.querySelector('.close-modal');
    const modalJobDetails = document.getElementById('modalJobDetails');
    const jobCards = document.querySelectorAll('.job-card');

    // Job data for modal (you can expand this with more details)
    const jobDetailsData = {
        1: {
            title: "Frontend Developer",
            company: "Naver Corporation",
            location: "Seoul, South Korea",
            type: "Full-time",
            salary: "₩50,000,000 - ₩70,000,000",
            description: "We are looking for a skilled Frontend Developer to join our web development team. You will be responsible for building responsive web applications using modern technologies.",
            requirements: [
                "3+ years of experience in frontend development",
                "Proficiency in React, JavaScript, and CSS",
                "Experience with version control (Git)",
                "Strong understanding of web performance optimization"
            ],
            tags: ["React", "JavaScript", "CSS", "Vue", "HTML5", "SASS"]
        },
        2: {
            title: "UX/UI Designer",
            company: "Kakao Entertainment",
            location: "Busan, South Korea", 
            type: "Full-time",
            salary: "₩45,000,000 - ₩60,000,000",
            description: "Join our design team to create amazing user experiences for millions of users. You will work on both mobile and web platforms.",
            requirements: [
                "Bachelor's degree in Design or related field",
                "Proficiency in Figma and Adobe Creative Suite",
                "Experience with user research and testing",
                "Portfolio demonstrating UI/UX design skills"
            ],
            tags: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"]
        },
        3: {
            title: "Backend Engineer",
            company: "Coupang",
            location: "Seoul, South Korea",
            type: "Remote", 
            salary: "₩60,000,000 - ₩80,000,000",
            description: "Looking for backend engineers to build scalable e-commerce solutions. You will work on high-traffic systems serving millions of customers.",
            requirements: [
                "5+ years of backend development experience",
                "Strong knowledge of Node.js or Python",
                "Experience with AWS cloud services",
                "Understanding of microservices architecture"
            ],
            tags: ["Node.js", "Python", "AWS", "MySQL", "Redis", "Docker"]
        },
        4: {
            title: "Data Scientist",
            company: "Samsung Research",
            location: "Suwon, South Korea",
            type: "Full-time",
            salary: "₩65,000,000 - ₩85,000,000", 
            description: "Join our AI research team to work on cutting-edge machine learning projects. You will develop algorithms for various Samsung products.",
            requirements: [
                "PhD or Master's in Computer Science or related field",
                "Experience with machine learning frameworks",
                "Strong programming skills in Python",
                "Knowledge of statistical analysis and data visualization"
            ],
            tags: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"]
        },
        5: {
            title: "Product Manager", 
            company: "LG Electronics",
            location: "Seoul, South Korea",
            type: "Full-time",
            salary: "₩70,000,000 - ₩90,000,000",
            description: "Lead product development for innovative consumer electronics. You will define product strategy and work with cross-functional teams.",
            requirements: [
                "7+ years of product management experience",
                "Experience in consumer electronics industry",
                "Strong leadership and communication skills",
                "MBA or related advanced degree preferred"
            ],
            tags: ["Product Strategy", "Agile", "Market Research", "Team Leadership", "Roadmapping"]
        }
    };

    // Open modal when job card is clicked
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            const jobData = jobDetailsData[jobId];
            
            if (jobData) {
                displayJobDetails(jobData);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Display job details in modal
    function displayJobDetails(jobData) {
        modalJobDetails.innerHTML = `
            <h2 class="modal-job-title">${jobData.title}</h2>
            <p class="modal-company">${jobData.company}</p>
            
            <div class="modal-detail"><strong>📍 Location:</strong> ${jobData.location}</div>
            <div class="modal-detail"><strong>💼 Type:</strong> ${jobData.type}</div>
            <div class="modal-detail"><strong>💰 Salary:</strong> ${jobData.salary}</div>
            
            <div class="modal-description">
                <h3>Job Description</h3>
                <p>${jobData.description}</p>
            </div>
            
            <div class="modal-description">
                <h3>Requirements</h3>
                <ul>
                    ${jobData.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-tags">
                ${jobData.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
            </div>
        `;
    }
}

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeJobFilters();
    initializeSortFunctionality();
    initializeModalFunctionality();
    
    // Existing smooth scroll code
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Remove the old alert click event since we now have modal
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        // Remove the old alert event listener
        card.removeEventListener('click', function() {
            alert('Job details feature coming soon! 🚀');
        });
    });
    
    // Existing search form enhancement
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="search"]');
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                alert('Please enter a search term');
                searchInput.focus();
            }
        });
    }
});