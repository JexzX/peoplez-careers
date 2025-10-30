<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Peoplez Careers - Find Jobs in Korea</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header class="header">
        <div class="container">
            <h1 class="logo">Peoplez Careers</h1>
            <p class="tagline">Connecting Talent with Korean Companies</p>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <section class="hero">
                <h2>Find Your Dream Job in Korea</h2>
                <p>Discover opportunities with top Korean companies</p>
            </section>
        </div>
    </main>

    <!-- Search Section -->
    <section class="search-section">
        <div class="container">
            <div class="search-box">
                <form method="GET" action="" class="search-form">
                    <input type="text" name="search" placeholder="Search jobs by title, company, or keyword..."
                        class="search-input"
                        value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
                    <button type="submit" class="search-btn">Search</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
        <div class="container">
            <div class="filter-buttons">
                <button type="button" class="filter-btn active" data-filter="all">All Jobs</button>
                <button type="button" class="filter-btn" data-filter="Full-time">Full-time</button>
                <button type="button" class="filter-btn" data-filter="Remote">Remote</button>
            </div>
        </div>
    </section>

    <!-- Sort Section -->
    <section class="sort-section">
        <div class="container">
            <div class="sort-options">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select" name="sort" class="sort-select">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="salary_high">Salary: High to Low</option>
                    <option value="salary_low">Salary: Low to High</option>
                </select>
            </div>
        </div>
    </section>

    <!-- Search Results Info -->
    <div class="container">
        <?php include 'jobs-data.php'; ?>
        <?php if (!empty($search_keyword)): ?>
        <div class="search-results-info">
            <p>Showing <?php echo count($jobs); ?> results for:
                "<strong><?php echo htmlspecialchars($search_keyword); ?></strong>"</p>
            <a href="?" class="clear-search">Clear search</a>
        </div>
        <?php endif; ?>
    </div>

    <!-- Job Listings Section -->
    <section class="job-listings">
        <div class="container">
            <h2 class="section-title">Available Positions <span class="job-count">(<?php echo count($jobs); ?>
                    jobs)</span></h2>
            <div class="jobs-grid">
                <?php if (count($paginated_jobs) > 0): ?>
                <?php foreach ($paginated_jobs as $job): ?>
                <div class="job-card">
                    <h3 class="job-title"><?php echo $job['title']; ?>
                        <?php 
                        // Add "NEW" badge for jobs posted in last 3 days
                        $postDate = new DateTime($job['posted_date']);
                        $today = new DateTime();
                        $interval = $today->diff($postDate)->days;
                        if ($interval <= 3): ?>
                        <span class="new-badge">NEW</span>
                        <?php endif; ?>
                    </h3>
                    <p class="company"><?php echo $job['company']; ?></p>
                    <p class="location">📍 <?php echo $job['location']; ?></p>
                    <p class="salary">💼 <?php echo $job['salary']; ?></p>
                    <span class="job-type"><?php echo $job['type']; ?></span>
                    <div class="job-tags">
                        <?php foreach ($job['tags'] as $tag): ?>
                        <span class="tag"><?php echo $tag; ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php endforeach; ?>
                <?php else: ?>
                <div class="no-results">
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search terms or <a href="?" class="clear-search">browse all jobs</a></p>
                </div>
                <?php endif; ?>
            </div>

            <!-- Pagination Controls -->
            <?php if ($total_pages > 1): ?>
            <div class="pagination">
                <?php if ($current_page > 1): ?>
                <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $current_page - 1])); ?>"
                    class="pagination-btn">Previous</a>
                <?php endif; ?>

                <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <?php if ($i == $current_page): ?>
                <span class="pagination-page active"><?php echo $i; ?></span>
                <?php else: ?>
                <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $i])); ?>"
                    class="pagination-page"><?php echo $i; ?></a>
                <?php endif; ?>
                <?php endfor; ?>

                <?php if ($current_page < $total_pages): ?>
                <a href="?<?php echo http_build_query(array_merge($_GET, ['page' => $current_page + 1])); ?>"
                    class="pagination-btn">Next</a>
                <?php endif; ?>
            </div>
            <?php endif; ?>
        </div>
    </section>

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