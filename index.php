<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Peoplez Careers - Find Your Dream Job in Korea</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">Peoplez Careers</h1>
                <p class="tagline">Connecting Talent with Korean Companies</p>
                <button id="themeToggle" class="theme-toggle">🌙</button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h2 class="hero-title">Find Your Dream Job in Korea</h2>
                <p class="hero-subtitle">Discover opportunities with top Korean companies</p>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Search Section -->
            <section class="search-section">
                <div class="search-box">
                    <form method="GET" action="" class="search-form" id="searchForm">
                        <div class="search-input-group">
                            <input type="text" name="search" placeholder="Search jobs by title, company, or keyword..."
                                class="search-input"
                                value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
                            <button type="submit" class="search-btn">
                                <span class="search-icon">🔍</span>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <!-- Controls Section -->
            <section class="controls-section">
                <div class="controls-grid">
                    <!-- Filter Buttons -->
                    <div class="filter-group">
                        <label>Filter by Type:</label>
                        <div class="filter-buttons">
                            <button type="button" class="filter-btn active" data-filter="all">All Jobs</button>
                            <button type="button" class="filter-btn" data-filter="Full-time">Full-time</button>
                            <button type="button" class="filter-btn" data-filter="Remote">Remote</button>
                            <button type="button" class="filter-btn" data-filter="Contract">Contract</button>
                        </div>
                    </div>

                    <!-- Sort Dropdown -->
                    <div class="sort-group">
                        <label for="sort-select">Sort by:</label>
                        <select id="sort-select" class="sort-select">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="salary_high">Salary: High to Low</option>
                            <option value="salary_low">Salary: Low to High</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Search Results Info -->
            <?php include 'jobs-data.php'; ?>
            <?php if (!empty($search_keyword)): ?>
            <div class="search-results-info">
                <p>Showing <?php echo count($jobs); ?> results for:
                    "<strong><?php echo htmlspecialchars($search_keyword); ?></strong>"</p>
                <a href="?" class="clear-search">Clear search</a>
            </div>
            <?php endif; ?>

            <!-- Job Listings -->
            <section class="job-listings">
                <div class="section-header">
                    <h2 class="section-title">Available Positions</h2>
                    <span class="job-count">(<?php echo count($jobs); ?> jobs found)</span>
                </div>

                <!-- Loading State -->
                <div id="loadingIndicator" class="loading-indicator" style="display: none;">
                    <div class="loading-spinner"></div>
                    <p>Loading jobs...</p>
                </div>

                <!-- Jobs Grid -->
                <div class="jobs-grid" id="jobsGrid">
                    <?php if (count($paginated_jobs) > 0): ?>
                    <?php foreach ($paginated_jobs as $job): ?>
                    <div class="job-card" data-job-id="<?php echo $job['id']; ?>"
                        data-job-type="<?php echo $job['type']; ?>">
                        <div class="job-card-header">
                            <h3 class="job-title"><?php echo $job['title']; ?></h3>
                            <?php 
                                $postDate = new DateTime($job['posted_date']);
                                $today = new DateTime();
                                $interval = $today->diff($postDate)->days;
                                if ($interval <= 3): ?>
                            <span class="new-badge">NEW</span>
                            <?php endif; ?>
                        </div>

                        <p class="company"><?php echo $job['company']; ?></p>

                        <div class="job-meta">
                            <span class="location">📍 <?php echo $job['location']; ?></span>
                            <span class="salary">💰 <?php echo $job['salary']; ?></span>
                        </div>

                        <span
                            class="job-type <?php echo strtolower($job['type']); ?>"><?php echo $job['type']; ?></span>

                        <div class="job-tags">
                            <?php foreach ($job['tags'] as $tag): ?>
                            <span class="tag"><?php echo $tag; ?></span>
                            <?php endforeach; ?>
                        </div>

                        <button class="view-details-btn">View Details</button>
                    </div>
                    <?php endforeach; ?>
                    <?php else: ?>
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>No jobs found</h3>
                        <p>Try adjusting your search terms or <a href="?" class="clear-search">browse all jobs</a></p>
                    </div>
                    <?php endif; ?>
                </div>

                <!-- Pagination -->
                <?php if ($total_pages > 1): ?>
                <div class="pagination">
                    <?php if ($current_page > 1): ?>
                    <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $current_page - 1])); ?>"
                        class="pagination-btn prev">← Previous</a>
                    <?php endif; ?>

                    <div class="pagination-pages">
                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                        <?php if ($i == $current_page): ?>
                        <span class="pagination-page active"><?php echo $i; ?></span>
                        <?php else: ?>
                        <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $i])); ?>"
                            class="pagination-page"><?php echo $i; ?></a>
                        <?php endif; ?>
                        <?php endfor; ?>
                    </div>

                    <?php if ($current_page < $total_pages): ?>
                    <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $current_page + 1])); ?>"
                        class="pagination-btn next">Next →</a>
                    <?php endif; ?>
                </div>
                <?php endif; ?>
            </section>
        </div>
    </main>

    <!-- Job Details Modal -->
    <div id="jobModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div id="modalJobDetails">
                <!-- Job details loaded by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Peoplez Careers</h3>
                    <p>Connecting talented professionals with amazing Korean companies since 2024.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <a href="#">Home</a>
                    <a href="#">Browse Jobs</a>
                    <a href="#">For Employers</a>
                    <a href="#">Contact Us</a>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>📍 Seoul, South Korea</p>
                    <p>📧 hello@peoplezcareers.com</p>
                    <p>📞 +82 2-123-4567</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Peoplez Careers. All rights reserved. | Built with 💙 in Seoul</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>