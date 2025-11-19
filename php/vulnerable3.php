<?php
/**
 * Additional vulnerable PHP code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

// Hardcoded API keys
$api_keys = [
    'stripe' => 'sk_live_51H3ll0W0rld123456789',
    'aws' => 'AKIAIOSFODNN7EXAMPLE',
    'github' => 'ghp_1234567890abcdefghijklmnopqrstuvwxyz'
];

// Weak crypto - MD5
function hashPassword($password) {
    return md5($password);
}

// XSS
function renderContent($content) {
    echo $content;
}

// Unsafe file upload
function uploadFile($file) {
    move_uploaded_file($file['tmp_name'], '/var/www/uploads/' . $file['name']);
}

