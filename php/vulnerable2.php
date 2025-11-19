<?php
/**
 * Additional vulnerable PHP code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

// SQL Injection
function searchUsers($searchTerm) {
    $query = "SELECT * FROM users WHERE name LIKE '%$searchTerm%'";
    return mysql_query($query);
}

// Hardcoded secrets
$db_config = [
    'host' => 'localhost',
    'user' => 'admin',
    'password' => 'admin123',
    'database' => 'mydb'
];

// Command Injection
function runCommand($command) {
    system($command);
}

// Path Traversal
function readConfigFile($filename) {
    return file_get_contents("/etc/config/$filename");
}

