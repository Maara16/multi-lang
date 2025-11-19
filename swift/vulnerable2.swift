/**
 * Additional vulnerable Swift code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import Foundation

// SQL Injection (if using string concatenation)
func searchUsers(_ searchTerm: String) -> String {
    return "SELECT * FROM users WHERE name LIKE '%\(searchTerm)%'"
}

// Hardcoded secrets
let DB_PASSWORD = "admin123"
let API_KEY = "sk_live_51H3ll0W0rld123456789"

// Command Injection
func runCommand(_ command: String) {
    let process = Process()
    process.launchPath = "/bin/sh"
    process.arguments = ["-c", command]
    process.launch()
}

// Path Traversal
func readConfigFile(_ filename: String) throws -> String {
    let path = "/etc/config/\(filename)"
    return try String(contentsOfFile: path, encoding: .utf8)
}

