/**
 * Additional vulnerable Swift code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import Foundation
import CommonCrypto

// Hardcoded secrets
let SECRET_KEY = "mySecretKey123"
let JWT_SECRET = "jwtSecretKey456"

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

// Command Injection
func executeShell(_ cmd: String) {
    let task = Process()
    task.launchPath = "/usr/bin/env"
    task.arguments = ["bash", "-c", cmd]
    task.launch()
}

