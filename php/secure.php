<?php
/**
 * Secure PHP code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

// ✅ SAFE: Parameterized SQL query (should NOT be flagged)
function getUserData($userId) {
    $query = "SELECT * FROM users WHERE id = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param("s", $userId); // Parameterized query
    return $stmt->execute();
}

// ✅ SAFE: Parameterized SQL with PDO (should NOT be flagged)
function searchUsers($searchTerm) {
    $query = "SELECT * FROM users WHERE name LIKE :searchTerm";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':searchTerm', '%' . $searchTerm . '%');
    return $stmt->execute();
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
function executeCommand($command) {
    $allowedCommands = ['ls', 'pwd', 'date'];
    if (in_array($command, $allowedCommands)) {
        system($command);
    }
}

// ✅ SAFE: No eval - using safe alternatives (should NOT be flagged)
function processData($data) {
    return json_decode($data, true); // Safe - only parses JSON
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
$api_key = getenv('API_KEY');
$password = getenv('DB_PASSWORD');
$secret = getenv('SECRET_KEY');
$db_password = getenv('DATABASE_PASSWORD');

// ✅ SAFE: Path validation before file access (should NOT be flagged)
function readFile($filename) {
    $basePath = '/var/www/data';
    $safePath = $basePath . '/' . basename($filename);
    if (strpos(realpath($safePath), realpath($basePath)) !== 0) {
        throw new Exception('Invalid path');
    }
    return file_get_contents($safePath);
}

// ✅ SAFE: Strong crypto - password_hash (should NOT be flagged)
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// ✅ SAFE: Secure random (should NOT be flagged)
function generateToken() {
    return bin2hex(random_bytes(32));
}

// ✅ SAFE: XSS prevention with htmlspecialchars (should NOT be flagged)
function displayMessage($message) {
    $escaped = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo "<div>" . $escaped . "</div>";
}

// ✅ SAFE: Safe file upload with validation (should NOT be flagged)
function uploadFile($file) {
    $allowedTypes = ['image/jpeg', 'image/png'];
    $maxSize = 5 * 1024 * 1024; // 5MB
    
    if (in_array($file['type'], $allowedTypes) && $file['size'] <= $maxSize) {
        $safeName = basename($file['name']);
        move_uploaded_file($file['tmp_name'], '/var/www/uploads/' . $safeName);
    }
}

// ✅ SAFE: XML parsing with LIBXML_NONET (should NOT be flagged)
function parseXML($xml) {
    $dom = new DOMDocument();
    $dom->loadXML($xml, LIBXML_NONET | LIBXML_NOENT);
    return $dom;
}

