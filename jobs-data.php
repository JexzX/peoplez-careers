<?php

// Search functionality
$search_keyword = '';
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search_keyword = strtolower(trim($_GET['search']));
}

// Sample jobs data - Korean companies
$jobs = [
    [
        'id' => 1,
        'title' => 'Frontend Developer',
        'company' => 'Naver Corporation', 
        'location' => 'Seoul, South Korea',
        'type' => 'Full-time',
        'salary' => '₩50,000,000 - ₩70,000,000',
        'description' => 'We are looking for a skilled Frontend Developer to join our web development team.',
        'tags' => ['React', 'JavaScript', 'CSS', 'Vue'],
        'posted_date' => '2024-01-15'
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
        'posted_date' => '2024-01-14'
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
        'posted_date' => '2024-01-13'
    ]
];
?>