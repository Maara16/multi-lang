/**
 * Additional vulnerable Kotlin code samples for SAST testing
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.security.MessageDigest
import java.io.*

// Hardcoded secrets
const val SECRET_KEY = "mySecretKey123"
const val JWT_SECRET = "jwtSecretKey456"

// Weak crypto - MD5
fun hashPassword(password: String): String {
    val md = MessageDigest.getInstance("MD5")
    val hash = md.digest(password.toByteArray())
    return hash.joinToString("") { "%02x".format(it) }
}

// Insecure deserialization
fun deserializeData(data: ByteArray): Any {
    val ois = ObjectInputStream(ByteArrayInputStream(data))
    return ois.readObject()
}

// XSS
fun renderContent(content: String) {
    response.writer.println(content)
}

