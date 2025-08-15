<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'swp-prod.c5q4e20ai0x9.us-west-2.rds.amazonaws.com';
$username = 'adobestudent';
$password = 'Giruliyan~49'; // Replace with your actual password
$database = 'adobestudent'; // Replace with your database name

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $firstName = trim($_POST['first_name'] ?? '');
    $lastName = trim($_POST['last_name'] ?? '');
    $name = $firstName . ' ' . $lastName;
    $email = trim($_POST['email'] ?? '');
    $campus = trim($_POST['campus'] ?? '');
    $inquiryType = trim($_POST['inquiry_type'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    // Basic validation
    if (empty($firstName) || empty($lastName) || empty($email) || empty($campus) || empty($inquiryType) || empty($message)) {
        $response['success'] = false;
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'Please enter a valid email address.';
        echo json_encode($response);
        exit;
    }
    
    try {
        // Create database connection with SSL
        $dsn = "mysql:host=$host;dbname=$database;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // For RDS
        ];
        
        $pdo = new PDO($dsn, $username, $password, $options);
        
        // Create table if it doesn't exist
        $createTable = "CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            campus VARCHAR(100) NOT NULL,
            inquiry_type VARCHAR(100) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_campus (campus),
            INDEX idx_inquiry_type (inquiry_type),
            INDEX idx_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $pdo->exec($createTable);
        
        // Prepare and execute insert statement
        $sql = "INSERT INTO contacts (first_name, last_name, email, campus, inquiry_type, message) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$firstName, $lastName, $email, $campus, $inquiryType, $message]);
        
        $response['success'] = true;
        $response['message'] = 'Thank you! Your message has been sent successfully.';
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        $response['success'] = false;
        $response['message'] = 'Database error occurred. Please try again later.';
    } catch (Exception $e) {
        error_log("General error: " . $e->getMessage());
        $response['success'] = false;
        $response['message'] = 'An error occurred. Please try again later.';
    }
    
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>