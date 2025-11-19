<?php
/**
 * Vulnerable PHP code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

// SQL Injection vulnerability
function getUserData($userId) {
    $query = "SELECT * FROM users WHERE id = " . $userId;
    return mysql_query($query);
}

// SQL Injection with string interpolation
function searchUsers($searchTerm) {
    $query = "SELECT * FROM users WHERE name LIKE '$searchTerm'";
    return mysql_query($query);
}

// Command Injection
function executeCommand($command) {
    system($command);
}

function executeCommandShell($cmd) {
    exec($cmd);
}

function executeCommandShellExec($cmd) {
    shell_exec($cmd);
}

// Code Injection - eval
function processData($data) {
    return eval($data);
}

// Hardcoded secrets
$api_key = "sk_live_51H3ll0W0rld123456789";
$password = "admin123";
$secret = "mySecretKey123";
$db_password = "db_pass_123";

// Path Traversal
function readFile($filename) {
    return file_get_contents("/var/www/data/" . $filename);
}

// XSS vulnerability
function displayMessage($message) {
    echo "<div>" . $message . "</div>";
}

// XSS with echo
function showContent($content) {
    echo $content;
}

// Weak crypto - MD5
function hashPassword($password) {
    return md5($password);
}

// Unsafe file upload
function uploadFile($file) {
    move_uploaded_file($file['tmp_name'], '/var/www/uploads/' . $file['name']);
}

// XXE vulnerability
function parseXML($xml) {
    $dom = new DOMDocument();
    $dom->loadXML($xml);
    return $dom;
}

