/**
 * Additional vulnerable Kotlin code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.sql.Statement

// SQL Injection
fun searchUsers(searchTerm: String): ResultSet {
    val query = "SELECT * FROM users WHERE name LIKE '%$searchTerm%'"
    val stmt: Statement = connection.createStatement()
    return stmt.executeQuery(query)
}

// Hardcoded secrets
const val DB_PASSWORD = "admin123"
const val API_KEY = "sk_live_51H3ll0W0rld123456789"

// Command Injection
fun runCommand(command: String) {
    Runtime.getRuntime().exec(command)
}

// Path Traversal
fun readConfigFile(filename: String): String {
    return java.io.File("/etc/config/$filename").readText()
}

