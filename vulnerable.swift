/**
 * Vulnerable Swift code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import Foundation
import CommonCrypto

// SQL Injection vulnerability (if using string concatenation)
func getUserData(userId: String) -> String {
    return "SELECT * FROM users WHERE id = \(userId)"
}

// Command Injection
func executeCommand(_ command: String) {
    let process = Process()
    process.launchPath = "/bin/sh"
    process.arguments = ["-c", command]
    process.launch()
}

// Hardcoded secrets
let API_KEY = "sk_live_51H3ll0W0rld123456789"
let PASSWORD = "admin123"
let SECRET = "mySecretKey123"

// Path Traversal
func readFile(_ filename: String) throws -> String {
    let path = "/var/www/data/\(filename)"
    return try String(contentsOfFile: path, encoding: .utf8)
}

// Weak crypto - MD5
func hashPassword(_ password: String) -> String {
    let data = password.data(using: .utf8)!
    var digest = [UInt8](repeating: 0, count: Int(CC_MD5_DIGEST_LENGTH))
    data.withUnsafeBytes {
        _ = CC_MD5($0.baseAddress, CC_LONG(data.count), &digest)
    }
    return digest.map { String(format: "%02x", $0) }.joined()
}

// Insecure random
func generateToken() -> String {
    return String(arc4random())
}

// Command Injection with Process
func runCommand(_ cmd: String) {
    let task = Process()
    task.launchPath = "/usr/bin/env"
    task.arguments = ["bash", "-c", cmd]
    task.launch()
}

