/**
 * Secure Java code samples for SAST false positive testing
 * These are SAFE implementations that should NOT be flagged
 * Author: Test Suite
 * Created: 2025-01-21
 */

import java.sql.*;
import java.io.*;
import java.nio.file.*;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class Secure {
    
    // ✅ SAFE: Parameterized SQL query (should NOT be flagged)
    public ResultSet getUserData(String userId) throws SQLException {
        String query = "SELECT * FROM users WHERE id = ?";
        PreparedStatement stmt = connection.prepareStatement(query);
        stmt.setString(1, userId); // Parameterized query
        return stmt.executeQuery();
    }
    
    // ✅ SAFE: Parameterized SQL with LIKE (should NOT be flagged)
    public ResultSet searchUsers(String searchTerm) throws SQLException {
        String query = "SELECT * FROM users WHERE name LIKE ?";
        PreparedStatement stmt = connection.prepareStatement(query);
        stmt.setString(1, "%" + searchTerm + "%"); // Parameterized
        return stmt.executeQuery();
    }
    
    // ✅ SAFE: Command execution with whitelist (should NOT be flagged)
    public void executeCommand(String command) throws IOException {
        String[] allowedCommands = {"ls", "pwd", "date"};
        boolean isAllowed = false;
        for (String allowed : allowedCommands) {
            if (command.equals(allowed)) {
                isAllowed = true;
                break;
            }
        }
        if (isAllowed) {
            Runtime.getRuntime().exec(command);
        }
    }
    
    // ✅ SAFE: Secrets from environment variables (should NOT be flagged)
    private static final String API_KEY = System.getenv("API_KEY");
    private static final String PASSWORD = System.getenv("DB_PASSWORD");
    private static final String SECRET = System.getenv("SECRET_KEY");
    
    // ✅ SAFE: Path validation before file access (should NOT be flagged)
    public String readFile(String filename) throws IOException {
        Path basePath = Paths.get("/var/www/data");
        Path filePath = basePath.resolve(filename).normalize();
        if (!filePath.startsWith(basePath)) {
            throw new SecurityException("Invalid path");
        }
        return new String(Files.readAllBytes(filePath));
    }
    
    // ✅ SAFE: Strong crypto - SHA-256 (should NOT be flagged)
    public String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hash = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hash);
    }
    
    // ✅ SAFE: Secure random (should NOT be flagged)
    public String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getEncoder().encodeToString(bytes);
    }
    
    // ✅ SAFE: XSS prevention with encoding (should NOT be flagged)
    public void displayMessage(String message) {
        String escaped = message
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;");
        response.getWriter().println("<div>" + escaped + "</div>");
    }
}

