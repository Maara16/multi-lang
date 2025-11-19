/**
 * Vulnerable Kotlin code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.security.MessageDigest
import java.io.File
import java.sql.Statement

// SQL Injection vulnerability
fun getUserData(userId: String): ResultSet {
    val query = "SELECT * FROM users WHERE id = $userId"
    val stmt: Statement = connection.createStatement()
    return stmt.executeQuery(query)
}

// SQL Injection with string interpolation
fun searchUsers(searchTerm: String): ResultSet {
    val query = "SELECT * FROM users WHERE name LIKE '$searchTerm'"
    val stmt: Statement = connection.createStatement()
    return stmt.executeQuery(query)
}

// Command Injection
fun executeCommand(command: String) {
    Runtime.getRuntime().exec(command)
}

// Hardcoded secrets
const val API_KEY = "sk_live_51H3ll0W0rld123456789"
const val PASSWORD = "admin123"
const val SECRET = "mySecretKey123"

// Path Traversal
fun readFile(filename: String): String {
    return File("/var/www/data/$filename").readText()
}

// Weak crypto - MD5
fun hashPassword(password: String): String {
    val md = MessageDigest.getInstance("MD5")
    val hash = md.digest(password.toByteArray())
    return hash.joinToString("") { "%02x".format(it) }
}

// Insecure deserialization
fun deserializeData(data: ByteArray): Any {
    val ois = java.io.ObjectInputStream(java.io.ByteArrayInputStream(data))
    return ois.readObject()
}

// XSS vulnerability
fun displayMessage(message: String) {
    response.writer.println("<div>$message</div>")
}

