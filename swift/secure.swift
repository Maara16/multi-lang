/**
 * Secure Swift code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

import Foundation
import CryptoKit

// ✅ SAFE: Parameterized SQL query (using prepared statements - should NOT be flagged)
func getUserData(_ userId: String) -> String {
    // In real code, this would use prepared statements (e.g., SQLite.swift)
    return "SELECT * FROM users WHERE id = ?" // Placeholder for prepared statement
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
func executeCommand(_ command: String) {
    let allowedCommands = ["ls", "pwd", "date"]
    if allowedCommands.contains(command) {
        let process = Process()
        process.launchPath = "/bin/sh"
        process.arguments = ["-c", command]
        process.launch()
    }
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
let API_KEY = ProcessInfo.processInfo.environment["API_KEY"]
let PASSWORD = ProcessInfo.processInfo.environment["DB_PASSWORD"]
let SECRET = ProcessInfo.processInfo.environment["SECRET_KEY"]

// ✅ SAFE: Path validation before file access (should NOT be flagged)
func readFile(_ filename: String) throws -> String {
    let basePath = "/var/www/data"
    let filePath = (basePath as NSString).appendingPathComponent((filename as NSString).lastPathComponent)
    
    let canonicalBase = (basePath as NSString).resolvingSymlinksInPath
    let canonicalFile = (filePath as NSString).resolvingSymlinksInPath
    
    if !canonicalFile.hasPrefix(canonicalBase) {
        throw NSError(domain: "SecurityError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid path"])
    }
    
    return try String(contentsOfFile: canonicalFile, encoding: .utf8)
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
func hashPassword(_ password: String) -> String {
    let data = password.data(using: .utf8)!
    let hash = SHA256.hash(data: data)
    return hash.compactMap { String(format: "%02x", $0) }.joined()
}

// ✅ SAFE: Secure random (should NOT be flagged)
func generateToken() -> String {
    var bytes = [UInt8](repeating: 0, count: 32)
    let status = SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes)
    guard status == errSecSuccess else {
        fatalError("Random generation failed")
    }
    return Data(bytes).base64EncodedString()
}

// ✅ SAFE: Safe string operations (should NOT be flagged)
func processInput(_ input: String) -> String {
    // Safe string operations with validation
    return input.trimmingCharacters(in: .whitespacesAndNewlines)
}

