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

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeJobFilters();
    initializeSortFunctionality();
    
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
    
    // Existing job card click effect
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
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