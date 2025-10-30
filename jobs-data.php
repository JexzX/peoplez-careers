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
        'description' => 'We are looking for a skilled Frontend Developer to join our web development team. You will be responsible for building responsive web applications using modern technologies and frameworks.',
        'requirements' => [
            '3+ years of experience in frontend development',
            'Proficiency in React, JavaScript, and CSS',
            'Experience with version control (Git)',
            'Strong understanding of web performance optimization',
            'Knowledge of modern build tools and workflows'
        ],
        'benefits' => [
            'Competitive salary and stock options',
            'Flexible working hours',
            'Health insurance and wellness programs',
            'Professional development budget',
            'Modern office in Gangnam district'
        ],
        'tags' => ['React', 'JavaScript', 'CSS', 'Vue', 'TypeScript'],
        'posted_date' => '2024-01-28',
        'application_url' => '#apply'
    ],
    [
        'id' => 2,
        'title' => 'UX/UI Designer',
        'company' => 'Kakao Entertainment',
        'location' => 'Busan, South Korea', 
        'type' => 'Full-time',
        'salary' => '₩45,000,000 - ₩60,000,000',
        'description' => 'Join our design team to create amazing user experiences for millions of users. You will work on both mobile and web platforms, collaborating with product managers and developers.',
        'requirements' => [
            'Bachelor\'s degree in Design or related field',
            'Proficiency in Figma and Adobe Creative Suite',
            'Experience with user research and testing methodologies',
            'Portfolio demonstrating UI/UX design skills',
            'Understanding of design systems and component libraries'
        ],
        'benefits' => [
            'Creative and collaborative work environment',
            'Latest design tools and equipment',
            'Conference and workshop opportunities',
            'Comprehensive health coverage',
            'Remote work flexibility'
        ],
        'tags' => ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Wireframing'],
        'posted_date' => '2024-01-29',
        'application_url' => '#apply'
    ],
    [
        'id' => 3,
        'title' => 'Backend Engineer',
        'company' => 'Coupang',
        'location' => 'Seoul, South Korea',
        'type' => 'Remote', 
        'salary' => '₩60,000,000 - ₩80,000,000',
        'description' => 'Looking for backend engineers to build scalable e-commerce solutions. You will work on high-traffic systems serving millions of customers across Korea.',
        'requirements' => [
            '5+ years of backend development experience',
            'Strong knowledge of Node.js or Python',
            'Experience with AWS cloud services and microservices',
            'Understanding of database design and optimization',
            'Knowledge of containerization and orchestration tools'
        ],
        'benefits' => [
            'Fully remote work options',
            'Competitive compensation package',
            'Stock ownership program',
            'Learning and development stipend',
            'Flexible paid time off'
        ],
        'tags' => ['Node.js', 'Python', 'AWS', 'MySQL', 'Redis', 'Docker'],
        'posted_date' => '2024-01-27',
        'application_url' => '#apply'
    ],
    [
        'id' => 4,
        'title' => 'Data Scientist',
        'company' => 'Samsung Research',
        'location' => 'Suwon, South Korea',
        'type' => 'Full-time',
        'salary' => '₩65,000,000 - ₩85,000,000',
        'description' => 'Join our AI research team to work on cutting-edge machine learning projects. You will develop algorithms for various Samsung products and services.',
        'requirements' => [
            'PhD or Master\'s in Computer Science or related field',
            'Experience with machine learning frameworks (TensorFlow, PyTorch)',
            'Strong programming skills in Python and SQL',
            'Knowledge of statistical analysis and data visualization',
            'Experience with big data technologies'
        ],
        'benefits' => [
            'State-of-the-art research facilities',
            'Collaboration with top researchers',
            'Patent and publication support',
            'Comprehensive benefits package',
            'Relocation assistance for international hires'
        ],
        'tags' => ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL', 'Big Data'],
        'posted_date' => '2024-01-25',
        'application_url' => '#apply'
    ],
    [
        'id' => 5,
        'title' => 'Product Manager',
        'company' => 'LG Electronics',
        'location' => 'Seoul, South Korea',
        'type' => 'Full-time',
        'salary' => '₩70,000,000 - ₩90,000,000',
        'description' => 'Lead product development for innovative consumer electronics. You will define product strategy and work with cross-functional teams to deliver amazing products.',
        'requirements' => [
            '7+ years of product management experience',
            'Experience in consumer electronics industry',
            'Strong leadership and communication skills',
            'MBA or related advanced degree preferred',
            'Proven track record of successful product launches'
        ],
        'benefits' => [
            'Leadership development programs',
            'Executive benefits package',
            'Global career opportunities',
            'Performance bonuses',
            'Company vehicle allowance'
        ],
        'tags' => ['Product Strategy', 'Agile', 'Market Research', 'Team Leadership', 'Roadmapping'],
        'posted_date' => '2024-01-20',
        'application_url' => '#apply'
    ],
    [
        'id' => 6,
        'title' => 'Mobile Developer',
        'company' => 'Line Corporation',
        'location' => 'Seoul, South Korea',
        'type' => 'Contract',
        'salary' => '₩55,000,000 - ₩75,000,000',
        'description' => 'Develop innovative mobile applications for one of Asia\'s most popular messaging platforms. Work on features used by millions of daily active users.',
        'requirements' => [
            '4+ years of mobile development experience',
            'Proficiency in React Native or Flutter',
            'Experience with iOS/Android native development',
            'Knowledge of mobile app architecture patterns',
            'Understanding of mobile performance optimization'
        ],
        'benefits' => [
            'Contract-to-hire opportunities',
            'Project completion bonuses',
            'Flexible schedule',
            'Tech conference attendance',
            'Modern development equipment'
        ],
        'tags' => ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile'],
        'posted_date' => '2024-01-22',
        'application_url' => '#apply'
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