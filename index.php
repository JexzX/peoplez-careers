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

    <!-- Job Listings Section -->
    <section class="job-listings">
        <div class="container">
            <h2 class="section-title">Available Positions</h2>
            <div class="jobs-grid">
                <?php include 'jobs-data.php'; ?>
                <?php foreach ($jobs as $job): ?>
                <div class="job-card">
                    <h3 class="job-title"><?php echo $job['title']; ?></h3>
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
            </div>
        </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
        <div class="container">
            <div class="search-box">
                <form method="GET" action="" class="search-form">
                    <input type="text" name="search" placeholder="Search jobs by title, company, or keyword..."
                        class="search-input">
                    <button type="submit" class="search-btn">Search</button>
                </form>
            </div>
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