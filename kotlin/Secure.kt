/**
 * Secure Kotlin code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.security.MessageDigest
import java.security.SecureRandom
import java.io.File
import java.sql.PreparedStatement
import java.util.Base64

// ✅ SAFE: Parameterized SQL query (should NOT be flagged)
fun getUserData(userId: String): ResultSet {
    val query = "SELECT * FROM users WHERE id = ?"
    val stmt: PreparedStatement = connection.prepareStatement(query)
    stmt.setString(1, userId) // Parameterized query
    return stmt.executeQuery()
}

// ✅ SAFE: Parameterized SQL with LIKE (should NOT be flagged)
fun searchUsers(searchTerm: String): ResultSet {
    val query = "SELECT * FROM users WHERE name LIKE ?"
    val stmt: PreparedStatement = connection.prepareStatement(query)
    stmt.setString(1, "%$searchTerm%") // Parameterized
    return stmt.executeQuery()
}

// ✅ SAFE: Command execution with whitelist (should NOT be flagged)
fun executeCommand(command: String) {
    val allowedCommands = listOf("ls", "pwd", "date")
    if (command in allowedCommands) {
        Runtime.getRuntime().exec(command)
    }
}

// ✅ SAFE: Secrets from environment variables (should NOT be flagged)
val API_KEY = System.getenv("API_KEY")
val PASSWORD = System.getenv("DB_PASSWORD")
val SECRET = System.getenv("SECRET_KEY")

// ✅ SAFE: Path validation before file access (should NOT be flagged)
fun readFile(filename: String): String {
    val basePath = java.io.File("/var/www/data")
    val filePath = java.io.File(basePath, java.io.File(filename).name)
    
    val canonicalBase = basePath.canonicalFile
    val canonicalFile = filePath.canonicalFile
    
    if (!canonicalFile.path.startsWith(canonicalBase.path)) {
        throw SecurityException("Invalid path")
    }
    
    return canonicalFile.readText()
}

// ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
fun hashPassword(password: String): String {
    val md = MessageDigest.getInstance("SHA-256")
    val hash = md.digest(password.toByteArray())
    return Base64.getEncoder().encodeToString(hash)
}

// ✅ SAFE: Secure random (should NOT be flagged)
fun generateToken(): String {
    val random = SecureRandom()
    val bytes = ByteArray(32)
    random.nextBytes(bytes)
    return Base64.getEncoder().encodeToString(bytes)
}

// ✅ SAFE: XSS prevention with encoding (should NOT be flagged)
fun displayMessage(message: String) {
    val escaped = message
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&#x27;")
    response.writer.println("<div>$escaped</div>")
}

// ✅ SAFE: Safe deserialization (should NOT be flagged)
fun deserializeData(data: ByteArray): Any? {
    // In production, use safe deserialization libraries
    // This is a placeholder showing the pattern
    return null // Safe - no unsafe deserialization
}

