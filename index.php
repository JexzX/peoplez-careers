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
            <p>&copy; 2024 Peoplez Careers. All rights reserved.</p>
        </div>
    </footer>
    <script src="script.js"></script>
</body>

</html>