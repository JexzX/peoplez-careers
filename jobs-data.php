<?php
// Search functionality
$search_keyword = '';
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search_keyword = strtolower(trim($_GET['search']));
}

// Sample jobs data - Korean companies
$all_jobs = [
    [
        'id' => 1,
        'title' => 'Frontend Developer',
        'company' => 'Naver Corporation', 
        'location' => 'Seoul, South Korea',
        'type' => 'Full-time',
        'salary' => '₩50,000,000 - ₩70,000,000',
        'description' => 'We are looking for a skilled Frontend Developer to join our web development team.',
        'tags' => ['React', 'JavaScript', 'CSS', 'Vue'],
        'posted_date' => '2024-01-28'
    ],
    [
        'id' => 2,
        'title' => 'UX/UI Designer',
        'company' => 'Kakao Entertainment',
        'location' => 'Busan, South Korea', 
        'type' => 'Full-time',
        'salary' => '₩45,000,000 - ₩60,000,000',
        'description' => 'Join our design team to create amazing user experiences for millions of users.',
        'tags' => ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
        'posted_date' => '2024-01-29'
    ],
    [
        'id' => 3,
        'title' => 'Backend Engineer',
        'company' => 'Coupang',
        'location' => 'Seoul, South Korea',
        'type' => 'Remote', 
        'salary' => '₩60,000,000 - ₩80,000,000',
        'description' => 'Looking for backend engineers to build scalable e-commerce solutions.',
        'tags' => ['Node.js', 'Python', 'AWS', 'MySQL'],
        'posted_date' => '2024-01-27'
    ],
    [
        'id' => 4,
        'title' => 'Data Scientist',
        'company' => 'Samsung Research',
        'location' => 'Suwon, South Korea',
        'type' => 'Full-time',
        'salary' => '₩65,000,000 - ₩85,000,000',
        'description' => 'Join our AI research team to work on cutting-edge machine learning projects.',
        'tags' => ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
        'posted_date' => '2024-01-20'
    ],
    [
        'id' => 5,
        'title' => 'Product Manager',
        'company' => 'LG Electronics',
        'location' => 'Seoul, South Korea',
        'type' => 'Full-time',
        'salary' => '₩70,000,000 - ₩90,000,000',
        'description' => 'Lead product development for innovative consumer electronics.',
        'tags' => ['Product Strategy', 'Agile', 'Market Research', 'Team Leadership'],
        'posted_date' => '2024-01-18'
    ]
];

// Filter jobs based on search
$jobs = $all_jobs;
if (!empty($search_keyword)) {
    $jobs = array_filter($all_jobs, function($job) use ($search_keyword) {
        $search_in_title = stripos($job['title'], $search_keyword) !== false;
        $search_in_company = stripos($job['company'], $search_keyword) !== false;
        $search_in_tags = false;
        
        foreach ($job['tags'] as $tag) {
            if (stripos($tag, $search_keyword) !== false) {
                $search_in_tags = true;
                break;
            }
        }
        
        return $search_in_title || $search_in_company || $search_in_tags;
    });
}

// Pagination functionality
$jobs_per_page = 3;
$current_page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$total_jobs = count($jobs);
$total_pages = ceil($total_jobs / $jobs_per_page);
$start_index = ($current_page - 1) * $jobs_per_page;
$paginated_jobs = array_slice($jobs, $start_index, $jobs_per_page);
?>